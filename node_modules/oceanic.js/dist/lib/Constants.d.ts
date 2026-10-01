import type * as Types from "./types/namespaced";
/** @module Constants */
import type PrivateChannel from "./structures/PrivateChannel";
import type TextChannel from "./structures/TextChannel";
import type VoiceChannel from "./structures/VoiceChannel";
import type GroupChannel from "./structures/GroupChannel";
import type CategoryChannel from "./structures/CategoryChannel";
import type AnnouncementChannel from "./structures/AnnouncementChannel";
import type AnnouncementThreadChannel from "./structures/AnnouncementThreadChannel";
import type PublicThreadChannel from "./structures/PublicThreadChannel";
import type PrivateThreadChannel from "./structures/PrivateThreadChannel";
import type StageChannel from "./structures/StageChannel";
import type ForumChannel from "./structures/ForumChannel";
import type MediaChannel from "./structures/MediaChannel";
export declare const GATEWAY_VERSION = 10;
export declare const REST_VERSION = 10;
export declare const BASE_URL = "https://discord.com";
export declare const API_URL = "https://discord.com/api/v10";
export declare const VERSION: string;
export declare const USER_AGENT: string;
export declare const MEDIA_PROXY_SIZES: number[];
export declare const RESTMethods: readonly ["GET", "POST", "PUT", "PATCH", "DELETE"];
export type RESTMethod = typeof RESTMethods[number];
export declare const ImageFormats: readonly ["jpg", "jpeg", "png", "webp", "gif"];
export type ImageFormat = typeof ImageFormats[number];
export type FilterFileTypes = "image" | "video" | "audio" | `.${string}`;
export declare enum WebhookTypes {
    /** Incoming webhooks can post messages to channels with a generated token */
    INCOMING = 1,
    /** Channel Follower webhooks are internal webhooks used to post new messages into channels */
    CHANNEL_FOLLOWER = 2,
    /** Application webhooks are webhooks used with interactions */
    APPLICATION = 3
}
export declare enum PremiumTypes {
    /** No Nitro. Also returned when the OAuth request did not include the approved `identify.premium` scope. */
    NONE = 0,
    /** Nitro Classic */
    NITRO_CLASSIC = 1,
    /** Nitro */
    NITRO = 2,
    /** Nitro Basic */
    NITRO_BASIC = 3
}
export declare enum UserFlags {
    /** Discord Staff */
    STAFF = 1,
    /** Partnered Server Owner */
    PARTNER = 2,
    /** HypeSquad Events */
    HYPESQUAD = 4,
    /** Level 1 Discord Bug Hunter */
    BUG_HUNTER_LEVEL_1 = 8,
    /** SMS enabled as a multi-factor authentication backup */
    MFA_SMS = 16,
    /** User has dismissed the current premium (Nitro) promotion */
    PREMIUM_PROMO_DISMISSED = 32,
    HYPESQUAD_BRAVERY = 64,
    HYPESQUAD_BRILLIANCE = 128,
    HYPESQUAD_BALANCE = 256,
    EARLY_SUPPORTER = 512,
    PSEUDO_TEAM_USER = 1024,
    /** User is registered on Discord's HubSpot customer platform, used for official Discord programs (e.g. partner) */
    IS_HUBSPOT_CONTACT = 2048,
    /** @deprecated User is a system user (i.e. official Discord account) */
    SYSTEM = 4096,
    /** User has unread urgent system messages; an urgent message is one sent from Trust and Safety */
    HAS_UNREAD_URGENT_MESSAGES = 8192,
    /** Level 2 Discord Bug Hunter */
    BUG_HUNTER_LEVEL_2 = 16384,
    /** User is scheduled for deletion for being under the minimum required age */
    UNDERAGE_DELETED = 32768,
    /** Verified Bot */
    VERIFIED_BOT = 65536,
    /** Early Verified Bot Developer */
    VERIFIED_DEVELOPER = 131072,
    /** Moderator Programs Alumni */
    CERTIFIED_MODERATOR = 262144,
    /** Bot uses only HTTP interactions and is shown in the online member list */
    BOT_HTTP_INTERACTIONS = 524288,
    /** User is marked as a spammer and has their messages collapsed in the UI */
    SPAMMER = 1048576,
    /** @deprecated User has manually disabled premium (Nitro) features */
    DISABLE_PREMIUM = 2097152,
    /** @deprecated Active Developer */
    ACTIVE_DEVELOPER = 4194304,
    /** User is a provisional account used with the social layer integration */
    PROVISIONAL_ACCOUNT = 8388608,
    /** User has their global ratelimit raised to 1,200 requests per second */
    HIGH_GLOBAL_RATE_LIMIT = 8589934592,
    /** User's account is deleted */
    DELETED = 17179869184,
    /** User's account is disabled for suspicious activity and must reset their password to regain access */
    DISABLED_SUSPICIOUS_ACTIVITY = 34359738368,
    /** User deleted their own account */
    SELF_DELETED = 68719476736,
    /** @deprecated User has a premium (Nitro) custom discriminator */
    PREMIUM_DISCRIMINATOR = 137438953472,
    /** User has used the desktop client */
    USED_DESKTOP_CLIENT = 274877906944,
    /** User has used the web client */
    USED_WEB_CLIENT = 549755813888,
    /** User has used the mobile client */
    USED_MOBILE_CLIENT = 1099511627776,
    /** User's account is disabled */
    DISABLED = 2199023255552,
    VERIFIED_EMAIL = 8796093022208,
    /** User is quarantined and cannot create DMs or accept invites */
    QUARANTINED = 17592186044416,
    /** User is eligible for early access to unique usernames */
    PREMIUM_ELIGIBLE_FOR_UNIQUE_USERNAME = 140737488355328,
    /** User is a collaborator and is considered staff */
    COLLABORATOR = 1125899906842624,
    /** User is a restricted collaborator and is considered staff */
    RESTRICTED_COLLABORATOR = 2251799813685248
}
export declare enum ApplicationIntegrationTypes {
    /** Guild installation context */
    GUILD_INSTALL = 0,
    /** User installation context */
    USER_INSTALL = 1
}
export declare enum InteractionContextTypes {
    /** The interaction can be triggered within guilds */
    GUILD = 0,
    /** The interaction can be triggered within DM channel with the application */
    BOT_DM = 1,
    /** The interaction can be triggered in all DM and group DMs */
    PRIVATE_CHANNEL = 2
}
export declare enum ApplicationFlags {
    /** Embedded application is released to the public (see also release phases) */
    EMBEDDED_RELEASED = 2,
    /** Application can create managed emoji */
    MANAGED_EMOJI = 4,
    /** Embedded application can use in-app purchases */
    EMBEDDED_IAP = 8,
    /** Application can create group DMs without limit */
    GROUP_DM_CREATE = 16,
    /** Application can use the `rpc` scope without limitation */
    RPC_PRIVATE_BETA = 32,
    APPLICATION_AUTO_MODERATION_RULE_CREATE_BADGE = 64,
    /** Application has its game profile page disabled */
    GAME_PROFILE_DISABLED = 128,
    /** @deprecated Application can use activity assets */
    ALLOW_ASSETS = 256,
    /** Application's OAuth2 credentials are considered public and a client secret is not required */
    PUBLIC_OAUTH2_CLIENT = 256,
    /** @deprecated Application can enable spectating activities */
    ALLOW_ACTIVITY_ACTION_SPECTATE = 512,
    /** Embedded application's activity can be launched without a context */
    CONTEXTLESS_ACTIVITY = 512,
    /** @deprecated Application can enable activity join requests */
    ALLOW_ACTIVITY_ACTION_JOIN_REQUEST = 1024,
    /** Application has limited access to the social layer SDK */
    SOCIAL_LAYER_INTEGRATION_LIMITED = 1024,
    /** Application is trialing cloud gaming features */
    CLOUD_GAMING_DEMO = 2048,
    /** Intent required for bots in 100 or more guilds to receive Presence Update Gateway events */
    GATEWAY_PRESENCE = 4096,
    /** Intent required for bots in under 100 guilds to receive Presence Update Gateway events */
    GATEWAY_PRESENCE_LIMITED = 8192,
    /** Intent required for bots in 100 or more guilds to receive guild member-related events like Guild Member Add */
    GATEWAY_GUILD_MEMBERS = 16384,
    /** Intent required for bots in under 100 guilds to receive guild member-related events like Guild Member Add */
    GATEWAY_GUILD_MEMBERS_LIMITED = 32768,
    /** Indicates unusual growth of an application that prevents verification */
    VERIFICATION_PENDING_GUILD_LIMIT = 65536,
    /** Application can be embedded within the Discord client */
    EMBEDDED = 131072,
    /** Intent required for bots in 100 or more guilds to receive message content */
    GATEWAY_MESSAGE_CONTENT = 262144,
    /** Intent required for bots in under 100 guilds to receive message content */
    GATEWAY_MESSAGE_CONTENT_LIMITED = 524288,
    /** Embedded application is created by Discord */
    EMBEDDED_FIRST_PARTY = 1048576,
    APPLICATION_COMMAND_MIGRATED = 2097152,
    /** Application has registered global application commands */
    APPLICATION_COMMAND_BADGE = 8388608,
    /** Application has had at least one global application command used in the last 30 days */
    ACTIVE = 16777216,
    /** Application has not had any global application commands used in the last 30 days and has lost the `ACTIVE` flag */
    ACTIVE_GRACE_PERIOD = 33554432,
    /** Application can use IFrames within modals */
    IFRAME_MODAL = 67108864,
    /** Application can use the social layer SDK */
    SOCIAL_LAYER_INTEGRATION = 134217728,
    /** Application is promoted by Discord in the application directory */
    PROMOTED = 268435456,
    /** Application is a Discord partner */
    PARTNER = 536870912,
    /** Application is a parent of a child application */
    PARENT = 8589934592,
    /** Application cannot access relationship information */
    DISABLE_RELATIONSHIP_ACCESS = 17179869184
}
export declare const GuildFeatures: readonly ["ACTIVITIES_ALPHA", "ACTIVITIES_EMPLOYEE", "ACTIVITIES_INTERNAL_DEV", "ANIMATED_BANNER", "ANIMATED_ICON", "APPLICATION_COMMAND_PERMISSIONS_V2", "AUTO_MODERATION", "AUTOMOD_TRIGGER_USER_PROFILE", "BANNER", "BOT_DEVELOPER_EARLY_ACCESS", "BURST_REACTIONS", "CHANNEL_HIGHLIGHTS_DISABLED", "CHANNEL_HIGHLIGHTS", "CHANNEL_ICON_EMOJIS_GENERATED", "CLYDE_DISABLED", "CLYDE_ENABLED", "CLYDE_EXPERIMENT_ENABLED", "COMMERCE", "COMMUNITY_CANARY", "COMMUNITY_EXP_LARGE_GATED", "COMMUNITY_EXP_LARGE_UNGATED", "COMMUNITY_EXP_MEDIUM", "COMMUNITY", "CREATOR_ACCEPTED_NEW_TERMS", "CREATOR_MONETIZABLE_DISABLED", "CREATOR_MONETIZABLE_PENDING_NEW_OWNER_ONBOARDING", "CREATOR_MONETIZABLE_PROVISIONAL", "CREATOR_MONETIZABLE_RESTRICTED", "CREATOR_MONETIZABLE_WHITEGLOVE", "CREATOR_MONETIZABLE", "CREATOR_STORE_PAGE", "DEVELOPER_SUPPORT_SERVER", "DISCOVERABLE_DISABLED", "DISCOVERABLE", "ENABLED_DISCOVERABLE_BEFORE", "ENABLED_MODERATION_EXPERIENCE_FOR_NON_COMMUNITY", "ENHANCED_ROLE_COLORS", "EXPOSED_TO_ACTIVITIES_WTP_EXPERIMENT", "FEATURABLE", "GUESTS_ENABLED", "GUILD_HOME_DEPRECATION_OVERRIDE", "GUILD_HOME_OVERRIDE", "GUILD_HOME_TEST", "GUILD_ONBOARDING_EVER_ENABLED", "GUILD_ONBOARDING_HAS_PROMPTS", "GUILD_ONBOARDING", "GUILD_ROLE_SUBSCRIPTION_TIER_TEMPLATE", "GUILD_SERVER_GUIDE", "GUILD_WEB_PAGE_VANITY_URL", "HAD_EARLY_ACTIVITIES_ACCESS", "HAS_DIRECTORY_ENTRY", "HUB", "INCREASED_THREAD_LIMIT", "INTERNAL_EMPLOYEE_ONLY", "INVITE_SPLASH", "INVITES_DISABLED", "LINKED_TO_HUB", "MARKETPLACES_CONNECTION_ROLES", "MEMBER_PROFILES", "MEMBER_SAFETY_PAGE_ROLLOUT", "MEMBER_VERIFICATION_GATE_ENABLED", "MONETIZATION_ENABLED", "MORE_EMOJI", "MORE_EMOJIS", "MORE_SOUNDBOARD", "MORE_STICKERS", "NEW_THREAD_PERMISSIONS", "NEWS", "NON_COMMUNITY_RAID_ALERTS", "PARTNERED", "PREVIEW_ENABLED", "PREVIOUSLY_DISCOVERABLE", "PRIVATE_THREADS", "PRODUCTS_AVAILABLE_FOR_PURCHASE", "RAID_ALERTS_DISABLED", "RAID_ALERTS_ENABLED", "ROLE_ICONS", "ROLE_SUBSCRIPTIONS_AVAILABLE_FOR_PURCHASE", "ROLE_SUBSCRIPTIONS_ENABLED", "SEVEN_DAY_THREAD_ARCHIVE", "SHARD", "SOUNDBOARD", "SUMMARIES_DISABLED_BY_USER", "SUMMARIES_ENABLED_BY_USER", "SUMMARIES_ENABLED_GA", "SUMMARIES_ENABLED", "SUMMARIES_OPT_OUT_EXPERIENCE", "SUMMARIES_PAUSED", "TEXT_IN_STAGE_ENABLED", "TEXT_IN_VOICE_ENABLED", "THREADS_ENABLED_TESTING", "THREADS_ENABLED", "THREE_DAY_THREAD_ARCHIVE", "TICKETED_EVENTS_ENABLED", "VANITY_URL", "VERIFIED", "VIP_REGIONS", "VOICE_IN_THREADS", "WELCOME_SCREEN_ENABLED"];
export type GuildFeature = typeof GuildFeatures[number];
export type MutableGuildFeatures = "COMMUNITY" | "DISCOVERABLE" | "INVITES_DISABLED" | "RAID_ALERTS_ENABLED";
export declare enum DefaultMessageNotificationLevels {
    /** Receive notifications for all messages */
    ALL_MESSAGES = 0,
    /** Receive notifications only for messages that @mention you */
    ONLY_MENTIONS = 1,
    /** Don't receive notifications */
    NO_MESSAGES = 2,
    NULL = 3
}
export declare enum ExplicitContentFilterLevels {
    /** Media content will not be scanned */
    DISABLED = 0,
    /** Media content sent by members without roles will be scanned */
    MEMBERS_WITHOUT_ROLES = 1,
    /** Media content sent by all members will be scanned */
    ALL_MEMBERS = 2
}
export declare enum MFALevels {
    /** Guild has no MFA requirement for moderation actions */
    NONE = 0,
    /** Guild has a MFA requirement for moderation actions */
    ELEVATED = 1
}
export declare enum VerificationLevels {
    /** Unrestricted */
    NONE = 0,
    /** Must have a verified email on file */
    LOW = 1,
    /** Must be registered on Discord for longer than 5 minutes */
    MEDIUM = 2,
    /** Must be a member of the server for longer than 10 minutes */
    HIGH = 3,
    /** Must have a verified phone number on file */
    VERY_HIGH = 4
}
export declare enum GuildNSFWLevels {
    /** Guild is not yet rated by Discord */
    DEFAULT = 0,
    /** Guild has mature content only suitable for users over 18 */
    EXPLICIT = 1,
    /** Guild is safe for work */
    SAFE = 2,
    /** Guild has mildly mature content that may not be suitable for users under 18 */
    AGE_RESTRICTED = 3
}
export declare enum PremiumTiers {
    /** Guild has not unlocked any Server Boost perks */
    NONE = 0,
    /** Guild has unlocked Server Boost level 1 perks */
    TIER_1 = 1,
    /** Guild has unlocked Server Boost level 2 perks */
    TIER_2 = 2,
    /** Guild has unlocked Server Boost level 3 perks */
    TIER_3 = 3
}
export declare enum SystemChannelFlags {
    /** Suppress member join notifications */
    SUPPRESS_JOIN_NOTIFICATIONS = 1,
    /** Suppress premium subscription (boost) notifications */
    SUPPRESS_PREMIUM_SUBSCRIPTIONS = 2,
    /** Suppress guild setup tips */
    SUPPRESS_GUILD_REMINDER_NOTIFICATIONS = 4,
    /** Hide member join sticker reply buttons */
    SUPPRESS_JOIN_NOTIFICATION_REPLIES = 8,
    /** Suppress role subscription purchase and renewal notifications */
    SUPPRESS_ROLE_SUBSCRIPTION_PURCHASE_NOTIFICATIONS = 16,
    /** Hide role subscription sticker reply buttons */
    SUPPRESS_ROLE_SUBSCRIPTION_PURCHASE_NOTIFICATION_REPLIES = 32,
    /** Suppress dead chat channel prompts */
    SUPPRESS_CHANNEL_PROMPT_DEADCHAT = 128
}
export declare enum StickerTypes {
    /** An official sticker in a current or legacy purchasable pack */
    STANDARD = 1,
    /** A sticker uploaded to a guild for the guild's members */
    GUILD = 2
}
export declare enum StickerFormatTypes {
    /** A PNG image */
    PNG = 1,
    /** An animated PNG image, using the APNG format */
    APNG = 2,
    /** A lottie animation; requires the `VERIFIED` and/or `PARTNERED` guild feature */
    LOTTIE = 3,
    /** An animated GIF image */
    GIF = 4
}
export declare enum ChannelTypes {
    /** A text channel within a guild */
    GUILD_TEXT = 0,
    /** A private channel between two users */
    DM = 1,
    /** A voice channel within a guild */
    GUILD_VOICE = 2,
    /** A private channel between multiple users */
    GROUP_DM = 3,
    /** An organizational category that contains up to 50 channels */
    GUILD_CATEGORY = 4,
    /** Almost identical to `GUILD_TEXT`, a channel that users can follow and crosspost into their own guild */
    GUILD_ANNOUNCEMENT = 5,
    /** @deprecated A channel in which developers can showcase their SKUs */
    GUILD_STORE = 6,
    /** @deprecated A channel where users can match up for various games */
    GUILD_LFG = 7,
    /** @deprecated A private channel between multiple users for a group within an LFG channel */
    LFG_GROUP_DM = 8,
    /** @deprecated The first iteration of the threads feature, never widely used */
    THREAD_ALPHA = 9,
    /** A temporary sub-channel within a `GUILD_NEWS` channel */
    ANNOUNCEMENT_THREAD = 10,
    /** a temporary sub-channel within a `GUILD_TEXT`, `GUILD_FORUM`, or `GUILD_MEDIA` channel */
    PUBLIC_THREAD = 11,
    /** a temporary sub-channel within a `GUILD_TEXT` channel that is only viewable by those invited and those with the `MANAGE_THREADS` permission */
    PRIVATE_THREAD = 12,
    /** A voice channel for hosting events with an audience in a guild */
    GUILD_STAGE_VOICE = 13,
    /** The main channel in a hub containing the listed guilds */
    GUILD_DIRECTORY = 14,
    /** A channel that can only contain threads */
    GUILD_FORUM = 15,
    /** A channel that can only contain threads in a gallery view */
    GUILD_MEDIA = 16,
    /** A game lobby channel */
    LOBBY = 17,
    /** A private channel created by the social layer SDK */
    EPHEMERAL_DM = 18
}
export declare const AnyChannelTypes: ChannelTypes[];
export declare const NotImplementedChannelTypes: readonly [ChannelTypes.GUILD_STORE, ChannelTypes.GUILD_LFG, ChannelTypes.LFG_GROUP_DM, ChannelTypes.THREAD_ALPHA, ChannelTypes.GUILD_DIRECTORY, ChannelTypes.LOBBY, ChannelTypes.EPHEMERAL_DM];
export declare const ImplementedChannelTypes: (ChannelTypes.GUILD_TEXT | ChannelTypes.DM | ChannelTypes.GUILD_VOICE | ChannelTypes.GROUP_DM | ChannelTypes.GUILD_CATEGORY | ChannelTypes.GUILD_ANNOUNCEMENT | ChannelTypes.ANNOUNCEMENT_THREAD | ChannelTypes.PUBLIC_THREAD | ChannelTypes.PRIVATE_THREAD | ChannelTypes.GUILD_STAGE_VOICE | ChannelTypes.GUILD_FORUM | ChannelTypes.GUILD_MEDIA)[];
export declare const GuildChannelTypes: readonly [ChannelTypes.GUILD_TEXT, ChannelTypes.GUILD_VOICE, ChannelTypes.GUILD_CATEGORY, ChannelTypes.GUILD_ANNOUNCEMENT, ChannelTypes.ANNOUNCEMENT_THREAD, ChannelTypes.PUBLIC_THREAD, ChannelTypes.PRIVATE_THREAD, ChannelTypes.GUILD_STAGE_VOICE, ChannelTypes.GUILD_DIRECTORY, ChannelTypes.GUILD_FORUM, ChannelTypes.GUILD_MEDIA];
export declare const ThreadChannelTypes: readonly [ChannelTypes.ANNOUNCEMENT_THREAD, ChannelTypes.PUBLIC_THREAD, ChannelTypes.PRIVATE_THREAD];
export declare const GuildChannelsWithoutThreadsTypes: (ChannelTypes.GUILD_TEXT | ChannelTypes.GUILD_VOICE | ChannelTypes.GUILD_CATEGORY | ChannelTypes.GUILD_ANNOUNCEMENT | ChannelTypes.GUILD_STAGE_VOICE | ChannelTypes.GUILD_DIRECTORY | ChannelTypes.GUILD_FORUM | ChannelTypes.GUILD_MEDIA)[];
export declare const PrivateChannelTypes: readonly [ChannelTypes.DM, ChannelTypes.GROUP_DM];
export declare const EditableChannelTypes: (ChannelTypes.GUILD_TEXT | ChannelTypes.GUILD_VOICE | ChannelTypes.GROUP_DM | ChannelTypes.GUILD_CATEGORY | ChannelTypes.GUILD_ANNOUNCEMENT | ChannelTypes.ANNOUNCEMENT_THREAD | ChannelTypes.PUBLIC_THREAD | ChannelTypes.PRIVATE_THREAD | ChannelTypes.GUILD_STAGE_VOICE | ChannelTypes.GUILD_FORUM | ChannelTypes.GUILD_MEDIA)[];
export declare const TextableChannelTypes: (ChannelTypes.GUILD_TEXT | ChannelTypes.DM | ChannelTypes.GUILD_VOICE | ChannelTypes.GUILD_ANNOUNCEMENT | ChannelTypes.ANNOUNCEMENT_THREAD | ChannelTypes.PUBLIC_THREAD | ChannelTypes.PRIVATE_THREAD | ChannelTypes.GUILD_STAGE_VOICE)[];
export declare const TextableGuildChannelTypes: (ChannelTypes.GUILD_TEXT | ChannelTypes.GUILD_VOICE | ChannelTypes.GUILD_ANNOUNCEMENT | ChannelTypes.ANNOUNCEMENT_THREAD | ChannelTypes.PUBLIC_THREAD | ChannelTypes.PRIVATE_THREAD | ChannelTypes.GUILD_STAGE_VOICE)[];
export declare const TextableChannelsWithoutThreadsTypes: (ChannelTypes.GUILD_TEXT | ChannelTypes.DM | ChannelTypes.GUILD_VOICE | ChannelTypes.GUILD_ANNOUNCEMENT | ChannelTypes.GUILD_STAGE_VOICE)[];
export declare const TextableGuildChannelsWithoutThreadsTypes: (ChannelTypes.GUILD_TEXT | ChannelTypes.GUILD_VOICE | ChannelTypes.GUILD_ANNOUNCEMENT | ChannelTypes.GUILD_STAGE_VOICE)[];
export declare const VoiceChannelTypes: readonly [ChannelTypes.GUILD_VOICE, ChannelTypes.GUILD_STAGE_VOICE];
export declare const GuildInviteChannelTypes: readonly [ChannelTypes.GUILD_TEXT, ChannelTypes.GUILD_ANNOUNCEMENT, ChannelTypes.GUILD_VOICE, ChannelTypes.GUILD_STAGE_VOICE, ChannelTypes.GUILD_FORUM, ChannelTypes.GUILD_MEDIA];
export declare const DMInviteChannelTypes: readonly [ChannelTypes.GROUP_DM];
export declare const InviteChannelTypes: readonly [ChannelTypes.GUILD_TEXT, ChannelTypes.GUILD_ANNOUNCEMENT, ChannelTypes.GUILD_VOICE, ChannelTypes.GUILD_STAGE_VOICE, ChannelTypes.GUILD_FORUM, ChannelTypes.GUILD_MEDIA, ChannelTypes.GROUP_DM];
export declare const InteractionChannelTypes: readonly [...(ChannelTypes.GUILD_TEXT | ChannelTypes.DM | ChannelTypes.GUILD_VOICE | ChannelTypes.GUILD_ANNOUNCEMENT | ChannelTypes.ANNOUNCEMENT_THREAD | ChannelTypes.PUBLIC_THREAD | ChannelTypes.PRIVATE_THREAD | ChannelTypes.GUILD_STAGE_VOICE)[], ChannelTypes.GROUP_DM];
export declare const ThreadOnlyChannelTypes: readonly [ChannelTypes.GUILD_FORUM, ChannelTypes.GUILD_MEDIA];
export interface ChannelTypeMap {
    [ChannelTypes.GUILD_TEXT]: TextChannel;
    [ChannelTypes.DM]: PrivateChannel;
    [ChannelTypes.GUILD_VOICE]: VoiceChannel;
    [ChannelTypes.GROUP_DM]: GroupChannel;
    [ChannelTypes.GUILD_CATEGORY]: CategoryChannel;
    [ChannelTypes.GUILD_ANNOUNCEMENT]: AnnouncementChannel;
    [ChannelTypes.GUILD_STORE]: never;
    [ChannelTypes.GUILD_LFG]: never;
    [ChannelTypes.LFG_GROUP_DM]: never;
    [ChannelTypes.THREAD_ALPHA]: never;
    [ChannelTypes.ANNOUNCEMENT_THREAD]: AnnouncementThreadChannel;
    [ChannelTypes.PUBLIC_THREAD]: PublicThreadChannel;
    [ChannelTypes.PRIVATE_THREAD]: PrivateThreadChannel;
    [ChannelTypes.GUILD_STAGE_VOICE]: StageChannel;
    [ChannelTypes.GUILD_DIRECTORY]: never;
    [ChannelTypes.GUILD_FORUM]: ForumChannel;
    [ChannelTypes.GUILD_MEDIA]: MediaChannel;
    [ChannelTypes.LOBBY]: never;
    [ChannelTypes.EPHEMERAL_DM]: never;
}
export interface RawChannelTypeMap {
    [ChannelTypes.GUILD_TEXT]: Types.Channels.RawTextChannel;
    [ChannelTypes.DM]: Types.Channels.RawPrivateChannel;
    [ChannelTypes.GUILD_VOICE]: Types.Channels.RawVoiceChannel;
    [ChannelTypes.GROUP_DM]: Types.Channels.RawGroupChannel;
    [ChannelTypes.GUILD_CATEGORY]: Types.Channels.RawCategoryChannel;
    [ChannelTypes.GUILD_ANNOUNCEMENT]: Types.Channels.RawAnnouncementChannel;
    [ChannelTypes.GUILD_STORE]: never;
    [ChannelTypes.GUILD_LFG]: never;
    [ChannelTypes.LFG_GROUP_DM]: never;
    [ChannelTypes.THREAD_ALPHA]: never;
    [ChannelTypes.ANNOUNCEMENT_THREAD]: Types.Channels.RawAnnouncementThreadChannel;
    [ChannelTypes.PUBLIC_THREAD]: Types.Channels.RawPublicThreadChannel;
    [ChannelTypes.PRIVATE_THREAD]: Types.Channels.RawPrivateThreadChannel;
    [ChannelTypes.GUILD_STAGE_VOICE]: Types.Channels.RawStageChannel;
    [ChannelTypes.GUILD_DIRECTORY]: never;
    [ChannelTypes.GUILD_FORUM]: Types.Channels.RawForumChannel;
    [ChannelTypes.GUILD_MEDIA]: Types.Channels.RawMediaChannel;
    [ChannelTypes.LOBBY]: never;
    [ChannelTypes.EPHEMERAL_DM]: never;
}
export interface JSONChannelTypeMap {
    [ChannelTypes.GUILD_TEXT]: Types.JSON.JSONTextChannel;
    [ChannelTypes.DM]: Types.JSON.JSONPrivateChannel;
    [ChannelTypes.GUILD_VOICE]: Types.JSON.JSONVoiceChannel;
    [ChannelTypes.GROUP_DM]: Types.JSON.JSONGroupChannel;
    [ChannelTypes.GUILD_CATEGORY]: Types.JSON.JSONCategoryChannel;
    [ChannelTypes.GUILD_ANNOUNCEMENT]: Types.JSON.JSONAnnouncementChannel;
    [ChannelTypes.ANNOUNCEMENT_THREAD]: Types.JSON.JSONAnnouncementThreadChannel;
    [ChannelTypes.PUBLIC_THREAD]: Types.JSON.JSONPublicThreadChannel;
    [ChannelTypes.PRIVATE_THREAD]: Types.JSON.JSONPrivateThreadChannel;
    [ChannelTypes.GUILD_STAGE_VOICE]: Types.JSON.JSONStageChannel;
    [ChannelTypes.GUILD_DIRECTORY]: never;
    [ChannelTypes.GUILD_FORUM]: Types.JSON.JSONForumChannel;
    [ChannelTypes.GUILD_MEDIA]: Types.JSON.JSONMediaChannel;
}
export declare enum OverwriteTypes {
    ROLE = 0,
    MEMBER = 1
}
export declare enum VideoQualityModes {
    /** Discord chooses the quality for optimal performance */
    AUTO = 1,
    /** 720p quality */
    FULL = 2
}
export declare const ThreadAutoArchiveDurations: readonly [60, 1440, 4320, 10080];
export type ThreadAutoArchiveDuration = typeof ThreadAutoArchiveDurations[number];
export declare enum ConnectionVisibilityTypes {
    /** Connection is not visible. */
    NONE = 0,
    /** Connection is visible to everyone. */
    EVERYONE = 1
}
export declare const ConnectionServices: readonly ["battlenet", "bluesky", "crunchyroll", "domain", "ebay", "epicgames", "facebook", "github", "instagram", "leagueoflegends", "mastodon", "paypal", "playstation", "reddit", "riotgames", "skype", "spotify", "steam", "tiktok", "twitch", "twitter_legacy", "twitter", "xbox", "youtube"];
export type ConnectionService = typeof ConnectionServices[number];
export declare const IntegrationTypes: readonly ["twitch", "youtube", "discord", "guild_subscription"];
export type IntegrationType = typeof IntegrationTypes[number];
export declare enum IntegrationExpireBehaviors {
    /** Remove the integration role when a subscription lapses. */
    REMOVE_ROLE = 0,
    /** Kick the member when a subscription lapses. */
    KICK = 1
}
export declare namespace Permissions {
    const CREATE_INSTANT_INVITE = 1n;
    const KICK_MEMBERS = 2n;
    const BAN_MEMBERS = 4n;
    const ADMINISTRATOR = 8n;
    const MANAGE_CHANNELS = 16n;
    const MANAGE_GUILD = 32n;
    const ADD_REACTIONS = 64n;
    const VIEW_AUDIT_LOG = 128n;
    const PRIORITY_SPEAKER = 256n;
    const STREAM = 512n;
    const VIEW_CHANNEL = 1024n;
    const SEND_MESSAGES = 2048n;
    const SEND_TTS_MESSAGES = 4096n;
    const MANAGE_MESSAGES = 8192n;
    const EMBED_LINKS = 16384n;
    const ATTACH_FILES = 32768n;
    const READ_MESSAGE_HISTORY = 65536n;
    const MENTION_EVERYONE = 131072n;
    const USE_EXTERNAL_EMOJIS = 262144n;
    const VIEW_GUILD_INSIGHTS = 524288n;
    const CONNECT = 1048576n;
    const SPEAK = 2097152n;
    const MUTE_MEMBERS = 4194304n;
    const DEAFEN_MEMBERS = 8388608n;
    const MOVE_MEMBERS = 16777216n;
    const USE_VAD = 33554432n;
    const CHANGE_NICKNAME = 67108864n;
    const MANAGE_NICKNAMES = 134217728n;
    const MANAGE_ROLES = 268435456n;
    const MANAGE_WEBHOOKS = 536870912n;
    const MANAGE_GUILD_EXPRESSIONS = 1073741824n;
    const USE_APPLICATION_COMMANDS = 2147483648n;
    const REQUEST_TO_SPEAK = 4294967296n;
    const MANAGE_EVENTS = 8589934592n;
    const MANAGE_THREADS = 17179869184n;
    const CREATE_PUBLIC_THREADS = 34359738368n;
    const CREATE_PRIVATE_THREADS = 68719476736n;
    const USE_EXTERNAL_STICKERS = 137438953472n;
    const SEND_MESSAGES_IN_THREADS = 274877906944n;
    const USE_EMBEDDED_ACTIVITIES = 549755813888n;
    const MODERATE_MEMBERS = 1099511627776n;
    const VIEW_CREATOR_MONETIZATION_ANALYTICS = 2199023255552n;
    const USE_SOUNDBOARD = 4398046511104n;
    const CREATE_GUILD_EXPRESSIONS = 8796093022208n;
    const CREATE_EVENTS = 17592186044416n;
    const USE_EXTERNAL_SOUNDS = 35184372088832n;
    const SEND_VOICE_MESSAGES = 70368744177664n;
    /** @deprecated Allows members to interact with the Clyde AI integration. */
    const USE_CLYDE_AI = 140737488355328n;
    const SET_VOICE_CHANNEL_STATUS = 281474976710656n;
    const SEND_POLLS = 562949953421312n;
    const USE_EXTERNAL_APPS = 1125899906842624n;
    const PIN_MESSAGES = 2251799813685248n;
    const BYPASS_SLOWMODE = 4503599627370496n;
    /** Allows members to mark messages as official in verified guilds */
    const MANAGE_OFFICIAL_MESSAGES = 9007199254740992n;
}
export declare const PermissionValueToName: Types.Shared.ReverseMap<Types.Shared.StringMap<typeof Permissions>>;
export declare const AllPermissions: bigint;
export declare const TextPermissions: readonly [1n, 16n, 64n, 1024n, 2048n, 4096n, 8192n, 16384n, 32768n, 65536n, 131072n, 262144n, 268435456n, 536870912n, 2147483648n, 17179869184n, 34359738368n, 68719476736n, 137438953472n, 274877906944n, 70368744177664n, 140737488355328n, 562949953421312n, 1125899906842624n, 2251799813685248n, 4503599627370496n];
export declare const AllTextPermissions: bigint;
export declare const AllTextPermissionNames: ("CREATE_INSTANT_INVITE" | "MANAGE_CHANNELS" | "ADD_REACTIONS" | "VIEW_CHANNEL" | "SEND_MESSAGES" | "SEND_TTS_MESSAGES" | "MANAGE_MESSAGES" | "EMBED_LINKS" | "ATTACH_FILES" | "READ_MESSAGE_HISTORY" | "MENTION_EVERYONE" | "USE_EXTERNAL_EMOJIS" | "MANAGE_ROLES" | "MANAGE_WEBHOOKS" | "USE_APPLICATION_COMMANDS" | "MANAGE_THREADS" | "CREATE_PUBLIC_THREADS" | "CREATE_PRIVATE_THREADS" | "USE_EXTERNAL_STICKERS" | "SEND_MESSAGES_IN_THREADS" | "SEND_VOICE_MESSAGES" | "USE_CLYDE_AI" | "SEND_POLLS" | "USE_EXTERNAL_APPS" | "PIN_MESSAGES" | "BYPASS_SLOWMODE")[];
export declare const VoicePermissions: readonly [1n, 16n, 64n, 256n, 512n, 1024n, 2048n, 4096n, 8192n, 16384n, 32768n, 65536n, 131072n, 262144n, 1048576n, 2097152n, 4194304n, 8388608n, 16777216n, 33554432n, 268435456n, 536870912n, 2147483648n, 8589934592n, 137438953472n, 549755813888n, 4398046511104n, 35184372088832n, 70368744177664n, 140737488355328n, 281474976710656n, 562949953421312n, 1125899906842624n, 4503599627370496n];
export declare const AllVoicePermissions: bigint;
export declare const AllVoicePermissionNames: ("CREATE_INSTANT_INVITE" | "MANAGE_CHANNELS" | "ADD_REACTIONS" | "PRIORITY_SPEAKER" | "STREAM" | "VIEW_CHANNEL" | "SEND_MESSAGES" | "SEND_TTS_MESSAGES" | "MANAGE_MESSAGES" | "EMBED_LINKS" | "ATTACH_FILES" | "READ_MESSAGE_HISTORY" | "MENTION_EVERYONE" | "USE_EXTERNAL_EMOJIS" | "CONNECT" | "SPEAK" | "MUTE_MEMBERS" | "DEAFEN_MEMBERS" | "MOVE_MEMBERS" | "USE_VAD" | "MANAGE_ROLES" | "MANAGE_WEBHOOKS" | "USE_APPLICATION_COMMANDS" | "MANAGE_EVENTS" | "USE_EXTERNAL_STICKERS" | "USE_EMBEDDED_ACTIVITIES" | "USE_SOUNDBOARD" | "USE_EXTERNAL_SOUNDS" | "SEND_VOICE_MESSAGES" | "USE_CLYDE_AI" | "SET_VOICE_CHANNEL_STATUS" | "SEND_POLLS" | "USE_EXTERNAL_APPS" | "BYPASS_SLOWMODE")[];
export declare const StagePermissions: readonly [1n, 16n, 64n, 512n, 1024n, 2048n, 4096n, 8192n, 16384n, 32768n, 65536n, 131072n, 262144n, 1048576n, 4194304n, 16777216n, 268435456n, 536870912n, 2147483648n, 4294967296n, 8589934592n, 137438953472n, 70368744177664n, 140737488355328n, 562949953421312n, 1125899906842624n, 4503599627370496n];
export declare const AllStagePermissions: bigint;
export declare const AllStagePermissionNames: ("CREATE_INSTANT_INVITE" | "MANAGE_CHANNELS" | "ADD_REACTIONS" | "STREAM" | "VIEW_CHANNEL" | "SEND_MESSAGES" | "SEND_TTS_MESSAGES" | "MANAGE_MESSAGES" | "EMBED_LINKS" | "ATTACH_FILES" | "READ_MESSAGE_HISTORY" | "MENTION_EVERYONE" | "USE_EXTERNAL_EMOJIS" | "CONNECT" | "MUTE_MEMBERS" | "MOVE_MEMBERS" | "MANAGE_ROLES" | "MANAGE_WEBHOOKS" | "USE_APPLICATION_COMMANDS" | "REQUEST_TO_SPEAK" | "MANAGE_EVENTS" | "USE_EXTERNAL_STICKERS" | "SEND_VOICE_MESSAGES" | "USE_CLYDE_AI" | "SEND_POLLS" | "USE_EXTERNAL_APPS" | "BYPASS_SLOWMODE")[];
/** These permissions require the bot owner's account to have 2FA enabled in guilds where 2FA is a requirement. */
export declare const ModeratorPermissions: readonly [2n, 4n, 8n, 16n, 32n, 8192n, 268435456n, 536870912n, 1073741824n, 17179869184n, 1099511627776n, 2199023255552n];
export declare const AllModeratorPermissions: bigint;
export declare const AllModeratorPermissionNames: ("KICK_MEMBERS" | "BAN_MEMBERS" | "ADMINISTRATOR" | "MANAGE_CHANNELS" | "MANAGE_GUILD" | "MANAGE_MESSAGES" | "MANAGE_ROLES" | "MANAGE_WEBHOOKS" | "MANAGE_GUILD_EXPRESSIONS" | "MANAGE_THREADS" | "MODERATE_MEMBERS" | "VIEW_CREATOR_MONETIZATION_ANALYTICS")[];
export declare const PermissionNames: ("CREATE_INSTANT_INVITE" | "KICK_MEMBERS" | "BAN_MEMBERS" | "ADMINISTRATOR" | "MANAGE_CHANNELS" | "MANAGE_GUILD" | "ADD_REACTIONS" | "VIEW_AUDIT_LOG" | "PRIORITY_SPEAKER" | "STREAM" | "VIEW_CHANNEL" | "SEND_MESSAGES" | "SEND_TTS_MESSAGES" | "MANAGE_MESSAGES" | "EMBED_LINKS" | "ATTACH_FILES" | "READ_MESSAGE_HISTORY" | "MENTION_EVERYONE" | "USE_EXTERNAL_EMOJIS" | "VIEW_GUILD_INSIGHTS" | "CONNECT" | "SPEAK" | "MUTE_MEMBERS" | "DEAFEN_MEMBERS" | "MOVE_MEMBERS" | "USE_VAD" | "CHANGE_NICKNAME" | "MANAGE_NICKNAMES" | "MANAGE_ROLES" | "MANAGE_WEBHOOKS" | "MANAGE_GUILD_EXPRESSIONS" | "USE_APPLICATION_COMMANDS" | "REQUEST_TO_SPEAK" | "MANAGE_EVENTS" | "MANAGE_THREADS" | "CREATE_PUBLIC_THREADS" | "CREATE_PRIVATE_THREADS" | "USE_EXTERNAL_STICKERS" | "SEND_MESSAGES_IN_THREADS" | "USE_EMBEDDED_ACTIVITIES" | "MODERATE_MEMBERS" | "VIEW_CREATOR_MONETIZATION_ANALYTICS" | "USE_SOUNDBOARD" | "CREATE_GUILD_EXPRESSIONS" | "CREATE_EVENTS" | "USE_EXTERNAL_SOUNDS" | "SEND_VOICE_MESSAGES" | "USE_CLYDE_AI" | "SET_VOICE_CHANNEL_STATUS" | "SEND_POLLS" | "USE_EXTERNAL_APPS" | "PIN_MESSAGES" | "BYPASS_SLOWMODE" | "MANAGE_OFFICIAL_MESSAGES")[];
export type PermissionName = keyof typeof Permissions;
export declare enum ChannelFlags {
    /** Guild channel is hidden from the guild's feed */
    GUILD_FEED_REMOVED = 1,
    /** Thread is pinned to the top of its parent thread-only channel */
    PINNED = 2,
    /** Guild channel has been removed from the guild's active channels */
    ACTIVE_CHANNELS_REMOVED = 4,
    /** Thread-only channel requires a tag to create threads in */
    REQUIRE_TAG = 16,
    /** Channel is marked as spam */
    IS_SPAM = 32,
    /** Guild channel is used as a read-only resource for onboarding and is not shown in the channel list */
    IS_GUILD_RESOURCE_CHANNEL = 128,
    /** Channel is created by Clyde AI, which has full access to all message content */
    CLYDE_AI = 256,
    /** Guild channel is scheduled for deletion and is not shown in the UI */
    IS_SCHEDULED_FOR_DELETION = 512,
    /** @deprecated Forum channel is a media channel */
    IS_MEDIA_CHANNEL = 1024,
    /** Guild channel has summaries disabled */
    SUMMARIES_DISABLED = 2048,
    /** @deprecated Private channel's recipients consented to the application shelf */
    APPLICATION_SHELF_CONSENT = 4096,
    /** Role subscription tier for this guild channel has not been published yet */
    IS_ROLE_SUBSCRIPTION_TEMPLATE_PREVIEW_CHANNEL = 8192,
    /** Group DM is used for broadcasting a live stream */
    IS_BROADCASTING = 16384,
    /** Media channel has the embedded download options hidden for media attachments */
    HIDE_MEDIA_DOWNLOAD_OPTIONS = 32768,
    /** Group DM is used for guild join request interviews */
    IS_JOIN_REQUEST_INTERVIEW_CHANNEL = 65536,
    /** User does not have permission to view the channel */
    OBFUSCATED = 131072,
    /** Forum channel is the guild's moderator queue */
    IS_MODERATOR_REPORT_CHANNEL = 524288,
    /** Channel is marked as a spoiler channel */
    IS_SPOILER_CHANNEL = 2097152
}
export declare enum SortOrderTypes {
    /** Sort by the most recently active threads */
    LATEST_ACTIVITY = 0,
    CREATION_DATE = 1
}
export declare enum ForumLayoutTypes {
    /** No layout type explicitly set */
    DEFAULT = 0,
    /** Threads are displayed in a list */
    LIST = 1,
    /** Threads are displayed in a collection of tiles */
    GRID = 2
}
export declare enum TeamMembershipState {
    /** The user is invited */
    INVITED = 1,
    /** The user has accepted the invite */
    ACCEPTED = 2
}
export declare enum OAuthScopes {
    /** allows your app to fetch data from a user's "Now Playing/Recently Played" list - requires Discord approval */
    ACTIVITIES_READ = "activities.read",
    /** allows your app to update a user's activity - requires Discord approval (NOT REQUIRED FOR [GAMESDK ACTIVITY MANAGER](https://discord.com/developers/docs/game-sdk/activities)) */
    ACTIVITIES_WRITE = "activities.write",
    /** allows your app to read build data for a user's applications */
    APPLICATIONS_BUILDS_READ = "applications.builds.read",
    /** allows your app to upload/update builds for a user's applications - requires Discord approval */
    APPLICATIONS_BUILDS_UPLOAD = "applications.builds.upload",
    /** allows your app to use [commands](https://discord.com/developers/docs/interactions/application-commands) in a guild */
    APPLICATIONS_COMMANDS = "applications.commands",
    APPLICATIONS_COMMANDS_PERMISSIONS_UPDATE = "applications.commands.permissions.update",
    /** allows your app to update its [commands](https://discord.com/developers/docs/interactions/application-commands) using a Bearer token - [client credentials grant](https://discord.com/developers/docs/topics/oauth2#client-credentials-grant) only */
    APPLICATIONS_COMMANDS_UPDATE = "applications.commands.update",
    /** allows your app to read entitlements for a user's applications */
    APPLICATIONS_ENTITLEMENTS = "applications.entitlements",
    /** allows your app to read and update store data (SKUs, store listings, achievements, etc.) for a user's applications */
    APPLICATIONS_STORE_UPDATE = "applications.store.update",
    /** for oauth2 bots, this puts the bot in the user's selected guild by default */
    BOT = "bot",
    /** allows [/users/@me/connections](https://discord.com/developers/docs/resources/user#get-user-connections) to return linked third-party accounts */
    CONNECTIONS = "connections",
    /** allows your app to see information about the user's DMs and group DMs - requires Discord approval */
    DM_CHANNELS_READ = "dm_channels.read",
    /** enables [/users/@me](https://discord.com/developers/docs/resources/user#get-current-user) to return an `email` */
    EMAIL = "email",
    /** allows your app to [join users to a group dm](https://discord.com/developers/docs/resources/channel#group-dm-add-recipient) */
    GDM_JOIN = "gdm.join",
    /** allows [/users/@me/guilds](https://discord.com/developers/docs/resources/user#get-current-user-guilds) to return basic information about all of a user's guilds */
    GUILDS = "guilds",
    /** allows [/guilds/\{guild.id\}/members/\{user.id\}](https://discord.com/developers/docs/resources/guild#add-guild-member) to be used for joining users to a guild */
    GUILDS_JOIN = "guilds.join",
    /** allows [/users/@me/guilds/\{guild.id\}/member](https://discord.com/developers/docs/resources/user#get-current-user-guild-member) to return a user's member information in a guild */
    GUILDS_MEMBERS_READ = "guilds.members.read",
    /** allows [/users/@me](https://discord.com/developers/docs/resources/user#get-current-user) without `email` */
    IDENTIFY = "identify",
    /** allows your app to read a user's Nitro subscription type as defined by `premium_type` on the User object - only available to approved partners */
    IDENTIFY_PREMIUM = "identify.premium",
    /** for local rpc server api access, this allows you to read messages from all client channels (otherwise restricted to channels/guilds your app creates) */
    MESSAGES_READ = "messages.read",
    /** enables OpenID Connect endpoints and ID token claims */
    OPENID = "openid",
    /** allows your app to know a user's friends and implicit relationships */
    RELATIONSHIPS_READ = "relationships.read",
    /** allows your app to update a user's connection and metadata for the app */
    ROLE_CONNECTIONS_WRITE = "role_connections.write",
    /** for local rpc server access, this allows you to control a user's local Discord client - requires Discord approval */
    RPC = "rpc",
    /** for local rpc server access, this allows you to receive notifications pushed out to the user - requires Discord approval */
    RPC_ACTIVITIES_READ = "rpc.activities.read",
    /** for local rpc server access, this allows you to update a user's activity - requires Discord approval */
    RPC_ACTIVITIES_WRITE = "rpc.activities.write",
    /** for local rpc server access, this allows you to receive notifications pushed out to the user - requires Discord approval */
    RPC_NOTIFICATIONS_READ = "rpc.notifications.read",
    /** for local rpc server access, this allows you to read a user's voice settings and listen for voice events - requires Discord approval */
    RPC_VOICE_READ = "rpc.voice.read",
    /** for local rpc server access, this allows you to update a user's voice settings - requires Discord approval */
    RPC_VOICE_WRITE = "rpc.voice.write",
    /** allows your app to connect to voice on user's behalf and see all the voice members - requires Discord approval */
    VOICE = "voice",
    /** This generates a webhook that is returned in the oauth token response for authorization code grants. */
    WEBHOOK_INCOMING = "webhook.incoming"
}
export declare enum ComponentTypes {
    /** A container for other components */
    ACTION_ROW = 1,
    /** A button object */
    BUTTON = 2,
    /** Select menu for picking from defined text options */
    STRING_SELECT = 3,
    /** Text input object */
    TEXT_INPUT = 4,
    /** Select menu for users */
    USER_SELECT = 5,
    /** Select menu for roles */
    ROLE_SELECT = 6,
    /** Select menu for mentionables (users and roles) */
    MENTIONABLE_SELECT = 7,
    /** Select menu for channels */
    CHANNEL_SELECT = 8,
    /** Container to display text alongside an accessory component */
    SECTION = 9,
    /** Markdown text */
    TEXT_DISPLAY = 10,
    /** Small image that can be used as an accessory */
    THUMBNAIL = 11,
    /** Display images and other media */
    MEDIA_GALLERY = 12,
    /** Displays an attached file */
    FILE = 13,
    /** Component to add vertical padding between other components */
    SEPARATOR = 14,
    /** Displays an activity feed entry */
    CONTENT_INVENTORY_ENTRY = 16,
    /** Container that visually groups a set of components */
    CONTAINER = 17,
    /** Container associating a label and description with a component */
    LABEL = 18,
    /** Component to upload one or more files */
    FILE_UPLOAD = 19,
    /** Single-choice set of radio options */
    RADIO_GROUP = 21,
    /** Multi-select group of checkboxes */
    CHECKBOX_GROUP = 22,
    /** Single checkbox for binary choice */
    CHECKBOX = 23
}
export type SelectMenuNonResolvedTypes = ComponentTypes.STRING_SELECT;
export type SelectMenuResolvedTypes = ComponentTypes.USER_SELECT | ComponentTypes.ROLE_SELECT | ComponentTypes.MENTIONABLE_SELECT | ComponentTypes.CHANNEL_SELECT;
export type SelectMenuTypes = SelectMenuNonResolvedTypes | SelectMenuResolvedTypes;
export type MessageComponentTypes = ComponentTypes.BUTTON | SelectMenuTypes;
export type ModalComponentTypes = ComponentTypes.CHECKBOX | ComponentTypes.CHECKBOX_GROUP | ComponentTypes.RADIO_GROUP | ComponentTypes.TEXT_INPUT | SelectMenuTypes | ComponentTypes.FILE_UPLOAD;
export declare enum ButtonStyles {
    /** The most important or recommended action in a group of options */
    PRIMARY = 1,
    /** Alternative or supporting actions */
    SECONDARY = 2,
    /** Positive confirmation or completion actions */
    SUCCESS = 3,
    /** An action with irreversible consequences */
    DANGER = 4,
    /** Navigates to a URL */
    LINK = 5,
    /** Purchase */
    PREMIUM = 6
}
export declare enum TextInputStyles {
    /** Single-line input */
    SHORT = 1,
    /** Multi-line input */
    PARAGRAPH = 2
}
export declare enum MessageFlags {
    /** Message has been published to subscribed channels (via Channel Following) */
    CROSSPOSTED = 1,
    /** Message originated from a message in another channel (via Channel Following) */
    IS_CROSSPOST = 2,
    /** Embeds will not be included when serializing this message */
    SUPPRESS_EMBEDS = 4,
    /** Source message for this crosspost has been deleted (via Channel Following) */
    SOURCE_MESSAGE_DELETED = 8,
    /** Message came from the urgent message system */
    URGENT = 16,
    /** Message has an associated thread, with the same ID as the message */
    HAS_THREAD = 32,
    /** Message is only visible to the user who invoked the interaction */
    EPHEMERAL = 64,
    /** Message is an interaction response and the bot is "thinking" */
    LOADING = 128,
    /** Some roles were not mentioned and added to the thread (caps at 250) */
    FAILED_TO_MENTION_SOME_ROLES_IN_THREAD = 256,
    /** Message is hidden from the guild's feed */
    GUILD_FEED_HIDDEN = 512,
    /** Message contains a link that impersonates Discord */
    SHOULD_SHOW_LINK_NOT_DISCORD_WARNING = 1024,
    /** Message will not trigger push and desktop notifications */
    SUPPRESS_NOTIFICATIONS = 4096,
    /** Message's audio attachment is rendered as a voice message */
    IS_VOICE_MESSAGE = 8192,
    /** Message has a forwarded message snapshot attached */
    HAS_SNAPSHOT = 16384,
    /** Message contains components from version 2 of the UI kit */
    IS_COMPONENTS_V2 = 32768,
    /** Message was triggered by the social layer integration */
    SENT_BY_SOCIAL_LAYER_INTEGRATION = 65536,
    /** Message is hidden because the author is suspended */
    HIDDEN_SUSPENDED_USER = 131072,
    /** Marks guild boosted message as the first person to boost the guild */
    IS_FIRST_BOOSTER = 262144,
    /** Message is marked as official for the verified guild */
    IS_GUILD_OFFICIAL = 524288
}
export declare enum MessageTypes {
    /** A default message (see below) */
    DEFAULT = 0,
    /** A message sent when a user is added to a group DM or thread */
    RECIPIENT_ADD = 1,
    /** A message sent when a user is removed from a group DM or thread */
    RECIPIENT_REMOVE = 2,
    /** A message sent when a user creates a call in a private channel */
    CALL = 3,
    /** A message sent when a group DM or thread's name is changed */
    CHANNEL_NAME_CHANGE = 4,
    /** A message sent when a group DM's icon is changed */
    CHANNEL_ICON_CHANGE = 5,
    /** A message sent when a message is pinned in a channel */
    CHANNEL_PINNED_MESSAGE = 6,
    /** A message sent when a user joins a guild */
    USER_JOIN = 7,
    /** A message sent when a user subscribes to (boosts) a guild */
    GUILD_BOOST = 8,
    /** A message sent when a user subscribes to (boosts) a guild to tier 1 */
    GUILD_BOOST_TIER_1 = 9,
    /** A message sent when a user subscribes to (boosts) a guild to tier 2 */
    GUILD_BOOST_TIER_2 = 10,
    /** A message sent when a user subscribes to (boosts) a guild to tier 3 */
    GUILD_BOOST_TIER_3 = 11,
    /** A message sent when a news channel is followed */
    CHANNEL_FOLLOW_ADD = 12,
    /** @deprecated A message sent when a user starts streaming in a guild */
    GUILD_STREAM = 13,
    /** A message sent when a guild is disqualified from discovery */
    GUILD_DISCOVERY_DISQUALIFIED = 14,
    /** A message sent when a guild requalifies for discovery */
    GUILD_DISCOVERY_REQUALIFIED = 15,
    /** A message sent when a guild has failed discovery requirements for a week */
    GUILD_DISCOVERY_GRACE_PERIOD_INITIAL_WARNING = 16,
    /** A message sent when a guild has failed discovery requirements for 3 weeks */
    GUILD_DISCOVERY_GRACE_PERIOD_FINAL_WARNING = 17,
    /** A message sent when a thread is created */
    THREAD_CREATED = 18,
    /** A message sent when a user replies to a message */
    REPLY = 19,
    /** A message sent when a user uses a slash command */
    CHAT_INPUT_COMMAND = 20,
    /** A message sent when a thread starter message is added to a thread */
    THREAD_STARTER_MESSAGE = 21,
    /** A message sent to remind users to invite friends to a guild */
    GUILD_INVITE_REMINDER = 22,
    /** A message sent when a user uses a context menu command */
    CONTEXT_MENU_COMMAND = 23,
    /** A message sent when auto moderation takes an action */
    AUTO_MODERATION_ACTION = 24,
    /** A message sent when a user purchases or renews a role subscription */
    ROLE_SUBSCRIPTION_PURCHASE = 25,
    /** A message sent when a user is upsold to a premium interaction */
    INTERACTION_PREMIUM_UPSELL = 26,
    /** A message sent when a stage channel starts */
    STAGE_START = 27,
    /** A message sent when a stage channel ends */
    STAGE_END = 28,
    /** A message sent when a user starts speaking in a stage channel */
    STAGE_SPEAKER = 29,
    /** A message sent when a user raises their hand in a stage channel */
    STAGE_RAISE_HAND = 30,
    /** A message sent when a stage channel's topic is changed */
    STAGE_TOPIC_CHANGE = 31,
    /** A message sent when a user purchases an application premium subscription */
    GUILD_APPLICATION_PREMIUM_SUBSCRIPTION = 32,
    /** @deprecated A message sent when a user adds an application to group DM */
    PRIVATE_CHANNEL_INTEGRATION_ADDED = 33,
    /** @deprecated A message sent when a user removed an application from a group DM */
    PRIVATE_CHANNEL_INTEGRATION_REMOVED = 34,
    /** A message sent when a user gifts a premium (Nitro) referral */
    PREMIUM_REFERRAL = 35,
    /** A message sent when a user enabled lockdown for the guild */
    GUILD_INCIDENT_ALERT_MODE_ENABLED = 36,
    /** A message sent when a user disables lockdown for the guild */
    GUILD_INCIDENT_ALERT_MODE_DISABLED = 37,
    /** A message sent when a user reports a raid for the guild */
    GUILD_INCIDENT_REPORT_RAID = 38,
    /** A message sent when a user reports a false alarm for the guild */
    GUILD_INCIDENT_REPORT_FALSE_ALARM = 39,
    /** A message sent when no one sends a message in the current channel for 1 hour */
    GUILD_DEADCHAT_REVIVE_PROMPT = 40,
    /** A message sent when a user buys another user a gift */
    CUSTOM_GIFT = 41,
    GUILD_GAMING_STATS_PROMPT = 42,
    /** @deprecated A message sent when a user posts a poll */
    POLL = 43,
    /** A message sent when a user purchases a guild product */
    PURCHASE_NOTIFICATION = 44,
    /** @deprecated A message sent when a user invites another user to hangout in a voice channel */
    VOICE_HANGOUT_INVITE = 45,
    /** A message sent when a poll is finalized */
    POLL_RESULT = 46,
    /** A message sent by the Discord Updates account when a new changelog is posted */
    CHANGELOG = 47,
    /** A message sent when a Nitro promotion is triggered */
    NITRO_NOTIFICATION = 48,
    /** A message sent when a voice channel is linked to a lobby */
    CHANNEL_LINKED_TO_LOBBY = 49,
    /** A local-only ephemeral message sent when a user is prompted to gift Nitro to a friend on their friendship anniversary */
    GIFTING_PROMPT = 50,
    /** A local-only message sent when a user receives an in-game message NUX */
    IN_GAME_MESSAGE_NUX = 51,
    /** A message sent when a user accepts a guild join request */
    GUILD_JOIN_REQUEST_ACCEPT_NOTIFICATION = 52,
    /** A message sent when a user rejects a guild join request */
    GUILD_JOIN_REQUEST_REJECT_NOTIFICATION = 53,
    /** A message sent when a user withdraws a guild join request */
    GUILD_JOIN_REQUEST_WITHDRAWN_NOTIFICATION = 54,
    /** A message sent when a user upgrades to HD streaming */
    HD_STREAMING_UPGRADED = 55,
    /** @deprecated A message sent when a user sets a DM wallpaper */
    CHAT_WALLPAPER_SET = 56,
    /** @deprecated A message sent when a user removes a DM wallpaper */
    CHAT_WALLPAPER_REMOVE = 57,
    /** A message sent when a user resolves a moderation report by deleting the offending message */
    REPORT_TO_MOD_DELETED_MESSAGE = 58,
    /** A message sent when a user resolves a moderation report by timing out the offending user */
    REPORT_TO_MOD_TIMEOUT_USER = 59,
    /** A message sent when a user resolves a moderation report by kicking the offending user */
    REPORT_TO_MOD_KICK_USER = 60,
    /** A message sent when a user resolves a moderation report by banning the offending user */
    REPORT_TO_MOD_BAN_USER = 61,
    /** A message sent when a user resolves a moderation report */
    REPORT_TO_MOD_CLOSED_REPORT = 62,
    /** @deprecated A message sent when a user adds a new emoji to a guild */
    EMOJI_ADDED = 63,
    /** A message sent when a user invites another user to join a group Nitro subscription */
    PREMIUM_GROUP_INVITE = 64,
    /** A message sent when a user starts a voice channel in a small guild */
    VOICE_SESSION = 65,
    /** A local-only ephemeral message asking the user to be the first to boost a guild */
    GUILD_BOOST_UPSELL = 66,
    /** A message sent when a user accepts another user's friend request */
    FRIEND_REQUEST_ACCEPTED = 67,
    MEDIA_MENTION_MESSAGE = 68
}
/** Messages of these types cannot be deleted. */
export declare const UndeletableMessageTypes: readonly [MessageTypes.RECIPIENT_ADD, MessageTypes.RECIPIENT_REMOVE, MessageTypes.CALL, MessageTypes.CHANNEL_NAME_CHANGE, MessageTypes.CHANNEL_ICON_CHANGE, MessageTypes.THREAD_STARTER_MESSAGE];
export declare enum MessageActivityTypes {
    /** Join activity invite. */
    JOIN = 1,
    /** Spectate activity invite. */
    SPECTATE = 2,
    /** Listen activity invite. */
    LISTEN = 3,
    /** Watch activity invite. */
    WATCH = 4,
    /** Join request activity invite. */
    JOIN_REQUEST = 5
}
export declare enum InteractionTypes {
    /** Discord is pinging the application */
    PING = 1,
    /** User uses an application command */
    APPLICATION_COMMAND = 2,
    /** User triggers a message component */
    MESSAGE_COMPONENT = 3,
    /** User is requesting an application command option to be auto-completed */
    APPLICATION_COMMAND_AUTOCOMPLETE = 4,
    /** User submits a modal */
    MODAL_SUBMIT = 5
}
export declare enum InviteTypes {
    /** Joins the user to a guild */
    GUILD = 0,
    /** Joins the user to a group DM */
    GROUP_DM = 1,
    /** Adds the user as a friend to the inviter */
    FRIEND = 2
}
export declare enum InviteTargetTypes {
    /** The invite is for a stream in a voice channel */
    STREAM = 1,
    /** The invite is for an embedded application (activity) in a voice channel */
    EMBEDDED_APPLICATION = 2,
    ROLE_SUBSCRIPTIONS_PURCHASE = 3
}
export declare enum GuildScheduledEventPrivacyLevels {
    /** Scheduled event or stage instance is only visible to guild members */
    GUILD_ONLY = 2
}
export declare enum GuildScheduledEventStatuses {
    /** Scheduled event has not started. */
    SCHEDULED = 1,
    /** Scheduled event is currently active. */
    ACTIVE = 2,
    /** Scheduled event completed. */
    COMPLETED = 3,
    /** Scheduled event was canceled. */
    CANCELED = 4
}
export declare enum GuildScheduledEventEntityTypes {
    /** Scheduled event is for a stage instance. */
    STAGE_INSTANCE = 1,
    /** Scheduled event is for a voice channel. */
    VOICE = 2,
    /** Scheduled event is external. */
    EXTERNAL = 3
}
export declare enum StageInstancePrivacyLevels {
    /** @deprecated Scheduled event or stage instance is visible publicly */
    PUBLIC = 1,
    /** Scheduled event or stage instance is only visible to guild members */
    GUILD_ONLY = 2
}
export declare enum AutoModerationEventTypes {
    /** When a member sends or edits a message in the guild */
    MESSAGE_SEND = 1,
    MEMBER_UPDATE = 2
}
export declare enum AutoModerationTriggerTypes {
    /** When message content contains words from a user defined list of keywords (max 6) */
    KEYWORD = 1,
    /** When message content represents generic spam (max 1) */
    SPAM = 3,
    /** When message content contains words from internal predefined wordsets (max 1) */
    KEYWORD_PRESET = 4,
    /** When message content contains more unique mentions than allowed (max 1) */
    MENTION_SPAM = 5,
    MEMBER_PROFILE = 6
}
export declare enum AutoModerationKeywordPresetTypes {
    /** Words that may be considered forms of swearing or cursing */
    PROFANITY = 1,
    /** Words that refer to sexually explicit behavior or activity */
    SEXUAL_CONTENT = 2,
    /** Personal insults or words that may be considered hate speech */
    SLURS = 3
}
export declare enum AutoModerationActionTypes {
    /** Block a member's message and prevent it from being posted; a custom explanation can be specified and shown to members whenever their message is blocked */
    BLOCK_MESSAGE = 1,
    /** Log user content to a specified channel */
    SEND_ALERT_MESSAGE = 2,
    TIMEOUT = 3,
    BLOCK_MEMBER_INTERACTION = 4
}
export declare enum AuditLogActionTypes {
    /** Guild settings were updated */
    GUILD_UPDATE = 1,
    /** Channel was created */
    CHANNEL_CREATE = 10,
    /** Channel settings were updated */
    CHANNEL_UPDATE = 11,
    /** Channel was deleted */
    CHANNEL_DELETE = 12,
    /** Permission overwrite was added to a channel */
    CHANNEL_OVERWRITE_CREATE = 13,
    /** Permission overwrite was updated for a channel */
    CHANNEL_OVERWRITE_UPDATE = 14,
    /** Permission overwrite was deleted from a channel */
    CHANNEL_OVERWRITE_DELETE = 15,
    /** Member was removed from guild */
    MEMBER_KICK = 20,
    /** Members were pruned from guild */
    MEMBER_PRUNE = 21,
    /** Member was banned from guild */
    MEMBER_BAN_ADD = 22,
    /** Member was unbanned from guild */
    MEMBER_BAN_REMOVE = 23,
    /** Member was updated in guild */
    MEMBER_UPDATE = 24,
    /** Member was added or removed from a role */
    MEMBER_ROLE_UPDATE = 25,
    /** Member was moved to a different voice channel */
    MEMBER_MOVE = 26,
    /** Member was disconnected from a voice channel */
    MEMBER_DISCONNECT = 27,
    /** Bot user was added to guild */
    BOT_ADD = 28,
    /** Role was created */
    ROLE_CREATE = 30,
    /** Role was edited */
    ROLE_UPDATE = 31,
    /** Role was deleted */
    ROLE_DELETE = 32,
    /** Guild invite was created */
    INVITE_CREATE = 40,
    /** Guild invite was updated */
    INVITE_UPDATE = 41,
    /** Guild invite was deleted */
    INVITE_DELETE = 42,
    /** Webhook was created */
    WEBHOOK_CREATE = 50,
    /** Webhook properties or channel were updated */
    WEBHOOK_UPDATE = 51,
    /** Webhook was deleted */
    WEBHOOK_DELETE = 52,
    /** Emoji was created */
    EMOJI_CREATE = 60,
    /** Emoji name was updated */
    EMOJI_UPDATE = 61,
    /** Emoji was deleted */
    EMOJI_DELETE = 62,
    /** Single message was deleted */
    MESSAGE_DELETE = 72,
    /** Multiple messages were deleted */
    MESSAGE_BULK_DELETE = 73,
    /** Message was pinned to a channel */
    MESSAGE_PIN = 74,
    /** Message was unpinned from a channel */
    MESSAGE_UNPIN = 75,
    /** Integration was added to guild */
    INTEGRATION_CREATE = 80,
    /** Integration was updated (e.g. its scopes were updated) */
    INTEGRATION_UPDATE = 81,
    /** Integration was removed from guild */
    INTEGRATION_DELETE = 82,
    /** Stage instance was created (stage channel becomes live) */
    STAGE_INSTANCE_CREATE = 83,
    /** Stage instance details were updated */
    STAGE_INSTANCE_UPDATE = 84,
    /** Stage instance was deleted (stage channel no longer live) */
    STAGE_INSTANCE_DELETE = 85,
    /** Sticker was created */
    STICKER_CREATE = 90,
    /** Sticker details were updated */
    STICKER_UPDATE = 91,
    /** Sticker was deleted */
    STICKER_DELETE = 92,
    /** Event was created */
    GUILD_SCHEDULED_EVENT_CREATE = 100,
    /** Event was updated */
    GUILD_SCHEDULED_EVENT_UPDATE = 101,
    /** Event was cancelled */
    GUILD_SCHEDULED_EVENT_DELETE = 102,
    /** Thread was created in a channel */
    THREAD_CREATE = 110,
    /** Thread was updated */
    THREAD_UPDATE = 111,
    /** Thread was deleted */
    THREAD_DELETE = 112,
    /** Permissions were updated for a command */
    APPLICATION_COMMAND_PERMISSION_UPDATE = 121,
    /** Soundboard sound was created */
    SOUNDBOARD_SOUND_CREATE = 130,
    /** Soundboard sound was updated */
    SOUNDBOARD_SOUND_UPDATE = 131,
    /** Soundboard sound was deleted */
    SOUNDBOARD_SOUND_DELETE = 132,
    /** AutoMod rule was created */
    AUTO_MODERATION_RULE_CREATE = 140,
    /** AutoMod rule was updated */
    AUTO_MODERATION_RULE_UPDATE = 141,
    /** AutoMod rule was deleted */
    AUTO_MODERATION_RULE_DELETE = 142,
    /** Message was blocked by AutoMod */
    AUTO_MODERATION_BLOCK_MESSAGE = 143,
    /** Message was flagged by AutoMod */
    AUTO_MODERATION_FLAG_TO_CHANNEL = 144,
    /** Member was timed out by AutoMod */
    AUTO_MODERATION_USER_COMMUNICATION_DISABLED = 145,
    /** Member was quarantined by AutoMod */
    AUTO_MODERATION_QUARANTINE_USER = 146,
    /** Creator monetization request was created */
    CREATOR_MONETIZATION_REQUEST_CREATED = 150,
    /** Creator monetization terms were accepted */
    CREATOR_MONETIZATION_TERMS_ACCEPTED = 151,
    ROLE_PROMPT_CREATE = 160,
    ROLE_PROMPT_UPDATE = 161,
    ROLE_PROMPT_DELETE = 162,
    /** Onboarding prompt was created */
    ONBOARDING_PROMPT_CREATE = 163,
    /** Onboarding prompt was updated */
    ONBOARDING_PROMPT_UPDATE = 164,
    /** Onboarding prompt was deleted */
    ONBOARDING_PROMPT_DELETE = 165,
    /** Onboarding was initialized */
    ONBOARDING_CREATE = 166,
    /** Onboarding was updated */
    ONBOARDING_UPDATE = 167,
    /** Message was featured in guild home */
    GUILD_HOME_FEATURE_ITEM = 171,
    /** Message was removed from guild home */
    GUILD_HOME_REMOVE_ITEM = 172,
    /** @deprecated Message blocked by harmful links filter */
    HARMFUL_LINKS_BLOCKED_MESSAGE = 180,
    /** New member welcome was initialized */
    HOME_SETTINGS_CREATE = 190,
    /** New member welcome was updated */
    HOME_SETTINGS_UPDATE = 191,
    /** Voice channel status was updated */
    VOICE_CHANNEL_STATUS_CREATE = 192,
    /** Voice channel status was deleted */
    VOICE_CHANNEL_STATUS_DELETE = 193,
    /** @deprecated Clyde AI profile was updated */
    CLYDE_AI_PROFILE_UPDATE = 194,
    /** Exception was created for a guild scheduled event */
    GUILD_SCHEDULED_EVENT_EXCEPTION_CREATE = 200,
    /** Exception was updated for a guild scheduled event */
    GUILD_SCHEDULED_EVENT_EXCEPTION_UPDATE = 201,
    /** Exception was deleted for a guild scheduled event */
    GUILD_SCHEDULED_EVENT_EXCEPTION_DELETE = 202,
    /** Member verification settings were updated */
    GUILD_MEMBER_VERIFICATION_UPDATE = 210,
    /** Guild profile was updated */
    GUILD_PROFILE_UPDATE = 211,
    PIN_PERMISSION_MIGRATION_COMPLETE = 212,
    BYPASS_SLOWMODE_PERMISSION_MIGRATION_COM = 213
}
export declare enum ApplicationCommandTypes {
    /** Slash commands; a text-based command that shows up when a user types `/` */
    CHAT_INPUT = 1,
    /** An UI-based command that shows up when you right click or tap on an user */
    USER = 2,
    /** An UI-based command that shows up when you right click or tap on a message */
    MESSAGE = 3,
    /** An UI-based command that represents the primary way to invoke an app's activity */
    PRIMARY_ENTRY_POINT = 4
}
export declare enum ApplicationCommandOptionTypes {
    /** A subcommand */
    SUB_COMMAND = 1,
    /** A group of subcommands */
    SUB_COMMAND_GROUP = 2,
    /** A string */
    STRING = 3,
    /** An integer between -253 and */
    INTEGER = 4,
    /** A boolean */
    BOOLEAN = 5,
    /** An user */
    USER = 6,
    /** A channel (includes all channel types by default) */
    CHANNEL = 7,
    /** A role */
    ROLE = 8,
    /** A mentionable entity (currently only users and roles) */
    MENTIONABLE = 9,
    /** A float/integer between -253 and */
    NUMBER = 10,
    /** An attachment */
    ATTACHMENT = 11
}
export declare enum ApplicationCommandPermissionTypes {
    /** A role within a guild */
    ROLE = 1,
    /** A guild member */
    USER = 2,
    /** A channel within a guild */
    CHANNEL = 3
}
export declare enum InteractionResponseTypes {
    /** Acknowledge a `PING` interaction */
    PONG = 1,
    /** Respond to an interaction with a message */
    CHANNEL_MESSAGE_WITH_SOURCE = 4,
    /** Acknowledge an interaction and send a message later; the user sees a loading state */
    DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE = 5,
    /** Acknowledge an interaction and edit the original message later; the user does not see a loading state */
    DEFERRED_UPDATE_MESSAGE = 6,
    /** Edit the message that the interacted component was attached to */
    UPDATE_MESSAGE = 7,
    /** Respond to an autocomplete interaction with suggested choices */
    APPLICATION_COMMAND_AUTOCOMPLETE_RESULT = 8,
    /** Respond to an interaction with a popup modal */
    MODAL = 9,
    /** @deprecated */
    PREMIUM_REQUIRED = 10,
    /** Launch an embedded activity associated with the application */
    LAUNCH_ACTIVITY = 12
}
export declare enum EntryPointCommandHandlerTypes {
    /** The application handles the interaction using an interaction token */
    APP_HANDLER = 1,
    /** Discord handles the interaction by launching an embedded activity and sending a follow-up message without coordinating with the app */
    DISCORD_LAUNCH_ACTIVITY = 2
}
export declare enum Intents {
    /** Guilds and unavailable guild events. */
    GUILDS = 1,
    /** Guild member events. */
    GUILD_MEMBERS = 2,
    /** Guild moderation events, including bans. */
    GUILD_MODERATION = 4,
    /** @deprecated Guild emoji and sticker events. Use `GUILD_EXPRESSIONS`. */
    GUILD_EMOJIS_AND_STICKERS = 8,
    /** Guild emoji, sticker, and soundboard expression events. */
    GUILD_EXPRESSIONS = 8,
    /** Guild integration events. */
    GUILD_INTEGRATIONS = 16,
    /** Guild webhook events. */
    GUILD_WEBHOOKS = 32,
    /** Guild invite events. */
    GUILD_INVITES = 64,
    /** Guild voice state events. */
    GUILD_VOICE_STATES = 128,
    /** Guild presence events. */
    GUILD_PRESENCES = 256,
    /** Guild message create/update/delete events. */
    GUILD_MESSAGES = 512,
    /** Guild message reaction events. */
    GUILD_MESSAGE_REACTIONS = 1024,
    /** Guild message typing events. */
    GUILD_MESSAGE_TYPING = 2048,
    /** Direct message create/update/delete events. */
    DIRECT_MESSAGES = 4096,
    /** Direct message reaction events. */
    DIRECT_MESSAGE_REACTIONS = 8192,
    /** Direct message typing events. */
    DIRECT_MESSAGE_TYPING = 16384,
    /** Message content fields for message events. */
    MESSAGE_CONTENT = 32768,
    /** Guild scheduled event events. */
    GUILD_SCHEDULED_EVENTS = 65536,
    /** Auto Moderation rule create/update/delete events. */
    AUTO_MODERATION_CONFIGURATION = 1048576,
    /** Auto Moderation action execution events. */
    AUTO_MODERATION_EXECUTION = 2097152,
    /** Guild poll vote events. */
    GUILD_MESSAGE_POLLS = 16777216,
    /** Direct message poll vote events. */
    DIRECT_MESSAGE_POLLS = 33554432
}
export type IntentNames = keyof typeof Intents;
export type PrivilegedIntentNames = "GUILD_MEMBERS" | "GUILD_PRESENCES" | "MESSAGE_CONTENT";
export declare const NonPrivilegedIntents: readonly [Intents.GUILDS, Intents.GUILD_MODERATION, Intents.GUILD_EMOJIS_AND_STICKERS, Intents.GUILD_INTEGRATIONS, Intents.GUILD_WEBHOOKS, Intents.GUILD_INVITES, Intents.GUILD_VOICE_STATES, Intents.GUILD_MESSAGES, Intents.GUILD_MESSAGE_REACTIONS, Intents.GUILD_MESSAGE_TYPING, Intents.DIRECT_MESSAGES, Intents.DIRECT_MESSAGE_REACTIONS, Intents.DIRECT_MESSAGE_TYPING, Intents.GUILD_SCHEDULED_EVENTS, Intents.AUTO_MODERATION_CONFIGURATION, Intents.AUTO_MODERATION_EXECUTION, Intents.GUILD_MESSAGE_POLLS, Intents.DIRECT_MESSAGE_POLLS];
export declare const AllNonPrivilegedIntents: number;
export declare const PrivilegedIntents: readonly [Intents.GUILD_MEMBERS, Intents.GUILD_PRESENCES, Intents.MESSAGE_CONTENT];
export declare const AllPrivilegedIntents: number;
export declare const AllIntents: number;
export declare const PrivilegedIntentMapping: [intent: Intents, allowed: ApplicationFlags[]][];
export declare enum GatewayOPCodes {
    /** An event was dispatched */
    DISPATCH = 0,
    /** Keep the WebSocket connection alive */
    HEARTBEAT = 1,
    /** Start a new session during the initial handshake */
    IDENTIFY = 2,
    /** Update the client's presence */
    PRESENCE_UPDATE = 3,
    /** Join/leave or move between voice channels and calls */
    VOICE_STATE_UPDATE = 4,
    /** Resume a previous session that was disconnected */
    RESUME = 6,
    /** You should attempt to reconnect and resume immediately */
    RECONNECT = 7,
    /** Request information about guild members */
    REQUEST_GUILD_MEMBERS = 8,
    /** The session has been invalidated. You should reconnect and identify/resume accordingly */
    INVALID_SESSION = 9,
    /** Sent immediately after connecting, contains the `heartbeat_interval` to use */
    HELLO = 10,
    /** Acknowledge a received heartbeat */
    HEARTBEAT_ACK = 11,
    /** Request soundboard sounds for guilds */
    REQUEST_SOUNDBOARD_SOUNDS = 31,
    /** Request extra voice channel fields for a guild */
    REQUEST_CHANNEL_INFO = 43
}
export declare enum GatewayCloseCodes {
    /** We're not sure what went wrong. Try reconnecting? */
    UNKNOWN_ERROR = 4000,
    /** You sent an invalid Gateway opcode or an invalid payload for an opcode. Don't do that! */
    UNKNOWN_OPCODE = 4001,
    /** You sent an invalid payload. Don't do that! */
    DECODE_ERROR = 4002,
    /** You sent us a payload prior to identifying, or this session has been invalidated */
    NOT_AUTHENTICATED = 4003,
    /** The account token sent with your identify payload is incorrect */
    AUTHENTICATION_FAILED = 4004,
    /** You sent more than one identify payload. Don't do that! */
    ALREADY_AUTHENTICATED = 4005,
    /** The sequence sent when resuming the session was invalid. Reconnect and start a new session */
    INVALID_SEQUENCE = 4007,
    /** Woah nelly! You're sending payloads too quickly. Slow it down! You will be disconnected on receiving this */
    RATE_LIMITED = 4008,
    /** Your session timed out. Reconnect and start a new one */
    SESSION_TIMEOUT = 4009,
    /** You sent us an invalid shard when identifying */
    INVALID_SHARD = 4010,
    /** The session would have handled too many guilds—you are required to shard your connection in order to connect */
    SHARDING_REQUIRED = 4011,
    /** You sent an invalid version for the Gateway */
    INVALID_API_VERSION = 4012,
    /** You sent an invalid intent for a Gateway intent. You may have incorrectly calculated the bitwise value */
    INVALID_INTENTS = 4013,
    /** You sent a disallowed intent for a Gateway intent. You may have tried to specify an intent that you have not enabled or are not approved for */
    DISALLOWED_INTENTS = 4014
}
export declare enum VoiceOPCodes {
    /** Start a new voice WebSocket connection */
    IDENTIFY = 0,
    /** Select the voice protocol */
    SELECT_PROTOCOL = 1,
    /** Complete the WebSocket handshake */
    READY = 2,
    /** Keep the WebSocket connection alive */
    HEARTBEAT = 3,
    /** Describe the session */
    SESSION_DESCRIPTION = 4,
    /** Indicate which users are speaking */
    SPEAKING = 5,
    /** Acknowledge a received heartbeat */
    HEARTBEAT_ACK = 6,
    /** Resume a previous session that was disconnected */
    RESUME = 7,
    /** Sent immediately after connecting, contains the `heartbeat_interval` to use */
    HELLO = 8,
    /** Response to acknowledging a successful resume */
    RESUMED = 9,
    /** Indicate that clients have connected to the voice channel */
    CLIENTS_CONNECT = 11,
    /** Indicate that a client has disconnected from the voice channel */
    CLIENT_DISCONNECT = 13
}
export declare enum VoiceCloseCodes {
    /** You sent an invalid opcode */
    UNKNOWN_OPCODE = 4001,
    /** You sent a invalid payload in your identifying to the Gateway */
    DECODE_ERROR = 4002,
    /** You sent a payload before identifying with the Gateway */
    NOT_AUTHENTICATED = 4003,
    /** The token you sent in your identify payload is incorrect */
    AUTHENTICATION_FAILED = 4004,
    /** You sent more than one identify payload. Stahp */
    ALREADY_AUTHENTICATED = 4005,
    /** Your session is no longer valid */
    INVALID_SESSION = 4006,
    /** Your session has timed out */
    SESSION_TIMEOUT = 4009,
    /** We can't find the server you're trying to connect to */
    SERVER_NOT_FOUND = 4011,
    /** We didn't recognize the protocol you sent */
    UNKNOWN_PROTOCOL = 4012,
    /** Disconnect individual client (you were kicked, the main Gateway session was dropped, etc.). Should not reconnect */
    DISCONNECTED = 4013,
    /** The server crashed. Our bad! Try resuming */
    VOICE_SERVER_CRASHED = 4014,
    /** We didn't recognize your encryption */
    UNKNOWN_ENCRYPTION_MODE = 4015
}
export declare enum HubTypes {
    /** Student hub is not categorized as a high school or post-secondary institution */
    DEFAULT = 0,
    /** Student hub is for a high school */
    HIGH_SCHOOL = 1,
    /** Student hub is for a post-secondary institution (college or university) */
    COLLEGE = 2
}
export declare enum ActivityTypes {
    GAME = 0,
    STREAMING = 1,
    LISTENING = 2,
    WATCHING = 3,
    CUSTOM = 4,
    COMPETING = 5,
    HANG_STATUS = 6
}
export declare enum ActivityFlags {
    /** Activity is an instanced game session (a match that will end) */
    INSTANCE = 1,
    /** Activity can be joined by other users */
    JOIN = 2,
    SPECTATE = 4,
    /** @deprecated Activity requires a request to join */
    JOIN_REQUEST = 8,
    /** Activity can be synced */
    SYNC = 16,
    /** Activity can be played */
    PLAY = 32,
    PARTY_PRIVACY_FRIENDS_ONLY = 64,
    /** Activity's party can be joined by users in the same voice channel */
    PARTY_PRIVACY_VOICE_CHANNEL = 128,
    /** Activity is embedded within the Discord client */
    EMBEDDED = 256
}
export declare enum ThreadMemberFlags {
    /** User has interacted with the thread */
    HAS_INTERACTED = 1,
    /** User receives notifications for all messages */
    ALL_MESSAGES = 2,
    /** User receives notifications only for messages that @mention them */
    ONLY_MENTIONS = 4,
    /** User does not receive any notifications */
    NO_MESSAGES = 8
}
export declare enum RoleConnectionMetadataTypes {
    /** The metadata value (`integer`) is less than or equal to the guild's configured value (`integer`) */
    INTEGER_LESS_THAN_OR_EQUAL = 1,
    /** The metadata value (`integer`) is greater than or equal to the guild's configured value (`integer`) */
    INTEGER_GREATER_THAN_OR_EQUAL = 2,
    /** The metadata value (`integer`) is equal to the guild's configured value (`integer`) */
    INTEGER_EQUAL = 3,
    /** The metadata value (`integer`) is not equal to the guild's configured value (`integer`) */
    INTEGER_NOT_EQUAL = 4,
    /** The metadata value (`ISO8601 string`) is less than or equal to the guild's configured value (`integer`; `days before current date`) */
    DATETIME_LESS_THAN_OR_EQUAL = 5,
    /** The metadata value (`ISO8601 string`) is greater than or equal to the guild's configured value (`integer`; `days before current date`) */
    DATETIME_GREATER_THAN_OR_EQUAL = 6,
    /** The metadata value (`integer`) is equal to the guild's configured value (`integer`; `1`) */
    BOOLEAN_EQUAL = 7,
    /** The metadata value (`integer`) is not equal to the guild's configured value (`integer`; `1`) */
    BOOLEAN_NOT_EQUAL = 8
}
export declare enum GuildMemberFlags {
    /** Guild member has left and rejoined the guild */
    DID_REJOIN = 1,
    /** Guild member has completed onboarding */
    COMPLETED_ONBOARDING = 2,
    /** Guild member bypasses guild verification requirements and member verification */
    BYPASSES_VERIFICATION = 4,
    /** Guild member has started onboarding */
    STARTED_ONBOARDING = 8,
    /** Guild member is a guest and not a true member */
    IS_GUEST = 16,
    /** Guild member has started the new member actions in the server guide */
    STARTED_HOME_ACTIONS = 32,
    /** Guild member has completed all of the new member actions in the server guide */
    COMPLETED_HOME_ACTIONS = 64,
    AUTOMOD_QUARANTINED_USERNAME_OR_GUILD_NICKNAME = 128,
    /** @deprecated Guild member has been indefinitely quarantined by an AutoMod Rule for their bio */
    AUTOMOD_QUARANTINED_BIO = 256,
    /** Guild member has acknowledged the DM privacy settings upsell modal */
    DM_SETTINGS_UPSELL_ACKNOWLEDGED = 512,
    AUTOMOD_QUARANTINED_CLAN_TAG = 1024
}
export declare enum OnboardingPromptTypes {
    /** Prompt offers multiple options to select from */
    MULTIPLE_CHOICE = 0,
    /** Prompt offers a dropdown menu to select from */
    DROPDOWN = 1
}
export declare enum AnimationTypes {
    /** Premium animation type. */
    PREMIUM = 0,
    /** Basic animation type. */
    BASIC = 1
}
export declare enum OnboardingModes {
    DEFAULT = 0,
    ADVANCED = 1
}
export declare enum InviteFlags {
    /** Invite grants one-time access to a voice channel in the guild */
    IS_GUEST_INVITE = 1
}
export declare enum ReactionType {
    /** A normal reaction */
    NORMAL = 0,
    SUPER = 1
}
export declare enum AttachmentFlags {
    /** Attachment is a clipped recording of a stream */
    IS_CLIP = 1,
    /** Attachment is a thumbnail */
    IS_THUMBNAIL = 2,
    /** Attachment has been remixed */
    IS_REMIX = 4,
    /** Attachment is a spoiler */
    IS_SPOILER = 8,
    /** Attachment was flagged as sensitive content */
    CONTAINS_EXPLICIT_MEDIA = 16,
    /** Attachment is an animated image */
    IS_ANIMATED = 32
}
export declare enum SKUTypes {
    /** Primary durable item */
    DURABLE_PRIMARY = 1,
    /** Durable item */
    DURABLE = 2,
    /** Consumable item */
    CONSUMABLE = 3,
    /** Bundle of items */
    BUNDLE = 4,
    /** Subscription item */
    SUBSCRIPTION = 5,
    /** Group of subscription items */
    SUBSCRIPTION_GROUP = 6
}
export declare enum SKUFlags {
    /** SKU is available for free to premium users */
    PREMIUM_PURCHASE = 1,
    /** SKU has free content for premium users */
    HAS_FREE_PREMIUM_CONTENT = 2,
    /** SKU is available for purchase */
    AVAILABLE = 4,
    /** SKU is available for free to premium users and purchasable normally */
    PREMIUM_AND_DISTRIBUTION = 8,
    STICKER_PACK = 16,
    /** SKU is a guild role subscription or ticketed event */
    GUILD_ROLE = 32,
    /** SKU is a giftable Discord premium subscription */
    AVAILABLE_FOR_SUBSCRIPTION_GIFTING = 64,
    /** SKU is an application subscription for guilds */
    APPLICATION_GUILD_SUBSCRIPTION = 128,
    GUILD_SUBSCRIPTION = 128,
    /** SKU is an application subscription for users */
    APPLICATION_USER_SUBSCRIPTION = 256,
    USER_SUBSCRIPTION = 256
}
export declare enum EntitlementTypes {
    /** Entitlement was purchased by a user */
    PURCHASE = 1,
    /** Entitlement is for a premium (Nitro) subscription */
    PREMIUM_SUBSCRIPTION = 2,
    /** Entitlement was gifted by a developer */
    DEVELOPER_GIFT = 3,
    /** Entitlement was purchased by a developer in application test mode */
    TEST_MODE_PURCHASE = 4,
    /** Entitlement was granted when the SKU was free */
    FREE_PURCHASE = 5,
    /** Entitlement was gifted by another user */
    USER_GIFT = 6,
    /** Entitlement was claimed for free via a premium subscription */
    PREMIUM_PURCHASE = 7,
    /** Entitlement is for an application subscription */
    APPLICATION_SUBSCRIPTION = 8
}
export declare enum EntitlementOwnerTypes {
    /** Entitlement is for a guild */
    GUILD = 1,
    /** Entitlement is for a user */
    USER = 2
}
export declare enum SKUAccessTypes {
    PUBLIC = 1
}
export declare enum SubscriptionStatuses {
    /** Subscription is active */
    ACTIVE = 0,
    INACTIVE = 1,
    ENDING = 2
}
export declare enum PollLayoutType {
    /** The default layout type */
    DEFAULT = 1
}
export declare enum ApplicationMonetizationState {
    /** This application does not have monetization set up */
    NONE = 1,
    /** This application has monetization set up */
    ENABLED = 2,
    /** This application has been blocked from monetizing */
    BLOCKED = 3
}
export declare enum ApplicationDiscoverabilityState {
    /** This application is ineligible for the application directory */
    INELIGIBLE = 1,
    /** This application is not listed in the application directory */
    NOT_DISCOVERABLE = 2,
    /** This application is listed in the application directory */
    DISCOVERABLE = 3,
    FEATURABLE = 4,
    /** This application has been blocked from appearing in the application directory */
    BLOCKED = 5
}
export declare enum ApplicationDiscoveryEligibilityFlags {
    /** Application is verified */
    VERIFIED = 1,
    /** Application has at least one tag set */
    TAG = 2,
    /** Application has a description */
    DESCRIPTION = 4,
    /** Application has terms of service set */
    TERMS_OF_SERVICE = 8,
    /** Application has a privacy policy set */
    PRIVACY_POLICY = 16,
    /** Application has a custom install URL or install parameters */
    INSTALL_PARAMS = 32,
    /** Application's name is safe for work */
    SAFE_NAME = 64,
    /** Application's description is safe for work */
    SAFE_DESCRIPTION = 128,
    /** Application has the message content intent approved or utilizes application commands */
    APPROVED_COMMANDS = 256,
    /** Application has a support guild set */
    SUPPORT_GUILD = 512,
    /** Application's commands are safe for work */
    SAFE_COMMANDS = 1024,
    /** Application's owner has MFA enabled */
    MFA = 2048,
    /** Application's directory long description is safe for work */
    SAFE_DIRECTORY_OVERVIEW = 4096,
    /** Application has at least one supported locale set */
    SUPPORTED_LOCALES = 8192,
    /** Application's directory short description is safe for work */
    SAFE_SHORT_DESCRIPTION = 16384,
    /** Application's role connections metadata is safe for work */
    SAFE_ROLE_CONNECTIONS = 32768
}
export declare enum ApplicationExplicitContentFilterLevel {
    DISABLED = 0,
    ENABLED = 1
}
export declare enum ApplicationInteractionsVersion {
    /** Only Interaction Create events are sent as documented (default) */
    VERSION_1 = 1,
    /** A selection of chosen events are sent */
    VERSION_2 = 2
}
export declare enum ApplicationMonetizationEligibilityFlags {
    /** Application is verified */
    VERIFIED = 1,
    /** Application is owned by a team */
    HAS_TEAM = 2,
    /** Application has the message content intent approved or utilizes application commands */
    APPROVED_COMMANDS = 4,
    /** Application has terms of service set */
    TERMS_OF_SERVICE = 8,
    /** Application has a privacy policy set */
    PRIVACY_POLICY = 16,
    /** Application's name is safe for work */
    SAFE_NAME = 32,
    /** Application's description is safe for work */
    SAFE_DESCRIPTION = 64,
    /** Application's role connections metadata is safe for work */
    SAFE_ROLE_CONNECTIONS = 128,
    /** Application is not quarantined */
    NOT_QUARANTINED = 512,
    /** User's locale is supported by monetization */
    USER_LOCALE_SUPPORTED = 1024,
    /** User is old enough to use monetization */
    USER_AGE_SUPPORTED = 2048,
    /** User has a date of birth defined on their account */
    USER_DATE_OF_BIRTH_DEFINED = 4096,
    /** User has MFA enabled */
    USER_MFA_ENABLED = 8192,
    /** User's email is verified */
    USER_EMAIL_VERIFIED = 16384,
    /** All members of the team that owns the application have verified emails */
    TEAM_MEMBERS_EMAIL_VERIFIED = 32768,
    /** All members of the team that owns the application have MFA enabled */
    TEAM_MEMBERS_MFA_ENABLED = 65536,
    /** This application has no issues blocking monetization */
    NO_BLOCKING_ISSUES = 131072,
    /** Owning team has a valid payout status */
    VALID_PAYOUT_STATUS = 262144
}
export declare enum RPCApplicationState {
    /** This application does not have access to RPC */
    DISABLED = 0,
    /** This application has not yet been applied for RPC access */
    UNSUBMITTED = 1,
    /** This application has submitted a RPC access request */
    SUBMITTED = 2,
    /** This application has been approved for RPC access */
    APPROVED = 3,
    /** This application has been rejected from RPC access */
    REJECTED = 4
}
export declare enum StoreApplicationState {
    /** This application does not have a commerce license */
    NONE = 1,
    /** This application has a commerce license but has not yet submitted a store approval request */
    PAID = 2,
    /** This application has submitted a store approval request */
    SUBMITTED = 3,
    /** This application has been approved for the store */
    APPROVED = 4,
    /** This application has been rejected from the store */
    REJECTED = 5
}
export declare enum ApplicationVerificationState {
    /** This application is ineligible for verification */
    INELIGIBLE = 1,
    /** This application has not yet been applied for verification */
    UNSUBMITTED = 2,
    /** This application has submitted a verification request */
    SUBMITTED = 3,
    SUCCEEDED = 4
}
export declare enum RoleFlags {
    /** Role is part of an onboarding prompt option */
    IN_PROMPT = 1
}
export declare enum MemberSearchSortType {
    /** Sort by when the user joined the guild descending (default) */
    JOINED_AT_DESC = 1,
    /** Sort by when the user joined the guild ascending */
    JOINED_AT_ASC = 2,
    /** Sort by when the user joined Discord descending */
    USER_ID_DESC = 3,
    /** Sort by when the user joined Discord ascending */
    USER_ID_ASC = 4
}
export declare enum MemberJoinSourceType {
    /** The user joined the guild through an unknown source */
    UNSPECIFIED = 0,
    /** The user was added to the guild by a bot using the `guilds.join` OAuth2 scope */
    BOT = 1,
    /** The user was added to the guild by an integration (e.g. Twitch) */
    INTEGRATION = 2,
    /** The user joined the guild through guild discovery */
    DISCOVERY = 3,
    /** The user joined the guild through a student hub */
    HUB = 4,
    /** The user joined the guild through an invite */
    INVITE = 5,
    /** The user joined the guild through a vanity URL */
    VANITY_URL = 6,
    /** The user was accepted into the guild after applying for membership */
    MANUAL_MEMBER_VERIFICATION = 7
}
export declare enum ActivityLocationKind {
    GUILD_CHANNEL = "gc",
    PRIVATE_CHANNEL = "pc"
}
export declare enum ApplicationEventWebhookStatus {
    /** Event webhooks are disabled */
    DISABLED = 1,
    /** Event webhooks are enabled */
    ENABLED = 2,
    DISABLED_BY_DISCORD = 3
}
export declare const ApplicationEventWebhookEventTypes: readonly ["APPLICATION_AUTHORIZED", "APPLICATION_DEAUTHORIZED", "ENTITLEMENT_CREATE", "QUEST_USER_ENROLLMENT"];
export type ApplicationEventWebhookEventType = typeof ApplicationEventWebhookEventTypes[number];
export declare enum EmbedFlags {
    /** Embed was flagged as sensitive content */
    CONTAINS_EXPLICIT_MEDIA = 16,
    IS_CONTENT_INVENTORY_ENTRY = 32
}
export declare enum EmbedMediaFlags {
    IS_ANIMATED = 32
}
export declare enum SeparatorSpacingSize {
    /** 8px gap between elements, 16px with divider hidden */
    SMALL = 1,
    /** 16px gap between elements, 32px with divider hidden */
    LARGE = 2
}
export declare enum DisplayNameFont {
    /** Bangers */
    BANGERS = 1,
    /** BioRhyme */
    BIO_RHYME = 2,
    /** Cherry Bomb One */
    CHERRY_BOMB = 3,
    /** Chicle */
    CHICLE = 4,
    /** Compagnon */
    COMPAGNON = 5,
    /** MuseoModerno */
    MUSEO_MODERNO = 6,
    /** Néo-Castel */
    NEO_CASTEL = 7,
    PIXELFY = 8,
    /** Ribes */
    RIBES = 9,
    /** Sinistre */
    SINISTRE = 10,
    /** Default font */
    DEFAULT = 11,
    /** Zilla Slab */
    ZILLA_SLAB = 12
}
export declare enum DisplayNameEffect {
    /** Displays the first color provided */
    SOLID = 1,
    /** Two color gradient */
    GRADIENT = 2,
    /** Glow around the name */
    NEON = 3,
    /** Subtle vertical gradient and stroke */
    TOON = 4,
    /** Colored dropshadow */
    POP = 5,
    /** Alternate gradient style */
    GLOW = 6
}
export declare enum InviteTargetUsersJobStatus {
    /** Job status is unspecified */
    UNSPECIFIED = 0,
    /** Job is currently being processed */
    PROCESSING = 1,
    /** Job has been completed */
    COMPLETED = 2,
    /** Job has failed (see `error_message`) */
    FAILED = 3
}
export declare enum ApplicationInternalGuildRestriction {
    JOIN_ALL = 1,
    JOIN_EXTERNAL_ONLY = 2,
    JOIN_INTERNAL_ONLY = 3
}
export declare enum EmbeddedActivityOrientationLockStateType {
    /** Unrestricted orientation */
    UNLOCKED = 1,
    /** Portrait only */
    PORTRAIT = 2,
    /** Landscape only */
    LANDSCAPE = 3
}
export declare enum EmbeddedActivityLabelType {
    /** No special label */
    NONE = 0,
    /** The activity is new */
    NEW = 1,
    /** The activity has been recently updated */
    UPDATED = 2
}
export declare const EmbeddedActivityReleasePhases: readonly ["in_development", "activities_team", "employee_release", "soft_launch", "soft_launch_multi_geo", "global_launch"];
export type EmbeddedActivityReleasePhase = typeof EmbeddedActivityReleasePhases[number];
export declare const EmbeddedActivitySurfaces: readonly ["voice_launcher", "text_launcher"];
export type EmbeddedActivitySurface = typeof EmbeddedActivitySurfaces[number];
export declare const EmbeddedActivityPlatformTypes: readonly ["web", "android", "ios"];
export type EmbeddedActivityPlatformType = typeof EmbeddedActivityPlatformTypes[number];
export declare const PricingLocalizationStrategies: readonly ["localized_price_sets"];
export type PricingLocalizationStrategy = typeof PricingLocalizationStrategies[number];
export declare const OperatingSystemTypes: readonly ["windows", "osx", "linux", "android", "ios", "playstation", "xbox", "unknown"];
export type OperatingSystemType = typeof OperatingSystemTypes[number];
export declare const TeamMemberRoleTypes: readonly ["admin", "developer", "read_only"];
export type TeamMemberRoleType = typeof TeamMemberRoleTypes[number];
export declare enum ApprovableConsoleType {
    /** Xbox */
    XBOX = 1,
    /** PlayStation */
    PLAYSTATION_5 = 2,
    /** PlayStation */
    PLAYSTATION_4 = 3
}
export declare enum OverlayMethodFlags {
    /** Overlay can be rendered out of process */
    OUT_OF_PROCESS = 1
}
export declare enum TeamPayoutAccountStatus {
    /** Team has not submitted a payout account application */
    UNSUBMITTED = 1,
    /** Team's payout account application is pending approval */
    PENDING = 2,
    /** Team's payout account requires action to receive payouts */
    ACTION_REQUIRED = 3,
    /** Team's payout account is active and can receive payouts */
    ACTIVE = 4,
    /** Team's payout account is blocked and cannot receive payouts */
    BLOCKED = 5,
    /** Team's payout account is suspended and cannot receive payouts */
    SUSPENDED = 6
}
export declare enum TeamPayoutGateway {
    /** Stripe Top-Up */
    STRIPE_TOPUP = 1,
    /** Tipalti */
    TIPALTI = 2,
    /** Stripe */
    STRIPE_PRIMARY = 3
}
export declare enum ApplicationType {
    /** A game integrating with Discord through the legacy GameSDK or sold on the defunct game store */
    DEPRECATED_GAME = 1,
    /** @deprecated A music service integrating with Discord */
    MUSIC = 2,
    /** A limited application used for ticketed event SKUs */
    TICKETED_EVENTS = 3,
    /** A limited application used for creator monetization (e.g. role subscription) SKUs */
    CREATOR_MONETIZATION = 4,
    /** A game integrating with Discord */
    GAME = 5
}
export declare enum LobbyMemberFlags {
    CAN_LINK_LOBBY = 1
}
export declare enum MessageReferenceType {
    /** A standard reference used by replies and system messages */
    DEFAULT = 0,
    /** A reference used to point to a message at a point in time */
    FORWARD = 1
}
export declare enum StatusDisplayType {
    /** Display the `name` field */
    NAME = 0,
    /** Display the `state` field */
    STATE = 1,
    /** Display the `details` field */
    DETAILS = 2
}
/** The error codes that can be received. See [Discord's Documentation](https://discord.com/developers/docs/topics/opcodes-and-status-codes#json). */
export declare enum JSONErrorCodes {
    GENERAL_ERROR = 0,
    UNKNOWN_ACCOUNT = 10001,
    UNKNOWN_APPLICATION = 10002,
    UNKNOWN_CHANNEL = 10003,
    UNKNOWN_GUILD = 10004,
    UNKNOWN_INTEGRATION = 10005,
    UNKNOWN_INVITE = 10006,
    UNKNOWN_MEMBER = 10007,
    UNKNOWN_MESSAGE = 10008,
    UNKNOWN_OVERWRITE = 10009,
    UNKNOWN_PROVIDER = 10010,
    UNKNOWN_PLATFORM = 10010,
    UNKNOWN_ROLE = 10011,
    UNKNOWN_TOKEN = 10012,
    UNKNOWN_USER = 10013,
    UNKNOWN_EMOJI = 10014,
    UNKNOWN_WEBHOOK = 10015,
    UNKNOWN_WEBHOOK_SERVICE = 10016,
    UNKNOWN_SESSION = 10020,
    UNKNOWN_ASSET = 10021,
    UNKNOWN_BAN = 10026,
    UNKNOWN_SKU = 10027,
    UNKNOWN_STORE_LISTING = 10028,
    UNKNOWN_ENTITLEMENT = 10029,
    UNKNOWN_BUILD = 10030,
    UNKNOWN_LOBBY = 10031,
    UNKNOWN_BRANCH = 10032,
    UNKNOWN_STORE_DIRECTORY_LAYOUT = 10036,
    UNKNOWN_REDISTRIBUTABLE = 10037,
    UNKNOWN_GIFT_CODE = 10038,
    UNKNOWN_STREAM = 10049,
    UNKNOWN_PREMIUM_SERVER_SUBSCRIBE_COOLDOWN = 10050,
    UNKNOWN_GUILD_TEMPLATE = 10057,
    UNKNOWN_DISCOVERABLE_SERVER_CATEGORY = 10059,
    UNKNOWN_STICKER = 10060,
    UNKNOWN_INTERACTION = 10062,
    UNKNOWN_APPLICATION_COMMAND = 10063,
    UNKNOWN_APPLICATION_COMMAND_PERMISSIONS = 10066,
    UNKNOWN_STAGE_INSTANCE = 10067,
    UNKNOWN_GUILD_MEMBER_VERIFICATION_FORM = 10068,
    UNKNOWN_GUILD_WELCOME_SCREEN = 10069,
    UNKNOWN_GUILD_SCHEDULED_EVENT = 10070,
    UNKNOWN_GUILD_SCHEDULED_EVENT_USER = 10071,
    UNKNOWN_TAG = 10087,
    UNKNOWN_SOUND = 10097,
    BOT_DISALLOWED = 20001,
    BOTS_CANNOT_USE_THIS_ENDPOINT = 20001,
    BOT_REQUIRED = 20002,
    ONLY_BOTS_CAN_USE_THIS_ENDPOINT = 20002,
    RPC_PROXY_DISALLOWED = 20003,
    EXPLICIT_CONTENT = 20009,
    ACCOUNT_SCHEDULED_FOR_DELETION = 20011,
    NOT_AUTHORIZED_FOR_APPLICATION = 20012,
    ACCOUNT_DISABLED = 20013,
    SLOWMODE_RATE_LIMITED = 20016,
    ACCOUNT_OWNER_ONLY = 20018,
    CHANNEL_FOLLOWING_EDIT_RATE_LIMITED = 20022,
    UNDER_MINIMUM_AGE = 20024,
    QUARANTINED = 20026,
    CHANNEL_WRITE_RATE_LIMIT = 20028,
    GUILD_WRITE_RATE_LIMIT = 20029,
    WORDS_NOT_ALLOWED = 20031,
    VANITY_URL_REQUIRED_FOR_PUBLISHED_GUILDS = 20040,
    VANITY_URL_EMPLOYEE_ONLY_GUILD_DISABLED = 20044,
    VANITY_URL_REQUIREMENTS_NOT_MET = 20045,
    TOO_MANY_GUILDS = 30001,
    TOO_MANY_FRIENDS = 30002,
    TOO_MANY_PINS_IN_CHANNEL = 30003,
    TOO_MANY_RECIPIENTS = 30004,
    TOO_MANY_GUILD_ROLES = 30005,
    TOO_MANY_USING_USERNAME = 30006,
    TOO_MANY_WEBHOOKS = 30007,
    TOO_MANY_EMOJI = 30008,
    TOO_MANY_REACTIONS = 30010,
    TOO_MANY_GROUP_CHANNELS = 30011,
    TOO_MANY_CHANNELS = 30013,
    TOO_MANY_ATTACHMENTS = 30015,
    TOO_MANY_INVITES = 30016,
    TOO_MANY_ANIMATED_EMOJI = 30018,
    GUILD_AT_CAPACITY = 30019,
    NOT_ENOUGH_GUILD_MEMBERS = 30029,
    TOO_MANY_SERVER_CATEGORIES = 30030,
    GUILD_ALREADY_HAS_TEMPLATE = 30031,
    TOO_MANY_APPLICATION_COMMANDS = 30032,
    TOO_MANY_THREAD_MEMBERS = 30033,
    TOO_MANY_APPLICATION_COMMAND_CREATES = 30034,
    TOO_MANY_BANS_FOR_NON_GUILD_MEMBERS = 30035,
    TOO_MANY_BAN_FETCHES = 30037,
    TOO_MANY_UNCOMPLETED_GUILD_SCHEDULED_EVENTS = 30038,
    TOO_MANY_STICKERS = 30039,
    TOO_MANY_PRUNE_REQUESTS = 30040,
    TOO_MANY_GUILD_WIDGET_SETTINGS_UPDATES = 30042,
    TOO_MANY_SOUNDBOARD_SOUNDS = 30045,
    MAXIMUM_NUMBER_OR_EDITS_TO_MESSAGES_OLDER_THAN_1_HOUR = 30046,
    TOO_MANY_PINNED_THREADS = 30047,
    TOO_MANY_FORUM_TAGS = 30048,
    BITRATE_TOO_HIGH = 30052,
    TOO_MANY_PREMIUM_EMOJIS = 30056,
    TOO_MANY_GUILD_WEBHOOKS = 30058,
    TOO_MANY_BLOCKED_USERS = 30059,
    TOO_MANY_PUBLISHED_PRODUCT_LISTINGS = 30065,
    RESOURCE_RATE_LIMITED = 31002,
    UNAUTHORIZED = 40001,
    EMAIL_VERIFICATION_REQUIRED = 40002,
    RATE_LIMIT_DM_OPEN = 40003,
    DIRECT_MESSAGES_RATE_LIMIT = 40003,
    SENDING_MESSAGES_TEMPORARILY_DISABLED = 40004,
    ENTITY_TOO_LARGE = 40005,
    REQUEST_ENTITY_TOO_LARGE = 40005,
    ENTITY_EMPTY = 40006,
    FEATURE_TEMPORARILY_DISABLED = 40006,
    USER_BANNED = 40007,
    CONNECTION_REVOKED = 40012,
    DELETE_ACCOUNT_TRANSFER_TEAM_OWNERSHIP = 40028,
    TARGET_USER_NOT_CONNECTED_TO_VOICE = 40032,
    ALREADY_CROSSPOSTED = 40033,
    APPLICATION_COMMAND_ALREADY_EXISTS = 40041,
    INTERACTION_FAILED_TO_SEND = 40043,
    CANNOT_SEND_MESSAGES_IN_FORUM_CHANNEL = 40058,
    INTERACTION_ALREADY_ACKNOWLEDGED = 40060,
    TAG_NAMES_MUST_BE_UNIQUE = 40061,
    SERVICE_RESOURCE_RATE_LIMITED = 40062,
    NON_MODERATED_TAG_REQUIRED = 40066,
    TAG_REQUIRED = 40067,
    USER_QUARANTINED = 40068,
    INVITES_DISABLED = 40069,
    ENTITLEMENT_ALREADY_GRANTED = 40074,
    CLOUDFLARE_BLOCKING_REQUEST = 40333,
    INVALID_ACCESS = 50001,
    MISSING_ACCESS = 50001,
    INVALID_ACCOUNT_TYPE = 50002,
    INVALID_ACTION_DM = 50003,
    INVALID_EMBED_DISABLED = 50004,
    INVALID_MESSAGE_AUTHOR = 50005,
    INVALID_MESSAGE_EMPTY = 50006,
    INVALID_MESSAGE_SEND_USER = 50007,
    INVALID_MESSAGE_SEND_NON_TEXT = 50008,
    INVALID_MESSAGE_VERIFICATION_LEVEL = 50009,
    INVALID_OAUTH_APP_BOT = 50010,
    INVALID_OAUTH_APP_LIMIT = 50011,
    INVALID_OAUTH_STATE = 50012,
    INVALID_PERMISSIONS = 50013,
    INVALID_TOKEN = 50014,
    INVALID_NOTE = 50015,
    INVALID_BULK_DELETE_COUNT = 50016,
    INVALID_MFA_LEVEL = 50017,
    INVALID_PASSWORD = 50018,
    INVALID_PIN_MESSAGE_CHANNEL = 50019,
    INVALID_INVITE_CODE = 50020,
    CANNOT_EXECUTE_ON_SYSTEM_MESSAGE = 50021,
    INVALID_PHONE_NUMBER = 50022,
    INVALID_CLIENT_ID = 50023,
    INVALID_CHANNEL_TYPE = 50024,
    INVALID_OAUTH2_ACCESS_TOKEN = 50025,
    INVALID_OAUTH2_MISSING_SCOPE = 50026,
    INVALID_WEBHOOK_TOKEN = 50027,
    INVALID_ROLE = 50028,
    INVALID_RECIPIENTS = 50033,
    BULK_DELETE_MESSAGE_TOO_OLD = 50034,
    INVALID_FORM_BODY = 50035,
    INVITE_ACCEPTED_TO_GUILD_NOT_CONTAINING_BOT = 50036,
    INVALID_ACTIVITY_ACTION = 500039,
    INVALID_API_VERSION = 50041,
    INVALID_FILE_ASSET_SIZE = 50045,
    INVALID_FILE_ASSET = 50046,
    INVALID_GIFT_REDEMPTION_EXHAUSTED = 50050,
    INVALID_GIFT_REDEMPTION_OWNED = 50051,
    INVALID_GIFT_SELF_REDEMPTION = 50054,
    INVALID_GUILD = 50055,
    INVALID_REQUEST_ORIGIN = 50067,
    INVALID_MESSAGE_TYPE = 50068,
    PAYMENT_SOURCE_REQUIRED = 50070,
    CANNOT_MODIFY_SYSTEM_WEBHOOK = 50073,
    CANNOT_DELETE_COMMUNITY_REQUIRED_CHANNEL = 50074,
    CANNOT_EDIT_MESSAGE_STICKERS = 50080,
    INVALID_STICKER_SENT = 50081,
    THREAD_ARCHIVED = 50083,
    INVALID_THREAD_NOTIFICATION_SETTINGS = 50084,
    BEFORE_EARLIER_THAN_THREAD_CREATION_DATE = 50085,
    COMMUNITY_CHANNELS_MUST_BE_TEXT = 50086,
    INVALID_COUNTRY_CODE = 50095,
    INVALID_CANNOT_FRIEND_SELF = 50096,
    INVALID_GIFT_REDEMPTION_FRAUD_REJECTED = 50097,
    MONETIZATION_REQUIRED = 50097,
    BOOSTS_REQUIRED = 50101,
    INVALID_USER_SETTINGS_DATA = 50105,
    INVALID_ACTIVITY_LAUNCH_NO_ACCESS = 50106,
    INVALID_ACTIVITY_LAUNCH_PREMIUM_TIER = 50107,
    INVALID_ACTIVITY_LAUNCH_CONCURRENT_ACTIVITIES = 50108,
    INVALID_JSON = 50109,
    INVALID_PROVIDED_FILE = 50110,
    INVALID_PROVIDED_FILE_TYPE = 50123,
    INVALID_PROVIDED_FILE_DURATION = 50124,
    OWNER_CANNOT_BE_PENDING_MEMBER = 50131,
    OWNERSHIP_CANNOT_BE_TRANSFERRED_TO_BOT = 50132,
    INVALID_FILE_ASSET_SIZE_RESIZE_GIF = 50138,
    CANNOT_MIX_SUBSCRIPTION_AND_NON_SUBSCRIPTION_ROLES = 50144,
    CANNOT_CONVERT_BETWEEN_PREMIUM_AND_NORMAL_EMOJI = 50145,
    UPLOADED_FILE_NOT_FOUND = 50146,
    INVALID_SPECIFIED_EMOJI = 50151,
    INVALID_ACTIVITY_LAUNCH_AFK_CHANNEL = 50148,
    VOICE_MESSAGES_DO_NOT_SUPPORT_ADDITIONAL_CONTENT = 50159,
    VOICE_MESSAGES_MUST_HAVE_A_SINGLE_AUDIO_ATTACHMENT = 50160,
    VOICE_MESSAGES_MUST_HAVE_SUPPORTING_METADATA = 50161,
    VOICE_MESSAGES_CANNOT_BE_EDITED = 50162,
    CANNOT_DELETE_GUILD_SUBSCRIPTION_INTEGRATION = 50163,
    NEW_OWNER_INELIGIBLE_FOR_SERVER_SUBSCRIPTION = 50164,
    INVALID_ACTIVITY_LAUNCH_AGE_GATED = 50165,
    CANNOT_SEND_VOICE_MESSAGES_IN_CHANNEL = 50173,
    USER_MUST_FIRST_BE_VERIFIED = 50178,
    PROVIDED_FILE_HAS_INVALID_DURATION = 50192,
    INVALID_SKU_ATTACHMENT_NO_ARCHIVES = 50186,
    NO_PERMISSION_TO_SEND_STICKER = 50600,
    MFA_ENABLED = 60001,
    MFA_DISABLED = 60002,
    MFA_REQUIRED = 60003,
    MFA_UNVERIFIED = 60004,
    MFA_INVALID_SECRET = 60005,
    MFA_INVALID_TICKET = 60006,
    MFA_INVALID_CODE = 60008,
    MFA_INVALID_SESSION = 60009,
    PHONE_NUMBER_UNABLE_TO_SEND = 70003,
    PHONE_VERIFICATION_REQUIRED = 70007,
    RELATIONSHIP_INCOMING_DISABLED = 80000,
    RELATIONSHIP_INCOMING_BLOCKED = 80001,
    RELATIONSHIP_INVALID_USER_BOT = 80002,
    RELATIONSHIP_INVALID_SELF = 80003,
    RELATIONSHIP_INVALID_DISCORD_TAG = 80004,
    RELATIONSHIP_ALREADY_FRIENDS = 80007,
    REACTION_BLOCKED = 90001,
    USER_CANNOT_USE_BURST_REACTIONS = 90002,
    INVALID_GIFT_REDEMPTION_SUBSCRIPTION_MANAGED = 100021,
    INVALID_GIFT_REDEMPTION_SUBSCRIPTION_INCOMPATIBLE = 100023,
    INVALID_GIFT_REDEMPTION_INVOICE_OPEN = 100024,
    INELIGIBLE_FOR_SUBSCRIPTION = 100053,
    BILLING_NON_REFUNDABLE_PAYMENT_SOURCE = 100060,
    INDEX_NOT_YET_AVAILABLE = 110000,
    APPLICATION_NOT_AVAILABLE = 110001,
    LISTING_ALREADY_JOINED = 120000,
    LISTING_TOO_MANY_MEMBERS = 120001,
    LISTING_JOIN_BLOCKED = 120002,
    API_RESOURCE_IS_CURRENTLY_OVERLOADED = 130000,
    STAGE_ALREADY_OPEN = 150006,
    CANNOT_REPLY_WITHOUT_READ_MESSAGE_HISTORY = 160002,
    THREAD_ALREADY_CREATED_FOR_MESSAGE = 160004,
    THREAD_IS_LOCKED = 160005,
    TOO_MANY_THREADS = 160006,
    TOO_MANY_ANNOUNCEMENT_THREADS = 160007,
    INVALID_LOTTIE_JSON = 170001,
    UPLOADED_LOTTIE_RASTERIZED = 170002,
    STICKER_MAXIMUM_FRAMERATE_EXCEEDED = 170003,
    STICKER_FRAME_COUNT_EXCEEDS_MAXIMUM = 170004,
    LOTTIE_ANIMATION_MAXIMUM_DIMENSIONS_EXCEEDED = 170005,
    STICKER_FRAME_RATE_TOO_SMALL_OR_LARGE = 170006,
    STICKER_ANIMATION_DURATION_TOO_LONG = 170007,
    POGGERMODE_TEMPORARILY_DISABLED = 170008,
    CANNOT_UPDATE_FINISHED_EVENT = 180000,
    FAILED_TO_CREATE_STAGE_INSTANCE = 180002,
    AUTOMOD_MESSAGE_BLOCKED = 200000,
    AUTOMOD_TITLE_BLOCKED = 200001,
    AUTOMOD_INVALID_RUST_SERVICE_RESPONSE = 200002,
    MONETIZATION_TERMS_NOT_ACCEPTED = 210003,
    TWO_FA_NOT_ENABLED = 210011,
    GUILD_PRODUCT_LISTING_CANNOT_PUBLISH_WITHOUT_BENEFIT = 210021,
    CREATOR_MONETIZATION_PAYMENT_TEAM_REQUIRED = 210026,
    CREATOR_MONETIZATION_PAYMENT_ACCOUNT_VERIFICATION_REQUIRED = 210027,
    WEBHOOKS_POSTED_TO_FORUM_CHANNELS_MUST_HAVE_THREAD_NAME_OR_THREAD_ID = 220001,
    WEBHOOKS_POSTED_TO_FORUM_CHANNELS_CANNOT_HAVE_BOTH_THREAD_NAME_AND_THREAD_ID = 220002,
    WEBHOOKS_CAN_ONLY_CREATE_THREADS_IN_FORUM_CHANNELS = 220003,
    WEBHOOK_SERVICES_CANNOT_BE_USED_IN_FORUM_CHANNELS = 220004,
    MESSAGE_BLOCKED_BY_HARMFUL_LINKS_FILTER = 220005,
    HARMFUL_LINK_MESSAGE_BLOCKED = 240000,
    CLYDE_CONSENT_REQUIRED = 310000,
    CLYDE_UNSAFE_PERSONALITY = 310003,
    USER_LIMITED_ACCESS_DEFAULT = 340000,
    USER_FRIEND_REQUEST_LIMITED_ACCESS = 340007,
    USER_LIMITED_ACCESS_MAX = 349999,
    CANNOT_ENABLE_ONBOARDING_REQUIREMENTS_NOT_MET = 350000,
    CANNOT_ENABLE_ONBOARDING_BELOW_REQUIREMENTS = 350001,
    GUILD_LIMITED_ACCESS_DEFAULT = 400000,
    GUILD_FILE_UPLOAD_RATE_LIMITED_ACCESS = 400001,
    GUILD_JOIN_INVITE_LIMITED_ACCESS = 400002,
    GUILD_GO_LIVE_LIMITED_ACCESS = 400003,
    GUILD_LIMITED_ACCESS_MAX = 409999,
    FAILED_TO_BAN_USERS = 500000,
    POLL_VOTING_BLOCKED = 520000,
    POLL_EXPIRED = 520001,
    INVALID_CHANNEL_TYPE_FOR_POLL_CREATION = 520002,
    CANNOT_EDIT_POLL_MESSAGE = 520003,
    CANNOT_USE_AN_EMOJI_INCLUDED_WITH_THE_POLL = 520004,
    CANNOT_EXPIRE_A_NON_POLL_MESSAGE = 520006,
    POLL_IS_ALREADY_EXPIRED = 520007,
    APPLICATION_PROVISIONAL_ACCOUNTS_NOT_GRANTED = 530000,
    JWT_TOKEN_EXPIRED = 530001,
    JWT_TOKEN_ISSUER_MISMATCH = 530002,
    JWT_TOKEN_AUDIENCE_MISMATCH = 530003,
    JWT_TOKEN_ISSUED_TOO_LONG_AGO = 530004,
    UNIQUE_USERNAME_GENERATION_FAILED = 530006,
    CLIENT_SECRET_INVALID = 530007
}
