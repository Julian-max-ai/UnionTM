/** @module GuildChannel */
import Channel from "./Channel";
import type Guild from "./Guild";
import type * as Types from "../types/namespaced";
import type Client from "../Client";
/** Represents a guild channel. */
export default class GuildChannel extends Channel {
    private _cachedGuild?;
    private _cachedParent?;
    /** The id of the guild this channel is in. */
    guildID: string;
    /** The name of this channel. */
    name: string;
    /** The ID of the parent of this channel, if applicable. */
    parentID: string | null;
    type: Types.Channels.GuildChannels;
    constructor(data: Types.Channels.RawGuildChannel, client: Client);
    protected update(data: Partial<Types.Channels.RawGuildChannel>): void;
    /** The guild associated with this channel. This will throw an error if the guild is not cached. */
    get guild(): Guild;
    /**
     * The parent of this channel, if applicable.
     *
     * If the channel is an {@link AnnouncementThread}, {@link PublicThread}, or {@link PrivateThread}, this will be a {@link TextChannel}, {@link AnnouncementChannel}, {@link ForumChannel}, or {@link MediaChannel}.
     *
     * If the channel is a {@link TextChannel}, {@link VoiceChannel}, {@link AnnouncementChannel}, {@link ForumChannel}, or {@link MediaChannel}, this will be a {@link CategoryChannel}.
     * @returns If undefined, no attempt was made to resolve the parent channel. If null, the parent channel was attempted to be resolved but was not found in the client's cache.
     */
    get parent(): Types.Channels.ParentChannelType<this> | null | undefined;
    /**
     * Edit this channel.
     * @param options The options for editing the channel.
     */
    edit(options: Types.Channels.EditChannelOptionsMap[this["type"]]): Promise<this>;
    toJSON(): Types.JSON.JSONGuildChannel;
}
