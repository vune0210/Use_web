import axios from "axios";
import {Api, IApiResp} from "../API";
import {CreateObjectGetClassListResp, ObjectPropertyResp} from "./types";
import {OclEvalResp} from "../view/types/OclEvalResp";

class StateApi extends Api {
    constructor() {
        super("/state");
    }

    // CREATE OBJECT
    async getClassList(): Promise<CreateObjectGetClassListResp> {
        return this.callApi<CreateObjectGetClassListResp>(async () => {
            const res = await axios.get<CreateObjectGetClassListResp>(
                this.path("/create-object")
            );
            return res.data;
        });
    }

    async createObject(className: string, objectName: string): Promise<IApiResp> {
        return this.callApi<IApiResp>(async () => {
            const res = await axios.post<IApiResp>(this.path("/create-object"), {
                className,
                objectName,
            });
            return res.data;
        });
    }

    // OBJECT PROPERTY
    async getObjectState(objName: string): Promise<ObjectPropertyResp> {
        return this.callApi<ObjectPropertyResp>(async () => {
            const res = await axios.get<ObjectPropertyResp>(
                this.path("/object-property"),
                {
                    params: {objName},
                }
            );
            return res.data;
        });
    }

    async updateObject(objName: string, values: string[]): Promise<IApiResp> {
        return this.callApi<IApiResp>(async () => {
            const res = await axios.post<IApiResp>(
                this.path("/object-property"),
                {values},
                {
                    params: {objName},
                }
            );
            return res.data;
        });
    }

    // RESET
    async resetState(): Promise<IApiResp> {
        return this.callApi<IApiResp>(async () => {
            const res = await axios.post<IApiResp>(this.path("/reset"));
            return res.data;
        });
    }

    // EVALUATE OCL EXPRESSION
    async evalOclExpr(expr: string): Promise<OclEvalResp> {
        return this.callApi<OclEvalResp>(async () => {
            const res = await axios.post<OclEvalResp>(this.path("/ocl-eval"), {
                expr,
            });
            return res.data;
        });
    }

    // CHECK STRUCTURE
    async checkStructure(): Promise<IApiResp> {
        return this.callApi<IApiResp>(async () => {
            const res = await axios.get<IApiResp>(this.path("/check-structure"));
            return res.data;
        });
    }

    // DETERMINE STATE
    async determineState(): Promise<IApiResp> {
        return this.callApi<IApiResp>(async () => {
            const res = await axios.get<IApiResp>(this.path("/determine-state"));
            return res.data;
        });
    }

    // CHECK STATE INVARIANTS
    async checkStateInvariants(): Promise<IApiResp> {
        return this.callApi<IApiResp>(async () => {
            const res = await axios.get<IApiResp>(
                this.path("/check-state-invariants")
            );
            return res.data;
        });
    }
}

export const stateApi = new StateApi();
