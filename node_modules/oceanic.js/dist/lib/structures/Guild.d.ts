/// <reference types="node" />
/// <reference types="node" />
/** @module Guild */
import Role from "./Role";
import Base from "./Base";
import Member from "./Member";
import GuildScheduledEvent from "./GuildScheduledEvent";
import GuildJoinRequest from "./GuildJoinRequest";
import type User from "./User";
import type VoiceChannel from "./VoiceChannel";
import type ClientApplication from "./ClientApplication";
import type TextChannel from "./TextChannel";
import type CategoryChannel from "./CategoryChannel";
import Integration from "./Integration";
import AutoModerationRule from "./AutoModerationRule";
import Permission from "./Permission";
import VoiceState from "./VoiceState";
import StageInstance from "./StageInstance";
import type GuildTemplate from "./GuildTemplate";
import type GuildPreview from "./GuildPreview";
import { type InviteWithMetadata } from "./Invite";
import type Webhook from "./Webhook";
import AuditLogEntry from "./AuditLogEntry";
import type Entitlement from "./Entitlement";
import type TestEntitlement from "./TestEntitlement";
import Soundboard from "./Soundboard";
import type * as Types from "../types/namespaced";
import { type DefaultMessageNotificationLevels, type ExplicitContentFilterLevels, type GuildFeature, type GuildNSFWLevels, type ImageFormat, type MFALevels, type PremiumTiers, type VerificationLevels, type ChannelTypeMap } from "../Constants";
import type Client from "../Client";
import TypedCollection from "../util/TypedCollection";
import type Shard from "../gateway/Shard";
import SimpleCollection from "../util/SimpleCollection";
import type { DiscordGatewayAdapterCreator, VoiceConnection } from "@discordjs/voice";
/** Represents a Discord server. */
export default class Guild extends Base {
    private _clientMember?;
    private _rest;
    private _shard?;
    /** This guild's afk voice channel. */
    afkChannel?: VoiceChannel | null;
    /** The ID of this guild's afk voice channel. */
    afkChannelID: string | null;
    /** The seconds after which voice users will be moved to the afk channel. */
    afkTimeout: number;
    /** The application that created this guild, if applicable. */
    application?: ClientApplication | null;
    /** The ID of the application that created this guild, if applicable. */
    applicationID: string | null;
    /** The approximate number of members in this guild (if retrieved with counts). */
    approximateMemberCount?: number;
    /** The approximate number of non-offline members in this guild (if retrieved with counts). */
    approximatePresenceCount?: number;
    /** The cached audit log entries. This requires both the {@link Constants~Intents.GUILD_MODERATION | GUILD_MODERATION} intent, as well as the {@link Constants~Permissions | VIEW_AUDIT_LOG } permission. */
    auditLogEntries: TypedCollection<Types.AuditLog.RawAuditLogEntry, AuditLogEntry>;
    /** The auto moderation rules in this guild. */
    autoModerationRules: TypedCollection<Types.AutoModeration.RawAutoModerationRule, AutoModerationRule>;
    /** The hash of this guild's banner. */
    banner: string | null;
    /** The channels in this guild. */
    channels: TypedCollection<Types.Channels.RawGuildChannel, Types.Channels.AnyGuildChannelWithoutThreads>;
    /** The default [message notifications level](https://discord.com/developers/docs/resources/guild#guild-object-default-message-notification-level) of this guild. */
    defaultMessageNotifications: DefaultMessageNotificationLevels;
    /** The description of this guild. */
    description: string | null;
    /** The discovery splash of this guild. Only present if the guild has the `DISCOVERABLE` feature. */
    discoverySplash: string | null;
    /** The custom emojis of this guild. */
    emojis: SimpleCollection<string, Types.Guilds.RawGuildEmoji, Types.Guilds.GuildEmoji>;
    /** The [explicit content filter](https://discord.com/developers/docs/resources/guild#guild-object-explicit-content-filter-level) of this guild. */
    explicitContentFilter: ExplicitContentFilterLevels;
    /** The [features](https://discord.com/developers/docs/resources/guild#guild-object-guild-features) this guild has. */
    features: Array<GuildFeature>;
    /** The icon hash of this guild. */
    icon: string | null;
    incidentActions: Types.Guilds.IncidentActions | null;
    /** The integrations in this guild. */
    integrations: TypedCollection<Types.Guilds.RawIntegration, Integration, [guildID?: string]>;
    /** The guild's inventory settings. */
    inventorySettings: Types.Guilds.InventorySettings | null;
    /** The cached invites in this guild. This will only be populated by invites created while the client is active. */
    invites: SimpleCollection<string, Types.Invites.RawInvite, InviteWithMetadata<Types.Channels.AnyGuildInviteChannel>, "code">;
    /** The cached join requests in this guild. This will be empty unless join requests have been fetched. */
    joinRequests: TypedCollection<Types.Guilds.RawGuildJoinRequest, GuildJoinRequest>;
    /** The date at which this guild was joined. */
    joinedAt: Date | null;
    /** If this guild is considered large. */
    large: boolean;
    latestOnboardingQuestionID: string | null;
    /** The maximum amount of members this guild can have. */
    maxMembers?: number;
    /** The maximum amount of people that can be present at a time in this guild. Only present for very large guilds. */
    maxPresences?: number;
    /** The maximum amount of users that can be present in a stage video channel. */
    maxStageVideoChannelUsers?: number;
    /** The maximum amount of users that can be present in a video channel. */
    maxVideoChannelUsers?: number;
    /** The number of members in this guild. */
    memberCount: number;
    /** The cached members in this guild. */
    members: TypedCollection<Types.Guilds.RawMember | Types.Guilds.RESTMember, Member, [guildID: string]>;
    /** The required [mfa level](https://discord.com/developers/docs/resources/guild#guild-object-mfa-level) for moderators of this guild. */
    mfaLevel: MFALevels;
    /** The name of this guild. */
    name: string;
    /** The [nsfw level](https://discord.com/developers/docs/resources/guild#guild-object-guild-nsfw-level) of this guild. */
    nsfwLevel: GuildNSFWLevels;
    /** The owner of this guild. */
    owner?: User | null;
    /** The ID of the owner of this guild. */
    ownerID: string | null;
    /** The [preferred locale](https://discord.com/developers/docs/reference#locales) of this guild. */
    preferredLocale: string;
    /** If this guild has the boost progress bar enabled. */
    premiumProgressBarEnabled: boolean;
    /** The number of nitro boosts this guild has. */
    premiumSubscriptionCount?: number;
    /** The [boost level](https://discord.com/developers/docs/resources/guild#guild-object-premium-tier) of this guild. */
    premiumTier: PremiumTiers;
    /** The guild's server tag, only present for guilds received over the gateway. */
    profile: Types.Guilds.GuildProfile | null;
    /** The channel where notices from Discord are received. Only present in guilds with the `COMMUNITY` feature. */
    publicUpdatesChannel?: Types.Channels.AnyTextableGuildChannel | null;
    /** The id of the channel where notices from Discord are received. Only present in guilds with the `COMMUNITY` feature. */
    publicUpdatesChannelID: string | null;
    /** @deprecated The region of this guild. */
    region?: string | null;
    /** The roles in this guild. */
    roles: TypedCollection<Types.Guilds.RawRole, Role, [guildID: string]>;
    /** The channel where rules/guidelines are displayed. Only present in guilds with the `COMMUNITY` feature. */
    rulesChannel?: TextChannel | null;
    /** The id of the channel where rules/guidelines are displayed. Only present in guilds with the `COMMUNITY` feature. */
    rulesChannelID: string | null;
    /** The channel where safety related notices are posted. */
    safetyAlertsChannel?: TextChannel | null;
    /** The ID if the channel where safety related notices are posted. */
    safetyAlertsChannelID: string | null;
    /** The scheduled events in this guild. */
    scheduledEvents: TypedCollection<Types.ScheduledEvents.RawScheduledEvent, GuildScheduledEvent>;
    /** The soundboard sounds in this guild. */
    soundboardSounds: TypedCollection<Types.Channels.RawSoundboard, Soundboard>;
    /** The invite splash hash of this guild. */
    splash: string | null;
    /** The stage instances in this guild. */
    stageInstances: TypedCollection<Types.Guilds.RawStageInstance, StageInstance>;
    /** The custom stickers of this guild. */
    stickers: SimpleCollection<string, Types.Guilds.RawSticker, Types.Guilds.Sticker>;
    /** The channel where welcome messages and boosts notices are posted. */
    systemChannel?: TextChannel | null;
    /** The [flags](https://discord.com/developers/docs/resources/guild#guild-object-system-channel-flags) for the system channel. */
    systemChannelFlags: number;
    /** The ID of the channel where welcome messages and boosts notices are posted. */
    systemChannelID: string | null;
    /** The threads in this guild. */
    threads: TypedCollection<Types.Channels.RawThreadChannel, Types.Channels.AnyThreadChannel>;
    /** If this guild is unavailable. */
    unavailable: boolean;
    /** The vanity url of this guild. Only present in guilds with the `VANITY_URL` feature. */
    vanityURLCode: string | null;
    /** The [verification level](https://discord.com/developers/docs/resources/guild#guild-object-verification-level) of this guild. */
    verificationLevel: VerificationLevels;
    /** The voice states of members in voice channels. */
    voiceStates: TypedCollection<Types.Voice.RawVoiceState, VoiceState>;
    /** The welcome screen configuration. Only present in guilds with the `WELCOME_SCREEN_ENABLED` feature. */
    welcomeScreen?: Types.Guilds.WelcomeScreen;
    /** The channel the widget will generate an invite to, or `null` if set to no invite. */
    widgetChannel?: Exclude<Types.Channels.AnyGuildChannel, CategoryChannel> | null;
    /** The id of the channel the widget will generate an invite to, or `null` if set to no invite. */
    widgetChannelID: string | null;
    /** If the widget is enabled. */
    widgetEnabled?: boolean;
    constructor(data: Types.Guilds.RawGuild, client: Client, rest?: boolean);
    private toggleFeature;
    private updateMemberLimit;
    protected update(data: Partial<Types.Guilds.RawGuild>): void;
    /** The client's member for this guild. This will throw an error if the member is not cached. */
    get clientMember(): Member;
    /** The shard this guild is on. Gateway only. */
    get shard(): Shard;
    /** The voice adapter creator for this guild that can be used with [@discordjs/voice](https://discord.js.org/#/docs/voice/main/general/welcome) to play audio in voice and stage channels. */
    get voiceAdapterCreator(): DiscordGatewayAdapterCreator;
    /**
     * Accept or deny a join request for this guild.
     * @param requestID The ID of the join request.
     * @param options The options for actioning the join request.
     * @caching This method **does** cache its result.
     * @caches {@link Guild#joinRequests | Guild#joinRequests}
     */
    actionJoinRequest(requestID: string, options: Types.Guilds.ActionGuildJoinRequestOptions): Promise<Types.Guilds.GuildJoinRequest>;
    /**
     * Add a member to this guild. Requires an access token with the `guilds.join` scope.
     *
     * Returns the newly added member upon success, or void if the member is already in the guild.
     * @param userID The ID of the user to add.
     * @param options The options for adding the member.
     */
    addMember(userID: string, options: Types.Guilds.AddMemberOptions): Promise<void | Member>;
    /**
     * Add a role to a member.
     * @param memberID The ID of the member.
     * @param roleID The ID of the role to add.
     * @param reason The reason for adding the role.
     */
    addMemberRole(memberID: string, roleID: string, reason?: string): Promise<void>;
    /**
     * The url of this guild's banner.
     * @param format The format the url should be.
     * @param size The dimensions of the image.
     */
    bannerURL(format?: ImageFormat, size?: number): string | null;
    /**
     * Begin a prune.
     * @param options The options for the prune.
     */
    beginPrune(options?: Types.Guilds.BeginPruneOptions): Promise<number | null>;
    /**
     * Ban up to 200 members from this guild. This requires both the `BAN_MEMBERS` and `MANAGE_GUILD` permissions.
     * If no members were banned, a {@link Constants~JSONErrorCodes.FAILED_TO_BAN_USERS | FAILED_TO_BAN_USERS } will be returned.
     * The bot user is ignored.
     * @param options The options for banning.
     */
    bulkBan(options: Types.Guilds.BulkBanOptions): Promise<Types.Guilds.BulkBanResponse>;
    /**
     * Create an auto moderation rule for this guild.
     * @param options The options for the rule.
     */
    createAutoModerationRule(options: Types.AutoModeration.CreateAutoModerationRuleOptions): Promise<AutoModerationRule>;
    /**
     * Create a ban for a user.
     * @param userID The ID of the user.
     * @param options The options for creating the ban.
     */
    createBan(userID: string, options?: Types.Guilds.CreateBanOptions): Promise<void>;
    /**
     * Create a channel in this guild.
     * @param options The options for creating the channel.
     */
    createChannel<T extends Types.Channels.GuildChannelsWithoutThreads>(type: T, options: Omit<Types.Guilds.CreateChannelOptions, "type">): Promise<ChannelTypeMap[T]>;
    /**
     * Create an emoji in this guild.
     * @param options The options for creating the emoji.
     */
    createEmoji(options: Types.Guilds.CreateGuildEmojiOptions): Promise<Types.Guilds.GuildEmoji>;
    /**
     * Create a role.
     * @param options The options for creating the role.
     */
    createRole(options?: Types.Guilds.CreateRoleOptions): Promise<Role>;
    /**
     * Create a scheduled event in this guild.
     * @param options The options for creating the scheduled event.
     */
    createScheduledEvent(options: Types.ScheduledEvents.CreateScheduledEventOptions): Promise<GuildScheduledEvent>;
    /**
     * Create an exception to the recurrence rule for a scheduled event.
     * @param eventID The ID of the scheduled event.
     * @param options The options for creating the scheduled event exception.
     * @caching This method **may** cache its result. The result will not be cached if the scheduled event is not cached.
     * @caches {@link GuildScheduledEvent#exceptions | GuildScheduledEvent#exceptions}
     */
    createScheduledEventException(eventID: string, options: Types.ScheduledEvents.CreateScheduledEventExceptionOptions): Promise<Types.ScheduledEvents.ScheduledEventException>;
    /**
     * Create a soundboard sound.
     * @param options The options for creating the soundboard sound.
     */
    createSoundboardSound(options: Types.Guilds.CreateSoundboardSoundOptions): Promise<Soundboard>;
    /**
     * Create a sticker.
     * @param options The options for creating the sticker.
     */
    createSticker(options: Types.Guilds.CreateStickerOptions): Promise<Types.Guilds.Sticker>;
    /**
     * Create a guild template.
     * @param options The options for creating the template.
     */
    createTemplate(options: Types.GuildTemplate.CreateTemplateOptions): Promise<GuildTemplate>;
    /**
     * Create a test entitlement for this guild.
     * @param skuID The ID of the SKU to create an entitlement for.
     * @param applicationID The ID of the application to create the entitlement for. If present, defaults to the logged in client's application id.
     */
    createTestEntitlement(skuID: string, applicationID?: string): Promise<TestEntitlement>;
    /**
     * Delete an auto moderation rule in this guild.
     * @param ruleID The ID of the rule to delete.
     * @param reason The reason for deleting the rule.
     */
    deleteAutoModerationRule(ruleID: string, reason?: string): Promise<void>;
    /**
     * Delete an emoji in this guild.
     * @param emojiID The ID of the emoji.
     * @param reason The reason for deleting the emoji.
     */
    deleteEmoji(emojiID: string, reason?: string): Promise<void>;
    /**
     * Delete an integration.
     * @param integrationID The ID of the integration.
     * @param reason The reason for deleting the integration.
     */
    deleteIntegration(integrationID: string, reason?: string): Promise<void>;
    /**
     * Delete a role.
     * @param roleID The ID of the role to delete.
     * @param reason The reason for deleting the role.
     */
    deleteRole(roleID: string, reason?: string): Promise<void>;
    /**
     * Delete a scheduled event.
     * @param eventID The ID of the scheduled event.
     * @param reason The reason for deleting the scheduled event. Discord's docs do not explicitly state a reason can be provided, so it may not be used.
     */
    deleteScheduledEvent(eventID: string, reason?: string): Promise<void>;
    /**
     * Delete an exception to the recurrence rule for a scheduled event.
     * @param eventID The ID of the scheduled event.
     * @param exceptionID The ID of the scheduled event exception.
     * @param reason The reason for deleting the scheduled event exception.
     * @caching This method **may** remove the result from cache. The result will not be removed if the scheduled event is not cached.
     * @caches {@link GuildScheduledEvent#exceptions | GuildScheduledEvent#exceptions}
     */
    deleteScheduledEventException(eventID: string, exceptionID: string, reason?: string): Promise<void>;
    /**
     * Delete a soundboard sound.
     * @param soundID The ID of the soundboard sound.
     * @param reason The reason for deleting the soundboard sound.
     */
    deleteSoundboardSound(soundID: string, reason?: string): Promise<void>;
    /**
     * Delete a sticker.
     * @param stickerID The ID of the sticker to delete.
     * @param reason The reason for deleting the sticker.
     */
    deleteSticker(stickerID: string, reason?: string): Promise<void>;
    /**
     * Delete a template.
     * @param code The code of the template.
     */
    deleteTemplate(code: string): Promise<void>;
    /**
     * Disable the `COMMUNITY` feature for this guild. Requires the **Administrator** permission.
     * @param reason The reason for disable the feature.
     */
    disableCommunity(reason?: string): Promise<Guild>;
    /**
     * Disable the `DISCOVERABLE` feature for this guild. Requires the **Administrator** permission.
     * @param reason The reason for disabling the feature.
     */
    disableDiscovery(reason?: string): Promise<Guild>;
    /**
     * Disable the `INVITES_DISABLED` feature for this guild. Requires the **Manage Guild** permission.
     * @param reason The reason for disabling the feature.
     */
    disableInvites(reason?: string): Promise<Guild>;
    /**
     * Disable the `RAID_ALERTS_ENABLED` feature for this guild. Requires the **Manage Guild** permission.
     * @param reason The reason for disabling the feature.
     */
    disableRaidAlerts(reason?: string): Promise<Guild>;
    /**
     * The url of this guild's discovery splash.
     * @param format The format the url should be.
     * @param size The dimensions of the image.
     */
    discoverySplashURL(format?: ImageFormat, size?: number): string | null;
    /**
     * Edit this guild.
     * @param options The options for editing the guild.
     */
    edit(options: Types.Guilds.EditGuildOptions): Promise<Guild>;
    /**
     * Edit an existing auto moderation rule in this guild.
     * @param ruleID The ID of the rule to edit.
     * @param options The options for editing the rule.
     */
    editAutoModerationRule(ruleID: string, options: Types.AutoModeration.EditAutoModerationRuleOptions): Promise<AutoModerationRule>;
    /**
     * Edit the positions of channels in this guild.
     * @param options The channels to move. Unedited channels do not need to be specified.
     */
    editChannelPositions(options: Array<Types.Guilds.ModifyChannelPositionsEntry>): Promise<void>;
    /**
     * Modify the current member in this guild.
     * @param options The options for editing the member.
     */
    editCurrentMember(options: Types.Guilds.EditCurrentMemberOptions): Promise<Member>;
    /**
     * Edit the current member's voice state in this guild. `channelID` is required, and the current member must already be in that channel. See [Discord's docs](https://discord.com/developers/docs/resources/guild#modify-current-user-voice-state-caveats) for more information.
     * @param options The options for editing the voice state.
     */
    editCurrentUserVoiceState(options: Types.Guilds.EditCurrentUserVoiceStateOptions): Promise<void>;
    /**
     * Edit an existing emoji in this guild.
     * @param options The options for editing the emoji.
     */
    editEmoji(emojiID: string, options: Types.Guilds.EditGuildEmojiOptions): Promise<Types.Guilds.GuildEmoji>;
    /**
     * Edit the incident actions for this guild.
     * @param options The options for editing the incident actions.
     */
    editIncidentActions(options: Types.Guilds.EditIncidentActionsOptions): Promise<Types.Guilds.IncidentActions>;
    /**
     * Edit a member of this guild. Use \<Guild\>.editCurrentMember if you wish to update the nick of this client using the CHANGE_NICKNAME permission.
     * @param memberID The ID of the member.
     * @param options The options for editing the member.
     */
    editMember(memberID: string, options: Types.Guilds.EditMemberOptions): Promise<Member>;
    /**
     * Edit this guild's onboarding configuration.
     * @param options The options for editing the onboarding configuration.
     */
    editOnboarding(options: Types.Guilds.EditOnboardingOptions): Promise<Types.Guilds.Onboarding>;
    /**
     * Edit an existing role.
     * @param options The options for editing the role.
     */
    editRole(roleID: string, options: Types.Guilds.EditRoleOptions): Promise<Role>;
    /**
     * Edit the position of roles in this guild.
     * @param options The roles to move.
     */
    editRolePositions(options: Array<Types.Guilds.EditRolePositionsEntry>, reason?: string): Promise<Array<Role>>;
    /**
     * Edit an existing scheduled event in this guild.
     * @param scheduledEventID The ID of the scheduled event.
     * @param options The options for editing the scheduled event.
     */
    editScheduledEvent(scheduledEventID: string, options: Types.ScheduledEvents.EditScheduledEventOptions): Promise<GuildScheduledEvent>;
    /**
     * Edit an exception to the recurrence rule for a scheduled event.
     * @param eventID The ID of the scheduled event.
     * @param exceptionID The ID of the scheduled event exception.
     * @param options The options for editing the scheduled event exception.
     * @caching This method **may** cache its result. The result will not be cached if the scheduled event is not cached.
     * @caches {@link GuildScheduledEvent#exceptions | GuildScheduledEvent#exceptions}
     */
    editScheduledEventException(eventID: string, exceptionID: string, options: Types.ScheduledEvents.EditScheduledEventExceptionOptions): Promise<Types.ScheduledEvents.ScheduledEventException>;
    /**
     * Edit a soundboard sound.
     * @param soundID The ID of the soundboard sound.
     * @param options The options for editing the soundboard sound.
     */
    editSoundboardSound(soundID: string, options: Types.Guilds.EditSoundboardSoundOptions): Promise<Soundboard>;
    /**
     * Edit a sticker.
     * @param options The options for editing the sticker.
     */
    editSticker(stickerID: string, options: Types.Guilds.EditStickerOptions): Promise<Types.Guilds.Sticker>;
    /**
     * Edit a template.
     * @param code The code of the template.
     * @param options The options for editing the template.
     */
    editTemplate(code: string, options: Types.GuildTemplate.EditGuildTemplateOptions): Promise<GuildTemplate>;
    /**
     * Edit a guild member's voice state. `channelID` is required, and the user must already be in that channel. See [Discord's docs](https://discord.com/developers/docs/resources/guild#modify-user-voice-state) for more information.
     * @param memberID The ID of the member.
     * @param options The options for editing the voice state.
     */
    editUserVoiceState(memberID: string, options: Types.Guilds.EditUserVoiceStateOptions): Promise<void>;
    /**
     * Edit the welcome screen in this guild.
     * @param options The options for editing the welcome screen.
     */
    editWelcomeScreen(options: Types.Guilds.EditWelcomeScreenOptions): Promise<Types.Guilds.WelcomeScreen>;
    /**
     * Edit the widget of this guild.
     * @param options The options for editing the widget.
     */
    editWidget(options: Types.Guilds.WidgetSettings): Promise<Types.Guilds.Widget>;
    /**
     * Enable the `COMMUNITY` feature for this guild. Requires the **Administrator** permission.
     * @param reason The reason for enabling the feature.
     */
    enableCommunity(reason?: string): Promise<Guild>;
    /**
     * Enable the `DISCOVERABLE` feature for this guild. Requires the **Administrator** permission. The server must also be passing all discovery requirements.
     * @param reason The reason for enabling the feature.
     */
    enableDiscovery(reason?: string): Promise<Guild>;
    /**
     * Enable the `INVITES_DISABLED` feature for this guild. Requires the **Manage Guild** permission.
     * @param reason The reason for enabling the feature.
     */
    enableInvites(reason?: string): Promise<Guild>;
    /**
     * Enable the `RAID_ALERTS_ENABLED` feature for this guild. Requires the **Manage Guild** permission.
     * @param reason The reason for enabling the feature.
     */
    enableRaidAlerts(reason?: string): Promise<Guild>;
    /**
     * Request members from this guild.
     * @param options The options for fetching the members.
     * @deprecated Use {@link requestMembers}. This will be removed in `1.16.0`.
     */
    fetchMembers(options?: Types.Gateway.RequestGuildMembersOptions): Promise<Array<Member>>;
    /**
     * Get the active threads in this guild.
     */
    getActiveThreads(): Promise<Types.Guilds.GetActiveThreadsResponse>;
    /**
     * Get this guild's audit log.
     * @param options The options for the audit log.
     */
    getAuditLog(options?: Types.AuditLog.GetAuditLogOptions): Promise<Types.AuditLog.AuditLog>;
    /**
     * Get an auto moderation rule for this guild.
     * @param ruleID The ID of the rule to get.
     */
    getAutoModerationRule(ruleID: string): Promise<AutoModerationRule>;
    /**
     * Get the auto moderation rules for this guild.
     */
    getAutoModerationRules(): Promise<Array<AutoModerationRule>>;
    /**
     * Get a ban in this guild.
     * @param userID The ID of the user to get the ban of.
     */
    getBan(userID: string): Promise<Types.Guilds.Ban>;
    /**
     * Get the bans in this guild.
     * @param options The options for getting the bans.
     */
    getBans(options?: Types.Guilds.GetBansOptions): Promise<Array<Types.Guilds.Ban>>;
    /**
     * Get the channels in a guild. Does not include threads. Only use this if you need to. See the `channels` collection.
     */
    getChannels(): Promise<Array<Types.Channels.AnyGuildChannelWithoutThreads>>;
    /**
     * Get an emoji in this guild.
     * @param emojiID The ID of the emoji to get.
     */
    getEmoji(emojiID: string): Promise<Types.Guilds.GuildEmoji>;
    /**
     * Get the emojis in this guild.
     */
    getEmojis(): Promise<Array<Types.Guilds.GuildEmoji>>;
    /**
     * Get the entitlements for this guild.
     * @param options The options for getting the entitlements.
     * @param applicationID The ID of the application to create the entitlement for. If present, defaults to the logged in client's application id.
     */
    getEntitlements(options?: Omit<Types.Applications.SearchEntitlementsOptions, "guildID">, applicationID?: string): Promise<Array<Entitlement | TestEntitlement>>;
    /**
     * Get the integrations in this guild.
     */
    getIntegrations(): Promise<Array<Integration>>;
    /**
     * Get the invites of this guild.
     */
    getInvites(): Promise<Array<InviteWithMetadata<Types.Channels.AnyGuildInviteChannel>>>;
    /**
     * Get this guild's join requests.
     * @param options The options for getting join requests.
     * @caching This method **does** cache its result.
     * @caches {@link Guild#joinRequests | Guild#joinRequests}
     */
    getJoinRequests(options: Types.Guilds.GetGuildJoinRequestsOptions): Promise<Types.Guilds.GuildJoinRequests>;
    /**
     * Get a member of this guild.
     * @param memberID The ID of the member.
     */
    getMember(memberID: string): Promise<Member>;
    /**
     * Get this guild's members. This requires the `GUILD_MEMBERS` intent.
     * @param options The options for getting the members.
     */
    getMembers(options?: Types.Guilds.GetMembersOptions): Promise<Array<Member>>;
    /**
     * Get this guild's new member welcome info.
     */
    getNewMemberWelcome(): Promise<Types.Guilds.NewMemberWelcome | null>;
    /**
     * Get the onboarding information for this guild.
     */
    getOnboarding(): Promise<Types.Guilds.Onboarding>;
    /**
     * Get a preview of this guild.
     */
    getPreview(): Promise<GuildPreview>;
    /**
     * Get the prune count of this guild.
     * @param options The options for getting the prune count.
     */
    getPruneCount(options?: Types.Guilds.GetPruneCountOptions): Promise<number>;
    /**
     * Get a role in this guild. Only use this if you need to. See the `roles` collection.
     * @param roleID The ID of the role to get.
     */
    getRole(roleID: string): Promise<Role>;
    /**
     * Get the member count of the roles in this guild. The result is a key-value map of role id to member count.
     */
    getRoleMemberCounts(): Promise<Record<string, number>>;
    /**
     * Get the roles in this guild. Only use this if you need to. See the `roles` collection.
     */
    getRoles(): Promise<Array<Role>>;
    /**
     * Get a scheduled event.
     * @param eventID The ID of the scheduled event to get.
     * @param withUserCount If the number of users subscribed to the event should be included.
     */
    getScheduledEvent(eventID: string, withUserCount?: number): Promise<GuildScheduledEvent>;
    /**
     * Get users subscribed to an exception for a scheduled event.
     * @param eventID The ID of the scheduled event.
     * @param exceptionID The ID of the scheduled event exception.
     * @param options The options for getting the users.
     * @caching This method **does** cache part of its result. Members will not be cached if the guild is not cached.
     * @caches {@link Client#users | Client#users}<br>{@link Guild#members | Guild#members}
     */
    getScheduledEventExceptionUsers(eventID: string, exceptionID: string, options?: Types.ScheduledEvents.GetScheduledEventUsersOptions): Promise<Array<Types.ScheduledEvents.ScheduledEventUser>>;
    /**
     * Get user counts for a scheduled event and optionally specific exceptions.
     * @param eventID The ID of the scheduled event.
     * @param options The options for getting the user counts.
     * @caching This method **may** cache the event user count.
     * @caches {@link GuildScheduledEvent#userCount | GuildScheduledEvent#userCount}
     */
    getScheduledEventUserCounts(eventID: string, options?: Types.ScheduledEvents.GetScheduledEventUserCountsOptions): Promise<Types.ScheduledEvents.ScheduledEventUserCounts>;
    /**
     * Get the users subscribed to a scheduled event.
     * @param eventID The ID of the scheduled event to get the users of.
     * @param options The options for getting the users.
     * @caching This method **does** cache part of its result. Members will not be cached if the guild is not cached.
     * @caches {@link Client#users | Client#users}<br>{@link Guild#members | Guild#members}
     */
    getScheduledEventUsers(eventID: string, options?: Types.ScheduledEvents.GetScheduledEventUsersOptions): Promise<Array<Types.ScheduledEvents.ScheduledEventUser>>;
    /**
     * Get this guild's scheduled events
     * @param withUserCount If the number of users subscribed to the event should be included.
     */
    getScheduledEvents(withUserCount?: number): Promise<Array<GuildScheduledEvent>>;
    /**
     * Get a soundboard sound.
     * @param soundID The ID of the soundboard sound to get.
     */
    getSoundboardSound(soundID: string): Promise<Soundboard>;
    /**
     * Get this guild's soundboard sounds.
     */
    getSoundboardSounds(): Promise<Array<Soundboard>>;
    /**
     * Get a sticker. Response will include a user if the client has the `MANAGE_EMOJIS_AND_STICKERS` permissions.
     * @param stickerID The ID of the sticker to get.
     */
    getSticker(stickerID: string): Promise<Types.Guilds.Sticker>;
    /**
     * Get this guild's stickers. Stickers will include a user if the client has the `MANAGE_EMOJIS_AND_STICKERS` permissions.
     */
    getStickers(): Promise<Array<Types.Guilds.Sticker>>;
    /**
     * Get this guild's templates.
     */
    getTemplates(): Promise<Array<GuildTemplate>>;
    /**
     * Get the vanity url of this guild.
     */
    getVanityURL(): Promise<Types.Guilds.GetVanityURLResponse>;
    /**
     * Get the list of usable voice regions for this guild. This will return VIP servers when the guild is VIP-enabled.
     */
    getVoiceRegions(): Promise<Array<Types.Voice.VoiceRegion>>;
    /**
     * Get the voice state of a member.
     * @param memberID The ID of the member. Use `@me` for the bot user.
     */
    getVoiceState(memberID: string): Promise<VoiceState>;
    /**
     * Get the webhooks in this guild.
     */
    getWebhooks(): Promise<Array<Webhook>>;
    /**
     * Get the welcome screen for this guild.
     */
    getWelcomeScreen(): Promise<Types.Guilds.WelcomeScreen>;
    /**
     * Get the widget of this guild.
     */
    getWidget(): Promise<Types.Guilds.Widget>;
    /**
     * Get the widget image of this guild.
     * @param style The style of the image.
     */
    getWidgetImage(style?: Types.Guilds.WidgetImageStyle): Promise<Buffer>;
    /**
     * Get the raw JSON widget of this guild.
     */
    getWidgetJSON(): Promise<Types.Guilds.RawWidget>;
    /**
     * Get this guild's widget settings.
     */
    getWidgetSettings(): Promise<Types.Guilds.WidgetSettings>;
    /**
     * The url of this guild's icon.
     * @param format The format the url should be.
     * @param size The dimensions of the image.
     */
    iconURL(format?: ImageFormat, size?: number): string | null;
    /**
     * Join a voice or stage channel.
     * @param options The options to join the channel with.
     */
    joinChannel(options: Omit<Types.Voice.JoinVoiceChannelOptions, "guildID" | "voiceAdapterCreator">): VoiceConnection;
    /**
     * Leave this guild.
     */
    leave(): Promise<void>;
    /** Leave the connected voice or stage channel on this guild. */
    leaveChannel(): void;
    /**
     * Search this guild's members.
     * @param options The options to search with.
     * @param retryOnIndexNotAvailable If the search should be retried if Discord replies with an index unavailable response. This will retry at most one time, waiting for `retry_after` or 15-45 seconds.
     */
    memberSearch(options?: Types.Guilds.MemberSearchOptions, retryOnIndexNotAvailable?: boolean): Promise<Types.Guilds.MemberSearchResults>;
    /**
     * Get the permissions of a member. If providing an id, the member must be cached.
     * @param member The member to get the permissions of.
     */
    permissionsOf(member: string | Member): Permission;
    /**
     * Remove a ban.
     * @param userID The ID of the user to remove the ban from.
     * @param reason The reason for removing the ban.
     */
    removeBan(userID: string, reason?: string): Promise<void>;
    /**
     * Remove a member from this guild.
     * @param memberID The ID of the user to remove.
     * @param reason The reason for the removal.
     */
    removeMember(memberID: string, reason?: string): Promise<void>;
    /**
     * Remove a role from a member.
     * @param memberID The ID of the member.
     * @param roleID The ID of the role to remove.
     * @param reason The reason for removing the role.
     */
    removeMemberRole(memberID: string, roleID: string, reason?: string): Promise<void>;
    /**
     * Request extended channel info for this guild.
     * @param options The options.
     */
    requestChannelInfo(options: Types.Gateway.RequestChannelInfoOptions): Promise<Array<Types.Gateway.ChannelInfoWithChannel>>;
    /**
     * Request members from this guild.
     * @param options The options for fetching the members.
     */
    requestMembers(options?: Types.Gateway.RequestGuildMembersOptions): Promise<Array<Member>>;
    /**
     * Request soundboard sounds for this guild.
     * @param options The options.
     */
    requestSoundboardSounds(options?: Types.Gateway.RequestSoundboardSoundsOptions): Promise<Array<Soundboard>>;
    /**
     * Search the username & nicknames of members in this guild. See {@link Guild#memberSearch | memberSearch} for a more detailed search.
     * @param options The options for the search.
     */
    searchMembers(options: Types.Guilds.SearchMembersOptions): Promise<Array<Member>>;
    /**
     * Search messages in this guild.
     * @param options The options to search with.
     * @param retryOnIndexNotAvailable If the search should be retried if Discord replies with an index unavailable response. This will retry at most one time, waiting for `retry_after` or 15-45 seconds.
     */
    searchMessages<T extends Types.Channels.AnyTextableGuildChannel | Types.Shared.Uncached = Types.Channels.AnyTextableGuildChannel | Types.Shared.Uncached>(options?: Types.Guilds.SearchMessagesOptions, retryOnIndexNotAvailable?: boolean): Promise<Types.Guilds.MessageSearchResults<T>>;
    /**
     * The url of this guild's invite splash.
     * @param format The format the url should be.
     * @param size The dimensions of the image.
     */
    splashURL(format?: ImageFormat, size?: number): string | null;
    /**
     * Sync a guild template.
     * @param code The code of the template to sync.
     */
    syncTemplate(code: string): Promise<GuildTemplate>;
    toJSON(): Types.JSON.JSONGuild;
}
