"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module Interaction */
const Base_1 = tslib_1.__importDefault(require("./Base"));
const Constants_1 = require("../Constants");
/** Represents an interaction. */
class Interaction extends Base_1.default {
    /** If this interaction has been acknowledged. */
    acknowledged;
    /** The application this interaction is for. */
    application;
    /** The ID of the application this interaction is for. */
    applicationID;
    /** The token of this interaction. */
    token;
    /** The [type](https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-interaction-type) of this interaction. */
    type;
    /** Read-only property, always `1` */
    version;
    constructor(data, client) {
        super(data.id, client);
        this.acknowledged = false;
        this.application = client["_application"] && client.application.id === data.application_id ? client.application : undefined;
        this.applicationID = data.application_id;
        Object.defineProperty(this, "token", { value: data.token, enumerable: false });
        this.type = data.type;
        this.version = data.version;
    }
    static from(data, client) {
        switch (data.type) {
            case Constants_1.InteractionTypes.PING: {
                return new PingInteraction(data, client);
            }
            case Constants_1.InteractionTypes.APPLICATION_COMMAND: {
                return new CommandInteraction(data, client);
            }
            case Constants_1.InteractionTypes.MESSAGE_COMPONENT: {
                return new ComponentInteraction(data, client);
            }
            case Constants_1.InteractionTypes.APPLICATION_COMMAND_AUTOCOMPLETE: {
                return new AutocompleteInteraction(data, client);
            }
            case Constants_1.InteractionTypes.MODAL_SUBMIT: {
                return new ModalSubmitInteraction(data, client);
            }
            default: {
                return new Interaction(data, client);
            }
        }
    }
    /** A type guard, checking if this interaction is an {@link AutocompleteInteraction | Autocomplete Interaction}. */
    isAutocompleteInteraction() {
        return this.type === Constants_1.InteractionTypes.APPLICATION_COMMAND_AUTOCOMPLETE;
    }
    /** A type guard, checking if this interaction is a {@link CommandInteraction | Command Interaction}. */
    isCommandInteraction() {
        return this.type === Constants_1.InteractionTypes.APPLICATION_COMMAND;
    }
    /** A type guard, checking if this interaction is a {@link ComponentInteraction | Component Interaction}. */
    isComponentInteraction() {
        return this.type === Constants_1.InteractionTypes.MESSAGE_COMPONENT;
    }
    /** A type guard, checking if this interaction is a {@link ModalSubmitInteraction | Modal Submit Interaction}. */
    isModalSubmitInteraction() {
        return this.type === Constants_1.InteractionTypes.MODAL_SUBMIT;
    }
    /** A type guard, checking if this interaction is a {@link PingInteraction | Ping Interaction}. */
    isPingInteraction() {
        return this.type === Constants_1.InteractionTypes.PING;
    }
    toJSON() {
        return {
            ...super.toJSON(),
            applicationID: this.applicationID,
            type: this.type,
            version: this.version
        };
    }
}
exports.default = Interaction;
// Yes this sucks, but it works. That's the important part. Circular imports are hell.
/* eslint-disable @typescript-eslint/no-var-requires, unicorn/prefer-module */
const AutocompleteInteraction = require("./AutocompleteInteraction").default;
const CommandInteraction = require("./CommandInteraction").default;
const ComponentInteraction = require("./ComponentInteraction").default;
const ModalSubmitInteraction = require("./ModalSubmitInteraction").default;
const PingInteraction = require("./PingInteraction").default;
/* eslint-enable @typescript-eslint/no-var-requires, unicorn/prefer-module */
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW50ZXJhY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvc3RydWN0dXJlcy9JbnRlcmFjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwwQkFBMEI7QUFDMUIsMERBQTBCO0FBUzFCLDRDQUFnRDtBQUdoRCxpQ0FBaUM7QUFDakMsTUFBcUIsV0FBWSxTQUFRLGNBQUk7SUFDekMsaURBQWlEO0lBQ2pELFlBQVksQ0FBVTtJQUN0QiwrQ0FBK0M7SUFDL0MsV0FBVyxDQUFxQjtJQUNoQyx5REFBeUQ7SUFDekQsYUFBYSxDQUFTO0lBQ3RCLHFDQUFxQztJQUNyQyxLQUFLLENBQVU7SUFDZixxSkFBcUo7SUFDckosSUFBSSxDQUFtQjtJQUN2QixxQ0FBcUM7SUFDckMsT0FBTyxDQUFJO0lBQ1gsWUFBWSxJQUEwQyxFQUFFLE1BQWM7UUFDbEUsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7UUFDMUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksTUFBTSxDQUFDLFdBQVcsQ0FBQyxFQUFFLEtBQUssSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1FBQzVILElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQztRQUN6QyxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUMvRSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDdEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO0lB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