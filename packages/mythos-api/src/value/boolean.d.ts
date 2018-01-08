/**
 * @module Mythos API/Value/Boolean
 * @internal
 */ /** */

import { IBox, IValueType } from '../box';

export interface IBooleanValueType extends IValueType<boolean> {

    defaultIndeterminate: boolean;
}

export interface IBooleanBox extends IBox<boolean> {

    readonly type: IBooleanValueType;
    indeterminate: boolean;
}
