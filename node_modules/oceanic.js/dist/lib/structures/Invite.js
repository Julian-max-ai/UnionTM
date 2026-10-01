"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module Invite */
const Channel_1 = tslib_1.__importDefault(require("./Channel"));
const Guild_1 = tslib_1.__importDefault(require("./Guild"));
const GuildScheduledEvent_1 = tslib_1.__importDefault(require("./GuildScheduledEvent"));
const PartialApplication_1 = tslib_1.__importDefault(require("./PartialApplication"));
const InviteGuild_1 = tslib_1.__importDefault(require("./InviteGuild"));
const InviteRole_1 = tslib_1.__importDefault(require("./InviteRole"));
const GuildChannel_1 = tslib_1.__importDefault(require("./GuildChannel"));
const Constants_1 = require("../Constants");
/** Represents an invite. */
class Invite {
    _cachedChannel;
    /** The approximate number of total members in the guild this invite leads to. */
    approximateMemberCount;
    /** The approximate number of online members in the guild this invite leads to. */
    approximatePresenceCount;
    /** The ID of the channel this invite leads to. */
    channelID;
    client;
    /** The code of this invite. */
    code;
    /** When this invite was created. */
    createdAt;
    /** The date at which this invite expires. */
    expiresAt;
    /** This invite's [flags](https://discord.com/developers/docs/resources/invite#invite-object-invite-flags). */
    flags;
    /** The guild this invite leads to or `null` if this invite leads to a Group DM. */
    guild;
    /** The ID of the guild this invite leads to or `null` if this invite leads to a Group DM. */
    guildID;
    /** The scheduled event associated with this invite. */
    guildScheduledEvent;
    /** The user that created this invite. */
    inviter;
    /** The time after which this invite expires. */
    maxAge;
    /** The maximum number of times this invite can be used, */
    maxUses;
    /** The roles assigned to the user upon accepting the invite . */
    roles;
    /** @deprecated The stage instance in the invite this channel is for. */
    stageInstance;
    /** The embedded application this invite will open. */
    targetApplication;
    /** The [target type](https://discord.com/developers/docs/resources/invite#invite-object-invite-target-types) of this invite. */
    targetType;
    /** The user whose stream to display for this voice channel stream invite. */
    targetUser;
    /** If this invite only grants temporary membership. */
    temporary;
    /** The [type](https://discord.com/developers/docs/resources/invite#invite-object-invite-types) of this invite. */
    type;
    /** The number of times this invite has been used. */
    uses;
    constructor(data, client) {
        Object.defineProperty(this, "client", {
            value: client,
            enumerable: false,
            writable: false,
            configurable: false
        });
        this.channelID = (data.channel_id ?? data.channel?.id) ?? null;
        this.code = data.code;
        this.flags = data.flags ?? 0;
        this.guild = null;
        this.guildID = data.guild_id ?? null;
        this.expiresAt = (data.expires_at ? new Date(data.expires_at) : undefined);
        this.targetType = data.target_type;
        this.type = data.type;
        this.update(data);
    }
    static withCounts(data, client) {
        return new Invite(data, client);
    }
    static withCountsAndScheduledEvent(data, client) {
        return new Invite(data, client);
    }
    static withMetadata(data, client) {
        return new Invite(data, client);
    }
    static withScheduledEvent(data, client) {
        return new Invite(data, client);
    }
    update(data) {
        if (data.approximate_member_count !== undefined) {
            this.approximateMemberCount = data.approximate_member_count;
        }
        if (data.approximate_presence_count !== undefined) {
            this.approximatePresenceCount = data.approximate_presence_count;
        }
        if (data.flags !== undefined) {
            this.flags = data.flags;
        }
        if (data.guild) {
            if (this.guild === null) {
                this.guild = new InviteGuild_1.default(data.guild, this.client);
            }
            else {
                this.guild["update"](data.guild);
            }
            if (this.client.guilds.has(data.guild.id)) {
                this.client.guilds.update(data.guild);
            }
        }
        if (this.channelID === null) {
            this._cachedChannel = null;
        }
        else {
            let channel;
            channel = this.client.getChannel(this.channelID);
            if (data.channel !== undefined) {
                if (channel && channel instanceof Channel_1.default) {
                    channel["update"](data.channel);
                }
                else {
                    channel = data.channel;
                }
            }
            this._cachedChannel = channel;
        }
        if (data.inviter !== undefined) {
            this.inviter = this.client.users.update(data.inviter);
        }
        if (data.roles !== undefined) {
            this.roles = data.roles?.map(role => new InviteRole_1.default(role, this.client, data.guild_id, this.guild));
        }
        if (data.stage_instance !== undefined) {
            this.stageInstance = {
                members: data.stage_instance.members.map(member => this.client.util.updateMember(this.guildID, member.user.id, member)),
                participantCount: data.stage_instance.participant_count,
                speakerCount: data.stage_instance.speaker_count,
                topic: data.stage_instance.topic
            };
        }
        if (data.target_application !== undefined) {
            this.targetApplication = new PartialApplication_1.default(data.target_application, this.client);
        }
        if (data.guild_scheduled_event !== undefined) {
            this.guildScheduledEvent = this.guild instanceof Guild_1.default ? this.guild.scheduledEvents.update(data.guild_scheduled_event) : new GuildScheduledEvent_1.default(data.guild_scheduled_event, this.client);
        }
        if (data.target_user !== undefined) {
            this.targetUser = this.client.users.update(data.target_user);
        }
        if ("created_at" in data) {
            if (data.created_at !== undefined) {
                this.createdAt = new Date(data.created_at);
            }
            if (data.uses !== undefined) {
                this.uses = data.uses;
            }
            if (data.max_uses !== undefined) {
                this.maxUses = data.max_uses;
            }
            if (data.max_age !== undefined) {
                this.maxAge = data.max_age;
            }
            if (data.temporary !== undefined) {
                this.temporary = data.temporary;
            }
        }
    }
    /** The channel this invite leads to. If the channel is not cached, this will be a partial with only `id`, `name`, and `type`. */
    get channel() {
        if (this.channelID !== null) {
            if (this._cachedChannel instanceof Channel_1.default) {
                return this._cachedChannel;
            }
            const cachedChannel = this.client.getChannel(this.channelID);
            return cachedChannel ? (this._cachedChannel = cachedChannel) : this._cachedChannel;
        }
        return this._cachedChannel === null ? this._cachedChannel : (this._cachedChannel = null);
    }
    /**
     * Delete this invite.
     * @param reason The reason for deleting this invite.
     */
    async deleteInvite(reason) {
        return this.client.rest.channels.deleteInvite(this.code, reason);
    }
    /** Get the target users for this invite. Requires being the inviter or having the `MANAGE_GUILD` or `VIEW_AUDIT_LOG` permission. */
    async getTargetUsers() {
        return this.client.rest.channels.getInviteTargetUsers(this.code);
    }
    /** et the target users job status for this invite. Requires being the inviter or having the `MANAGE_GUILD` or `VIEW_AUDIT_LOG` permission. */
    async getTargetUsersJobStatus() {
        return this.client.rest.channels.getInviteTargetUsersJobStatus(this.code);
    }
    /** Whether this invite belongs to a cached channel. The only difference on using this method over a simple if statement is to easily update all the invite properties typing definitions based on the channel it belongs to. */
    inCachedChannel() {
        return this.channel instanceof Channel_1.default;
    }
    inCachedGuildChannel() {
        return this.channel instanceof GuildChannel_1.default;
    }
    inDMChannel() {
        return this.channel !== null && Constants_1.DMInviteChannelTypes.includes(this.channel.type);
    }
    toJSON() {
        return {
            approximateMemberCount: this.approximateMemberCount,
            approximatePresenceCount: this.approximatePresenceCount,
            channelID: this.channelID ?? undefined,
            code: this.code,
            createdAt: this.createdAt?.getTime(),
            expiresAt: this.expiresAt?.getTime(),
            guild: this.guild?.toJSON(),
            guildID: this.guildID ?? undefined,
            guildScheduledEvent: this.guildScheduledEvent?.toJSON(),
            inviter: this.inviter?.toJSON(),
            maxAge: this.maxAge,
            maxUses: this.maxUses,
            roles: this.roles?.map(role => role.toJSON()),
            stageInstance: this.stageInstance ? {
                members: this.stageInstance.members.map(member => member.id),
                participantCount: this.stageInstance.participantCount,
                speakerCount: this.stageInstance.speakerCount,
                topic: this.stageInstance.topic
            } : undefined,
            targetApplication: this.targetApplication?.toJSON(),
            targetType: this.targetType,
            targetUser: this.targetUser?.toJSON(),
            temporary: this.temporary,
            uses: this.uses
        };
    }
    /**
     * Update the target users for this invite. Requires being the inviter or having the `MANAGE_GUILD` permission.
     * @param users The IDs of the users to allow accepting the invite.
     */
    async updateInviteTargetUsers(users) {
        return this.client.rest.channels.updateInviteTargetUsers(this.code, users);
    }
}
exports.default = Invite;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW52aXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL3N0cnVjdHVyZXMvSW52aXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFCQUFxQjtBQUNyQixnRUFBZ0M7QUFDaEMsNERBQTRCO0FBQzVCLHdGQUF3RDtBQUV4RCxzRkFBc0Q7QUFDdEQsd0VBQXdDO0FBQ3hDLHNFQUFzQztBQUN0QywwRUFBMEM7QUFHMUMsNENBQThGO0FBRTlGLDRCQUE0QjtBQUM1QixNQUFxQixNQUFNO0lBQ2YsY0FBYyxDQUFrRztJQUN4SCxpRkFBaUY7SUFDakYsc0JBQXNCLENBQVU7SUFDaEMsa0ZBQWtGO0lBQ2xGLHdCQUF3QixDQUFVO0lBQ2xDLGtEQUFrRDtJQUNsRCxTQUFTLENBQWdCO0lBQ3pCLE1BQU0sQ0FBVTtJQUNoQiwrQkFBK0I7SUFDL0IsSUFBSSxDQUFTO0lBQ2Isb0NBQW9DO0lBQ3BDLFNBQVMsQ0FBUTtJQUNqQiw2Q0FBNkM7SUFDN0MsU0FBUyxDQUFRO0lBQ2pCLDhHQUE4RztJQUM5RyxLQUFLLENBQVM7SUFDZCxtRkFBbUY7SUFDbkYsS0FBSyxDQUFxQjtJQUMxQiw2RkFBNkY7SUFDN0YsT0FBTyxDQUFnQjtJQUN2Qix1REFBdUQ7SUFDdkQsbUJBQW1CLENBQXVCO0lBQzFDLHlDQUF5QztJQUN6QyxPQUFPLENBQVE7SUFDZixnREFBZ0Q7SUFDaEQsTUFBTSxDQUFVO0lBQ2hCLDJEQUEyRDtJQUMzRCxPQUFPLENBQVU7SUFDakIsaUVBQWlFO0lBQ2pFLEtBQUssQ0FBcUI7SUFDMUIsd0VBQXdFO0lBQ3hFLGFBQWEsQ0FBcUM7SUFDbEQsc0RBQXNEO0lBQ3RELGlCQUFpQixDQUFzQjtJQUN2QyxnSUFBZ0k7SUFDaEksVUFBVSxDQUFxQjtJQUMvQiw2RUFBNkU7SUFDN0UsVUFBVSxDQUFRO0lBQ2xCLHVEQUF1RDtJQUN2RCxTQUFTLENBQVc7SUFDcEIsa0hBQWtIO0lBQ2xILElBQUksQ0FBYztJQUNsQixx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