"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntegrationTypes = exports.ConnectionServices = exports.ConnectionVisibilityTypes = exports.ThreadAutoArchiveDurations = exports.VideoQualityModes = exports.OverwriteTypes = exports.ThreadOnlyChannelTypes = exports.InteractionChannelTypes = exports.InviteChannelTypes = exports.DMInviteChannelTypes = exports.GuildInviteChannelTypes = exports.VoiceChannelTypes = exports.TextableGuildChannelsWithoutThreadsTypes = exports.TextableChannelsWithoutThreadsTypes = exports.TextableGuildChannelTypes = exports.TextableChannelTypes = exports.EditableChannelTypes = exports.PrivateChannelTypes = exports.GuildChannelsWithoutThreadsTypes = exports.ThreadChannelTypes = exports.GuildChannelTypes = exports.ImplementedChannelTypes = exports.NotImplementedChannelTypes = exports.AnyChannelTypes = exports.ChannelTypes = exports.StickerFormatTypes = exports.StickerTypes = exports.SystemChannelFlags = exports.PremiumTiers = exports.GuildNSFWLevels = exports.VerificationLevels = exports.MFALevels = exports.ExplicitContentFilterLevels = exports.DefaultMessageNotificationLevels = exports.GuildFeatures = exports.ApplicationFlags = exports.InteractionContextTypes = exports.ApplicationIntegrationTypes = exports.UserFlags = exports.PremiumTypes = exports.WebhookTypes = exports.ImageFormats = exports.RESTMethods = exports.MEDIA_PROXY_SIZES = exports.USER_AGENT = exports.VERSION = exports.API_URL = exports.BASE_URL = exports.REST_VERSION = exports.GATEWAY_VERSION = void 0;
exports.PrivilegedIntents = exports.AllNonPrivilegedIntents = exports.NonPrivilegedIntents = exports.Intents = exports.EntryPointCommandHandlerTypes = exports.InteractionResponseTypes = exports.ApplicationCommandPermissionTypes = exports.ApplicationCommandOptionTypes = exports.ApplicationCommandTypes = exports.AuditLogActionTypes = exports.AutoModerationActionTypes = exports.AutoModerationKeywordPresetTypes = exports.AutoModerationTriggerTypes = exports.AutoModerationEventTypes = exports.StageInstancePrivacyLevels = exports.GuildScheduledEventEntityTypes = exports.GuildScheduledEventStatuses = exports.GuildScheduledEventPrivacyLevels = exports.InviteTargetTypes = exports.InviteTypes = exports.InteractionTypes = exports.MessageActivityTypes = exports.UndeletableMessageTypes = exports.MessageTypes = exports.MessageFlags = exports.TextInputStyles = exports.ButtonStyles = exports.ComponentTypes = exports.OAuthScopes = exports.TeamMembershipState = exports.ForumLayoutTypes = exports.SortOrderTypes = exports.ChannelFlags = exports.PermissionNames = exports.AllModeratorPermissionNames = exports.AllModeratorPermissions = exports.ModeratorPermissions = exports.AllStagePermissionNames = exports.AllStagePermissions = exports.StagePermissions = exports.AllVoicePermissionNames = exports.AllVoicePermissions = exports.VoicePermissions = exports.AllTextPermissionNames = exports.AllTextPermissions = exports.TextPermissions = exports.AllPermissions = exports.PermissionValueToName = exports.Permissions = exports.IntegrationExpireBehaviors = void 0;
exports.EmbeddedActivityLabelType = exports.EmbeddedActivityOrientationLockStateType = exports.ApplicationInternalGuildRestriction = exports.InviteTargetUsersJobStatus = exports.DisplayNameEffect = exports.DisplayNameFont = exports.SeparatorSpacingSize = exports.EmbedMediaFlags = exports.EmbedFlags = exports.ApplicationEventWebhookEventTypes = exports.ApplicationEventWebhookStatus = exports.ActivityLocationKind = exports.MemberJoinSourceType = exports.MemberSearchSortType = exports.RoleFlags = exports.ApplicationVerificationState = exports.StoreApplicationState = exports.RPCApplicationState = exports.ApplicationMonetizationEligibilityFlags = exports.ApplicationInteractionsVersion = exports.ApplicationExplicitContentFilterLevel = exports.ApplicationDiscoveryEligibilityFlags = exports.ApplicationDiscoverabilityState = exports.ApplicationMonetizationState = exports.PollLayoutType = exports.SubscriptionStatuses = exports.SKUAccessTypes = exports.EntitlementOwnerTypes = exports.EntitlementTypes = exports.SKUFlags = exports.SKUTypes = exports.AttachmentFlags = exports.ReactionType = exports.InviteFlags = exports.OnboardingModes = exports.AnimationTypes = exports.OnboardingPromptTypes = exports.GuildMemberFlags = exports.RoleConnectionMetadataTypes = exports.ThreadMemberFlags = exports.ActivityFlags = exports.ActivityTypes = exports.HubTypes = exports.VoiceCloseCodes = exports.VoiceOPCodes = exports.GatewayCloseCodes = exports.GatewayOPCodes = exports.PrivilegedIntentMapping = exports.AllIntents = exports.AllPrivilegedIntents = void 0;
exports.JSONErrorCodes = exports.StatusDisplayType = exports.MessageReferenceType = exports.LobbyMemberFlags = exports.ApplicationType = exports.TeamPayoutGateway = exports.TeamPayoutAccountStatus = exports.OverlayMethodFlags = exports.ApprovableConsoleType = exports.TeamMemberRoleTypes = exports.OperatingSystemTypes = exports.PricingLocalizationStrategies = exports.EmbeddedActivityPlatformTypes = exports.EmbeddedActivitySurfaces = exports.EmbeddedActivityReleasePhases = void 0;
const tslib_1 = require("tslib");
const package_json_1 = tslib_1.__importDefault(require("../package.json"));
exports.GATEWAY_VERSION = 10;
exports.REST_VERSION = 10;
exports.BASE_URL = "https://discord.com";
exports.API_URL = `${exports.BASE_URL}/api/v${exports.REST_VERSION}`;
exports.VERSION = package_json_1.default.version;
exports.USER_AGENT = `Oceanic/${exports.VERSION} (https://github.com/OceanicJS/Oceanic)`;
exports.MEDIA_PROXY_SIZES = [
    16, 20, 22, 24, 28, 32, 40, 44, 48, 56, 60, 64, 80, 96, 100,
    128, 160, 240, 256, 300, 320, 480, 512, 600, 640, 1024, 1280, 1536,
    2048, 3072, 4096
];
exports.RESTMethods = [
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE"
];
exports.ImageFormats = [
    "jpg",
    "jpeg",
    "png",
    "webp",
    "gif"
];
var WebhookTypes;
(function (WebhookTypes) {
    /** Incoming webhooks can post messages to channels with a generated token */
    WebhookTypes[WebhookTypes["INCOMING"] = 1] = "INCOMING";
    /** Channel Follower webhooks are internal webhooks used to post new messages into channels */
    WebhookTypes[WebhookTypes["CHANNEL_FOLLOWER"] = 2] = "CHANNEL_FOLLOWER";
    /** Application webhooks are webhooks used with interactions */
    WebhookTypes[WebhookTypes["APPLICATION"] = 3] = "APPLICATION";
})(WebhookTypes || (exports.WebhookTypes = WebhookTypes = {}));
var PremiumTypes;
(function (PremiumTypes) {
    /** No Nitro. Also returned when the OAuth request did not include the approved `identify.premium` scope. */
    PremiumTypes[PremiumTypes["NONE"] = 0] = "NONE";
    /** Nitro Classic */
    PremiumTypes[PremiumTypes["NITRO_CLASSIC"] = 1] = "NITRO_CLASSIC";
    /** Nitro */
    PremiumTypes[PremiumTypes["NITRO"] = 2] = "NITRO";
    /** Nitro Basic */
    PremiumTypes[PremiumTypes["NITRO_BASIC"] = 3] = "NITRO_BASIC";
})(PremiumTypes || (exports.PremiumTypes = PremiumTypes = {}));
// @TODO: bigints?
var UserFlags;
(function (UserFlags) {
    /** Discord Staff */
    UserFlags[UserFlags["STAFF"] = 1] = "STAFF";
    /** Partnered Server Owner */
    UserFlags[UserFlags["PARTNER"] = 2] = "PARTNER";
    /** HypeSquad Events */
    UserFlags[UserFlags["HYPESQUAD"] = 4] = "HYPESQUAD";
    /** Level 1 Discord Bug Hunter */
    UserFlags[UserFlags["BUG_HUNTER_LEVEL_1"] = 8] = "BUG_HUNTER_LEVEL_1";
    /** SMS enabled as a multi-factor authentication backup */
    UserFlags[UserFlags["MFA_SMS"] = 16] = "MFA_SMS";
    /** User has dismissed the current premium (Nitro) promotion */
    UserFlags[UserFlags["PREMIUM_PROMO_DISMISSED"] = 32] = "PREMIUM_PROMO_DISMISSED";
    UserFlags[UserFlags["HYPESQUAD_BRAVERY"] = 64] = "HYPESQUAD_BRAVERY";
    UserFlags[UserFlags["HYPESQUAD_BRILLIANCE"] = 128] = "HYPESQUAD_BRILLIANCE";
    UserFlags[UserFlags["HYPESQUAD_BALANCE"] = 256] = "HYPESQUAD_BALANCE";
    UserFlags[UserFlags["EARLY_SUPPORTER"] = 512] = "EARLY_SUPPORTER";
    UserFlags[UserFlags["PSEUDO_TEAM_USER"] = 1024] = "PSEUDO_TEAM_USER";
    /** User is registered on Discord's HubSpot customer platform, used for official Discord programs (e.g. partner) */
    UserFlags[UserFlags["IS_HUBSPOT_CONTACT"] = 2048] = "IS_HUBSPOT_CONTACT";
    /** @deprecated User is a system user (i.e. official Discord account) */
    UserFlags[UserFlags["SYSTEM"] = 4096] = "SYSTEM";
    /** User has unread urgent system messages; an urgent message is one sent from Trust and Safety */
    UserFlags[UserFlags["HAS_UNREAD_URGENT_MESSAGES"] = 8192] = "HAS_UNREAD_URGENT_MESSAGES";
    /** Level 2 Discord Bug Hunter */
    UserFlags[UserFlags["BUG_HUNTER_LEVEL_2"] = 16384] = "BUG_HUNTER_LEVEL_2";
    /** User is scheduled for deletion for being under the minimum required age */
    UserFlags[UserFlags["UNDERAGE_DELETED"] = 32768] = "UNDERAGE_DELETED";
    /** Verified Bot */
    UserFlags[UserFlags["VERIFIED_BOT"] = 65536] = "VERIFIED_BOT";
    /** Early Verified Bot Developer */
    UserFlags[UserFlags["VERIFIED_DEVELOPER"] = 131072] = "VERIFIED_DEVELOPER";
    /** Moderator Programs Alumni */
    UserFlags[UserFlags["CERTIFIED_MODERATOR"] = 262144] = "CERTIFIED_MODERATOR";
    /** Bot uses only HTTP interactions and is shown in the online member list */
    UserFlags[UserFlags["BOT_HTTP_INTERACTIONS"] = 524288] = "BOT_HTTP_INTERACTIONS";
    /** User is marked as a spammer and has their messages collapsed in the UI */
    UserFlags[UserFlags["SPAMMER"] = 1048576] = "SPAMMER";
    /** @deprecated User has manually disabled premium (Nitro) features */
    UserFlags[UserFlags["DISABLE_PREMIUM"] = 2097152] = "DISABLE_PREMIUM";
    /** @deprecated Active Developer */
    UserFlags[UserFlags["ACTIVE_DEVELOPER"] = 4194304] = "ACTIVE_DEVELOPER";
    /** User is a provisional account used with the social layer integration */
    UserFlags[UserFlags["PROVISIONAL_ACCOUNT"] = 8388608] = "PROVISIONAL_ACCOUNT";
    /** User has their global ratelimit raised to 1,200 requests per second */
    UserFlags[UserFlags["HIGH_GLOBAL_RATE_LIMIT"] = 8589934592] = "HIGH_GLOBAL_RATE_LIMIT";
    /** User's account is deleted */
    UserFlags[UserFlags["DELETED"] = 17179869184] = "DELETED";
    /** User's account is disabled for suspicious activity and must reset their password to regain access */
    UserFlags[UserFlags["DISABLED_SUSPICIOUS_ACTIVITY"] = 34359738368] = "DISABLED_SUSPICIOUS_ACTIVITY";
    /** User deleted their own account */
    UserFlags[UserFlags["SELF_DELETED"] = 68719476736] = "SELF_DELETED";
    /** @deprecated User has a premium (Nitro) custom discriminator */
    UserFlags[UserFlags["PREMIUM_DISCRIMINATOR"] = 137438953472] = "PREMIUM_DISCRIMINATOR";
    /** User has used the desktop client */
    UserFlags[UserFlags["USED_DESKTOP_CLIENT"] = 274877906944] = "USED_DESKTOP_CLIENT";
    /** User has used the web client */
    UserFlags[UserFlags["USED_WEB_CLIENT"] = 549755813888] = "USED_WEB_CLIENT";
    /** User has used the mobile client */
    UserFlags[UserFlags["USED_MOBILE_CLIENT"] = 1099511627776] = "USED_MOBILE_CLIENT";
    /** User's account is disabled */
    UserFlags[UserFlags["DISABLED"] = 2199023255552] = "DISABLED";
    UserFlags[UserFlags["VERIFIED_EMAIL"] = 8796093022208] = "VERIFIED_EMAIL";
    /** User is quarantined and cannot create DMs or accept invites */
    UserFlags[UserFlags["QUARANTINED"] = 17592186044416] = "QUARANTINED";
    /** User is eligible for early access to unique usernames */
    UserFlags[UserFlags["PREMIUM_ELIGIBLE_FOR_UNIQUE_USERNAME"] = 140737488355328] = "PREMIUM_ELIGIBLE_FOR_UNIQUE_USERNAME";
    /** User is a collaborator and is considered staff */
    UserFlags[UserFlags["COLLABORATOR"] = 1125899906842624] = "COLLABORATOR";
    /** User is a restricted collaborator and is considered staff */
    UserFlags[UserFlags["RESTRICTED_COLLABORATOR"] = 2251799813685248] = "RESTRICTED_COLLABORATOR";
})(UserFlags || (exports.UserFlags = UserFlags = {}));
var ApplicationIntegrationTypes;
(function (ApplicationIntegrationTypes) {
    /** Guild installation context */
    ApplicationIntegrationTypes[ApplicationIntegrationTypes["GUILD_INSTALL"] = 0] = "GUILD_INSTALL";
    /** User installation context */
    ApplicationIntegrationTypes[ApplicationIntegrationTypes["USER_INSTALL"] = 1] = "USER_INSTALL";
})(ApplicationIntegrationTypes || (exports.ApplicationIntegrationTypes = ApplicationIntegrationTypes = {}));
var InteractionContextTypes;
(function (InteractionContextTypes) {
    /** The interaction can be triggered within guilds */
    InteractionContextTypes[InteractionContextTypes["GUILD"] = 0] = "GUILD";
    /** The interaction can be triggered within DM channel with the application */
    InteractionContextTypes[InteractionContextTypes["BOT_DM"] = 1] = "BOT_DM";
    /** The interaction can be triggered in all DM and group DMs */
    InteractionContextTypes[InteractionContextTypes["PRIVATE_CHANNEL"] = 2] = "PRIVATE_CHANNEL";
})(InteractionContextTypes || (exports.InteractionContextTypes = InteractionContextTypes = {}));
var ApplicationFlags;
(function (ApplicationFlags) {
    /** Embedded application is released to the public (see also release phases) */
    ApplicationFlags[ApplicationFlags["EMBEDDED_RELEASED"] = 2] = "EMBEDDED_RELEASED";
    /** Application can create managed emoji */
    ApplicationFlags[ApplicationFlags["MANAGED_EMOJI"] = 4] = "MANAGED_EMOJI";
    /** Embedded application can use in-app purchases */
    ApplicationFlags[ApplicationFlags["EMBEDDED_IAP"] = 8] = "EMBEDDED_IAP";
    /** Application can create group DMs without limit */
    ApplicationFlags[ApplicationFlags["GROUP_DM_CREATE"] = 16] = "GROUP_DM_CREATE";
    /** Application can use the `rpc` scope without limitation */
    ApplicationFlags[ApplicationFlags["RPC_PRIVATE_BETA"] = 32] = "RPC_PRIVATE_BETA";
    ApplicationFlags[ApplicationFlags["APPLICATION_AUTO_MODERATION_RULE_CREATE_BADGE"] = 64] = "APPLICATION_AUTO_MODERATION_RULE_CREATE_BADGE";
    /** Application has its game profile page disabled */
    ApplicationFlags[ApplicationFlags["GAME_PROFILE_DISABLED"] = 128] = "GAME_PROFILE_DISABLED";
    /** @deprecated Application can use activity assets */
    ApplicationFlags[ApplicationFlags["ALLOW_ASSETS"] = 256] = "ALLOW_ASSETS";
    /** Application's OAuth2 credentials are considered public and a client secret is not required */
    ApplicationFlags[ApplicationFlags["PUBLIC_OAUTH2_CLIENT"] = 256] = "PUBLIC_OAUTH2_CLIENT";
    /** @deprecated Application can enable spectating activities */
    ApplicationFlags[ApplicationFlags["ALLOW_ACTIVITY_ACTION_SPECTATE"] = 512] = "ALLOW_ACTIVITY_ACTION_SPECTATE";
    /** Embedded application's activity can be launched without a context */
    ApplicationFlags[ApplicationFlags["CONTEXTLESS_ACTIVITY"] = 512] = "CONTEXTLESS_ACTIVITY";
    /** @deprecated Application can enable activity join requests */
    ApplicationFlags[ApplicationFlags["ALLOW_ACTIVITY_ACTION_JOIN_REQUEST"] = 1024] = "ALLOW_ACTIVITY_ACTION_JOIN_REQUEST";
    /** Application has limited access to the social layer SDK */
    ApplicationFlags[ApplicationFlags["SOCIAL_LAYER_INTEGRATION_LIMITED"] = 1024] = "SOCIAL_LAYER_INTEGRATION_LIMITED";
    /** Application is trialing cloud gaming features */
    ApplicationFlags[ApplicationFlags["CLOUD_GAMING_DEMO"] = 2048] = "CLOUD_GAMING_DEMO";
    /** Intent required for bots in 100 or more guilds to receive Presence Update Gateway events */
    ApplicationFlags[ApplicationFlags["GATEWAY_PRESENCE"] = 4096] = "GATEWAY_PRESENCE";
    /** Intent required for bots in under 100 guilds to receive Presence Update Gateway events */
    ApplicationFlags[ApplicationFlags["GATEWAY_PRESENCE_LIMITED"] = 8192] = "GATEWAY_PRESENCE_LIMITED";
    /** Intent required for bots in 100 or more guilds to receive guild member-related events like Guild Member Add */
    ApplicationFlags[ApplicationFlags["GATEWAY_GUILD_MEMBERS"] = 16384] = "GATEWAY_GUILD_MEMBERS";
    /** Intent required for bots in under 100 guilds to receive guild member-related events like Guild Member Add */
    ApplicationFlags[ApplicationFlags["GATEWAY_GUILD_MEMBERS_LIMITED"] = 32768] = "GATEWAY_GUILD_MEMBERS_LIMITED";
    /** Indicates unusual growth of an application that prevents verification */
    ApplicationFlags[ApplicationFlags["VERIFICATION_PENDING_GUILD_LIMIT"] = 65536] = "VERIFICATION_PENDING_GUILD_LIMIT";
    /** Application can be embedded within the Discord client */
    ApplicationFlags[ApplicationFlags["EMBEDDED"] = 131072] = "EMBEDDED";
    /** Intent required for bots in 100 or more guilds to receive message content */
    ApplicationFlags[ApplicationFlags["GATEWAY_MESSAGE_CONTENT"] = 262144] = "GATEWAY_MESSAGE_CONTENT";
    /** Intent required for bots in under 100 guilds to receive message content */
    ApplicationFlags[ApplicationFlags["GATEWAY_MESSAGE_CONTENT_LIMITED"] = 524288] = "GATEWAY_MESSAGE_CONTENT_LIMITED";
    /** Embedded application is created by Discord */
    ApplicationFlags[ApplicationFlags["EMBEDDED_FIRST_PARTY"] = 1048576] = "EMBEDDED_FIRST_PARTY";
    ApplicationFlags[ApplicationFlags["APPLICATION_COMMAND_MIGRATED"] = 2097152] = "APPLICATION_COMMAND_MIGRATED";
    /** Application has registered global application commands */
    ApplicationFlags[ApplicationFlags["APPLICATION_COMMAND_BADGE"] = 8388608] = "APPLICATION_COMMAND_BADGE";
    /** Application has had at least one global application command used in the last 30 days */
    ApplicationFlags[ApplicationFlags["ACTIVE"] = 16777216] = "ACTIVE";
    /** Application has not had any global application commands used in the last 30 days and has lost the `ACTIVE` flag */
    ApplicationFlags[ApplicationFlags["ACTIVE_GRACE_PERIOD"] = 33554432] = "ACTIVE_GRACE_PERIOD";
    /** Application can use IFrames within modals */
    ApplicationFlags[ApplicationFlags["IFRAME_MODAL"] = 67108864] = "IFRAME_MODAL";
    /** Application can use the social layer SDK */
    ApplicationFlags[ApplicationFlags["SOCIAL_LAYER_INTEGRATION"] = 134217728] = "SOCIAL_LAYER_INTEGRATION";
    /** Application is promoted by Discord in the application directory */
    ApplicationFlags[ApplicationFlags["PROMOTED"] = 268435456] = "PROMOTED";
    /** Application is a Discord partner */
    ApplicationFlags[ApplicationFlags["PARTNER"] = 536870912] = "PARTNER";
    /** Application is a parent of a child application */
    ApplicationFlags[ApplicationFlags["PARENT"] = 8589934592] = "PARENT";
    /** Application cannot access relationship information */
    ApplicationFlags[ApplicationFlags["DISABLE_RELATIONSHIP_ACCESS"] = 17179869184] = "DISABLE_RELATIONSHIP_ACCESS";
})(ApplicationFlags || (exports.ApplicationFlags = ApplicationFlags = {}));
exports.GuildFeatures = [
    "ACTIVITIES_ALPHA",
    "ACTIVITIES_EMPLOYEE",
    "ACTIVITIES_INTERNAL_DEV",
    "ANIMATED_BANNER",
    "ANIMATED_ICON",
    "APPLICATION_COMMAND_PERMISSIONS_V2",
    "AUTO_MODERATION",
    "AUTOMOD_TRIGGER_USER_PROFILE",
    "BANNER",
    "BOT_DEVELOPER_EARLY_ACCESS",
    "BURST_REACTIONS",
    "CHANNEL_HIGHLIGHTS_DISABLED",
    "CHANNEL_HIGHLIGHTS",
    "CHANNEL_ICON_EMOJIS_GENERATED",
    "CLYDE_DISABLED",
    "CLYDE_ENABLED",
    "CLYDE_EXPERIMENT_ENABLED",
    "COMMERCE",
    "COMMUNITY_CANARY",
    "COMMUNITY_EXP_LARGE_GATED",
    "COMMUNITY_EXP_LARGE_UNGATED",
    "COMMUNITY_EXP_MEDIUM",
    "COMMUNITY",
    "CREATOR_ACCEPTED_NEW_TERMS",
    "CREATOR_MONETIZABLE_DISABLED",
    "CREATOR_MONETIZABLE_PENDING_NEW_OWNER_ONBOARDING",
    "CREATOR_MONETIZABLE_PROVISIONAL",
    "CREATOR_MONETIZABLE_RESTRICTED",
    "CREATOR_MONETIZABLE_WHITEGLOVE",
    "CREATOR_MONETIZABLE",
    "CREATOR_STORE_PAGE",
    "DEVELOPER_SUPPORT_SERVER",
    "DISCOVERABLE_DISABLED",
    "DISCOVERABLE",
    "ENABLED_DISCOVERABLE_BEFORE",
    "ENABLED_MODERATION_EXPERIENCE_FOR_NON_COMMUNITY",
    "ENHANCED_ROLE_COLORS",
    "EXPOSED_TO_ACTIVITIES_WTP_EXPERIMENT",
    "FEATURABLE",
    "GUESTS_ENABLED",
    "GUILD_HOME_DEPRECATION_OVERRIDE",
    "GUILD_HOME_OVERRIDE",
    "GUILD_HOME_TEST",
    "GUILD_ONBOARDING_EVER_ENABLED",
    "GUILD_ONBOARDING_HAS_PROMPTS",
    "GUILD_ONBOARDING",
    "GUILD_ROLE_SUBSCRIPTION_TIER_TEMPLATE",
    "GUILD_SERVER_GUIDE",
    "GUILD_WEB_PAGE_VANITY_URL",
    "HAD_EARLY_ACTIVITIES_ACCESS",
    "HAS_DIRECTORY_ENTRY",
    "HUB",
    "INCREASED_THREAD_LIMIT",
    "INTERNAL_EMPLOYEE_ONLY",
    "INVITE_SPLASH",
    "INVITES_DISABLED",
    "LINKED_TO_HUB",
    "MARKETPLACES_CONNECTION_ROLES",
    "MEMBER_PROFILES",
    "MEMBER_SAFETY_PAGE_ROLLOUT",
    "MEMBER_VERIFICATION_GATE_ENABLED",
    "MONETIZATION_ENABLED",
    "MORE_EMOJI",
    "MORE_EMOJIS",
    "MORE_SOUNDBOARD",
    "MORE_STICKERS",
    "NEW_THREAD_PERMISSIONS",
    "NEWS",
    "NON_COMMUNITY_RAID_ALERTS",
    "PARTNERED",
    "PREVIEW_ENABLED",
    "PREVIOUSLY_DISCOVERABLE",
    "PRIVATE_THREADS",
    "PRODUCTS_AVAILABLE_FOR_PURCHASE",
    "RAID_ALERTS_DISABLED",
    "RAID_ALERTS_ENABLED",
    "ROLE_ICONS",
    "ROLE_SUBSCRIPTIONS_AVAILABLE_FOR_PURCHASE",
    "ROLE_SUBSCRIPTIONS_ENABLED",
    "SEVEN_DAY_THREAD_ARCHIVE",
    "SHARD",
    "SOUNDBOARD",
    "SUMMARIES_DISABLED_BY_USER",
    "SUMMARIES_ENABLED_BY_USER",
    "SUMMARIES_ENABLED_GA",
    "SUMMARIES_ENABLED",
    "SUMMARIES_OPT_OUT_EXPERIENCE",
    "SUMMARIES_PAUSED",
    "TEXT_IN_STAGE_ENABLED",
    "TEXT_IN_VOICE_ENABLED",
    "THREADS_ENABLED_TESTING",
    "THREADS_ENABLED",
    "THREE_DAY_THREAD_ARCHIVE",
    "TICKETED_EVENTS_ENABLED",
    "VANITY_URL",
    "VERIFIED",
    "VIP_REGIONS",
    "VOICE_IN_THREADS",
    "WELCOME_SCREEN_ENABLED"
];
var DefaultMessageNotificationLevels;
(function (DefaultMessageNotificationLevels) {
    /** Receive notifications for all messages */
    DefaultMessageNotificationLevels[DefaultMessageNotificationLevels["ALL_MESSAGES"] = 0] = "ALL_MESSAGES";
    /** Receive notifications only for messages that @mention you */
    DefaultMessageNotificationLevels[DefaultMessageNotificationLevels["ONLY_MENTIONS"] = 1] = "ONLY_MENTIONS";
    /** Don't receive notifications */
    DefaultMessageNotificationLevels[DefaultMessageNotificationLevels["NO_MESSAGES"] = 2] = "NO_MESSAGES";
    DefaultMessageNotificationLevels[DefaultMessageNotificationLevels["NULL"] = 3] = "NULL";
})(DefaultMessageNotificationLevels || (exports.DefaultMessageNotificationLevels = DefaultMessageNotificationLevels = {}));
var ExplicitContentFilterLevels;
(function (ExplicitContentFilterLevels) {
    /** Media content will not be scanned */
    ExplicitContentFilterLevels[ExplicitContentFilterLevels["DISABLED"] = 0] = "DISABLED";
    /** Media content sent by members without roles will be scanned */
    ExplicitContentFilterLevels[ExplicitContentFilterLevels["MEMBERS_WITHOUT_ROLES"] = 1] = "MEMBERS_WITHOUT_ROLES";
    /** Media content sent by all members will be scanned */
    ExplicitContentFilterLevels[ExplicitContentFilterLevels["ALL_MEMBERS"] = 2] = "ALL_MEMBERS";
})(ExplicitContentFilterLevels || (exports.ExplicitContentFilterLevels = ExplicitContentFilterLevels = {}));
var MFALevels;
(function (MFALevels) {
    /** Guild has no MFA requirement for moderation actions */
    MFALevels[MFALevels["NONE"] = 0] = "NONE";
    /** Guild has a MFA requirement for moderation actions */
    MFALevels[MFALevels["ELEVATED"] = 1] = "ELEVATED";
})(MFALevels || (exports.MFALevels = MFALevels = {}));
var VerificationLevels;
(function (VerificationLevels) {
    /** Unrestricted */
    VerificationLevels[VerificationLevels["NONE"] = 0] = "NONE";
    /** Must have a verified email on file */
    VerificationLevels[VerificationLevels["LOW"] = 1] = "LOW";
    /** Must be registered on Discord for longer than 5 minutes */
    VerificationLevels[VerificationLevels["MEDIUM"] = 2] = "MEDIUM";
    /** Must be a member of the server for longer than 10 minutes */
    VerificationLevels[VerificationLevels["HIGH"] = 3] = "HIGH";
    /** Must have a verified phone number on file */
    VerificationLevels[VerificationLevels["VERY_HIGH"] = 4] = "VERY_HIGH";
})(VerificationLevels || (exports.VerificationLevels = VerificationLevels = {}));
var GuildNSFWLevels;
(function (GuildNSFWLevels) {
    /** Guild is not yet rated by Discord */
    GuildNSFWLevels[GuildNSFWLevels["DEFAULT"] = 0] = "DEFAULT";
    /** Guild has mature content only suitable for users over 18 */
    GuildNSFWLevels[GuildNSFWLevels["EXPLICIT"] = 1] = "EXPLICIT";
    /** Guild is safe for work */
    GuildNSFWLevels[GuildNSFWLevels["SAFE"] = 2] = "SAFE";
    /** Guild has mildly mature content that may not be suitable for users under 18 */
    GuildNSFWLevels[GuildNSFWLevels["AGE_RESTRICTED"] = 3] = "AGE_RESTRICTED";
})(GuildNSFWLevels || (exports.GuildNSFWLevels = GuildNSFWLevels = {}));
var PremiumTiers;
(function (PremiumTiers) {
    /** Guild has not unlocked any Server Boost perks */
    PremiumTiers[PremiumTiers["NONE"] = 0] = "NONE";
    /** Guild has unlocked Server Boost level 1 perks */
    PremiumTiers[PremiumTiers["TIER_1"] = 1] = "TIER_1";
    /** Guild has unlocked Server Boost level 2 perks */
    PremiumTiers[PremiumTiers["TIER_2"] = 2] = "TIER_2";
    /** Guild has unlocked Server Boost level 3 perks */
    PremiumTiers[PremiumTiers["TIER_3"] = 3] = "TIER_3";
})(PremiumTiers || (exports.PremiumTiers = PremiumTiers = {}));
var SystemChannelFlags;
(function (SystemChannelFlags) {
    /** Suppress member join notifications */
    SystemChannelFlags[SystemChannelFlags["SUPPRESS_JOIN_NOTIFICATIONS"] = 1] = "SUPPRESS_JOIN_NOTIFICATIONS";
    /** Suppress premium subscription (boost) notifications */
    SystemChannelFlags[SystemChannelFlags["SUPPRESS_PREMIUM_SUBSCRIPTIONS"] = 2] = "SUPPRESS_PREMIUM_SUBSCRIPTIONS";
    /** Suppress guild setup tips */
    SystemChannelFlags[SystemChannelFlags["SUPPRESS_GUILD_REMINDER_NOTIFICATIONS"] = 4] = "SUPPRESS_GUILD_REMINDER_NOTIFICATIONS";
    /** Hide member join sticker reply buttons */
    SystemChannelFlags[SystemChannelFlags["SUPPRESS_JOIN_NOTIFICATION_REPLIES"] = 8] = "SUPPRESS_JOIN_NOTIFICATION_REPLIES";
    /** Suppress role subscription purchase and renewal notifications */
    SystemChannelFlags[SystemChannelFlags["SUPPRESS_ROLE_SUBSCRIPTION_PURCHASE_NOTIFICATIONS"] = 16] = "SUPPRESS_ROLE_SUBSCRIPTION_PURCHASE_NOTIFICATIONS";
    /** Hide role subscription sticker reply buttons */
    SystemChannelFlags[SystemChannelFlags["SUPPRESS_ROLE_SUBSCRIPTION_PURCHASE_NOTIFICATION_REPLIES"] = 32] = "SUPPRESS_ROLE_SUBSCRIPTION_PURCHASE_NOTIFICATION_REPLIES";
    /** Suppress dead chat channel prompts */
    SystemChannelFlags[SystemChannelFlags["SUPPRESS_CHANNEL_PROMPT_DEADCHAT"] = 128] = "SUPPRESS_CHANNEL_PROMPT_DEADCHAT";
})(SystemChannelFlags || (exports.SystemChannelFlags = SystemChannelFlags = {}));
var StickerTypes;
(function (StickerTypes) {
    /** An official sticker in a current or legacy purchasable pack */
    StickerTypes[StickerTypes["STANDARD"] = 1] = "STANDARD";
    /** A sticker uploaded to a guild for the guild's members */
    StickerTypes[StickerTypes["GUILD"] = 2] = "GUILD";
})(StickerTypes || (exports.StickerTypes = StickerTypes = {}));
var StickerFormatTypes;
(function (StickerFormatTypes) {
    /** A PNG image */
    StickerFormatTypes[StickerFormatTypes["PNG"] = 1] = "PNG";
    /** An animated PNG image, using the APNG format */
    StickerFormatTypes[StickerFormatTypes["APNG"] = 2] = "APNG";
    /** A lottie animation; requires the `VERIFIED` and/or `PARTNERED` guild feature */
    StickerFormatTypes[StickerFormatTypes["LOTTIE"] = 3] = "LOTTIE";
    /** An animated GIF image */
    StickerFormatTypes[StickerFormatTypes["GIF"] = 4] = "GIF";
})(StickerFormatTypes || (exports.StickerFormatTypes = StickerFormatTypes = {}));
var ChannelTypes;
(function (ChannelTypes) {
    /** A text channel within a guild */
    ChannelTypes[ChannelTypes["GUILD_TEXT"] = 0] = "GUILD_TEXT";
    /** A private channel between two users */
    ChannelTypes[ChannelTypes["DM"] = 1] = "DM";
    /** A voice channel within a guild */
    ChannelTypes[ChannelTypes["GUILD_VOICE"] = 2] = "GUILD_VOICE";
    /** A private channel between multiple users */
    ChannelTypes[ChannelTypes["GROUP_DM"] = 3] = "GROUP_DM";
    /** An organizational category that contains up to 50 channels */
    ChannelTypes[ChannelTypes["GUILD_CATEGORY"] = 4] = "GUILD_CATEGORY";
    /** Almost identical to `GUILD_TEXT`, a channel that users can follow and crosspost into their own guild */
    ChannelTypes[ChannelTypes["GUILD_ANNOUNCEMENT"] = 5] = "GUILD_ANNOUNCEMENT";
    /** @deprecated A channel in which developers can showcase their SKUs */
    ChannelTypes[ChannelTypes["GUILD_STORE"] = 6] = "GUILD_STORE";
    /** @deprecated A channel where users can match up for various games */
    ChannelTypes[ChannelTypes["GUILD_LFG"] = 7] = "GUILD_LFG";
    /** @deprecated A private channel between multiple users for a group within an LFG channel */
    ChannelTypes[ChannelTypes["LFG_GROUP_DM"] = 8] = "LFG_GROUP_DM";
    /** @deprecated The first iteration of the threads feature, never widely used */
    ChannelTypes[ChannelTypes["THREAD_ALPHA"] = 9] = "THREAD_ALPHA";
    /** A temporary sub-channel within a `GUILD_NEWS` channel */
    ChannelTypes[ChannelTypes["ANNOUNCEMENT_THREAD"] = 10] = "ANNOUNCEMENT_THREAD";
    /** a temporary sub-channel within a `GUILD_TEXT`, `GUILD_FORUM`, or `GUILD_MEDIA` channel */
    ChannelTypes[ChannelTypes["PUBLIC_THREAD"] = 11] = "PUBLIC_THREAD";
    /** a temporary sub-channel within a `GUILD_TEXT` channel that is only viewable by those invited and those with the `MANAGE_THREADS` permission */
    ChannelTypes[ChannelTypes["PRIVATE_THREAD"] = 12] = "PRIVATE_THREAD";
    /** A voice channel for hosting events with an audience in a guild */
    ChannelTypes[ChannelTypes["GUILD_STAGE_VOICE"] = 13] = "GUILD_STAGE_VOICE";
    /** The main channel in a hub containing the listed guilds */
    ChannelTypes[ChannelTypes["GUILD_DIRECTORY"] = 14] = "GUILD_DIRECTORY";
    /** A channel that can only contain threads */
    ChannelTypes[ChannelTypes["GUILD_FORUM"] = 15] = "GUILD_FORUM";
    /** A channel that can only contain threads in a gallery view */
    ChannelTypes[ChannelTypes["GUILD_MEDIA"] = 16] = "GUILD_MEDIA";
    /** A game lobby channel */
    ChannelTypes[ChannelTypes["LOBBY"] = 17] = "LOBBY";
    /** A private channel created by the social layer SDK */
    ChannelTypes[ChannelTypes["EPHEMERAL_DM"] = 18] = "EPHEMERAL_DM";
})(ChannelTypes || (exports.ChannelTypes = ChannelTypes = {}));
function exclude(original, excludeTypes) {
    return original.filter((value) => !excludeTypes.includes(value));
}
exports.AnyChannelTypes = Object.values(ChannelTypes).filter(v => typeof v === "number");
exports.NotImplementedChannelTypes = [ChannelTypes.GUILD_STORE, ChannelTypes.GUILD_LFG, ChannelTypes.LFG_GROUP_DM, ChannelTypes.THREAD_ALPHA, ChannelTypes.GUILD_DIRECTORY, ChannelTypes.LOBBY, ChannelTypes.EPHEMERAL_DM];
exports.ImplementedChannelTypes = exclude(exports.AnyChannelTypes, exports.NotImplementedChannelTypes);
exports.GuildChannelTypes = [ChannelTypes.GUILD_TEXT, ChannelTypes.GUILD_VOICE, ChannelTypes.GUILD_CATEGORY, ChannelTypes.GUILD_ANNOUNCEMENT, ChannelTypes.ANNOUNCEMENT_THREAD, ChannelTypes.PUBLIC_THREAD, ChannelTypes.PRIVATE_THREAD, ChannelTypes.GUILD_STAGE_VOICE, ChannelTypes.GUILD_DIRECTORY, ChannelTypes.GUILD_FORUM, ChannelTypes.GUILD_MEDIA];
exports.ThreadChannelTypes = [ChannelTypes.ANNOUNCEMENT_THREAD, ChannelTypes.PUBLIC_THREAD, ChannelTypes.PRIVATE_THREAD];
exports.GuildChannelsWithoutThreadsTypes = exclude(exports.GuildChannelTypes, exports.ThreadChannelTypes);
exports.PrivateChannelTypes = [ChannelTypes.DM, ChannelTypes.GROUP_DM];
exports.EditableChannelTypes = exclude([ChannelTypes.GROUP_DM, ...exports.GuildChannelTypes], exports.NotImplementedChannelTypes);
exports.TextableChannelTypes = exclude([ChannelTypes.DM, ...exports.GuildChannelTypes], [...exports.NotImplementedChannelTypes, ChannelTypes.GUILD_CATEGORY, ChannelTypes.GUILD_FORUM, ChannelTypes.GUILD_MEDIA]);
exports.TextableGuildChannelTypes = exclude(exports.TextableChannelTypes, [ChannelTypes.DM]);
exports.TextableChannelsWithoutThreadsTypes = exclude(exports.TextableChannelTypes, exports.ThreadChannelTypes);
exports.TextableGuildChannelsWithoutThreadsTypes = exclude(exports.TextableGuildChannelTypes, exports.ThreadChannelTypes);
exports.VoiceChannelTypes = [ChannelTypes.GUILD_VOICE, ChannelTypes.GUILD_STAGE_VOICE];
exports.GuildInviteChannelTypes = [ChannelTypes.GUILD_TEXT, ChannelTypes.GUILD_ANNOUNCEMENT, ...exports.VoiceChannelTypes, ChannelTypes.GUILD_FORUM, ChannelTypes.GUILD_MEDIA];
exports.DMInviteChannelTypes = [ChannelTypes.GROUP_DM];
exports.InviteChannelTypes = [...exports.GuildInviteChannelTypes, ...exports.DMInviteChannelTypes];
exports.InteractionChannelTypes = [...exports.TextableChannelTypes, ChannelTypes.GROUP_DM];
exports.ThreadOnlyChannelTypes = [ChannelTypes.GUILD_FORUM, ChannelTypes.GUILD_MEDIA];
/* eslint-enable @typescript-eslint/member-ordering */
var OverwriteTypes;
(function (OverwriteTypes) {
    OverwriteTypes[OverwriteTypes["ROLE"] = 0] = "ROLE";
    OverwriteTypes[OverwriteTypes["MEMBER"] = 1] = "MEMBER";
})(OverwriteTypes || (exports.OverwriteTypes = OverwriteTypes = {}));
var VideoQualityModes;
(function (VideoQualityModes) {
    /** Discord chooses the quality for optimal performance */
    VideoQualityModes[VideoQualityModes["AUTO"] = 1] = "AUTO";
    /** 720p quality */
    VideoQualityModes[VideoQualityModes["FULL"] = 2] = "FULL";
})(VideoQualityModes || (exports.VideoQualityModes = VideoQualityModes = {}));
exports.ThreadAutoArchiveDurations = [
    60,
    1440,
    4320,
    10080
];
var ConnectionVisibilityTypes;
(function (ConnectionVisibilityTypes) {
    /** Connection is not visible. */
    ConnectionVisibilityTypes[ConnectionVisibilityTypes["NONE"] = 0] = "NONE";
    /** Connection is visible to everyone. */
    ConnectionVisibilityTypes[ConnectionVisibilityTypes["EVERYONE"] = 1] = "EVERYONE";
})(ConnectionVisibilityTypes || (exports.ConnectionVisibilityTypes = ConnectionVisibilityTypes = {}));
exports.ConnectionServices = [
    "battlenet",
    "bluesky",
    "crunchyroll",
    "domain",
    "ebay",
    "epicgames",
    "facebook",
    "github",
    "instagram",
    "leagueoflegends",
    "mastodon",
    "paypal",
    "playstation",
    "reddit",
    "riotgames",
    "skype",
    "spotify",
    "steam",
    "tiktok",
    "twitch",
    "twitter_legacy",
    "twitter",
    "xbox",
    "youtube"
];
exports.IntegrationTypes = [
    "twitch",
    "youtube",
    "discord",
    "guild_subscription"
];
var IntegrationExpireBehaviors;
(function (IntegrationExpireBehaviors) {
    /** Remove the integration role when a subscription lapses. */
    IntegrationExpireBehaviors[IntegrationExpireBehaviors["REMOVE_ROLE"] = 0] = "REMOVE_ROLE";
    /** Kick the member when a subscription lapses. */
    IntegrationExpireBehaviors[IntegrationExpireBehaviors["KICK"] = 1] = "KICK";
})(IntegrationExpireBehaviors || (exports.IntegrationExpireBehaviors = IntegrationExpireBehaviors = {}));
// values won't be statically typed if we use bit shifting, and enums can't use bigints
// eslint-disable-next-line @typescript-eslint/no-namespace
var Permissions;
(function (Permissions) {
    Permissions.CREATE_INSTANT_INVITE = 1n; // 1 << 0
    Permissions.KICK_MEMBERS = 2n; // 1 << 1
    Permissions.BAN_MEMBERS = 4n; // 1 << 2
    Permissions.ADMINISTRATOR = 8n; // 1 << 3
    Permissions.MANAGE_CHANNELS = 16n; // 1 << 4
    Permissions.MANAGE_GUILD = 32n; // 1 << 5
    Permissions.ADD_REACTIONS = 64n; // 1 << 6
    Permissions.VIEW_AUDIT_LOG = 128n; // 1 << 7
    Permissions.PRIORITY_SPEAKER = 256n; // 1 << 8
    Permissions.STREAM = 512n; // 1 << 9
    Permissions.VIEW_CHANNEL = 1024n; // 1 << 10
    Permissions.SEND_MESSAGES = 2048n; // 1 << 11
    Permissions.SEND_TTS_MESSAGES = 4096n; // 1 << 12
    Permissions.MANAGE_MESSAGES = 8192n; // 1 << 13
    Permissions.EMBED_LINKS = 16384n; // 1 << 14
    Permissions.ATTACH_FILES = 32768n; // 1 << 15
    Permissions.READ_MESSAGE_HISTORY = 65536n; // 1 << 16
    Permissions.MENTION_EVERYONE = 131072n; // 1 << 17
    Permissions.USE_EXTERNAL_EMOJIS = 262144n; // 1 << 18
    Permissions.VIEW_GUILD_INSIGHTS = 524288n; // 1 << 19
    Permissions.CONNECT = 1048576n; // 1 << 20
    Permissions.SPEAK = 2097152n; // 1 << 21
    Permissions.MUTE_MEMBERS = 4194304n; // 1 << 22
    Permissions.DEAFEN_MEMBERS = 8388608n; // 1 << 23
    Permissions.MOVE_MEMBERS = 16777216n; // 1 << 24
    Permissions.USE_VAD = 33554432n; // 1 << 25
    Permissions.CHANGE_NICKNAME = 67108864n; // 1 << 26
    Permissions.MANAGE_NICKNAMES = 134217728n; // 1 << 27
    Permissions.MANAGE_ROLES = 268435456n; // 1 << 28
    Permissions.MANAGE_WEBHOOKS = 536870912n; // 1 << 29
    Permissions.MANAGE_GUILD_EXPRESSIONS = 1073741824n; // 1 << 30
    Permissions.USE_APPLICATION_COMMANDS = 2147483648n; // 1 << 31
    Permissions.REQUEST_TO_SPEAK = 4294967296n; // 1 << 32
    Permissions.MANAGE_EVENTS = 8589934592n; // 1 << 33
    Permissions.MANAGE_THREADS = 17179869184n; // 1 << 34
    Permissions.CREATE_PUBLIC_THREADS = 34359738368n; // 1 << 35
    Permissions.CREATE_PRIVATE_THREADS = 68719476736n; // 1 << 36
    Permissions.USE_EXTERNAL_STICKERS = 137438953472n; // 1 << 37
    Permissions.SEND_MESSAGES_IN_THREADS = 274877906944n; // 1 << 38
    Permissions.USE_EMBEDDED_ACTIVITIES = 549755813888n; // 1 << 39
    Permissions.MODERATE_MEMBERS = 1099511627776n; // 1 << 40
    Permissions.VIEW_CREATOR_MONETIZATION_ANALYTICS = 2199023255552n; // 1 << 41
    Permissions.USE_SOUNDBOARD = 4398046511104n; // 1 << 42
    Permissions.CREATE_GUILD_EXPRESSIONS = 8796093022208n; // 1 << 43
    Permissions.CREATE_EVENTS = 17592186044416n; // 1 << 44
    Permissions.USE_EXTERNAL_SOUNDS = 35184372088832n; // 1 << 45
    Permissions.SEND_VOICE_MESSAGES = 70368744177664n; // 1 << 46
    /** @deprecated Allows members to interact with the Clyde AI integration. */
    Permissions.USE_CLYDE_AI = 140737488355328n; // 1 << 47
    Permissions.SET_VOICE_CHANNEL_STATUS = 281474976710656n; // 1 << 48
    Permissions.SEND_POLLS = 562949953421312n; // 1 << 49
    Permissions.USE_EXTERNAL_APPS = 1125899906842624n; // 1 << 50
    Permissions.PIN_MESSAGES = 2251799813685248n; // 1 << 51
    Permissions.BYPASS_SLOWMODE = 4503599627370496n; // 1 << 52
    /** Allows members to mark messages as official in verified guilds */
    Permissions.MANAGE_OFFICIAL_MESSAGES = 9007199254740992n; // 1 << 53
})(Permissions || (exports.Permissions = Permissions = {}));
// bigints can't be used as object keys, so we need to convert them to strings
exports.PermissionValueToName = Object.fromEntries(Object.entries(Permissions).map(([k, v]) => [String(v), k]));
exports.AllPermissions = Object.values(Permissions).reduce((a, b) => a | b, 0n);
exports.TextPermissions = [
    Permissions.CREATE_INSTANT_INVITE,
    Permissions.MANAGE_CHANNELS,
    Permissions.ADD_REACTIONS,
    Permissions.VIEW_CHANNEL,
    Permissions.SEND_MESSAGES,
    Permissions.SEND_TTS_MESSAGES,
    Permissions.MANAGE_MESSAGES,
    Permissions.EMBED_LINKS,
    Permissions.ATTACH_FILES,
    Permissions.READ_MESSAGE_HISTORY,
    Permissions.MENTION_EVERYONE,
    Permissions.USE_EXTERNAL_EMOJIS,
    Permissions.MANAGE_ROLES,
    Permissions.MANAGE_WEBHOOKS,
    Permissions.USE_APPLICATION_COMMANDS,
    Permissions.MANAGE_THREADS,
    Permissions.CREATE_PUBLIC_THREADS,
    Permissions.CREATE_PRIVATE_THREADS,
    Permissions.USE_EXTERNAL_STICKERS,
    Permissions.SEND_MESSAGES_IN_THREADS,
    Permissions.SEND_VOICE_MESSAGES,
    Permissions.USE_CLYDE_AI,
    Permissions.SEND_POLLS,
    Permissions.USE_EXTERNAL_APPS,
    Permissions.PIN_MESSAGES,
    Permissions.BYPASS_SLOWMODE
];
exports.AllTextPermissions = exports.TextPermissions.reduce((all, p) => all | p, 0n);
exports.AllTextPermissionNames = exports.TextPermissions.map(p => exports.PermissionValueToName[String(p)]);
exports.VoicePermissions = [
    Permissions.CREATE_INSTANT_INVITE,
    Permissions.MANAGE_CHANNELS,
    Permissions.ADD_REACTIONS,
    Permissions.PRIORITY_SPEAKER,
    Permissions.STREAM,
    Permissions.VIEW_CHANNEL,
    Permissions.SEND_MESSAGES,
    Permissions.SEND_TTS_MESSAGES,
    Permissions.MANAGE_MESSAGES,
    Permissions.EMBED_LINKS,
    Permissions.ATTACH_FILES,
    Permissions.READ_MESSAGE_HISTORY,
    Permissions.MENTION_EVERYONE,
    Permissions.USE_EXTERNAL_EMOJIS,
    Permissions.CONNECT,
    Permissions.SPEAK,
    Permissions.MUTE_MEMBERS,
    Permissions.DEAFEN_MEMBERS,
    Permissions.MOVE_MEMBERS,
    Permissions.USE_VAD,
    Permissions.MANAGE_ROLES,
    Permissions.MANAGE_WEBHOOKS,
    Permissions.USE_APPLICATION_COMMANDS,
    Permissions.MANAGE_EVENTS,
    Permissions.USE_EXTERNAL_STICKERS,
    Permissions.USE_EMBEDDED_ACTIVITIES,
    Permissions.USE_SOUNDBOARD,
    Permissions.USE_EXTERNAL_SOUNDS,
    Permissions.SEND_VOICE_MESSAGES,
    Permissions.USE_CLYDE_AI,
    Permissions.SET_VOICE_CHANNEL_STATUS,
    Permissions.SEND_POLLS,
    Permissions.USE_EXTERNAL_APPS,
    Permissions.BYPASS_SLOWMODE
];
exports.AllVoicePermissions = exports.VoicePermissions.reduce((all, p) => all | p, 0n);
exports.AllVoicePermissionNames = exports.VoicePermissions.map(p => exports.PermissionValueToName[String(p)]);
exports.StagePermissions = [
    Permissions.CREATE_INSTANT_INVITE,
    Permissions.MANAGE_CHANNELS,
    Permissions.ADD_REACTIONS,
    Permissions.STREAM,
    Permissions.VIEW_CHANNEL,
    Permissions.SEND_MESSAGES,
    Permissions.SEND_TTS_MESSAGES,
    Permissions.MANAGE_MESSAGES,
    Permissions.EMBED_LINKS,
    Permissions.ATTACH_FILES,
    Permissions.READ_MESSAGE_HISTORY,
    Permissions.MENTION_EVERYONE,
    Permissions.USE_EXTERNAL_EMOJIS,
    Permissions.CONNECT,
    Permissions.MUTE_MEMBERS,
    Permissions.MOVE_MEMBERS,
    Permissions.MANAGE_ROLES,
    Permissions.MANAGE_WEBHOOKS,
    Permissions.USE_APPLICATION_COMMANDS,
    Permissions.REQUEST_TO_SPEAK,
    Permissions.MANAGE_EVENTS,
    Permissions.USE_EXTERNAL_STICKERS,
    Permissions.SEND_VOICE_MESSAGES,
    Permissions.USE_CLYDE_AI,
    Permissions.SEND_POLLS,
    Permissions.USE_EXTERNAL_APPS,
    Permissions.BYPASS_SLOWMODE
];
exports.AllStagePermissions = exports.StagePermissions.reduce((all, p) => all | p, 0n);
exports.AllStagePermissionNames = exports.StagePermissions.map(p => exports.PermissionValueToName[String(p)]);
/** These permissions require the bot owner's account to have 2FA enabled in guilds where 2FA is a requirement. */
exports.ModeratorPermissions = [
    Permissions.KICK_MEMBERS,
    Permissions.BAN_MEMBERS,
    Permissions.ADMINISTRATOR,
    Permissions.MANAGE_CHANNELS,
    Permissions.MANAGE_GUILD,
    Permissions.MANAGE_MESSAGES,
    Permissions.MANAGE_ROLES,
    Permissions.MANAGE_WEBHOOKS,
    Permissions.MANAGE_GUILD_EXPRESSIONS,
    Permissions.MANAGE_THREADS,
    Permissions.MODERATE_MEMBERS,
    Permissions.VIEW_CREATOR_MONETIZATION_ANALYTICS
];
exports.AllModeratorPermissions = exports.ModeratorPermissions.reduce((all, p) => all | p, 0n);
exports.AllModeratorPermissionNames = exports.ModeratorPermissions.map(p => exports.PermissionValueToName[String(p)]);
exports.PermissionNames = Object.keys(Permissions);
var ChannelFlags;
(function (ChannelFlags) {
    /** Guild channel is hidden from the guild's feed */
    ChannelFlags[ChannelFlags["GUILD_FEED_REMOVED"] = 1] = "GUILD_FEED_REMOVED";
    /** Thread is pinned to the top of its parent thread-only channel */
    ChannelFlags[ChannelFlags["PINNED"] = 2] = "PINNED";
    /** Guild channel has been removed from the guild's active channels */
    ChannelFlags[ChannelFlags["ACTIVE_CHANNELS_REMOVED"] = 4] = "ACTIVE_CHANNELS_REMOVED";
    /** Thread-only channel requires a tag to create threads in */
    ChannelFlags[ChannelFlags["REQUIRE_TAG"] = 16] = "REQUIRE_TAG";
    /** Channel is marked as spam */
    ChannelFlags[ChannelFlags["IS_SPAM"] = 32] = "IS_SPAM";
    /** Guild channel is used as a read-only resource for onboarding and is not shown in the channel list */
    ChannelFlags[ChannelFlags["IS_GUILD_RESOURCE_CHANNEL"] = 128] = "IS_GUILD_RESOURCE_CHANNEL";
    /** Channel is created by Clyde AI, which has full access to all message content */
    ChannelFlags[ChannelFlags["CLYDE_AI"] = 256] = "CLYDE_AI";
    /** Guild channel is scheduled for deletion and is not shown in the UI */
    ChannelFlags[ChannelFlags["IS_SCHEDULED_FOR_DELETION"] = 512] = "IS_SCHEDULED_FOR_DELETION";
    /** @deprecated Forum channel is a media channel */
    ChannelFlags[ChannelFlags["IS_MEDIA_CHANNEL"] = 1024] = "IS_MEDIA_CHANNEL";
    /** Guild channel has summaries disabled */
    ChannelFlags[ChannelFlags["SUMMARIES_DISABLED"] = 2048] = "SUMMARIES_DISABLED";
    /** @deprecated Private channel's recipients consented to the application shelf */
    ChannelFlags[ChannelFlags["APPLICATION_SHELF_CONSENT"] = 4096] = "APPLICATION_SHELF_CONSENT";
    /** Role subscription tier for this guild channel has not been published yet */
    ChannelFlags[ChannelFlags["IS_ROLE_SUBSCRIPTION_TEMPLATE_PREVIEW_CHANNEL"] = 8192] = "IS_ROLE_SUBSCRIPTION_TEMPLATE_PREVIEW_CHANNEL";
    /** Group DM is used for broadcasting a live stream */
    ChannelFlags[ChannelFlags["IS_BROADCASTING"] = 16384] = "IS_BROADCASTING";
    /** Media channel has the embedded download options hidden for media attachments */
    ChannelFlags[ChannelFlags["HIDE_MEDIA_DOWNLOAD_OPTIONS"] = 32768] = "HIDE_MEDIA_DOWNLOAD_OPTIONS";
    /** Group DM is used for guild join request interviews */
    ChannelFlags[ChannelFlags["IS_JOIN_REQUEST_INTERVIEW_CHANNEL"] = 65536] = "IS_JOIN_REQUEST_INTERVIEW_CHANNEL";
    /** User does not have permission to view the channel */
    ChannelFlags[ChannelFlags["OBFUSCATED"] = 131072] = "OBFUSCATED";
    /** Forum channel is the guild's moderator queue */
    ChannelFlags[ChannelFlags["IS_MODERATOR_REPORT_CHANNEL"] = 524288] = "IS_MODERATOR_REPORT_CHANNEL";
    /** Channel is marked as a spoiler channel */
    ChannelFlags[ChannelFlags["IS_SPOILER_CHANNEL"] = 2097152] = "IS_SPOILER_CHANNEL";
})(ChannelFlags || (exports.ChannelFlags = ChannelFlags = {}));
var SortOrderTypes;
(function (SortOrderTypes) {
    /** Sort by the most recently active threads */
    SortOrderTypes[SortOrderTypes["LATEST_ACTIVITY"] = 0] = "LATEST_ACTIVITY";
    SortOrderTypes[SortOrderTypes["CREATION_DATE"] = 1] = "CREATION_DATE";
})(SortOrderTypes || (exports.SortOrderTypes = SortOrderTypes = {}));
var ForumLayoutTypes;
(function (ForumLayoutTypes) {
    /** No layout type explicitly set */
    ForumLayoutTypes[ForumLayoutTypes["DEFAULT"] = 0] = "DEFAULT";
    /** Threads are displayed in a list */
    ForumLayoutTypes[ForumLayoutTypes["LIST"] = 1] = "LIST";
    /** Threads are displayed in a collection of tiles */
    ForumLayoutTypes[ForumLayoutTypes["GRID"] = 2] = "GRID";
})(ForumLayoutTypes || (exports.ForumLayoutTypes = ForumLayoutTypes = {}));
var TeamMembershipState;
(function (TeamMembershipState) {
    /** The user is invited */
    TeamMembershipState[TeamMembershipState["INVITED"] = 1] = "INVITED";
    /** The user has accepted the invite */
    TeamMembershipState[TeamMembershipState["ACCEPTED"] = 2] = "ACCEPTED";
})(TeamMembershipState || (exports.TeamMembershipState = TeamMembershipState = {}));
var OAuthScopes;
(function (OAuthScopes) {
    /** allows your app to fetch data from a user's "Now Playing/Recently Played" list - requires Discord approval */
    OAuthScopes["ACTIVITIES_READ"] = "activities.read";
    /** allows your app to update a user's activity - requires Discord approval (NOT REQUIRED FOR [GAMESDK ACTIVITY MANAGER](https://discord.com/developers/docs/game-sdk/activities)) */
    OAuthScopes["ACTIVITIES_WRITE"] = "activities.write";
    /** allows your app to read build data for a user's applications */
    OAuthScopes["APPLICATIONS_BUILDS_READ"] = "applications.builds.read";
    /** allows your app to upload/update builds for a user's applications - requires Discord approval */
    OAuthScopes["APPLICATIONS_BUILDS_UPLOAD"] = "applications.builds.upload";
    /** allows your app to use [commands](https://discord.com/developers/docs/interactions/application-commands) in a guild */
    OAuthScopes["APPLICATIONS_COMMANDS"] = "applications.commands";
    OAuthScopes["APPLICATIONS_COMMANDS_PERMISSIONS_UPDATE"] = "applications.commands.permissions.update";
    /** allows your app to update its [commands](https://discord.com/developers/docs/interactions/application-commands) using a Bearer token - [client credentials grant](https://discord.com/developers/docs/topics/oauth2#client-credentials-grant) only */
    OAuthScopes["APPLICATIONS_COMMANDS_UPDATE"] = "applications.commands.update";
    /** allows your app to read entitlements for a user's applications */
    OAuthScopes["APPLICATIONS_ENTITLEMENTS"] = "applications.entitlements";
    /** allows your app to read and update store data (SKUs, store listings, achievements, etc.) for a user's applications */
    OAuthScopes["APPLICATIONS_STORE_UPDATE"] = "applications.store.update";
    /** for oauth2 bots, this puts the bot in the user's selected guild by default */
    OAuthScopes["BOT"] = "bot";
    /** allows [/users/@me/connections](https://discord.com/developers/docs/resources/user#get-user-connections) to return linked third-party accounts */
    OAuthScopes["CONNECTIONS"] = "connections";
    /** allows your app to see information about the user's DMs and group DMs - requires Discord approval */
    OAuthScopes["DM_CHANNELS_READ"] = "dm_channels.read";
    /** enables [/users/@me](https://discord.com/developers/docs/resources/user#get-current-user) to return an `email` */
    OAuthScopes["EMAIL"] = "email";
    /** allows your app to [join users to a group dm](https://discord.com/developers/docs/resources/channel#group-dm-add-recipient) */
    OAuthScopes["GDM_JOIN"] = "gdm.join";
    /** allows [/users/@me/guilds](https://discord.com/developers/docs/resources/user#get-current-user-guilds) to return basic information about all of a user's guilds */
    OAuthScopes["GUILDS"] = "guilds";
    /** allows [/guilds/\{guild.id\}/members/\{user.id\}](https://discord.com/developers/docs/resources/guild#add-guild-member) to be used for joining users to a guild */
    OAuthScopes["GUILDS_JOIN"] = "guilds.join";
    /** allows [/users/@me/guilds/\{guild.id\}/member](https://discord.com/developers/docs/resources/user#get-current-user-guild-member) to return a user's member information in a guild */
    OAuthScopes["GUILDS_MEMBERS_READ"] = "guilds.members.read";
    /** allows [/users/@me](https://discord.com/developers/docs/resources/user#get-current-user) without `email` */
    OAuthScopes["IDENTIFY"] = "identify";
    /** allows your app to read a user's Nitro subscription type as defined by `premium_type` on the User object - only available to approved partners */
    OAuthScopes["IDENTIFY_PREMIUM"] = "identify.premium";
    /** for local rpc server api access, this allows you to read messages from all client channels (otherwise restricted to channels/guilds your app creates) */
    OAuthScopes["MESSAGES_READ"] = "messages.read";
    /** enables OpenID Connect endpoints and ID token claims */
    OAuthScopes["OPENID"] = "openid";
    /** allows your app to know a user's friends and implicit relationships */
    OAuthScopes["RELATIONSHIPS_READ"] = "relationships.read";
    /** allows your app to update a user's connection and metadata for the app */
    OAuthScopes["ROLE_CONNECTIONS_WRITE"] = "role_connections.write";
    /** for local rpc server access, this allows you to control a user's local Discord client - requires Discord approval */
    OAuthScopes["RPC"] = "rpc";
    /** for local rpc server access, this allows you to receive notifications pushed out to the user - requires Discord approval */
    OAuthScopes["RPC_ACTIVITIES_READ"] = "rpc.activities.read";
    /** for local rpc server access, this allows you to update a user's activity - requires Discord approval */
    OAuthScopes["RPC_ACTIVITIES_WRITE"] = "rpc.activities.write";
    /** for local rpc server access, this allows you to receive notifications pushed out to the user - requires Discord approval */
    OAuthScopes["RPC_NOTIFICATIONS_READ"] = "rpc.notifications.read";
    /** for local rpc server access, this allows you to read a user's voice settings and listen for voice events - requires Discord approval */
    OAuthScopes["RPC_VOICE_READ"] = "rpc.voice.read";
    /** for local rpc server access, this allows you to update a user's voice settings - requires Discord approval */
    OAuthScopes["RPC_VOICE_WRITE"] = "rpc.voice.write";
    /** allows your app to connect to voice on user's behalf and see all the voice members - requires Discord approval */
    OAuthScopes["VOICE"] = "voice";
    /** This generates a webhook that is returned in the oauth token response for authorization code grants. */
    OAuthScopes["WEBHOOK_INCOMING"] = "webhook.incoming";
})(OAuthScopes || (exports.OAuthScopes = OAuthScopes = {}));
var ComponentTypes;
(function (ComponentTypes) {
    /** A container for other components */
    ComponentTypes[ComponentTypes["ACTION_ROW"] = 1] = "ACTION_ROW";
    /** A button object */
    ComponentTypes[ComponentTypes["BUTTON"] = 2] = "BUTTON";
    /** Select menu for picking from defined text options */
    ComponentTypes[ComponentTypes["STRING_SELECT"] = 3] = "STRING_SELECT";
    /** Text input object */
    ComponentTypes[ComponentTypes["TEXT_INPUT"] = 4] = "TEXT_INPUT";
    /** Select menu for users */
    ComponentTypes[ComponentTypes["USER_SELECT"] = 5] = "USER_SELECT";
    /** Select menu for roles */
    ComponentTypes[ComponentTypes["ROLE_SELECT"] = 6] = "ROLE_SELECT";
    /** Select menu for mentionables (users and roles) */
    ComponentTypes[ComponentTypes["MENTIONABLE_SELECT"] = 7] = "MENTIONABLE_SELECT";
    /** Select menu for channels */
    ComponentTypes[ComponentTypes["CHANNEL_SELECT"] = 8] = "CHANNEL_SELECT";
    /** Container to display text alongside an accessory component */
    ComponentTypes[ComponentTypes["SECTION"] = 9] = "SECTION";
    /** Markdown text */
    ComponentTypes[ComponentTypes["TEXT_DISPLAY"] = 10] = "TEXT_DISPLAY";
    /** Small image that can be used as an accessory */
    ComponentTypes[ComponentTypes["THUMBNAIL"] = 11] = "THUMBNAIL";
    /** Display images and other media */
    ComponentTypes[ComponentTypes["MEDIA_GALLERY"] = 12] = "MEDIA_GALLERY";
    /** Displays an attached file */
    ComponentTypes[ComponentTypes["FILE"] = 13] = "FILE";
    /** Component to add vertical padding between other components */
    ComponentTypes[ComponentTypes["SEPARATOR"] = 14] = "SEPARATOR";
    /** Displays an activity feed entry */
    ComponentTypes[ComponentTypes["CONTENT_INVENTORY_ENTRY"] = 16] = "CONTENT_INVENTORY_ENTRY";
    /** Container that visually groups a set of components */
    ComponentTypes[ComponentTypes["CONTAINER"] = 17] = "CONTAINER";
    /** Container associating a label and description with a component */
    ComponentTypes[ComponentTypes["LABEL"] = 18] = "LABEL";
    /** Component to upload one or more files */
    ComponentTypes[ComponentTypes["FILE_UPLOAD"] = 19] = "FILE_UPLOAD";
    /** Single-choice set of radio options */
    ComponentTypes[ComponentTypes["RADIO_GROUP"] = 21] = "RADIO_GROUP";
    /** Multi-select group of checkboxes */
    ComponentTypes[ComponentTypes["CHECKBOX_GROUP"] = 22] = "CHECKBOX_GROUP";
    /** Single checkbox for binary choice */
    ComponentTypes[ComponentTypes["CHECKBOX"] = 23] = "CHECKBOX";
})(ComponentTypes || (exports.ComponentTypes = ComponentTypes = {}));
var ButtonStyles;
(function (ButtonStyles) {
    /** The most important or recommended action in a group of options */
    ButtonStyles[ButtonStyles["PRIMARY"] = 1] = "PRIMARY";
    /** Alternative or supporting actions */
    ButtonStyles[ButtonStyles["SECONDARY"] = 2] = "SECONDARY";
    /** Positive confirmation or completion actions */
    ButtonStyles[ButtonStyles["SUCCESS"] = 3] = "SUCCESS";
    /** An action with irreversible consequences */
    ButtonStyles[ButtonStyles["DANGER"] = 4] = "DANGER";
    /** Navigates to a URL */
    ButtonStyles[ButtonStyles["LINK"] = 5] = "LINK";
    /** Purchase */
    ButtonStyles[ButtonStyles["PREMIUM"] = 6] = "PREMIUM";
})(ButtonStyles || (exports.ButtonStyles = ButtonStyles = {}));
var TextInputStyles;
(function (TextInputStyles) {
    /** Single-line input */
    TextInputStyles[TextInputStyles["SHORT"] = 1] = "SHORT";
    /** Multi-line input */
    TextInputStyles[TextInputStyles["PARAGRAPH"] = 2] = "PARAGRAPH";
})(TextInputStyles || (exports.TextInputStyles = TextInputStyles = {}));
var MessageFlags;
(function (MessageFlags) {
    /** Message has been published to subscribed channels (via Channel Following) */
    MessageFlags[MessageFlags["CROSSPOSTED"] = 1] = "CROSSPOSTED";
    /** Message originated from a message in another channel (via Channel Following) */
    MessageFlags[MessageFlags["IS_CROSSPOST"] = 2] = "IS_CROSSPOST";
    /** Embeds will not be included when serializing this message */
    MessageFlags[MessageFlags["SUPPRESS_EMBEDS"] = 4] = "SUPPRESS_EMBEDS";
    /** Source message for this crosspost has been deleted (via Channel Following) */
    MessageFlags[MessageFlags["SOURCE_MESSAGE_DELETED"] = 8] = "SOURCE_MESSAGE_DELETED";
    /** Message came from the urgent message system */
    MessageFlags[MessageFlags["URGENT"] = 16] = "URGENT";
    /** Message has an associated thread, with the same ID as the message */
    MessageFlags[MessageFlags["HAS_THREAD"] = 32] = "HAS_THREAD";
    /** Message is only visible to the user who invoked the interaction */
    MessageFlags[MessageFlags["EPHEMERAL"] = 64] = "EPHEMERAL";
    /** Message is an interaction response and the bot is "thinking" */
    MessageFlags[MessageFlags["LOADING"] = 128] = "LOADING";
    /** Some roles were not mentioned and added to the thread (caps at 250) */
    MessageFlags[MessageFlags["FAILED_TO_MENTION_SOME_ROLES_IN_THREAD"] = 256] = "FAILED_TO_MENTION_SOME_ROLES_IN_THREAD";
    /** Message is hidden from the guild's feed */
    MessageFlags[MessageFlags["GUILD_FEED_HIDDEN"] = 512] = "GUILD_FEED_HIDDEN";
    /** Message contains a link that impersonates Discord */
    MessageFlags[MessageFlags["SHOULD_SHOW_LINK_NOT_DISCORD_WARNING"] = 1024] = "SHOULD_SHOW_LINK_NOT_DISCORD_WARNING";
    /** Message will not trigger push and desktop notifications */
    MessageFlags[MessageFlags["SUPPRESS_NOTIFICATIONS"] = 4096] = "SUPPRESS_NOTIFICATIONS";
    /** Message's audio attachment is rendered as a voice message */
    MessageFlags[MessageFlags["IS_VOICE_MESSAGE"] = 8192] = "IS_VOICE_MESSAGE";
    /** Message has a forwarded message snapshot attached */
    MessageFlags[MessageFlags["HAS_SNAPSHOT"] = 16384] = "HAS_SNAPSHOT";
    /** Message contains components from version 2 of the UI kit */
    MessageFlags[MessageFlags["IS_COMPONENTS_V2"] = 32768] = "IS_COMPONENTS_V2";
    /** Message was triggered by the social layer integration */
    MessageFlags[MessageFlags["SENT_BY_SOCIAL_LAYER_INTEGRATION"] = 65536] = "SENT_BY_SOCIAL_LAYER_INTEGRATION";
    /** Message is hidden because the author is suspended */
    MessageFlags[MessageFlags["HIDDEN_SUSPENDED_USER"] = 131072] = "HIDDEN_SUSPENDED_USER";
    /** Marks guild boosted message as the first person to boost the guild */
    MessageFlags[MessageFlags["IS_FIRST_BOOSTER"] = 262144] = "IS_FIRST_BOOSTER";
    /** Message is marked as official for the verified guild */
    MessageFlags[MessageFlags["IS_GUILD_OFFICIAL"] = 524288] = "IS_GUILD_OFFICIAL";
})(MessageFlags || (exports.MessageFlags = MessageFlags = {}));
var MessageTypes;
(function (MessageTypes) {
    /** A default message (see below) */
    MessageTypes[MessageTypes["DEFAULT"] = 0] = "DEFAULT";
    /** A message sent when a user is added to a group DM or thread */
    MessageTypes[MessageTypes["RECIPIENT_ADD"] = 1] = "RECIPIENT_ADD";
    /** A message sent when a user is removed from a group DM or thread */
    MessageTypes[MessageTypes["RECIPIENT_REMOVE"] = 2] = "RECIPIENT_REMOVE";
    /** A message sent when a user creates a call in a private channel */
    MessageTypes[MessageTypes["CALL"] = 3] = "CALL";
    /** A message sent when a group DM or thread's name is changed */
    MessageTypes[MessageTypes["CHANNEL_NAME_CHANGE"] = 4] = "CHANNEL_NAME_CHANGE";
    /** A message sent when a group DM's icon is changed */
    MessageTypes[MessageTypes["CHANNEL_ICON_CHANGE"] = 5] = "CHANNEL_ICON_CHANGE";
    /** A message sent when a message is pinned in a channel */
    MessageTypes[MessageTypes["CHANNEL_PINNED_MESSAGE"] = 6] = "CHANNEL_PINNED_MESSAGE";
    /** A message sent when a user joins a guild */
    MessageTypes[MessageTypes["USER_JOIN"] = 7] = "USER_JOIN";
    /** A message sent when a user subscribes to (boosts) a guild */
    MessageTypes[MessageTypes["GUILD_BOOST"] = 8] = "GUILD_BOOST";
    /** A message sent when a user subscribes to (boosts) a guild to tier 1 */
    MessageTypes[MessageTypes["GUILD_BOOST_TIER_1"] = 9] = "GUILD_BOOST_TIER_1";
    /** A message sent when a user subscribes to (boosts) a guild to tier 2 */
    MessageTypes[MessageTypes["GUILD_BOOST_TIER_2"] = 10] = "GUILD_BOOST_TIER_2";
    /** A message sent when a user subscribes to (boosts) a guild to tier 3 */
    MessageTypes[MessageTypes["GUILD_BOOST_TIER_3"] = 11] = "GUILD_BOOST_TIER_3";
    /** A message sent when a news channel is followed */
    MessageTypes[MessageTypes["CHANNEL_FOLLOW_ADD"] = 12] = "CHANNEL_FOLLOW_ADD";
    /** @deprecated A message sent when a user starts streaming in a guild */
    MessageTypes[MessageTypes["GUILD_STREAM"] = 13] = "GUILD_STREAM";
    /** A message sent when a guild is disqualified from discovery */
    MessageTypes[MessageTypes["GUILD_DISCOVERY_DISQUALIFIED"] = 14] = "GUILD_DISCOVERY_DISQUALIFIED";
    /** A message sent when a guild requalifies for discovery */
    MessageTypes[MessageTypes["GUILD_DISCOVERY_REQUALIFIED"] = 15] = "GUILD_DISCOVERY_REQUALIFIED";
    /** A message sent when a guild has failed discovery requirements for a week */
    MessageTypes[MessageTypes["GUILD_DISCOVERY_GRACE_PERIOD_INITIAL_WARNING"] = 16] = "GUILD_DISCOVERY_GRACE_PERIOD_INITIAL_WARNING";
    /** A message sent when a guild has failed discovery requirements for 3 weeks */
    MessageTypes[MessageTypes["GUILD_DISCOVERY_GRACE_PERIOD_FINAL_WARNING"] = 17] = "GUILD_DISCOVERY_GRACE_PERIOD_FINAL_WARNING";
    /** A message sent when a thread is created */
    MessageTypes[MessageTypes["THREAD_CREATED"] = 18] = "THREAD_CREATED";
    /** A message sent when a user replies to a message */
    MessageTypes[MessageTypes["REPLY"] = 19] = "REPLY";
    /** A message sent when a user uses a slash command */
    MessageTypes[MessageTypes["CHAT_INPUT_COMMAND"] = 20] = "CHAT_INPUT_COMMAND";
    /** A message sent when a thread starter message is added to a thread */
    MessageTypes[MessageTypes["THREAD_STARTER_MESSAGE"] = 21] = "THREAD_STARTER_MESSAGE";
    /** A message sent to remind users to invite friends to a guild */
    MessageTypes[MessageTypes["GUILD_INVITE_REMINDER"] = 22] = "GUILD_INVITE_REMINDER";
    /** A message sent when a user uses a context menu command */
    MessageTypes[MessageTypes["CONTEXT_MENU_COMMAND"] = 23] = "CONTEXT_MENU_COMMAND";
    /** A message sent when auto moderation takes an action */
    MessageTypes[MessageTypes["AUTO_MODERATION_ACTION"] = 24] = "AUTO_MODERATION_ACTION";
    /** A message sent when a user purchases or renews a role subscription */
    MessageTypes[MessageTypes["ROLE_SUBSCRIPTION_PURCHASE"] = 25] = "ROLE_SUBSCRIPTION_PURCHASE";
    /** A message sent when a user is upsold to a premium interaction */
    MessageTypes[MessageTypes["INTERACTION_PREMIUM_UPSELL"] = 26] = "INTERACTION_PREMIUM_UPSELL";
    /** A message sent when a stage channel starts */
    MessageTypes[MessageTypes["STAGE_START"] = 27] = "STAGE_START";
    /** A message sent when a stage channel ends */
    MessageTypes[MessageTypes["STAGE_END"] = 28] = "STAGE_END";
    /** A message sent when a user starts speaking in a stage channel */
    MessageTypes[MessageTypes["STAGE_SPEAKER"] = 29] = "STAGE_SPEAKER";
    /** A message sent when a user raises their hand in a stage channel */
    MessageTypes[MessageTypes["STAGE_RAISE_HAND"] = 30] = "STAGE_RAISE_HAND";
    /** A message sent when a stage channel's topic is changed */
    MessageTypes[MessageTypes["STAGE_TOPIC_CHANGE"] = 31] = "STAGE_TOPIC_CHANGE";
    /** A message sent when a user purchases an application premium subscription */
    MessageTypes[MessageTypes["GUILD_APPLICATION_PREMIUM_SUBSCRIPTION"] = 32] = "GUILD_APPLICATION_PREMIUM_SUBSCRIPTION";
    /** @deprecated A message sent when a user adds an application to group DM */
    MessageTypes[MessageTypes["PRIVATE_CHANNEL_INTEGRATION_ADDED"] = 33] = "PRIVATE_CHANNEL_INTEGRATION_ADDED";
    /** @deprecated A message sent when a user removed an application from a group DM */
    MessageTypes[MessageTypes["PRIVATE_CHANNEL_INTEGRATION_REMOVED"] = 34] = "PRIVATE_CHANNEL_INTEGRATION_REMOVED";
    /** A message sent when a user gifts a premium (Nitro) referral */
    MessageTypes[MessageTypes["PREMIUM_REFERRAL"] = 35] = "PREMIUM_REFERRAL";
    /** A message sent when a user enabled lockdown for the guild */
    MessageTypes[MessageTypes["GUILD_INCIDENT_ALERT_MODE_ENABLED"] = 36] = "GUILD_INCIDENT_ALERT_MODE_ENABLED";
    /** A message sent when a user disables lockdown for the guild */
    MessageTypes[MessageTypes["GUILD_INCIDENT_ALERT_MODE_DISABLED"] = 37] = "GUILD_INCIDENT_ALERT_MODE_DISABLED";
    /** A message sent when a user reports a raid for the guild */
    MessageTypes[MessageTypes["GUILD_INCIDENT_REPORT_RAID"] = 38] = "GUILD_INCIDENT_REPORT_RAID";
    /** A message sent when a user reports a false alarm for the guild */
    MessageTypes[MessageTypes["GUILD_INCIDENT_REPORT_FALSE_ALARM"] = 39] = "GUILD_INCIDENT_REPORT_FALSE_ALARM";
    /** A message sent when no one sends a message in the current channel for 1 hour */
    MessageTypes[MessageTypes["GUILD_DEADCHAT_REVIVE_PROMPT"] = 40] = "GUILD_DEADCHAT_REVIVE_PROMPT";
    /** A message sent when a user buys another user a gift */
    MessageTypes[MessageTypes["CUSTOM_GIFT"] = 41] = "CUSTOM_GIFT";
    MessageTypes[MessageTypes["GUILD_GAMING_STATS_PROMPT"] = 42] = "GUILD_GAMING_STATS_PROMPT";
    /** @deprecated A message sent when a user posts a poll */
    MessageTypes[MessageTypes["POLL"] = 43] = "POLL";
    /** A message sent when a user purchases a guild product */
    MessageTypes[MessageTypes["PURCHASE_NOTIFICATION"] = 44] = "PURCHASE_NOTIFICATION";
    /** @deprecated A message sent when a user invites another user to hangout in a voice channel */
    MessageTypes[MessageTypes["VOICE_HANGOUT_INVITE"] = 45] = "VOICE_HANGOUT_INVITE";
    /** A message sent when a poll is finalized */
    MessageTypes[MessageTypes["POLL_RESULT"] = 46] = "POLL_RESULT";
    /** A message sent by the Discord Updates account when a new changelog is posted */
    MessageTypes[MessageTypes["CHANGELOG"] = 47] = "CHANGELOG";
    /** A message sent when a Nitro promotion is triggered */
    MessageTypes[MessageTypes["NITRO_NOTIFICATION"] = 48] = "NITRO_NOTIFICATION";
    /** A message sent when a voice channel is linked to a lobby */
    MessageTypes[MessageTypes["CHANNEL_LINKED_TO_LOBBY"] = 49] = "CHANNEL_LINKED_TO_LOBBY";
    /** A local-only ephemeral message sent when a user is prompted to gift Nitro to a friend on their friendship anniversary */
    MessageTypes[MessageTypes["GIFTING_PROMPT"] = 50] = "GIFTING_PROMPT";
    /** A local-only message sent when a user receives an in-game message NUX */
    MessageTypes[MessageTypes["IN_GAME_MESSAGE_NUX"] = 51] = "IN_GAME_MESSAGE_NUX";
    /** A message sent when a user accepts a guild join request */
    MessageTypes[MessageTypes["GUILD_JOIN_REQUEST_ACCEPT_NOTIFICATION"] = 52] = "GUILD_JOIN_REQUEST_ACCEPT_NOTIFICATION";
    /** A message sent when a user rejects a guild join request */
    MessageTypes[MessageTypes["GUILD_JOIN_REQUEST_REJECT_NOTIFICATION"] = 53] = "GUILD_JOIN_REQUEST_REJECT_NOTIFICATION";
    /** A message sent when a user withdraws a guild join request */
    MessageTypes[MessageTypes["GUILD_JOIN_REQUEST_WITHDRAWN_NOTIFICATION"] = 54] = "GUILD_JOIN_REQUEST_WITHDRAWN_NOTIFICATION";
    /** A message sent when a user upgrades to HD streaming */
    MessageTypes[MessageTypes["HD_STREAMING_UPGRADED"] = 55] = "HD_STREAMING_UPGRADED";
    /** @deprecated A message sent when a user sets a DM wallpaper */
    MessageTypes[MessageTypes["CHAT_WALLPAPER_SET"] = 56] = "CHAT_WALLPAPER_SET";
    /** @deprecated A message sent when a user removes a DM wallpaper */
    MessageTypes[MessageTypes["CHAT_WALLPAPER_REMOVE"] = 57] = "CHAT_WALLPAPER_REMOVE";
    /** A message sent when a user resolves a moderation report by deleting the offending message */
    MessageTypes[MessageTypes["REPORT_TO_MOD_DELETED_MESSAGE"] = 58] = "REPORT_TO_MOD_DELETED_MESSAGE";
    /** A message sent when a user resolves a moderation report by timing out the offending user */
    MessageTypes[MessageTypes["REPORT_TO_MOD_TIMEOUT_USER"] = 59] = "REPORT_TO_MOD_TIMEOUT_USER";
    /** A message sent when a user resolves a moderation report by kicking the offending user */
    MessageTypes[MessageTypes["REPORT_TO_MOD_KICK_USER"] = 60] = "REPORT_TO_MOD_KICK_USER";
    /** A message sent when a user resolves a moderation report by banning the offending user */
    MessageTypes[MessageTypes["REPORT_TO_MOD_BAN_USER"] = 61] = "REPORT_TO_MOD_BAN_USER";
    /** A message sent when a user resolves a moderation report */
    MessageTypes[MessageTypes["REPORT_TO_MOD_CLOSED_REPORT"] = 62] = "REPORT_TO_MOD_CLOSED_REPORT";
    /** @deprecated A message sent when a user adds a new emoji to a guild */
    MessageTypes[MessageTypes["EMOJI_ADDED"] = 63] = "EMOJI_ADDED";
    /** A message sent when a user invites another user to join a group Nitro subscription */
    MessageTypes[MessageTypes["PREMIUM_GROUP_INVITE"] = 64] = "PREMIUM_GROUP_INVITE";
    /** A message sent when a user starts a voice channel in a small guild */
    MessageTypes[MessageTypes["VOICE_SESSION"] = 65] = "VOICE_SESSION";
    /** A local-only ephemeral message asking the user to be the first to boost a guild */
    MessageTypes[MessageTypes["GUILD_BOOST_UPSELL"] = 66] = "GUILD_BOOST_UPSELL";
    /** A message sent when a user accepts another user's friend request */
    MessageTypes[MessageTypes["FRIEND_REQUEST_ACCEPTED"] = 67] = "FRIEND_REQUEST_ACCEPTED";
    MessageTypes[MessageTypes["MEDIA_MENTION_MESSAGE"] = 68] = "MEDIA_MENTION_MESSAGE";
})(MessageTypes || (exports.MessageTypes = MessageTypes = {}));
/** Messages of these types cannot be deleted. */
exports.UndeletableMessageTypes = [
    MessageTypes.RECIPIENT_ADD,
    MessageTypes.RECIPIENT_REMOVE,
    MessageTypes.CALL,
    MessageTypes.CHANNEL_NAME_CHANGE,
    MessageTypes.CHANNEL_ICON_CHANGE,
    MessageTypes.THREAD_STARTER_MESSAGE
];
var MessageActivityTypes;
(function (MessageActivityTypes) {
    /** Join activity invite. */
    MessageActivityTypes[MessageActivityTypes["JOIN"] = 1] = "JOIN";
    /** Spectate activity invite. */
    MessageActivityTypes[MessageActivityTypes["SPECTATE"] = 2] = "SPECTATE";
    /** Listen activity invite. */
    MessageActivityTypes[MessageActivityTypes["LISTEN"] = 3] = "LISTEN";
    /** Watch activity invite. */
    MessageActivityTypes[MessageActivityTypes["WATCH"] = 4] = "WATCH";
    /** Join request activity invite. */
    MessageActivityTypes[MessageActivityTypes["JOIN_REQUEST"] = 5] = "JOIN_REQUEST";
})(MessageActivityTypes || (exports.MessageActivityTypes = MessageActivityTypes = {}));
var InteractionTypes;
(function (InteractionTypes) {
    /** Discord is pinging the application */
    InteractionTypes[InteractionTypes["PING"] = 1] = "PING";
    /** User uses an application command */
    InteractionTypes[InteractionTypes["APPLICATION_COMMAND"] = 2] = "APPLICATION_COMMAND";
    /** User triggers a message component */
    InteractionTypes[InteractionTypes["MESSAGE_COMPONENT"] = 3] = "MESSAGE_COMPONENT";
    /** User is requesting an application command option to be auto-completed */
    InteractionTypes[InteractionTypes["APPLICATION_COMMAND_AUTOCOMPLETE"] = 4] = "APPLICATION_COMMAND_AUTOCOMPLETE";
    /** User submits a modal */
    InteractionTypes[InteractionTypes["MODAL_SUBMIT"] = 5] = "MODAL_SUBMIT";
})(InteractionTypes || (exports.InteractionTypes = InteractionTypes = {}));
var InviteTypes;
(function (InviteTypes) {
    /** Joins the user to a guild */
    InviteTypes[InviteTypes["GUILD"] = 0] = "GUILD";
    /** Joins the user to a group DM */
    InviteTypes[InviteTypes["GROUP_DM"] = 1] = "GROUP_DM";
    /** Adds the user as a friend to the inviter */
    InviteTypes[InviteTypes["FRIEND"] = 2] = "FRIEND";
})(InviteTypes || (exports.InviteTypes = InviteTypes = {}));
var InviteTargetTypes;
(function (InviteTargetTypes) {
    /** The invite is for a stream in a voice channel */
    InviteTargetTypes[InviteTargetTypes["STREAM"] = 1] = "STREAM";
    /** The invite is for an embedded application (activity) in a voice channel */
    InviteTargetTypes[InviteTargetTypes["EMBEDDED_APPLICATION"] = 2] = "EMBEDDED_APPLICATION";
    InviteTargetTypes[InviteTargetTypes["ROLE_SUBSCRIPTIONS_PURCHASE"] = 3] = "ROLE_SUBSCRIPTIONS_PURCHASE";
})(InviteTargetTypes || (exports.InviteTargetTypes = InviteTargetTypes = {}));
var GuildScheduledEventPrivacyLevels;
(function (GuildScheduledEventPrivacyLevels) {
    /** Scheduled event or stage instance is only visible to guild members */
    GuildScheduledEventPrivacyLevels[GuildScheduledEventPrivacyLevels["GUILD_ONLY"] = 2] = "GUILD_ONLY";
})(GuildScheduledEventPrivacyLevels || (exports.GuildScheduledEventPrivacyLevels = GuildScheduledEventPrivacyLevels = {}));
var GuildScheduledEventStatuses;
(function (GuildScheduledEventStatuses) {
    /** Scheduled event has not started. */
    GuildScheduledEventStatuses[GuildScheduledEventStatuses["SCHEDULED"] = 1] = "SCHEDULED";
    /** Scheduled event is currently active. */
    GuildScheduledEventStatuses[GuildScheduledEventStatuses["ACTIVE"] = 2] = "ACTIVE";
    /** Scheduled event completed. */
    GuildScheduledEventStatuses[GuildScheduledEventStatuses["COMPLETED"] = 3] = "COMPLETED";
    /** Scheduled event was canceled. */
    GuildScheduledEventStatuses[GuildScheduledEventStatuses["CANCELED"] = 4] = "CANCELED";
})(GuildScheduledEventStatuses || (exports.GuildScheduledEventStatuses = GuildScheduledEventStatuses = {}));
var GuildScheduledEventEntityTypes;
(function (GuildScheduledEventEntityTypes) {
    /** Scheduled event is for a stage instance. */
    GuildScheduledEventEntityTypes[GuildScheduledEventEntityTypes["STAGE_INSTANCE"] = 1] = "STAGE_INSTANCE";
    /** Scheduled event is for a voice channel. */
    GuildScheduledEventEntityTypes[GuildScheduledEventEntityTypes["VOICE"] = 2] = "VOICE";
    /** Scheduled event is external. */
    GuildScheduledEventEntityTypes[GuildScheduledEventEntityTypes["EXTERNAL"] = 3] = "EXTERNAL";
})(GuildScheduledEventEntityTypes || (exports.GuildScheduledEventEntityTypes = GuildScheduledEventEntityTypes = {}));
var StageInstancePrivacyLevels;
(function (StageInstancePrivacyLevels) {
    /** @deprecated Scheduled event or stage instance is visible publicly */
    StageInstancePrivacyLevels[StageInstancePrivacyLevels["PUBLIC"] = 1] = "PUBLIC";
    /** Scheduled event or stage instance is only visible to guild members */
    StageInstancePrivacyLevels[StageInstancePrivacyLevels["GUILD_ONLY"] = 2] = "GUILD_ONLY";
})(StageInstancePrivacyLevels || (exports.StageInstancePrivacyLevels = StageInstancePrivacyLevels = {}));
var AutoModerationEventTypes;
(function (AutoModerationEventTypes) {
    /** When a member sends or edits a message in the guild */
    AutoModerationEventTypes[AutoModerationEventTypes["MESSAGE_SEND"] = 1] = "MESSAGE_SEND";
    AutoModerationEventTypes[AutoModerationEventTypes["MEMBER_UPDATE"] = 2] = "MEMBER_UPDATE";
})(AutoModerationEventTypes || (exports.AutoModerationEventTypes = AutoModerationEventTypes = {}));
var AutoModerationTriggerTypes;
(function (AutoModerationTriggerTypes) {
    /** When message content contains words from a user defined list of keywords (max 6) */
    AutoModerationTriggerTypes[AutoModerationTriggerTypes["KEYWORD"] = 1] = "KEYWORD";
    /** When message content represents generic spam (max 1) */
    AutoModerationTriggerTypes[AutoModerationTriggerTypes["SPAM"] = 3] = "SPAM";
    /** When message content contains words from internal predefined wordsets (max 1) */
    AutoModerationTriggerTypes[AutoModerationTriggerTypes["KEYWORD_PRESET"] = 4] = "KEYWORD_PRESET";
    /** When message content contains more unique mentions than allowed (max 1) */
    AutoModerationTriggerTypes[AutoModerationTriggerTypes["MENTION_SPAM"] = 5] = "MENTION_SPAM";
    AutoModerationTriggerTypes[AutoModerationTriggerTypes["MEMBER_PROFILE"] = 6] = "MEMBER_PROFILE";
})(AutoModerationTriggerTypes || (exports.AutoModerationTriggerTypes = AutoModerationTriggerTypes = {}));
var AutoModerationKeywordPresetTypes;
(function (AutoModerationKeywordPresetTypes) {
    /** Words that may be considered forms of swearing or cursing */
    AutoModerationKeywordPresetTypes[AutoModerationKeywordPresetTypes["PROFANITY"] = 1] = "PROFANITY";
    /** Words that refer to sexually explicit behavior or activity */
    AutoModerationKeywordPresetTypes[AutoModerationKeywordPresetTypes["SEXUAL_CONTENT"] = 2] = "SEXUAL_CONTENT";
    /** Personal insults or words that may be considered hate speech */
    AutoModerationKeywordPresetTypes[AutoModerationKeywordPresetTypes["SLURS"] = 3] = "SLURS";
})(AutoModerationKeywordPresetTypes || (exports.AutoModerationKeywordPresetTypes = AutoModerationKeywordPresetTypes = {}));
var AutoModerationActionTypes;
(function (AutoModerationActionTypes) {
    /** Block a member's message and prevent it from being posted; a custom explanation can be specified and shown to members whenever their message is blocked */
    AutoModerationActionTypes[AutoModerationActionTypes["BLOCK_MESSAGE"] = 1] = "BLOCK_MESSAGE";
    /** Log user content to a specified channel */
    AutoModerationActionTypes[AutoModerationActionTypes["SEND_ALERT_MESSAGE"] = 2] = "SEND_ALERT_MESSAGE";
    AutoModerationActionTypes[AutoModerationActionTypes["TIMEOUT"] = 3] = "TIMEOUT";
    AutoModerationActionTypes[AutoModerationActionTypes["BLOCK_MEMBER_INTERACTION"] = 4] = "BLOCK_MEMBER_INTERACTION";
})(AutoModerationActionTypes || (exports.AutoModerationActionTypes = AutoModerationActionTypes = {}));
var AuditLogActionTypes;
(function (AuditLogActionTypes) {
    /** Guild settings were updated */
    AuditLogActionTypes[AuditLogActionTypes["GUILD_UPDATE"] = 1] = "GUILD_UPDATE";
    /** Channel was created */
    AuditLogActionTypes[AuditLogActionTypes["CHANNEL_CREATE"] = 10] = "CHANNEL_CREATE";
    /** Channel settings were updated */
    AuditLogActionTypes[AuditLogActionTypes["CHANNEL_UPDATE"] = 11] = "CHANNEL_UPDATE";
    /** Channel was deleted */
    AuditLogActionTypes[AuditLogActionTypes["CHANNEL_DELETE"] = 12] = "CHANNEL_DELETE";
    /** Permission overwrite was added to a channel */
    AuditLogActionTypes[AuditLogActionTypes["CHANNEL_OVERWRITE_CREATE"] = 13] = "CHANNEL_OVERWRITE_CREATE";
    /** Permission overwrite was updated for a channel */
    AuditLogActionTypes[AuditLogActionTypes["CHANNEL_OVERWRITE_UPDATE"] = 14] = "CHANNEL_OVERWRITE_UPDATE";
    /** Permission overwrite was deleted from a channel */
    AuditLogActionTypes[AuditLogActionTypes["CHANNEL_OVERWRITE_DELETE"] = 15] = "CHANNEL_OVERWRITE_DELETE";
    /** Member was removed from guild */
    AuditLogActionTypes[AuditLogActionTypes["MEMBER_KICK"] = 20] = "MEMBER_KICK";
    /** Members were pruned from guild */
    AuditLogActionTypes[AuditLogActionTypes["MEMBER_PRUNE"] = 21] = "MEMBER_PRUNE";
    /** Member was banned from guild */
    AuditLogActionTypes[AuditLogActionTypes["MEMBER_BAN_ADD"] = 22] = "MEMBER_BAN_ADD";
    /** Member was unbanned from guild */
    AuditLogActionTypes[AuditLogActionTypes["MEMBER_BAN_REMOVE"] = 23] = "MEMBER_BAN_REMOVE";
    /** Member was updated in guild */
    AuditLogActionTypes[AuditLogActionTypes["MEMBER_UPDATE"] = 24] = "MEMBER_UPDATE";
    /** Member was added or removed from a role */
    AuditLogActionTypes[AuditLogActionTypes["MEMBER_ROLE_UPDATE"] = 25] = "MEMBER_ROLE_UPDATE";
    /** Member was moved to a different voice channel */
    AuditLogActionTypes[AuditLogActionTypes["MEMBER_MOVE"] = 26] = "MEMBER_MOVE";
    /** Member was disconnected from a voice channel */
    AuditLogActionTypes[AuditLogActionTypes["MEMBER_DISCONNECT"] = 27] = "MEMBER_DISCONNECT";
    /** Bot user was added to guild */
    AuditLogActionTypes[AuditLogActionTypes["BOT_ADD"] = 28] = "BOT_ADD";
    /** Role was created */
    AuditLogActionTypes[AuditLogActionTypes["ROLE_CREATE"] = 30] = "ROLE_CREATE";
    /** Role was edited */
    AuditLogActionTypes[AuditLogActionTypes["ROLE_UPDATE"] = 31] = "ROLE_UPDATE";
    /** Role was deleted */
    AuditLogActionTypes[AuditLogActionTypes["ROLE_DELETE"] = 32] = "ROLE_DELETE";
    /** Guild invite was created */
    AuditLogActionTypes[AuditLogActionTypes["INVITE_CREATE"] = 40] = "INVITE_CREATE";
    /** Guild invite was updated */
    AuditLogActionTypes[AuditLogActionTypes["INVITE_UPDATE"] = 41] = "INVITE_UPDATE";
    /** Guild invite was deleted */
    AuditLogActionTypes[AuditLogActionTypes["INVITE_DELETE"] = 42] = "INVITE_DELETE";
    /** Webhook was created */
    AuditLogActionTypes[AuditLogActionTypes["WEBHOOK_CREATE"] = 50] = "WEBHOOK_CREATE";
    /** Webhook properties or channel were updated */
    AuditLogActionTypes[AuditLogActionTypes["WEBHOOK_UPDATE"] = 51] = "WEBHOOK_UPDATE";
    /** Webhook was deleted */
    AuditLogActionTypes[AuditLogActionTypes["WEBHOOK_DELETE"] = 52] = "WEBHOOK_DELETE";
    /** Emoji was created */
    AuditLogActionTypes[AuditLogActionTypes["EMOJI_CREATE"] = 60] = "EMOJI_CREATE";
    /** Emoji name was updated */
    AuditLogActionTypes[AuditLogActionTypes["EMOJI_UPDATE"] = 61] = "EMOJI_UPDATE";
    /** Emoji was deleted */
    AuditLogActionTypes[AuditLogActionTypes["EMOJI_DELETE"] = 62] = "EMOJI_DELETE";
    /** Single message was deleted */
    AuditLogActionTypes[AuditLogActionTypes["MESSAGE_DELETE"] = 72] = "MESSAGE_DELETE";
    /** Multiple messages were deleted */
    AuditLogActionTypes[AuditLogActionTypes["MESSAGE_BULK_DELETE"] = 73] = "MESSAGE_BULK_DELETE";
    /** Message was pinned to a channel */
    AuditLogActionTypes[AuditLogActionTypes["MESSAGE_PIN"] = 74] = "MESSAGE_PIN";
    /** Message was unpinned from a channel */
    AuditLogActionTypes[AuditLogActionTypes["MESSAGE_UNPIN"] = 75] = "MESSAGE_UNPIN";
    /** Integration was added to guild */
    AuditLogActionTypes[AuditLogActionTypes["INTEGRATION_CREATE"] = 80] = "INTEGRATION_CREATE";
    /** Integration was updated (e.g. its scopes were updated) */
    AuditLogActionTypes[AuditLogActionTypes["INTEGRATION_UPDATE"] = 81] = "INTEGRATION_UPDATE";
    /** Integration was removed from guild */
    AuditLogActionTypes[AuditLogActionTypes["INTEGRATION_DELETE"] = 82] = "INTEGRATION_DELETE";
    /** Stage instance was created (stage channel becomes live) */
    AuditLogActionTypes[AuditLogActionTypes["STAGE_INSTANCE_CREATE"] = 83] = "STAGE_INSTANCE_CREATE";
    /** Stage instance details were updated */
    AuditLogActionTypes[AuditLogActionTypes["STAGE_INSTANCE_UPDATE"] = 84] = "STAGE_INSTANCE_UPDATE";
    /** Stage instance was deleted (stage channel no longer live) */
    AuditLogActionTypes[AuditLogActionTypes["STAGE_INSTANCE_DELETE"] = 85] = "STAGE_INSTANCE_DELETE";
    /** Sticker was created */
    AuditLogActionTypes[AuditLogActionTypes["STICKER_CREATE"] = 90] = "STICKER_CREATE";
    /** Sticker details were updated */
    AuditLogActionTypes[AuditLogActionTypes["STICKER_UPDATE"] = 91] = "STICKER_UPDATE";
    /** Sticker was deleted */
    AuditLogActionTypes[AuditLogActionTypes["STICKER_DELETE"] = 92] = "STICKER_DELETE";
    /** Event was created */
    AuditLogActionTypes[AuditLogActionTypes["GUILD_SCHEDULED_EVENT_CREATE"] = 100] = "GUILD_SCHEDULED_EVENT_CREATE";
    /** Event was updated */
    AuditLogActionTypes[AuditLogActionTypes["GUILD_SCHEDULED_EVENT_UPDATE"] = 101] = "GUILD_SCHEDULED_EVENT_UPDATE";
    /** Event was cancelled */
    AuditLogActionTypes[AuditLogActionTypes["GUILD_SCHEDULED_EVENT_DELETE"] = 102] = "GUILD_SCHEDULED_EVENT_DELETE";
    /** Thread was created in a channel */
    AuditLogActionTypes[AuditLogActionTypes["THREAD_CREATE"] = 110] = "THREAD_CREATE";
    /** Thread was updated */
    AuditLogActionTypes[AuditLogActionTypes["THREAD_UPDATE"] = 111] = "THREAD_UPDATE";
    /** Thread was deleted */
    AuditLogActionTypes[AuditLogActionTypes["THREAD_DELETE"] = 112] = "THREAD_DELETE";
    /** Permissions were updated for a command */
    AuditLogActionTypes[AuditLogActionTypes["APPLICATION_COMMAND_PERMISSION_UPDATE"] = 121] = "APPLICATION_COMMAND_PERMISSION_UPDATE";
    /** Soundboard sound was created */
    AuditLogActionTypes[AuditLogActionTypes["SOUNDBOARD_SOUND_CREATE"] = 130] = "SOUNDBOARD_SOUND_CREATE";
    /** Soundboard sound was updated */
    AuditLogActionTypes[AuditLogActionTypes["SOUNDBOARD_SOUND_UPDATE"] = 131] = "SOUNDBOARD_SOUND_UPDATE";
    /** Soundboard sound was deleted */
    AuditLogActionTypes[AuditLogActionTypes["SOUNDBOARD_SOUND_DELETE"] = 132] = "SOUNDBOARD_SOUND_DELETE";
    /** AutoMod rule was created */
    AuditLogActionTypes[AuditLogActionTypes["AUTO_MODERATION_RULE_CREATE"] = 140] = "AUTO_MODERATION_RULE_CREATE";
    /** AutoMod rule was updated */
    AuditLogActionTypes[AuditLogActionTypes["AUTO_MODERATION_RULE_UPDATE"] = 141] = "AUTO_MODERATION_RULE_UPDATE";
    /** AutoMod rule was deleted */
    AuditLogActionTypes[AuditLogActionTypes["AUTO_MODERATION_RULE_DELETE"] = 142] = "AUTO_MODERATION_RULE_DELETE";
    /** Message was blocked by AutoMod */
    AuditLogActionTypes[AuditLogActionTypes["AUTO_MODERATION_BLOCK_MESSAGE"] = 143] = "AUTO_MODERATION_BLOCK_MESSAGE";
    /** Message was flagged by AutoMod */
    AuditLogActionTypes[AuditLogActionTypes["AUTO_MODERATION_FLAG_TO_CHANNEL"] = 144] = "AUTO_MODERATION_FLAG_TO_CHANNEL";
    /** Member was timed out by AutoMod */
    AuditLogActionTypes[AuditLogActionTypes["AUTO_MODERATION_USER_COMMUNICATION_DISABLED"] = 145] = "AUTO_MODERATION_USER_COMMUNICATION_DISABLED";
    /** Member was quarantined by AutoMod */
    AuditLogActionTypes[AuditLogActionTypes["AUTO_MODERATION_QUARANTINE_USER"] = 146] = "AUTO_MODERATION_QUARANTINE_USER";
    /** Creator monetization request was created */
    AuditLogActionTypes[AuditLogActionTypes["CREATOR_MONETIZATION_REQUEST_CREATED"] = 150] = "CREATOR_MONETIZATION_REQUEST_CREATED";
    /** Creator monetization terms were accepted */
    AuditLogActionTypes[AuditLogActionTypes["CREATOR_MONETIZATION_TERMS_ACCEPTED"] = 151] = "CREATOR_MONETIZATION_TERMS_ACCEPTED";
    AuditLogActionTypes[AuditLogActionTypes["ROLE_PROMPT_CREATE"] = 160] = "ROLE_PROMPT_CREATE";
    AuditLogActionTypes[AuditLogActionTypes["ROLE_PROMPT_UPDATE"] = 161] = "ROLE_PROMPT_UPDATE";
    AuditLogActionTypes[AuditLogActionTypes["ROLE_PROMPT_DELETE"] = 162] = "ROLE_PROMPT_DELETE";
    /** Onboarding prompt was created */
    AuditLogActionTypes[AuditLogActionTypes["ONBOARDING_PROMPT_CREATE"] = 163] = "ONBOARDING_PROMPT_CREATE";
    /** Onboarding prompt was updated */
    AuditLogActionTypes[AuditLogActionTypes["ONBOARDING_PROMPT_UPDATE"] = 164] = "ONBOARDING_PROMPT_UPDATE";
    /** Onboarding prompt was deleted */
    AuditLogActionTypes[AuditLogActionTypes["ONBOARDING_PROMPT_DELETE"] = 165] = "ONBOARDING_PROMPT_DELETE";
    /** Onboarding was initialized */
    AuditLogActionTypes[AuditLogActionTypes["ONBOARDING_CREATE"] = 166] = "ONBOARDING_CREATE";
    /** Onboarding was updated */
    AuditLogActionTypes[AuditLogActionTypes["ONBOARDING_UPDATE"] = 167] = "ONBOARDING_UPDATE";
    /** Message was featured in guild home */
    AuditLogActionTypes[AuditLogActionTypes["GUILD_HOME_FEATURE_ITEM"] = 171] = "GUILD_HOME_FEATURE_ITEM";
    /** Message was removed from guild home */
    AuditLogActionTypes[AuditLogActionTypes["GUILD_HOME_REMOVE_ITEM"] = 172] = "GUILD_HOME_REMOVE_ITEM";
    /** @deprecated Message blocked by harmful links filter */
    AuditLogActionTypes[AuditLogActionTypes["HARMFUL_LINKS_BLOCKED_MESSAGE"] = 180] = "HARMFUL_LINKS_BLOCKED_MESSAGE";
    /** New member welcome was initialized */
    AuditLogActionTypes[AuditLogActionTypes["HOME_SETTINGS_CREATE"] = 190] = "HOME_SETTINGS_CREATE";
    /** New member welcome was updated */
    AuditLogActionTypes[AuditLogActionTypes["HOME_SETTINGS_UPDATE"] = 191] = "HOME_SETTINGS_UPDATE";
    /** Voice channel status was updated */
    AuditLogActionTypes[AuditLogActionTypes["VOICE_CHANNEL_STATUS_CREATE"] = 192] = "VOICE_CHANNEL_STATUS_CREATE";
    /** Voice channel status was deleted */
    AuditLogActionTypes[AuditLogActionTypes["VOICE_CHANNEL_STATUS_DELETE"] = 193] = "VOICE_CHANNEL_STATUS_DELETE";
    /** @deprecated Clyde AI profile was updated */
    AuditLogActionTypes[AuditLogActionTypes["CLYDE_AI_PROFILE_UPDATE"] = 194] = "CLYDE_AI_PROFILE_UPDATE";
    /** Exception was created for a guild scheduled event */
    AuditLogActionTypes[AuditLogActionTypes["GUILD_SCHEDULED_EVENT_EXCEPTION_CREATE"] = 200] = "GUILD_SCHEDULED_EVENT_EXCEPTION_CREATE";
    /** Exception was updated for a guild scheduled event */
    AuditLogActionTypes[AuditLogActionTypes["GUILD_SCHEDULED_EVENT_EXCEPTION_UPDATE"] = 201] = "GUILD_SCHEDULED_EVENT_EXCEPTION_UPDATE";
    /** Exception was deleted for a guild scheduled event */
    AuditLogActionTypes[AuditLogActionTypes["GUILD_SCHEDULED_EVENT_EXCEPTION_DELETE"] = 202] = "GUILD_SCHEDULED_EVENT_EXCEPTION_DELETE";
    /** Member verification settings were updated */
    AuditLogActionTypes[AuditLogActionTypes["GUILD_MEMBER_VERIFICATION_UPDATE"] = 210] = "GUILD_MEMBER_VERIFICATION_UPDATE";
    /** Guild profile was updated */
    AuditLogActionTypes[AuditLogActionTypes["GUILD_PROFILE_UPDATE"] = 211] = "GUILD_PROFILE_UPDATE";
    AuditLogActionTypes[AuditLogActionTypes["PIN_PERMISSION_MIGRATION_COMPLETE"] = 212] = "PIN_PERMISSION_MIGRATION_COMPLETE";
    AuditLogActionTypes[AuditLogActionTypes["BYPASS_SLOWMODE_PERMISSION_MIGRATION_COM"] = 213] = "BYPASS_SLOWMODE_PERMISSION_MIGRATION_COM";
})(AuditLogActionTypes || (exports.AuditLogActionTypes = AuditLogActionTypes = {}));
var ApplicationCommandTypes;
(function (ApplicationCommandTypes) {
    /** Slash commands; a text-based command that shows up when a user types `/` */
    ApplicationCommandTypes[ApplicationCommandTypes["CHAT_INPUT"] = 1] = "CHAT_INPUT";
    /** An UI-based command that shows up when you right click or tap on an user */
    ApplicationCommandTypes[ApplicationCommandTypes["USER"] = 2] = "USER";
    /** An UI-based command that shows up when you right click or tap on a message */
    ApplicationCommandTypes[ApplicationCommandTypes["MESSAGE"] = 3] = "MESSAGE";
    /** An UI-based command that represents the primary way to invoke an app's activity */
    ApplicationCommandTypes[ApplicationCommandTypes["PRIMARY_ENTRY_POINT"] = 4] = "PRIMARY_ENTRY_POINT";
})(ApplicationCommandTypes || (exports.ApplicationCommandTypes = ApplicationCommandTypes = {}));
var ApplicationCommandOptionTypes;
(function (ApplicationCommandOptionTypes) {
    /** A subcommand */
    ApplicationCommandOptionTypes[ApplicationCommandOptionTypes["SUB_COMMAND"] = 1] = "SUB_COMMAND";
    /** A group of subcommands */
    ApplicationCommandOptionTypes[ApplicationCommandOptionTypes["SUB_COMMAND_GROUP"] = 2] = "SUB_COMMAND_GROUP";
    /** A string */
    ApplicationCommandOptionTypes[ApplicationCommandOptionTypes["STRING"] = 3] = "STRING";
    /** An integer between -253 and */
    ApplicationCommandOptionTypes[ApplicationCommandOptionTypes["INTEGER"] = 4] = "INTEGER";
    /** A boolean */
    ApplicationCommandOptionTypes[ApplicationCommandOptionTypes["BOOLEAN"] = 5] = "BOOLEAN";
    /** An user */
    ApplicationCommandOptionTypes[ApplicationCommandOptionTypes["USER"] = 6] = "USER";
    /** A channel (includes all channel types by default) */
    ApplicationCommandOptionTypes[ApplicationCommandOptionTypes["CHANNEL"] = 7] = "CHANNEL";
    /** A role */
    ApplicationCommandOptionTypes[ApplicationCommandOptionTypes["ROLE"] = 8] = "ROLE";
    /** A mentionable entity (currently only users and roles) */
    ApplicationCommandOptionTypes[ApplicationCommandOptionTypes["MENTIONABLE"] = 9] = "MENTIONABLE";
    /** A float/integer between -253 and */
    ApplicationCommandOptionTypes[ApplicationCommandOptionTypes["NUMBER"] = 10] = "NUMBER";
    /** An attachment */
    ApplicationCommandOptionTypes[ApplicationCommandOptionTypes["ATTACHMENT"] = 11] = "ATTACHMENT";
})(ApplicationCommandOptionTypes || (exports.ApplicationCommandOptionTypes = ApplicationCommandOptionTypes = {}));
var ApplicationCommandPermissionTypes;
(function (ApplicationCommandPermissionTypes) {
    /** A role within a guild */
    ApplicationCommandPermissionTypes[ApplicationCommandPermissionTypes["ROLE"] = 1] = "ROLE";
    /** A guild member */
    ApplicationCommandPermissionTypes[ApplicationCommandPermissionTypes["USER"] = 2] = "USER";
    /** A channel within a guild */
    ApplicationCommandPermissionTypes[ApplicationCommandPermissionTypes["CHANNEL"] = 3] = "CHANNEL";
})(ApplicationCommandPermissionTypes || (exports.ApplicationCommandPermissionTypes = ApplicationCommandPermissionTypes = {}));
var InteractionResponseTypes;
(function (InteractionResponseTypes) {
    /** Acknowledge a `PING` interaction */
    InteractionResponseTypes[InteractionResponseTypes["PONG"] = 1] = "PONG";
    /** Respond to an interaction with a message */
    InteractionResponseTypes[InteractionResponseTypes["CHANNEL_MESSAGE_WITH_SOURCE"] = 4] = "CHANNEL_MESSAGE_WITH_SOURCE";
    /** Acknowledge an interaction and send a message later; the user sees a loading state */
    InteractionResponseTypes[InteractionResponseTypes["DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE"] = 5] = "DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE";
    /** Acknowledge an interaction and edit the original message later; the user does not see a loading state */
    InteractionResponseTypes[InteractionResponseTypes["DEFERRED_UPDATE_MESSAGE"] = 6] = "DEFERRED_UPDATE_MESSAGE";
    /** Edit the message that the interacted component was attached to */
    InteractionResponseTypes[InteractionResponseTypes["UPDATE_MESSAGE"] = 7] = "UPDATE_MESSAGE";
    /** Respond to an autocomplete interaction with suggested choices */
    InteractionResponseTypes[InteractionResponseTypes["APPLICATION_COMMAND_AUTOCOMPLETE_RESULT"] = 8] = "APPLICATION_COMMAND_AUTOCOMPLETE_RESULT";
    /** Respond to an interaction with a popup modal */
    InteractionResponseTypes[InteractionResponseTypes["MODAL"] = 9] = "MODAL";
    /** @deprecated */
    InteractionResponseTypes[InteractionResponseTypes["PREMIUM_REQUIRED"] = 10] = "PREMIUM_REQUIRED";
    /** Launch an embedded activity associated with the application */
    InteractionResponseTypes[InteractionResponseTypes["LAUNCH_ACTIVITY"] = 12] = "LAUNCH_ACTIVITY";
})(InteractionResponseTypes || (exports.InteractionResponseTypes = InteractionResponseTypes = {}));
var EntryPointCommandHandlerTypes;
(function (EntryPointCommandHandlerTypes) {
    /** The application handles the interaction using an interaction token */
    EntryPointCommandHandlerTypes[EntryPointCommandHandlerTypes["APP_HANDLER"] = 1] = "APP_HANDLER";
    /** Discord handles the interaction by launching an embedded activity and sending a follow-up message without coordinating with the app */
    EntryPointCommandHandlerTypes[EntryPointCommandHandlerTypes["DISCORD_LAUNCH_ACTIVITY"] = 2] = "DISCORD_LAUNCH_ACTIVITY";
})(EntryPointCommandHandlerTypes || (exports.EntryPointCommandHandlerTypes = EntryPointCommandHandlerTypes = {}));
var Intents;
(function (Intents) {
    /** Guilds and unavailable guild events. */
    Intents[Intents["GUILDS"] = 1] = "GUILDS";
    /** Guild member events. */
    Intents[Intents["GUILD_MEMBERS"] = 2] = "GUILD_MEMBERS";
    /** Guild moderation events, including bans. */
    Intents[Intents["GUILD_MODERATION"] = 4] = "GUILD_MODERATION";
    /** @deprecated Guild emoji and sticker events. Use `GUILD_EXPRESSIONS`. */
    Intents[Intents["GUILD_EMOJIS_AND_STICKERS"] = 8] = "GUILD_EMOJIS_AND_STICKERS";
    /** Guild emoji, sticker, and soundboard expression events. */
    Intents[Intents["GUILD_EXPRESSIONS"] = 8] = "GUILD_EXPRESSIONS";
    /** Guild integration events. */
    Intents[Intents["GUILD_INTEGRATIONS"] = 16] = "GUILD_INTEGRATIONS";
    /** Guild webhook events. */
    Intents[Intents["GUILD_WEBHOOKS"] = 32] = "GUILD_WEBHOOKS";
    /** Guild invite events. */
    Intents[Intents["GUILD_INVITES"] = 64] = "GUILD_INVITES";
    /** Guild voice state events. */
    Intents[Intents["GUILD_VOICE_STATES"] = 128] = "GUILD_VOICE_STATES";
    /** Guild presence events. */
    Intents[Intents["GUILD_PRESENCES"] = 256] = "GUILD_PRESENCES";
    /** Guild message create/update/delete events. */
    Intents[Intents["GUILD_MESSAGES"] = 512] = "GUILD_MESSAGES";
    /** Guild message reaction events. */
    Intents[Intents["GUILD_MESSAGE_REACTIONS"] = 1024] = "GUILD_MESSAGE_REACTIONS";
    /** Guild message typing events. */
    Intents[Intents["GUILD_MESSAGE_TYPING"] = 2048] = "GUILD_MESSAGE_TYPING";
    /** Direct message create/update/delete events. */
    Intents[Intents["DIRECT_MESSAGES"] = 4096] = "DIRECT_MESSAGES";
    /** Direct message reaction events. */
    Intents[Intents["DIRECT_MESSAGE_REACTIONS"] = 8192] = "DIRECT_MESSAGE_REACTIONS";
    /** Direct message typing events. */
    Intents[Intents["DIRECT_MESSAGE_TYPING"] = 16384] = "DIRECT_MESSAGE_TYPING";
    /** Message content fields for message events. */
    Intents[Intents["MESSAGE_CONTENT"] = 32768] = "MESSAGE_CONTENT";
    /** Guild scheduled event events. */
    Intents[Intents["GUILD_SCHEDULED_EVENTS"] = 65536] = "GUILD_SCHEDULED_EVENTS";
    /** Auto Moderation rule create/update/delete events. */
    Intents[Intents["AUTO_MODERATION_CONFIGURATION"] = 1048576] = "AUTO_MODERATION_CONFIGURATION";
    /** Auto Moderation action execution events. */
    Intents[Intents["AUTO_MODERATION_EXECUTION"] = 2097152] = "AUTO_MODERATION_EXECUTION";
    /** Guild poll vote events. */
    Intents[Intents["GUILD_MESSAGE_POLLS"] = 16777216] = "GUILD_MESSAGE_POLLS";
    /** Direct message poll vote events. */
    Intents[Intents["DIRECT_MESSAGE_POLLS"] = 33554432] = "DIRECT_MESSAGE_POLLS";
})(Intents || (exports.Intents = Intents = {}));
// @TODO: find a way to make the above not manual, if possible
exports.NonPrivilegedIntents = [
    Intents.GUILDS,
    Intents.GUILD_MODERATION,
    Intents.GUILD_EXPRESSIONS,
    Intents.GUILD_INTEGRATIONS,
    Intents.GUILD_WEBHOOKS,
    Intents.GUILD_INVITES,
    Intents.GUILD_VOICE_STATES,
    Intents.GUILD_MESSAGES,
    Intents.GUILD_MESSAGE_REACTIONS,
    Intents.GUILD_MESSAGE_TYPING,
    Intents.DIRECT_MESSAGES,
    Intents.DIRECT_MESSAGE_REACTIONS,
    Intents.DIRECT_MESSAGE_TYPING,
    Intents.GUILD_SCHEDULED_EVENTS,
    Intents.AUTO_MODERATION_CONFIGURATION,
    Intents.AUTO_MODERATION_EXECUTION,
    Intents.GUILD_MESSAGE_POLLS,
    Intents.DIRECT_MESSAGE_POLLS
];
exports.AllNonPrivilegedIntents = exports.NonPrivilegedIntents.reduce((all, p) => all | p, 0);
exports.PrivilegedIntents = [
    Intents.GUILD_MEMBERS,
    Intents.GUILD_PRESENCES,
    Intents.MESSAGE_CONTENT
];
exports.AllPrivilegedIntents = exports.PrivilegedIntents.reduce((all, p) => all | p, 0);
exports.AllIntents = exports.AllNonPrivilegedIntents | exports.AllPrivilegedIntents;
exports.PrivilegedIntentMapping = [
    [Intents.GUILD_PRESENCES, [ApplicationFlags.GATEWAY_PRESENCE, ApplicationFlags.GATEWAY_PRESENCE_LIMITED]],
    [Intents.GUILD_MEMBERS, [ApplicationFlags.GATEWAY_GUILD_MEMBERS, ApplicationFlags.GATEWAY_GUILD_MEMBERS_LIMITED]],
    [Intents.MESSAGE_CONTENT, [ApplicationFlags.GATEWAY_MESSAGE_CONTENT, ApplicationFlags.GATEWAY_MESSAGE_CONTENT_LIMITED]]
];
var GatewayOPCodes;
(function (GatewayOPCodes) {
    /** An event was dispatched */
    GatewayOPCodes[GatewayOPCodes["DISPATCH"] = 0] = "DISPATCH";
    /** Keep the WebSocket connection alive */
    GatewayOPCodes[GatewayOPCodes["HEARTBEAT"] = 1] = "HEARTBEAT";
    /** Start a new session during the initial handshake */
    GatewayOPCodes[GatewayOPCodes["IDENTIFY"] = 2] = "IDENTIFY";
    /** Update the client's presence */
    GatewayOPCodes[GatewayOPCodes["PRESENCE_UPDATE"] = 3] = "PRESENCE_UPDATE";
    /** Join/leave or move between voice channels and calls */
    GatewayOPCodes[GatewayOPCodes["VOICE_STATE_UPDATE"] = 4] = "VOICE_STATE_UPDATE";
    /** Resume a previous session that was disconnected */
    GatewayOPCodes[GatewayOPCodes["RESUME"] = 6] = "RESUME";
    /** You should attempt to reconnect and resume immediately */
    GatewayOPCodes[GatewayOPCodes["RECONNECT"] = 7] = "RECONNECT";
    /** Request information about guild members */
    GatewayOPCodes[GatewayOPCodes["REQUEST_GUILD_MEMBERS"] = 8] = "REQUEST_GUILD_MEMBERS";
    /** The session has been invalidated. You should reconnect and identify/resume accordingly */
    GatewayOPCodes[GatewayOPCodes["INVALID_SESSION"] = 9] = "INVALID_SESSION";
    /** Sent immediately after connecting, contains the `heartbeat_interval` to use */
    GatewayOPCodes[GatewayOPCodes["HELLO"] = 10] = "HELLO";
    /** Acknowledge a received heartbeat */
    GatewayOPCodes[GatewayOPCodes["HEARTBEAT_ACK"] = 11] = "HEARTBEAT_ACK";
    /** Request soundboard sounds for guilds */
    GatewayOPCodes[GatewayOPCodes["REQUEST_SOUNDBOARD_SOUNDS"] = 31] = "REQUEST_SOUNDBOARD_SOUNDS";
    /** Request extra voice channel fields for a guild */
    GatewayOPCodes[GatewayOPCodes["REQUEST_CHANNEL_INFO"] = 43] = "REQUEST_CHANNEL_INFO";
})(GatewayOPCodes || (exports.GatewayOPCodes = GatewayOPCodes = {}));
var GatewayCloseCodes;
(function (GatewayCloseCodes) {
    /** We're not sure what went wrong. Try reconnecting? */
    GatewayCloseCodes[GatewayCloseCodes["UNKNOWN_ERROR"] = 4000] = "UNKNOWN_ERROR";
    /** You sent an invalid Gateway opcode or an invalid payload for an opcode. Don't do that! */
    GatewayCloseCodes[GatewayCloseCodes["UNKNOWN_OPCODE"] = 4001] = "UNKNOWN_OPCODE";
    /** You sent an invalid payload. Don't do that! */
    GatewayCloseCodes[GatewayCloseCodes["DECODE_ERROR"] = 4002] = "DECODE_ERROR";
    /** You sent us a payload prior to identifying, or this session has been invalidated */
    GatewayCloseCodes[GatewayCloseCodes["NOT_AUTHENTICATED"] = 4003] = "NOT_AUTHENTICATED";
    /** The account token sent with your identify payload is incorrect */
    GatewayCloseCodes[GatewayCloseCodes["AUTHENTICATION_FAILED"] = 4004] = "AUTHENTICATION_FAILED";
    /** You sent more than one identify payload. Don't do that! */
    GatewayCloseCodes[GatewayCloseCodes["ALREADY_AUTHENTICATED"] = 4005] = "ALREADY_AUTHENTICATED";
    /** The sequence sent when resuming the session was invalid. Reconnect and start a new session */
    GatewayCloseCodes[GatewayCloseCodes["INVALID_SEQUENCE"] = 4007] = "INVALID_SEQUENCE";
    /** Woah nelly! You're sending payloads too quickly. Slow it down! You will be disconnected on receiving this */
    GatewayCloseCodes[GatewayCloseCodes["RATE_LIMITED"] = 4008] = "RATE_LIMITED";
    /** Your session timed out. Reconnect and start a new one */
    GatewayCloseCodes[GatewayCloseCodes["SESSION_TIMEOUT"] = 4009] = "SESSION_TIMEOUT";
    /** You sent us an invalid shard when identifying */
    GatewayCloseCodes[GatewayCloseCodes["INVALID_SHARD"] = 4010] = "INVALID_SHARD";
    /** The session would have handled too many guilds—you are required to shard your connection in order to connect */
    GatewayCloseCodes[GatewayCloseCodes["SHARDING_REQUIRED"] = 4011] = "SHARDING_REQUIRED";
    /** You sent an invalid version for the Gateway */
    GatewayCloseCodes[GatewayCloseCodes["INVALID_API_VERSION"] = 4012] = "INVALID_API_VERSION";
    /** You sent an invalid intent for a Gateway intent. You may have incorrectly calculated the bitwise value */
    GatewayCloseCodes[GatewayCloseCodes["INVALID_INTENTS"] = 4013] = "INVALID_INTENTS";
    /** You sent a disallowed intent for a Gateway intent. You may have tried to specify an intent that you have not enabled or are not approved for */
    GatewayCloseCodes[GatewayCloseCodes["DISALLOWED_INTENTS"] = 4014] = "DISALLOWED_INTENTS";
})(GatewayCloseCodes || (exports.GatewayCloseCodes = GatewayCloseCodes = {}));
var VoiceOPCodes;
(function (VoiceOPCodes) {
    /** Start a new voice WebSocket connection */
    VoiceOPCodes[VoiceOPCodes["IDENTIFY"] = 0] = "IDENTIFY";
    /** Select the voice protocol */
    VoiceOPCodes[VoiceOPCodes["SELECT_PROTOCOL"] = 1] = "SELECT_PROTOCOL";
    /** Complete the WebSocket handshake */
    VoiceOPCodes[VoiceOPCodes["READY"] = 2] = "READY";
    /** Keep the WebSocket connection alive */
    VoiceOPCodes[VoiceOPCodes["HEARTBEAT"] = 3] = "HEARTBEAT";
    /** Describe the session */
    VoiceOPCodes[VoiceOPCodes["SESSION_DESCRIPTION"] = 4] = "SESSION_DESCRIPTION";
    /** Indicate which users are speaking */
    VoiceOPCodes[VoiceOPCodes["SPEAKING"] = 5] = "SPEAKING";
    /** Acknowledge a received heartbeat */
    VoiceOPCodes[VoiceOPCodes["HEARTBEAT_ACK"] = 6] = "HEARTBEAT_ACK";
    /** Resume a previous session that was disconnected */
    VoiceOPCodes[VoiceOPCodes["RESUME"] = 7] = "RESUME";
    /** Sent immediately after connecting, contains the `heartbeat_interval` to use */
    VoiceOPCodes[VoiceOPCodes["HELLO"] = 8] = "HELLO";
    /** Response to acknowledging a successful resume */
    VoiceOPCodes[VoiceOPCodes["RESUMED"] = 9] = "RESUMED";
    /** Indicate that clients have connected to the voice channel */
    VoiceOPCodes[VoiceOPCodes["CLIENTS_CONNECT"] = 11] = "CLIENTS_CONNECT";
    /** Indicate that a client has disconnected from the voice channel */
    VoiceOPCodes[VoiceOPCodes["CLIENT_DISCONNECT"] = 13] = "CLIENT_DISCONNECT";
})(VoiceOPCodes || (exports.VoiceOPCodes = VoiceOPCodes = {}));
var VoiceCloseCodes;
(function (VoiceCloseCodes) {
    /** You sent an invalid opcode */
    VoiceCloseCodes[VoiceCloseCodes["UNKNOWN_OPCODE"] = 4001] = "UNKNOWN_OPCODE";
    /** You sent a invalid payload in your identifying to the Gateway */
    VoiceCloseCodes[VoiceCloseCodes["DECODE_ERROR"] = 4002] = "DECODE_ERROR";
    /** You sent a payload before identifying with the Gateway */
    VoiceCloseCodes[VoiceCloseCodes["NOT_AUTHENTICATED"] = 4003] = "NOT_AUTHENTICATED";
    /** The token you sent in your identify payload is incorrect */
    VoiceCloseCodes[VoiceCloseCodes["AUTHENTICATION_FAILED"] = 4004] = "AUTHENTICATION_FAILED";
    /** You sent more than one identify payload. Stahp */
    VoiceCloseCodes[VoiceCloseCodes["ALREADY_AUTHENTICATED"] = 4005] = "ALREADY_AUTHENTICATED";
    /** Your session is no longer valid */
    VoiceCloseCodes[VoiceCloseCodes["INVALID_SESSION"] = 4006] = "INVALID_SESSION";
    /** Your session has timed out */
    VoiceCloseCodes[VoiceCloseCodes["SESSION_TIMEOUT"] = 4009] = "SESSION_TIMEOUT";
    /** We can't find the server you're trying to connect to */
    VoiceCloseCodes[VoiceCloseCodes["SERVER_NOT_FOUND"] = 4011] = "SERVER_NOT_FOUND";
    /** We didn't recognize the protocol you sent */
    VoiceCloseCodes[VoiceCloseCodes["UNKNOWN_PROTOCOL"] = 4012] = "UNKNOWN_PROTOCOL";
    /** Disconnect individual client (you were kicked, the main Gateway session was dropped, etc.). Should not reconnect */
    VoiceCloseCodes[VoiceCloseCodes["DISCONNECTED"] = 4013] = "DISCONNECTED";
    /** The server crashed. Our bad! Try resuming */
    VoiceCloseCodes[VoiceCloseCodes["VOICE_SERVER_CRASHED"] = 4014] = "VOICE_SERVER_CRASHED";
    /** We didn't recognize your encryption */
    VoiceCloseCodes[VoiceCloseCodes["UNKNOWN_ENCRYPTION_MODE"] = 4015] = "UNKNOWN_ENCRYPTION_MODE";
})(VoiceCloseCodes || (exports.VoiceCloseCodes = VoiceCloseCodes = {}));
var HubTypes;
(function (HubTypes) {
    /** Student hub is not categorized as a high school or post-secondary institution */
    HubTypes[HubTypes["DEFAULT"] = 0] = "DEFAULT";
    /** Student hub is for a high school */
    HubTypes[HubTypes["HIGH_SCHOOL"] = 1] = "HIGH_SCHOOL";
    /** Student hub is for a post-secondary institution (college or university) */
    HubTypes[HubTypes["COLLEGE"] = 2] = "COLLEGE";
})(HubTypes || (exports.HubTypes = HubTypes = {}));
var ActivityTypes;
(function (ActivityTypes) {
    ActivityTypes[ActivityTypes["GAME"] = 0] = "GAME";
    ActivityTypes[ActivityTypes["STREAMING"] = 1] = "STREAMING";
    ActivityTypes[ActivityTypes["LISTENING"] = 2] = "LISTENING";
    ActivityTypes[ActivityTypes["WATCHING"] = 3] = "WATCHING";
    ActivityTypes[ActivityTypes["CUSTOM"] = 4] = "CUSTOM";
    ActivityTypes[ActivityTypes["COMPETING"] = 5] = "COMPETING";
    ActivityTypes[ActivityTypes["HANG_STATUS"] = 6] = "HANG_STATUS";
})(ActivityTypes || (exports.ActivityTypes = ActivityTypes = {}));
var ActivityFlags;
(function (ActivityFlags) {
    /** Activity is an instanced game session (a match that will end) */
    ActivityFlags[ActivityFlags["INSTANCE"] = 1] = "INSTANCE";
    /** Activity can be joined by other users */
    ActivityFlags[ActivityFlags["JOIN"] = 2] = "JOIN";
    ActivityFlags[ActivityFlags["SPECTATE"] = 4] = "SPECTATE";
    /** @deprecated Activity requires a request to join */
    ActivityFlags[ActivityFlags["JOIN_REQUEST"] = 8] = "JOIN_REQUEST";
    /** Activity can be synced */
    ActivityFlags[ActivityFlags["SYNC"] = 16] = "SYNC";
    /** Activity can be played */
    ActivityFlags[ActivityFlags["PLAY"] = 32] = "PLAY";
    ActivityFlags[ActivityFlags["PARTY_PRIVACY_FRIENDS_ONLY"] = 64] = "PARTY_PRIVACY_FRIENDS_ONLY";
    /** Activity's party can be joined by users in the same voice channel */
    ActivityFlags[ActivityFlags["PARTY_PRIVACY_VOICE_CHANNEL"] = 128] = "PARTY_PRIVACY_VOICE_CHANNEL";
    /** Activity is embedded within the Discord client */
    ActivityFlags[ActivityFlags["EMBEDDED"] = 256] = "EMBEDDED";
})(ActivityFlags || (exports.ActivityFlags = ActivityFlags = {}));
var ThreadMemberFlags;
(function (ThreadMemberFlags) {
    /** User has interacted with the thread */
    ThreadMemberFlags[ThreadMemberFlags["HAS_INTERACTED"] = 1] = "HAS_INTERACTED";
    /** User receives notifications for all messages */
    ThreadMemberFlags[ThreadMemberFlags["ALL_MESSAGES"] = 2] = "ALL_MESSAGES";
    /** User receives notifications only for messages that @mention them */
    ThreadMemberFlags[ThreadMemberFlags["ONLY_MENTIONS"] = 4] = "ONLY_MENTIONS";
    /** User does not receive any notifications */
    ThreadMemberFlags[ThreadMemberFlags["NO_MESSAGES"] = 8] = "NO_MESSAGES";
})(ThreadMemberFlags || (exports.ThreadMemberFlags = ThreadMemberFlags = {}));
var RoleConnectionMetadataTypes;
(function (RoleConnectionMetadataTypes) {
    /** The metadata value (`integer`) is less than or equal to the guild's configured value (`integer`) */
    RoleConnectionMetadataTypes[RoleConnectionMetadataTypes["INTEGER_LESS_THAN_OR_EQUAL"] = 1] = "INTEGER_LESS_THAN_OR_EQUAL";
    /** The metadata value (`integer`) is greater than or equal to the guild's configured value (`integer`) */
    RoleConnectionMetadataTypes[RoleConnectionMetadataTypes["INTEGER_GREATER_THAN_OR_EQUAL"] = 2] = "INTEGER_GREATER_THAN_OR_EQUAL";
    /** The metadata value (`integer`) is equal to the guild's configured value (`integer`) */
    RoleConnectionMetadataTypes[RoleConnectionMetadataTypes["INTEGER_EQUAL"] = 3] = "INTEGER_EQUAL";
    /** The metadata value (`integer`) is not equal to the guild's configured value (`integer`) */
    RoleConnectionMetadataTypes[RoleConnectionMetadataTypes["INTEGER_NOT_EQUAL"] = 4] = "INTEGER_NOT_EQUAL";
    /** The metadata value (`ISO8601 string`) is less than or equal to the guild's configured value (`integer`; `days before current date`) */
    RoleConnectionMetadataTypes[RoleConnectionMetadataTypes["DATETIME_LESS_THAN_OR_EQUAL"] = 5] = "DATETIME_LESS_THAN_OR_EQUAL";
    /** The metadata value (`ISO8601 string`) is greater than or equal to the guild's configured value (`integer`; `days before current date`) */
    RoleConnectionMetadataTypes[RoleConnectionMetadataTypes["DATETIME_GREATER_THAN_OR_EQUAL"] = 6] = "DATETIME_GREATER_THAN_OR_EQUAL";
    /** The metadata value (`integer`) is equal to the guild's configured value (`integer`; `1`) */
    RoleConnectionMetadataTypes[RoleConnectionMetadataTypes["BOOLEAN_EQUAL"] = 7] = "BOOLEAN_EQUAL";
    /** The metadata value (`integer`) is not equal to the guild's configured value (`integer`; `1`) */
    RoleConnectionMetadataTypes[RoleConnectionMetadataTypes["BOOLEAN_NOT_EQUAL"] = 8] = "BOOLEAN_NOT_EQUAL";
})(RoleConnectionMetadataTypes || (exports.RoleConnectionMetadataTypes = RoleConnectionMetadataTypes = {}));
var GuildMemberFlags;
(function (GuildMemberFlags) {
    /** Guild member has left and rejoined the guild */
    GuildMemberFlags[GuildMemberFlags["DID_REJOIN"] = 1] = "DID_REJOIN";
    /** Guild member has completed onboarding */
    GuildMemberFlags[GuildMemberFlags["COMPLETED_ONBOARDING"] = 2] = "COMPLETED_ONBOARDING";
    /** Guild member bypasses guild verification requirements and member verification */
    GuildMemberFlags[GuildMemberFlags["BYPASSES_VERIFICATION"] = 4] = "BYPASSES_VERIFICATION";
    /** Guild member has started onboarding */
    GuildMemberFlags[GuildMemberFlags["STARTED_ONBOARDING"] = 8] = "STARTED_ONBOARDING";
    /** Guild member is a guest and not a true member */
    GuildMemberFlags[GuildMemberFlags["IS_GUEST"] = 16] = "IS_GUEST";
    /** Guild member has started the new member actions in the server guide */
    GuildMemberFlags[GuildMemberFlags["STARTED_HOME_ACTIONS"] = 32] = "STARTED_HOME_ACTIONS";
    /** Guild member has completed all of the new member actions in the server guide */
    GuildMemberFlags[GuildMemberFlags["COMPLETED_HOME_ACTIONS"] = 64] = "COMPLETED_HOME_ACTIONS";
    GuildMemberFlags[GuildMemberFlags["AUTOMOD_QUARANTINED_USERNAME_OR_GUILD_NICKNAME"] = 128] = "AUTOMOD_QUARANTINED_USERNAME_OR_GUILD_NICKNAME";
    /** @deprecated Guild member has been indefinitely quarantined by an AutoMod Rule for their bio */
    GuildMemberFlags[GuildMemberFlags["AUTOMOD_QUARANTINED_BIO"] = 256] = "AUTOMOD_QUARANTINED_BIO";
    /** Guild member has acknowledged the DM privacy settings upsell modal */
    GuildMemberFlags[GuildMemberFlags["DM_SETTINGS_UPSELL_ACKNOWLEDGED"] = 512] = "DM_SETTINGS_UPSELL_ACKNOWLEDGED";
    GuildMemberFlags[GuildMemberFlags["AUTOMOD_QUARANTINED_CLAN_TAG"] = 1024] = "AUTOMOD_QUARANTINED_CLAN_TAG";
})(GuildMemberFlags || (exports.GuildMemberFlags = GuildMemberFlags = {}));
var OnboardingPromptTypes;
(function (OnboardingPromptTypes) {
    /** Prompt offers multiple options to select from */
    OnboardingPromptTypes[OnboardingPromptTypes["MULTIPLE_CHOICE"] = 0] = "MULTIPLE_CHOICE";
    /** Prompt offers a dropdown menu to select from */
    OnboardingPromptTypes[OnboardingPromptTypes["DROPDOWN"] = 1] = "DROPDOWN";
})(OnboardingPromptTypes || (exports.OnboardingPromptTypes = OnboardingPromptTypes = {}));
var AnimationTypes;
(function (AnimationTypes) {
    /** Premium animation type. */
    AnimationTypes[AnimationTypes["PREMIUM"] = 0] = "PREMIUM";
    /** Basic animation type. */
    AnimationTypes[AnimationTypes["BASIC"] = 1] = "BASIC";
})(AnimationTypes || (exports.AnimationTypes = AnimationTypes = {}));
var OnboardingModes;
(function (OnboardingModes) {
    OnboardingModes[OnboardingModes["DEFAULT"] = 0] = "DEFAULT";
    OnboardingModes[OnboardingModes["ADVANCED"] = 1] = "ADVANCED";
})(OnboardingModes || (exports.OnboardingModes = OnboardingModes = {}));
var InviteFlags;
(function (InviteFlags) {
    /** Invite grants one-time access to a voice channel in the guild */
    InviteFlags[InviteFlags["IS_GUEST_INVITE"] = 1] = "IS_GUEST_INVITE";
})(InviteFlags || (exports.InviteFlags = InviteFlags = {}));
var ReactionType;
(function (ReactionType) {
    /** A normal reaction */
    ReactionType[ReactionType["NORMAL"] = 0] = "NORMAL";
    ReactionType[ReactionType["SUPER"] = 1] = "SUPER";
})(ReactionType || (exports.ReactionType = ReactionType = {}));
var AttachmentFlags;
(function (AttachmentFlags) {
    /** Attachment is a clipped recording of a stream */
    AttachmentFlags[AttachmentFlags["IS_CLIP"] = 1] = "IS_CLIP";
    /** Attachment is a thumbnail */
    AttachmentFlags[AttachmentFlags["IS_THUMBNAIL"] = 2] = "IS_THUMBNAIL";
    /** Attachment has been remixed */
    AttachmentFlags[AttachmentFlags["IS_REMIX"] = 4] = "IS_REMIX";
    /** Attachment is a spoiler */
    AttachmentFlags[AttachmentFlags["IS_SPOILER"] = 8] = "IS_SPOILER";
    /** Attachment was flagged as sensitive content */
    AttachmentFlags[AttachmentFlags["CONTAINS_EXPLICIT_MEDIA"] = 16] = "CONTAINS_EXPLICIT_MEDIA";
    /** Attachment is an animated image */
    AttachmentFlags[AttachmentFlags["IS_ANIMATED"] = 32] = "IS_ANIMATED";
})(AttachmentFlags || (exports.AttachmentFlags = AttachmentFlags = {}));
var SKUTypes;
(function (SKUTypes) {
    /** Primary durable item */
    SKUTypes[SKUTypes["DURABLE_PRIMARY"] = 1] = "DURABLE_PRIMARY";
    /** Durable item */
    SKUTypes[SKUTypes["DURABLE"] = 2] = "DURABLE";
    /** Consumable item */
    SKUTypes[SKUTypes["CONSUMABLE"] = 3] = "CONSUMABLE";
    /** Bundle of items */
    SKUTypes[SKUTypes["BUNDLE"] = 4] = "BUNDLE";
    /** Subscription item */
    SKUTypes[SKUTypes["SUBSCRIPTION"] = 5] = "SUBSCRIPTION";
    /** Group of subscription items */
    SKUTypes[SKUTypes["SUBSCRIPTION_GROUP"] = 6] = "SUBSCRIPTION_GROUP";
})(SKUTypes || (exports.SKUTypes = SKUTypes = {}));
var SKUFlags;
(function (SKUFlags) {
    /** SKU is available for free to premium users */
    SKUFlags[SKUFlags["PREMIUM_PURCHASE"] = 1] = "PREMIUM_PURCHASE";
    /** SKU has free content for premium users */
    SKUFlags[SKUFlags["HAS_FREE_PREMIUM_CONTENT"] = 2] = "HAS_FREE_PREMIUM_CONTENT";
    /** SKU is available for purchase */
    SKUFlags[SKUFlags["AVAILABLE"] = 4] = "AVAILABLE";
    /** SKU is available for free to premium users and purchasable normally */
    SKUFlags[SKUFlags["PREMIUM_AND_DISTRIBUTION"] = 8] = "PREMIUM_AND_DISTRIBUTION";
    SKUFlags[SKUFlags["STICKER_PACK"] = 16] = "STICKER_PACK";
    /** SKU is a guild role subscription or ticketed event */
    SKUFlags[SKUFlags["GUILD_ROLE"] = 32] = "GUILD_ROLE";
    /** SKU is a giftable Discord premium subscription */
    SKUFlags[SKUFlags["AVAILABLE_FOR_SUBSCRIPTION_GIFTING"] = 64] = "AVAILABLE_FOR_SUBSCRIPTION_GIFTING";
    /** SKU is an application subscription for guilds */
    SKUFlags[SKUFlags["APPLICATION_GUILD_SUBSCRIPTION"] = 128] = "APPLICATION_GUILD_SUBSCRIPTION";
    SKUFlags[SKUFlags["GUILD_SUBSCRIPTION"] = 128] = "GUILD_SUBSCRIPTION";
    /** SKU is an application subscription for users */
    SKUFlags[SKUFlags["APPLICATION_USER_SUBSCRIPTION"] = 256] = "APPLICATION_USER_SUBSCRIPTION";
    SKUFlags[SKUFlags["USER_SUBSCRIPTION"] = 256] = "USER_SUBSCRIPTION";
})(SKUFlags || (exports.SKUFlags = SKUFlags = {}));
var EntitlementTypes;
(function (EntitlementTypes) {
    /** Entitlement was purchased by a user */
    EntitlementTypes[EntitlementTypes["PURCHASE"] = 1] = "PURCHASE";
    /** Entitlement is for a premium (Nitro) subscription */
    EntitlementTypes[EntitlementTypes["PREMIUM_SUBSCRIPTION"] = 2] = "PREMIUM_SUBSCRIPTION";
    /** Entitlement was gifted by a developer */
    EntitlementTypes[EntitlementTypes["DEVELOPER_GIFT"] = 3] = "DEVELOPER_GIFT";
    /** Entitlement was purchased by a developer in application test mode */
    EntitlementTypes[EntitlementTypes["TEST_MODE_PURCHASE"] = 4] = "TEST_MODE_PURCHASE";
    /** Entitlement was granted when the SKU was free */
    EntitlementTypes[EntitlementTypes["FREE_PURCHASE"] = 5] = "FREE_PURCHASE";
    /** Entitlement was gifted by another user */
    EntitlementTypes[EntitlementTypes["USER_GIFT"] = 6] = "USER_GIFT";
    /** Entitlement was claimed for free via a premium subscription */
    EntitlementTypes[EntitlementTypes["PREMIUM_PURCHASE"] = 7] = "PREMIUM_PURCHASE";
    /** Entitlement is for an application subscription */
    EntitlementTypes[EntitlementTypes["APPLICATION_SUBSCRIPTION"] = 8] = "APPLICATION_SUBSCRIPTION";
})(EntitlementTypes || (exports.EntitlementTypes = EntitlementTypes = {}));
var EntitlementOwnerTypes;
(function (EntitlementOwnerTypes) {
    /** Entitlement is for a guild */
    EntitlementOwnerTypes[EntitlementOwnerTypes["GUILD"] = 1] = "GUILD";
    /** Entitlement is for a user */
    EntitlementOwnerTypes[EntitlementOwnerTypes["USER"] = 2] = "USER";
})(EntitlementOwnerTypes || (exports.EntitlementOwnerTypes = EntitlementOwnerTypes = {}));
var SKUAccessTypes;
(function (SKUAccessTypes) {
    SKUAccessTypes[SKUAccessTypes["PUBLIC"] = 1] = "PUBLIC";
})(SKUAccessTypes || (exports.SKUAccessTypes = SKUAccessTypes = {}));
var SubscriptionStatuses;
(function (SubscriptionStatuses) {
    /** Subscription is active */
    SubscriptionStatuses[SubscriptionStatuses["ACTIVE"] = 0] = "ACTIVE";
    SubscriptionStatuses[SubscriptionStatuses["INACTIVE"] = 1] = "INACTIVE";
    SubscriptionStatuses[SubscriptionStatuses["ENDING"] = 2] = "ENDING";
})(SubscriptionStatuses || (exports.SubscriptionStatuses = SubscriptionStatuses = {}));
var PollLayoutType;
(function (PollLayoutType) {
    /** The default layout type */
    PollLayoutType[PollLayoutType["DEFAULT"] = 1] = "DEFAULT";
})(PollLayoutType || (exports.PollLayoutType = PollLayoutType = {}));
var ApplicationMonetizationState;
(function (ApplicationMonetizationState) {
    /** This application does not have monetization set up */
    ApplicationMonetizationState[ApplicationMonetizationState["NONE"] = 1] = "NONE";
    /** This application has monetization set up */
    ApplicationMonetizationState[ApplicationMonetizationState["ENABLED"] = 2] = "ENABLED";
    /** This application has been blocked from monetizing */
    ApplicationMonetizationState[ApplicationMonetizationState["BLOCKED"] = 3] = "BLOCKED";
})(ApplicationMonetizationState || (exports.ApplicationMonetizationState = ApplicationMonetizationState = {}));
var ApplicationDiscoverabilityState;
(function (ApplicationDiscoverabilityState) {
    /** This application is ineligible for the application directory */
    ApplicationDiscoverabilityState[ApplicationDiscoverabilityState["INELIGIBLE"] = 1] = "INELIGIBLE";
    /** This application is not listed in the application directory */
    ApplicationDiscoverabilityState[ApplicationDiscoverabilityState["NOT_DISCOVERABLE"] = 2] = "NOT_DISCOVERABLE";
    /** This application is listed in the application directory */
    ApplicationDiscoverabilityState[ApplicationDiscoverabilityState["DISCOVERABLE"] = 3] = "DISCOVERABLE";
    ApplicationDiscoverabilityState[ApplicationDiscoverabilityState["FEATURABLE"] = 4] = "FEATURABLE";
    /** This application has been blocked from appearing in the application directory */
    ApplicationDiscoverabilityState[ApplicationDiscoverabilityState["BLOCKED"] = 5] = "BLOCKED";
})(ApplicationDiscoverabilityState || (exports.ApplicationDiscoverabilityState = ApplicationDiscoverabilityState = {}));
var ApplicationDiscoveryEligibilityFlags;
(function (ApplicationDiscoveryEligibilityFlags) {
    /** Application is verified */
    ApplicationDiscoveryEligibilityFlags[ApplicationDiscoveryEligibilityFlags["VERIFIED"] = 1] = "VERIFIED";
    /** Application has at least one tag set */
    ApplicationDiscoveryEligibilityFlags[ApplicationDiscoveryEligibilityFlags["TAG"] = 2] = "TAG";
    /** Application has a description */
    ApplicationDiscoveryEligibilityFlags[ApplicationDiscoveryEligibilityFlags["DESCRIPTION"] = 4] = "DESCRIPTION";
    /** Application has terms of service set */
    ApplicationDiscoveryEligibilityFlags[ApplicationDiscoveryEligibilityFlags["TERMS_OF_SERVICE"] = 8] = "TERMS_OF_SERVICE";
    /** Application has a privacy policy set */
    ApplicationDiscoveryEligibilityFlags[ApplicationDiscoveryEligibilityFlags["PRIVACY_POLICY"] = 16] = "PRIVACY_POLICY";
    /** Application has a custom install URL or install parameters */
    ApplicationDiscoveryEligibilityFlags[ApplicationDiscoveryEligibilityFlags["INSTALL_PARAMS"] = 32] = "INSTALL_PARAMS";
    /** Application's name is safe for work */
    ApplicationDiscoveryEligibilityFlags[ApplicationDiscoveryEligibilityFlags["SAFE_NAME"] = 64] = "SAFE_NAME";
    /** Application's description is safe for work */
    ApplicationDiscoveryEligibilityFlags[ApplicationDiscoveryEligibilityFlags["SAFE_DESCRIPTION"] = 128] = "SAFE_DESCRIPTION";
    /** Application has the message content intent approved or utilizes application commands */
    ApplicationDiscoveryEligibilityFlags[ApplicationDiscoveryEligibilityFlags["APPROVED_COMMANDS"] = 256] = "APPROVED_COMMANDS";
    /** Application has a support guild set */
    ApplicationDiscoveryEligibilityFlags[ApplicationDiscoveryEligibilityFlags["SUPPORT_GUILD"] = 512] = "SUPPORT_GUILD";
    /** Application's commands are safe for work */
    ApplicationDiscoveryEligibilityFlags[ApplicationDiscoveryEligibilityFlags["SAFE_COMMANDS"] = 1024] = "SAFE_COMMANDS";
    /** Application's owner has MFA enabled */
    ApplicationDiscoveryEligibilityFlags[ApplicationDiscoveryEligibilityFlags["MFA"] = 2048] = "MFA";
    /** Application's directory long description is safe for work */
    ApplicationDiscoveryEligibilityFlags[ApplicationDiscoveryEligibilityFlags["SAFE_DIRECTORY_OVERVIEW"] = 4096] = "SAFE_DIRECTORY_OVERVIEW";
    /** Application has at least one supported locale set */
    ApplicationDiscoveryEligibilityFlags[ApplicationDiscoveryEligibilityFlags["SUPPORTED_LOCALES"] = 8192] = "SUPPORTED_LOCALES";
    /** Application's directory short description is safe for work */
    ApplicationDiscoveryEligibilityFlags[ApplicationDiscoveryEligibilityFlags["SAFE_SHORT_DESCRIPTION"] = 16384] = "SAFE_SHORT_DESCRIPTION";
    /** Application's role connections metadata is safe for work */
    ApplicationDiscoveryEligibilityFlags[ApplicationDiscoveryEligibilityFlags["SAFE_ROLE_CONNECTIONS"] = 32768] = "SAFE_ROLE_CONNECTIONS";
})(ApplicationDiscoveryEligibilityFlags || (exports.ApplicationDiscoveryEligibilityFlags = ApplicationDiscoveryEligibilityFlags = {}));
var ApplicationExplicitContentFilterLevel;
(function (ApplicationExplicitContentFilterLevel) {
    ApplicationExplicitContentFilterLevel[ApplicationExplicitContentFilterLevel["DISABLED"] = 0] = "DISABLED";
    ApplicationExplicitContentFilterLevel[ApplicationExplicitContentFilterLevel["ENABLED"] = 1] = "ENABLED";
})(ApplicationExplicitContentFilterLevel || (exports.ApplicationExplicitContentFilterLevel = ApplicationExplicitContentFilterLevel = {}));
var ApplicationInteractionsVersion;
(function (ApplicationInteractionsVersion) {
    /** Only Interaction Create events are sent as documented (default) */
    ApplicationInteractionsVersion[ApplicationInteractionsVersion["VERSION_1"] = 1] = "VERSION_1";
    /** A selection of chosen events are sent */
    ApplicationInteractionsVersion[ApplicationInteractionsVersion["VERSION_2"] = 2] = "VERSION_2";
})(ApplicationInteractionsVersion || (exports.ApplicationInteractionsVersion = ApplicationInteractionsVersion = {}));
var ApplicationMonetizationEligibilityFlags;
(function (ApplicationMonetizationEligibilityFlags) {
    /** Application is verified */
    ApplicationMonetizationEligibilityFlags[ApplicationMonetizationEligibilityFlags["VERIFIED"] = 1] = "VERIFIED";
    /** Application is owned by a team */
    ApplicationMonetizationEligibilityFlags[ApplicationMonetizationEligibilityFlags["HAS_TEAM"] = 2] = "HAS_TEAM";
    /** Application has the message content intent approved or utilizes application commands */
    ApplicationMonetizationEligibilityFlags[ApplicationMonetizationEligibilityFlags["APPROVED_COMMANDS"] = 4] = "APPROVED_COMMANDS";
    /** Application has terms of service set */
    ApplicationMonetizationEligibilityFlags[ApplicationMonetizationEligibilityFlags["TERMS_OF_SERVICE"] = 8] = "TERMS_OF_SERVICE";
    /** Application has a privacy policy set */
    ApplicationMonetizationEligibilityFlags[ApplicationMonetizationEligibilityFlags["PRIVACY_POLICY"] = 16] = "PRIVACY_POLICY";
    /** Application's name is safe for work */
    ApplicationMonetizationEligibilityFlags[ApplicationMonetizationEligibilityFlags["SAFE_NAME"] = 32] = "SAFE_NAME";
    /** Application's description is safe for work */
    ApplicationMonetizationEligibilityFlags[ApplicationMonetizationEligibilityFlags["SAFE_DESCRIPTION"] = 64] = "SAFE_DESCRIPTION";
    /** Application's role connections metadata is safe for work */
    ApplicationMonetizationEligibilityFlags[ApplicationMonetizationEligibilityFlags["SAFE_ROLE_CONNECTIONS"] = 128] = "SAFE_ROLE_CONNECTIONS";
    /** Application is not quarantined */
    ApplicationMonetizationEligibilityFlags[ApplicationMonetizationEligibilityFlags["NOT_QUARANTINED"] = 512] = "NOT_QUARANTINED";
    /** User's locale is supported by monetization */
    ApplicationMonetizationEligibilityFlags[ApplicationMonetizationEligibilityFlags["USER_LOCALE_SUPPORTED"] = 1024] = "USER_LOCALE_SUPPORTED";
    /** User is old enough to use monetization */
    ApplicationMonetizationEligibilityFlags[ApplicationMonetizationEligibilityFlags["USER_AGE_SUPPORTED"] = 2048] = "USER_AGE_SUPPORTED";
    /** User has a date of birth defined on their account */
    ApplicationMonetizationEligibilityFlags[ApplicationMonetizationEligibilityFlags["USER_DATE_OF_BIRTH_DEFINED"] = 4096] = "USER_DATE_OF_BIRTH_DEFINED";
    /** User has MFA enabled */
    ApplicationMonetizationEligibilityFlags[ApplicationMonetizationEligibilityFlags["USER_MFA_ENABLED"] = 8192] = "USER_MFA_ENABLED";
    /** User's email is verified */
    ApplicationMonetizationEligibilityFlags[ApplicationMonetizationEligibilityFlags["USER_EMAIL_VERIFIED"] = 16384] = "USER_EMAIL_VERIFIED";
    /** All members of the team that owns the application have verified emails */
    ApplicationMonetizationEligibilityFlags[ApplicationMonetizationEligibilityFlags["TEAM_MEMBERS_EMAIL_VERIFIED"] = 32768] = "TEAM_MEMBERS_EMAIL_VERIFIED";
    /** All members of the team that owns the application have MFA enabled */
    ApplicationMonetizationEligibilityFlags[ApplicationMonetizationEligibilityFlags["TEAM_MEMBERS_MFA_ENABLED"] = 65536] = "TEAM_MEMBERS_MFA_ENABLED";
    /** This application has no issues blocking monetization */
    ApplicationMonetizationEligibilityFlags[ApplicationMonetizationEligibilityFlags["NO_BLOCKING_ISSUES"] = 131072] = "NO_BLOCKING_ISSUES";
    /** Owning team has a valid payout status */
    ApplicationMonetizationEligibilityFlags[ApplicationMonetizationEligibilityFlags["VALID_PAYOUT_STATUS"] = 262144] = "VALID_PAYOUT_STATUS";
})(ApplicationMonetizationEligibilityFlags || (exports.ApplicationMonetizationEligibilityFlags = ApplicationMonetizationEligibilityFlags = {}));
var RPCApplicationState;
(function (RPCApplicationState) {
    /** This application does not have access to RPC */
    RPCApplicationState[RPCApplicationState["DISABLED"] = 0] = "DISABLED";
    /** This application has not yet been applied for RPC access */
    RPCApplicationState[RPCApplicationState["UNSUBMITTED"] = 1] = "UNSUBMITTED";
    /** This application has submitted a RPC access request */
    RPCApplicationState[RPCApplicationState["SUBMITTED"] = 2] = "SUBMITTED";
    /** This application has been approved for RPC access */
    RPCApplicationState[RPCApplicationState["APPROVED"] = 3] = "APPROVED";
    /** This application has been rejected from RPC access */
    RPCApplicationState[RPCApplicationState["REJECTED"] = 4] = "REJECTED";
})(RPCApplicationState || (exports.RPCApplicationState = RPCApplicationState = {}));
var StoreApplicationState;
(function (StoreApplicationState) {
    /** This application does not have a commerce license */
    StoreApplicationState[StoreApplicationState["NONE"] = 1] = "NONE";
    /** This application has a commerce license but has not yet submitted a store approval request */
    StoreApplicationState[StoreApplicationState["PAID"] = 2] = "PAID";
    /** This application has submitted a store approval request */
    StoreApplicationState[StoreApplicationState["SUBMITTED"] = 3] = "SUBMITTED";
    /** This application has been approved for the store */
    StoreApplicationState[StoreApplicationState["APPROVED"] = 4] = "APPROVED";
    /** This application has been rejected from the store */
    StoreApplicationState[StoreApplicationState["REJECTED"] = 5] = "REJECTED";
})(StoreApplicationState || (exports.StoreApplicationState = StoreApplicationState = {}));
var ApplicationVerificationState;
(function (ApplicationVerificationState) {
    /** This application is ineligible for verification */
    ApplicationVerificationState[ApplicationVerificationState["INELIGIBLE"] = 1] = "INELIGIBLE";
    /** This application has not yet been applied for verification */
    ApplicationVerificationState[ApplicationVerificationState["UNSUBMITTED"] = 2] = "UNSUBMITTED";
    /** This application has submitted a verification request */
    ApplicationVerificationState[ApplicationVerificationState["SUBMITTED"] = 3] = "SUBMITTED";
    ApplicationVerificationState[ApplicationVerificationState["SUCCEEDED"] = 4] = "SUCCEEDED";
})(ApplicationVerificationState || (exports.ApplicationVerificationState = ApplicationVerificationState = {}));
var RoleFlags;
(function (RoleFlags) {
    /** Role is part of an onboarding prompt option */
    RoleFlags[RoleFlags["IN_PROMPT"] = 1] = "IN_PROMPT";
})(RoleFlags || (exports.RoleFlags = RoleFlags = {}));
var MemberSearchSortType;
(function (MemberSearchSortType) {
    /** Sort by when the user joined the guild descending (default) */
    MemberSearchSortType[MemberSearchSortType["JOINED_AT_DESC"] = 1] = "JOINED_AT_DESC";
    /** Sort by when the user joined the guild ascending */
    MemberSearchSortType[MemberSearchSortType["JOINED_AT_ASC"] = 2] = "JOINED_AT_ASC";
    /** Sort by when the user joined Discord descending */
    MemberSearchSortType[MemberSearchSortType["USER_ID_DESC"] = 3] = "USER_ID_DESC";
    /** Sort by when the user joined Discord ascending */
    MemberSearchSortType[MemberSearchSortType["USER_ID_ASC"] = 4] = "USER_ID_ASC";
})(MemberSearchSortType || (exports.MemberSearchSortType = MemberSearchSortType = {}));
var MemberJoinSourceType;
(function (MemberJoinSourceType) {
    /** The user joined the guild through an unknown source */
    MemberJoinSourceType[MemberJoinSourceType["UNSPECIFIED"] = 0] = "UNSPECIFIED";
    /** The user was added to the guild by a bot using the `guilds.join` OAuth2 scope */
    MemberJoinSourceType[MemberJoinSourceType["BOT"] = 1] = "BOT";
    /** The user was added to the guild by an integration (e.g. Twitch) */
    MemberJoinSourceType[MemberJoinSourceType["INTEGRATION"] = 2] = "INTEGRATION";
    /** The user joined the guild through guild discovery */
    MemberJoinSourceType[MemberJoinSourceType["DISCOVERY"] = 3] = "DISCOVERY";
    /** The user joined the guild through a student hub */
    MemberJoinSourceType[MemberJoinSourceType["HUB"] = 4] = "HUB";
    /** The user joined the guild through an invite */
    MemberJoinSourceType[MemberJoinSourceType["INVITE"] = 5] = "INVITE";
    /** The user joined the guild through a vanity URL */
    MemberJoinSourceType[MemberJoinSourceType["VANITY_URL"] = 6] = "VANITY_URL";
    /** The user was accepted into the guild after applying for membership */
    MemberJoinSourceType[MemberJoinSourceType["MANUAL_MEMBER_VERIFICATION"] = 7] = "MANUAL_MEMBER_VERIFICATION";
})(MemberJoinSourceType || (exports.MemberJoinSourceType = MemberJoinSourceType = {}));
var ActivityLocationKind;
(function (ActivityLocationKind) {
    ActivityLocationKind["GUILD_CHANNEL"] = "gc";
    ActivityLocationKind["PRIVATE_CHANNEL"] = "pc";
})(ActivityLocationKind || (exports.ActivityLocationKind = ActivityLocationKind = {}));
var ApplicationEventWebhookStatus;
(function (ApplicationEventWebhookStatus) {
    /** Event webhooks are disabled */
    ApplicationEventWebhookStatus[ApplicationEventWebhookStatus["DISABLED"] = 1] = "DISABLED";
    /** Event webhooks are enabled */
    ApplicationEventWebhookStatus[ApplicationEventWebhookStatus["ENABLED"] = 2] = "ENABLED";
    ApplicationEventWebhookStatus[ApplicationEventWebhookStatus["DISABLED_BY_DISCORD"] = 3] = "DISABLED_BY_DISCORD";
})(ApplicationEventWebhookStatus || (exports.ApplicationEventWebhookStatus = ApplicationEventWebhookStatus = {}));
exports.ApplicationEventWebhookEventTypes = [
    "APPLICATION_AUTHORIZED",
    "APPLICATION_DEAUTHORIZED",
    "ENTITLEMENT_CREATE",
    "QUEST_USER_ENROLLMENT"
];
var EmbedFlags;
(function (EmbedFlags) {
    /** Embed was flagged as sensitive content */
    EmbedFlags[EmbedFlags["CONTAINS_EXPLICIT_MEDIA"] = 16] = "CONTAINS_EXPLICIT_MEDIA";
    EmbedFlags[EmbedFlags["IS_CONTENT_INVENTORY_ENTRY"] = 32] = "IS_CONTENT_INVENTORY_ENTRY";
})(EmbedFlags || (exports.EmbedFlags = EmbedFlags = {}));
var EmbedMediaFlags;
(function (EmbedMediaFlags) {
    EmbedMediaFlags[EmbedMediaFlags["IS_ANIMATED"] = 32] = "IS_ANIMATED";
})(EmbedMediaFlags || (exports.EmbedMediaFlags = EmbedMediaFlags = {}));
var SeparatorSpacingSize;
(function (SeparatorSpacingSize) {
    /** 8px gap between elements, 16px with divider hidden */
    SeparatorSpacingSize[SeparatorSpacingSize["SMALL"] = 1] = "SMALL";
    /** 16px gap between elements, 32px with divider hidden */
    SeparatorSpacingSize[SeparatorSpacingSize["LARGE"] = 2] = "LARGE";
})(SeparatorSpacingSize || (exports.SeparatorSpacingSize = SeparatorSpacingSize = {}));
var DisplayNameFont;
(function (DisplayNameFont) {
    /** Bangers */
    DisplayNameFont[DisplayNameFont["BANGERS"] = 1] = "BANGERS";
    /** BioRhyme */
    DisplayNameFont[DisplayNameFont["BIO_RHYME"] = 2] = "BIO_RHYME";
    /** Cherry Bomb One */
    DisplayNameFont[DisplayNameFont["CHERRY_BOMB"] = 3] = "CHERRY_BOMB";
    /** Chicle */
    DisplayNameFont[DisplayNameFont["CHICLE"] = 4] = "CHICLE";
    /** Compagnon */
    DisplayNameFont[DisplayNameFont["COMPAGNON"] = 5] = "COMPAGNON";
    /** MuseoModerno */
    DisplayNameFont[DisplayNameFont["MUSEO_MODERNO"] = 6] = "MUSEO_MODERNO";
    /** Néo-Castel */
    DisplayNameFont[DisplayNameFont["NEO_CASTEL"] = 7] = "NEO_CASTEL";
    DisplayNameFont[DisplayNameFont["PIXELFY"] = 8] = "PIXELFY";
    /** Ribes */
    DisplayNameFont[DisplayNameFont["RIBES"] = 9] = "RIBES";
    /** Sinistre */
    DisplayNameFont[DisplayNameFont["SINISTRE"] = 10] = "SINISTRE";
    /** Default font */
    DisplayNameFont[DisplayNameFont["DEFAULT"] = 11] = "DEFAULT";
    /** Zilla Slab */
    DisplayNameFont[DisplayNameFont["ZILLA_SLAB"] = 12] = "ZILLA_SLAB";
})(DisplayNameFont || (exports.DisplayNameFont = DisplayNameFont = {}));
var DisplayNameEffect;
(function (DisplayNameEffect) {
    /** Displays the first color provided */
    DisplayNameEffect[DisplayNameEffect["SOLID"] = 1] = "SOLID";
    /** Two color gradient */
    DisplayNameEffect[DisplayNameEffect["GRADIENT"] = 2] = "GRADIENT";
    /** Glow around the name */
    DisplayNameEffect[DisplayNameEffect["NEON"] = 3] = "NEON";
    /** Subtle vertical gradient and stroke */
    DisplayNameEffect[DisplayNameEffect["TOON"] = 4] = "TOON";
    /** Colored dropshadow */
    DisplayNameEffect[DisplayNameEffect["POP"] = 5] = "POP";
    /** Alternate gradient style */
    DisplayNameEffect[DisplayNameEffect["GLOW"] = 6] = "GLOW";
})(DisplayNameEffect || (exports.DisplayNameEffect = DisplayNameEffect = {}));
var InviteTargetUsersJobStatus;
(function (InviteTargetUsersJobStatus) {
    /** Job status is unspecified */
    InviteTargetUsersJobStatus[InviteTargetUsersJobStatus["UNSPECIFIED"] = 0] = "UNSPECIFIED";
    /** Job is currently being processed */
    InviteTargetUsersJobStatus[InviteTargetUsersJobStatus["PROCESSING"] = 1] = "PROCESSING";
    /** Job has been completed */
    InviteTargetUsersJobStatus[InviteTargetUsersJobStatus["COMPLETED"] = 2] = "COMPLETED";
    /** Job has failed (see `error_message`) */
    InviteTargetUsersJobStatus[InviteTargetUsersJobStatus["FAILED"] = 3] = "FAILED";
})(InviteTargetUsersJobStatus || (exports.InviteTargetUsersJobStatus = InviteTargetUsersJobStatus = {}));
var ApplicationInternalGuildRestriction;
(function (ApplicationInternalGuildRestriction) {
    ApplicationInternalGuildRestriction[ApplicationInternalGuildRestriction["JOIN_ALL"] = 1] = "JOIN_ALL";
    ApplicationInternalGuildRestriction[ApplicationInternalGuildRestriction["JOIN_EXTERNAL_ONLY"] = 2] = "JOIN_EXTERNAL_ONLY";
    ApplicationInternalGuildRestriction[ApplicationInternalGuildRestriction["JOIN_INTERNAL_ONLY"] = 3] = "JOIN_INTERNAL_ONLY";
})(ApplicationInternalGuildRestriction || (exports.ApplicationInternalGuildRestriction = ApplicationInternalGuildRestriction = {}));
var EmbeddedActivityOrientationLockStateType;
(function (EmbeddedActivityOrientationLockStateType) {
    /** Unrestricted orientation */
    EmbeddedActivityOrientationLockStateType[EmbeddedActivityOrientationLockStateType["UNLOCKED"] = 1] = "UNLOCKED";
    /** Portrait only */
    EmbeddedActivityOrientationLockStateType[EmbeddedActivityOrientationLockStateType["PORTRAIT"] = 2] = "PORTRAIT";
    /** Landscape only */
    EmbeddedActivityOrientationLockStateType[EmbeddedActivityOrientationLockStateType["LANDSCAPE"] = 3] = "LANDSCAPE";
})(EmbeddedActivityOrientationLockStateType || (exports.EmbeddedActivityOrientationLockStateType = EmbeddedActivityOrientationLockStateType = {}));
var EmbeddedActivityLabelType;
(function (EmbeddedActivityLabelType) {
    /** No special label */
    EmbeddedActivityLabelType[EmbeddedActivityLabelType["NONE"] = 0] = "NONE";
    /** The activity is new */
    EmbeddedActivityLabelType[EmbeddedActivityLabelType["NEW"] = 1] = "NEW";
    /** The activity has been recently updated */
    EmbeddedActivityLabelType[EmbeddedActivityLabelType["UPDATED"] = 2] = "UPDATED";
})(EmbeddedActivityLabelType || (exports.EmbeddedActivityLabelType = EmbeddedActivityLabelType = {}));
exports.EmbeddedActivityReleasePhases = ["in_development", "activities_team", "employee_release", "soft_launch", "soft_launch_multi_geo", "global_launch"];
exports.EmbeddedActivitySurfaces = ["voice_launcher", "text_launcher"];
exports.EmbeddedActivityPlatformTypes = ["web", "android", "ios"];
exports.PricingLocalizationStrategies = ["localized_price_sets"];
exports.OperatingSystemTypes = ["windows", "osx", "linux", "android", "ios", "playstation", "xbox", "unknown"];
exports.TeamMemberRoleTypes = ["admin", "developer", "read_only"];
var ApprovableConsoleType;
(function (ApprovableConsoleType) {
    /** Xbox */
    ApprovableConsoleType[ApprovableConsoleType["XBOX"] = 1] = "XBOX";
    /** PlayStation */
    ApprovableConsoleType[ApprovableConsoleType["PLAYSTATION_5"] = 2] = "PLAYSTATION_5";
    /** PlayStation */
    ApprovableConsoleType[ApprovableConsoleType["PLAYSTATION_4"] = 3] = "PLAYSTATION_4";
})(ApprovableConsoleType || (exports.ApprovableConsoleType = ApprovableConsoleType = {}));
var OverlayMethodFlags;
(function (OverlayMethodFlags) {
    /** Overlay can be rendered out of process */
    OverlayMethodFlags[OverlayMethodFlags["OUT_OF_PROCESS"] = 1] = "OUT_OF_PROCESS";
})(OverlayMethodFlags || (exports.OverlayMethodFlags = OverlayMethodFlags = {}));
var TeamPayoutAccountStatus;
(function (TeamPayoutAccountStatus) {
    /** Team has not submitted a payout account application */
    TeamPayoutAccountStatus[TeamPayoutAccountStatus["UNSUBMITTED"] = 1] = "UNSUBMITTED";
    /** Team's payout account application is pending approval */
    TeamPayoutAccountStatus[TeamPayoutAccountStatus["PENDING"] = 2] = "PENDING";
    /** Team's payout account requires action to receive payouts */
    TeamPayoutAccountStatus[TeamPayoutAccountStatus["ACTION_REQUIRED"] = 3] = "ACTION_REQUIRED";
    /** Team's payout account is active and can receive payouts */
    TeamPayoutAccountStatus[TeamPayoutAccountStatus["ACTIVE"] = 4] = "ACTIVE";
    /** Team's payout account is blocked and cannot receive payouts */
    TeamPayoutAccountStatus[TeamPayoutAccountStatus["BLOCKED"] = 5] = "BLOCKED";
    /** Team's payout account is suspended and cannot receive payouts */
    TeamPayoutAccountStatus[TeamPayoutAccountStatus["SUSPENDED"] = 6] = "SUSPENDED";
})(TeamPayoutAccountStatus || (exports.TeamPayoutAccountStatus = TeamPayoutAccountStatus = {}));
var TeamPayoutGateway;
(function (TeamPayoutGateway) {
    /** Stripe Top-Up */
    TeamPayoutGateway[TeamPayoutGateway["STRIPE_TOPUP"] = 1] = "STRIPE_TOPUP";
    /** Tipalti */
    TeamPayoutGateway[TeamPayoutGateway["TIPALTI"] = 2] = "TIPALTI";
    /** Stripe */
    TeamPayoutGateway[TeamPayoutGateway["STRIPE_PRIMARY"] = 3] = "STRIPE_PRIMARY";
})(TeamPayoutGateway || (exports.TeamPayoutGateway = TeamPayoutGateway = {}));
var ApplicationType;
(function (ApplicationType) {
    /** A game integrating with Discord through the legacy GameSDK or sold on the defunct game store */
    ApplicationType[ApplicationType["DEPRECATED_GAME"] = 1] = "DEPRECATED_GAME";
    /** @deprecated A music service integrating with Discord */
    ApplicationType[ApplicationType["MUSIC"] = 2] = "MUSIC";
    /** A limited application used for ticketed event SKUs */
    ApplicationType[ApplicationType["TICKETED_EVENTS"] = 3] = "TICKETED_EVENTS";
    /** A limited application used for creator monetization (e.g. role subscription) SKUs */
    ApplicationType[ApplicationType["CREATOR_MONETIZATION"] = 4] = "CREATOR_MONETIZATION";
    /** A game integrating with Discord */
    ApplicationType[ApplicationType["GAME"] = 5] = "GAME";
})(ApplicationType || (exports.ApplicationType = ApplicationType = {}));
var LobbyMemberFlags;
(function (LobbyMemberFlags) {
    LobbyMemberFlags[LobbyMemberFlags["CAN_LINK_LOBBY"] = 1] = "CAN_LINK_LOBBY";
})(LobbyMemberFlags || (exports.LobbyMemberFlags = LobbyMemberFlags = {}));
var MessageReferenceType;
(function (MessageReferenceType) {
    /** A standard reference used by replies and system messages */
    MessageReferenceType[MessageReferenceType["DEFAULT"] = 0] = "DEFAULT";
    /** A reference used to point to a message at a point in time */
    MessageReferenceType[MessageReferenceType["FORWARD"] = 1] = "FORWARD";
})(MessageReferenceType || (exports.MessageReferenceType = MessageReferenceType = {}));
var StatusDisplayType;
(function (StatusDisplayType) {
    /** Display the `name` field */
    StatusDisplayType[StatusDisplayType["NAME"] = 0] = "NAME";
    /** Display the `state` field */
    StatusDisplayType[StatusDisplayType["STATE"] = 1] = "STATE";
    /** Display the `details` field */
    StatusDisplayType[StatusDisplayType["DETAILS"] = 2] = "DETAILS";
})(StatusDisplayType || (exports.StatusDisplayType = StatusDisplayType = {}));
// entries are intentionally not aligned
/** The error codes that can be received. See [Discord's Documentation](https://discord.com/developers/docs/topics/opcodes-and-status-codes#json). */
var JSONErrorCodes;
(function (JSONErrorCodes) {
    JSONErrorCodes[JSONErrorCodes["GENERAL_ERROR"] = 0] = "GENERAL_ERROR";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_ACCOUNT"] = 10001] = "UNKNOWN_ACCOUNT";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_APPLICATION"] = 10002] = "UNKNOWN_APPLICATION";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_CHANNEL"] = 10003] = "UNKNOWN_CHANNEL";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_GUILD"] = 10004] = "UNKNOWN_GUILD";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_INTEGRATION"] = 10005] = "UNKNOWN_INTEGRATION";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_INVITE"] = 10006] = "UNKNOWN_INVITE";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_MEMBER"] = 10007] = "UNKNOWN_MEMBER";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_MESSAGE"] = 10008] = "UNKNOWN_MESSAGE";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_OVERWRITE"] = 10009] = "UNKNOWN_OVERWRITE";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_PROVIDER"] = 10010] = "UNKNOWN_PROVIDER";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_PLATFORM"] = 10010] = "UNKNOWN_PLATFORM";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_ROLE"] = 10011] = "UNKNOWN_ROLE";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_TOKEN"] = 10012] = "UNKNOWN_TOKEN";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_USER"] = 10013] = "UNKNOWN_USER";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_EMOJI"] = 10014] = "UNKNOWN_EMOJI";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_WEBHOOK"] = 10015] = "UNKNOWN_WEBHOOK";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_WEBHOOK_SERVICE"] = 10016] = "UNKNOWN_WEBHOOK_SERVICE";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_SESSION"] = 10020] = "UNKNOWN_SESSION";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_ASSET"] = 10021] = "UNKNOWN_ASSET";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_BAN"] = 10026] = "UNKNOWN_BAN";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_SKU"] = 10027] = "UNKNOWN_SKU";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_STORE_LISTING"] = 10028] = "UNKNOWN_STORE_LISTING";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_ENTITLEMENT"] = 10029] = "UNKNOWN_ENTITLEMENT";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_BUILD"] = 10030] = "UNKNOWN_BUILD";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_LOBBY"] = 10031] = "UNKNOWN_LOBBY";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_BRANCH"] = 10032] = "UNKNOWN_BRANCH";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_STORE_DIRECTORY_LAYOUT"] = 10036] = "UNKNOWN_STORE_DIRECTORY_LAYOUT";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_REDISTRIBUTABLE"] = 10037] = "UNKNOWN_REDISTRIBUTABLE";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_GIFT_CODE"] = 10038] = "UNKNOWN_GIFT_CODE";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_STREAM"] = 10049] = "UNKNOWN_STREAM";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_PREMIUM_SERVER_SUBSCRIBE_COOLDOWN"] = 10050] = "UNKNOWN_PREMIUM_SERVER_SUBSCRIBE_COOLDOWN";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_GUILD_TEMPLATE"] = 10057] = "UNKNOWN_GUILD_TEMPLATE";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_DISCOVERABLE_SERVER_CATEGORY"] = 10059] = "UNKNOWN_DISCOVERABLE_SERVER_CATEGORY";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_STICKER"] = 10060] = "UNKNOWN_STICKER";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_INTERACTION"] = 10062] = "UNKNOWN_INTERACTION";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_APPLICATION_COMMAND"] = 10063] = "UNKNOWN_APPLICATION_COMMAND";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_APPLICATION_COMMAND_PERMISSIONS"] = 10066] = "UNKNOWN_APPLICATION_COMMAND_PERMISSIONS";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_STAGE_INSTANCE"] = 10067] = "UNKNOWN_STAGE_INSTANCE";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_GUILD_MEMBER_VERIFICATION_FORM"] = 10068] = "UNKNOWN_GUILD_MEMBER_VERIFICATION_FORM";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_GUILD_WELCOME_SCREEN"] = 10069] = "UNKNOWN_GUILD_WELCOME_SCREEN";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_GUILD_SCHEDULED_EVENT"] = 10070] = "UNKNOWN_GUILD_SCHEDULED_EVENT";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_GUILD_SCHEDULED_EVENT_USER"] = 10071] = "UNKNOWN_GUILD_SCHEDULED_EVENT_USER";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_TAG"] = 10087] = "UNKNOWN_TAG";
    JSONErrorCodes[JSONErrorCodes["UNKNOWN_SOUND"] = 10097] = "UNKNOWN_SOUND";
    JSONErrorCodes[JSONErrorCodes["BOT_DISALLOWED"] = 20001] = "BOT_DISALLOWED";
    JSONErrorCodes[JSONErrorCodes["BOTS_CANNOT_USE_THIS_ENDPOINT"] = 20001] = "BOTS_CANNOT_USE_THIS_ENDPOINT";
    JSONErrorCodes[JSONErrorCodes["BOT_REQUIRED"] = 20002] = "BOT_REQUIRED";
    JSONErrorCodes[JSONErrorCodes["ONLY_BOTS_CAN_USE_THIS_ENDPOINT"] = 20002] = "ONLY_BOTS_CAN_USE_THIS_ENDPOINT";
    JSONErrorCodes[JSONErrorCodes["RPC_PROXY_DISALLOWED"] = 20003] = "RPC_PROXY_DISALLOWED";
    JSONErrorCodes[JSONErrorCodes["EXPLICIT_CONTENT"] = 20009] = "EXPLICIT_CONTENT";
    JSONErrorCodes[JSONErrorCodes["ACCOUNT_SCHEDULED_FOR_DELETION"] = 20011] = "ACCOUNT_SCHEDULED_FOR_DELETION";
    JSONErrorCodes[JSONErrorCodes["NOT_AUTHORIZED_FOR_APPLICATION"] = 20012] = "NOT_AUTHORIZED_FOR_APPLICATION";
    JSONErrorCodes[JSONErrorCodes["ACCOUNT_DISABLED"] = 20013] = "ACCOUNT_DISABLED";
    JSONErrorCodes[JSONErrorCodes["SLOWMODE_RATE_LIMITED"] = 20016] = "SLOWMODE_RATE_LIMITED";
    JSONErrorCodes[JSONErrorCodes["ACCOUNT_OWNER_ONLY"] = 20018] = "ACCOUNT_OWNER_ONLY";
    JSONErrorCodes[JSONErrorCodes["CHANNEL_FOLLOWING_EDIT_RATE_LIMITED"] = 20022] = "CHANNEL_FOLLOWING_EDIT_RATE_LIMITED";
    JSONErrorCodes[JSONErrorCodes["UNDER_MINIMUM_AGE"] = 20024] = "UNDER_MINIMUM_AGE";
    JSONErrorCodes[JSONErrorCodes["QUARANTINED"] = 20026] = "QUARANTINED";
    JSONErrorCodes[JSONErrorCodes["CHANNEL_WRITE_RATE_LIMIT"] = 20028] = "CHANNEL_WRITE_RATE_LIMIT";
    JSONErrorCodes[JSONErrorCodes["GUILD_WRITE_RATE_LIMIT"] = 20029] = "GUILD_WRITE_RATE_LIMIT";
    JSONErrorCodes[JSONErrorCodes["WORDS_NOT_ALLOWED"] = 20031] = "WORDS_NOT_ALLOWED";
    JSONErrorCodes[JSONErrorCodes["VANITY_URL_REQUIRED_FOR_PUBLISHED_GUILDS"] = 20040] = "VANITY_URL_REQUIRED_FOR_PUBLISHED_GUILDS";
    JSONErrorCodes[JSONErrorCodes["VANITY_URL_EMPLOYEE_ONLY_GUILD_DISABLED"] = 20044] = "VANITY_URL_EMPLOYEE_ONLY_GUILD_DISABLED";
    JSONErrorCodes[JSONErrorCodes["VANITY_URL_REQUIREMENTS_NOT_MET"] = 20045] = "VANITY_URL_REQUIREMENTS_NOT_MET";
    JSONErrorCodes[JSONErrorCodes["TOO_MANY_GUILDS"] = 30001] = "TOO_MANY_GUILDS";
    JSONErrorCodes[JSONErrorCodes["TOO_MANY_FRIENDS"] = 30002] = "TOO_MANY_FRIENDS";
    JSONErrorCodes[JSONErrorCodes["TOO_MANY_PINS_IN_CHANNEL"] = 30003] = "TOO_MANY_PINS_IN_CHANNEL";
    JSONErrorCodes[JSONErrorCodes["TOO_MANY_RECIPIENTS"] = 30004] = "TOO_MANY_RECIPIENTS";
    JSONErrorCodes[JSONErrorCodes["TOO_MANY_GUILD_ROLES"] = 30005] = "TOO_MANY_GUILD_ROLES";
    JSONErrorCodes[JSONErrorCodes["TOO_MANY_USING_USERNAME"] = 30006] = "TOO_MANY_USING_USERNAME";
    JSONErrorCodes[JSONErrorCodes["TOO_MANY_WEBHOOKS"] = 30007] = "TOO_MANY_WEBHOOKS";
    JSONErrorCodes[JSONErrorCodes["TOO_MANY_EMOJI"] = 30008] = "TOO_MANY_EMOJI";
    JSONErrorCodes[JSONErrorCodes["TOO_MANY_REACTIONS"] = 30010] = "TOO_MANY_REACTIONS";
    JSONErrorCodes[JSONErrorCodes["TOO_MANY_GROUP_CHANNELS"] = 30011] = "TOO_MANY_GROUP_CHANNELS";
    JSONErrorCodes[JSONErrorCodes["TOO_MANY_CHANNELS"] = 30013] = "TOO_MANY_CHANNELS";
    JSONErrorCodes[JSONErrorCodes["TOO_MANY_ATTACHMENTS"] = 30015] = "TOO_MANY_ATTACHMENTS";
    JSONErrorCodes[JSONErrorCodes["TOO_MANY_INVITES"] = 30016] = "TOO_MANY_INVITES";
    JSONErrorCodes[JSONErrorCodes["TOO_MANY_ANIMATED_EMOJI"] = 30018] = "TOO_MANY_ANIMATED_EMOJI";
    JSONErrorCodes[JSONErrorCodes["GUILD_AT_CAPACITY"] = 30019] = "GUILD_AT_CAPACITY";
    JSONErrorCodes[JSONErrorCodes["NOT_ENOUGH_GUILD_MEMBERS"] = 30029] = "NOT_ENOUGH_GUILD_MEMBERS";
    JSONErrorCodes[JSONErrorCodes["TOO_MANY_SERVER_CATEGORIES"] = 30030] = "TOO_MANY_SERVER_CATEGORIES";
    JSONErrorCodes[JSONErrorCodes["GUILD_ALREADY_HAS_TEMPLATE"] = 30031] = "GUILD_ALREADY_HAS_TEMPLATE";
    JSONErrorCodes[JSONErrorCodes["TOO_MANY_APPLICATION_COMMANDS"] = 30032] = "TOO_MANY_APPLICATION_COMMANDS";
    JSONErrorCodes[JSONErrorCodes["TOO_MANY_THREAD_MEMBERS"] = 30033] = "TOO_MANY_THREAD_MEMBERS";
    JSONErrorCodes[JSONErrorCodes["TOO_MANY_APPLICATION_COMMAND_CREATES"] = 30034] = "TOO_MANY_APPLICATION_COMMAND_CREATES";
    JSONErrorCodes[JSONErrorCodes["TOO_MANY_BANS_FOR_NON_GUILD_MEMBERS"] = 30035] = "TOO_MANY_BANS_FOR_NON_GUILD_MEMBERS";
    JSONErrorCodes[JSONErrorCodes["TOO_MANY_BAN_FETCHES"] = 30037] = "TOO_MANY_BAN_FETCHES";
    JSONErrorCodes[JSONErrorCodes["TOO_MANY_UNCOMPLETED_GUILD_SCHEDULED_EVENTS"] = 30038] = "TOO_MANY_UNCOMPLETED_GUILD_SCHEDULED_EVENTS";
    JSONErrorCodes[JSONErrorCodes["TOO_MANY_STICKERS"] = 30039] = "TOO_MANY_STICKERS";
    JSONErrorCodes[JSONErrorCodes["TOO_MANY_PRUNE_REQUESTS"] = 30040] = "TOO_MANY_PRUNE_REQUESTS";
    JSONErrorCodes[JSONErrorCodes["TOO_MANY_GUILD_WIDGET_SETTINGS_UPDATES"] = 30042] = "TOO_MANY_GUILD_WIDGET_SETTINGS_UPDATES";
    JSONErrorCodes[JSONErrorCodes["TOO_MANY_SOUNDBOARD_SOUNDS"] = 30045] = "TOO_MANY_SOUNDBOARD_SOUNDS";
    JSONErrorCodes[JSONErrorCodes["MAXIMUM_NUMBER_OR_EDITS_TO_MESSAGES_OLDER_THAN_1_HOUR"] = 30046] = "MAXIMUM_NUMBER_OR_EDITS_TO_MESSAGES_OLDER_THAN_1_HOUR";
    JSONErrorCodes[JSONErrorCodes["TOO_MANY_PINNED_THREADS"] = 30047] = "TOO_MANY_PINNED_THREADS";
    JSONErrorCodes[JSONErrorCodes["TOO_MANY_FORUM_TAGS"] = 30048] = "TOO_MANY_FORUM_TAGS";
    JSONErrorCodes[JSONErrorCodes["BITRATE_TOO_HIGH"] = 30052] = "BITRATE_TOO_HIGH";
    JSONErrorCodes[JSONErrorCodes["TOO_MANY_PREMIUM_EMOJIS"] = 30056] = "TOO_MANY_PREMIUM_EMOJIS";
    JSONErrorCodes[JSONErrorCodes["TOO_MANY_GUILD_WEBHOOKS"] = 30058] = "TOO_MANY_GUILD_WEBHOOKS";
    JSONErrorCodes[JSONErrorCodes["TOO_MANY_BLOCKED_USERS"] = 30059] = "TOO_MANY_BLOCKED_USERS";
    JSONErrorCodes[JSONErrorCodes["TOO_MANY_PUBLISHED_PRODUCT_LISTINGS"] = 30065] = "TOO_MANY_PUBLISHED_PRODUCT_LISTINGS";
    JSONErrorCodes[JSONErrorCodes["RESOURCE_RATE_LIMITED"] = 31002] = "RESOURCE_RATE_LIMITED";
    JSONErrorCodes[JSONErrorCodes["UNAUTHORIZED"] = 40001] = "UNAUTHORIZED";
    JSONErrorCodes[JSONErrorCodes["EMAIL_VERIFICATION_REQUIRED"] = 40002] = "EMAIL_VERIFICATION_REQUIRED";
    JSONErrorCodes[JSONErrorCodes["RATE_LIMIT_DM_OPEN"] = 40003] = "RATE_LIMIT_DM_OPEN";
    JSONErrorCodes[JSONErrorCodes["DIRECT_MESSAGES_RATE_LIMIT"] = 40003] = "DIRECT_MESSAGES_RATE_LIMIT";
    JSONErrorCodes[JSONErrorCodes["SENDING_MESSAGES_TEMPORARILY_DISABLED"] = 40004] = "SENDING_MESSAGES_TEMPORARILY_DISABLED";
    JSONErrorCodes[JSONErrorCodes["ENTITY_TOO_LARGE"] = 40005] = "ENTITY_TOO_LARGE";
    JSONErrorCodes[JSONErrorCodes["REQUEST_ENTITY_TOO_LARGE"] = 40005] = "REQUEST_ENTITY_TOO_LARGE";
    JSONErrorCodes[JSONErrorCodes["ENTITY_EMPTY"] = 40006] = "ENTITY_EMPTY";
    JSONErrorCodes[JSONErrorCodes["FEATURE_TEMPORARILY_DISABLED"] = 40006] = "FEATURE_TEMPORARILY_DISABLED";
    JSONErrorCodes[JSONErrorCodes["USER_BANNED"] = 40007] = "USER_BANNED";
    JSONErrorCodes[JSONErrorCodes["CONNECTION_REVOKED"] = 40012] = "CONNECTION_REVOKED";
    JSONErrorCodes[JSONErrorCodes["DELETE_ACCOUNT_TRANSFER_TEAM_OWNERSHIP"] = 40028] = "DELETE_ACCOUNT_TRANSFER_TEAM_OWNERSHIP";
    JSONErrorCodes[JSONErrorCodes["TARGET_USER_NOT_CONNECTED_TO_VOICE"] = 40032] = "TARGET_USER_NOT_CONNECTED_TO_VOICE";
    JSONErrorCodes[JSONErrorCodes["ALREADY_CROSSPOSTED"] = 40033] = "ALREADY_CROSSPOSTED";
    JSONErrorCodes[JSONErrorCodes["APPLICATION_COMMAND_ALREADY_EXISTS"] = 40041] = "APPLICATION_COMMAND_ALREADY_EXISTS";
    JSONErrorCodes[JSONErrorCodes["INTERACTION_FAILED_TO_SEND"] = 40043] = "INTERACTION_FAILED_TO_SEND";
    JSONErrorCodes[JSONErrorCodes["CANNOT_SEND_MESSAGES_IN_FORUM_CHANNEL"] = 40058] = "CANNOT_SEND_MESSAGES_IN_FORUM_CHANNEL";
    JSONErrorCodes[JSONErrorCodes["INTERACTION_ALREADY_ACKNOWLEDGED"] = 40060] = "INTERACTION_ALREADY_ACKNOWLEDGED";
    JSONErrorCodes[JSONErrorCodes["TAG_NAMES_MUST_BE_UNIQUE"] = 40061] = "TAG_NAMES_MUST_BE_UNIQUE";
    JSONErrorCodes[JSONErrorCodes["SERVICE_RESOURCE_RATE_LIMITED"] = 40062] = "SERVICE_RESOURCE_RATE_LIMITED";
    JSONErrorCodes[JSONErrorCodes["NON_MODERATED_TAG_REQUIRED"] = 40066] = "NON_MODERATED_TAG_REQUIRED";
    JSONErrorCodes[JSONErrorCodes["TAG_REQUIRED"] = 40067] = "TAG_REQUIRED";
    JSONErrorCodes[JSONErrorCodes["USER_QUARANTINED"] = 40068] = "USER_QUARANTINED";
    JSONErrorCodes[JSONErrorCodes["INVITES_DISABLED"] = 40069] = "INVITES_DISABLED";
    JSONErrorCodes[JSONErrorCodes["ENTITLEMENT_ALREADY_GRANTED"] = 40074] = "ENTITLEMENT_ALREADY_GRANTED";
    JSONErrorCodes[JSONErrorCodes["CLOUDFLARE_BLOCKING_REQUEST"] = 40333] = "CLOUDFLARE_BLOCKING_REQUEST";
    JSONErrorCodes[JSONErrorCodes["INVALID_ACCESS"] = 50001] = "INVALID_ACCESS";
    JSONErrorCodes[JSONErrorCodes["MISSING_ACCESS"] = 50001] = "MISSING_ACCESS";
    JSONErrorCodes[JSONErrorCodes["INVALID_ACCOUNT_TYPE"] = 50002] = "INVALID_ACCOUNT_TYPE";
    JSONErrorCodes[JSONErrorCodes["INVALID_ACTION_DM"] = 50003] = "INVALID_ACTION_DM";
    JSONErrorCodes[JSONErrorCodes["INVALID_EMBED_DISABLED"] = 50004] = "INVALID_EMBED_DISABLED";
    JSONErrorCodes[JSONErrorCodes["INVALID_MESSAGE_AUTHOR"] = 50005] = "INVALID_MESSAGE_AUTHOR";
    JSONErrorCodes[JSONErrorCodes["INVALID_MESSAGE_EMPTY"] = 50006] = "INVALID_MESSAGE_EMPTY";
    JSONErrorCodes[JSONErrorCodes["INVALID_MESSAGE_SEND_USER"] = 50007] = "INVALID_MESSAGE_SEND_USER";
    JSONErrorCodes[JSONErrorCodes["INVALID_MESSAGE_SEND_NON_TEXT"] = 50008] = "INVALID_MESSAGE_SEND_NON_TEXT";
    JSONErrorCodes[JSONErrorCodes["INVALID_MESSAGE_VERIFICATION_LEVEL"] = 50009] = "INVALID_MESSAGE_VERIFICATION_LEVEL";
    JSONErrorCodes[JSONErrorCodes["INVALID_OAUTH_APP_BOT"] = 50010] = "INVALID_OAUTH_APP_BOT";
    JSONErrorCodes[JSONErrorCodes["INVALID_OAUTH_APP_LIMIT"] = 50011] = "INVALID_OAUTH_APP_LIMIT";
    JSONErrorCodes[JSONErrorCodes["INVALID_OAUTH_STATE"] = 50012] = "INVALID_OAUTH_STATE";
    JSONErrorCodes[JSONErrorCodes["INVALID_PERMISSIONS"] = 50013] = "INVALID_PERMISSIONS";
    JSONErrorCodes[JSONErrorCodes["INVALID_TOKEN"] = 50014] = "INVALID_TOKEN";
    JSONErrorCodes[JSONErrorCodes["INVALID_NOTE"] = 50015] = "INVALID_NOTE";
    JSONErrorCodes[JSONErrorCodes["INVALID_BULK_DELETE_COUNT"] = 50016] = "INVALID_BULK_DELETE_COUNT";
    JSONErrorCodes[JSONErrorCodes["INVALID_MFA_LEVEL"] = 50017] = "INVALID_MFA_LEVEL";
    JSONErrorCodes[JSONErrorCodes["INVALID_PASSWORD"] = 50018] = "INVALID_PASSWORD";
    JSONErrorCodes[JSONErrorCodes["INVALID_PIN_MESSAGE_CHANNEL"] = 50019] = "INVALID_PIN_MESSAGE_CHANNEL";
    JSONErrorCodes[JSONErrorCodes["INVALID_INVITE_CODE"] = 50020] = "INVALID_INVITE_CODE";
    JSONErrorCodes[JSONErrorCodes["CANNOT_EXECUTE_ON_SYSTEM_MESSAGE"] = 50021] = "CANNOT_EXECUTE_ON_SYSTEM_MESSAGE";
    JSONErrorCodes[JSONErrorCodes["INVALID_PHONE_NUMBER"] = 50022] = "INVALID_PHONE_NUMBER";
    JSONErrorCodes[JSONErrorCodes["INVALID_CLIENT_ID"] = 50023] = "INVALID_CLIENT_ID";
    JSONErrorCodes[JSONErrorCodes["INVALID_CHANNEL_TYPE"] = 50024] = "INVALID_CHANNEL_TYPE";
    JSONErrorCodes[JSONErrorCodes["INVALID_OAUTH2_ACCESS_TOKEN"] = 50025] = "INVALID_OAUTH2_ACCESS_TOKEN";
    JSONErrorCodes[JSONErrorCodes["INVALID_OAUTH2_MISSING_SCOPE"] = 50026] = "INVALID_OAUTH2_MISSING_SCOPE";
    JSONErrorCodes[JSONErrorCodes["INVALID_WEBHOOK_TOKEN"] = 50027] = "INVALID_WEBHOOK_TOKEN";
    JSONErrorCodes[JSONErrorCodes["INVALID_ROLE"] = 50028] = "INVALID_ROLE";
    JSONErrorCodes[JSONErrorCodes["INVALID_RECIPIENTS"] = 50033] = "INVALID_RECIPIENTS";
    JSONErrorCodes[JSONErrorCodes["BULK_DELETE_MESSAGE_TOO_OLD"] = 50034] = "BULK_DELETE_MESSAGE_TOO_OLD";
    JSONErrorCodes[JSONErrorCodes["INVALID_FORM_BODY"] = 50035] = "INVALID_FORM_BODY";
    JSONErrorCodes[JSONErrorCodes["INVITE_ACCEPTED_TO_GUILD_NOT_CONTAINING_BOT"] = 50036] = "INVITE_ACCEPTED_TO_GUILD_NOT_CONTAINING_BOT";
    JSONErrorCodes[JSONErrorCodes["INVALID_ACTIVITY_ACTION"] = 500039] = "INVALID_ACTIVITY_ACTION";
    JSONErrorCodes[JSONErrorCodes["INVALID_API_VERSION"] = 50041] = "INVALID_API_VERSION";
    JSONErrorCodes[JSONErrorCodes["INVALID_FILE_ASSET_SIZE"] = 50045] = "INVALID_FILE_ASSET_SIZE";
    JSONErrorCodes[JSONErrorCodes["INVALID_FILE_ASSET"] = 50046] = "INVALID_FILE_ASSET";
    JSONErrorCodes[JSONErrorCodes["INVALID_GIFT_REDEMPTION_EXHAUSTED"] = 50050] = "INVALID_GIFT_REDEMPTION_EXHAUSTED";
    JSONErrorCodes[JSONErrorCodes["INVALID_GIFT_REDEMPTION_OWNED"] = 50051] = "INVALID_GIFT_REDEMPTION_OWNED";
    JSONErrorCodes[JSONErrorCodes["INVALID_GIFT_SELF_REDEMPTION"] = 50054] = "INVALID_GIFT_SELF_REDEMPTION";
    JSONErrorCodes[JSONErrorCodes["INVALID_GUILD"] = 50055] = "INVALID_GUILD";
    JSONErrorCodes[JSONErrorCodes["INVALID_REQUEST_ORIGIN"] = 50067] = "INVALID_REQUEST_ORIGIN";
    JSONErrorCodes[JSONErrorCodes["INVALID_MESSAGE_TYPE"] = 50068] = "INVALID_MESSAGE_TYPE";
    JSONErrorCodes[JSONErrorCodes["PAYMENT_SOURCE_REQUIRED"] = 50070] = "PAYMENT_SOURCE_REQUIRED";
    JSONErrorCodes[JSONErrorCodes["CANNOT_MODIFY_SYSTEM_WEBHOOK"] = 50073] = "CANNOT_MODIFY_SYSTEM_WEBHOOK";
    JSONErrorCodes[JSONErrorCodes["CANNOT_DELETE_COMMUNITY_REQUIRED_CHANNEL"] = 50074] = "CANNOT_DELETE_COMMUNITY_REQUIRED_CHANNEL";
    JSONErrorCodes[JSONErrorCodes["CANNOT_EDIT_MESSAGE_STICKERS"] = 50080] = "CANNOT_EDIT_MESSAGE_STICKERS";
    JSONErrorCodes[JSONErrorCodes["INVALID_STICKER_SENT"] = 50081] = "INVALID_STICKER_SENT";
    JSONErrorCodes[JSONErrorCodes["THREAD_ARCHIVED"] = 50083] = "THREAD_ARCHIVED";
    JSONErrorCodes[JSONErrorCodes["INVALID_THREAD_NOTIFICATION_SETTINGS"] = 50084] = "INVALID_THREAD_NOTIFICATION_SETTINGS";
    JSONErrorCodes[JSONErrorCodes["BEFORE_EARLIER_THAN_THREAD_CREATION_DATE"] = 50085] = "BEFORE_EARLIER_THAN_THREAD_CREATION_DATE";
    JSONErrorCodes[JSONErrorCodes["COMMUNITY_CHANNELS_MUST_BE_TEXT"] = 50086] = "COMMUNITY_CHANNELS_MUST_BE_TEXT";
    JSONErrorCodes[JSONErrorCodes["INVALID_COUNTRY_CODE"] = 50095] = "INVALID_COUNTRY_CODE";
    JSONErrorCodes[JSONErrorCodes["INVALID_CANNOT_FRIEND_SELF"] = 50096] = "INVALID_CANNOT_FRIEND_SELF";
    JSONErrorCodes[JSONErrorCodes["INVALID_GIFT_REDEMPTION_FRAUD_REJECTED"] = 50097] = "INVALID_GIFT_REDEMPTION_FRAUD_REJECTED";
    JSONErrorCodes[JSONErrorCodes["MONETIZATION_REQUIRED"] = 50097] = "MONETIZATION_REQUIRED";
    JSONErrorCodes[JSONErrorCodes["BOOSTS_REQUIRED"] = 50101] = "BOOSTS_REQUIRED";
    JSONErrorCodes[JSONErrorCodes["INVALID_USER_SETTINGS_DATA"] = 50105] = "INVALID_USER_SETTINGS_DATA";
    JSONErrorCodes[JSONErrorCodes["INVALID_ACTIVITY_LAUNCH_NO_ACCESS"] = 50106] = "INVALID_ACTIVITY_LAUNCH_NO_ACCESS";
    JSONErrorCodes[JSONErrorCodes["INVALID_ACTIVITY_LAUNCH_PREMIUM_TIER"] = 50107] = "INVALID_ACTIVITY_LAUNCH_PREMIUM_TIER";
    JSONErrorCodes[JSONErrorCodes["INVALID_ACTIVITY_LAUNCH_CONCURRENT_ACTIVITIES"] = 50108] = "INVALID_ACTIVITY_LAUNCH_CONCURRENT_ACTIVITIES";
    JSONErrorCodes[JSONErrorCodes["INVALID_JSON"] = 50109] = "INVALID_JSON";
    JSONErrorCodes[JSONErrorCodes["INVALID_PROVIDED_FILE"] = 50110] = "INVALID_PROVIDED_FILE";
    JSONErrorCodes[JSONErrorCodes["INVALID_PROVIDED_FILE_TYPE"] = 50123] = "INVALID_PROVIDED_FILE_TYPE";
    JSONErrorCodes[JSONErrorCodes["INVALID_PROVIDED_FILE_DURATION"] = 50124] = "INVALID_PROVIDED_FILE_DURATION";
    JSONErrorCodes[JSONErrorCodes["OWNER_CANNOT_BE_PENDING_MEMBER"] = 50131] = "OWNER_CANNOT_BE_PENDING_MEMBER";
    JSONErrorCodes[JSONErrorCodes["OWNERSHIP_CANNOT_BE_TRANSFERRED_TO_BOT"] = 50132] = "OWNERSHIP_CANNOT_BE_TRANSFERRED_TO_BOT";
    JSONErrorCodes[JSONErrorCodes["INVALID_FILE_ASSET_SIZE_RESIZE_GIF"] = 50138] = "INVALID_FILE_ASSET_SIZE_RESIZE_GIF";
    JSONErrorCodes[JSONErrorCodes["CANNOT_MIX_SUBSCRIPTION_AND_NON_SUBSCRIPTION_ROLES"] = 50144] = "CANNOT_MIX_SUBSCRIPTION_AND_NON_SUBSCRIPTION_ROLES";
    JSONErrorCodes[JSONErrorCodes["CANNOT_CONVERT_BETWEEN_PREMIUM_AND_NORMAL_EMOJI"] = 50145] = "CANNOT_CONVERT_BETWEEN_PREMIUM_AND_NORMAL_EMOJI";
    JSONErrorCodes[JSONErrorCodes["UPLOADED_FILE_NOT_FOUND"] = 50146] = "UPLOADED_FILE_NOT_FOUND";
    JSONErrorCodes[JSONErrorCodes["INVALID_SPECIFIED_EMOJI"] = 50151] = "INVALID_SPECIFIED_EMOJI";
    JSONErrorCodes[JSONErrorCodes["INVALID_ACTIVITY_LAUNCH_AFK_CHANNEL"] = 50148] = "INVALID_ACTIVITY_LAUNCH_AFK_CHANNEL";
    JSONErrorCodes[JSONErrorCodes["VOICE_MESSAGES_DO_NOT_SUPPORT_ADDITIONAL_CONTENT"] = 50159] = "VOICE_MESSAGES_DO_NOT_SUPPORT_ADDITIONAL_CONTENT";
    JSONErrorCodes[JSONErrorCodes["VOICE_MESSAGES_MUST_HAVE_A_SINGLE_AUDIO_ATTACHMENT"] = 50160] = "VOICE_MESSAGES_MUST_HAVE_A_SINGLE_AUDIO_ATTACHMENT";
    JSONErrorCodes[JSONErrorCodes["VOICE_MESSAGES_MUST_HAVE_SUPPORTING_METADATA"] = 50161] = "VOICE_MESSAGES_MUST_HAVE_SUPPORTING_METADATA";
    JSONErrorCodes[JSONErrorCodes["VOICE_MESSAGES_CANNOT_BE_EDITED"] = 50162] = "VOICE_MESSAGES_CANNOT_BE_EDITED";
    JSONErrorCodes[JSONErrorCodes["CANNOT_DELETE_GUILD_SUBSCRIPTION_INTEGRATION"] = 50163] = "CANNOT_DELETE_GUILD_SUBSCRIPTION_INTEGRATION";
    JSONErrorCodes[JSONErrorCodes["NEW_OWNER_INELIGIBLE_FOR_SERVER_SUBSCRIPTION"] = 50164] = "NEW_OWNER_INELIGIBLE_FOR_SERVER_SUBSCRIPTION";
    JSONErrorCodes[JSONErrorCodes["INVALID_ACTIVITY_LAUNCH_AGE_GATED"] = 50165] = "INVALID_ACTIVITY_LAUNCH_AGE_GATED";
    JSONErrorCodes[JSONErrorCodes["CANNOT_SEND_VOICE_MESSAGES_IN_CHANNEL"] = 50173] = "CANNOT_SEND_VOICE_MESSAGES_IN_CHANNEL";
    JSONErrorCodes[JSONErrorCodes["USER_MUST_FIRST_BE_VERIFIED"] = 50178] = "USER_MUST_FIRST_BE_VERIFIED";
    JSONErrorCodes[JSONErrorCodes["PROVIDED_FILE_HAS_INVALID_DURATION"] = 50192] = "PROVIDED_FILE_HAS_INVALID_DURATION";
    JSONErrorCodes[JSONErrorCodes["INVALID_SKU_ATTACHMENT_NO_ARCHIVES"] = 50186] = "INVALID_SKU_ATTACHMENT_NO_ARCHIVES";
    JSONErrorCodes[JSONErrorCodes["NO_PERMISSION_TO_SEND_STICKER"] = 50600] = "NO_PERMISSION_TO_SEND_STICKER";
    JSONErrorCodes[JSONErrorCodes["MFA_ENABLED"] = 60001] = "MFA_ENABLED";
    JSONErrorCodes[JSONErrorCodes["MFA_DISABLED"] = 60002] = "MFA_DISABLED";
    JSONErrorCodes[JSONErrorCodes["MFA_REQUIRED"] = 60003] = "MFA_REQUIRED";
    JSONErrorCodes[JSONErrorCodes["MFA_UNVERIFIED"] = 60004] = "MFA_UNVERIFIED";
    JSONErrorCodes[JSONErrorCodes["MFA_INVALID_SECRET"] = 60005] = "MFA_INVALID_SECRET";
    JSONErrorCodes[JSONErrorCodes["MFA_INVALID_TICKET"] = 60006] = "MFA_INVALID_TICKET";
    JSONErrorCodes[JSONErrorCodes["MFA_INVALID_CODE"] = 60008] = "MFA_INVALID_CODE";
    JSONErrorCodes[JSONErrorCodes["MFA_INVALID_SESSION"] = 60009] = "MFA_INVALID_SESSION";
    JSONErrorCodes[JSONErrorCodes["PHONE_NUMBER_UNABLE_TO_SEND"] = 70003] = "PHONE_NUMBER_UNABLE_TO_SEND";
    JSONErrorCodes[JSONErrorCodes["PHONE_VERIFICATION_REQUIRED"] = 70007] = "PHONE_VERIFICATION_REQUIRED";
    JSONErrorCodes[JSONErrorCodes["RELATIONSHIP_INCOMING_DISABLED"] = 80000] = "RELATIONSHIP_INCOMING_DISABLED";
    JSONErrorCodes[JSONErrorCodes["RELATIONSHIP_INCOMING_BLOCKED"] = 80001] = "RELATIONSHIP_INCOMING_BLOCKED";
    JSONErrorCodes[JSONErrorCodes["RELATIONSHIP_INVALID_USER_BOT"] = 80002] = "RELATIONSHIP_INVALID_USER_BOT";
    JSONErrorCodes[JSONErrorCodes["RELATIONSHIP_INVALID_SELF"] = 80003] = "RELATIONSHIP_INVALID_SELF";
    JSONErrorCodes[JSONErrorCodes["RELATIONSHIP_INVALID_DISCORD_TAG"] = 80004] = "RELATIONSHIP_INVALID_DISCORD_TAG";
    JSONErrorCodes[JSONErrorCodes["RELATIONSHIP_ALREADY_FRIENDS"] = 80007] = "RELATIONSHIP_ALREADY_FRIENDS";
    JSONErrorCodes[JSONErrorCodes["REACTION_BLOCKED"] = 90001] = "REACTION_BLOCKED";
    JSONErrorCodes[JSONErrorCodes["USER_CANNOT_USE_BURST_REACTIONS"] = 90002] = "USER_CANNOT_USE_BURST_REACTIONS";
    JSONErrorCodes[JSONErrorCodes["INVALID_GIFT_REDEMPTION_SUBSCRIPTION_MANAGED"] = 100021] = "INVALID_GIFT_REDEMPTION_SUBSCRIPTION_MANAGED";
    JSONErrorCodes[JSONErrorCodes["INVALID_GIFT_REDEMPTION_SUBSCRIPTION_INCOMPATIBLE"] = 100023] = "INVALID_GIFT_REDEMPTION_SUBSCRIPTION_INCOMPATIBLE";
    JSONErrorCodes[JSONErrorCodes["INVALID_GIFT_REDEMPTION_INVOICE_OPEN"] = 100024] = "INVALID_GIFT_REDEMPTION_INVOICE_OPEN";
    JSONErrorCodes[JSONErrorCodes["INELIGIBLE_FOR_SUBSCRIPTION"] = 100053] = "INELIGIBLE_FOR_SUBSCRIPTION";
    JSONErrorCodes[JSONErrorCodes["BILLING_NON_REFUNDABLE_PAYMENT_SOURCE"] = 100060] = "BILLING_NON_REFUNDABLE_PAYMENT_SOURCE";
    JSONErrorCodes[JSONErrorCodes["INDEX_NOT_YET_AVAILABLE"] = 110000] = "INDEX_NOT_YET_AVAILABLE";
    JSONErrorCodes[JSONErrorCodes["APPLICATION_NOT_AVAILABLE"] = 110001] = "APPLICATION_NOT_AVAILABLE";
    JSONErrorCodes[JSONErrorCodes["LISTING_ALREADY_JOINED"] = 120000] = "LISTING_ALREADY_JOINED";
    JSONErrorCodes[JSONErrorCodes["LISTING_TOO_MANY_MEMBERS"] = 120001] = "LISTING_TOO_MANY_MEMBERS";
    JSONErrorCodes[JSONErrorCodes["LISTING_JOIN_BLOCKED"] = 120002] = "LISTING_JOIN_BLOCKED";
    JSONErrorCodes[JSONErrorCodes["API_RESOURCE_IS_CURRENTLY_OVERLOADED"] = 130000] = "API_RESOURCE_IS_CURRENTLY_OVERLOADED";
    JSONErrorCodes[JSONErrorCodes["STAGE_ALREADY_OPEN"] = 150006] = "STAGE_ALREADY_OPEN";
    JSONErrorCodes[JSONErrorCodes["CANNOT_REPLY_WITHOUT_READ_MESSAGE_HISTORY"] = 160002] = "CANNOT_REPLY_WITHOUT_READ_MESSAGE_HISTORY";
    JSONErrorCodes[JSONErrorCodes["THREAD_ALREADY_CREATED_FOR_MESSAGE"] = 160004] = "THREAD_ALREADY_CREATED_FOR_MESSAGE";
    JSONErrorCodes[JSONErrorCodes["THREAD_IS_LOCKED"] = 160005] = "THREAD_IS_LOCKED";
    JSONErrorCodes[JSONErrorCodes["TOO_MANY_THREADS"] = 160006] = "TOO_MANY_THREADS";
    JSONErrorCodes[JSONErrorCodes["TOO_MANY_ANNOUNCEMENT_THREADS"] = 160007] = "TOO_MANY_ANNOUNCEMENT_THREADS";
    JSONErrorCodes[JSONErrorCodes["INVALID_LOTTIE_JSON"] = 170001] = "INVALID_LOTTIE_JSON";
    JSONErrorCodes[JSONErrorCodes["UPLOADED_LOTTIE_RASTERIZED"] = 170002] = "UPLOADED_LOTTIE_RASTERIZED";
    JSONErrorCodes[JSONErrorCodes["STICKER_MAXIMUM_FRAMERATE_EXCEEDED"] = 170003] = "STICKER_MAXIMUM_FRAMERATE_EXCEEDED";
    JSONErrorCodes[JSONErrorCodes["STICKER_FRAME_COUNT_EXCEEDS_MAXIMUM"] = 170004] = "STICKER_FRAME_COUNT_EXCEEDS_MAXIMUM";
    JSONErrorCodes[JSONErrorCodes["LOTTIE_ANIMATION_MAXIMUM_DIMENSIONS_EXCEEDED"] = 170005] = "LOTTIE_ANIMATION_MAXIMUM_DIMENSIONS_EXCEEDED";
    JSONErrorCodes[JSONErrorCodes["STICKER_FRAME_RATE_TOO_SMALL_OR_LARGE"] = 170006] = "STICKER_FRAME_RATE_TOO_SMALL_OR_LARGE";
    JSONErrorCodes[JSONErrorCodes["STICKER_ANIMATION_DURATION_TOO_LONG"] = 170007] = "STICKER_ANIMATION_DURATION_TOO_LONG";
    JSONErrorCodes[JSONErrorCodes["POGGERMODE_TEMPORARILY_DISABLED"] = 170008] = "POGGERMODE_TEMPORARILY_DISABLED";
    JSONErrorCodes[JSONErrorCodes["CANNOT_UPDATE_FINISHED_EVENT"] = 180000] = "CANNOT_UPDATE_FINISHED_EVENT";
    JSONErrorCodes[JSONErrorCodes["FAILED_TO_CREATE_STAGE_INSTANCE"] = 180002] = "FAILED_TO_CREATE_STAGE_INSTANCE";
    JSONErrorCodes[JSONErrorCodes["AUTOMOD_MESSAGE_BLOCKED"] = 200000] = "AUTOMOD_MESSAGE_BLOCKED";
    JSONErrorCodes[JSONErrorCodes["AUTOMOD_TITLE_BLOCKED"] = 200001] = "AUTOMOD_TITLE_BLOCKED";
    JSONErrorCodes[JSONErrorCodes["AUTOMOD_INVALID_RUST_SERVICE_RESPONSE"] = 200002] = "AUTOMOD_INVALID_RUST_SERVICE_RESPONSE";
    JSONErrorCodes[JSONErrorCodes["MONETIZATION_TERMS_NOT_ACCEPTED"] = 210003] = "MONETIZATION_TERMS_NOT_ACCEPTED";
    JSONErrorCodes[JSONErrorCodes["TWO_FA_NOT_ENABLED"] = 210011] = "TWO_FA_NOT_ENABLED";
    JSONErrorCodes[JSONErrorCodes["GUILD_PRODUCT_LISTING_CANNOT_PUBLISH_WITHOUT_BENEFIT"] = 210021] = "GUILD_PRODUCT_LISTING_CANNOT_PUBLISH_WITHOUT_BENEFIT";
    JSONErrorCodes[JSONErrorCodes["CREATOR_MONETIZATION_PAYMENT_TEAM_REQUIRED"] = 210026] = "CREATOR_MONETIZATION_PAYMENT_TEAM_REQUIRED";
    JSONErrorCodes[JSONErrorCodes["CREATOR_MONETIZATION_PAYMENT_ACCOUNT_VERIFICATION_REQUIRED"] = 210027] = "CREATOR_MONETIZATION_PAYMENT_ACCOUNT_VERIFICATION_REQUIRED";
    JSONErrorCodes[JSONErrorCodes["WEBHOOKS_POSTED_TO_FORUM_CHANNELS_MUST_HAVE_THREAD_NAME_OR_THREAD_ID"] = 220001] = "WEBHOOKS_POSTED_TO_FORUM_CHANNELS_MUST_HAVE_THREAD_NAME_OR_THREAD_ID";
    JSONErrorCodes[JSONErrorCodes["WEBHOOKS_POSTED_TO_FORUM_CHANNELS_CANNOT_HAVE_BOTH_THREAD_NAME_AND_THREAD_ID"] = 220002] = "WEBHOOKS_POSTED_TO_FORUM_CHANNELS_CANNOT_HAVE_BOTH_THREAD_NAME_AND_THREAD_ID";
    JSONErrorCodes[JSONErrorCodes["WEBHOOKS_CAN_ONLY_CREATE_THREADS_IN_FORUM_CHANNELS"] = 220003] = "WEBHOOKS_CAN_ONLY_CREATE_THREADS_IN_FORUM_CHANNELS";
    JSONErrorCodes[JSONErrorCodes["WEBHOOK_SERVICES_CANNOT_BE_USED_IN_FORUM_CHANNELS"] = 220004] = "WEBHOOK_SERVICES_CANNOT_BE_USED_IN_FORUM_CHANNELS";
    JSONErrorCodes[JSONErrorCodes["MESSAGE_BLOCKED_BY_HARMFUL_LINKS_FILTER"] = 220005] = "MESSAGE_BLOCKED_BY_HARMFUL_LINKS_FILTER";
    JSONErrorCodes[JSONErrorCodes["HARMFUL_LINK_MESSAGE_BLOCKED"] = 240000] = "HARMFUL_LINK_MESSAGE_BLOCKED";
    JSONErrorCodes[JSONErrorCodes["CLYDE_CONSENT_REQUIRED"] = 310000] = "CLYDE_CONSENT_REQUIRED";
    JSONErrorCodes[JSONErrorCodes["CLYDE_UNSAFE_PERSONALITY"] = 310003] = "CLYDE_UNSAFE_PERSONALITY";
    JSONErrorCodes[JSONErrorCodes["USER_LIMITED_ACCESS_DEFAULT"] = 340000] = "USER_LIMITED_ACCESS_DEFAULT";
    JSONErrorCodes[JSONErrorCodes["USER_FRIEND_REQUEST_LIMITED_ACCESS"] = 340007] = "USER_FRIEND_REQUEST_LIMITED_ACCESS";
    JSONErrorCodes[JSONErrorCodes["USER_LIMITED_ACCESS_MAX"] = 349999] = "USER_LIMITED_ACCESS_MAX";
    JSONErrorCodes[JSONErrorCodes["CANNOT_ENABLE_ONBOARDING_REQUIREMENTS_NOT_MET"] = 350000] = "CANNOT_ENABLE_ONBOARDING_REQUIREMENTS_NOT_MET";
    JSONErrorCodes[JSONErrorCodes["CANNOT_ENABLE_ONBOARDING_BELOW_REQUIREMENTS"] = 350001] = "CANNOT_ENABLE_ONBOARDING_BELOW_REQUIREMENTS";
    JSONErrorCodes[JSONErrorCodes["GUILD_LIMITED_ACCESS_DEFAULT"] = 400000] = "GUILD_LIMITED_ACCESS_DEFAULT";
    JSONErrorCodes[JSONErrorCodes["GUILD_FILE_UPLOAD_RATE_LIMITED_ACCESS"] = 400001] = "GUILD_FILE_UPLOAD_RATE_LIMITED_ACCESS";
    JSONErrorCodes[JSONErrorCodes["GUILD_JOIN_INVITE_LIMITED_ACCESS"] = 400002] = "GUILD_JOIN_INVITE_LIMITED_ACCESS";
    JSONErrorCodes[JSONErrorCodes["GUILD_GO_LIVE_LIMITED_ACCESS"] = 400003] = "GUILD_GO_LIVE_LIMITED_ACCESS";
    JSONErrorCodes[JSONErrorCodes["GUILD_LIMITED_ACCESS_MAX"] = 409999] = "GUILD_LIMITED_ACCESS_MAX";
    JSONErrorCodes[JSONErrorCodes["FAILED_TO_BAN_USERS"] = 500000] = "FAILED_TO_BAN_USERS";
    JSONErrorCodes[JSONErrorCodes["POLL_VOTING_BLOCKED"] = 520000] = "POLL_VOTING_BLOCKED";
    JSONErrorCodes[JSONErrorCodes["POLL_EXPIRED"] = 520001] = "POLL_EXPIRED";
    JSONErrorCodes[JSONErrorCodes["INVALID_CHANNEL_TYPE_FOR_POLL_CREATION"] = 520002] = "INVALID_CHANNEL_TYPE_FOR_POLL_CREATION";
    JSONErrorCodes[JSONErrorCodes["CANNOT_EDIT_POLL_MESSAGE"] = 520003] = "CANNOT_EDIT_POLL_MESSAGE";
    JSONErrorCodes[JSONErrorCodes["CANNOT_USE_AN_EMOJI_INCLUDED_WITH_THE_POLL"] = 520004] = "CANNOT_USE_AN_EMOJI_INCLUDED_WITH_THE_POLL";
    JSONErrorCodes[JSONErrorCodes["CANNOT_EXPIRE_A_NON_POLL_MESSAGE"] = 520006] = "CANNOT_EXPIRE_A_NON_POLL_MESSAGE";
    JSONErrorCodes[JSONErrorCodes["POLL_IS_ALREADY_EXPIRED"] = 520007] = "POLL_IS_ALREADY_EXPIRED";
    JSONErrorCodes[JSONErrorCodes["APPLICATION_PROVISIONAL_ACCOUNTS_NOT_GRANTED"] = 530000] = "APPLICATION_PROVISIONAL_ACCOUNTS_NOT_GRANTED";
    JSONErrorCodes[JSONErrorCodes["JWT_TOKEN_EXPIRED"] = 530001] = "JWT_TOKEN_EXPIRED";
    JSONErrorCodes[JSONErrorCodes["JWT_TOKEN_ISSUER_MISMATCH"] = 530002] = "JWT_TOKEN_ISSUER_MISMATCH";
    JSONErrorCodes[JSONErrorCodes["JWT_TOKEN_AUDIENCE_MISMATCH"] = 530003] = "JWT_TOKEN_AUDIENCE_MISMATCH";
    JSONErrorCodes[JSONErrorCodes["JWT_TOKEN_ISSUED_TOO_LONG_AGO"] = 530004] = "JWT_TOKEN_ISSUED_TOO_LONG_AGO";
    JSONErrorCodes[JSONErrorCodes["UNIQUE_USERNAME_GENERATION_FAILED"] = 530006] = "UNIQUE_USERNAME_GENERATION_FAILED";
    JSONErrorCodes[JSONErrorCodes["CLIENT_SECRET_INVALID"] = 530007] = "CLIENT_SECRET_INVALID";
})(JSONErrorCodes || (exports.JSONErrorCodes = JSONErrorCodes = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29uc3RhbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL0NvbnN0YW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBZUEsMkVBQWtDO0FBRXJCLFFBQUEsZUFBZSxHQUFHLEVBQUUsQ0FBQztBQUNyQixRQUFBLFlBQVksR0FBTSxFQUFFLENBQUM7QUFDckIsUUFBQSxRQUFRLEdBQVUscUJBQXFCLENBQUM7QUFDeEMsUUFBQSxPQUFPLEdBQVcsR0FBRyxnQkFBUSxTQUFTLG9CQUFZLEVBQUUsQ0FBQztBQUNyRCxRQUFBLE9BQU8sR0FBVyxzQkFBRyxDQUFDLE9BQU8sQ0FBQztBQUM5QixRQUFBLFVBQVUsR0FBUSxXQUFXLGVBQU8seUNBQXlDLENBQUM7QUFDOUUsUUFBQSxpQkFBaUIsR0FBRztJQUM3QixFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUc7SUFDM0QsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSTtJQUNsRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUk7Q0FDbkIsQ0FBQztBQUVXLFFBQUEsV0FBVyxHQUFHO0lBQ3ZCLEtBQUs7SUFDTCxNQUFNO0lBQ04sS0FBSztJQUNMLE9BQU87SUFDUCxRQUFRO0NBQ0YsQ0FBQztBQUdFLFFBQUEsWUFBWSxHQUFHO0lBQ3hCLEtBQUs7SUFDTCxNQUFNO0lBQ04sS0FBSztJQUNMLE1BQU07SUFDTixLQUFLO0NBQ0MsQ0FBQztBQUtYLElBQVksWUFPWDtBQVBELFdBQVksWUFBWTtJQUNwQiw2RUFBNkU7SUFDN0UsdURBQW9CLENBQUE7SUFDcEIsOEZBQThGO0lBQzlGLHVFQUFvQixDQUFBO0lBQ3BCLCtEQUErRDtJQUMvRCw2REFBb0IsQ0FBQTtBQUN4QixDQUFDLEVBUFcsWUFBWSw0QkFBWixZQUFZLFFBT3ZCO0FBRUQsSUFBWSxZQVNYO0FBVEQsV0FBWSxZQUFZO0lBQ3BCLDRHQUE0RztJQUM1RywrQ0FBaUIsQ0FBQTtJQUNqQixvQkFBb0I7SUFDcEIsaUVBQWlCLENBQUE7SUFDakIsWUFBWTtJQUNaLGlEQUFpQixDQUFBO0lBQ2pCLGtCQUFrQjtJQUNsQiw2REFBaUIsQ0FBQTtBQUNyQixDQUFDLEVBVFcsWUFBWSw0QkFBWixZQUFZLFFBU3ZCO0FBRUQsa0JBQWtCO0FBQ2xCLElBQVksU0EyRVg7QUEzRUQsV0FBWSxTQUFTO0lBQ2pCLG9CQUFvQjtJQUNwQiwyQ0FBbUMsQ0FBQTtJQUNuQyw2QkFBNkI7SUFDN0IsK0NBQW1DLENBQUE7SUFDbkMsdUJBQXVCO0lBQ3ZCLG1EQUFtQyxDQUFBO0lBQ25DLGlDQUFpQztJQUNqQyxxRUFBbUMsQ0FBQTtJQUNuQywwREFBMEQ7SUFDMUQsZ0RBQW1DLENBQUE7SUFDbkMsK0RBQStEO0lBQy9ELGdGQUFtQyxDQUFBO0lBQ25DLG9FQUFtQyxDQUFBO0lBQ25DLDJFQUFtQyxDQUFBO0lBQ25DLHFFQUFtQyxDQUFBO0lBQ25DLGlFQUFtQyxDQUFBO0lBQ25DLG9FQUFvQyxDQUFBO0lBQ3BDLG1IQUFtSDtJQUNuSCx3RUFBb0MsQ0FBQTtJQUNwQyx3RUFBd0U7SUFDeEUsZ0RBQW9DLENBQUE7SUFDcEMsa0dBQWtHO0lBQ2xHLHdGQUFvQyxDQUFBO0lBQ3BDLGlDQUFpQztJQUNqQyx5RUFBb0MsQ0FBQTtJQUNwQyw4RUFBOEU7SUFDOUUscUVBQW9DLENBQUE7SUFDcEMsbUJBQW1CO0lBQ25CLDZEQUFvQyxDQUFBO0lBQ3BDLG1DQUFtQztJQUNuQywwRUFBb0MsQ0FBQTtJQUNwQyxnQ0FBZ0M7SUFDaEMsNEVBQW9DLENBQUE7SUFDcEMsNkVBQTZFO0lBQzdFLGdGQUFvQyxDQUFBO0lBQ3BDLDZFQUE2RTtJQUM3RSxxREFBb0MsQ0FBQTtJQUNwQyxzRUFBc0U7SUFDdEUscUVBQW9DLENBQUE7SUFDcEMsbUNBQW1DO0lBQ25DLHVFQUFvQyxDQUFBO0lBQ3BDLDJFQUEyRTtJQUMzRSw2RUFBb0MsQ0FBQTtJQUVwQywwRUFBMEU7SUFDMUUsc0ZBQXNDLENBQUE7SUFDdEMsZ0NBQWdDO0lBQ2hDLHlEQUFzQyxDQUFBO0lBQ3RDLHdHQUF3RztJQUN4RyxtR0FBc0MsQ0FBQTtJQUN0QyxxQ0FBcUM7SUFDckMsbUVBQXNDLENBQUE7SUFDdEMsa0VBQWtFO0lBQ2xFLHNGQUFzQyxDQUFBO0lBQ3RDLHVDQUF1QztJQUN2QyxrRkFBc0MsQ0FBQTtJQUN0QyxtQ0FBbUM7SUFDbkMsMEVBQXNDLENBQUE7SUFDdEMsc0NBQXNDO0lBQ3RDLGlGQUFzQyxDQUFBO0lBQ3RDLGlDQUFpQztJQUNqQyw2REFBc0MsQ0FBQTtJQUV0Qyx5RUFBd0IsQ0FBQTtJQUN4QixrRUFBa0U7SUFDbEUsb0VBQXdCLENBQUE7SUFFeEIsNERBQTREO0lBQzVELHVIQUE4QyxDQUFBO0lBRTlDLHFEQUFxRDtJQUNyRCx3RUFBaUMsQ0FBQTtJQUNqQyxnRUFBZ0U7SUFDaEUsOEZBQWlDLENBQUE7QUFDckMsQ0FBQyxFQTNFVyxTQUFTLHlCQUFULFNBQVMsUUEyRXBCO0FBRUQsSUFBWSwyQkFLWDtBQUxELFdBQVksMkJBQTJCO0lBQ25DLGlDQUFpQztJQUNqQywrRkFBaUIsQ0FBQTtJQUNqQixnQ0FBZ0M7SUFDaEMsNkZBQWlCLENBQUE7QUFDckIsQ0FBQyxFQUxXLDJCQUEyQiwyQ0FBM0IsMkJBQTJCLFFBS3RDO0FBRUQsSUFBWSx1QkFPWDtBQVBELFdBQVksdUJBQXVCO0lBQy9CLHFEQUFxRDtJQUNyRCx1RUFBbUIsQ0FBQTtJQUNuQiw4RUFBOEU7SUFDOUUseUVBQW1CLENBQUE7SUFDbkIsK0RBQStEO0lBQy9ELDJGQUFtQixDQUFBO0FBQ3ZCLENBQUMsRUFQVyx1QkFBdUIsdUNBQXZCLHVCQUF1QixRQU9sQztBQUVELElBQVksZ0JBb0VYO0FBcEVELFdBQVksZ0JBQWdCO0lBQ3hCLCtFQUErRTtJQUMvRSxpRkFBc0QsQ0FBQTtJQUN0RCwyQ0FBMkM7SUFDM0MseUVBQXNELENBQUE7SUFDdEQsb0RBQW9EO0lBQ3BELHVFQUFzRCxDQUFBO0lBQ3RELHFEQUFxRDtJQUNyRCw4RUFBc0QsQ0FBQTtJQUN0RCw2REFBNkQ7SUFDN0QsZ0ZBQXNELENBQUE7SUFDdEQsMElBQXNELENBQUE7SUFDdEQscURBQXFEO0lBQ3JELDJGQUFzRCxDQUFBO0lBQ3RELHNEQUFzRDtJQUN0RCx5RUFBc0QsQ0FBQTtJQUN0RCxpR0FBaUc7SUFDakcseUZBQXNELENBQUE7SUFDdEQsK0RBQStEO0lBQy9ELDZHQUFzRCxDQUFBO0lBQ3RELHdFQUF3RTtJQUN4RSx5RkFBc0QsQ0FBQTtJQUN0RCxnRUFBZ0U7SUFDaEUsc0hBQXVELENBQUE7SUFDdkQsNkRBQTZEO0lBQzdELGtIQUF1RCxDQUFBO0lBQ3ZELG9EQUFvRDtJQUNwRCxvRkFBdUQsQ0FBQTtJQUN2RCwrRkFBK0Y7SUFDL0Ysa0ZBQXVELENBQUE7SUFDdkQsNkZBQTZGO0lBQzdGLGtHQUF1RCxDQUFBO0lBQ3ZELGtIQUFrSDtJQUNsSCw2RkFBdUQsQ0FBQTtJQUN2RCxnSEFBZ0g7SUFDaEgsNkdBQXVELENBQUE7SUFDdkQsNEVBQTRFO0lBQzVFLG1IQUF1RCxDQUFBO0lBQ3ZELDREQUE0RDtJQUM1RCxvRUFBdUQsQ0FBQTtJQUN2RCxnRkFBZ0Y7SUFDaEYsa0dBQXVELENBQUE7SUFDdkQsOEVBQThFO0lBQzlFLGtIQUF1RCxDQUFBO0lBQ3ZELGlEQUFpRDtJQUNqRCw2RkFBdUQsQ0FBQTtJQUN2RCw2R0FBdUQsQ0FBQTtJQUV2RCw2REFBNkQ7SUFDN0QsdUdBQW1DLENBQUE7SUFDbkMsMkZBQTJGO0lBQzNGLGtFQUFtQyxDQUFBO0lBQ25DLHNIQUFzSDtJQUN0SCw0RkFBbUMsQ0FBQTtJQUNuQyxnREFBZ0Q7SUFDaEQsOEVBQW1DLENBQUE7SUFDbkMsK0NBQStDO0lBQy9DLHVHQUFtQyxDQUFBO0lBRW5DLHNFQUFzRTtJQUN0RSx1RUFBa0IsQ0FBQTtJQUNsQix1Q0FBdUM7SUFDdkMscUVBQWtCLENBQUE7SUFFbEIscURBQXFEO0lBQ3JELG9FQUFxQyxDQUFBO0lBQ3JDLHlEQUF5RDtJQUN6RCwrR0FBcUMsQ0FBQTtBQUN6QyxDQUFDLEVBcEVXLGdCQUFnQixnQ0FBaEIsZ0JBQWdCLFFBb0UzQjtBQUVZLFFBQUEsYUFBYSxHQUFHO0lBQ3pCLGtCQUFrQjtJQUNsQixxQkFBcUI7SUFDckIseUJBQXlCO0lBQ3pCLGlCQUFpQjtJQUNqQixlQUFlO0lBQ2Ysb0NBQW9DO0lBQ3BDLGlCQUFpQjtJQUNqQiw4QkFBOEI7SUFDOUIsUUFBUTtJQUNSLDRCQUE0QjtJQUM1QixpQkFBaUI7SUFDakIsNkJBQTZCO0lBQzdCLG9CQUFvQjtJQUNwQiwrQkFBK0I7SUFDL0IsZ0JBQWdCO0lBQ2hCLGVBQWU7SUFDZiwwQkFBMEI7SUFDMUIsVUFBVTtJQUNWLGtCQUFrQjtJQUNsQiwyQkFBMkI7SUFDM0IsNkJBQTZCO0lBQzdCLHNCQUFzQjtJQUN0QixXQUFXO0lBQ1gsNEJBQTRCO0lBQzVCLDhCQUE4QjtJQUM5QixrREFBa0Q7SUFDbEQsaUNBQWlDO0lBQ2pDLGdDQUFnQztJQUNoQyxnQ0FBZ0M7SUFDaEMscUJBQXFCO0lBQ3JCLG9CQUFvQjtJQUNwQiwwQkFBMEI7SUFDMUIsdUJBQXVCO0lBQ3ZCLGNBQWM7SUFDZCw2QkFBNkI7SUFDN0IsaURBQWlEO0lBQ2pELHNCQUFzQjtJQUN0QixzQ0FBc0M7SUFDdEMsWUFBWTtJQUNaLGdCQUFnQjtJQUNoQixpQ0FBaUM7SUFDakMscUJBQXFCO0lBQ3JCLGlCQUFpQjtJQUNqQiwrQkFBK0I7SUFDL0IsOEJBQThCO0lBQzlCLGtCQUFrQjtJQUNsQix1Q0FBdUM7SUFDdkMsb0JBQW9CO0lBQ3BCLDJCQUEyQjtJQUMzQiw2QkFBNkI7SUFDN0IscUJBQXFCO0lBQ3JCLEtBQUs7SUFDTCx3QkFBd0I7SUFDeEIsd0JBQXdCO0lBQ3hCLGVBQWU7SUFDZixrQkFBa0I7SUFDbEIsZUFBZTtJQUNmLCtCQUErQjtJQUMvQixpQkFBaUI7SUFDakIsNEJBQTRCO0lBQzVCLGtDQUFrQztJQUNsQyxzQkFBc0I7SUFDdEIsWUFBWTtJQUNaLGFBQWE7SUFDYixpQkFBaUI7SUFDakIsZUFBZTtJQUNmLHdCQUF3QjtJQUN4QixNQUFNO0lBQ04sMkJBQTJCO0lBQzNCLFdBQVc7SUFDWCxpQkFBaUI7SUFDakIseUJBQXlCO0lBQ3pCLGlCQUFpQjtJQUNqQixpQ0FBaUM7SUFDakMsc0JBQXNCO0lBQ3RCLHFCQUFxQjtJQUNyQixZQUFZO0lBQ1osMkNBQTJDO0lBQzNDLDRCQUE0QjtJQUM1QiwwQkFBMEI7SUFDMUIsT0FBTztJQUNQLFlBQVk7SUFDWiw0QkFBNEI7SUFDNUIsMkJBQTJCO0lBQzNCLHNCQUFzQjtJQUN0QixtQkFBbUI7SUFDbkIsOEJBQThCO0lBQzlCLGtCQUFrQjtJQUNsQix1QkFBdUI7SUFDdkIsdUJBQXVCO0lBQ3ZCLHlCQUF5QjtJQUN6QixpQkFBaUI7SUFDakIsMEJBQTBCO0lBQzFCLHlCQUF5QjtJQUN6QixZQUFZO0lBQ1osVUFBVTtJQUNWLGFBQWE7SUFDYixrQkFBa0I7SUFDbEIsd0JBQXdCO0NBQ2xCLENBQUM7QUFJWCxJQUFZLGdDQVFYO0FBUkQsV0FBWSxnQ0FBZ0M7SUFDeEMsNkNBQTZDO0lBQzdDLHVHQUFpQixDQUFBO0lBQ2pCLGdFQUFnRTtJQUNoRSx5R0FBaUIsQ0FBQTtJQUNqQixrQ0FBa0M7SUFDbEMscUdBQWlCLENBQUE7SUFDakIsdUZBQWlCLENBQUE7QUFDckIsQ0FBQyxFQVJXLGdDQUFnQyxnREFBaEMsZ0NBQWdDLFFBUTNDO0FBRUQsSUFBWSwyQkFPWDtBQVBELFdBQVksMkJBQTJCO0lBQ25DLHdDQUF3QztJQUN4QyxxRkFBeUIsQ0FBQTtJQUN6QixrRUFBa0U7SUFDbEUsK0dBQXlCLENBQUE7SUFDekIsd0RBQXdEO0lBQ3hELDJGQUF5QixDQUFBO0FBQzdCLENBQUMsRUFQVywyQkFBMkIsMkNBQTNCLDJCQUEyQixRQU90QztBQUVELElBQVksU0FLWDtBQUxELFdBQVksU0FBUztJQUNqQiwwREFBMEQ7SUFDMUQseUNBQVksQ0FBQTtJQUNaLHlEQUF5RDtJQUN6RCxpREFBWSxDQUFBO0FBQ2hCLENBQUMsRUFMVyxTQUFTLHlCQUFULFNBQVMsUUFLcEI7QUFFRCxJQUFZLGtCQVdYO0FBWEQsV0FBWSxrQkFBa0I7SUFDMUIsbUJBQW1CO0lBQ25CLDJEQUFhLENBQUE7SUFDYix5Q0FBeUM7SUFDekMseURBQWEsQ0FBQTtJQUNiLDhEQUE4RDtJQUM5RCwrREFBYSxDQUFBO0lBQ2IsZ0VBQWdFO0lBQ2hFLDJEQUFhLENBQUE7SUFDYixnREFBZ0Q7SUFDaEQscUVBQWEsQ0FBQTtBQUNqQixDQUFDLEVBWFcsa0JBQWtCLGtDQUFsQixrQkFBa0IsUUFXN0I7QUFFRCxJQUFZLGVBU1g7QUFURCxXQUFZLGVBQWU7SUFDdkIsd0NBQXdDO0lBQ3hDLDJEQUFrQixDQUFBO0lBQ2xCLCtEQUErRDtJQUMvRCw2REFBa0IsQ0FBQTtJQUNsQiw2QkFBNkI7SUFDN0IscURBQWtCLENBQUE7SUFDbEIsa0ZBQWtGO0lBQ2xGLHlFQUFrQixDQUFBO0FBQ3RCLENBQUMsRUFUVyxlQUFlLCtCQUFmLGVBQWUsUUFTMUI7QUFFRCxJQUFZLFlBU1g7QUFURCxXQUFZLFlBQVk7SUFDcEIsb0RBQW9EO0lBQ3BELCtDQUFVLENBQUE7SUFDVixvREFBb0Q7SUFDcEQsbURBQVUsQ0FBQTtJQUNWLG9EQUFvRDtJQUNwRCxtREFBVSxDQUFBO0lBQ1Ysb0RBQW9EO0lBQ3BELG1EQUFVLENBQUE7QUFDZCxDQUFDLEVBVFcsWUFBWSw0QkFBWixZQUFZLFFBU3ZCO0FBRUQsSUFBWSxrQkFnQlg7QUFoQkQsV0FBWSxrQkFBa0I7SUFDMUIseUNBQXlDO0lBQ3pDLHlHQUFpRSxDQUFBO0lBQ2pFLDBEQUEwRDtJQUMxRCwrR0FBaUUsQ0FBQTtJQUNqRSxnQ0FBZ0M7SUFDaEMsNkhBQWlFLENBQUE7SUFDakUsNkNBQTZDO0lBQzdDLHVIQUFpRSxDQUFBO0lBQ2pFLG9FQUFvRTtJQUNwRSxzSkFBaUUsQ0FBQTtJQUNqRSxtREFBbUQ7SUFDbkQsb0tBQWlFLENBQUE7SUFFakUseUNBQXlDO0lBQ3pDLHFIQUF5QyxDQUFBO0FBQzdDLENBQUMsRUFoQlcsa0JBQWtCLGtDQUFsQixrQkFBa0IsUUFnQjdCO0FBRUQsSUFBWSxZQUtYO0FBTEQsV0FBWSxZQUFZO0lBQ3BCLGtFQUFrRTtJQUNsRSx1REFBWSxDQUFBO0lBQ1osNERBQTREO0lBQzVELGlEQUFZLENBQUE7QUFDaEIsQ0FBQyxFQUxXLFlBQVksNEJBQVosWUFBWSxRQUt2QjtBQUVELElBQVksa0JBU1g7QUFURCxXQUFZLGtCQUFrQjtJQUMxQixrQkFBa0I7SUFDbEIseURBQVUsQ0FBQTtJQUNWLG1EQUFtRDtJQUNuRCwyREFBVSxDQUFBO0lBQ1YsbUZBQW1GO0lBQ25GLCtEQUFVLENBQUE7SUFDViw0QkFBNEI7SUFDNUIseURBQVUsQ0FBQTtBQUNkLENBQUMsRUFUVyxrQkFBa0Isa0NBQWxCLGtCQUFrQixRQVM3QjtBQUVELElBQVksWUF1Q1g7QUF2Q0QsV0FBWSxZQUFZO0lBQ3BCLG9DQUFvQztJQUNwQywyREFBd0IsQ0FBQTtJQUN4QiwwQ0FBMEM7SUFDMUMsMkNBQXdCLENBQUE7SUFDeEIscUNBQXFDO0lBQ3JDLDZEQUF3QixDQUFBO0lBQ3hCLCtDQUErQztJQUMvQyx1REFBd0IsQ0FBQTtJQUN4QixpRUFBaUU7SUFDakUsbUVBQXdCLENBQUE7SUFDeEIsMkdBQTJHO0lBQzNHLDJFQUF3QixDQUFBO0lBQ3hCLHdFQUF3RTtJQUN4RSw2REFBd0IsQ0FBQTtJQUN4Qix1RUFBdUU7SUFDdkUseURBQXdCLENBQUE7SUFDeEIsNkZBQTZGO0lBQzdGLCtEQUF3QixDQUFBO0lBQ3hCLGdGQUFnRjtJQUNoRiwrREFBd0IsQ0FBQTtJQUN4Qiw0REFBNEQ7SUFDNUQsOEVBQXlCLENBQUE7SUFDekIsNkZBQTZGO0lBQzdGLGtFQUF5QixDQUFBO0lBQ3pCLGtKQUFrSjtJQUNsSixvRUFBeUIsQ0FBQTtJQUN6QixxRUFBcUU7SUFDckUsMEVBQXlCLENBQUE7SUFDekIsNkRBQTZEO0lBQzdELHNFQUF5QixDQUFBO0lBQ3pCLDhDQUE4QztJQUM5Qyw4REFBeUIsQ0FBQTtJQUN6QixnRUFBZ0U7SUFDaEUsOERBQXlCLENBQUE7SUFDekIsMkJBQTJCO0lBQzNCLGtEQUF5QixDQUFBO0lBQ3pCLHdEQUF3RDtJQUN4RCxnRUFBeUIsQ0FBQTtBQUM3QixDQUFDLEVBdkNXLFlBQVksNEJBQVosWUFBWSxRQXVDdkI7QUFFRCxTQUFTLE9BQU8sQ0FBaUQsUUFBMEIsRUFBRSxZQUE4QjtJQUN2SCxPQUFPLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFRLEVBQUUsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxLQUFxQixDQUFDLENBQXlCLENBQUM7QUFDaEgsQ0FBQztBQUVZLFFBQUEsZUFBZSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssUUFBUSxDQUF3QixDQUFDO0FBQ3hHLFFBQUEsMEJBQTBCLEdBQUcsQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLFlBQVksQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDLFlBQVksRUFBRSxZQUFZLENBQUMsWUFBWSxFQUFFLFlBQVksQ0FBQyxlQUFlLEVBQUUsWUFBWSxDQUFDLEtBQUssRUFBRSxZQUFZLENBQUMsWUFBWSxDQUFVLENBQUM7QUFDNU4sUUFBQSx1QkFBdUIsR0FBRyxPQUFPLENBQUMsdUJBQWUsRUFBRSxrQ0FBMEIsQ0FBQyxDQUFDO0FBQy9FLFFBQUEsaUJBQWlCLEdBQUcsQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLFlBQVksQ0FBQyxXQUFXLEVBQUUsWUFBWSxDQUFDLGNBQWMsRUFBRSxZQUFZLENBQUMsa0JBQWtCLEVBQUUsWUFBWSxDQUFDLG1CQUFtQixFQUFFLFlBQVksQ0FBQyxhQUFhLEVBQUUsWUFBWSxDQUFDLGNBQWMsRUFBRSxZQUFZLENBQUMsaUJBQWlCLEVBQUUsWUFBWSxDQUFDLGVBQWUsRUFBRSxZQUFZLENBQUMsV0FBVyxFQUFFLFlBQVksQ0FBQyxXQUFXLENBQVUsQ0FBQztBQUM1VixRQUFBLGtCQUFrQixHQUFHLENBQUMsWUFBWSxDQUFDLG1CQUFtQixFQUFFLFlBQVksQ0FBQyxhQUFhLEVBQUUsWUFBWSxDQUFDLGNBQWMsQ0FBVSxDQUFDO0FBQzFILFFBQUEsZ0NBQWdDLEdBQUcsT0FBTyxDQUFDLHlCQUFpQixFQUFFLDBCQUFrQixDQUFDLENBQUM7QUFDbEYsUUFBQSxtQkFBbUIsR0FBRyxDQUFDLFlBQVksQ0FBQyxFQUFFLEVBQUUsWUFBWSxDQUFDLFFBQVEsQ0FBVSxDQUFDO0FBQ3hFLFFBQUEsb0JBQW9CLEdBQUcsT0FBTyxDQUFDLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxHQUFHLHlCQUFpQixDQUFDLEVBQUUsa0NBQTBCLENBQUMsQ0FBQztBQUMxRyxRQUFBLG9CQUFvQixHQUFHLE9BQU8sQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLEVBQUUsR0FBRyx5QkFBaUIsQ0FBQyxFQUFFLENBQUMsR0FBRyxrQ0FBMEIsRUFBRSxZQUFZLENBQUMsY0FBYyxFQUFFLFlBQVksQ0FBQyxXQUFXLEVBQUUsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7QUFDMUwsUUFBQSx5QkFBeUIsR0FBRyxPQUFPLENBQUMsNEJBQW9CLEVBQUUsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUM3RSxRQUFBLG1DQUFtQyxHQUFHLE9BQU8sQ0FBQyw0QkFBb0IsRUFBRSwwQkFBa0IsQ0FBQyxDQUFDO0FBQ3hGLFFBQUEsd0NBQXdDLEdBQUcsT0FBTyxDQUFDLGlDQUF5QixFQUFFLDBCQUFrQixDQUFDLENBQUM7QUFDbEcsUUFBQSxpQkFBaUIsR0FBRyxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsWUFBWSxDQUFDLGlCQUFpQixDQUFVLENBQUM7QUFDeEYsUUFBQSx1QkFBdUIsR0FBRyxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDLGtCQUFrQixFQUFFLEdBQUcseUJBQWlCLEVBQUUsWUFBWSxDQUFDLFdBQVcsRUFBRSxZQUFZLENBQUMsV0FBVyxDQUFVLENBQUM7QUFDeEssUUFBQSxvQkFBb0IsR0FBRyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQVUsQ0FBQztBQUN4RCxRQUFBLGtCQUFrQixHQUFHLENBQUMsR0FBRywrQkFBdUIsRUFBRSxHQUFHLDRCQUFvQixDQUFVLENBQUM7QUFDcEYsUUFBQSx1QkFBdUIsR0FBRyxDQUFDLEdBQUcsNEJBQW9CLEVBQUUsWUFBWSxDQUFDLFFBQVEsQ0FBVSxDQUFDO0FBQ3BGLFFBQUEsc0JBQXNCLEdBQUcsQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLFlBQVksQ0FBQyxXQUFXLENBQVUsQ0FBQztBQTREcEcsc0RBQXNEO0FBRXRELElBQVksY0FHWDtBQUhELFdBQVksY0FBYztJQUN0QixtREFBVSxDQUFBO0lBQ1YsdURBQVUsQ0FBQTtBQUNkLENBQUMsRUFIVyxjQUFjLDhCQUFkLGNBQWMsUUFHekI7QUFFRCxJQUFZLGlCQUtYO0FBTEQsV0FBWSxpQkFBaUI7SUFDekIsMERBQTBEO0lBQzFELHlEQUFRLENBQUE7SUFDUixtQkFBbUI7SUFDbkIseURBQVEsQ0FBQTtBQUNaLENBQUMsRUFMVyxpQkFBaUIsaUNBQWpCLGlCQUFpQixRQUs1QjtBQUVZLFFBQUEsMEJBQTBCLEdBQUc7SUFDdEMsRUFBRTtJQUNGLElBQUk7SUFDSixJQUFJO0lBQ0osS0FBSztDQUNDLENBQUM7QUFHWCxJQUFZLHlCQUtYO0FBTEQsV0FBWSx5QkFBeUI7SUFDakMsaUNBQWlDO0lBQ2pDLHlFQUFZLENBQUE7SUFDWix5Q0FBeUM7SUFDekMsaUZBQVksQ0FBQTtBQUNoQixDQUFDLEVBTFcseUJBQXlCLHlDQUF6Qix5QkFBeUIsUUFLcEM7QUFFWSxRQUFBLGtCQUFrQixHQUFHO0lBQzlCLFdBQVc7SUFDWCxTQUFTO0lBQ1QsYUFBYTtJQUNiLFFBQVE7SUFDUixNQUFNO0lBQ04sV0FBVztJQUNYLFVBQVU7SUFDVixRQUFRO0lBQ1IsV0FBVztJQUNYLGlCQUFpQjtJQUNqQixVQUFVO0lBQ1YsUUFBUTtJQUNSLGFBQWE7SUFDYixRQUFRO0lBQ1IsV0FBVztJQUNYLE9BQU87SUFDUCxTQUFTO0lBQ1QsT0FBTztJQUNQLFFBQVE7SUFDUixRQUFRO0lBQ1IsZ0JBQWdCO0lBQ2hCLFNBQVM7SUFDVCxNQUFNO0lBQ04sU0FBUztDQUNILENBQUM7QUFHRSxRQUFBLGdCQUFnQixHQUFHO0lBQzVCLFFBQVE7SUFDUixTQUFTO0lBQ1QsU0FBUztJQUNULG9CQUFvQjtDQUNkLENBQUM7QUFHWCxJQUFZLDBCQUtYO0FBTEQsV0FBWSwwQkFBMEI7SUFDbEMsOERBQThEO0lBQzlELHlGQUFlLENBQUE7SUFDZixrREFBa0Q7SUFDbEQsMkVBQWUsQ0FBQTtBQUNuQixDQUFDLEVBTFcsMEJBQTBCLDBDQUExQiwwQkFBMEIsUUFLckM7QUFFRCx1RkFBdUY7QUFDdkYsMkRBQTJEO0FBQzNELElBQWlCLFdBQVcsQ0F5RDNCO0FBekRELFdBQWlCLFdBQVc7SUFDWCxpQ0FBcUIsR0FBaUIsRUFBRSxDQUFDLENBQWUsU0FBUztJQUNqRSx3QkFBWSxHQUEwQixFQUFFLENBQUMsQ0FBZSxTQUFTO0lBQ2pFLHVCQUFXLEdBQTJCLEVBQUUsQ0FBQyxDQUFlLFNBQVM7SUFDakUseUJBQWEsR0FBeUIsRUFBRSxDQUFDLENBQWUsU0FBUztJQUNqRSwyQkFBZSxHQUF1QixHQUFHLENBQUMsQ0FBYyxTQUFTO0lBQ2pFLHdCQUFZLEdBQTBCLEdBQUcsQ0FBQyxDQUFjLFNBQVM7SUFDakUseUJBQWEsR0FBeUIsR0FBRyxDQUFDLENBQWMsU0FBUztJQUNqRSwwQkFBYyxHQUF3QixJQUFJLENBQUMsQ0FBYSxTQUFTO0lBQ2pFLDRCQUFnQixHQUFzQixJQUFJLENBQUMsQ0FBYSxTQUFTO0lBQ2pFLGtCQUFNLEdBQWdDLElBQUksQ0FBQyxDQUFhLFNBQVM7SUFDakUsd0JBQVksR0FBMEIsS0FBSyxDQUFDLENBQVksVUFBVTtJQUNsRSx5QkFBYSxHQUF5QixLQUFLLENBQUMsQ0FBWSxVQUFVO0lBQ2xFLDZCQUFpQixHQUFxQixLQUFLLENBQUMsQ0FBWSxVQUFVO0lBQ2xFLDJCQUFlLEdBQXVCLEtBQUssQ0FBQyxDQUFZLFVBQVU7SUFDbEUsdUJBQVcsR0FBMkIsTUFBTSxDQUFDLENBQVcsVUFBVTtJQUNsRSx3QkFBWSxHQUEwQixNQUFNLENBQUMsQ0FBVyxVQUFVO0lBQ2xFLGdDQUFvQixHQUFrQixNQUFNLENBQUMsQ0FBVyxVQUFVO0lBQ2xFLDRCQUFnQixHQUFzQixPQUFPLENBQUMsQ0FBVSxVQUFVO0lBQ2xFLCtCQUFtQixHQUFtQixPQUFPLENBQUMsQ0FBVSxVQUFVO0lBQ2xFLCtCQUFtQixHQUFtQixPQUFPLENBQUMsQ0FBVSxVQUFVO0lBQ2xFLG1CQUFPLEdBQStCLFFBQVEsQ0FBQyxDQUFTLFVBQVU7SUFDbEUsaUJBQUssR0FBaUMsUUFBUSxDQUFDLENBQVMsVUFBVTtJQUNsRSx3QkFBWSxHQUEwQixRQUFRLENBQUMsQ0FBUyxVQUFVO0lBQ2xFLDBCQUFjLEdBQXdCLFFBQVEsQ0FBQyxDQUFTLFVBQVU7SUFDbEUsd0JBQVksR0FBMEIsU0FBUyxDQUFDLENBQVEsVUFBVTtJQUNsRSxtQkFBTyxHQUErQixTQUFTLENBQUMsQ0FBUSxVQUFVO0lBQ2xFLDJCQUFlLEdBQXVCLFNBQVMsQ0FBQyxDQUFRLFVBQVU7SUFDbEUsNEJBQWdCLEdBQXNCLFVBQVUsQ0FBQyxDQUFPLFVBQVU7SUFDbEUsd0JBQVksR0FBMEIsVUFBVSxDQUFDLENBQU8sVUFBVTtJQUNsRSwyQkFBZSxHQUF1QixVQUFVLENBQUMsQ0FBTyxVQUFVO0lBQ2xFLG9DQUF3QixHQUFjLFdBQVcsQ0FBQyxDQUFNLFVBQVU7SUFDbEUsb0NBQXdCLEdBQWMsV0FBVyxDQUFDLENBQU0sVUFBVTtJQUNsRSw0QkFBZ0IsR0FBc0IsV0FBVyxDQUFDLENBQU0sVUFBVTtJQUNsRSx5QkFBYSxHQUF5QixXQUFXLENBQUMsQ0FBTSxVQUFVO0lBQ2xFLDBCQUFjLEdBQXdCLFlBQVksQ0FBQyxDQUFLLFVBQVU7SUFDbEUsaUNBQXFCLEdBQWlCLFlBQVksQ0FBQyxDQUFLLFVBQVU7SUFDbEUsa0NBQXNCLEdBQWdCLFlBQVksQ0FBQyxDQUFLLFVBQVU7SUFDbEUsaUNBQXFCLEdBQWlCLGFBQWEsQ0FBQyxDQUFJLFVBQVU7SUFDbEUsb0NBQXdCLEdBQWMsYUFBYSxDQUFDLENBQUksVUFBVTtJQUNsRSxtQ0FBdUIsR0FBZSxhQUFhLENBQUMsQ0FBSSxVQUFVO0lBQ2xFLDRCQUFnQixHQUFzQixjQUFjLENBQUMsQ0FBRyxVQUFVO0lBQ2xFLCtDQUFtQyxHQUFHLGNBQWMsQ0FBQyxDQUFHLFVBQVU7SUFDbEUsMEJBQWMsR0FBd0IsY0FBYyxDQUFDLENBQUcsVUFBVTtJQUNsRSxvQ0FBd0IsR0FBYyxjQUFjLENBQUMsQ0FBRyxVQUFVO0lBQ2xFLHlCQUFhLEdBQXlCLGVBQWUsQ0FBQyxDQUFFLFVBQVU7SUFDbEUsK0JBQW1CLEdBQW1CLGVBQWUsQ0FBQyxDQUFFLFVBQVU7SUFDbEUsK0JBQW1CLEdBQW1CLGVBQWUsQ0FBQyxDQUFFLFVBQVU7SUFDL0UsNEVBQTRFO0lBQy9ELHdCQUFZLEdBQTBCLGdCQUFnQixDQUFDLENBQUMsVUFBVTtJQUNsRSxvQ0FBd0IsR0FBYyxnQkFBZ0IsQ0FBQyxDQUFDLFVBQVU7SUFDbEUsc0JBQVUsR0FBNEIsZ0JBQWdCLENBQUMsQ0FBQyxVQUFVO0lBQ2xFLDZCQUFpQixHQUFxQixpQkFBaUIsQ0FBQyxDQUFDLFVBQVU7SUFDbkUsd0JBQVksR0FBMEIsaUJBQWlCLENBQUMsQ0FBQyxVQUFVO0lBQ25FLDJCQUFlLEdBQXVCLGlCQUFpQixDQUFDLENBQUMsVUFBVTtJQUNoRixxRUFBcUU7SUFDeEQsb0NBQXdCLEdBQWMsaUJBQWlCLENBQUMsQ0FBQyxVQUFVO0FBQ3BGLENBQUMsRUF6RGdCLFdBQVcsMkJBQVgsV0FBVyxRQXlEM0I7QUFFRCw4RUFBOEU7QUFDakUsUUFBQSxxQkFBcUIsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBcUIsQ0FBQyxDQUF3RSxDQUFDO0FBRW5NLFFBQUEsY0FBYyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUN4RSxRQUFBLGVBQWUsR0FBRztJQUMzQixXQUFXLENBQUMscUJBQXFCO0lBQ2pDLFdBQVcsQ0FBQyxlQUFlO0lBQzNCLFdBQVcsQ0FBQyxhQUFhO0lBQ3pCLFdBQVcsQ0FBQyxZQUFZO0lBQ3hCLFdBQVcsQ0FBQyxhQUFhO0lBQ3pCLFdBQVcsQ0FBQyxpQkFBaUI7SUFDN0IsV0FBVyxDQUFDLGVBQWU7SUFDM0IsV0FBVyxDQUFDLFdBQVc7SUFDdkIsV0FBVyxDQUFDLFlBQVk7SUFDeEIsV0FBVyxDQUFDLG9CQUFvQjtJQUNoQyxXQUFXLENBQUMsZ0JBQWdCO0lBQzVCLFdBQVcsQ0FBQyxtQkFBbUI7SUFDL0IsV0FBVyxDQUFDLFlBQVk7SUFDeEIsV0FBVyxDQUFDLGVBQWU7SUFDM0IsV0FBVyxDQUFDLHdCQUF3QjtJQUNwQyxXQUFXLENBQUMsY0FBYztJQUMxQixXQUFXLENBQUMscUJBQXFCO0lBQ2pDLFdBQVcsQ0FBQyxzQkFBc0I7SUFDbEMsV0FBVyxDQUFDLHFCQUFxQjtJQUNqQyxXQUFXLENBQUMsd0JBQXdCO0lBQ3BDLFdBQVcsQ0FBQyxtQkFBbUI7SUFDL0IsV0FBVyxDQUFDLFlBQVk7SUFDeEIsV0FBVyxDQUFDLFVBQVU7SUFDdEIsV0FBVyxDQUFDLGlCQUFpQjtJQUM3QixXQUFXLENBQUMsWUFBWTtJQUN4QixXQUFXLENBQUMsZUFBZTtDQUNyQixDQUFDO0FBQ0UsUUFBQSxrQkFBa0IsR0FBRyx1QkFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDckUsUUFBQSxzQkFBc0IsR0FBRyx1QkFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLDZCQUFxQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQWtCLENBQUMsQ0FBQyxDQUFDO0FBRXJHLFFBQUEsZ0JBQWdCLEdBQUc7SUFDNUIsV0FBVyxDQUFDLHFCQUFxQjtJQUNqQyxXQUFXLENBQUMsZUFBZTtJQUMzQixXQUFXLENBQUMsYUFBYTtJQUN6QixXQUFXLENBQUMsZ0JBQWdCO0lBQzVCLFdBQVcsQ0FBQyxNQUFNO0lBQ2xCLFdBQVcsQ0FBQyxZQUFZO0lBQ3hCLFdBQVcsQ0FBQyxhQUFhO0lBQ3pCLFdBQVcsQ0FBQyxpQkFBaUI7SUFDN0IsV0FBVyxDQUFDLGVBQWU7SUFDM0IsV0FBVyxDQUFDLFdBQVc7SUFDdkIsV0FBVyxDQUFDLFlBQVk7SUFDeEIsV0FBVyxDQUFDLG9CQUFvQjtJQUNoQyxXQUFXLENBQUMsZ0JBQWdCO0lBQzVCLFdBQVcsQ0FBQyxtQkFBbUI7SUFDL0IsV0FBVyxDQUFDLE9BQU87SUFDbkIsV0FBVyxDQUFDLEtBQUs7SUFDakIsV0FBVyxDQUFDLFlBQVk7SUFDeEIsV0FBVyxDQUFDLGNBQWM7SUFDMUIsV0FBVyxDQUFDLFlBQVk7SUFDeEIsV0FBVyxDQUFDLE9BQU87SUFDbkIsV0FBVyxDQUFDLFlBQVk7SUFDeEIsV0FBVyxDQUFDLGVBQWU7SUFDM0IsV0FBVyxDQUFDLHdCQUF3QjtJQUNwQyxXQUFXLENBQUMsYUFBYTtJQUN6QixXQUFXLENBQUMscUJBQXFCO0lBQ2pDLFdBQVcsQ0FBQyx1QkFBdUI7SUFDbkMsV0FBVyxDQUFDLGNBQWM7SUFDMUIsV0FBVyxDQUFDLG1CQUFtQjtJQUMvQixXQUFXLENBQUMsbUJBQW1CO0lBQy9CLFdBQVcsQ0FBQyxZQUFZO0lBQ3hCLFdBQVcsQ0FBQyx3QkFBd0I7SUFDcEMsV0FBVyxDQUFDLFVBQVU7SUFDdEIsV0FBVyxDQUFDLGlCQUFpQjtJQUM3QixXQUFXLENBQUMsZUFBZTtDQUNyQixDQUFDO0FBQ0UsUUFBQSxtQkFBbUIsR0FBRyx3QkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ3ZFLFFBQUEsdUJBQXVCLEdBQUcsd0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsNkJBQXFCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBa0IsQ0FBQyxDQUFDLENBQUM7QUFFdkcsUUFBQSxnQkFBZ0IsR0FBRztJQUM1QixXQUFXLENBQUMscUJBQXFCO0lBQ2pDLFdBQVcsQ0FBQyxlQUFlO0lBQzNCLFdBQVcsQ0FBQyxhQUFhO0lBQ3pCLFdBQVcsQ0FBQyxNQUFNO0lBQ2xCLFdBQVcsQ0FBQyxZQUFZO0lBQ3hCLFdBQVcsQ0FBQyxhQUFhO0lBQ3pCLFdBQVcsQ0FBQyxpQkFBaUI7SUFDN0IsV0FBVyxDQUFDLGVBQWU7SUFDM0IsV0FBVyxDQUFDLFdBQVc7SUFDdkIsV0FBVyxDQUFDLFlBQVk7SUFDeEIsV0FBVyxDQUFDLG9CQUFvQjtJQUNoQyxXQUFXLENBQUMsZ0JBQWdCO0lBQzVCLFdBQVcsQ0FBQyxtQkFBbUI7SUFDL0IsV0FBVyxDQUFDLE9BQU87SUFDbkIsV0FBVyxDQUFDLFlBQVk7SUFDeEIsV0FBVyxDQUFDLFlBQVk7SUFDeEIsV0FBVyxDQUFDLFlBQVk7SUFDeEIsV0FBVyxDQUFDLGVBQWU7SUFDM0IsV0FBVyxDQUFDLHdCQUF3QjtJQUNwQyxXQUFXLENBQUMsZ0JBQWdCO0lBQzVCLFdBQVcsQ0FBQyxhQUFhO0lBQ3pCLFdBQVcsQ0FBQyxxQkFBcUI7SUFDakMsV0FBVyxDQUFDLG1CQUFtQjtJQUMvQixXQUFXLENBQUMsWUFBWTtJQUN4QixXQUFXLENBQUMsVUFBVTtJQUN0QixXQUFXLENBQUMsaUJBQWlCO0lBQzdCLFdBQVcsQ0FBQyxlQUFlO0NBQ3JCLENBQUM7QUFDRSxRQUFBLG1CQUFtQixHQUFHLHdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDdkUsUUFBQSx1QkFBdUIsR0FBRyx3QkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyw2QkFBcUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFrQixDQUFDLENBQUMsQ0FBQztBQUVwSCxrSEFBa0g7QUFDckcsUUFBQSxvQkFBb0IsR0FBRztJQUNoQyxXQUFXLENBQUMsWUFBWTtJQUN4QixXQUFXLENBQUMsV0FBVztJQUN2QixXQUFXLENBQUMsYUFBYTtJQUN6QixXQUFXLENBQUMsZUFBZTtJQUMzQixXQUFXLENBQUMsWUFBWTtJQUN4QixXQUFXLENBQUMsZUFBZTtJQUMzQixXQUFXLENBQUMsWUFBWTtJQUN4QixXQUFXLENBQUMsZUFBZTtJQUMzQixXQUFXLENBQUMsd0JBQXdCO0lBQ3BDLFdBQVcsQ0FBQyxjQUFjO0lBQzFCLFdBQVcsQ0FBQyxnQkFBZ0I7SUFDNUIsV0FBVyxDQUFDLG1DQUFtQztDQUN6QyxDQUFDO0FBQ0UsUUFBQSx1QkFBdUIsR0FBRyw0QkFBb0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQy9FLFFBQUEsMkJBQTJCLEdBQUcsNEJBQW9CLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsNkJBQXFCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBa0IsQ0FBQyxDQUFDLENBQUM7QUFFL0csUUFBQSxlQUFlLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQTBCLENBQUM7QUFHakYsSUFBWSxZQXlDWDtBQXpDRCxXQUFZLFlBQVk7SUFDcEIsb0RBQW9EO0lBQ3BELDJFQUFzRCxDQUFBO0lBQ3RELG9FQUFvRTtJQUNwRSxtREFBc0QsQ0FBQTtJQUN0RCxzRUFBc0U7SUFDdEUscUZBQXNELENBQUE7SUFFdEQsOERBQThEO0lBQzlELDhEQUFzRCxDQUFBO0lBQ3RELGdDQUFnQztJQUNoQyxzREFBc0QsQ0FBQTtJQUV0RCx3R0FBd0c7SUFDeEcsMkZBQXNELENBQUE7SUFDdEQsbUZBQW1GO0lBQ25GLHlEQUFzRCxDQUFBO0lBQ3RELHlFQUF5RTtJQUN6RSwyRkFBc0QsQ0FBQTtJQUN0RCxtREFBbUQ7SUFDbkQsMEVBQXVELENBQUE7SUFDdkQsMkNBQTJDO0lBQzNDLDhFQUF1RCxDQUFBO0lBQ3ZELGtGQUFrRjtJQUNsRiw0RkFBdUQsQ0FBQTtJQUN2RCwrRUFBK0U7SUFDL0Usb0lBQXVELENBQUE7SUFDdkQsc0RBQXNEO0lBQ3RELHlFQUF1RCxDQUFBO0lBQ3ZELG1GQUFtRjtJQUNuRixpR0FBdUQsQ0FBQTtJQUN2RCx5REFBeUQ7SUFDekQsNkdBQXVELENBQUE7SUFDdkQsd0RBQXdEO0lBQ3hELGdFQUF1RCxDQUFBO0lBRXZELG1EQUFtRDtJQUNuRCxrR0FBcUMsQ0FBQTtJQUVyQyw2Q0FBNkM7SUFDN0MsaUZBQTRCLENBQUE7QUFDaEMsQ0FBQyxFQXpDVyxZQUFZLDRCQUFaLFlBQVksUUF5Q3ZCO0FBRUQsSUFBWSxjQUlYO0FBSkQsV0FBWSxjQUFjO0lBQ3RCLCtDQUErQztJQUMvQyx5RUFBbUIsQ0FBQTtJQUNuQixxRUFBbUIsQ0FBQTtBQUN2QixDQUFDLEVBSlcsY0FBYyw4QkFBZCxjQUFjLFFBSXpCO0FBRUQsSUFBWSxnQkFPWDtBQVBELFdBQVksZ0JBQWdCO0lBQ3hCLG9DQUFvQztJQUNwQyw2REFBVyxDQUFBO0lBQ1gsc0NBQXNDO0lBQ3RDLHVEQUFXLENBQUE7SUFDWCxxREFBcUQ7SUFDckQsdURBQVcsQ0FBQTtBQUNmLENBQUMsRUFQVyxnQkFBZ0IsZ0NBQWhCLGdCQUFnQixRQU8zQjtBQUVELElBQVksbUJBS1g7QUFMRCxXQUFZLG1CQUFtQjtJQUMzQiwwQkFBMEI7SUFDMUIsbUVBQVksQ0FBQTtJQUNaLHVDQUF1QztJQUN2QyxxRUFBWSxDQUFBO0FBQ2hCLENBQUMsRUFMVyxtQkFBbUIsbUNBQW5CLG1CQUFtQixRQUs5QjtBQUVELElBQVksV0E4RFg7QUE5REQsV0FBWSxXQUFXO0lBQ25CLGlIQUFpSDtJQUNqSCxrREFBbUMsQ0FBQTtJQUNuQyxxTEFBcUw7SUFDckwsb0RBQXFDLENBQUE7SUFDckMsbUVBQW1FO0lBQ25FLG9FQUFxRCxDQUFBO0lBQ3JELG9HQUFvRztJQUNwRyx3RUFBeUQsQ0FBQTtJQUN6RCwwSEFBMEg7SUFDMUgsOERBQStDLENBQUE7SUFDL0Msb0dBQXFGLENBQUE7SUFDckYseVBBQXlQO0lBQ3pQLDRFQUE2RCxDQUFBO0lBQzdELHFFQUFxRTtJQUNyRSxzRUFBdUQsQ0FBQTtJQUN2RCx5SEFBeUg7SUFDekgsc0VBQXVELENBQUE7SUFDdkQsaUZBQWlGO0lBQ2pGLDBCQUFXLENBQUE7SUFDWCxxSkFBcUo7SUFDckosMENBQTJCLENBQUE7SUFDM0Isd0dBQXdHO0lBQ3hHLG9EQUFxQyxDQUFBO0lBQ3JDLHFIQUFxSDtJQUNySCw4QkFBZSxDQUFBO0lBQ2Ysa0lBQWtJO0lBQ2xJLG9DQUFxQixDQUFBO0lBQ3JCLHNLQUFzSztJQUN0SyxnQ0FBaUIsQ0FBQTtJQUNqQixzS0FBc0s7SUFDdEssMENBQTJCLENBQUE7SUFDM0Isd0xBQXdMO0lBQ3hMLDBEQUEyQyxDQUFBO0lBQzNDLCtHQUErRztJQUMvRyxvQ0FBcUIsQ0FBQTtJQUNyQixxSkFBcUo7SUFDckosb0RBQXFDLENBQUE7SUFDckMsNEpBQTRKO0lBQzVKLDhDQUErQixDQUFBO0lBQy9CLDJEQUEyRDtJQUMzRCxnQ0FBaUIsQ0FBQTtJQUNqQiwwRUFBMEU7SUFDMUUsd0RBQXlDLENBQUE7SUFDekMsNkVBQTZFO0lBQzdFLGdFQUFpRCxDQUFBO0lBQ2pELHdIQUF3SDtJQUN4SCwwQkFBVyxDQUFBO0lBQ1gsK0hBQStIO0lBQy9ILDBEQUEyQyxDQUFBO0lBQzNDLDJHQUEyRztJQUMzRyw0REFBNkMsQ0FBQTtJQUM3QywrSEFBK0g7SUFDL0gsZ0VBQWlELENBQUE7SUFDakQsMklBQTJJO0lBQzNJLGdEQUFpQyxDQUFBO0lBQ2pDLGlIQUFpSDtJQUNqSCxrREFBbUMsQ0FBQTtJQUNuQyxxSEFBcUg7SUFDckgsOEJBQWUsQ0FBQTtJQUNmLDJHQUEyRztJQUMzRyxvREFBcUMsQ0FBQTtBQUN6QyxDQUFDLEVBOURXLFdBQVcsMkJBQVgsV0FBVyxRQThEdEI7QUFFRCxJQUFZLGNBNkNYO0FBN0NELFdBQVksY0FBYztJQUN0Qix1Q0FBdUM7SUFDdkMsK0RBQXNCLENBQUE7SUFDdEIsc0JBQXNCO0lBQ3RCLHVEQUFzQixDQUFBO0lBQ3RCLHdEQUF3RDtJQUN4RCxxRUFBc0IsQ0FBQTtJQUN0Qix3QkFBd0I7SUFDeEIsK0RBQXNCLENBQUE7SUFDdEIsNEJBQTRCO0lBQzVCLGlFQUFzQixDQUFBO0lBQ3RCLDRCQUE0QjtJQUM1QixpRUFBc0IsQ0FBQTtJQUN0QixxREFBcUQ7SUFDckQsK0VBQXNCLENBQUE7SUFDdEIsK0JBQStCO0lBQy9CLHVFQUFzQixDQUFBO0lBQ3RCLGlFQUFpRTtJQUNqRSx5REFBc0IsQ0FBQTtJQUN0QixvQkFBb0I7SUFDcEIsb0VBQXVCLENBQUE7SUFDdkIsbURBQW1EO0lBQ25ELDhEQUF1QixDQUFBO0lBQ3ZCLHFDQUFxQztJQUNyQyxzRUFBdUIsQ0FBQTtJQUN2QixnQ0FBZ0M7SUFDaEMsb0RBQXVCLENBQUE7SUFDdkIsaUVBQWlFO0lBQ2pFLDhEQUF1QixDQUFBO0lBRXZCLHNDQUFzQztJQUN0QywwRkFBNEIsQ0FBQTtJQUM1Qix5REFBeUQ7SUFDekQsOERBQTRCLENBQUE7SUFDNUIscUVBQXFFO0lBQ3JFLHNEQUE0QixDQUFBO0lBQzVCLDRDQUE0QztJQUM1QyxrRUFBNEIsQ0FBQTtJQUU1Qix5Q0FBeUM7SUFDekMsa0VBQW1CLENBQUE7SUFDbkIsdUNBQXVDO0lBQ3ZDLHdFQUFtQixDQUFBO0lBQ25CLHdDQUF3QztJQUN4Qyw0REFBbUIsQ0FBQTtBQUN2QixDQUFDLEVBN0NXLGNBQWMsOEJBQWQsY0FBYyxRQTZDekI7QUFTRCxJQUFZLFlBYVg7QUFiRCxXQUFZLFlBQVk7SUFDcEIscUVBQXFFO0lBQ3JFLHFEQUFhLENBQUE7SUFDYix3Q0FBd0M7SUFDeEMseURBQWEsQ0FBQTtJQUNiLGtEQUFrRDtJQUNsRCxxREFBYSxDQUFBO0lBQ2IsK0NBQStDO0lBQy9DLG1EQUFhLENBQUE7SUFDYix5QkFBeUI7SUFDekIsK0NBQWEsQ0FBQTtJQUNiLGVBQWU7SUFDZixxREFBYSxDQUFBO0FBQ2pCLENBQUMsRUFiVyxZQUFZLDRCQUFaLFlBQVksUUFhdkI7QUFFRCxJQUFZLGVBS1g7QUFMRCxXQUFZLGVBQWU7SUFDdkIsd0JBQXdCO0lBQ3hCLHVEQUFhLENBQUE7SUFDYix1QkFBdUI7SUFDdkIsK0RBQWEsQ0FBQTtBQUNqQixDQUFDLEVBTFcsZUFBZSwrQkFBZixlQUFlLFFBSzFCO0FBRUQsSUFBWSxZQXVDWDtBQXZDRCxXQUFZLFlBQVk7SUFDcEIsZ0ZBQWdGO0lBQ2hGLDZEQUErQyxDQUFBO0lBQy9DLG1GQUFtRjtJQUNuRiwrREFBK0MsQ0FBQTtJQUMvQyxnRUFBZ0U7SUFDaEUscUVBQStDLENBQUE7SUFDL0MsaUZBQWlGO0lBQ2pGLG1GQUErQyxDQUFBO0lBQy9DLGtEQUFrRDtJQUNsRCxvREFBK0MsQ0FBQTtJQUMvQyx3RUFBd0U7SUFDeEUsNERBQStDLENBQUE7SUFDL0Msc0VBQXNFO0lBQ3RFLDBEQUErQyxDQUFBO0lBQy9DLG1FQUFtRTtJQUNuRSx1REFBK0MsQ0FBQTtJQUMvQywwRUFBMEU7SUFDMUUscUhBQStDLENBQUE7SUFDL0MsOENBQThDO0lBQzlDLDJFQUErQyxDQUFBO0lBQy9DLHdEQUF3RDtJQUN4RCxrSEFBZ0QsQ0FBQTtJQUNoRCw4REFBOEQ7SUFDOUQsc0ZBQWdELENBQUE7SUFDaEQsZ0VBQWdFO0lBQ2hFLDBFQUFnRCxDQUFBO0lBQ2hELHdEQUF3RDtJQUN4RCxtRUFBZ0QsQ0FBQTtJQUNoRCwrREFBK0Q7SUFDL0QsMkVBQWdELENBQUE7SUFDaEQsNERBQTREO0lBQzVELDJHQUFnRCxDQUFBO0lBQ2hELHdEQUF3RDtJQUN4RCxzRkFBZ0QsQ0FBQTtJQUNoRCx5RUFBeUU7SUFDekUsNEVBQWdELENBQUE7SUFDaEQsMkRBQTJEO0lBQzNELDhFQUFnRCxDQUFBO0FBQ3BELENBQUMsRUF2Q1csWUFBWSw0QkFBWixZQUFZLFFBdUN2QjtBQUVELElBQVksWUF5SVg7QUF6SUQsV0FBWSxZQUFZO0lBQ3BCLG9DQUFvQztJQUNwQyxxREFBZ0QsQ0FBQTtJQUNoRCxrRUFBa0U7SUFDbEUsaUVBQWdELENBQUE7SUFDaEQsc0VBQXNFO0lBQ3RFLHVFQUFnRCxDQUFBO0lBQ2hELHFFQUFxRTtJQUNyRSwrQ0FBZ0QsQ0FBQTtJQUNoRCxpRUFBaUU7SUFDakUsNkVBQWdELENBQUE7SUFDaEQsdURBQXVEO0lBQ3ZELDZFQUFnRCxDQUFBO0lBQ2hELDJEQUEyRDtJQUMzRCxtRkFBZ0QsQ0FBQTtJQUNoRCwrQ0FBK0M7SUFDL0MseURBQWdELENBQUE7SUFDaEQsZ0VBQWdFO0lBQ2hFLDZEQUFnRCxDQUFBO0lBQ2hELDBFQUEwRTtJQUMxRSwyRUFBZ0QsQ0FBQTtJQUNoRCwwRUFBMEU7SUFDMUUsNEVBQWlELENBQUE7SUFDakQsMEVBQTBFO0lBQzFFLDRFQUFpRCxDQUFBO0lBQ2pELHFEQUFxRDtJQUNyRCw0RUFBaUQsQ0FBQTtJQUNqRCx5RUFBeUU7SUFDekUsZ0VBQWlELENBQUE7SUFDakQsaUVBQWlFO0lBQ2pFLGdHQUFpRCxDQUFBO0lBQ2pELDREQUE0RDtJQUM1RCw4RkFBaUQsQ0FBQTtJQUNqRCwrRUFBK0U7SUFDL0UsZ0lBQWlELENBQUE7SUFDakQsZ0ZBQWdGO0lBQ2hGLDRIQUFpRCxDQUFBO0lBQ2pELDhDQUE4QztJQUM5QyxvRUFBaUQsQ0FBQTtJQUNqRCxzREFBc0Q7SUFDdEQsa0RBQWlELENBQUE7SUFDakQsc0RBQXNEO0lBQ3RELDRFQUFpRCxDQUFBO0lBQ2pELHdFQUF3RTtJQUN4RSxvRkFBaUQsQ0FBQTtJQUNqRCxrRUFBa0U7SUFDbEUsa0ZBQWlELENBQUE7SUFDakQsNkRBQTZEO0lBQzdELGdGQUFpRCxDQUFBO0lBQ2pELDBEQUEwRDtJQUMxRCxvRkFBaUQsQ0FBQTtJQUNqRCx5RUFBeUU7SUFDekUsNEZBQWlELENBQUE7SUFDakQsb0VBQW9FO0lBQ3BFLDRGQUFpRCxDQUFBO0lBQ2pELGlEQUFpRDtJQUNqRCw4REFBaUQsQ0FBQTtJQUNqRCwrQ0FBK0M7SUFDL0MsMERBQWlELENBQUE7SUFDakQsb0VBQW9FO0lBQ3BFLGtFQUFpRCxDQUFBO0lBQ2pELHNFQUFzRTtJQUN0RSx3RUFBaUQsQ0FBQTtJQUNqRCw2REFBNkQ7SUFDN0QsNEVBQWlELENBQUE7SUFDakQsK0VBQStFO0lBQy9FLG9IQUFpRCxDQUFBO0lBQ2pELDZFQUE2RTtJQUM3RSwwR0FBaUQsQ0FBQTtJQUNqRCxvRkFBb0Y7SUFDcEYsOEdBQWlELENBQUE7SUFDakQsa0VBQWtFO0lBQ2xFLHdFQUFpRCxDQUFBO0lBQ2pELGdFQUFnRTtJQUNoRSwwR0FBaUQsQ0FBQTtJQUNqRCxpRUFBaUU7SUFDakUsNEdBQWlELENBQUE7SUFDakQsOERBQThEO0lBQzlELDRGQUFpRCxDQUFBO0lBQ2pELHFFQUFxRTtJQUNyRSwwR0FBaUQsQ0FBQTtJQUNqRCxtRkFBbUY7SUFDbkYsZ0dBQWlELENBQUE7SUFDakQsMERBQTBEO0lBQzFELDhEQUFpRCxDQUFBO0lBQ2pELDBGQUFpRCxDQUFBO0lBQ2pELDBEQUEwRDtJQUMxRCxnREFBaUQsQ0FBQTtJQUNqRCwyREFBMkQ7SUFDM0Qsa0ZBQWlELENBQUE7SUFDakQsZ0dBQWdHO0lBQ2hHLGdGQUFpRCxDQUFBO0lBQ2pELDhDQUE4QztJQUM5Qyw4REFBaUQsQ0FBQTtJQUNqRCxtRkFBbUY7SUFDbkYsMERBQWlELENBQUE7SUFDakQseURBQXlEO0lBQ3pELDRFQUFpRCxDQUFBO0lBQ2pELCtEQUErRDtJQUMvRCxzRkFBaUQsQ0FBQTtJQUNqRCw0SEFBNEg7SUFDNUgsb0VBQWlELENBQUE7SUFDakQsNEVBQTRFO0lBQzVFLDhFQUFpRCxDQUFBO0lBQ2pELDhEQUE4RDtJQUM5RCxvSEFBaUQsQ0FBQTtJQUNqRCw4REFBOEQ7SUFDOUQsb0hBQWlELENBQUE7SUFDakQsZ0VBQWdFO0lBQ2hFLDBIQUFpRCxDQUFBO0lBQ2pELDBEQUEwRDtJQUMxRCxrRkFBaUQsQ0FBQTtJQUNqRCxpRUFBaUU7SUFDakUsNEVBQWlELENBQUE7SUFDakQsb0VBQW9FO0lBQ3BFLGtGQUFpRCxDQUFBO0lBQ2pELGdHQUFnRztJQUNoRyxrR0FBaUQsQ0FBQTtJQUNqRCwrRkFBK0Y7SUFDL0YsNEZBQWlELENBQUE7SUFDakQsNEZBQTRGO0lBQzVGLHNGQUFpRCxDQUFBO0lBQ2pELDRGQUE0RjtJQUM1RixvRkFBaUQsQ0FBQTtJQUNqRCw4REFBOEQ7SUFDOUQsOEZBQWlELENBQUE7SUFDakQseUVBQXlFO0lBQ3pFLDhEQUFpRCxDQUFBO0lBQ2pELHlGQUF5RjtJQUN6RixnRkFBaUQsQ0FBQTtJQUNqRCx5RUFBeUU7SUFDekUsa0VBQWlELENBQUE7SUFDakQsc0ZBQXNGO0lBQ3RGLDRFQUFpRCxDQUFBO0lBQ2pELHVFQUF1RTtJQUN2RSxzRkFBaUQsQ0FBQTtJQUNqRCxrRkFBaUQsQ0FBQTtBQUNyRCxDQUFDLEVBeklXLFlBQVksNEJBQVosWUFBWSxRQXlJdkI7QUFFRCxpREFBaUQ7QUFDcEMsUUFBQSx1QkFBdUIsR0FBRztJQUNuQyxZQUFZLENBQUMsYUFBYTtJQUMxQixZQUFZLENBQUMsZ0JBQWdCO0lBQzdCLFlBQVksQ0FBQyxJQUFJO0lBQ2pCLFlBQVksQ0FBQyxtQkFBbUI7SUFDaEMsWUFBWSxDQUFDLG1CQUFtQjtJQUNoQyxZQUFZLENBQUMsc0JBQXNCO0NBQzdCLENBQUM7QUFFWCxJQUFZLG9CQVdYO0FBWEQsV0FBWSxvQkFBb0I7SUFDNUIsNEJBQTRCO0lBQzVCLCtEQUFnQixDQUFBO0lBQ2hCLGdDQUFnQztJQUNoQyx1RUFBZ0IsQ0FBQTtJQUNoQiw4QkFBOEI7SUFDOUIsbUVBQWdCLENBQUE7SUFDaEIsNkJBQTZCO0lBQzdCLGlFQUFnQixDQUFBO0lBQ2hCLG9DQUFvQztJQUNwQywrRUFBZ0IsQ0FBQTtBQUNwQixDQUFDLEVBWFcsb0JBQW9CLG9DQUFwQixvQkFBb0IsUUFXL0I7QUFFRCxJQUFZLGdCQVdYO0FBWEQsV0FBWSxnQkFBZ0I7SUFDeEIseUNBQXlDO0lBQ3pDLHVEQUFvQyxDQUFBO0lBQ3BDLHVDQUF1QztJQUN2QyxxRkFBb0MsQ0FBQTtJQUNwQyx3Q0FBd0M7SUFDeEMsaUZBQW9DLENBQUE7SUFDcEMsNEVBQTRFO0lBQzVFLCtHQUFvQyxDQUFBO0lBQ3BDLDJCQUEyQjtJQUMzQix1RUFBb0MsQ0FBQTtBQUN4QyxDQUFDLEVBWFcsZ0JBQWdCLGdDQUFoQixnQkFBZ0IsUUFXM0I7QUFFRCxJQUFZLFdBT1g7QUFQRCxXQUFZLFdBQVc7SUFDbkIsZ0NBQWdDO0lBQ2hDLCtDQUFhLENBQUE7SUFDYixtQ0FBbUM7SUFDbkMscURBQWEsQ0FBQTtJQUNiLCtDQUErQztJQUMvQyxpREFBYSxDQUFBO0FBQ2pCLENBQUMsRUFQVyxXQUFXLDJCQUFYLFdBQVcsUUFPdEI7QUFFRCxJQUFZLGlCQU1YO0FBTkQsV0FBWSxpQkFBaUI7SUFDekIsb0RBQW9EO0lBQ3BELDZEQUErQixDQUFBO0lBQy9CLDhFQUE4RTtJQUM5RSx5RkFBK0IsQ0FBQTtJQUMvQix1R0FBK0IsQ0FBQTtBQUNuQyxDQUFDLEVBTlcsaUJBQWlCLGlDQUFqQixpQkFBaUIsUUFNNUI7QUFFRCxJQUFZLGdDQUdYO0FBSEQsV0FBWSxnQ0FBZ0M7SUFDeEMseUVBQXlFO0lBQ3pFLG1HQUFjLENBQUE7QUFDbEIsQ0FBQyxFQUhXLGdDQUFnQyxnREFBaEMsZ0NBQWdDLFFBRzNDO0FBRUQsSUFBWSwyQkFTWDtBQVRELFdBQVksMkJBQTJCO0lBQ25DLHVDQUF1QztJQUN2Qyx1RkFBYSxDQUFBO0lBQ2IsMkNBQTJDO0lBQzNDLGlGQUFhLENBQUE7SUFDYixpQ0FBaUM7SUFDakMsdUZBQWEsQ0FBQTtJQUNiLG9DQUFvQztJQUNwQyxxRkFBYSxDQUFBO0FBQ2pCLENBQUMsRUFUVywyQkFBMkIsMkNBQTNCLDJCQUEyQixRQVN0QztBQUVELElBQVksOEJBT1g7QUFQRCxXQUFZLDhCQUE4QjtJQUN0QywrQ0FBK0M7SUFDL0MsdUdBQWtCLENBQUE7SUFDbEIsOENBQThDO0lBQzlDLHFGQUFrQixDQUFBO0lBQ2xCLG1DQUFtQztJQUNuQywyRkFBa0IsQ0FBQTtBQUN0QixDQUFDLEVBUFcsOEJBQThCLDhDQUE5Qiw4QkFBOEIsUUFPekM7QUFFRCxJQUFZLDBCQUtYO0FBTEQsV0FBWSwwQkFBMEI7SUFDbEMsd0VBQXdFO0lBQ3hFLCtFQUFjLENBQUE7SUFDZCx5RUFBeUU7SUFDekUsdUZBQWMsQ0FBQTtBQUNsQixDQUFDLEVBTFcsMEJBQTBCLDBDQUExQiwwQkFBMEIsUUFLckM7QUFFRCxJQUFZLHdCQUlYO0FBSkQsV0FBWSx3QkFBd0I7SUFDaEMsMERBQTBEO0lBQzFELHVGQUFpQixDQUFBO0lBQ2pCLHlGQUFpQixDQUFBO0FBQ3JCLENBQUMsRUFKVyx3QkFBd0Isd0NBQXhCLHdCQUF3QixRQUluQztBQUVELElBQVksMEJBVVg7QUFWRCxXQUFZLDBCQUEwQjtJQUNsQyx1RkFBdUY7SUFDdkYsaUZBQWtCLENBQUE7SUFDbEIsMkRBQTJEO0lBQzNELDJFQUFrQixDQUFBO0lBQ2xCLG9GQUFvRjtJQUNwRiwrRkFBa0IsQ0FBQTtJQUNsQiw4RUFBOEU7SUFDOUUsMkZBQWtCLENBQUE7SUFDbEIsK0ZBQWtCLENBQUE7QUFDdEIsQ0FBQyxFQVZXLDBCQUEwQiwwQ0FBMUIsMEJBQTBCLFFBVXJDO0FBRUQsSUFBWSxnQ0FPWDtBQVBELFdBQVksZ0NBQWdDO0lBQ3hDLGdFQUFnRTtJQUNoRSxpR0FBa0IsQ0FBQTtJQUNsQixpRUFBaUU7SUFDakUsMkdBQWtCLENBQUE7SUFDbEIsbUVBQW1FO0lBQ25FLHlGQUFrQixDQUFBO0FBQ3RCLENBQUMsRUFQVyxnQ0FBZ0MsZ0RBQWhDLGdDQUFnQyxRQU8zQztBQUVELElBQVkseUJBT1g7QUFQRCxXQUFZLHlCQUF5QjtJQUNqQyw4SkFBOEo7SUFDOUosMkZBQTRCLENBQUE7SUFDNUIsOENBQThDO0lBQzlDLHFHQUE0QixDQUFBO0lBQzVCLCtFQUE0QixDQUFBO0lBQzVCLGlIQUE0QixDQUFBO0FBQ2hDLENBQUMsRUFQVyx5QkFBeUIseUNBQXpCLHlCQUF5QixRQU9wQztBQUVELElBQVksbUJBdUxYO0FBdkxELFdBQVksbUJBQW1CO0lBQzNCLGtDQUFrQztJQUNsQyw2RUFBZ0IsQ0FBQTtJQUVoQiwwQkFBMEI7SUFDMUIsa0ZBQTZCLENBQUE7SUFDN0Isb0NBQW9DO0lBQ3BDLGtGQUE2QixDQUFBO0lBQzdCLDBCQUEwQjtJQUMxQixrRkFBNkIsQ0FBQTtJQUM3QixrREFBa0Q7SUFDbEQsc0dBQTZCLENBQUE7SUFDN0IscURBQXFEO0lBQ3JELHNHQUE2QixDQUFBO0lBQzdCLHNEQUFzRDtJQUN0RCxzR0FBNkIsQ0FBQTtJQUU3QixvQ0FBb0M7SUFDcEMsNEVBQXVCLENBQUE7SUFDdkIscUNBQXFDO0lBQ3JDLDhFQUF1QixDQUFBO0lBQ3ZCLG1DQUFtQztJQUNuQyxrRkFBdUIsQ0FBQTtJQUN2QixxQ0FBcUM7SUFDckMsd0ZBQXVCLENBQUE7SUFDdkIsa0NBQWtDO0lBQ2xDLGdGQUF1QixDQUFBO0lBQ3ZCLDhDQUE4QztJQUM5QywwRkFBdUIsQ0FBQTtJQUN2QixvREFBb0Q7SUFDcEQsNEVBQXVCLENBQUE7SUFDdkIsbURBQW1EO0lBQ25ELHdGQUF1QixDQUFBO0lBQ3ZCLGtDQUFrQztJQUNsQyxvRUFBdUIsQ0FBQTtJQUV2Qix1QkFBdUI7SUFDdkIsNEVBQWdCLENBQUE7SUFDaEIsc0JBQXNCO0lBQ3RCLDRFQUFnQixDQUFBO0lBQ2hCLHVCQUF1QjtJQUN2Qiw0RUFBZ0IsQ0FBQTtJQUVoQiwrQkFBK0I7SUFDL0IsZ0ZBQWtCLENBQUE7SUFDbEIsK0JBQStCO0lBQy9CLGdGQUFrQixDQUFBO0lBQ2xCLCtCQUErQjtJQUMvQixnRkFBa0IsQ0FBQTtJQUVsQiwwQkFBMEI7SUFDMUIsa0ZBQW1CLENBQUE7SUFDbkIsaURBQWlEO0lBQ2pELGtGQUFtQixDQUFBO0lBQ25CLDBCQUEwQjtJQUMxQixrRkFBbUIsQ0FBQTtJQUVuQix3QkFBd0I7SUFDeEIsOEVBQWlCLENBQUE7SUFDakIsNkJBQTZCO0lBQzdCLDhFQUFpQixDQUFBO0lBQ2pCLHdCQUF3QjtJQUN4Qiw4RUFBaUIsQ0FBQTtJQUVqQixpQ0FBaUM7SUFDakMsa0ZBQXdCLENBQUE7SUFDeEIscUNBQXFDO0lBQ3JDLDRGQUF3QixDQUFBO0lBQ3hCLHNDQUFzQztJQUN0Qyw0RUFBd0IsQ0FBQTtJQUN4QiwwQ0FBMEM7SUFDMUMsZ0ZBQXdCLENBQUE7SUFFeEIscUNBQXFDO0lBQ3JDLDBGQUEwQixDQUFBO0lBQzFCLDZEQUE2RDtJQUM3RCwwRkFBMEIsQ0FBQTtJQUMxQix5Q0FBeUM7SUFDekMsMEZBQTBCLENBQUE7SUFDMUIsOERBQThEO0lBQzlELGdHQUEwQixDQUFBO0lBQzFCLDBDQUEwQztJQUMxQyxnR0FBMEIsQ0FBQTtJQUMxQixnRUFBZ0U7SUFDaEUsZ0dBQTBCLENBQUE7SUFFMUIsMEJBQTBCO0lBQzFCLGtGQUFtQixDQUFBO0lBQ25CLG1DQUFtQztJQUNuQyxrRkFBbUIsQ0FBQTtJQUNuQiwwQkFBMEI7SUFDMUIsa0ZBQW1CLENBQUE7SUFFbkIsd0JBQXdCO0lBQ3hCLCtHQUFrQyxDQUFBO0lBQ2xDLHdCQUF3QjtJQUN4QiwrR0FBa0MsQ0FBQTtJQUNsQywwQkFBMEI7SUFDMUIsK0dBQWtDLENBQUE7SUFFbEMsc0NBQXNDO0lBQ3RDLGlGQUFtQixDQUFBO0lBQ25CLHlCQUF5QjtJQUN6QixpRkFBbUIsQ0FBQTtJQUNuQix5QkFBeUI7SUFDekIsaUZBQW1CLENBQUE7SUFFbkIsNkNBQTZDO0lBQzdDLGlJQUEyQyxDQUFBO0lBRTNDLG1DQUFtQztJQUNuQyxxR0FBNkIsQ0FBQTtJQUM3QixtQ0FBbUM7SUFDbkMscUdBQTZCLENBQUE7SUFDN0IsbUNBQW1DO0lBQ25DLHFHQUE2QixDQUFBO0lBRTdCLCtCQUErQjtJQUMvQiw2R0FBaUQsQ0FBQTtJQUNqRCwrQkFBK0I7SUFDL0IsNkdBQWlELENBQUE7SUFDakQsK0JBQStCO0lBQy9CLDZHQUFpRCxDQUFBO0lBQ2pELHFDQUFxQztJQUNyQyxpSEFBaUQsQ0FBQTtJQUNqRCxxQ0FBcUM7SUFDckMscUhBQWlELENBQUE7SUFDakQsc0NBQXNDO0lBQ3RDLDZJQUFpRCxDQUFBO0lBQ2pELHdDQUF3QztJQUN4QyxxSEFBaUQsQ0FBQTtJQUVqRCwrQ0FBK0M7SUFDL0MsK0hBQTBDLENBQUE7SUFDMUMsK0NBQStDO0lBQy9DLDZIQUEwQyxDQUFBO0lBRTFDLDJGQUE4QixDQUFBO0lBQzlCLDJGQUE4QixDQUFBO0lBQzlCLDJGQUE4QixDQUFBO0lBQzlCLG9DQUFvQztJQUNwQyx1R0FBOEIsQ0FBQTtJQUM5QixvQ0FBb0M7SUFDcEMsdUdBQThCLENBQUE7SUFDOUIsb0NBQW9DO0lBQ3BDLHVHQUE4QixDQUFBO0lBQzlCLGlDQUFpQztJQUNqQyx5RkFBOEIsQ0FBQTtJQUM5Qiw2QkFBNkI7SUFDN0IseUZBQThCLENBQUE7SUFFOUIseUNBQXlDO0lBQ3pDLHFHQUE2QixDQUFBO0lBQzdCLDBDQUEwQztJQUMxQyxtR0FBNkIsQ0FBQTtJQUU3QiwwREFBMEQ7SUFDMUQsaUhBQW1DLENBQUE7SUFFbkMseUNBQXlDO0lBQ3pDLCtGQUFpQyxDQUFBO0lBQ2pDLHFDQUFxQztJQUNyQywrRkFBaUMsQ0FBQTtJQUNqQyx1Q0FBdUM7SUFDdkMsNkdBQWlDLENBQUE7SUFDakMsdUNBQXVDO0lBQ3ZDLDZHQUFpQyxDQUFBO0lBQ2pDLCtDQUErQztJQUMvQyxxR0FBaUMsQ0FBQTtJQUVqQyx3REFBd0Q7SUFDeEQsbUlBQTRDLENBQUE7SUFDNUMsd0RBQXdEO0lBQ3hELG1JQUE0QyxDQUFBO0lBQzVDLHdEQUF3RDtJQUN4RCxtSUFBNEMsQ0FBQTtJQUU1QyxnREFBZ0Q7SUFDaEQsdUhBQThDLENBQUE7SUFDOUMsZ0NBQWdDO0lBQ2hDLCtGQUE4QyxDQUFBO0lBQzlDLHlIQUE4QyxDQUFBO0lBQzlDLHVJQUE4QyxDQUFBO0FBQ2xELENBQUMsRUF2TFcsbUJBQW1CLG1DQUFuQixtQkFBbUIsUUF1TDlCO0FBRUQsSUFBWSx1QkFTWDtBQVRELFdBQVksdUJBQXVCO0lBQy9CLCtFQUErRTtJQUMvRSxpRkFBdUIsQ0FBQTtJQUN2QiwrRUFBK0U7SUFDL0UscUVBQXVCLENBQUE7SUFDdkIsaUZBQWlGO0lBQ2pGLDJFQUF1QixDQUFBO0lBQ3ZCLHNGQUFzRjtJQUN0RixtR0FBdUIsQ0FBQTtBQUMzQixDQUFDLEVBVFcsdUJBQXVCLHVDQUF2Qix1QkFBdUIsUUFTbEM7QUFFRCxJQUFZLDZCQXVCWDtBQXZCRCxXQUFZLDZCQUE2QjtJQUNyQyxtQkFBbUI7SUFDbkIsK0ZBQXFCLENBQUE7SUFDckIsNkJBQTZCO0lBQzdCLDJHQUFxQixDQUFBO0lBQ3JCLGVBQWU7SUFDZixxRkFBcUIsQ0FBQTtJQUNyQixrQ0FBa0M7SUFDbEMsdUZBQXFCLENBQUE7SUFDckIsZ0JBQWdCO0lBQ2hCLHVGQUFxQixDQUFBO0lBQ3JCLGNBQWM7SUFDZCxpRkFBcUIsQ0FBQTtJQUNyQix3REFBd0Q7SUFDeEQsdUZBQXFCLENBQUE7SUFDckIsYUFBYTtJQUNiLGlGQUFxQixDQUFBO0lBQ3JCLDREQUE0RDtJQUM1RCwrRkFBcUIsQ0FBQTtJQUNyQix1Q0FBdUM7SUFDdkMsc0ZBQXNCLENBQUE7SUFDdEIsb0JBQW9CO0lBQ3BCLDhGQUFzQixDQUFBO0FBQzFCLENBQUMsRUF2QlcsNkJBQTZCLDZDQUE3Qiw2QkFBNkIsUUF1QnhDO0FBRUQsSUFBWSxpQ0FPWDtBQVBELFdBQVksaUNBQWlDO0lBQ3pDLDRCQUE0QjtJQUM1Qix5RkFBVyxDQUFBO0lBQ1gscUJBQXFCO0lBQ3JCLHlGQUFXLENBQUE7SUFDWCwrQkFBK0I7SUFDL0IsK0ZBQVcsQ0FBQTtBQUNmLENBQUMsRUFQVyxpQ0FBaUMsaURBQWpDLGlDQUFpQyxRQU81QztBQUVELElBQVksd0JBbUJYO0FBbkJELFdBQVksd0JBQXdCO0lBQ2hDLHVDQUF1QztJQUN2Qyx1RUFBMkMsQ0FBQTtJQUMzQywrQ0FBK0M7SUFDL0MscUhBQTJDLENBQUE7SUFDM0MseUZBQXlGO0lBQ3pGLHVJQUEyQyxDQUFBO0lBQzNDLDRHQUE0RztJQUM1Ryw2R0FBMkMsQ0FBQTtJQUMzQyxxRUFBcUU7SUFDckUsMkZBQTJDLENBQUE7SUFDM0Msb0VBQW9FO0lBQ3BFLDZJQUEyQyxDQUFBO0lBQzNDLG1EQUFtRDtJQUNuRCx5RUFBMkMsQ0FBQTtJQUMzQyxrQkFBa0I7SUFDbEIsZ0dBQTRDLENBQUE7SUFDNUMsa0VBQWtFO0lBQ2xFLDhGQUE0QyxDQUFBO0FBQ2hELENBQUMsRUFuQlcsd0JBQXdCLHdDQUF4Qix3QkFBd0IsUUFtQm5DO0FBRUQsSUFBWSw2QkFLWDtBQUxELFdBQVksNkJBQTZCO0lBQ3JDLHlFQUF5RTtJQUN6RSwrRkFBMkIsQ0FBQTtJQUMzQiwwSUFBMEk7SUFDMUksdUhBQTJCLENBQUE7QUFDL0IsQ0FBQyxFQUxXLDZCQUE2Qiw2Q0FBN0IsNkJBQTZCLFFBS3hDO0FBRUQsSUFBWSxPQTZDWDtBQTdDRCxXQUFZLE9BQU87SUFDZiwyQ0FBMkM7SUFDM0MseUNBQXNDLENBQUE7SUFDdEMsMkJBQTJCO0lBQzNCLHVEQUFzQyxDQUFBO0lBQ3RDLCtDQUErQztJQUMvQyw2REFBc0MsQ0FBQTtJQUN0QywyRUFBMkU7SUFDM0UsK0VBQXNDLENBQUE7SUFDdEMsOERBQThEO0lBQzlELCtEQUFzQyxDQUFBO0lBQ3RDLGdDQUFnQztJQUNoQyxrRUFBc0MsQ0FBQTtJQUN0Qyw0QkFBNEI7SUFDNUIsMERBQXNDLENBQUE7SUFDdEMsMkJBQTJCO0lBQzNCLHdEQUFzQyxDQUFBO0lBQ3RDLGdDQUFnQztJQUNoQyxtRUFBc0MsQ0FBQTtJQUN0Qyw2QkFBNkI7SUFDN0IsNkRBQXNDLENBQUE7SUFDdEMsaURBQWlEO0lBQ2pELDJEQUFzQyxDQUFBO0lBQ3RDLHFDQUFxQztJQUNyQyw4RUFBdUMsQ0FBQTtJQUN2QyxtQ0FBbUM7SUFDbkMsd0VBQXVDLENBQUE7SUFDdkMsa0RBQWtEO0lBQ2xELDhEQUF1QyxDQUFBO0lBQ3ZDLHNDQUFzQztJQUN0QyxnRkFBdUMsQ0FBQTtJQUN2QyxvQ0FBb0M7SUFDcEMsMkVBQXVDLENBQUE7SUFDdkMsaURBQWlEO0lBQ2pELCtEQUF1QyxDQUFBO0lBQ3ZDLG9DQUFvQztJQUNwQyw2RUFBdUMsQ0FBQTtJQUN2Qyx3REFBd0Q7SUFDeEQsNkZBQXVDLENBQUE7SUFDdkMsK0NBQStDO0lBQy9DLHFGQUF1QyxDQUFBO0lBQ3ZDLDhCQUE4QjtJQUM5QiwwRUFBdUMsQ0FBQTtJQUN2Qyx1Q0FBdUM7SUFDdkMsNEVBQXVDLENBQUE7QUFDM0MsQ0FBQyxFQTdDVyxPQUFPLHVCQUFQLE9BQU8sUUE2Q2xCO0FBSUQsOERBQThEO0FBRWpELFFBQUEsb0JBQW9CLEdBQUc7SUFDaEMsT0FBTyxDQUFDLE1BQU07SUFDZCxPQUFPLENBQUMsZ0JBQWdCO0lBQ3hCLE9BQU8sQ0FBQyxpQkFBaUI7SUFDekIsT0FBTyxDQUFDLGtCQUFrQjtJQUMxQixPQUFPLENBQUMsY0FBYztJQUN0QixPQUFPLENBQUMsYUFBYTtJQUNyQixPQUFPLENBQUMsa0JBQWtCO0lBQzFCLE9BQU8sQ0FBQyxjQUFjO0lBQ3RCLE9BQU8sQ0FBQyx1QkFBdUI7SUFDL0IsT0FBTyxDQUFDLG9CQUFvQjtJQUM1QixPQUFPLENBQUMsZUFBZTtJQUN2QixPQUFPLENBQUMsd0JBQXdCO0lBQ2hDLE9BQU8sQ0FBQyxxQkFBcUI7SUFDN0IsT0FBTyxDQUFDLHNCQUFzQjtJQUM5QixPQUFPLENBQUMsNkJBQTZCO0lBQ3JDLE9BQU8sQ0FBQyx5QkFBeUI7SUFDakMsT0FBTyxDQUFDLG1CQUFtQjtJQUMzQixPQUFPLENBQUMsb0JBQW9CO0NBQ3RCLENBQUM7QUFDRSxRQUFBLHVCQUF1QixHQUFHLDRCQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDOUUsUUFBQSxpQkFBaUIsR0FBRztJQUM3QixPQUFPLENBQUMsYUFBYTtJQUNyQixPQUFPLENBQUMsZUFBZTtJQUN2QixPQUFPLENBQUMsZUFBZTtDQUNqQixDQUFDO0FBQ0UsUUFBQSxvQkFBb0IsR0FBRyx5QkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3hFLFFBQUEsVUFBVSxHQUFHLCtCQUF1QixHQUFHLDRCQUFvQixDQUFDO0FBRTVELFFBQUEsdUJBQXVCLEdBQUc7SUFDbkMsQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLEVBQUUsZ0JBQWdCLENBQUMsd0JBQXdCLENBQUMsQ0FBQztJQUN6RyxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxxQkFBcUIsRUFBRSxnQkFBZ0IsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO0lBQ2pILENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxDQUFDLGdCQUFnQixDQUFDLHVCQUF1QixFQUFFLGdCQUFnQixDQUFDLCtCQUErQixDQUFDLENBQUM7Q0FDNUQsQ0FBQztBQUVoRSxJQUFZLGNBMkJYO0FBM0JELFdBQVksY0FBYztJQUN0Qiw4QkFBOEI7SUFDOUIsMkRBQTZCLENBQUE7SUFDN0IsMENBQTBDO0lBQzFDLDZEQUE2QixDQUFBO0lBQzdCLHVEQUF1RDtJQUN2RCwyREFBNkIsQ0FBQTtJQUM3QixtQ0FBbUM7SUFDbkMseUVBQTZCLENBQUE7SUFDN0IsMERBQTBEO0lBQzFELCtFQUE2QixDQUFBO0lBQzdCLHNEQUFzRDtJQUN0RCx1REFBNkIsQ0FBQTtJQUM3Qiw2REFBNkQ7SUFDN0QsNkRBQTZCLENBQUE7SUFDN0IsOENBQThDO0lBQzlDLHFGQUE2QixDQUFBO0lBQzdCLDZGQUE2RjtJQUM3Rix5RUFBNkIsQ0FBQTtJQUM3QixrRkFBa0Y7SUFDbEYsc0RBQThCLENBQUE7SUFDOUIsdUNBQXVDO0lBQ3ZDLHNFQUE4QixDQUFBO0lBQzlCLDJDQUEyQztJQUMzQyw4RkFBOEIsQ0FBQTtJQUM5QixxREFBcUQ7SUFDckQsb0ZBQThCLENBQUE7QUFDbEMsQ0FBQyxFQTNCVyxjQUFjLDhCQUFkLGNBQWMsUUEyQnpCO0FBRUQsSUFBWSxpQkE2Qlg7QUE3QkQsV0FBWSxpQkFBaUI7SUFDekIsd0RBQXdEO0lBQ3hELDhFQUE0QixDQUFBO0lBQzVCLDZGQUE2RjtJQUM3RixnRkFBNEIsQ0FBQTtJQUM1QixrREFBa0Q7SUFDbEQsNEVBQTRCLENBQUE7SUFDNUIsdUZBQXVGO0lBQ3ZGLHNGQUE0QixDQUFBO0lBQzVCLHFFQUFxRTtJQUNyRSw4RkFBNEIsQ0FBQTtJQUM1Qiw4REFBOEQ7SUFDOUQsOEZBQTRCLENBQUE7SUFDNUIsaUdBQWlHO0lBQ2pHLG9GQUE0QixDQUFBO0lBQzVCLGdIQUFnSDtJQUNoSCw0RUFBNEIsQ0FBQTtJQUM1Qiw0REFBNEQ7SUFDNUQsa0ZBQTRCLENBQUE7SUFDNUIsb0RBQW9EO0lBQ3BELDhFQUE0QixDQUFBO0lBQzVCLG1IQUFtSDtJQUNuSCxzRkFBNEIsQ0FBQTtJQUM1QixrREFBa0Q7SUFDbEQsMEZBQTRCLENBQUE7SUFDNUIsNkdBQTZHO0lBQzdHLGtGQUE0QixDQUFBO0lBQzVCLG1KQUFtSjtJQUNuSix3RkFBNEIsQ0FBQTtBQUNoQyxDQUFDLEVBN0JXLGlCQUFpQixpQ0FBakIsaUJBQWlCLFFBNkI1QjtBQUVELElBQVksWUF5Qlg7QUF6QkQsV0FBWSxZQUFZO0lBQ3BCLDZDQUE2QztJQUM3Qyx1REFBdUIsQ0FBQTtJQUN2QixnQ0FBZ0M7SUFDaEMscUVBQXVCLENBQUE7SUFDdkIsdUNBQXVDO0lBQ3ZDLGlEQUF1QixDQUFBO0lBQ3ZCLDBDQUEwQztJQUMxQyx5REFBdUIsQ0FBQTtJQUN2QiwyQkFBMkI7SUFDM0IsNkVBQXVCLENBQUE7SUFDdkIsd0NBQXdDO0lBQ3hDLHVEQUF1QixDQUFBO0lBQ3ZCLHVDQUF1QztJQUN2QyxpRUFBdUIsQ0FBQTtJQUN2QixzREFBc0Q7SUFDdEQsbURBQXVCLENBQUE7SUFDdkIsa0ZBQWtGO0lBQ2xGLGlEQUF1QixDQUFBO0lBQ3ZCLG9EQUFvRDtJQUNwRCxxREFBdUIsQ0FBQTtJQUN2QixnRUFBZ0U7SUFDaEUsc0VBQXdCLENBQUE7SUFDeEIscUVBQXFFO0lBQ3JFLDBFQUF3QixDQUFBO0FBQzVCLENBQUMsRUF6QlcsWUFBWSw0QkFBWixZQUFZLFFBeUJ2QjtBQUVELElBQVksZUF5Qlg7QUF6QkQsV0FBWSxlQUFlO0lBQ3ZCLGlDQUFpQztJQUNqQyw0RUFBOEIsQ0FBQTtJQUM5QixvRUFBb0U7SUFDcEUsd0VBQThCLENBQUE7SUFDOUIsNkRBQTZEO0lBQzdELGtGQUE4QixDQUFBO0lBQzlCLCtEQUErRDtJQUMvRCwwRkFBOEIsQ0FBQTtJQUM5QixxREFBcUQ7SUFDckQsMEZBQThCLENBQUE7SUFDOUIsc0NBQXNDO0lBQ3RDLDhFQUE4QixDQUFBO0lBQzlCLGlDQUFpQztJQUNqQyw4RUFBOEIsQ0FBQTtJQUM5QiwyREFBMkQ7SUFDM0QsZ0ZBQThCLENBQUE7SUFDOUIsZ0RBQWdEO0lBQ2hELGdGQUE4QixDQUFBO0lBQzlCLHVIQUF1SDtJQUN2SCx3RUFBOEIsQ0FBQTtJQUM5QixnREFBZ0Q7SUFDaEQsd0ZBQThCLENBQUE7SUFDOUIsMENBQTBDO0lBQzFDLDhGQUE4QixDQUFBO0FBQ2xDLENBQUMsRUF6QlcsZUFBZSwrQkFBZixlQUFlLFFBeUIxQjtBQUVELElBQVksUUFPWDtBQVBELFdBQVksUUFBUTtJQUNoQixvRkFBb0Y7SUFDcEYsNkNBQWUsQ0FBQTtJQUNmLHVDQUF1QztJQUN2QyxxREFBZSxDQUFBO0lBQ2YsOEVBQThFO0lBQzlFLDZDQUFlLENBQUE7QUFDbkIsQ0FBQyxFQVBXLFFBQVEsd0JBQVIsUUFBUSxRQU9uQjtBQUVELElBQVksYUFRWDtBQVJELFdBQVksYUFBYTtJQUNyQixpREFBZSxDQUFBO0lBQ2YsMkRBQWUsQ0FBQTtJQUNmLDJEQUFlLENBQUE7SUFDZix5REFBZSxDQUFBO0lBQ2YscURBQWUsQ0FBQTtJQUNmLDJEQUFlLENBQUE7SUFDZiwrREFBZSxDQUFBO0FBQ25CLENBQUMsRUFSVyxhQUFhLDZCQUFiLGFBQWEsUUFReEI7QUFFRCxJQUFZLGFBaUJYO0FBakJELFdBQVksYUFBYTtJQUNyQixvRUFBb0U7SUFDcEUseURBQW9DLENBQUE7SUFDcEMsNENBQTRDO0lBQzVDLGlEQUFvQyxDQUFBO0lBQ3BDLHlEQUFvQyxDQUFBO0lBQ3BDLHNEQUFzRDtJQUN0RCxpRUFBb0MsQ0FBQTtJQUNwQyw2QkFBNkI7SUFDN0Isa0RBQW9DLENBQUE7SUFDcEMsNkJBQTZCO0lBQzdCLGtEQUFvQyxDQUFBO0lBQ3BDLDhGQUFvQyxDQUFBO0lBQ3BDLHdFQUF3RTtJQUN4RSxpR0FBb0MsQ0FBQTtJQUNwQyxxREFBcUQ7SUFDckQsMkRBQW9DLENBQUE7QUFDeEMsQ0FBQyxFQWpCVyxhQUFhLDZCQUFiLGFBQWEsUUFpQnhCO0FBRUQsSUFBWSxpQkFTWDtBQVRELFdBQVksaUJBQWlCO0lBQ3pCLDBDQUEwQztJQUMxQyw2RUFBdUIsQ0FBQTtJQUN2QixtREFBbUQ7SUFDbkQseUVBQXVCLENBQUE7SUFDdkIsdUVBQXVFO0lBQ3ZFLDJFQUF1QixDQUFBO0lBQ3ZCLDhDQUE4QztJQUM5Qyx1RUFBdUIsQ0FBQTtBQUMzQixDQUFDLEVBVFcsaUJBQWlCLGlDQUFqQixpQkFBaUIsUUFTNUI7QUFFRCxJQUFZLDJCQWlCWDtBQWpCRCxXQUFZLDJCQUEyQjtJQUNuQyx1R0FBdUc7SUFDdkcseUhBQWtDLENBQUE7SUFDbEMsMEdBQTBHO0lBQzFHLCtIQUFrQyxDQUFBO0lBQ2xDLDBGQUEwRjtJQUMxRiwrRkFBa0MsQ0FBQTtJQUNsQyw4RkFBOEY7SUFDOUYsdUdBQWtDLENBQUE7SUFDbEMsMElBQTBJO0lBQzFJLDJIQUFrQyxDQUFBO0lBQ2xDLDZJQUE2STtJQUM3SSxpSUFBa0MsQ0FBQTtJQUNsQywrRkFBK0Y7SUFDL0YsK0ZBQWtDLENBQUE7SUFDbEMsbUdBQW1HO0lBQ25HLHVHQUFrQyxDQUFBO0FBQ3RDLENBQUMsRUFqQlcsMkJBQTJCLDJDQUEzQiwyQkFBMkIsUUFpQnRDO0FBRUQsSUFBWSxnQkFxQlg7QUFyQkQsV0FBWSxnQkFBZ0I7SUFDeEIsbURBQW1EO0lBQ25ELG1FQUF1RCxDQUFBO0lBQ3ZELDRDQUE0QztJQUM1Qyx1RkFBdUQsQ0FBQTtJQUN2RCxvRkFBb0Y7SUFDcEYseUZBQXVELENBQUE7SUFDdkQsMENBQTBDO0lBQzFDLG1GQUF1RCxDQUFBO0lBQ3ZELG9EQUFvRDtJQUNwRCxnRUFBdUQsQ0FBQTtJQUN2RCwwRUFBMEU7SUFDMUUsd0ZBQXVELENBQUE7SUFDdkQsbUZBQW1GO0lBQ25GLDRGQUF1RCxDQUFBO0lBQ3ZELDZJQUF1RCxDQUFBO0lBQ3ZELGtHQUFrRztJQUNsRywrRkFBdUQsQ0FBQTtJQUN2RCx5RUFBeUU7SUFDekUsK0dBQXVELENBQUE7SUFDdkQsMEdBQXdELENBQUE7QUFDNUQsQ0FBQyxFQXJCVyxnQkFBZ0IsZ0NBQWhCLGdCQUFnQixRQXFCM0I7QUFFRCxJQUFZLHFCQUtYO0FBTEQsV0FBWSxxQkFBcUI7SUFDN0Isb0RBQW9EO0lBQ3BELHVGQUFtQixDQUFBO0lBQ25CLG1EQUFtRDtJQUNuRCx5RUFBbUIsQ0FBQTtBQUN2QixDQUFDLEVBTFcscUJBQXFCLHFDQUFyQixxQkFBcUIsUUFLaEM7QUFFRCxJQUFZLGNBS1g7QUFMRCxXQUFZLGNBQWM7SUFDdEIsOEJBQThCO0lBQzlCLHlEQUFXLENBQUE7SUFDWCw0QkFBNEI7SUFDNUIscURBQVcsQ0FBQTtBQUNmLENBQUMsRUFMVyxjQUFjLDhCQUFkLGNBQWMsUUFLekI7QUFFRCxJQUFZLGVBR1g7QUFIRCxXQUFZLGVBQWU7SUFDdkIsMkRBQVksQ0FBQTtJQUNaLDZEQUFZLENBQUE7QUFDaEIsQ0FBQyxFQUhXLGVBQWUsK0JBQWYsZUFBZSxRQUcxQjtBQUVELElBQVksV0FHWDtBQUhELFdBQVksV0FBVztJQUNuQixvRUFBb0U7SUFDcEUsbUVBQXdCLENBQUE7QUFDNUIsQ0FBQyxFQUhXLFdBQVcsMkJBQVgsV0FBVyxRQUd0QjtBQUVELElBQVksWUFJWDtBQUpELFdBQVksWUFBWTtJQUNwQix3QkFBd0I7SUFDeEIsbURBQVUsQ0FBQTtJQUNWLGlEQUFVLENBQUE7QUFDZCxDQUFDLEVBSlcsWUFBWSw0QkFBWixZQUFZLFFBSXZCO0FBRUQsSUFBWSxlQWFYO0FBYkQsV0FBWSxlQUFlO0lBQ3ZCLG9EQUFvRDtJQUNwRCwyREFBZ0MsQ0FBQTtJQUNoQyxnQ0FBZ0M7SUFDaEMscUVBQWdDLENBQUE7SUFDaEMsa0NBQWtDO0lBQ2xDLDZEQUFnQyxDQUFBO0lBQ2hDLDhCQUE4QjtJQUM5QixpRUFBZ0MsQ0FBQTtJQUNoQyxrREFBa0Q7SUFDbEQsNEZBQWdDLENBQUE7SUFDaEMsc0NBQXNDO0lBQ3RDLG9FQUFnQyxDQUFBO0FBQ3BDLENBQUMsRUFiVyxlQUFlLCtCQUFmLGVBQWUsUUFhMUI7QUFFRCxJQUFZLFFBYVg7QUFiRCxXQUFZLFFBQVE7SUFDaEIsMkJBQTJCO0lBQzNCLDZEQUFzQixDQUFBO0lBQ3RCLG1CQUFtQjtJQUNuQiw2Q0FBc0IsQ0FBQTtJQUN0QixzQkFBc0I7SUFDdEIsbURBQXNCLENBQUE7SUFDdEIsc0JBQXNCO0lBQ3RCLDJDQUFzQixDQUFBO0lBQ3RCLHdCQUF3QjtJQUN4Qix1REFBc0IsQ0FBQTtJQUN0QixrQ0FBa0M7SUFDbEMsbUVBQXNCLENBQUE7QUFDMUIsQ0FBQyxFQWJXLFFBQVEsd0JBQVIsUUFBUSxRQWFuQjtBQUVELElBQVksUUFvQlg7QUFwQkQsV0FBWSxRQUFRO0lBQ2hCLGlEQUFpRDtJQUNqRCwrREFBMkMsQ0FBQTtJQUMzQyw2Q0FBNkM7SUFDN0MsK0VBQTJDLENBQUE7SUFDM0Msb0NBQW9DO0lBQ3BDLGlEQUEyQyxDQUFBO0lBQzNDLDBFQUEwRTtJQUMxRSwrRUFBMkMsQ0FBQTtJQUMzQyx3REFBMkMsQ0FBQTtJQUMzQyx5REFBeUQ7SUFDekQsb0RBQTJDLENBQUE7SUFDM0MscURBQXFEO0lBQ3JELG9HQUEyQyxDQUFBO0lBQzNDLG9EQUFvRDtJQUNwRCw2RkFBMkMsQ0FBQTtJQUMzQyxxRUFBMkMsQ0FBQTtJQUMzQyxtREFBbUQ7SUFDbkQsMkZBQTJDLENBQUE7SUFDM0MsbUVBQTJDLENBQUE7QUFDL0MsQ0FBQyxFQXBCVyxRQUFRLHdCQUFSLFFBQVEsUUFvQm5CO0FBRUQsSUFBWSxnQkFpQlg7QUFqQkQsV0FBWSxnQkFBZ0I7SUFDeEIsMENBQTBDO0lBQzFDLCtEQUE0QixDQUFBO0lBQzVCLHdEQUF3RDtJQUN4RCx1RkFBNEIsQ0FBQTtJQUM1Qiw0Q0FBNEM7SUFDNUMsMkVBQTRCLENBQUE7SUFDNUIsd0VBQXdFO0lBQ3hFLG1GQUE0QixDQUFBO0lBQzVCLG9EQUFvRDtJQUNwRCx5RUFBNEIsQ0FBQTtJQUM1Qiw2Q0FBNkM7SUFDN0MsaUVBQTRCLENBQUE7SUFDNUIsa0VBQWtFO0lBQ2xFLCtFQUE0QixDQUFBO0lBQzVCLHFEQUFxRDtJQUNyRCwrRkFBNEIsQ0FBQTtBQUNoQyxDQUFDLEVBakJXLGdCQUFnQixnQ0FBaEIsZ0JBQWdCLFFBaUIzQjtBQUVELElBQVkscUJBS1g7QUFMRCxXQUFZLHFCQUFxQjtJQUM3QixpQ0FBaUM7SUFDakMsbUVBQVMsQ0FBQTtJQUNULGdDQUFnQztJQUNoQyxpRUFBUyxDQUFBO0FBQ2IsQ0FBQyxFQUxXLHFCQUFxQixxQ0FBckIscUJBQXFCLFFBS2hDO0FBRUQsSUFBWSxjQUVYO0FBRkQsV0FBWSxjQUFjO0lBQ3RCLHVEQUFVLENBQUE7QUFDZCxDQUFDLEVBRlcsY0FBYyw4QkFBZCxjQUFjLFFBRXpCO0FBRUQsSUFBWSxvQkFLWDtBQUxELFdBQVksb0JBQW9CO0lBQzVCLDZCQUE2QjtJQUM3QixtRUFBWSxDQUFBO0lBQ1osdUVBQVksQ0FBQTtJQUNaLG1FQUFZLENBQUE7QUFDaEIsQ0FBQyxFQUxXLG9CQUFvQixvQ0FBcEIsb0JBQW9CLFFBSy9CO0FBRUQsSUFBWSxjQUdYO0FBSEQsV0FBWSxjQUFjO0lBQ3RCLDhCQUE4QjtJQUM5Qix5REFBVyxDQUFBO0FBQ2YsQ0FBQyxFQUhXLGNBQWMsOEJBQWQsY0FBYyxRQUd6QjtBQUVELElBQVksNEJBT1g7QUFQRCxXQUFZLDRCQUE0QjtJQUNwQyx5REFBeUQ7SUFDekQsK0VBQVcsQ0FBQTtJQUNYLCtDQUErQztJQUMvQyxxRkFBVyxDQUFBO0lBQ1gsd0RBQXdEO0lBQ3hELHFGQUFXLENBQUE7QUFDZixDQUFDLEVBUFcsNEJBQTRCLDRDQUE1Qiw0QkFBNEIsUUFPdkM7QUFFRCxJQUFZLCtCQVVYO0FBVkQsV0FBWSwrQkFBK0I7SUFDdkMsbUVBQW1FO0lBQ25FLGlHQUFvQixDQUFBO0lBQ3BCLGtFQUFrRTtJQUNsRSw2R0FBb0IsQ0FBQTtJQUNwQiw4REFBOEQ7SUFDOUQscUdBQW9CLENBQUE7SUFDcEIsaUdBQW9CLENBQUE7SUFDcEIsb0ZBQW9GO0lBQ3BGLDJGQUFvQixDQUFBO0FBQ3hCLENBQUMsRUFWVywrQkFBK0IsK0NBQS9CLCtCQUErQixRQVUxQztBQUVELElBQVksb0NBaUNYO0FBakNELFdBQVksb0NBQW9DO0lBQzVDLDhCQUE4QjtJQUM5Qix1R0FBZ0MsQ0FBQTtJQUNoQywyQ0FBMkM7SUFDM0MsNkZBQWdDLENBQUE7SUFDaEMsb0NBQW9DO0lBQ3BDLDZHQUFnQyxDQUFBO0lBQ2hDLDJDQUEyQztJQUMzQyx1SEFBZ0MsQ0FBQTtJQUNoQywyQ0FBMkM7SUFDM0Msb0hBQWdDLENBQUE7SUFDaEMsaUVBQWlFO0lBQ2pFLG9IQUFnQyxDQUFBO0lBQ2hDLDBDQUEwQztJQUMxQywwR0FBZ0MsQ0FBQTtJQUNoQyxpREFBaUQ7SUFDakQseUhBQWdDLENBQUE7SUFDaEMsMkZBQTJGO0lBQzNGLDJIQUFnQyxDQUFBO0lBQ2hDLDBDQUEwQztJQUMxQyxtSEFBZ0MsQ0FBQTtJQUNoQywrQ0FBK0M7SUFDL0Msb0hBQWlDLENBQUE7SUFDakMsMENBQTBDO0lBQzFDLGdHQUFpQyxDQUFBO0lBQ2pDLGdFQUFnRTtJQUNoRSx3SUFBaUMsQ0FBQTtJQUNqQyx3REFBd0Q7SUFDeEQsNEhBQWlDLENBQUE7SUFDakMsaUVBQWlFO0lBQ2pFLHVJQUFpQyxDQUFBO0lBQ2pDLCtEQUErRDtJQUMvRCxxSUFBaUMsQ0FBQTtBQUNyQyxDQUFDLEVBakNXLG9DQUFvQyxvREFBcEMsb0NBQW9DLFFBaUMvQztBQUVELElBQVkscUNBR1g7QUFIRCxXQUFZLHFDQUFxQztJQUM3Qyx5R0FBWSxDQUFBO0lBQ1osdUdBQVksQ0FBQTtBQUNoQixDQUFDLEVBSFcscUNBQXFDLHFEQUFyQyxxQ0FBcUMsUUFHaEQ7QUFFRCxJQUFZLDhCQUtYO0FBTEQsV0FBWSw4QkFBOEI7SUFDdEMsc0VBQXNFO0lBQ3RFLDZGQUFhLENBQUE7SUFDYiw0Q0FBNEM7SUFDNUMsNkZBQWEsQ0FBQTtBQUNqQixDQUFDLEVBTFcsOEJBQThCLDhDQUE5Qiw4QkFBOEIsUUFLekM7QUFFRCxJQUFZLHVDQXFDWDtBQXJDRCxXQUFZLHVDQUF1QztJQUMvQyw4QkFBOEI7SUFDOUIsNkdBQW9DLENBQUE7SUFDcEMscUNBQXFDO0lBQ3JDLDZHQUFvQyxDQUFBO0lBQ3BDLDJGQUEyRjtJQUMzRiwrSEFBb0MsQ0FBQTtJQUNwQywyQ0FBMkM7SUFDM0MsNkhBQW9DLENBQUE7SUFDcEMsMkNBQTJDO0lBQzNDLDBIQUFvQyxDQUFBO0lBQ3BDLDBDQUEwQztJQUMxQyxnSEFBb0MsQ0FBQTtJQUNwQyxpREFBaUQ7SUFDakQsOEhBQW9DLENBQUE7SUFDcEMsK0RBQStEO0lBQy9ELHlJQUFvQyxDQUFBO0lBQ3BDLHFDQUFxQztJQUNyQyw2SEFBb0MsQ0FBQTtJQUNwQyxpREFBaUQ7SUFDakQsMElBQXFDLENBQUE7SUFDckMsNkNBQTZDO0lBQzdDLG9JQUFxQyxDQUFBO0lBQ3JDLHdEQUF3RDtJQUN4RCxvSkFBcUMsQ0FBQTtJQUNyQywyQkFBMkI7SUFDM0IsZ0lBQXFDLENBQUE7SUFDckMsK0JBQStCO0lBQy9CLHVJQUFxQyxDQUFBO0lBQ3JDLDZFQUE2RTtJQUM3RSx1SkFBcUMsQ0FBQTtJQUNyQyx5RUFBeUU7SUFDekUsaUpBQXFDLENBQUE7SUFDckMsMkRBQTJEO0lBQzNELHNJQUFxQyxDQUFBO0lBQ3JDLDRDQUE0QztJQUM1Qyx3SUFBcUMsQ0FBQTtBQUN6QyxDQUFDLEVBckNXLHVDQUF1Qyx1REFBdkMsdUNBQXVDLFFBcUNsRDtBQUVELElBQVksbUJBV1g7QUFYRCxXQUFZLG1CQUFtQjtJQUMzQixtREFBbUQ7SUFDbkQscUVBQWUsQ0FBQTtJQUNmLCtEQUErRDtJQUMvRCwyRUFBZSxDQUFBO0lBQ2YsMERBQTBEO0lBQzFELHVFQUFlLENBQUE7SUFDZix3REFBd0Q7SUFDeEQscUVBQWUsQ0FBQTtJQUNmLHlEQUF5RDtJQUN6RCxxRUFBZSxDQUFBO0FBQ25CLENBQUMsRUFYVyxtQkFBbUIsbUNBQW5CLG1CQUFtQixRQVc5QjtBQUVELElBQVkscUJBV1g7QUFYRCxXQUFZLHFCQUFxQjtJQUM3Qix3REFBd0Q7SUFDeEQsaUVBQWEsQ0FBQTtJQUNiLGlHQUFpRztJQUNqRyxpRUFBYSxDQUFBO0lBQ2IsOERBQThEO0lBQzlELDJFQUFhLENBQUE7SUFDYix1REFBdUQ7SUFDdkQseUVBQWEsQ0FBQTtJQUNiLHdEQUF3RDtJQUN4RCx5RUFBYSxDQUFBO0FBQ2pCLENBQUMsRUFYVyxxQkFBcUIscUNBQXJCLHFCQUFxQixRQVdoQztBQUVELElBQVksNEJBUVg7QUFSRCxXQUFZLDRCQUE0QjtJQUNwQyxzREFBc0Q7SUFDdEQsMkZBQWUsQ0FBQTtJQUNmLGlFQUFpRTtJQUNqRSw2RkFBZSxDQUFBO0lBQ2YsNERBQTREO0lBQzVELHlGQUFlLENBQUE7SUFDZix5RkFBZSxDQUFBO0FBQ25CLENBQUMsRUFSVyw0QkFBNEIsNENBQTVCLDRCQUE0QixRQVF2QztBQUVELElBQVksU0FHWDtBQUhELFdBQVksU0FBUztJQUNqQixrREFBa0Q7SUFDbEQsbURBQWtCLENBQUE7QUFDdEIsQ0FBQyxFQUhXLFNBQVMseUJBQVQsU0FBUyxRQUdwQjtBQUVELElBQVksb0JBU1g7QUFURCxXQUFZLG9CQUFvQjtJQUM1QixrRUFBa0U7SUFDbEUsbUZBQW1CLENBQUE7SUFDbkIsdURBQXVEO0lBQ3ZELGlGQUFtQixDQUFBO0lBQ25CLHNEQUFzRDtJQUN0RCwrRUFBbUIsQ0FBQTtJQUNuQixxREFBcUQ7SUFDckQsNkVBQW1CLENBQUE7QUFDdkIsQ0FBQyxFQVRXLG9CQUFvQixvQ0FBcEIsb0JBQW9CLFFBUy9CO0FBRUQsSUFBWSxvQkFpQlg7QUFqQkQsV0FBWSxvQkFBb0I7SUFDNUIsMERBQTBEO0lBQzFELDZFQUE4QixDQUFBO0lBQzlCLG9GQUFvRjtJQUNwRiw2REFBOEIsQ0FBQTtJQUM5QixzRUFBc0U7SUFDdEUsNkVBQThCLENBQUE7SUFDOUIsd0RBQXdEO0lBQ3hELHlFQUE4QixDQUFBO0lBQzlCLHNEQUFzRDtJQUN0RCw2REFBOEIsQ0FBQTtJQUM5QixrREFBa0Q7SUFDbEQsbUVBQThCLENBQUE7SUFDOUIscURBQXFEO0lBQ3JELDJFQUE4QixDQUFBO0lBQzlCLHlFQUF5RTtJQUN6RSwyR0FBOEIsQ0FBQTtBQUNsQyxDQUFDLEVBakJXLG9CQUFvQixvQ0FBcEIsb0JBQW9CLFFBaUIvQjtBQUVELElBQVksb0JBR1g7QUFIRCxXQUFZLG9CQUFvQjtJQUM1Qiw0Q0FBc0IsQ0FBQTtJQUN0Qiw4Q0FBc0IsQ0FBQTtBQUMxQixDQUFDLEVBSFcsb0JBQW9CLG9DQUFwQixvQkFBb0IsUUFHL0I7QUFFRCxJQUFZLDZCQU1YO0FBTkQsV0FBWSw2QkFBNkI7SUFDckMsa0NBQWtDO0lBQ2xDLHlGQUF1QixDQUFBO0lBQ3ZCLGlDQUFpQztJQUNqQyx1RkFBdUIsQ0FBQTtJQUN2QiwrR0FBdUIsQ0FBQTtBQUMzQixDQUFDLEVBTlcsNkJBQTZCLDZDQUE3Qiw2QkFBNkIsUUFNeEM7QUFFWSxRQUFBLGlDQUFpQyxHQUFHO0lBQzdDLHdCQUF3QjtJQUN4QiwwQkFBMEI7SUFDMUIsb0JBQW9CO0lBQ3BCLHVCQUF1QjtDQUNqQixDQUFDO0FBR1gsSUFBWSxVQUlYO0FBSkQsV0FBWSxVQUFVO0lBQ2xCLDZDQUE2QztJQUM3QyxrRkFBbUMsQ0FBQTtJQUNuQyx3RkFBbUMsQ0FBQTtBQUN2QyxDQUFDLEVBSlcsVUFBVSwwQkFBVixVQUFVLFFBSXJCO0FBRUQsSUFBWSxlQUVYO0FBRkQsV0FBWSxlQUFlO0lBQ3ZCLG9FQUFvQixDQUFBO0FBQ3hCLENBQUMsRUFGVyxlQUFlLCtCQUFmLGVBQWUsUUFFMUI7QUFFRCxJQUFZLG9CQUtYO0FBTEQsV0FBWSxvQkFBb0I7SUFDNUIseURBQXlEO0lBQ3pELGlFQUFTLENBQUE7SUFDVCwwREFBMEQ7SUFDMUQsaUVBQVMsQ0FBQTtBQUNiLENBQUMsRUFMVyxvQkFBb0Isb0NBQXBCLG9CQUFvQixRQUsvQjtBQUVELElBQVksZUF3Qlg7QUF4QkQsV0FBWSxlQUFlO0lBQ3ZCLGNBQWM7SUFDZCwyREFBaUIsQ0FBQTtJQUNqQixlQUFlO0lBQ2YsK0RBQWlCLENBQUE7SUFDakIsc0JBQXNCO0lBQ3RCLG1FQUFpQixDQUFBO0lBQ2pCLGFBQWE7SUFDYix5REFBaUIsQ0FBQTtJQUNqQixnQkFBZ0I7SUFDaEIsK0RBQWlCLENBQUE7SUFDakIsbUJBQW1CO0lBQ25CLHVFQUFpQixDQUFBO0lBQ2pCLGlCQUFpQjtJQUNqQixpRUFBaUIsQ0FBQTtJQUNqQiwyREFBaUIsQ0FBQTtJQUNqQixZQUFZO0lBQ1osdURBQWlCLENBQUE7SUFDakIsZUFBZTtJQUNmLDhEQUFrQixDQUFBO0lBQ2xCLG1CQUFtQjtJQUNuQiw0REFBa0IsQ0FBQTtJQUNsQixpQkFBaUI7SUFDakIsa0VBQWtCLENBQUE7QUFDdEIsQ0FBQyxFQXhCVyxlQUFlLCtCQUFmLGVBQWUsUUF3QjFCO0FBRUQsSUFBWSxpQkFhWDtBQWJELFdBQVksaUJBQWlCO0lBQ3pCLHdDQUF3QztJQUN4QywyREFBWSxDQUFBO0lBQ1oseUJBQXlCO0lBQ3pCLGlFQUFZLENBQUE7SUFDWiwyQkFBMkI7SUFDM0IseURBQVksQ0FBQTtJQUNaLDBDQUEwQztJQUMxQyx5REFBWSxDQUFBO0lBQ1oseUJBQXlCO0lBQ3pCLHVEQUFZLENBQUE7SUFDWiwrQkFBK0I7SUFDL0IseURBQVksQ0FBQTtBQUNoQixDQUFDLEVBYlcsaUJBQWlCLGlDQUFqQixpQkFBaUIsUUFhNUI7QUFFRCxJQUFZLDBCQVNYO0FBVEQsV0FBWSwwQkFBMEI7SUFDbEMsZ0NBQWdDO0lBQ2hDLHlGQUFlLENBQUE7SUFDZix1Q0FBdUM7SUFDdkMsdUZBQWUsQ0FBQTtJQUNmLDZCQUE2QjtJQUM3QixxRkFBZSxDQUFBO0lBQ2YsMkNBQTJDO0lBQzNDLCtFQUFlLENBQUE7QUFDbkIsQ0FBQyxFQVRXLDBCQUEwQiwwQ0FBMUIsMEJBQTBCLFFBU3JDO0FBRUQsSUFBWSxtQ0FJWDtBQUpELFdBQVksbUNBQW1DO0lBQzNDLHFHQUFzQixDQUFBO0lBQ3RCLHlIQUFzQixDQUFBO0lBQ3RCLHlIQUFzQixDQUFBO0FBQzFCLENBQUMsRUFKVyxtQ0FBbUMsbURBQW5DLG1DQUFtQyxRQUk5QztBQUVELElBQVksd0NBT1g7QUFQRCxXQUFZLHdDQUF3QztJQUNoRCwrQkFBK0I7SUFDL0IsK0dBQWEsQ0FBQTtJQUNiLG9CQUFvQjtJQUNwQiwrR0FBYSxDQUFBO0lBQ2IscUJBQXFCO0lBQ3JCLGlIQUFhLENBQUE7QUFDakIsQ0FBQyxFQVBXLHdDQUF3Qyx3REFBeEMsd0NBQXdDLFFBT25EO0FBRUQsSUFBWSx5QkFPWDtBQVBELFdBQVkseUJBQXlCO0lBQ2pDLHVCQUF1QjtJQUN2Qix5RUFBVyxDQUFBO0lBQ1gsMEJBQTBCO0lBQzFCLHVFQUFXLENBQUE7SUFDWCw2Q0FBNkM7SUFDN0MsK0VBQVcsQ0FBQTtBQUNmLENBQUMsRUFQVyx5QkFBeUIseUNBQXpCLHlCQUF5QixRQU9wQztBQUVZLFFBQUEsNkJBQTZCLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxpQkFBaUIsRUFBRSxrQkFBa0IsRUFBRSxhQUFhLEVBQUUsdUJBQXVCLEVBQUUsZUFBZSxDQUFVLENBQUM7QUFFNUosUUFBQSx3QkFBd0IsR0FBRyxDQUFDLGdCQUFnQixFQUFFLGVBQWUsQ0FBVSxDQUFDO0FBRXhFLFFBQUEsNkJBQTZCLEdBQUcsQ0FBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLEtBQUssQ0FBVSxDQUFDO0FBRW5FLFFBQUEsNkJBQTZCLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBVSxDQUFDO0FBRWxFLFFBQUEsb0JBQW9CLEdBQUcsQ0FBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxNQUFNLEVBQUUsU0FBUyxDQUFVLENBQUM7QUFFaEgsUUFBQSxtQkFBbUIsR0FBRyxDQUFDLE9BQU8sRUFBRSxXQUFXLEVBQUUsV0FBVyxDQUFVLENBQUM7QUFHaEYsSUFBWSxxQkFPWDtBQVBELFdBQVkscUJBQXFCO0lBQzdCLFdBQVc7SUFDWCxpRUFBaUIsQ0FBQTtJQUNqQixrQkFBa0I7SUFDbEIsbUZBQWlCLENBQUE7SUFDakIsa0JBQWtCO0lBQ2xCLG1GQUFpQixDQUFBO0FBQ3JCLENBQUMsRUFQVyxxQkFBcUIscUNBQXJCLHFCQUFxQixRQU9oQztBQUVELElBQVksa0JBR1g7QUFIRCxXQUFZLGtCQUFrQjtJQUMxQiw2Q0FBNkM7SUFDN0MsK0VBQXVCLENBQUE7QUFDM0IsQ0FBQyxFQUhXLGtCQUFrQixrQ0FBbEIsa0JBQWtCLFFBRzdCO0FBRUQsSUFBWSx1QkFhWDtBQWJELFdBQVksdUJBQXVCO0lBQy9CLDBEQUEwRDtJQUMxRCxtRkFBbUIsQ0FBQTtJQUNuQiw0REFBNEQ7SUFDNUQsMkVBQW1CLENBQUE7SUFDbkIsK0RBQStEO0lBQy9ELDJGQUFtQixDQUFBO0lBQ25CLDhEQUE4RDtJQUM5RCx5RUFBbUIsQ0FBQTtJQUNuQixrRUFBa0U7SUFDbEUsMkVBQW1CLENBQUE7SUFDbkIsb0VBQW9FO0lBQ3BFLCtFQUFtQixDQUFBO0FBQ3ZCLENBQUMsRUFiVyx1QkFBdUIsdUNBQXZCLHVCQUF1QixRQWFsQztBQUVELElBQVksaUJBT1g7QUFQRCxXQUFZLGlCQUFpQjtJQUN6QixvQkFBb0I7SUFDcEIseUVBQWtCLENBQUE7SUFDbEIsY0FBYztJQUNkLCtEQUFrQixDQUFBO0lBQ2xCLGFBQWE7SUFDYiw2RUFBa0IsQ0FBQTtBQUN0QixDQUFDLEVBUFcsaUJBQWlCLGlDQUFqQixpQkFBaUIsUUFPNUI7QUFFRCxJQUFZLGVBV1g7QUFYRCxXQUFZLGVBQWU7SUFDdkIsbUdBQW1HO0lBQ25HLDJFQUF3QixDQUFBO0lBQ3hCLDJEQUEyRDtJQUMzRCx1REFBd0IsQ0FBQTtJQUN4Qix5REFBeUQ7SUFDekQsMkVBQXdCLENBQUE7SUFDeEIsd0ZBQXdGO0lBQ3hGLHFGQUF3QixDQUFBO0lBQ3hCLHNDQUFzQztJQUN0QyxxREFBd0IsQ0FBQTtBQUM1QixDQUFDLEVBWFcsZUFBZSwrQkFBZixlQUFlLFFBVzFCO0FBRUQsSUFBWSxnQkFFWDtBQUZELFdBQVksZ0JBQWdCO0lBQ3hCLDJFQUF1QixDQUFBO0FBQzNCLENBQUMsRUFGVyxnQkFBZ0IsZ0NBQWhCLGdCQUFnQixRQUUzQjtBQUVELElBQVksb0JBS1g7QUFMRCxXQUFZLG9CQUFvQjtJQUM1QiwrREFBK0Q7SUFDL0QscUVBQVcsQ0FBQTtJQUNYLGdFQUFnRTtJQUNoRSxxRUFBVyxDQUFBO0FBQ2YsQ0FBQyxFQUxXLG9CQUFvQixvQ0FBcEIsb0JBQW9CLFFBSy9CO0FBRUQsSUFBWSxpQkFPWDtBQVBELFdBQVksaUJBQWlCO0lBQ3pCLCtCQUErQjtJQUMvQix5REFBUSxDQUFBO0lBQ1IsZ0NBQWdDO0lBQ2hDLDJEQUFTLENBQUE7SUFDVCxrQ0FBa0M7SUFDbEMsK0RBQVcsQ0FBQTtBQUNmLENBQUMsRUFQVyxpQkFBaUIsaUNBQWpCLGlCQUFpQixRQU81QjtBQUVELHdDQUF3QztBQUN4QyxxSkFBcUo7QUFDckosSUFBWSxjQTRTWDtBQTVTRCxXQUFZLGNBQWM7SUFDdEIscUVBQWlCLENBQUE7SUFDakIsNkVBQXdCLENBQUE7SUFDeEIscUZBQTRCLENBQUE7SUFDNUIsNkVBQXdCLENBQUE7SUFDeEIseUVBQXNCLENBQUE7SUFDdEIscUZBQTRCLENBQUE7SUFDNUIsMkVBQXVCLENBQUE7SUFDdkIsMkVBQXVCLENBQUE7SUFDdkIsNkVBQXdCLENBQUE7SUFDeEIsaUZBQTBCLENBQUE7SUFDMUIsK0VBQXlCLENBQUE7SUFDekIsK0VBQXlCLENBQUE7SUFDekIsdUVBQXFCLENBQUE7SUFDckIseUVBQXNCLENBQUE7SUFDdEIsdUVBQXFCLENBQUE7SUFDckIseUVBQXNCLENBQUE7SUFDdEIsNkVBQXdCLENBQUE7SUFDeEIsNkZBQWdDLENBQUE7SUFDaEMsNkVBQXdCLENBQUE7SUFDeEIseUVBQXNCLENBQUE7SUFDdEIscUVBQW9CLENBQUE7SUFDcEIscUVBQW9CLENBQUE7SUFDcEIseUZBQThCLENBQUE7SUFDOUIscUZBQTRCLENBQUE7SUFDNUIseUVBQXNCLENBQUE7SUFDdEIseUVBQXNCLENBQUE7SUFDdEIsMkVBQXVCLENBQUE7SUFDdkIsMkdBQXVDLENBQUE7SUFDdkMsNkZBQWdDLENBQUE7SUFDaEMsaUZBQTBCLENBQUE7SUFDMUIsMkVBQXVCLENBQUE7SUFDdkIsaUlBQWtELENBQUE7SUFDbEQsMkZBQStCLENBQUE7SUFDL0IsdUhBQTZDLENBQUE7SUFDN0MsNkVBQXdCLENBQUE7SUFDeEIscUZBQTRCLENBQUE7SUFDNUIscUdBQW9DLENBQUE7SUFDcEMsNkhBQWdELENBQUE7SUFDaEQsMkZBQStCLENBQUE7SUFDL0IsMkhBQStDLENBQUE7SUFDL0MsdUdBQXFDLENBQUE7SUFDckMseUdBQXNDLENBQUE7SUFDdEMsbUhBQTJDLENBQUE7SUFDM0MscUVBQW9CLENBQUE7SUFDcEIseUVBQXNCLENBQUE7SUFDdEIsMkVBQXVCLENBQUE7SUFDdkIseUdBQXNDLENBQUE7SUFDdEMsdUVBQXFCLENBQUE7SUFDckIsNkdBQXdDLENBQUE7SUFDeEMsdUZBQTZCLENBQUE7SUFDN0IsK0VBQXlCLENBQUE7SUFDekIsMkdBQXVDLENBQUE7SUFDdkMsMkdBQXVDLENBQUE7SUFDdkMsK0VBQXlCLENBQUE7SUFDekIseUZBQThCLENBQUE7SUFDOUIsbUZBQTJCLENBQUE7SUFDM0IscUhBQTRDLENBQUE7SUFDNUMsaUZBQTBCLENBQUE7SUFDMUIscUVBQW9CLENBQUE7SUFDcEIsK0ZBQWlDLENBQUE7SUFDakMsMkZBQStCLENBQUE7SUFDL0IsaUZBQTBCLENBQUE7SUFDMUIsK0hBQWlELENBQUE7SUFDakQsNkhBQWdELENBQUE7SUFDaEQsNkdBQXdDLENBQUE7SUFDeEMsNkVBQXdCLENBQUE7SUFDeEIsK0VBQXlCLENBQUE7SUFDekIsK0ZBQWlDLENBQUE7SUFDakMscUZBQTRCLENBQUE7SUFDNUIsdUZBQTZCLENBQUE7SUFDN0IsNkZBQWdDLENBQUE7SUFDaEMsaUZBQTBCLENBQUE7SUFDMUIsMkVBQXVCLENBQUE7SUFDdkIsbUZBQTJCLENBQUE7SUFDM0IsNkZBQWdDLENBQUE7SUFDaEMsaUZBQTBCLENBQUE7SUFDMUIsdUZBQTZCLENBQUE7SUFDN0IsK0VBQXlCLENBQUE7SUFDekIsNkZBQWdDLENBQUE7SUFDaEMsaUZBQTBCLENBQUE7SUFDMUIsK0ZBQWlDLENBQUE7SUFDakMsbUdBQW1DLENBQUE7SUFDbkMsbUdBQW1DLENBQUE7SUFDbkMseUdBQXNDLENBQUE7SUFDdEMsNkZBQWdDLENBQUE7SUFDaEMsdUhBQTZDLENBQUE7SUFDN0MscUhBQTRDLENBQUE7SUFDNUMsdUZBQTZCLENBQUE7SUFDN0IscUlBQW9ELENBQUE7SUFDcEQsaUZBQTBCLENBQUE7SUFDMUIsNkZBQWdDLENBQUE7SUFDaEMsMkhBQStDLENBQUE7SUFDL0MsbUdBQW1DLENBQUE7SUFDbkMseUpBQThELENBQUE7SUFDOUQsNkZBQWdDLENBQUE7SUFDaEMscUZBQTRCLENBQUE7SUFDNUIsK0VBQXlCLENBQUE7SUFDekIsNkZBQWdDLENBQUE7SUFDaEMsNkZBQWdDLENBQUE7SUFDaEMsMkZBQStCLENBQUE7SUFDL0IscUhBQTRDLENBQUE7SUFDNUMseUZBQThCLENBQUE7SUFDOUIsdUVBQXFCLENBQUE7SUFDckIscUdBQW9DLENBQUE7SUFDcEMsbUZBQTJCLENBQUE7SUFDM0IsbUdBQW1DLENBQUE7SUFDbkMseUhBQThDLENBQUE7SUFDOUMsK0VBQXlCLENBQUE7SUFDekIsK0ZBQWlDLENBQUE7SUFDakMsdUVBQXFCLENBQUE7SUFDckIsdUdBQXFDLENBQUE7SUFDckMscUVBQW9CLENBQUE7SUFDcEIsbUZBQTJCLENBQUE7SUFDM0IsMkhBQStDLENBQUE7SUFDL0MsbUhBQTJDLENBQUE7SUFDM0MscUZBQTRCLENBQUE7SUFDNUIsbUhBQTJDLENBQUE7SUFDM0MsbUdBQW1DLENBQUE7SUFDbkMseUhBQThDLENBQUE7SUFDOUMsK0dBQXlDLENBQUE7SUFDekMsK0ZBQWlDLENBQUE7SUFDakMseUdBQXNDLENBQUE7SUFDdEMsbUdBQW1DLENBQUE7SUFDbkMsdUVBQXFCLENBQUE7SUFDckIsK0VBQXlCLENBQUE7SUFDekIsK0VBQXlCLENBQUE7SUFDekIscUdBQW9DLENBQUE7SUFDcEMscUdBQW9DLENBQUE7SUFDcEMsMkVBQXVCLENBQUE7SUFDdkIsMkVBQXVCLENBQUE7SUFDdkIsdUZBQTZCLENBQUE7SUFDN0IsaUZBQTBCLENBQUE7SUFDMUIsMkZBQStCLENBQUE7SUFDL0IsMkZBQStCLENBQUE7SUFDL0IseUZBQThCLENBQUE7SUFDOUIsaUdBQWtDLENBQUE7SUFDbEMseUdBQXNDLENBQUE7SUFDdEMsbUhBQTJDLENBQUE7SUFDM0MseUZBQThCLENBQUE7SUFDOUIsNkZBQWdDLENBQUE7SUFDaEMscUZBQTRCLENBQUE7SUFDNUIscUZBQTRCLENBQUE7SUFDNUIseUVBQXNCLENBQUE7SUFDdEIsdUVBQXFCLENBQUE7SUFDckIsaUdBQWtDLENBQUE7SUFDbEMsaUZBQTBCLENBQUE7SUFDMUIsK0VBQXlCLENBQUE7SUFDekIscUdBQW9DLENBQUE7SUFDcEMscUZBQTRCLENBQUE7SUFDNUIsK0dBQXlDLENBQUE7SUFDekMsdUZBQTZCLENBQUE7SUFDN0IsaUZBQTBCLENBQUE7SUFDMUIsdUZBQTZCLENBQUE7SUFDN0IscUdBQW9DLENBQUE7SUFDcEMsdUdBQXFDLENBQUE7SUFDckMseUZBQThCLENBQUE7SUFDOUIsdUVBQXFCLENBQUE7SUFDckIsbUZBQTJCLENBQUE7SUFDM0IscUdBQW9DLENBQUE7SUFDcEMsaUZBQTBCLENBQUE7SUFDMUIscUlBQW9ELENBQUE7SUFDcEQsOEZBQWlDLENBQUE7SUFDakMscUZBQTRCLENBQUE7SUFDNUIsNkZBQWdDLENBQUE7SUFDaEMsbUZBQTJCLENBQUE7SUFDM0IsaUhBQTBDLENBQUE7SUFDMUMseUdBQXNDLENBQUE7SUFDdEMsdUdBQXFDLENBQUE7SUFDckMseUVBQXNCLENBQUE7SUFDdEIsMkZBQStCLENBQUE7SUFDL0IsdUZBQTZCLENBQUE7SUFDN0IsNkZBQWdDLENBQUE7SUFDaEMsdUdBQXFDLENBQUE7SUFDckMsK0hBQWlELENBQUE7SUFDakQsdUdBQXFDLENBQUE7SUFDckMsdUZBQTZCLENBQUE7SUFDN0IsNkVBQXdCLENBQUE7SUFDeEIsdUhBQTZDLENBQUE7SUFDN0MsK0hBQWlELENBQUE7SUFDakQsNkdBQXdDLENBQUE7SUFDeEMsdUZBQTZCLENBQUE7SUFDN0IsbUdBQW1DLENBQUE7SUFDbkMsMkhBQStDLENBQUE7SUFDL0MseUZBQThCLENBQUE7SUFDOUIsNkVBQXdCLENBQUE7SUFDeEIsbUdBQW1DLENBQUE7SUFDbkMsaUhBQTBDLENBQUE7SUFDMUMsdUhBQTZDLENBQUE7SUFDN0MseUlBQXNELENBQUE7SUFDdEQsdUVBQXFCLENBQUE7SUFDckIseUZBQThCLENBQUE7SUFDOUIsbUdBQW1DLENBQUE7SUFDbkMsMkdBQXVDLENBQUE7SUFDdkMsMkdBQXVDLENBQUE7SUFDdkMsMkhBQStDLENBQUE7SUFDL0MsbUhBQTJDLENBQUE7SUFDM0MsbUpBQTJELENBQUE7SUFDM0QsNklBQXdELENBQUE7SUFDeEQsNkZBQWdDLENBQUE7SUFDaEMsNkZBQWdDLENBQUE7SUFDaEMscUhBQTRDLENBQUE7SUFDNUMsK0lBQXlELENBQUE7SUFDekQsbUpBQTJELENBQUE7SUFDM0QsdUlBQXFELENBQUE7SUFDckQsNkdBQXdDLENBQUE7SUFDeEMsdUlBQXFELENBQUE7SUFDckQsdUlBQXFELENBQUE7SUFDckQsaUhBQTBDLENBQUE7SUFDMUMseUhBQThDLENBQUE7SUFDOUMscUdBQW9DLENBQUE7SUFDcEMsbUhBQTJDLENBQUE7SUFDM0MsbUhBQTJDLENBQUE7SUFDM0MseUdBQXNDLENBQUE7SUFDdEMscUVBQW9CLENBQUE7SUFDcEIsdUVBQXFCLENBQUE7SUFDckIsdUVBQXFCLENBQUE7SUFDckIsMkVBQXVCLENBQUE7SUFDdkIsbUZBQTJCLENBQUE7SUFDM0IsbUZBQTJCLENBQUE7SUFDM0IsK0VBQXlCLENBQUE7SUFDekIscUZBQTRCLENBQUE7SUFDNUIscUdBQW9DLENBQUE7SUFDcEMscUdBQW9DLENBQUE7SUFDcEMsMkdBQXVDLENBQUE7SUFDdkMseUdBQXNDLENBQUE7SUFDdEMseUdBQXNDLENBQUE7SUFDdEMsaUdBQWtDLENBQUE7SUFDbEMsK0dBQXlDLENBQUE7SUFDekMsdUdBQXFDLENBQUE7SUFDckMsK0VBQXlCLENBQUE7SUFDekIsNkdBQXdDLENBQUE7SUFDeEMsd0lBQXNELENBQUE7SUFDdEQsa0pBQTJELENBQUE7SUFDM0Qsd0hBQThDLENBQUE7SUFDOUMsc0dBQXFDLENBQUE7SUFDckMsMEhBQStDLENBQUE7SUFDL0MsOEZBQWlDLENBQUE7SUFDakMsa0dBQW1DLENBQUE7SUFDbkMsNEZBQWdDLENBQUE7SUFDaEMsZ0dBQWtDLENBQUE7SUFDbEMsd0ZBQThCLENBQUE7SUFDOUIsd0hBQThDLENBQUE7SUFDOUMsb0ZBQTRCLENBQUE7SUFDNUIsa0lBQW1ELENBQUE7SUFDbkQsb0hBQTRDLENBQUE7SUFDNUMsZ0ZBQTBCLENBQUE7SUFDMUIsZ0ZBQTBCLENBQUE7SUFDMUIsMEdBQXVDLENBQUE7SUFDdkMsc0ZBQTZCLENBQUE7SUFDN0Isb0dBQW9DLENBQUE7SUFDcEMsb0hBQTRDLENBQUE7SUFDNUMsc0hBQTZDLENBQUE7SUFDN0Msd0lBQXNELENBQUE7SUFDdEQsMEhBQStDLENBQUE7SUFDL0Msc0hBQTZDLENBQUE7SUFDN0MsOEdBQXlDLENBQUE7SUFDekMsd0dBQXNDLENBQUE7SUFDdEMsOEdBQXlDLENBQUE7SUFDekMsOEZBQWlDLENBQUE7SUFDakMsMEZBQStCLENBQUE7SUFDL0IsMEhBQStDLENBQUE7SUFDL0MsOEdBQXlDLENBQUE7SUFDekMsb0ZBQTRCLENBQUE7SUFDNUIsd0pBQThELENBQUE7SUFDOUQsb0lBQW9ELENBQUE7SUFDcEQsb0tBQW9FLENBQUE7SUFDcEUsd0xBQThFLENBQUE7SUFDOUUsd01BQXNGLENBQUE7SUFDdEYsb0pBQTRELENBQUE7SUFDNUQsa0pBQTJELENBQUE7SUFDM0QsOEhBQWlELENBQUE7SUFDakQsd0dBQXNDLENBQUE7SUFDdEMsNEZBQWdDLENBQUE7SUFDaEMsZ0dBQWtDLENBQUE7SUFDbEMsc0dBQXFDLENBQUE7SUFDckMsb0hBQTRDLENBQUE7SUFDNUMsOEZBQWlDLENBQUE7SUFDakMsMElBQXVELENBQUE7SUFDdkQsc0lBQXFELENBQUE7SUFDckQsd0dBQXNDLENBQUE7SUFDdEMsMEhBQStDLENBQUE7SUFDL0MsZ0hBQTBDLENBQUE7SUFDMUMsd0dBQXNDLENBQUE7SUFDdEMsZ0dBQWtDLENBQUE7SUFDbEMsc0ZBQTZCLENBQUE7SUFDN0Isc0ZBQTZCLENBQUE7SUFDN0Isd0VBQXNCLENBQUE7SUFDdEIsNEhBQWdELENBQUE7SUFDaEQsZ0dBQWtDLENBQUE7SUFDbEMsb0lBQW9ELENBQUE7SUFDcEQsZ0hBQTBDLENBQUE7SUFDMUMsOEZBQWlDLENBQUE7SUFDakMsd0lBQXNELENBQUE7SUFDdEQsa0ZBQTJCLENBQUE7SUFDM0Isa0dBQW1DLENBQUE7SUFDbkMsc0dBQXFDLENBQUE7SUFDckMsMEdBQXVDLENBQUE7SUFDdkMsa0hBQTJDLENBQUE7SUFDM0MsMEZBQStCLENBQUE7QUFDbkMsQ0FBQyxFQTVTVyxjQUFjLDhCQUFkLGNBQWMsUUE0U3pCIn0=