"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/** @module TypedCollection */
const Collection_1 = tslib_1.__importDefault(require("./Collection"));
const Base_1 = tslib_1.__importDefault(require("../structures/Base"));
/** This is an internal class, you should not use it in your projects. If you want a collection type for your own projects, look at {@link Collection}. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
class TypedCollection extends Collection_1.default {
    _baseObject;
    extraOptions;
    limit;
    constructor(baseObject, client, limit = Infinity, extraOptions) {
        super();
        if (!(baseObject.prototype instanceof Base_1.default)) {
            throw new TypeError("baseObject must be a class that extends Base.");
        }
        this._baseObject = baseObject;
        this.limit = limit;
        this.extraOptions = {
            construct: extraOptions?.construct ?? ((data, ...extra) => new baseObject(data, client, ...extra)),
            delete: extraOptions?.delete ?? (() => { })
        };
    }
    /** @hidden */
    add(value) {
        if ("id" in value) {
            if (this.limit === 0) {
                return value;
            }
            this.set(value.id, value);
            if (this.limit && this.size > this.limit) {
                const iter = this.keys();
                while (this.size > this.limit) {
                    const val = iter.next().value;
                    if (val === undefined) {
                        break;
                    }
                    this.delete(val);
                }
            }
            return value;
        }
        else {
            const err = new Error(`${this.constructor.name}#add: value must have an id property`);
            Object.defineProperty(err, "_object", { value });
            throw err;
        }
    }
    clear() {
        for (const key of this.keys()) {
            this.extraOptions.delete(key);
        }
        super.clear();
    }
    delete(key) {
        this.extraOptions.delete(key);
        return super.delete(key);
    }
    /** @hidden */
    update(value, ...extra) {
        if (value instanceof this._baseObject) {
            if ("update" in value) {
                value["update"].call(value, value);
            }
            return value;
        }
        // if the object does not have a direct id, we're forced to construct a whole new object
        let item = "id" in value && value.id ? this.get(value.id) : undefined;
        if (!item) {
            item = this.add(this.extraOptions.construct(value, ...extra));
        }
        else if ("update" in item) {
            item["update"].call(item, value);
        }
        return item;
    }
}
exports.default = TypedCollection;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHlwZWRDb2xsZWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL3V0aWwvVHlwZWRDb2xsZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDhCQUE4QjtBQUM5QixzRUFBc0M7QUFHdEMsc0VBQXNDO0FBUXRDLDBKQUEwSjtBQUMxSiw4REFBOEQ7QUFDOUQsTUFBcUIsZUFBOEYsU0FBUSxvQkFBcUI7SUFDcEksV0FBVyxDQUFpQztJQUNwRCxZQUFZLENBQWtDO0lBQzlDLEtBQUssQ0FBUztJQUNkLFlBQVksVUFBMEMsRUFBRSxNQUFjLEVBQUUsS0FBSyxHQUFHLFFBQVEsRUFBRSxZQUFvQztRQUMxSCxLQUFLLEVBQUUsQ0FBQztRQUNSLElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxTQUFTLFlBQVksY0FBSSxDQUFDLEVBQUUsQ0FBQztZQUMxQyxNQUFNLElBQUksU0FBUyxDQUFDLCtDQUErQyxDQUFDLENBQUM7UUFDekUsQ0FBQztRQUNELElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDO1FBQzlCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxZQUFZLEdBQUc7WUFDaEIsU0FBUyxFQUFFLFlBQVksRUFBRSxTQUFTLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFHLEtBQUssRUFBSyxFQUFFLENBQUMsSUFBSSxVQUFVLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxHQUFHLEtBQUssQ0FBQyxDQUFDO1lBQ3JHLE1BQU0sRUFBSyxZQUFZLEVBQUUsTUFBTSxJQUFJLENBQUMsR0FBUyxFQUFFLEdBQUUsQ0FBQyxDQUFDO1NBQ3RELENBQUM7SUFDTixDQUFDO0lBRUQsY0FBYztJQUNkLEdBQUcsQ0FBYyxLQUFRO1FBQ3JCLElBQUksSUFBSSxJQUFJLEtBQUssRUFBRSxDQUFDO1lBQ2hCLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxDQUFDLEVBQUUsQ0FBQztnQkFDbkIsT0FBTyxLQUFLLENBQUM7WUFDakIsQ0FBQztZQUNELElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUUxQixJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ3ZDLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDekIsT0FBTyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFDNUIsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEtBQTJCLENBQUM7b0JBQ3BELElBQUksR0FBRyxLQUFLLFNBQVMsRUFBRSxDQUFDO3dCQUNwQixNQUFNO29CQUNWLENBQUM7b0JBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDckIsQ0FBQztZQUVMLENBQUM7WUFFRCxPQUFPLEtBQUssQ0FBQztRQUNqQixDQUFDO2FBQU0sQ0FBQztZQUNKLE1BQU0sR0FBRyxHQUFHLElBQUksS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLHNDQUFzQyxDQUFDLENBQUM7WUFDdEYsTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsU0FBUyxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztZQUNqRCxNQUFNLEdBQUcsQ0FBQztRQUNkLENBQUM7SUFDTCxDQUFDO0lBRVEsS0FBSztRQUNWLEtBQUssTUFBTSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUM7WUFDNUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbEMsQ0FBQztRQUNELEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBRVEsTUFBTSxDQUFDLEdBQVc7UUFDdkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDOUIsT0FBTyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRCxjQUFjO0lBQ2QsTUFBTSxDQUFDLEtBQXdDLEVBQUUsR0FBRyxLQUFRO1FBQ3hELElBQUksS0FBSyxZQUFZLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNwQyxJQUFJLFFBQVEsSUFBSSxLQUFLLEVBQUUsQ0FBQztnQkFDcEIsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDdkMsQ0FBQztZQUNELE9BQU8sS0FBSyxDQUFDO1FBQ2pCLENBQUM7UUFDRCx3RkFBd0Y7UUFDeEYsSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1FBQ3RFLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNSLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLEtBQVUsRUFBRSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDdkUsQ0FBQzthQUFNLElBQUksUUFBUSxJQUFJLElBQUksRUFBRSxDQUFDO1lBQzFCLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3JDLENBQUM7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0NBQ0o7QUExRUQsa0NBMEVDIn0=