const http = require("http");
http.createServer((req, res) => { res.writeHead(200); res.end("Union™ Bot running!"); }).listen(process.env.PORT || 3000);

const { Client } = require("oceanic.js");
const db = require("./db");
const { DAYS, getWeekStart, getSessionTimestamp, buildTimetableEmbed, buildManagementEmbed, MANAGEMENT_BUTTONS } = require("./timetable");
const { sendSetupPanel, updateSetupPanel, getConfigMeta, isAnnounceKey, buildAnnounceModeComponents, parseAnnounceValue } = require("./setup");

const BOT_TOKEN = process.env.BOT_TOKEN;
if (!BOT_TOKEN) throw new Error("Missing BOT_TOKEN environment variable.");

const client = new Client({
  auth: BOT_TOKEN.startsWith("Bot ") ? BOT_TOKEN : `Bot ${BOT_TOKEN}`,
  gateway: { intents: ["GUILDS", "GUILD_MESSAGES"] }
});

let currentWeekMonday = getWeekStart(new Date());
let managementMessageId = null;
let timetableMessageId = null;
const setupPanels = new Map();
const sentAnnouncements = new Set();

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function apiReply(interaction, data) {
  await fetch(`https://discord.com/api/v10/interactions/${interaction.id}/${interaction.token}/callback`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": `Bot ${BOT_TOKEN}` },
    body: JSON.stringify({ type: 4, data: { ...data, flags: 64 } })
  });
}

async function apiDefer(interaction) {
  await fetch(`https://discord.com/api/v10/interactions/${interaction.id}/${interaction.token}/callback`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": `Bot ${BOT_TOKEN}` },
    body: JSON.stringify({ type: 5, data: { flags: 64 } })
  });
}

async function apiFollowup(interaction, data) {
  await fetch(`https://discord.com/api/v10/webhooks/${interaction.applicationID}/${interaction.token}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": `Bot ${BOT_TOKEN}` },
    body: JSON.stringify({ ...data, flags: 64 })
  });
}

async function apiModal(interaction, modal) {
  await fetch(`https://discord.com/api/v10/interactions/${interaction.id}/${interaction.token}/callback`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": `Bot ${BOT_TOKEN}` },
    body: JSON.stringify({ type: 9, data: modal })
  });
}

async function getChannel(id) {
  if (!id) return null;
  try { return await client.rest.channels.get(id); } catch { return null; }
}

function hasManagementRole(member, cfg) {
  if (!cfg.management_role) return true;
  const roles = cfg.management_role.split(",").map(r => r.trim()).filter(Boolean);
  return roles.some(r => member?.roles?.includes(r));
}

function buildPingContent(rolesCsv) {
  if (!rolesCsv) return "";
  return rolesCsv.split(",").map(r => r.trim()).filter(Boolean).map(r => `<@&${r}>`).join(" ");
}

function getModalValue(interaction, key) {
  return interaction.data.components.raw.find(c => c.components[0].customID === key)?.components[0].value?.trim() ?? "";
}

function getUserId(interaction) {
  return interaction.user?.id ?? interaction.member?.user?.id;
}

// ─── Refresh ──────────────────────────────────────────────────────────────────

async function refreshManagement(cfg) {
  const ch = await getChannel(cfg.management_channel);
  if (!ch) return;
  const sessions = await db.getSessions();
  const embed = buildManagementEmbed(sessions, currentWeekMonday);

  if (managementMessageId) {
    try { await ch.editMessage(managementMessageId, { embeds: [embed], components: MANAGEMENT_BUTTONS }); return; }
    catch { managementMessageId = null; }
  }
  const msg = await ch.createMessage({ embeds: [embed], components: MANAGEMENT_BUTTONS });
  managementMessageId = msg.id;
  await db.setMessageId("management", msg.id);
}

