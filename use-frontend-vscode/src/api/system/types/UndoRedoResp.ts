import {IApiResp} from "../../API.ts";

export interface UndoRedoResp extends IApiResp {
    undoEnabled: boolean;
    undoDescription?: string;
    redoEnabled: boolean;
    redoDescription?: string;
}