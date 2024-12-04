import {useEffect, useMemo, useRef, useState} from "react";
import {loadClassDiagramThunk} from "../../store/class-diagram/classDiagramThunks";
import {useAppDispatch, useAppSelector} from "../../store/hook";
import ClassDia from "./ClassDia.tsx";
import {ContextMenu} from "../../components/context-menu";
import {ItemType, MenuItemType} from "antd/es/menu/interface";
import {IJointDiagramContext} from "../../components/diagram";
import {CommentNode, ViewSetting} from "./types";
import {exportDia} from "../../components/diagram/utils/exportDia.ts";

interface Props {
    open: boolean;

    width?: number;
    height?: number;
}

interface ElementVisible {
    [k: string]: 0 | 1;
}

export function AppClassDiagram(props: Props) {
    const {classElements, assocList, enumElements, generalizationList} =
        useAppSelector((state) => state.classDiagram);

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
        showOperations: false,
        showAssociationNames: false,
        showMultiplicities: false,
        showRoleNames: true,
        showUnionConstraints: true,
        showSubsetConstraints: true,
        showRefinesConstraints: true,
    });

    const [commentNodes, setCommentNodes] = useState<CommentNode[]>([]);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (props.open) {
            dispatch(loadClassDiagramThunk());
        }
    }, [dispatch, props.open]);

    const classElementsFiltered = useMemo(
        () => classElements.filter((c) => classDiagramVisible[c.className] != 0),
        [classElements, classDiagramVisible]
    );
    const classElementsHidden = useMemo(
        () => classElements.filter((c) => classDiagramVisible[c.className] === 0),
        [classElements, classDiagramVisible]
    );
    const enumElementsFiltered = useMemo(
        () => enumElements.filter((c) => classDiagramVisible[c.className] != 0),
        [enumElements, classDiagramVisible]
    );
    const assocListFiltered = useMemo(
        () =>
            assocList.filter(
                (a) =>
                    classDiagramVisible[a.associationName] != 0 &&
                    a.associatedClasses.every((cls) => classDiagramVisible[cls] != 0)
            ),
        [assocList, classDiagramVisible]
    );

    const assocListHidden = useMemo(
        () =>
            assocList.filter(
                (a) =>
                    classDiagramVisible[a.associationName] == 0 ||
                    a.associatedClasses.some((cls) => classDiagramVisible[cls] == 0)
            ),
        [assocList, classDiagramVisible]
    );
    const genListFiltered = useMemo(
        () =>
            generalizationList.filter(
                (g) =>
                    classDiagramVisible[`${g.childClass}_${g.parentClass}`] != 0 &&
                    classDiagramVisible[g.childClass] != 0 &&
                    classDiagramVisible[g.parentClass] != 0
            ),
        [generalizationList, classDiagramVisible]
    );
    const genListHidden = useMemo(
        () =>
            generalizationList.filter(
                (g) =>
                    classDiagramVisible[`${g.childClass}_${g.parentClass}`] === 0 ||
                    classDiagramVisible[g.childClass] === 0 ||
                    classDiagramVisible[g.parentClass] === 0
            ),
        [generalizationList, classDiagramVisible]
    );

    const menuItems: ItemType<MenuItemType>[] = [
        ...(classElementsHidden.length +
        assocListHidden.length +
        genListHidden.length >
        0
            ? [
                {
                    key: "show-hidden-ele",
                    label: "Show hidden elements",
                    onClick: () => setClassDiagramVisible({}),
                },
            ]
            : []),
        ...(classElementsFiltered.length > 0
            ? [
                {
                    key: "hide-classes",
                    label: "Hide classes",

                    children: classElementsFiltered.map((c) => ({
                        key: `hide-cls-${c.className}`,
                        label: `Hide ${c.className}`,
                        onClick: () =>
                            setClassDiagramVisible((v) => ({
                                ...v,
                                [c.className]: 0,
                            })),
                    })),
                },
            ]
            : []),
        ...(classElementsHidden.length > 0
            ? [
                {
                    key: "show-classes",
                    label: "Show classes",

                    children: classElementsHidden.map((c) => ({
                        key: `show-cls-${c.className}`,
                        label: `Show ${c.className}`,
                        onClick: () =>
                            setClassDiagramVisible((v) => ({
                                ...v,
                                [c.className]: 1,
                            })),
                    })),
                },
            ]
            : []),

        ...(assocListFiltered.length > 0
            ? [
                {
                    key: "hide-asso",
                    label: "Hide associations",
                    children: assocListFiltered.map((a) => ({
                        key: `hide-ass-${a.associationName}`,
                        label: `Hide ${a.associationName}`,
                        onClick: () =>
                            setClassDiagramVisible((v) => ({
                                ...v,
                                [a.associationName]: 0,
                            })),
                    })),
                },
            ]
            : []),

        ...(assocListHidden.length > 0
            ? [
                {
                    key: "show-asso",
                    label: "Show associations",
                    children: assocListHidden.map((a) => ({
                        key: `show-ass-${a.associationName}`,
                        label: `Show ${a.associationName}`,
                        onClick: () =>
                            setClassDiagramVisible((v) => ({
                                ...v,
                                [a.associationName]: 1,
                            })),
                    })),
                },
            ]
            : []),

        ...(genListFiltered.length > 0
            ? [
                {
                    key: "hide-gen",
                    label: "Hide generations",
                    children: genListFiltered.map((a) => ({
                        key: `hide-gen-${a.childClass}`,
                        label: `Hide ${a.childClass}_${a.parentClass}`,
                        onClick: () =>
                            setClassDiagramVisible((v) => ({
                                ...v,
                                [`${a.childClass}_${a.parentClass}`]: 0,
                            })),
                    })),
                },
            ]
            : []),

        ...(genListHidden.length > 0
            ? [
                {
                    key: "show-gen",
                    label: "Show generations",
                    children: genListHidden.map((a) => ({
                        key: `show-gen-${a.childClass}`,
                        label: `Show ${a.childClass}_${a.parentClass}`,
                        onClick: () =>
                            setClassDiagramVisible((v) => ({
                                ...v,
                                [`${a.childClass}_${a.parentClass}`]: 1,
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
                exportDia("dia-cls-app", "class-diagram.pdf");
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
            <ClassDia
                ref={diaRef}
                classes={classElementsFiltered}
                associations={assocListFiltered}
                enums={enumElementsFiltered}
                generalizations={genListFiltered}
                commentNodes={commentNodes}
                htmlRootId="dia-cls-app"
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
