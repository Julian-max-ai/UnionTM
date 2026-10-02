const commands = [
  { name: "setup", description: "Open the Union™ bot setup panel (admin only)" },
  { name: "cancel", description: "Cancel a planned session (management only)" },
  { name: "reset", description: "Clear all sessions from both boards (management only)" },
  {
    name: "tag",
    description: "Manage tags",
    options: [
      { type: 1, name: "create", description: "Create a new tag" },
      { type: 1, name: "edit",   description: "Edit an existing tag",   options: [{ type: 3, name: "name", description: "Tag name", required: true }] },
      { type: 1, name: "remove", description: "Remove a tag",           options: [{ type: 3, name: "name", description: "Tag name", required: true }] },
      { type: 1, name: "list",   description: "List all tags" }
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
