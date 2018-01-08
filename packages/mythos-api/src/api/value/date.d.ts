/**
 * @module mythos-api
 * @internal
 */ /** */

import { IBox, IValueType } from './box';

// Renders a spinner
export interface IDateValueType extends IValueType<Date> {

    offset?: string | number; // May be either a timezone name, an UTC offset or a number specifying the time displacement in seconds.
    mode: "date" | "time" | "datetime";
    minimumDate?: Date;
    maximumDate?: Date;
}

export interface IDateBox extends IBox<Date> {

    readonly type: IDateValueType;
}
