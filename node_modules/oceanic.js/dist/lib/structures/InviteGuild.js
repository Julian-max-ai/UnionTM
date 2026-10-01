"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module InviteGuild */
const Base_1 = tslib_1.__importDefault(require("./Base"));
const Routes = tslib_1.__importStar(require("../util/Routes"));
/** Represents a guild received via an invite. */
class InviteGuild extends Base_1.default {
    _cachedCompleteGuild;
    /** The hash of this guild's banner. */
    banner;
    /** The description of this guild. */
    description;
    /** The [features](https://discord.com/developers/docs/resources/guild#guild-object-guild-features) this guild has. */
    features;
    /** The icon hash of this guild. */
    icon;
    /** The name of this guild. */
    name;
    /** The [nsfw level](https://discord.com/developers/docs/resources/guild#guild-object-guild-nsfw-level) of this guild. */
    nsfwLevel;
    /** The number of nitro boosts this guild has. */
    premiumSubscriptionCount;
    /** The invite splash hash of this guild. */
    splash;
    /** The vanity url of this guild. Only present in guilds with the `VANITY_URL` feature. */
    vanityURLCode;
    /** The [verification level](https://discord.com/developers/docs/resources/guild#guild-object-verification-level) of this guild. */
    verificationLevel;
    constructor(data, client) {
        super(data.id, client);
        this.banner = data.banner;
        this.description = data.description;
        this.features = data.features;
        this.name = data.name;
        this.nsfwLevel = data.nsfw_level;
        this.icon = data.icon;
        this.premiumSubscriptionCount = data.premium_subscription_count;
        this.splash = data.splash;
        this.vanityURLCode = data.vanity_url_code;
        this.verificationLevel = data.verification_level;
    }
    /** The complete guild this InviteGuild represents, if cached. */
    get completeGuild() {
        return this._cachedCompleteGuild ??= this.client.guilds.get(this.id);
    }
    /**
     * The url of this guild's banner.
     * @param format The format the url should be.
     * @param size The dimensions of the image.
     */
    bannerURL(format, size) {
        return this.banner === null ? null : this.client.util.formatImage(Routes.BANNER(this.id, this.banner), format, size);
    }
    /** Get the complete guild this InviteGuild represents. */
    async getCompleteGuild() {
        if (this.completeGuild)
            return this.completeGuild;
        const guild = await this.client.rest.guilds.get(this.id);
        this._cachedCompleteGuild = guild;
        return guild;
    }
    /**
     * The url of this guild's icon.
     * @param format The format the url should be.
     * @param size The dimensions of the image.
     */
    iconURL(format, size) {
        return this.icon === null ? null : this.client.util.formatImage(Routes.GUILD_ICON(this.id, this.icon), format, size);
    }
    /**
     * The url of this guild's invite splash.
     * @param format The format the url should be.
     * @param size The dimensions of the image.
     */
    splashURL(format, size) {
        return this.splash === null ? null : this.client.util.formatImage(Routes.GUILD_SPLASH(this.id, this.splash), format, size);
    }
    toJSON() {
        return {
            ...super.toJSON(),
            banner: this.banner,
            description: this.description,
            features: this.features,
            icon: this.icon,
            name: this.name,
            nsfwLevel: this.nsfwLevel,
            premiumSubscriptionCount: this.premiumSubscriptionCount,
            splash: this.splash,
            vanityURLCode: this.vanityURLCode,
            verificationLevel: this.verificationLevel
        };
    }
}
exports.default = InviteGuild;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW52aXRlR3VpbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvc3RydWN0dXJlcy9JbnZpdGVHdWlsZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwwQkFBMEI7QUFDMUIsMERBQTBCO0FBSzFCLCtEQUF5QztBQUV6QyxpREFBaUQ7QUFDakQsTUFBcUIsV0FBWSxTQUFRLGNBQUk7SUFDakMsb0JBQW9CLENBQVM7SUFDckMsdUNBQXVDO0lBQ3ZDLE1BQU0sQ0FBZ0I7SUFDdEIscUNBQXFDO0lBQ3JDLFdBQVcsQ0FBZ0I7SUFDM0Isc0hBQXNIO0lBQ3RILFFBQVEsQ0FBc0I7SUFDOUIsbUNBQW1DO0lBQ25DLElBQUksQ0FBZ0I7SUFDcEIsOEJBQThCO0lBQzlCLElBQUksQ0FBUztJQUNiLHlIQUF5SDtJQUN6SCxTQUFTLENBQWtCO0lBQzNCLGlEQUFpRDtJQUNqRCx3QkFBd0IsQ0FBVTtJQUNsQyw0Q0FBNEM7SUFDNUMsTUFBTSxDQUFnQjtJQUN0QiwwRkFBMEY7SUFDMUYsYUFBYSxDQUFnQjtJQUM3QixtSUFBbUk7SUFDbkksaUJBQWlCLENBQXFCO0lBQ3RDLFlBQVksSUFBaUMsRUFBRSxNQUFjO1FBQ3pELEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUMxQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDcEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQzlCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDakMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyx3QkFBd0IsR0FBRyxJQUFJLENBQUMsMEJBQTBCLENBQUM7UUFDaEUsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzFCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQztRQUMxQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDO0lBQ3JELENBQUM7SUFFRCxpRUFBaUU7SUFDakUsSUFBSSxhQUFhO1FBQ2IsT0FBTyxJQUFJLENBQUMsb0JBQW9CLEtBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN6RSxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILFNBQVMsQ0FBQyxNQUFvQixFQUFFLElBQWE7UUFDekMsT0FBTyxJQUFJLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDekgsQ0FBQztJQUVELDBEQUEwRDtJQUMxRCxLQUFLLENBQUMsZ0JBQWdCO1FBQ2xCLElBQUksSUFBSSxDQUFDLGFBQWE7WUFBRSxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDbEQsTUFBTSxLQUFLLEdBQUcsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsb0JBQW9CLEdBQUcsS0FBSyxDQUFDO1FBQ2xDLE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsT0FBTyxDQUFDLE1BQW9CLEVBQUUsSUFBYTtRQUN2QyxPQUFPLElBQUksQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN6SCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILFNBQVMsQ0FBQyxNQUFvQixFQUFFLElBQWE7UUFDekMsT0FBTyxJQUFJLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDL0gsQ0FBQztJQUVRLE1BQU07UUFDWCxPQUFPO1lBQ0gsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQ2pCLE1BQU0sRUFBb0IsSUFBSSxDQUFDLE1BQU07WUFDckMsV0FBVyxFQUFlLElBQUksQ0FBQyxXQUFXO1lBQzFDLFFBQVEsRUFBa0IsSUFBSSxDQUFDLFFBQVE7WUFDdkMsSUFBSSxFQUFzQixJQUFJLENBQUMsSUFBSTtZQUNuQyxJQUFJLEVBQXNCLElBQUksQ0FBQyxJQUFJO1lBQ25DLFNBQVMsRUFBaUIsSUFBSSxDQUFDLFNBQVM7WUFDeEMsd0JBQXdCLEVBQUUsSUFBSSxDQUFDLHdCQUF3QjtZQUN2RCxNQUFNLEVBQW9CLElBQUksQ0FBQyxNQUFNO1lBQ3JDLGFBQWEsRUFBYSxJQUFJLENBQUMsYUFBYTtZQUM1QyxpQkFBaUIsRUFBUyxJQUFJLENBQUMsaUJBQWlCO1NBQ25ELENBQUM7SUFDTixDQUFDO0NBQ0o7QUEzRkQsOEJBMkZDIn0=