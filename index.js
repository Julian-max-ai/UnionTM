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
// Track which setup panels exist: channelId -> messageId
const setupPanels = new Map();
// Track sent announcement message IDs to avoid duplicates: `${type}_${day}_${hour}_${warn}` -> true
const sentAnnouncements = new Set();

// ─── Helpers ────────────────────────────────────────────────────────────────

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

async function hasManagementRole(member, cfg) {
  if (!cfg.management_role) return true; // no role configured = everyone can use
  return member?.roles?.includes(cfg.management_role) ?? false;
}

// ─── Timetable & Management Updates ─────────────────────────────────────────

async function refreshManagement(cfg) {
  const ch = await getChannel(cfg?.management_channel ?? await db.getConfig("management_channel"));
  if (!ch) return;
  const sessions = await db.getSessions();
  const embed = buildManagementEmbed(sessions, currentWeekMonday);

  if (managementMessageId) {
    try {
      await ch.editMessage(managementMessageId, { embeds: [embed], components: [MANAGEMENT_BUTTONS] });
      return;
    } catch { managementMessageId = null; }
  }
  const msg = await ch.createMessage({ embeds: [embed], components: [MANAGEMENT_BUTTONS] });
  managementMessageId = msg.id;
}

async function refreshTimetable(cfg) {
  const ch = await getChannel(cfg?.timetable_channel ?? await db.getConfig("timetable_channel"));
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
}

async function refreshAll() {
  const cfg = await db.getAllConfig();
  await refreshManagement(cfg);
  await refreshTimetable(cfg);
}

// ─── Announcement Scheduler ──────────────────────────────────────────────────

async function checkAnnouncements() {
  const cfg = await db.getAllConfig();
  const sessions = await db.getSessions();
  const now = Math.floor(Date.now() / 1000);

  const warn1Min = parseInt(cfg.announce_warn1_min ?? "30");
  const warn2Min = parseInt(cfg.announce_warn2_min ?? "10");

  for (const session of sessions) {
    if (!session.host) continue; // only announced sessions that have a host (claimed)

    const ts = getSessionTimestamp(currentWeekMonday, session.day, session.hour);
    if (!ts) continue;

    const isShift = session.type === "Shift";
    const announceChannelId = isShift ? cfg.shift_announce_channel : cfg.train_announce_channel;
    const pingRoleId = isShift ? cfg.shift_ping_role : cfg.train_ping_role;
    const pingEnabled = (isShift ? cfg.shift_ping_enabled : cfg.train_ping_enabled) !== "false";

    const announceChannel = await getChannel(announceChannelId);
    if (!announceChannel) continue;

    const host = session.host ? `<@${session.host}>` : "No host";
    const cohost = session.cohost ? `<@${session.cohost}>` : "None";
    const pingText = pingEnabled && pingRoleId ? `<@&${pingRoleId}>` : "";

    // Main announcement — send when session starts (ts === now within 60s window)
    const mainKey = `${session.type}_${session.day}_${session.hour}_main`;
    if (!sentAnnouncements.has(mainKey) && now >= ts && now < ts + 60) {
      sentAnnouncements.add(mainKey);
      const msgText = isShift ? (cfg.shift_announce_msg ?? "A shift is starting now!") : (cfg.train_announce_msg ?? "A training is starting now!");
      const embed = buildAnnouncementEmbed(session, msgText, host, cohost, ts, isShift ? 0xffa500 : 0x5865f2);
      await announceChannel.createMessage({ content: pingText || undefined, embeds: [embed] });
    }

    // Warning 1
    const w1Key = `${session.type}_${session.day}_${session.hour}_warn1`;
    const w1Ts = ts - warn1Min * 60;
    if (!sentAnnouncements.has(w1Key) && now >= w1Ts && now < w1Ts + 60) {
      sentAnnouncements.add(w1Key);
      const msgText = isShift ? (cfg.shift_warn1_msg ?? `Shift starts in ${warn1Min} minutes!`) : (cfg.train_warn1_msg ?? `Training starts in ${warn1Min} minutes!`);
      const embed = buildAnnouncementEmbed(session, msgText, host, cohost, ts, isShift ? 0xffa500 : 0x5865f2);
      await announceChannel.createMessage({ content: pingText || undefined, embeds: [embed] });
    }

    // Warning 2
    const w2Key = `${session.type}_${session.day}_${session.hour}_warn2`;
    const w2Ts = ts - warn2Min * 60;
    if (!sentAnnouncements.has(w2Key) && now >= w2Ts && now < w2Ts + 60) {
      sentAnnouncements.add(w2Key);
      const msgText = isShift ? (cfg.shift_warn2_msg ?? `Shift starts in ${warn2Min} minutes!`) : (cfg.train_warn2_msg ?? `Training starts in ${warn2Min} minutes!`);
      const embed = buildAnnouncementEmbed(session, msgText, host, cohost, ts, isShift ? 0xffa500 : 0x5865f2);
      await announceChannel.createMessage({ content: pingText || undefined, embeds: [embed] });
    }
  }
}

