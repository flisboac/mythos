/**
 * @module Mythos API/Model Object
 * @internal
 */ /** */

import { IType, INamedProjectComponent, IUuidProjectComponent, IId, ITypeOptions } from './object';
import { IBox, IValueType } from './box';
import { IStringBox } from './value/index';
import { ITrait } from './trait';


export type IModelTypeOptions = ITypeOptions & {}

export interface IModelType<
    ModelObjectType extends IModelObject = IModelObject,
    BoxType extends IModelObjectBox<ModelObjectType> = IModelObjectBox<ModelObjectType>>
extends IValueType<ModelObjectType, BoxType> {

    readonly traits: ITrait[];
}

export interface IModelObject 
extends IUuidProjectComponent, Iterable<ITrait> {

    readonly type: IModelType;
}

export interface IModelObjectBox<T extends IModelObject = IModelObject> extends IBox<T> {}
