/**
 * @module mythos-api
 * @internal
 */ /** */

import { IProject } from './project'
import { IStringBox, IBox } from './value/index'

export type IUuid = string;
export type IId = string;

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
    displayName?: IStringBox | string,
    description?: IStringBox | string,
    documentation?: IStringBox | string,
    showDescription?: boolean
}

export interface IType extends INamedProjectComponent, IDocumented {

    readonly supertype?: IType; // (Single) Inheritance, if any
    readonly parent?: IType; // As in container type, e.g. where is it defined?
    id: IId;
    displayName?: IStringBox;

    extend(id: IId, options?: ITypeOptions): IType;
    wrap(value: IObject | IBox<IObject>): IBox<IObject>;
}
