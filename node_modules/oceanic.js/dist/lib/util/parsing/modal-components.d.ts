import type * as Types from "../../types/namespaced";
export declare function fromRaw<T extends Types.Interactions.RawModalSubmitComponentsActionRow | Types.Interactions.RawModalSubmitComponentsLabel | Types.Interactions.RawModalSubmitComponents>(component: T): Types.Interactions.ToModalSubmitComponentFromRaw<T>;
export declare function toRaw<T extends Types.Interactions.ModalSubmitComponentsActionRow | Types.Interactions.ModalSubmitComponentsLabel | Types.Interactions.ModalSubmitComponents>(component: T): Types.Interactions.ToRawFromModalSubmitComponent<T>;
