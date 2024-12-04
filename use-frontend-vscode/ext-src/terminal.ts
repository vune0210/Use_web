import * as vscode from "vscode";
import {BackendLancher} from "./backend-launcher";

export function runServerCommand() {
    const writeEmitter = new vscode.EventEmitter<string>();
    const sv = new BackendLancher();

    let line = "";
    const pty: vscode.Pseudoterminal = {
        onDidWrite: writeEmitter.event,
        open: () => {
            writeEmitter.fire(
                "\x1b[32mStarting USE OCL backend.\x1b[35m.\x1b[36m.\x1b[0m\n\r"
            ); // green pink dark-blue
            console.log("Starting USE OCL backend...");
            sv.start();
        },
        close: () => {
            /* noop*/
        },
        handleInput: (data: string) => {
            sv.send(data);
            if (data === "\r") {
                // Enter
                line = "";
                writeEmitter.fire(`\r\n`);
                return;
            }
            if (data === "\x7f") {
                // Backspace
                if (line.length === 0) {
                    return;
                }
                line = line.substr(0, line.length - 1);
                // Move cursor backward
                writeEmitter.fire("\x1b[D");
                // Delete character
                writeEmitter.fire("\x1b[P");
                return;
            }
            line += data;
            writeEmitter.fire(`\x1b[33m${data}\x1b[0m`); // yellow
        },
    };
    sv.onStdout((s) => writeEmitter.fire(s));
    sv.onStderr((s) => writeEmitter.fire(`\x1b[35m${s}\x1b[0m`)); // pink
    sv.onError((s) => writeEmitter.fire(`\x1b[31m${s}\x1b[0m`)); // red
    sv.onClose((code) =>
        writeEmitter.fire(`\x1b[36mUSE OCL backend exited with code ${code}\x1b[0m`)
    ); // light blue
    const terminal = vscode.window.createTerminal({
        name: `USE OCL console`,
        pty,
    });
    terminal.show();
}