async function refreshTimetable(cfg) {
  const ch = await getChannel(cfg.timetable_channel);
  if (!ch) return;
  const sessions = await db.getSessions();
  const embed = buildTimetableEmbed(sessions, currentWeekMonday);

  if (timetableMessageId) {
    try { await ch.editMessage(timetableMessageId, { embeds: [embed] }); return; }
    catch { timetableMessageId = null; }
  }
  const msg = await ch.createMessage({ embeds: [embed] });
  timetableMessageId = msg.id;
  await db.setMessageId("timetable", msg.id);
}

async function refreshAll() {
  const cfg = await db.getAllConfig();
  await refreshManagement(cfg);
  await refreshTimetable(cfg);
}

// ─── Session List Builder ─────────────────────────────────────────────────────

function buildSessionListReply(sessions, type, role, userId, weekMonday) {
  // role = "host" or "cohost"
  const available = sessions.filter(s => {
    if (s.type !== type) return false;
    if (role === "host") return !s.host;
    if (role === "cohost") return s.host && !s.cohost;
    return false;
  });

  if (available.length === 0) {
    return { content: `No available **${type}** sessions for **${role}** right now.`, components: [] };
  }

  const lines = available.map(s => {
    const ts = getSessionTimestamp(weekMonday, s.day, s.hour);
    return `<t:${ts}:F> (<t:${ts}:R>)`;
  });

  const rows = [];
  let row = { type: 1, components: [] };
  for (const s of available) {
    if (rows.length >= 4 && row.components.length === 0) break;
    if (row.components.length === 5) { rows.push(row); row = { type: 1, components: [] }; if (rows.length >= 4) break; }
    const ts = getSessionTimestamp(weekMonday, s.day, s.hour);
    const label = `${s.day.slice(0, 3)} <t:${ts}:t>`;
    // Button labels can't have < >, use day + hour
    const btnLabel = `${s.day.slice(0, 3)} ${String(s.hour).padStart(2, "0")}:00`;
    row.components.push({
      type: 2, label: btnLabel, style: 1,
      customID: `mgmt_claim_${role}_${type}_${s.day}_${s.hour}`
    });
  }
  if (row.components.length > 0) rows.push(row);

  return {
    embeds: [{
      title: `${type === "Shift" ? "🔶" : "🔷"} Available ${type} Sessions — ${role}`,
      description: lines.join("\n"),
      color: type === "Shift" ? 0xffa500 : 0x5865f2,
      footer: { text: "Times shown in your local timezone · Click a button to claim" }
    }],
    components: rows
  };
}

function buildRemoveListReply(sessions, userId, weekMonday) {
  const mine = sessions.filter(s => s.host === userId || s.cohost === userId);

  if (mine.length === 0) {
    return { content: "You are not signed up for any sessions.", components: [] };
  }

  const lines = mine.map(s => {
    const ts = getSessionTimestamp(weekMonday, s.day, s.hour);
    const role = s.host === userId ? "Host" : "Co-Host";
    return `${s.type === "Shift" ? "🔶" : "🔷"} <t:${ts}:F> — **${role}**`;
  });

  const rows = [];
  let row = { type: 1, components: [] };
  for (const s of mine) {
    if (rows.length >= 4 && row.components.length === 0) break;
    if (row.components.length === 5) { rows.push(row); row = { type: 1, components: [] }; if (rows.length >= 4) break; }
    const ts = getSessionTimestamp(weekMonday, s.day, s.hour);
    const role = s.host === userId ? "host" : "cohost";
    const btnLabel = `${s.type.slice(0, 3)} ${s.day.slice(0, 3)} ${String(s.hour).padStart(2, "0")}:00`;
    row.components.push({
      type: 2, label: btnLabel, style: 4,
      customID: `mgmt_remove_confirm_${s.type}_${s.day}_${s.hour}`
    });
  }
  if (row.components.length > 0) rows.push(row);

  return {
    embeds: [{
      title: "🗑️ Your Sessions",
      description: lines.join("\n"),
      color: 0xff4444,
      footer: { text: "Click a button to remove yourself from that session" }
    }],
    components: rows
  };
}

