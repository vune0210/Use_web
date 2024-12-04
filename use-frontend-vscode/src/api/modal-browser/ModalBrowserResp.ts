import {IApiResp} from "../API";

export interface ModalNode {
    name: string;
    children: ModalNode[];
}

export interface ModalBrowserResp extends IApiResp {
    top: ModalNode;
}

export interface ModalBrowserInfoResp extends IApiResp {
    info: string;
}

