"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module RequestHandler */
const SequentialBucket_1 = tslib_1.__importDefault(require("./SequentialBucket"));
const DiscordRESTError_1 = tslib_1.__importDefault(require("./DiscordRESTError"));
const DiscordHTTPError_1 = tslib_1.__importDefault(require("./DiscordHTTPError"));
const Constants_1 = require("../Constants");
const Base_1 = tslib_1.__importDefault(require("../structures/Base"));
const Errors_1 = require("../util/Errors");
/**
 * Latency & ratelimit related things lovingly borrowed from eris
 * https://github.com/abalabahaha/eris/blob/dev/lib/rest/RequestHandler.js (eb403730855714eafa36c541dbe2cb84c9979158)
 */
/** The primary means of communicating with Discord via rest. */
class RequestHandler {
    _manager;
    globalBlock = false;
    latencyRef;
    options;
    ratelimits = {};
    readyQueue = [];
    constructor(manager, options = {}) {
        if (options && options.baseURL && options.baseURL.endsWith("/")) {
            options.baseURL = options.baseURL.slice(0, -1);
        }
        this._manager = manager;
        this.options = {
            agent: options.agent,
            baseURL: options.baseURL ?? Constants_1.API_URL,
            disableLatencyCompensation: !!options.disableLatencyCompensation,
            followRedirects: !!options.followRedirects,
            host: options.host ?? (options.baseURL ? new URL(options.baseURL).host : new URL(Constants_1.API_URL).host),
            latencyThreshold: options.latencyThreshold ?? 30000,
            maxRatelimitRetryWindow: options.maxRatelimitRetryWindow ?? 30000,
            ratelimiterOffset: options.ratelimiterOffset ?? 0,
            requestTimeout: options.requestTimeout ?? 15000,
            superProperties: options.superProperties ?? null,
            userAgent: options.userAgent ?? Constants_1.USER_AGENT
        };
        this.latencyRef = {
            lastTimeOffsetCheck: 0,
            latency: options.ratelimiterOffset ?? 0,
            raw: Array.from({ length: 10 }).fill(options.ratelimiterOffset ?? 0),
            timeOffsets: Array.from({ length: 10 }).fill(0),
            timeoffset: 0
        };
    }
    getRoute(path, method) {
        let route = path.replaceAll(/\/([a-z-]+)\/\d{15,21}/g, function (match, p) {
            return p === "channels" || p === "guilds" || p === "webhooks" ? match : `/${p}/:id`;
        }).replaceAll(/\/reactions\/[^/]+/g, "/reactions/:id").replaceAll(/\/reactions\/:id\/[^/]+/g, "/reactions/:id/:userID").replace(/^\/webhooks\/(\d+)\/[\w-]{64,}/, "/webhooks/$1/:token");
        if (method === "DELETE" && route.endsWith("/messages/:id")) {
            const messageID = path.slice(path.lastIndexOf("/") + 1);
            const createdAt = Base_1.default.getCreatedAt(messageID).getTime();
            if (Date.now() - this.latencyRef.latency - createdAt >= 1000 * 60 * 60 * 24 * 14) {
                method += "_OLD";
            }
            else if (Date.now() - this.latencyRef.latency - createdAt <= 1000 * 10) {
                method += "_NEW";
            }
            route = method + route;
        }
        else if (method === "GET" && /\/guilds\/\d+\/channels$/.test(route)) {
            route = "/guilds/:id/channels";
        }
        if (method === "PUT" || method === "DELETE") {
            const index = route.indexOf("/reactions");
            if (index !== -1) {
                route = "MODIFY" + route.slice(0, index + 10);
            }
        }
        return route;
    }
    globalUnblock() {
        this.globalBlock = false;
        while (this.readyQueue.length !== 0) {
            this.readyQueue.shift()();
        }
    }
    /** same as `request`, but with `auth` always set to `true`. */
    async authRequest(options) {
        return this.request({
            ...options,
            auth: true
        });
    }
    /**
     * Make a request. `null` will be returned if the request results in a `204 NO CONTENT`.
     * @param options The options for the request.
     */
    async request(options) {
        options.method = options.method.toUpperCase();
        if (!Constants_1.RESTMethods.includes(options.method)) {
            throw new TypeError(`Invalid method "${options.method}.`);
        }
        const _stackHolder = {};
        Error.captureStackTrace(_stackHolder);
        if (!options.path.startsWith("/")) {
            options.path = `/${options.path}`;
        }
        const route = options.route ?? this.getRoute(options.path, options.method);
        if (!this.ratelimits[route]) {
            this.ratelimits[route] = new SequentialBucket_1.default(1, this.latencyRef);
        }
        let attempts = 0;
        return new Promise((resolve, reject) => {
            async function attempt(cb) {
                const headers = options.headers ?? {};
                try {
                    if (typeof options.auth === "string") {
                        headers.Authorization = options.auth;
                    }
                    else if (options.auth && this._manager.client.options.auth) {
                        headers.Authorization = this._manager.client.options.auth;
                    }
                    if (options.reason) {
                        headers["X-Audit-Log-Reason"] = encodeURIComponent(options.reason);
                    }
                    let reqBody;
                    if (options.method !== "GET") {
                        let stringBody;
                        if (options.json) {
                            stringBody = JSON.stringify(options.json, (k, v) => typeof v === "bigint" ? v.toString() : v);
                        }
                        if (options.form || (options.files && options.files.length !== 0)) {
                            const data = options.form ?? new FormData();
                            let index = 0;
                            if (options.files)
                                for (const file of options.files.values()) {
                                    index++;
                                    if (file.index !== undefined) {
                                        index = file.index;
                                    }
                                    if (!file.contents) {
                                        continue;
                                    }
                                    data.set(file.field || `files[${index}]`, new Blob([file.contents]), file.name);
                                }
                            if (stringBody) {
                                data.set("payload_json", stringBody);
                            }
                            reqBody = data;
                        }
                        else if (options.json) {
                            reqBody = stringBody;
                            headers["Content-Type"] = "application/json";
                        }
                    }
                    if (this.options.host) {
                        headers.Host = this.options.host;
                    }
                    if (this.options.superProperties) {
                        headers["X-Super-Properties"] = typeof this.options.superProperties === "object" ? JSON.stringify(this.options.superProperties) : this.options.superProperties;
                    }
                    const url = `${this.options.baseURL}${options.path}${options.query && Array.from(options.query.keys()).length !== 0 ? `?${options.query.toString()}` : ""}`;
                    let latency = Date.now();
                    const controller = new AbortController();
                    let timeout;
                    if (this.options.requestTimeout > 0 && this.options.requestTimeout !== Infinity) {
                        timeout = setTimeout(() => controller.abort(), this.options.requestTimeout);
                    }
                    const res = await fetch(url, {
                        method: options.method,
                        headers,
                        body: reqBody,
                        dispatcher: this.options.agent || undefined,
                        signal: controller.signal,
                        redirect: this.options.followRedirects ? "follow" : "manual"
                    });
                    if (timeout) {
                        clearTimeout(timeout);
                    }
                    latency = Date.now() - latency;
                    if (!this.options.disableLatencyCompensation) {
                        this.latencyRef.raw.push(latency);
                        this.latencyRef.latency = this.latencyRef.latency - Math.trunc((this.latencyRef.raw.shift() ?? 0) / 10) + Math.trunc(latency / 10);
                    }
                    let resBody;
                    if (res.status === 204) {
                        resBody = null;
                    }
                    else {
                        if (res.headers.get("content-type") === "application/json") {
                            const b = await res.text();
                            try {
                                resBody = JSON.parse(b);
                            }
                            catch (err) {
                                this._manager.client.emit("error", err);
                                resBody = b;
                            }
                        }
                        else {
                            resBody = Buffer.from(await res.arrayBuffer());
                        }
                    }
                    this._manager.client.emit("request", {
                        method: options.method,
                        path: options.path,
                        route,
                        withAuth: !!options.auth,
                        requestBody: reqBody,
                        responseBody: resBody
                    });
                    const headerNow = Date.parse(res.headers.get("date"));
                    const now = Date.now();
                    if (this.latencyRef.lastTimeOffsetCheck < (Date.now() - 5000)) {
                        const timeOffset = headerNow + 500 - (this.latencyRef.lastTimeOffsetCheck = Date.now());
                        if (this.latencyRef.timeoffset - this.latencyRef.latency >= this.options.latencyThreshold && timeOffset - this.latencyRef.latency >= this.options.latencyThreshold) {
                            this._manager.client.emit("warn", `Your clock is ${this.latencyRef.timeoffset}ms behind Discord's server clock. Please check your connection and system time.`);
                        }
                        this.latencyRef.timeoffset = this.latencyRef.timeoffset - Math.trunc(this.latencyRef.timeOffsets.shift() / 10) + Math.trunc(timeOffset / 10);
                        this.latencyRef.timeOffsets.push(timeOffset);
                    }
                    if (res.headers.has("x-ratelimit-limit")) {
                        this.ratelimits[route].limit = Number(res.headers.get("x-ratelimit-limit"));
                    }
                    if (options.method !== "GET" && (!res.headers.has("x-ratelimit-remaining") || !res.headers.has("x-ratelimit-limit")) && this.ratelimits[route].limit !== 1) {
                        this._manager.client.emit("debug", [`Missing ratelimit headers for SequentialBucket(${this.ratelimits[route].remaining}/${this.ratelimits[route].limit}) with non-default limit\n`,
                            `${res.status} ${res.headers.get("content-type") ?? "null"}: ${options.method} ${route} | ${res.headers.get("cf-ray") ?? "null"}\n`,
                            `content-type = ${res.headers.get("content-type") ?? "null"}\n`,
                            `x-ratelimit-remaining = ${res.headers.get("x-ratelimit-remaining") ?? "null"}\n`,
                            `x-ratelimit-limit = ${res.headers.get("x-ratelimit-limit") ?? "null"}\n`,
                            `x-ratelimit-reset = ${res.headers.get("x-ratelimit-reset") ?? "null"}\n`,
                            `x-ratelimit-global = ${res.headers.get("x-ratelimit-global") ?? "null"}`].join("\n"));
                    }
                    this.ratelimits[route].remaining = res.headers.has("x-ratelimit-remaining") ? Number(res.headers.get("x-ratelimit-remaining")) ?? 0 : 1;
                    const retryAfter = Number(res.headers.get("x-ratelimit-reset-after") ?? res.headers.get("retry-after") ?? 0) * 1000;
                    if (retryAfter >= 0) {
                        if (res.headers.has("x-ratelimit-global")) {
                            this.globalBlock = true;
                            setTimeout(this.globalUnblock.bind(this), retryAfter ?? 1);
                        }
                        else {
                            this.ratelimits[route].reset = (retryAfter ?? 1) + now;
                        }
                    }
                    else if (res.headers.has("x-ratelimit-reset")) {
                        let resetTime = Number(res.headers.get("x-ratelimit-reset")) * 1000;
                        if (route.endsWith("/reactions/:id") && (resetTime - headerNow) === 1000) {
                            resetTime = now + 250;
                        }
                        this.ratelimits[route].reset = Math.max(resetTime - this.latencyRef.latency, now);
                    }
                    else {
                        this.ratelimits[route].reset = now;
                    }
                    if (res.status !== 429) {
                        this._manager.client.emit("debug", `${now} ${route} ${res.status}: ${latency}ms (${this.latencyRef.latency}ms avg) | ${this.ratelimits[route].remaining}/${this.ratelimits[route].limit} left | Reset ${this.ratelimits[route].reset} (${this.ratelimits[route].reset - now}ms left)`);
                    }
                    if (res.status > 300) {
                        if (res.status === 429) {
                            let delay = retryAfter;
                            if (res.headers.get("x-ratelimit-scope") === "shared") {
                                try {
                                    delay = resBody.retry_after * 1000;
                                }
                                catch (err) {
                                    cb();
                                    reject(err);
                                }
                            }
                            this._manager.client.emit("debug", `${res.headers.has("x-ratelimit-global") ? "Global" : "Unexpected"} RateLimit: ${JSON.stringify(resBody)}\n${now} ${route} ${res.status}: ${latency}ms (${this.latencyRef.latency}ms avg) | ${this.ratelimits[route].remaining}/${this.ratelimits[route].limit} left | Reset ${delay} (${this.ratelimits[route].reset - now}ms left) | Scope ${res.headers.get("x-ratelimit-scope")}`);
                            if (delay) {
                                if (delay > this.options.maxRatelimitRetryWindow) {
                                    cb();
                                    return reject(new Errors_1.RateLimitedError(`Ratelimit on "${options.method} ${route}" exceeds the maximum retry window (${delay} > ${this.options.maxRatelimitRetryWindow})`, delay));
                                }
                                setTimeout(() => {
                                    cb();
                                    // eslint-disable-next-line prefer-rest-params, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, prefer-spread
                                    this.request(options).then(resolve).catch(reject);
                                }, delay);
                                return;
                            }
                            else {
                                cb();
                                this.request(options).then(resolve).catch(reject);
                                return;
                            }
                        }
                        else if (res.status === 502 && ++attempts < 4) {
                            this._manager.client.emit("debug", `Unexpected 502 on ${options.method} ${route}`);
                            setTimeout(() => {
                                this.request(options).then(resolve).catch(reject);
                            }, Math.floor(Math.random() * 1900 + 100));
                            return cb();
                        }
                        cb();
                        let { stack } = _stackHolder;
                        if (stack.startsWith("Error\n")) {
                            stack = stack.slice(6);
                        }
                        const err = resBody && typeof resBody === "object" && "code" in resBody ? new DiscordRESTError_1.default(res, resBody, options.method, stack) : new DiscordHTTPError_1.default(res, resBody, options.method, stack);
                        reject(err);
                        return;
                    }
                    cb();
                    resolve(resBody);
                }
                catch (err) {
                    cb();
                    if (err instanceof Error && err.constructor.name === "DOMException" && err.name === "AbortError") {
                        reject(new Error(`Request Timed Out (>${this.options.requestTimeout}ms) on ${options.method} ${options.path}`));
                    }
                    this._manager.client.emit("error", err);
                }
            }
            if (this.globalBlock && options.auth) {
                (options.priority ? this.readyQueue.unshift.bind(this.readyQueue) : this.readyQueue.push.bind(this.readyQueue))(() => {
                    this.ratelimits[route].queue(attempt.bind(this), options.priority);
                });
            }
            else {
                this.ratelimits[route].queue(attempt.bind(this), options.priority);
            }
        });
    }
}
exports.default = RequestHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVxdWVzdEhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvcmVzdC9SZXF1ZXN0SGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2QkFBNkI7QUFDN0Isa0ZBQWtEO0FBQ2xELGtGQUFrRDtBQUNsRCxrRkFBa0Q7QUFHbEQsNENBQWlGO0FBQ2pGLHNFQUFzQztBQUN0QywyQ0FBa0Q7QUFFbEQ7OztHQUdHO0FBRUgsZ0VBQWdFO0FBQ2hFLE1BQXFCLGNBQWM7SUFDdkIsUUFBUSxDQUFjO0lBQzlCLFdBQVcsR0FBRyxLQUFLLENBQUM7SUFDcEIsVUFBVSxDQUFrQztJQUM1QyxPQUFPLENBQXFEO0lBQzVELFVBQVUsR0FBcUMsRUFBRSxDQUFDO0lBQ2xELFVBQVUsR0FBc0IsRUFBRSxDQUFDO0lBQ25DLFlBQVksT0FBb0IsRUFBRSxVQUFvQyxFQUFFO1FBQ3BFLElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUM5RCxPQUFPLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25ELENBQUM7UUFDRCxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUN4QixJQUFJLENBQUMsT0FBTyxHQUFHO1lBQ1gsS0FBSyxFQUF1QixPQUFPLENBQUMsS0FBSztZQUN6QyxPQUFPLEVBQXFCLE9BQU8sQ0FBQyxPQUFPLElBQUksbUJBQU87WUFDdEQsMEJBQTBCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQywwQkFBMEI7WUFDaEUsZUFBZSxFQUFhLENBQUMsQ0FBQyxPQUFPLENBQUMsZUFBZTtZQUNyRCxJQUFJLEVBQXdCLE9BQU8sQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxtQkFBTyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ3JILGdCQUFnQixFQUFZLE9BQU8sQ0FBQyxnQkFBZ0IsSUFBSSxLQUFLO1lBQzdELHVCQUF1QixFQUFLLE9BQU8sQ0FBQyx1QkFBdUIsSUFBSSxLQUFLO1lBQ3BFLGlCQUFpQixFQUFXLE9BQU8sQ0FBQyxpQkFBaUIsSUFBSSxDQUFDO1lBQzFELGNBQWMsRUFBYyxPQUFPLENBQUMsY0FBYyxJQUFJLEtBQUs7WUFDM0QsZUFBZSxFQUFhLE9BQU8sQ0FBQyxlQUFlLElBQUksSUFBSTtZQUMzRCxTQUFTLEVBQW1CLE9BQU8sQ0FBQyxTQUFTLElBQUksc0JBQVU7U0FDOUQsQ0FBQztRQUNGLElBQUksQ0FBQyxVQUFVLEdBQUc7WUFDZCxtQkFBbUIsRUFBRSxDQUFDO1lBQ3RCLE9BQU8sRUFBYyxPQUFPLENBQUMsaUJBQWlCLElBQUksQ0FBQztZQUNuRCxHQUFHLEVBQWtCLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixJQUFJLENBQUMsQ0FBa0I7WUFDckcsV0FBVyxFQUFVLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFrQjtZQUN4RSxVQUFVLEVBQVcsQ0FBQztTQUN6QixDQUFDO0lBRU4sQ0FBQztJQUVPLFFBQVEsQ0FBQyxJQUFZLEVBQUUsTUFBYztRQUN6QyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLHlCQUF5QixFQUFFLFVBQVMsS0FBSyxFQUFFLENBQUM7WUFDcEUsT0FBTyxDQUFDLEtBQUssVUFBVSxJQUFJLENBQUMsS0FBSyxRQUFRLElBQUksQ0FBQyxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQVcsTUFBTSxDQUFDO1FBQ2xHLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDLFVBQVUsQ0FBQywwQkFBMEIsRUFBRSx3QkFBd0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxnQ0FBZ0MsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO1FBQ3pMLElBQUksTUFBTSxLQUFLLFFBQVEsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUM7WUFDekQsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3hELE1BQU0sU0FBUyxHQUFHLGNBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDekQsSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEdBQUcsU0FBUyxJQUFJLElBQUksR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQztnQkFDL0UsTUFBTSxJQUFJLE1BQU0sQ0FBQztZQUNyQixDQUFDO2lCQUFNLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxHQUFHLFNBQVMsSUFBSSxJQUFJLEdBQUcsRUFBRSxFQUFFLENBQUM7Z0JBQ3ZFLE1BQU0sSUFBSSxNQUFNLENBQUM7WUFDckIsQ0FBQztZQUNELEtBQUssR0FBRyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQzNCLENBQUM7YUFBTSxJQUFJLE1BQU0sS0FBSyxLQUFLLElBQUksMEJBQTBCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDcEUsS0FBSyxHQUFHLHNCQUFzQixDQUFDO1FBQ25DLENBQUM7UUFFRCxJQUFJLE1BQU0sS0FBSyxLQUFLLElBQUksTUFBTSxLQUFLLFFBQVEsRUFBRSxDQUFDO1lBQzFDLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDMUMsSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQztnQkFDZixLQUFLLEdBQUcsUUFBUSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssR0FBRyxFQUFFLENBQUMsQ0FBQztZQUNsRCxDQUFDO1FBQ0wsQ0FBQztRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFTyxhQUFhO1FBQ2pCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDbEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUcsRUFBRSxDQUFDO1FBQy9CLENBQUM7SUFDTCxDQUFDO0lBRUQsK0RBQStEO0lBQy9ELEtBQUssQ0FBQyxXQUFXLENBQWMsT0FBMEQ7UUFDckYsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFJO1lBQ25CLEdBQUcsT0FBTztZQUNWLElBQUksRUFBRSxJQUFJO1NBQ2IsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyxPQUFPLENBQWMsT0FBNEM7UUFDbkUsT0FBTyxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBZ0IsQ0FBQztRQUM1RCxJQUFJLENBQUMsdUJBQVcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7WUFDeEMsTUFBTSxJQUFJLFNBQVMsQ0FBQyxtQkFBbUIsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDOUQsQ0FBQztRQUNELE1BQU0sWUFBWSxHQUFHLEVBQUUsQ0FBQztRQUN4QixLQUFLLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7WUFDaEMsT0FBTyxDQUFDLElBQUksR0FBRyxJQUFJLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN0QyxDQUFDO1FBQ0QsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNFLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDMUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLDBCQUFnQixDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDdEUsQ0FBQztRQUNELElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQztRQUNqQixPQUFPLElBQUksT0FBTyxDQUFJLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3RDLEtBQUssVUFBVSxPQUFPLENBQXVCLEVBQWM7Z0JBQ3ZELE1BQU0sT0FBTyxHQUEyQixPQUFPLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQztnQkFDOUQsSUFBSSxDQUFDO29CQUNELElBQUksT0FBTyxPQUFPLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRSxDQUFDO3dCQUNuQyxPQUFPLENBQUMsYUFBYSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7b0JBQ3pDLENBQUM7eUJBQU0sSUFBSSxPQUFPLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQzt3QkFDM0QsT0FBTyxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO29CQUM5RCxDQUFDO29CQUNELElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO3dCQUNqQixPQUFPLENBQUMsb0JBQW9CLENBQUMsR0FBRyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ3ZFLENBQUM7b0JBRUQsSUFBSSxPQUFzQyxDQUFDO29CQUMzQyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEtBQUssS0FBSyxFQUFFLENBQUM7d0JBQzNCLElBQUksVUFBOEIsQ0FBQzt3QkFDbkMsSUFBSSxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7NEJBQ2YsVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFVLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDM0csQ0FBQzt3QkFDRCxJQUFJLE9BQU8sQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUM7NEJBQ2hFLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLElBQUksSUFBSSxRQUFRLEVBQUUsQ0FBQzs0QkFDNUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDOzRCQUNkLElBQUksT0FBTyxDQUFDLEtBQUs7Z0NBQUUsS0FBSyxNQUFNLElBQUksSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUM7b0NBQzNELEtBQUssRUFBRSxDQUFDO29DQUNSLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxTQUFTLEVBQUUsQ0FBQzt3Q0FDM0IsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7b0NBQ3ZCLENBQUM7b0NBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQzt3Q0FDakIsU0FBUztvQ0FDYixDQUFDO29DQUNELElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxTQUFTLEtBQUssR0FBRyxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dDQUNwRixDQUFDOzRCQUNELElBQUksVUFBVSxFQUFFLENBQUM7Z0NBQ2IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsVUFBVSxDQUFDLENBQUM7NEJBQ3pDLENBQUM7NEJBQ0QsT0FBTyxHQUFHLElBQUksQ0FBQzt3QkFDbkIsQ0FBQzs2QkFBTSxJQUFJLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQzs0QkFDdEIsT0FBTyxHQUFHLFVBQVUsQ0FBQzs0QkFDckIsT0FBTyxDQUFDLGNBQWMsQ0FBQyxHQUFHLGtCQUFrQixDQUFDO3dCQUNqRCxDQUFDO29CQUNMLENBQUM7b0JBRUQsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO3dCQUNwQixPQUFPLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO29CQUNyQyxDQUFDO29CQUNELElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsQ0FBQzt3QkFDL0IsT0FBTyxDQUFDLG9CQUFvQixDQUFDLEdBQUcsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUM7b0JBQ25LLENBQUM7b0JBQ0QsTUFBTSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO29CQUM1SixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7b0JBQ3pCLE1BQU0sVUFBVSxHQUFHLElBQUksZUFBZSxFQUFFLENBQUM7b0JBQ3pDLElBQUksT0FBbUMsQ0FBQztvQkFDeEMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEtBQUssUUFBUSxFQUFFLENBQUM7d0JBQzlFLE9BQU8sR0FBRyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7b0JBQ2hGLENBQUM7b0JBQ0QsTUFBTSxHQUFHLEdBQUcsTUFBTSxLQUFLLENBQUMsR0FBRyxFQUFFO3dCQUN6QixNQUFNLEVBQU0sT0FBTyxDQUFDLE1BQU07d0JBQzFCLE9BQU87d0JBQ1AsSUFBSSxFQUFRLE9BQU87d0JBQ25CLFVBQVUsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBSSxTQUFTO3dCQUMzQyxNQUFNLEVBQU0sVUFBVSxDQUFDLE1BQU07d0JBQzdCLFFBQVEsRUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxRQUFRO3FCQUNqRSxDQUFDLENBQUM7b0JBQ0gsSUFBSSxPQUFPLEVBQUUsQ0FBQzt3QkFDVixZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQzFCLENBQUM7b0JBQ0QsT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxPQUFPLENBQUM7b0JBQy9CLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLDBCQUEwQixFQUFFLENBQUM7d0JBQzNDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzt3QkFDbEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxDQUFDO29CQUN2SSxDQUFDO29CQUNELElBQUksT0FBeUQsQ0FBQztvQkFDOUQsSUFBSSxHQUFHLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDO3dCQUNyQixPQUFPLEdBQUcsSUFBSSxDQUFDO29CQUNuQixDQUFDO3lCQUFNLENBQUM7d0JBQ0osSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsS0FBSyxrQkFBa0IsRUFBRSxDQUFDOzRCQUN6RCxNQUFNLENBQUMsR0FBRyxNQUFNLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQzs0QkFDM0IsSUFBSSxDQUFDO2dDQUNELE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBNEIsQ0FBQzs0QkFDdkQsQ0FBQzs0QkFBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO2dDQUNYLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsR0FBWSxDQUFDLENBQUM7Z0NBQ2pELE9BQU8sR0FBRyxDQUFDLENBQUM7NEJBQ2hCLENBQUM7d0JBQ0wsQ0FBQzs2QkFBTSxDQUFDOzRCQUNKLE9BQU8sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7d0JBQ25ELENBQUM7b0JBQ0wsQ0FBQztvQkFFRCxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFO3dCQUNqQyxNQUFNLEVBQVEsT0FBTyxDQUFDLE1BQU07d0JBQzVCLElBQUksRUFBVSxPQUFPLENBQUMsSUFBSTt3QkFDMUIsS0FBSzt3QkFDTCxRQUFRLEVBQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJO3dCQUM1QixXQUFXLEVBQUcsT0FBTzt3QkFDckIsWUFBWSxFQUFFLE9BQU87cUJBQ3hCLENBQUMsQ0FBQztvQkFDSCxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBRSxDQUFDLENBQUM7b0JBQ3ZELE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztvQkFDdkIsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLG1CQUFtQixHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7d0JBQzVELE1BQU0sVUFBVSxHQUFHLFNBQVMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO3dCQUN4RixJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQzs0QkFDakssSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxpQkFBaUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLGlGQUFpRixDQUFDLENBQUM7d0JBQ3BLLENBQUM7d0JBRUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUMsQ0FBQzt3QkFDOUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUNqRCxDQUFDO29CQUNELElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsRUFBRSxDQUFDO3dCQUN2QyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO29CQUNoRixDQUFDO29CQUNELElBQUksT0FBTyxDQUFDLE1BQU0sS0FBSyxLQUFLLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEtBQUssQ0FBQyxFQUFFLENBQUM7d0JBQ3pKLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxrREFBa0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLDRCQUE0Qjs0QkFDOUssR0FBRyxHQUFHLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxJQUFJLE1BQU0sS0FBSyxPQUFPLENBQUMsTUFBTSxJQUFJLEtBQUssTUFBTSxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxNQUFNLElBQUk7NEJBQ25JLGtCQUFrQixHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsSUFBSSxNQUFNLElBQUk7NEJBQy9ELDJCQUEyQixHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLE1BQU0sSUFBSTs0QkFDakYsdUJBQXVCLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLElBQUksTUFBTSxJQUFJOzRCQUN6RSx1QkFBdUIsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsSUFBSSxNQUFNLElBQUk7NEJBQ3pFLHdCQUF3QixHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLE1BQU0sRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQy9GLENBQUM7b0JBRUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDeEksTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO29CQUNwSCxJQUFJLFVBQVUsSUFBSSxDQUFDLEVBQUUsQ0FBQzt3QkFDbEIsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLENBQUM7NEJBQ3hDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDOzRCQUN4QixVQUFVLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsVUFBVSxJQUFJLENBQUMsQ0FBQyxDQUFDO3dCQUMvRCxDQUFDOzZCQUFNLENBQUM7NEJBQ0osSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxVQUFVLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO3dCQUMzRCxDQUFDO29CQUNMLENBQUM7eUJBQU0sSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLENBQUM7d0JBQzlDLElBQUksU0FBUyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO3dCQUNwRSxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQzs0QkFDdkUsU0FBUyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7d0JBQzFCLENBQUM7d0JBQ0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7b0JBQ3RGLENBQUM7eUJBQU0sQ0FBQzt3QkFDSixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7b0JBQ3ZDLENBQUM7b0JBQ0QsSUFBSSxHQUFHLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDO3dCQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEdBQUcsR0FBRyxJQUFJLEtBQUssSUFBSSxHQUFHLENBQUMsTUFBTSxLQUFLLE9BQU8sT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sYUFBYSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssaUJBQWlCLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxHQUFHLEdBQUcsVUFBVSxDQUFDLENBQUM7b0JBQzNSLENBQUM7b0JBQ0QsSUFBSSxHQUFHLENBQUMsTUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDO3dCQUNuQixJQUFJLEdBQUcsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFLENBQUM7NEJBQ3JCLElBQUksS0FBSyxHQUFHLFVBQVUsQ0FBQzs0QkFDdkIsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLFFBQVEsRUFBRSxDQUFDO2dDQUNwRCxJQUFJLENBQUM7b0NBQ0QsS0FBSyxHQUFJLE9BQW9DLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztnQ0FDckUsQ0FBQztnQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO29DQUNYLEVBQUUsRUFBRSxDQUFDO29DQUNMLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztnQ0FDaEIsQ0FBQzs0QkFDTCxDQUFDOzRCQUVELElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFlBQVksZUFBZSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsSUFBSSxLQUFLLElBQUksR0FBRyxDQUFDLE1BQU0sS0FBSyxPQUFPLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLGFBQWEsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLGlCQUFpQixLQUFLLEtBQUssSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEdBQUcsR0FBRyxvQkFBb0IsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUUsRUFBRSxDQUFDLENBQUM7NEJBQzNaLElBQUksS0FBSyxFQUFFLENBQUM7Z0NBQ1IsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO29DQUMvQyxFQUFFLEVBQUUsQ0FBQztvQ0FDTCxPQUFPLE1BQU0sQ0FBQyxJQUFJLHlCQUFnQixDQUFDLGlCQUFpQixPQUFPLENBQUMsTUFBTSxJQUFJLEtBQUssdUNBQXVDLEtBQUssTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLHVCQUF1QixHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztnQ0FDbEwsQ0FBQztnQ0FDRCxVQUFVLENBQUMsR0FBRyxFQUFFO29DQUNaLEVBQUUsRUFBRSxDQUFDO29DQUNMLDRJQUE0STtvQ0FDNUksSUFBSSxDQUFDLE9BQU8sQ0FBSSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dDQUN6RCxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0NBQ1YsT0FBTzs0QkFDWCxDQUFDO2lDQUFNLENBQUM7Z0NBQ0osRUFBRSxFQUFFLENBQUM7Z0NBQ0wsSUFBSSxDQUFDLE9BQU8sQ0FBSSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dDQUNyRCxPQUFPOzRCQUNYLENBQUM7d0JBQ0wsQ0FBQzs2QkFBTSxJQUFJLEdBQUcsQ0FBQyxNQUFNLEtBQUssR0FBRyxJQUFJLEVBQUUsUUFBUSxHQUFHLENBQUMsRUFBRSxDQUFDOzRCQUM5QyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLHFCQUFxQixPQUFPLENBQUMsTUFBTSxJQUFJLEtBQUssRUFBRSxDQUFDLENBQUM7NEJBQ25GLFVBQVUsQ0FBQyxHQUFHLEVBQUU7Z0NBQ1osSUFBSSxDQUFDLE9BQU8sQ0FBSSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDOzRCQUN6RCxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7NEJBQzNDLE9BQU8sRUFBRSxFQUFFLENBQUM7d0JBQ2hCLENBQUM7d0JBQ0QsRUFBRSxFQUFFLENBQUM7d0JBQ0wsSUFBSSxFQUFFLEtBQUssRUFBRSxHQUFHLFlBQWtDLENBQUM7d0JBQ25ELElBQUksS0FBSyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDOzRCQUM5QixLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDM0IsQ0FBQzt3QkFDRCxNQUFNLEdBQUcsR0FBRyxPQUFPLElBQUksT0FBTyxPQUFPLEtBQUssUUFBUSxJQUFJLE1BQU0sSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksMEJBQWdCLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLDBCQUFnQixDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQzt3QkFDaE0sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUNaLE9BQU87b0JBQ1gsQ0FBQztvQkFFRCxFQUFFLEVBQUUsQ0FBQztvQkFDTCxPQUFPLENBQUMsT0FBWSxDQUFDLENBQUM7Z0JBQzFCLENBQUM7Z0JBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztvQkFDWCxFQUFFLEVBQUUsQ0FBQztvQkFDTCxJQUFJLEdBQUcsWUFBWSxLQUFLLElBQUksR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEtBQUssY0FBYyxJQUFJLEdBQUcsQ0FBQyxJQUFJLEtBQUssWUFBWSxFQUFFLENBQUM7d0JBQy9GLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyx1QkFBdUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLFVBQVUsT0FBTyxDQUFDLE1BQU0sSUFBSSxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUNwSCxDQUFDO29CQUNELElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsR0FBWSxDQUFDLENBQUM7Z0JBQ3JELENBQUM7WUFDTCxDQUFDO1lBQ0QsSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDbkMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFO29CQUNqSCxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDdkUsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDO2lCQUFNLENBQUM7Z0JBQ0osSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdkUsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNKO0FBN1NELGlDQTZTQyJ9