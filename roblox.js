const GROUP_ID = 125253116;
const BASE = "https://groups.roblox.com/v1";
const BASE2 = "https://groups.roblox.com/v2";
const USERS_BASE = "https://users.roblox.com/v1";

function cookie() {
  return `.ROBLOSECURITY=${process.env.ROBLOX_COOKIE}`;
}

async function rbxFetch(url, opts = {}) {
  const res = await fetch(url, {
    ...opts,
    headers: { "Cookie": cookie(), "Content-Type": "application/json", ...(opts.headers ?? {}) }
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Roblox API ${res.status}: ${text}`);
  }
  return res.json();
}

// Get all roles in the group (cached per process lifetime, refreshed on demand)
let _rolesCache = null;
let _rolesCacheTime = 0;

async function getGroupRoles() {
  if (_rolesCache && Date.now() - _rolesCacheTime < 5 * 60 * 1000) return _rolesCache;
  const data = await rbxFetch(`${BASE}/groups/${GROUP_ID}/roles`);
  _rolesCache = data.roles.sort((a, b) => a.rank - b.rank);
  _rolesCacheTime = Date.now();
  return _rolesCache;
}

async function getUserByName(username) {
  const data = await fetch("https://users.roblox.com/v1/usernames/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ usernames: [username], excludeBannedUsers: false })
  }).then(r => r.json());
  return data.data?.[0] ?? null; // { id, name, displayName }
}

async function getUserById(userId) {
  const res = await fetch(`${USERS_BASE}/users/${userId}`);
  const data = await res.json();
  console.log(`[rbx] getUserById(${userId}) status=${res.status}`, JSON.stringify(data).slice(0, 200));
  if (!res.ok || data.errors) return null;
  return data;
}

async function getMemberRole(userId) {
  const res = await fetch(`${BASE2}/users/${userId}/groups/roles`, {
    headers: { "Cookie": cookie() }
  });
  const data = await res.json();
  console.log(`[rbx] getMemberRole(${userId}) status=${res.status} groups=${data.data?.length ?? "err"}`);
  if (!res.ok) throw new Error(`getMemberRole failed ${res.status}: ${JSON.stringify(data)}`);
  const entry = data.data?.find(g => g.group.id === GROUP_ID);
  console.log(`[rbx] group entry:`, JSON.stringify(entry ?? null));
  return entry?.role ?? null;
}

async function setMemberRank(userId, roleId) {
  const csrfRes = await fetch(`https://auth.roblox.com/v2/logout`, {
    method: "POST",
    headers: { "Cookie": cookie() }
  });
  const csrf = csrfRes.headers.get("x-csrf-token");
  console.log(`[rbx] CSRF status=${csrfRes.status} token=${csrf ? csrf.slice(0,10)+"..." : "NULL"}`);
  if (!csrf) throw new Error(`Failed to get CSRF token (status ${csrfRes.status}) — check ROBLOX_COOKIE.`);

  const res = await fetch(`${BASE}/groups/${GROUP_ID}/users/${userId}`, {
    method: "PATCH",
    headers: { "Cookie": cookie(), "Content-Type": "application/json", "X-CSRF-TOKEN": csrf },
    body: JSON.stringify({ roleId })
  });
  const text = await res.text().catch(() => "");
  console.log(`[rbx] setMemberRank(${userId}, ${roleId}) status=${res.status} body=${text.slice(0, 200)}`);
  if (!res.ok) throw new Error(`setMemberRank failed ${res.status}: ${text}`);
}

async function promoteUser(userId, callerRank) {
  const roles = await getGroupRoles();
  const current = await getMemberRole(userId);
  if (!current) throw new Error("User is not in the group.");

  const currentIdx = roles.findIndex(r => r.rank === current.rank);
  // Find next role above current but strictly below caller's rank
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

async function getCallerRank(robloxUserId) {
  const role = await getMemberRole(robloxUserId);
  return role?.rank ?? 0;
}

module.exports = { getUserByName, getUserById, getMemberRole, getGroupRoles, promoteUser, demoteUser, getCallerRank };
