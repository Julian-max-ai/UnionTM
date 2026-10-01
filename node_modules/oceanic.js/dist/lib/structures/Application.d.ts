/** @module Application */
import ClientApplication from "./ClientApplication";
import OAuthGuild from "./OAuthGuild";
import User from "./User";
import Team from "./Team";
import SKU from "./SKU";
import type Client from "../Client";
import type * as Types from "../types/namespaced";
import type { ApplicationDiscoverabilityState, ApplicationEventWebhookEventType, ApplicationEventWebhookStatus, ApplicationExplicitContentFilterLevel, ApplicationIntegrationTypes, ApplicationInteractionsVersion, ApplicationInternalGuildRestriction, ApplicationMonetizationState, ApplicationType, ApplicationVerificationState, ApprovableConsoleType, ImageFormat, PricingLocalizationStrategy, RPCApplicationState, StoreApplicationState } from "../Constants";
/** Represents an application. */
export default class Application extends ClientApplication {
    aliases?: Array<string>;
    /** The approved console types for social SDK builds */
    approvedConsoles?: Array<ApprovableConsoleType>;
    /** The approximate number of guilds the application is in. */
    approximateGuildCount?: number;
    /** Approximate count of users that have OAuth2 authorizations for the application */
    approximateUserAuthorizationCount?: number;
    /** The approximate number of users this application has been installed by. */
    approximateUserInstallCount?: number;
    /** Approximate count of guilds the application's bot is in */
    botApproximateGuildCount?: number;
    /** Whether the application's bot is disabled by Discord (default false) */
    botDisabled?: boolean;
    /** @deprecated If the bot can be invited by anyone. */
    botPublic?: boolean;
    /** Whether the application's bot is quarantined by Discord; quarantined bots cannot join more guilds or start new direct messages (default false) */
    botQuarantined?: boolean;
    /** @deprecated If authorizing the bot requires a code grant. */
    botRequireCodeGrant?: boolean;
    /** The URL which users will be directed to when connecting their account in the application to their Discord account */
    connectionEntrypointURL?: string;
    /** This application's rich presence invite cover image hash, if any. */
    coverImage?: string | null;
    /** The current guild creator monetization state of the application */
    creatorMonetizationState?: number;
    /** This application's default custom authorization link, if any. */
    customInstallURL?: string;
    /** The URL used for deep linking during OAuth2 authorization on mobile devices */
    deeplinkURI?: string;
    /** The description of the application. */
    description: string;
    /** The companies that developed the application */
    developers?: Array<Types.Applications.ApplicationCompany>;
    /** The state of this application's discoverability. */
    discoverabilityState?: ApplicationDiscoverabilityState;
    /** The { @link Constants~ApplicationDiscoveryEligibilityFlags | flags } for this application's discovery eligibility. */
    discoveryEligibilityFlags?: number;
    /** The configuration for the application's embedded activity */
    embeddedActivityConfig?: Types.Applications.EmbeddedActivityConfig;
    /** The ID of the EULA required to play the application's game */
    eulaID?: string;
    /** If webhook events are enabled for the app. */
    eventWebhooksStatus?: ApplicationEventWebhookStatus;
    /**	List of Webhook event types the app subscribes to. */
    eventWebhooksTypes?: Array<ApplicationEventWebhookEventType>;
    /** Event webhooks URL for the app to receive webhook events. */
    eventWebhooksURL?: string | null;
    /** The unique executables of the application's game */
    executables?: Array<Types.Applications.ApplicationExecutable>;
    /** The explicit content filter for this application. */
    explicitContentFilter?: ApplicationExplicitContentFilterLevel;
    /** If this application is a game sold on Discord, the guild to which it has been linked. This will only be present if received via {@link REST/Applications.getCurrent | `/applications/@me`}. */
    guild?: OAuthGuild | null;
    /** If this application is a game sold on Discord, the ID of the guild to which it has been linked. */
    guildID?: string | null;
    /** Whether the Discord client is allowed to hook into the application's game directly */
    hook: boolean;
    /** The icon hash of the application. */
    icon: string | null;
    /** Settings for this application's in-app authorization link, if enabled. */
    installParams?: Types.OAuth.InstallParams;
    /** Whether only the application owner can add the integration */
    integrationPublic?: boolean;
    /** Whether the integration will only be added upon completion of a full OAuth2 token exchange */
    integrationRequireCodeGrant?: boolean;
    /** The install types available for this application. */
    integrationTypes?: Array<ApplicationIntegrationTypes>;
    /** The configs for the install types available for this application. */
    integrationTypesConfig?: Types.Applications.IntegrationTypesConfig;
    /** This applications interaction endpoint url, if any. */
    interactionsEndpointURL?: string | null;
    /** The event types that will be received like http interactions, if interactionsVersion is 2. */
    interactionsEventTypes?: Array<string>;
    /** The interactions version of this application. */
    interactionsVersion?: ApplicationInteractionsVersion;
    /** What guilds the application can be authorized in */
    internalGuildRestriction?: ApplicationInternalGuildRestriction;
    /** Whether the application is discoverable in the application directory */
    isDiscoverable: boolean;
    /** If this application is monetized. */
    isMonetized: boolean;
    /** Whether the application is verified */
    isVerified: boolean;
    /** The maximum possible participants in the application's embedded activity (-1 for no limit) */
    maxParticipants?: number;
    /** The { @link Constants~ApplicationMonetizationEligibilityFlags | flags } for this application's monetization eligibility. */
    monetizationEligibilityFlags?: number;
    /** This application's monetization state. */
    monetizationState?: ApplicationMonetizationState;
    /** The name of the application. */
    name: string;
    /** Whether the application's game supports the Discord overlay (default false) */
    overlay?: boolean;
    /** Whether to use the compatibility hook for the overlay (default false) */
    overlayCompatibilityHook?: boolean;
    /** The { @link Constants~OverlayMethodFlags | methods of overlaying } that the application's game supports */
    overlayMethods?: number;
    /** Whether the Discord overlay is known to be problematic with this application's game (default false) */
    overlayWarn?: boolean;
    /** The owner of this application. */
    owner?: User | null;
    /** The ID of the parent application */
    parentID?: string;
    /** The pricing localization strategy used for the application's store presence */
    pricingLocalizationStrategy?: PricingLocalizationStrategy;
    /** If this application is a game sold on Discord, the id of the Game's SKU. */
    primarySKUID?: string;
    /** A URL to this application's privacy policy. */
    privacyPolicyURL?: string;
    /** The companies that published the application*/
    publishers?: Array<Types.Applications.ApplicationCompany>;
    /** The redirect URIs for this application. */
    redirectURIs?: Array<string>;
    /** This application's role connections verification url, if any. */
    roleConnectionsVerificationURL?: string | null;
    /** The state of this application's RPC application. */
    rpcApplicationState?: RPCApplicationState;
    /** A list of rpc origin urls, if rpc is enabled. */
    rpcOrigins?: Array<string>;
    /** If this application is a game sold on Discord, the slug that links to its store page. */
    slug?: string;
    /** The state of this application's store application state. */
    storeApplicationState?: StoreApplicationState;
    /** Whether the application has public subscriptions or products available for purchase */
    storefrontAvailable: boolean;
    /** The tags for this application. */
    tags?: Array<string>;
    /** The team that owns this application. */
    team?: Team | null;
    /** A URL to this application's terms of service. */
    termsOfServiceURL?: string;
    /** The third party SKUs of the application's game */
    thirdPartySKUs?: Array<SKU>;
    /** The type of this application. */
    type: ApplicationType | null;
    /** The state of this application's verification. */
    verificationState?: ApplicationVerificationState;
    /** The bot's hex encoded public key. */
    verifyKey: string;
    constructor(data: Types.Applications.RawApplication, client: Client);
    protected update(data: Partial<Types.Applications.RawApplication>): void;
    /**
     * The url of this application's cover image.
     * @param format The format the url should be.
     * @param size The dimensions of the image.
     */
    coverImageURL(format?: ImageFormat, size?: number): string | null;
    /**
     * The url of this application's icon.
     * @param format The format the url should be.
     * @param size The dimensions of the image.
     */
    iconURL(format?: ImageFormat, size?: number): string | null;
    toJSON(): Types.JSON.JSONApplication;
}
