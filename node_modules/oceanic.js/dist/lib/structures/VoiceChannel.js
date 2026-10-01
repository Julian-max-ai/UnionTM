"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module VoiceChannel */
const TextableVoiceChannel_1 = tslib_1.__importDefault(require("./TextableVoiceChannel"));
/** Represents a guild voice channel. */
class VoiceChannel extends TextableVoiceChannel_1.default {
    /** The status of this voice channel. */
    status;
    /** The start time of the session in this voice channel. */
    voiceStartTime;
    constructor(data, client) {
        super(data, client);
        this.status = null;
        this.voiceStartTime = null;
        this.update(data);
    }
    update(data) {
        this.status = data.status ?? null;
        if (data.status !== undefined) {
            this.status = data.status;
        }
        if (data.voice_start_time !== undefined) {
            this.voiceStartTime = data.voice_start_time;
        }
        super.update(data);
    }
    /**
     * Set a voice status in this channel.
     * @param status The voice status to set.
     */
    async setStatus(status) {
        return this.client.rest.channels.setVoiceStatus(this.id, status);
    }
    toJSON() {
        return {
            ...super.toJSON(),
            status: this.status,
            type: this.type
        };
    }
}
exports.default = VoiceChannel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVm9pY2VDaGFubmVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL3N0cnVjdHVyZXMvVm9pY2VDaGFubmVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJCQUEyQjtBQUMzQiwwRkFBMEQ7QUFLMUQsd0NBQXdDO0FBQ3hDLE1BQXFCLFlBQWEsU0FBUSw4QkFBa0M7SUFDeEUsd0NBQXdDO0lBQ3hDLE1BQU0sQ0FBZ0I7SUFFdEIsMkRBQTJEO0lBQzNELGNBQWMsQ0FBZ0I7SUFDOUIsWUFBWSxJQUFvQyxFQUFFLE1BQWM7UUFDNUQsS0FBSyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNwQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNuQixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztRQUMzQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RCLENBQUM7SUFFa0IsTUFBTSxDQUFDLElBQTZDO1FBQ25FLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUM7UUFDbEMsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLFNBQVMsRUFBRSxDQUFDO1lBQzVCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUM5QixDQUFDO1FBQ0QsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEtBQUssU0FBUyxFQUFFLENBQUM7WUFDdEMsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7UUFDaEQsQ0FBQztRQUNELEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkIsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBcUI7UUFDakMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUVRLE1BQU07UUFDWCxPQUFPO1lBQ0gsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQ2pCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtZQUNuQixJQUFJLEVBQUksSUFBSSxDQUFDLElBQUk7U0FDcEIsQ0FBQztJQUNOLENBQUM7Q0FDSjtBQXZDRCwrQkF1Q0MifQ==