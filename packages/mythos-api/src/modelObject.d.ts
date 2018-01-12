/**
 * @module Mythos API/Model Object
 * @internal
 */ /** */

 
import { IId } from './id';
import { IType, ITypeOptions, IBox } from './type'
import { IObjectType, INamedProjectComponent, IUuidProjectComponent } from './object';
import { IStringBox } from './value/string';
import { ITrait } from './trait';


export type IModelTypeOptions = ITypeOptions & {}

export interface IModelType<ModelObjectType extends IModelObject = IModelObject>
extends IObjectType<ModelObjectType> {

    readonly traits: ITrait[];
}

export interface IModelObject 
extends IUuidProjectComponent, Iterable<ITrait> {

    readonly type: IModelType;
}

export interface IModelObjectBox<T extends IModelObject = IModelObject> extends IBox<T> {}

export type IModelObjectValue<T extends IModelObject = IModelObject> = T | IModelObjectBox<T>;
