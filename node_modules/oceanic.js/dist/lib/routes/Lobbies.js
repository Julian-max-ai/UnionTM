"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module REST/Channels */
const Routes = tslib_1.__importStar(require("../util/Routes"));
const QueryBuilder_1 = tslib_1.__importDefault(require("../util/QueryBuilder"));
const Lobby_1 = tslib_1.__importDefault(require("../structures/Lobby"));
const LobbyMember_1 = tslib_1.__importDefault(require("../structures/LobbyMember"));
const LobbyMessage_1 = tslib_1.__importDefault(require("../structures/LobbyMessage"));
function formatLobbyMember(member) {
    return {
        additional_name: member.additionalName,
        flags: member.flags,
        id: member.id,
        metadata: member.metadata
    };
}
/** Various methods for interacting with lobbies. Located at {@link Client#rest | Client#rest}{@link RESTManager#lobbies | .lobbies}. */
class Lobbies {
    _manager;
    constructor(manager) {
        this._manager = manager;
    }
    _getBearerAuth(accessToken) {
        if (accessToken === undefined) {
            return this._manager.client.options.auth;
        }
        return accessToken.startsWith("Bearer ") ? accessToken : `Bearer ${accessToken}`;
    }
    /**
     * Add a member to a lobby.
     * @param lobbyID The ID of the lobby to add the member to.
     * @param userID The ID of the user to add to the lobby.
     * @param options The options for adding the member to the lobby.
     */
    async addMember(lobbyID, userID, options) {
        options = this._manager.client.util._freeze(options);
        return this._manager.authRequest({
            method: "PUT",
            path: Routes.LOBBY_MEMBER(lobbyID, userID),
            json: options ? {
                additional_name: options.additionalName,
                flags: options.flags,
                metadata: options.metadata
            } : undefined
        }).then(data => new LobbyMember_1.default(data, this._manager.client, lobbyID));
    }
    /**
     * Bulk update members in a lobby.
     * @param lobbyID The ID of the lobby to update members in.
     * @param members The members to update.
     */
    async bulkUpdateMembers(lobbyID, members) {
        members = this._manager.client.util._freeze(members);
        return this._manager.authRequest({
            method: "POST",
            path: Routes.LOBBY_MEMBERS_BULK(lobbyID),
            json: members.map(member => ({
                ...formatLobbyMember(member),
                remove_member: member.removeMember
            }))
        }).then(data => data.map(member => new LobbyMember_1.default(member, this._manager.client, lobbyID)));
    }
    /**
     * Create a new lobby.
     * @param options The options for creating the lobby.
     * @caching This method **does not** cache its result.
     */
    async create(options) {
        options = this._manager.client.util._freeze(options);
        return this._manager.authRequest({
            method: "POST",
            path: Routes.LOBBIES,
            json: {
                flags: options?.flags,
                metadata: options?.metadata,
                members: options?.members?.map(formatLobbyMember),
                idle_timeout_seconds: options?.idleTimeoutSeconds
            }
        }).then(data => new Lobby_1.default(data, this._manager.client));
    }
    /**
     * Create an invite for the current user to join a lobby's linked channel. This requires bearer token authentication.
     * @param lobbyID The ID of the lobby to create the invite for.
     * @param accessToken An optional access token to use instead of the client's token. This overrides the client's auth.
     */
    async createCurrentUserInvite(lobbyID, accessToken) {
        return this._manager.request({
            method: "POST",
            path: Routes.LOBBY_MEMBER_INVITES(lobbyID, "@me"),
            auth: this._getBearerAuth(accessToken)
        });
    }
    /**
     * Create an invite for a user to join a lobby's linked channel. This requires bearer token authentication.
     * @param lobbyID The ID of the lobby to create the invite for.
     * @param userID The ID of the user to create the invite for.
     * @param accessToken An optional access token to use instead of the client's token. This overrides the client's auth.
     */
    async createInvite(lobbyID, userID, accessToken) {
        return this._manager.request({
            method: "POST",
            path: Routes.LOBBY_MEMBER_INVITES(lobbyID, userID),
            auth: this._getBearerAuth(accessToken)
        });
    }
    /**
     * Create a message in a lobby. This requires bearer token authentication.
     * @param lobbyID The ID of the lobby to create the message in.
     * @param options The options for creating the message.
     * @param accessToken An optional access token to use instead of the client's token. This overrides the client's auth.
     */
    async createMessage(lobbyID, options, accessToken) {
        options = this._manager.client.util._freeze(options);
        return this._manager.request({
            method: "POST",
            path: Routes.LOBBY_MESSAGES(lobbyID),
            auth: this._getBearerAuth(accessToken),
            json: {
                content: options.content,
                flags: options.flags,
                metadata: options.metadata
            }
        }).then(data => new LobbyMessage_1.default(data, this._manager.client));
    }
    /**
     * Delete a lobby.
     * @param lobbyID The ID of the lobby to delete.
     */
    async delete(lobbyID) {
        await this._manager.authRequest({
            method: "DELETE",
            path: Routes.LOBBY(lobbyID)
        });
    }
    /**
     * Edit a lobby.
     * @param lobbyID The ID of the lobby to edit.
     * @param options The options for editing the lobby.
     */
    async edit(lobbyID, options) {
        options = this._manager.client.util._freeze(options);
        return this._manager.authRequest({
            method: "PATCH",
            path: Routes.LOBBY(lobbyID),
            json: {
                flags: options?.flags,
                metadata: options?.metadata,
                members: options?.members?.map(formatLobbyMember),
                idle_timeout_seconds: options?.idleTimeoutSeconds
            }
        }).then(data => new Lobby_1.default(data, this._manager.client));
    }
    /**
     * Get a lobby.
     * @param lobbyID The ID of the lobby to retrieve.
     */
    async get(lobbyID) {
        return this._manager.authRequest({
            method: "GET",
            path: Routes.LOBBY(lobbyID)
        }).then(data => new Lobby_1.default(data, this._manager.client));
    }
    /**
     * Get messages in a lobby. This requires bearer token authentication.
     * @param lobbyID The ID of the lobby to get messages from.
     * @param options The options for getting the messages.
     * @param accessToken An optional access token to use instead of the client's token. This overrides the client's auth.
     */
    async getMessages(lobbyID, options, accessToken) {
        options = this._manager.client.util._freeze(options);
        const query = new QueryBuilder_1.default();
        query.setIfPresent("limit", options?.limit);
        return this._manager.request({
            method: "GET",
            path: Routes.LOBBY_MESSAGES(lobbyID),
            auth: this._getBearerAuth(accessToken),
            query
        }).then(data => data.map(message => new LobbyMessage_1.default(message, this._manager.client)));
    }
    /**
     * Join an existing lobby or create a new lobby.
     * @param options The options for joining or creating the lobby.
     * @caching This method **does not** cache its result.
     */
    async joinOrCreate(options) {
        options = this._manager.client.util._freeze(options);
        const requestOptions = {
            method: "PUT",
            path: Routes.LOBBIES,
            json: {
                flags: options.flags,
                idle_timeout_seconds: options.idleTimeoutSeconds,
                lobby_metadata: options.lobbyMetadata,
                member_metadata: options.memberMetadata,
                secret: options.secret
            }
        };
        if (options.accessToken === undefined) {
            return this._manager.authRequest(requestOptions).then(data => new Lobby_1.default(data, this._manager.client));
        }
        return this._manager.request({
            ...requestOptions,
            auth: this._getBearerAuth(options.accessToken)
        }).then(data => new Lobby_1.default(data, this._manager.client));
    }
    /**
     * Leave a lobby. This requires bearer token authentication.
     * @param lobbyID The ID of the lobby to leave.
     * @param accessToken An optional access token to use instead of the client's token. This overrides the client's auth.
     */
    async leave(lobbyID, accessToken) {
        await this._manager.request({
            method: "DELETE",
            path: Routes.LOBBY_MEMBER(lobbyID, "@me"),
            auth: this._getBearerAuth(accessToken)
        });
    }
    /**
     * Link a lobby to a channel. This requires bearer token authentication and the `CAN_LINK_LOBBY` flag on the member.
     * @param lobbyID The ID of the lobby to link the channel to.
     * @param channelID The ID of the channel to link the lobby to.
     * @param accessToken An optional access token to use instead of the client's token. This overrides the client's auth.
     */
    async linkChannel(lobbyID, channelID, accessToken) {
        return this._manager.request({
            method: "PATCH",
            path: Routes.LOBBY_CHANNEL_LINKING(lobbyID),
            auth: this._getBearerAuth(accessToken),
            json: { channel_id: channelID }
        }).then(data => new Lobby_1.default(data, this._manager.client));
    }
    /**
     * Remove a member from a lobby.
     * @param lobbyID The ID of the lobby to remove the member from.
     * @param userID The ID of the user to remove from the lobby.
     */
    async removeMember(lobbyID, userID) {
        await this._manager.authRequest({
            method: "DELETE",
            path: Routes.LOBBY_MEMBER(lobbyID, userID)
        });
    }
    /**
     * Unlink a lobby from a channel. This requires bearer token authentication and the `CAN_LINK_LOBBY` flag on the member.
     * @param lobbyID The ID of the lobby to unlink the channel from.
     * @param accessToken An optional access token to use instead of the client's token. This overrides the client's auth.
     */
    async unlinkChannel(lobbyID, accessToken) {
        return this.linkChannel(lobbyID, undefined, accessToken);
    }
    /**
     * Update the moderation metadata for a message in a lobby.
     * @param lobbyID The ID of the lobby the message is in.
     * @param messageID The ID of the message to update the metadata for.
     * @param metadata The metadata to set for the message.
     */
    async updateMessageModerationMetadata(lobbyID, messageID, metadata) {
        await this._manager.authRequest({
            method: "PUT",
            path: Routes.LOBBY_MESSAGE_MODERATION_METADATA(lobbyID, messageID),
            json: metadata
        });
    }
}
exports.default = Lobbies;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9iYmllcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9yb3V0ZXMvTG9iYmllcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw0QkFBNEI7QUFDNUIsK0RBQXlDO0FBQ3pDLGdGQUFnRDtBQUloRCx3RUFBd0M7QUFDeEMsb0ZBQW9EO0FBQ3BELHNGQUFzRDtBQUV0RCxTQUFTLGlCQUFpQixDQUFDLE1BQXdDO0lBQy9ELE9BQU87UUFDSCxlQUFlLEVBQUUsTUFBTSxDQUFDLGNBQWM7UUFDdEMsS0FBSyxFQUFZLE1BQU0sQ0FBQyxLQUFLO1FBQzdCLEVBQUUsRUFBZSxNQUFNLENBQUMsRUFBRTtRQUMxQixRQUFRLEVBQVMsTUFBTSxDQUFDLFFBQVE7S0FDbkMsQ0FBQztBQUNOLENBQUM7QUFFRCx3SUFBd0k7QUFDeEksTUFBcUIsT0FBTztJQUNoQixRQUFRLENBQWM7SUFDOUIsWUFBWSxPQUFvQjtRQUM1QixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztJQUM1QixDQUFDO0lBRU8sY0FBYyxDQUFDLFdBQW9CO1FBQ3ZDLElBQUksV0FBVyxLQUFLLFNBQVMsRUFBRSxDQUFDO1lBQzVCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUssQ0FBQztRQUM5QyxDQUFDO1FBQ0QsT0FBTyxXQUFXLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFVBQVUsV0FBVyxFQUFFLENBQUM7SUFDckYsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFlLEVBQUUsTUFBYyxFQUFFLE9BQStCO1FBQzVFLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JELE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FB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