
/**
 * @module Mythos API/Property
 * @internal
 */ /** */


import { IId } from './id';
import { IModelType, IModelObject } from './modelObject';
import { INamedProjectComponent } from './object';
import { IBox, IType } from './type';
import { IStringBox } from './value/string';
import { ITranslatableState, ITranslatable } from './language';
import { ITrait } from './trait';


export interface IPropertyType<
    RawType
> extends IType {

    id: IId;
    description: IStringBox;
    valueType: IType<RawType>;
    defaultValue: IBox<RawType> | undefined;
}

export interface IProperty<
    RawType = any
> extends
    INamedProjectComponent, 
    ITranslatableState,
    ITranslatable<IProperty<RawType>>
{
    readonly type: IPropertyType<RawType>;
    readonly id: IId; // must be semantically equivalent to `this.type.id`
    readonly ownValue: boolean; // false if value comes from a default (e.g. property-default, a parent property)
    value: RawType | null | undefined;

    clear(): void;
    assignDefaults(): void;
}
