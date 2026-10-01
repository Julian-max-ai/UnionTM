/** @module ExtendedUser */
import User from "./User";
import type * as Types from "../types/namespaced";
import type Client from "../Client";
/** Represents the currently authenticated user. */
export default class ExtendedUser extends User {
    /** The user's email. (always null for bots) */
    email: string | null;
    /** The flags of the user. */
    flags: number;
    /** The locale of the user */
    locale?: string;
    /** If the user has mfa enabled on their account */
    mfaEnabled: boolean;
    /** If this user's email is verified. (always true for bots) */
    verified: boolean;
    constructor(data: Types.Users.RawOAuthUser, client: Client);
    protected update(data: Partial<Types.Users.RawOAuthUser>): void;
    /**
     * Modify this user.
     * @param options The options for editing the user.
     */
    edit(options: Types.Users.EditSelfUserOptions): Promise<ExtendedUser>;
    toJSON(): Types.JSON.JSONExtendedUser;
}
