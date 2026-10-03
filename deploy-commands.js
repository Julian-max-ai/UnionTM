const commands = [
  { name: "setup",    description: "Open the Union™ bot setup panel (ownership only)" },
  { name: "cancel",   description: "Cancel a planned session (management only)" },
  { name: "reset",    description: "Clear all sessions from both boards (management only)" },
  {
    name: "ranklink",
    description: "Link your Roblox account to your Discord account",
    options: [
      { type: 1, name: "link",   description: "Start linking your Roblox account" },
      { type: 1, name: "verify", description: "Confirm verification after adding the code to your profile" }
    ]
  },
  {
    name: "tag",
    description: "Manage tags",
    options: [
      { type: 1, name: "create", description: "Create a new tag" },
      { type: 1, name: "edit",   description: "Edit an existing tag",   options: [{ type: 3, name: "name", description: "Tag name", required: true }] },
      { type: 1, name: "remove", description: "Remove a tag",           options: [{ type: 3, name: "name", description: "Tag name", required: true }] },
      { type: 1, name: "list",   description: "List all tags" }
    ]
  },
  {
    name: "promote",
    description: "Promote a Roblox group member",
    options: [
      { type: 6, name: "user",           description: "Discord user to promote",    required: false },
      { type: 3, name: "roblox_username", description: "Roblox username to promote", required: false },
      { type: 3, name: "roblox_id",       description: "Roblox user ID to promote",  required: false },
      { type: 3, name: "reason",          description: "Reason for promotion",       required: false }
    ]
  },
  {
    name: "demote",
    description: "Demote a Roblox group member",
    options: [
      { type: 6, name: "user",           description: "Discord user to demote",    required: false },
      { type: 3, name: "roblox_username", description: "Roblox username to demote", required: false },
      { type: 3, name: "roblox_id",       description: "Roblox user ID to demote",  required: false },
      { type: 3, name: "reason",          description: "Reason for demotion",       required: false }
    ]
  }
];

const TOKEN = process.env.BOT_TOKEN;
const APP_ID = process.env.APP_ID; // your Discord application ID
const GUILD_ID = process.env.GUILD_ID; // optional: set for guild-specific commands (instant update)

const url = GUILD_ID
  ? `https://discord.com/api/v10/applications/${APP_ID}/guilds/${GUILD_ID}/commands`
  : `https://discord.com/api/v10/applications/${APP_ID}/commands`;

fetch(url, {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bot ${TOKEN}`
  },
  body: JSON.stringify(commands)
}).then(r => r.json()).then(console.log).catch(console.error);
