/**
 * @module mythos-api
 * @internal
 */ /** */

import { IObject, IId } from './object';
import { IEntity } from './entity';
import { IConnection } from './connection';
import { IProject } from './project';


export type IWorkspaceNullsMap = {

    readonly project: IProject,
    readonly entity: IEntity,
    readonly connection: IConnection
}

export type IWorkspaceSaveOptions = {
    saveProjects: true
}

export type IWorkspaceAutoSaveOptions = IWorkspaceSaveOptions;

export interface IWorkspace extends IObject {

    readonly projects: IProject[];
    readonly builtins: IProject;
    readonly nulls: IWorkspaceNullsMap;

    save(options?: IWorkspaceSaveOptions): void;
    autoSave(options?: IWorkspaceAutoSaveOptions): void;
    openProject(idOrName: string | IId): IProject;
}

export declare function openWorkspace(location?: string): IWorkspace;
