/**
 * @module Mythos API/Identifier
 * @internal
 */ /** */

import { IType, IBox } from './type'

export type IUuidData = { value: string, format: "v4" | "v5" }
export type IDerivedUuid = { value: string, namespace: IType }
export type IUuid = string | IDerivedUuid | IUuidData;

export const enum IIdFormat {
    CAMEL, DASH, SNAKE
}

export interface IIdType extends IType<IId> {}

export interface IId {

    readonly value: string;
    readonly format: IIdFormat;
    to(format: IIdFormat): IId;
}

export function id(value: IIdValue, format?: IIdFormat): IId;

export interface IIdBox extends IBox<IId> {}

export type IIdValue = string | IId | IIdBox;
