"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module SelectMenuValuesWrapper */
const shared_1 = require("./shared");
const Constants_1 = require("../../Constants");
const Collection_1 = tslib_1.__importDefault(require("../Collection"));
/** A wrapper for select menu data. */
class SelectMenuValuesWrapper {
    /** The raw received values. */
    raw;
    /** The resolved data for this instance. */
    resolved;
    constructor(resolved, values) {
        this.resolved = resolved;
        this.raw = values;
    }
    /**
     * Get the selected channels.
     *
     * If `ensurePresent` is false, channels that aren't in resolved will be ignored.
     * @param ensurePresent If true, an error will be thrown if any value cannot be mapped to a channel.
     */
    getChannels(ensurePresent) {
        return (0, shared_1.mapRawToResolved)("channel", this.raw, this.resolved.channels, ensurePresent);
    }
    /**
     * Get the complete version of the selected channels. This will only succeed if the channel is cached. If the channel is private and isn't cached, an `InteractionResolvedChannel` instance will still be returned.
     *
     * If `ensurePresent` is false, channels that aren't in resolved will be ignored.
     * @param ensurePresent If true, an error will be thrown if any value cannot be mapped to a channel.
     */
    getCompleteChannels(ensurePresent) {
        return this.getChannels(ensurePresent).map(ch => ch.type === Constants_1.ChannelTypes.DM ? ch.completeChannel ?? ch : ch);
    }
    /**
     * Get the selected members.
     *
     * If `ensurePresent` is false, members that aren't in resolved will be ignored.
     * @param ensurePresent If true, an error will be thrown if any value cannot be mapped to a member.
     */
    getMembers(ensurePresent) {
        return (0, shared_1.mapRawToResolved)("member", this.raw, this.resolved.members, ensurePresent);
    }
    /**
     * Get the selected mentionables. (users, roles)
     *
     * If `ensurePresent` is false, mentionables that aren't in resolved will be ignored.
     * @param ensurePresent If true, an error will be thrown if any value cannot be mapped to a user, or role.
     */
    getMentionables(ensurePresent) {
        return (0, shared_1.mapRawToResolved)("mentionable", this.raw, new Collection_1.default([...this.resolved.users, ...this.resolved.roles]), ensurePresent);
    }
    /**
     * Get the selected roles.
     *
     * If `ensurePresent` is false, roles that aren't in resolved will be ignored.
     * @param ensurePresent If true, an error will be thrown if any value cannot be mapped to a role.
     */
    getRoles(ensurePresent) {
        return (0, shared_1.mapRawToResolved)("role", this.raw, this.resolved.roles, ensurePresent);
    }
    /**
     * Get the selected string values. This cannot fail.
     */
    getStrings() {
        return this.raw;
    }
    /**
     * Get the selected users.
     *
     * If `ensurePresent` is false, users that aren't in resolved will be ignored.
     * @param ensurePresent If true, an error will be thrown if any value cannot be mapped to a user.
     */
    getUsers(ensurePresent) {
        return (0, shared_1.mapRawToResolved)("user", this.raw, this.resolved.users, ensurePresent);
    }
}
exports.default = SelectMenuValuesWrapper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VsZWN0TWVudVZhbHVlc1dyYXBwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9saWIvdXRpbC9pbnRlcmFjdGlvbnMvU2VsZWN0TWVudVZhbHVlc1dyYXBwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsc0NBQXNDO0FBQ3RDLHFDQUE0QztBQUU1QywrQ0FBK0M7QUFLL0MsdUVBQXVDO0FBRXZDLHNDQUFzQztBQUN0QyxNQUFxQix1QkFBdUI7SUFDeEMsK0JBQStCO0lBQy9CLEdBQUcsQ0FBZ0I7SUFDbkIsMkNBQTJDO0lBQzNDLFFBQVEsQ0FBNkQ7SUFDckUsWUFBWSxRQUFvRSxFQUFFLE1BQXFCO1FBQ25HLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDO0lBQ3RCLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILFdBQVcsQ0FBQyxhQUF1QjtRQUMvQixPQUFPLElBQUEseUJBQWdCLEVBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDeEYsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsbUJBQW1CLENBQUMsYUFBdUI7UUFDdkMsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEtBQUssd0JBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxlQUFlLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNsSCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxVQUFVLENBQUMsYUFBdUI7UUFDOUIsT0FBTyxJQUFBLHlCQUFnQixFQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBQ3RGLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILGVBQWUsQ0FBQyxhQUF1QjtRQUNuQyxPQUFPLElBQUEseUJBQWdCLEVBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxvQkFBVSxDQUFzQixDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDM0osQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsUUFBUSxDQUFDLGFBQXVCO1FBQzVCLE9BQU8sSUFBQSx5QkFBZ0IsRUFBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxhQUFhLENBQUMsQ0FBQztJQUNsRixDQUFDO0lBRUQ7O09BRUc7SUFDSCxVQUFVO1FBQ04sT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQ3BCLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILFFBQVEsQ0FBQyxhQUF1QjtRQUM1QixPQUFPLElBQUEseUJBQWdCLEVBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDbEYsQ0FBQztDQUNKO0FBNUVELDBDQTRFQyJ9