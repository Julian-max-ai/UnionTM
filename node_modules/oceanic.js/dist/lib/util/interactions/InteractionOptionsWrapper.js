"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Errors_1 = require("../Errors");
const Constants_1 = require("../../Constants");
/** A wrapper for interaction options. */
class InteractionOptionsWrapper {
    /** The raw options from Discord.  */
    raw;
    /** The resolved data for this options instance. */
    resolved;
    constructor(data, resolved) {
        this.raw = data;
        this.resolved = resolved;
    }
    _getOption(name, required = false, type) {
        const opt = this.getOptions().find(o => o.name === name && o.type === type);
        if (!opt && required) {
            throw new Errors_1.WrapperError(`Missing required option: ${name}`);
        }
        else {
            return opt;
        }
    }
    getAttachment(name, required) {
        if (this.resolved === null) {
            throw new TypeError("Attempt to use getAttachment with null resolved. If this is on an autocomplete interaction, use getAttachmentOption instead.");
        }
        let val;
        if (!(val = this.getAttachmentOption(name, required)?.value)) {
            return undefined;
        }
        const a = this.resolved.attachments.get(val);
        if (!a && required) {
            throw new Errors_1.WrapperError(`Attachment not present for required option: ${name}`);
        }
        return a;
    }
    getAttachmentOption(name, required) {
        return this._getOption(name, required, Constants_1.ApplicationCommandOptionTypes.ATTACHMENT);
    }
    getBoolean(name, required) {
        return this.getBooleanOption(name, required)?.value;
    }
    getBooleanOption(name, required) {
        return this._getOption(name, required, Constants_1.ApplicationCommandOptionTypes.BOOLEAN);
    }
    getChannel(name, required) {
        if (this.resolved === null) {
            throw new TypeError("Attempt to use getChannel with null resolved. If this is on an autocomplete interaction, use getChannelOption instead.");
        }
        let val;
        if (!(val = this.getChannelOption(name, required)?.value)) {
            return undefined;
        }
        const ch = this.resolved.channels.get(val);
        if (!ch && required) {
            throw new Errors_1.WrapperError(`Channel not present for required option: ${name}`);
        }
        return ch;
    }
    getChannelOption(name, required) {
        return this._getOption(name, required, Constants_1.ApplicationCommandOptionTypes.CHANNEL);
    }
    getCompleteChannel(name, required) {
        const resolved = this.getChannel(name, required);
        if (!resolved) {
            return undefined; // required will be handled in getChannel
        }
        const channel = resolved.completeChannel ?? (resolved.type === Constants_1.ChannelTypes.DM ? resolved : undefined);
        if (!channel && required) {
            throw new Errors_1.WrapperError(`Failed to resolve complete channel for required option: ${name}`);
        }
        return channel;
    }
    getFocused(required) {
        const opt = this.getOptions().find(o => o.focused === true);
        if (!opt && required) {
            throw new Errors_1.WrapperError("Missing required focused option");
        }
        else {
            return opt;
        }
    }
    getInteger(name, required) {
        return this.getIntegerOption(name, required)?.value;
    }
    getIntegerOption(name, required) {
        return this._getOption(name, required, Constants_1.ApplicationCommandOptionTypes.INTEGER);
    }
    getMember(name, required) {
        if (this.resolved === null) {
            throw new TypeError("Attempt to use getMember with null resolved. If this is on an autocomplete interaction, use getUserOption instead.");
        }
        let val;
        if (!(val = this.getUserOption(name, required)?.value)) {
            return undefined;
        }
        const ch = this.resolved.members.get(val);
        if (!ch && required) {
            throw new Errors_1.WrapperError(`Member not present for required option: ${name}`);
        }
        return ch;
    }
    getMentionable(name, required) {
        if (this.resolved === null) {
            throw new TypeError("Attempt to use getMentionable with null resolved. If this is on an autocomplete interaction, use getAttachmentOption instead.");
        }
        let val;
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        if (!(val = this._getOption(name, required, Constants_1.ApplicationCommandOptionTypes.MENTIONABLE)?.value)) {
            return undefined;
        }
        const role = this.resolved.roles.get(val);
        const user = this.resolved.users.get(val);
        if ((!role && !user) && required) {
            throw new Errors_1.WrapperError(`Value not present for required option: ${name}`);
        }
        return role ?? user;
    }
    getMentionableOption(name, required) {
        return this._getOption(name, required, Constants_1.ApplicationCommandOptionTypes.MENTIONABLE);
    }
    getNumber(name, required) {
        return this.getNumberOption(name, required)?.value;
    }
    getNumberOption(name, required) {
        return this._getOption(name, required, Constants_1.ApplicationCommandOptionTypes.NUMBER);
    }
    /** Get the options received in this interaction, excluding subcommands and subcommand groups. */
    getOptions() {
        let baseOptions;
        const sub = this.getSubCommand(false) ?? [];
        switch (sub.length) {
            case 0: {
                baseOptions = this.raw;
                break;
            }
            case 1: {
                baseOptions = this.raw.find(o => o.name === sub[0] && o.type === Constants_1.ApplicationCommandOptionTypes.SUB_COMMAND)?.options;
                break;
            }
            case 2: {
                baseOptions = this.raw.find(o => o.name === sub[0] && o.type === Constants_1.ApplicationCommandOptionTypes.SUB_COMMAND_GROUP)?.options?.find(o2 => o2.name === sub[1] && o2.type === Constants_1.ApplicationCommandOptionTypes.SUB_COMMAND)?.options;
                break;
            }
        }
        return baseOptions ?? [];
    }
    getRole(name, required) {
        if (this.resolved === null) {
            throw new TypeError("Attempt to use getRole with null resolved. If this is on an autocomplete interaction, use getRoleOption instead.");
        }
        let val;
        if (!(val = this.getRoleOption(name, required)?.value)) {
            return undefined;
        }
        const ch = this.resolved.roles.get(val);
        if (!ch && required) {
            throw new Errors_1.WrapperError(`Role not present for required option: ${name}`);
        }
        return ch;
    }
    getRoleOption(name, required) {
        return this._getOption(name, required, Constants_1.ApplicationCommandOptionTypes.ROLE);
    }
    getString(name, required) {
        return this.getStringOption(name, required)?.value;
    }
    getStringOption(name, required) {
        return this._getOption(name, required, Constants_1.ApplicationCommandOptionTypes.STRING);
    }
    getSubCommand(required) {
        const opt = this.raw.find(o => o.type === Constants_1.ApplicationCommandOptionTypes.SUB_COMMAND || o.type === Constants_1.ApplicationCommandOptionTypes.SUB_COMMAND_GROUP);
        if (opt?.options) {
            // nested
            if (opt.options.length === 1 && opt.type === Constants_1.ApplicationCommandOptionTypes.SUB_COMMAND_GROUP) {
                const sub = opt.options.find(o => o.type === Constants_1.ApplicationCommandOptionTypes.SUB_COMMAND);
                return sub?.options ? [opt.name, sub.name] : [opt.name];
            }
            else {
                return [opt.name];
            }
        }
        else {
            if (required) {
                throw new Errors_1.WrapperError("Missing required option: SubCommand/SubCommandGroup.");
            }
            else {
                return undefined;
            }
        }
    }
    getUser(name, required) {
        if (this.resolved === null) {
            throw new TypeError("Attempt to use getUser with null resolved. If this is on an autocomplete interaction, use getUseOption instead.");
        }
        let val;
        if (!(val = this.getUserOption(name, required)?.value)) {
            return undefined;
        }
        const ch = this.resolved.users.get(val);
        if (!ch && required) {
            throw new Errors_1.WrapperError(`User not present for required option: ${name}`);
        }
        return ch;
    }
    getUserOption(name, required) {
        return this._getOption(name, required, Constants_1.ApplicationCommandOptionTypes.USER);
    }
}
exports.default = InteractionOptionsWrapper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW50ZXJhY3Rpb25PcHRpb25zV3JhcHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi91dGlsL2ludGVyYWN0aW9ucy9JbnRlcmFjdGlvbk9wdGlvbnNXcmFwcGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsc0NBQXlDO0FBQ3pDLCtDQUE4RTtBQU85RSx5Q0FBeUM7QUFDekMsTUFBcUIseUJBQXlCO0lBQzFDLHFDQUFxQztJQUNyQyxHQUFHLENBQStDO0lBQ2xELG1EQUFtRDtJQUNuRCxRQUFRLENBQXNFO0lBQzlFLFlBQVksSUFBa0QsRUFBRSxRQUE2RTtRQUN6SSxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQztRQUNoQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUM3QixDQUFDO0lBRU8sVUFBVSxDQUE0RyxJQUFZLEVBQUUsUUFBUSxHQUFHLEtBQUssRUFBRSxJQUFtQztRQUM3TCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLElBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLENBQWtCLENBQUM7UUFDN0YsSUFBSSxDQUFDLEdBQUcsSUFBSSxRQUFRLEVBQUUsQ0FBQztZQUNuQixNQUFNLElBQUkscUJBQVksQ0FBQyw0QkFBNEIsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUMvRCxDQUFDO2FBQU0sQ0FBQztZQUNKLE9BQU8sR0FBRyxDQUFDO1FBQ2YsQ0FBQztJQUNMLENBQUM7SUFTRCxhQUFhLENBQUMsSUFBWSxFQUFFLFFBQWtCO1FBQzFDLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxJQUFJLEVBQUUsQ0FBQztZQUN6QixNQUFNLElBQUksU0FBUyxDQUFDLDhIQUE4SCxDQUFDLENBQUM7UUFDeEosQ0FBQztRQUNELElBQUksR0FBdUIsQ0FBQztR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