function buildAnnouncementEmbed(session, message, host, cohost, ts, color) {
  return {
    title: `${session.type === "Shift" ? "🔶 Shift" : "🔷 Training"} Announcement — Union™`,
    description: message,
    color,
    fields: [
      { name: "Time", value: `<t:${ts}:F>`, inline: true },
      { name: "Host", value: host, inline: true },
      { name: "Co-Host", value: cohost, inline: true }
    ],
    footer: { text: "Union™ · Session Announcement" }
  };
}

// ─── Interaction Handler ─────────────────────────────────────────────────────

client.on("interactionCreate", async (interaction) => {
  try {
    const cfg = await db.getAllConfig();

    // ── Slash Commands ──
    if (interaction.type === 2) {
      const cmd = interaction.data.name;

      if (cmd === "setup") {
        const ch = interaction.channel;
        const msg = await sendSetupPanel(ch);
        setupPanels.set(ch.id, msg.id);
        await apiReply(interaction, { content: "Setup panel opened!", flags: 64 });
        return;
      }

      if (cmd === "plan") {
        if (!(await hasManagementRole(interaction.member, cfg))) {
          await apiReply(interaction, { content: "You don't have permission to plan sessions." });
          return;
        }
        // Show modal to plan a session
        await apiModal(interaction, {
          custom_id: "plan_modal",
          title: "Plan a Session",
          components: [
            { type: 1, components: [{ type: 4, custom_id: "type", label: "Type (Shift / Training)", style: 1, placeholder: "Shift", required: true }] },
            { type: 1, components: [{ type: 4, custom_id: "day", label: "Day", style: 1, placeholder: "e.g. Monday", required: true }] },
            { type: 1, components: [{ type: 4, custom_id: "hour", label: "Hour (0-23, Berlin time)", style: 1, placeholder: "e.g. 15", required: true }] }
          ]
        });
        return;
      }

      if (cmd === "cancel") {
        if (!(await hasManagementRole(interaction.member, cfg))) {
          await apiReply(interaction, { content: "You don't have permission to cancel sessions." });
          return;
        }
        await apiModal(interaction, {
          custom_id: "cancel_modal",
          title: "Cancel a Session",
          components: [
            { type: 1, components: [{ type: 4, custom_id: "type", label: "Type (Shift / Training)", style: 1, placeholder: "Shift", required: true }] },
            { type: 1, components: [{ type: 4, custom_id: "day", label: "Day", style: 1, placeholder: "e.g. Monday", required: true }] },
            { type: 1, components: [{ type: 4, custom_id: "hour", label: "Hour (0-23)", style: 1, placeholder: "e.g. 15", required: true }] }
          ]
        });
        return;
      }
    }

    // ── Buttons ──
    if (interaction.type === 3 && interaction.data.componentType === 2) {
      const id = interaction.data.customID;

      // Setup page navigation
      if (id.startsWith("setup_page_")) {
        const page = parseInt(id.split("_")[2]);
        const ch = interaction.channel;
        const msgId = setupPanels.get(ch.id) ?? interaction.message?.id;
        if (msgId) await updateSetupPanel(ch, msgId, page);
        await apiReply(interaction, { content: "\u200b" }); // silent ack
        return;
      }

      // Setup edit button — open modal for that config key
      if (id.startsWith("setup_edit_")) {
        const key = id.replace("setup_edit_", "");
        const meta = getConfigMeta(key);
        if (!meta) return;
        await apiModal(interaction, {
          custom_id: `setup_modal_${key}`,
          title: `Edit: ${meta.label}`,
          components: [{
            type: 1,
            components: [{
              type: 4,
              custom_id: "value",
              label: meta.label,
              style: 1,
              placeholder: meta.desc,
              required: true,
              value: cfg[key] ?? ""
            }]
          }]
        });
        return;
      }

      // Management buttons
      if (id === "mgmt_host" || id === "mgmt_cohost" || id === "mgmt_remove") {
        const action = id.replace("mgmt_", "");
        await apiReply(interaction, {
          content: `Select session type for **${action}**:`,
          components: [{
            type: 1,
            components: [
              { type: 2, label: "Shift", style: 3, customID: `mgmt_type_${action}_Shift` },
              { type: 2, label: "Training", style: 1, customID: `mgmt_type_${action}_Training` }
            ]
          }]
        });
        return;
      }

      if (id.startsWith("mgmt_type_")) {
        const parts = id.split("_");
        const action = parts[2];
        const type = parts[3];
        await apiModal(interaction, {
          custom_id: `mgmt_modal_${action}_${type}`,
          title: `${action.charAt(0).toUpperCase() + action.slice(1)} — ${type}`,
          components: [
            { type: 1, components: [{ type: 4, custom_id: "day", label: "Day", style: 1, placeholder: "e.g. Monday", required: true }] },
            { type: 1, components: [{ type: 4, custom_id: "hour", label: "Hour (0-23)", style: 1, placeholder: "e.g. 15", required: true }] }
          ]
        });
        return;
      }
    }

    // ── Modals ──
    if (interaction.type === 5) {
      const id = interaction.data.customID;
      const getValue = (key) => interaction.data.components.raw.find(c => c.components[0].customID === key)?.components[0].value?.trim() ?? "";

      // Setup modal save
      if (id.startsWith("setup_modal_")) {
        const key = id.replace("setup_modal_", "");
        const value = getValue("value");
        await db.setConfig(key, value);
        // Refresh setup panel
        const ch = interaction.channel;
        const msgId = setupPanels.get(ch.id) ?? interaction.message?.id;
        if (msgId) await updateSetupPanel(ch, msgId);
        await apiReply(interaction, { content: `✅ **${key}** updated to \`${value}\`` });
        return;
      }

      // Plan modal
      if (id === "plan_modal") {
        const type = getValue("type");
        const day = getValue("day");
        const hour = parseInt(getValue("hour"));
        if (!["Shift", "Training"].includes(type) || !DAYS.includes(day) || isNaN(hour) || hour < 0 || hour > 23) {
          await apiReply(interaction, { content: "Invalid input. Type must be Shift or Training, day a valid weekday, hour 0-23." });
          return;
        }
        await db.upsertSession(type, day, hour, null, null);
        await apiReply(interaction, { content: `✅ **${type}** planned for **${day}** at **${hour}:00**` });
        await refreshAll();
        return;
      }

      // Cancel modal
      if (id === "cancel_modal") {
        const type = getValue("type");
        const day = getValue("day");
        const hour = parseInt(getValue("hour"));
        if (!["Shift", "Training"].includes(type) || !DAYS.includes(day) || isNaN(hour)) {
          await apiReply(interaction, { content: "Invalid input." });
          return;
        }
        await db.cancelSession(type, day, hour);
        // Remove any pending announcement keys for this session so they don't fire
        ["main", "warn1", "warn2"].forEach(w => sentAnnouncements.delete(`${type}_${day}_${hour}_${w}`));
        await apiReply(interaction, { content: `✅ **${type}** on **${day}** at **${hour}:00** cancelled.` });
        await refreshAll();
        return;
      }

      // Management modals (host / cohost / remove)
      if (id.startsWith("mgmt_modal_")) {
        const parts = id.split("_");
        const action = parts[2];
        const type = parts[3];
        const day = getValue("day");
        const hour = parseInt(getValue("hour"));

        if (!DAYS.includes(day) || isNaN(hour) || hour < 0 || hour > 23) {
          await apiReply(interaction, { content: "Invalid day or hour." });
          return;
        }

        const userId = interaction.user?.id ?? interaction.member?.user?.id;

        if (action === "host") {
          await db.setSessionHost(type, day, hour, userId);
          await apiReply(interaction, { content: `✅ You are now **Host** for the ${type} on **${day}** at **${hour}:00**` });
        } else if (action === "cohost") {
          const ok = await db.setSessionCohost(type, day, hour, userId);
          if (!ok) { await apiReply(interaction, { content: "No session found for that day/hour/type." }); return; }
          await apiReply(interaction, { content: `✅ You are now **Co-Host** for the ${type} on **${day}** at **${hour}:00**` });
        } else if (action === "remove") {
          const result = await db.removeSession(type, day, hour, userId);
          const messages = {
            removed: `✅ Session removed.`,
            cohost_removed: `✅ You have been removed as Co-Host.`,
            not_found: "No session found.",
            not_yours: "You are not part of that session."
          };
          await apiReply(interaction, { content: messages[result] ?? "Unknown error." });
        }

        await refreshAll();
        return;
      }
    }
  } catch (err) {
    console.error("Interaction error:", err);
  }
});

