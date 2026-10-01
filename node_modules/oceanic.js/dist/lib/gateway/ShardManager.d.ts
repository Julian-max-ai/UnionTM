/** @module ShardManager */
import Shard from "./Shard";
import Dispatcher from "./Dispatcher";
import type * as Types from "../types/namespaced";
import type Client from "../Client";
import Collection from "../util/Collection";
/** A manager for all the client's shards. */
export default class ShardManager extends Collection<number, Shard> {
    private _buckets;
    private _connectQueue;
    private _connectTimeout;
    private _gatewayURL?;
    client: Client;
    connected: boolean;
    dispatcher: Dispatcher;
    options: Types.Gateway.ShardManagerInstanceOptions;
    constructor(client: Client, options?: Types.Gateway.GatewayOptions);
    private _connect;
    private _forGuild;
    private _gatewayURLForShard;
    private _ready;
    private _resetConnectQueue;
    connect(): Promise<void>;
    /**
     * Disconnect all shards.
     * @param reconnect If shards should be reconnected. Defaults to {@link Types/Gateway~GatewayOptions#autoReconnect | GatewayOptions#autoReconnect}
     */
    disconnect(reconnect?: boolean): void;
    spawn(id: number): void;
    tryConnect(): void;
}
