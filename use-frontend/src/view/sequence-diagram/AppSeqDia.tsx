import React, {useEffect, useMemo, useRef, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../store/hook.ts";
import {loadEventThunk} from "../../store/seq-diagram/loadEventThunk.ts";
import {SequenceDia} from "./SequenceDia.tsx";
import {ObjectCreatedEvent} from "../../api/view/types/EventResp.ts";
import {SeqMessage} from "./type/SeqMessage.ts";
import {ContextMenu} from "../../components/context-menu";
import {ItemType, MenuItemType} from "antd/es/menu/interface";
import {exportDia} from "../../components/diagram/utils/exportDia.ts";
import {IJointDiagramContext} from "../../components/diagram";

export const AppSeqDia: React.FC = () => {
    const events = useAppSelector(state => state.events.events);

    const diaRef = useRef<IJointDiagramContext>(null);

    const [contextMenuPos, setContextMenuPos] = useState({
        open: false,
        x: 0,
        y: 0,
    });

    const createObjectEvents: ObjectCreatedEvent[] = useMemo(() => events.filter(e => e.type === "ObjectCreatedEvent"), [events]);

    const operationEvents: SeqMessage[] = useMemo(() => {
        const stack: string[] = [];
        const messages: SeqMessage[] = [];
        for (let e of events) {
            if (e.type === "OperationEnteredEvent" || e.type === "OperationExitedEvent") {
                const target = e.operationCallString.split(".")[0]
                if (e.type === "OperationEnteredEvent") {
                    messages.push({
                        name: `link${messages.length}`,
                        from: stack[stack.length - 1] ?? "actor-node",
                        to: target,
                        message: e.operationCallString.split(".").slice(1).join("."),
                        dashed: false
                    });
                    if (e.enteredSuccessfully) {
                        stack.push(target);
                    }
                }
                if (e.type === "OperationExitedEvent") {
                    const from = stack.pop();
                    if (from != null) {
                        messages.push({
                            name: `link${messages.length}`,
                            from,
                            to: stack[stack.length - 1] ?? "actor-node",
                            message: e.operationCallString.split(".").slice(1).join("."),
                            dashed: true
                        });
                    } else {
                        console.warn("Stack empty error: fail to get 'from' entity")
                    }
                }

            }
        }
        return messages;
    }, [events]);

    // console.log(operationEvents)

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(loadEventThunk());
    }, []);

    const menuItems: ItemType<MenuItemType>[] = [
        {
            key: "show-hide-grid",
            label: "Show/Hide grid",
            children: [
                {
                    key: "show-grid",
                    label: "Show grid",
                    onClick: () => {
                        diaRef.current?.paper?.setGrid(true);
                        diaRef.current?.paper?.setGridSize(20);
                        diaRef.current?.paper?.drawGrid({
                            color: "#000000",
                            thickness: 2,
                        });
                    },
                },
                {
                    key: "hide-grid",
                    label: "Hide grid",
                    onClick: () => {
                        diaRef.current?.paper?.clearGrid();
                    },
                },
            ],
        },
        {
            key: "export",
            label: "Export",
            onClick: async () => {
                exportDia("dia-seq-app", "seq-diagram.pdf");
            },
        },
    ];

    return <>
        <ContextMenu
            open={contextMenuPos.open}
            x={contextMenuPos.x + 20}
            y={contextMenuPos.y + 44}
            onClose={() => setContextMenuPos({open: false, x: 0, y: 0})}
            menuItems={menuItems}
        />
        <SequenceDia
            ref={diaRef}
            htmlRootId={"dia-seq-app"}
            roleList={createObjectEvents.map(e => e.createdObjectName)}
            messageList={operationEvents}
            onContextMenu={(x, y) => setContextMenuPos({open: true, x, y})}
        />
    </>
}