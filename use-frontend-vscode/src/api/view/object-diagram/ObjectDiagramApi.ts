import axios from "axios";
import {Api} from "../../API";
import {ObjectDiagramResp} from "../types/ObjectDiagramResp";

class ClassDiagramApi extends Api {
    constructor() {
        super("/view/object-diagram");
    }

    async get(): Promise<ObjectDiagramResp> {
        return this.callApi<ObjectDiagramResp>(async () => {
            const res = await axios.get<ObjectDiagramResp>(this.path("/"));
            return res.data;
        });
    }
}

export const objectDiagramApi = new ClassDiagramApi();
