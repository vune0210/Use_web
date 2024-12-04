import {ItemType, MenuItemType} from "antd/es/menu/hooks/useItems";
import {jsPDF} from "jspdf";
import {useEffect, useMemo, useRef, useState} from "react";
import {useDebouncedCallback} from "use-debounce";
import {AssocEnd, AssocEndKind} from "../../api";
import {ContextMenu} from "../../components/context-menu";
import {DiaLink, DiaNode, IJointDiagramContext, JointDia,} from "../../components/diagram";
import "../../components/diagrams/css/JointPaper.css";
import {useAppDispatch, useAppSelector} from "../../store/hook";
import {loadObjectDiagramThunk} from "../../store/object-diagram/objectDiagramThunks";
import {ClassToClassLink, LinkToClassLink,} from "../class-diagram/dia-nodes/ClassDiagramLink.tsx";
import {DiaDiamond1} from "../../components/diagram/components/DiaDiamond";

interface Props {
    id: string;
    width?: number;
    height?: number;
    scale?: number;

    open?: boolean;
    onClose?: () => void;
}

interface ElementVisible {
    [k: string]: 0 | 1;
}

interface ViewSetting {
    showAttributes: boolean;
    showStates: boolean;
    showAssociationNames: boolean;
    showRoleNames: boolean;
}

function assocEndRoleName(end: AssocEnd, viewSetting: ViewSetting) {
    let constraints = [];
    if (end.ordered) {
        constraints.push("ordered");
    }
    // if (viewSetting.showUnionConstraints && end.union) {
    //   constraints.push("union");
    // }

    // if (viewSetting.showSubsetConstaints) {
    //   constraints = [...constraints, ...end.subsets.map((s) => `subsets ${s}`)];
    // }

    // if (viewSetting.showRefinesConstaints) {
    //   constraints = [
    //     ...constraints,
    //     ...end.redefines.map((s) => `redefines ${s}`),
    //   ];
    // }

    // console.log(constraints);

    let rolename;
    if (end.isDerived) {
        rolename = "/" + end.rolename;
    } else rolename = end.rolename;

    if (constraints.length > 0) {
        rolename = rolename + " {" + constraints.join(",") + "}";
    }
    return rolename;
}

interface CommentNode {
    id: string;
    content: string;
}

type NodePosition = Record<string, { x: number; y: number }>;

