/**
 * @module Mythos API/Value/Array
 * @internal
 */ /** */


import { IBox, IType } from '../type';


export interface IArrayValueType<ValueType extends IType> extends IType<Array<ValueType>> {

    valueType: ValueType;
    minimumSize?: number;
    maximumSize?: number;
}

export interface IArrayBox<ValueType extends IType> extends IBox<Array<ValueType>> {

    readonly type: IArrayValueType<ValueType>;
}
