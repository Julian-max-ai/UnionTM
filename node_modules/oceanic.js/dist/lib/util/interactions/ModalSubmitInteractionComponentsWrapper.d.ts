import type * as Types from "../../types/namespaced";
import type Role from "../../structures/Role";
import type User from "../../structures/User";
import type InteractionResolvedChannel from "../../structures/InteractionResolvedChannel";
import type Attachment from "../../structures/Attachment";
/** A wrapper for interaction components. */
export default class ModalSubmitInteractionComponentsWrapper {
    /** The raw components from Discord.  */
    raw: Array<Types.Interactions.ModalSubmitComponentsActionRow | Types.Interactions.ModalSubmitComponentsLabel>;
    resolved: Types.Interactions.ModalSubmitInteractionResolvedData;
    constructor(resolved: Types.Interactions.ModalSubmitInteractionResolvedData, data: Array<Types.Interactions.ModalSubmitComponentsActionRow | Types.Interactions.ModalSubmitComponentsLabel>);
    private _getComponent;
    /**
     * Get a channel select option.
     * @param name The name of the option.
     * @param required If true, an error will be thrown if the option is not present.
     */
    getChannelSelectComponent(name: string, required?: false): Types.Interactions.ModalSubmitChannelSelectComponent | undefined;
    getChannelSelectComponent(name: string, required: true): Types.Interactions.ModalSubmitChannelSelectComponent;
    /**
     * Get the values of a channel select option. This always returns an array, since selects can be multi-choice.
     * @param name The name of the option.
     * @param required If true, an error will be thrown if the option is not present.
     */
    getChannelSelectValues(name: string, required?: false): Array<InteractionResolvedChannel> | undefined;
    getChannelSelectValues(name: string, required: true): Array<InteractionResolvedChannel>;
    /**
     * Get a checkbox option.
     * @param name The name of the option
     * @param required If true, an error will be thrown if the option is not present.
     */
    getCheckboxComponent(name: string, required?: false): Types.Interactions.ModalSubmitCheckboxComponent | undefined;
    getCheckboxComponent(name: string, required: true): Types.Interactions.ModalSubmitCheckboxComponent;
    /**
     * Get a checkbox group option.
     * @param name The name of the option.
     * @param required If true, an error will be thrown if the option is not present.
     */
    getCheckboxGroupComponent(name: string, required?: false): Types.Interactions.ModalSubmitCheckboxGroupComponent | undefined;
    getCheckboxGroupComponent(name: string, required: true): Types.Interactions.ModalSubmitCheckboxGroupComponent;
    /**
     * Get the values of a checkbox group option.
     * @param name The name of the option.
     * @param required If true, an error will be thrown if the option is not present.
     */
    getCheckboxGroupValues(name: string, required?: false): Array<string> | undefined;
    getCheckboxGroupValues(name: string, required: true): Array<string>;
    /**
     * Get the value of a checkbox option.
     * @param name The name of the option
     * @param required If true, an error will be thrown if the option is not present.
     */
    getCheckboxValue(name: string, required?: false): boolean | undefined;
    getCheckboxValue(name: string, required: true): boolean;
    /** Get the components in this interaction. */
    getComponents(): Array<Types.Interactions.ModalSubmitComponents>;
    /**
     * Get a file upload option.
     * @param name The name of the option.
     * @param required If true, an error will be thrown if the option is not present.
     */
    getFileUploadComponent(name: string, required?: false): Types.Interactions.ModalSubmitFileUploadComponent | undefined;
    getFileUploadComponent(name: string, required: true): Types.Interactions.ModalSubmitFileUploadComponent;
    /**
     * Get the values of a file upload option.
     * @param name The name of the option.
     * @param required If true, an error will be thrown if the option is not present.
     */
    getFileUploadValues(name: string, required?: false): Array<Attachment> | undefined;
    getFileUploadValues(name: string, required: true): Array<Attachment>;
    /**
     * Get a mentionable select option.
     * @param name The name of the option.
     * @param required If true, an error will be thrown if the option is not present.
     */
    getMentionableSelectComponent(name: string, required?: false): Types.Interactions.ModalSubmitMentionableSelectComponent | undefined;
    getMentionableSelectComponent(name: string, required: true): Types.Interactions.ModalSubmitMentionableSelectComponent;
    /**
     * Get the values of a mentionable select option. This always returns an array, since selects can be multi-choice.
     * @param name The name of the option.
     * @param required If true, an error will be thrown if the option is not present.
     */
    getMentionableSelectValues(name: string, required?: false): Array<User | Role> | undefined;
    getMentionableSelectValues(name: string, required: true): Array<User | Role>;
    /**
     * Get a radio group option.
     * @param name The name of the option.
     * @param required If true, an error will be thrown if the option is not present.
     */
    getRadioGroupComponent(name: string, required?: false): Types.Interactions.ModalSubmitRadioGroupComponent | undefined;
    getRadioGroupComponent(name: string, required: true): Types.Interactions.ModalSubmitRadioGroupComponent;
    /**
     * Get the value of a radio group option.
     * @param name The name of the option.
     * @param required If true, an error will be thrown if the option is not present.
     *
     * Note: If no option is selected, `null` will be returned.
     */
    getRadioGroupValue(name: string, required?: false): string | null | undefined;
    getRadioGroupValue(name: string, required: true): string | null;
    /**
     * Get a role select option.
     * @param name The name of the option.
     * @param required If true, an error will be thrown if the option is not present.
     */
    getRoleSelectComponent(name: string, required?: false): Types.Interactions.ModalSubmitRoleSelectComponent | undefined;
    getRoleSelectComponent(name: string, required: true): Types.Interactions.ModalSubmitRoleSelectComponent;
    /**
     * Get the values of a role select option. This always returns an array, since selects can be multi-choice.
     * @param name The name of the option.
     * @param required If true, an error will be thrown if the option is not present.
     */
    getRoleSelectValues(name: string, required?: false): Array<Role> | undefined;
    getRoleSelectValues(name: string, required: true): Array<Role>;
    /**
     * Get a string select option.
     * @param name The name of the option.
     * @param required If true, an error will be thrown if the option is not present.
     */
    getStringSelectComponent(name: string, required?: false): Types.Interactions.ModalSubmitStringSelectComponent | undefined;
    getStringSelectComponent(name: string, required: true): Types.Interactions.ModalSubmitStringSelectComponent;
    /**
     * Get the values of a string select option. This always returns an array, since selects can be multi-choice.
     * @param name The name of the option.
     * @param required If true, an error will be thrown if the option is not present.
     */
    getStringSelectValues<T extends Array<string> = Array<string>>(name: string, required?: false): T | undefined;
    getStringSelectValues<T extends Array<string> = Array<string>>(name: string, required: true): T;
    /**
     * Get a text input option value.
     * @param name The name of the option.
     * @param required If true, an error will be thrown if the option is not present.
     */
    getTextInput<T extends string = string>(name: string, required?: false): T | undefined;
    getTextInput<T extends string = string>(name: string, required: true): T;
    /**
     * Get a text input option.
     * @param name The name of the option.
     * @param required If true, an error will be thrown if the option is not present.
     */
    getTextInputComponent(name: string, required?: false): Types.Interactions.ModalSubmitTextInputComponent | undefined;
    getTextInputComponent(name: string, required: true): Types.Interactions.ModalSubmitTextInputComponent;
    /**
     * Get a user select option.
     * @param name The name of the option.
     * @param required If true, an error will be thrown if the option is not present.
     */
    getUserSelectComponent(name: string, required?: false): Types.Interactions.ModalSubmitUserSelectComponent | undefined;
    getUserSelectComponent(name: string, required: true): Types.Interactions.ModalSubmitUserSelectComponent;
    /**
     * Get the values of a user select option. This always returns an array, since selects can be multi-choice.
     * @param name The name of the option.
     * @param required If true, an error will be thrown if the option is not present.
     */
    getUserSelectValues(name: string, required?: false): Array<User> | undefined;
    getUserSelectValues(name: string, required: true): Array<User>;
}
