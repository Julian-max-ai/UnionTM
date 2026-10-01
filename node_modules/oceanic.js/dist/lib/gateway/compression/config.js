"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Errors_1 = require("../../util/Errors");
const node_path_1 = tslib_1.__importDefault(require("node:path"));
const node_zlib_1 = tslib_1.__importDefault(require("node:zlib"));
/* eslint-disable @typescript-eslint/explicit-function-return-type, @typescript-eslint/no-unused-vars, @typescript-eslint/no-var-requires, unicorn/prefer-module */
const CompressionConfigs = {
    "zlib-stream": [
        {
            name: "zlib-sync",
            check: (client) => client.util._isModuleInstalled("zlib-sync"),
            getClass: () => require(node_path_1.default.join(__dirname, "zlib-sync")).default,
            getError: () => new Errors_1.DependencyError("zlib-sync based zlib-stream compression is not available: zlib-sync is not installed")
        },
        {
            name: "pako",
            check: (client) => client.util._isModuleInstalled("pako"),
            getClass: () => require(node_path_1.default.join(__dirname, "pako")).default,
            getError: () => new Errors_1.DependencyError("pako based zlib-stream compression is not available: pako is not installed")
        },
        {
            name: "native",
            check: (_client) => "createInflate" in node_zlib_1.default,
            getClass: () => require(node_path_1.default.join(__dirname, "zlib-native")).default,
            getError: () => new Errors_1.DependencyError("native zlib-stream compression is not available: zlib.createInflate does not exist")
        }
    ],
    "zstd-stream": [
        {
            name: "zstd-napi",
            check: (client) => client.util._isModuleInstalled("zstd-napi"),
            getClass: () => require(node_path_1.default.join(__dirname, "zstd-napi")).default,
            getError: () => new Errors_1.DependencyError("zstd-napi based zstd-stream compression is not available: zstd-napi is not installed")
        },
        {
            name: "native",
            check: (_client) => "createZstdDecompress" in node_zlib_1.default,
            getClass: () => require(node_path_1.default.join(__dirname, "zstd-native")).default,
            getError: () => new Errors_1.DependencyError("native zstd-stream compression is not available: zlib.createZstdDecompress does not exist")
        }
    ]
};
/* eslint-enable @typescript-eslint/explicit-function-return-type, @typescript-eslint/no-unused-vars */
exports.default = CompressionConfigs;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbGliL2dhdGV3YXkvY29tcHJlc3Npb24vY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLDhDQUFvRDtBQUVwRCxrRUFBNkI7QUFDN0Isa0VBQTZCO0FBWTdCLG1LQUFtSztBQUNuSyxNQUFNLGtCQUFrQixHQUE2QztJQUNqRSxhQUFhLEVBQUU7UUFDWDtZQUNJLElBQUksRUFBTSxXQUFXO1lBQ3JCLEtBQUssRUFBSyxDQUFDLE1BQWMsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLENBQUM7WUFDekUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFFLE9BQU8sQ0FBQyxtQkFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsV0FBVyxDQUFDLENBQXVCLENBQUMsT0FBTztZQUN6RixRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSx3QkFBZSxDQUFDLHNGQUFzRixDQUFDO1NBQzlIO1FBQ0Q7WUFDSSxJQUFJLEVBQU0sTUFBTTtZQUNoQixLQUFLLEVBQUssQ0FBQyxNQUFjLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDO1lBQ3BFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBRSxPQUFPLENBQUMsbUJBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUF1QixDQUFDLE9BQU87WUFDcEYsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksd0JBQWUsQ0FBQyw0RUFBNEUsQ0FBQztTQUNwSDtRQUNEO1lBQ0ksSUFBSSxFQUFNLFFBQVE7WUFDbEIsS0FBSyxFQUFLLENBQUMsT0FBZSxFQUFFLEVBQUUsQ0FBQyxlQUFlLElBQUksbUJBQUk7WUFDdEQsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFFLE9BQU8sQ0FBQyxtQkFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsYUFBYSxDQUFDLENBQXVCLENBQUMsT0FBTztZQUMzRixRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSx3QkFBZSxDQUFDLG9GQUFvRixDQUFDO1NBQzVIO0tBQ0o7SUFDRCxhQUFhLEVBQUU7UUFDWDtZQUNJLElBQUksRUFBTSxXQUFXO1lBQ3JCLEtBQUssRUFBSyxDQUFDLE1BQWMsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLENBQUM7WUFDekUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFFLE9BQU8sQ0FBQyxtQkFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsV0FBVyxDQUFDLENBQXVCLENBQUMsT0FBTztZQUN6RixRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSx3QkFBZSxDQUFDLHNGQUFzRixDQUFDO1NBQzlIO1FBQ0Q7WUFDSSxJQUFJLEVBQU0sUUFBUTtZQUNsQixLQUFLLEVBQUssQ0FBQyxPQUFlLEVBQUUsRUFBRSxDQUFDLHNCQUFzQixJQUFJLG1CQUFJO1lBQzdELFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBRSxPQUFPLENBQUMsbUJBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLGFBQWEsQ0FBQyxDQUF1QixDQUFDLE9BQU87WUFDM0YsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksd0JBQWUsQ0FBQywyRkFBMkYsQ0FBQztTQUNuSTtLQUNKO0NBQ0osQ0FBQztBQUNGLHVHQUF1RztBQUV2RyxrQkFBZSxrQkFBa0IsQ0FBQyJ9