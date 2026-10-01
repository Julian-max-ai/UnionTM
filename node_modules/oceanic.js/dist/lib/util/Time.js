"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Time {
    client;
    /** When the first shard connect happened, reset if all shards disconnect. */
    connect = null;
    /** When all shards disconnected, reset on any shard connect. */
    disconnect = null;
    /** When the first shard ready happened, reset if all shards disconnect. */
    ready = null;
    /** When the most recent shard connect happened. */
    shardConnect = null;
    /** When the most recent shard disconnect happened. */
    shardDisconnect = null;
    /** When the most recent shard pre-ready happened. */
    shardPreReady = null;
    /** When the most recent shard ready happened. */
    shardReady = null;
    /** When the most recent shard resume happened. */
    shardResume = null;
    /** When the client started. */
    start = null;
    constructor(client) {
        Object.defineProperty(this, "client", {
            value: client,
            writable: false,
            enumerable: false,
            configurable: false
        });
    }
    /** @internal */
    _setConnect(value) {
        this.shardConnect = value;
        this.disconnect = null;
        if (!this.connect) {
            this.connect = value;
        }
    }
    /** @internal */
    _setDisconnect(value) {
        this.shardDisconnect = value;
        const noneReady = this.client.shards.every(shard => !shard.ready);
        if (noneReady) {
            this.connect = null;
            this.disconnect = value;
            this.ready = null;
            this.start = null;
        }
    }
    /** @internal */
    _setPreReady(value) {
        this.shardPreReady = value;
    }
    /** @internal */
    _setReady(value) {
        this.shardReady = value;
        if (!this.ready)
            this.ready = value;
    }
    /** @internal */
    _setResume(value) {
        this.shardResume = value;
    }
    /** @internal */
    _setStart(value) {
        if (!this.start) {
            this.start = value;
        }
    }
    reset() {
        this.connect = null;
        this.disconnect = null;
        this.ready = null;
        this.start = null;
        this.shardConnect = null;
        this.shardDisconnect = null;
        this.shardPreReady = null;
        this.shardReady = null;
        this.shardResume = null;
    }
    /** @internal */
    set(type, value) {
        switch (type) {
            case "connect": return this._setConnect(value);
            case "disconnect": return this._setDisconnect(value);
            case "preReady": return this._setPreReady(value);
            case "ready": return this._setReady(value);
            case "resume": return this._setResume(value);
            case "start": return this._setStart(value);
        }
    }
}
exports.default = Time;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGltZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi91dGlsL1RpbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQSxNQUFxQixJQUFJO0lBQ2IsTUFBTSxDQUFVO0lBQ3hCLDZFQUE2RTtJQUM3RSxPQUFPLEdBQWtCLElBQUksQ0FBQztJQUM5QixnRUFBZ0U7SUFDaEUsVUFBVSxHQUFrQixJQUFJLENBQUM7SUFDakMsMkVBQTJFO0lBQzNFLEtBQUssR0FBa0IsSUFBSSxDQUFDO0lBQzVCLG1EQUFtRDtJQUNuRCxZQUFZLEdBQWtCLElBQUksQ0FBQztJQUNuQyxzREFBc0Q7SUFDdEQsZUFBZSxHQUFrQixJQUFJLENBQUM7SUFDdEMscURBQXFEO0lBQ3JELGFBQWEsR0FBa0IsSUFBSSxDQUFDO0lBQ3BDLGlEQUFpRDtJQUNqRCxVQUFVLEdBQWtCLElBQUksQ0FBQztJQUNqQyxrREFBa0Q7SUFDbEQsV0FBVyxHQUFrQixJQUFJLENBQUM7SUFDbEMsK0JBQStCO0lBQy9CLEtBQUssR0FBa0IsSUFBSSxDQUFDO0lBQzVCLFlBQVksTUFBYztRQUN0QixNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUU7WUFDbEMsS0FBSyxFQUFTLE1BQU07WUFDcEIsUUFBUSxFQUFNLEtBQUs7WUFDbkIsVUFBVSxFQUFJLEtBQUs7WUFDbkIsWUFBWSxFQUFFLEtBQUs7U0FDdEIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELGdCQUFnQjtJQUNSLFdBQVcsQ0FBQyxLQUFhO1FBQzdCLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1FBQzFCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDaEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDekIsQ0FBQztJQUNMLENBQUM7SUFFRCxnQkFBZ0I7SUFDUixjQUFjLENB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