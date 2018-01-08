/**
 * @module Mythos API/Value/File
 * @internal
 */ /** */

import { IBox, IValueType } from '../box';

export interface IFile {

    name: string;
    lastModified: Date | null;
    size: number | null;
}

export interface IFileBox<T extends IFile = IFile> extends IBox<T> {}
