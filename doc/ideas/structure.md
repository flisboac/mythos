
# Index


## Type system and library structure

TODO Revise all this stuff. Got new ideas.

The type system is based on single inheritance from a common class
called **Entity**. This class provides basic functions that will be used to
operate upon library objects, regardless of their purposes or logical type.

Optionally, types may also incorporate one or more **traits** -- that can then
be listed if the type has inherited from Entity. Traits are nothing more
than mixins that are given in JSON-schema format, with optional source code to
provide custom behaviour. This gives margin for some mistakes or senseless
mixins, but the real objective is to provide freedom for the user to mix and
match traits whenever needed, without depending on a strict constructor-based
type tree.

Library functionality is distributed in **bundles**. Packages are named and
versioned, and can be referenced or required by other bundles. Their main
reason of existence is to pack resources in a way that is logical and easy to
consume -- mainly, they'll provide traits and their logic. Package metadata is
declared in a subset of nodejs's `package.json` format, in a file named
`bundle.json` (optionally `package.json` if `bundle.json` is not found) in the
root of the bundle's folder. Item names in a bundle must be valid file and
folder names in all operating systems mythos is supposed to work on. Also, item
names must be valid Javascript identifiers, with the added restriction that only
ASCII characters must be used. This is set up to ensure maximum portability and
interoperability between mythos implementations in different languages and
environments.

Bundles may have **categories**. Categories unite items that share the same
motif or idea. Categories are realized as folders and optionally described
through JSON files with the same name and on the same level. Categories are
entities and are formalized by the core library. Naturally, categories may nest
but not repeat themselves in other category trees. If a category descriptor is
not provided, one may be implicitly imported if the folder's name equals the
name of a category descriptor's name in the core library. It is advised that
category names are given in plural. Three categories are provided by default:
- `entities`
- `resources`
- `traits`

