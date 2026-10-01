/// <reference types="node" />
/// <reference types="node" />
import Compressor from "./base";
import type Shard from "../Shard";
import * as zstd from "zstd-napi";
export default class ZstdCompressor extends Compressor {
    _decompressQueue: Promise<void>;
    stream: zstd.DecompressStream;
    constructor(shard: Shard);
    decompress(data: Buffer): Promise<Buffer | null>;
}
