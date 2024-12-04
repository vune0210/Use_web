import {IApiResp} from "../../API.ts";

export interface PluginListResp extends IApiResp {
    pluginNames: string[];
}