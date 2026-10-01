/** @module Client */
import type * as Types from "./types/namespaced";
import RESTManager from "./rest/RESTManager";
import TypedCollection from "./util/TypedCollection";
import PrivateChannel from "./structures/PrivateChannel";
import GroupChannel from "./structures/GroupChannel";
import User from "./structures/User";
import Guild from "./structures/Guild";
import TypedEmitter from "./util/TypedEmitter";
import type ClientApplication from "./structures/ClientApplication";
import ShardManager from "./gateway/ShardManager";
import UnavailableGuild from "./structures/UnavailableGuild";
import type ExtendedUser from "./structures/ExtendedUser";
import Util from "./util/Util";
import type OAuthHelper from "./rest/OAuthHelper";
import Time from "./util/Time";
import type { DiscordGatewayAdapterLibraryMethods, VoiceConnection } from "@discordjs/voice";
/** The primary class for interfacing with Discord. See {@link Types.Events.ClientEvents | Client Events} for a list of events. */
export default class Client<E extends Types.Events.ClientEvents = Types.Events.ClientEvents> extends TypedEmitter<E> {
    private _application?;
    private _user?;
    /** A key-value mapping of channel IDs to guild IDs. In most cases, every channel listed here should be cached in their respective guild's {@link Guild#channels | channels collection}. */
    channelGuildMap: Map<string, string>;
    groupChannels: TypedCollection<Types.Channels.RawGroupChannel, GroupChannel>;
    guildShardMap: Map<string, number>;
    guilds: TypedCollection<Types.Guilds.RawGuild, Guild, [rest?: boolean]>;
    options: Types.Client.ClientInstanceOptions;
    privateChannels: TypedCollection<Types.Channels.RawPrivateChannel, PrivateChannel>;
    ready: boolean;
    rest: RESTManager;
    shards: ShardManager;
    /** A key-value mapping of thread IDs to guild IDs. In most cases, every channel listed here should be cached in their respective guild's {@link Guild#threads | threads collection}. */
    threadGuildMap: Map<string, string>;
    time: Time;
    unavailableGuilds: TypedCollection<Types.Guilds.RawUnavailableGuild, UnavailableGuild>;
    users: TypedCollection<Types.Users.RawUser, User>;
    util: Util;
    voiceAdapters: Map<string, DiscordGatewayAdapterLibraryMethods>;
    /**
     * @constructor
     * @param options The options to create the client with.
     */
    constructor(options?: Types.Client.ClientOptions);
    /** The client's partial application. This will throw an error if not using a gateway connection or no shard is READY. If using a client for rest only, consider enabling rest mode. */
    get application(): ClientApplication;
    /** @deprecated Use {@link Time.start | time.start}. */
    get startTime(): number;
    get uptime(): number;
    /** The client's user. This will throw an error if not using a gateway connection or no shard is READY. If using a client for rest only, consider enabling rest mode. */
    get user(): ExtendedUser;
    /** The active voice connections of this client. */
    get voiceConnections(): Map<string, VoiceConnection>;
    /** The function called to prefix the `token` option. This will always be called if the {@link Types.Client.ClientOptions#token | token} option is set. */
    _prefixToken(token: string): string;
    /** Connect the client to Discord. */
    connect(): Promise<void>;
    /**
     * Disconnect all shards.
     * @param reconnect If shards should be reconnected. Defaults to {@link Types/Gateway~GatewayOptions#autoReconnect | GatewayOptions#autoReconnect}
     */
    disconnect(reconnect?: boolean): void;
    /**
     * Edit the client's status across all shards.
     * @param status The status.
     * @param activities An array of activities.
     */
    editStatus(status: Types.Gateway.SendStatuses, activities?: Array<Types.Gateway.BotActivity>): Promise<void>;
    /**
     * Get a channel from an ID. This will return undefined if the channel is not cached.
     * @param channelID The id of the channel.
     */
    getChannel<T extends Types.Channels.AnyChannel = Types.Channels.AnyChannel>(channelID: string): T | undefined;
    /**
     * Get a helper instance that can be used with a specific access token.
     * @param accessToken The access token. Must be prefixed with `Bearer `.
     */
    getOAuthHelper(accessToken: string): OAuthHelper;
    /**
     * Get a voice connection.
     * @param guildID The ID of the guild the voice channel belongs to.
     */
    getVoiceConnection(guildID: string): VoiceConnection | undefined;
    /**
     * Join a voice channel.
     * @param options The options to join the channel with.
     * */
    joinVoiceChannel(options: Types.Voice.JoinVoiceChannelOptions): VoiceConnection;
    /**
     * Leave a voice channel.
     * @param guildID The ID of the guild the voice channel belongs to.
     */
    leaveVoiceChannel(guildID: string): void;
    /**
     * Initialize this client for rest only use. Currently, this sets both the `application` and `user` properties (if not already present), as would happen with a gateway connection.
     * @param fakeReady If the client should emit a ready event. Defaults to true.
     */
    restMode(fakeReady?: boolean): Promise<this>;
}
