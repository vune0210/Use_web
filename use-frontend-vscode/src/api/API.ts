import axios, {AxiosError} from "axios";

export class Api {
    static HOST = "http://localhost:8080";

    constructor(private apiPath: string) {
    }

    path(subPath: string) {
        if (this.apiPath[0] !== "/" && this.apiPath[0] !== "\\") {
            this.apiPath = "/" + this.apiPath;
        }
        if (this.apiPath.length === 1) this.apiPath = "";
        if (subPath[0] !== "/" && subPath[0] !== "\\") {
            subPath = "/" + subPath;
        }
        if (subPath.length === 1) subPath = "";
        return `${Api.HOST}${this.apiPath}${subPath}`;
    }

    async callApi<T>(callback: () => Promise<T>) {
        try {
            return callback();
        } catch (e) {
            if (axios.isAxiosError(e)) {
                throw new ApiError(e);
            } else {
                throw e;
            }
        }
    }
}

export interface IApiResp {
    success: false;
    message: string | null;
}

class ApiError extends Error {
    constructor(e: AxiosError) {
        if (e.response) {
            const res = e.response.data as IApiResp;
            super(res.message ?? e.message);
        } else {
            super(e.message);
        }
    }
}
