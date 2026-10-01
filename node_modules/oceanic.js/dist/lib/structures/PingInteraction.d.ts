/** @module PingInteraction */
import Interaction from "./Interaction";
import type * as Types from "../types/namespaced";
import { type InteractionTypes } from "../Constants";
import type Client from "../Client";
/** Represents a PING interaction. This will not be received over a gateway connection. */
export default class PingInteraction extends Interaction {
    type: InteractionTypes.PING;
    constructor(data: Types.Interactions.RawPingInteraction, client: Client);
    /**
     * Responds to the interaction with a `PONG`.
     */
    pong(): Promise<Types.Interactions.InteractionCallbackResponse>;
    toJSON(): Types.JSON.JSONPingInteraction;
}