Apart from the concept of the Entity class, each bundle may declare one or
more **entity instances**, that will be called just as *entities* from now on.
Entities are the realization of one or more traits. Their identifiers must be
unique among all entities, and they may optionally be nested or contained in a
category -- generally, categories refer to major traits, such as Actor, Scenery
or Item. As an example, these are the ways the entity described by the file
"examplePackage/entities/actors/john.json" can be referenced by.
+ Online URL: `http://example.com/example-bundle/entities/actors/john`
+ File URL: `file:///somefolder/example-bundle/entities/actors/john`
+ Absolute in the current workspace: `@example.com/example-bundle:/entities/actors/john`
+ Absolute in the current workspace (without scope): `example-bundle:/entities/actors/john`
+ Absolute in the current bundle: `~/entities/actors/john`
+ Relative in the current workspace (dependent on the path search order): `/entities/actors/john`
+ Relative in the current workspace and category (actually, folder): `actors/john`
+ Absolute in the current descriptor: `#/john`
It is assumed that:
+ Descriptors are given in `.json` files. The actual JSON format used depends on
  the type in question. In the future, we may consider using `.xml` files as
  well (but I personally find XML utterly convoluted; JSON is simple enough and
  properly meets the project's needs).
+ Source code is given in their normal extensions using the same name as the
  descriptor for which they complement. The usage may depend on the language,
  but in general, the source code will be executed and must return an object
  containing property names mapping to custom functions to be attached to the
  descriptor's instance.
As a side-note, once the bundle is loaded, URLs are not really needed. It's
preferrable to use URLs (if) only on dependency declarations.

Inter-bundle referencing is only possible if they have been loaded into the
same **workspace**. Inside workspaces entities and resources can be loaded,
and bundles and their content may refer each other. Referencing any item from
a bundle that's not loaded into its workspace will result in an error.
Workspace descriptors may be provided as a JSON file named `workspace.json`

A **resource** is anything that doesn't fit the aforementioned types, but must
be distributed together with the library. This includes images, sounds, music,
videos, texts, independent scripts (not related to any trait) and more.
Resources may be referenced by entities or traits.

## Bundle classification

Bundles may be *classified* depending on their purpose or utility. This
classification is merely a formalism, and therefore, is definitely not
mandatory.
- **Core bundles** are used to provide core classes, scripts, resources and
  traits to be used by a broad range of bundles. They provide the skeleton upon
  which other bundle classes will depend on. The core library provides a core
  bundle that other bundles, and the user may as well extend or provide its
  own. This may include a set of basic character classes, item classes, skills,
  abilities or anything that may potentially be generalized to more than one
  ambientation.
  
  Traits:
  + Organization
    + Category
    + Tag
    + Relation
    + Note
  + Action
    + Actor: Describes an entity that will act on sceneries and use items.
    + Scenery: Describes a location (that may be anything, e.g. time dimension, world, country, state) and its associated culture
    + Item: Describes an entity that is or represents something, and that may be used by an actor.
    + Event: Describes 
  + Place and Time
    + Timing: Describes a time unit and its multiples.
    + Geomapping: Describes a coordinate system and timezone subdivision.
    + Calendar: Describes the base for days and their multiples (months, etc), as well as how to format timestamps.
    + Coordinate: Realization of a coordinate in a mapping.
    + Timestamp: Realization date and time together.
    + Date: Realization of a date in a calendar
    + Time: Realization of a time in a timing and timezone.
    
  Entities:
  + categories
  + timings
  + calendars
  
- **Ambientation bundles** are used to declare common elements in campaigns or
  stories. Such ambientation elements may include things like character classes,
  timelines, heroes and villains, items, previous events or anything suitable
  to be reutilized by other bundles.
  
  Traits:
  + Locale
    + Currency: Describes a monetary currency and how to format it.
    + Dialect: Describes a language or dialect.
    + District: Describes a political division of land or space.
    + Belief: Describes a system of beliefs (e.g. religion).
    + Culture: Realization of a culture consisting of district, calendar, currency, dialect and beliefs.
  
  Entities:
  + actors
  + items
  + sceneries
  + items
  + timings
  + calendars
  + events
  + tags
  + relations
  
- **Ruleset bundles** are those that declare rules for a game in any medium or
  format. These may be, for example, rules for RP games, or for video games.
  The intention is to formalize these rules, and optionally, provide code to
  actually put these rules into action. Rulesets naturally extends core
  bundles, or may also be merged with them, all depending on how the developer
  intends to organize and/or distribute his work.
  
  Entities:
  + Rule
  + Ruleset
  
  Still need to think more about ruleset bundles...
  
- **Campaign bundles** are bundles uniting ruleset and ambientation
  together. Campaign bundles also provide plots for the user to follow or
  simulate, or may also provide new elements not included on ambientation such
  as heroes and villains.
  
  Traits:
  + Plot
  + PlotEvent
  + PlotInstance
  
- **Storytelling bundles** are bundles used to tell stories, regardless of the
  medium. They are naturally extended by ambientation bundles, and generally
  declares elements such as scenes, events and chapters.
  
  Traits:
  + Chapter



## Some random ideas

For the type system and project organization:

- Entities have Traits, that act as components in a component-based design
- Each entity type has its own page or form in the app, that may be styled differently depending on the platform
- Each trait type MAY have its own web-component section (most of the time, a form) in the app
- Each property in a trait has its own web-widget (most of the time, a pair of label and web-control)
- Each value type has its own web-control (e.g. text input for strings, datepickers for dates)
- Entities can inherit from ONE other entity. The derived entity will have all of its parents' traits, transitively
- Traits can inherit from ONE other entity. The derived trait will have all of its parents' properties, transitively
- An entity may have one or more instances, each one with their unique ID in the project
- An entity instance may be based on another one; in such a case, the base instance is called a "meta-instance"
- If a property is unchanged in a derived instance, the value of that property will be that of its meta-instance
- Entities, traits and instances are grouped in projects
- When a project is used as a dependency of another, it's called a "bundle"
- Each project in the workspace will have its own grouping menu in the navigation sidebar
- Each entity type will have its own sub-item in its bundle

