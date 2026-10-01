/** @module InteractionResolvedChannel */
import type AnnouncementChannel from "./AnnouncementChannel";
import type TextChannel from "./TextChannel";
import Permission from "./Permission";
import Channel from "./Channel";
import type ForumChannel from "./ForumChannel";
import type Guild from "./Guild";
import type * as Types from "../types/namespaced";
import type Client from "../Client";
/** Represents a channel from an interaction option. This can be any guild channel, or a direct message. */
export default class InteractionResolvedChannel extends Channel {
    private _cachedCompleteChannel?;
    private _cachedGuild?;
    private _cachedParent?;
    /** The permissions the bot has in the channel. */
    appPermissions: Permission;
    /** The id of the guild this channel is in. */
    guildID?: string;
    /** The ID of last message sent in this channel. */
    lastMessageID?: string | null;
    /** The timestamp of the last pinned message in this channel. */
    lastPinTimestamp?: string | null;
    /** The name of this channel. */
    name: string | null;
    /** If this channel is age gated. */
    nsfw?: boolean;
    /** The ID of the parent of this channel, if this represents a thread. */
    parentID: string | null;
    /** The permissions the user has in the channel. */
    permissions: Permission;
    /** The position of this channel on the sidebar. */
    position?: number;
    /** The amount of seconds between non-moderators sending messages. */
    rateLimitPerUser?: number;
    /** The [thread metadata](https://discord.com/developers/docs/resources/channel#thread-metadata-object-thread-metadata-structure) associated with this channel, if this represents a thread. */
    threadMetadata: Types.Channels.ThreadMetadata | Types.Channels.PrivateThreadMetadata | null;
    /** The topic of the channel. */
    topic?: string | null;
    type: Types.Channels.ImplementedChannels;
    constructor(data: Types.Channels.RawInteractionResolvedChannel, client: Client);
    /** The complete channel this channel option represents, if it's cached. */
    get completeChannel(): Types.Channels.AnyImplementedChannel | undefined;
    /** The guild associated with this channel. This will throw an error if the guild is not cached. */
    get guild(): Guild | null;
    /** The parent of this channel, if this represents a thread. */
    get parent(): TextChannel | AnnouncementChannel | ForumChannel | null | undefined;
    toJSON(): Types.JSON.JSONInteractionResolvedChannel;
}
