import {IApiResp} from "../../API.ts";
import {Object} from "./ObjectDiagramResp.ts";
import {ClassInvariant} from "./ClassInvariantResp.ts";

export interface ClassExtentResp extends IApiResp {
    objects: Object[];
    invariants: ClassInvariant[];
    // InvariantName: objectNames[]
    invBadObject: Record<string, string[]>;
}