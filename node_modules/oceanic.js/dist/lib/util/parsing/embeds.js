"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toRaw = exports.fromRaw = void 0;
function fromRaw(embed) {
    return {
        author: embed.author === undefined ? undefined : {
            name: embed.author.name,
            iconURL: embed.author.icon_url,
            proxyIconURL: embed.author.proxy_icon_url,
            url: embed.author.url
        },
        color: embed.color,
        description: embed.description,
        fields: embed.fields?.map(field => ({
            inline: field.inline,
            name: field.name,
            value: field.value
        })),
        flags: embed.flags,
        footer: embed.footer === undefined ? undefined : {
            flags: embed.footer.flags,
            iconURL: embed.footer.icon_url,
            proxyIconURL: embed.footer.proxy_icon_url,
            text: embed.footer.text
        },
        timestamp: embed.timestamp,
        title: embed.title,
        image: embed.image === undefined ? undefined : {
            flags: embed.image.flags,
            height: embed.image.height,
            proxyURL: embed.image.proxy_url,
            url: embed.image.url,
            width: embed.image.width
        },
        provider: embed.provider === undefined ? undefined : {
            name: embed.provider.name,
            url: embed.provider.url
        },
        thumbnail: embed.thumbnail === undefined ? undefined : {
            url: embed.thumbnail.url,
            height: embed.thumbnail.height,
            proxyURL: embed.thumbnail.proxy_url,
            width: embed.thumbnail.width
        },
        url: embed.url,
        type: embed.type,
        video: embed.video === undefined ? undefined : {
            height: embed.video.height,
            proxyURL: embed.video.proxy_url,
            url: embed.video.url,
            width: embed.video.width
        }
    };
}
exports.fromRaw = fromRaw;
function toRaw(embed) {
    return {
        author: embed.author === undefined ? undefined : {
            name: embed.author.name,
            icon_url: embed.author.iconURL,
            url: embed.author.url
        },
        color: embed.color,
        description: embed.description,
        fields: embed.fields?.map(field => ({
            inline: field.inline,
            name: field.name,
            value: field.value
        })),
        footer: embed.footer === undefined ? undefined : {
            text: embed.footer.text,
            icon_url: embed.footer.iconURL
        },
        timestamp: embed.timestamp,
        title: embed.title,
        image: embed.image === undefined ? undefined : { url: embed.image.url },
        thumbnail: embed.thumbnail === undefined ? undefined : { url: embed.thumbnail.url },
        url: embed.url
    };
}
exports.toRaw = toRaw;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1iZWRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbGliL3V0aWwvcGFyc2luZy9lbWJlZHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsU0FBZ0IsT0FBTyxDQUFDLEtBQThCO0lBQ2xELE9BQU87UUFDSCxNQUFNLEVBQUUsS0FBSyxDQUFDLE1BQU0sS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDN0MsSUFBSSxFQUFVLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSTtZQUMvQixPQUFPLEVBQU8sS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRO1lBQ25DLFlBQVksRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLGNBQWM7WUFDekMsR0FBRyxFQUFXLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRztTQUNqQztRQUNELEtBQUssRUFBUSxLQUFLLENBQUMsS0FBSztRQUN4QixXQUFXLEVBQUUsS0FBSyxDQUFDLFdBQVc7UUFDOUIsTUFBTSxFQUFPLEtBQUssQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNyQyxNQUFNLEVBQUUsS0FBSyxDQUFDLE1BQU07WUFDcEIsSUFBSSxFQUFJLEtBQUssQ0FBQyxJQUFJO1lBQ2xCLEtBQUssRUFBRyxLQUFLLENBQUMsS0FBSztTQUN0QixDQUFDLENBQUM7UUFDSCxLQUFLLEVBQUcsS0FBSyxDQUFDLEtBQUs7UUFDbkIsTUFBTSxFQUFFLEtBQUssQ0FBQyxNQUFNLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQzdDLEtBQUssRUFBUyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUs7WUFDaEMsT0FBTyxFQUFPLEtBQUssQ0FBQyxNQUFNLENBQUMsUUFBUTtZQUNuQyxZQUFZLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxjQUFjO1lBQ3pDLElBQUksRUFBVSxLQUFL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