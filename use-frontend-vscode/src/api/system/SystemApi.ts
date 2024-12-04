import {Api} from "../API.ts";
import axios from "axios";
import {UndoRedoResp} from "./types/UndoRedoResp.ts";

class SystemApi extends Api {
    constructor() {
        super("");
    }

    async getUndoRedoAvailability(): Promise<UndoRedoResp> {
        return this.callApi<UndoRedoResp>(async () => {
            const res = await axios.get<UndoRedoResp>(
                this.path("/undo-redo/avail")
            );
            return res.data;
        });
    }

    async undo(): Promise<UndoRedoResp> {
        return this.callApi<UndoRedoResp>(async () => {
            const res = await axios.post<UndoRedoResp>(
                this.path("/undo")
            );
            return res.data;
        });
    }

    async redo(): Promise<UndoRedoResp> {
        return this.callApi<UndoRedoResp>(async () => {
            const res = await axios.post<UndoRedoResp>(
                this.path("/redo")
            );
            return res.data;
        });
    }
}

export const systemApi = new SystemApi();