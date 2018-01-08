/**
 * @module mythos-api
 * @internal
 */ /** */

import { IBox, IValueType } from './box';

// Renders a spinner
export interface INumberValueType extends IValueType<number> {

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
