
if (typeof Error !== "undefined") {
    class Error {
        message : string;
    
        constructor(message : string) {
            this.message = message;
        }
    }
}

class AssertionError extends Error {}

export function assert(condition : boolean, message? : string) {
    if (!condition) throw new AssertionError(message || "Assertion failed");
}

type Type<InstanceType> = Function & {
    id: string;
}

type ValueType<T> = Type<Value<T>> & {
    new(arg: T): Value<T>,
    wrap(val: T | ValueType<T>): ValueType<T>
};

export class Value<T> {

    _value? : T;

    constructor(value: T) {
        this._value = value;
    }
    
    get type() : ValueType<T> { return this.constructor as ValueType<T>; }
    get raw() { return this._value; } 
}

export function wrapValue<T>(value: T | Value<T>, valueType: ValueType<T>) {
    if (value instanceof Value) return value;
    return new valueType(value);
}

export var defaultValueTypes: Value<any>[] = [];

type PropertyType<T> = Type<Property<T>> & {
    new(trait: Trait, options?: {}),
    displayName: string,
    defaultValue: Value<T>,
    valueType: ValueType<T>,
    defaultValueOptions: any
};

export class Property<T> {

    protected _trait : Trait;
    protected _value : Value<T>;

    constructor(trait, options?: {value?: T | Value<T>}) {
        options = options || {};
        this._trait = trait || null;
        this._value = this.valueType.wrap(options.value || this.type.defaultValue);
    }

    get type() : PropertyType<T> { return this.constructor as PropertyType<T>; }
    get valueType() { return this.type.valueType; }
    get object() { return this._trait.object; }
    get project() { return this.object.project; }

    get id() { return this.type.id; }
    get name() { return this.type.displayName; }
    get trait() { return this._trait; }
    get value() { return this._value; }
    set value(v) { this.assign(v); }

    assign(value) {
        this._value = value; //this.project.newValue(value, this.valueType);
        return this;
    }

    clear() {
        this._value = this.type.defaultValue;
        return this;
    }
}

type TraitType = Type<Trait> & {
    properties: PropertyType<any>[]
};

export class Trait {

    protected _object : Object;

    constructor(options) {
        options = options || {};
        this._object = options.entity || null;
    }

    get type() : TraitType { return this.constructor as TraitType; }
    get project() { return this._object.project; }
    get propertyTypes() { return this.type.properties; }
    get object() { return this._object; }

    propertyType(name) { return this.propertyTypes.find(t => t.id == name); }
    property(name, value) : Property<any> {
        let property = this[name];
        if (!property) {
            let propertyType: Property<any> | any = this.propertyType(name);
            this[name] = property = new propertyType(this);
        }
        if (typeof(value) !== 'undefined') property.assign(value);
        return property;
    }
    propertyValue(name, value) : any {
        return this.property(name, value).value;
    }
}

type ObjectType<InstanceType extends Object> = Type<Object> & {
    traits: TraitType[]
};

export abstract class Object {

    protected _project : Project;
    protected _uuid : string;
    protected _id? : string;
    protected _name? : string;
    protected _traits : Trait[];

    constructor(
        project: Project,
        uuid: string, 
        options?: {id?: string, name?: string}
    ) {
        options = options || {};
        this._project = project;
        this._uuid = uuid;
        this._name = options.name || null;
        this._id = options.id || null; // TODO conversion of name to id
        this._traits = [];
    }

    get type() : ObjectType<Object> { return this.constructor as ObjectType<Object>; }
    get project() { return this._project; }
    get uuid() { return this._uuid; }
    get name() { return this._name; }
    get traits() { return this._traits; }
    get traitTypes() { return this.type.traits; }
}

type EntityType = ObjectType<Entity>;

export class Entity extends Object {

    protected _base? : Object;

    constructor(
        project: Project,
        uuid: string,
        options?: {id?: string, name?: string, base?: Entity}
    ) {
        super(project, uuid, options);
        options = options || {};
        this._base = options.base || null;
    }

    get type() : EntityType { return this.constructor as EntityType; }
}

type ConnectionType = ObjectType<Connection> & {
    backwardId? : string;
};

export class Connection extends Object {

    protected _from : Entity;
    protected _to : Entity;

    constructor(
        project: Project,
        uuid: string,
        from: Entity,
        to: Entity,
        options?: {id?: string, name?: string}
    ) {
        super(project, uuid, options);
        options = options || {};
        this._from = from;
        this._to = to;
    }

    get type() : ConnectionType { return this.constructor as ConnectionType; }
    get from() { return this._from; }
    get to() { return this._to; }
    get bidirectional() { return }
}

type ProjectType = Type<Project> & {};

export class Project {

    private _name: string;
    private _brief: string;
    private _version: string;
    private _dependencies: Project[];

    private _traits: Trait[];
    private _entityTypes: EntityType[];
    private _connectionTypes: ConnectionType[];

    private _entities: Entity[];
    private _connections: Connection[];

    constructor() {
        this._name = null;
        this._brief = null;
        this._version = null;
        this._dependencies = [];

        // types
        this._traits = [];
        this._entityTypes = [];
        this._connectionTypes = [];

        // instances
        this._entities = [];
        this._connections = [];
    }

    get type() : ProjectType { return this.constructor as ProjectType; }
    get dependencies() { return this._dependencies; }

    get valueTypes() { return defaultValueTypes; }
    get traits() { return this._traits; }
    get entities() { return this._entities; }
}
