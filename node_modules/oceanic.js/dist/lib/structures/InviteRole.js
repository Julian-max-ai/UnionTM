"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module InviteRole */
const Base_1 = tslib_1.__importDefault(require("./Base"));
const Permission_1 = tslib_1.__importDefault(require("./Permission"));
const Errors_1 = require("../util/Errors");
/** Represents a partial role for an invite. */
class InviteRole extends Base_1.default {
    _cachedCompleteRole;
    _cachedGuild;
    /**
     * The color of this role.
     * @deprecated Use {@link Role#colors | Role#colors.primaryColor} instead.
     */
    color;
    /** The colors of this role. */
    colors;
    guild;
    /** The id of the guild this role is in. */
    guildID;
    /** The icon has of this role. */
    icon;
    /** The name of this role. */
    name;
    /** The permissions of this role. */
    permissions;
    /** The position of this role. */
    position;
    /** The unicode emoji of this role. */
    unicodeEmoji;
    constructor(data, client, guildID, guild) {
        super(data.id, client);
        this.color = data.color;
        this.colors = {
            primaryColor: data.colors.primary_color,
            secondaryColor: data.colors.secondary_color,
            tertiaryColor: data.colors.tertiary_color
        };
        this.guild = guild;
        this.guildID = guildID;
        this.icon = data.icon ?? null;
        this.name = data.name;
        this.permissions = new Permission_1.default(data.permissions);
        this.position = data.position;
        this.unicodeEmoji = null;
        this.update(data);
    }
    /** The guild this role is in. This will throw an error if the guild is not cached. */
    get completeGuild() {
        this._cachedGuild ??= this.client.guilds.get(this.guildID);
        if (!this._cachedGuild) {
            if (this.client.options.restMode) {
                throw new Errors_1.UncachedError(`${this.constructor.name}#completeGuild is not present when rest mode is enabled.`);
            }
            if (!this.client.shards.connected) {
                throw new Errors_1.UncachedError(`${this.constructor.name}#completeGuild is not present without a gateway connection.`);
            }
            throw new Errors_1.UncachedError(`${this.constructor.name}#completeGuild is not present.`);
        }
        return this._cachedGuild;
    }
    /** The complete role this InviteRole represents, if cached. */
    get completeRole() {
        return this._cachedCompleteRole ??= this.client.guilds.get(this.guildID)?.roles.get(this.id);
    }
    /** A string that will mention this role. */
    get mention() {
        return `<@&${this.id}>`;
    }
    /**
     * Delete this role.
     * @param reason The reason for deleting the role.
     */
    async delete(reason) {
        return this.client.rest.guilds.deleteRole(this.guildID, this.id, reason);
    }
    /**
     * Edit this role.
     * @param options The options for editing the role.
     */
    async edit(options) {
        return this.client.rest.guilds.editRole(this.guildID, this.id, options);
    }
    /** Get the complete role this InviteRole represents. */
    async getCompleteRole() {
        if (this.completeRole)
            return this.completeRole;
        const role = await this.client.rest.guilds.getRole(this.guildID, this.id);
        this._cachedCompleteRole = role;
        return role;
    }
    toJSON() {
        return {
            ...super.toJSON(),
            color: this.color,
            colors: this.colors,
            guild: this.guild.toJSON(),
            guildID: this.guildID,
            icon: this.icon,
            name: this.name,
            permissions: this.permissions.toJSON(),
            position: this.position,
            unicodeEmoji: this.unicodeEmoji
        };
    }
}
exports.default = InviteRole;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW52aXRlUm9sZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9zdHJ1Y3R1cmVzL0ludml0ZVJvbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEseUJBQXlCO0FBQ3pCLDBEQUEwQjtBQUMxQixzRUFBc0M7QUFNdEMsMkNBQStDO0FBRS9DLCtDQUErQztBQUMvQyxNQUFxQixVQUFXLFNBQVEsY0FBSTtJQUNoQyxtQkFBbUIsQ0FBUTtJQUMzQixZQUFZLENBQVM7SUFDN0I7OztPQUdHO0lBQ0gsS0FBSyxDQUFTO0lBQ2QsK0JBQStCO0lBQy9CLE1BQU0sQ0FBMEI7SUFDaEMsS0FBSyxDQUFjO0lBQ25CLDJDQUEyQztJQUMzQyxPQUFPLENBQVM7SUFDaEIsaUNBQWlDO0lBQ2pDLElBQUksQ0FBZ0I7SUFDcEIsNkJBQTZCO0lBQzdCLElBQUksQ0FBUztJQUNiLG9DQUFvQztJQUNwQyxXQUFXLENBQWE7SUFDeEIsaUNBQWlDO0lBQ2pDLFFBQVEsQ0FBUztJQUNqQixzQ0FBc0M7SUFDdEMsWUFBWSxDQUFnQjtJQUM1QixZQUFZLElBQWdDLEVBQUUsTUFBYyxFQUFFLE9BQWUsRUFBRSxLQUFrQjtRQUM3RixLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDeEIsSUFBSSxDQUFDLE1BQU0sR0FBRztZQUNWLFlBQVksRUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWE7WUFDekMsY0FBYyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZTtZQUMzQyxhQUFhLEVBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjO1NBQzdDLENBQUM7UUFDRixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsSUFBSSxH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