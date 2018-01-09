/**
 * @module Mythos API/Object
 * @internal
 */ /** */

import { IProject } from './project'
import { IBox, IValueType } from './box';
import { IStringBox } from './value/index';
import { IStringValueType } from './value/string';


export type IUuidData = { value: string, format: "v4" | "v5" }
export type IDerivedUuid = { value: string, namespace: IType }
export type IUuid = string | IDerivedUuid | IUuidData;

export type IId = string | {

    value: string,
    format: "camel" | "dash" | "snake"
};

export declare function idToDashCase(id: IId): string;
export declare function dashCaseToId(dashCase: string): IId;
export declare function camelCaseToId(dashCase: string): IId;

export interface IObject {

    readonly project: IProject;
    readonly type: IType;
}

export interface INamedProjectComponent extends IObject {

    readonly id?: IId;
}

export interface IUuidProjectComponent extends IObject {

    readonly uuid: IUuid;
}

export interface IDocumented {

    description?: IStringBox;
    documentation?: IStringBox;
    showDescription?: boolean;
}

export type ITypeOptions = {

    id?: IId,
    uuid?: IUuid,
    project?: IProject,
    description?: IStringBox | string,
    documentation?: IStringBox | string,
    showDescription?: boolean
}

export interface IType extends INamedProjectComponent, IDocumented {

    readonly supertype: IType; // (Single) Inheritance, if any
    readonly parent: IType | IProject; // As in container type, e.g. where is it defined?
    readonly optionsType: ITypeOptions;
    id: IId;
    description: IStringBox;

    isInstance(object: any): boolean;
    isAssignableFrom(otherType: IType): boolean;
    wrap(value: IObject | IBox<IObject>): IBox<IObject>;
}

export interface IIdBox extends IBox<IId> {}

export interface IIdValueType extends IValueType<IId, IIdBox> {}
