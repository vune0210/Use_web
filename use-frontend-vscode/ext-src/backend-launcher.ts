import {ChildProcessWithoutNullStreams, spawn} from "child_process";
import path from "path";

type onMsg = (data: string) => any;
type onClose = (code: number | null) => any;

export class BackendLancher {
    child: ChildProcessWithoutNullStreams | null = null;

    constructor() {
    }

    start() {
        if (this.child != null) {
            return this._onError("USE OCL Backend already started");
        }
        const cwd = path.join(__dirname, "../../", "bin", "lib");
        const env = {
            USE_HOME: path.join(cwd, ".."),
        };

        // console.log("__dirname", cwd);
        this.child = spawn("java", ["-jar", "use-backend.jar", "-nogui"], {
            cwd,
            env: Object.assign(env, process.env),
            stdio: "pipe",
            windowsHide: true,
            windowsVerbatimArguments: true,
        });
        this.child.stdout.setEncoding("utf8");
        this.child.stderr.setEncoding("utf8");
        this.child.stdout.on("data", (data) => {
            console.log("stdout:", data);
            this._onStdout(data);
        });
        this.child.stderr.on("data", (data) => {
            console.log("stderr:", data);
            this._onStderr(data);
        });
        this.child.on("error", (data) => {
            console.log(`USE OCL backend failed to start ${data}`);
            this._onError(String(data));
        });
        this.child.on("close", (code) => {
            console.log(`USE OCL backend exited with code ${code}`);
            this._onClose(code);
        });
        return this.child;
    }

    send(data: any) {
        if (this.child != null) {
            this.child.stdin.write(data);
        }
    }

    onStdout(callback: onMsg) {
        this._onStdout = callback;
    }

    onStderr(callback: onMsg) {
        this._onStderr = callback;
    }

    onError(callback: onMsg) {
        this._onError = callback;
    }

    onClose(callback: onClose) {
        this._onClose = callback;
    }

    private _onStdout: onMsg = () => null;

    private _onStderr: onMsg = () => null;

    private _onError: onMsg = () => null;

    private _onClose: onClose = () => null;
}
