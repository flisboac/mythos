/**
 * @module mythos-api
 * @internal
 */ /** */

import { IBox, IValueType } from './box';

export interface IColor {

    // All components go from 0 to 255
    red: number;
    green: number;
    blue: number;
    alpha: number | null;
    
    toRgbString(): string;
}


export interface IColorBox<T extends IColor = IColor> extends IBox<T> {}
