/** @module GuildTemplate */
import type Guild from "./Guild";
import type User from "./User";
import type * as Types from "../types/namespaced";
import type Client from "../Client";
/** Represents a guild template. */
export default class GuildTemplate {
    private _cachedSourceGuild?;
    client: Client;
    /** The code of the template. */
    code: string;
    /** When this template was created. */
    createdAt: Date;
    /** The creator of this template. */
    creator: User;
    /** The description of this template. */
    description: string | null;
    /** If this template has unsynced changes. */
    isDirty: boolean | null;
    /** The name of this template. */
    name: string;
    /** A snapshot of the guild. */
    serializedSourceGuild: Partial<Types.Guilds.RawGuild>;
    /** The ID of the source guild of this template. */
    sourceGuildID: string;
    /** When this template was last updated. */
    updatedAt: Date;
    /** The amount of times this template has been used. */
    usageCount: number;
    constructor(data: Types.GuildTemplate.RawGuildTemplate, client: Client);
    protected update(data: Partial<Types.GuildTemplate.RawGuildTemplate>): void;
    /** The source guild of this template. This will throw an error if the guild is not cached. */
    get sourceGuild(): Guild;
    /**
     * Delete this template.
     */
    delete(): Promise<void>;
    /**
     * Edit this template.
     * @param options The options for editing the template.
     */
    editTemplate(options: Types.GuildTemplate.EditGuildTemplateOptions): Promise<GuildTemplate>;
    /**
     * Sync this template.
     */
    syncTemplate(): Promise<GuildTemplate>;
    toJSON(): Types.JSON.JSONGuildTemplate;
}
