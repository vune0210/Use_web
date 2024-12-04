import {IApiResp} from "../../API";
import {Object} from "./ObjectDiagramResp";
import {ClassInvariant} from "./ClassInvariantResp";

export interface ClassExtentResp extends IApiResp {
    objects: Object[];
    invariants: ClassInvariant[];
    // InvariantName: objectNames[]
    invBadObject: Record<string, string[]>;
}