"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const base_1 = tslib_1.__importDefault(require("./base"));
const Errors_1 = require("../../util/Errors");
const node_zlib_1 = require("node:zlib");
class ZlibNativeCompressor extends base_1.default {
    _chunks;
    _decompressQueue;
    stream;
    constructor(shard) {
        super(shard);
        this._chunks = [];
        this._decompressQueue = Promise.resolve();
        this.stream = (0, node_zlib_1.createInflate)();
        this.stream.on("error", err => {
            this.shard.client.emit("error", new Errors_1.GatewayError(`zlib error: ${String(err)}`, 0));
        });
    }
    async decompress(data) {
        const isComplete = data.length >= 4 && data.readUInt32BE(data.length - 4) === 0xFFFF;
        let result = null;
        this._decompressQueue = this._decompressQueue.then(async () => new Promise(resolve => {
            // eslint-disable-next-line unicorn/consistent-function-scoping
            const onData = (chunk) => {
                this._chunks.push(chunk);
            };
            this.stream.on("data", onData);
            this.stream.write(data, error => {
                this.stream.off("data", onData);
                if (error) {
                    this.shard.client.emit("error", new Errors_1.GatewayError(`Failed to decompress zlib: ${String(error)}`, 0));
                    result = null;
                    resolve();
                    return;
                }
                if (isComplete) {
                    result = this._chunks.length === 0 ? null : Buffer.concat(this._chunks);
                    this._chunks = [];
                }
                resolve();
            });
        }));
        await this._decompressQueue;
        return result;
    }
}
exports.default = ZlibNativeCompressor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiemxpYi1uYXRpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9saWIvZ2F0ZXdheS9jb21wcmVzc2lvbi96bGliLW5hdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwwREFBZ0M7QUFFaEMsOENBQWlEO0FBQ2pELHlDQUF3RDtBQUV4RCxNQUFxQixvQkFBcUIsU0FBUSxjQUFVO0lBQ3hELE9BQU8sQ0FBZ0I7SUFDdkIsZ0JBQWdCLENBQWdCO0lBQ2hDLE1BQU0sQ0FBVTtJQUNoQixZQUFZLEtBQVk7UUFDcEIsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2IsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUMxQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUEseUJBQWEsR0FBRSxDQUFDO1FBQzlCLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsRUFBRTtZQUMxQixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUkscUJBQVksQ0FBQyxlQUFlLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkYsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFZO1FBQ3pCLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsS0FBSyxNQUFNLENBQUM7UUFDckYsSUFBSSxNQUFNLEdBQWtCLElBQUksQ0FBQztRQUNqQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxLQUFLLElBQUcsRUFBRSxDQUFDLElBQUksT0FBTyxDQUFPLE9BQU8sQ0FBQyxFQUFFO1lBQ3RGLCtEQUErRDtZQUMvRCxNQUFNLE1BQU0sR0FBRyxDQUFDLEtBQWEsRUFBUSxFQUFFO2dCQUNuQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM3QixDQUFDLENBQUM7WUFDRixJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDL0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFO2dCQUM1QixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQ2hDLElBQUksS0FBSyxFQUFFLENBQUM7b0JBQ1IsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLHFCQUFZLENBQUMsOEJBQThCLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3BHLE1BQU0sR0FBRyxJQUFJLENBQUM7b0JBQ2QsT0FBTyxFQUFFLENBQUM7b0JBQ1YsT0FBTztnQkFDWCxDQUFDO2dCQUNELElBQUksVUFBVSxFQUFFLENBQUM7b0JBQ2IsTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDeEUsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7Z0JBQ3RCLENBQUM7Z0JBQ0QsT0FBTyxFQUFFLENBQUM7WUFDZCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDSixNQUFNLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztRQUM1QixPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0NBQ0o7QUF6Q0QsdUNBeUNDIn0=