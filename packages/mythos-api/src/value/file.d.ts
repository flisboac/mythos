/**
 * @module Mythos API/Value/File
 * @internal
 */ /** */

import { IBox, IType } from '../type';

export interface IFile {

    name: string;
    lastModified: Date | null;
    size: number | null;
}

export interface IFileBox<T extends IFile = IFile> extends IBox<T> {}
