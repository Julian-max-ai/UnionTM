/** @module REST/Channels */
import type * as Types from "../types/namespaced";
import type Message from "../structures/Message";
import Invite, { type InviteWithoutCounts, type InviteWithMetadata, type InviteWithCountsAndScheduledEvent, type InviteWithCounts, type InviteWithScheduledEvent } from "../structures/Invite";
import type AnnouncementThreadChannel from "../structures/AnnouncementThreadChannel";
import type PublicThreadChannel from "../structures/PublicThreadChannel";
import type PrivateThreadChannel from "../structures/PrivateThreadChannel";
import type AnnouncementChannel from "../structures/AnnouncementChannel";
import type RESTManager from "../rest/RESTManager";
import type PrivateChannel from "../structures/PrivateChannel";
import type GroupChannel from "../structures/GroupChannel";
import type User from "../structures/User";
import StageInstance from "../structures/StageInstance";
/** Various methods for interacting with channels. Located at {@link Client#rest | Client#rest}{@link RESTManager#channels | .channels}. */
export default class Channels {
    private _manager;
    constructor(manager: RESTManager);
    /**
     * Add a user to a group channel.
     * @param groupID The ID of the group to add the user to.
     * @param options The options for adding the recipient.
     * @caching This method **does not** cache its result.
     */
    addGroupRecipient(groupID: string, options: Types.Channels.AddGroupRecipientOptions): Promise<void>;
    /**
     * Add a member to a thread.
     * @param channelID The ID of the thread to add them to.
     * @param userID The ID of the user to add to the thread.
     * @caching This method **does not** cache its result.
     */
    addThreadMember(channelID: string, userID: string): Promise<void>;
    /**
     * Create a direct message. This will not create a new channel if you have already started a dm with the user.
     * @param recipient The ID of the recipient of the direct message.
     * @caching This method **does** cache its result.
     * @caches {@link Client#privateChannels | Client#privateChannels}
     */
    createDM(recipient: string): Promise<PrivateChannel>;
    /**
     * Create a group dm.
     * @param options The options for creating the group dm.
     * @caching This method **does** cache its result.
     * @caches {@link Client#groupChannels | Client#groupChannels}
     */
    createGroupDM(options: Types.Users.CreateGroupChannelOptions): Promise<GroupChannel>;
    /**
     * Create an invite for a channel. If the guild is not a `COMMUNITY` server, invites can only be made to last 30 days.
     * @param channelID The ID of the channel to create an invite for.
     * @param options The options for creating the invite.
     * @caching This method **does not** cache its result.
     */
    createInvite<CH extends Types.Channels.AnyInviteChannel | Types.Channels.PartialInviteChannel | Types.Shared.Uncached = Types.Channels.AnyInviteChannel | Types.Channels.PartialInviteChannel | Types.Shared.Uncached>(channelID: string, options: Types.Invites.CreateInviteOptions): Promise<InviteWithMetadata<CH>>;
    /**
     * Create a message in a channel.
     * @param channelID The ID of the channel to create the message in.
     * @param options The options for creating the message.
     * @caching This method **may** cache its result. The result will not be cached if the channel is not cached.
     * @caches {@link TextableChannel#messages | TextableChannel#messages}<br>{@link ThreadChannel#messages | ThreadChannel#messages}<br>{@link PrivateChannel#messages | PrivateChannel#messages}
     */
    createMessage<T extends Types.Channels.AnyTextableChannel | Types.Shared.Uncached = Types.Channels.AnyTextableChannel | Types.Shared.Uncached>(channelID: string, options: Types.Channels.CreateMessageOptions): Promise<Message<T>>;
    /**
     * Add a reaction to a message.
     * @param channelID The ID of the channel the message is in.
     * @param messageID The ID of the message to add a reaction to.
     * @param emoji The reaction to add to the message. `name:id` for custom emojis, and the unicode codepoint for default emojis.
     * @caching This method **does not** cache its result.
     */
    createReaction(channelID: string, messageID: string, emoji: string): Promise<void>;
    /**
     * Create a stage instance.
     * @param channelID The ID of the channel to create the stage instance on.
     * @param options The options for creating the stage instance.
     * @caching This method **does not** cache its result.
     */
    createStageInstance(channelID: string, options: Types.Guilds.CreateStageInstanceOptions): Promise<StageInstance>;
    /**
     * Crosspost a message in an announcement channel.
     * @param channelID The ID of the channel to crosspost the message in.
     * @param messageID The ID of the message to crosspost.
     * @caching This method **may** cache its result. The result will not be cached if the channel is not cached.
     * @caches {@link TextableChannel#messages | TextableChannel#messages}<br>{@link ThreadChannel#messages | ThreadChannel#messages}<br>{@link PrivateChannel#messages | PrivateChannel#messages}
     */
    crosspostMessage<T extends AnnouncementChannel | Types.Shared.Uncached = AnnouncementChannel | Types.Shared.Uncached>(channelID: string, messageID: string): Promise<Message<T>>;
    /**
     * Delete or close a channel.
     * @param channelID The ID of the channel to delete or close.
     * @param reason The reason to be displayed in the audit log.
     * @caching This method **does not** cache its result.
     */
    delete(channelID: string, reason?: string): Promise<void>;
    /**
     * Delete an invite.
     * @param code The code of the invite to delete.
     * @param reason The reason for deleting the invite.
     * @caching This method **does not** cache its result.
     */
    deleteInvite<T extends Types.Channels.AnyInviteChannel | Types.Channels.PartialInviteChannel | Types.Shared.Uncached = Types.Channels.AnyInviteChannel | Types.Channels.PartialInviteChannel | Types.Shared.Uncached>(code: string, reason?: string): Promise<Invite<T>>;
    /**
     * Delete a message.
     * @param channelID The ID of the channel to delete the message in.
     * @param messageID The ID of the message to delete.
     * @param reason The reason for deleting the message.
     * @caching This method **does not** cache its result.
     */
    deleteMessage(channelID: string, messageID: string, reason?: string): Promise<void>;
    /**
     * Bulk delete messages.
     * @param channelID The ID of the channel to delete the messages in.
     * @param messageIDs The IDs of the messages to delete. Any duplicates or messages older than two weeks will cause an error.
     * @param reason The reason for deleting the messages.
     * @caching This method **does not** cache its result.
     */
    deleteMessages(channelID: string, messageIDs: Array<string>, reason?: string): Promise<number>;
    /**
     * Delete a permission overwrite.
     * @param channelID The ID of the channel to delete the permission overwrite in.
     * @param overwriteID The ID of the permission overwrite to delete.
     * @param reason The reason for deleting the permission overwrite.
     * @caching This method **does not** cache its result.
     */
    deletePermission(channelID: string, overwriteID: string, reason?: string): Promise<void>;
    /**
     * Remove a reaction from a message.
     * @param channelID The ID of the channel the message is in.
     * @param messageID The ID of the message to remove a reaction from.
     * @param emoji The reaction to remove from the message. `name:id` for custom emojis, and the unicode codepoint for default emojis.
     * @param user The user to remove the reaction from, `@me` for the current user (default).
     * @caching This method **does not** cache its result.
     */
    deleteReaction(channelID: string, messageID: string, emoji: string, user?: string): Promise<void>;
    /**
     * Remove all, or a specific emoji's reactions from a message.
     * @param channelID The ID of the channel the message is in.
     * @param messageID The ID of the message to remove reactions from.
     * @param emoji The reaction to remove from the message. `name:id` for custom emojis, and the unicode codepoint for default emojis. Omit to remove all reactions.
     * @caching This method **does not** cache its result.
     */
    deleteReactions(channelID: string, messageID: string, emoji?: string): Promise<void>;
    /**
     * Delete a stage instance.
     * @param channelID The ID of the channel to delete the stage instance on.
     * @param reason The reason for deleting the stage instance.
     * @caching This method **does not** cache its result.
     */
    deleteStageInstance(channelID: string, reason?: string): Promise<void>;
    /**
     * Edit a channel.
     * @param channelID The ID of the channel to edit.
     * @param options The options for editing the channel.
     * @caching This method **may** cache its result. If a guild channel, the result will not be cached if the guild is not cached.
     * @caches {@link Guild#channels | Guild#channels}<br>{@link Guild#threads | Guild#threads}<br>{@link Client#groupChannels | Client#groupChannels}
     */
    edit<T extends Types.Channels.AnyEditableChannel = Types.Channels.AnyEditableChannel>(channelID: string, options: Types.Channels.EditChannelOptions): Promise<T>;
    /**
     * Edit a message.
     * @param channelID The ID of the channel the message is in.
     * @param messageID The ID of the message to edit.
     * @param options The options for editing the message.
     * @caching This method **may** cache its result. The result will not be cached if the channel is not cached.
     * @caches {@link TextableChannel#messages | TextableChannel#messages}<br>{@link ThreadChannel#messages | ThreadChannel#messages}<br>{@link PrivateChannel#messages | PrivateChannel#messages}
     */
    editMessage<T extends Types.Channels.AnyTextableChannel | Types.Shared.Uncached = Types.Channels.AnyTextableChannel | Types.Shared.Uncached>(channelID: string, messageID: string, options: Types.Channels.EditMessageOptions): Promise<Message<T>>;
    /**
     * Edit a permission overwrite.
     * @param channelID The ID of the channel to edit the permission overwrite for.
     * @param overwriteID The ID of the permission overwrite to edit.
     * @param options The options for editing the permission overwrite.
     * @caching This method **does not** cache its result.
     */
    editPermission(channelID: string, overwriteID: string, options: Types.Channels.EditPermissionOptions): Promise<void>;
    /**
     * Edit a stage instance.
     * @param channelID The ID of the channel to edit the stage instance on.
     * @param options The options for editing the stage instance.
     * @caching This method **does not** cache its result.
     */
    editStageInstance(channelID: string, options: Types.Guilds.EditStageInstanceOptions): Promise<StageInstance>;
    /**
     * End a poll now.
     * @param channelID The ID of the channel the poll is in.
     * @param messageID The ID of the message the poll is on.
     * @caching This method **does not** cache its result.
     */
    expirePoll(channelID: string, messageID: string): Promise<void>;
    /**
     * Follow an announcement channel.
     * @param channelID The ID of the channel to follow announcements from.
     * @param webhookChannelID The ID of the channel crossposted messages should be sent to. The client must have the `MANAGE_WEBHOOKS` permission in this channel.
     * @param reason The reason for following the announcement channel.
     * @caching This method **does not** cache its result.
     */
    followAnnouncement(channelID: string, webhookChannelID: string, reason?: string): Promise<Types.Channels.FollowedChannel>;
    /**
     * Get a channel.
     * @param channelID The ID of the channel to get.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#channels | Guild#channels}<br>{@link Guild#threads | Guild#threads}<br>{@link Client#privateChannels | Client#privateChannels}<br>{@link Client#groupChannels | Client#groupChannels}
     */
    get<T extends Types.Channels.AnyChannel = Types.Channels.AnyChannel>(channelID: string): Promise<T>;
    /**
     * Get an invite.
     * @param code The code of the invite to get.
     * @param options The options for getting the invite.
     * @caching This method **does not** cache its result.
     */
    getInvite<CH extends Types.Invites.InviteChannel = Types.Invites.InviteChannel>(code: string, options?: Types.Invites.GetInviteWithNoneOptions): Promise<InviteWithoutCounts<CH>>;
    getInvite<CH extends Types.Invites.InviteChannel = Types.Invites.GuildInviteChannel | Types.Invites.DMInviteChannel>(code: string, options: Types.Invites.GetInviteWithCountsOptions): Promise<InviteWithCounts<CH>>;
    getInvite<CH extends Types.Invites.InviteChannel = Types.Invites.InviteChannel>(code: string, options: Types.Invites.GetInviteWithCountsAndScheduledEventOptions): Promise<InviteWithCountsAndScheduledEvent<CH>>;
    getInvite<CH extends Types.Invites.InviteChannel = Types.Invites.InviteChannel>(code: string, options: Types.Invites.GetInviteWithScheduledEventOptions): Promise<InviteWithScheduledEvent<CH>>;
    /**
     * Get the target users for an invite. Requires being the inviter or having the `MANAGE_GUILD` or `VIEW_AUDIT_LOG` permission.
     * @param code The code of the invite.
     */
    getInviteTargetUsers(code: string): Promise<Array<string>>;
    /**
     * Get the target users job status for an invite. Requires being the inviter or having the `MANAGE_GUILD` or `VIEW_AUDIT_LOG` permission.
     * @param code The code of the invite.
     */
    getInviteTargetUsersJobStatus(code: string): Promise<Types.Invites.InviteTargetUsersJobStatusResponse>;
    /**
     * Get the invites of a channel.
     * @param channelID The ID of the channel to get the invites of.
     * @caching This method **does not** cache its result.
     */
    getInvites<CH extends Types.Invites.GuildInviteChannel = Types.Invites.GuildInviteChannel>(channelID: string): Promise<Array<InviteWithMetadata<CH>>>;
    /**
     * Get the private archived threads the current user has joined in a channel.
     * @param channelID The ID of the channel to get the archived threads from.
     * @param options The options for getting the archived threads.
     * @caching This method **does not** cache its result.
     */
    getJoinedPrivateArchivedThreads(channelID: string, options?: Types.Channels.GetArchivedThreadsOptions): Promise<Types.Channels.ArchivedThreads<PrivateThreadChannel>>;
    /**
     * Get a message in a channel.
     * @param channelID The ID of the channel the message is in
     * @param messageID The ID of the message to get.
     * @caching This method **may** cache its result. The result will not be cached if the channel is not cached.
     * @caches {@link TextableChannel#messages | TextableChannel#messages}<br>{@link ThreadChannel#messages | ThreadChannel#messages}<br>{@link PrivateChannel#messages | PrivateChannel#messages}
     */
    getMessage<T extends Types.Channels.AnyTextableChannel | Types.Shared.Uncached = Types.Channels.AnyTextableChannel | Types.Shared.Uncached>(channelID: string, messageID: string): Promise<Message<T>>;
    /**
     * Get messages in a channel.
     * @param channelID The ID of the channel to get messages from.
     * @param options The options for getting messages. `before`, `after`, and `around `All are mutually exclusive.
     * @caching This method **may** cache its result. The result will not be cached if the channel is not cached.
     * @caches {@link TextableChannel#messages | TextableChannel#messages}<br>{@link ThreadChannel#messages | ThreadChannel#messages}<br>{@link PrivateChannel#messages | PrivateChannel#messages}
     */
    getMessages<T extends Types.Channels.AnyTextableChannel | Types.Shared.Uncached = Types.Channels.AnyTextableChannel | Types.Shared.Uncached>(channelID: string, options?: Types.Channels.GetChannelMessagesOptions<T>): Promise<Array<Message<T>>>;
    /**
     * Get an async iterator for getting messages in a channel.
     * @param channelID The ID of the channel to get messages from.
     * @param options The options for getting messages. `before`, `after`, and `around `All are mutually exclusive.
     * @caching This method **may** cache its result. The result will not be cached if the channel is not cached.
     * @caches {@link TextableChannel#messages | TextableChannel#messages}<br>{@link ThreadChannel#messages | ThreadChannel#messages}<br>{@link PrivateChannel#messages | PrivateChannel#messages}
     */
    getMessagesIterator<T extends Types.Channels.AnyTextableChannel | Types.Shared.Uncached = Types.Channels.AnyTextableChannel | Types.Shared.Uncached>(channelID: string, options?: Types.Channels.GetChannelMessagesIteratorOptions<T>): Types.Channels.MessagesIterator<T>;
    /**
     * Get the pinned messages in a channel.
     * @param channelID The ID of the channel to get the pinned messages from.
     * @caching This method **may** cache its result. The result will not be cached if the channel is not cached.
     * @caches {@link TextableChannel#messages | TextableChannel#messages}<br>{@link ThreadChannel#messages | ThreadChannel#messages}<br>{@link PrivateChannel#messages | PrivateChannel#messages}
     * @deprecated Use {@link Channels#getPins | getPins} instead.
     */
    getPinnedMessages<T extends Types.Channels.AnyTextableChannel | Types.Shared.Uncached = Types.Channels.AnyTextableChannel | Types.Shared.Uncached>(channelID: string): Promise<Array<Message<T>>>;
    /**
     * Get the pins in a channel.
     * @param channelID The ID of the channel to get the pins from.
     * @param options The options for getting pins.
     * @caching This method **may** cache its result. The messages will not be cached if the channel is not cached.
     * @caches {@link TextableChannel#messages | TextableChannel#messages}<br>{@link ThreadChannel#messages | ThreadChannel#messages}<br>{@link PrivateChannel#messages | PrivateChannel#messages}
     */
    getPins<T extends Types.Channels.AnyTextableChannel | Types.Shared.Uncached = Types.Channels.AnyTextableChannel | Types.Shared.Uncached>(channelID: string, options?: Types.Channels.GetChannelPinsOptions<T>): Promise<Array<Types.Channels.MessagePin<T>>>;
    /**
     * Get an async iterator for getting pins in a channel.
     * @param channelID The ID of the channel to get pins from.
     * @param options The options for getting pins.
     * @caching This method **may** cache its result. The messages will not be cached if the channel is not cached.
     * @caches {@link TextableChannel#messages | TextableChannel#messages}<br>{@link ThreadChannel#messages | ThreadChannel#messages}<br>{@link PrivateChannel#messages | PrivateChannel#messages}
     */
    getPinsIterator<T extends Types.Channels.AnyTextableChannel | Types.Shared.Uncached = Types.Channels.AnyTextableChannel | Types.Shared.Uncached>(channelID: string, options?: Types.Channels.GetChannelPinsIteratorOptions<T>): Types.Channels.MessagePinsIterator<T>;
    /**
     * Get the users that voted on a poll answer.
     * @param channelID The ID of the channel the poll is in.
     * @param messageID The ID of the message the poll is on.
     * @param answerID The ID of the poll answer to get voters for.
     * @param options The options for getting the voters.
     * @caching This method **does** cache its result.
     * @caches {@link Client#users | Client#users}
     */
    getPollAnswerUsers(channelID: string, messageID: string, answerID: number, options?: Types.Channels.GetPollAnswerUsersOptions): Promise<Array<User>>;
    /**
     * Get the private archived threads in a channel.
     * @param channelID The ID of the channel to get the archived threads from.
     * @param options The options for getting the archived threads.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#threads | Guild#threads}
     */
    getPrivateArchivedThreads(channelID: string, options?: Types.Channels.GetArchivedThreadsOptions): Promise<Types.Channels.ArchivedThreads<PrivateThreadChannel>>;
    /**
     * Get the private joined archived threads in a channel.
     * @param channelID The ID of the channel to get the archived threads from.
     * @param options The options for getting the archived threads.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#threads | Guild#threads}
     */
    getPrivateJoinedArchivedThreads(channelID: string, options?: Types.Channels.GetArchivedThreadsOptions): Promise<Types.Channels.ArchivedThreads<PrivateThreadChannel>>;
    /**
     * Get the public archived threads in a channel.
     * @param channelID The ID of the channel to get the archived threads from.
     * @param options The options for getting the archived threads.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#threads | Guild#threads}
     */
    getPublicArchivedThreads<T extends AnnouncementThreadChannel | PublicThreadChannel = AnnouncementThreadChannel | PublicThreadChannel>(channelID: string, options?: Types.Channels.GetArchivedThreadsOptions): Promise<Types.Channels.ArchivedThreads<T>>;
    /**
     * Get the users who reacted with a specific emoji on a message.
     * @param channelID The ID of the channel the message is in.
     * @param messageID The ID of the message to get reactions from.
     * @param emoji The reaction to remove from the message. `name:id` for custom emojis, and the unicode codepoint for default emojis.
     * @param options The options for getting the reactions.
     * @caching This method **does not** cache its result.
     */
    getReactions(channelID: string, messageID: string, emoji: string, options?: Types.Channels.GetReactionsOptions): Promise<Array<User>>;
    /**
     * Get the stage instance associated with a channel.
     * @param channelID The ID of the channel to get the stage instance on.
     * @caching This method **does not** cache its result.
     */
    getStageInstance(channelID: string): Promise<StageInstance>;
    /**
     * Get a thread member.
     * @param channelID The ID of the thread.
     * @param userID The ID of the user to get the thread member of.
     * @caching This method **does not** cache its result.
     */
    getThreadMember(channelID: string, userID: string): Promise<Types.Channels.ThreadMember>;
    /**
     * Get the members of a thread.
     * @param channelID The ID of the thread.
     * @param options The options for getting the thread members.
     * @caching This method **does not** cache its result.
     */
    getThreadMembers(channelID: string, options?: Types.Channels.GetThreadMembersOptions): Promise<Array<Types.Channels.ThreadMember>>;
    /** @deprecated Get the list of usable voice regions. Moved to `misc`. */
    getVoiceRegions(): Promise<Array<Types.Voice.VoiceRegion>>;
    /**
     * Join a thread.
     * @param channelID The ID of the thread to join.
     * @caching This method **does not** cache its result.
     */
    joinThread(channelID: string): Promise<void>;
    /**
     * Leave a thread.
     * @param channelID The ID of the thread to leave.
     * @caching This method **does not** cache its result.
     */
    leaveThread(channelID: string): Promise<void>;
    /**
     * Pin a message in a channel.
     * @param channelID The ID of the channel to pin the message in.
     * @param messageID The ID of the message to pin.
     * @param reason The reason for pinning the message.
     * @caching This method **does not** cache its result.
     */
    pinMessage(channelID: string, messageID: string, reason?: string): Promise<void>;
    /**
     * Purge an amount of messages from a channel.
     * @param channelID The ID of the channel to purge.
     * @param options The options to purge. `before`, `after`, and `around `All are mutually exclusive.
     * @caching This method **does not** cache its result.
     */
    purgeMessages<T extends Types.Channels.AnyTextableGuildChannel | Types.Shared.Uncached = Types.Channels.AnyTextableGuildChannel | Types.Shared.Uncached>(channelID: string, options: Types.Channels.PurgeOptions<T>): Promise<number>;
    /**
     * Remove a user from the group channel.
     * @param groupID The ID of the group to remove the user from.
     * @param userID The ID of the user to remove.
     * @caching This method **does not** cache its result.
     */
    removeGroupRecipient(groupID: string, userID: string): Promise<void>;
    /**
     * Remove a member from a thread.
     * @param channelID The ID of the thread to remove them from.
     * @param userID The ID of the user to remove from the thread.
     * @caching This method **does not** cache its result.
     */
    removeThreadMember(channelID: string, userID: string): Promise<void>;
    /**
     * Search threads in a channel.
     * @param channelID The ID of the channel to search threads in.
     * @param options The options to search with.
     * @param retryOnIndexNotAvailable If the search should be retried if Discord replies with an index unavailable response. This will retry at most one time, waiting for `retry_after` or 15-45 seconds.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#threads | Guild#threads}<br>{@link ThreadChannel#messages | ThreadChannel#messages}
     */
    searchThreads<T extends Types.Channels.AnyThreadChannel = Types.Channels.AnyThreadChannel>(channelID: string, options?: Types.Channels.SearchThreadsOptions, retryOnIndexNotAvailable?: boolean): Promise<Types.Channels.ThreadSearchResults<T>>;
    /**
     * Send a sound from the soundboard to the channel where the user is connected.
     * @param channelID The ID of the channel to send the soundboard sound to.
     * @param options The options for sending the soundboard sound.
     * @caching This method **does not** cache its result.
     */
    sendSoundboardSound(channelID: string, options: Types.Channels.SendSoundboardSoundOptions): Promise<void>;
    /**
     * Show a typing indicator in a channel. How long users see this varies from client to client.
     * @param channelID The ID of the channel to show the typing indicator in.
     * @caching This method **does not** cache its result.
     */
    sendTyping(channelID: string): Promise<void>;
    /**
     * Set a voice status in a channel.
     * @param channelID The ID of the channel to set the voice status in.
     * @param status The voice status to set.
     */
    setVoiceStatus(channelID: string, status: string | null): Promise<void>;
    /**
     * Create a thread from an existing message.
     * @param channelID The ID of the channel to create the thread in.
     * @param messageID The ID of the message to create the thread from.
     * @param options The options for starting the thread.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#threads | Guild#threads}
     */
    startThreadFromMessage<T extends AnnouncementThreadChannel | PublicThreadChannel = AnnouncementThreadChannel | PublicThreadChannel>(channelID: string, messageID: string, options: Types.Channels.StartThreadFromMessageOptions): Promise<T>;
    /**
     * Create a thread in a thread only channel (forum & media).
     * @param channelID The ID of the channel to start the thread in.
     * @param options The options for starting the thread.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#threads | Guild#threads}
     */
    startThreadInThreadOnlyChannel(channelID: string, options: Types.Channels.StartThreadInThreadOnlyChannelOptions): Promise<PublicThreadChannel>;
    /**
     * Create a thread without an existing message.
     * @param channelID The ID of the channel to start the thread in.
     * @param options The options for starting the thread.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#threads | Guild#threads}
     */
    startThreadWithoutMessage<T extends AnnouncementThreadChannel | PublicThreadChannel | PrivateThreadChannel = AnnouncementThreadChannel | PublicThreadChannel | PrivateThreadChannel>(channelID: string, options: Types.Channels.StartThreadWithoutMessageOptions): Promise<T>;
    /**
     * Unpin a message in a channel.
     * @param channelID The ID of the channel to unpin the message in.
     * @param messageID The ID of the message to unpin.
     * @param reason The reason for unpinning the message.
     * @caching This method **does not** cache its result.
     */
    unpinMessage(channelID: string, messageID: string, reason?: string): Promise<void>;
    /**
     * Update the target users for an invite. Requires being the inviter or having the `MANAGE_GUILD` permission.
     * @param code The code of the invite.
     * @param users The IDs of the users to allow accepting the invite.
     */
    updateInviteTargetUsers(code: string, users: Array<string>): Promise<null>;
}
