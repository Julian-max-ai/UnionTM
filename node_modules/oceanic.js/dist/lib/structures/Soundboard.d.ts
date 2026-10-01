/** @module Soundboard */
import Base from "./Base";
import User from "./User";
import type * as Types from "../types/namespaced";
import type Client from "../Client";
/** Represents a soundboard. */
export default class Soundboard extends Base {
    /** If the soundboard sound can be used. */
    available: boolean;
    /** The emoji id of the soundboard sound. */
    emojiID: string | null;
    /** The emoji name of the soundboard sound. */
    emojiName: string | null;
    /** The guild this soundboard sound is in. */
    guildID?: string;
    /** The name of the soundboard sound. */
    name: string;
    /** The id of the soundboard sound. */
    soundID: string;
    /** The user who created the soundboard sound. */
    user?: User;
    /** The volume of the soundboard sound. */
    volume: number;
    constructor(data: Types.Channels.RawSoundboard, client: Client);
    /**
     * Delete this soundboard sound.
     * @param reason The reason for deleting the soundboard sound.
     */
    delete(reason?: string): Promise<void>;
    /**
     * Edit this soundboard sound.
     * @param options The options for editing the soundboard sound.
     */
    edit(options: Types.Guilds.EditSoundboardSoundOptions): Promise<Soundboard>;
    /**
     * Send this soundboard sound to a voice channel.
     * @param channelID The ID of the voice channel to send the soundboard sound to.
     * @param sourceGuildID The ID of the guild the soundboard sound is from.
     */
    sendSoundboardSound(channelID: string, sourceGuildID?: string): Promise<void>;
    toJSON(): Types.JSON.JSONSoundboard;
}
