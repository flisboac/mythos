/**
 * @module mythos-api
 * @internal
 */ /** */

import { IType, INamedProjectComponent, IUuidProjectComponent, IId, ITypeOptions } from './object';
import { IBox, IStringBox } from './value/index';
import { ITrait } from './trait';


export type IModelTypeOptions = ITypeOptions & {}

export interface IModelType extends IType {

    readonly traits: ITrait[];

    extend(id: IId, options?: IModelTypeOptions): IModelType;
    wrap(value: IModelObject | IModelObjectBox): IModelObjectBox;

    newTrait(id: IId): ITrait;
}

export interface IModelObject 
extends IUuidProjectComponent, Iterable<ITrait> {

    readonly type: IModelType;
}

export interface IModelObjectBox<T extends IModelObject = IModelObject> extends IBox<T> {}