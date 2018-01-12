/**
 * @module Mythos API/Value/Boolean
 * @internal
 */ /** */


import { IBox, IType } from '../type';

export interface IBooleanValueType extends IType<boolean> {

        defaultIndeterminate: boolean;
}

export interface IBooleanBox extends IBox<boolean> {

        readonly type: IBooleanValueType;
        indeterminate: boolean;
}
