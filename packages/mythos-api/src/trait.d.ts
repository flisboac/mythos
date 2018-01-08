/**
 * @module Mythos API/Trait
 * @internal
 */ /** */

import { IType, INamedProjectComponent, IId } from './object';
import { IBox, IValueType } from './box';
import { IStringBox } from './value/index';
import { IProperty, IPropertyType } from './property';


export interface ITraitType extends IType {

    id: IId;
    description: IStringBox;
    readonly properties: IProperty[];

    newProperty<T>(
        id: IId, 
        options?: {
            displayName?: IStringBox, 
            type: IValueType<T>, 
            defaultValue?: T
        }
    ): IPropertyType<T>;
}

export interface ITrait extends INamedProjectComponent, Iterable<IProperty> {

    readonly id: IId; // mandatory
    readonly type: ITraitType;
    readonly size: number;

    property<RawType = any>(propertyId: IId | Function, value?: RawType): IProperty;
    clear(): void;
    assignDefaults(): void;
}
