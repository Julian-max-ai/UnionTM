const http = require("http");
http.createServer((req, res) => { res.writeHead(200); res.end("Union™ Bot running!"); }).listen(process.env.PORT || 3000);

const { Client } = require("oceanic.js");
const db = require("./db");
const { DAYS, getWeekStart, getDateForWeekday, getSessionTimestamp, buildTimetableEmbed, buildManagementEmbed, MANAGEMENT_BUTTONS } = require("./timetable");
const { sendSetupPanel, updateSetupPanel, getConfigMeta } = require("./setup");

const BOT_TOKEN = process.env.BOT_TOKEN;
if (!BOT_TOKEN) throw new Error("Missing BOT_TOKEN environment variable.");

const client = new Client({
  auth: BOT_TOKEN.startsWith("Bot ") ? BOT_TOKEN : `Bot ${BOT_TOKEN}`,
  gateway: { intents: ["GUILDS", "GUILD_MESSAGES"] }
});

let currentWeekMonday = getWeekStart(new Date());
let managementMessageId = null;
let timetableMessageId = null;
const setupPanels = new Map(); // channelId -> messageId
const sentAnnouncements = new Set(); // `${type}_${day}_${hour}_${warn}` -> prevent duplicates

// ─── Helpers ─────────────────────────────────────────────────────────────────

