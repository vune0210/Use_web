import * as path from "path";
import * as vscode from "vscode";
import {getNonce} from "./util.js";
import {State} from "./state.js";

/**
 * Manages react webview panels
 */
export class ReactPanel {
    /**
     * Track the currently panel. Only allow a single panel to exist at a time.
     */
    public static currentPanel: ReactPanel | undefined;

    private static readonly viewType = "useocl-panel";
    public state: State = new State();
    private readonly _panel: vscode.WebviewPanel;
    private readonly _extensionPath: string;
    private _disposables: vscode.Disposable[] = [];

    private constructor(extensionPath: string, column: vscode.ViewColumn) {
        this._extensionPath = extensionPath;

        // Create and show a new webview panel
        this._panel = vscode.window.createWebviewPanel(
            ReactPanel.viewType,
            "USE GUI",
            column,
            {
                // Enable javascript in the webview
                enableScripts: true,

                // And restric the webview to only loading content from our extension's `media` directory.
                localResourceRoots: [
                    vscode.Uri.file(path.join(this._extensionPath, "dist")),
                ],
            }
        );

        // Set the webview's initial html content
        this._panel.webview.html = this._getHtmlForWebview();

        // Listen for when the panel is disposed
        // This happens when the user closes the panel or when the panel is closed programatically
        this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

        // initial activeColorTheme
        this._panel.webview.postMessage({
            command: "activeColorTheme",
            activeColorThemeKind: vscode.window.activeColorTheme.kind,
        });

        // activeColorTheme changed
        vscode.window.onDidChangeActiveColorTheme((e) => {
            this._panel.webview.postMessage({
                command: "activeColorTheme",
                activeColorThemeKind: e.kind,
            });
        });

        // Handle messages from the webview
        this._panel.webview.onDidReceiveMessage(
            (message) => {
                switch (message.command) {
                    case "set":
                        this.state[message.name as keyof State] = message.data;
                        break;
                    case "alert":
                        vscode.window.showErrorMessage(message.text);
                        break;
                }
            },
            null,
            this._disposables
        );
    }

    public static createOrShow(extensionPath: string) {
        const column = vscode.window.activeTextEditor
            ? vscode.window.activeTextEditor.viewColumn
            : undefined;

        // If we already have a panel, show it.
        // Otherwise, create a new panel.
        if (ReactPanel.currentPanel) {
            ReactPanel.currentPanel._panel.reveal(column);
        } else {
            ReactPanel.currentPanel = new ReactPanel(
                extensionPath,
                column || vscode.ViewColumn.One
            );
        }
    }

    public openSpec() {
        this._panel.webview.postMessage({command: "open"});
    }

    public viewClassDiagram() {
        this._panel.webview.postMessage({command: "view-clsdia"});
    }

    public viewObjectDiagram() {
        this._panel.webview.postMessage({command: "view-objdia"});
    }

    public viewObjectCount() {
        this._panel.webview.postMessage({command: "view-objcnt"});
    }

    public viewLinkCount() {
        this._panel.webview.postMessage({command: "view-lnkcnt"});
    }

    public dispose() {
        ReactPanel.currentPanel = undefined;

        // Clean up our resources
        this._panel.dispose();

        while (this._disposables.length) {
            const x = this._disposables.pop();
            if (x) {
                x.dispose();
            }
        }
    }

    private _getHtmlForWebview() {
        const manifest = require(path.join(
            this._extensionPath,
            "dist",
            ".vite",
            "manifest.json"
        ));
        const mainScript = manifest["index.html"]["file"];
        const mainStyle = manifest["style.css"]["file"];

        const scriptUri = this._panel.webview.asWebviewUri(
            vscode.Uri.file(path.join(this._extensionPath, "dist", mainScript))
        );
        const styleUri = this._panel.webview.asWebviewUri(
            vscode.Uri.file(path.join(this._extensionPath, "dist", mainStyle))
        );

        // Use a nonce to whitelist which scripts can be run
        const nonce = getNonce();

        // <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src vscode-resource: https:; script-src 'nonce-${nonce}';style-src vscode-resource: 'unsafe-inline' http: https: data:;">

        return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>USE OCL - Web Client</title>
        <script type="module" nonce="${nonce}" crossorigin src="${scriptUri}"></script>
        <link rel="stylesheet" crossorigin href="${styleUri}">
      </head>
      <body>
        <div id="root"></div>
      </body>
    </html>`;
    }
}