function NewObjectDiagram(props: Props) {
    const diaRef = useRef<IJointDiagramContext>(null);
    const {objects, links} = useAppSelector((state) => state.objectDiagram);
    const [commentNodes, setCommentNodes] = useState<CommentNode[]>([]);
    const dispatch = useAppDispatch();
    const {width = 800, height = 600, scale} = props;
    const [contextMenuPos, setContextMenuPos] = useState({
        open: false,
        x: 0,
        y: 0,
    });
    const [nodePos, setNodePos] = useState<NodePosition>({});
    const [viewSetting, setViewSetting] = useState<ViewSetting>({
        showAttributes: true,
        showStates: false,
        showAssociationNames: false,
        showRoleNames: true,
    });
    const [classDiagramVisible, setClassDiagramVisible] =
        useState<ElementVisible>({});

    useEffect(() => {
        dispatch(loadObjectDiagramThunk());
    }, [dispatch]);

    useEffect(() => {
        setNodePos(
            objects.reduce(
                (pre, obj, idx) => ({
                    ...pre,
                    [obj.fLabel]: {
                        x: 100 + (idx % 3) * 200,
                        y: 100 + (idx / 3) * 200,
                    },
                }),
                {}
            )
        );
    }, [objects]);

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

    const binaryLinksFiltered = useMemo(
        () => linksFiltered.filter((a) => a.linkEnds.length === 2),
        [linksFiltered]
    );
    const nAryLinkFiltered = useMemo(
        () => linksFiltered.filter((a) => a.linkEnds.length > 2),
        [linksFiltered]
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

    // TODO:
    const linkAssoClass = linksFiltered.filter(
        (as) =>
            objectsFiltered.find((oj) => as.fAssociationName === oj.fClassName) !=
            null
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
                setNodePos((np) => ({
                    ...np,
                    [id]: {x: contextMenuPos.x, y: contextMenuPos.y},
                }));
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
                const svg =
                    document.querySelector<SVGGraphicsElement>("#cls-dia-paper svg");

                const paperContainer =
                    document.querySelector<HTMLElement>("#cls-dia-paper");

                const canvas = document.createElement("canvas");
                if (svg == null || canvas == null || paperContainer == null) return;

                const width = paperContainer.offsetWidth;
                const height = paperContainer.offsetHeight;
                const serializer = new XMLSerializer();
                let svgString = serializer.serializeToString(svg);

                // const bbox = svg.getBBox();
                const doc = new jsPDF({
                    orientation: "landscape",
                    unit: "px",
                    format: [width, height],
                });
                svgString = svgString.replace('width="100%"', `width="${width}px"`);
                svgString = svgString.replace('height="100%"', `height="${height}px"`);
                // console.log(svgString);

                let blob = new Blob([svgString], {type: "image/svg+xml"});
                let url = URL.createObjectURL(blob);
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext("2d");
                if (ctx == null) return;

                const img = new Image();
                img.onload = () => {
                    ctx.drawImage(img, 0, 0, width, height);

                    const png = canvas.toDataURL("image/png");
                    // console.log(png);
                    doc.addImage(png, "PNG", 0, 0, width, height);

                    doc.html(
                        document.querySelector<HTMLElement>(".dia-html-container")!,
                        {
                            x: 0,
                            y: 0,
                            callback(doc) {
                                doc.save("object-diagram.pdf");
                            },
                        }
                    );
                };
                img.src = url;

                // await doc.addSvgAsImage(svgString, 0, 0, width, height);
                // doc.save("class-diagram.pdf");
            },
        },
    ];

    const onNodeMove = useDebouncedCallback(
        (id: string, p: { x: number; y: number }) => {
            setNodePos((np) => ({
                ...np,
                [id]: p,
            }));
        },
        100
    );

    return (
        <>
            <ContextMenu
                open={contextMenuPos.open}
                x={contextMenuPos.x + 20}
                y={contextMenuPos.y + 44}
                onClose={() => setContextMenuPos({open: false, x: 0, y: 0})}
                menuItems={menuItems}
            />
            <JointDia
                ref={diaRef}
                width={width}
                height={height}
                htmlPaperId="cls-dia-paper"
                onContextMenu={(x, y) => setContextMenuPos({open: true, x, y})}
            >
                {commentNodes.map((node) => (
                    <DiaNode
                        key={node.id}
                        id={node.id}
                        deps={[]}
                        position={nodePos[node.id]}
                        onMove={(p) => onNodeMove(node.id, p)}
                        onClick={() =>
                            setCommentNodes((nodes) =>
                                nodes.map((n) => {
                                    if (n.id === node.id) {
                                        n.content = window.prompt("Content") ?? n.content;
                                    }
                                    return n;
                                })
                            )
                        }
                    >
                        <div style={{height: 100, width: 100, border: "1px black"}}>
                            {node.content}
                        </div>
                        {/* <textarea value={node.content} /> */}
                    </DiaNode>
                ))}
                {objectsFiltered.map((node) => (
                    <DiaNode
                        key={node.fLabel}
                        id={node.fLabel}
                        deps={[]}
                        position={nodePos[node.fLabel] ?? {x: 0, y: 0}}
                        onMove={(p) => onNodeMove(node.fLabel, p)}
                    >
                        <table style={{whiteSpace: "nowrap"}}>
                            <tr>
                                <th>{node.fLabel}</th>
                            </tr>
                            {viewSetting.showAttributes ? (
                                <tr>
                                    <td>
                                        {node.fValues.map((attr) => (
                                            <div>{attr}</div>
                                        ))}
                                    </td>
                                </tr>
                            ) : null}

                            {viewSetting.showStates ? (
                                <tr>
                                    <td>
                                        {node.fStateValues.map((state) => (
                                            <div>{state}</div>
                                        ))}
                                    </td>
                                </tr>
                            ) : null}
                        </table>
                    </DiaNode>
                ))}

                {binaryLinksFiltered.map((l) => {
                    const id = `${l.linkEnds[0].fLabel}-${l.linkEnds[1].fLabel}-${
                        l.assocObjectLabel ??
                        l.fAssociationName + l.linkEnds.map((le) => le.fLabel).join(",")
                    }`;
                    return (
                        <DiaLink
                            key={id}
                            id={id}
                            link={ClassToClassLink}
                            sourceId={l.linkEnds[0].fLabel}
                            targetId={l.linkEnds[1].fLabel}
                            labels={[
                                ...(viewSetting.showRoleNames
                                    ? [
                                        {
                                            attrs: {
                                                text: {
                                                    text: assocEndRoleName(
                                                        l.linkEnds[0].fAssociationEnd,
                                                        viewSetting
                                                    ),
                                                },
                                            },
                                            position: {
                                                distance: 0.2,
                                            },
                                        },
                                    ]
                                    : []),
                                ...(viewSetting.showAssociationNames &&
                                !objects.find((o) => o.fLabel === l.fAssociationName)
                                    ? [
                                        {
                                            attrs: {
                                                text: {
                                                    text: l.fAssociationName,
                                                },
                                            },
                                            position: {
                                                distance: 0.5,
                                            },
                                        },
                                    ]
                                    : []),

                                ...(viewSetting.showRoleNames
                                    ? [
                                        {
                                            attrs: {
                                                text: {
                                                    text: assocEndRoleName(
                                                        l.linkEnds[1].fAssociationEnd,
                                                        viewSetting
                                                    ),
                                                },
                                            },
                                            position: {
                                                distance: 0.8,
                                            },
                                        },
                                    ]
                                    : []),
                            ]}
                        />
                    );
                })}

                {nAryLinkFiltered.map((a) => {
                    const id =
                        a.fAssociationName +
                        a.linkEnds.map((le) => le.fLabel).join(",") +
                        "_diamond";
                    return (
                        <DiaNode
                            key={id}
                            id={id}
                            deps={[]}
                            shape={DiaDiamond1}
                            width={60}
                            height={30}
                            style={{background: "transparent"}}
                            position={{
                                x: nodePos[id]?.x ?? Math.floor(Math.random() * 100),
                                y: nodePos[id]?.y ?? Math.floor(Math.random() * 100),
                            }}
                            onMove={(p) => onNodeMove(id, p)}
                        ></DiaNode>
                    );
                })}

                {nAryLinkFiltered
                    .map((as) =>
                        as.linkEnds.map((le) => {
                            return (
                                <DiaLink
                                    key={`${le.fLabel}.${le.fAssociationEnd.rolename}-${
                                        as.fAssociationName + "_diamond"
                                    }`}
                                    id={`${le.fLabel}.${le.fAssociationEnd.rolename}-${
                                        as.fAssociationName + "_diamond"
                                    }`}
                                    link={ClassToClassLink}
                                    sourceId={le.fLabel}
                                    targetId={
                                        as.fAssociationName +
                                        as.linkEnds.map((le) => le.fLabel).join(",") +
                                        "_diamond"
                                    }
                                    labels={[
                                        // ...(viewSetting.showMultiplicities
                                        //   ? [
                                        //       {
                                        //         attrs: {
                                        //           text: {
                                        //             text: ae.mult,
                                        //           },
                                        //         },
                                        //         position: {
                                        //           distance: 10,
                                        //         },
                                        //       },
                                        //     ]
                                        //   : []),
                                        ...(viewSetting.showRoleNames
                                            ? [
                                                {
                                                    attrs: {
                                                        text: {
                                                            text: assocEndRoleName(
                                                                le.fAssociationEnd,
                                                                viewSetting
                                                            ),
                                                        },
                                                    },
                                                    position: {
                                                        distance: 0.2,
                                                    },
                                                },
                                            ]
                                            : []),
                                        ...(viewSetting.showAssociationNames &&
                                        !objects.find((c) => c.fClassName === as.fAssociationName)
                                            ? [
                                                {
                                                    attrs: {
                                                        text: {
                                                            text: as.fAssociationName,
                                                        },
                                                    },
                                                    position: {
                                                        distance: 0.5,
                                                    },
                                                },
                                            ]
                                            : []),

                                        // ...(viewSetting.showRoleNames
                                        //   ? [
                                        //       {
                                        //         attrs: {
                                        //           text: {
                                        //             text: assocEndRoleName(targetEnd, viewSetting),
                                        //           },
                                        //         },
                                        //         position: {
                                        //           distance: 0.8,
                                        //         },
                                        //       },
                                        //     ]
                                        //   : []),

                                        // ...(viewSetting.showMultiplicities
                                        //   ? [
                                        //       {
                                        //         attrs: {
                                        //           text: {
                                        //             text: targetEnd.mult,
                                        //           },
                                        //         },
                                        //         position: {
                                        //           distance: 0.9,
                                        //         },
                                        //       },
                                        //     ]
                                        //   : []),
                                    ]}
                                    attr={{
                                        line: {
                                            ...(le.fAssociationEnd.kind === AssocEndKind.COMPOSITION
                                                ? {
                                                    sourceMarker: {
                                                        type: "path",
                                                        d: "M 9 -6 0 0 9 6 18 0 Z",
                                                    },
                                                }
                                                : le.fAssociationEnd.kind === AssocEndKind.AGGREGATION
                                                    ? {
                                                        sourceMarker: {
                                                            type: "path",
                                                            "stroke-width": 2,
                                                            fill: "white",
                                                            d: "M 9 -6 0 0 9 6 18 0 Z",
                                                        },
                                                    }
                                                    : {}),

                                            // ...(targetEnd.kind === AssocEndKind.COMPOSITION
                                            //   ? {
                                            //       targetMarker: {
                                            //         type: "path",
                                            //         d: "M 9 -6 0 0 9 6 18 0 Z",
                                            //       },
                                            //     }
                                            //   : targetEnd.kind === AssocEndKind.AGGREGATION
                                            //   ? {
                                            //       targetMarker: {
                                            //         type: "path",
                                            //         "stroke-width": 2,
                                            //         fill: "white",
                                            //         d: "M 9 -6 0 0 9 6 18 0 Z",
                                            //       },
                                            //     }
                                            //   : {}),
                                        },
                                    }}
                                />
                            );
                        })
                    )
                    .flat()}

                {/* TODO */}
                {linkAssoClass.map((as) => {
                    const linkId =
                        as.assocObjectLabel ??
                        as.fAssociationName + as.linkEnds.map((le) => le.fLabel).join(",");
                    return (
                        <DiaLink
                            key={`link-${linkId}`}
                            id={`link-${linkId}`}
                            link={LinkToClassLink}
                            sourceId={as.assocObjectLabel!}
                            targetId={`${as.linkEnds[0].fLabel}-${as.linkEnds[1].fLabel}-${linkId}`}
                        />
                    );
                })}
            </JointDia>
        </>
    );
}

export default NewObjectDiagram;
