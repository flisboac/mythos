/**
 * @module mythos-api
 * @internal
 */ /** */

export type LanguageName = string;

export interface ILanguageAware {

    readonly language: LanguageName;
    readonly supportedLanguages: LanguageName[];

    /** Queries the object for explicit (as in pre-existent) support for the
     * language `languageName`.
     */
    hasLanguageSupportFor(langName: LanguageName): boolean;

    /** Returns `true` if the language-aware object can add support for language
     * `languageName` if it doesn't have support yet (e.g. add new 
     * translations for an entity being edited).
     */
    canSupportLanguage(langName: LanguageName): boolean;
}

export interface ITranslatable<TranslationType> extends ILanguageAware {

    // VIEW INTERFACE
    
    translate(langName: LanguageName): TranslationType;
}

export interface ITranslatableState extends ILanguageAware {

    // MUTABLE INTERFACE

    switchLanguageTo(langName: LanguageName): this;
}
