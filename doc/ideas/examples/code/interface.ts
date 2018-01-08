
//
// CONCEPTS
//


export interface IProjectComponent { readonly project?: IProject; }
export interface INameIdentifiable extends IProjectComponent { readonly id?: Id; }
export interface IUuidIdentifiable extends IProjectComponent { readonly uuid: string; }

export interface IIterator<T> { next(): IIteratorResult<T>; }
export interface IIterable<T> { [Symbol.iterator]: IIterator<T>; }
export interface IIteratorResult<T> {
    done: boolean;
    value: T;
}

export interface ILanguageAware<ThisType> {

    readonly language: LanguageName;
    readonly supportsNewLanguages: boolean;
    readonly supportedLanguages: LanguageName[];

    switchLanguageTo(langName: LanguageName): ThisType;
    hasLanguageSupportFor(langName: LanguageName): boolean;
}


//
// SINGLE-INHERITANCE INTERFACES: Model support
//


export type Id = string;
export type LanguageName = string;
export interface IObject {}
export interface IType extends IObject, INameIdentifiable { readonly id: Id; }

export interface IModelType extends IType {

    readonly displayName: IStringBox;
}

export interface IValueType<
    RawType,
    InstanceType extends IBox<RawType> = IBox<RawType>
> extends IType {}

export interface IBoxLike<RawType> extends IObject, ILanguageAware<IBoxLike<RawType>> {

    readonly empty: boolean;
    readonly value: RawType | null | undefined;

    switchLanguageTo(langName: LanguageName): IBox<RawType>;
}

export interface IBoxView<RawType> extends IBoxLike<RawType> {

    readonly type: IValueType<RawType>;
}

export interface IBox<RawType> extends IBoxLike<RawType> {

    readonly type: IValueType<RawType>;
    value: RawType | null | undefined;

    clear(): void;
}

type IStringBox = IBox<string>;

export interface IPropertyType<
    RawType,
    InstanceType extends IProperty<RawType> = IProperty<RawType>
> extends IModelType {

    readonly displayName: IStringBox;
    readonly valueType: IValueType<RawType>;
    readonly defaultValue: IBox<RawType> | undefined;
}

export interface IPropertyLike<
    RawType = any
> extends IObject, INameIdentifiable, ILanguageAware<IPropertyLike<RawType>> {

    readonly id: Id; // must be semantically equivalent to `this.type.id`
    readonly type: IPropertyType<RawType>;
    readonly trait: ITrait;
    readonly ownValue: boolean; // false if value comes from a default (e.g. property-default, a parent property)
    readonly value: RawType | null | undefined;
}

export interface IPropertyView<
    RawType = any
> extends IPropertyLike<RawType> {

    switchLanguageTo(langName: LanguageName): IPropertyView<RawType>;
}

export interface IProperty<
    RawType = any
> extends IPropertyLike<RawType> {

    switchLanguageTo(langName: LanguageName): IProperty<RawType>;
    clear(): void;
    assignDefaults(): void;
}

export interface ITraitLike extends IObject, INameIdentifiable {

    readonly id: Id; // mandatory
    readonly owner: IModelObject;
    readonly size: number;
}

export interface ITraitView extends ITraitLike, IIterable<IPropertyView<any>> {

    property<RawType>(propertyId: Id | Function, value?: RawType): IPropertyView<RawType>;
}

export interface ITrait extends ITraitLike, IIterable<IProperty<any>> {

    readonly id: Id; // mandatory
    readonly owner: IModelObject;
    readonly displayName: IStringBox;
    readonly size: number;

    property<RawType>(propertyId: Id | Function, value?: RawType): IProperty<RawType>;
    clear(): void;
    assignDefaults(): void;
}


//
// SINGLE-INHERITANCE INTERFACES: Model
//



export interface IModelObject 
extends IObject, INameIdentifiable, IUuidIdentifiable, IIterable<ITrait> {

    readonly type: IModelType;
}

export interface IEntityType extends IModelType {}

export interface IEntity extends IModelObject {

    readonly type: IEntityType;
    readonly base?: IEntity;

    rebase(entity: IEntity): void;
    clear(): void;
    clearBase(): void;
    clearTraits(): void;
}

declare enum ConnectionArity {

    ONE, // 1
    MANY, // 1..n
    MAYBE_ONE, // 0..1
    MAYBE_MANY // 0..n
}

declare enum ConnectionUniqueness {

    SINGLE,      // `from` is unique for specific `id` (disregards `to`)
    SINGLE_SET,  // `from->to[]` is unique for specific `id`. Interpretation changes according to `arity`.
    NON_UNIQUE   // Connection may be repeated as many times as needed.
}

export interface IConnectionType extends IModelType {

    readonly arity: ConnectionArity;
    readonly uniqueness: ConnectionUniqueness;
}

export interface IConnection extends IModelObject {

    readonly type: IConnectionType;
    readonly from: IEntity;
    readonly to: IEntity[];
    
    connect(to: IEntity | IEntity[]): void;
}


// null id, null UUID (as in all-zeroes)
declare var nullEntity : IEntity;
declare var nullConnection : IConnection;


//
// SINGLE-INHERITANCE INTERFACES: Project management
//


export interface IProject extends IObject {}

export interface IWorkspace {}
