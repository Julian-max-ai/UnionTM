/// <reference types="node" />
/// <reference types="node" />
import type Shard from "../Shard";
export default abstract class Compressor {
    shard: Shard;
    abstract decompress(data: Buffer): Promise<Buffer | null>;
    constructor(shard: Shard);
}
