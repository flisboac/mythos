/**
 * @module Mythos API/Value/Number
 * @internal
 */ /** */

import { IBox, IType } from '../type';

export interface INumberValueType extends IType<number> {

    integer: boolean;
    imprecise: boolean;
    //overflow: "none" | "error" | "saturate" | "infinity" | "rotate";
    minimum?: number;
    maximum?: number;
    step?: number;
}

export interface INumberBox extends IBox<number> {

    readonly type: INumberValueType;
}
