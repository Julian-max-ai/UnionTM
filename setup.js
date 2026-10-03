const db = require("./db");

// Keys that use the dual-mode announcement editor
const ANNOUNCE_KEYS = new Set([
  "shift_warn1_msg", "shift_warn2_msg", "train_warn1_msg", "train_warn2_msg",
  "shift_announce_msg", "train_announce_msg",
  "promote_dm_msg", "demote_dm_msg"
]);

const CONFIG_KEYS = [
  { key: "management_channel",     label: "Management Channel",             desc: "Channel ID for the session management panel" },
  { key: "timetable_channel",      label: "Timetable Channel",              desc: "Channel ID for the public timetable" },
  { key: "shift_announce_channel", label: "Shift Announcement Channel",     desc: "Channel ID for shift announcements" },
  { key: "train_announce_channel", label: "Training Announcement Channel",  desc: "Channel ID for training announcements" },
  { key: "rank_log_channel",       label: "Rank Log Channel",               desc: "Channel ID for promote/demote logs" },
  { key: "bloxlink_api_key",       label: "Bloxlink API Key",               desc: "API key from blox.link/dashboard for account verification" },
  { key: "ownership_role",         label: "Ownership Role(s)",              desc: "Role ID(s) for setup/tag/reset access — comma-separated" },
  { key: "rank_role",              label: "Rank Management Role(s)",        desc: "Role ID(s) that can promote/demote — comma-separated" },
  { key: "management_role",        label: "Session Management Role(s)",     desc: "Role ID(s) that can plan/cancel sessions — comma-separated" },
  { key: "shift_ping_role",        label: "Shift Ping Role(s)",             desc: "Role ID(s) to ping for shifts — comma-separated" },
  { key: "train_ping_role",        label: "Training Ping Role(s)",          desc: "Role ID(s) to ping for trainings — comma-separated" },
  { key: "shift_ping_enabled",     label: "Shift Ping Enabled",             desc: "true or false" },
  { key: "train_ping_enabled",     label: "Training Ping Enabled",          desc: "true or false" },
  { key: "shift_warn1_min",        label: "Shift Warning 1 (min)",          desc: "Minutes before shift for first warning (e.g. 30)" },
  { key: "shift_warn2_min",        label: "Shift Warning 2 (min)",          desc: "Minutes before shift for second warning (e.g. 10)" },
  { key: "train_warn1_min",        label: "Training Warning 1 (min)",       desc: "Minutes before training for first warning (e.g. 30)" },
  { key: "train_warn2_min",        label: "Training Warning 2 (min)",       desc: "Minutes before training for second warning (e.g. 10)" },
  { key: "shift_warn1_msg",        label: "Shift Warning 1 Message",        desc: "Announcement embed content", announce: true },
  { key: "shift_warn2_msg",        label: "Shift Warning 2 Message",        desc: "Announcement embed content", announce: true },
  { key: "train_warn1_msg",        label: "Training Warning 1 Message",     desc: "Announcement embed content", announce: true },
  { key: "train_warn2_msg",        label: "Training Warning 2 Message",     desc: "Announcement embed content", announce: true },
  { key: "shift_announce_msg",     label: "Shift Announcement Message",     desc: "Announcement embed content", announce: true },
  { key: "train_announce_msg",     label: "Training Announcement Message",  desc: "Announcement embed content", announce: true },
  { key: "shift_announce_image",   label: "Shift Announcement Image URL",   desc: "Image URL shown in shift announcement embed" },
  { key: "train_announce_image",   label: "Training Announcement Image URL",desc: "Image URL shown in training announcement embed" },
  { key: "promote_dm_msg",         label: "Promote DM Message",             desc: "DM sent to user on promotion", announce: true },
  { key: "demote_dm_msg",          label: "Demote DM Message",              desc: "DM sent to user on demotion", announce: true }
];

const PAGE_SIZE = 10;

function buildSetupEmbed(cfg, page) {
  const start = page * PAGE_SIZE;
  const slice = CONFIG_KEYS.slice(start, start + PAGE_SIZE);
  const totalPages = Math.ceil(CONFIG_KEYS.length / PAGE_SIZE);

  return {
    title: "⚙️ Union™ Bot Setup",
    description: `Click a button to edit that setting.\nPage ${page + 1}/${totalPages}\n\n📝 **Announcement messages** support two modes:\n— **Simple:** set Title, Description (supports **bold**, *italic*, \`code\`) and Color\n— **JSON:** paste a full Discord embed JSON for advanced formatting`,
    color: 0x5865f2,
    fields: slice.map(item => ({
      name: item.label,
      value: cfg[item.key] ? (item.announce ? "*Set ✅*" : `\`${cfg[item.key]}\``) : "*Not set*",
      inline: true
    })),
    footer: { text: "Union™ · Setup — multi-role fields accept comma-separated IDs" }
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

// When user clicks an announcement field, show two mode buttons
function buildAnnounceModeComponents(key) {
  return [{
    type: 1,
    components: [
      { type: 2, label: "✏️ Simple (Title + Text + Color)", style: 1, customID: `setup_announce_simple_${key}` },
      { type: 2, label: "{ } JSON Embed", style: 2, customID: `setup_announce_json_${key}` }
    ]
  }];
}

// Parse stored value — could be JSON string or legacy plain text
function parseAnnounceValue(raw) {
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return { description: raw }; }
}

async function sendSetupPanel(channel, page = 0) {
  const cfg = await db.getAllConfig();
  return channel.createMessage({ embeds: [buildSetupEmbed(cfg, page)], components: buildSetupComponents(page) });
}

async function updateSetupPanel(channel, messageId, page = 0) {
  const cfg = await db.getAllConfig();
  try {
    await channel.editMessage(messageId, { embeds: [buildSetupEmbed(cfg, page)], components: buildSetupComponents(page) });
  } catch (e) {
    if (e.code === 10008) return sendSetupPanel(channel, page);
    throw e;
  }
}

function getConfigMeta(key) {
  return CONFIG_KEYS.find(c => c.key === key) ?? null;
}

function isAnnounceKey(key) {
  return ANNOUNCE_KEYS.has(key);
}

module.exports = { CONFIG_KEYS, buildSetupEmbed, buildSetupComponents, buildAnnounceModeComponents, parseAnnounceValue, sendSetupPanel, updateSetupPanel, getConfigMeta, isAnnounceKey };
