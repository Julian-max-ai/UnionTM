"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Routes = tslib_1.__importStar(require("../util/Routes"));
/** Represents a primary guild. */
class PrimaryGuild {
    /** The badge hash of this clan. */
    badge;
    client;
    identityEnabled;
    identityGuildID;
    /** The tag of this clan, shown beside messages. */
    tag;
    constructor(data, client) {
        Object.defineProperty(this, "client", {
            value: client,
            enumerable: false,
            writable: false,
            configurable: false
        });
        this.badge = data.badge;
        this.identityEnabled = data.identity_enabled;
        this.identityGuildID = data.identity_guild_id;
        this.tag = data.tag;
        this.update(data);
    }
    update(data) {
        if (data.badge !== undefined) {
            this.badge = data.badge;
        }
        if (data.identity_enabled !== undefined) {
            this.identityEnabled = data.identity_enabled;
        }
        if (data.identity_guild_id !== undefined) {
            this.identityGuildID = data.identity_guild_id;
        }
        if (data.tag !== undefined) {
            this.tag = data.tag;
        }
    }
    /**
     * The url of this guild's icon.
     * @param format The format the url should be.
     * @param size The dimensions of the image.
     */
    badgeURL(format, size) {
        if (this.identityGuildID === null || this.badge === null)
            return null;
        return this.client.util.formatImage(Routes.CLAN_ICON(this.identityGuildID, this.badge), format, size);
    }
    toJSON() {
        return {
            badge: this.badge,
            identityEnabled: this.identityEnabled,
            identityGuildID: this.identityGuildID,
            tag: this.tag
        };
    }
}
exports.default = PrimaryGuild;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJpbWFyeUd1aWxkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL3N0cnVjdHVyZXMvUHJpbWFyeUd1aWxkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLCtEQUF5QztBQUl6QyxrQ0FBa0M7QUFDbEMsTUFBcUIsWUFBWTtJQUM3QixtQ0FBbUM7SUFDbkMsS0FBSyxDQUFnQjtJQUNyQixNQUFNLENBQVU7SUFDaEIsZUFBZSxDQUFpQjtJQUNoQyxlQUFlLENBQWdCO0lBQy9CLG1EQUFtRDtJQUNuRCxHQUFHLENBQWdCO0lBQ25CLFlBQVksSUFBeUIsRUFBRSxNQUFjO1FBQ2pELE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRTtZQUNsQyxLQUFLLEVBQVMsTUFBTTtZQUNwQixVQUFVLEVBQUksS0FBSztZQUNuQixRQUFRLEVBQU0sS0FBSztZQUNuQixZQUFZLEVBQUUsS0FBSztTQUN0QixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDeEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7UUFDN0MsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUM7UUFDOUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUVTLE1BQU0sQ0FBQyxJQUFrQztRQUMvQyxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssU0FBUyxFQUFFLENBQUM7WUFDM0IsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQzVCLENBQUM7UUFFRCxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsS0FBSyxTQUFTLEVBQUUsQ0FBQztZQUN0QyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztRQUNqRCxDQUFDO1FBRUQsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEtBQUssU0FBUyxFQUFFLENBQUM7WUFDdkMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUM7UUFDbEQsQ0FBQztRQUVELElBQUksSUFBSSxDQUFDLEdBQUcsS0FBSyxTQUFTLEVBQUUsQ0FBQztZQUN6QixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDeEIsQ0FBQztJQUNMLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsUUFBUSxDQUFDLE1BQW9CLEVBQUUsSUFBYTtRQUN4QyxJQUFJLElBQUksQ0FBQyxlQUFlLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssSUFBSTtZQUFFLE9BQU8sSUFBSSxDQUFDO1FBQ3RFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzFHLENBQUM7SUFFRCxNQUFNO1FBQ0YsT0FBTztZQUNILEtBQUssRUFBWSxJQUFJLENBQUMsS0FBSztZQUMzQixlQUFlLEVBQUUsSUFBSSxDQUFDLGVBQWU7WUFDckMsZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlO1lBQ3JDLEdBQUcsRUFBYyxJQUFJLENBQUMsR0FBRztTQUM1QixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBMURELCtCQTBEQyJ9