"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Base_1 = tslib_1.__importDefault(require("./Base"));
class SKU extends Base_1.default {
    accessType; // undocumented
    applicationID;
    dependentSKUID;
    features; // undocumented
    /** The flags for this SKU. See {@link Constants~SKUFlags | SKUFlags}. */
    flags;
    manifestLabels; // undocumented
    name;
    releaseDate; // undocumented
    showAgeGate;
    slug;
    type;
    constructor(data, client) {
        super(data.id, client);
        this.accessType = data.access_type;
        this.applicationID = data.application_id;
        this.dependentSKUID = data.dependent_sku_id;
        this.features = data.features;
        this.flags = data.flags;
        this.manifestLabels = data.manifest_labels;
        this.name = data.name;
        this.releaseDate = data.release_date;
        this.showAgeGate = data.show_age_gate;
        this.slug = data.slug;
        this.type = data.type;
    }
    /**
     * Create a test entitlement for this SKU.
     * @param ownerType The type of the owner to create the entitlement for.
     * @param ownerID The ID of the owner to create the entitlement for.
     */
    async createTestEntitlement(ownerType, ownerID) {
        return this.client.rest.applications.createTestEntitlement(this.applicationID, {
            ownerID,
            ownerType,
            skuID: this.id
        });
    }
    /**
     * Get the entitlements for this SKU.
     * @param options The options for getting the entitlements.
     */
    async getEntitlements(options) {
        return this.client.rest.applications.getEntitlements(this.applicationID, { skuIDs: [this.id], ...options });
    }
    toJSON() {
        return {
            ...super.toJSON(),
            accessType: this.accessType,
            applicationID: this.applicationID,
            dependentSKUID: this.dependentSKUID,
            features: this.features,
            flags: this.flags,
            manifestLabels: this.manifestLabels,
            name: this.name,
            releaseDate: this.releaseDate,
            showAgeGate: this.showAgeGate,
            slug: this.slug,
            type: this.type
        };
    }
}
exports.default = SKU;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0tVLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL3N0cnVjdHVyZXMvU0tVLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDBEQUEwQjtBQU8xQixNQUFxQixHQUFJLFNBQVEsY0FBSTtJQUNqQyxVQUFVLENBQWlCLENBQUMsZUFBZTtJQUMzQyxhQUFhLENBQVM7SUFDdEIsY0FBYyxDQUFnQjtJQUM5QixRQUFRLENBQUssQ0FBQyxlQUFlO0lBQzdCLHlFQUF5RTtJQUN6RSxLQUFLLENBQVM7SUFDZCxjQUFjLENBQU8sQ0FBQyxlQUFlO0lBQ3JDLElBQUksQ0FBUztJQUNiLFdBQVcsQ0FBTyxDQUFDLGVBQWU7SUFDbEMsV0FBVyxDQUFVO0lBQ3JCLElBQUksQ0FBUztJQUNiLElBQUksQ0FBVztJQUNmLFlBQVksSUFBK0IsRUFBRSxNQUFjO1FBQ3ZELEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUNuQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUM7UUFDekMsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7UUFDNUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQzlCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN4QixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUM7UUFDM0MsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUNyQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDdEMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztJQUMxQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxTQUFnQyxFQUFFLE9BQWU7UUFDekUsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUMzRSxPQUFPO1lBQ1AsU0FBUztZQUNULEtBQUssRUFBRSxJQUFJLENBQUMsRUFBRTtTQUNqQixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLGVBQWUsQ0FBQyxPQUFzRTtRQUN4RixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxFQUFFLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDaEgsQ0FBQztJQUVRLE1BQU07UUFDWCxPQUFPO1lBQ0gsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQ2pCLFVBQVUsRUFBTSxJQUFJLENBQUMsVUFBVTtZQUMvQixhQUFhLEVBQUcsSUFBSSxDQUFDLGFBQWE7WUFDbEMsY0FBYyxFQUFFLElBQUksQ0FBQyxjQUFjO1lBQ25DLFFBQVEsRUFBUSxJQUFJLENBQUMsUUFBUTtZQUM3QixLQUFLLEVBQVcsSUFBSSxDQUFDLEtBQUs7WUFDMUIsY0FBYyxFQUFFLElBQUksQ0FBQyxjQUFjO1lBQ25DLElBQUksRUFBWSxJQUFJLENBQUMsSUFBSTtZQUN6QixXQUFXLEVBQUssSUFBSSxDQUFDLFdBQVc7WUFDaEMsV0FBVyxFQUFLLElBQUksQ0FBQyxXQUFXO1lBQ2hDLElBQUksRUFBWSxJQUFJLENBQUMsSUFBSTtZQUN6QixJQUFJLEVBQVksSUFBSSxDQUFDLElBQUk7U0FDNUIsQ0FBQztJQUNOLENBQUM7Q0FDSjtBQWpFRCxzQkFpRUMifQ==