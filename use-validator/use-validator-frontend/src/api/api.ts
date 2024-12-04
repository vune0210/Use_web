import axios from "axios";
import {Api, IApiResp} from "../external"
import {SettingConfiguration} from "./SettingConfiguration.ts";

export class ModalValidatorApi extends Api {
    constructor() {
        super("/plugins/modal-validator");
    }

    async validate(setting: SettingConfiguration): Promise<IApiResp> {
        return this.callApi<IApiResp>(async () => {
            const formData = new FormData();
            formData.append("body", new Blob([JSON.stringify(setting)], {type: "application/json"}));

            const res = await axios.post<IApiResp>(this.path("/"), formData);
            return res.data;
        });
    }
}

export const modalValidatorApi = new ModalValidatorApi();

export {viewApi} from "../external.ts"