"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.warning = exports.WarningCodes = void 0;
var WarningCodes;
(function (WarningCodes) {
    WarningCodes["OCEANIC_CACHE_DISABLED"] = "OCEANIC_CACHE_DISABLED";
    WarningCodes["OCEANIC_COLLECTIONS_LIMIT_WITH_CACHE_DISABLED"] = "OCEANIC_COLLECTIONS_LIMIT_WITH_CACHE_DISABLED";
    WarningCodes["OCEANIC_AUTH_AND_TOKEN_PROVIDED"] = "OCEANIC_AUTH_AND_TOKEN_PROVIDED";
})(WarningCodes || (exports.WarningCodes = WarningCodes = {}));
const WarningOptions = {
    [WarningCodes.OCEANIC_CACHE_DISABLED]: {
        detail: "Set the disableCache option to the literal string \"no-warning\" to disable this warning.",
        message: "Enabling the disableCache option is not recommended. This will break many aspects of the library, as it is not designed to function without cache."
    },
    [WarningCodes.OCEANIC_COLLECTIONS_LIMIT_WITH_CACHE_DISABLED]: {
        detail: "Remove the collectionsLimit option, or zero out all of the possible options to disable this warning.",
        message: "Providing the collectionsLimit option when the disableCache option has been enabled is redundant. Any provided values will be ignored."
    },
    [WarningCodes.OCEANIC_AUTH_AND_TOKEN_PROVIDED]: {
        detail: "Remove either the auth or token option to disable this warning.",
        message: "Providing both the token and auth options is redundant. The auth option will be used over token."
    }
};
const warnedCodes = new Set();
function warning(code) {
    if (warnedCodes.has(code))
        return;
    const options = WarningOptions[code];
    process.emitWarning(options.message, {
        code,
        detail: options.detail
    });
}
exports.warning = warning;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FybmluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi91dGlsL3dhcm5pbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsSUFBWSxZQUlYO0FBSkQsV0FBWSxZQUFZO0lBQ3BCLGlFQUFpRCxDQUFBO0lBQ2pELCtHQUErRixDQUFBO0lBQy9GLG1GQUFtRSxDQUFBO0FBQ3ZFLENBQUMsRUFKVyxZQUFZLDRCQUFaLFlBQVksUUFJdkI7QUFFRCxNQUFNLGNBQWMsR0FBRztJQUNuQixDQUFDLFlBQVksQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFO1FBQ25DLE1BQU0sRUFBRywyRkFBMkY7UUFDcEcsT0FBTyxFQUFFLG9KQUFvSjtLQUNoSztJQUNELENBQUMsWUFBWSxDQUFDLDZDQUE2QyxDQUFDLEVBQUU7UUFDMUQsTUFBTSxFQUFHLHNHQUFzRztRQUMvRyxPQUFPLEVBQUUsd0lBQXdJO0tBQ3BKO0lBQ0QsQ0FBQyxZQUFZLENBQUMsK0JBQStCLENBQUMsRUFBRTtRQUM1QyxNQUFNLEVBQUcsaUVBQWlFO1FBQzFFLE9BQU8sRUFBRSxrR0FBa0c7S0FDOUc7Q0FDa0UsQ0FBQztBQUV4RSxNQUFNLFdBQVcsR0FBRyxJQUFJLEdBQUcsRUFBZ0IsQ0FBQztBQUM1QyxTQUFnQixPQUFPLENBQUMsSUFBa0I7SUFDdEMsSUFBSSxXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztRQUFFLE9BQU87SUFFbEMsTUFBTSxPQUFPLEdBQUcsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3JDLE9BQU8sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRTtRQUNqQyxJQUFJO1FBQ0osTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNO0tBQ3pCLENBQUMsQ0FBQztBQUNQLENBQUM7QUFSRCwwQkFRQyJ9