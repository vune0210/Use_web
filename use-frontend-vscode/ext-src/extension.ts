import * as vscode from "vscode";
import {ReactPanel} from "./webview.js";
import {ModalBrowserProvider} from "./browser-treeview.js";
import {QuickAccessProvider} from "./quickaccess-treeview.js";
import {runServerCommand} from "./terminal.js";

export function activate(context: vscode.ExtensionContext) {
    // gui start
    context.subscriptions.push(
        vscode.commands.registerCommand("useocl-vscode.gui-start", () => {
            ReactPanel.createOrShow(context.extensionPath);
        })
    );

    // server start
    context.subscriptions.push(
        vscode.commands.registerCommand(
            "useocl-vscode.server-start",
            runServerCommand
        )
    );

    // modal browser
    const modalBrowserProvider = new ModalBrowserProvider();
    context.subscriptions.push(
        vscode.window.registerTreeDataProvider(
            "useocl-browser",
            modalBrowserProvider
        )
    );
    context.subscriptions.push(
        vscode.commands.registerCommand("useocl-vscode.browser-refresh", () =>
            modalBrowserProvider.refresh()
        )
    );

    // quick access
    const quickAccess = new QuickAccessProvider(modalBrowserProvider);
    context.subscriptions.push(
        vscode.window.registerTreeDataProvider("useocl-quick-access", quickAccess)
    );

    context.subscriptions.push(
        vscode.commands.registerCommand("useocl-vscode.open-spec", () => {
            ReactPanel.currentPanel?.openSpec();
        })
    );
    context.subscriptions.push(
        vscode.commands.registerCommand("useocl-vscode.view-clsdia", () => {
            ReactPanel.currentPanel?.viewClassDiagram();
        })
    );
    context.subscriptions.push(
        vscode.commands.registerCommand("useocl-vscode.view-objdia", () => {
            ReactPanel.currentPanel?.viewObjectDiagram();
        })
    );
    context.subscriptions.push(
        vscode.commands.registerCommand("useocl-vscode.view-objcnt", () => {
            ReactPanel.currentPanel?.viewObjectCount();
        })
    );
    context.subscriptions.push(
        vscode.commands.registerCommand("useocl-vscode.view-lnkcnt", () => {
            ReactPanel.currentPanel?.viewLinkCount();
        })
    );
}

export function deactivate() {
}
