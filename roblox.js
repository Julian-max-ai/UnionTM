const GROUP_ID = 125253116;
const BASE  = "https://groups.roblox.com/v1";
const BASE2 = "https://groups.roblox.com/v2";

function cookie() {
  return `.ROBLOSECURITY=${process.env.ROBLOX_COOKIE ?? ""}`;
}

// ─── CSRF token cache ─────────────────────────────────────────────────────────
let _csrf = null;

async function getCsrf() {
  // Always fetch fresh — Roblox returns it on 403 from auth endpoints
  const res = await fetch("https://auth.roblox.com/v2/logout", {
    method: "POST",
    headers: { "Cookie": cookie() }
  });
  const token = res.headers.get("x-csrf-token");
  if (!token) {
    throw new Error(`Cookie invalid or expired (CSRF status ${res.status}). Please update ROBLOX_COOKIE in Render.`);
  }
  _csrf = token;
  return _csrf;
}

// ─── Authenticated fetch ──────────────────────────────────────────────────────
async function rbxAuth(url, opts = {}) {
  const csrf = await getCsrf();
  const res = await fetch(url, {
    ...opts,
    headers: {
      "Cookie": cookie(),
      "Content-Type": "application/json",
      "X-CSRF-TOKEN": csrf,
      ...(opts.headers ?? {})
    }
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Roblox ${res.status} on ${url}: ${text}`);
  }
  const text = await res.text();
  return text ? JSON.parse(text) : {};
}

// ─── Group roles (cached 5 min) ───────────────────────────────────────────────
let _rolesCache = null;
let _rolesCacheTime = 0;

async function getGroupRoles() {
  if (_rolesCache && Date.now() - _rolesCacheTime < 5 * 60 * 1000) return _rolesCache;
  const res = await fetch(`${BASE}/groups/${GROUP_ID}/roles`);
  const data = await res.json();
  _rolesCache = data.roles.sort((a, b) => a.rank - b.rank);
  _rolesCacheTime = Date.now();
  return _rolesCache;
}

// ─── User lookup ──────────────────────────────────────────────────────────────
async function getUserByName(username) {
  const res = await fetch("https://users.roblox.com/v1/usernames/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ usernames: [username], excludeBannedUsers: false })
  });
  const data = await res.json();
  return data.data?.[0] ?? null;
}

async function getUserById(userId) {
  const res = await fetch(`https://users.roblox.com/v1/users/${userId}`);
  const data = await res.json();
  if (!res.ok || data.errors) return null;
  return data;
}

// ─── Member role ──────────────────────────────────────────────────────────────
async function getMemberRole(userId) {
  const res = await fetch(`${BASE2}/users/${userId}/groups/roles`, {
    headers: { "Cookie": cookie() }
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`getMemberRole failed ${res.status}`);
  const entry = data.data?.find(g => g.group.id === GROUP_ID);
  return entry?.role ?? null;
}

async function getCallerRank(robloxUserId) {
  const role = await getMemberRole(robloxUserId);
  return role?.rank ?? 0;
}

// ─── Set rank ─────────────────────────────────────────────────────────────────
async function setMemberRank(userId, roleId) {
  await rbxAuth(`${BASE}/groups/${GROUP_ID}/users/${userId}`, {
    method: "PATCH",
    body: JSON.stringify({ roleId })
  });
}

// ─── Promote / Demote ─────────────────────────────────────────────────────────
async function promoteUser(userId, callerRank) {
  const roles = await getGroupRoles();
  const current = await getMemberRole(userId);
  if (!current) throw new Error("User is not in the group.");

  const currentIdx = roles.findIndex(r => r.rank === current.rank);
  const next = roles.slice(currentIdx + 1).find(r => r.rank < callerRank);
  if (!next) throw new Error("No higher rank available below your rank.");

  await setMemberRank(userId, next.id);
  return { from: current, to: next };
}

async function demoteUser(userId, callerRank) {
  const roles = await getGroupRoles();
  const current = await getMemberRole(userId);
  if (!current) throw new Error("User is not in the group.");
  if (current.rank >= callerRank) throw new Error("You cannot demote someone at or above your rank.");

  const currentIdx = roles.findIndex(r => r.rank === current.rank);
  if (currentIdx <= 0) throw new Error("User is already at the lowest rank.");

  const prev = roles[currentIdx - 1];
  await setMemberRank(userId, prev.id);
  return { from: current, to: prev };
}

// ─── Bloxlink verification ────────────────────────────────────────────────────
// Returns roblox user ID linked to a Discord user ID, or null if not linked
async function getBloxlinkRobloxId(discordUserId) {
  const apiKey = process.env.BLOXLINK_API_KEY;
  if (!apiKey) return null;
  const res = await fetch(`https://api.blox.link/v4/public/discord-to-roblox/${discordUserId}`, {
    headers: { "Authorization": apiKey }
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.robloxID ? String(data.robloxID) : null;
}

// ─── Cookie health check (call on bot start) ──────────────────────────────────
async function validateCookie() {
  try {
    await getCsrf();
    console.log("[rbx] Cookie valid ✅");
  } catch (e) {
    console.error("[rbx] ❌", e.message);
  }
}

module.exports = { getUserByName, getUserById, getMemberRole, getGroupRoles, promoteUser, demoteUser, getCallerRank, getBloxlinkRobloxId, validateCookie };
