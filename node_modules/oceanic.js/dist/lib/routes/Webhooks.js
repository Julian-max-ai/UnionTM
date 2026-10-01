"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Routes = tslib_1.__importStar(require("../util/Routes"));
const Webhook_1 = tslib_1.__importDefault(require("../structures/Webhook"));
const Message_1 = tslib_1.__importDefault(require("../structures/Message"));
const QueryBuilder_1 = tslib_1.__importDefault(require("../util/QueryBuilder"));
/** Various methods for interacting with webhooks. Located at {@link Client#rest | Client#rest}{@link RESTManager#webhooks | .webhooks}. */
class Webhooks {
    _manager;
    constructor(manager) {
        this._manager = manager;
    }
    /**
     * Create a channel webhook.
     * @param channelID The ID of the channel to create the webhook in.
     * @param options The options to create the webhook with.
     * @caching This method **does not** cache its result.
     */
    async create(channelID, options) {
        options = this._manager.client.util._freeze(options);
        let avatar;
        if (options.avatar) {
            avatar = this._manager.client.util._convertImage(options.avatar, "avatar");
        }
        return this._manager.authRequest({
            method: "POST",
            path: Routes.CHANNEL_WEBHOOKS(channelID),
            json: {
                avatar,
                name: options.name
            },
            reason: options.reason
        }).then(data => new Webhook_1.default(data, this._manager.client));
    }
    /**
     * Delete a webhook.
     * @param webhookID The ID of the webhook.
     * @param reason The reason for deleting the webhook.
     * @caching This method **does not** cache its result.
     */
    async delete(webhookID, reason) {
        await this._manager.authRequest({
            method: "DELETE",
            path: Routes.WEBHOOK(webhookID),
            reason
        });
    }
    /**
     * Delete a webhook message.
     * @param webhookID The ID of the webhook.
     * @param token The token of the webhook.
     * @param messageID The ID of the message.
     * @param options The options for deleting the message.
     * @caching This method **does not** cache its result.
     */
    async deleteMessage(webhookID, token, messageID, options) {
        const query = new QueryBuilder_1.default();
        query.setIfPresent("thread_id", options?.threadID);
        await this._manager.authRequest({
            method: "DELETE",
            path: Routes.WEBHOOK_MESSAGE(webhookID, token, messageID),
            query
        });
    }
    /**
     * Delete a webhook via its token.
     * @param webhookID The ID of the webhook.
     * @param token The token of the webhook.
     * @caching This method **does not** cache its result.
     */
    async deleteToken(webhookID, token) {
        await this._manager.authRequest({
            method: "DELETE",
            path: Routes.WEBHOOK(webhookID, token)
        });
    }
    /**
     * Edit a webhook.
     * @param webhookID The ID of the webhook.
     * @param options The options for editing the webhook.
     * @caching This method **does not** cache its result.
     */
    async edit(webhookID, options) {
        options = this._manager.client.util._freeze(options);
        let avatar;
        if (options.avatar) {
            avatar = this._manager.client.util._convertImage(options.avatar, "avatar");
        }
        return this._manager.authRequest({
            method: "PATCH",
            path: Routes.WEBHOOK(webhookID),
            json: {
                avatar,
                channel_id: options.channelID,
                name: options.name
            },
            reason: options.reason
        }).then(data => new Webhook_1.default(data, this._manager.client));
    }
    /**
     * Edit a webhook message.
     * @param webhookID The ID of the webhook.
     * @param token The token of the webhook.
     * @param messageID The ID of the message to edit.
     * @param options The options for editing the message.
     * @caching This method **does not** cache its result.
     */
    async editMessage(webhookID, token, messageID, options) {
        options = this._manager.client.util._freeze(options);
        const query = new QueryBuilder_1.default();
        query.setIfPresent("thread_id", options?.threadID);
        return this._manager.authRequest({
            method: "PATCH",
            path: Routes.WEBHOOK_MESSAGE(webhookID, token, messageID),
            json: {
                allowed_mentions: this._manager.client.util.formatAllowedMentions(options.allowedMentions),
                attachments: options.attachments,
                components: options.components ? this._manager.client.util.componentsToRaw(options.components) : undefined,
                content: options.content,
                embeds: options.embeds ? this._manager.client.util.embedsToRaw(options.embeds) : undefined,
                flags: options.flags,
                poll: options.poll ? {
                    allow_multiselect: options.poll.allowMultiselect,
                    answers: options.poll.answers.map(a => ({
                        poll_media: a.pollMedia
                    })),
                    duration: options.poll.duration,
                    layout_type: options.poll.layoutType,
                    question: options.poll.question
                } : undefined
            },
            query,
            files: options.files ?? undefined
        }).then(data => new Message_1.default(data, this._manager.client));
    }
    /**
     * Edit a webhook via its token.
     * @param webhookID The ID of the webhook.
     * @param options The options for editing the webhook.
     * @caching This method **does not** cache its result.
     */
    async editToken(webhookID, token, options) {
        options = this._manager.client.util._freeze(options);
        let avatar;
        if (options.avatar) {
            avatar = this._manager.client.util._convertImage(options.avatar, "avatar");
        }
        return this._manager.authRequest({
            method: "PATCH",
            path: Routes.WEBHOOK(webhookID, token),
            json: {
                avatar,
                name: options.name
            }
        }).then(data => new Webhook_1.default(data, this._manager.client));
    }
    async execute(webhookID, token, options) {
        options = this._manager.client.util._freeze(options);
        const query = new QueryBuilder_1.default();
        query.setIfPresent("wait", options.wait);
        query.setIfPresent("with_components", options.withComponents);
        query.setIfPresent("thread_id", options.threadID);
        return this._manager.authRequest({
            method: "POST",
            path: Routes.WEBHOOK(webhookID, token),
            query,
            json: {
                allowed_mentions: this._manager.client.util.formatAllowedMentions(options.allowedMentions),
                attachments: options.attachments,
                avatar_url: options.avatarURL,
                components: options.components ? this._manager.client.util.componentsToRaw(options.components) : undefined,
                content: options.content,
                embeds: options.embeds ? this._manager.client.util.embedsToRaw(options.embeds) : undefined,
                flags: options.flags,
                poll: options.poll ? {
                    allow_multiselect: options.poll.allowMultiselect,
                    answers: options.poll.answers.map(a => ({
                        poll_media: a.pollMedia
                    })),
                    duration: options.poll.duration,
                    layout_type: options.poll.layoutType,
                    question: options.poll.question
                } : undefined,
                thread_name: options.threadName,
                tts: options.tts,
                username: options.username
            },
            files: options.files
        }).then(res => res === null ? undefined : new Message_1.default(res, this._manager.client));
    }
    async executeGithub(webhookID, token, options) {
        options = this._manager.client.util._freeze(options);
        const query = new QueryBuilder_1.default();
        query.setIfPresent("wait", options?.wait);
        return this._manager.authRequest({
            method: "POST",
            path: Routes.WEBHOOK_PLATFORM(webhookID, token, "github"),
            query,
            json: options
        }).then(res => res === null ? undefined : new Message_1.default(res, this._manager.client));
    }
    async executeSlack(webhookID, token, options) {
        options = this._manager.client.util._freeze(options);
        const query = new QueryBuilder_1.default();
        query.setIfPresent("wait", options?.wait);
        return this._manager.authRequest({
            method: "POST",
            path: Routes.WEBHOOK_PLATFORM(webhookID, token, "slack"),
            query,
            json: options
        }).then(res => res === null ? undefined : new Message_1.default(res, this._manager.client));
    }
    /**
     * Get a webhook by ID (and optionally token).
     * @param webhookID The ID of the webhook.
     * @param token The token of the webhook.
     * @caching This method **does not** cache its result.
     */
    async get(webhookID, token) {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.WEBHOOK(webhookID, token)
        }).then(data => new Webhook_1.default(data, this._manager.client));
    }
    /**
     * Get the webhooks in the specified channel.
     * @param channelID The ID of the channel to get the webhooks of.
     * @caching This method **does not** cache its result.
     */
    async getForChannel(channelID) {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.CHANNEL_WEBHOOKS(channelID)
        }).then(data => data.map(d => new Webhook_1.default(d, this._manager.client)));
    }
    /**
     * Get the webhooks in the specified guild.
     * @param guildID The ID of the guild to get the webhooks of.
     * @caching This method **does not** cache its result.
     */
    async getForGuild(guildID) {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.GUILD_WEBHOOKS(guildID)
        }).then(data => data.map(d => new Webhook_1.default(d, this._manager.client)));
    }
    /**
     * Get a webhook message.
     * @param webhookID The ID of the webhook.
     * @param token The token of the webhook.
     * @param messageID The ID of the message.
     * @param threadID The ID of the thread the message is in.
     * @caching This method **does not** cache its result.
     */
    async getMessage(webhookID, token, messageID, threadID) {
        const query = new QueryBuilder_1.default();
        query.setIfPresent("thread_id", threadID);
        return this._manager.authRequest({
            method: "GET",
            path: Routes.WEBHOOK_MESSAGE(webhookID, token, messageID),
            query
        }).then(data => new Message_1.default(data, this._manager.client));
    }
}
exports.default = Webhooks;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2ViaG9va3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvcm91dGVzL1dlYmhvb2tzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLCtEQUF5QztBQUN6Qyw0RUFBNEM7QUFDNUMsNEVBQTRDO0FBRTVDLGdGQUFnRDtBQUVoRCwySUFBMkk7QUFDM0ksTUFBcUIsUUFBUTtJQUNqQixRQUFRLENBQWM7SUFDOUIsWUFBWSxPQUFvQjtRQUM1QixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztJQUM1QixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxLQUFLLENBQUMsTUFBTSxDQUFDLFNBQWlCLEVBQUUsT0FBNEM7UUFDeEUsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDckQsSUFBSSxNQUEwQixDQUFDO1FBQy9CLElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2pCLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDL0UsQ0FBQztRQUNELE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQTRCO1lBQ3hELE1BQU0sRUFBRSxNQUFNO1lBQ2QsSUFBSSxFQUFJLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUM7WUFDMUMsSUFBSSxFQUFJO2dCQUNKLE1BQU07Z0JBQ04sSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJO2FBQ3JCO1lBQ0QsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNO1NBQ3pCLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLGlCQUFPLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMs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