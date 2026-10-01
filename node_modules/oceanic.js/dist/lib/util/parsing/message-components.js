"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toRaw = exports.fromRaw = void 0;
/* eslint-disable @typescript-eslint/explicit-function-return-type */
const Constants_1 = require("../../Constants");
const FROM_RAW = {
    [Constants_1.ComponentTypes.ACTION_ROW]: component => ({
        components: component.components.map(c => fromRaw(c)),
        type: component.type
    }),
    [Constants_1.ComponentTypes.BUTTON]: component => {
        if (component.style === Constants_1.ButtonStyles.LINK)
            return component;
        if (component.style === Constants_1.ButtonStyles.PREMIUM) {
            return {
                disabled: component.disabled,
                skuID: component.sku_id,
                style: component.style,
                type: component.type
            };
        }
        return {
            customID: component.custom_id,
            disabled: component.disabled,
            emoji: component.emoji,
            label: component.label,
            style: component.style,
            type: component.type
        };
    },
    [Constants_1.ComponentTypes.STRING_SELECT]: component => ({
        customID: component.custom_id,
        disabled: component.disabled,
        maxValues: component.max_values,
        minValues: component.min_values,
        placeholder: component.placeholder,
        required: component.required,
        type: component.type,
        options: component.options
    }),
    [Constants_1.ComponentTypes.TEXT_INPUT]: component => ({
        customID: component.custom_id,
        label: component.label,
        maxLength: component.max_length,
        minLength: component.min_length,
        placeholder: component.placeholder,
        required: component.required,
        style: component.style,
        type: component.type,
        value: component.value
    }),
    [Constants_1.ComponentTypes.USER_SELECT]: component => ({
        customID: component.custom_id,
        defaultValues: component.default_values,
        disabled: component.disabled,
        maxValues: component.max_values,
        minValues: component.min_values,
        placeholder: component.placeholder,
        required: component.required,
        type: component.type
    }),
    [Constants_1.ComponentTypes.ROLE_SELECT]: component => ({
        customID: component.custom_id,
        defaultValues: component.default_values,
        disabled: component.disabled,
        maxValues: component.max_values,
        minValues: component.min_values,
        placeholder: component.placeholder,
        required: component.required,
        type: component.type
    }),
    [Constants_1.ComponentTypes.MENTIONABLE_SELECT]: component => ({
        customID: component.custom_id,
        defaultValues: component.default_values,
        disabled: component.disabled,
        maxValues: component.max_values,
        minValues: component.min_values,
        placeholder: component.placeholder,
        required: component.required,
        type: component.type
    }),
    [Constants_1.ComponentTypes.CHANNEL_SELECT]: component => ({
        customID: component.custom_id,
        channelTypes: component.channel_types,
        defaultValues: component.default_values,
        disabled: component.disabled,
        maxValues: component.max_values,
        minValues: component.min_values,
        placeholder: component.placeholder,
        required: component.required,
        type: component.type
    }),
    [Constants_1.ComponentTypes.TEXT_DISPLAY]: component => ({
        content: component.content,
        type: component.type
    }),
    [Constants_1.ComponentTypes.THUMBNAIL]: component => ({
        description: component.description,
        media: {
            attachmentID: component.media.attachment_id,
            contentType: component.media.content_type,
            height: component.media.height,
            proxyURL: component.media.proxy_url,
            url: component.media.url,
            width: component.media.width
        },
        spoiler: component.spoiler,
        type: component.type
    }),
    [Constants_1.ComponentTypes.MEDIA_GALLERY]: component => ({
        items: component.items.map(i => ({
            description: i.description,
            media: {
                attachmentID: i.media.attachment_id,
                contentType: i.media.content_type,
                height: i.media.height,
                proxyURL: i.media.proxy_url,
                url: i.media.url,
                width: i.media.width
            },
            spoiler: i.spoiler
        })),
        type: component.type
    }),
    [Constants_1.ComponentTypes.FILE]: component => ({
        file: {
            attachmentID: component.file.attachment_id,
            contentType: component.file.content_type,
            height: component.file.height,
            proxyURL: component.file.proxy_url,
            url: component.file.url,
            width: component.file.width
        },
        spoiler: component.spoiler,
        type: component.type
    }),
    [Constants_1.ComponentTypes.SEPARATOR]: component => ({
        divider: component.divider,
        spacing: component.spacing,
        type: component.type
    }),
    [Constants_1.ComponentTypes.CONTENT_INVENTORY_ENTRY]: component => component,
    [Constants_1.ComponentTypes.CONTAINER]: component => ({
        accentColor: component.accent_color,
        components: component.components.map(c => fromRaw(c)),
        spoiler: component.spoiler,
        type: component.type
    }),
    [Constants_1.ComponentTypes.SECTION]: component => ({
        type: component.type,
        accessory: fromRaw(component.accessory),
        components: component.components.map(c => fromRaw(c))
    }),
    [Constants_1.ComponentTypes.LABEL]: component => ({
        type: component.type,
        label: component.label,
        description: component.description,
        component: fromRaw(component.component)
    }),
    [Constants_1.ComponentTypes.FILE_UPLOAD]: component => ({
        customID: component.custom_id,
        fileTypes: component.file_types,
        id: component.id,
        maxValues: component.max_values,
        minValues: component.min_values,
        required: component.required,
        type: component.type
    }),
    [Constants_1.ComponentTypes.RADIO_GROUP]: component => ({
        customID: component.custom_id,
        required: component.required,
        options: component.options.map(o => ({
            default: o.default,
            description: o.description,
            label: o.label,
            value: o.value
        })),
        type: component.type
    }),
    [Constants_1.ComponentTypes.CHECKBOX]: component => ({
        customID: component.custom_id,
        default: component.default,
        type: component.type
    }),
    [Constants_1.ComponentTypes.CHECKBOX_GROUP]: component => ({
        customID: component.custom_id,
        maxValues: component.max_values,
        minValues: component.min_values,
        options: component.options.map(o => ({
            default: o.default,
            description: o.description,
            label: o.label,
            value: o.value
        })),
        required: component.required,
        type: component.type
    })
};
function fromRaw(component) {
    return FROM_RAW[component.type](component);
}
exports.fromRaw = fromRaw;
const TO_RAW = {
    [Constants_1.ComponentTypes.ACTION_ROW]: component => ({
        type: component.type,
        components: component.components.map(c => toRaw(c))
    }),
    [Constants_1.ComponentTypes.BUTTON]: component => {
        if (component.style === Constants_1.ButtonStyles.LINK)
            return component;
        if (component.style === Constants_1.ButtonStyles.PREMIUM) {
            return {
                disabled: component.disabled,
                sku_id: component.skuID,
                style: component.style,
                type: component.type
            };
        }
        return {
            custom_id: component.customID,
            disabled: component.disabled,
            emoji: component.emoji,
            label: component.label,
            style: component.style,
            type: component.type
        };
    },
    [Constants_1.ComponentTypes.STRING_SELECT]: component => ({
        custom_id: component.customID,
        disabled: component.disabled,
        max_values: component.maxValues,
        min_values: component.minValues,
        placeholder: component.placeholder,
        required: component.required,
        options: component.options,
        type: component.type
    }),
    [Constants_1.ComponentTypes.TEXT_INPUT]: component => ({
        custom_id: component.customID,
        label: component.label,
        max_length: component.maxLength,
        min_length: component.minLength,
        placeholder: component.placeholder,
        required: component.required,
        style: component.style,
        type: component.type,
        value: component.value
    }),
    [Constants_1.ComponentTypes.USER_SELECT]: component => ({
        custom_id: component.customID,
        disabled: component.disabled,
        max_values: component.maxValues,
        min_values: component.minValues,
        placeholder: component.placeholder,
        required: component.required,
        type: component.type
    }),
    [Constants_1.ComponentTypes.ROLE_SELECT]: component => ({
        custom_id: component.customID,
        disabled: component.disabled,
        max_values: component.maxValues,
        min_values: component.minValues,
        placeholder: component.placeholder,
        required: component.required,
        type: component.type
    }),
    [Constants_1.ComponentTypes.MENTIONABLE_SELECT]: component => ({
        custom_id: component.customID,
        disabled: component.disabled,
        max_values: component.maxValues,
        min_values: component.minValues,
        placeholder: component.placeholder,
        required: component.required,
        type: component.type
    }),
    [Constants_1.ComponentTypes.CHANNEL_SELECT]: component => ({
        channel_types: component.channelTypes,
        custom_id: component.customID,
        disabled: component.disabled,
        max_values: component.maxValues,
        min_values: component.minValues,
        placeholder: component.placeholder,
        required: component.required,
        type: component.type
    }),
    [Constants_1.ComponentTypes.TEXT_DISPLAY]: component => ({
        content: component.content,
        type: component.type
    }),
    [Constants_1.ComponentTypes.THUMBNAIL]: component => ({
        description: component.description,
        media: {
            attachment_id: component.media.attachmentID,
            content_type: component.media.contentType,
            height: component.media.height,
            proxy_url: component.media.proxyURL,
            url: component.media.url,
            width: component.media.width
        },
        spoiler: component.spoiler,
        type: component.type
    }),
    [Constants_1.ComponentTypes.MEDIA_GALLERY]: component => ({
        items: component.items.map(i => ({
            description: i.description,
            media: {
                attachment_id: i.media.attachmentID,
                content_type: i.media.contentType,
                height: i.media.height,
                proxy_url: i.media.proxyURL,
                url: i.media.url,
                width: i.media.width
            },
            spoiler: i.spoiler
        })),
        type: component.type
    }),
    [Constants_1.ComponentTypes.FILE]: component => ({
        file: {
            attachment_id: component.file.attachmentID,
            content_type: component.file.contentType,
            height: component.file.height,
            proxy_url: component.file.proxyURL,
            url: component.file.url,
            width: component.file.width
        },
        spoiler: component.spoiler,
        type: component.type
    }),
    [Constants_1.ComponentTypes.SEPARATOR]: component => ({
        divider: component.divider,
        spacing: component.spacing,
        type: component.type
    }),
    [Constants_1.ComponentTypes.CONTENT_INVENTORY_ENTRY]: component => component,
    [Constants_1.ComponentTypes.CONTAINER]: component => ({
        accent_color: component.accentColor,
        components: component.components.map(c => toRaw(c)),
        spoiler: component.spoiler,
        type: component.type
    }),
    [Constants_1.ComponentTypes.SECTION]: component => ({
        type: component.type,
        accessory: toRaw(component.accessory),
        components: component.components.map(c => toRaw(c))
    }),
    [Constants_1.ComponentTypes.LABEL]: component => ({
        type: component.type,
        label: component.label,
        description: component.description,
        component: toRaw(component.component)
    }),
    [Constants_1.ComponentTypes.FILE_UPLOAD]: component => ({
        custom_id: component.customID,
        file_types: component.fileTypes,
        id: component.id,
        max_values: component.maxValues,
        min_values: component.minValues,
        required: component.required,
        type: component.type
    }),
    [Constants_1.ComponentTypes.RADIO_GROUP]: component => ({
        custom_id: component.customID,
        required: component.required,
        options: component.options.map(o => ({
            default: o.default,
            description: o.description,
            label: o.label,
            value: o.value
        })),
        type: component.type
    }),
    [Constants_1.ComponentTypes.CHECKBOX]: component => ({
        custom_id: component.customID,
        default: component.default,
        type: component.type
    }),
    [Constants_1.ComponentTypes.CHECKBOX_GROUP]: component => ({
        custom_id: component.customID,
        max_values: component.maxValues,
        min_values: component.minValues,
        options: component.options.map(o => ({
            default: o.default,
            description: o.description,
            label: o.label,
            value: o.value
        })),
        required: component.required,
        type: component.type
    })
};
function toRaw(component) {
    return TO_RAW[component.type](component);
}
exports.toRaw = toRaw;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS1jb21wb25lbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbGliL3V0aWwvcGFyc2luZy9tZXNzYWdlLWNvbXBvbmVudHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscUVBQXFFO0FBQ3JFLCtDQUErRDtBQUcvRCxNQUFNLFFBQVEsR0FBa0k7SUFDNUksQ0FBQywwQkFBYyxDQUFDLFVBQVUsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN2QyxVQUFVLEVBQUUsU0FBUyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFVLENBQUM7UUFDOUQsSUFBSSxFQUFRLFNBQVMsQ0FBQyxJQUFJO0tBQzdCLENBQUM7SUFDRixDQUFDLDBCQUFjLENBQUMsTUFBTSxDQUFDLEVBQUUsU0FBUyxDQUFDLEVBQUU7UUFDakMsSUFBSSxTQUFTLENBQUMsS0FBSyxLQUFLLHdCQUFZLENBQUMsSUFBSTtZQUFFLE9BQU8sU0FBUyxDQUFDO1FBRTVELElBQUksU0FBUyxDQUFDLEtBQUssS0FBSyx3QkFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQzNDLE9BQU87Z0JBQ0gsUUFBUSxFQUFFLFNBQVMsQ0FBQyxRQUFRO2dCQUM1QixLQUFLLEVBQUssU0FBUyxDQUFDLE1BQU07Z0JBQzFCLEtBQUssRUFBSyxTQUFTLENBQUMsS0FBSztnQkFDekIsSUFBSSxFQUFNLFNBQVMsQ0FBQyxJQUFJO2FBQzNCLENBQUM7UUFDTixDQUFDO1FBRUQsT0FBTztZQUNILFFBQVEsRUFBRSxTQUFTLENBQUMsU0FBUztZQUM3QixRQUFRLEVBQUUsU0FBUyxDQUFDLFFBQVE7WUFDNUIsS0FBSyxFQUFLLFNBQVMsQ0FBQyxLQUFLO1lBQ3pCLEtBQUssRUFBSyxTQUFTLENBQUMsS0FBSztZQUN6QixLQUFLLEVBQUssU0FBUyxDQUFDLEtBQUs7WUFDekIsSUFB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