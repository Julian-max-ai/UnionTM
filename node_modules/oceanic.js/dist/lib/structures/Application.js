"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module Application */
const ClientApplication_1 = tslib_1.__importDefault(require("./ClientApplication"));
const OAuthGuild_1 = tslib_1.__importDefault(require("./OAuthGuild"));
const User_1 = tslib_1.__importDefault(require("./User"));
const Team_1 = tslib_1.__importDefault(require("./Team"));
const SKU_1 = tslib_1.__importDefault(require("./SKU"));
const Routes = tslib_1.__importStar(require("../util/Routes"));
/** Represents an application. */
class Application extends ClientApplication_1.default {
    aliases;
    /** The approved console types for social SDK builds */
    approvedConsoles;
    /** The approximate number of guilds the application is in. */
    approximateGuildCount;
    /** Approximate count of users that have OAuth2 authorizations for the application */
    approximateUserAuthorizationCount;
    /** The approximate number of users this application has been installed by. */
    approximateUserInstallCount;
    /** Approximate count of guilds the application's bot is in */
    botApproximateGuildCount;
    /** Whether the application's bot is disabled by Discord (default false) */
    botDisabled;
    /** @deprecated If the bot can be invited by anyone. */
    botPublic;
    /** Whether the application's bot is quarantined by Discord; quarantined bots cannot join more guilds or start new direct messages (default false) */
    botQuarantined;
    /** @deprecated If authorizing the bot requires a code grant. */
    botRequireCodeGrant;
    /** The URL which users will be directed to when connecting their account in the application to their Discord account */
    connectionEntrypointURL;
    /** This application's rich presence invite cover image hash, if any. */
    coverImage;
    /** The current guild creator monetization state of the application */
    creatorMonetizationState;
    /** This application's default custom authorization link, if any. */
    customInstallURL;
    /** The URL used for deep linking during OAuth2 authorization on mobile devices */
    deeplinkURI;
    /** The description of the application. */
    description;
    /** The companies that developed the application */
    developers;
    /** The state of this application's discoverability. */
    discoverabilityState;
    /** The { @link Constants~ApplicationDiscoveryEligibilityFlags | flags } for this application's discovery eligibility. */
    discoveryEligibilityFlags;
    /** The configuration for the application's embedded activity */
    embeddedActivityConfig;
    /** The ID of the EULA required to play the application's game */
    eulaID;
    /** If webhook events are enabled for the app. */
    eventWebhooksStatus;
    /**	List of Webhook event types the app subscribes to. */
    eventWebhooksTypes;
    /** Event webhooks URL for the app to receive webhook events. */
    eventWebhooksURL;
    /** The unique executables of the application's game */
    executables;
    /** The explicit content filter for this application. */
    explicitContentFilter;
    // flags is in the parent class
    /** If this application is a game sold on Discord, the guild to which it has been linked. This will only be present if received via {@link REST/Applications.getCurrent | `/applications/@me`}. */
    guild;
    /** If this application is a game sold on Discord, the ID of the guild to which it has been linked. */
    guildID;
    /** Whether the Discord client is allowed to hook into the application's game directly */
    hook;
    /** The icon hash of the application. */
    icon;
    /** Settings for this application's in-app authorization link, if enabled. */
    installParams;
    /** Whether only the application owner can add the integration */
    integrationPublic;
    /** Whether the integration will only be added upon completion of a full OAuth2 token exchange */
    integrationRequireCodeGrant;
    /** The install types available for this application. */
    integrationTypes;
    /** The configs for the install types available for this application. */
    integrationTypesConfig;
    /** This applications interaction endpoint url, if any. */
    interactionsEndpointURL;
    /** The event types that will be received like http interactions, if interactionsVersion is 2. */
    interactionsEventTypes;
    /** The interactions version of this application. */
    interactionsVersion;
    /** What guilds the application can be authorized in */
    internalGuildRestriction;
    /** Whether the application is discoverable in the application directory */
    isDiscoverable;
    /** If this application is monetized. */
    isMonetized;
    /** Whether the application is verified */
    isVerified;
    /** The maximum possible participants in the application's embedded activity (-1 for no limit) */
    maxParticipants;
    /** The { @link Constants~ApplicationMonetizationEligibilityFlags | flags } for this application's monetization eligibility. */
    monetizationEligibilityFlags;
    /** This application's monetization state. */
    monetizationState;
    /** The name of the application. */
    name;
    /** Whether the application's game supports the Discord overlay (default false) */
    overlay;
    /** Whether to use the compatibility hook for the overlay (default false) */
    overlayCompatibilityHook;
    /** The { @link Constants~OverlayMethodFlags | methods of overlaying } that the application's game supports */
    overlayMethods;
    /** Whether the Discord overlay is known to be problematic with this application's game (default false) */
    overlayWarn;
    /** The owner of this application. */
    owner;
    /** The ID of the parent application */
    parentID;
    /** The pricing localization strategy used for the application's store presence */
    pricingLocalizationStrategy;
    /** If this application is a game sold on Discord, the id of the Game's SKU. */
    primarySKUID;
    /** A URL to this application's privacy policy. */
    privacyPolicyURL;
    /** The companies that published the application*/
    publishers;
    /** The redirect URIs for this application. */
    redirectURIs;
    /** This application's role connections verification url, if any. */
    roleConnectionsVerificationURL;
    /** The state of this application's RPC application. */
    rpcApplicationState;
    /** A list of rpc origin urls, if rpc is enabled. */
    rpcOrigins;
    /** If this application is a game sold on Discord, the slug that links to its store page. */
    slug;
    /** The state of this application's store application state. */
    storeApplicationState;
    /** Whether the application has public subscriptions or products available for purchase */
    storefrontAvailable;
    /** The tags for this application. */
    tags;
    /** The team that owns this application. */
    team;
    /** A URL to this application's terms of service. */
    termsOfServiceURL;
    /** The third party SKUs of the application's game */
    thirdPartySKUs;
    /** The type of this application. */
    type;
    /** The state of this application's verification. */
    verificationState;
    /** The bot's hex encoded public key. */
    verifyKey;
    constructor(data, client) {
        super(data, client);
        this.description = data.description;
        this.hook = data.hook;
        this.icon = data.icon;
        this.isDiscoverable = data.is_discoverable;
        this.isMonetized = data.is_monetized;
        this.isVerified = data.is_verified;
        this.name = data.name;
        this.storefrontAvailable = data.storefront_available;
        this.type = data.type;
        this.verifyKey = data.verify_key;
        this.update(data);
    }
    update(data) {
        super.update(data);
        if (data.aliases !== undefined)
            this.aliases = data.aliases;
        if (data.approved_consoles !== undefined)
            this.approvedConsoles = data.approved_consoles;
        if (data.approximate_guild_count !== undefined)
            this.approximateGuildCount = data.approximate_guild_count;
        if (data.approximate_user_authorization_count !== undefined)
            this.approximateUserAuthorizationCount = data.approximate_user_authorization_count;
        if (data.approximate_user_install_count !== undefined)
            this.approximateUserInstallCount = data.approximate_user_install_count;
        if (data.bot_approximate_guild_count !== undefined)
            this.botApproximateGuildCount = data.bot_approximate_guild_count;
        if (data.bot_disabled !== undefined)
            this.botDisabled = data.bot_disabled;
        if (data.bot_quarantined !== undefined)
            this.botQuarantined = data.bot_quarantined;
        if (data.bot_public !== undefined)
            this.botPublic = data.bot_public;
        if (data.bot_require_code_grant !== undefined)
            this.botRequireCodeGrant = data.bot_require_code_grant;
        if (data.connection_entrypoint_url !== undefined)
            this.connectionEntrypointURL = data.connection_entrypoint_url;
        if (data.cover_image !== undefined)
            this.coverImage = data.cover_image;
        if (data.creator_monetization_state !== undefined)
            this.creatorMonetizationState = data.creator_monetization_state;
        if (data.custom_install_url !== undefined)
            this.customInstallURL = data.custom_install_url;
        if (data.deeplink_uri !== undefined)
            this.deeplinkURI = data.deeplink_uri;
        if (data.description !== undefined)
            this.description = data.description;
        if (data.developers !== undefined)
            this.developers = data.developers;
        if (data.discoverability_state !== undefined)
            this.discoverabilityState = data.discoverability_state;
        if (data.discovery_eligibility_flags !== undefined)
            this.discoveryEligibilityFlags = data.discovery_eligibility_flags;
        if (data.embedded_activity_config !== undefined) {
            this.embeddedActivityConfig = {
                activityPreviewVideoAssetID: data.embedded_activity_config.activity_preview_video_asset_id,
                applicationID: data.embedded_activity_config.application_id,
                blockedLocales: data.embedded_activity_config.blocked_locales,
                clientPlatformConfig: Object.entries(data.embedded_activity_config.client_platform_config).reduce((obj, [key, value]) => {
                    obj[key] = {
                        labelType: value.label_type,
                        labelUntil: value.label_until ? new Date(value.label_until) : null,
                        omitBadgeFromSurfaces: value.omit_badge_from_surfaces,
                        releasePhase: value.release_phase
                    };
                    return obj;
                }, {}),
                defaultOrientationLockState: data.embedded_activity_config.default_orientation_lock_state,
                displaysAdvertisements: data.embedded_activity_config.displays_advertisements,
                freePeriodEndsAt: data.embedded_activity_config.free_period_ends_at ? new Date(data.embedded_activity_config.free_period_ends_at) : null,
                freePeriodStartsAt: data.embedded_activity_config.free_period_starts_at ? new Date(data.embedded_activity_config.free_period_starts_at) : null,
                hasCspException: data.embedded_activity_config.has_csp_exception,
                legacyResponsiveAspectRatio: data.embedded_activity_config.legacy_responsive_aspect_ratio,
                premiumTierRequirement: data.embedded_activity_config.premium_tier_requirement,
                requiresAgeGate: data.embedded_activity_config.requires_age_gate,
                shelfRank: data.embedded_activity_config.shelf_rank,
                supportedLocales: data.embedded_activity_config.supported_locales,
                supportedPlatforms: data.embedded_activity_config.supported_platforms,
                tabletDefaultOrientationLockState: data.embedded_activity_config.tablet_default_orientation_lock_state
            };
        }
        if (data.eula_id !== undefined)
            this.eulaID = data.eula_id;
        if (data.event_webhooks_status !== undefined)
            this.eventWebhooksStatus = data.event_webhooks_status;
        if (data.event_webhooks_types !== undefined)
            this.eventWebhooksTypes = data.event_webhooks_types;
        if (data.event_webhooks_url !== undefined)
            this.eventWebhooksURL = data.event_webhooks_url;
        if (data.executables !== undefined) {
            this.executables = data.executables.map(executable => ({
                isLauncher: executable.is_launcher,
                name: executable.name,
                os: executable.os
            }));
        }
        if (data.explicit_content_filter !== undefined)
            this.explicitContentFilter = data.explicit_content_filter;
        if (data.flags !== undefined)
            this.flags = data.flags;
        if (data.guild !== undefined)
            this.guild = data.guild ? new OAuthGuild_1.default(data.guild, this.client) : null;
        if (data.guild_id !== undefined)
            this.guildID = data.guild_id;
        if (data.hook !== undefined)
            this.hook = data.hook;
        if (data.icon !== undefined)
            this.icon = data.icon;
        if (data.install_params !== undefined)
            this.installParams = data.install_params;
        if (data.integration_public !== undefined)
            this.integrationPublic = data.integration_public;
        if (data.integration_require_code_grant !== undefined)
            this.integrationRequireCodeGrant = data.integration_require_code_grant;
        if (data.integration_types !== undefined)
            this.integrationTypes = data.integration_types;
        if (data.integration_types_config !== undefined)
            this.integrationTypesConfig = Object.entries(data.integration_types_config).reduce((obj, [key, value]) => {
                obj[key] = {
                    oauth2InstallParams: value.oauth2_install_params
                };
                return obj;
            }, {});
        if (data.interactions_endpoint_url !== undefined)
            this.interactionsEndpointURL = data.interactions_endpoint_url;
        if (data.interactions_event_types !== undefined)
            this.interactionsEventTypes = data.interactions_event_types;
        if (data.interactions_version !== undefined)
            this.interactionsVersion = data.interactions_version;
        if (data.internal_guild_restriction !== undefined)
            this.internalGuildRestriction = data.internal_guild_restriction;
        if (data.is_discoverable !== undefined)
            this.isDiscoverable = data.is_discoverable;
        if (data.is_monetized !== undefined)
            this.isMonetized = data.is_monetized;
        if (data.is_verified !== undefined)
            this.isVerified = data.is_verified;
        if (data.max_participants !== undefined)
            this.maxParticipants = data.max_participants;
        if (data.monetization_eligibility_flags !== undefined)
            this.monetizationEligibilityFlags = data.monetization_eligibility_flags;
        if (data.monetization_state !== undefined)
            this.monetizationState = data.monetization_state;
        if (data.name !== undefined)
            this.name = data.name;
        if (data.overlay !== undefined)
            this.overlay = data.overlay;
        if (data.overlay_compatibility_hook !== undefined)
            this.overlayCompatibilityHook = data.overlay_compatibility_hook;
        if (data.overlay_methods !== undefined)
            this.overlayMethods = data.overlay_methods;
        if (data.overlay_warn !== undefined)
            this.overlayWarn = data.overlay_warn;
        if (data.owner !== undefined)
            this.owner = data.owner ? new User_1.default(data.owner, this.client) : null;
        if (data.parent_id !== undefined)
            this.parentID = data.parent_id;
        if (data.pricing_localization_strategy !== undefined)
            this.pricingLocalizationStrategy = data.pricing_localization_strategy;
        if (data.primary_sku_id !== undefined)
            this.primarySKUID = data.primary_sku_id;
        if (data.privacy_policy_url !== undefined)
            this.privacyPolicyURL = data.privacy_policy_url;
        if (data.publishers !== undefined)
            this.publishers = data.publishers;
        if (data.redirect_uris !== undefined)
            this.redirectURIs = data.redirect_uris;
        if (data.role_connections_verification_url !== undefined)
            this.roleConnectionsVerificationURL = data.role_connections_verification_url;
        if (data.rpc_application_state !== undefined)
            this.rpcApplicationState = data.rpc_application_state;
        if (data.rpc_origins !== undefined)
            this.rpcOrigins = data.rpc_origins;
        if (data.slug !== undefined)
            this.slug = data.slug;
        if (data.store_application_state !== undefined)
            this.storeApplicationState = data.store_application_state;
        if (data.storefront_available !== undefined)
            this.storefrontAvailable = data.storefront_available;
        if (data.tags !== undefined)
            this.tags = data.tags;
        if (data.team !== undefined)
            this.team = data.team ? new Team_1.default(data.team, this.client) : null;
        if (data.terms_of_service_url !== undefined)
            this.termsOfServiceURL = data.terms_of_service_url;
        if (data.third_party_skus !== undefined)
            this.thirdPartySKUs = data.third_party_skus.map(sku => new SKU_1.default(sku, this.client));
        if (data.type !== undefined)
            this.type = data.type;
        if (data.verification_state !== undefined)
            this.verificationState = data.verification_state;
        if (data.verify_key !== undefined)
            this.verifyKey = data.verify_key;
    }
    /**
     * The url of this application's cover image.
     * @param format The format the url should be.
     * @param size The dimensions of the image.
     */
    coverImageURL(format, size) {
        return this.coverImage ? this.client.util.formatImage(Routes.APPLICATION_COVER(this.id, this.coverImage), format, size) : null;
    }
    /**
     * The url of this application's icon.
     * @param format The format the url should be.
     * @param size The dimensions of the image.
     */
    iconURL(format, size) {
        return this.icon === null ? null : this.client.util.formatImage(Routes.APPLICATION_ICON(this.id, this.icon), format, size);
    }
    toJSON() {
        return {
            ...super.toJSON(),
            aliases: this.aliases,
            approvedConsoles: this.approvedConsoles,
            approximateGuildCount: this.approximateGuildCount,
            approximateUserAuthorizationCount: this.approximateUserAuthorizationCount,
            approximateUserInstallCount: this.approximateUserInstallCount,
            botApproximateGuildCount: this.botApproximateGuildCount,
            botDisabled: this.botDisabled,
            botPublic: this.botPublic,
            botQuarantined: this.botQuarantined,
            botRequireCodeGrant: this.botRequireCodeGrant,
            connectionEntrypointURL: this.connectionEntrypointURL,
            coverImage: this.coverImage,
            creatorMonetizationState: this.creatorMonetizationState,
            customInstallURL: this.customInstallURL,
            deeplinkURI: this.deeplinkURI,
            description: this.description,
            developers: this.developers,
            discoverabilityState: this.discoverabilityState,
            discoveryEligibilityFlags: this.discoveryEligibilityFlags,
            embeddedActivityConfig: this.embeddedActivityConfig,
            eulaID: this.eulaID,
            eventWebhooksStatus: this.eventWebhooksStatus,
            eventWebhooksTypes: this.eventWebhooksTypes,
            eventWebhooksURL: this.eventWebhooksURL,
            executables: this.executables,
            explicitContentFilter: this.explicitContentFilter,
            guild: this.guild?.toJSON() ?? null,
            guildID: this.guildID,
            hook: this.hook,
            icon: this.icon,
            installParams: this.installParams,
            integrationPublic: this.integrationPublic,
            integrationRequireCodeGrant: this.integrationRequireCodeGrant,
            integrationTypes: this.integrationTypes,
            integrationTypesConfig: this.integrationTypesConfig,
            interactionsEndpointURL: this.interactionsEndpointURL,
            interactionsEventTypes: this.interactionsEventTypes,
            interactionsVersion: this.interactionsVersion,
            internalGuildRestriction: this.internalGuildRestriction,
            isDiscoverable: this.isDiscoverable,
            isMonetized: this.isMonetized,
            isVerified: this.isVerified,
            maxParticipants: this.maxParticipants,
            monetizationEligibilityFlags: this.monetizationEligibilityFlags,
            monetizationState: this.monetizationState,
            name: this.name,
            overlay: this.overlay,
            overlayCompatibilityHook: this.overlayCompatibilityHook,
            overlayMethods: this.overlayMethods,
            overlayWarn: this.overlayWarn,
            owner: this.owner?.toJSON() ?? null,
            parentID: this.parentID,
            pricingLocalizationStrategy: this.pricingLocalizationStrategy,
            primarySKUID: this.primarySKUID,
            privacyPolicyURL: this.privacyPolicyURL,
            publishers: this.publishers,
            redirectURIs: this.redirectURIs,
            roleConnectionsVerificationURL: this.roleConnectionsVerificationURL,
            rpcApplicationState: this.rpcApplicationState,
            rpcOrigins: this.rpcOrigins,
            slug: this.slug,
            storeApplicationState: this.storeApplicationState,
            storefrontAvailable: this.storefrontAvailable,
            tags: this.tags,
            team: this.team?.toJSON() ?? null,
            termsOfServiceURL: this.termsOfServiceURL,
            thirdPartySKUs: this.thirdPartySKUs?.map(sku => sku.toJSON()),
            type: this.type,
            verificationState: this.verificationState,
            verifyKey: this.verifyKey
        };
    }
}
exports.default = Application;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBwbGljYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvc3RydWN0dXJlcy9BcHBsaWNhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwwQkFBMEI7QUFDMUIsb0ZBQW9EO0FBQ3BELHNFQUFzQztBQUN0QywwREFBMEI7QUFDMUIsMERBQTBCO0FBQzFCLHdEQUF3QjtBQXFCeEIsK0RBQXlDO0FBRXpDLGlDQUFpQztBQUNqQyxNQUFxQixXQUFZLFNBQVEsMkJBQWlCO0lBQ3RELE9BQU8sQ0FBaUI7SUFDeEIsdURBQXVEO0lBQ3ZELGdCQUFnQixDQUFnQztJQUNoRCw4REFBOEQ7SUFDOUQscUJBQXFCLENBQVU7SUFDL0IscUZBQXFGO0lBQ3JGLGlDQUFpQyxDQUFVO0lBQzNDLDhFQUE4RTtJQUM5RSwyQkFBMkIsQ0FBVTtJQUNyQyw4REFBOEQ7SUFDOUQsd0JBQXdCLENBQVU7SUFDbEMsMkVBQTJFO0lBQzNFLFdBQVcsQ0FBVztJQUN0Qix1REFBdUQ7SUFDdkQsU0FBUyxDQUFXO0lBQ3BCLHFKQUFxSjtJQUNySixjQUFjLENBQVc7SUFDekIsZ0VBQWdFO0lBQ2hFLG1CQUFtQixDQUFXO0lBQzlCLHdIQUF3SDtJQUN4SCx1QkFBdUIsQ0FBVTtJQUNqQyx3RUFBd0U7SUFDeEUsVUFBVSxDQUFpQjtJQUMzQixzRUFBc0U7SUFDdEUsd0JBQXdCLENBQVU7SUFDbEMsb0VBQW9FO0lBQ3BFLGdCQUFnQixDQUFVO0lBQzFCLGtGQUFrRjtJQUNsRixXQUFXLENBQVU7SUFDckIsMENBQTBDO0lBQzFDLFdBQVcsQ0FBUztJQUNwQixtREFBbUQ7SUFDbkQsVUFBVSxDQUFnRDtJQUMxRCx1REFBdUQ7SUFDdkQsb0JBQW9CLENBQW1DO0lBQ3ZELHlIQUF5SDtJQUN6SCx5QkFBeUIsQ0FBVTtJQUNuQyxnRUFBZ0U7SUFDaEUsc0JBQXNCLENBQTZDO0lBQ25FLGlFQUFpRTtJQUNqRSxNQUFNLENBQVU7SUFDaEIsaURB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QUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDMUUsSUFBSSxJQUFJLENBQUMsZUFBZSxLQUFLLFNBQVM7WUFBRSxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUM7UUFDbkYsSUFBSSxJQUFJLENBQUMsVUFBVSxLQUFLLFNBQVM7WUFBRSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDcEUsSUFBSSxJQUFJLENBQUMsc0JBQXNCLEtBQUssU0FBUztZQUFFLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUM7UUFDdEcsSUFBSSxJQUFJLENBQUMseUJBQXlCLEtBQUssU0FBUztZQUFFLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxJQUFJLENBQUMseUJBQXlCLENBQUM7UUFDaEgsSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLFNBQVM7WUFBRSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDdkUsSUFBSSxJQUFJLENBQUMsMEJBQTBCLEtBQUssU0FBUztZQUFFLElBQUksQ0FBQyx3QkFBd0IsR0FBRyxJQUFJLENBQUMsMEJBQTBCLENBQUM7UUFDbkgsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEtBQUssU0FBUztZQUFFLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUM7UUFDM0YsSUFBSSxJQUFJLENBQUMsWUFBWSxLQUFLLFNBQVM7WUFBRSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDMUUsSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLFNBQVM7WUFBRSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDeEUsSUFBSSxJQUFJLENBQUMsVUFBVSxLQUFLLFNBQVM7WUFBRSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDckUsSUFBSSxJQUFJLENBQUMscUJBQXFC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