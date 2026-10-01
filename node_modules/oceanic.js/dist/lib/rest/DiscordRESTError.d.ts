/// <reference types="node" />
/** @module DiscordRESTError */
import type * as Types from "../types/namespaced";
import type { RESTMethod } from "../Constants";
/** A REST error received from Discord. */
export default class DiscordRESTError extends Error {
    code: number;
    method: RESTMethod;
    name: string;
    resBody: Record<string, unknown> | null;
    response: Response;
    constructor(res: Response, resBody: Record<string, unknown>, method: RESTMethod, stack?: string);
    static flattenErrors(errors: Record<string, unknown>, keyPrefix?: string): Array<string>;
    get headers(): Headers;
    get path(): string;
    get status(): number;
    get statusText(): string;
    toJSON(): Types.JSON.JSONDiscordRESTError;
}
