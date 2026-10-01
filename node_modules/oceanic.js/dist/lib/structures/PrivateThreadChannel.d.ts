/** @module PrivateThreadChannel */
import ThreadChannel from "./ThreadChannel";
import type * as Types from "../types/namespaced";
import type { ChannelTypes } from "../Constants";
import type Client from "../Client";
/** Represents a private thread channel.. */
export default class PrivateThreadChannel extends ThreadChannel<PrivateThreadChannel> {
    threadMetadata: Types.Channels.PrivateThreadMetadata;
    type: ChannelTypes.PRIVATE_THREAD;
    constructor(data: Types.Channels.RawPrivateThreadChannel, client: Client);
    /**
     * Get the members of this thread.
     * @param options The options for getting the thread members.
     */
    getThreadMembers(options?: Types.Channels.GetThreadMembersOptions): Promise<Array<Types.Channels.ThreadMember>>;
    toJSON(): Types.JSON.JSONPrivateThreadChannel;
}
