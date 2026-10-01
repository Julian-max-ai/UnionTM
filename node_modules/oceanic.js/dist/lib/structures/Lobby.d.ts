/** @module Lobby */
import Base from "./Base";
import GuildChannel from "./GuildChannel";
import LobbyMember from "./LobbyMember";
import type Client from "../Client";
import type * as Types from "../types/namespaced";
export default class Lobby extends Base {
    applicationID: string;
    flags?: number;
    linkedChannel?: GuildChannel | Types.Shared.Uncached;
    members: Array<LobbyMember>;
    metadata?: Record<string, string> | null;
    constructor(data: Types.Lobbies.RawLobby, client: Client);
    /**
     * Add a member to this lobby.
     * @param userID The ID of the user to add to the lobby.
     * @param options The options for adding the member to the lobby.
     */
    addMember(userID: string, options?: Types.Lobbies.AddLobbyMemberOptions): Promise<LobbyMember>;
    /**
     * Bulk update members in this lobby.
     * @param members The members to update.
     */
    bulkUpdateMembers(members: Array<Types.Lobbies.BulkUpdateLobbyMemberOptions>): Promise<Array<LobbyMember>>;
    /**
     * Create an invite for the current user to join this lobby's linked channel. This requires bearer token authentication.
     * @param accessToken An optional access token to use instead of the client's token. This overrides the client's auth.
     */
    createCurrentUserInvite(accessToken?: string): Promise<Types.Lobbies.LobbyInvite>;
    /**
     * Create an invite for a user to join this lobby's linked channel. This requires bearer token authentication.
     * @param userID The ID of the user to create the invite for.
     * @param accessToken An optional access token to use instead of the client's token. This overrides the client's auth.
     */
    createInvite(userID: string, accessToken?: string): Promise<Types.Lobbies.LobbyInvite>;
    /**
     * Create a message in this lobby. This requires bearer token authentication.
     * @param options The options for creating the message.
     * @param accessToken An optional access token to use instead of the client's token. This overrides the client's auth.
     */
    createMessage(options: Types.Lobbies.CreateLobbyMessageOptions, accessToken?: string): Promise<Types.Lobbies.LobbyMessage>;
    /** Delete this lobby. */
    delete(): Promise<void>;
    /**
     * Edit this lobby.
     * @param options The options for editing the lobby.
     */
    edit(options: Types.Lobbies.EditLobbyOptions): Promise<Lobby>;
    /**
     * Get messages in this lobby. This requires bearer token authentication.
     * @param options The options for getting the messages.
     * @param accessToken An optional access token to use instead of the client's token. This overrides the client's auth.
     */
    getMessages(options?: Types.Lobbies.GetLobbyMessagesOptions, accessToken?: string): Promise<Array<Types.Lobbies.LobbyMessage>>;
    /**
     * Leave this lobby. This requires bearer token authentication.
     * @param accessToken An optional access token to use instead of the client's token. This overrides the client's auth.
     */
    leave(accessToken?: string): Promise<void>;
    /**
     * Link this lobby to a channel. This requires bearer token authentication and the `CAN_LINK_LOBBY` flag on the member.
     * @param channelID The ID of the channel to link the lobby to.
     * @param accessToken An optional access token to use instead of the client's token. This overrides the client's auth.
     */
    linkChannel(channelID: string | undefined, accessToken?: string): Promise<Lobby>;
    /**
     * Remove a member from this lobby.
     * @param userID The ID of the user to remove from the lobby.
     */
    removeMember(userID: string): Promise<void>;
    toJSON(): Types.JSON.JSONLobby;
    /**
     * Unlink this lobby from a channel. This requires bearer token authentication and the `CAN_LINK_LOBBY` flag on the member.
     * @param accessToken An optional access token to use instead of the client's token. This overrides the client's auth.
     */
    unlinkChannel(accessToken?: string): Promise<Lobby>;
    /**
     * Update the moderation metadata for a message in this lobby.
     * @param messageID The ID of the message to update the metadata for.
     * @param metadata The metadata to set for the message.
     */
    updateMessageModerationMetadata(messageID: string, metadata: Record<string, string>): Promise<void>;
}
