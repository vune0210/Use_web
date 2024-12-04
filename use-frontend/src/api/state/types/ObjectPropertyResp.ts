import {IApiResp} from "../../API";

export interface ObjectPropertyResp extends IApiResp {
    object: ObjectState;
}

export interface ObjectState {
    fValues: string[]; // value.toString()
    fAttributes: string[]; // attr: Type
}
