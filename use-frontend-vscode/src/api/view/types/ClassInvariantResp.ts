import {IApiResp} from "../../API";

export interface ClassInvariant {
    name: string;
    className: string;
}

export interface EvalResult {
    index: number;
    resultBool: boolean;
    message: string | null;
    duration: number;
}

export interface ClassInvariantResp extends IApiResp {
    evalResults: EvalResult[];
    classInvariants: ClassInvariant[];
}
