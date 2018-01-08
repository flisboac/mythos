/**
 * @module Mythos API/Value/Image
 * @internal
 */ /** */

import { IBox, IValueType } from '../box';


export interface IImageFile {} // TODO

export interface IImageBox<T extends IImageFile = IImageFile> extends IBox<T> {}
