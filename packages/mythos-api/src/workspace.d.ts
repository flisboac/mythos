/**
 * @module Mythos API/Workspace
 * @internal
 */ /** */

import { IObject, IId } from './object';
import { IEntity } from './entity';
import { IConnection } from './connection';
import { IProject, IBuiltinsProject } from './project';

export type IWorkspaceSaveOptions = {
    saveProjects: true
}

export interface IWorkspace extends IObject {

    readonly projects: IProject[];
    readonly builtins: IBuiltinsProject;

    open(idOrName: string | IId): IProject;
}

export declare function openWorkspace(location?: string): IWorkspace;