// ─── Announcement Builder ─────────────────────────────────────────────────────

function buildAnnouncementEmbed(rawValue, session, ts, isShift) {
  const parsed = parseAnnounceValue(rawValue);
  const host = session.host ? `<@${session.host}>` : "None";
  const cohost = session.cohost ? `<@${session.cohost}>` : "None";

  // If stored as JSON embed, use it directly and inject host/cohost fields
  if (parsed && (parsed.title || parsed.description || parsed.fields)) {
    return {
      ...parsed,
      color: parsed.color ?? (isShift ? 0xffa500 : 0x5865f2),
      fields: [
        ...(parsed.fields ?? []),
        { name: "Time", value: `<t:${ts}:F>`, inline: true },
        { name: "Host", value: host, inline: true },
        { name: "Co-Host", value: cohost, inline: true }
      ],
      footer: parsed.footer ?? { text: "Union™ · Session Announcement" }
    };
  }

  // Simple text fallback
  return {
    title: `${isShift ? "🔶 Shift" : "🔷 Training"} Announcement — Union™`,
    description: parsed?.description ?? rawValue ?? (isShift ? "A shift is starting!" : "A training is starting!"),
    color: isShift ? 0xffa500 : 0x5865f2,
    fields: [
      { name: "Time", value: `<t:${ts}:F>`, inline: true },
      { name: "Host", value: host, inline: true },
      { name: "Co-Host", value: cohost, inline: true }
    ],
    footer: { text: "Union™ · Session Announcement" }
  };
}

// ─── Announcements ────────────────────────────────────────────────────────────

async function checkAnnouncements() {
  const cfg = await db.getAllConfig();
  const sessions = await db.getSessions();
  const now = Math.floor(Date.now() / 1000);

  for (const session of sessions) {
    if (!session.host) continue;
    const ts = getSessionTimestamp(currentWeekMonday, session.day, session.hour);
    if (!ts || ts < now - 120) continue;

    const isShift = session.type === "Shift";
    const announceChannelId = isShift ? cfg.shift_announce_channel : cfg.train_announce_channel;
    const pingEnabled = (isShift ? cfg.shift_ping_enabled : cfg.train_ping_enabled) !== "false";
    const pingContent = pingEnabled ? buildPingContent(isShift ? cfg.shift_ping_role : cfg.train_ping_role) : "";
    const announceChannel = await getChannel(announceChannelId);
    if (!announceChannel) continue;

    const warn1Min = parseInt(isShift ? (cfg.shift_warn1_min ?? "30") : (cfg.train_warn1_min ?? "30"));
    const warn2Min = parseInt(isShift ? (cfg.shift_warn2_min ?? "10") : (cfg.train_warn2_min ?? "10"));

    const checks = [
      { key: "warn1", triggerTs: ts - warn1Min * 60, rawMsg: isShift ? cfg.shift_warn1_msg : cfg.train_warn1_msg, fallback: `${session.type} starts in ${warn1Min} minutes!` },
      { key: "warn2", triggerTs: ts - warn2Min * 60, rawMsg: isShift ? cfg.shift_warn2_msg : cfg.train_warn2_msg, fallback: `${session.type} starts in ${warn2Min} minutes!` },
      { key: "main",  triggerTs: ts,                 rawMsg: isShift ? cfg.shift_announce_msg : cfg.train_announce_msg, fallback: `${session.type} is starting now!` }
    ];

    for (const check of checks) {
      const aKey = `${session.type}_${session.day}_${session.hour}_${check.key}`;
      if (!sentAnnouncements.has(aKey) && now >= check.triggerTs && now < check.triggerTs + 90) {
        sentAnnouncements.add(aKey);
        const embed = buildAnnouncementEmbed(check.rawMsg ?? check.fallback, session, ts, isShift);
        await announceChannel.createMessage({ content: pingContent || undefined, embeds: [embed] });
      }
    }
  }
}

