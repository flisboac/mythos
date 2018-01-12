/**
 * @module Mythos API/Trait
 * @internal
 */ /** */


import { IId } from './id';
import { INamedProjectComponent } from './object';
import { IBox, IType } from './type';
import { IStringBox } from './value/string';
import { IProperty, IPropertyType } from './property';


export interface ITraitType extends IType {

    id: IId;
    description: IStringBox;
    readonly properties: IProperty[];

    newProperty<T>(
            id: IId, 
            options?: {
                    displayName?: IStringBox, 
                    type: IType<T>, 
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
