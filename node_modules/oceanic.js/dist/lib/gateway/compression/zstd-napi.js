"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const base_1 = tslib_1.__importDefault(require("./base"));
const Errors_1 = require("../../util/Errors");
const zstd = tslib_1.__importStar(require("zstd-napi"));
class ZstdCompressor extends base_1.default {
    _decompressQueue;
    stream;
    constructor(shard) {
        super(shard);
        this._decompressQueue = Promise.resolve();
        this.stream = new zstd.DecompressStream();
    }
    async decompress(data) {
        let result = null;
        this._decompressQueue = this._decompressQueue.then(async () => await new Promise(resolve => {
            const chunks = [];
            const onData = (chunk) => {
                chunks.push(chunk);
            };
            this.stream.on("data", onData);
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
exports.default = ZstdCompressor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoienN0ZC1uYXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbGliL2dhdGV3YXkvY29tcHJlc3Npb24venN0ZC1uYXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDBEQUFnQztBQUVoQyw4Q0FBaUQ7QUFDakQsd0RBQWtDO0FBRWxDLE1BQXFCLGNBQWUsU0FBUSxjQUFVO0lBQ2xELGdCQUFnQixDQUFnQjtJQUNoQyxNQUFNLENBQXdCO0lBQzlCLFlBQVksS0FBWTtRQUNwQixLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDYixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUM5QyxDQUFDO0lBRUQsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFZO1FBQ3pCLElBQUksTUFBTSxHQUFrQixJQUFJLENBQUM7UUFDakMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFHLEVBQUUsQ0FBQyxNQUFNLElBQUksT0FBTyxDQUFPLE9BQU8sQ0FBQyxFQUFFO1lBQzVGLE1BQU0sTUFBTSxHQUFrQixFQUFFLENBQUM7WUFDakMsTUFBTSxNQUFNLEdBQUcsQ0FBQyxLQUFhLEVBQVEsRUFBRTtnQkFDbkMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN2QixDQUFDLENBQUM7WUFFRixJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDL0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUMsRUFBRTtnQkFDdEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUNoQyxJQUFJLEtBQUssRUFBRSxDQUFDO29CQUNSLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxxQkFBWSxDQUFDLDhCQUE4QixNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNwRyxNQUFNLEdBQUcsSUFBSSxDQUFDO29CQUNkLE9BQU8sRUFBRSxDQUFDO29CQUNWLE9BQU87Z0JBQ1gsQ0FBQztnQkFFRCxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDNUQsT0FBTyxFQUFFLENBQUM7WUFDZCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFSixNQUFNLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztRQUM1QixPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0NBQ0o7QUFuQ0QsaUNBbUNDIn0=