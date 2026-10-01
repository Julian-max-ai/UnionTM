"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module Util */
const Routes_1 = require("./Routes");
const Errors_1 = require("./Errors");
const message_components_1 = require("./parsing/message-components");
const modal_components_1 = require("./parsing/modal-components");
const embeds_1 = require("./parsing/embeds");
const application_command_options_1 = require("./parsing/application-command-options");
const Constants_1 = require("../Constants");
const Member_1 = tslib_1.__importDefault(require("../structures/Member"));
const Channel_1 = tslib_1.__importDefault(require("../structures/Channel"));
const Message_1 = tslib_1.__importDefault(require("../structures/Message"));
const Entitlement_1 = tslib_1.__importDefault(require("../structures/Entitlement"));
const TestEntitlement_1 = tslib_1.__importDefault(require("../structures/TestEntitlement"));
const Subscription_1 = tslib_1.__importDefault(require("../structures/Subscription"));
const node_util_1 = require("node:util");
/** A general set of utilities. These are intentionally poorly documented, as they serve almost no usefulness to outside developers. */
class Util {
    _client;
    constructor(client) {
        this._client = client;
    }
    static rawEmbeds(embeds) {
        const data = Util.prototype.embedsToParsed(Array.isArray(embeds) ? embeds : [embeds]);
        return Array.isArray(embeds) ? data : data[0];
    }
    static rawMessageComponents(components) {
        const data = Util.prototype.componentsToParsed(Array.isArray(components) ? components : [components]);
        return Array.isArray(components) ? data : data[0];
    }
    static rawModalComponents(components) {
        const data = Util.prototype.componentsToParsed(Array.isArray(components) ? components : [components]);
        return Array.isArray(components) ? data : data[0];
    }
    /** @hidden intentionally not documented - this is an internal function */
    _arrayToCSV(data, header) {
        return Buffer.from([header, ...data].filter(Boolean).join("\n"), "utf8");
    }
    /** @hidden intentionally not documented - this is an internal function */
    _arrayToCSVFile(data, name, header) {
        return {
            name: `${name}.csv`,
            field: name,
            contents: this._arrayToCSV(data, header),
            index: undefined
        };
    }
    /** @hidden intentionally not documented - this is an internal function */
    _convertImage(image, name) {
        try {
            return this.convertImage(image);
        }
        catch (err) {
            throw new TypeError(`Invalid ${name} provided. Ensure you are providing a valid, fully-qualified base64 url.`, { cause: err });
        }
    }
    /** @hidden intended for internal use only */
    _convertSound(sound, name) {
        try {
            return this.convertSound(sound);
        }
        catch (err) {
            throw new TypeError(`Invalid ${name} provided. Ensure you are providing a valid, fully-qualified base64 url.`, { cause: err });
        }
    }
    /** @internal */
    _freeze(obj, detail) {
        let message = "This is an error in the library and should be reported.";
        if (detail) {
            message += `Detail: ${detail}`;
        }
        if (typeof obj !== "object" || obj === null || node_util_1.types.isProxy(obj)) {
            return obj;
        }
        return new Proxy(obj, {
            set: (target, prop, value, receiver) => {
                this._client.emit("error", new Errors_1.FrozenModificationError(message, prop));
                return Reflect.set(target, prop, value, receiver);
            }
        });
    }
    /** @hidden intended for internal use only */
    _getLimit(name, id) {
        const opt = this._client.options.collectionLimits[name];
        if (typeof opt === "number") {
            return opt;
        }
        return (id === undefined ? undefined : opt[id]) ?? opt.default ?? Infinity;
    }
    /** @hidden intended for internal use only */
    _isModuleInstalled(name) {
        try {
            // eslint-disable-next-line unicorn/prefer-module
            require(name);
            return true;
        }
        catch {
            return false;
        }
    }
    _setLimit(values, defaultValue = Infinity) {
        if (values === undefined) {
            return defaultValue;
        }
        if (typeof values === "object") {
            return { default: defaultValue, ...values };
        }
        return values;
    }
    componentToParsed(component) {
        return (0, message_components_1.fromRaw)(component);
    }
    componentToRaw(component) {
        return (0, message_components_1.toRaw)(component);
    }
    componentsToParsed(components) {
        return components.map(component => this.componentToParsed(component));
    }
    componentsToRaw(components) {
        return components.map(component => this.componentToRaw(component));
    }
    convertApplicationEmoji(raw) {
        return this.convertGuildEmoji(raw);
    }
    convertGuildEmoji(raw) {
        return {
            animated: raw.animated,
            available: raw.available,
            id: raw.id,
            managed: raw.managed,
            name: raw.name,
            requireColons: raw.require_colons,
            roles: raw.roles,
            user: raw.user ? this._client.users.update(raw.user) : undefined
        };
    }
    convertImage(img) {
        if (Buffer.isBuffer(img)) {
            const b64 = img.toString("base64");
            let mime;
            const magicMap = [
                // 47 49 46 38
                ["image/gif", /^47494638/],
                // 89 50 4E 47
                ["image/png", /^89504E47/],
                // FF D8 FF
                ["image/jpeg", /^FFD8FF/],
                // 52 49 46 46 ?? ?? ?? ?? 57 45 42 50
                ["image/webp", /^52494646\d{8}57454250/],
                // 02 27 62 20 22 0 - lottie JSON (assuming all files will start with {"v":")
                ["application/json", /^02276220220/]
            ];
            for (const format of magicMap) {
                if (format[1].test(this.getMagic(img, 16))) {
                    mime = format[0];
                    break;
                }
            }
            if (!mime) {
                throw new TypeError(`Failed to determine image format. (magic: ${this.getMagic(img, 16)})`);
            }
            img = `data:${mime};base64,${b64}`;
        }
        return img;
    }
    convertScheduledEventException(raw) {
        return {
            eventExceptionID: raw.event_exception_id,
            eventID: raw.event_id,
            isCanceled: raw.is_canceled,
            scheduledEndTime: raw.scheduled_end_time === null ? null : new Date(raw.scheduled_end_time),
            scheduledStartTime: raw.scheduled_start_time === null ? null : new Date(raw.scheduled_start_time)
        };
    }
    convertSound(audio) {
        if (Buffer.isBuffer(audio)) {
            const b64 = audio.toString("base64");
            let mime;
            const magicMap = [
                // 49 44 33
                ["audio/mpeg", /^494433/],
                // FF FB
                ["audio/mpeg", /^FFFB/],
                // 4F 67 67 53
                ["audio/ogg", /^4F676753/]
            ];
            for (const format of magicMap) {
                if (format[1].test(this.getMagic(audio, 16))) {
                    mime = format[0];
                    break;
                }
            }
            if (!mime) {
                throw new TypeError(`Failed to determine sound format. (magic: ${this.getMagic(audio, 16)})`);
            }
            audio = `data:${mime};base64,${b64}`;
        }
        return audio;
    }
    convertSticker(raw) {
        return {
            asset: raw.asset,
            available: raw.available,
            description: raw.description,
            formatType: raw.format_type,
            guildID: raw.guild_id,
            id: raw.id,
            name: raw.name,
            packID: raw.pack_id,
            sortValue: raw.sort_value,
            tags: raw.tags,
            type: raw.type,
            user: raw.user ? this._client.users.update(raw.user) : undefined
        };
    }
    async detectMissingPrivilegedIntents(intents) {
        const application = this._client["_application"] || await this._client.rest.applications.getClient();
        intents ??= this._client.shards.options.intents;
        this._client["_application"] ??= application;
        const missing = [];
        const check = (intent, allowed) => {
            if ((intents & intent) === intent && !allowed.some(flag => (application.flags & flag) === flag)) {
                missing.push(Constants_1.Intents[intent]);
            }
        };
        for (const [intent, allowed] of Constants_1.PrivilegedIntentMapping) {
            check(intent, allowed);
        }
        return missing;
    }
    embedsToParsed(embeds) {
        return embeds.map(embed => (0, embeds_1.fromRaw)(embed));
    }
    embedsToRaw(embeds) {
        return embeds.map(embed => (0, embeds_1.toRaw)(embed));
    }
    formatAllowedMentions(allowed) {
        const result = {
            parse: [],
            replied_user: undefined,
            roles: undefined,
            users: undefined
        };
        if (!allowed) {
            return this.formatAllowedMentions(this._client.options.allowedMentions);
        }
        if (allowed.everyone === true) {
            result.parse.push("everyone");
        }
        if (allowed.roles === true) {
            result.parse.push("roles");
        }
        else if (Array.isArray(allowed.roles)) {
            result.roles = allowed.roles;
        }
        if (allowed.users === true) {
            result.parse.push("users");
        }
        else if (Array.isArray(allowed.users)) {
            result.users = allowed.users;
        }
        if (allowed.repliedUser === true) {
            result.replied_user = true;
        }
        return result;
    }
    formatImage(url, format, size) {
        if (!format || !Constants_1.ImageFormats.includes(format.toLowerCase())) {
            format = url.includes("/a_") ? "gif" : this._client.options.defaultImageFormat;
        }
        if (!size || !Constants_1.MEDIA_PROXY_SIZES.includes(size)) {
            size = this._client.options.defaultImageSize;
        }
        return `${Routes_1.CDN_URL}${url}.${format}?size=${size}`;
    }
    getMagic(file, len = 4) {
        return [...new Uint8Array(file.subarray(0, len))].map(b => b.toString(16).padStart(2, "0")).join("").toUpperCase();
    }
    modalSubmitComponentsToParsed(components) {
        return components.map(component => (0, modal_components_1.fromRaw)(component));
    }
    modalSubmitComponentsToRaw(components) {
        return components.map(component => (0, modal_components_1.toRaw)(component));
    }
    optionToParsed(option) {
        return (0, application_command_options_1.fromRaw)(option);
    }
    optionToRaw(option) {
        return (0, application_command_options_1.toRaw)(option);
    }
    /** @internal */
    replacePollAnswer(poll, answerID, count, users) {
        let answerCount = poll.results.answerCounts.find(a => a.id === answerID);
        if (!answerCount) {
            answerCount = {
                count,
                id: answerID,
                users: [],
                meVoted: false
            };
        }
        answerCount.count = count;
        if (users) {
            answerCount.users = users;
            answerCount.meVoted = (this._client["_user"] && users.includes(this._client["_user"]?.id)) ?? false;
        }
    }
    updateChannel(channelData) {
        guild: if (channelData.guild_id) {
            const guild = this._client.guilds.get(channelData.guild_id);
            if (guild) {
                if (Constants_1.ThreadChannelTypes.includes(channelData.type)) {
                    if (!channelData.parent_id) {
                        break guild;
                    }
                    return guild.threads.update(channelData);
                }
                else {
                    return guild.channels.update(channelData);
                }
            }
        }
        switch (channelData.type) {
            case Constants_1.ChannelTypes.DM: return this._client.privateChannels.update(channelData);
            case Constants_1.ChannelTypes.GROUP_DM: return this._client.groupChannels.update(channelData);
            default: return Channel_1.default.from(channelData, this._client);
        }
    }
    /** @internal */
    updateEntitlement(data) {
        if (this._client["_application"] === undefined || data.application_id !== this._client["_application"].id) {
            return "subscription_id" in data && data.subscription_id ?
                new Entitlement_1.default(data, this._client) :
                new TestEntitlement_1.default(data, this._client);
        }
        else {
            return this._client.application.entitlements.update(data);
        }
    }
    /** @internal */
    updateMember(guildID, memberID, member) {
        const guild = this._client.guilds.get(guildID);
        if (guild && this._client["_user"] && this._client.user.id === memberID) {
            if (guild["_clientMember"]) {
                guild["_clientMember"]["update"](member);
            }
            else {
                guild["_clientMember"] = guild.members.update({ ...member, id: memberID }, guildID);
            }
            return guild["_clientMember"];
        }
        return guild ? guild.members.update({ ...member, id: memberID }, guildID) : new Member_1.default({ ...member, id: memberID }, this._client, guildID);
    }
    /** @internal */
    updateMessage(data) {
        const channel = this._client.getChannel(data.channel_id);
        if (channel && "messages" in channel) {
            return channel.messages.update(data);
        }
        return new Message_1.default(data, this._client);
    }
    /** @internal */
    updatePollAnswer(poll, answerID, count, user) {
        let answerCount = poll.results.answerCounts.find(a => a.id === answerID);
        if (!answerCount) {
            if (count === -1) {
                return;
            }
            answerCount = {
                count,
                id: answerID,
                users: user ? [user] : [],
                meVoted: user === this._client["_user"]?.id
            };
            poll.results.answerCounts.push(answerCount);
            return;
        }
        answerCount.count += count;
        if (user) {
            if (count === 1 && !answerCount.users.includes(user)) {
                answerCount.users.push(user);
                answerCount.meVoted = user === this._client["_user"]?.id;
            }
            else if (count === -1 && answerCount.users.includes(user)) {
                answerCount.users.splice(answerCount.users.indexOf(user), 1);
                if (user === this._client["_user"]?.id) {
                    answerCount.meVoted = false;
                }
            }
        }
    }
    /** @internal */
    updateSubscription(data) {
        if (this._client["_application"] === undefined) {
            return new Subscription_1.default(data, this._client);
        }
        else {
            return this._client.application.subscriptions.update(data);
        }
    }
    /** @internal */
    updateThread(threadData) {
        const guild = this._client.guilds.get(threadData.guild_id);
        if (guild) {
            return guild.threads.update(threadData);
        }
        return Channel_1.default.from(threadData, this._client);
    }
}
exports.default = Util;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi91dGlsL1V0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbUJBQW1CO0FBQ25CLHFDQUFtQztBQUNuQyxxQ0FBbUQ7QUFDbkQscUVBQW9IO0FBQ3BILGlFQUEwSDtBQUMxSCw2Q0FBZ0Y7QUFDaEYsdUZBQTJJO0FBRzNJLDRDQVVzQjtBQUN0QiwwRUFBMEM7QUFDMUMsNEVBQTRDO0FBQzVDLDRFQUE0QztBQUM1QyxvRkFBb0Q7QUFDcEQsNEZBQTREO0FBRTVELHNGQUFzRDtBQUN0RCx5Q0FBa0M7QUFFbEMsdUlBQXVJO0FBQ3ZJLE1BQXFCLElBQUk7SUFDYixPQUFPLENBQVM7SUFFeEIsWUFBWSxNQUFjO1FBQ3RCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO0lBQzFCLENBQUM7SUFJRCxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQWdFO1FBQzdFLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ3RGLE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUlELE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxVQUEwRjtRQUNsSCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQ3RHLE9BQU8sS0FBSyxDQUFDLE9BQU8s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