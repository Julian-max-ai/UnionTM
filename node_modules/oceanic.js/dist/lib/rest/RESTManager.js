"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module RESTManager */
const RequestHandler_1 = tslib_1.__importDefault(require("./RequestHandler"));
const Channels_1 = tslib_1.__importDefault(require("../routes/Channels"));
const Guilds_1 = tslib_1.__importDefault(require("../routes/Guilds"));
const Users_1 = tslib_1.__importDefault(require("../routes/Users"));
const OAuth_1 = tslib_1.__importDefault(require("../routes/OAuth"));
const Webhooks_1 = tslib_1.__importDefault(require("../routes/Webhooks"));
const Applications_1 = tslib_1.__importDefault(require("../routes/Applications"));
const Interactions_1 = tslib_1.__importDefault(require("../routes/Interactions"));
const Routes = tslib_1.__importStar(require("../util/Routes"));
const Miscellaneous_1 = tslib_1.__importDefault(require("../routes/Miscellaneous"));
const Lobbies_1 = tslib_1.__importDefault(require("../routes/Lobbies"));
/** A manager for all rest actions. */
class RESTManager {
    _client;
    applications;
    channels;
    guilds;
    handler;
    interactions;
    lobbies;
    misc;
    oauth;
    users;
    webhooks;
    constructor(client, options) {
        this.applications = new Applications_1.default(this);
        this.channels = new Channels_1.default(this);
        this._client = client;
        this.guilds = new Guilds_1.default(this);
        this.handler = new RequestHandler_1.default(this, options);
        this.interactions = new Interactions_1.default(this);
        this.lobbies = new Lobbies_1.default(this);
        this.misc = new Miscellaneous_1.default(this);
        this.oauth = new OAuth_1.default(this);
        this.users = new Users_1.default(this);
        this.webhooks = new Webhooks_1.default(this);
    }
    get client() {
        return this._client;
    }
    get options() {
        return this.handler.options;
    }
    /** Alias for {@link RequestHandler#authRequest | RequestHandler#authRequest} */
    async authRequest(options) {
        return this.handler.authRequest(options);
    }
    /**
     * Get the gateway information related to your bot client.
     */
    async getBotGateway() {
        return this.authRequest({
            method: "GET",
            path: Routes.GATEWAY_BOT
        }).then(data => ({
            url: data.url,
            shards: data.shards,
            sessionStartLimit: {
                total: data.session_start_limit.total,
                remaining: data.session_start_limit.remaining,
                resetAfter: data.session_start_limit.reset_after,
                maxConcurrency: data.session_start_limit.max_concurrency
            }
        }));
    }
    /**
     * Get the gateway information.
     */
    async getGateway() {
        return this.request({
            method: "GET",
            path: Routes.GATEWAY
        });
    }
    /** Alias for {@link RequestHandler#request | RequestHandler#request} */
    async request(options) {
        return this.handler.request(options);
    }
}
exports.default = RESTManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUkVTVE1hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvcmVzdC9SRVNUTWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwwQkFBMEI7QUFDMUIsOEVBQThDO0FBRzlDLDBFQUEwQztBQUMxQyxzRUFBc0M7QUFDdEMsb0VBQW9DO0FBQ3BDLG9FQUFvQztBQUNwQywwRUFBMEM7QUFDMUMsa0ZBQWtEO0FBQ2xELGtGQUFrRDtBQUNsRCwrREFBeUM7QUFDekMsb0ZBQW9EO0FBQ3BELHdFQUF3QztBQUV4QyxzQ0FBc0M7QUFDdEMsTUFBcUIsV0FBVztJQUNwQixPQUFPLENBQVM7SUFDeEIsWUFBWSxDQUFlO0lBQzNCLFFBQVEsQ0FBVztJQUNuQixNQUFNLENBQVM7SUFDZixPQUFPLENBQWlCO0lBQ3hCLFlBQVksQ0FBZTtJQUMzQixPQUFPLENBQVU7SUFDakIsSUFBSSxDQUFnQjtJQUNwQixLQUFLLENBQVE7SUFDYixLQUFLLENBQVE7SUFDYixRQUFRLENBQVc7SUFDbkIsWUFBWSxNQUFjLEVBQUUsT0FBa0M7UUFDMUQsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLHNCQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGtCQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDdEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGdCQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLHdCQUFjLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxzQkFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxpQkFBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSx1QkFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxlQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLGVBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksa0JBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsSUFBSSxNQUFNO1FBQ04sT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hCLENBQUM7SUFDRCxJQUFJLE9BQU87UUFDUCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO0lBQ2hDLENBQUM7SUFFRCxnRkFBZ0Y7SUFDaEYsS0FBSyxDQUFDLFdBQVcsQ0FBYyxPQUEwRDtRQUNyRixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFJLE9BQU8sQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRDs7T0FFRztJQUNILEtBQUssQ0FBQyxhQUFhO1FBQ2YsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUF5QztZQUM1RCxNQUFNLEVBQUUsS0FBSztZQUNiLElBQUksRUFBSSxNQUFNLENBQUMsV0FBVztTQUM3QixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNiLEdBQUcsRUFBZ0IsSUFBSSxDQUFDLEdBQUc7WUFDM0IsTUFBTSxFQUFhLElBQUksQ0FBQyxNQUFNO1lBQzlCLGlCQUFpQixFQUFFO2dCQUNmLEtBQUssRUFBVyxJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSztnQkFDOUMsU0FBUyxFQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTO2dCQUNsRCxVQUFVLEVBQU0sSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVc7Z0JBQ3BELGNBQWMsRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsZUFBZTthQUMzRDtTQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ1IsQ0FBQztJQUVEOztPQUVHO0lBQ0gsS0FBSyxDQUFDLFVBQVU7UUFDWixPQUFPLElBQUksQ0FBQyxPQUFPLENBQW1DO1lBQ2xELE1BQU0sRUFBRSxLQUFLO1lBQ2IsSUFBSSxFQUFJLE1BQU0sQ0FBQyxPQUFPO1NBQ3pCLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCx3RUFBd0U7SUFDeEUsS0FBSyxDQUFDLE9BQU8sQ0FBYyxPQUE0QztRQUNuRSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFJLE9BQU8sQ0FBQyxDQUFDO0lBQzVDLENBQUM7Q0FDSjtBQXZFRCw4QkF1RUMifQ==