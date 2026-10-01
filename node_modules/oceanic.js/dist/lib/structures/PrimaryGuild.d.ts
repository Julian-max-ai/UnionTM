/** @module PrimaryGuild */
import type * as Types from "../types/namespaced";
import type Client from "../Client";
import type { ImageFormat } from "../Constants";
/** Represents a primary guild. */
export default class PrimaryGuild {
    /** The badge hash of this clan. */
    badge: string | null;
    client: Client;
    identityEnabled: boolean | null;
    identityGuildID: string | null;
    /** The tag of this clan, shown beside messages. */
    tag: string | null;
    constructor(data: Types.Users.RawClan, client: Client);
    protected update(data: Partial<Types.Users.RawClan>): void;
    /**
     * The url of this guild's icon.
     * @param format The format the url should be.
     * @param size The dimensions of the image.
     */
    badgeURL(format?: ImageFormat, size?: number): string | null;
    toJSON(): Types.JSON.JSONPrimaryGuild;
}
