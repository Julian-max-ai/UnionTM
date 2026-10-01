const { createClient } = require("@libsql/client");

const db = createClient({
  url: process.env.TURSO_URL,
  authToken: process.env.TURSO_TOKEN
});

async function init() {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS config (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    )
  `);
  await db.execute(`
    CREATE TABLE IF NOT EXISTS sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT NOT NULL,
      day TEXT NOT NULL,
      hour INTEGER NOT NULL,
      host TEXT,
      cohost TEXT,
      cancelled INTEGER DEFAULT 0
    )
  `);
}

async function getConfig(key) {
  const res = await db.execute({ sql: "SELECT value FROM config WHERE key = ?", args: [key] });
  return res.rows[0]?.value ?? null;
}

async function setConfig(key, value) {
  await db.execute({
    sql: "INSERT INTO config (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value",
    args: [key, String(value)]
  });
}

async function getAllConfig() {
  const res = await db.execute("SELECT key, value FROM config");
  const cfg = {};
  for (const row of res.rows) cfg[row.key] = row.value;
  return cfg;
}

async function getSessions() {
  const res = await db.execute("SELECT * FROM sessions WHERE cancelled = 0");
  return res.rows.map(r => ({
    id: r.id,
    type: r.type,
    day: r.day,
    hour: r.hour,
    host: r.host,
    cohost: r.cohost
  }));
}

async function upsertSession(type, day, hour, host, cohost) {
  const existing = await db.execute({
    sql: "SELECT id FROM sessions WHERE type = ? AND day = ? AND hour = ? AND cancelled = 0",
    args: [type, day, hour]
  });
  if (existing.rows.length > 0) {
    await db.execute({
      sql: "UPDATE sessions SET host = COALESCE(?, host), cohost = COALESCE(?, cohost) WHERE id = ?",
      args: [host, cohost, existing.rows[0].id]
    });
    return existing.rows[0].id;
  } else {
    const res = await db.execute({
      sql: "INSERT INTO sessions (type, day, hour, host, cohost) VALUES (?, ?, ?, ?, ?)",
      args: [type, day, hour, host ?? null, cohost ?? null]
    });
    return res.lastInsertRowid;
  }
}

async function setSessionHost(type, day, hour, userId) {
  await upsertSession(type, day, hour, userId, null);
}

async function setSessionCohost(type, day, hour, userId) {
  const res = await db.execute({
    sql: "SELECT id FROM sessions WHERE type = ? AND day = ? AND hour = ? AND cancelled = 0",
    args: [type, day, hour]
  });
  if (res.rows.length === 0) return false;
  await db.execute({
    sql: "UPDATE sessions SET cohost = ? WHERE id = ?",
    args: [userId, res.rows[0].id]
  });
  return true;
}

async function removeSession(type, day, hour, userId) {
  const res = await db.execute({
    sql: "SELECT * FROM sessions WHERE type = ? AND day = ? AND hour = ? AND cancelled = 0",
    args: [type, day, hour]
  });
  if (res.rows.length === 0) return "not_found";
  const s = res.rows[0];
  if (s.host === userId) {
    await db.execute({ sql: "UPDATE sessions SET cancelled = 1 WHERE id = ?", args: [s.id] });
    return "removed";
  }
  if (s.cohost === userId) {
    await db.execute({ sql: "UPDATE sessions SET cohost = NULL WHERE id = ?", args: [s.id] });
    return "cohost_removed";
  }
  return "not_yours";
}

async function cancelSession(type, day, hour) {
  await db.execute({
    sql: "UPDATE sessions SET cancelled = 1 WHERE type = ? AND day = ? AND hour = ? AND cancelled = 0",
    args: [type, day, hour]
  });
}

module.exports = { init, getConfig, setConfig, getAllConfig, getSessions, upsertSession, setSessionHost, setSessionCohost, removeSession, cancelSession };
