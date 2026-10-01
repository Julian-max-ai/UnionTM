/** @module Time */
import type Client from "../Client";
export default class Time {
    private client;
    /** When the first shard connect happened, reset if all shards disconnect. */
    connect: number | null;
    /** When all shards disconnected, reset on any shard connect. */
    disconnect: number | null;
    /** When the first shard ready happened, reset if all shards disconnect. */
    ready: number | null;
    /** When the most recent shard connect happened. */
    shardConnect: number | null;
    /** When the most recent shard disconnect happened. */
    shardDisconnect: number | null;
    /** When the most recent shard pre-ready happened. */
    shardPreReady: number | null;
    /** When the most recent shard ready happened. */
    shardReady: number | null;
    /** When the most recent shard resume happened. */
    shardResume: number | null;
    /** When the client started. */
    start: number | null;
    constructor(client: Client);
    /** @internal */
    private _setConnect;
    /** @internal */
    private _setDisconnect;
    /** @internal */
    private _setPreReady;
    /** @internal */
    private _setReady;
    /** @internal */
    private _setResume;
    /** @internal */
    private _setStart;
    reset(): void;
    /** @internal */
    set(type: "connect" | "disconnect" | "preReady" | "ready" | "resume" | "start", value: number): void;
}
