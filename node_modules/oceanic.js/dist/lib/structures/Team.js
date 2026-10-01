"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module Team */
const Base_1 = tslib_1.__importDefault(require("./Base"));
/** Represents an OAuth team. */
class Team extends Base_1.default {
    /** The icon hash of this team. */
    icon;
    /** The members of this team. */
    members;
    /** The name of this team. */
    name;
    /** The owner of this team. */
    owner;
    /** The ID of the owner of this team. */
    ownerID;
    /** The status of the team's primary payout account */
    payoutAccountStatus;
    /** The statuses of the team's payout accounts */
    payoutAccountStatuses;
    /** The ID of the team's Stripe Connect account */
    stripeConnectAccountID;
    constructor(data, client) {
        super(data.id, client);
        this.icon = null;
        this.members = [];
        this.name = data.name;
        this.owner = this.client.users.get(data.owner_user_id);
        this.ownerID = data.owner_user_id;
        this.payoutAccountStatus = data.payout_account_status;
        this.payoutAccountStatuses = data.payout_account_statuses;
        this.stripeConnectAccountID = data.stripe_connect_account_id;
        this.update(data);
    }
    update(data) {
        if (data.icon !== undefined) {
            this.icon = data.icon;
        }
        if (data.name !== undefined) {
            this.name = data.name;
        }
        if (data.owner_user_id !== undefined) {
            this.owner = this.client.users.get(data.owner_user_id);
            this.ownerID = data.owner_user_id;
        }
        if (data.members !== undefined) {
            for (const member of this.members) {
                if (!data.members.some(m => m.user.id === member.user.id)) {
                    this.members.splice(this.members.indexOf(member), 1);
                }
            }
            for (const member of data.members) {
                if (!this.members.some(m => m.user.id === member.user.id)) {
                    this.members.push({
                        membershipState: member.membership_state,
                        role: member.role,
                        teamID: member.team_id,
                        user: this.client.users.update(member.user)
                    });
                }
            }
        }
        if (data.payout_account_status !== undefined) {
            this.payoutAccountStatus = data.payout_account_status;
        }
        if (data.payout_account_statuses !== undefined) {
            this.payoutAccountStatuses = data.payout_account_statuses;
        }
        if (data.stripe_connect_account_id !== undefined) {
            this.stripeConnectAccountID = data.stripe_connect_account_id;
        }
    }
    toJSON() {
        return {
            ...super.toJSON(),
            icon: this.icon,
            members: this.members,
            name: this.name,
            ownerID: this.ownerID
        };
    }
}
exports.default = Team;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGVhbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zdHJ1Y3R1cmVzL1RlYW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbUJBQW1CO0FBQ25CLDBEQUEwQjtBQU0xQixnQ0FBZ0M7QUFDaEMsTUFBcUIsSUFBSyxTQUFRLGNBQUk7SUFDbEMsa0NBQWtDO0lBQ2xDLElBQUksQ0FBZ0I7SUFDcEIsZ0NBQWdDO0lBQ2hDLE9BQU8sQ0FBdUM7SUFDOUMsNkJBQTZCO0lBQzdCLElBQUksQ0FBUztJQUNiLDhCQUE4QjtJQUM5QixLQUFLLENBQVE7SUFDYix3Q0FBd0M7SUFDeEMsT0FBTyxDQUFTO0lBQ2hCLHNEQUFzRDtJQUN0RCxtQkFBbUIsQ0FBa0M7SUFDckQsaURBQWlEO0lBQ2pELHFCQUFxQixDQUErQztJQUNwRSxrREFBa0Q7SUFDbEQsc0JBQXNCLENBQVU7SUFDaEMsWUFBWSxJQUFnQyxFQUFFLE1BQWM7UUFDeEQsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDbEMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQztRQUN0RCxJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixDQUFDO1FBQzFELElBQUksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUMseUJBQXlC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