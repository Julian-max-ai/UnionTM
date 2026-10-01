"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module GuildScheduledEvent */
const Base_1 = tslib_1.__importDefault(require("./Base"));
const Routes = tslib_1.__importStar(require("../util/Routes"));
const Errors_1 = require("../util/Errors");
/** Represents a guild scheduled event. */
class GuildScheduledEvent extends Base_1.default {
    _cachedChannel;
    _cachedGuild;
    /** The id of the channel in which the event will be hosted. `null` if entityType is `EXTERNAL` */
    channelID;
    /** The creator of the event. Not present on events created before October 25th, 2021. */
    creator;
    /** The description of the event. */
    description;
    /** The id of the entity associated with the event. */
    entityID;
    /** The [metadata](https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-field-requirements-by-entity-type) associated with the event. */
    entityMetadata;
    /** The [entity type](https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-entity-types) of the event */
    entityType;
    /** Exceptions to the recurrence rule for this event. */
    exceptions;
    /** The id of the guild this scheduled event belongs to. */
    guildID;
    /** The cover image of this event. */
    image;
    /** The name of the event. */
    name;
    /** The [privacy level](https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-privacy-level) of the event. */
    privacyLevel;
    /** The time at which the event will end. Required if entityType is `EXTERNAL`. */
    scheduledEndTime;
    /** The time at which the event will start. */
    scheduledStartTime;
    /** The [status](https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-status) of the event. */
    status;
    /** The number of users subscribed to the event. */
    userCount;
    constructor(data, client) {
        super(data.id, client);
        this.channelID = data.channel_id;
        this.entityID = null;
        this.entityMetadata = null;
        this.entityType = data.entity_type;
        this.exceptions = [];
        this.guildID = data.guild_id;
        this.image = null;
        this.name = data.name;
        this.privacyLevel = data.privacy_level;
        this.scheduledEndTime = data.scheduled_end_time ? new Date(data.scheduled_end_time) : null;
        this.scheduledStartTime = new Date(data.scheduled_start_time);
        this.status = data.status;
        this.userCount = 0;
        if (data.creator) {
            this.creator = client.users.update(data.creator);
        }
        this.update(data);
    }
    update(data) {
        if (data.channel_id !== undefined) {
            this.channelID = data.channel_id;
        }
        if (data.description !== undefined) {
            this.description = data.description;
        }
        if (data.entity_id !== undefined) {
            this.entityID = data.entity_id;
        }
        if (data.entity_metadata !== undefined) {
            this.entityMetadata = data.entity_metadata;
        }
        if (data.entity_type !== undefined) {
            this.entityType = data.entity_type;
        }
        if (data.guild_scheduled_event_exceptions !== undefined) {
            this.exceptions = data.guild_scheduled_event_exceptions.map(exception => this.client.util.convertScheduledEventException(exception));
        }
        if (data.image !== undefined) {
            this.image = data.image;
        }
        if (data.name !== undefined) {
            this.name = data.name;
        }
        if (data.privacy_level !== undefined) {
            this.privacyLevel = data.privacy_level;
        }
        if (data.scheduled_end_time !== undefined) {
            this.scheduledEndTime = data.scheduled_end_time ? new Date(data.scheduled_end_time) : null;
        }
        if (data.scheduled_start_time !== undefined) {
            this.scheduledStartTime = new Date(data.scheduled_start_time);
        }
        if (data.status !== undefined) {
            this.status = data.status;
        }
        if (data.user_count !== undefined) {
            this.userCount = data.user_count;
        }
    }
    /** The channel in which the event will be hosted. `null` if entityType is `EXTERNAL` */
    get channel() {
        if (this.channelID !== null) {
            return this._cachedChannel ??= this.client.getChannel(this.channelID);
        }
        return this._cachedChannel === null ? this._cachedChannel : (this._cachedChannel = null);
    }
    /** The guild this scheduled event belongs to. This will throw an error if the guild is not cached. */
    get guild() {
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
    /**
     * Create an exception to the recurrence rule for this scheduled event.
     * @param options The options for creating the scheduled event exception.
     * @caching This method **may** cache its result.
     * @caches {@link GuildScheduledEvent#exceptions | GuildScheduledEvent#exceptions}
     */
    async createException(options) {
        return this.client.rest.guilds.createScheduledEventException(this.guildID, this.id, options);
    }
    /**
     * Delete an exception to the recurrence rule for this scheduled event.
     * @param exceptionID The ID of the scheduled event exception.
     * @param reason The reason for deleting the scheduled event exception.
     * @caching This method **may** remove the result from cache.
     * @caches {@link GuildScheduledEvent#exceptions | GuildScheduledEvent#exceptions}
     */
    async deleteException(exceptionID, reason) {
        return this.client.rest.guilds.deleteScheduledEventException(this.guildID, this.id, exceptionID, reason);
    }
    /**
     * Delete this scheduled event.
     * @param reason The reason for deleting the scheduled event. Discord's docs do not explicitly state a reason can be provided, so it may not be used.
     */
    async deleteScheduledEvent(reason) {
        return this.client.rest.guilds.deleteScheduledEvent(this.guildID, this.id, reason);
    }
    /**
     * Edit an exception to the recurrence rule for this scheduled event.
     * @param exceptionID The ID of the scheduled event exception.
     * @param options The options for editing the scheduled event exception.
     * @caching This method **may** cache its result.
     * @caches {@link GuildScheduledEvent#exceptions | GuildScheduledEvent#exceptions}
     */
    async editException(exceptionID, options) {
        return this.client.rest.guilds.editScheduledEventException(this.guildID, this.id, exceptionID, options);
    }
    /**
     * Get users subscribed to an exception for this scheduled event.
     * @param exceptionID The ID of the scheduled event exception.
     * @param options The options for getting the users.
     * @caching This method **does** cache part of its result. Members will not be cached if the guild is not cached.
     * @caches {@link Client#users | Client#users}<br>{@link Guild#members | Guild#members}
     */
    async getExceptionUsers(exceptionID, options) {
        return this.client.rest.guilds.getScheduledEventExceptionUsers(this.guildID, this.id, exceptionID, options);
    }
    /**
     * Get user counts for this scheduled event and optionally specific exceptions.
     * @param options The options for getting the user counts.
     * @caching This method **may** cache the event user count.
     * @caches {@link GuildScheduledEvent#userCount | GuildScheduledEvent#userCount}
     */
    async getUserCounts(options) {
        return this.client.rest.guilds.getScheduledEventUserCounts(this.guildID, this.id, options);
    }
    /**
     * Get users subscribed to this scheduled event.
     * @param options The options for getting the users.
     * @caching This method **does** cache part of its result. Members will not be cached if the guild is not cached.
     * @caches {@link Client#users | Client#users}<br>{@link Guild#members | Guild#members}
     */
    async getUsers(options) {
        return this.client.rest.guilds.getScheduledEventUsers(this.guildID, this.id, options);
    }
    /**
     * The url of this event's cover image.
     * @param format The format of the image.
     * @param size The size of the image.
     */
    imageURL(format, size) {
        return this.image ? this.client.util.formatImage(Routes.GUILD_SCHEDULED_EVENT_COVER(this.id, this.image), format, size) : null;
    }
    toJSON() {
        return {
            ...super.toJSON(),
            channelID: this.channelID,
            creator: this.creator?.toJSON(),
            description: this.description,
            entityID: this.entityID,
            entityMetadata: this.entityMetadata,
            entityType: this.entityType,
            exceptions: this.exceptions,
            guildID: this.guildID,
            image: this.image,
            name: this.name,
            privacyLevel: this.privacyLevel,
            scheduledEndTime: this.scheduledEndTime?.getTime() ?? null,
            scheduledStartTime: this.scheduledStartTime.getTime(),
            status: this.status,
            userCount: this.userCount
        };
    }
}
exports.default = GuildScheduledEvent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3VpbGRTY2hlZHVsZWRFdmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zdHJ1Y3R1cmVzL0d1aWxkU2NoZWR1bGVkRXZlbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsa0NBQWtDO0FBQ2xDLDBEQUEwQjtBQU8xQiwrREFBeUM7QUFDekMsMkNBQStDO0FBRS9DLDBDQUEwQztBQUMxQyxNQUFxQixtQkFBb0IsU0FBUSxjQUFJO0lBQ3pDLGNBQWMsQ0FBdUI7SUFDckMsWUFBWSxDQUFTO0lBQzdCLGtHQUFrRztJQUNsRyxTQUFTLENBQWdCO0lBQ3pCLHlGQUF5RjtJQUN6RixPQUFPLENBQVE7SUFDZixvQ0FBb0M7SUFDcEMsV0FBVyxDQUFpQjtJQUM1QixzREFBc0Q7SUFDdEQsUUFBUSxDQUFnQjtJQUN4QixvTEFBb0w7SUFDcEwsY0FBYyxDQUE0RDtJQUMxRSwwS0FBMEs7SUFDMUssVUFBVSxDQUFpQztJQUMzQyx3REFBd0Q7SUFDeEQsVUFBVSxDQUF1RDtJQUNqRSwyREFBMkQ7SUFDM0QsT0FBTyxDQUFTO0lBQ2hCLHFDQUFxQztJQUNyQyxLQUFLLENBQWdCO0lBQ3JCLDZCQUE2QjtJQUM3QixJQUFJLENBQVM7SUFDYiw4S0FBOEs7SUFDOUssWUFBWSxDQUFtQztJQUMvQyxrRkFBa0Y7SUFDbEYsZ0JBQWdCLENBQWM7SUFDOUIsOENBQThDO0lBQzlDLGtCQUFrQixDQUFPO0lBQ3pCLGdLQUFnSztJQUNoSyxNQUFNLENBQThCO0lBQ3BDLG1EQUFtRDtJQUNuRCxTQUFTLENBQVM7SUFDbEIsWUFBWSxJQUE2QyxFQUFFLE1BQWM7UUFDckUsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxjQUFj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