// ─── Interactions ─────────────────────────────────────────────────────────────

client.on("interactionCreate", async (interaction) => {
  try {
    // ── Slash Commands ────────────────────────────────────────────────────────
    if (interaction.type === 2) {
      const cfg = await db.getAllConfig();
      const cmd = interaction.data.name;

      if (cmd === "setup") {
        const msg = await sendSetupPanel(interaction.channel);
        setupPanels.set(interaction.channel.id, msg.id);
        await apiReply(interaction, { content: "Setup panel opened!" });
        return;
      }

      if (cmd === "cancel") {
        if (!hasManagementRole(interaction.member, cfg)) {
          await apiReply(interaction, { content: "You don't have permission to cancel sessions." });
          return;
        }
        await apiModal(interaction, {
          custom_id: "cancel_modal",
          title: "Cancel a Session",
          components: [
            { type: 1, components: [{ type: 4, custom_id: "type", label: "Type (Shift / Training)", style: 1, placeholder: "Shift", required: true }] },
            { type: 1, components: [{ type: 4, custom_id: "day", label: "Day", style: 1, placeholder: "e.g. Monday", required: true }] },
            { type: 1, components: [{ type: 4, custom_id: "hour", label: "Hour (0-23, Berlin time)", style: 1, placeholder: "e.g. 15", required: true }] }
          ]
        });
        return;
      }
    } // end slash commands

    // ── Buttons ───────────────────────────────────────────────────────────────
    if (interaction.type === 3 && interaction.data.componentType === 2) {
      const id = interaction.data.customID;

      // Modals & no-DB replies: respond immediately without defer
      if (id === "mgmt_type_Shift" || id === "mgmt_type_Training") {
        const type = id === "mgmt_type_Shift" ? "Shift" : "Training";
        await apiReply(interaction, {
          content: `**${type}** — Select your role:`,
          components: [{ type: 1, components: [
            { type: 2, label: "Host", style: 3, customID: `mgmt_role_host_${type}` },
            { type: 2, label: "Co-Host", style: 1, customID: `mgmt_role_cohost_${type}` }
          ]}]
        });
        return;
      }

      // Setup modal buttons: need cfg but must open modal (no defer allowed)
      if (id.startsWith("setup_edit_") || id.startsWith("setup_announce_simple_") || id.startsWith("setup_announce_json_")) {
        const cfg = await db.getAllConfig();
        const key = id.startsWith("setup_edit_") ? id.replace("setup_edit_", "")
          : id.startsWith("setup_announce_simple_") ? id.replace("setup_announce_simple_", "")
          : id.replace("setup_announce_json_", "");
        const meta = getConfigMeta(key);

        if (id.startsWith("setup_edit_")) {
          if (!meta) return;
          if (isAnnounceKey(key)) {
            await apiReply(interaction, {
              content: `**${meta.label}**\nChoose how you want to edit this announcement:`,
              components: buildAnnounceModeComponents(key)
            });
            return;
          }
          await apiModal(interaction, {
            custom_id: `setup_modal_${key}`,
            title: `Edit: ${meta.label.slice(0, 45)}`,
            components: [{ type: 1, components: [{ type: 4, custom_id: "value", label: meta.label.slice(0, 45), style: 1, placeholder: meta.desc.slice(0, 100), required: false, value: cfg[key] ?? "" }] }]
          });
          return;
        }

        if (id.startsWith("setup_announce_simple_")) {
          const existing = parseAnnounceValue(cfg[key]);
          await apiModal(interaction, {
            custom_id: `setup_announce_simple_modal_${key}`,
            title: "Edit Announcement (Simple)",
            components: [
              { type: 1, components: [{ type: 4, custom_id: "title", label: "Embed Title", style: 1, required: false, value: existing?.title ?? "" }] },
              { type: 1, components: [{ type: 4, custom_id: "description", label: "Description (supports **bold**, *italic*)", style: 2, required: false, value: existing?.description ?? "" }] },
              { type: 1, components: [{ type: 4, custom_id: "color", label: "Color (hex, e.g. ffa500)", style: 1, required: false, placeholder: "ffa500", value: existing?.color ? existing.color.toString(16) : "" }] }
            ]
          });
          return;
        }

        if (id.startsWith("setup_announce_json_")) {
          await apiModal(interaction, {
            custom_id: `setup_announce_json_modal_${key}`,
            title: "Edit Announcement (JSON)",
            components: [{ type: 1, components: [{ type: 4, custom_id: "json", label: "Discord Embed JSON (from discohook.org)", style: 2, required: false, placeholder: '{"title":"...","description":"...","color":16753920}', value: cfg[key] ?? "" }] }]
          });
          return;
        }
      }

      // All other buttons: defer immediately, load DB after
      await apiDefer(interaction);

      const cfg = await db.getAllConfig();

      if (id.startsWith("setup_page_")) {
        const page = parseInt(id.split("_")[2]);
        const msgId = setupPanels.get(interaction.channel.id) ?? interaction.message?.id;
        if (msgId) await updateSetupPanel(interaction.channel, msgId, page);
        await apiFollowup(interaction, { content: "\u200b" });
        return;
      }

      if (id.startsWith("mgmt_role_")) {
        const parts = id.split("_");
        const role = parts[2];
        const type = parts[3];
        const sessions = await db.getSessions();
        const reply = buildSessionListReply(sessions, type, role, getUserId(interaction), currentWeekMonday);
        await apiFollowup(interaction, reply);
        return;
      }

      if (id === "mgmt_remove") {
        const sessions = await db.getSessions();
        const reply = buildRemoveListReply(sessions, getUserId(interaction), currentWeekMonday);
        await apiFollowup(interaction, reply);
        return;
      }

      if (id.startsWith("mgmt_claim_")) {
        const parts = id.split("_");
        const role = parts[2];
        const type = parts[3];
        const day = parts[4];
        const hour = parseInt(parts[5]);
        const userId = getUserId(interaction);
        const ts = getSessionTimestamp(currentWeekMonday, day, hour);
        if (role === "host") {
          await db.setSessionHost(type, day, hour, userId);
          await apiFollowup(interaction, { content: `✅ You are now **Host** for the ${type} — <t:${ts}:F>` });
        } else {
          const ok = await db.setSessionCohost(type, day, hour, userId);
          if (!ok) { await apiFollowup(interaction, { content: "Session no longer available." }); return; }
          await apiFollowup(interaction, { content: `✅ You are now **Co-Host** for the ${type} — <t:${ts}:F>` });
        }
        await refreshAll();
        return;
      }

      if (id.startsWith("mgmt_remove_confirm_")) {
        const parts = id.split("_");
        const type = parts[3];
        const day = parts[4];
        const hour = parseInt(parts[5]);
        const userId = getUserId(interaction);
        const result = await db.removeUserFromSession(type, day, hour, userId);
        const msgs = { host_removed: "✅ Removed as Host.", cohost_removed: "✅ Removed as Co-Host.", not_found: "Session not found.", not_yours: "You are not part of that session." };
        await apiFollowup(interaction, { content: msgs[result] ?? "Unknown error." });
        await refreshAll();
        return;
      }
    }

    // ── Modals ────────────────────────────────────────────────────────────────
    if (interaction.type === 5) {
      const id = interaction.data.customID;

      await apiDefer(interaction);
      const cfg = await db.getAllConfig();

      if (id.startsWith("setup_modal_")) {
        const key = id.replace("setup_modal_", "");
        const value = getModalValue(interaction, "value");
        if (value) await db.setConfig(key, value);
        const msgId = setupPanels.get(interaction.channel.id) ?? interaction.message?.id;
        if (msgId) await updateSetupPanel(interaction.channel, msgId);
        await apiFollowup(interaction, { content: value ? "✅ Updated." : "No changes made." });
        return;
      }

      if (id.startsWith("setup_announce_simple_modal_")) {
        const key = id.replace("setup_announce_simple_modal_", "");
        const title = getModalValue(interaction, "title");
        const description = getModalValue(interaction, "description");
        const colorHex = getModalValue(interaction, "color");
        const color = colorHex ? parseInt(colorHex.replace("#", ""), 16) : undefined;
        const obj = {};
        if (title) obj.title = title;
        if (description) obj.description = description;
        if (color && !isNaN(color)) obj.color = color;
        await db.setConfig(key, JSON.stringify(obj));
        const msgId = setupPanels.get(interaction.channel.id) ?? interaction.message?.id;
        if (msgId) await updateSetupPanel(interaction.channel, msgId);
        await apiFollowup(interaction, { content: "✅ Announcement updated." });
        return;
      }

      if (id.startsWith("setup_announce_json_modal_")) {
        const key = id.replace("setup_announce_json_modal_", "");
        const raw = getModalValue(interaction, "json");
        try {
          JSON.parse(raw);
          await db.setConfig(key, raw);
          const msgId = setupPanels.get(interaction.channel.id) ?? interaction.message?.id;
          if (msgId) await updateSetupPanel(interaction.channel, msgId);
          await apiFollowup(interaction, { content: "✅ Announcement JSON saved." });
        } catch {
          await apiFollowup(interaction, { content: "❌ Invalid JSON. Check your formatting and try again." });
        }
        return;
      }

      if (id === "cancel_modal") {
        const type = getModalValue(interaction, "type");
        const day = getModalValue(interaction, "day");
        const hour = parseInt(getModalValue(interaction, "hour"));
        if (!["Shift", "Training"].includes(type) || !DAYS.includes(day) || isNaN(hour)) {
          await apiFollowup(interaction, { content: "Invalid input." });
          return;
        }
        await db.cancelSession(type, day, hour);
        ["main", "warn1", "warn2"].forEach(w => sentAnnouncements.delete(`${type}_${day}_${hour}_${w}`));
        await apiFollowup(interaction, { content: `✅ **${type}** on **${day}** at **${String(hour).padStart(2, "0")}:00** cancelled.` });
        await refreshAll();
        return;
      }
    } // end modals
  } catch (err) {
    console.error("Interaction error:", err);
  }
});

