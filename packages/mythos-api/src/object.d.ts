/**
 * @module Mythos API/Object
 * @internal
 */ /** */

import { IId, IUuid } from './id';
import { IBox, IType } from './type';
import { IStringBox, IStringValue } from './value/string';


export interface IObjectType<T extends IObject = IObject> extends IType<T> {}

export interface IObject {

    readonly type: IObjectType;
}

export interface INamedProjectComponent extends IObject {

    readonly id?: IId;
}

export interface IUuidProjectComponent extends INamedProjectComponent {

    readonly uuid: IUuid;
}

export interface IObjectBox<T extends IObject = IObject> extends IBox<T> {}

export type IObjectValue<T extends IObject = IObject> = T | IObjectBox<T>;
