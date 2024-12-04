import axios from "axios";
import {Api} from "../../API";
import {ClassDiagramResp} from "../types/ClassDiagramResp";

class ClassDiagramApi extends Api {
    constructor() {
        super("/view/class-diagram");
    }

    async get(): Promise<ClassDiagramResp> {
        return this.callApi<ClassDiagramResp>(async () => {
            const res = await axios.get<ClassDiagramResp>(this.path("/"));
            return res.data;
        });
    }
}

export const classDiagramApi = new ClassDiagramApi();