// ─── Ready ────────────────────────────────────────────────────────────────────

client.on("ready", async () => {
  console.log(`Union™ Bot ready as ${client.user.tag}`);
  await db.init();

  const cfg = await db.getAllConfig();

  managementMessageId = await db.getMessageId("management") || null;
  timetableMessageId = await db.getMessageId("timetable") || null;

  // Verify messages still exist
  if (managementMessageId) {
    const ch = await getChannel(cfg.management_channel);
    if (ch) { try { await ch.getMessage(managementMessageId); } catch { managementMessageId = null; } }
  }
  if (timetableMessageId) {
    const ch = await getChannel(cfg.timetable_channel);
    if (ch) { try { await ch.getMessage(timetableMessageId); } catch { timetableMessageId = null; } }
  }

  await refreshAll();

  setInterval(checkAnnouncements, 60 * 1000);

  setInterval(async () => {
    const newMonday = getWeekStart(new Date());
    if (newMonday.getTime() !== currentWeekMonday.getTime()) {
      currentWeekMonday = newMonday;
      sentAnnouncements.clear();
      managementMessageId = null;
      timetableMessageId = null;
      await db.setMessageId("management", "");
      await db.setMessageId("timetable", "");
      await refreshAll();
    }
  }, 60 * 1000);
});

client.connect();
