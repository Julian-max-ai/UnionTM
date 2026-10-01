/** @module OAuthHelper */
import type RESTManager from "./RESTManager";
import type * as Types from "../types/namespaced";
import OAuthApplication from "../structures/OAuthApplication";
import Member from "../structures/Member";
import OAuthGuild from "../structures/OAuthGuild";
import ExtendedUser from "../structures/ExtendedUser";
import type Entitlement from "../structures/Entitlement";
import type TestEntitlement from "../structures/TestEntitlement";
/** A helper to make using authenticated oauth requests without needing a new client instance. */
export default class OAuthHelper {
    private _manager;
    private _token;
    constructor(manager: RESTManager, token: string);
    /**
     * Construct an oauth authorization url.
     * @param options The options to construct the url with.
     */
    static constructURL(options: Types.OAuth.OAuthURLOptions): string;
    addGuildMember(guildID: string, userID: string, options?: Omit<Types.Guilds.AddMemberOptions, "accessToken">): Promise<Member | undefined>;
    /**
     * Delete the authenticated user's role connection object for an application. This requires the `role_connections.write` scope.
     * @param applicationID The ID of the application.
     * @caching This method **does not** cache its result.
     */
    deleteRoleConnection(applicationID: string): Promise<void>;
    /**
     * Get the current OAuth2 application's information.
     */
    getApplication(): Promise<OAuthApplication>;
    /**
     * Get information about the current authorization.
     */
    getCurrentAuthorizationInformation(): Promise<Types.OAuth.AuthorizationInformation>;
    /**
     * Get the connections of the currently authenticated user.
     *
     * Note: Requires the `connections` scope.
     */
    getCurrentConnections(): Promise<Array<Types.OAuth.Connection>>;
    /**
     * Get the guild member information about the currently authenticated user.
     *
     * Note: Requires the `guilds.members.read` scope.
     * @param guild the ID of the guild
     */
    getCurrentGuildMember(guild: string): Promise<Member>;
    /**
     * Get the currently authenticated user's guilds. Note these are missing several properties gateway guilds have.
     */
    getCurrentGuilds(): Promise<Array<OAuthGuild>>;
    /**
     * Get the currently authenticated user's information.
     *
     * Note: This does not touch the client's cache in any way.
     */
    getCurrentUser(): Promise<ExtendedUser>;
    /**
     * Get the currently authenticated user's entitlements for an application.
     * @caching This method **does not** cache its result. If an entitlement's application id is the client's application id.
     * @caches {@link ClientApplication#entitlements | ClientApplication#entitlements}
     */
    getEntitlements(applicationID: string): Promise<Array<Entitlement | TestEntitlement>>;
    /**
     * Get the OIDC userinfo.
     *
     * Note: requires the `openid` scope.
     */
    getOIDCUserInfo(): Promise<Types.OAuth.OIDCUserInfo>;
    /**
     * Revoke the used access token.
     * @param options The options for revoking the token.
     */
    revokeToken(options: Omit<Types.OAuth.RevokeTokenOptions, "token">): Promise<void>;
    /**
     * Update the authenticated user's role connection object for an application. This requires the `role_connections.write` scope.
     * @param applicationID The ID of the application.
     * @param data The metadata to update.
     */
    updateRoleConnection(applicationID: string, data: Types.OAuth.UpdateUserApplicationRoleConnectionOptions): Promise<Types.OAuth.RoleConnection>;
}
