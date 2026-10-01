/** @module AnnouncementThreadChannel */
import ThreadChannel from "./ThreadChannel";
import type * as Types from "../types/namespaced";
import type { ChannelTypes } from "../Constants";
import type Client from "../Client";
/** Represents a public thread channel in an announcement channel. */
export default class AnnouncementThreadChannel extends ThreadChannel<AnnouncementThreadChannel> {
    threadMetadata: Types.Channels.ThreadMetadata;
    type: ChannelTypes.ANNOUNCEMENT_THREAD;
    constructor(data: Types.Channels.RawAnnouncementThreadChannel, client: Client);
    /**
     * Get the members of this thread.
     * @param options The options for getting the thread members.
     */
    getThreadMembers(options?: Types.Channels.GetThreadMembersOptions): Promise<Array<Types.Channels.ThreadMember>>;
    toJSON(): Types.JSON.JSONAnnouncementThreadChannel;
}
