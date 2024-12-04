import {AssocEnd} from "../../api";
import {PositionElement} from "../../components/diagrams/Element";

export interface ClassElement extends PositionElement {
    className: string;
    attributes: string[];
    operations: string[];
}

export interface EnumElement extends PositionElement {
    className: string;
    literals: string[];
}

export interface AssocElement extends Element {
    source: AssocEnd;
    target: AssocEnd;
    label?: string;
    leftSideLabel?: string;
    rightSideLabel?: string;
}

export interface GenerationElement extends Element {
    parentClass: string;
    childClass: string;
}
