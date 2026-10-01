/** @module AnnouncementChannel */
import type TextChannel from "./TextChannel";
import type AnnouncementThreadChannel from "./AnnouncementThreadChannel";
import type Message from "./Message";
import ThreadableChannel from "./ThreadableChannel";
import type * as Types from "../types/namespaced";
import { ChannelTypes } from "../Constants";
import type Client from "../Client";
/**
 * Represents a guild announcement channel.
 * @mergeTarget AnnouncementChannel
 */
export default class AnnouncementChannel extends ThreadableChannel<AnnouncementChannel, AnnouncementThreadChannel> {
    /** The amount of seconds between non-moderators sending messages. Always zero in announcement channels. */
    rateLimitPerUser: 0;
    type: ChannelTypes.GUILD_ANNOUNCEMENT;
    constructor(data: Types.Channels.RawAnnouncementChannel, client: Client);
    /**
     * Convert this announcement channel to a text channel.
     */
    convert(): Promise<TextChannel>;
    /**
     * Crosspost a message in this channel.
     * @param messageID The ID of the message to crosspost.
     */
    crosspostMessage(messageID: string): Promise<Message<this>>;
    /**
     * Follow this announcement channel.
     * @param webhookChannelID The ID of the channel crossposted messages should be sent to. The client must have the `MANAGE_WEBHOOKS` permission in this channel.
     * @param reason The reason for following this channel.
     */
    follow(webhookChannelID: string, reason?: string): Promise<Types.Channels.FollowedChannel>;
    toJSON(): Types.JSON.JSONAnnouncementChannel;
}
