/**
 * @module Mythos API/Box
 * @internal
 */ /** */


import { IType, IObject } from './object'
import { ITranslatableState, ILanguageName } from './language'
import { ITranslatable } from './language';


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
