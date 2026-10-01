"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const config_1 = tslib_1.__importDefault(require("./compression/config"));
const TypedEmitter_1 = tslib_1.__importDefault(require("../util/TypedEmitter"));
const Bucket_1 = tslib_1.__importDefault(require("../rest/Bucket"));
const Constants_1 = require("../Constants");
const Base_1 = tslib_1.__importDefault(require("../structures/Base"));
const ExtendedUser_1 = tslib_1.__importDefault(require("../structures/ExtendedUser"));
const Errors_1 = require("../util/Errors");
const ClientApplication_1 = tslib_1.__importDefault(require("../structures/ClientApplication"));
const ws_1 = tslib_1.__importDefault(require("ws"));
const node_crypto_1 = require("node:crypto");
const node_util_1 = require("node:util");
/* eslint-disable @typescript-eslint/ban-ts-comment, @typescript-eslint/no-redundant-type-constituents, @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-assignment, unicorn/prefer-module, @typescript-eslint/no-unsafe-member-access */
// @ts-ignore
let Erlpack;
try {
    Erlpack = require("erlpack");
}
catch { }
/* eslint-enable @typescript-eslint/ban-ts-comment, @typescript-eslint/no-redundant-type-constituents, @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-assignment, unicorn/prefer-module */
/** Represents a gateway connection to Discord. See {@link Types.Events.ShardEvents | Shard Events} for a list of events. */
class Shard extends TypedEmitter_1.default {
    _compressor;
    _connectTimeout;
    _getAllUsersCount;
    _getAllUsersQueue;
    _guildCreateTimeout;
    _heartbeatInterval;
    _requestChannelInfoPromise;
    _requestMembersPromise;
    _requestSoundboardSoundsPromise;
    client;
    connectAttempts;
    connecting;
    globalBucket;
    id;
    lastHeartbeatAck;
    lastHeartbeatReceived;
    lastHeartbeatSent;
    latency;
    manager;
    preReady;
    presence;
    presenceUpdateBucket;
    ready;
    reconnectInterval;
    resumeURL;
    sequence;
    sessionID;
    status;
    ws;
    constructor(id, manager) {
        super();
        Object.defineProperties(this, {
            client: {
                value: manager.client,
                enumerable: false,
                writable: false,
                configurable: false
            },
            manager: {
                value: manager,
                enumerable: false,
                writable: true,
                configurable: false
            },
            ws: {
                value: null,
                enumerable: false,
                writable: true,
                configurable: false
            }
        });
        this.onPacket = this.onPacket.bind(this);
        this.onWSClose = this.onWSClose.bind(this);
        this.onWSError = this.onWSError.bind(this);
        this.onWSMessage = this.onWSMessage.bind(this);
        this.onWSOpen = this.onWSOpen.bind(this);
        this.connectAttempts = 0;
        this._connectTimeout = null;
        this.connecting = false;
        this._getAllUsersCount = {};
        this._getAllUsersQueue = [];
        this._guildCreateTimeout = null;
        this._heartbeatInterval = null;
        this.id = id;
        this.lastHeartbeatAck = true;
        this.lastHeartbeatReceived = 0;
        this.lastHeartbeatSent = 0;
        this.latency = Infinity;
        this.preReady = false;
        this.ready = false;
        this.reconnectInterval = 1000;
        this._requestChannelInfoPromise = {};
        this._requestMembersPromise = {};
        this._requestSoundboardSoundsPromise = {};
        this.resumeURL = null;
        this.sequence = 0;
        this.sessionID = null;
        this.status = "disconnected";
        this.hardReset();
    }
    _ready(data) {
        this.connectAttempts = 0;
        this.reconnectInterval = 1000;
        this.connecting = false;
        if (this._connectTimeout) {
            clearTimeout(this._connectTimeout);
        }
        this.status = "ready";
        this.client.shards["_ready"](this.id);
        this.client["_application"] = new ClientApplication_1.default(data.application, this.client);
        if (this.client["_user"]) {
            this.client.users.update(data.user);
        }
        else {
            this.client["_user"] = this.client.users.add(new ExtendedUser_1.default(data.user, this.client));
        }
        let url = data.resume_gateway_url;
        if (url.includes("?")) {
            url = url.slice(0, url.indexOf("?"));
        }
        if (!url.endsWith("/")) {
            url += "/";
        }
        this.resumeURL = `${url}?v=${Constants_1.GATEWAY_VERSION}&encoding=${Erlpack ? "etf" : "json"}`;
        if (this.client.shards.options.compress) {
            const type = this.client.shards.options.compress === "zstd-stream" ? "zstd-stream" : "zlib-stream";
            this.resumeURL += `&compress=${type}`;
        }
        this.sessionID = data.session_id;
        for (const guild of data.guilds) {
            this.client.guilds.delete(guild.id);
            this.client.unavailableGuilds.update(guild);
        }
        this.preReady = true;
        this.emit("preReady");
        if (this.client.unavailableGuilds.size !== 0 && data.guilds.length !== 0) {
            void this.restartGuildCreateTimeout();
        }
        else {
            void this.checkReady();
        }
    }
    _resume() {
        this.connectAttempts = 0;
        this.reconnectInterval = 1000;
        this.connecting = false;
        if (this._connectTimeout) {
            clearTimeout(this._connectTimeout);
        }
        this.status = "ready";
        this.client.shards["_ready"](this.id);
        void this.checkReady();
        this.emit("resume");
    }
    async checkReady() {
        if (!this.ready) {
            if (this._getAllUsersQueue.length !== 0) {
                const id = this._getAllUsersQueue.shift();
                await this.requestGuildMembers(id);
                return;
            }
            if (Object.keys(this._getAllUsersCount).length === 0) {
                this.ready = true;
                this.emit("ready");
            }
        }
    }
    createGuild(data) {
        this.client.guildShardMap.set(data.id, this.id);
        const guild = this.client.guilds.update(data);
        if (this.client.shards.options.getAllUsers && guild.members.size < guild.memberCount) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
            void this.requestGuildMembers(guild.id, { presences: (this.client.shards.options.intents & Constants_1.Intents.GUILD_PRESENCES) === Constants_1.Intents.GUILD_PRESENCES });
        }
        return guild;
    }
    async initialize() {
        if (!this._token) {
            return this.disconnect(false, new TypeError("Invalid Token."));
        }
        this.status = "connecting";
        if (this.client.shards.options.compress) {
            const type = this.client.shards.options.compress;
            const library = this.client.shards.options.compressLibrary;
            const config = config_1.default[type]?.find(cnf => cnf.name === library);
            if (!config) {
                throw new Error("Invalid compression config");
            }
            this.client.emit("debug", `Initializing ${type} compression with ${library}.`);
            this._compressor = new (config.getClass())(this);
        }
        if (!this.client.shards.options.override.gatewayURLIsResumeURL && this.sessionID) {
            if (this.resumeURL === null) {
                this.client.emit("warn", "Resume url is not currently present. Discord may disconnect you quicker.", this.id);
            }
            this.ws = new ws_1.default(this.resumeURL ?? await this.client.shards["_gatewayURLForShard"](this), this.client.shards.options.ws);
        }
        else {
            this.ws = new ws_1.default(await this.client.shards["_gatewayURLForShard"](this), this.client.shards.options.ws);
        }
        /* eslint-disable @typescript-eslint/unbound-method */
        this.ws.on("close", this.onWSClose);
        this.ws.on("error", this.onWSError);
        this.ws.on("message", this.onWSMessage);
        this.ws.on("open", this.onWSOpen);
        /* eslint-enable @typescript-eslint/unbound-method */
        this._connectTimeout = setTimeout(() => {
            if (this.connecting) {
                this.disconnect(undefined, new Error("Connection timeout."));
            }
        }, this.client.shards.options.connectionTimeout);
    }
    onPacket(packet) {
        if ("s" in packet && packet.s) {
            if (packet.s > this.sequence + 1 && this.ws && this.status !== "resuming") {
                this.client.emit("warn", `Non-consecutive sequence (${this.sequence} -> ${packet.s})`, this.id);
            }
            this.sequence = packet.s;
        }
        switch (packet.op) {
            case Constants_1.GatewayOPCodes.DISPATCH: {
                this.client.emit("packet", packet, this.id);
                this.manager.dispatcher["handle"](packet, this);
                break;
            }
            case Constants_1.GatewayOPCodes.HEARTBEAT: {
                this.heartbeat(true);
                break;
            }
            case Constants_1.GatewayOPCodes.INVALID_SESSION: {
                if (packet.d) {
                    this.client.emit("warn", "Session Invalidated. Session may be resumable, attempting to resume..", this.id);
                    this.resume();
                }
                else {
                    this.sequence = 0;
                    this.sessionID = null;
                    this.client.emit("warn", "Session Invalidated. Session is not resumable, requesting a new session..", this.id);
                    this.identify();
                }
                break;
            }
            case Constants_1.GatewayOPCodes.RECONNECT: {
                this.client.emit("debug", "Reconnect requested by Discord.", this.id);
                this.disconnect(true);
                break;
            }
            case Constants_1.GatewayOPCodes.HELLO: {
                if (this._heartbeatInterval) {
                    clearInterval(this._heartbeatInterval);
                }
                this._heartbeatInterval = setInterval(() => this.heartbeat(false), packet.d.heartbeat_interval);
                this.connecting = false;
                if (this._connectTimeout) {
                    clearTimeout(this._connectTimeout);
                }
                this._connectTimeout = null;
                if (this.sessionID) {
                    this.resume();
                }
                else {
                    this.identify();
                    this.heartbeat();
                }
                this.client.emit("hello", packet.d.heartbeat_interval, this.id);
                break;
            }
            case Constants_1.GatewayOPCodes.HEARTBEAT_ACK: {
                this.lastHeartbeatAck = true;
                this.lastHeartbeatReceived = Date.now();
                this.latency = this.lastHeartbeatReceived - this.lastHeartbeatSent;
                if (isNaN(this.latency)) {
                    this.latency = Infinity;
                }
                break;
            }
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            default: {
                this.client.emit("warn", `Unrecognized gateway packet: ${packet}`, this.id);
            }
        }
    }
    async onWSClose(code, r) {
        const reason = r.toString();
        let err;
        let reconnect;
        if (code) {
            this.client.emit("debug", `${code === 1000 ? "Clean" : "Unclean"} WS close: ${code}: ${reason}`, this.id);
            switch (code) {
                case 1001: {
                    err = new Errors_1.GatewayError("CloudFlare WebSocket proxy restarting.", code);
                    break;
                }
                case 1006: {
                    err = new Errors_1.GatewayError("Connection reset by peer. This is a network issue. If you are concerned, talk to your ISP or host.", code);
                    break;
                }
                case Constants_1.GatewayCloseCodes.UNKNOWN_OPCODE: {
                    err = new Errors_1.GatewayError("Gateway received an unknown opcode.", code);
                    break;
                }
                case Constants_1.GatewayCloseCodes.DECODE_ERROR: {
                    err = new Errors_1.GatewayError("Gateway received an improperly encoded packet.", code);
                    break;
                }
                case Constants_1.GatewayCloseCodes.NOT_AUTHENTICATED: {
                    err = new Errors_1.GatewayError("Gateway received a packet before authentication.", code);
                    this.sessionID = null;
                    break;
                }
                case Constants_1.GatewayCloseCodes.AUTHENTICATION_FAILED: {
                    err = new Errors_1.GatewayError("Authentication failed.", code);
                    this.sessionID = null;
                    reconnect = false;
                    this.client.emit("error", new Error(`Invalid Token: ${this._token}`));
                    break;
                }
                case Constants_1.GatewayCloseCodes.ALREADY_AUTHENTICATED: {
                    err = new Errors_1.GatewayError("Gateway received an authentication attempt while already authenticated.", code);
                    break;
                }
                case Constants_1.GatewayCloseCodes.INVALID_SEQUENCE: {
                    err = new Errors_1.GatewayError("Gateway received an invalid sequence.", code);
                    this.sequence = 0;
                    break;
                }
                case Constants_1.GatewayCloseCodes.RATE_LIMITED: {
                    err = new Errors_1.GatewayError("Gateway connection was ratelimited.", code);
                    break;
                }
                case Constants_1.GatewayCloseCodes.INVALID_SHARD: {
                    err = new Errors_1.GatewayError("Invalid sharding specified.", code);
                    this.sessionID = null;
                    reconnect = false;
                    break;
                }
                case Constants_1.GatewayCloseCodes.SHARDING_REQUIRED: {
                    err = new Errors_1.GatewayError("Shard would handle too many guilds (>2500 each).", code);
                    this.sessionID = null;
                    reconnect = false;
                    break;
                }
                case Constants_1.GatewayCloseCodes.INVALID_API_VERSION: {
                    err = new Errors_1.GatewayError("Invalid API version.", code);
                    this.sessionID = null;
                    reconnect = false;
                    break;
                }
                case Constants_1.GatewayCloseCodes.INVALID_INTENTS: {
                    err = new Errors_1.GatewayError("Invalid intents specified.", code);
                    this.sessionID = null;
                    reconnect = false;
                    break;
                }
                case Constants_1.GatewayCloseCodes.DISALLOWED_INTENTS: {
                    const disallowed = this.client.shards.options.lookupDisallowedIntents ? await this.client.util.detectMissingPrivilegedIntents() : [];
                    let message = "Disallowed intents specified. Make sure any privileged intents you're trying to access have been enabled in the developer portal.";
                    if (disallowed.length !== 0) {
                        // application should always be present after the call to detectMissingPrivilegedIntents, but just in case it isn't, we don't want to swallow this disallowed intents error with a lib error
                        message = `Disallowed intents specified. You are missing: ${disallowed.join(", ")}. Make sure they are enabled here: https://discord.com/developers/applications/${this.client["_application"]?.id || "unknown"}/bot`;
                    }
                    err = new Errors_1.GatewayError(message, code);
                    this.sessionID = null;
                    reconnect = false;
                    break;
                }
                default: {
                    err = new Errors_1.GatewayError(`Unknown close: ${code}: ${reason}`, code);
                    break;
                }
            }
            this.disconnect(reconnect, err);
        }
    }
    onWSError(err) {
        this.client.emit("error", err, this.id);
    }
    /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-unsafe-argument */
    async onWSMessage(data) {
        if (typeof data === "string") {
            data = Buffer.from(data);
        }
        try {
            if (data instanceof ArrayBuffer) {
                if (this.client.shards.options.compress || Erlpack) {
                    data = Buffer.from(data);
                }
            }
            else if (Array.isArray(data)) {
                data = Buffer.concat(data);
            }
            const buf = data;
            if (this.client.shards.options.compress) {
                let result = await this._compressor.decompress(buf);
                if (result === null) {
                    return;
                }
                if (Erlpack) {
                    return this.onPacket(Erlpack.unpack(result));
                }
                else {
                    // After the valid data, all the remaining octets are filled with zero, so remove them.
                    let last = result.length - 1;
                    if (result[last] === 0) {
                        while (result[last - 1] === 0 && last > 0)
                            last--;
                        result = result.subarray(0, last);
                    }
                    return this.onPacket(JSON.parse(String(result)));
                }
            }
            else if (Erlpack) {
                return this.onPacket(Erlpack.unpack(buf));
            }
            else {
                return this.onPacket(JSON.parse(String(buf)));
            }
        }
        catch (err) {
            this.client.emit("error", err, this.id);
        }
    }
    /* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-unsafe-argument */
    onWSOpen() {
        this.status = "handshaking";
        this.client.emit("connect", this.id);
        this.lastHeartbeatAck = true;
    }
    async restartGuildCreateTimeout() {
        if (this._guildCreateTimeout) {
            clearTimeout(this._guildCreateTimeout);
            this._guildCreateTimeout = null;
        }
        if (!this.ready) {
            if (this.client.unavailableGuilds.size === 0) {
                return this.checkReady();
            }
            this._guildCreateTimeout = setTimeout(this.checkReady.bind(this), this.client.shards.options.guildCreateTimeout);
        }
    }
    sendPresenceUpdate() {
        this.send(Constants_1.GatewayOPCodes.PRESENCE_UPDATE, {
            activities: this.presence.activities,
            afk: !!this.presence.afk,
            since: this.presence.status === "idle" ? Date.now() : null,
            status: this.presence.status
        });
    }
    get _token() {
        return this.client.options.auth;
    }
    /** Connect this shard. */
    async connect() {
        if (this.ws && this.ws.readyState !== ws_1.default.CLOSED) {
            this.client.emit("error", new Error("Shard#connect called while existing connection is established."), this.id);
            return;
        }
        ++this.connectAttempts;
        this.connecting = true;
        await this.initialize();
    }
    disconnect(reconnect = this.client.shards.options.autoReconnect, error) {
        if (!this.ws) {
            return;
        }
        if (this._heartbeatInterval) {
            clearInterval(this._heartbeatInterval);
            this._heartbeatInterval = null;
        }
        if (this.ws.readyState !== ws_1.default.CLOSED) {
            this.ws.removeAllListeners();
            try {
                if (reconnect && this.sessionID) {
                    if (this.ws.readyState === ws_1.default.OPEN) {
                        this.client.emit("debug", `Closing websocket (state: ${this.ws.readyState})`, this.id);
                        this.ws.terminate();
                    }
                    else {
                        this.ws.close(4999, "Reconnect");
                    }
                }
                else {
                    this.ws.close(1000, "Normal Close");
                }
            }
            catch (err) {
                this.client.emit("error", err, this.id);
            }
        }
        this.ws = null;
        this.reset();
        if (error) {
            if (error instanceof Errors_1.GatewayError && [1001, 1006].includes(error.code)) {
                this.client.emit("debug", error.message, this.id);
            }
            else {
                this.client.emit("error", error, this.id);
            }
        }
        this.emit("disconnect", error);
        if (this.sessionID && this.connectAttempts >= this.client.shards.options.maxReconnectAttempts) {
            this.client.emit("debug", `Automatically invalidating session due to excessive resume attempts | Attempt ${this.connectAttempts}`, this.id);
            this.sessionID = null;
        }
        if (reconnect) {
            if (this.sessionID) {
                this.client.emit("debug", `Immediately reconnecting for potential resume | Attempt ${this.connectAttempts}`, this.id);
                void this.client.shards["_connect"](this);
            }
            else {
                this.client.emit("debug", `Queueing reconnect in ${this.reconnectInterval}ms | Attempt ${this.connectAttempts}`, this.id);
                setTimeout(() => {
                    void this.client.shards["_connect"](this);
                }, this.reconnectInterval);
                this.reconnectInterval = Math.min(Math.round(this.reconnectInterval * (Math.random() * 2 + 1)), 30000);
            }
        }
        else {
            this.hardReset();
        }
    }
    /**
     * Edit this shard's status.
     * @param status The status.
     * @param activities An array of activities.
     */
    async editStatus(status, activities = []) {
        this.presence.status = status;
        this.presence.activities = activities;
        return this.sendPresenceUpdate();
    }
    hardReset() {
        this.reset();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        for (const [, voiceAdapter] of this.client.voiceAdapters)
            voiceAdapter.destroy();
        this.sequence = 0;
        this.sessionID = null;
        this.reconnectInterval = 1000;
        this.connectAttempts = 0;
        this.ws = null;
        this._heartbeatInterval = null;
        this._guildCreateTimeout = null;
        this.globalBucket = new Bucket_1.default(120, 60000, { reservedTokens: 5 });
        this.presence = structuredClone(this.client.shards.options.presence);
        this.presenceUpdateBucket = new Bucket_1.default(5, 20000);
        this.resumeURL = null;
    }
    heartbeat(requested = false) {
        // discord/discord-api-docs#1619
        if (this.status === "resuming" || this.status === "identifying") {
            return;
        }
        if (!requested) {
            if (!this.lastHeartbeatAck) {
                this.client.emit("debug", "Heartbeat timeout; " + JSON.stringify({
                    lastReceived: this.lastHeartbeatReceived,
                    lastSent: this.lastHeartbeatSent,
                    interval: this._heartbeatInterval,
                    status: this.status,
                    timestamp: Date.now()
                }));
                return this.disconnect(undefined, new Error("Server didn't acknowledge previous heartbeat, possible lost connection."));
            }
            this.lastHeartbeatAck = false;
        }
        this.lastHeartbeatSent = Date.now();
        this.send(Constants_1.GatewayOPCodes.HEARTBEAT, this.sequence, true);
    }
    identify() {
        const data = {
            token: this._token,
            properties: this.client.shards.options.connectionProperties,
            compress: this.client.shards.options.compress,
            large_threshold: this.client.shards.options.largeThreshold,
            shard: [this.id, this.client.shards.options.maxShards],
            presence: this.presence,
            intents: this.client.shards.options.intents
        };
        this.send(Constants_1.GatewayOPCodes.IDENTIFY, data);
    }
    [node_util_1.inspect.custom]() {
        return Base_1.default.prototype[node_util_1.inspect.custom].call(this);
    }
    /**
     * Request extended channel info for a guild.
     * @param guildID The ID of the guild.
     * @param options The options.
     */
    async requestChannelInfo(guildID, options) {
        const opts = {
            guild_id: guildID,
            fields: options.fields,
            nonce: (0, node_crypto_1.randomBytes)(16).toString("hex")
        };
        this.send(Constants_1.GatewayOPCodes.REQUEST_CHANNEL_INFO, opts);
        return new Promise((resolve, reject) => this._requestChannelInfoPromise[opts.nonce] = {
            guildID,
            channels: [],
            timeout: setTimeout(() => {
                resolve(this._requestChannelInfoPromise[opts.nonce].channels);
                delete this._requestChannelInfoPromise[opts.nonce];
            }, options.timeout ?? this.client.rest.options.requestTimeout),
            resolve,
            reject
        });
    }
    /**
     * Request the members of a guild.
     * @param guildID The ID of the guild to request the members of.
     * @param options The options for requesting the members.
     */
    async requestGuildMembers(guildID, options) {
        const opts = {
            guild_id: guildID,
            limit: options?.limit ?? 0,
            user_ids: options?.userIDs,
            query: options?.query,
            nonce: (0, node_crypto_1.randomBytes)(16).toString("hex"),
            presences: options?.presences ?? false
        };
        if (!opts.user_ids && !opts.query) {
            opts.query = "";
        }
        if (!opts.query && !opts.user_ids) {
            if (!(this.client.shards.options.intents & Constants_1.Intents.GUILD_MEMBERS)) {
                throw new TypeError("Cannot request all members without the GUILD_MEMBERS intent.");
            }
            const guild = this.client.guilds.get(guildID);
            if (guild) {
                guild["updateMemberLimit"](true);
            }
        }
        if (opts.presences && (!(this.client.shards.options.intents & Constants_1.Intents.GUILD_PRESENCES))) {
            throw new TypeError("Cannot request presences without the GUILD_PRESENCES intent.");
        }
        if (opts.user_ids && opts.user_ids.length > 100) {
            throw new TypeError("Cannot request more than 100 users at once.");
        }
        this.send(Constants_1.GatewayOPCodes.REQUEST_GUILD_MEMBERS, opts);
        return new Promise((resolve, reject) => this._requestMembersPromise[opts.nonce] = {
            members: [],
            received: 0,
            timeout: setTimeout(() => {
                resolve(this._requestMembersPromise[opts.nonce].members);
                delete this._requestMembersPromise[opts.nonce];
            }, options?.timeout ?? this.client.rest.options.requestTimeout),
            resolve,
            reject
        });
    }
    /**
     * Request soundboard sounds for a guild.
     * @param guildID The ID of the guild.
     * @param options The options.
     */
    async requestSoundboardSounds(guildID, options) {
        const opts = {
            guild_ids: [guildID],
            nonce: (0, node_crypto_1.randomBytes)(16).toString("hex")
        };
        this.send(Constants_1.GatewayOPCodes.REQUEST_SOUNDBOARD_SOUNDS, opts);
        return new Promise((resolve, reject) => this._requestSoundboardSoundsPromise[opts.nonce] = {
            guildID,
            soundboardSounds: [],
            timeout: setTimeout(() => {
                resolve(this._requestSoundboardSoundsPromise[opts.nonce].soundboardSounds);
                delete this._requestSoundboardSoundsPromise[opts.nonce];
            }, options?.timeout ?? this.client.rest.options.requestTimeout),
            resolve,
            reject
        });
    }
    reset() {
        this.connecting = false;
        this.ready = false;
        this.preReady = false;
        if (this._requestMembersPromise !== undefined) {
            for (const guildID in this._requestMembersPromise) {
                if (!this._requestMembersPromise[guildID]) {
                    continue;
                }
                clearTimeout(this._requestMembersPromise[guildID].timeout);
                this._requestMembersPromise[guildID].resolve(this._requestMembersPromise[guildID].received);
            }
        }
        this._requestMembersPromise = {};
        this._getAllUsersCount = {};
        this._getAllUsersQueue = [];
        this.latency = Infinity;
        this.lastHeartbeatAck = true;
        this.lastHeartbeatReceived = 0;
        this.lastHeartbeatSent = 0;
        this.status = "disconnected";
        if (this._connectTimeout) {
            clearTimeout(this._connectTimeout);
        }
        this._connectTimeout = null;
    }
    resume() {
        this.status = "resuming";
        this.send(Constants_1.GatewayOPCodes.RESUME, {
            token: this._token,
            session_id: this.sessionID,
            seq: this.sequence
        });
    }
    send(op, data, priority = false) {
        if (this.ws && this.ws.readyState === ws_1.default.OPEN) {
            let i = 0, waitFor = 1;
            const func = () => {
                if (++i >= waitFor && this.ws && this.ws.readyState === ws_1.default.OPEN) {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
                    const d = Erlpack ? Erlpack.pack({ op, d: data }) : JSON.stringify({ op, d: data });
                    this.ws.send(d);
                    if (typeof data === "object" && data && "token" in data) {
                        data.token = "[REMOVED]";
                    }
                    this.client.emit("debug", JSON.stringify({ op, d: data }), this.id);
                }
            };
            if (op === Constants_1.GatewayOPCodes.PRESENCE_UPDATE) {
                ++waitFor;
                this.presenceUpdateBucket.queue(func, priority);
            }
            this.globalBucket.queue(func, priority);
        }
    }
    toString() {
        return Base_1.default.prototype.toString.call(this);
    }
    /**
     * Update the voice state of this shard.
     * @param guildID The ID of the guild to update the voice state of.
     * @param channelID The ID of the voice channel to join. Null to disconnect.
     * @param options The options for updating the voice state.
     */
    updateVoiceState(guildID, channelID, options) {
        this.send(Constants_1.GatewayOPCodes.VOICE_STATE_UPDATE, {
            channel_id: channelID,
            guild_id: guildID,
            self_deaf: options?.selfDeaf ?? false,
            self_mute: options?.selfMute ?? false
        });
    }
}
exports.default = Shard;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2hhcmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvZ2F0ZXdheS9TaGFyZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFHQSwwRUFBc0Q7QUFHdEQsZ0ZBQWdEO0FBQ2hELG9FQUFvQztBQUNwQyw0Q0FBMkY7QUFFM0Ysc0VBQXNDO0FBQ3RDLHNGQUFzRDtBQUV0RCwyQ0FBOEM7QUFDOUMsZ0dBQWdFO0FBRWhFLG9EQUEwQztBQUMxQyw2Q0FBMEM7QUFDMUMseUNBQW9DO0FBRXBDLHlQQUF5UDtBQUN6UCxhQUFhO0FBQ2IsSUFBSSxPQUE2QyxDQUFDO0FBQ2xELElBQUksQ0FBQztJQUNELE9BQU8sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDakMsQ0FBQztBQUFDLE1BQU0sQ0FBQyxDQUFBLENBQUM7QUFDViw0TUFBNE07QUFFNU0sNEhBQTRIO0FBQzVILE1BQXFCLEtBQU0sU0FBUSxzQkFBc0M7SUFDN0QsV0FBVyxDQUF5QjtJQUNwQyxlQUFlLENBQXdCO0lBQ3ZDLGlCQUFpQixDQUF1QjtJQUN4QyxpQkFBaUIsQ0FBZ0I7SUFDakMsbUJBQW1CLENBQXdCO0lBQzNDLGtCQUFrQixDQUF3QjtJQUMxQywwQkFBMEIsQ0FBc0w7SUFDaE4sc0JBQXNCLENBQXdKO0lBQzlLLCtCQUErQixDQUFvSztJQUMzTSxNQUFNLENBQVU7SUFDaEIsZUFBZSxDQUFTO0lBQ3hCLFVBQVUsQ0FBVTtJQUNwQixZQUFZLENBQVU7SUFDdEIsRUFBRSxDQUFTO0lBQ1gsZ0JBQWdCLENBQVU7SUFDMUIscUJBQXFCLENBQVM7SUFDOUIsaUJBQWlCLENBQVM7SUFDMUIsT0FBTyxDQUFTO0lBQ2hCLE9BQU8sQ0FBZ0I7SUFDdkIsUUFBUSxDQUFVO0lBQ2xCLFFBQVEsQ0FBaUQ7SUFDekQsb0JBQW9CLENBQVU7SUFDOUIsS0FBSyxDQUFVO0lBQ2YsaUJBQWlCLENBQVM7SUFDMUIsU0FBUyxDQUFnQjtJQUN6QixRQUFRLENBQVM7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