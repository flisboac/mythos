/**
 * @module mythos
 * @internal
 */ /* */

import { IProject, IEnum, IEnumValues } from 'mythos-api'

export enum Enum { A = IEnumValues.A }

var x : IEnum = Enum.A;

export class Project implements IProject {

}
