/**
 * @module Mythos API/Project
 * @internal
 */ /** */

import { IObject, IType, IId, IUuidData, ITypeOptions } from './object'
import { ICollection, ISearchableCollection } from './collection';
import { IModelObject } from './modelObject'
import { IValueType } from './box'
import { ITrait } from './trait'
import { IEntity, IEntityType } from './entity'
import { IConnection, IConnectionType } from './connection'
import { IUuid } from './index';


export type IProjectVersion = string | {
    major: number,
    minor: number,
    patch: number,
    label: string,
    toString(): string;
};

export interface IProjectSearchOptions {
    recursive: boolean,
    dependencies: boolean
}

export interface IProjectDependencies extends ICollection<IProject, IId> {}

export interface IProjectTypes extends ISearchableCollection<IType, IId, IProjectSearchOptions> {

    valueTypes(options?: IProjectSearchOptions): IValueType<any>[];
    entities(options?: IProjectSearchOptions): IEntityType[];
    connections(options?: IProjectSearchOptions): IConnectionType[];
}

export interface IProjectModel extends ISearchableCollection<IModelObject, IId | IUuid, IProjectSearchOptions> {

    entities(options?: IProjectSearchOptions): IEntity[];
    connections(options?: IProjectSearchOptions): IConnection[];
}

export interface IProjectInfo {

    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly version: IProjectVersion;
    readonly dependencies: IProjectDependencies;
}

export interface IProject {

    readonly info: IProjectInfo;
    readonly types: IProjectTypes;
    readonly model: IProjectModel;

    readonly closed: boolean;

    extend<T extends IType>(type: T, options?: ITypeOptions): T;

    close(): void;
}

export interface IBuiltinsProject extends IProject {

    readonly nulls: {
        readonly project: IProject,
        readonly entity: IEntity,
        readonly connection: IConnection
    };
}
