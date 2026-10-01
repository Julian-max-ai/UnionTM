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
  const shifts = sessions.filter(s => s.day === day && s.type === "Shift" && s.host).sort((a, b) => a.hour - b.hour);
  const trainings = sessions.filter(s => s.day === day && s.type === "Training" && s.host).sort((a, b) => a.hour - b.hour);
  if (shifts.length === 0 && trainings.length === 0) return "—";
  const lines = [];
  for (const s of shifts) {
    const ts = getSessionTimestamp(weekMonday, s.day, s.hour);
    const host = s.host ? `<@${s.host}>` : "/";
    const cohost = s.cohost ? `<@${s.cohost}>` : "/";
    lines.push(`🔶 <t:${ts}:t> · <t:${ts}:R>\nHost: ${host}\nCo-Host: ${cohost}`);
  }
  for (const s of trainings) {
    const ts = getSessionTimestamp(weekMonday, s.day, s.hour);
    const host = s.host ? `<@${s.host}>` : "/";
    const cohost = s.cohost ? `<@${s.cohost}>` : "/";
    lines.push(`🔷 <t:${ts}:t> · <t:${ts}:R>\nHost: ${host}\nCo-Host: ${cohost}`);
  }
  return lines.join("\n");
}

function buildTimetableEmbed(sessions, weekMonday) {
  const weekEnd = new Date(weekMonday);
  weekEnd.setDate(weekEnd.getDate() + 6);
  const wsTs = Math.floor(weekMonday.getTime() / 1000);
  const weTs = Math.floor(weekEnd.getTime() / 1000);

  const fields = [];
  for (const day of DAYS) {
    const dayTs = Math.floor(getDateForWeekday(weekMonday, day).getTime() / 1000);
    const value = buildPublicDayValue(sessions, weekMonday, day);
    fields.push({ name: `${day} — <t:${dayTs}:d>`, value, inline: false });
  }

  return {
    title: `📅 Weekly Timetable — Union™`,
    description: `<t:${wsTs}:d> – <t:${weTs}:d>`,
    color: 0xffa500,
    fields,
    image: { url: "https://i.imgur.com/T3gfI1g.png" },
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
