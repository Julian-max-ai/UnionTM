/** @module UnavailableGuild */
import Base from "./Base";
import type * as Types from "../types/namespaced";
import type Client from "../Client";
/** Represents a guild that is unavailable. */
export default class UnavailableGuild extends Base {
    unavailable: true;
    constructor(data: Types.Guilds.RawUnavailableGuild, client: Client);
    toJSON(): Types.JSON.JSONUnavailableGuild;
}
