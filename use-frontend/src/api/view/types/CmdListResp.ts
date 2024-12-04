import {IApiResp} from "../../API.ts";

export interface CmdListResp extends IApiResp {
    commandList: string[];
}
