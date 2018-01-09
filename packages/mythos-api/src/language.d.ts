/**
 * @module Mythos API/Language
 * @internal
 */ /** */

export type ILangName = string;

export interface ILanguageAware {

    readonly language: ILangName;
    readonly supportedLanguages: ILangName[];

    /** Queries the object for explicit (as in pre-existent) support for the
     * language `languageName`.
     */
    hasLanguageSupportFor(langName: ILangName): boolean;

    /** Returns `true` if the language-aware object can add support for language
     * `languageName` if it doesn't have support yet (e.g. add new 
     * translations for an entity being edited).
     */
    canSupportLanguage(langName: ILangName): boolean;
}

export interface ITranslatable<TranslationType> extends ILanguageAware {

    // VIEW INTERFACE
    
    translate(langName: ILangName): TranslationType;
}

export interface ITranslatableState extends ILanguageAware {

    // MUTABLE INTERFACE

    switchLanguageTo(langName: ILangName): this;
}
