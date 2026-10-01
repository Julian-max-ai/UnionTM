"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Routes = tslib_1.__importStar(require("../util/Routes"));
const Invite_1 = tslib_1.__importDefault(require("../structures/Invite"));
const StageInstance_1 = tslib_1.__importDefault(require("../structures/StageInstance"));
const Constants_1 = require("../Constants");
const QueryBuilder_1 = tslib_1.__importDefault(require("../util/QueryBuilder"));
const promises_1 = require("node:timers/promises");
/** Various methods for interacting with channels. Located at {@link Client#rest | Client#rest}{@link RESTManager#channels | .channels}. */
class Channels {
    _manager;
    constructor(manager) {
        this._manager = manager;
    }
    /**
     * Add a user to a group channel.
     * @param groupID The ID of the group to add the user to.
     * @param options The options for adding the recipient.
     * @caching This method **does not** cache its result.
     */
    async addGroupRecipient(groupID, options) {
        options = this._manager.client.util._freeze(options);
        await this._manager.authRequest({
            method: "PUT",
            path: Routes.GROUP_RECIPIENT(groupID, options.userID),
            json: {
                access_token: options.accessToken,
                nick: options.nick
            }
        });
    }
    /**
     * Add a member to a thread.
     * @param channelID The ID of the thread to add them to.
     * @param userID The ID of the user to add to the thread.
     * @caching This method **does not** cache its result.
     */
    async addThreadMember(channelID, userID) {
        await this._manager.authRequest({
            method: "PUT",
            path: Routes.CHANNEL_THREAD_MEMBER(channelID, userID)
        });
    }
    /**
     * Create a direct message. This will not create a new channel if you have already started a dm with the user.
     * @param recipient The ID of the recipient of the direct message.
     * @caching This method **does** cache its result.
     * @caches {@link Client#privateChannels | Client#privateChannels}
     */
    async createDM(recipient) {
        let cache;
        if ((cache = this._manager.client.privateChannels.find(ch => ch.recipient.id === recipient))) {
            return cache;
        }
        return this._manager.authRequest({
            method: "POST",
            path: Routes.OAUTH_CHANNELS,
            json: { recipient_id: recipient }
        }).then(data => this._manager.client.privateChannels.update(data));
    }
    /**
     * Create a group dm.
     * @param options The options for creating the group dm.
     * @caching This method **does** cache its result.
     * @caches {@link Client#groupChannels | Client#groupChannels}
     */
    async createGroupDM(options) {
        options = this._manager.client.util._freeze(options);
        return this._manager.authRequest({
            method: "POST",
            path: Routes.OAUTH_CHANNELS,
            json: {
                access_tokens: options.accessTokens,
                nicks: options.nicks
            }
        }).then(data => this._manager.client.groupChannels.update(data));
    }
    /**
     * Create an invite for a channel. If the guild is not a `COMMUNITY` server, invites can only be made to last 30 days.
     * @param channelID The ID of the channel to create an invite for.
     * @param options The options for creating the invite.
     * @caching This method **does not** cache its result.
     */
    async createInvite(channelID, options) {
        options = this._manager.client.util._freeze(options);
        return this._manager.authRequest({
            method: "POST",
            path: Routes.CHANNEL_INVITES(channelID),
            json: {
                max_age: options.maxAge,
                max_uses: options.maxUses,
                target_application_id: options.targetApplicationID,
                target_type: options.targetType,
                target_user_id: options.targetUserID,
                temporary: options.temporary,
                unique: options.unique
            },
            reason: options.reason,
            files: options.targetUsers ? [this._manager.client.util._arrayToCSVFile(options.targetUsers, "target_users_file", "user_id")] : undefined
        }).then(data => Invite_1.default.withMetadata(data, this._manager.client));
    }
    /**
     * Create a message in a channel.
     * @param channelID The ID of the channel to create the message in.
     * @param options The options for creating the message.
     * @caching This method **may** cache its result. The result will not be cached if the channel is not cached.
     * @caches {@link TextableChannel#messages | TextableChannel#messages}<br>{@link ThreadChannel#messages | ThreadChannel#messages}<br>{@link PrivateChannel#messages | PrivateChannel#messages}
     */
    async createMessage(channelID, options) {
        options = this._manager.client.util._freeze(options);
        return this._manager.authRequest({
            method: "POST",
            path: Routes.CHANNEL_MESSAGES(channelID),
            json: {
                allowed_mentions: this._manager.client.util.formatAllowedMentions(options.allowedMentions),
                attachments: options.attachments?.map(attachment => ({
                    description: attachment.description,
                    filename: attachment.filename,
                    id: attachment.id,
                    is_spoiler: attachment.isSpoiler
                })),
                components: options.components ? this._manager.client.util.componentsToRaw(options.components) : undefined,
                content: options.content,
                embeds: options.embeds ? this._manager.client.util.embedsToRaw(options.embeds) : undefined,
                enforce_nonce: options.enforceNonce,
                flags: options.flags,
                sticker_ids: options.stickerIDs,
                message_reference: options.messageReference ? {
                    channel_id: options.messageReference.channelID,
                    fail_if_not_exists: options.messageReference.failIfNotExists,
                    guild_id: options.messageReference.guildID,
                    message_id: options.messageReference.messageID,
                    type: options.messageReference.type
                } : undefined,
                nonce: options.nonce,
                poll: options.poll ? {
                    allow_multiselect: options.poll.allowMultiselect,
                    answers: options.poll.answers.map(a => ({
                        poll_media: a.pollMedia
                    })),
                    duration: options.poll.duration,
                    layout_type: options.poll.layoutType,
                    question: options.poll.question
                } : undefined,
                tts: options.tts
            },
            files: options.files
        }).then(data => this._manager.client.util.updateMessage(data));
    }
    /**
     * Add a reaction to a message.
     * @param channelID The ID of the channel the message is in.
     * @param messageID The ID of the message to add a reaction to.
     * @param emoji The reaction to add to the message. `name:id` for custom emojis, and the unicode codepoint for default emojis.
     * @caching This method **does not** cache its result.
     */
    async createReaction(channelID, messageID, emoji) {
        await this._manager.authRequest({
            method: "PUT",
            path: Routes.CHANNEL_REACTION_USER(channelID, messageID, emoji, "@me")
        });
    }
    /**
     * Create a stage instance.
     * @param channelID The ID of the channel to create the stage instance on.
     * @param options The options for creating the stage instance.
     * @caching This method **does not** cache its result.
     */
    async createStageInstance(channelID, options) {
        options = this._manager.client.util._freeze(options);
        return this._manager.authRequest({
            method: "POST",
            path: Routes.STAGE_INSTANCES,
            json: {
                channel_id: channelID,
                topic: options.topic,
                privacy_level: options.privacyLevel,
                send_start_notification: options.sendStartNotification
            },
            reason: options.reason
        }).then(data => new StageInstance_1.default(data, this._manager.client));
    }
    /**
     * Crosspost a message in an announcement channel.
     * @param channelID The ID of the channel to crosspost the message in.
     * @param messageID The ID of the message to crosspost.
     * @caching This method **may** cache its result. The result will not be cached if the channel is not cached.
     * @caches {@link TextableChannel#messages | TextableChannel#messages}<br>{@link ThreadChannel#messages | ThreadChannel#messages}<br>{@link PrivateChannel#messages | PrivateChannel#messages}
     */
    async crosspostMessage(channelID, messageID) {
        return this._manager.authRequest({
            method: "POST",
            path: Routes.CHANNEL_MESSAGES_CROSSPOST(channelID, messageID)
        }).then(data => this._manager.client.util.updateMessage(data));
    }
    /**
     * Delete or close a channel.
     * @param channelID The ID of the channel to delete or close.
     * @param reason The reason to be displayed in the audit log.
     * @caching This method **does not** cache its result.
     */
    async delete(channelID, reason) {
        await this._manager.authRequest({
            method: "DELETE",
            path: Routes.CHANNEL(channelID),
            reason
        });
    }
    /**
     * Delete an invite.
     * @param code The code of the invite to delete.
     * @param reason The reason for deleting the invite.
     * @caching This method **does not** cache its result.
     */
    async deleteInvite(code, reason) {
        return this._manager.authRequest({
            method: "DELETE",
            path: Routes.INVITE(code),
            reason
        }).then(data => new Invite_1.default(data, this._manager.client));
    }
    /**
     * Delete a message.
     * @param channelID The ID of the channel to delete the message in.
     * @param messageID The ID of the message to delete.
     * @param reason The reason for deleting the message.
     * @caching This method **does not** cache its result.
     */
    async deleteMessage(channelID, messageID, reason) {
        await this._manager.authRequest({
            method: "DELETE",
            path: Routes.CHANNEL_MESSAGE(channelID, messageID),
            reason
        });
    }
    /**
     * Bulk delete messages.
     * @param channelID The ID of the channel to delete the messages in.
     * @param messageIDs The IDs of the messages to delete. Any duplicates or messages older than two weeks will cause an error.
     * @param reason The reason for deleting the messages.
     * @caching This method **does not** cache its result.
     */
    async deleteMessages(channelID, messageIDs, reason) {
        const chunks = [];
        messageIDs = Array.from(messageIDs);
        const amountOfMessages = messageIDs.length;
        while (messageIDs.length !== 0) {
            chunks.push(messageIDs.splice(0, 100));
        }
        let done = 0;
        for (const chunk of chunks.values()) {
            if (chunks.length > 1) {
                const left = amountOfMessages - done;
                this._manager.client.emit("debug", `Deleting ${left} messages in ${channelID}`);
            }
            if (chunk.length === 1) {
                this._manager.client.emit("debug", "deleteMessages created a chunk with only 1 element, using deleteMessage instead.");
                await this.deleteMessage(channelID, chunk[0], reason);
                continue;
            }
            await this._manager.authRequest({
                method: "POST",
                path: Routes.CHANNEL_BULK_DELETE_MESSAGES(channelID),
                json: { messages: chunk },
                reason
            });
            done += chunk.length;
        }
        return amountOfMessages;
    }
    /**
     * Delete a permission overwrite.
     * @param channelID The ID of the channel to delete the permission overwrite in.
     * @param overwriteID The ID of the permission overwrite to delete.
     * @param reason The reason for deleting the permission overwrite.
     * @caching This method **does not** cache its result.
     */
    async deletePermission(channelID, overwriteID, reason) {
        await this._manager.authRequest({
            method: "DELETE",
            path: Routes.CHANNEL_PERMISSION(channelID, overwriteID),
            reason
        });
    }
    /**
     * Remove a reaction from a message.
     * @param channelID The ID of the channel the message is in.
     * @param messageID The ID of the message to remove a reaction from.
     * @param emoji The reaction to remove from the message. `name:id` for custom emojis, and the unicode codepoint for default emojis.
     * @param user The user to remove the reaction from, `@me` for the current user (default).
     * @caching This method **does not** cache its result.
     */
    async deleteReaction(channelID, messageID, emoji, user = "@me") {
        await this._manager.authRequest({
            method: "DELETE",
            path: Routes.CHANNEL_REACTION_USER(channelID, messageID, emoji, user)
        });
    }
    /**
     * Remove all, or a specific emoji's reactions from a message.
     * @param channelID The ID of the channel the message is in.
     * @param messageID The ID of the message to remove reactions from.
     * @param emoji The reaction to remove from the message. `name:id` for custom emojis, and the unicode codepoint for default emojis. Omit to remove all reactions.
     * @caching This method **does not** cache its result.
     */
    async deleteReactions(channelID, messageID, emoji) {
        await this._manager.authRequest({
            method: "DELETE",
            path: emoji ? Routes.CHANNEL_REACTION(channelID, messageID, emoji) : Routes.CHANNEL_REACTIONS(channelID, messageID)
        });
    }
    /**
     * Delete a stage instance.
     * @param channelID The ID of the channel to delete the stage instance on.
     * @param reason The reason for deleting the stage instance.
     * @caching This method **does not** cache its result.
     */
    async deleteStageInstance(channelID, reason) {
        await this._manager.authRequest({
            method: "DELETE",
            path: Routes.STAGE_INSTANCE(channelID),
            reason
        });
    }
    /**
     * Edit a channel.
     * @param channelID The ID of the channel to edit.
     * @param options The options for editing the channel.
     * @caching This method **may** cache its result. If a guild channel, the result will not be cached if the guild is not cached.
     * @caches {@link Guild#channels | Guild#channels}<br>{@link Guild#threads | Guild#threads}<br>{@link Client#groupChannels | Client#groupChannels}
     */
    async edit(channelID, options) {
        options = this._manager.client.util._freeze(options);
        let icon;
        if (options.icon) {
            try {
                icon = this._manager.client.util.convertImage(options.icon);
            }
            catch (err) {
                throw new TypeError("Invalid icon provided. Ensure you are providing a valid, fully-qualified base64 url.", { cause: err });
            }
        }
        return this._manager.authRequest({
            method: "PATCH",
            path: Routes.CHANNEL(channelID),
            json: {
                applied_tags: options.appliedTags,
                archived: options.archived,
                auto_archive_duration: options.autoArchiveDuration,
                available_tags: options.availableTags?.map(tag => ({
                    emoji_id: tag.emoji?.id,
                    emoji_name: tag.emoji?.name,
                    moderated: tag.moderated,
                    name: tag.name,
                    id: tag.id
                })),
                bitrate: options.bitrate,
                default_auto_archive_duration: options.defaultAutoArchiveDuration,
                default_forum_layout: options.defaultForumLayout,
                default_reaction_emoji: options.defaultReactionEmoji ? { emoji_id: options.defaultReactionEmoji.id, emoji_name: options.defaultReactionEmoji.name } : options.defaultReactionEmoji,
                default_sort_order: options.defaultSortOrder,
                default_thread_rate_limit_per_user: options.defaultThreadRateLimitPerUser,
                flags: options.flags,
                icon,
                invitable: options.invitable,
                locked: options.locked,
                name: options.name,
                nsfw: options.nsfw,
                parent_id: options.parentID,
                permission_overwrites: options.permissionOverwrites,
                position: options.position,
                rate_limit_per_user: options.rateLimitPerUser,
                rtc_region: options.rtcRegion,
                topic: options.topic,
                type: options.type,
                user_limit: options.userLimit,
                video_quality_mode: options.videoQualityMode
            },
            reason: options.reason
        }).then(data => this._manager.client.util.updateChannel(data));
    }
    /**
     * Edit a message.
     * @param channelID The ID of the channel the message is in.
     * @param messageID The ID of the message to edit.
     * @param options The options for editing the message.
     * @caching This method **may** cache its result. The result will not be cached if the channel is not cached.
     * @caches {@link TextableChannel#messages | TextableChannel#messages}<br>{@link ThreadChannel#messages | ThreadChannel#messages}<br>{@link PrivateChannel#messages | PrivateChannel#messages}
     */
    async editMessage(channelID, messageID, options) {
        options = this._manager.client.util._freeze(options);
        return this._manager.authRequest({
            method: "PATCH",
            path: Routes.CHANNEL_MESSAGE(channelID, messageID),
            json: {
                allowed_mentions: options.content !== undefined || options.allowedMentions || ((options.flags ?? 0) & Constants_1.MessageFlags.IS_COMPONENTS_V2) !== 0
                    ? this._manager.client.util.formatAllowedMentions(options.allowedMentions)
                    : undefined,
                attachments: options.attachments?.map(attachment => ({
                    description: attachment.description,
                    filename: attachment.filename,
                    id: attachment.id,
                    is_spoiler: attachment.isSpoiler
                })),
                components: options.components ? this._manager.client.util.componentsToRaw(options.components) : undefined,
                content: options.content,
                embeds: options.embeds ? this._manager.client.util.embedsToRaw(options.embeds) : undefined,
                flags: options.flags
            },
            files: options.files ?? undefined
        }).then(data => this._manager.client.util.updateMessage(data));
    }
    /**
     * Edit a permission overwrite.
     * @param channelID The ID of the channel to edit the permission overwrite for.
     * @param overwriteID The ID of the permission overwrite to edit.
     * @param options The options for editing the permission overwrite.
     * @caching This method **does not** cache its result.
     */
    async editPermission(channelID, overwriteID, options) {
        options = this._manager.client.util._freeze(options);
        await this._manager.authRequest({
            method: "PUT",
            path: Routes.CHANNEL_PERMISSION(channelID, overwriteID),
            json: {
                allow: options.allow,
                deny: options.deny,
                type: options.type
            },
            reason: options.reason
        });
    }
    /**
     * Edit a stage instance.
     * @param channelID The ID of the channel to edit the stage instance on.
     * @param options The options for editing the stage instance.
     * @caching This method **does not** cache its result.
     */
    async editStageInstance(channelID, options) {
        options = this._manager.client.util._freeze(options);
        return this._manager.authRequest({
            method: "PATCH",
            path: Routes.STAGE_INSTANCE(channelID),
            json: {
                channel_id: channelID,
                topic: options.topic,
                privacy_level: options.privacyLevel
            },
            reason: options.reason
        }).then(data => new StageInstance_1.default(data, this._manager.client));
    }
    /**
     * End a poll now.
     * @param channelID The ID of the channel the poll is in.
     * @param messageID The ID of the message the poll is on.
     * @caching This method **does not** cache its result.
     */
    async expirePoll(channelID, messageID) {
        await this._manager.authRequest({
            method: "POST",
            path: Routes.POLL_EXPIRE(channelID, messageID)
        });
    }
    /**
     * Follow an announcement channel.
     * @param channelID The ID of the channel to follow announcements from.
     * @param webhookChannelID The ID of the channel crossposted messages should be sent to. The client must have the `MANAGE_WEBHOOKS` permission in this channel.
     * @param reason The reason for following the announcement channel.
     * @caching This method **does not** cache its result.
     */
    async followAnnouncement(channelID, webhookChannelID, reason) {
        return this._manager.authRequest({
            method: "POST",
            reason,
            path: Routes.CHANNEL_FOLLOWERS(channelID),
            json: { webhook_channel_id: webhookChannelID }
        }).then(data => ({
            channelID: data.channel_id,
            webhookID: data.webhook_id
        }));
    }
    /**
     * Get a channel.
     * @param channelID The ID of the channel to get.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#channels | Guild#channels}<br>{@link Guild#threads | Guild#threads}<br>{@link Client#privateChannels | Client#privateChannels}<br>{@link Client#groupChannels | Client#groupChannels}
     */
    async get(channelID) {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.CHANNEL(channelID)
        }).then(data => this._manager.client.util.updateChannel(data));
    }
    async getInvite(code, options) {
        options = this._manager.client.util._freeze(options);
        const query = new QueryBuilder_1.default();
        query.setIfPresent("guild_scheduled_event_id", options?.guildScheduledEventID);
        query.setIfPresent("with_counts", options?.withCounts);
        return this._manager.authRequest({
            method: "GET",
            path: Routes.INVITE(code),
            query
        }).then(data => new Invite_1.default(data, this._manager.client));
    }
    /**
     * Get the target users for an invite. Requires being the inviter or having the `MANAGE_GUILD` or `VIEW_AUDIT_LOG` permission.
     * @param code The code of the invite.
     */
    async getInviteTargetUsers(code) {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.INVITE_TARGET_USERS(code)
        }).then(data => data.toString().split(/\r?\n/).filter(line => /^\d{15,}$/.test(line)));
    }
    /**
     * Get the target users job status for an invite. Requires being the inviter or having the `MANAGE_GUILD` or `VIEW_AUDIT_LOG` permission.
     * @param code The code of the invite.
     */
    async getInviteTargetUsersJobStatus(code) {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.INVITE_TARGET_USERS_JOB_STATUS(code)
        }).then(data => ({
            completedAt: data.completed_at ? new Date(data.completed_at) : null,
            createdAt: new Date(data.created_at),
            errorMessage: data.error_message,
            processedUsers: data.processed_users,
            status: data.status,
            totalUsers: data.total_users
        }));
    }
    /**
     * Get the invites of a channel.
     * @param channelID The ID of the channel to get the invites of.
     * @caching This method **does not** cache its result.
     */
    async getInvites(channelID) {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.CHANNEL_INVITES(channelID)
        }).then(data => data.map(invite => Invite_1.default.withMetadata(invite, this._manager.client)));
    }
    /**
     * Get the private archived threads the current user has joined in a channel.
     * @param channelID The ID of the channel to get the archived threads from.
     * @param options The options for getting the archived threads.
     * @caching This method **does not** cache its result.
     */
    async getJoinedPrivateArchivedThreads(channelID, options) {
        options = this._manager.client.util._freeze(options);
        return this._manager.authRequest({
            method: "GET",
            path: Routes.CHANNEL_PRIVATE_ARCHIVED_THREADS(channelID),
            json: {
                before: options?.before,
                limit: options?.limit
            }
        }).then(data => ({
            hasMore: data.has_more,
            members: data.members.map(m => ({
                flags: m.flags,
                id: m.id,
                joinTimestamp: new Date(m.join_timestamp),
                userID: m.user_id
            })),
            threads: data.threads.map(d => this._manager.client.util.updateThread(d))
        }));
    }
    /**
     * Get a message in a channel.
     * @param channelID The ID of the channel the message is in
     * @param messageID The ID of the message to get.
     * @caching This method **may** cache its result. The result will not be cached if the channel is not cached.
     * @caches {@link TextableChannel#messages | TextableChannel#messages}<br>{@link ThreadChannel#messages | ThreadChannel#messages}<br>{@link PrivateChannel#messages | PrivateChannel#messages}
     */
    async getMessage(channelID, messageID) {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.CHANNEL_MESSAGE(channelID, messageID)
        }).then(data => this._manager.client.util.updateMessage(data));
    }
    /**
     * Get messages in a channel.
     * @param channelID The ID of the channel to get messages from.
     * @param options The options for getting messages. `before`, `after`, and `around `All are mutually exclusive.
     * @caching This method **may** cache its result. The result will not be cached if the channel is not cached.
     * @caches {@link TextableChannel#messages | TextableChannel#messages}<br>{@link ThreadChannel#messages | ThreadChannel#messages}<br>{@link PrivateChannel#messages | PrivateChannel#messages}
     */
    async getMessages(channelID, options) {
        options = this._manager.client.util._freeze(options);
        const query = new QueryBuilder_1.default();
        let chosenOption;
        if (options?.around !== undefined) {
            query.set("around", options.around);
            chosenOption = "around";
            // eslint-disable-next-line unicorn/no-negated-condition
        }
        else if (options?.after !== undefined) {
            query.set("after", options.after);
            chosenOption = "after";
        }
        else {
            query.setIfPresent("before", options?.before);
            chosenOption = "before";
        }
        if (chosenOption === "around" || (options?.limit && options.limit <= 100)) {
            const filter = options?.filter?.bind(this) ?? (() => true);
            if (options?.limit !== undefined) {
                query.set("limit", Math.min(options.limit, 100));
            }
            const messages = await this._manager.authRequest({
                method: "GET",
                path: Routes.CHANNEL_MESSAGES(channelID),
                query
            }).then(data => data.map(d => this._manager.client.util.updateMessage(d)));
            for (const message of Array.from(messages)) {
                const f = filter(message);
                if (f === false) {
                    messages.splice(messages.indexOf(message), 1);
                }
                if (f === "break") {
                    messages.splice(messages.indexOf(message));
                    break;
                }
            }
            return messages;
        }
        const results = [];
        const it = this.getMessagesIterator(channelID, options);
        for await (const messages of it) {
            const limit = messages.length < 100 ? messages.length : it.limit + 100;
            this._manager.client.emit("debug", `Getting ${limit} more message${limit === 1 ? "" : "s"} for ${channelID}: ${it.lastMessage ?? ""}`);
            results.push(...messages);
        }
        return results;
    }
    /**
     * Get an async iterator for getting messages in a channel.
     * @param channelID The ID of the channel to get messages from.
     * @param options The options for getting messages. `before`, `after`, and `around `All are mutually exclusive.
     * @caching This method **may** cache its result. The result will not be cached if the channel is not cached.
     * @caches {@link TextableChannel#messages | TextableChannel#messages}<br>{@link ThreadChannel#messages | ThreadChannel#messages}<br>{@link PrivateChannel#messages | PrivateChannel#messages}
     */
    getMessagesIterator(channelID, options) {
        options = this._manager.client.util._freeze(options);
        const filter = options?.filter?.bind(this) ?? (() => true);
        const chosenOption = options?.after === undefined ? "before" : "after";
        // arrow functions cannot be generator functions
        // eslint-disable-next-line unicorn/no-this-assignment
        const self = this;
        const it = {
            lastMessage: chosenOption === "after" ? options?.after : options?.before,
            limit: options?.limit ?? 100,
            async *[Symbol.asyncIterator]() {
                loop: while (it.limit > 0) {
                    const messages = await self.getMessages(channelID, {
                        limit: Math.min(it.limit, 100),
                        [chosenOption]: it.lastMessage
                    });
                    const originalCount = messages.length;
                    it.limit -= messages.length;
                    for (const message of Array.from(messages)) {
                        const f = filter(message);
                        if (f === false) {
                            messages.splice(messages.indexOf(message), 1);
                        }
                        if (f === "break") {
                            messages.splice(messages.indexOf(message));
                            yield messages;
                            break loop;
                        }
                    }
                    it.lastMessage = messages.at(-1)?.id;
                    yield messages;
                    if (originalCount < 100 || it.limit <= 0) {
                        break loop;
                    }
                }
            }
        };
        return it;
    }
    /**
     * Get the pinned messages in a channel.
     * @param channelID The ID of the channel to get the pinned messages from.
     * @caching This method **may** cache its result. The result will not be cached if the channel is not cached.
     * @caches {@link TextableChannel#messages | TextableChannel#messages}<br>{@link ThreadChannel#messages | ThreadChannel#messages}<br>{@link PrivateChannel#messages | PrivateChannel#messages}
     * @deprecated Use {@link Channels#getPins | getPins} instead.
     */
    async getPinnedMessages(channelID) {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.CHANNEL_PINS(channelID)
        }).then(data => data.map(d => this._manager.client.util.updateMessage(d)));
    }
    /**
     * Get the pins in a channel.
     * @param channelID The ID of the channel to get the pins from.
     * @param options The options for getting pins.
     * @caching This method **may** cache its result. The messages will not be cached if the channel is not cached.
     * @caches {@link TextableChannel#messages | TextableChannel#messages}<br>{@link ThreadChannel#messages | ThreadChannel#messages}<br>{@link PrivateChannel#messages | PrivateChannel#messages}
     */
    async getPins(channelID, options) {
        options = this._manager.client.util._freeze(options);
        const query = new QueryBuilder_1.default();
        query.setIfPresent("before", options?.before);
        if (options?.limit === undefined || options.limit <= 50) {
            const filter = options?.filter?.bind(this) ?? (() => true);
            query.setIfPresent("limit", options?.limit);
            const pins = await this._manager.authRequest({
                method: "GET",
                path: Routes.CHANNEL_MESSAGE_PINS(channelID),
                query
            }).then(data => data.items.map(pin => ({
                message: this._manager.client.util.updateMessage(pin.message),
                pinnedTimestamp: new Date(pin.pinned_at)
            })));
            for (const pin of Array.from(pins)) {
                const f = await filter(pin);
                if (f === false) {
                    pins.splice(pins.indexOf(pin), 1);
                }
                if (f === "break") {
                    pins.splice(pins.indexOf(pin));
                    break;
                }
            }
            return pins;
        }
        const results = [];
        const it = this.getPinsIterator(channelID, options);
        for await (const pins of it) {
            const limit = pins.length < 50 ? pins.length : it.limit + 50;
            this._manager.client.emit("debug", `Getting ${limit} more pin${limit === 1 ? "" : "s"} for ${channelID}: ${it.lastPinTimestamp ?? ""}`);
            results.push(...pins);
        }
        return results;
    }
    /**
     * Get an async iterator for getting pins in a channel.
     * @param channelID The ID of the channel to get pins from.
     * @param options The options for getting pins.
     * @caching This method **may** cache its result. The messages will not be cached if the channel is not cached.
     * @caches {@link TextableChannel#messages | TextableChannel#messages}<br>{@link ThreadChannel#messages | ThreadChannel#messages}<br>{@link PrivateChannel#messages | PrivateChannel#messages}
     */
    getPinsIterator(channelID, options) {
        options = this._manager.client.util._freeze(options);
        const filter = options?.filter?.bind(this) ?? (() => true);
        // arrow functions cannot be generator functions
        // eslint-disable-next-line unicorn/no-this-assignment
        const self = this;
        const it = {
            lastPinTimestamp: options?.before,
            limit: options?.limit ?? 50,
            async *[Symbol.asyncIterator]() {
                loop: while (it.limit > 0) {
                    const query = new QueryBuilder_1.default();
                    query.setIfPresent("before", it.lastPinTimestamp);
                    query.set("limit", Math.min(it.limit, 50));
                    const data = await self._manager.authRequest({
                        method: "GET",
                        path: Routes.CHANNEL_MESSAGE_PINS(channelID),
                        query
                    });
                    const pins = data.items.map(pin => ({
                        message: self._manager.client.util.updateMessage(pin.message),
                        pinnedTimestamp: new Date(pin.pinned_at)
                    }));
                    it.limit -= pins.length;
                    for (const pin of Array.from(pins)) {
                        const f = await filter(pin);
                        if (f === false) {
                            pins.splice(pins.indexOf(pin), 1);
                        }
                        if (f === "break") {
                            pins.splice(pins.indexOf(pin));
                            yield pins;
                            break loop;
                        }
                    }
                    it.lastPinTimestamp = data.items.at(-1)?.pinned_at;
                    yield pins;
                    if (!data.has_more || it.limit <= 0) {
                        break loop;
                    }
                }
            }
        };
        return it;
    }
    /**
     * Get the users that voted on a poll answer.
     * @param channelID The ID of the channel the poll is in.
     * @param messageID The ID of the message the poll is on.
     * @param answerID The ID of the poll answer to get voters for.
     * @param options The options for getting the voters.
     * @caching This method **does** cache its result.
     * @caches {@link Client#users | Client#users}
     */
    async getPollAnswerUsers(channelID, messageID, answerID, options) {
        options = this._manager.client.util._freeze(options);
        const query = new QueryBuilder_1.default();
        query.setIfPresent("after", options?.after);
        query.setIfPresent("limit", options?.limit);
        return this._manager.authRequest({
            method: "GET",
            path: Routes.POLL_ANSWER_USERS(channelID, messageID, answerID),
            query
        }).then(data => {
            const users = data.users.map(user => this._manager.client.users.update(user));
            const message = this._manager.client.getChannel(channelID)?.messages.get(messageID);
            if (message?.poll) {
                this._manager.client.util.replacePollAnswer(message.poll, answerID, users.length, users.map(u => u.id));
            }
            return users;
        });
    }
    /**
     * Get the private archived threads in a channel.
     * @param channelID The ID of the channel to get the archived threads from.
     * @param options The options for getting the archived threads.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#threads | Guild#threads}
     */
    async getPrivateArchivedThreads(channelID, options) {
        options = this._manager.client.util._freeze(options);
        const query = new QueryBuilder_1.default();
        query.setIfPresent("before", options?.before);
        query.setIfPresent("limit", options?.limit);
        return this._manager.authRequest({
            method: "GET",
            path: Routes.CHANNEL_PRIVATE_ARCHIVED_THREADS(channelID),
            query
        }).then(data => ({
            hasMore: data.has_more,
            members: data.members.map(m => ({
                flags: m.flags,
                id: m.id,
                joinTimestamp: new Date(m.join_timestamp),
                userID: m.user_id
            })),
            threads: data.threads.map(d => this._manager.client.util.updateThread(d))
        }));
    }
    /**
     * Get the private joined archived threads in a channel.
     * @param channelID The ID of the channel to get the archived threads from.
     * @param options The options for getting the archived threads.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#threads | Guild#threads}
     */
    async getPrivateJoinedArchivedThreads(channelID, options) {
        options = this._manager.client.util._freeze(options);
        const query = new QueryBuilder_1.default();
        query.setIfPresent("before", options?.before);
        query.setIfPresent("limit", options?.limit);
        return this._manager.authRequest({
            method: "GET",
            path: Routes.CHANNEL_JOINED_PRIVATE_ARCHIVED_THREADS(channelID),
            query
        }).then(data => ({
            hasMore: data.has_more,
            members: data.members.map(m => ({
                flags: m.flags,
                id: m.id,
                joinTimestamp: new Date(m.join_timestamp),
                userID: m.user_id
            })),
            threads: data.threads.map(d => this._manager.client.util.updateThread(d))
        }));
    }
    /**
     * Get the public archived threads in a channel.
     * @param channelID The ID of the channel to get the archived threads from.
     * @param options The options for getting the archived threads.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#threads | Guild#threads}
     */
    async getPublicArchivedThreads(channelID, options) {
        options = this._manager.client.util._freeze(options);
        const query = new QueryBuilder_1.default();
        query.setIfPresent("before", options?.before);
        query.setIfPresent("limit", options?.limit);
        return this._manager.authRequest({
            method: "GET",
            path: Routes.CHANNEL_PUBLIC_ARCHIVED_THREADS(channelID),
            query
        }).then(data => ({
            hasMore: data.has_more,
            members: data.members.map(m => ({
                flags: m.flags,
                id: m.id,
                joinTimestamp: new Date(m.join_timestamp),
                userID: m.user_id
            })),
            threads: data.threads.map(d => this._manager.client.util.updateThread(d))
        }));
    }
    /**
     * Get the users who reacted with a specific emoji on a message.
     * @param channelID The ID of the channel the message is in.
     * @param messageID The ID of the message to get reactions from.
     * @param emoji The reaction to remove from the message. `name:id` for custom emojis, and the unicode codepoint for default emojis.
     * @param options The options for getting the reactions.
     * @caching This method **does not** cache its result.
     */
    async getReactions(channelID, messageID, emoji, options) {
        options = this._manager.client.util._freeze(options);
        const _getReactions = async (_options) => {
            const query = new QueryBuilder_1.default();
            query.setIfPresent("after", _options?.after);
            query.setIfPresent("limit", _options?.limit);
            query.setIfPresent("type", options?.type);
            return this._manager.authRequest({
                method: "GET",
                path: Routes.CHANNEL_REACTION(channelID, messageID, emoji),
                query
            }).then(data => data.map(d => this._manager.client.users.update(d)));
        };
        const limit = options?.limit ?? 100;
        let after = options?.after;
        let reactions = [];
        while (reactions.length < limit) {
            const limitLeft = limit - reactions.length;
            const limitToFetch = Math.min(limitLeft, 100);
            this._manager.client.emit("debug", `Getting ${limitLeft} more ${emoji} reactions for message ${messageID} on ${channelID}: ${after ?? ""}`);
            const reactionsChunk = await _getReactions({
                after,
                limit: limitToFetch
            });
            if (reactionsChunk.length === 0) {
                break;
            }
            reactions = reactions.concat(reactionsChunk);
            after = reactionsChunk.at(-1).id;
            if (reactionsChunk.length < 100) {
                break;
            }
        }
        return reactions;
    }
    /**
     * Get the stage instance associated with a channel.
     * @param channelID The ID of the channel to get the stage instance on.
     * @caching This method **does not** cache its result.
     */
    async getStageInstance(channelID) {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.STAGE_INSTANCE(channelID)
        }).then(data => new StageInstance_1.default(data, this._manager.client));
    }
    /**
     * Get a thread member.
     * @param channelID The ID of the thread.
     * @param userID The ID of the user to get the thread member of.
     * @caching This method **does not** cache its result.
     */
    async getThreadMember(channelID, userID) {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.CHANNEL_THREAD_MEMBER(channelID, userID)
        }).then(data => ({
            flags: data.flags,
            id: data.id,
            joinTimestamp: new Date(data.join_timestamp),
            userID: data.user_id
        }));
    }
    /**
     * Get the members of a thread.
     * @param channelID The ID of the thread.
     * @param options The options for getting the thread members.
     * @caching This method **does not** cache its result.
     */
    async getThreadMembers(channelID, options) {
        options = this._manager.client.util._freeze(options);
        const query = new QueryBuilder_1.default();
        query.setIfPresent("after", options?.after);
        query.setIfPresent("limit", options?.limit);
        query.setIfPresent("with_member", options?.withMember);
        return this._manager.authRequest({
            method: "GET",
            path: Routes.CHANNEL_THREAD_MEMBERS(channelID),
            query
        }).then(data => data.map(d => {
            // eslint-disable-next-line @typescript-eslint/dot-notation
            const guild = this._manager.client.getChannel(channelID)?.["_cachedGuild"];
            const member = guild && options?.withMember ? guild.members.update(d.member, guild.id) : undefined;
            return {
                flags: d.flags,
                id: d.id,
                joinTimestamp: new Date(d.join_timestamp),
                member,
                userID: d.user_id
            };
        }));
    }
    /** @deprecated Get the list of usable voice regions. Moved to `misc`. */
    async getVoiceRegions() {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.VOICE_REGIONS
        });
    }
    /**
     * Join a thread.
     * @param channelID The ID of the thread to join.
     * @caching This method **does not** cache its result.
     */
    async joinThread(channelID) {
        await this._manager.authRequest({
            method: "PUT",
            path: Routes.CHANNEL_THREAD_MEMBER(channelID, "@me")
        });
    }
    /**
     * Leave a thread.
     * @param channelID The ID of the thread to leave.
     * @caching This method **does not** cache its result.
     */
    async leaveThread(channelID) {
        await this._manager.authRequest({
            method: "DELETE",
            path: Routes.CHANNEL_THREAD_MEMBER(channelID, "@me")
        });
    }
    /**
     * Pin a message in a channel.
     * @param channelID The ID of the channel to pin the message in.
     * @param messageID The ID of the message to pin.
     * @param reason The reason for pinning the message.
     * @caching This method **does not** cache its result.
     */
    async pinMessage(channelID, messageID, reason) {
        await this._manager.authRequest({
            method: "PUT",
            path: Routes.CHANNEL_MESSAGE_PIN(channelID, messageID),
            reason
        });
    }
    /**
     * Purge an amount of messages from a channel.
     * @param channelID The ID of the channel to purge.
     * @param options The options to purge. `before`, `after`, and `around `All are mutually exclusive.
     * @caching This method **does not** cache its result.
     */
    async purgeMessages(channelID, options) {
        options = this._manager.client.util._freeze(options);
        if (options.limit === 0) {
            return 0;
        }
        const filter = (message) => {
            if (message.timestamp.getTime() < Date.now() - 1209600000) {
                return "break";
            }
            return options?.filter?.(message) ?? true;
        };
        let chosenOption;
        if (options.after) {
            chosenOption = "after";
        }
        else if (options.around) {
            chosenOption = "around";
        }
        else {
            chosenOption = "before";
        }
        if (chosenOption === "around" || options.limit <= 100) {
            const messages = await this.getMessages(channelID, {
                limit: options.limit,
                [chosenOption]: options[chosenOption]
            });
            for (const message of Array.from(messages)) {
                const f = filter(message);
                if (f === false) {
                    messages.splice(messages.indexOf(message), 1);
                }
                if (f === "break") {
                    messages.splice(messages.indexOf(message));
                    break;
                }
            }
            return this.deleteMessages(channelID, messages.map(message => message.id), options.reason);
        }
        const it = this.getMessagesIterator(channelID, {
            after: options.after,
            before: options.before,
            limit: options.limit,
            filter
        });
        let deleted = 0;
        for await (const messages of it) {
            deleted += await this.deleteMessages(channelID, messages.map(message => message.id), options.reason);
        }
        return deleted;
    }
    /**
     * Remove a user from the group channel.
     * @param groupID The ID of the group to remove the user from.
     * @param userID The ID of the user to remove.
     * @caching This method **does not** cache its result.
     */
    async removeGroupRecipient(groupID, userID) {
        await this._manager.authRequest({
            method: "DELETE",
            path: Routes.GROUP_RECIPIENT(groupID, userID)
        });
    }
    /**
     * Remove a member from a thread.
     * @param channelID The ID of the thread to remove them from.
     * @param userID The ID of the user to remove from the thread.
     * @caching This method **does not** cache its result.
     */
    async removeThreadMember(channelID, userID) {
        await this._manager.authRequest({
            method: "DELETE",
            path: Routes.CHANNEL_THREAD_MEMBER(channelID, userID)
        });
    }
    /**
     * Search threads in a channel.
     * @param channelID The ID of the channel to search threads in.
     * @param options The options to search with.
     * @param retryOnIndexNotAvailable If the search should be retried if Discord replies with an index unavailable response. This will retry at most one time, waiting for `retry_after` or 15-45 seconds.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#threads | Guild#threads}<br>{@link ThreadChannel#messages | ThreadChannel#messages}
     */
    async searchThreads(channelID, options, retryOnIndexNotAvailable = true) {
        options = this._manager.client.util._freeze(options);
        const query = new QueryBuilder_1.default();
        const append = (name, value) => {
            if (Array.isArray(value)) {
                for (const item of value) {
                    query.append(name, item);
                }
            }
            else if (value !== undefined) {
                query.append(name, value);
            }
        };
        query.setIfPresent("archived", options?.archived);
        query.setIfPresent("limit", options?.limit);
        query.setIfPresent("max_id", options?.maxID);
        query.setIfPresent("min_id", options?.minID);
        query.setIfPresent("name", options?.name);
        query.setIfPresent("offset", options?.offset);
        query.setIfPresent("slop", options?.slop);
        query.setIfPresent("sort_by", options?.sortBy);
        query.setIfPresent("sort_order", options?.sortOrder);
        query.setIfPresent("tag_setting", options?.tagSetting);
        append("tag", options?.tag);
        return this._manager.authRequest({
            method: "GET",
            path: Routes.CHANNEL_THREADS_SEARCH(channelID),
            query
        }).then(async (data) => {
            if ("retry_after" in data) {
                if (!retryOnIndexNotAvailable) {
                    throw new Error(`Thread search for channel ${channelID} failed due to the index not being available.`);
                }
                let retryAfter = data.retry_after;
                if (retryAfter === 0) {
                    retryAfter = Math.floor(Math.random() * 30) + 15;
                }
                this._manager.client.emit("debug", `Retrying thread search for channel ${channelID} in ${retryAfter} seconds...`);
                await (0, promises_1.setTimeout)(retryAfter * 1000);
                return this.searchThreads(channelID, options, false);
            }
            // eslint-disable-next-line @typescript-eslint/dot-notation
            const guild = this._manager.client.getChannel(channelID)?.["_cachedGuild"];
            return {
                firstMessages: data.first_messages?.map(message => this._manager.client.util.updateMessage(message)),
                hasMore: data.has_more,
                members: data.members?.map(m => ({
                    flags: m.flags,
                    id: m.id,
                    joinTimestamp: new Date(m.join_timestamp),
                    member: m.member && guild?.members.update(m.member, guild.id),
                    userID: m.user_id
                })),
                threads: data.threads.map(thread => this._manager.client.util.updateThread(thread)),
                totalResults: data.total_results
            };
        });
    }
    /**
     * Send a sound from the soundboard to the channel where the user is connected.
     * @param channelID The ID of the channel to send the soundboard sound to.
     * @param options The options for sending the soundboard sound.
     * @caching This method **does not** cache its result.
     */
    async sendSoundboardSound(channelID, options) {
        options = this._manager.client.util._freeze(options);
        await this._manager.authRequest({
            method: "POST",
            path: Routes.SEND_SOUNDBOARD_SOUND(channelID),
            json: { sound_id: options.soundID, source_guild_id: options.sourceGuildID }
        });
    }
    /**
     * Show a typing indicator in a channel. How long users see this varies from client to client.
     * @param channelID The ID of the channel to show the typing indicator in.
     * @caching This method **does not** cache its result.
     */
    async sendTyping(channelID) {
        await this._manager.authRequest({
            method: "POST",
            path: Routes.CHANNEL_TYPING(channelID)
        });
    }
    /**
     * Set a voice status in a channel.
     * @param channelID The ID of the channel to set the voice status in.
     * @param status The voice status to set.
     */
    async setVoiceStatus(channelID, status) {
        await this._manager.authRequest({
            method: "PUT",
            path: Routes.VOICE_STATUS(channelID),
            json: { status }
        });
    }
    /**
     * Create a thread from an existing message.
     * @param channelID The ID of the channel to create the thread in.
     * @param messageID The ID of the message to create the thread from.
     * @param options The options for starting the thread.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#threads | Guild#threads}
     */
    async startThreadFromMessage(channelID, messageID, options) {
        options = this._manager.client.util._freeze(options);
        return this._manager.authRequest({
            method: "POST",
            path: Routes.CHANNEL_MESSAGE_THREADS(channelID, messageID),
            json: {
                auto_archive_duration: options.autoArchiveDuration,
                name: options.name,
                rate_limit_per_user: options.rateLimitPerUser
            },
            reason: options.reason
        }).then(data => this._manager.client.util.updateThread(data));
    }
    /**
     * Create a thread in a thread only channel (forum & media).
     * @param channelID The ID of the channel to start the thread in.
     * @param options The options for starting the thread.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#threads | Guild#threads}
     */
    async startThreadInThreadOnlyChannel(channelID, options) {
        options = this._manager.client.util._freeze(options);
        return this._manager.authRequest({
            method: "POST",
            path: Routes.CHANNEL_THREADS(channelID),
            json: {
                auto_archive_duration: options.autoArchiveDuration,
                message: {
                    allowed_mentions: this._manager.client.util.formatAllowedMentions(options.message.allowedMentions),
                    attachments: options.message.attachments,
                    components: options.message.components ? this._manager.client.util.componentsToRaw(options.message.components) : undefined,
                    content: options.message.content,
                    embeds: options.message.embeds ? this._manager.client.util.embedsToRaw(options.message.embeds) : undefined,
                    flags: options.message.flags,
                    sticker_ids: options.message.stickerIDs
                },
                name: options.name,
                rate_limit_per_user: options.rateLimitPerUser,
                applied_tags: options.appliedTags
            },
            reason: options.reason,
            files: options.message.files
        }).then(data => this._manager.client.util.updateThread(data));
    }
    /**
     * Create a thread without an existing message.
     * @param channelID The ID of the channel to start the thread in.
     * @param options The options for starting the thread.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#threads | Guild#threads}
     */
    async startThreadWithoutMessage(channelID, options) {
        options = this._manager.client.util._freeze(options);
        return this._manager.authRequest({
            method: "POST",
            path: Routes.CHANNEL_THREADS(channelID),
            json: {
                auto_archive_duration: options.autoArchiveDuration,
                invitable: options.invitable,
                name: options.name,
                rate_limit_per_user: options.rateLimitPerUser,
                type: options.type
            },
            reason: options.reason
        }).then(data => this._manager.client.util.updateThread(data));
    }
    /**
     * Unpin a message in a channel.
     * @param channelID The ID of the channel to unpin the message in.
     * @param messageID The ID of the message to unpin.
     * @param reason The reason for unpinning the message.
     * @caching This method **does not** cache its result.
     */
    async unpinMessage(channelID, messageID, reason) {
        await this._manager.authRequest({
            method: "DELETE",
            path: Routes.CHANNEL_MESSAGE_PIN(channelID, messageID),
            reason
        });
    }
    /**
     * Update the target users for an invite. Requires being the inviter or having the `MANAGE_GUILD` permission.
     * @param code The code of the invite.
     * @param users The IDs of the users to allow accepting the invite.
     */
    async updateInviteTargetUsers(code, users) {
        return this._manager.authRequest({
            method: "PUT",
            path: Routes.INVITE_TARGET_USERS(code),
            files: [
                this._manager.client.util._arrayToCSVFile(users, "target_users_file", "user_id")
            ]
        });
    }
}
exports.default = Channels;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hhbm5lbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvcm91dGVzL0NoYW5uZWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLCtEQUF5QztBQUV6QywwRUFNOEI7QUFTOUIsd0ZBQXdEO0FBQ3hELDRDQUE0QztBQUM1QyxnRkFBZ0Q7QUFDaEQsbURBQWtEO0FBRWxELDJJQUEySTtBQUMzSSxNQUFxQixRQUFRO0lBQ2pCLFFBQVEsQ0FBYztJQUM5QixZQUFZLE9BQW9CO1FBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO0lBQzVCLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxPQUFlLEVBQUUsT0FBZ0Q7UUFDckYsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDckQsTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBTztZQUNsQyxNQUFNLEVBQUUsS0FBSztZQUNiLElBQUksRUFBSSxNQUFNLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDO1lBQ3ZELElBQUksRUFBSTtnQkFDSixZQUFZLEVBQUUsT0FBTyxDQUFDLFdBQVc7Z0JBQ2pDLElBQUksRUFBVSxPQUFPLENBQUMsSUFBSTthQUM3QjtTQUNKLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILEtBQUssQ0FBQyxlQUFlLENBQUMsU0FBaUIsRUFBRSxNQUFjO1FBQ25ELE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQU87WUFDbEMsTUFBTSxFQUFFLEtBQUs7WUFDYixJQUFJLEVBQUksTUFBTSxDQUFDLHFCQUFxQixDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUM7U0FDMUQsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNEOzs7OztPQUtHO0lB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