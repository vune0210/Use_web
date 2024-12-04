import {useEffect, useMemo, useState} from "react";
import {ModalNode} from "../../api/modal-browser/ModalBrowserResp";
import type {TreeProps} from 'antd';
import {Tree} from "antd";
import {DataNode} from "antd/lib/tree";
import {FolderOpenOutlined, FolderOutlined} from "@ant-design/icons";
import {useAppDispatch, useAppSelector} from "../../store/hook";
import {loadModalBrowserThunk} from "../../store/modal-browser/modalBrowserThunk";
import {SelectedNode} from "./types/SelectedNode.ts";
import {ModalBrowserInfo} from "./ModalBrowserInfo.tsx";

function toDataNode(node: ModalNode, key: string = "0"): DataNode {
    return {
        title: node.name,
        key,
        icon:
            node.children.length > 0
                ? ({expanded}) =>
                    expanded ? <FolderOpenOutlined/> : <FolderOutlined/>
                : null,
        children: node.children.map((child, idx) =>
            toDataNode(child, `${key}-${idx}`)
        ),
    };
}


export function ModalBrowser() {
    const dispatch = useAppDispatch();
    const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
    const [selectedNode, setSelectedNode] = useState<SelectedNode | null>(null)
    const treeData = useAppSelector((state) => state.modalBrowser.treeData);

    const dataNode = useMemo(
        () => (treeData == null ? [] : [toDataNode(treeData)]),
        [treeData]
    );

    useEffect(() => {
        setExpandedKeys(['0']);
    }, [treeData]);

    useEffect(() => {
        dispatch(loadModalBrowserThunk());
    }, []);

    const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
        console.log("selected", selectedKeys, info);
        const indexes = (selectedKeys[0] as string)?.split("-")?.slice(1) ?? [];
        let node: ModalNode | null = treeData;
        let parentNode: ModalNode | null = null;
        for (let i of indexes) {
            parentNode = node;
            node = node?.children?.[parseInt(i)] ?? null;
        }
        if (node?.children.length === 0) {
            setSelectedNode({
                type: parentNode!.name,
                name: node.name
            });
        }
    };

    const onExpand: TreeProps['onExpand'] = (expandedKeysValue) => {
        console.log('onExpand', expandedKeysValue);
        setExpandedKeys(expandedKeysValue);
    };

    console.log(expandedKeys);

    return (
        <>
            <Tree
                showLine={{showLeafIcon: false}}
                showIcon
                treeData={dataNode}
                expandedKeys={expandedKeys}
                autoExpandParent={false}
                onExpand={onExpand}
                onSelect={onSelect}
                style={{padding: 16}}
            />
            {selectedNode ? <ModalBrowserInfo type={selectedNode.type} name={selectedNode.name}/> : null}
        </>
    );
}
