import {IApiResp} from "../../API";

export interface EvalNode {
    children: EvalNode[];
    expr: string;
    result: string;
    exprAndValue: string;
}

export interface OclEvalResp extends IApiResp {
    evalResult: string;
    evalOutput: string;
    evalBrowser: EvalNode;
}
