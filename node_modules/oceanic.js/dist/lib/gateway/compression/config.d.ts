import type Compressor from "./base";
import type Client from "../../Client";
import { DependencyError } from "../../util/Errors";
import type Shard from "../Shard";
export type CompressionType = "zlib-stream" | "zstd-stream";
export type CompressionLibrary = "native" | "zlib-sync" | "pako" | "zstd-napi";
export interface CompressionModule {
    default: new (shard: Shard) => Compressor;
}
export interface CompressionConfig {
    name: CompressionLibrary;
    check(client: Client): boolean;
    getClass(): new (shard: Shard) => Compressor;
    getError(): DependencyError;
}
declare const CompressionConfigs: Record<string, Array<CompressionConfig>>;
export default CompressionConfigs;
