/**
 * @module mythos-api
 * @internal
 */ /** */


import { IType, IObject } from '../object'
import { ITranslatableState, LanguageName } from '../language'
import { ITranslatable } from '../index';


export interface IValueType<
    RawType,
    InstanceType extends IBox<RawType> = IBox<RawType>
> extends IType {

    required: boolean;
    nullable: boolean;
}

export interface IBox<RawType> extends IObject {

    readonly type: IValueType<RawType>;

    /** Indicates whether the box's value was assigned at least once since a
     * previous unassigned state.
     */
    readonly assigned: boolean;

    /** The box's value, readable only when the box is assigned.
     * 
     * Some box types may not accept null as a value, in which case the box's 
     * type must indicate that fact through the {@link IValueType#nullable}
     * property .
     */
    value: RawType | null;

    /** Returns the box to an unassigned state and assigns the value type's
     * default value, if any.
     */
    reset(): void;
}


export interface IFile {

    name: string;
    lastModified: Date | null;
    size: number | null;
}

export interface IImageFile extends IFile {} // TODO

// TODO All of the types below
// TODO Create the IValueType classes for each specific rendering case, instead
// of having specialized IBox types for same raw types
// Basic

// Extended
export interface IFileBox<T extends IFile = IFile> extends IBox<T> {}
export interface IImageBox<T extends IImageFile = IImageFile> extends IBox<T> {}
export interface IPasswordBox extends IBox<string> {}

// Project-dependent
// export interface ICalendarDateBox extends IBox<ICalendarDateTime> {}
// export interface ICalendarTimeBox extends IBox<ICalendarDateTime> {}
// export interface ICalendarDateTimeBox extends IBox<ICalendarDateTime> {}
