/** @module Team */
import Base from "./Base";
import type User from "./User";
import type * as Types from "../types/namespaced";
import type Client from "../Client";
import type { TeamPayoutAccountStatus } from "../Constants";
/** Represents an OAuth team. */
export default class Team extends Base {
    /** The icon hash of this team. */
    icon: string | null;
    /** The members of this team. */
    members: Array<Types.Applications.TeamMember>;
    /** The name of this team. */
    name: string;
    /** The owner of this team. */
    owner?: User;
    /** The ID of the owner of this team. */
    ownerID: string;
    /** The status of the team's primary payout account */
    payoutAccountStatus?: TeamPayoutAccountStatus | null;
    /** The statuses of the team's payout accounts */
    payoutAccountStatuses?: Array<Types.Applications.TeamPayoutAccount>;
    /** The ID of the team's Stripe Connect account */
    stripeConnectAccountID?: string;
    constructor(data: Types.Applications.RawTeam, client: Client);
    protected update(data: Partial<Types.Applications.RawTeam>): void;
    toJSON(): Types.JSON.JSONTeam;
}
