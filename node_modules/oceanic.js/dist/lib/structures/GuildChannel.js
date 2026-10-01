"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module GuildChannel */
const Channel_1 = tslib_1.__importDefault(require("./Channel"));
const Errors_1 = require("../util/Errors");
/** Represents a guild channel. */
class GuildChannel extends Channel_1.default {
    _cachedGuild;
    _cachedParent;
    /** The id of the guild this channel is in. */
    guildID;
    /** The name of this channel. */
    name;
    /** The ID of the parent of this channel, if applicable. */
    parentID;
    constructor(data, client) {
        super(data, client);
        this.guildID = data.guild_id;
        this.name = data.name;
        this.parentID = data.parent_id;
    }
    update(data) {
        super.update(data);
        if (data.guild_id !== undefined) {
            this.guildID = data.guild_id;
        }
        if (data.name !== undefined) {
            this.name = data.name;
        }
        if (data.parent_id !== undefined) {
            this.parentID = data.parent_id;
        }
    }
    /** The guild associated with this channel. This will throw an error if the guild is not cached. */
    get guild() {
        this._cachedGuild ??= this.client.guilds.get(this.guildID);
        if (!this._cachedGuild) {
            if (this.client.options.restMode) {
                throw new Errors_1.UncachedError(`${this.constructor.name}#guild is not present when rest mode is enabled.`);
            }
            if (!this.client.shards.connected) {
                throw new Errors_1.UncachedError(`${this.constructor.name}#guild is not present without a gateway connection.`);
            }
            throw new Errors_1.UncachedError(`${this.constructor.name}#guild is not present.`);
        }
        return this._cachedGuild;
    }
    /**
     * The parent of this channel, if applicable.
     *
     * If the channel is an {@link AnnouncementThread}, {@link PublicThread}, or {@link PrivateThread}, this will be a {@link TextChannel}, {@link AnnouncementChannel}, {@link ForumChannel}, or {@link MediaChannel}.
     *
     * If the channel is a {@link TextChannel}, {@link VoiceChannel}, {@link AnnouncementChannel}, {@link ForumChannel}, or {@link MediaChannel}, this will be a {@link CategoryChannel}.
     * @returns If undefined, no attempt was made to resolve the parent channel. If null, the parent channel was attempted to be resolved but was not found in the client's cache.
     */
    get parent() {
        if (this.parentID !== null) {
            if (this._cachedParent !== null) {
                if (this._cachedParent)
                    return this._cachedParent;
                this._cachedParent = this.client.getChannel(this.parentID);
                this._cachedParent ??= null;
                return this._cachedParent;
            }
            return null;
        }
        return undefined;
    }
    /**
     * Edit this channel.
     * @param options The options for editing the channel.
     */
    async edit(options) {
        // edit is called down the chain
        return this.client.rest.channels.edit(this.id, options);
    }
    toJSON() {
        return {
            ...super.toJSON(),
            guildID: this.guildID,
            name: this.name,
            parentID: this.parentID,
            type: this.type
        };
    }
}
exports.default = GuildChannel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3VpbGRDaGFubmVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL3N0cnVjdHVyZXMvR3VpbGRDaGFubmVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJCQUEyQjtBQUMzQixnRUFBZ0M7QUFTaEMsMkNBQStDO0FBRS9DLGtDQUFrQztBQUNsQyxNQUFxQixZQUFhLFNBQVEsaUJBQU87SUFDckMsWUFBWSxDQUFTO0lBQ3JCLGFBQWEsQ0FBNkU7SUFDbEcsOENBQThDO0lBQzlDLE9BQU8sQ0FBUztJQUNoQixnQ0FBZ0M7SUFDaEMsSUFBSSxDQUFTO0lBQ2IsMkRBQTJEO0lBQzNELFFBQVEsQ0FBZ0I7SUFFeEIsWUFBWSxJQUFvQyxFQUFFLE1BQWM7UUFDNUQsS0FBSyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNwQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDN0IsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUNuQyxDQUFDO0lBRWtCLE1BQU0sQ0FBQyxJQUE2QztRQUNuRSxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25CLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxTQUFTLEVBQUUsQ0FBQztZQUM5QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDakMsQ0FBQztRQUNELElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxTQUFTLEVBQUUsQ0FBQztZQUMxQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDMUIsQ0FBQztRQUNELElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxTQUFTLEVBQUUsQ0FBQztZQUMvQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDbkMsQ0FBQztJQUNMLENBQUM7SUFFRCxtR0FBbUc7SUFDbkcsSUFBSSxLQUFLO1FBQ0wsSUFBSSxDQUFDLFlBQVksS0FBSyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzNELElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDckIsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDL0IsTUFBTSxJQUFJLHNCQUFhLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksa0RBQWtELENBQUMsQ0FBQztZQUN4RyxDQUFDO1lBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO2dCQUNoQyxNQUFNLElBQUksc0JBQWEsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxxREFBcUQsQ0FBQyxDQUFDO1lBQzNHLENBQUM7WUFFRCxNQUFNLElBQUksc0JBQWEsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSx3QkFBd0IsQ0FBQyxDQUFDO1FBQzlFLENBQUM7UUFFRCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDN0IsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSCxJQUFJLE1BQU07UUFDTixJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssSUFBSSxFQUFFLENBQUM7WUFDekIsSUFBSSxJQUFJLENBQUMsYUFBYSxLQUFLLElBQUksRUFBRSxDQUFDO2dCQUM5QixJQUFJLElBQUksQ0FBQyxhQUFhO29CQUFFLE9BQU8sSUFBSSxDQUFDLGFBQXVELENBQUM7Z0JBQzVGLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQXFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDL0gsSUFBSSxDQUFDLGFBQWEsS0FBSyxJQUFJLENBQUM7Z0JBQzVCLE9BQU8sSUFBSSxDQUFDLGFBQThELENBQUM7WUFDL0UsQ0FBQztZQUVELE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7UUFFRCxPQUFPLFNBQVMsQ0FBQztJQUNyQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUEyRDtRQUNsRSxnQ0FBZ0M7UUFDaEMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUErQixJQUFJLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBNkIsQ0FBQztJQUN0SCxDQUFDO0lBRVEsTUFBTTtRQUNYLE9BQU87WUFDSCxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUU7WUFDakIsT0FBTyxFQUFHLElBQUksQ0FBQyxPQUFPO1lBQ3RCLElBQUksRUFBTSxJQUFJLENBQUMsSUFBSTtZQUNuQixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsSUFBSSxFQUFNLElBQUksQ0FBQyxJQUFJO1NBQ3RCLENBQUM7SUFDTixDQUFDO0NBQ0o7QUF6RkQsK0JBeUZDIn0=