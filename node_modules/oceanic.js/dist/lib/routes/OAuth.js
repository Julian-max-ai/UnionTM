"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Routes = tslib_1.__importStar(require("../util/Routes"));
const OAuthApplication_1 = tslib_1.__importDefault(require("../structures/OAuthApplication"));
const PartialApplication_1 = tslib_1.__importDefault(require("../structures/PartialApplication"));
const Member_1 = tslib_1.__importDefault(require("../structures/Member"));
const Webhook_1 = tslib_1.__importDefault(require("../structures/Webhook"));
const Integration_1 = tslib_1.__importDefault(require("../structures/Integration"));
const OAuthHelper_1 = tslib_1.__importDefault(require("../rest/OAuthHelper"));
const OAuthGuild_1 = tslib_1.__importDefault(require("../structures/OAuthGuild"));
const ExtendedUser_1 = tslib_1.__importDefault(require("../structures/ExtendedUser"));
const QueryBuilder_1 = tslib_1.__importDefault(require("../util/QueryBuilder"));
/** Various methods for interacting with oauth. Located at {@link Client#rest | Client#rest}{@link RESTManager#oauth | .oauth}. */
class OAuth {
    _manager;
    constructor(manager) {
        this._manager = manager;
    }
    /**
     * Get an access token for the application owner. If the application is owned by a team, this is restricted to `identify` & `applications.commands.update`.
     * @param options The options to for the client credentials grant.
     * @caching This method **does not** cache its result.
     */
    async clientCredentialsGrant(options) {
        options = this._manager.client.util._freeze(options);
        const form = new FormData();
        form.append("grant_type", "client_credentials");
        form.append("scope", options.scopes.join(" "));
        return this._manager.request({
            method: "POST",
            path: Routes.OAUTH_TOKEN,
            form,
            auth: (options.clientID ?? this._manager.client["_application"]) && options.clientSecret ? `Basic ${Buffer.from(`${options.clientID ?? this._manager.client["_application"].id}:${options.clientSecret}`).toString("base64")}` : true
        }).then(data => ({
            accessToken: data.access_token,
            expiresIn: data.expires_in,
            scopes: data.scope.split(" "),
            tokenType: data.token_type,
            webhook: data.webhook ? new Webhook_1.default(data.webhook, this._manager.client) : null
        }));
    }
    /**
     * Delete the authenticated user's role connection object for an application. This requires the `role_connections.write` scope.
     * @param applicationID The ID of the application.
     * @caching This method **does not** cache its result.
     */
    async deleteUserRoleConnection(applicationID) {
        await this._manager.authRequest({
            method: "DELETE",
            path: Routes.OAUTH_ROLE_CONNECTION(applicationID)
        });
    }
    /**
     * Exchange a code for an access token.
     * @param options The options for exchanging the code.
     * @caching This method **does not** cache its result.
     */
    async exchangeCode(options) {
        options = this._manager.client.util._freeze(options);
        const form = new FormData();
        form.append("client_id", options.clientID);
        form.append("client_secret", options.clientSecret);
        form.append("code", options.code);
        form.append("grant_type", "authorization_code");
        form.append("redirect_uri", options.redirectURI);
        return this._manager.authRequest({
            method: "POST",
            path: Routes.OAUTH_TOKEN,
            form
        }).then(data => ({
            accessToken: data.access_token,
            expiresIn: data.expires_in,
            refreshToken: data.refresh_token,
            scopes: data.scope.split(" "),
            tokenType: data.token_type,
            webhook: data.webhook ? new Webhook_1.default(data.webhook, this._manager.client) : null
        }));
    }
    /**
     * Get the current OAuth2 application's information.
     * @caching This method **does not** cache its result.
     */
    async getApplication() {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.OAUTH_APPLICATION
        }).then(data => new OAuthApplication_1.default(data, this._manager.client));
    }
    /**
     * Get information about the current authorization.
     *
     * Note: OAuth only. Bots cannot use this.
     * @caching This method **does** cache part of its result.
     * @caches {@link Client#users | Client#users}
     */
    async getCurrentAuthorizationInformation() {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.OAUTH_INFO
        }).then(data => ({
            application: new PartialApplication_1.default(data.application, this._manager.client),
            expires: new Date(data.expires),
            scopes: data.scopes,
            user: this._manager.client.users.update(data.user)
        }));
    }
    /**
     * Get the connections of the currently authenticated user.
     *
     * Note: Requires the `connections` scope when using oauth.
     * @caching This method **does not** cache its result.
     */
    async getCurrentConnections() {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.OAUTH_CONNECTIONS
        }).then(data => data.map(connection => ({
            friendSync: connection.friend_sync,
            id: connection.id,
            integrations: connection.integrations?.map(integration => new Integration_1.default(integration, this._manager.client)),
            name: connection.name,
            revoked: connection.revoked,
            showActivity: connection.show_activity,
            twoWayLink: connection.two_way_link,
            type: connection.type,
            verified: connection.verified,
            visibility: connection.visibility
        })));
    }
    /**
     * Get the guild member information about the currently authenticated user.
     *
     * Note: OAuth only. Requires the `guilds.members.read` scope. Bots cannot use this.
     * @param guildID the ID of the guild
     * @caching This method **does not** cache its result.
     */
    async getCurrentGuildMember(guildID) {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.OAUTH_GUILD_MEMBER(guildID)
        }).then(data => new Member_1.default(data, this._manager.client, guildID));
    }
    /**
     * Get the currently authenticated user's guilds. Note these are missing several properties gateway guilds have.
     * @param options The options for getting the current user's guilds.
     * @caching This method **does not** cache its result.
     */
    async getCurrentGuilds(options) {
        const query = new QueryBuilder_1.default();
        query.setIfPresent("after", options?.after);
        query.setIfPresent("before", options?.before);
        query.setIfPresent("limit", options?.limit);
        query.setIfPresent("with_counts", options?.withCounts);
        return this._manager.authRequest({
            method: "GET",
            path: Routes.OAUTH_GUILDS,
            query
        }).then(data => data.map(d => new OAuthGuild_1.default(d, this._manager.client)));
    }
    /**
     * Get the currently authenticated user's information.
     * @caching This method **does not** cache its result.
     */
    async getCurrentUser() {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.OAUTH_CURRENT_USER
        }).then(data => new ExtendedUser_1.default(data, this._manager.client));
    }
    /**
     * Get the currently authenticated user's entitlements for an application.
     * @caching This method **may** cache its result. If an entitlement's application id is the client's application id.
     * @caches {@link ClientApplication#entitlements | ClientApplication#entitlements}
     */
    async getEntitlements(applicationID) {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.OAUTH_ENTITLEMENTS(applicationID)
        }).then(data => data.map(d => this._manager.client.util.updateEntitlement(d)));
    }
    /**
     * Get a helper instance that can be used with a specific access token.
     * @param accessToken The access token. Must be prefixed with `Bearer `.
     */
    getHelper(accessToken) {
        return new OAuthHelper_1.default(this._manager, accessToken);
    }
    /** Get the OIDC JWKS keys */
    async getOIDCKeys() {
        return this._manager.request({
            method: "GET",
            path: Routes.OAUTH_OIDC_KEYS
        }).then(data => data.keys);
    }
    /**
     * Get the OIDC userinfo.
     *
     * Note: requires the `openid` scope.
     */
    async getOIDCUserInfo() {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.OAUTH_OIDC_USERINFO
        }).then(data => ({
            email: data.email,
            emailVerified: data.email_verified,
            locale: data.locale,
            nickname: data.nickname,
            picture: data.picture,
            preferredUsername: data.preferred_username,
            sub: data.sub
        }));
    }
    /**
     * Get an application's role connection metadata records.
     * @param applicationID The ID of the application.
     * @caching This method **does not** cache its result.
     */
    async getRoleConnectionsMetadata(applicationID) {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.ROLE_CONNECTIONS_METADATA(applicationID)
        }).then(data => data.map(d => ({
            description: d.description,
            descriptionLocalizations: d.description_localizations,
            key: d.key,
            name: d.name,
            nameLocalizations: d.name_localizations,
            type: d.type
        })));
    }
    /**
     * Get the authenticated user's role connection object for an application. This requires the `role_connections.write` scope.
     * @param applicationID The ID of the application.
     * @caching This method **does not** cache its result.
     */
    async getUserRoleConnection(applicationID) {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.OAUTH_ROLE_CONNECTION(applicationID)
        }).then(data => ({
            metadata: Object.entries(data.metadata).map(([key, value]) => ({
                [key]: {
                    description: value.description,
                    descriptionLocalizations: value.description_localizations,
                    key: value.key,
                    name: value.name,
                    nameLocalizations: value.name_localizations,
                    type: value.type
                }
            })).reduce((a, b) => ({ ...a, ...b })),
            platformName: data.platform_name,
            platformUsername: data.platform_username
        }));
    }
    /**
     * Refresh an existing access token.
     * @param options The options for refreshing the token.
     * @caching This method **does not** cache its result.
     */
    async refreshToken(options) {
        options = this._manager.client.util._freeze(options);
        const form = new FormData();
        form.append("client_id", options.clientID);
        form.append("client_secret", options.clientSecret);
        form.append("grant_type", "refresh_token");
        form.append("refresh_token", options.refreshToken);
        return this._manager.authRequest({
            method: "POST",
            path: Routes.OAUTH_TOKEN,
            form
        }).then(data => ({
            accessToken: data.access_token,
            expiresIn: data.expires_in,
            refreshToken: data.refresh_token,
            scopes: data.scope.split(" "),
            tokenType: data.token_type
        }));
    }
    /**
     * Revoke an access token.
     * @param options The options for revoking the token.
     * @caching This method **does not** cache its result.
     */
    async revokeToken(options) {
        options = this._manager.client.util._freeze(options);
        const form = new FormData();
        form.append("client_id", options.clientID);
        form.append("client_secret", options.clientSecret);
        form.append("token", options.token);
        await this._manager.authRequest({
            method: "POST",
            path: Routes.OAUTH_TOKEN_REVOKE,
            form
        });
    }
    /**
     * Update an application's role connections metadata.
     * @param applicationID The ID of the application.
     * @param metadata The metadata records.
     * @caching This method **does not** cache its result.
     */
    async updateRoleConnectionsMetadata(applicationID, metadata) {
        return this._manager.authRequest({
            method: "PUT",
            path: Routes.ROLE_CONNECTIONS_METADATA(applicationID),
            json: metadata.map(d => ({
                description: d.description,
                description_localizations: d.descriptionLocalizations,
                key: d.key,
                name: d.name,
                name_localizations: d.nameLocalizations,
                type: d.type
            }))
        }).then(data => data.map(d => ({
            description: d.description,
            descriptionLocalizations: d.description_localizations,
            key: d.key,
            name: d.name,
            nameLocalizations: d.name_localizations,
            type: d.type
        })));
    }
    /**
     * Update the authenticated user's role connection object for an application. This requires the `role_connections.write` scope.
     * @param applicationID The ID of the application.
     * @param data The metadata to update.
     * @caching This method **does not** cache its result.
     */
    async updateUserRoleConnection(applicationID, data) {
        return this._manager.authRequest({
            method: "PUT",
            path: Routes.OAUTH_ROLE_CONNECTION(applicationID),
            json: {
                metadata: data.metadata,
                platform_name: data.platformName,
                platform_username: data.platformUsername
            }
        }).then(d => ({
            metadata: Object.entries(d.metadata).map(([key, value]) => ({
                [key]: {
                    description: value.description,
                    descriptionLocalizations: value.description_localizations,
                    key: value.key,
                    name: value.name,
                    nameLocalizations: value.name_localizations,
                    type: value.type
                }
            })).reduce((a, b) => ({ ...a, ...b })),
            platformName: d.platform_name,
            platformUsername: d.platform_username
        }));
    }
}
exports.default = OAuth;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT0F1dGguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvcm91dGVzL09BdXRoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLCtEQUF5QztBQUN6Qyw4RkFBOEQ7QUFDOUQsa0dBQWtFO0FBQ2xFLDBFQUEwQztBQUMxQyw0RUFBNEM7QUFDNUMsb0ZBQW9EO0FBRXBELDhFQUE4QztBQUM5QyxrRkFBa0Q7QUFDbEQsc0ZBQXNEO0FBQ3RELGdGQUFnRDtBQUloRCxrSUFBa0k7QUFDbEksTUFBcUIsS0FBSztJQUNkLFFBQVEsQ0FBYztJQUM5QixZQUFZLE9BQW9CO1FBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO0lBQzVCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsS0FBSyxDQUFDLHNCQUFzQixDQUFDLE9BQWtEO1FBQzNFLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JELE1BQU0sSUFBSSxHQUFHLElBQUksUUFBUSxFQUFFLENBQUM7UUFDNUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQy9DLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQWdEO1lBQ3hFLE1BQU0sRUFBRSxNQUFNO1lBQ2QsSUFBSSxFQUFJLE1BQU0sQ0FBQyxXQUFXO1lBQzFCLElBQUk7WUFDSixJQUFJLEVBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLElBQUksT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsU0FBUyxNQUFNLENBQUMs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