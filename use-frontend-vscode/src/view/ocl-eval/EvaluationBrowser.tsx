import React, {useMemo, useState} from "react";
import DraggableModal from "../../components/dialogs/DraggableModal.tsx";
import type {TreeDataNode} from 'antd'
import {Button, Flex, Tree, TreeProps} from "antd";
import {EvalNode} from "../../api/view/types/OclEvalResp.ts";

interface Props {
    open: boolean;
    onClose: () => any;
    data: EvalNode;
}

export const EvaluationBrowser: React.FC<Props> = (props) => {
    const convert: (evalNode: EvalNode, prefix?: string) => TreeDataNode = (evalNode, key = "root") => {
        return {
            title: `${evalNode.expr} = ${evalNode.result}`,
            key,
            children: evalNode.children.map((n, i) => convert(n, `${key}.${i}(${evalNode.result})`)),
        }
    }
    const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
    const treeData: TreeDataNode[] = useMemo(() => [convert(props.data)], [props.data])

    const onExpand: TreeProps['onExpand'] = (expandedKeysValue) => {
        setExpandedKeys(expandedKeysValue);
    };

    const getAllKeys: (nodes: TreeDataNode[], value?: string) => React.Key[] = (nodes, value) => {
        return nodes.reduce((pre, n) => [...pre, ...value == null || (n.title as string).endsWith(value) ? [n.key] : [], ...getAllKeys(n.children ?? [], value)], [] as React.Key[]);
    }

    return <DraggableModal
        id="ocl-eval-browser-dg"
        title="Evaluation Browser"
        open={props.open}
        onCancel={props.onClose}
        width={"90%"}
        closable
        mask={false}
        maskClosable={false}
        footer={null}
    >
        <Tree treeData={treeData} expandedKeys={expandedKeys} onExpand={onExpand}/>
        <Flex gap="small" style={{margin: "16px 0"}}>
            <Button onClick={() => setExpandedKeys(getAllKeys(treeData))}>Expand all</Button>
            <Button onClick={() => setExpandedKeys(getAllKeys(treeData, "true"))}>Expand all true</Button>
            <Button onClick={() => setExpandedKeys(getAllKeys(treeData, "false"))}>Expand all false</Button>
            <Button onClick={() => setExpandedKeys([])}>Collapse all</Button>
        </Flex>
    </DraggableModal>
}