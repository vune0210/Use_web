import {IApiResp} from "../../API";

export interface CallstackResp extends IApiResp {
    callstack: string[];
}
