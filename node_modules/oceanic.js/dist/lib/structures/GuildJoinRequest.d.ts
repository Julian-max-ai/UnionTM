import Base from "./Base";
import type Guild from "./Guild";
import type User from "./User";
import type * as Types from "../types/namespaced";
import type Client from "../Client";
/** Represents a guild join request. */
export default class GuildJoinRequest extends Base {
    private _createdAt;
    /** A deprecated snowflake timestamp representing when the join request was actioned. */
    actionedAt?: string;
    /** The moderator who actioned the join request, if included. */
    actionedByUser?: User;
    /** The status of the join request. */
    applicationStatus: Types.Guilds.GuildJoinRequestStatus;
    /** Responses to the guild's member verification questions, if included. */
    formResponses?: Array<Record<string, unknown>> | null;
    /** The ID of the guild this join request is for. */
    guildID: string;
    /** The ID of a channel where an interview regarding this join request may be conducted. */
    interviewChannelID: string | null;
    /** The ID of the join request. */
    joinRequestID: string;
    /** When the request was acknowledged by the user. */
    lastSeen: Date | null;
    /** Why the join request was rejected. */
    rejectionReason: string | null;
    /** When the join request was actioned, if included. */
    reviewedAt?: Date;
    /** The user who created this join request, if included. */
    user?: User;
    /** The ID of the user who created this join request. */
    userID: string;
    constructor(data: Types.Guilds.RawGuildJoinRequest, client: Client);
    /** When the join request was created. */
    get createdAt(): Date;
    /** The guild this join request is for. */
    get guild(): Guild;
    /**
     * Accept or deny this join request.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#joinRequests | Guild#joinRequests}
     */
    action(options: Types.Guilds.ActionGuildJoinRequestOptions): Promise<GuildJoinRequest>;
    /**
     * Approve this join request.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#joinRequests | Guild#joinRequests}
     */
    approve(): Promise<GuildJoinRequest>;
    /**
     * Reject this join request.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#joinRequests | Guild#joinRequests}
     */
    reject(rejectionReason?: string | null): Promise<GuildJoinRequest>;
    toJSON(): Types.JSON.JSONGuildJoinRequest;
}
