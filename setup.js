const db = require("./db");

// All config keys with labels and descriptions
const CONFIG_KEYS = [
  { key: "management_channel",    label: "Management Channel",         desc: "Channel ID where the session management panel is posted" },
  { key: "timetable_channel",     label: "Timetable Channel",          desc: "Channel ID where the public timetable is posted" },
  { key: "shift_announce_channel",label: "Shift Announcement Channel", desc: "Channel ID for shift announcements" },
  { key: "train_announce_channel",label: "Training Announcement Channel", desc: "Channel ID for training announcements" },
  { key: "management_role",       label: "Management Role",            desc: "Role ID required to plan/cancel sessions" },
  { key: "shift_ping_role",       label: "Shift Ping Role",            desc: "Role ID to ping for shift announcements" },
  { key: "train_ping_role",       label: "Training Ping Role",         desc: "Role ID to ping for training announcements" },
  { key: "shift_ping_enabled",    label: "Shift Ping Enabled",         desc: "Whether to ping for shift announcements (true/false)" },
  { key: "train_ping_enabled",    label: "Training Ping Enabled",      desc: "Whether to ping for training announcements (true/false)" },
  { key: "announce_warn1_min",    label: "First Warning (minutes)",    desc: "Minutes before session to send first announcement (e.g. 30)" },
  { key: "announce_warn2_min",    label: "Second Warning (minutes)",   desc: "Minutes before session to send second announcement (e.g. 10)" },
  { key: "shift_warn1_msg",       label: "Shift Warning 1 Message",    desc: "Embed message text for shift first warning" },
  { key: "shift_warn2_msg",       label: "Shift Warning 2 Message",    desc: "Embed message text for shift second warning" },
  { key: "train_warn1_msg",       label: "Training Warning 1 Message", desc: "Embed message text for training first warning" },
  { key: "train_warn2_msg",       label: "Training Warning 2 Message", desc: "Embed message text for training second warning" },
  { key: "shift_announce_msg",    label: "Shift Announcement Message", desc: "Embed message text for the main shift announcement" },
  { key: "train_announce_msg",    label: "Training Announcement Message", desc: "Embed message text for the main training announcement" }
];

// Split into pages of 5 buttons each (+ 1 nav button = max 5 per row, 5 rows)
const PAGE_SIZE = 10;

function buildSetupEmbed(cfg, page) {
  const start = page * PAGE_SIZE;
  const slice = CONFIG_KEYS.slice(start, start + PAGE_SIZE);

  const fields = slice.map(item => ({
    name: item.label,
    value: cfg[item.key] ? `\`${cfg[item.key]}\`` : "*Not set*",
    inline: true
  }));

  return {
    title: "⚙️ Union™ Bot Setup",
    description: `Configure the bot settings below. Click a button to change a value.\nPage ${page + 1}/${Math.ceil(CONFIG_KEYS.length / PAGE_SIZE)}`,
    color: 0x5865f2,
    fields,
    footer: { text: "Union™ · Setup Panel" }
  };
}

function buildSetupComponents(page) {
  const start = page * PAGE_SIZE;
  const slice = CONFIG_KEYS.slice(start, start + PAGE_SIZE);
  const rows = [];

  // Up to 4 rows of buttons (5 per row), last row for navigation
  let row = { type: 1, components: [] };
  for (let i = 0; i < slice.length; i++) {
    if (row.components.length === 5) {
      rows.push(row);
      row = { type: 1, components: [] };
    }
    row.components.push({
      type: 2,
      label: slice[i].label,
      style: 2,
      customID: `setup_edit_${slice[i].key}`
    });
  }
  if (row.components.length > 0) rows.push(row);

  // Navigation row
  const totalPages = Math.ceil(CONFIG_KEYS.length / PAGE_SIZE);
  const navRow = { type: 1, components: [] };
  if (page > 0) navRow.components.push({ type: 2, label: "◀ Previous", style: 2, customID: `setup_page_${page - 1}` });
  if (page < totalPages - 1) navRow.components.push({ type: 2, label: "Next ▶", style: 2, customID: `setup_page_${page + 1}` });
  if (navRow.components.length > 0) rows.push(navRow);

  return rows;
}

async function sendSetupPanel(channel, page = 0) {
  const cfg = await db.getAllConfig();
  const embed = buildSetupEmbed(cfg, page);
  const components = buildSetupComponents(page);
  return channel.createMessage({ embeds: [embed], components });
}

async function updateSetupPanel(channel, messageId, page = 0) {
  const cfg = await db.getAllConfig();
  const embed = buildSetupEmbed(cfg, page);
  const components = buildSetupComponents(page);
  try {
    await channel.editMessage(messageId, { embeds: [embed], components });
  } catch {
    return sendSetupPanel(channel, page);
  }
}

function getConfigMeta(key) {
  return CONFIG_KEYS.find(c => c.key === key) ?? null;
}

module.exports = { CONFIG_KEYS, buildSetupEmbed, buildSetupComponents, sendSetupPanel, updateSetupPanel, getConfigMeta };
