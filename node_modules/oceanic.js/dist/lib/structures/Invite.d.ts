import GuildScheduledEvent from "./GuildScheduledEvent";
import type User from "./User";
import PartialApplication from "./PartialApplication";
import InviteGuild from "./InviteGuild";
import InviteRole from "./InviteRole";
import type * as Types from "../types/namespaced";
import type Client from "../Client";
import { type InviteTargetTypes, type InviteTypes } from "../Constants";
/** Represents an invite. */
export default class Invite<CH extends Types.Invites.InviteChannel = Types.Invites.InviteChannel> {
    private _cachedChannel;
    /** The approximate number of total members in the guild this invite leads to. */
    approximateMemberCount?: number;
    /** The approximate number of online members in the guild this invite leads to. */
    approximatePresenceCount?: number;
    /** The ID of the channel this invite leads to. */
    channelID: string | null;
    client: Client;
    /** The code of this invite. */
    code: string;
    /** When this invite was created. */
    createdAt?: Date;
    /** The date at which this invite expires. */
    expiresAt?: Date;
    /** This invite's [flags](https://discord.com/developers/docs/resources/invite#invite-object-invite-flags). */
    flags: number;
    /** The guild this invite leads to or `null` if this invite leads to a Group DM. */
    guild: InviteGuild | null;
    /** The ID of the guild this invite leads to or `null` if this invite leads to a Group DM. */
    guildID: string | null;
    /** The scheduled event associated with this invite. */
    guildScheduledEvent?: GuildScheduledEvent;
    /** The user that created this invite. */
    inviter?: User;
    /** The time after which this invite expires. */
    maxAge?: number;
    /** The maximum number of times this invite can be used, */
    maxUses?: number;
    /** The roles assigned to the user upon accepting the invite . */
    roles?: Array<InviteRole>;
    /** @deprecated The stage instance in the invite this channel is for. */
    stageInstance?: Types.Invites.InviteStageInstance;
    /** The embedded application this invite will open. */
    targetApplication?: PartialApplication;
    /** The [target type](https://discord.com/developers/docs/resources/invite#invite-object-invite-target-types) of this invite. */
    targetType?: InviteTargetTypes;
    /** The user whose stream to display for this voice channel stream invite. */
    targetUser?: User;
    /** If this invite only grants temporary membership. */
    temporary?: boolean;
    /** The [type](https://discord.com/developers/docs/resources/invite#invite-object-invite-types) of this invite. */
    type: InviteTypes;
    /** The number of times this invite has been used. */
    uses: number | undefined;
    constructor(data: Types.Invites.RawInvite, client: Client);
    static withCounts<CH extends Types.Invites.GuildInviteChannel = Types.Invites.GuildInviteChannel>(data: Types.Invites.RawInvite, client: Client): InviteWithCounts<CH>;
    static withCountsAndScheduledEvent<CH extends Types.Invites.GuildInviteChannel = Types.Invites.GuildInviteChannel>(data: Types.Invites.RawInvite, client: Client): InviteWithCountsAndScheduledEvent<CH>;
    static withMetadata<CH extends Types.Invites.GuildInviteChannel = Types.Invites.GuildInviteChannel>(data: Types.Invites.RawInvite, client: Client): InviteWithMetadata<CH>;
    static withScheduledEvent<CH extends Types.Invites.GuildInviteChannel = Types.Invites.GuildInviteChannel>(data: Types.Invites.RawInvite, client: Client): InviteWithScheduledEvent<CH>;
    protected update(data: Partial<Types.Invites.RawInvite>): void;
    /** The channel this invite leads to. If the channel is not cached, this will be a partial with only `id`, `name`, and `type`. */
    get channel(): (CH extends Types.Channels.AnyInviteChannel ? CH : Types.Channels.PartialInviteChannel) | null;
    /**
     * Delete this invite.
     * @param reason The reason for deleting this invite.
     */
    deleteInvite(reason?: string): Promise<Invite<CH>>;
    /** Get the target users for this invite. Requires being the inviter or having the `MANAGE_GUILD` or `VIEW_AUDIT_LOG` permission. */
    getTargetUsers(): Promise<Array<string>>;
    /** et the target users job status for this invite. Requires being the inviter or having the `MANAGE_GUILD` or `VIEW_AUDIT_LOG` permission. */
    getTargetUsersJobStatus(): Promise<Types.Invites.InviteTargetUsersJobStatusResponse>;
    /** Whether this invite belongs to a cached channel. The only difference on using this method over a simple if statement is to easily update all the invite properties typing definitions based on the channel it belongs to. */
    inCachedChannel(): this is Invite<Types.Channels.AnyInviteChannel>;
    inCachedGuildChannel(): this is Invite<Types.Channels.AnyGuildInviteChannel>;
    inDMChannel(): this is Invite<Exclude<Types.Invites.DMInviteChannel, Types.Shared.Uncached>>;
    toJSON(): Types.JSON.JSONInvite;
    /**
     * Update the target users for this invite. Requires being the inviter or having the `MANAGE_GUILD` permission.
     * @param users The IDs of the users to allow accepting the invite.
     */
    updateInviteTargetUsers(users: Array<string>): Promise<null>;
}
export interface InviteWithoutCounts<CH extends Types.Invites.InviteChannel = Types.Invites.InviteChannel> extends Invite<CH> {
    approximateMemberCount: undefined;
    approximatePresenceCount: undefined;
    createdAt: undefined;
    guildScheduledEvent: undefined;
    maxAge: undefined;
    maxUses: undefined;
    temporary: undefined;
    uses: undefined;
}
export interface InviteWithScheduledEvent<CH extends Types.Invites.GuildInviteChannel = Types.Invites.GuildInviteChannel> extends Invite<CH> {
    approximateMemberCount: undefined;
    approximatePresenceCount: undefined;
    createdAt: undefined;
    guildScheduledEvent: GuildScheduledEvent | undefined;
    maxAge: undefined;
    maxUses: undefined;
    temporary: undefined;
    uses: undefined;
}
export interface InviteWithCounts<CH extends Types.Invites.InviteChannel = Types.Invites.GuildInviteChannel | Types.Invites.DMInviteChannel> extends Invite<CH> {
    approximateMemberCount: number;
    approximatePresenceCount: number | undefined;
    createdAt: undefined;
    guildScheduledEvent: undefined;
    maxAge: undefined;
    maxUses: undefined;
    temporary: undefined;
    uses: undefined;
}
export interface InviteWithCountsAndScheduledEvent<CH extends Types.Invites.GuildInviteChannel = Types.Invites.GuildInviteChannel> extends Invite<CH> {
    approximateMemberCount: number;
    approximatePresenceCount: number;
    createdAt: undefined;
    guildScheduledEvent: GuildScheduledEvent | undefined;
    maxAge: undefined;
    maxUses: undefined;
    temporary: undefined;
    uses: undefined;
}
export interface InviteWithMetadata<CH extends Types.Invites.GuildInviteChannel = Types.Invites.GuildInviteChannel> extends Invite<CH> {
    approximateMemberCount: undefined;
    approximatePresenceCount: undefined;
    createdAt: Date;
    guildScheduledEvent: undefined;
    maxAge: number;
    maxUses: number;
    temporary: boolean;
    uses: number;
}
