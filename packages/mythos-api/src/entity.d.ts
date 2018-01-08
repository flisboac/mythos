/**
 * @module Mythos API/Entity
 * @internal
 */ /** */

import { IId } from './object'
import { IModelType, IModelObject, IModelObjectBox, IModelTypeOptions } from './modelObject';
import { IBox } from './box';


export type IEntityTypeOptions = IModelTypeOptions & {}

export interface IEntityType extends IModelType {

    extend(id: IId, options?: IModelTypeOptions): IModelType;
    wrap(value: IEntity | IEntityBox): IEntityBox;
}

export interface IEntity extends IModelObject {

    readonly type: IEntityType;
    readonly base?: IEntity;

    rebase(entity: IEntity): void;
    clear(): void;
    clearBase(): void;
    clearTraits(): void;
}

export interface IEntityBox<T extends IEntity = IEntity> extends IModelObjectBox<T> {}
