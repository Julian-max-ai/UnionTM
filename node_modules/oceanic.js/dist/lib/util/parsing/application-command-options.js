"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toRaw = exports.fromRaw = void 0;
function fromRaw(option) {
    return {
        autocomplete: option.autocomplete,
        channelTypes: option.channel_types,
        choices: option.choices,
        description: option.description,
        descriptionLocalizations: option.description_localizations,
        descriptionLocalized: option.description_localized,
        fileTypes: option.file_types,
        maxLength: option.max_length,
        maxValue: option.max_value,
        minLength: option.min_length,
        minValue: option.min_value,
        name: option.name,
        nameLocalizations: option.name_localizations,
        nameLocalized: option.name_localized,
        options: option.options?.map(o => fromRaw(o)),
        required: option.required,
        type: option.type
    };
}
exports.fromRaw = fromRaw;
function toRaw(option) {
    const opt = option;
    return {
        autocomplete: opt.autocomplete,
        channel_types: opt.channelTypes,
        choices: opt.choices?.map(choice => ({
            name: choice.name,
            name_localizations: choice.nameLocalizations,
            value: choice.value
        })),
        description: opt.description,
        description_localizations: opt.descriptionLocalizations,
        description_localized: opt.descriptionLocalized,
        file_types: opt.fileTypes,
        max_length: opt.maxLength,
        max_value: opt.maxValue,
        min_length: opt.minLength,
        min_value: opt.minValue,
        name: opt.name,
        name_localizations: opt.nameLocalizations,
        name_localized: opt.nameLocalized,
        options: opt.options?.map(o => toRaw(o)),
        required: opt.required,
        type: opt.type
    };
}
exports.toRaw = toRaw;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGljYXRpb24tY29tbWFuZC1vcHRpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbGliL3V0aWwvcGFyc2luZy9hcHBsaWNhdGlvbi1jb21tYW5kLW9wdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsU0FBZ0IsT0FBTyxDQUFDLE1BQXNEO0lBQzFFLE9BQU87UUFDSCxZQUFZLEVBQWMsTUFBTSxDQUFDLFlBQVk7UUFDN0MsWUFBWSxFQUFjLE1BQU0sQ0FBQyxhQUFhO1FBQzlDLE9BQU8sRUFBbUIsTUFBTSxDQUFDLE9BQU87UUFDeEMsV0FBVyxFQUFlLE1BQU0sQ0FBQyxXQUFXO1FBQzVDLHdCQUF3QixFQUFFLE1BQU0sQ0FBQyx5QkFBeUI7UUFDMUQsb0JBQW9CLEVBQU0sTUFBTSxDQUFDLHFCQUFxQjtRQUN0RCxTQUFTLEVBQWlCLE1BQU0sQ0FBQyxVQUFVO1FBQzNDLFNBQVMsRUFBaUIsTUFBTSxDQUFDLFVBQVU7UUFDM0MsUUFBUSxFQUFrQixNQUFNLENBQUMsU0FBUztRQUMxQyxTQUFTLEVBQWlCLE1BQU0sQ0FBQyxVQUFVO1FBQzNDLFFBQVEsRUFBa0IsTUFBTSxDQUFDLFNBQVM7UUFDMUMsSUFBSSxFQUFzQixNQUFNLENBQUMsSUFBSTtRQUNyQyxpQkFBaUIsRUFBUyxNQUFNLENBQUMsa0JBQWtCO1FBQ25ELGFBQWEsRUFBYSxNQUFNLENBQUMsY0FBYztRQUMvQyxPQUFPLEVBQW1CLE1BQU0sQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlELFFBQVEsRUFBa0IsTUFBTSxDQUFDLFFBQVE7UUFDekMsSUFBSSxFQUFzQixNQUFNLENBQUMsSUFBSTtLQUN1RixDQUFDO0FBQ3JJLENBQUM7QUFwQkQsMEJBb0JDO0FBRUQsU0FBZ0IsS0FBSyxDQUFDLE1BQW9EO0lBQ3RFLE1BQU0sR0FBRyxHQUFHLE1BQTZELENBQUM7SUFDMUUsT0FBTztRQUNILFlBQVksRUFBRyxHQUFHLENBQUMsWUFBWTtRQUMvQixhQUFhLEVBQUUsR0FBRyxDQUFDLFlBQVk7UUFDL0IsT0FBTyxFQUFRLEdBQUcsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN2QyxJQUFJLEVBQWdCLE1BQU0sQ0FBQyxJQUFJO1lBQy9CLGtCQUFrQixFQUFFLE1BQU0sQ0FBQyxpQkFBaUI7WUFDNUMsS0FBSyxFQUFlLE1BQU0sQ0FBQyxLQUFLO1NBQ25DLENBQUMsQ0FBQztRQUNILFdBQVcsRUFBZ0IsR0FBRyxDQUFDLFdBQVc7UUFDMUMseUJBQXlCLEVBQUUsR0FBRyxDQUFDLHdCQUF3QjtRQUN2RCxxQkFBcUIsRUFBTSxHQUFHLENBQUMsb0JBQW9CO1FBQ25ELFVBQVUsRUFBaUIsR0FBRyxDQUFDLFNBQVM7UUFDeEMsVUFBVSxFQUFpQixHQUFHLENBQUMsU0FBUztRQUN4QyxTQUFTLEVBQWtCLEdBQUcsQ0FBQyxRQUFRO1FBQ3ZDLFVBQVUsRUFBaUIsR0FBRyxDQUFDLFNBQVM7UUFDeEMsU0FBUyxFQUFrQixHQUFHLENBQUMsUUFBUTtRQUN2QyxJQUFJLEVBQXVCLEdBQUcsQ0FBQyxJQUFJO1FBQ25DLGtCQUFrQixFQUFTLEdBQUcsQ0FBQyxpQkFBaUI7UUFDaEQsY0FBYyxFQUFhLEdBQUcsQ0FBQyxhQUFhO1FBQzVDLE9BQU8sRUFBb0IsR0FBRyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBaUQsQ0FBQyxDQUFDO1FBQzFHLFFBQVEsRUFBbUIsR0FBRyxDQUFDLFFBQVE7UUFDdkMsSUFBSSxFQUF1QixHQUFHLENBQUMsSUFBSTtLQUM2RixDQUFDO0FBQ3pJLENBQUM7QUF6QkQsc0JBeUJDIn0=