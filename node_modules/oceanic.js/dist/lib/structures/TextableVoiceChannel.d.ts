/** @module TextableVoiceChannel */
import Member from "./Member";
import TextableChannel from "./TextableChannel";
import type VoiceState from "./VoiceState";
import type * as Types from "../types/namespaced";
import type { VideoQualityModes } from "../Constants";
import type Client from "../Client";
import TypedCollection from "../util/TypedCollection";
import type { VoiceConnection } from "@discordjs/voice";
/** Represents a textable voice channel. */
export default class TextableVoiceChannel<T extends Types.Channels.AnyVoiceChannel = Types.Channels.AnyVoiceChannel> extends TextableChannel<T> {
    /** The bitrate of the stage channel. */
    bitrate: number;
    /** The id of the voice region of the channel, `null` is automatic. */
    rtcRegion: string | null;
    type: Types.Channels.VoiceChannels;
    /** The maximum number of members in this voice channel, `0` is unlimited. */
    userLimit: number;
    /** The [video quality mode](https://discord.com/developers/docs/resources/channel#channel-object-video-quality-modes) of this channel. */
    videoQualityMode: VideoQualityModes;
    voiceMembers: TypedCollection<Types.Guilds.RawMember, Member, [guildID: string]>;
    constructor(data: Types.Channels.RawVoiceChannel | Types.Channels.RawStageChannel, client: Client);
    protected update(data: Partial<Types.Channels.RawVoiceChannel | Types.Channels.RawStageChannel>): void;
    /** The voice states related to this channel. */
    get voiceStates(): Array<VoiceState<T>>;
    /**
     * Join this stage channel.
     * @param options The options to join the channel with.
     */
    join(options: Omit<Types.Voice.JoinVoiceChannelOptions, "guildID" | "channelID" | "voiceAdapterCreator">): VoiceConnection;
    /** Leave this stage channel. */
    leave(): void;
    toJSON(): Types.JSON.JSONTextableVoiceChannel;
}
