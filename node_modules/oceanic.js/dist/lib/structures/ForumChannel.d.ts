/** @module ForumChannel */
import ThreadOnlyChannel from "./ThreadOnlyChannel";
import type * as Types from "../types/namespaced";
import type Client from "../Client";
import type { ChannelTypes } from "../Constants";
/** Represents a thread forum channel. */
export default class ForumChannel extends ThreadOnlyChannel {
    type: ChannelTypes.GUILD_FORUM;
    constructor(data: Types.Channels.RawForumChannel, client: Client);
    toJSON(): Types.JSON.JSONForumChannel;
}
