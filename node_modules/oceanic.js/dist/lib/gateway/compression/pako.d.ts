/// <reference types="node" />
/// <reference types="node" />
import Compressor from "./base";
import type Shard from "../Shard";
import { Inflate } from "pako";
interface PakoExtra {
    chunks: Array<Buffer>;
    strm: {
        next_out: number;
        output: Buffer;
    };
}
export default class PakoCompression extends Compressor {
    _sharedZLib: Inflate & PakoExtra;
    constructor(shard: Shard);
    decompress(data: Buffer): Promise<Buffer | null>;
}
export {};
