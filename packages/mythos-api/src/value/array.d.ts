/**
 * @module Mythos API/Value/Array
 * @internal
 */ /** */

import { IType } from '../object'
import { IBox, IValueType } from '../box';


export interface IArrayValueType<ValueType extends IType> extends IValueType<Array<ValueType>> {

    valueType: ValueType;
    minimumSize?: number;
    maximumSize?: number;
}

export interface IArrayBox<ValueType extends IType> extends IBox<Array<ValueType>> {

    readonly type: IArrayValueType<ValueType>;
}
