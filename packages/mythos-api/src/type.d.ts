/**
 * @module Mythos API/Box
 * @internal
 */ /** */
import { IIdValue, IUuid } from './id'
import { IProject } from './project'
import { IObject, INamedProjectComponent } from './object'
import { ITranslatableState, ITranslatable, ILangName } from './language'
import { IStringBox, IStringValue } from './value/string';


export type ITypeOptions = {

    id?: IIdValue,
    uuid?: IUuid,
    description?: IStringValue,
    documentation?: IStringValue,
    showDescription?: boolean
}

export interface ITypeInfo {

    readonly project: IProject;
    readonly supertype: IType; // (Single) Inheritance, if any
    readonly parent: IType | IProject; // As in container type, e.g. where is it defined?
    readonly required: boolean;
    readonly nullable: boolean;
    readonly showDescription: boolean;
    readonly description: IStringBox;
    readonly documentation: IStringBox;
}

export interface IType<InstanceType = any> {

    id: IIdValue;
    readonly info: ITypeInfo;

    isInstance(object: any): boolean;
    isAssignableFrom(otherType: any): boolean;
    wrap<T extends InstanceType>(value: T | IBox<T>): IBox<T>;
}

export interface IBox<RawType> {

    readonly type: IType<RawType>;

    /** Indicates whether the box's value was assigned at least once since a
     * previous unassigned state.
     */
    readonly assigned: boolean;

    /** The box's value, readable only when the box is assigned a value.
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
