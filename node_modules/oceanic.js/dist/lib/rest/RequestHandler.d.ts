/** @module RequestHandler */
import SequentialBucket from "./SequentialBucket";
import type RESTManager from "./RESTManager";
import type * as Types from "../types/namespaced";
/**
 * Latency & ratelimit related things lovingly borrowed from eris
 * https://github.com/abalabahaha/eris/blob/dev/lib/rest/RequestHandler.js (eb403730855714eafa36c541dbe2cb84c9979158)
 */
/** The primary means of communicating with Discord via rest. */
export default class RequestHandler {
    private _manager;
    globalBlock: boolean;
    latencyRef: Types.RequestHandler.LatencyRef;
    options: Types.RequestHandler.RequestHandlerInstanceOptions;
    ratelimits: Record<string, SequentialBucket>;
    readyQueue: Array<() => void>;
    constructor(manager: RESTManager, options?: Types.Client.RESTOptions);
    private getRoute;
    private globalUnblock;
    /** same as `request`, but with `auth` always set to `true`. */
    authRequest<T = unknown>(options: Omit<Types.RequestHandler.RequestOptions, "auth">): Promise<T>;
    /**
     * Make a request. `null` will be returned if the request results in a `204 NO CONTENT`.
     * @param options The options for the request.
     */
    request<T = unknown>(options: Types.RequestHandler.RequestOptions): Promise<T>;
}
