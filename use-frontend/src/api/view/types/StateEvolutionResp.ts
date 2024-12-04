import {IApiResp} from "../../API.ts";

export interface StateEvolutionResp extends IApiResp {
    "objectCount": number,
    "linkCount": number
}