/** @module LobbyMessage */
import Base from "./Base";
import type User from "./User";
import type Client from "../Client";
import type * as Types from "../types/namespaced";
import type { MessageTypes } from "../Constants";
export default class LobbyMessage extends Base {
    applicationID: string;
    author: User;
    channelID: string;
    content: string;
    flags: number;
    lobbyID: string;
    lobbyMember?: Types.Lobbies.LobbyMessageMember;
    metadata?: Record<string, string> | null;
    moderationMetadata?: Record<string, string> | null;
    type: MessageTypes;
    constructor(data: Types.Lobbies.RawLobbyMessage, client: Client);
    toJSON(): Types.JSON.JSONLobbyMessage;
}
