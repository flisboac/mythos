/**
 * @module Mythos API/Connection
 * @internal
 */ /** */

import { IModelType, IModelObject } from './modelObject';
import { IId } from './object';
import { IBox } from './box';
import { IEntity } from './entity';


export interface IConnectionType extends IModelType {

    id: IId;
    reverseId?: IId;
    arity: "one" | "many" | number;
    uniqueness: "origin" | "pair" | "none";
    
    readonly bidirectional: boolean;
}

export interface IConnection extends IModelObject {

    readonly type: IConnectionType;
    readonly from: IEntity;
    readonly to: IEntity[];
    
    connect(to: IEntity | IEntity[]): void;
}

export interface IConnectionBox<T extends IConnection = IConnection> extends IBox<T> {}
