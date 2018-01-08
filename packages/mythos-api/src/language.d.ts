/**
 * @module Mythos API/Language
 * @internal
 */ /** */

export type ILanguageName = string;

export interface ILanguageAware {

    readonly language: ILanguageName;
    readonly supportedLanguages: ILanguageName[];

    /** Queries the object for explicit (as in pre-existent) support for the
     * language `languageName`.
     */
    hasLanguageSupportFor(langName: ILanguageName): boolean;

    /** Returns `true` if the language-aware object can add support for language
     * `languageName` if it doesn't have support yet (e.g. add new 
     * translations for an entity being edited).
     */
    canSupportLanguage(langName: ILanguageName): boolean;
}

export interface ITranslatable<TranslationType> extends ILanguageAware {

    // VIEW INTERFACE
    
    translate(langName: ILanguageName): TranslationType;
}

export interface ITranslatableState extends ILanguageAware {

    // MUTABLE INTERFACE

    switchLanguageTo(langName: ILanguageName): this;
}
