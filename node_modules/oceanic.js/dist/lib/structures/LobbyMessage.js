"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module LobbyMessage */
const Base_1 = tslib_1.__importDefault(require("./Base"));
class LobbyMessage extends Base_1.default {
    applicationID;
    author;
    channelID;
    content;
    flags;
    lobbyID;
    lobbyMember;
    metadata;
    moderationMetadata;
    type;
    constructor(data, client) {
        super(data.id, client);
        this.applicationID = data.application_id;
        this.author = client.users.update(data.author);
        this.channelID = data.channel_id;
        this.content = data.content;
        this.flags = data.flags;
        this.lobbyID = data.lobby_id;
        this.lobbyMember = data.lobby_member ? {
            additionalName: data.lobby_member.additional_name
        } : undefined;
        this.metadata = data.metadata;
        this.moderationMetadata = data.moderation_metadata;
        this.type = data.type;
    }
    toJSON() {
        return {
            ...super.toJSON(),
            applicationID: this.applicationID,
            author: this.author.toJSON(),
            channelID: this.channelID,
            content: this.content,
            flags: this.flags,
            lobbyID: this.lobbyID,
            lobbyMember: this.lobbyMember,
            metadata: this.metadata,
            moderationMetadata: this.moderationMetadata,
            type: this.type
        };
    }
}
exports.default = LobbyMessage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9iYnlNZXNzYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL3N0cnVjdHVyZXMvTG9iYnlNZXNzYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJCQUEyQjtBQUMzQiwwREFBMEI7QUFNMUIsTUFBcUIsWUFBYSxTQUFRLGNBQUk7SUFDMUMsYUFBYSxDQUFTO0lBQ3RCLE1BQU0sQ0FBTztJQUNiLFNBQVMsQ0FBUztJQUNsQixPQUFPLENBQVM7SUFDaEIsS0FBSyxDQUFTO0lBQ2QsT0FBTyxDQUFTO0lBQ2hCLFdBQVcsQ0FBb0M7SUFDL0MsUUFBUSxDQUFpQztJQUN6QyxrQkFBa0IsQ0FBaUM7SUFDbkQsSUFBSSxDQUFlO0lBQ25CLFlBQVksSUFBbUMsRUFBRSxNQUFjO1FBQzNELEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQztRQUN6QyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDakMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQzVCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN4QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDN0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUNuQyxjQUFjLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxlQUFlO1NBQ3BELENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUNkLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUM5QixJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDO1FBQ25ELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztJQUMxQixDQUFDO0lBRVEsTUFBTTtRQUNYLE9BQU87WUFDSCxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUU7WUFDakIsYUFBYSxFQUFPLElBQUksQ0FBQyxhQUFhO1lBQ3RDLE1BQU0sRUFBYyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRTtZQUN4QyxTQUFTLEVBQVcsSUFBSSxDQUFDLFNBQVM7WUFDbEMsT0FBTyxFQUFhLElBQUksQ0FBQyxPQUFPO1lBQ2hDLEtBQUssRUFBZSxJQUFJLENBQUMsS0FBSztZQUM5QixPQUFPLEVBQWEsSUFBSSxDQUFDLE9BQU87WUFDaEMsV0FBVyxFQUFTLElBQUksQ0FBQyxXQUFXO1lBQ3BDLFFBQVEsRUFBWSxJQUFJLENBQUMsUUFBUTtZQUNqQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsa0JBQWtCO1lBQzNDLElBQUksRUFBZ0IsSUFBSSxDQUFDLElBQUk7U0FDaEMsQ0FBQztJQUNOLENBQUM7Q0FDSjtBQTFDRCwrQkEwQ0MifQ==