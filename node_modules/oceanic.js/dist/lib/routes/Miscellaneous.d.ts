/** @module REST/Miscellaneous */
import type * as Types from "../types/namespaced";
import type RESTManager from "../rest/RESTManager";
import Soundboard from "../structures/Soundboard";
/** Methods that don't fit anywhere else. Located at {@link Client#rest | Client#rest}{@link RESTManager#misc | .misc}. */
export default class Miscellaneous {
    private _manager;
    constructor(manager: RESTManager);
    /**
     * Get the default soundboard sounds.
     * @caching This method **does not** cache its result.
     */
    getDefaultSoundboardSounds(): Promise<Array<Soundboard>>;
    /**
     * Get a sticker.
     * @param stickerID The ID of the sticker to get.
     * @caching This method **may** cache its result. The result will not be cached if the guild is not cached, or if the sticker is not a guild sticker.
     * @caches {@link Guild#stickers | Guild#stickers}
     */
    getSticker(stickerID: string): Promise<Types.Guilds.Sticker>;
    /**
     * Get a default sticker pack.
     * @caching This method **does not** cache its result.
     */
    getStickerPack(stickerPackID: string): Promise<Types.Guilds.StickerPack>;
    /**
     * Get the default sticker packs.
     * @caching This method **does not** cache its result.
     */
    getStickerPacks(): Promise<Array<Types.Guilds.StickerPack>>;
    /**
     * Get the list of usable voice regions.
     * @caching This method **does not** cache its result.
     */
    getVoiceRegions(): Promise<Array<Types.Voice.VoiceRegion>>;
    /**
     * Refresh expired attachment URLs.
     * @param urls The CDN urls to refresh.
     */
    refreshAttachmentURLs(urls: Array<string>): Promise<Types.Misc.RefreshAttachmentURLsResponse>;
}