// ─── Ready ───────────────────────────────────────────────────────────────────

client.on("ready", async () => {
  console.log(`Union™ Bot ready as ${client.user.tag}`);

  await db.init();

  // Restore existing message IDs
  const cfg = await db.getAllConfig();
  const mgmtCh = await getChannel(cfg.management_channel);
  if (mgmtCh) {
    const msgs = await mgmtCh.getMessages({ limit: 50 });
    for (const m of msgs) {
      if (m.author.id === client.user.id && m.embeds?.[0]?.title?.includes("Session Management")) {
        managementMessageId = m.id; break;
      }
    }
  }
  const ttCh = await getChannel(cfg.timetable_channel);
  if (ttCh) {
    const msgs = await ttCh.getMessages({ limit: 50 });
    for (const m of msgs) {
      if (m.author.id === client.user.id && m.embeds?.[0]?.title?.includes("Weekly Timetable")) {
        timetableMessageId = m.id; break;
      }
    }
  }

  await refreshAll();

  // Check announcements every 30 seconds
  setInterval(checkAnnouncements, 30 * 1000);

  // Weekly rollover check
  setInterval(async () => {
    const newMonday = getWeekStart(new Date());
    if (newMonday.getTime() !== currentWeekMonday.getTime()) {
      currentWeekMonday = newMonday;
      sentAnnouncements.clear();
      managementMessageId = null;
      timetableMessageId = null;
      console.log("Week rolled over — refreshing timetable");
      await refreshAll();
    }
  }, 60 * 1000);
});

client.connect();
