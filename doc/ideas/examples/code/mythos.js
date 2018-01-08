
if (typeof Error !== "undefined") {
    export class AssertionError extends Error {}
} else {
    export class AssertionError {
        constructor(message) {
            this.message = message;
        }
    }
}

function _assert(condition, message) {
    if (!condition) throw new AssertionError(message || "Assertion failed");
}

export class Value {

    constructor(options) {
        options = options || {};
        this.value = options.value;
    }
    
    get type() { return this.constructor; }
}

// TODO All of the types below
// Basic
export class BooleanValue extends Value {} // renders as a checkbox
export class NumberValue extends Value {} // renders as a spinner
export class IntegerValue extends Value {} // Same as number, but with special validation (e.g. truncate value)
export class NumberRangeValue extends Value {}
export class IntegerRangeValue extends Value {}
export class StringValue extends Value {} // renders as a text input (single line)
export class TextValue extends Value {} // renders as a textarea

// Extended
export class ColorValue extends Value {}
export class EmailValue extends Value {}
export class FileValue extends Value {}
export class ImageValue extends Value {}
export class UrlValue extends Value {}
export class PasswordValue extends Value {}
export class MarkdownValue extends Value {} // renders as an editor backed up by markdown

// Project-dependent
export class CalendarDateValue extends Value {}
export class CalendarTimeValue extends Value {}
export class CalendarDateTimeValue extends Value {}
export class EntityReferenceValue extends Value {}
export class ConnectionValue extends Value {}


export class Property {

    constructor(options) {
        options = options || {};
        this._trait = options.trait || null;
        this._value = options.value || this.defaultValue;
        this._checkInvariants();
    }

    get type() { return this.constructor; }
    get valueType() { return this.type.valueType; }
    get entity() { return this._trait.entity; }
    get project() { return this.entity.project; }

    get id() { return this.type.id; }
    get name() { return this.type.displayName; }
    get defaultValue() { return this.type.defaultValue; }
    get trait() { return this.trait; }
    get value() { return this._value; }
    set value(v) { this.assign(v); return this._value; }

    assign(value) {
        this._value = this.project.newValue(value, this.valueType);
        return this;
    }

    clear() {
        this._value = this.defaultValue;
        return this;
    }

    _checkInvariants() {
        _assert(this._trait != null);
    }
}

export class Trait {

    constructor(options) {
        options = options || {};
        this.entity = options.entity || null;
    }

    get type() { return this.constructor; }
    get project() { return this.entity.project; }
    get baseEntity() { return this.entity.base; }
    get propertyTypes() { return this.type.properties; }

    propertyType(name) { return this.propertyTypes.find(t => t.id == name); }
    property(name, value) {
        let property = this[name];
        if (!property) {
            let propertyType = this.propertyType(name);
            this[name] = property = new propertyType({trait: this});
        }
        if (typeof(value) !== 'undefined') property.assign(value);
        return property;
    }
    propertyValue(name, value) {
        return this.property(name, value).value;
    }
}

export class Object {

    constructor(options) {
        options = options || {};
        this.project = options.project || null;
        this.name = options.name || null;
        this.uuid = options.uuid || null;
        this.id = options.id || null; // TODO conversion of name to id
        this.base = options.base || null;
        this.traits = options.traits || {};
    }

    get type() { return this.constructor; }
    get traitTypes() { return this.type.traits; }
}

export class Entity extends Object {

}

export class Connection extends Object {

    static ARITY = {
        ONE = Symbol("Connection.ARITY.ONE"), // 1
        MANY = Symbol("Connection.ARITY.MANY"), // 1..n
        MAYBE = Symbol("Connection.ARITY.MAYBE"), // 0..1
        MAYBE_MANY = Symbol("Connection.ARITY.MAYBE_MANY") // 0..1
    }

    constructor(options) {
        options = options || {};
        super(options);
        this.from = options.from || null;
        this.to = options.to || null;
    }
}

export class Project {

    constructor() {
        this.name = null;
        this.brief = null;
        this.version = null;
        this._dependencies = [];

        // types
        this._traits = [];
        this._entityTypes = [];
        this._connectionTypes = [];

        // instances
        this._entities = [];
        this._connections = [];
    }

    get dependencies() { return this._dependencies; }

    get valueTypes() { return defaultValueTypes; }
    get traits() { return this._traits; }
    get entities() { return this._entities; }
}
