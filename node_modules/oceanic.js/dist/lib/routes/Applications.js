"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module REST/ApplicationCommands */
const Routes = tslib_1.__importStar(require("../util/Routes"));
const ApplicationCommand_1 = tslib_1.__importDefault(require("../structures/ApplicationCommand"));
const SKU_1 = tslib_1.__importDefault(require("../structures/SKU"));
const TestEntitlement_1 = tslib_1.__importDefault(require("../structures/TestEntitlement"));
const ClientApplication_1 = tslib_1.__importDefault(require("../structures/ClientApplication"));
const Application_1 = tslib_1.__importDefault(require("../structures/Application"));
const Subscription_1 = tslib_1.__importDefault(require("../structures/Subscription"));
const QueryBuilder_1 = tslib_1.__importDefault(require("../util/QueryBuilder"));
const Attachment_1 = tslib_1.__importDefault(require("../structures/Attachment"));
/** Various methods for interacting with application commands. Located at {@link Client#rest | Client#rest}{@link RESTManager#applications | .applications}. */
class Applications {
    _manager;
    constructor(manager) {
        this._manager = manager;
    }
    /**
     * Overwrite all existing global application commands.
     * @param applicationID The ID of the application.
     * @param options The commands.
     * @caching This method **does not** cache its result.
     */
    async bulkEditGlobalCommands(applicationID, options) {
        const opts = options;
        return this._manager.authRequest({
            method: "PUT",
            path: Routes.APPLICATION_COMMANDS(applicationID),
            json: opts.map(opt => ({
                contexts: opt.contexts,
                description: opt.description,
                default_member_permissions: opt.defaultMemberPermissions,
                description_localizations: opt.descriptionLocalizations,
                dm_permission: opt.dmPermission,
                handler: opt.handler,
                integration_types: opt.integrationTypes,
                name: opt.name,
                name_localizations: opt.nameLocalizations,
                nsfw: opt.nsfw,
                options: opt.options?.map(o => this._manager.client.util.optionToRaw(o)),
                type: opt.type
            }))
        }).then(data => data.map(d => new ApplicationCommand_1.default(d, this._manager.client)));
    }
    /**
     * Overwrite all existing application commands in a guild.
     * @param applicationID The ID of the application.
     * @param guildID The ID of the guild.
     * @param options The commands.
     * @caching This method **does not** cache its result.
     */
    async bulkEditGuildCommands(applicationID, guildID, options) {
        const opts = this._manager.client.util._freeze(options);
        return this._manager.authRequest({
            method: "PUT",
            path: Routes.GUILD_APPLICATION_COMMANDS(applicationID, guildID),
            json: opts.map(opt => ({
                id: opt.id,
                default_member_permissions: opt.defaultMemberPermissions,
                description: opt.description,
                description_localizations: opt.descriptionLocalizations,
                dm_permission: opt.dmPermission,
                name: opt.name,
                name_localizations: opt.nameLocalizations,
                nsfw: opt.nsfw,
                options: opt.options?.map(o => this._manager.client.util.optionToRaw(o)),
                type: opt.type
            }))
        }).then(data => data.map(d => new ApplicationCommand_1.default(d, this._manager.client)));
    }
    /**
     * Mark an entitlement as consumed.
     * @param applicationID The ID of the application to the entitlement is for.
     * @param entitlementID The ID of the entitlement to consume.
     */
    async consumeEntitlement(applicationID, entitlementID) {
        await this._manager.authRequest({
            method: "POST",
            path: Routes.CONSUME_ENTITLEMENT(applicationID, entitlementID)
        });
    }
    /**
     * Create an emoji for an application.
     * @param applicationID The ID of the application.
     * @param options The options for creating the emoji.
     * @caching This method **does not** cache its result.
     */
    async createEmoji(applicationID, options) {
        options = this._manager.client.util._freeze(options);
        let image;
        if (options.image) {
            image = this._manager.client.util._convertImage(options.image, "image");
        }
        return this._manager.authRequest({
            method: "POST",
            path: Routes.APPLICATION_EMOJIS(applicationID),
            json: {
                name: options.name,
                image
            }
        }).then(emoji => this._manager.client.util.convertApplicationEmoji(emoji));
    }
    /**
     * Create a global application command.
     * @param applicationID The ID of the application.
     * @param options The options for the command.
     * @caching This method **does not** cache its result.
     */
    async createGlobalCommand(applicationID, options) {
        const opt = this._manager.client.util._freeze(options);
        return this._manager.authRequest({
            method: "POST",
            path: Routes.APPLICATION_COMMANDS(applicationID),
            json: {
                contexts: opt.contexts,
                default_member_permissions: opt.defaultMemberPermissions,
                description_localizations: opt.descriptionLocalizations,
                description: opt.description,
                dm_permission: opt.dmPermission,
                handler: opt.handler,
                integration_types: opt.integrationTypes,
                name_localizations: opt.nameLocalizations,
                name: opt.name,
                nsfw: opt.nsfw,
                options: opt.options?.map(o => this._manager.client.util.optionToRaw(o)),
                type: opt.type
            }
        }).then(data => new ApplicationCommand_1.default(data, this._manager.client));
    }
    /**
     * Create a guild application command.
     * @param applicationID The ID of the application.
     * @param guildID The ID of the guild.
     * @param options The options for the command.
     * @caching This method **does not** cache its result.
     */
    async createGuildCommand(applicationID, guildID, options) {
        const opt = this._manager.client.util._freeze(options);
        return this._manager.authRequest({
            method: "POST",
            path: Routes.GUILD_APPLICATION_COMMANDS(applicationID, guildID),
            json: {
                default_member_permissions: opt.defaultMemberPermissions,
                description: opt.description,
                description_localizations: opt.descriptionLocalizations,
                dm_permission: opt.dmPermission,
                name: opt.name,
                name_localizations: opt.nameLocalizations,
                nsfw: opt.nsfw,
                options: opt.options?.map(o => this._manager.client.util.optionToRaw(o)),
                type: opt.type
            }
        }).then(data => new ApplicationCommand_1.default(data, this._manager.client));
    }
    /**
     * Create a test entitlement.
     * @param applicationID The ID of the application to create the entitlement for.
     * @param options The options for creating the test entitlement.
     */
    async createTestEntitlement(applicationID, options) {
        options = this._manager.client.util._freeze(options);
        return this._manager.authRequest({
            method: "POST",
            path: Routes.ENTITLEMENTS(applicationID),
            json: {
                owner_id: options.ownerID,
                owner_type: options.ownerType,
                sku_id: options.skuID
            }
        }).then(data => new TestEntitlement_1.default(data, this._manager.client));
    }
    /**
     * Delete an emoji for an application.
     * @param applicationID The ID of the application.
     * @param emojiID The ID of the emoji to be deleted.
     * @caching This method **does not** cache its result.
     */
    async deleteEmoji(applicationID, emojiID) {
        await this._manager.authRequest({
            method: "DELETE",
            path: Routes.APPLICATION_EMOJI(applicationID, emojiID)
        });
    }
    /**
     * Delete a global application command.
     * @param applicationID The ID of the application.
     * @param commandID The ID the command to delete.
     * @caching This method **does not** cache its result.
     */
    async deleteGlobalCommand(applicationID, commandID) {
        await this._manager.authRequest({
            method: "DELETE",
            path: Routes.APPLICATION_COMMAND(applicationID, commandID)
        });
    }
    /**
     * Delete a guild application command.
     * @param applicationID The ID of the application.
     * @param guildID The ID of the guild.
     * @param commandID The ID of the command to delete.
     * @caching This method **does not** cache its result.
     */
    async deleteGuildCommand(applicationID, guildID, commandID) {
        await this._manager.authRequest({
            method: "DELETE",
            path: Routes.GUILD_APPLICATION_COMMAND(applicationID, guildID, commandID)
        });
    }
    /**
     * Delete an entitlement.
     * @param applicationID The ID of the application to delete the entitlement from.
     * @param entitlementID The ID of the entitlement to delete.
     */
    async deleteTestEntitlement(applicationID, entitlementID) {
        await this._manager.authRequest({
            method: "DELETE",
            path: Routes.ENTITLEMENT(applicationID, entitlementID)
        });
    }
    /**
     * Edit the currently authenticated bot's application info.
     * @param options The options for editing the application.
     * @caching This method **does not** cache its result.
     */
    async editCurrent(options) {
        options = this._manager.client.util._freeze(options);
        let coverImage, icon;
        if (options.coverImage) {
            coverImage = this._manager.client.util._convertImage(options.coverImage, "cover image");
        }
        if (options.icon) {
            icon = this._manager.client.util._convertImage(options.icon, "icon");
        }
        return this._manager.authRequest({
            method: "PATCH",
            path: Routes.APPLICATION("@me"),
            json: {
                cover_image: coverImage,
                custom_install_url: options.customInstallURL,
                description: options.description,
                event_webhooks_status: options.eventWebhooksStatus,
                event_webhooks_types: options.eventWebhooksTypes,
                event_webhooks_url: options.eventWebhooksURL,
                flags: options.flags,
                icon,
                install_params: options.installParams,
                integration_types_config: options.integrationTypesConfig,
                interactions_endpoint_url: options.interactionsEndpointURL,
                role_connections_verification_url: options.roleConnectionsVerificationURL,
                tags: options.tags
            }
        }).then(data => new Application_1.default(data, this._manager.client));
    }
    /**
     * Edit an existing emoji for an application.
     * @param applicationID The ID of the application.
     * @param emojiID The ID of the emoji to be edited.
     * @param options The options for editing the emoji.
     * @caching This method **does not** cache its result.
     */
    async editEmoji(applicationID, emojiID, options) {
        options = this._manager.client.util._freeze(options);
        return this._manager.authRequest({
            method: "PATCH",
            path: Routes.APPLICATION_EMOJI(applicationID, emojiID),
            json: { name: options.name }
        }).then(emoji => this._manager.client.util.convertApplicationEmoji(emoji));
    }
    /**
     * Edit a global application command.
     * @param applicationID The ID of the application.
     * @param commandID The ID of the command to edit.
     * @param options The options for editing the command.
     * @caching This method **does not** cache its result.
     */
    async editGlobalCommand(applicationID, commandID, options) {
        const opt = this._manager.client.util._freeze(options);
        return this._manager.authRequest({
            method: "PATCH",
            path: Routes.APPLICATION_COMMAND(applicationID, commandID),
            json: {
                contexts: opt.contexts,
                default_member_permissions: opt.defaultMemberPermissions,
                description: opt.description,
                description_localizations: opt.descriptionLocalizations,
                dm_permission: opt.dmPermission,
                integration_types: opt.integrationTypes,
                name: opt.name,
                name_localizations: opt.nameLocalizations,
                nsfw: opt.nsfw,
                options: opt.options?.map(o => this._manager.client.util.optionToRaw(o))
            }
        }).then(data => new ApplicationCommand_1.default(data, this._manager.client));
    }
    /**
     * Edit a guild application command.
     * @param applicationID The ID of the application.
     * @param guildID The ID of the guild.
     * @param commandID The ID of the command to edit.
     * @param options The options for editing the command.
     * @caching This method **does not** cache its result.
     */
    async editGuildCommand(applicationID, guildID, commandID, options) {
        const opt = this._manager.client.util._freeze(options);
        return this._manager.authRequest({
            method: "PATCH",
            path: Routes.GUILD_APPLICATION_COMMAND(applicationID, guildID, commandID),
            json: {
                default_member_permissions: opt.defaultMemberPermissions,
                description: opt.description,
                description_localizations: opt.descriptionLocalizations,
                dm_permission: opt.dmPermission,
                name: opt.name,
                name_localizations: opt.nameLocalizations,
                nsfw: opt.nsfw,
                options: opt.options?.map(o => this._manager.client.util.optionToRaw(o))
            }
        }).then(data => new ApplicationCommand_1.default(data, this._manager.client));
    }
    /**
     * Edit a guild application command's permissions. This requires a bearer token with the `applications.commands.permissions.update` scope.
     * @param applicationID The ID of the application.
     * @param guildID The ID of the guild.
     * @param commandID The ID of the command.
     * @param options The options for editing the permissions.
     * @caching This method **does not** cache its result.
     */
    async editGuildCommandPermissions(applicationID, guildID, commandID, options) {
        options = this._manager.client.util._freeze(options);
        return (options.accessToken ? this._manager.request.bind(this._manager) : this._manager.authRequest.bind(this._manager))({
            method: "PUT",
            path: Routes.GUILD_APPLICATION_COMMAND_PERMISSION(applicationID, guildID, commandID),
            json: { permissions: options.permissions },
            auth: options.accessToken
        }).then(data => {
            const d = data;
            return {
                applicationID: d.application_id,
                guildID: d.guild_id,
                id: d.id,
                permissions: d.permissions
            };
        });
    }
    /**
     * Get an application's info.
     * @param applicationID The ID of the application.
     * @caching This method **does not** cache its result.
     * @note This generally cannot be used on any application except the authenticated bot.
     */
    async get(applicationID) {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.APPLICATION(applicationID)
        }).then(data => new Application_1.default(data, this._manager.client));
    }
    /**
     * Get an activity instance.
     * @param applicationID The ID of the application.
     * @param instanceID The ID of the instance.
     */
    async getActivityInstance(applicationID, instanceID) {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.APPLICATION_ACTIVITY_INSTANCE(applicationID, instanceID)
        }).then(data => ({
            applicationID: data.application_id,
            instanceID: data.instance_id,
            launchID: data.launch_id,
            location: {
                channelID: data.location.channel_id,
                guildID: data.location.guild_id,
                id: data.location.id,
                kind: data.location.kind
            },
            users: data.users
        }));
    }
    /**
     * Get the currently authenticated bot's application info as a bare {@link ClientApplication | ClientApplication}.
     * @caching This method **does not** cache its result.
     */
    async getClient() {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.APPLICATION("@me")
        }).then(data => new ClientApplication_1.default(data, this._manager.client));
    }
    /**
     * Get the currently authenticated bot's application info.
     * @caching This method **does not** cache its result.
     */
    async getCurrent() {
        return this.get("@me");
    }
    /**
     * Get an emoji for an application.
     * @param applicationID The ID of the application to get the emojis of.
     * @param emojiID The ID of the emoji to get.
     * @caching This method **does not** cache its result.
     */
    async getEmoji(applicationID, emojiID) {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.APPLICATION_EMOJI(applicationID, emojiID)
        }).then(emoji => this._manager.client.util.convertApplicationEmoji(emoji));
    }
    /**
     * Get the emojis for an application.
     * @param applicationID The ID of the application to get the emojis of.
     * @caching This method **does not** cache its result.
     */
    async getEmojis(applicationID) {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.APPLICATION_EMOJIS(applicationID)
        }).then(({ items }) => ({
            items: items.map(item => this._manager.client.util.convertApplicationEmoji(item))
        }));
    }
    /**
     * Get an entitlement for an application.
     * @param applicationID The ID of the application that the entitlement is for.
     * @param entitlementID The ID of the entitlement.
     * @caching This method **may** cache its result. If the entitlement's application id is the client's application id.
     * @caches {@link ClientApplication#entitlements | ClientApplication#entitlements}
     */
    async getEntitlement(applicationID, entitlementID) {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.ENTITLEMENT(applicationID, entitlementID)
        }).then(data => this._manager.client.util.updateEntitlement(data));
    }
    /**
     * Get the entitlements for an application.
     * @param applicationID The ID of the application to get the entitlements of.
     * @param options The options for getting the entitlements.
     * @caching This method **may** cache its result. If an entitlement's application id is the client's application id.
     * @caches {@link ClientApplication#entitlements | ClientApplication#entitlements}
     */
    async getEntitlements(applicationID, options = {}) {
        options = this._manager.client.util._freeze(options);
        const query = new QueryBuilder_1.default();
        query.setIfPresent("after", options.after);
        query.setIfPresent("before", options.before);
        query.setIfPresent("exclude_deleted", options.excludeDeleted);
        query.setIfPresent("exclude_ended", options.excludeEnded);
        query.setIfPresent("guild_id", options.guildID);
        query.setIfPresent("limit", options.limit);
        query.setIfPresent("sku_ids", options.skuIDs?.join(","));
        query.setIfPresent("user_id", options.userID);
        return this._manager.authRequest({
            method: "GET",
            path: Routes.ENTITLEMENTS(applicationID),
            query
        }).then(data => data.map(d => this._manager.client.util.updateEntitlement(d)));
    }
    /**
     * Get a global application command.
     * @param applicationID The ID of the application.
     * @param commandID The ID of the command.
     * @param options The options for getting the command.
     * @caching This method **does not** cache its result.
     */
    async getGlobalCommand(applicationID, commandID, options) {
        options = this._manager.client.util._freeze(options);
        const query = new QueryBuilder_1.default();
        query.setIfPresent("with_localizations", options?.withLocalizations);
        return this._manager.authRequest({
            method: "GET",
            path: Routes.APPLICATION_COMMAND(applicationID, commandID),
            query,
            headers: options?.locale === undefined ? undefined : { "X-Discord-Locale": options.locale }
        }).then(data => new ApplicationCommand_1.default(data, this._manager.client));
    }
    /**
     * Get an application's global commands.
     * @param applicationID The ID of the application.
     * @param options The options for getting the command.
     * @caching This method **does not** cache its result.
     */
    async getGlobalCommands(applicationID, options) {
        options = this._manager.client.util._freeze(options);
        const query = new QueryBuilder_1.default();
        query.setIfPresent("with_localizations", options?.withLocalizations);
        return this._manager.authRequest({
            method: "GET",
            path: Routes.APPLICATION_COMMANDS(applicationID),
            query,
            headers: options?.locale === undefined ? undefined : { "X-Discord-Locale": options.locale }
        }).then(data => data.map(d => new ApplicationCommand_1.default(d, this._manager.client)));
    }
    /**
     * Get a global application command.
     * @param applicationID The ID of the application.
     * @param guildID The ID of the guild.
     * @param commandID The ID of the command.
     * @param options The options for getting the command.
     * @caching This method **does not** cache its result.
     */
    async getGuildCommand(applicationID, guildID, commandID, options) {
        options = this._manager.client.util._freeze(options);
        const query = new QueryBuilder_1.default();
        query.setIfPresent("with_localizations", options?.withLocalizations);
        return this._manager.authRequest({
            method: "GET",
            path: Routes.GUILD_APPLICATION_COMMAND(applicationID, guildID, commandID),
            query,
            headers: options?.locale === undefined ? undefined : { "X-Discord-Locale": options.locale }
        }).then(data => new ApplicationCommand_1.default(data, this._manager.client));
    }
    /**
     * Get an application's application commands in a specific guild.
     * @param applicationID The ID of the application.
     * @param guildID The ID of the guild.
     * @param options The options for getting the command.
     * @caching This method **does not** cache its result.
     */
    async getGuildCommands(applicationID, guildID, options) {
        options = this._manager.client.util._freeze(options);
        const query = new QueryBuilder_1.default();
        query.setIfPresent("with_localizations", options?.withLocalizations);
        return this._manager.authRequest({
            method: "GET",
            path: Routes.GUILD_APPLICATION_COMMANDS(applicationID, guildID),
            query,
            headers: options?.locale === undefined ? undefined : { "X-Discord-Locale": options.locale }
        }).then(data => data.map(d => new ApplicationCommand_1.default(d, this._manager.client)));
    }
    /**
     * Get an application command's permissions in a guild.
     * @param applicationID The ID of the application.
     * @param guildID The ID of the guild.
     * @param commandID The ID of the command.
     * @caching This method **does not** cache its result.
     */
    async getGuildPermission(applicationID, guildID, commandID) {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.GUILD_APPLICATION_COMMAND_PERMISSION(applicationID, guildID, commandID)
        }).then(data => ({
            applicationID: data.application_id,
            guildID: data.guild_id,
            id: data.id,
            permissions: data.permissions
        }));
    }
    /**
     * Get the permissions for all application commands in a guild.
     * @param applicationID The ID of the application.
     * @param guildID The ID of the guild.
     * @caching This method **does not** cache its result.
     */
    async getGuildPermissions(applicationID, guildID) {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.GUILD_APPLICATION_COMMAND_PERMISSIONS(applicationID, guildID)
        }).then(data => data.map(d => ({
            applicationID: d.application_id,
            guildID: d.guild_id,
            id: d.id,
            permissions: d.permissions
        })));
    }
    /**
     * Get the subscription for an SKU.
     * @param skuID The ID of the SKU to get the subscription of.
     * @param subscriptionID The ID of the subscription to get.
     */
    async getSKUSubscription(skuID, subscriptionID) {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.SKU_SUBSCRIPTION(skuID, subscriptionID)
        }).then(data => new Subscription_1.default(data, this._manager.client));
    }
    /**
     * Get the subscriptions for an SKU.
     * @param skuID The ID of the SKU to get the subscriptions of.
     * @param options The options for getting the subscriptions.
     */
    async getSKUSubscriptions(skuID, options) {
        options = this._manager.client.util._freeze(options);
        const query = new QueryBuilder_1.default();
        query.setIfPresent("after", options.after);
        query.setIfPresent("before", options.before);
        query.setIfPresent("limit", options.limit);
        query.setIfPresent("user_id", options.userID);
        return this._manager.authRequest({
            method: "GET",
            path: Routes.SKU_SUBSCRIPTIONS(skuID),
            query
        }).then(data => data.map(d => new Subscription_1.default(d, this._manager.client)));
    }
    /**
     * Get the SKUs for an application.
     * @param applicationID The ID of the application to get the SKUs of.
     */
    async getSKUs(applicationID) {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.SKUS(applicationID)
        }).then(data => data.map(d => new SKU_1.default(d, this._manager.client)));
    }
    /**
     * Upload an ephemeral attachment for an application.
     *
     * The application must have Activities enabled (the {@link ApplicationFlags~EMBEDDED EMBEDDED} application flag). Applications without Activities enabled currently return an "Unknown Application" error.
     *
     * This endpoint requires a user OAuth2 bearer token; client credentials grant tokens are not valid and currently produce a 500 error.
     *
     * The returned url is only valid for 24 hours.
     * @param applicationID The ID of the application.
     * @param options The options for uploading the attachment.
     * @caching This method **does not** cache its result.
     */
    async uploadAttachment(applicationID, options) {
        options = this._manager.client.util._freeze(options);
        const auth = options.accessToken.startsWith("Bearer ") ? options.accessToken : `Bearer ${options.accessToken}`;
        return this._manager.request({
            method: "POST",
            path: Routes.APPLICATION_ATTACHMENT(applicationID),
            files: [{ ...options.file, field: "file" }],
            auth
        }).then(data => new Attachment_1.default(data.attachment, this._manager.client));
    }
}
exports.default = Applications;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBwbGljYXRpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL3JvdXRlcy9BcHBsaWNhdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsdUNBQXVDO0FBQ3ZDLCtEQUF5QztBQUV6QyxrR0FBa0U7QUFFbEUsb0VBQW9DO0FBRXBDLDRGQUE0RDtBQUM1RCxnR0FBZ0U7QUFDaEUsb0ZBQW9EO0FBQ3BELHNGQUFzRDtBQUN0RCxnRkFBZ0Q7QUFDaEQsa0ZBQWtEO0FBRWxELCtKQUErSjtBQUMvSixNQUFxQixZQUFZO0lBQ3JCLFFBQVEsQ0FBYztJQUM5QixZQUFZLE9BQW9CO1FBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO0lBQzVCLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxhQUFxQixFQUFFLE9BQWtFO1FBQ2xILE1BQU0sSUFBSSxHQUFHLE9BQTZFLENBQUM7UUFDM0YsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBa0Q7WUFDOUUsTUFBTSxFQUFFLEtBQUs7WUFDYixJQUFJLEVBQUksTUFBTSxDQUFDLG9CQUFvQixDQUFDLGFBQWEsQ0FBQztZQUNsRCxJQUFJLEVBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ3JCLFFBQVEsRUFBb0IsR0FBRyxDQUFDLFFBQVE7Z0JBQ3hDLFdBQVcsRUFBaUIsR0FBRyxDQUFDLFdBQVc7Z0JBQzNDLDBCQUEwQixFQUFFLEdBQUcsQ0FBQyx3QkFBd0I7Z0JBQ3hELHlCQUF5QixFQUFHLEdBQUcsQ0FBQyx3QkFBd0I7Z0JBQ3hELGFBQWEsRUFBZSxHQUFHLENBQUMsWUFBWTtnQkFDNUMsT0FBTyxFQUFzQixHQUFzRixDQUFDLE9BQU87Z0JBQzNILGlCQUFpQixFQUFXLEdBQUcsQ0FBQyxnQkFBZ0I7Z0JBQ2hELElBQUksRUFBd0IsR0FBRyxDQUFDLElB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