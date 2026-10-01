"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Permission_1 = tslib_1.__importDefault(require("./Permission"));
const Channel_1 = tslib_1.__importDefault(require("./Channel"));
const Errors_1 = require("../util/Errors");
/** Represents a channel from an interaction option. This can be any guild channel, or a direct message. */
class InteractionResolvedChannel extends Channel_1.default {
    _cachedCompleteChannel;
    _cachedGuild;
    _cachedParent;
    /** The permissions the bot has in the channel. */
    appPermissions;
    /** The id of the guild this channel is in. */
    guildID;
    /** The ID of last message sent in this channel. */
    lastMessageID;
    /** The timestamp of the last pinned message in this channel. */
    lastPinTimestamp;
    /** The name of this channel. */
    name;
    /** If this channel is age gated. */
    nsfw;
    /** The ID of the parent of this channel, if this represents a thread. */
    parentID;
    /** The permissions the user has in the channel. */
    permissions;
    /** The position of this channel on the sidebar. */
    position;
    /** The amount of seconds between non-moderators sending messages. */
    rateLimitPerUser;
    /** The [thread metadata](https://discord.com/developers/docs/resources/channel#thread-metadata-object-thread-metadata-structure) associated with this channel, if this represents a thread. */
    threadMetadata;
    /** The topic of the channel. */
    topic;
    constructor(data, client) {
        super(data, client);
        this.appPermissions = new Permission_1.default(data.app_permissions ?? "0");
        this.guildID = data.guild_id;
        this.lastMessageID = data.last_message_id;
        this.lastPinTimestamp = data.last_pin_timestamp;
        this.name = data.name;
        this.nsfw = data.nsfw;
        this.parentID = data.parent_id ?? null;
        this.permissions = new Permission_1.default(data.permissions ?? "0");
        this.position = data.position;
        this.rateLimitPerUser = data.rate_limit_per_user;
        this.threadMetadata = data.thread_metadata ? {
            archiveTimestamp: new Date(data.thread_metadata.archive_timestamp),
            archived: !!data.thread_metadata.archived,
            autoArchiveDuration: data.thread_metadata.auto_archive_duration,
            createTimestamp: data.thread_metadata.create_timestamp ? new Date(data.thread_metadata.create_timestamp) : null,
            locked: !!data.thread_metadata.locked,
            invitable: data.thread_metadata.invitable
        } : null;
        this.topic = data.topic;
    }
    /** The complete channel this channel option represents, if it's cached. */
    get completeChannel() {
        return this._cachedCompleteChannel ??= this.client.getChannel(this.id);
    }
    /** The guild associated with this channel. This will throw an error if the guild is not cached. */
    get guild() {
        if (!this.guildID)
            return null;
        this._cachedGuild ??= this.client.guilds.get(this.guildID);
        if (!this._cachedGuild) {
            if (this.client.options.restMode) {
                throw new Errors_1.UncachedError(`${this.constructor.name}#guild is not present when rest mode is enabled.`);
            }
            if (!this.client.shards.connected) {
                throw new Errors_1.UncachedError(`${this.constructor.name}#guild is not present without a gateway connection.`);
            }
            throw new Errors_1.UncachedError(`${this.constructor.name}#guild is not present.`);
        }
        return this._cachedGuild;
    }
    /** The parent of this channel, if this represents a thread. */
    get parent() {
        if (this.parentID !== null && this._cachedParent !== null) {
            return this._cachedParent ?? (this._cachedParent = this.client.getChannel(this.parentID));
        }
        return this._cachedParent === null ? this._cachedParent : (this._cachedParent = null);
    }
    toJSON() {
        return {
            ...super.toJSON(),
            appPermissions: this.appPermissions.toJSON(),
            name: this.name,
            parentID: this.parentID,
            permissions: this.permissions.toJSON(),
            threadMetadata: this.threadMetadata,
            type: this.type
        };
    }
}
exports.default = InteractionResolvedChannel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW50ZXJhY3Rpb25SZXNvbHZlZENoYW5uZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvc3RydWN0dXJlcy9JbnRlcmFjdGlvblJlc29sdmVkQ2hhbm5lbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFHQSxzRUFBc0M7QUFDdEMsZ0VBQWdDO0FBS2hDLDJDQUErQztBQUUvQywyR0FBMkc7QUFDM0csTUFBcUIsMEJBQTJCLFNBQVEsaUJBQU87SUFDbkQsc0JBQXNCLENBQXdDO0lBQzlELFlBQVksQ0FBUztJQUNyQixhQUFhLENBQTJEO0lBQ2hGLGtEQUFrRDtJQUNsRCxjQUFjLENBQWE7SUFDM0IsOENBQThDO0lBQzlDLE9BQU8sQ0FBVTtJQUNqQixtREFBbUQ7SUFDbkQsYUFBYSxDQUFpQjtJQUM5QixnRUFBZ0U7SUFDaEUsZ0JBQWdCLENBQWlCO0lBQ2pDLGdDQUFnQztJQUNoQyxJQUFJLENBQWdCO0lBQ3BCLG9DQUFvQztJQUNwQyxJQUFJLENBQVc7SUFDZix5RUFBeUU7SUFDekUsUUFBUSxDQUFnQjtJQUN4QixtREFBbUQ7SUFDbkQsV0FBVyxDQUFhO0lBQ3hCLG1EQUFtRDtJQUNuRCxRQUFRLENBQVU7SUFDbEIscUVBQXFFO0lBQ3JFLGdCQUFnQixDQUFVO0lBQzFCLCtMQUErTDtJQUMvTCxjQUFjLENBQThFO0lBQzVGLGdDQUFnQztJQUNoQyxLQUFLLENBQWlCO0lBRXRCLFlBQVksSUFBa0QsRUFBRSxNQUFjO1FBQzFFLEtBQUssQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLG9CQUFVLENBQUMsSUFBSSxDQUFDLGVBQWUsSUFBSSxHQUFHLENBQUMsQ0FBQztRQUNsRSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDN0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDO1FBQzFDLElBQUks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