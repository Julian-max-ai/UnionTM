const db = require("./db");

const CONFIG_KEYS = [
  { key: "management_channel",     label: "Management Channel",              desc: "Channel ID for the session management panel" },
  { key: "timetable_channel",      label: "Timetable Channel",               desc: "Channel ID for the public timetable" },
  { key: "shift_announce_channel", label: "Shift Announcement Channel",      desc: "Channel ID for shift announcements" },
  { key: "train_announce_channel", label: "Training Announcement Channel",   desc: "Channel ID for training announcements" },
  { key: "management_role",        label: "Management Role(s)",              desc: "Role ID(s) that can plan/cancel sessions — separate multiple with commas" },
  { key: "shift_ping_role",        label: "Shift Ping Role(s)",              desc: "Role ID(s) to ping for shifts — separate multiple with commas" },
  { key: "train_ping_role",        label: "Training Ping Role(s)",           desc: "Role ID(s) to ping for trainings — separate multiple with commas" },
  { key: "shift_ping_enabled",     label: "Shift Ping Enabled",              desc: "true or false" },
  { key: "train_ping_enabled",     label: "Training Ping Enabled",           desc: "true or false" },
  { key: "shift_warn1_min",        label: "Shift — Warning 1 (minutes)",     desc: "Minutes before shift to send first warning (e.g. 30)" },
  { key: "shift_warn2_min",        label: "Shift — Warning 2 (minutes)",     desc: "Minutes before shift to send second warning (e.g. 10)" },
  { key: "train_warn1_min",        label: "Training — Warning 1 (minutes)",  desc: "Minutes before training to send first warning (e.g. 30)" },
  { key: "train_warn2_min",        label: "Training — Warning 2 (minutes)",  desc: "Minutes before training to send second warning (e.g. 10)" },
  { key: "shift_warn1_msg",        label: "Shift Warning 1 Message",         desc: "Message text shown in the embed", multiline: true },
  { key: "shift_warn2_msg",        label: "Shift Warning 2 Message",         desc: "Message text shown in the embed", multiline: true },
  { key: "train_warn1_msg",        label: "Training Warning 1 Message",      desc: "Message text shown in the embed", multiline: true },
  { key: "train_warn2_msg",        label: "Training Warning 2 Message",      desc: "Message text shown in the embed", multiline: true },
  { key: "shift_announce_msg",     label: "Shift Announcement Message",      desc: "Message text for the main shift announcement embed", multiline: true },
  { key: "train_announce_msg",     label: "Training Announcement Message",   desc: "Message text for the main training announcement embed", multiline: true }
];

const PAGE_SIZE = 10;

function buildSetupEmbed(cfg, page) {
  const start = page * PAGE_SIZE;
  const slice = CONFIG_KEYS.slice(start, start + PAGE_SIZE);
  const totalPages = Math.ceil(CONFIG_KEYS.length / PAGE_SIZE);

  return {
    title: "⚙️ Union™ Bot Setup",
    description: `Click a button to edit that setting.\nPage ${page + 1}/${totalPages}`,
    color: 0x5865f2,
    fields: slice.map(item => ({
      name: item.label,
      value: cfg[item.key] ? `\`${cfg[item.key]}\`` : "*Not set*",
      inline: true
    })),
    footer: { text: "Union™ · Setup Panel — multi-role fields accept comma-separated IDs" }
  };
}

function buildSetupComponents(page) {
  const start = page * PAGE_SIZE;
  const slice = CONFIG_KEYS.slice(start, start + PAGE_SIZE);
  const totalPages = Math.ceil(CONFIG_KEYS.length / PAGE_SIZE);
  const rows = [];

  let row = { type: 1, components: [] };
  for (const item of slice) {
    if (row.components.length === 5) { rows.push(row); row = { type: 1, components: [] }; }
    row.components.push({ type: 2, label: item.label.slice(0, 80), style: 2, customID: `setup_edit_${item.key}` });
  }
  if (row.components.length > 0) rows.push(row);

  const navRow = { type: 1, components: [] };
  if (page > 0) navRow.components.push({ type: 2, label: "◀ Previous", style: 2, customID: `setup_page_${page - 1}` });
  if (page < totalPages - 1) navRow.components.push({ type: 2, label: "Next ▶", style: 2, customID: `setup_page_${page + 1}` });
  if (navRow.components.length > 0) rows.push(navRow);

  return rows;
}

async function sendSetupPanel(channel, page = 0) {
  const cfg = await db.getAllConfig();
  return channel.createMessage({ embeds: [buildSetupEmbed(cfg, page)], components: buildSetupComponents(page) });
}

async function updateSetupPanel(channel, messageId, page = 0) {
  const cfg = await db.getAllConfig();
  try {
    await channel.editMessage(messageId, { embeds: [buildSetupEmbed(cfg, page)], components: buildSetupComponents(page) });
  } catch {
    return sendSetupPanel(channel, page);
  }
}

function getConfigMeta(key) {
  return CONFIG_KEYS.find(c => c.key === key) ?? null;
}

module.exports = { CONFIG_KEYS, buildSetupEmbed, buildSetupComponents, sendSetupPanel, updateSetupPanel, getConfigMeta };
