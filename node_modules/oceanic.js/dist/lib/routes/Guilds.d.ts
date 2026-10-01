/// <reference types="node" />
/// <reference types="node" />
/** @module REST/Guilds */
import type * as Types from "../types/namespaced";
import type { ChannelTypeMap } from "../Constants";
import type RESTManager from "../rest/RESTManager";
import AutoModerationRule from "../structures/AutoModerationRule";
import Guild from "../structures/Guild";
import GuildPreview from "../structures/GuildPreview";
import GuildScheduledEvent from "../structures/GuildScheduledEvent";
import GuildTemplate from "../structures/GuildTemplate";
import Integration from "../structures/Integration";
import { type InviteWithMetadata } from "../structures/Invite";
import type Member from "../structures/Member";
import Role from "../structures/Role";
import Soundboard from "../structures/Soundboard";
import VoiceState from "../structures/VoiceState";
/** Various methods for interacting with guilds. Located at {@link Client#rest | Client#rest}{@link RESTManager#guilds | .guilds}. */
export default class Guilds {
    private _manager;
    constructor(manager: RESTManager);
    /**
     * Accept or deny a guild join request.
     * @param guildID The ID of the guild.
     * @param requestID The ID of the join request.
     * @param options The options for actioning the join request.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#joinRequests | Guild#joinRequests}
     */
    actionJoinRequest(guildID: string, requestID: string, options: Types.Guilds.ActionGuildJoinRequestOptions): Promise<Types.Guilds.GuildJoinRequest>;
    /**
     * Add a member to a guild. Requires an access token with the `guilds.join` scope.
     *
     * Returns the newly added member upon success, or void if the member is already in the guild.
     * @param guildID The ID of the guild.
     * @param userID The ID of the user to add.
     * @param options The options for adding the member.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#members | Guild#members}
     */
    addMember(guildID: string, userID: string, options: Types.Guilds.AddMemberOptions): Promise<Member | undefined>;
    /**
     * Add a role to a member.
     * @param guildID The ID of the guild.
     * @param memberID The ID of the member.
     * @param roleID The ID of the role to add.
     * @param reason The reason for adding the role.
     * @caching This method **does not** cache its result.
     */
    addMemberRole(guildID: string, memberID: string, roleID: string, reason?: string): Promise<void>;
    /**
     * Begin a prune.
     * @param guildID The ID of the guild.
     * @param options The options for the prune.
     * @caching This method **does not** cache its result.
     */
    beginPrune(guildID: string, options?: Types.Guilds.BeginPruneOptions): Promise<number | null>;
    /**
     * Ban up to 200 members from a guild. This requires both the `BAN_MEMBERS` and `MANAGE_GUILD` permissions.
     * If no members were banned, a {@link Constants~JSONErrorCodes.FAILED_TO_BAN_USERS | FAILED_TO_BAN_USERS } will be returned.
     * The bot user is ignored.
     * @param guildID The ID of the guild.
     * @param options The options for banning.
     */
    bulkBan(guildID: string, options: Types.Guilds.BulkBanOptions): Promise<Types.Guilds.BulkBanResponse>;
    /**
     * Create an auto moderation rule for a guild.
     * @param guildID The ID of the guild.
     * @param options The options for creating the rule.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#autoModerationRules | Guild#autoModerationRules}
     */
    createAutoModerationRule(guildID: string, options: Types.AutoModeration.CreateAutoModerationRuleOptions): Promise<AutoModerationRule>;
    /**
     * Create a ban for a user.
     * @param guildID The ID of the guild.
     * @param userID The ID of the user to ban.
     * @param options The options for creating the ban.
     * @caching This method **does not** cache its result.
     */
    createBan(guildID: string, userID: string, options?: Types.Guilds.CreateBanOptions): Promise<void>;
    /**
     * Create a channel in a guild.
     * @param guildID The ID of the guild.
     * @param options The options for creating the channel.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#channels | Guild#channels}
     */
    createChannel<T extends Types.Channels.GuildChannelsWithoutThreads>(guildID: string, type: T, options: Omit<Types.Guilds.CreateChannelOptions, "type">): Promise<ChannelTypeMap[T]>;
    /**
     * Create an emoji in a guild.
     * @param guildID The ID of the guild.
     * @param options The options for creating the emoji.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#emojis | Guild#emojis}<br>{@link Client#users | Client#users} (creator, if applicable)
     */
    createEmoji(guildID: string, options: Types.Guilds.CreateGuildEmojiOptions): Promise<Types.Guilds.GuildEmoji>;
    /**
     * Create a role.
     * @param guildID The ID of the guild.
     * @param options The options for creating the role.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#roles | Guild#roles}
     */
    createRole(guildID: string, options?: Types.Guilds.CreateRoleOptions): Promise<Role>;
    /**
     * Create a scheduled event in a guild.
     * @param guildID The ID of the guild.
     * @param options The options for creating the scheduled event.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#scheduledEvents | Guild#scheduledEvents}
     */
    createScheduledEvent(guildID: string, options: Types.ScheduledEvents.CreateScheduledEventOptions): Promise<GuildScheduledEvent>;
    /**
     * Create an exception to the recurrence rule for a scheduled event.
     * @param guildID The ID of the guild.
     * @param eventID The ID of the scheduled event.
     * @param options The options for creating the scheduled event exception.
     * @caching This method **may** cache its result. The result will not be cached if the scheduled event is not cached.
     * @caches {@link GuildScheduledEvent#exceptions | GuildScheduledEvent#exceptions}
     */
    createScheduledEventException(guildID: string, eventID: string, options: Types.ScheduledEvents.CreateScheduledEventExceptionOptions): Promise<Types.ScheduledEvents.ScheduledEventException>;
    /**
     * Create a soundboard sound
     * @param guildID The ID of the guild
     * @param options The options for creating the soundboard sound
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#soundboardSounds | Guild#soundboardSounds}
     */
    createSoundboardSound(guildID: string, options: Types.Guilds.CreateSoundboardSoundOptions): Promise<Soundboard>;
    /**
     * Create a sticker.
     * @param guildID The ID of the guild.
     * @param options The options for creating the sticker.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#stickers | Guild#stickers}<br>{@link Client#users | Client#users} (creator, if applicable)
     */
    createSticker(guildID: string, options: Types.Guilds.CreateStickerOptions): Promise<Types.Guilds.Sticker>;
    /**
     * Create a guild template.
     * @param guildID The ID of the guild to create a template from.
     * @param options The options for creating the template.
     */
    createTemplate(guildID: string, options: Types.GuildTemplate.CreateTemplateOptions): Promise<GuildTemplate>;
    /**
     * Delete an auto moderation rule.
     * @param guildID The ID of the guild.
     * @param ruleID The ID of the rule to delete.
     * @param reason The reason for deleting the rule.
     * @caching This method **does not** cache its result.
     */
    deleteAutoModerationRule(guildID: string, ruleID: string, reason?: string): Promise<void>;
    /**
     * Delete an emoji.
     * @param guildID The ID of the guild.
     * @param emojiID The ID of the emoji.
     * @param reason The reason for deleting the emoji.
     * @caching This method **does not** cache its result.
     */
    deleteEmoji(guildID: string, emojiID: string, reason?: string): Promise<void>;
    /**
     * Delete an integration.
     * @param guildID The ID of the guild.
     * @param integrationID The ID of the integration.
     * @param reason The reason for deleting the integration.
     * @caching This method **does not** cache its result.
     */
    deleteIntegration(guildID: string, integrationID: string, reason?: string): Promise<void>;
    /**
     * Delete a role.
     * @param guildID The ID of the guild.
     * @param roleID The ID of the role to delete.
     * @param reason The reason for deleting the role.
     * @caching This method **does not** cache its result.
     */
    deleteRole(guildID: string, roleID: string, reason?: string): Promise<void>;
    /**
     * Delete a scheduled event.
     * @param guildID The ID of the guild.
     * @param eventID The ID of the scheduled event.
     * @param reason The reason for deleting the scheduled event. Discord's docs do not explicitly state a reason can be provided, so it may not be used.
     * @caching This method **does not** cache its result.
     */
    deleteScheduledEvent(guildID: string, eventID: string, reason?: string): Promise<void>;
    /**
     * Delete an exception to the recurrence rule for a scheduled event.
     * @param guildID The ID of the guild.
     * @param eventID The ID of the scheduled event.
     * @param exceptionID The ID of the scheduled event exception.
     * @param reason The reason for deleting the scheduled event exception.
     * @caching This method **may** remove the result from cache. The result will not be removed if the scheduled event is not cached.
     * @caches {@link GuildScheduledEvent#exceptions | GuildScheduledEvent#exceptions}
     */
    deleteScheduledEventException(guildID: string, eventID: string, exceptionID: string, reason?: string): Promise<void>;
    /**
     *
     * @param guildID The ID of the guild.
     * @param soundID The ID of the soundboard sound to delete.
     * @param reason The reason for deleting the soundboard sound.
     * @caching This method **does not** cache its result.
     */
    deleteSoundboardSound(guildID: string, soundID: string, reason?: string): Promise<void>;
    /**
     * Delete a sticker.
     * @param guildID The ID of the guild.
     * @param stickerID The ID of the sticker to delete.
     * @param reason The reason for deleting the sticker.
     * @caching This method **does not** cache its result.
     */
    deleteSticker(guildID: string, stickerID: string, reason?: string): Promise<void>;
    /**
     * Delete a template.
     * @param guildID The ID of the guild.
     * @param code The code of the template.
     * @caching This method **does not** cache its result.
     */
    deleteTemplate(guildID: string, code: string): Promise<void>;
    /**
     * Edit a guild.
     * @param guildID The ID of the guild.
     * @param options The options for editing the guild.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not already cached.
     * @caches {@link Client#guilds | Client#guilds}
     */
    edit(guildID: string, options: Types.Guilds.EditGuildOptions): Promise<Guild>;
    /**
     * Edit an existing auto moderation rule.
     * @param guildID The ID of the guild.
     * @param ruleID The ID of the rule to edit.
     * @param options The options for editing the rule.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#autoModerationRules | Guild#autoModerationRules}
     */
    editAutoModerationRule(guildID: string, ruleID: string, options: Types.AutoModeration.EditAutoModerationRuleOptions): Promise<AutoModerationRule>;
    /**
     * Edit the positions of channels in a guild.
     * @param guildID The ID of the guild.
     * @param options The channels to move. Unedited channels do not need to be specified.
     * @caching This method **does not** cache its result.
     */
    editChannelPositions(guildID: string, options: Array<Types.Guilds.ModifyChannelPositionsEntry>): Promise<void>;
    /**
     * Modify the current member in a guild.
     * @param guildID The ID of the guild.
     * @param options The options for editing the member.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#members | Guild#members}<br>{@link Guild#clientMember | Guild#clientMember}
     */
    editCurrentMember(guildID: string, options: Types.Guilds.EditCurrentMemberOptions): Promise<Member>;
    /**
     * Edit the current member's voice state in a guild. `channelID` is required, and the current member must already be in that channel. See [Discord's docs](https://discord.com/developers/docs/resources/guild#modify-current-user-voice-state-caveats) for more information.
     * @param guildID The ID of the guild.
     * @param options The options for editing the voice state.
     * @caching This method **does not** cache its result.
     */
    editCurrentUserVoiceState(guildID: string, options: Types.Guilds.EditCurrentUserVoiceStateOptions): Promise<void>;
    /**
     * Edit an existing emoji.
     * @param guildID The ID of the guild the emoji is in.
     * @param options The options for editing the emoji.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#emojis | Guild#emojis}
     */
    editEmoji(guildID: string, emojiID: string, options: Types.Guilds.EditGuildEmojiOptions): Promise<Types.Guilds.GuildEmoji>;
    /**
     * Edit the incident actions for a guild.
     * @param guildID The ID of the guild.
     * @param options The options for editing the incident actions.
     * @caching This method **does not** cache its result.
     */
    editIncidentActions(guildID: string, options: Types.Guilds.EditIncidentActionsOptions): Promise<Types.Guilds.IncidentActions>;
    /**
     * Edit a guild member. Use editCurrentMember if you wish to update the nick of this client using the `CHANGE_NICKNAME` permission.
     * @param guildID The ID of the guild.
     * @param memberID The ID of the member.
     * @param options The options for editing the member.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#members | Guild#members}
     */
    editMember(guildID: string, memberID: string, options: Types.Guilds.EditMemberOptions): Promise<Member>;
    /**
     * Edit a guild's onboarding configuration.
     * @param guildID The ID of the guild.
     * @param options The options for editing the onboarding configuration.
     * @caching This method **does not** cache its result.
     */
    editOnboarding(guildID: string, options: Types.Guilds.EditOnboardingOptions): Promise<Types.Guilds.Onboarding>;
    /**
     * Edit an existing role.
     * @param guildID The ID of the guild.
     * @param options The options for editing the role.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#roles | Guild#roles}
     */
    editRole(guildID: string, roleID: string, options: Types.Guilds.EditRoleOptions): Promise<Role>;
    /**
     * Edit the position of roles in a guild.
     * @param guildID The ID of the guild.
     * @param options The roles to move.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#roles | Guild#roles}
     */
    editRolePositions(guildID: string, options: Array<Types.Guilds.EditRolePositionsEntry>, reason?: string): Promise<Array<Role>>;
    /**
     * Edit an existing scheduled event in a guild.
     * @param guildID The ID of the guild.
     * @param scheduledEventID The ID of the scheduled event.
     * @param options The options for editing the scheduled event.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#scheduledEvents | Guild#scheduledEvents}
     */
    editScheduledEvent(guildID: string, scheduledEventID: string, options: Types.ScheduledEvents.EditScheduledEventOptions): Promise<GuildScheduledEvent>;
    /**
     * Edit an exception to the recurrence rule for a scheduled event.
     * @param guildID The ID of the guild.
     * @param eventID The ID of the scheduled event.
     * @param exceptionID The ID of the scheduled event exception.
     * @param options The options for editing the scheduled event exception.
     * @caching This method **may** cache its result. The result will not be cached if the scheduled event is not cached.
     * @caches {@link GuildScheduledEvent#exceptions | GuildScheduledEvent#exceptions}
     */
    editScheduledEventException(guildID: string, eventID: string, exceptionID: string, options: Types.ScheduledEvents.EditScheduledEventExceptionOptions): Promise<Types.ScheduledEvents.ScheduledEventException>;
    /**
     * Edit a soundboard sound.
     * @param guildID The ID of the guild.
     * @param soundID The ID of the soundboard sound to edit.
     * @param options The options for editing the soundboard sound.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#soundboardSounds | Guild#soundboardSounds}
     */
    editSoundboardSound(guildID: string, soundID: string, options: Types.Guilds.EditSoundboardSoundOptions): Promise<Soundboard>;
    /**
     * Edit a sticker.
     * @param guildID The ID of the guild.
     * @param options The options for editing the sticker.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#stickers | Guild#stickers}
     */
    editSticker(guildID: string, stickerID: string, options: Types.Guilds.EditStickerOptions): Promise<Types.Guilds.Sticker>;
    /**
     * Edit a guild template.
     * @param guildID The ID of the guild.
     * @param code The code of the template.
     * @param options The options for editing the template.
     * @caching This method **does not** cache its result.
     */
    editTemplate(guildID: string, code: string, options: Types.GuildTemplate.EditGuildTemplateOptions): Promise<GuildTemplate>;
    /**
     * Edit a guild member's voice state. `channelID` is required, and the user must already be in that channel. See [Discord's docs](https://discord.com/developers/docs/resources/guild#modify-user-voice-state) for more information.
     * @param guildID The ID of the guild.
     * @param memberID The ID of the member.
     * @param options The options for editing the voice state.
     * @caching This method **does not** cache its result.
     */
    editUserVoiceState(guildID: string, memberID: string, options: Types.Guilds.EditUserVoiceStateOptions): Promise<void>;
    /**
     * Edit the welcome screen in a guild.
     * @param guildID The ID of the guild.
     * @param options The options for editing the welcome screen.
     * @caching This method **does not** cache its result.
     */
    editWelcomeScreen(guildID: string, options: Types.Guilds.EditWelcomeScreenOptions): Promise<Types.Guilds.WelcomeScreen>;
    /**
     * Edit the widget of a guild.
     * @param guildID The ID of the guild.
     * @param options The options for editing the widget.
     * @caching This method **does not** cache its result.
     */
    editWidget(guildID: string, options: Types.Guilds.WidgetSettings): Promise<Types.Guilds.Widget>;
    /**
     * Get a guild.
     * @param guildID The ID of the guild.
     * @param withCounts If the approximate number of members and online members should be included.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not already cached.
     * @caches {@link Client#guilds | Client#guilds}
     */
    get(guildID: string, withCounts?: boolean): Promise<Guild>;
    /**
     * Get the active threads in a guild.
     * @param guildID The ID of the guild.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#threads | Guild#threads}
     */
    getActiveThreads(guildID: string): Promise<Types.Guilds.GetActiveThreadsResponse>;
    /**
     * Get a guild's audit log.
     * @param guildID The ID of the guild.
     * @param options The options for getting the audit logs.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#autoModerationRules | Guild#autoModerationRules}<br>{@link Guild#scheduledEvents | Guild#scheduledEvents}<br>{@link Guild#integrations | Guild#integrations}<br>{@link Guild#threads | Guild#threads}<br>{@link Client#users | Client#users}
     */
    getAuditLog(guildID: string, options?: Types.AuditLog.GetAuditLogOptions): Promise<Types.AuditLog.AuditLog>;
    /**
     * Get an auto moderation rule for a guild.
     * @param guildID The ID of the guild.
     * @param ruleID The ID of the rule to get.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#autoModerationRules | Guild#autoModerationRules}
     */
    getAutoModerationRule(guildID: string, ruleID: string): Promise<AutoModerationRule>;
    /**
     * Get the auto moderation rules for a guild.
     * @param guildID The ID of the guild.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#autoModerationRules | Guild#autoModerationRules}
     */
    getAutoModerationRules(guildID: string): Promise<Array<AutoModerationRule>>;
    /**
     * Get a ban.
     * @param guildID The ID of the guild.
     * @param userID The ID of the user to get the ban of.
     * @caching This method **does** cache part of its result.
     * @caches {@link Client#users | Client#users}
     */
    getBan(guildID: string, userID: string): Promise<Types.Guilds.Ban>;
    /**
     * Get the bans in a guild.
     * @param guildID The ID of the guild.
     * @param options The options for getting the bans.
     * @caching This method **does** cache part of its result.
     * @caches {@link Client#users | Client#users}
     */
    getBans(guildID: string, options?: Types.Guilds.GetBansOptions): Promise<Array<Types.Guilds.Ban>>;
    /**
     * Get the channels in a guild. Does not include threads.
     * @param guildID The ID of the guild.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#channels | Guild#channels}
     */
    getChannels(guildID: string): Promise<Array<Types.Channels.AnyGuildChannelWithoutThreads>>;
    /**
     * Get an emoji in a guild.
     * @param guildID The ID of the guild.
     * @param emojiID The ID of the emoji to get.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#emojis | Guild#emojis}
     */
    getEmoji(guildID: string, emojiID: string): Promise<Types.Guilds.GuildEmoji>;
    /**
     * Get the emojis in a guild.
     * @param guildID The ID of the guild.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#emojis | Guild#emojis} (will be completely cleared and refilled)
     */
    getEmojis(guildID: string): Promise<Array<Types.Guilds.GuildEmoji>>;
    /**
     * Get the integrations in a guild.
     * @param guildID The ID of the guild.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#integrations | Guild#integrations}
     */
    getIntegrations(guildID: string): Promise<Array<Integration>>;
    /**
     * Get the invites of a guild.
     * @param guildID The ID of the guild to get the invites of.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#invites | Guild#invites}
     */
    getInvites<CH extends Types.Invites.GuildInviteChannel = Types.Invites.GuildInviteChannel>(guildID: string): Promise<Array<InviteWithMetadata<CH>>>;
    /**
     * Get guild join requests.
     * @param guildID The ID of the guild.
     * @param options The options for getting join requests.
     * @caching This method **may** cache its result. The results will not be cached if the guild is not cached.
     * @caches {@link Guild#joinRequests | Guild#joinRequests}
     */
    getJoinRequests(guildID: string, options: Types.Guilds.GetGuildJoinRequestsOptions): Promise<Types.Guilds.GuildJoinRequests>;
    /**
     * Get a guild member.
     * @param guildID The ID of the guild.
     * @param memberID The ID of the member.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#members | Guild#members}
     */
    getMember(guildID: string, memberID: string): Promise<Member>;
    /**
     * Get a guild's members. This requires the `GUILD_MEMBERS` intent.
     * @param guildID The ID of the guild.
     * @param options The options for getting the members.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#members | Guild#members}}
     */
    getMembers(guildID: string, options?: Types.Guilds.GetMembersOptions): Promise<Array<Member>>;
    /**
     * Get a guild's new member welcome info.
     * @param guildID The ID of the guild.
     * @caching This method **does not** cache its result.
     */
    getNewMemberWelcome(guildID: string): Promise<Types.Guilds.NewMemberWelcome | null>;
    /**
     * Get a guild's onboarding info.
     * @param guildID The ID of the guild.
     * @caching This method **does not** cache its result.
     */
    getOnboarding(guildID: string): Promise<Types.Guilds.Onboarding>;
    /**
     * Get a preview of a guild. If the client is not already in this guild, the guild must be lurkable.
     * @param guildID The ID of the guild.
     * @caching This method **does not** cache its result.
     */
    getPreview(guildID: string): Promise<GuildPreview>;
    /**
     * Get the prune count of a guild.
     * @param guildID The ID of the guild.
     * @param options The options for getting the prune count.
     * @caching This method **does not** cache its result.
     */
    getPruneCount(guildID: string, options?: Types.Guilds.GetPruneCountOptions): Promise<number>;
    /**
     * Get a role in a guild.
     * @param guildID The ID of the guild.
     * @param roleID The ID of the role to get.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#roles | Guild#roles}
     */
    getRole(guildID: string, roleID: string): Promise<Role>;
    /**
     * Get the member count of the roles in a guild. The result is a key-value map of role id to member count.
     * @param guildID The ID of the guild.
     * @caching This method **does not** cache its result.
     */
    getRoleMemberCounts(guildID: string): Promise<Record<string, number>>;
    /**
     * Get the roles in a guild.
     * @param guildID The ID of the guild.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#roles | Guild#roles}
     */
    getRoles(guildID: string): Promise<Array<Role>>;
    /**
     * Get a scheduled event.
     * @param guildID The ID of the guild.
     * @param eventID The ID of the scheduled event to get.
     * @param withUserCount If the number of users subscribed to the event should be included.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#scheduledEvents | Guild#scheduledEvents}
     */
    getScheduledEvent(guildID: string, eventID: string, withUserCount?: number): Promise<GuildScheduledEvent>;
    /**
     * Get users subscribed to an exception for a scheduled event.
     * @param guildID The ID of the guild.
     * @param eventID The ID of the scheduled event.
     * @param exceptionID The ID of the scheduled event exception.
     * @param options The options for getting the users.
     * @caching This method **does** cache part of its result. Members will not be cached if the guild is not cached.
     * @caches {@link Client#users | Client#users}<br>{@link Guild#members | Guild#members}
     */
    getScheduledEventExceptionUsers(guildID: string, eventID: string, exceptionID: string, options?: Types.ScheduledEvents.GetScheduledEventUsersOptions): Promise<Array<Types.ScheduledEvents.ScheduledEventUser>>;
    /**
     * Get user counts for a scheduled event and optionally specific exceptions.
     * @param guildID The ID of the guild.
     * @param eventID The ID of the scheduled event.
     * @param options The options for getting the user counts.
     * @caching This method **may** cache the event user count. The count will not be cached if the scheduled event is not cached.
     * @caches {@link GuildScheduledEvent#userCount | GuildScheduledEvent#userCount}
     */
    getScheduledEventUserCounts(guildID: string, eventID: string, options?: Types.ScheduledEvents.GetScheduledEventUserCountsOptions): Promise<Types.ScheduledEvents.ScheduledEventUserCounts>;
    /**
     * Get the users subscribed to a scheduled event.
     * @param guildID The ID of the guild.
     * @param eventID The ID of the scheduled event.
     * @param options The options for getting the users.
     * @caching This method **does** cache part of its result. Members will not be cached if the guild is not cached.
     * @caches {@link Client#users | Client#users}<br>{@link Guild#members | Guild#members}
     */
    getScheduledEventUsers(guildID: string, eventID: string, options?: Types.ScheduledEvents.GetScheduledEventUsersOptions): Promise<Array<Types.ScheduledEvents.ScheduledEventUser>>;
    /**
     * Get a guild's scheduled events.
     * @param guildID The ID of the guild.
     * @param withUserCount If the number of users subscribed to the event should be included.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#scheduledEvents | Guild#scheduledEvents}
     */
    getScheduledEvents(guildID: string, withUserCount?: number): Promise<Array<GuildScheduledEvent>>;
    /**
     * Get a soundboard sound.
     * @param guildID The ID of the guild.
     * @param soundID The ID of the soundboard sound to get.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#soundboardSounds | Guild#soundboardSounds}
     */
    getSoundboardSound(guildID: string, soundID: string): Promise<Soundboard>;
    /**
     * Get a guild's soundboard sounds.
     * @param guildID The ID of the guild.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#soundboardSounds | Guild#soundboardSounds}
     */
    getSoundboardSounds(guildID: string): Promise<Array<Soundboard>>;
    /**
     * Get a sticker. Response will include a user if the client has the `MANAGE_EMOJIS_AND_STICKERS` permissions.
     * @param guildID The ID of the guild.
     * @param stickerID The ID of the sticker to get.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#stickers | Guild#stickers}
     */
    getSticker(guildID: string, stickerID: string): Promise<Types.Guilds.Sticker>;
    /**
     * Get a guild's stickers. Stickers will include a user if the client has the `MANAGE_EMOJIS_AND_STICKERS` permissions.
     * @param guildID The ID of the guild.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#stickers | Guild#stickers} (will be completely cleared and refilled)
     */
    getStickers(guildID: string): Promise<Array<Types.Guilds.Sticker>>;
    /**
     * Get a guild template.
     * @param code The code of the template to get.
     * @caching This method **does not** cache its result.
     */
    getTemplate(code: string): Promise<GuildTemplate>;
    /**
     * Get a guild's templates.
     * @param guildID The ID of the guild.
     * @caching This method **does not** cache its result.
     */
    getTemplates(guildID: string): Promise<Array<GuildTemplate>>;
    /**
     * Get the vanity url of a guild.
     * @param guildID The ID of the guild.
     * @caching This method **does not** cache its result.
     */
    getVanityURL(guildID: string): Promise<Types.Guilds.GetVanityURLResponse>;
    /**
     * Get the list of usable voice regions for a guild. This will return VIP servers when the guild is VIP-enabled.
     * @param guildID The ID of the guild.
     * @caching This method **does not** cache its result.
     */
    getVoiceRegions(guildID: string): Promise<Array<Types.Voice.VoiceRegion>>;
    /**
     * Get the voice state of a member.
     * @param guildID The ID of the guild.
     * @param memberID The ID of the member. Use `@me` for the bot user.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#voiceStates | Guild#voiceStates}
     */
    getVoiceState(guildID: string, memberID: string): Promise<VoiceState>;
    /**
     * Get the welcome screen for a guild.
     * @param guildID The ID of the guild.
     * @caching This method **does not** cache its result.
     */
    getWelcomeScreen(guildID: string): Promise<Types.Guilds.WelcomeScreen>;
    /**
     * Get the widget of a guild.
     * @param guildID The ID of the guild.
     * @caching This method **does not** cache its result.
     */
    getWidget(guildID: string): Promise<Types.Guilds.Widget>;
    /**
     * Get the widget image of a guild.
     * @param guildID The ID of the guild.
     * @param style The style of the image.
     * @caching This method **does not** cache its result.
     */
    getWidgetImage(guildID: string, style?: Types.Guilds.WidgetImageStyle): Promise<Buffer>;
    /**
     * Get the raw JSON widget of a guild.
     * @param guildID The ID of the guild.
     * @caching This method **does not** cache its result.
     */
    getWidgetJSON(guildID: string): Promise<Types.Guilds.RawWidget>;
    /**
     * Get a guild's widget settings.
     * @param guildID The ID of the guild.
     * @caching This method **does not** cache its result.
     */
    getWidgetSettings(guildID: string): Promise<Types.Guilds.WidgetSettings>;
    /**
     * Search a guild's members.
     * @param guildID The ID of the guild.
     * @param options The options to search with.
     * @param retryOnIndexNotAvailable If the search should be retried if Discord replies with an index unavailable response. This will retry at most one time, waiting for `retry_after` or 15-45 seconds.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#members | Guild#members}
     */
    memberSearch(guildID: string, options?: Types.Guilds.MemberSearchOptions, retryOnIndexNotAvailable?: boolean): Promise<Types.Guilds.MemberSearchResults>;
    /**
     * Remove a ban.
     * @param guildID The ID of the guild.
     * @param userID The ID of the user to remove the ban from.
     * @param reason The reason for removing the ban.
     * @caching This method **does not** cache its result.
     */
    removeBan(guildID: string, userID: string, reason?: string): Promise<void>;
    /**
     * Remove a member from a guild.
     * @param guildID The ID of the guild.
     * @param memberID The ID of the user to remove.
     * @param reason The reason for the removal.
     * @caching This method **does not** cache its result.
     */
    removeMember(guildID: string, memberID: string, reason?: string): Promise<void>;
    /**
     * Remove a role from a member.
     * @param guildID The ID of the guild.
     * @param memberID The ID of the member.
     * @param roleID The ID of the role to remove.
     * @param reason The reason for removing the role.
     * @caching This method **does not** cache its result.
     */
    removeMemberRole(guildID: string, memberID: string, roleID: string, reason?: string): Promise<void>;
    /**
     * Search the username & nicknames of members in a guild. See {@link REST/Guilds#memberSearch | memberSearch} for a more detailed search.
     * @param guildID The ID of the guild.
     * @param options The options to search with.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached.
     * @caches {@link Guild#members | Guild#members}
     */
    searchMembers(guildID: string, options: Types.Guilds.SearchMembersOptions): Promise<Array<Member>>;
    /**
     * Search messages in a guild.
     * @param guildID The ID of the guild.
     * @param options The options to search with.
     * @param retryOnIndexNotAvailable If the search should be retried if Discord replies with an index unavailable response. This will retry at most one time, waiting for `retry_after` or 15-45 seconds.
     * @caching This method **may** cache its result. The messages, channels, and threads will not be cached if the guild is not cached.
     * @caches {@link TextableChannel#messages | TextableChannel#messages}<br>{@link ThreadChannel#messages | ThreadChannel#messages}<br>{@link Guild#channels | Guild#channels}<br>{@link Guild#threads | Guild#threads}
     */
    searchMessages<T extends Types.Channels.AnyTextableGuildChannel | Types.Shared.Uncached = Types.Channels.AnyTextableGuildChannel | Types.Shared.Uncached>(guildID: string, options?: Types.Guilds.SearchMessagesOptions, retryOnIndexNotAvailable?: boolean): Promise<Types.Guilds.MessageSearchResults<T>>;
    /**
     * Sync a guild template.
     * @param guildID The ID of the guild.
     * @param code The code of the template to sync.
     * @caching This method **does not** cache its result.
     */
    syncTemplate(guildID: string, code: string): Promise<GuildTemplate>;
}
