import BaseEntitlement from "./BaseEntitlement";
import type * as Types from "../types/namespaced";
import type Client from "../Client";
/** Represents a test entitlement. */
export default class TestEntitlement extends BaseEntitlement {
    constructor(data: Types.Applications.RawTestEntitlement, client: Client);
    /** Delete this entitlement. */
    delete(): Promise<void>;
    toJSON(): Types.JSON.JSONTestEntitlement;
}
