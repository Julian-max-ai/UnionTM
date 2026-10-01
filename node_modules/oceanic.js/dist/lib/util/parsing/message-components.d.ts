import type * as Types from "../../types/namespaced";
export declare function fromRaw<T extends Types.Channels.RawComponent>(component: T): Types.Channels.ToComponentFromRaw<T>;
export declare function toRaw<T extends Types.Channels.Component>(component: T): Types.Channels.ToRawFromComponent<T>;
