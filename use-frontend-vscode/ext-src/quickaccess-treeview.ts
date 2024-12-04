import * as vscode from "vscode";
import {ModalBrowserProvider} from "./browser-treeview";

interface QuickItemNode {
    label: string;
    command: string | null;
    icon: string | null;
    children: QuickItemNode[];
}

const top: QuickItemNode = {
    label: "USE OCL",
    command: null,
    icon: "$(account)",
    children: [
        {
            label: "Open",
            command: "useocl-vscode.open-spec",
            icon: "$(new-folder)",
            children: [],
        },
        {
            label: "Create view",
            command: null,
            icon: "$(window)",
            children: [
                {
                    label: "Class diagram",
                    command: "useocl-vscode.view-clsdia",
                    icon: null,
                    children: [],
                },
                {
                    label: "Object diagram",
                    command: "useocl-vscode.view-objdia",
                    icon: null,
                    children: [],
                },
                {
                    label: "Object count",
                    command: "useocl-vscode.view-objcnt",
                    icon: null,
                    children: [],
                },
                {
                    label: "Link count",
                    command: "useocl-vscode.view-lnkcnt",
                    icon: null,
                    children: [],
                },
            ],
        },
    ],
};

export class QuickAccessProvider
    implements vscode.TreeDataProvider<QuickItemNodeItem> {
    private _onDidChangeTreeData: vscode.EventEmitter<
        QuickItemNodeItem | undefined | null | void
    > = new vscode.EventEmitter<QuickItemNodeItem | undefined | null | void>();
    readonly onDidChangeTreeData: vscode.Event<
        QuickItemNodeItem | undefined | null | void
    > = this._onDidChangeTreeData.event;

    constructor(private modalBrowserProvider: ModalBrowserProvider) {
    }

    getTreeItem(element: QuickItemNodeItem): vscode.TreeItem {
        return element;
    }

    getChildren(element?: QuickItemNodeItem): Thenable<QuickItemNodeItem[]> {
        // if (this.modalBrowserProvider.top == null) {
        //   return Promise.resolve([]);
        // }

        if (element) {
            return Promise.resolve(
                element.node.children.map((n) => this._getQuickItemNodeItem(n))
            );
        } else {
            return Promise.resolve(
                top.children.map((n) => this._getQuickItemNodeItem(n))
            );
        }
    }

    refresh() {
        this._onDidChangeTreeData.fire();
    }

    _getQuickItemNodeItem(node: QuickItemNode) {
        return new QuickItemNodeItem(
            node.label,
            node,
            node.children.length === 0
                ? vscode.TreeItemCollapsibleState.None
                : vscode.TreeItemCollapsibleState.Collapsed
        );
    }
}

class QuickItemNodeItem extends vscode.TreeItem {
    constructor(
        public readonly label: string,
        public node: QuickItemNode,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState
    ) {
        super(label, collapsibleState);
        this.tooltip = `${this.label}`;
        if (node.command) {
            this.command = {
                command: node.command,
                title: node.label,
            };
        }
    }
}
