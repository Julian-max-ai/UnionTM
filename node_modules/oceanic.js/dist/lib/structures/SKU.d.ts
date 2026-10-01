import Base from "./Base";
import type TestEntitlement from "./TestEntitlement";
import type Entitlement from "./Entitlement";
import type * as Types from "../types/namespaced";
import type Client from "../Client";
import type { EntitlementOwnerTypes, SKUAccessTypes, SKUTypes } from "../Constants";
export default class SKU extends Base {
    accessType: SKUAccessTypes;
    applicationID: string;
    dependentSKUID: string | null;
    features: [];
    /** The flags for this SKU. See {@link Constants~SKUFlags | SKUFlags}. */
    flags: number;
    manifestLabels: null;
    name: string;
    releaseDate: null;
    showAgeGate: boolean;
    slug: string;
    type: SKUTypes;
    constructor(data: Types.Applications.RawSKU, client: Client);
    /**
     * Create a test entitlement for this SKU.
     * @param ownerType The type of the owner to create the entitlement for.
     * @param ownerID The ID of the owner to create the entitlement for.
     */
    createTestEntitlement(ownerType: EntitlementOwnerTypes, ownerID: string): Promise<TestEntitlement>;
    /**
     * Get the entitlements for this SKU.
     * @param options The options for getting the entitlements.
     */
    getEntitlements(options?: Omit<Types.Applications.SearchEntitlementsOptions, "skuIDs">): Promise<Array<Entitlement | TestEntitlement>>;
    toJSON(): Types.JSON.JSONSKU;
}
