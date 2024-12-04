import * as vscode from "vscode";
import {modalBrowserApi, type ModalNode} from "../src/api";

export class ModalBrowserProvider
    implements vscode.TreeDataProvider<ModalNodeItem> {
    top: ModalNode | null = null;
    private _onDidChangeTreeData: vscode.EventEmitter<
        ModalNodeItem | undefined | null | void
    > = new vscode.EventEmitter<ModalNodeItem | undefined | null | void>();
    readonly onDidChangeTreeData: vscode.Event<
        ModalNodeItem | undefined | null | void
    > = this._onDidChangeTreeData.event;

    constructor() {
    }

    getTreeItem(element: ModalNodeItem): vscode.TreeItem {
        return element;
    }

    getChildren(element?: ModalNodeItem): Thenable<ModalNodeItem[]> {
        if (!this.top) {
            return Promise.resolve([
                new ModalNodeItem(
                    "No modal available",
                    {name: "", children: []},
                    vscode.TreeItemCollapsibleState.None
                ),
            ]);
        }

        if (element) {
            return Promise.resolve(
                element.modalNode.children.map((n) => this._getModalNodeItem(n))
            );
        } else {
            return Promise.resolve(
                this.top.children.map((n) => this._getModalNodeItem(n))
            );
        }
    }

    async refresh() {
        try {
            this.top = (await modalBrowserApi.get()).top;
        } catch (e) {
            this.top = null;
            vscode.window.showInformationMessage("Failed to load");
        }
        vscode.commands.executeCommand(
            "setContext",
            "useocl-vscode.notopened",
            this.top == null
        );
        this._onDidChangeTreeData.fire();
    }

    _getModalNodeItem(node: ModalNode) {
        return new ModalNodeItem(
            node.name,
            node,
            node.children.length === 0
                ? vscode.TreeItemCollapsibleState.None
                : vscode.TreeItemCollapsibleState.Collapsed
        );
    }
}

class ModalNodeItem extends vscode.TreeItem {
    constructor(
        public readonly label: string,
        public modalNode: ModalNode,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState
    ) {
        super(label, collapsibleState);
        this.tooltip = `${this.label}`;
    }
}
