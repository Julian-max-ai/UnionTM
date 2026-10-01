/** @module GuildScheduledEvent */
import Base from "./Base";
import type User from "./User";
import type Guild from "./Guild";
import type StageChannel from "./StageChannel";
import type * as Types from "../types/namespaced";
import type Client from "../Client";
import type { ImageFormat, GuildScheduledEventEntityTypes, GuildScheduledEventPrivacyLevels, GuildScheduledEventStatuses } from "../Constants";
/** Represents a guild scheduled event. */
export default class GuildScheduledEvent extends Base {
    private _cachedChannel?;
    private _cachedGuild?;
    /** The id of the channel in which the event will be hosted. `null` if entityType is `EXTERNAL` */
    channelID: string | null;
    /** The creator of the event. Not present on events created before October 25th, 2021. */
    creator?: User;
    /** The description of the event. */
    description?: string | null;
    /** The id of the entity associated with the event. */
    entityID: string | null;
    /** The [metadata](https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-field-requirements-by-entity-type) associated with the event. */
    entityMetadata: Types.ScheduledEvents.ScheduledEventEntityMetadata | null;
    /** The [entity type](https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-entity-types) of the event */
    entityType: GuildScheduledEventEntityTypes;
    /** Exceptions to the recurrence rule for this event. */
    exceptions: Array<Types.ScheduledEvents.ScheduledEventException>;
    /** The id of the guild this scheduled event belongs to. */
    guildID: string;
    /** The cover image of this event. */
    image: string | null;
    /** The name of the event. */
    name: string;
    /** The [privacy level](https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-privacy-level) of the event. */
    privacyLevel: GuildScheduledEventPrivacyLevels;
    /** The time at which the event will end. Required if entityType is `EXTERNAL`. */
    scheduledEndTime: Date | null;
    /** The time at which the event will start. */
    scheduledStartTime: Date;
    /** The [status](https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-status) of the event. */
    status: GuildScheduledEventStatuses;
    /** The number of users subscribed to the event. */
    userCount: number;
    constructor(data: Types.ScheduledEvents.RawScheduledEvent, client: Client);
    protected update(data: Partial<Types.ScheduledEvents.RawScheduledEvent>): void;
    /** The channel in which the event will be hosted. `null` if entityType is `EXTERNAL` */
    get channel(): StageChannel | null | undefined;
    /** The guild this scheduled event belongs to. This will throw an error if the guild is not cached. */
    get guild(): Guild;
    /**
     * Create an exception to the recurrence rule for this scheduled event.
     * @param options The options for creating the scheduled event exception.
     * @caching This method **may** cache its result.
     * @caches {@link GuildScheduledEvent#exceptions | GuildScheduledEvent#exceptions}
     */
    createException(options: Types.ScheduledEvents.CreateScheduledEventExceptionOptions): Promise<Types.ScheduledEvents.ScheduledEventException>;
    /**
     * Delete an exception to the recurrence rule for this scheduled event.
     * @param exceptionID The ID of the scheduled event exception.
     * @param reason The reason for deleting the scheduled event exception.
     * @caching This method **may** remove the result from cache.
     * @caches {@link GuildScheduledEvent#exceptions | GuildScheduledEvent#exceptions}
     */
    deleteException(exceptionID: string, reason?: string): Promise<void>;
    /**
     * Delete this scheduled event.
     * @param reason The reason for deleting the scheduled event. Discord's docs do not explicitly state a reason can be provided, so it may not be used.
     */
    deleteScheduledEvent(reason?: string): Promise<void>;
    /**
     * Edit an exception to the recurrence rule for this scheduled event.
     * @param exceptionID The ID of the scheduled event exception.
     * @param options The options for editing the scheduled event exception.
     * @caching This method **may** cache its result.
     * @caches {@link GuildScheduledEvent#exceptions | GuildScheduledEvent#exceptions}
     */
    editException(exceptionID: string, options: Types.ScheduledEvents.EditScheduledEventExceptionOptions): Promise<Types.ScheduledEvents.ScheduledEventException>;
    /**
     * Get users subscribed to an exception for this scheduled event.
     * @param exceptionID The ID of the scheduled event exception.
     * @param options The options for getting the users.
     * @caching This method **does** cache part of its result. Members will not be cached if the guild is not cached.
     * @caches {@link Client#users | Client#users}<br>{@link Guild#members | Guild#members}
     */
    getExceptionUsers(exceptionID: string, options?: Types.ScheduledEvents.GetScheduledEventUsersOptions): Promise<Array<Types.ScheduledEvents.ScheduledEventUser>>;
    /**
     * Get user counts for this scheduled event and optionally specific exceptions.
     * @param options The options for getting the user counts.
     * @caching This method **may** cache the event user count.
     * @caches {@link GuildScheduledEvent#userCount | GuildScheduledEvent#userCount}
     */
    getUserCounts(options?: Types.ScheduledEvents.GetScheduledEventUserCountsOptions): Promise<Types.ScheduledEvents.ScheduledEventUserCounts>;
    /**
     * Get users subscribed to this scheduled event.
     * @param options The options for getting the users.
     * @caching This method **does** cache part of its result. Members will not be cached if the guild is not cached.
     * @caches {@link Client#users | Client#users}<br>{@link Guild#members | Guild#members}
     */
    getUsers(options?: Types.ScheduledEvents.GetScheduledEventUsersOptions): Promise<Array<Types.ScheduledEvents.ScheduledEventUser>>;
    /**
     * The url of this event's cover image.
     * @param format The format of the image.
     * @param size The size of the image.
     */
    imageURL(format?: ImageFormat, size?: number): string | null;
    toJSON(): Types.JSON.JSONScheduledEvent;
}
