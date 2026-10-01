import type Collection from "../Collection";
/**
 * Maps raw select menu values to resolved objects.
 *
 * If `ensurePresent` is false, values that aren't in `resolved` will be ignored.
 */
export declare function mapRawToResolved<T, R extends Collection<string, T>>(type: string, raw: Array<string>, resolved: R, ensurePresent?: boolean): Array<T>;
