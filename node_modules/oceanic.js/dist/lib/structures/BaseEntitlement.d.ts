import Base from "./Base";
import type * as Types from "../types/namespaced";
import type { EntitlementTypes } from "../Constants";
import type Client from "../Client";
/** Represents a base entitlement. See {@link TestEntitlement | TestEntitlement} and {@link Entitlement | Entitlement}. */
export default class BaseEntitlement extends Base {
    applicationID: string;
    consumed: boolean;
    deleted: boolean;
    giftCodeFlags: number;
    guildID: string | null;
    promotionID: string | null;
    skuID: string;
    type: EntitlementTypes;
    userID: string | null;
    constructor(data: Types.Applications.RawBaseEntitlement, client: Client);
    /** Mark this entitlement as consumed. */
    consume(): Promise<void>;
    toJSON(): Types.JSON.JSONBaseEntitlement;
}
