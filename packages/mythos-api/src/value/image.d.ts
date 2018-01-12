/**
 * @module Mythos API/Value/Image
 * @internal
 */ /** */

import { IBox, IType } from '../type';


export interface IImageFile {} // TODO

export interface IImageBox<T extends IImageFile = IImageFile> extends IBox<T> {}
