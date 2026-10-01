/** @module VoiceChannel */
import TextableVoiceChannel from "./TextableVoiceChannel";
import type * as Types from "../types/namespaced";
import type { ChannelTypes } from "../Constants";
import type Client from "../Client";
/** Represents a guild voice channel. */
export default class VoiceChannel extends TextableVoiceChannel<VoiceChannel> {
    /** The status of this voice channel. */
    status: string | null;
    type: ChannelTypes.GUILD_VOICE;
    /** The start time of the session in this voice channel. */
    voiceStartTime: number | null;
    constructor(data: Types.Channels.RawVoiceChannel, client: Client);
    protected update(data: Partial<Types.Channels.RawVoiceChannel>): void;
    /**
     * Set a voice status in this channel.
     * @param status The voice status to set.
     */
    setStatus(status: string | null): Promise<void>;
    toJSON(): Types.JSON.JSONVoiceChannel;
}
