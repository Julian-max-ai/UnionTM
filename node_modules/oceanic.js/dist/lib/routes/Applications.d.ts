import type * as Types from "../types/namespaced";
import ApplicationCommand from "../structures/ApplicationCommand";
import type RESTManager from "../rest/RESTManager";
import SKU from "../structures/SKU";
import type Entitlement from "../structures/Entitlement";
import TestEntitlement from "../structures/TestEntitlement";
import ClientApplication from "../structures/ClientApplication";
import Application from "../structures/Application";
import Subscription from "../structures/Subscription";
import Attachment from "../structures/Attachment";
/** Various methods for interacting with application commands. Located at {@link Client#rest | Client#rest}{@link RESTManager#applications | .applications}. */
export default class Applications {
    private _manager;
    constructor(manager: RESTManager);
    /**
     * Overwrite all existing global application commands.
     * @param applicationID The ID of the application.
     * @param options The commands.
     * @caching This method **does not** cache its result.
     */
    bulkEditGlobalCommands(applicationID: string, options: Array<Types.Applications.CreateApplicationCommandOptions>): Promise<Array<ApplicationCommand>>;
    /**
     * Overwrite all existing application commands in a guild.
     * @param applicationID The ID of the application.
     * @param guildID The ID of the guild.
     * @param options The commands.
     * @caching This method **does not** cache its result.
     */
    bulkEditGuildCommands(applicationID: string, guildID: string, options: Array<Types.Applications.CreateGuildApplicationCommandOptions>): Promise<Array<ApplicationCommand>>;
    /**
     * Mark an entitlement as consumed.
     * @param applicationID The ID of the application to the entitlement is for.
     * @param entitlementID The ID of the entitlement to consume.
     */
    consumeEntitlement(applicationID: string, entitlementID: string): Promise<void>;
    /**
     * Create an emoji for an application.
     * @param applicationID The ID of the application.
     * @param options The options for creating the emoji.
     * @caching This method **does not** cache its result.
     */
    createEmoji(applicationID: string, options: Types.Applications.CreateApplicationEmojiOptions): Promise<Types.Applications.ApplicationEmoji>;
    /**
     * Create a global application command.
     * @param applicationID The ID of the application.
     * @param options The options for the command.
     * @caching This method **does not** cache its result.
     */
    createGlobalCommand<T extends Types.Applications.CreateApplicationCommandOptions = Types.Applications.CreateApplicationCommandOptions>(applicationID: string, options: T): Promise<Types.Applications.ApplicationCommandOptionConversion<T>>;
    /**
     * Create a guild application command.
     * @param applicationID The ID of the application.
     * @param guildID The ID of the guild.
     * @param options The options for the command.
     * @caching This method **does not** cache its result.
     */
    createGuildCommand<T extends Types.Applications.CreateGuildApplicationCommandOptions = Types.Applications.CreateGuildApplicationCommandOptions>(applicationID: string, guildID: string, options: T): Promise<Types.Applications.ApplicationCommandOptionConversion<T>>;
    /**
     * Create a test entitlement.
     * @param applicationID The ID of the application to create the entitlement for.
     * @param options The options for creating the test entitlement.
     */
    createTestEntitlement(applicationID: string, options: Types.Applications.CreateTestEntitlementOptions): Promise<TestEntitlement>;
    /**
     * Delete an emoji for an application.
     * @param applicationID The ID of the application.
     * @param emojiID The ID of the emoji to be deleted.
     * @caching This method **does not** cache its result.
     */
    deleteEmoji(applicationID: string, emojiID: string): Promise<void>;
    /**
     * Delete a global application command.
     * @param applicationID The ID of the application.
     * @param commandID The ID the command to delete.
     * @caching This method **does not** cache its result.
     */
    deleteGlobalCommand(applicationID: string, commandID: string): Promise<void>;
    /**
     * Delete a guild application command.
     * @param applicationID The ID of the application.
     * @param guildID The ID of the guild.
     * @param commandID The ID of the command to delete.
     * @caching This method **does not** cache its result.
     */
    deleteGuildCommand(applicationID: string, guildID: string, commandID: string): Promise<void>;
    /**
     * Delete an entitlement.
     * @param applicationID The ID of the application to delete the entitlement from.
     * @param entitlementID The ID of the entitlement to delete.
     */
    deleteTestEntitlement(applicationID: string, entitlementID: string): Promise<void>;
    /**
     * Edit the currently authenticated bot's application info.
     * @param options The options for editing the application.
     * @caching This method **does not** cache its result.
     */
    editCurrent(options: Types.Applications.EditApplicationOptions): Promise<Application>;
    /**
     * Edit an existing emoji for an application.
     * @param applicationID The ID of the application.
     * @param emojiID The ID of the emoji to be edited.
     * @param options The options for editing the emoji.
     * @caching This method **does not** cache its result.
     */
    editEmoji(applicationID: string, emojiID: string, options: Types.Applications.EditApplicationEmojiOptions): Promise<Types.Applications.ApplicationEmoji>;
    /**
     * Edit a global application command.
     * @param applicationID The ID of the application.
     * @param commandID The ID of the command to edit.
     * @param options The options for editing the command.
     * @caching This method **does not** cache its result.
     */
    editGlobalCommand<T extends Types.Applications.EditApplicationCommandOptions = Types.Applications.EditApplicationCommandOptions>(applicationID: string, commandID: string, options: T): Promise<Types.Applications.ApplicationCommandOptionConversion<T>>;
    /**
     * Edit a guild application command.
     * @param applicationID The ID of the application.
     * @param guildID The ID of the guild.
     * @param commandID The ID of the command to edit.
     * @param options The options for editing the command.
     * @caching This method **does not** cache its result.
     */
    editGuildCommand<T extends Types.Applications.EditGuildApplicationCommandOptions = Types.Applications.EditGuildApplicationCommandOptions>(applicationID: string, guildID: string, commandID: string, options: T): Promise<Types.Applications.ApplicationCommandOptionConversion<T>>;
    /**
     * Edit a guild application command's permissions. This requires a bearer token with the `applications.commands.permissions.update` scope.
     * @param applicationID The ID of the application.
     * @param guildID The ID of the guild.
     * @param commandID The ID of the command.
     * @param options The options for editing the permissions.
     * @caching This method **does not** cache its result.
     */
    editGuildCommandPermissions(applicationID: string, guildID: string, commandID: string, options: Types.Applications.EditApplicationCommandPermissionsOptions): Promise<Types.Applications.RESTGuildApplicationCommandPermissions>;
    /**
     * Get an application's info.
     * @param applicationID The ID of the application.
     * @caching This method **does not** cache its result.
     * @note This generally cannot be used on any application except the authenticated bot.
     */
    get(applicationID: string): Promise<Application>;
    /**
     * Get an activity instance.
     * @param applicationID The ID of the application.
     * @param instanceID The ID of the instance.
     */
    getActivityInstance(applicationID: string, instanceID: string): Promise<Types.Applications.ActivityInstance>;
    /**
     * Get the currently authenticated bot's application info as a bare {@link ClientApplication | ClientApplication}.
     * @caching This method **does not** cache its result.
     */
    getClient(): Promise<ClientApplication>;
    /**
     * Get the currently authenticated bot's application info.
     * @caching This method **does not** cache its result.
     */
    getCurrent(): Promise<Application>;
    /**
     * Get an emoji for an application.
     * @param applicationID The ID of the application to get the emojis of.
     * @param emojiID The ID of the emoji to get.
     * @caching This method **does not** cache its result.
     */
    getEmoji(applicationID: string, emojiID: string): Promise<Types.Applications.ApplicationEmoji>;
    /**
     * Get the emojis for an application.
     * @param applicationID The ID of the application to get the emojis of.
     * @caching This method **does not** cache its result.
     */
    getEmojis(applicationID: string): Promise<Types.Applications.ApplicationEmojis>;
    /**
     * Get an entitlement for an application.
     * @param applicationID The ID of the application that the entitlement is for.
     * @param entitlementID The ID of the entitlement.
     * @caching This method **may** cache its result. If the entitlement's application id is the client's application id.
     * @caches {@link ClientApplication#entitlements | ClientApplication#entitlements}
     */
    getEntitlement(applicationID: string, entitlementID: string): Promise<Entitlement | TestEntitlement>;
    /**
     * Get the entitlements for an application.
     * @param applicationID The ID of the application to get the entitlements of.
     * @param options The options for getting the entitlements.
     * @caching This method **may** cache its result. If an entitlement's application id is the client's application id.
     * @caches {@link ClientApplication#entitlements | ClientApplication#entitlements}
     */
    getEntitlements(applicationID: string, options?: Types.Applications.SearchEntitlementsOptions): Promise<Array<Entitlement | TestEntitlement>>;
    /**
     * Get a global application command.
     * @param applicationID The ID of the application.
     * @param commandID The ID of the command.
     * @param options The options for getting the command.
     * @caching This method **does not** cache its result.
     */
    getGlobalCommand<T extends Types.Applications.AnyApplicationCommand = Types.Applications.AnyApplicationCommand>(applicationID: string, commandID: string, options?: Types.Applications.GetApplicationCommandOptions): Promise<T>;
    /**
     * Get an application's global commands.
     * @param applicationID The ID of the application.
     * @param options The options for getting the command.
     * @caching This method **does not** cache its result.
     */
    getGlobalCommands(applicationID: string, options?: Types.Applications.GetApplicationCommandOptions): Promise<Array<Types.Applications.AnyApplicationCommand>>;
    /**
     * Get a global application command.
     * @param applicationID The ID of the application.
     * @param guildID The ID of the guild.
     * @param commandID The ID of the command.
     * @param options The options for getting the command.
     * @caching This method **does not** cache its result.
     */
    getGuildCommand<T extends Types.Applications.AnyApplicationCommand = Types.Applications.AnyApplicationCommand>(applicationID: string, guildID: string, commandID: string, options?: Types.Applications.GetApplicationCommandOptions): Promise<T>;
    /**
     * Get an application's application commands in a specific guild.
     * @param applicationID The ID of the application.
     * @param guildID The ID of the guild.
     * @param options The options for getting the command.
     * @caching This method **does not** cache its result.
     */
    getGuildCommands(applicationID: string, guildID: string, options?: Types.Applications.GetApplicationCommandOptions): Promise<Array<Types.Applications.AnyApplicationCommand>>;
    /**
     * Get an application command's permissions in a guild.
     * @param applicationID The ID of the application.
     * @param guildID The ID of the guild.
     * @param commandID The ID of the command.
     * @caching This method **does not** cache its result.
     */
    getGuildPermission(applicationID: string, guildID: string, commandID: string): Promise<Types.Applications.RESTGuildApplicationCommandPermissions>;
    /**
     * Get the permissions for all application commands in a guild.
     * @param applicationID The ID of the application.
     * @param guildID The ID of the guild.
     * @caching This method **does not** cache its result.
     */
    getGuildPermissions(applicationID: string, guildID: string): Promise<Array<Types.Applications.RESTGuildApplicationCommandPermissions>>;
    /**
     * Get the subscription for an SKU.
     * @param skuID The ID of the SKU to get the subscription of.
     * @param subscriptionID The ID of the subscription to get.
     */
    getSKUSubscription(skuID: string, subscriptionID: string): Promise<Subscription>;
    /**
     * Get the subscriptions for an SKU.
     * @param skuID The ID of the SKU to get the subscriptions of.
     * @param options The options for getting the subscriptions.
     */
    getSKUSubscriptions(skuID: string, options: Types.Applications.SearchSKUSubscriptions): Promise<Array<Subscription>>;
    /**
     * Get the SKUs for an application.
     * @param applicationID The ID of the application to get the SKUs of.
     */
    getSKUs(applicationID: string): Promise<Array<SKU>>;
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
    uploadAttachment(applicationID: string, options: Types.Applications.UploadApplicationAttachmentOptions): Promise<Attachment>;
}
