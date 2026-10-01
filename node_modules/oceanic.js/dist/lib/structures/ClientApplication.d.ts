/** @module ClientApplication */
import Base from "./Base";
import type ApplicationCommand from "./ApplicationCommand";
import TestEntitlement from "./TestEntitlement";
import Entitlement from "./Entitlement";
import type SKU from "./SKU";
import type Application from "./Application";
import Subscription from "./Subscription";
import type Attachment from "./Attachment";
import type * as Types from "../types/namespaced";
import type Client from "../Client";
import type { ApplicationCommandTypes } from "../Constants";
import TypedCollection from "../util/TypedCollection";
/** A representation of the authorized client's application (typically received via gateway). */
export default class ClientApplication extends Base {
    /** The entitlements for this application. This will almost certainly be empty unless you fetch entitlements, or recieve new/updated entitlements. */
    entitlements: TypedCollection<Types.Applications.RawEntitlement | Types.Applications.RawTestEntitlement, Entitlement | TestEntitlement>;
    /**
     * This application's [flags](https://discord.com/developers/docs/resources/application#application-object-application-flags).
     * @deprecated See {@link flagsNew}. This will likely be made a bigint in the future.
     */
    flags: number;
    /** This application's [flags](https://discord.com/developers/docs/resources/application#application-object-application-flags). */
    flagsNew: bigint;
    /** The subscriptions for this application. This will almost certainly be empty unless you fetch subscriptions, or recieve new/updated subscriptions. */
    subscriptions: TypedCollection<Types.Applications.RawSubscription, Subscription>;
    constructor(data: Types.Applications.RawClientApplication, client: Client);
    protected update(data: Partial<Types.Applications.RawClientApplication>): void;
    /**
     * Overwrite all existing global application commands.
     * @param options The commands.
     */
    bulkEditGlobalCommands(options: Array<Types.Applications.CreateApplicationCommandOptions>): Promise<Array<ApplicationCommand<ApplicationCommandTypes>>>;
    /**
     * Overwrite all existing application commands in a guild.
     * @param guildID The ID of the guild.
     * @param options The commands.
     */
    bulkEditGuildCommands(guildID: string, options: Array<Types.Applications.CreateGuildApplicationCommandOptions>): Promise<Array<ApplicationCommand<ApplicationCommandTypes>>>;
    /**
     * Mark an entitlement as consumed.
     * @param entitlementID The ID of the entitlement to consume.
     */
    consumeEntitlement(entitlementID: string): Promise<void>;
    /**
     * Create an emoji for this application.
     * @param options The options for creating the emoji.
     * @caching This method **does not** cache its result.
     */
    createEmoji(options: Types.Applications.CreateApplicationEmojiOptions): Promise<Types.Applications.ApplicationEmoji>;
    /**
     * Create a global application command.
     * @param options The options for creating the command.
     */
    createGlobalCommand<T extends Types.Applications.CreateApplicationCommandOptions = Types.Applications.CreateApplicationCommandOptions>(options: T): Promise<Types.Applications.ApplicationCommandOptionConversion<T>>;
    /**
     * Create a guild application command.
     * @param guildID The ID of the guild.
     * @param options The options for creating the command.
     */
    createGuildCommand<T extends Types.Applications.CreateGuildApplicationCommandOptions = Types.Applications.CreateGuildApplicationCommandOptions>(guildID: string, options: T): Promise<Types.Applications.ApplicationCommandOptionConversion<T>>;
    /**
     * Create a test entitlement.
     * @param options The options for creating the test entitlement.
     */
    createTestEntitlement(options: Types.Applications.CreateTestEntitlementOptions): Promise<TestEntitlement>;
    /**
     * Delete an emoji for this application.
     * @param emojiID The ID of the emoji to be deleted.
     * @caching This method **does not** cache its result.
     */
    deleteEmoji(emojiID: string): Promise<void>;
    /**
     * Delete a global application command.
     * @param commandID The ID of the command.
     */
    deleteGlobalCommand(commandID: string): Promise<void>;
    /**
     * Delete a guild application command.
     * @param guildID The ID of the guild.
     * @param commandID The ID of the command.
     */
    deleteGuildCommand(guildID: string, commandID: string): Promise<void>;
    /**
     * Delete a test entitlement.
     * @param entitlementID The ID of the entitlement to delete.
     */
    deleteTestEntitlement(entitlementID: string): Promise<void>;
    /**
     * Edit this application.
     * @param options The options for editing the application.
     */
    edit(options: Types.Applications.EditApplicationOptions): Promise<Application>;
    /**
     * Edit an existing emoji for this application.
     * @param emojiID The ID of the emoji to be edited.
     * @param options The options for editing the emoji.
     * @caching This method **does not** cache its result.
     */
    editEmoji(emojiID: string, options: Types.Applications.EditApplicationEmojiOptions): Promise<Types.Applications.ApplicationEmoji>;
    /**
     * Edit a global application command.
     * @param commandID The ID of the command.
     * @param options The options for editing the command.
     */
    editGlobalCommand<T extends Types.Applications.EditApplicationCommandOptions = Types.Applications.EditApplicationCommandOptions>(commandID: string, options: T): Promise<Types.Applications.ApplicationCommandOptionConversion<T>>;
    /**
     * Edit a guild application command.
     * @param guildID The ID of the guild.
     * @param commandID The ID of the command.
     * @param options The options for editing the command.
     */
    editGuildCommand<T extends Types.Applications.EditGuildApplicationCommandOptions = Types.Applications.EditGuildApplicationCommandOptions>(guildID: string, commandID: string, options: T): Promise<Types.Applications.ApplicationCommandOptionConversion<T>>;
    /**
     * Edit a guild application command's permissions. This requires a bearer token with the `applications.commands.permissions.update` scope.
     * @param guildID The ID of the guild.
     * @param commandID The ID of the command.
     * @param options The options for editing the permissions.
     */
    editGuildCommandPermissions(guildID: string, commandID: string, options: Types.Applications.EditApplicationCommandPermissionsOptions): Promise<Types.Applications.RESTGuildApplicationCommandPermissions>;
    /**
     * Get an activity instance.
     * @param instanceID The ID of the instance.
     */
    getActivityInstance(instanceID: string): Promise<Types.Applications.ActivityInstance>;
    /**
     * Get an emoji for this application.
     * @param emojiID The ID of the emoji to get.
     */
    getEmoji(emojiID: string): Promise<Types.Applications.ApplicationEmoji>;
    /**
     * Get the emojis for this application.
     */
    getEmojis(): Promise<Types.Applications.ApplicationEmojis>;
    /**
     * Get an entitlement for this application.
     * @param entitlementID The ID of the entitlement.
     * @caching This method **may** cache its result. If an entitlement's application id is the client's application id.
     * @caches {@link ClientApplication#entitlements | ClientApplication#entitlements}
     */
    getEntitlement(entitlementID: string): Promise<Entitlement | TestEntitlement>;
    /**
     * Get the entitlements for this application.
     * @param options The options for getting the entitlements.
     * @caching This method **may** cache its result. If an entitlement's application id is the client's application id.
     * @caches {@link ClientApplication#entitlements | ClientApplication#entitlements}
     */
    getEntitlements(options?: Types.Applications.SearchEntitlementsOptions): Promise<Array<Entitlement | TestEntitlement>>;
    /**
     * Get a global application command.
     * @param commandID The ID of the command.
     * @param options The options for getting the command.
     */
    getGlobalCommand<T extends Types.Applications.AnyApplicationCommand = Types.Applications.AnyApplicationCommand>(commandID: string, options?: Types.Applications.GetApplicationCommandOptions): Promise<T>;
    /**
     * Get this application's global commands.
     * @param options The options for getting the command.
     */
    getGlobalCommands(options?: Types.Applications.GetApplicationCommandOptions): Promise<Array<Types.Applications.AnyApplicationCommand>>;
    /**
     * Get a global application command.
     * @param guildID The ID of the guild.
     * @param commandID The ID of the command.
     * @param options The options for getting the command.
     */
    getGuildCommand<T extends Types.Applications.AnyApplicationCommand = Types.Applications.AnyApplicationCommand>(guildID: string, commandID: string, options?: Types.Applications.GetApplicationCommandOptions): Promise<T>;
    /**
     * Get this application's commands in a specific guild.
     * @param guildID The ID of the guild.
     * @param options The options for getting the command.
     */
    getGuildCommands(guildID: string, options?: Types.Applications.GetApplicationCommandOptions): Promise<Array<Types.Applications.AnyApplicationCommand>>;
    /**
     * Get a command's permissions in a guild.
     * @param guildID The ID of the guild.
     * @param commandID The ID of the command.
     */
    getGuildPermission(guildID: string, commandID: string): Promise<Types.Applications.RESTGuildApplicationCommandPermissions>;
    /**
     * Get the permissions for all commands in a guild.
     * @param guildID The ID of the guild.
     */
    getGuildPermissions(guildID: string): Promise<Array<Types.Applications.RESTGuildApplicationCommandPermissions>>;
    /**
     * Get this application's role connection metadata records.
     */
    getRoleConnectionsMetadata(): Promise<Array<Types.OAuth.RoleConnectionMetadata>>;
    /**
     * Get the SKUs for this application.
     */
    getSKUs(): Promise<Array<SKU>>;
    /**
     * Get the authenticated user's role connection object for this application. This requires the `role_connections.write` scope.
     */
    getUserRoleConnection(): Promise<Types.OAuth.RoleConnection>;
    toJSON(): Types.JSON.JSONClientApplication;
    /**
     * Update this application's role connections metadata.
     * @param metadata The metadata records.
     */
    updateRoleConnectionsMetadata(metadata: Array<Types.OAuth.RoleConnectionMetadata>): Promise<Array<Types.OAuth.RoleConnectionMetadata>>;
    /**
     * Update the authenticated user's role connection object for an application. This requires the `role_connections.write` scope.
     * @param data The metadata to update.
     */
    updateUserRoleConnection(data: Types.OAuth.UpdateUserApplicationRoleConnectionOptions): Promise<Types.OAuth.RoleConnection>;
    /**
     * Upload an ephemeral attachment for this application.
     * The application must have Activities enabled (the `EMBEDDED` application flag). Applications without Activities enabled currently return an "Unknown Application" error.
     * This endpoint requires a user OAuth2 bearer token; client credentials grant tokens are not valid and currently produce a 500 error.
     * @param options The options for uploading the attachment.
     * @caching This method **does not** cache its result.
     */
    uploadAttachment(options: Types.Applications.UploadApplicationAttachmentOptions): Promise<Attachment>;
}
