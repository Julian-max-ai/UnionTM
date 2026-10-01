/// <reference types="node" />
/// <reference types="node" />
/// <reference types="node" />
import Compressor from "./base";
import type Shard from "../Shard";
import { type Inflate } from "node:zlib";
export default class ZlibNativeCompressor extends Compressor {
    _chunks: Array<Buffer>;
    _decompressQueue: Promise<void>;
    stream: Inflate;
    constructor(shard: Shard);
    decompress(data: Buffer): Promise<Buffer | null>;
}
