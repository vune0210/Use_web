import axios from "axios";
import {Api} from "../API";
import {ModalBrowserInfoResp, ModalBrowserResp} from "./ModalBrowserResp";

class ModalBrowserApi extends Api {
    constructor() {
        super("/modal-browser");
    }

    async get(): Promise<ModalBrowserResp> {
        return this.callApi<ModalBrowserResp>(async () => {
            const res = await axios.get<ModalBrowserResp>(this.path("/"));
            return res.data;
        });
    }

    async getInfo(type: string, name: string): Promise<ModalBrowserInfoResp> {
        return this.callApi<ModalBrowserInfoResp>(async () => {
            const res = await axios.get<ModalBrowserInfoResp>(this.path("/info"), {
                params: {
                    type,
                    name
                }
            });
            return res.data;
        });
    }
}

export const modalBrowserApi = new ModalBrowserApi();
