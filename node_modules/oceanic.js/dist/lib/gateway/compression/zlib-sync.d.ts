/// <reference types="node" />
/// <reference types="node" />
import Compressor from "./base";
import type Shard from "../Shard";
import ZlibSync from "zlib-sync";
export default class ZlibSyncCompressor extends Compressor {
    _sharedZLib: ZlibSync.Inflate;
    constructor(shard: Shard);
    decompress(data: Buffer): Promise<Buffer | null>;
}
