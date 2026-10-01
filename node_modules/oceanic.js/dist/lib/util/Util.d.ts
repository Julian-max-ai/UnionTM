/// <reference types="node" />
/// <reference types="node" />
import type * as Types from "../types/namespaced";
import type Client from "../Client";
import { type ImageFormat, type PrivilegedIntentNames } from "../Constants";
import Member from "../structures/Member";
import Message from "../structures/Message";
import Entitlement from "../structures/Entitlement";
import TestEntitlement from "../structures/TestEntitlement";
import type Poll from "../structures/Poll";
import Subscription from "../structures/Subscription";
/** A general set of utilities. These are intentionally poorly documented, as they serve almost no usefulness to outside developers. */
export default class Util {
    private _client;
    constructor(client: Client);
    static rawEmbeds(embeds: Types.Channels.RawEmbed): Types.Channels.Embed;
    static rawEmbeds(embeds: Array<Types.Channels.RawEmbed>): Array<Types.Channels.Embed>;
    static rawMessageComponents(components: Types.Channels.RawMessageComponent): Types.Channels.MessageComponent;
    static rawMessageComponents(components: Array<Types.Channels.RawMessageComponent>): Array<Types.Channels.MessageComponent>;
    static rawModalComponents(components: Types.Channels.RawModalComponent): Types.Channels.ModalComponent;
    static rawModalComponents(components: Array<Types.Channels.RawModalComponent>): Array<Types.Channels.ModalComponent>;
    /** @hidden intentionally not documented - this is an internal function */
    _arrayToCSV(data: Array<string>, header?: string): Buffer;
    /** @hidden intentionally not documented - this is an internal function */
    _arrayToCSVFile(data: Array<string>, name: string, header?: string): Types.RequestHandler.File;
    /** @hidden intentionally not documented - this is an internal function */
    _convertImage(image: Buffer | string, name: string): string;
    /** @hidden intended for internal use only */
    _convertSound(sound: Buffer | string, name: string): string;
    /** @internal */
    _freeze<T>(obj: T, detail?: string): T;
    /** @hidden intended for internal use only */
    _getLimit(name: Exclude<keyof Types.Client.CollectionLimitsOptions, "users">, id?: string): number;
    /** @hidden intended for internal use only */
    _isModuleInstalled(name: string): boolean;
    _setLimit(values?: Record<string, number> | number, defaultValue?: number): Record<string, number> | number;
    componentToParsed<T extends Types.Channels.RawComponent>(component: T): Types.Channels.ToComponentFromRaw<T>;
    componentToRaw<T extends Types.Channels.Component>(component: T): Types.Channels.ToRawFromComponent<T>;
    componentsToParsed<T extends Types.Channels.AnyRawBaseComponent>(components: Array<T>): Array<Types.Channels.ToComponentFromRaw<T>>;
    componentsToRaw<T extends Types.Channels.MessageComponent | Types.Channels.ModalComponent>(components: Array<T>): Array<T extends Types.Channels.MessageComponent ? Types.Channels.RawMessageComponent : T extends Types.Channels.ModalComponent ? Types.Channels.RawModalComponent : never>;
    convertApplicationEmoji(raw: Types.Applications.RawApplicationEmoji): Types.Applications.ApplicationEmoji;
    convertGuildEmoji(raw: Types.Guilds.RawGuildEmoji): Types.Guilds.GuildEmoji;
    convertImage(img: Buffer | string): string;
    convertScheduledEventException(raw: Types.ScheduledEvents.RawScheduledEventException): Types.ScheduledEvents.ScheduledEventException;
    convertSound(audio: Buffer | string): string;
    convertSticker(raw: Types.Guilds.RawSticker): Types.Guilds.Sticker;
    detectMissingPrivilegedIntents(intents?: number): Promise<Array<PrivilegedIntentNames>>;
    embedsToParsed(embeds: Array<Types.Channels.RawEmbed>): Array<Types.Channels.Embed>;
    embedsToRaw(embeds: Array<Types.Channels.EmbedOptions>): Array<Types.Channels.RawEmbedOptions>;
    formatAllowedMentions(allowed?: Types.Channels.AllowedMentions | null): Types.Channels.RawAllowedMentions;
    formatImage(url: string, format?: ImageFormat, size?: number): string;
    getMagic(file: Buffer, len?: number): string;
    modalSubmitComponentsToParsed<T extends Types.Interactions.RawModalSubmitComponentsActionRow | Types.Interactions.RawModalSubmitComponentsLabel | Types.Interactions.RawModalSubmitComponents>(components: Array<T>): Array<Types.Interactions.ToModalSubmitComponentFromRaw<T>>;
    modalSubmitComponentsToRaw<T extends Types.Interactions.ModalSubmitComponentsActionRow | Types.Interactions.ModalSubmitComponentsLabel | Types.Interactions.ModalSubmitComponents>(components: Array<T>): Array<Types.Interactions.ToRawFromModalSubmitComponent<T>>;
    optionToParsed(option: Types.Applications.RawApplicationCommandOption): Types.Applications.ApplicationCommandOptions;
    optionToRaw(option: Types.Applications.ApplicationCommandOptions): Types.Applications.RawApplicationCommandOption;
    /** @internal */
    replacePollAnswer(poll: Poll, answerID: number, count: number, users?: Array<string>): void;
    updateChannel<T extends Types.Channels.AnyChannel>(channelData: Types.Channels.RawChannel): T;
    /** @internal */
    updateEntitlement<T extends Entitlement | TestEntitlement = Entitlement | TestEntitlement>(data: Types.Applications.RawBaseEntitlement): T;
    /** @internal */
    updateMember(guildID: string, memberID: string, member: Types.Guilds.RawMember | Types.Guilds.RESTMember): Member;
    /** @internal */
    updateMessage<T extends Types.Channels.AnyTextableChannel | Types.Shared.Uncached>(data: Types.Channels.RawMessage): Message<T>;
    /** @internal */
    updatePollAnswer(poll: Poll, answerID: number, count: number, user?: string): void;
    /** @internal */
    updateSubscription(data: Types.Applications.RawSubscription): Subscription;
    /** @internal */
    updateThread<T extends Types.Channels.AnyThreadChannel>(threadData: Types.Channels.RawThreadChannel): T;
}
