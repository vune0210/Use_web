import {IApiResp} from "../../API.ts";

export interface CallstackResp extends IApiResp {
    callstack: string[];
}
