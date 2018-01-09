/**
 * @module Mythos API/Collection
 * @internal
 */ /* */

export interface ICollection<ValueType, KeyType> extends Iterable<ValueType> {

    readonly size: number;

    keys(): KeyType[];
    values(): ValueType[];

    get(id: KeyType): ValueType;

    find(id: KeyType): ValueType | null;
    find(id: (type: ValueType) => boolean): ValueType | null;
}

export interface ISearchableCollection<ValueType, KeyType, SearchOptionsType>
extends ICollection<ValueType, KeyType> {

    keys(options?: SearchOptionsType): KeyType[];
    values(options?: SearchOptionsType): ValueType[];

    get(id: KeyType, options?: SearchOptionsType): ValueType;

    find(id: KeyType, options?: SearchOptionsType): ValueType | null;
    find(id: (type: ValueType) => boolean, options?: SearchOptionsType): ValueType | null;
}
