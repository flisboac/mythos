/**
 * @module Mythos API/Workspace
 * @internal
 */ /** */


import { IId, IUuid } from './id';
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

export function openWorkspace(location?: string): IWorkspace;
