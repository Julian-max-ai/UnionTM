const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function getWeekStart(date) {
  const d = new Date(date);
  const day = (d.getDay() + 6) % 7;
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - day);
  return d;
}

function getDateForWeekday(weekMonday, day) {
  const idx = DAYS.indexOf(day);
  if (idx === -1) return null;
  const d = new Date(weekMonday);
  d.setDate(d.getDate() + idx);
  return d;
}

function getSessionTimestamp(weekMonday, day, hour) {
  const date = getDateForWeekday(weekMonday, day);
  if (!date) return null;
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const h = String(hour).padStart(2, "0");
  const utcDate = new Date(`${y}-${m}-${dd}T${h}:00:00Z`);
  const berlinDate = new Date(utcDate.toLocaleString("en-US", { timeZone: "Europe/Berlin" }));
  const diff = utcDate.getTime() - berlinDate.getTime();
  return Math.floor((utcDate.getTime() + diff) / 1000);
}

function buildDayField(sessions, weekMonday, day, type) {
  const list = sessions.filter(s => s.day === day && s.type === type).sort((a, b) => a.hour - b.hour);
  if (list.length === 0) return "—";
  return list.map(s => {
    const ts = getSessionTimestamp(weekMonday, s.day, s.hour);
    const host = s.host ? `<@${s.host}>` : "/";
    const cohost = s.cohost ? `<@${s.cohost}>` : "/";
    return `<t:${ts}:t> · H: ${host} · C: ${cohost}`;
  }).join("\n");
}

function buildPublicDayValue(sessions, weekMonday, day) {
  const list = [
    ...sessions.filter(s => s.day === day && s.type === "Shift" && s.host).sort((a, b) => a.hour - b.hour).map(s => ({ ...s, emoji: "🔶" })),
    ...sessions.filter(s => s.day === day && s.type === "Training" && s.host).sort((a, b) => a.hour - b.hour).map(s => ({ ...s, emoji: "🔷" }))
  ];
  if (list.length === 0) return "—";
  return list.map(s => {
    const ts = getSessionTimestamp(weekMonday, s.day, s.hour);
    const host = s.host ? `<@${s.host}>` : "/";
    const cohost = s.cohost ? `<@${s.cohost}>` : "/";
    return `${s.emoji} <t:${ts}:t> · <t:${ts}:R> · ${host} & ${cohost}`;
  }).join("\n");
}

function buildTimetableEmbed(sessions, weekMonday) {
  const weekEnd = new Date(weekMonday);
  weekEnd.setDate(weekEnd.getDate() + 6);
  const wsTs = Math.floor(weekMonday.getTime() / 1000);
  const weTs = Math.floor(weekEnd.getTime() / 1000);

  const fields = DAYS.map(day => {
    const dayTs = Math.floor(getDateForWeekday(weekMonday, day).getTime() / 1000);
    return { name: `${day} — <t:${dayTs}:d>`, value: buildPublicDayValue(sessions, weekMonday, day), inline: false };
  });

  return {
    title: `📅 Weekly Timetable — Union™`,
    description: `<t:${wsTs}:d> – <t:${weTs}:d>`,
    color: 0xffa500,
    fields,
    thumbnail: { url: "https://media.discordapp.net/attachments/1553849844550869164/1555229752963502240/ChatGPT_Image_Jun_29__2026__09_29_21_PM-removebg-preview.png" },
    footer: { text: "Union™ · Updated automatically" }
  };
}

function buildManagementEmbed(sessions, weekMonday) {
  const fields = [];
  for (const day of DAYS) {
    const dayTs = Math.floor(getDateForWeekday(weekMonday, day).getTime() / 1000);
    fields.push({ name: `🔶 ${day} <t:${dayTs}:d>`, value: buildDayField(sessions, weekMonday, day, "Shift"), inline: true });
    fields.push({ name: `🔷 ${day} <t:${dayTs}:d>`, value: buildDayField(sessions, weekMonday, day, "Training"), inline: true });
    fields.push({ name: "\u200b", value: "\u200b", inline: true });
  }

  return {
    title: "📋 Session Management — Union™",
    color: 0x00cc66,
    fields,
    footer: { text: "Union™ · Use buttons below to sign up or remove yourself" }
  };
}

// Three buttons: Shift, Training, Remove
const MANAGEMENT_BUTTONS = [
  {
    type: 1,
    components: [
      { type: 2, label: "Shift", style: 3, customID: "mgmt_type_Shift" },
      { type: 2, label: "Training", style: 1, customID: "mgmt_type_Training" },
      { type: 2, label: "Remove", style: 4, customID: "mgmt_remove" }
    ]
  }
];

module.exports = { DAYS, getWeekStart, getDateForWeekday, getSessionTimestamp, buildTimetableEmbed, buildManagementEmbed, MANAGEMENT_BUTTONS };
