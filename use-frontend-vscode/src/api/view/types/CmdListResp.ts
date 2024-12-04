import {IApiResp} from "../../API";

export interface CmdListResp extends IApiResp {
    commandList: string[];
}
