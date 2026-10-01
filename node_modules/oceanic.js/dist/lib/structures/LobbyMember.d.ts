/** @module LobbyMember */
import Base from "./Base";
import type Client from "../Client";
import type * as Types from "../types/namespaced";
export default class LobbyMember extends Base {
    additionalName?: string | null;
    flags?: number;
    lobbyID: string;
    metadata?: Record<string, string> | null;
    constructor(data: Types.Lobbies.RawLobbyMember, client: Client, lobbyID: string);
    /**
     * Remove this member from the lobby.
     */
    remove(): Promise<void>;
    toJSON(): Types.JSON.JSONLobbyMember;
}
