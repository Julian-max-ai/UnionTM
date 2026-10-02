// Tags feature — /tag create | list | remove | edit

function buildTagMessage(tag) {
  if (!tag.embed) return { content: tag.response };
  const color = tag.embed_color ? parseInt(tag.embed_color.replace("#", ""), 16) : 0x5865f2;
  return {
    embeds: [{
      title: tag.embed_title || undefined,
      description: tag.response,
      color: isNaN(color) ? 0x5865f2 : color
    }]
  };
}

// Modal for create/edit
function buildTagCreateModal(existing = null) {
  return {
    customID: existing ? `tag_edit_modal_${existing.name}` : "tag_create_modal",
    title: existing ? `Edit Tag: ${existing.name}` : "Create Tag",
    components: [
      { type: 1, components: [{ type: 4, customID: "name", label: "Tag Name (e.g. rules)", style: 1, required: true, value: existing?.name ?? "", placeholder: "rules" }] },
      { type: 1, components: [{ type: 4, customID: "prefix", label: "Trigger Prefix (e.g. !, -, .)", style: 1, required: true, value: existing?.prefix ?? "", placeholder: "!" }] },
      { type: 1, components: [{ type: 4, customID: "response", label: "Response Text", style: 2, required: true, value: existing?.response ?? "" }] },
      { type: 1, components: [{ type: 4, customID: "embed_title", label: "Embed Title (leave empty = no embed)", style: 1, required: false, value: existing?.embed_title ?? "", placeholder: "Leave empty for plain text" }] },
      { type: 1, components: [{ type: 4, customID: "embed_color", label: "Embed Color (hex, e.g. ffa500)", style: 1, required: false, value: existing?.embed_color ?? "", placeholder: "5865f2" }] }
    ]
  };
}

function buildTagListEmbed(tags) {
  if (tags.length === 0) return { title: "🏷️ Tags", description: "No tags configured yet.", color: 0x5865f2 };
  return {
    title: "🏷️ Tags",
    color: 0x5865f2,
    fields: tags.map(t => ({
      name: `${t.prefix}${t.name}`,
      value: t.embed ? `📦 Embed${t.embed_title ? ` · *${t.embed_title}*` : ""}` : `💬 Text`,
      inline: true
    }))
  };
}

module.exports = { buildTagMessage, buildTagCreateModal, buildTagListEmbed };
