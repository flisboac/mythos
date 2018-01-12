/**
 * @module Mythos API/Entity
 * @internal
 */ /** */


import { IId } from './id'
import { IBox } from './type';
import { IModelType, IModelObject, IModelObjectBox, IModelTypeOptions } from './modelObject';


export type IEntityTypeOptions = IModelTypeOptions & {}

export interface IEntityType<T extends IEntity = IEntity> extends IModelType<T> {}

export interface IEntity extends IModelObject {

        readonly type: IEntityType;
        readonly base?: IEntity;

        rebase(entity: IEntity): void;
        clear(): void;
        clearBase(): void;
        clearTraits(): void;
}

export interface IEntityBox<T extends IEntity = IEntity> extends IModelObjectBox<T> {}

export type IEntityValue<T extends IEntity = IEntity> = IEntity | IEntityBox;
