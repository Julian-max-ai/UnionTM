"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ThreadableChannel_1 = tslib_1.__importDefault(require("./ThreadableChannel"));
const Constants_1 = require("../Constants");
/**
 * Represents a guild announcement channel.
 * @mergeTarget AnnouncementChannel
 */
class AnnouncementChannel extends ThreadableChannel_1.default {
    constructor(data, client) {
        super(data, client);
        this.defaultAutoArchiveDuration = data.default_auto_archive_duration;
    }
    /**
     * Convert this announcement channel to a text channel.
     */
    async convert() {
        return this.client.rest.channels.edit(this.id, { type: Constants_1.ChannelTypes.GUILD_TEXT });
    }
    /**
     * Crosspost a message in this channel.
     * @param messageID The ID of the message to crosspost.
     */
    async crosspostMessage(messageID) {
        return this.client.rest.channels.crosspostMessage(this.id, messageID);
    }
    /**
     * Follow this announcement channel.
     * @param webhookChannelID The ID of the channel crossposted messages should be sent to. The client must have the `MANAGE_WEBHOOKS` permission in this channel.
     * @param reason The reason for following this channel.
     */
    async follow(webhookChannelID, reason) {
        return this.client.rest.channels.followAnnouncement(this.id, webhookChannelID, reason);
    }
    toJSON() {
        return {
            ...super.toJSON(),
            rateLimitPerUser: 0,
            type: this.type
        };
    }
}
exports.default = AnnouncementChannel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQW5ub3VuY2VtZW50Q2hhbm5lbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zdHJ1Y3R1cmVzL0Fubm91bmNlbWVudENoYW5uZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBSUEsb0ZBQW9EO0FBRXBELDRDQUE0QztBQUc1Qzs7O0dBR0c7QUFDSCxNQUFxQixtQkFBb0IsU0FBUSwyQkFBaUU7SUFJOUcsWUFBWSxJQUEyQyxFQUFFLE1BQWM7UUFDbkUsS0FBSyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNwQixJQUFJLENBQUMsMEJBQTBCLEdBQUcsSUFBSSxDQUFDLDZCQUE2QixDQUFDO0lBQ3pFLENBQUM7SUFFRDs7T0FFRztJQUNILEtBQUssQ0FBQyxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFjLElBQUksQ0FBQyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsd0JBQVksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO0lBQ25HLENBQUM7SUFFRDs7O09BR0c7SUFDSCxLQUFLLENBQUMsZ0JBQWdCLENBQUMsU0FBaUI7UUFDcEMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQU8sSUFBSSxDQUFDLEVBQUUsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUNoRixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILEtBQUssQ0FBQyxNQUFNLENBQUMsZ0JBQXdCLEVBQUUsTUFBZTtRQUNsRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzNGLENBQUM7SUFFUSxNQUFNO1FBQ1gsT0FBTztZQUNILEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRTtZQUNqQixnQkFBZ0IsRUFBRSxDQUFDO1lBQ25CLElBQUksRUFBYyxJQUFJLENBQUMsSUFBSTtTQUM5QixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBeENELHNDQXdDQyJ9