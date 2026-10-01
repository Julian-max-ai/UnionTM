/** @module TextableChannel */
import TextableChannel from "./TextableChannel";
import type PrivateThreadChannel from "./PrivateThreadChannel";
import type * as Types from "../types/namespaced";
import type { ChannelTypes, ThreadAutoArchiveDuration } from "../Constants";
import type Client from "../Client";
import Collection from "../util/Collection";
/** Represents a guild textable channel. */
export default class ThreadableChannel<TC extends Types.Channels.AnyTextableGuildChannel = Types.Channels.AnyTextableGuildChannel, TH extends Types.Channels.AnyThreadChannel = Types.Channels.AnyThreadChannel> extends TextableChannel<TC> {
    /** The default auto archive duration for threads created in this channel. */
    defaultAutoArchiveDuration: ThreadAutoArchiveDuration;
    /** The threads in this channel. */
    type: ChannelTypes.GUILD_TEXT | ChannelTypes.GUILD_ANNOUNCEMENT;
    constructor(data: Types.Channels.RawTextChannel | Types.Channels.RawAnnouncementChannel, client: Client);
    protected update(data: Partial<Types.Channels.RawTextChannel | Types.Channels.RawAnnouncementChannel>): void;
    /** The threads in this channel. The returned collection is disposable. */
    get threads(): Collection<string, TH>;
    /**
     * Get the public archived threads in this channel.
     * @param options The options for getting the public archived threads.
     */
    getPublicArchivedThreads(options?: Types.Channels.GetArchivedThreadsOptions): Promise<Types.Channels.ArchivedThreads<Exclude<TH, PrivateThreadChannel>>>;
    /**
     * Search threads in this channel.
     * @param options The options to search with.
     * @param retryOnIndexNotAvailable If the search should be retried if Discord replies with an index unavailable response. This will retry at most one time, waiting for `retry_after` or 15-45 seconds.
     */
    searchThreads(options?: Types.Channels.SearchThreadsOptions, retryOnIndexNotAvailable?: boolean): Promise<Types.Channels.ThreadSearchResults<TH>>;
    /**
     * Create a thread from an existing message in this channel.
     * @param messageID The ID of the message to create a thread from.
     * @param options The options for creating the thread.
     */
    startThreadFromMessage(messageID: string, options: Types.Channels.StartThreadFromMessageOptions): Promise<TH>;
    /**
     * Create a thread without an existing message in this channel.
     * @param options The options for creating the thread.
     */
    startThreadWithoutMessage(options: Types.Channels.StartThreadWithoutMessageOptions): Promise<TH>;
    toJSON(): Types.JSON.JSONThreadableChannel;
}
