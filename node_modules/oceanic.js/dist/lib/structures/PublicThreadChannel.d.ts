/** @module PublicThreadChannel */
import ThreadChannel from "./ThreadChannel";
import type * as Types from "../types/namespaced";
import type { ChannelTypes } from "../Constants";
import type Client from "../Client";
/** Represents a public thread channel. */
export default class PublicThreadChannel extends ThreadChannel<PublicThreadChannel> {
    /** the IDs of the set of tags that have been applied to this thread. Forum channel threads only.  */
    appliedTags: Array<string>;
    threadMetadata: Types.Channels.ThreadMetadata;
    type: ChannelTypes.PUBLIC_THREAD;
    constructor(data: Types.Channels.RawPublicThreadChannel, client: Client);
    protected update(data: Partial<Types.Channels.RawPublicThreadChannel>): void;
    /**
     * Get the members of this thread.
     * @param options The options for getting the thread members.
     */
    getThreadMembers(options?: Types.Channels.GetThreadMembersOptions): Promise<Array<Types.Channels.ThreadMember>>;
    toJSON(): Types.JSON.JSONPublicThreadChannel;
}
