/** @module RESTManager */
import RequestHandler from "./RequestHandler";
import type * as Types from "../types/namespaced";
import type Client from "../Client";
import Channels from "../routes/Channels";
import Guilds from "../routes/Guilds";
import Users from "../routes/Users";
import OAuth from "../routes/OAuth";
import Webhooks from "../routes/Webhooks";
import Applications from "../routes/Applications";
import Interactions from "../routes/Interactions";
import Miscellaneous from "../routes/Miscellaneous";
import Lobbies from "../routes/Lobbies";
/** A manager for all rest actions. */
export default class RESTManager {
    private _client;
    applications: Applications;
    channels: Channels;
    guilds: Guilds;
    handler: RequestHandler;
    interactions: Interactions;
    lobbies: Lobbies;
    misc: Miscellaneous;
    oauth: OAuth;
    users: Users;
    webhooks: Webhooks;
    constructor(client: Client, options?: Types.Client.RESTOptions);
    get client(): Client;
    get options(): Types.Client.RESTOptions;
    /** Alias for {@link RequestHandler#authRequest | RequestHandler#authRequest} */
    authRequest<T = unknown>(options: Omit<Types.RequestHandler.RequestOptions, "auth">): Promise<T>;
    /**
     * Get the gateway information related to your bot client.
     */
    getBotGateway(): Promise<Types.Gateway.GetBotGatewayResponse>;
    /**
     * Get the gateway information.
     */
    getGateway(): Promise<Types.Gateway.GetGatewayResponse>;
    /** Alias for {@link RequestHandler#request | RequestHandler#request} */
    request<T = unknown>(options: Types.RequestHandler.RequestOptions): Promise<T>;
}