async function apiReply(interaction, data) {
  await fetch(`https://discord.com/api/v10/interactions/${interaction.id}/${interaction.token}/callback`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": `Bot ${BOT_TOKEN}` },
    body: JSON.stringify({ type: 4, data: { ...data, flags: 64 } })
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

// Supports comma-separated role IDs
function hasManagementRole(member, cfg) {
  if (!cfg.management_role) return true;
  const roles = cfg.management_role.split(",").map(r => r.trim()).filter(Boolean);
  return roles.some(r => member?.roles?.includes(r));
}

// Build ping content string from comma-separated role IDs
function buildPingContent(rolesCsv) {
  if (!rolesCsv) return "";
  return rolesCsv.split(",").map(r => r.trim()).filter(Boolean).map(r => `<@&${r}>`).join(" ");
}

function getModalValue(interaction, key) {
  return interaction.data.components.raw.find(c => c.components[0].customID === key)?.components[0].value?.trim() ?? "";
}

// ─── Timetable & Management ───────────────────────────────────────────────────

async function refreshManagement(cfgOverride) {
  const cfg = cfgOverride ?? await db.getAllConfig();
  const ch = await getChannel(cfg.management_channel);
  if (!ch) return;
  const sessions = await db.getSessions();
  const embed = buildManagementEmbed(sessions, currentWeekMonday);

  if (managementMessageId) {
    try {
      await ch.editMessage(managementMessageId, { embeds: [embed], components: MANAGEMENT_BUTTONS });
      return;
    } catch { managementMessageId = null; }
  }
  const msg = await ch.createMessage({ embeds: [embed], components: MANAGEMENT_BUTTONS });
  managementMessageId = msg.id;
  await db.setMessageId("management", msg.id);
}

async function refreshTimetable(cfgOverride) {
  const cfg = cfgOverride ?? await db.getAllConfig();
  const ch = await getChannel(cfg.timetable_channel);
  if (!ch) return;
  const sessions = await db.getSessions();
  const embed = buildTimetableEmbed(sessions, currentWeekMonday);

  if (timetableMessageId) {
    try {
      await ch.editMessage(timetableMessageId, { embeds: [embed] });
      return;
    } catch { timetableMessageId = null; }
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

// ─── Session List for Buttons ─────────────────────────────────────────────────

// Returns available sessions for a given action:
// host: sessions where host is null
// cohost: sessions where host exists but cohost is null
// remove: sessions where the user is host or cohost
function getAvailableSessions(sessions, action, userId) {
  if (action === "host") return sessions.filter(s => !s.host);
  if (action === "cohost") return sessions.filter(s => s.host && !s.cohost);
  if (action === "remove") return sessions.filter(s => s.host === userId || s.cohost === userId);
  return [];
}

function buildSessionListComponents(available, action, type) {
  const filtered = available.filter(s => s.type === type);
  if (filtered.length === 0) return null;

  const rows = [];
  let row = { type: 1, components: [] };
  for (const s of filtered) {
    if (row.components.length === 5) { rows.push(row); row = { type: 1, components: [] }; }
    if (rows.length >= 4) break; // max 4 rows of sessions + 0 nav = 20 slots
    const ts = getSessionTimestamp(currentWeekMonday, s.day, s.hour);
    const label = `<t:${ts}:t> ${s.day.slice(0, 3)}`;
    // label can't have < > in buttons, use readable format instead
    const readableLabel = `${s.day.slice(0, 3)} ${String(s.hour).padStart(2, "0")}:00`;
    row.components.push({
      type: 2,
      label: readableLabel,
      // Show timestamp in description via customID — user sees local time in embed
      style: 1,
      customID: `mgmt_claim_${action}_${s.type}_${s.day}_${s.hour}`
    });
  }
  if (row.components.length > 0) rows.push(row);
  return rows.length > 0 ? rows : null;
}

function buildSessionListEmbed(available, action, type, weekMonday) {
  const filtered = available.filter(s => s.type === type);
  const lines = filtered.map(s => {
    const ts = getSessionTimestamp(weekMonday, s.day, s.hour);
    const host = s.host ? `<@${s.host}>` : "—";
    const cohost = s.cohost ? `<@${s.cohost}>` : "—";
    return `<t:${ts}:F> — Host: ${host} | Co-Host: ${cohost}`;
  });

  return {
    title: `${type === "Shift" ? "🔶" : "🔷"} Available ${type} Sessions — ${action}`,
    description: lines.length > 0 ? lines.join("\n") : "No available sessions.",
    color: type === "Shift" ? 0xffa500 : 0x5865f2,
    footer: { text: "Times shown in your local timezone" }
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
    if (!ts || ts < now - 120) continue; // skip past sessions

    const isShift = session.type === "Shift";
    const announceChannelId = isShift ? cfg.shift_announce_channel : cfg.train_announce_channel;
    const pingEnabled = (isShift ? cfg.shift_ping_enabled : cfg.train_ping_enabled) !== "false";
    const pingRolesCsv = isShift ? cfg.shift_ping_role : cfg.train_ping_role;
    const pingContent = pingEnabled ? buildPingContent(pingRolesCsv) : "";

    const announceChannel = await getChannel(announceChannelId);
    if (!announceChannel) continue;

    const host = `<@${session.host}>`;
    const cohost = session.cohost ? `<@${session.cohost}>` : "None";

    const warn1Min = parseInt(isShift ? (cfg.shift_warn1_min ?? "30") : (cfg.train_warn1_min ?? "30"));
    const warn2Min = parseInt(isShift ? (cfg.shift_warn2_min ?? "10") : (cfg.train_warn2_min ?? "10"));

    const checks = [
      { key: "warn1", triggerTs: ts - warn1Min * 60, msg: isShift ? (cfg.shift_warn1_msg ?? `Shift starts in ${warn1Min} minutes!`) : (cfg.train_warn1_msg ?? `Training starts in ${warn1Min} minutes!`) },
      { key: "warn2", triggerTs: ts - warn2Min * 60, msg: isShift ? (cfg.shift_warn2_msg ?? `Shift starts in ${warn2Min} minutes!`) : (cfg.train_warn2_msg ?? `Training starts in ${warn2Min} minutes!`) },
      { key: "main",  triggerTs: ts,                 msg: isShift ? (cfg.shift_announce_msg ?? "A shift is starting now!") : (cfg.train_announce_msg ?? "A training is starting now!") }
    ];

    for (const check of checks) {
      const announcementKey = `${session.type}_${session.day}_${session.hour}_${check.key}`;
      // Fire if we're within a 90-second window of the trigger time
      if (!sentAnnouncements.has(announcementKey) && now >= check.triggerTs && now < check.triggerTs + 90) {
        sentAnnouncements.add(announcementKey);
        const embed = {
          title: `${isShift ? "🔶 Shift" : "🔷 Training"} Announcement — Union™`,
          description: check.msg,
          color: isShift ? 0xffa500 : 0x5865f2,
          fields: [
            { name: "Time", value: `<t:${ts}:F>`, inline: true },
            { name: "Host", value: host, inline: true },
            { name: "Co-Host", value: cohost, inline: true }
          ],
          footer: { text: "Union™ · Session Announcement" }
        };
        await announceChannel.createMessage({ content: pingContent || undefined, embeds: [embed] });
      }
    }
  }
}

// ─── Interactions ─────────────────────────────────────────────────────────────

client.on("interactionCreate", async (interaction) => {
  try {
    const cfg = await db.getAllConfig();

    // ── Slash Commands ──────────────────────────────────────────────────────
    if (interaction.type === 2) {
      const cmd = interaction.data.name;

      if (cmd === "setup") {
        const ch = interaction.channel;
        const msg = await sendSetupPanel(ch);
        setupPanels.set(ch.id, msg.id);
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
    }

    // ── Buttons ─────────────────────────────────────────────────────────────
    if (interaction.type === 3 && interaction.data.componentType === 2) {
      const id = interaction.data.customID;

      // Setup navigation
      if (id.startsWith("setup_page_")) {
        const page = parseInt(id.split("_")[2]);
        const ch = interaction.channel;
        const msgId = setupPanels.get(ch.id) ?? interaction.message?.id;
        if (msgId) await updateSetupPanel(ch, msgId, page);
        await apiReply(interaction, { content: "\u200b" });
        return;
      }

      // Setup edit
      if (id.startsWith("setup_edit_")) {
        const key = id.replace("setup_edit_", "");
        const meta = getConfigMeta(key);
        if (!meta) return;
        await apiModal(interaction, {
          custom_id: `setup_modal_${key}`,
          title: `Edit: ${meta.label.slice(0, 45)}`,
          components: [{
            type: 1,
            components: [{
              type: 4,
              custom_id: "value",
              label: meta.label.slice(0, 45),
              style: meta.multiline ? 2 : 1,
              placeholder: meta.desc.slice(0, 100),
              required: false,
              value: cfg[key] ?? ""
            }]
          }]
        });
        return;
      }

      // Management — plan new session buttons
      if (id === "mgmt_plan_shift" || id === "mgmt_plan_training") {
        if (!hasManagementRole(interaction.member, cfg)) {
          await apiReply(interaction, { content: "You don't have permission to plan sessions." });
          return;
        }
        const type = id === "mgmt_plan_shift" ? "Shift" : "Training";
        await apiModal(interaction, {
          custom_id: `plan_modal_${type}`,
          title: `Plan a ${type}`,
          components: [
            { type: 1, components: [{ type: 4, custom_id: "day", label: "Day", style: 1, placeholder: "e.g. Monday", required: true }] },
            { type: 1, components: [{ type: 4, custom_id: "hour", label: "Hour (0-23, Berlin time)", style: 1, placeholder: "e.g. 15", required: true }] }
          ]
        });
        return;
      }

      // Management — host / cohost / remove: show session list
      if (id === "mgmt_host" || id === "mgmt_cohost" || id === "mgmt_remove") {
        const action = id.replace("mgmt_", "");
        const userId = interaction.user?.id ?? interaction.member?.user?.id;
        const sessions = await db.getSessions();
        const available = getAvailableSessions(sessions, action, userId);

        // Show type selector first
        await apiReply(interaction, {
          content: `Select session type:`,
          components: [{
            type: 1,
            components: [
              { type: 2, label: "Shift", style: 3, customID: `mgmt_list_${action}_Shift` },
              { type: 2, label: "Training", style: 1, customID: `mgmt_list_${action}_Training` }
            ]
          }]
        });
        return;
      }

      // Management — show list of available sessions for that type
      if (id.startsWith("mgmt_list_")) {
        const parts = id.split("_");
        const action = parts[2];
        const type = parts[3];
        const userId = interaction.user?.id ?? interaction.member?.user?.id;
        const sessions = await db.getSessions();
        const available = getAvailableSessions(sessions, action, userId);
        const components = buildSessionListComponents(available, action, type);
        const embed = buildSessionListEmbed(available, action, type, currentWeekMonday);

        if (!components) {
          await apiReply(interaction, { content: `No available ${type} sessions for **${action}**.`, embeds: [embed] });
          return;
        }

        await apiReply(interaction, { embeds: [embed], components });
        return;
      }

      // Management — claim a session slot
      if (id.startsWith("mgmt_claim_")) {
        const parts = id.split("_");
        // mgmt_claim_{action}_{type}_{day}_{hour}
        const action = parts[2];
        const type = parts[3];
        const day = parts[4];
        const hour = parseInt(parts[5]);
        const userId = interaction.user?.id ?? interaction.member?.user?.id;

        if (action === "host") {
          await db.setSessionHost(type, day, hour, userId);
          await apiReply(interaction, { content: `✅ You are now **Host** for the ${type} on **${day}** at **${String(hour).padStart(2,"0")}:00**` });
        } else if (action === "cohost") {
          const ok = await db.setSessionCohost(type, day, hour, userId);
          if (!ok) { await apiReply(interaction, { content: "Session no longer available." }); return; }
          await apiReply(interaction, { content: `✅ You are now **Co-Host** for the ${type} on **${day}** at **${String(hour).padStart(2,"0")}:00**` });
        } else if (action === "remove") {
          const result = await db.removeUserFromSession(type, day, hour, userId);
          const msgs = { host_removed: "✅ Removed as Host.", cohost_removed: "✅ Removed as Co-Host.", not_found: "Session not found.", not_yours: "You are not part of that session." };
          await apiReply(interaction, { content: msgs[result] ?? "Unknown error." });
        }

        await refreshAll();
        return;
      }
    }

    // ── Modals ───────────────────────────────────────────────────────────────
    if (interaction.type === 5) {
      const id = interaction.data.customID;

      // Setup save
      if (id.startsWith("setup_modal_")) {
        const key = id.replace("setup_modal_", "");
        const value = getModalValue(interaction, "value");
        if (value) await db.setConfig(key, value);
        const ch = interaction.channel;
        const msgId = setupPanels.get(ch.id) ?? interaction.message?.id;
        if (msgId) await updateSetupPanel(ch, msgId);
        await apiReply(interaction, { content: value ? `✅ **${key}** updated.` : "No changes made." });
        return;
      }

      // Plan modal
      if (id.startsWith("plan_modal_")) {
        const type = id.replace("plan_modal_", "");
        const day = getModalValue(interaction, "day");
        const hour = parseInt(getModalValue(interaction, "hour"));
        if (!DAYS.includes(day) || isNaN(hour) || hour < 0 || hour > 23) {
          await apiReply(interaction, { content: "Invalid day or hour." });
          return;
        }
        await db.upsertSession(type, day, hour);
        await apiReply(interaction, { content: `✅ **${type}** planned for **${day}** at **${String(hour).padStart(2,"0")}:00** (Berlin time)` });
        await refreshAll();
        return;
      }

      // Cancel modal
      if (id === "cancel_modal") {
        const type = getModalValue(interaction, "type");
        const day = getModalValue(interaction, "day");
        const hour = parseInt(getModalValue(interaction, "hour"));
        if (!["Shift", "Training"].includes(type) || !DAYS.includes(day) || isNaN(hour)) {
          await apiReply(interaction, { content: "Invalid input." });
          return;
        }
        await db.cancelSession(type, day, hour);
        ["main", "warn1", "warn2"].forEach(w => sentAnnouncements.delete(`${type}_${day}_${hour}_${w}`));
        await apiReply(interaction, { content: `✅ **${type}** on **${day}** at **${String(hour).padStart(2,"0")}:00** cancelled.` });
        await refreshAll();
        return;
      }
    }
  } catch (err) {
    console.error("Interaction error:", err);
  }
});

// ─── Ready ────────────────────────────────────────────────────────────────────

client.on("ready", async () => {
  console.log(`Union™ Bot ready as ${client.user.tag}`);
  await db.init();

  const cfg = await db.getAllConfig();

  // Restore message IDs from DB — no new messages sent on restart
  managementMessageId = await db.getMessageId("management");
  timetableMessageId = await db.getMessageId("timetable");

  // Verify they still exist, reset if deleted
  if (managementMessageId) {
    const ch = await getChannel(cfg.management_channel);
    if (ch) {
      try { await ch.getMessage(managementMessageId); }
      catch { managementMessageId = null; }
    }
  }
  if (timetableMessageId) {
    const ch = await getChannel(cfg.timetable_channel);
    if (ch) {
      try { await ch.getMessage(timetableMessageId); }
      catch { timetableMessageId = null; }
    }
  }

  await refreshAll();

  // Announcement check every 60 seconds
  setInterval(checkAnnouncements, 60 * 1000);

  // Weekly rollover
  setInterval(async () => {
    const newMonday = getWeekStart(new Date());
    if (newMonday.getTime() !== currentWeekMonday.getTime()) {
      currentWeekMonday = newMonday;
      sentAnnouncements.clear();
      managementMessageId = null;
      timetableMessageId = null;
      await db.setMessageId("management", "");
      await db.setMessageId("timetable", "");
      console.log("Week rolled over");
      await refreshAll();
    }
  }, 60 * 1000);
});

client.connect();
