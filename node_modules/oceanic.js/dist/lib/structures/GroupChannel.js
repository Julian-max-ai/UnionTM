"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module GroupChannel */
const Channel_1 = tslib_1.__importDefault(require("./Channel"));
const User_1 = tslib_1.__importDefault(require("./User"));
const Routes = tslib_1.__importStar(require("../util/Routes"));
const TypedCollection_1 = tslib_1.__importDefault(require("../util/TypedCollection"));
/** Represents a group direct message. */
class GroupChannel extends Channel_1.default {
    /** The application that made this group channel. */
    application;
    /** The ID of the application that made this group channel. */
    applicationID;
    /** The icon hash of this group, if any. */
    icon;
    /** The ID of last message sent in this channel. */
    lastMessageID;
    /** The timestamp of the last pinned message in this channel. */
    lastPinTimestamp;
    /** If this group channel is managed by an application. */
    managed;
    /** The name of this group channel. */
    name;
    /** The nicknames used when creating this group channel. */
    nicks;
    /** The owner of this group channel. */
    owner;
    /** The ID of the owner of this group channel. */
    ownerID;
    /** The other recipients in this group channel. */
    recipients;
    constructor(data, client) {
        super(data, client);
        this.applicationID = data.application_id;
        this.icon = null;
        this.lastMessageID = data.last_message_id;
        this.lastPinTimestamp = data.last_pin_timestamp ?? null;
        this.managed = false;
        this.name = data.name;
        this.nicks = [];
        this.owner = this.client.users.get(data.owner_id);
        this.ownerID = data.owner_id;
        this.recipients = new TypedCollection_1.default(User_1.default, client, Infinity, {
            construct: (user) => client.users.update(user)
        });
        for (const r of data.recipients)
            this.recipients.update(r);
        this.update(data);
    }
    update(data) {
        super.update(data);
        if (data.application_id !== undefined) {
            this.application = this.client["_application"] && this.client.application.id === data.application_id ? this.client.application : undefined;
            this.applicationID = data.application_id;
        }
        if (data.icon !== undefined) {
            this.icon = data.icon;
        }
        if (data.last_message_id !== undefined) {
            this.lastMessageID = data.last_message_id;
        }
        if (data.last_pin_timestamp !== undefined) {
            this.lastPinTimestamp = data.last_pin_timestamp;
        }
        if (data.managed !== undefined) {
            this.managed = data.managed;
        }
        if (data.name !== undefined) {
            this.name = data.name;
        }
        if (data.nicks !== undefined) {
            /**
             * Forward this message.
             * @param channelID The ID of the channel to forward the message to.
             * @param options The options for the message.
             */
            this.nicks = data.nicks;
        }
        if (data.owner_id !== undefined) {
            this.owner = this.client.users.get(data.owner_id);
            this.ownerID = data.owner_id;
        }
        if (data.type !== undefined) {
            this.type = data.type;
        }
        if (data.recipients !== undefined) {
            this.recipients.clear();
            for (const r of data.recipients) {
                this.recipients.update(r);
            }
        }
    }
    /**
     * Add a user to this channel.
     * @param options The options for adding the user.
     */
    async addRecipient(options) {
        return this.client.rest.channels.addGroupRecipient(this.id, options);
    }
    /**
     * Edit this channel.
     * @param options The options for editing the channel.
     */
    async edit(options) {
        return this.client.rest.channels.edit(this.id, options);
    }
    /**
     * The url of this application's icon.
     * @param format The format the url should be.
     * @param size The dimensions of the image.
     */
    iconURL(format, size) {
        return this.icon === null ? null : this.client.util.formatImage(Routes.APPLICATION_ICON(this.applicationID, this.icon), format, size);
    }
    /**
     * Remove a user from this channel.
     * @param userID The ID of the user to remove.
     */
    async removeRecipient(userID) {
        return this.client.rest.channels.removeGroupRecipient(this.id, userID);
    }
    /**
     * Show a typing indicator in this channel.
     */
    async sendTyping() {
        return this.client.rest.channels.sendTyping(this.id);
    }
    toJSON() {
        return {
            ...super.toJSON(),
            applicationID: this.applicationID,
            icon: this.icon,
            lastMessageID: this.lastMessageID,
            lastPinTimestamp: this.lastPinTimestamp,
            managed: this.managed,
            name: this.name,
            nicks: this.nicks,
            ownerID: this.ownerID,
            recipients: this.recipients.map(user => user.toJSON()),
            type: this.type
        };
    }
}
exports.default = GroupChannel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3JvdXBDaGFubmVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL3N0cnVjdHVyZXMvR3JvdXBDaGFubmVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJCQUEyQjtBQUMzQixnRUFBZ0M7QUFDaEMsMERBQTBCO0FBSzFCLCtEQUF5QztBQUN6QyxzRkFBc0Q7QUFFdEQseUNBQXlDO0FBQ3pDLE1BQXFCLFlBQWEsU0FBUSxpQkFBTztJQUM3QyxvREFBb0Q7SUFDcEQsV0FBVyxDQUFxQjtJQUNoQyw4REFBOEQ7SUFDOUQsYUFBYSxDQUFTO0lBQ3RCLDJDQUEyQztJQUMzQyxJQUFJLENBQWdCO0lBQ3BCLG1EQUFtRDtJQUNuRCxhQUFhLENBQWdCO0lBQzdCLGdFQUFnRTtJQUNoRSxnQkFBZ0IsQ0FBZ0I7SUFDaEMsMERBQTBEO0lBQzFELE9BQU8sQ0FBVTtJQUNqQixzQ0FBc0M7SUFDdEMsSUFBSSxDQUFnQjtJQUNwQiwyREFBMkQ7SUFDM0QsS0FBSyxDQUF1QztJQUM1Qyx1Q0FBdUM7SUFDdkMsS0FBSyxDQUFRO0lBQ2IsaURBQWlEO0lBQ2pELE9BQU8sQ0FBUztJQUNoQixrREFBa0Q7SUFDbEQsVUFBVSxDQUE2QztJQUV2RCxZQUFZLElBQW9DLEVBQUUsTUFBYztRQUM1RCxLQUFLLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQztRQUN6QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUM7UUFDMUMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxrQkFBa0IsSUFBSSxJQUFJLENBQUM7UUFDeEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDckIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxD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