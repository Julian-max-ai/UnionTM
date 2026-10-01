"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/* eslint-disable @typescript-eslint/ban-ts-comment, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
const base_1 = tslib_1.__importDefault(require("./base"));
const Errors_1 = require("../../util/Errors");
// @ts-ignore only in node >=22.15.0
const node_zlib_1 = require("node:zlib");
class ZstdNativeCompressor extends base_1.default {
    _decompressQueue;
    stream;
    constructor(shard) {
        super(shard);
        this._decompressQueue = Promise.resolve();
        this.stream = (0, node_zlib_1.createZstdDecompress)({ chunkSize: 65535 });
        // @ts-ignore only in node >=22.15.0
        this.stream.on("error", err => {
            this.shard.client.emit("error", new Errors_1.GatewayError(`zstd error: ${String(err)}`, 0));
        });
    }
    async decompress(data) {
        let result = null;
        this._decompressQueue = this._decompressQueue.then(async () => await new Promise(resolve => {
            const chunks = [];
            const onData = (chunk) => {
                chunks.push(chunk);
            };
            this.stream.on("data", onData);
            // @ts-ignore only in node >=22.15.0
            this.stream.write(data, "binary", error => {
                this.stream.off("data", onData);
                if (error) {
                    this.shard.client.emit("error", new Errors_1.GatewayError(`Failed to decompress zstd: ${String(error)}`, 0));
                    result = null;
                    resolve();
                    return;
                }
                result = chunks.length === 0 ? null : Buffer.concat(chunks);
                resolve();
            });
        }));
        await this._decompressQueue;
        return result;
    }
}
exports.default = ZstdNativeCompressor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoienN0ZC1uYXRpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9saWIvZ2F0ZXdheS9jb21wcmVzc2lvbi96c3RkLW5hdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw4S0FBOEs7QUFDOUssMERBQWdDO0FBRWhDLDhDQUFpRDtBQUNqRCxvQ0FBb0M7QUFDcEMseUNBQXNFO0FBRXRFLE1BQXFCLG9CQUFxQixTQUFRLGNBQVU7SUFDeEQsZ0JBQWdCLENBQWdCO0lBQ2hDLE1BQU0sQ0FBaUI7SUFDdkIsWUFBWSxLQUFZO1FBQ3BCLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNiLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDMUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFBLGdDQUFvQixFQUFDLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDekQsb0NBQW9DO1FBQ3BDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsRUFBRTtZQUMxQixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUkscUJBQVksQ0FBQyxlQUFlLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkYsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFZO1FBQ3pCLElBQUksTUFBTSxHQUFrQixJQUFJLENBQUM7UUFDakMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFHLEVBQUUsQ0FBQyxNQUFNLElBQUksT0FBTyxDQUFPLE9BQU8sQ0FBQyxFQUFFO1lBQzVGLE1BQU0sTUFBTSxHQUFrQixFQUFFLENBQUM7WUFDakMsTUFBTSxNQUFNLEdBQUcsQ0FBQyxLQUFhLEVBQVEsRUFBRTtnQkFDbkMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN2QixDQUFDLENBQUM7WUFFRixJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDL0Isb0NBQW9DO1lBQ3BDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDLEVBQUU7Z0JBQ3RDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFDaEMsSUFBSSxLQUFLLEVBQUUsQ0FBQztvQkFDUixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUkscUJBQVksQ0FBQyw4QkFBOEIsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDcEcsTUFBTSxHQUFHLElBQUksQ0FBQztvQkFDZCxPQUFPLEVBQUUsQ0FBQztvQkFDVixPQUFPO2dCQUNYLENBQUM7Z0JBRUQsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQzVELE9BQU8sRUFBRSxDQUFDO1lBQ2QsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRUosTUFBTSxJQUFJLENBQUMsZ0JBQWdCLENBQUM7UUFDNUIsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztDQUNKO0FBeENELHVDQXdDQyJ9