/** @module InviteRole */
import Base from "./Base";
import Permission from "./Permission";
import type Guild from "./Guild";
import type InviteGuild from "./InviteGuild";
import type Role from "./Role";
import type * as Types from "../types/namespaced";
import type Client from "../Client";
/** Represents a partial role for an invite. */
export default class InviteRole extends Base {
    private _cachedCompleteRole?;
    private _cachedGuild?;
    /**
     * The color of this role.
     * @deprecated Use {@link Role#colors | Role#colors.primaryColor} instead.
     */
    color: number;
    /** The colors of this role. */
    colors: Types.Guilds.RoleColors;
    guild: InviteGuild;
    /** The id of the guild this role is in. */
    guildID: string;
    /** The icon has of this role. */
    icon: string | null;
    /** The name of this role. */
    name: string;
    /** The permissions of this role. */
    permissions: Permission;
    /** The position of this role. */
    position: number;
    /** The unicode emoji of this role. */
    unicodeEmoji: string | null;
    constructor(data: Types.Guilds.RawInviteRole, client: Client, guildID: string, guild: InviteGuild);
    /** The guild this role is in. This will throw an error if the guild is not cached. */
    get completeGuild(): Guild;
    /** The complete role this InviteRole represents, if cached. */
    get completeRole(): Role | undefined;
    /** A string that will mention this role. */
    get mention(): string;
    /**
     * Delete this role.
     * @param reason The reason for deleting the role.
     */
    delete(reason?: string): Promise<void>;
    /**
     * Edit this role.
     * @param options The options for editing the role.
     */
    edit(options: Types.Guilds.EditRoleOptions): Promise<Role>;
    /** Get the complete role this InviteRole represents. */
    getCompleteRole(): Promise<Role>;
    toJSON(): Types.JSON.JSONInviteRole;
}
