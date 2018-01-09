/**
 * @module Mythos API/Workspace
 * @internal
 */ /** */

import { IObject, IId, IUuid } from './object';
import { IEntity } from './entity';
import { IConnection } from './connection';
import { IProject, IBuiltinsProject } from './project';
import { ISearchableCollection, ICollection } from './collection';

export type IWorkspaceSaveOptions = {

    saveProjects: true
}

export interface IWorkspaceProjects extends ICollection<IProject, IId> {}

export interface IWorkspace {

    readonly projects: IWorkspaceProjects;
    readonly builtins: IBuiltinsProject;

    open(idOrName: IId): IProject;
}

export declare function openWorkspace(location?: string): IWorkspace;
