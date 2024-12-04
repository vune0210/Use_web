import {IApiResp} from "../..";

export interface CountResp extends IApiResp {
    countMap: Record<string, number>;
}
