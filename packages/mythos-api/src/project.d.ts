/**
 * @module Mythos API/Project
 * @internal
 */ /** */

import { IObject, IType, IId } from './object'
import { IModelObject } from './modelObject'
import { IValueType } from './box'
import { ITrait } from './trait'
import { IEntity, IEntityType } from './entity'
import { IConnection, IConnectionType } from './connection'
import { IUuid } from './index';

export declare const enum IEnumValues { A }
export declare interface Enum {}
export type IEnum = IEnumValues | Enum;

export type IProjectVersion = string | {
    major: number,
    minor: number,
    patch: number,
    label: string,
    toString(): string;
};

export type IProjectSearchOptions = {
    recursive: boolean,
    dependencies: boolean
}

export interface IProjectDependencies extends Iterable<IProject> {

    readonly size: number;

    ids(): IId[];

    get(id: string): IProject;

    find(id: string): IProject | null;
    find(id: (project: IProject) => boolean): IProject | null;
}

export interface IProjectTypes extends Iterable<IType> {

    readonly size: number;

    ids(options?: IProjectSearchOptions): IId[];
    valueTypes(options?: IProjectSearchOptions): IValueType<any>[];
    entities(options?: IProjectSearchOptions): IEntityType[];
    connections(options?: IProjectSearchOptions): IConnectionType[];

    get(id: IId, options?: IProjectSearchOptions): IType;

    find(id: IId, options?: IProjectSearchOptions): IType | null;
    find(id: (type: IType) => boolean, options?: IProjectSearchOptions): IType | null;
}

export interface IProjectModel extends Iterable<IModelObject> {

    readonly size: number;

    ids(options?: IProjectSearchOptions): IId[];
    entities(options?: IProjectSearchOptions): IEntity[];
    connections(options?: IProjectSearchOptions): IConnection[];

    get(id: IId | IUuid, options?: IProjectSearchOptions): IModelObject;

    find(id: IId | IUuid, options?: IProjectSearchOptions): IModelObject | null;
    find(id: (type: IModelObject) => boolean, options?: IProjectSearchOptions): IModelObject | null;
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

    close(): void;
}

export interface IBuiltinsProject extends IProject {

    readonly nulls: {
        readonly project: IProject,
        readonly entity: IEntity,
        readonly connection: IConnection
    };
}
