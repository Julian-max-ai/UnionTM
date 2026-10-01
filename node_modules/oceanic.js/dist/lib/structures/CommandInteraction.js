"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module CommandInteraction */
const Interaction_1 = tslib_1.__importDefault(require("./Interaction"));
const Attachment_1 = tslib_1.__importDefault(require("./Attachment"));
const Member_1 = tslib_1.__importDefault(require("./Member"));
const Message_1 = tslib_1.__importDefault(require("./Message"));
const Role_1 = tslib_1.__importDefault(require("./Role"));
const User_1 = tslib_1.__importDefault(require("./User"));
const Permission_1 = tslib_1.__importDefault(require("./Permission"));
const GuildChannel_1 = tslib_1.__importDefault(require("./GuildChannel"));
const InteractionResolvedChannel_1 = tslib_1.__importDefault(require("./InteractionResolvedChannel"));
const TypedCollection_1 = tslib_1.__importDefault(require("../util/TypedCollection"));
const Constants_1 = require("../Constants");
const InteractionOptionsWrapper_1 = tslib_1.__importDefault(require("../util/interactions/InteractionOptionsWrapper"));
const Errors_1 = require("../util/Errors");
const MessageInteractionResponse_1 = tslib_1.__importDefault(require("../util/interactions/MessageInteractionResponse"));
/** Represents a command interaction. */
class CommandInteraction extends Interaction_1.default {
    _cachedChannel;
    _cachedGuild;
    /** The permissions the bot has in the channel this interaction was sent from. If in a dm/group dm, this will contain `ATTACH_FILES`, `EMBED_LINKS`, and `MENTION_EVERYONE`. In addition, `USE_EXTERNAL_EMOJIS` will be included for DMs with the app's bot user. */
    appPermissions;
    /** The maximum size limit per attachment. This will be 10MiB by default, unless the user that created this interaction has a Nitro subscription or the guild it was sent from has been boosted to level 2 or above. */
    attachmentSizeLimit;
    /** Details about the authorizing user or server for the installation(s) relevant to the interaction. See [Discord's docs](https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-authorizing-integration-owners-object) for more information. */
    authorizingIntegrationOwners;
    /** The ID of the channel this interaction was sent from. */
    channelID;
    /** The context this interaction was sent from. */
    context;
    /** The data associated with the interaction. */
    data;
    /** The entitlements for the user that created this interaction, and the guild it was created in. */
    entitlements;
    /** The id of the guild this interaction was sent from, if applicable. */
    guildID;
    /** The preferred [locale](https://discord.com/developers/docs/reference#locales) of the guild this interaction was sent from, if applicable. */
    guildLocale;
    /** The partial guild this interaction was sent from, if applicable. */
    guildPartial;
    /** The [locale](https://discord.com/developers/docs/reference#locales) of the invoking user. */
    locale;
    /** The member associated with the invoking user, if this interaction is sent from a guild. */
    member;
    /** The permissions of the member associated with the invoking user, if this interaction is sent from a guild. */
    memberPermissions;
    /** The user that invoked this interaction. */
    user;
    constructor(data, client) {
        super(data, client);
        this.appPermissions = new Permission_1.default(data.app_permissions ?? "0");
        this.attachmentSizeLimit = data.attachment_size_limit;
        this.authorizingIntegrationOwners = data.authorizing_integration_owners;
        this.channelID = data.channel_id;
        this.context = data.context;
        const resolved = {
            attachments: new TypedCollection_1.default(Attachment_1.default, client),
            channels: new TypedCollection_1.default(InteractionResolvedChannel_1.default, client),
            members: new TypedCollection_1.default(Member_1.default, client),
            messages: new TypedCollection_1.default(Message_1.default, client),
            roles: new TypedCollection_1.default(Role_1.default, client),
            users: new TypedCollection_1.default(User_1.default, client)
        };
        this.entitlements = data.entitlements?.map(entitlement => client.util.updateEntitlement(entitlement)) ?? [];
        this.guildID = (data.guild_id ?? null);
        this.guildLocale = data.guild_locale;
        this.guildPartial = data.guild;
        this.locale = data.locale;
        this.member = (data.member === undefined ? null : this.client.util.updateMember(data.guild_id, data.member.user.id, data.member));
        this.memberPermissions = (data.member === undefined ? null : new Permission_1.default(data.member.permissions));
        this.user = client.users.update((data.user ?? data.member.user));
        if (data.data.resolved) {
            if (data.data.resolved.attachments) {
                for (const attachment of Object.values(data.data.resolved.attachments))
                    resolved.attachments.update(attachment);
            }
            if (data.data.resolved.channels) {
                for (const channel of Object.values(data.data.resolved.channels))
                    resolved.channels.update(channel);
            }
            if (data.data.resolved.members) {
                for (const [id, member] of Object.entries(data.data.resolved.members)) {
                    const m = member;
                    m.user = data.data.resolved.users[id];
                    resolved.members.add(client.util.updateMember(data.guild_id, id, m));
                }
            }
            if (data.data.resolved.messages) {
                for (const message of Object.values(data.data.resolved.messages)) {
                    const channel = client.getChannel(message.channel_id);
                    if (channel && "messages" in channel) {
                        resolved.messages.add(channel.messages.update(message));
                    }
                    else {
                        resolved.messages.update(message);
                    }
                }
            }
            if (data.data.resolved.roles) {
                for (const role of Object.values(data.data.resolved.roles)) {
                    try {
                        resolved.roles.add(this.guild?.roles.update(role, this.guildID) ?? new Role_1.default(role, client, this.guildID));
                    }
                    catch {
                        resolved.roles.add(new Role_1.default(role, client, this.guildID));
                    }
                }
            }
            if (data.data.resolved.users) {
                for (const user of Object.values(data.data.resolved.users))
                    resolved.users.add(client.users.update(user));
            }
        }
        this.data = {
            guildID: data.data.guild_id,
            id: data.data.id,
            name: data.data.name,
            options: new InteractionOptionsWrapper_1.default(data.data.options ?? [], resolved ?? null),
            resolved,
            target: null,
            targetID: data.data.target_id,
            type: data.data.type
        };
        if (this.data.targetID) {
            if (this.data.type === Constants_1.ApplicationCommandTypes.USER) {
                this.data.target = resolved.users.get(this.data.targetID);
            }
            else if (this.data.type === Constants_1.ApplicationCommandTypes.MESSAGE) {
                this.data.target = resolved.messages.get(this.data.targetID);
            }
        }
    }
    /** The channel this interaction was sent from. */
    get channel() {
        return this._cachedChannel ??= this.client.getChannel(this.channelID);
    }
    /** The guild this interaction was sent from, if applicable. This will throw an error if the guild is not cached. */
    get guild() {
        if (this.guildID !== null && this._cachedGuild !== null) {
            this._cachedGuild ??= this.client.guilds.get(this.guildID);
            if (!this._cachedGuild) {
                throw new Errors_1.UncachedError(this, "guild", "GUILDS", this.client);
            }
            return this._cachedGuild;
        }
        return this._cachedGuild === null ? this._cachedGuild : (this._cachedGuild = null);
    }
    async createFollowup(content, options) {
        if (typeof content === "string") {
            options = {
                ...options,
                content
            };
        }
        else
            options = content;
        const message = await this.client.rest.interactions.createFollowupMessage(this.applicationID, this.token, options);
        return new MessageInteractionResponse_1.default(this, message, "followup", null);
    }
    async createMessage(content, options) {
        if (typeof content === "string") {
            options = {
                ...options,
                content
            };
        }
        else
            options = content;
        if (this.acknowledged) {
            throw new TypeError("Interactions cannot have more than one initial response.");
        }
        this.acknowledged = true;
        const cb = await this.client.rest.interactions.createInteractionResponse(this.id, this.token, { type: Constants_1.InteractionResponseTypes.CHANNEL_MESSAGE_WITH_SOURCE, data: options }, true);
        return new MessageInteractionResponse_1.default(this, null, "initial", cb);
    }
    /**
     * Respond to this interaction with a modal. This is an initial response, and more than one initial response cannot be used.
     * @param options The options for the modal.
     */
    async createModal(options) {
        if (this.acknowledged) {
            throw new TypeError("Interactions cannot have more than one initial response.");
        }
        this.acknowledged = true;
        return this.client.rest.interactions.createInteractionResponse(this.id, this.token, { type: Constants_1.InteractionResponseTypes.MODAL, data: options }, true);
    }
    /**
     * Defer this interaction. This is an initial response, and more than one initial response cannot be used.
     * @param flags The [flags](https://discord.com/developers/docs/resources/channel#message-object-message-flags) to respond with.
     */
    async defer(flags) {
        if (this.acknowledged) {
            throw new TypeError("Interactions cannot have more than one initial response.");
        }
        this.acknowledged = true;
        return this.client.rest.interactions.createInteractionResponse(this.id, this.token, { type: Constants_1.InteractionResponseTypes.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE, data: { flags } }, true);
    }
    /**
     * Delete a follow-up message.
     * @param messageID The ID of the message.
     */
    async deleteFollowup(messageID) {
        return this.client.rest.interactions.deleteFollowupMessage(this.applicationID, this.token, messageID);
    }
    /**
     * Delete the original interaction response.
     */
    async deleteOriginal() {
        return this.client.rest.interactions.deleteOriginalMessage(this.applicationID, this.token);
    }
    async editFollowup(messageID, content, options) {
        if (typeof content === "string") {
            options = {
                ...options,
                content
            };
        }
        else
            options = content;
        return this.client.rest.interactions.editFollowupMessage(this.applicationID, this.token, messageID, options);
    }
    async editOriginal(content, options) {
        if (typeof content === "string") {
            options = {
                ...options,
                content
            };
        }
        else
            options = content;
        return this.client.rest.interactions.editOriginalMessage(this.applicationID, this.token, options);
    }
    /**
     * Get a followup message.
     * @param messageID The ID of the message.
     */
    async getFollowup(messageID) {
        return this.client.rest.interactions.getFollowupMessage(this.applicationID, this.token, messageID);
    }
    /**
     * Get the original interaction response.
     */
    async getOriginal() {
        return this.client.rest.interactions.getOriginalMessage(this.applicationID, this.token);
    }
    /** Whether this interaction belongs to a cached guild channel. The only difference on using this method over a simple if statement is to easily update all the interaction properties typing definitions based on the channel it belongs to. */
    inCachedGuildChannel() {
        return this.channel instanceof GuildChannel_1.default;
    }
    /** Whether this interaction belongs to a private channel (PrivateChannel or uncached). The only difference on using this method over a simple if statement is to easily update all the interaction properties typing definitions based on the channel it belongs to. */
    inPrivateChannel() {
        return this.guildID === null;
    }
    /** A type guard, checking if this command interaction is a {@link Constants~ApplicationCommandTypes.CHAT_INPUT | Chat Input} command. */
    isChatInputCommand() {
        return this.data.type === Constants_1.ApplicationCommandTypes.CHAT_INPUT;
    }
    /** A type guard, checking if this command interaction is a {@link Constants~ApplicationCommandTypes.MESSAGE | Message} command. */
    isMessageCommand() {
        return this.data.type === Constants_1.ApplicationCommandTypes.MESSAGE;
    }
    /** A type guard, checking if this command interaction is a {@link Constants~ApplicationCommandTypes.PRIMARY_ENTRY_POINT | Primary Entry Point} command. */
    isPrimaryEntryPointCommand() {
        return this.data.type === Constants_1.ApplicationCommandTypes.PRIMARY_ENTRY_POINT;
    }
    /** A type guard, checking if this command interaction is a {@link Constants~ApplicationCommandTypes.USER | User} command. */
    isUserCommand() {
        return this.data.type === Constants_1.ApplicationCommandTypes.USER;
    }
    /**
     * Launch the bot's activity. This is an initial response, and more than one initial response cannot be used.
     */
    async launchActivity() {
        if (this.acknowledged) {
            throw new TypeError("Interactions cannot have more than one initial response.");
        }
        this.acknowledged = true;
        return this.client.rest.interactions.createInteractionResponse(this.id, this.token, { type: Constants_1.InteractionResponseTypes.LAUNCH_ACTIVITY }, true);
    }
    /**
     * Show a "premium required" response to the user. This is an initial response, and more than one initial response cannot be used.
     * @deprecated The {@link Constants~InteractionResponseTypes.PREMIUM_REQUIRED | PREMIUM_REQUIRED} interaction response type is now deprecated in favor of using {@link Types/Channels~PremiumButton | custom premium buttons}.
     */
    async premiumRequired() {
        if (this.acknowledged) {
            throw new TypeError("Interactions cannot have more than one initial response.");
        }
        this.acknowledged = true;
        return this.client.rest.interactions.createInteractionResponse(this.id, this.token, { type: Constants_1.InteractionResponseTypes.PREMIUM_REQUIRED }, true);
    }
    async reply(content, options) {
        if (typeof content === "string") {
            options = {
                ...options,
                content
            };
        }
        else
            options = content;
        return this.acknowledged ? this.createFollowup(options) : this.createMessage(options);
    }
    toJSON() {
        return {
            ...super.toJSON(),
            appPermissions: this.appPermissions.toJSON(),
            attachmentSizeLimit: this.attachmentSizeLimit,
            authorizingIntegrationOwners: this.authorizingIntegrationOwners,
            channelID: this.channelID,
            context: this.context,
            data: this.data,
            guildID: this.guildID ?? undefined,
            guildLocale: this.guildLocale,
            locale: this.locale,
            member: this.member?.toJSON(),
            type: this.type,
            user: this.user.toJSON()
        };
    }
}
exports.default = CommandInteraction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29tbWFuZEludGVyYWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL3N0cnVjdHVyZXMvQ29tbWFuZEludGVyYWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGlDQUFpQztBQUNqQyx3RUFBd0M7QUFDeEMsc0VBQXNDO0FBQ3RDLDhEQUE4QjtBQUM5QixnRUFBZ0M7QUFDaEMsMERBQTBCO0FBQzFCLDBEQUEwQjtBQUUxQixzRUFBc0M7QUFDdEMsMEVBQTBDO0FBRTFDLHNHQUFzRTtBQUl0RSxzRkFBc0Q7QUFDdEQsNENBQXNJO0FBRXRJLHVIQUF1RjtBQUN2RiwyQ0FBK0M7QUFDL0MseUhBQStLO0FBRS9LLHdDQUF3QztBQUN4QyxNQUFxQixrQkFBdU4sU0FBUSxxQkFBVztJQUNuUCxjQUFjLENBQWtFO0lBQ2hGLFlBQVksQ0FBMkU7SUFDL0Ysb1FBQW9RO0lBQ3BRLGNBQWMsQ0FBYTtJQUMzQix1TkFBdU47SUFDdk4sbUJBQW1CLENBQVM7SUFDNUIsdVJBQXVSO0lBQ3ZSLDRCQUE0QixDQUFrRDtJQUM5RSw0REFBNEQ7SUFDNUQsU0FBUyxDQUFTO0lBQ2xCLGtEQUFrRDtJQUNsRCxPQUFPLENBQTJCO0lBQ2xDLGdEQUFnRDtJQUNoRCxJQUFJLENBQTZEO0lBQ2pFLG9HQUFvRztJQUNwRyxZQUFZLENBQXVDO0lBQ25ELHlFQUF5RTtJQUN6RSxPQUFPLENBQTRFO0lBQ25GLGdKQUFnSjtJQUNoSixXQUFXLENBQWlGO0lBQzVGLHVFQUF1RTtJQUN2RSxZQUFZLENBQTRJO0lBQ3hKLGdHQUFnRztJQUNoRyxNQUFNLENBQVM7SUFDZiw4RkFBOEY7SUFDOUYsTUFBTSxDQUE0RTtJQUNsRixpSEFBaUg7SUFDakgsaUJBQWlCLENBQW9GO0lBRXJHLDhDQUE4QztJQUM5QyxJQUFJLENBQU87SUFDWCxZQUFZLElBQXlELEVBQUUsTUFBYztRQUNqRixLQUFLLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxD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