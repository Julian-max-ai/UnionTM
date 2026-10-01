import BaseEntitlement from "./BaseEntitlement";
import type * as Types from "../types/namespaced";
import type Client from "../Client";
/** Represents an entitlement. */
export default class Entitlement extends BaseEntitlement {
    endsAt: Date | null;
    startsAt: Date | null;
    subscriptionID: string;
    constructor(data: Types.Applications.RawEntitlement, client: Client);
    toJSON(): Types.JSON.JSONEntitlement;
}
