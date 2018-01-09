/**
 * @module Mythos API/Value/String
 * @internal
 */ /** */

import { ITranslatable, ITranslatableState } from '../language';
import { IBox, IValueType } from '../box';


// Renders a spinner
export interface IStringValueType extends IValueType<string>, ITranslatableState, ITranslatable<string> {

    multiline: boolean | number; // Determines if will be rendered as input text or textarea
    renderType: "plain" | "email" | "url" | "markdown" | "html" | "custom";
    mimeType?: string;
    pattern?: RegExp | string;
    minimumLength?: number;
    maximumLength?: number;
}

export interface IStringBox extends IBox<string> {

    readonly type: IStringValueType;
}

export type IStringValue = string | IStringBox;
