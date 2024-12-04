import {AssocEnd} from "..";
import {IApiResp} from "../../API";

export interface ObjectDiagramResp extends IApiResp {
    linkedObjects: Object[];
    links: Link[];
}

export interface Object {
    fLabel: string;

    fName: string;
    fClassName: string;

    fValues: string[]; // attr=value
    fStateValues: string[];
}

export interface Link {
    fAssociationName: string;
    linkEnds: LinkEnd[];
    assocObjectLabel: string | null;
    isLinkObject: boolean;
    isVirtual: boolean;
}

export interface LinkEnd {
    fAssociationEnd: AssocEnd;

    fObjectName: string;
    fClassName: string;
    fLabel: string; // = fObjectName : fClassName

    qualifierValues: string[];
}
