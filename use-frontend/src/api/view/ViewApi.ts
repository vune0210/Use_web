import axios from "axios";
import {Api} from "../API";
import {ClassDiagramResp, CountResp, ObjectDiagramResp} from "./types";
import {CmdListResp} from "./types/CmdListResp";
import {ClassInvariantResp} from "./types/ClassInvariantResp.ts";
import {StateEvolutionResp} from "./types/StateEvolutionResp.ts";
import {ClassExtentResp} from "./types/ClassExtentResp.ts";
import {CallstackResp} from "./types/CallstackResp.ts";
import {EventResp} from "./types/EventResp.ts";

class ViewApi extends Api {
    constructor() {
        super("/view");
    }

    async getClassDiagram(): Promise<ClassDiagramResp> {
        return this.callApi<ClassDiagramResp>(async () => {
            const res = await axios.get<ClassDiagramResp>(
                this.path("/class-diagram")
            );
            return res.data;
        });
    }

    async getObjectDiagram(): Promise<ObjectDiagramResp> {
        return this.callApi<ObjectDiagramResp>(async () => {
            const res = await axios.get<ObjectDiagramResp>(
                this.path("/object-diagram")
            );
            return res.data;
        });
    }

    async getEvents(): Promise<EventResp> {
        return this.callApi<EventResp>(async () => {
            const res = await axios.get<EventResp>(
                this.path("/seq-diagram")
            );
            return res.data;
        });
    }

    async getClassInvariant(): Promise<ClassInvariantResp> {
        return this.callApi<ClassInvariantResp>(async () => {
            const res = await axios.get<ClassInvariantResp>(
                this.path("/invariant")
            );
            return res.data;
        });
    }

    async getClassExtent(className: string): Promise<ClassExtentResp> {
        return this.callApi<ClassExtentResp>(async () => {
            const res = await axios.get<ClassExtentResp>(
                this.path("/class-extent"), {
                    params: {className}
                }
            );
            return res.data;
        });
    }

    async getStateEvolution(): Promise<StateEvolutionResp> {
        return this.callApi<StateEvolutionResp>(async () => {
            const res = await axios.get<StateEvolutionResp>(
                this.path("/state-evo")
            );
            return res.data;
        });
    }

    async getObjectCount(): Promise<CountResp> {
        return this.callApi<CountResp>(async () => {
            const res = await axios.get<CountResp>(this.path("/object-count"));
            return res.data;
        });
    }

    async getLinkCount(): Promise<CountResp> {
        return this.callApi<CountResp>(async () => {
            const res = await axios.get<CountResp>(this.path("/link-count"));
            return res.data;
        });
    }

    async getCallstack(): Promise<CallstackResp> {
        return this.callApi<CallstackResp>(async () => {
            const res = await axios.get<CallstackResp>(this.path("/callstack"));
            return res.data;
        });
    }

    async getCommandList(): Promise<CmdListResp> {
        return this.callApi<CmdListResp>(async () => {
            const res = await axios.get<CmdListResp>(this.path("/command-list"));
            return res.data;
        });
    }
}

export const viewApi = new ViewApi();
