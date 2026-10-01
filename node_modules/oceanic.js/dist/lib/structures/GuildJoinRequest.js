"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Base_1 = tslib_1.__importDefault(require("./Base"));
const Errors_1 = require("../util/Errors");
/** Represents a guild join request. */
class GuildJoinRequest extends Base_1.default {
    _createdAt;
    /** A deprecated snowflake timestamp representing when the join request was actioned. */
    actionedAt;
    /** The moderator who actioned the join request, if included. */
    actionedByUser;
    /** The status of the join request. */
    applicationStatus;
    /** Responses to the guild's member verification questions, if included. */
    formResponses;
    /** The ID of the guild this join request is for. */
    guildID;
    /** The ID of a channel where an interview regarding this join request may be conducted. */
    interviewChannelID;
    /** The ID of the join request. */
    joinRequestID;
    /** When the request was acknowledged by the user. */
    lastSeen;
    /** Why the join request was rejected. */
    rejectionReason;
    /** When the join request was actioned, if included. */
    reviewedAt;
    /** The user who created this join request, if included. */
    user;
    /** The ID of the user who created this join request. */
    userID;
    constructor(data, client) {
        super(data.id, client);
        this.actionedAt = data.actioned_at;
        this.actionedByUser = data.actioned_by_user && client.users.update(data.actioned_by_user);
        this.applicationStatus = data.application_status;
        this._createdAt = new Date(data.created_at);
        this.formResponses = data.form_responses;
        this.guildID = data.guild_id;
        this.interviewChannelID = data.interview_channel_id;
        this.joinRequestID = data.join_request_id;
        this.lastSeen = data.last_seen === null ? null : new Date(data.last_seen);
        this.rejectionReason = data.rejection_reason;
        this.reviewedAt = data.reviewed_at === undefined ? undefined : new Date(data.reviewed_at);
        this.user = data.user && client.users.update(data.user);
        this.userID = data.user_id;
    }
    /** When the join request was created. */
    get createdAt() {
        return this._createdAt;
    }
    /** The guild this join request is for. */
    get guild() {
        const guild = this.client.guilds.get(this.guildID);
        if (!guild) {
            if (this.client.options.restMode) {
                throw new Errors_1.UncachedError(`${this.constructor.name}#guild is not present when rest mode is enabled.`);
            }
            if (!this.client.shards.connected) {
                throw new Errors_1.UncachedError(`${this.constructor.name}#guild is not present without a gateway connection.`);
            }
            throw new Errors_1.UncachedError(`${this.constructor.name}#guild is not present.`);
        }
        return guild;
    }
    /**
     * Accept or deny this join request.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#joinRequests | Guild#joinRequests}
     */
    async action(options) {
        return this.client.rest.guilds.actionJoinRequest(this.guildID, this.id, options);
    }
    /**
     * Approve this join request.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#joinRequests | Guild#joinRequests}
     */
    async approve() {
        return this.action({ action: "APPROVED" });
    }
    /**
     * Reject this join request.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#joinRequests | Guild#joinRequests}
     */
    async reject(rejectionReason) {
        return this.action({ action: "REJECTED", rejectionReason });
    }
    toJSON() {
        return {
            ...super.toJSON(),
            actionedAt: this.actionedAt,
            actionedByUser: this.actionedByUser?.toJSON(),
            applicationStatus: this.applicationStatus,
            createdAt: this._createdAt.getTime(),
            formResponses: this.formResponses,
            guildID: this.guildID,
            interviewChannelID: this.interviewChannelID,
            joinRequestID: this.joinRequestID,
            lastSeen: this.lastSeen?.getTime() ?? null,
            rejectionReason: this.rejectionReason,
            reviewedAt: this.reviewedAt?.getTime(),
            user: this.user?.toJSON(),
            userID: this.userID
        };
    }
}
exports.default = GuildJoinRequest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3VpbGRKb2luUmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zdHJ1Y3R1cmVzL0d1aWxkSm9pblJlcXVlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMERBQTBCO0FBSzFCLDJDQUErQztBQUUvQyx1Q0FBdUM7QUFDdkMsTUFBcUIsZ0JBQWlCLFNBQVEsY0FBSTtJQUN0QyxVQUFVLENBQU87SUFDekIsd0ZBQXdGO0lBQ3hGLFVBQVUsQ0FBVTtJQUNwQixnRUFBZ0U7SUFDaEUsY0FBYyxDQUFRO0lBQ3RCLHNDQUFzQztJQUN0QyxpQkFBaUIsQ0FBc0M7SUFDdkQsMkVBQTJFO0lBQzNFLGFBQWEsQ0FBeUM7SUFDdEQsb0RBQW9EO0lBQ3BELE9BQU8sQ0FBUztJQUNoQiwyRkFBMkY7SUFDM0Ysa0JBQWtCLENBQWdCO0lBQ2xDLGtDQUFrQztJQUNsQyxhQUFhLENBQVM7SUFDdEIscURBQXFEO0lBQ3JELFFBQVEsQ0FBYztJQUN0Qix5Q0FBeUM7SUFDekMsZUFBZSxDQUFnQjtJQUMvQix1REFBdUQ7SUFDdkQsVUFBVSxDQUFRO0lBQ2xCLDJEQUEyRDtJQUMzRCxJQUFJLENBQVE7SUFDWix3REFBd0Q7SUFDeEQsTUFBTSxDQUFTO0lBQ2YsWUFBWSxJQUFzQyxFQUFFLE1BQWM7UUFDOUQsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ25DLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQzFGLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUM7UUFDakQsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLElBQUksQ0FBQyxJ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