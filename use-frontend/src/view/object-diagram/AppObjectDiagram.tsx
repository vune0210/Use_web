import {useEffect, useMemo, useRef, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../store/hook";
import {ContextMenu} from "../../components/context-menu";
import {ItemType, MenuItemType} from "antd/es/menu/interface";
import {IJointDiagramContext} from "../../components/diagram";
import {ViewSetting} from "./types";
import {exportDia} from "../../components/diagram/utils/exportDia.ts";
import ObjectDia from "./ObjectDia.tsx";

import {CommentNode} from "../class-diagram/types";
import {loadObjectDiagramThunk} from "../../store/object-diagram/objectDiagramThunks.ts";

interface Props {
    open: boolean;

    width?: number;
    height?: number;
}

interface ElementVisible {
    [k: string]: 0 | 1;
}

export function AppObjectDiagram(props: Props) {
    const {objects, links} =
        useAppSelector((state) => state.objectDiagram);

    const diaRef = useRef<IJointDiagramContext>(null);

    const [contextMenuPos, setContextMenuPos] = useState({
        open: false,
        x: 0,
        y: 0,
    });
    const [classDiagramVisible, setClassDiagramVisible] =
        useState<ElementVisible>({});
    const [viewSetting, setViewSetting] = useState<ViewSetting>({
        showAttributes: true,
        showAssociationNames: false,
        showRoleNames: true,
        showStates: true,
    });

    const [commentNodes, setCommentNodes] = useState<CommentNode[]>([]);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (props.open) {
            dispatch(loadObjectDiagramThunk());
        }
    }, [dispatch, props.open]);

    const objectsFiltered = useMemo(
        () => objects.filter((c) => classDiagramVisible[c.fLabel] != 0),
        [objects, classDiagramVisible]
    );
    const objectsHidden = useMemo(
        () => objects.filter((c) => classDiagramVisible[c.fLabel] === 0),
        [objects, classDiagramVisible]
    );

    const linksFiltered = useMemo(
        () =>
            links.filter(
                (l) =>
                    classDiagramVisible[l.fAssociationName] != 0 &&
                    l.linkEnds.every((lEnd) => classDiagramVisible[lEnd.fLabel] != 0)
            ),
        [links, classDiagramVisible]
    );

    const linksHidden = useMemo(
        () =>
            links.filter(
                (l) =>
                    classDiagramVisible[l.fAssociationName] == 0 ||
                    l.linkEnds.some((lEnd) => classDiagramVisible[lEnd.fLabel] == 0)
            ),
        [links, classDiagramVisible]
    );

    const menuItems: ItemType<MenuItemType>[] = [
        ...(objectsHidden.length + linksHidden.length > 0
            ? [
                {
                    key: "show-hidden-ele",
                    label: "Show hidden elements",
                    onClick: () => setClassDiagramVisible({}),
                },
            ]
            : []),
        ...(objectsFiltered.length > 0
            ? [
                {
                    key: "hide-objects",
                    label: "Hide objects",

                    children: objectsFiltered.map((c) => ({
                        key: `hide-obj-${c.fLabel}`,
                        label: `Hide ${c.fLabel}`,
                        onClick: () =>
                            setClassDiagramVisible((v) => ({
                                ...v,
                                [c.fLabel]: 0,
                            })),
                    })),
                },
            ]
            : []),
        ...(objectsHidden.length > 0
            ? [
                {
                    key: "show-objects",
                    label: "Show objects",

                    children: objectsHidden.map((c) => ({
                        key: `show-obj-${c.fLabel}`,
                        label: `Show ${c.fLabel}`,
                        onClick: () =>
                            setClassDiagramVisible((v) => ({
                                ...v,
                                [c.fLabel]: 1,
                            })),
                    })),
                },
            ]
            : []),

        ...(linksFiltered.length > 0
            ? [
                {
                    key: "hide-links",
                    label: "Hide links",
                    children: linksFiltered.map((a) => ({
                        key: `hide-links-${a.fAssociationName}`,
                        label: `Hide ${a.fAssociationName}`,
                        onClick: () =>
                            setClassDiagramVisible((v) => ({
                                ...v,
                                [a.fAssociationName]: 0,
                            })),
                    })),
                },
            ]
            : []),

        ...(linksHidden.length > 0
            ? [
                {
                    key: "show-links",
                    label: "Show links",
                    children: linksHidden.map((a) => ({
                        key: `show-links-${a.fAssociationName}`,
                        label: `Show ${a.fAssociationName}`,
                        onClick: () =>
                            setClassDiagramVisible((v) => ({
                                ...v,
                                [a.fAssociationName]: 1,
                            })),
                    })),
                },
            ]
            : []),

        {
            type: "divider",
        },
        {
            key: "add-comment",
            label: "Add comment node",
            onClick: () => {
                const id = crypto.randomUUID();
                setCommentNodes((nodes) => [
                    ...nodes,
                    {
                        id,
                        content: "",
                    },
                ]);
            },
        },
        {
            type: "divider",
        },
        {
            key: "view-set",
            label: "View settings",
            children: Object.keys(viewSetting).map((setting) => ({
                key: `view-set-${setting}`,
                label: `${
                    viewSetting[setting as keyof ViewSetting] ? "Hide" : "Show"
                } ${setting.slice(4)}`,
                onClick: () =>
                    setViewSetting((v) => ({
                        ...v,
                        [setting]: !v[setting as keyof ViewSetting],
                    })),
            })),
        },
        {
            type: "divider",
        },
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
                exportDia("dia-obj-app", "object-diagram.pdf");
            },
        },
    ];


    return (
        <>
            <ContextMenu
                open={contextMenuPos.open}
                x={contextMenuPos.x + 20}
                y={contextMenuPos.y + 44}
                onClose={() => setContextMenuPos({open: false, x: 0, y: 0})}
                menuItems={menuItems}
            />
            <ObjectDia
                ref={diaRef}
                objects={objectsFiltered}
                links={linksFiltered}
                commentNodes={commentNodes}
                htmlRootId="dia-obj-app"
                width={props.width}
                height={props.height}
                viewSetting={viewSetting}
                retrieveContextMenuPosition={() => contextMenuPos}
                onContextMenu={(x, y) => setContextMenuPos({open: true, x, y})}
                onNodeDblClick={{
                    commentNode: (node) => {
                        setCommentNodes((nodes) =>
                            nodes.map((n) => {
                                if (n.id === node.id) {
                                    n.content = window.prompt("Content") ?? n.content;
                                }
                                return n;
                            })
                        )
                    }
                }}
            />
        </>
    );
}
