/** @module REST/OAuth */
import type * as Types from "../types/namespaced";
import OAuthApplication from "../structures/OAuthApplication";
import Member from "../structures/Member";
import type RESTManager from "../rest/RESTManager";
import OAuthHelper from "../rest/OAuthHelper";
import OAuthGuild from "../structures/OAuthGuild";
import ExtendedUser from "../structures/ExtendedUser";
import type Entitlement from "../structures/Entitlement";
import type TestEntitlement from "../structures/TestEntitlement";
/** Various methods for interacting with oauth. Located at {@link Client#rest | Client#rest}{@link RESTManager#oauth | .oauth}. */
export default class OAuth {
    private _manager;
    constructor(manager: RESTManager);
    /**
     * Get an access token for the application owner. If the application is owned by a team, this is restricted to `identify` & `applications.commands.update`.
     * @param options The options to for the client credentials grant.
     * @caching This method **does not** cache its result.
     */
    clientCredentialsGrant(options: Types.OAuth.ClientCredentialsTokenOptions): Promise<Types.OAuth.ClientCredentialsTokenResponse>;
    /**
     * Delete the authenticated user's role connection object for an application. This requires the `role_connections.write` scope.
     * @param applicationID The ID of the application.
     * @caching This method **does not** cache its result.
     */
    deleteUserRoleConnection(applicationID: string): Promise<void>;
    /**
     * Exchange a code for an access token.
     * @param options The options for exchanging the code.
     * @caching This method **does not** cache its result.
     */
    exchangeCode(options: Types.OAuth.ExchangeCodeOptions): Promise<Types.OAuth.ExchangeCodeResponse>;
    /**
     * Get the current OAuth2 application's information.
     * @caching This method **does not** cache its result.
     */
    getApplication(): Promise<OAuthApplication>;
    /**
     * Get information about the current authorization.
     *
     * Note: OAuth only. Bots cannot use this.
     * @caching This method **does** cache part of its result.
     * @caches {@link Client#users | Client#users}
     */
    getCurrentAuthorizationInformation(): Promise<Types.OAuth.AuthorizationInformation>;
    /**
     * Get the connections of the currently authenticated user.
     *
     * Note: Requires the `connections` scope when using oauth.
     * @caching This method **does not** cache its result.
     */
    getCurrentConnections(): Promise<Array<Types.OAuth.Connection>>;
    /**
     * Get the guild member information about the currently authenticated user.
     *
     * Note: OAuth only. Requires the `guilds.members.read` scope. Bots cannot use this.
     * @param guildID the ID of the guild
     * @caching This method **does not** cache its result.
     */
    getCurrentGuildMember(guildID: string): Promise<Member>;
    /**
     * Get the currently authenticated user's guilds. Note these are missing several properties gateway guilds have.
     * @param options The options for getting the current user's guilds.
     * @caching This method **does not** cache its result.
     */
    getCurrentGuilds(options?: Types.OAuth.GetCurrentGuildsOptions): Promise<Array<OAuthGuild>>;
    /**
     * Get the currently authenticated user's information.
     * @caching This method **does not** cache its result.
     */
    getCurrentUser(): Promise<ExtendedUser>;
    /**
     * Get the currently authenticated user's entitlements for an application.
     * @caching This method **may** cache its result. If an entitlement's application id is the client's application id.
     * @caches {@link ClientApplication#entitlements | ClientApplication#entitlements}
     */
    getEntitlements(applicationID: string): Promise<Array<Entitlement | TestEntitlement>>;
    /**
     * Get a helper instance that can be used with a specific access token.
     * @param accessToken The access token. Must be prefixed with `Bearer `.
     */
    getHelper(accessToken: string): OAuthHelper;
    /** Get the OIDC JWKS keys */
    getOIDCKeys(): Promise<Array<Types.OAuth.OIDCKey>>;
    /**
     * Get the OIDC userinfo.
     *
     * Note: requires the `openid` scope.
     */
    getOIDCUserInfo(): Promise<Types.OAuth.OIDCUserInfo>;
    /**
     * Get an application's role connection metadata records.
     * @param applicationID The ID of the application.
     * @caching This method **does not** cache its result.
     */
    getRoleConnectionsMetadata(applicationID: string): Promise<Array<Types.OAuth.RoleConnectionMetadata>>;
    /**
     * Get the authenticated user's role connection object for an application. This requires the `role_connections.write` scope.
     * @param applicationID The ID of the application.
     * @caching This method **does not** cache its result.
     */
    getUserRoleConnection(applicationID: string): Promise<Types.OAuth.RoleConnection>;
    /**
     * Refresh an existing access token.
     * @param options The options for refreshing the token.
     * @caching This method **does not** cache its result.
     */
    refreshToken(options: Types.OAuth.RefreshTokenOptions): Promise<Types.OAuth.RefreshTokenResponse>;
    /**
     * Revoke an access token.
     * @param options The options for revoking the token.
     * @caching This method **does not** cache its result.
     */
    revokeToken(options: Types.OAuth.RevokeTokenOptions): Promise<void>;
    /**
     * Update an application's role connections metadata.
     * @param applicationID The ID of the application.
     * @param metadata The metadata records.
     * @caching This method **does not** cache its result.
     */
    updateRoleConnectionsMetadata(applicationID: string, metadata: Array<Types.OAuth.RoleConnectionMetadata>): Promise<Array<Types.OAuth.RoleConnectionMetadata>>;
    /**
     * Update the authenticated user's role connection object for an application. This requires the `role_connections.write` scope.
     * @param applicationID The ID of the application.
     * @param data The metadata to update.
     * @caching This method **does not** cache its result.
     */
    updateUserRoleConnection(applicationID: string, data: Types.OAuth.UpdateUserApplicationRoleConnectionOptions): Promise<Types.OAuth.RoleConnection>;
}
