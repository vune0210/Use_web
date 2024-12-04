import {IApiResp} from "../../API.ts";
import {ClassInvariant} from "./ClassInvariantResp.ts";
import {Link} from "./ObjectDiagramResp.ts";

enum EventContext {
    NORMAL_EXECUTION = "NORMAL_EXECUTION",
    UNDO = "UNDO",
    REDO = "REDO"
}

export interface BaseEvent {
    context: EventContext;
    type: string;
}

export interface AttributeAssignedEvent extends BaseEvent {
    objectName: string;
    attributeName: string;
    value: string;
    type: "AttributeAssignedEvent";
}

export enum InvariantStateChange {
    ACTIVATED = "ACTIVATED",
    DEACTIVATED = "DEACTIVATED",
    NEGATED = "NEGATED",
    DENEGATED = "DENEGATED",
}

export interface ClassInvariantChangedEvent extends BaseEvent {
    change: InvariantStateChange;
    invariant: ClassInvariant;
    type: "ClassInvariantChangedEvent";
}

export interface LinkDeletedEvent extends BaseEvent {
    link: Link;
    type: "LinkDeletedEvent";
}

export interface LinkInsertedEvent extends BaseEvent {
    link: Link;
    type: "LinkInsertedEvent";
}

export interface ObjectCreatedEvent extends BaseEvent {
    createdObjectName: string;
    type: "ObjectCreatedEvent";
}

export interface ObjectDestroyedEvent extends BaseEvent {
    destroyedObjectName: string;
    type: "ObjectDestroyedEvent";
}

export interface OperationEnteredEvent extends BaseEvent {
    operationCallString: string;
    type: "OperationEnteredEvent";
    enteredSuccessfully: boolean;
}

export interface OperationExitedEvent extends BaseEvent {
    operationCallString: string;
    type: "OperationExitedEvent";
}

export type Event = AttributeAssignedEvent | ClassInvariantChangedEvent
    | LinkDeletedEvent | LinkInsertedEvent | ObjectCreatedEvent | ObjectDestroyedEvent | OperationEnteredEvent
    | OperationExitedEvent;

export interface EventResp extends IApiResp {
    events: Event[];
}