"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const RESTManager_1 = tslib_1.__importDefault(require("./rest/RESTManager"));
const TypedCollection_1 = tslib_1.__importDefault(require("./util/TypedCollection"));
const PrivateChannel_1 = tslib_1.__importDefault(require("./structures/PrivateChannel"));
const GroupChannel_1 = tslib_1.__importDefault(require("./structures/GroupChannel"));
const User_1 = tslib_1.__importDefault(require("./structures/User"));
const Guild_1 = tslib_1.__importDefault(require("./structures/Guild"));
const TypedEmitter_1 = tslib_1.__importDefault(require("./util/TypedEmitter"));
const ShardManager_1 = tslib_1.__importDefault(require("./gateway/ShardManager"));
const UnavailableGuild_1 = tslib_1.__importDefault(require("./structures/UnavailableGuild"));
const Util_1 = tslib_1.__importDefault(require("./util/Util"));
const Errors_1 = require("./util/Errors");
const warning_1 = require("./util/warning");
const Time_1 = tslib_1.__importDefault(require("./util/Time"));
const node_util_1 = require("node:util");
// @ts-ignore optional dependency
let DiscordJSVoice;
try {
    DiscordJSVoice = require("@discordjs/voice");
}
catch { }
/* eslint-enable @typescript-eslint/ban-ts-comment, @typescript-eslint/no-redundant-type-constituents, @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-assignment, unicorn/prefer-module */
/** The primary class for interfacing with Discord. See {@link Types.Events.ClientEvents | Client Events} for a list of events. */
class Client extends TypedEmitter_1.default {
    _application;
    _user;
    /** A key-value mapping of channel IDs to guild IDs. In most cases, every channel listed here should be cached in their respective guild's {@link Guild#channels | channels collection}. */
    channelGuildMap = new Map();
    groupChannels;
    guildShardMap = new Map();
    guilds;
    options;
    privateChannels;
    ready;
    rest;
    shards;
    /** A key-value mapping of thread IDs to guild IDs. In most cases, every channel listed here should be cached in their respective guild's {@link Guild#threads | threads collection}. */
    threadGuildMap = new Map();
    time = new Time_1.default(this);
    unavailableGuilds;
    users;
    util = new Util_1.default(this);
    voiceAdapters = new Map();
    /**
     * @constructor
     * @param options The options to create the client with.
     */
    constructor(options) {
        super();
        this.time.set("start", Date.now());
        const disableCache = options?.disableCache === true || options?.disableCache === "no-warning";
        const colZero = {
            auditLogEntries: 0,
            autoModerationRules: 0,
            channels: 0,
            emojis: 0,
            groupChannels: 0,
            guilds: 0,
            guildThreads: 0,
            integrations: 0,
            invites: 0,
            members: 0,
            messages: 0,
            privateChannels: 0,
            roles: 0,
            scheduledEvents: 0,
            soundboardSounds: 0,
            stageInstances: 0,
            stickers: 0,
            unavailableGuilds: 0,
            users: 0,
            voiceMembers: 0,
            voiceStates: 0
        };
        if (options?.token) {
            if (options.auth)
                (0, warning_1.warning)(warning_1.WarningCodes.OCEANIC_AUTH_AND_TOKEN_PROVIDED);
            else
                options.auth = this._prefixToken(options.token);
            delete options.token;
        }
        this.options = {
            allowedMentions: options?.allowedMentions ?? {
                everyone: false,
                repliedUser: false,
                users: true,
                roles: true
            },
            auth: options?.auth ?? null,
            collectionLimits: disableCache ? colZero : {
                auditLogEntries: this.util._setLimit(options?.collectionLimits?.auditLogEntries, 50),
                autoModerationRules: this.util._setLimit(options?.collectionLimits?.autoModerationRules, Infinity),
                channels: this.util._setLimit(options?.collectionLimits?.channels, Infinity),
                emojis: this.util._setLimit(options?.collectionLimits?.emojis, Infinity),
                groupChannels: options?.collectionLimits?.groupChannels ?? 10,
                guilds: options?.collectionLimits?.guilds ?? Infinity,
                guildThreads: this.util._setLimit(options?.collectionLimits?.guildThreads, Infinity),
                integrations: this.util._setLimit(options?.collectionLimits?.integrations, Infinity),
                invites: this.util._setLimit(options?.collectionLimits?.invites, Infinity),
                members: this.util._setLimit(options?.collectionLimits?.members, Infinity),
                messages: this.util._setLimit(options?.collectionLimits?.messages, 100),
                privateChannels: options?.collectionLimits?.privateChannels ?? 25,
                roles: this.util._setLimit(options?.collectionLimits?.roles, Infinity),
                scheduledEvents: this.util._setLimit(options?.collectionLimits?.scheduledEvents, Infinity),
                soundboardSounds: this.util._setLimit(options?.collectionLimits?.soundboardSounds, Infinity),
                stageInstances: this.util._setLimit(options?.collectionLimits?.stageInstances, Infinity),
                stickers: this.util._setLimit(options?.collectionLimits?.stickers, Infinity),
                unavailableGuilds: options?.collectionLimits?.unavailableGuilds ?? Infinity,
                users: options?.collectionLimits?.users ?? Infinity,
                voiceMembers: this.util._setLimit(options?.collectionLimits?.voiceMembers, Infinity),
                voiceStates: this.util._setLimit(options?.collectionLimits?.voiceStates, Infinity)
            },
            defaultImageFormat: options?.defaultImageFormat ?? "png",
            defaultImageSize: options?.defaultImageSize ?? 4096,
            disableMemberLimitScaling: options?.disableMemberLimitScaling ?? false,
            restMode: false,
            disableCache
        };
        if (options?.disableCache === true) {
            (0, warning_1.warning)(warning_1.WarningCodes.OCEANIC_CACHE_DISABLED);
        }
        if (disableCache && options?.collectionLimits !== undefined && !(0, node_util_1.isDeepStrictEqual)(options.collectionLimits, colZero)) {
            (0, warning_1.warning)(warning_1.WarningCodes.OCEANIC_COLLECTIONS_LIMIT_WITH_CACHE_DISABLED);
        }
        this.groupChannels = new TypedCollection_1.default(GroupChannel_1.default, this, this.options.collectionLimits.groupChannels);
        this.guilds = new TypedCollection_1.default(Guild_1.default, this, this.options.collectionLimits.guilds);
        this.privateChannels = new TypedCollection_1.default(PrivateChannel_1.default, this, this.options.collectionLimits.privateChannels);
        this.ready = false;
        this.rest = new RESTManager_1.default(this, options?.rest);
        this.shards = new ShardManager_1.default(this, options?.gateway);
        this.unavailableGuilds = new TypedCollection_1.default(UnavailableGuild_1.default, this, this.options.collectionLimits.unavailableGuilds);
        this.users = new TypedCollection_1.default(User_1.default, this, this.options.collectionLimits.users);
    }
    /** The client's partial application. This will throw an error if not using a gateway connection or no shard is READY. If using a client for rest only, consider enabling rest mode. */
    get application() {
        if (this._application) {
            return this._application;
        }
        else {
            throw new Errors_1.UncachedError(`${this.constructor.name}#application is not present if not using a gateway connection or no shard is READY. Consider making sure you have connected your client, or enable rest mode.`);
        }
    }
    /** @deprecated Use {@link Time.start | time.start}. */
    get startTime() {
        return this.time.start ?? 0;
    }
    get uptime() {
        return this.time.start === null ? 0 : Date.now() - this.time.start;
    }
    /** The client's user. This will throw an error if not using a gateway connection or no shard is READY. If using a client for rest only, consider enabling rest mode. */
    get user() {
        if (this._user) {
            return this._user;
        }
        else {
            throw new Errors_1.UncachedError(`${this.constructor.name}#user is not present if not using a gateway connection or no shard is READY. Consider making sure you have connected your client, or enable rest mode.`);
        }
    }
    /** The active voice connections of this client. */
    get voiceConnections() {
        if (!DiscordJSVoice) {
            throw new Errors_1.DependencyError("Voice is only supported with @discordjs/voice installed.");
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
        return DiscordJSVoice.getVoiceConnections();
    }
    /** The function called to prefix the `token` option. This will always be called if the {@link Types.Client.ClientOptions#token | token} option is set. */
    _prefixToken(token) {
        return token.startsWith("Bot ") ? token : `Bot ${token}`;
    }
    /** Connect the client to Discord. */
    async connect() {
        if (this.options.restMode) {
            throw new TypeError("Rest mode has been enabled on this client. You cannot connect to the gateway.");
        }
        if (!this.options.auth || !this.options.auth.startsWith("Bot ")) {
            throw new TypeError("You must provide a bot token to connect. Make sure it has been prefixed with `Bot `.");
        }
        await this.shards.connect();
    }
    /**
     * Disconnect all shards.
     * @param reconnect If shards should be reconnected. Defaults to {@link Types/Gateway~GatewayOptions#autoReconnect | GatewayOptions#autoReconnect}
     */
    disconnect(reconnect = this.shards.options.autoReconnect) {
        return this.shards.disconnect(reconnect);
    }
    /**
     * Edit the client's status across all shards.
     * @param status The status.
     * @param activities An array of activities.
     */
    async editStatus(status, activities = []) {
        for (const [, shard] of this.shards)
            await shard.editStatus(status, activities);
    }
    /**
     * Get a channel from an ID. This will return undefined if the channel is not cached.
     * @param channelID The id of the channel.
     */
    getChannel(channelID) {
        if (this.channelGuildMap.has(channelID)) {
            return this.guilds.get(this.channelGuildMap.get(channelID))?.channels.get(channelID);
        }
        else if (this.threadGuildMap.has(channelID)) {
            return this.guilds.get(this.threadGuildMap.get(channelID))?.threads.get(channelID);
        }
        return (this.privateChannels.get(channelID) ?? this.groupChannels.get(channelID));
    }
    /**
     * Get a helper instance that can be used with a specific access token.
     * @param accessToken The access token. Must be prefixed with `Bearer `.
     */
    getOAuthHelper(accessToken) {
        return this.rest.oauth.getHelper(accessToken);
    }
    /**
     * Get a voice connection.
     * @param guildID The ID of the guild the voice channel belongs to.
     */
    // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
    getVoiceConnection(guildID) {
        if (!DiscordJSVoice) {
            throw new Errors_1.DependencyError("Voice is only supported with @discordjs/voice installed.");
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        return DiscordJSVoice.getVoiceConnection(guildID);
    }
    /**
     * Join a voice channel.
     * @param options The options to join the channel with.
     * */
    joinVoiceChannel(options) {
        if (!DiscordJSVoice) {
            throw new Errors_1.DependencyError("Voice is only supported with @discordjs/voice installed.");
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
        return DiscordJSVoice.joinVoiceChannel({
            channelId: options.channelID,
            guildId: options.guildID,
            debug: options.debug,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            adapterCreator: options.voiceAdapterCreator,
            selfDeaf: options.selfDeaf,
            selfMute: options.selfMute
        });
    }
    /**
     * Leave a voice channel.
     * @param guildID The ID of the guild the voice channel belongs to.
     */
    leaveVoiceChannel(guildID) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
        return this.getVoiceConnection(guildID)?.destroy();
    }
    /**
     * Initialize this client for rest only use. Currently, this sets both the `application` and `user` properties (if not already present), as would happen with a gateway connection.
     * @param fakeReady If the client should emit a ready event. Defaults to true.
     */
    async restMode(fakeReady = true) {
        this._application ??= await this.rest.applications.getCurrent();
        this._user ??= await this.rest.oauth.getCurrentUser();
        this.options.restMode = true;
        if (fakeReady) {
            this.emit("ready");
        }
        return this;
    }
}
exports.default = Client;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL0NsaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSw2RUFBNkM7QUFDN0MscUZBQXFEO0FBQ3JELHlGQUF5RDtBQUN6RCxxRkFBcUQ7QUFDckQscUVBQXFDO0FBQ3JDLHVFQUF1QztBQUN2QywrRUFBK0M7QUFFL0Msa0ZBQWtEO0FBQ2xELDZGQUE2RDtBQUU3RCwrREFBK0I7QUFDL0IsMENBQStEO0FBRS9ELDRDQUF1RDtBQUN2RCwrREFBK0I7QUFJL0IseUNBQThDO0FBRTlDLGlDQUFpQztBQUNqQyxJQUFJLGNBQTZELENBQUM7QUFDbEUsSUFBSSxDQUFDO0lBQ0QsY0FBYyxHQUFHLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBQ2pELENBQUM7QUFBQyxNQUFNLENBQUMsQ0FBQSxDQUFDO0FBQ1YsNE1BQTRNO0FBRTVNLGtJQUFrSTtBQUNsSSxNQUFxQixNQUF3RSxTQUFRLHNCQUFlO0lBQ3hHLFlBQVksQ0FBcUI7SUFDakMsS0FBSyxDQUFnQjtJQUM3QiwyTEFBMkw7SUFDM0wsZUFBZSxHQUFHLElBQUksR0FBRyxFQUFrQixDQUFDO0lBQzVDLGFBQWEsQ0FBZ0U7SUFDN0UsYUFBYSxHQUFHLElBQUksR0FBRyxFQUFrQixDQUFDO0lBQzFDLE1BQU0sQ0FBa0U7SUFDeEUsT0FBTyxDQUFxQztJQUM1QyxlQUFlLENBQW9FO0lBQ25GLEtBQUssQ0FBVTtJQUNmLElBQUksQ0FBYztJQUNsQixNQUFNLENBQWU7SUFDckIsd0xBQXdMO0lBQ3hMLGNBQWMsR0FBRyxJQUFJLEdBQUcsRUFBa0IsQ0FBQztJQUMzQyxJQUFJLEdBQUcsSUFBSSxjQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEIsaUJBQWlCLENBQXNFO0lBQ3ZGLEtBQUssQ0FBNkM7SUFDbEQsSUFBSSxHQUFHLElBQUksY0FBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RCLGFBQWEsR0FB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