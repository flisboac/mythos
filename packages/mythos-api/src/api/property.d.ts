/**
 * @module mythos-api
 * @internal
 */ /** */

import { IModelType, IModelObject } from './modelObject';
import { IType, INamedProjectComponent, IId } from './object';
import { IStringBox, IBox, IValueType } from './value/index';
import { ITranslatableState, ITranslatable } from './language';
import { ITrait } from './trait';


export interface IPropertyType<
    RawType
> extends IType {

    id: IId;
    displayName: IStringBox;
    valueType: IValueType<RawType>;
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
