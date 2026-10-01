const db = require("./db");

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

function buildTimetableEmbed(sessions, weekMonday) {
  const weekEnd = new Date(weekMonday);
  weekEnd.setDate(weekEnd.getDate() + 6);
  const wsTs = Math.floor(weekMonday.getTime() / 1000);
  const weTs = Math.floor(weekEnd.getTime() / 1000);

  const shiftLines = [];
  const trainingLines = [];

  for (const day of DAYS) {
    const dayTs = Math.floor(getDateForWeekday(weekMonday, day).getTime() / 1000);
    shiftLines.push(`**${day} — <t:${dayTs}:d>**`);
    trainingLines.push(`**${day} — <t:${dayTs}:d>**`);

    const shifts = sessions.filter(s => s.day === day && s.type === "Shift").sort((a, b) => a.hour - b.hour);
    const trainings = sessions.filter(s => s.day === day && s.type === "Training").sort((a, b) => a.hour - b.hour);

    if (shifts.length === 0) {
      shiftLines.push("No sessions");
    } else {
      for (const s of shifts) {
        const ts = getSessionTimestamp(weekMonday, s.day, s.hour);
        const host = s.host ? `<@${s.host}>` : "No host";
        const cohost = s.cohost ? `<@${s.cohost}>` : "None";
        shiftLines.push(`🟠 <t:${ts}:t> — Host: ${host} | Co-Host: ${cohost}`);
      }
    }

    if (trainings.length === 0) {
      trainingLines.push("No sessions");
    } else {
      for (const s of trainings) {
        const ts = getSessionTimestamp(weekMonday, s.day, s.hour);
        const host = s.host ? `<@${s.host}>` : "No host";
        const cohost = s.cohost ? `<@${s.cohost}>` : "None";
        trainingLines.push(`🟠 <t:${ts}:t> — Host: ${host} | Co-Host: ${cohost}`);
      }
    }

    shiftLines.push("");
    trainingLines.push("");
  }

  return {
    title: `📅 Weekly Timetable — Union™`,
    description: `<t:${wsTs}:d> – <t:${weTs}:d>`,
    color: 0xffa500,
    fields: [
      { name: "🔶 Shifts", value: shiftLines.join("\n") || "No sessions", inline: true },
      { name: "🔷 Trainings", value: trainingLines.join("\n") || "No sessions", inline: true }
    ],
    footer: { text: "Union™ · Updated automatically" }
  };
}

function buildManagementEmbed(sessions, weekMonday) {
  const shiftLines = [];
  const trainingLines = [];

  for (const day of DAYS) {
    const dayTs = Math.floor(getDateForWeekday(weekMonday, day).getTime() / 1000);
    shiftLines.push(`**${day} — <t:${dayTs}:d>**`);
    trainingLines.push(`**${day} — <t:${dayTs}:d>**`);

    const shifts = sessions.filter(s => s.day === day && s.type === "Shift").sort((a, b) => a.hour - b.hour);
    const trainings = sessions.filter(s => s.day === day && s.type === "Training").sort((a, b) => a.hour - b.hour);

    if (shifts.length === 0) {
      shiftLines.push("No sessions");
    } else {
      for (const s of shifts) {
        const ts = getSessionTimestamp(weekMonday, s.day, s.hour);
        const host = s.host ? `<@${s.host}>` : "No host";
        const cohost = s.cohost ? `<@${s.cohost}>` : "None";
        shiftLines.push(`🟠 <t:${ts}:f> — Host: ${host} | Co-Host: ${cohost}`);
      }
    }

    if (trainings.length === 0) {
      trainingLines.push("No sessions");
    } else {
      for (const s of trainings) {
        const ts = getSessionTimestamp(weekMonday, s.day, s.hour);
        const host = s.host ? `<@${s.host}>` : "No host";
        const cohost = s.cohost ? `<@${s.cohost}>` : "None";
        trainingLines.push(`🟠 <t:${ts}:f> — Host: ${host} | Co-Host: ${cohost}`);
      }
    }

    shiftLines.push("");
    trainingLines.push("");
  }

  return {
    title: "📋 Session Management — Union™",
    color: 0x00cc66,
    fields: [
      { name: "🔶 Shifts", value: shiftLines.join("\n") || "No sessions", inline: true },
      { name: "🔷 Trainings", value: trainingLines.join("\n") || "No sessions", inline: true }
    ],
    footer: { text: "Union™ · Use buttons below to manage sessions" }
  };
}

const MANAGEMENT_BUTTONS = {
  type: 1,
  components: [
    { type: 2, label: "Host", style: 3, customID: "mgmt_host" },
    { type: 2, label: "Co-Host", style: 1, customID: "mgmt_cohost" },
    { type: 2, label: "Remove", style: 4, customID: "mgmt_remove" }
  ]
};

module.exports = { DAYS, getWeekStart, getDateForWeekday, getSessionTimestamp, buildTimetableEmbed, buildManagementEmbed, MANAGEMENT_BUTTONS };
