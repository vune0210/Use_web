import {IApiResp} from "../../API";

export interface ClassDiagramResp extends IApiResp {
    classList: Class[];
    enumList: Enum[];
    signalList: Signal[];
    generalizationList: Generalization[];
    assocList: Association[];
}

export interface Class {
    className: string;
    fAttrValues: string[]; // propertyName : Type
    fOprSignatures: string[]; // operation(...args: Types[]) : ReturnType
}

export interface Enum {
    className: string;
    fLiterals: string[];
}

export interface Signal {
    attributeValues: string[];
}

export interface Generalization {
    parentClass: string;
    childClass: string;
}

export interface Association {
    isAssociationClass: boolean;
    aggregationKind: AssocEndKind;
    associatedClasses: string[];

    associationEnds: AssocEnd[];

    associationName: string;
    subsets: string[];
    subsettedBy: string[];
    redefined: string[];
    redefinedBy: string[];

    /**
     *  @deprecated
     */
    sourceClass: string;
    /**
     *  @deprecated
     */
    targetClass: string;
    /**
     *  @deprecated
     */
    sourceEnd: AssocEnd;
    /**
     *  @deprecated
     */
    targetEnd: AssocEnd;
    /**
     *  @deprecated
     */
    associationClass: string;
}

export interface AssocEnd {
    className: string;
    rolename: string;
    mult: string;
    kind: AssocEndKind;
    isDerived: boolean;
    ordered: boolean;
    union: boolean;
    redefines: string[];
    subsets: string[];
    qualifiers: string[];
}

export enum AssocEndKind {
    NONE,
    AGGREGATION,
    COMPOSITION,
}
