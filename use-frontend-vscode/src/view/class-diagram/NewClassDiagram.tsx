import {ItemType, MenuItemType} from "antd/es/menu/hooks/useItems";
import {jsPDF} from "jspdf";
import {useEffect, useMemo, useRef, useState} from "react";
import {useDebouncedCallback} from "use-debounce";
import {AssocEnd, AssocEndKind} from "../../api";
import {ContextMenu} from "../../components/context-menu";
import {DiaLink, DiaNode, IJointDiagramContext, JointDia,} from "../../components/diagram";
import "../../components/diagrams/css/JointPaper.css";
import {moveElement} from "../../store/class-diagram/classDiagramSlice";
import {loadClassDiagramThunk} from "../../store/class-diagram/classDiagramThunks";
import {useAppDispatch, useAppSelector} from "../../store/hook";
import {ClassToClassLink, GeneralizationLink, LinkToClassLink,} from "./dia-nodes/ClassDiagramLink.tsx";
import {DiaDiamond1} from "../../components/diagram/components/DiaDiamond";

interface Props {
    id: string;
    width?: number;
    height?: number;
    scale?: number;

    open: boolean;
    onClose: () => void;
}

interface ElementVisible {
    [k: string]: 0 | 1;
}

interface ViewSetting {
    showAttributes: boolean;
    showOperations: boolean;
    showAssociationNames: boolean;
    showMultiplicities: boolean;
    showRoleNames: boolean;
    showUnionConstraints: boolean;
    showSubsetConstaints: boolean;
    showRefinesConstaints: boolean;
}

function assocEndRoleName(end: AssocEnd, viewSetting: ViewSetting) {
    let constraints = [];
    if (end.ordered) {
        constraints.push("ordered");
    }
    if (viewSetting.showUnionConstraints && end.union) {
        constraints.push("union");
    }

    if (viewSetting.showSubsetConstaints) {
        constraints = [...constraints, ...end.subsets.map((s) => `subsets ${s}`)];
    }

    if (viewSetting.showRefinesConstaints) {
        constraints = [
            ...constraints,
            ...end.redefines.map((s) => `redefines ${s}`),
        ];
    }

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

/**
 * @deprecated
 */
function NewClassDiagram(props: Props) {
    const diaRef = useRef<IJointDiagramContext>(null);
    const {classElements, assocList, enumElements, generalizationList} =
        useAppSelector((state) => state.classDiagram);
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
        showOperations: false,
        showAssociationNames: false,
        showMultiplicities: false,
        showRoleNames: true,
        showUnionConstraints: true,
        showSubsetConstaints: true,
        showRefinesConstaints: true,
    });
    const [classDiagramVisible, setClassDiagramVisible] =
        useState<ElementVisible>({});

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

    const binaryAssocListFiltered = useMemo(
        () => assocListFiltered.filter((a) => a.associationEnds.length === 2),
        [assocListFiltered]
    );
    const nAryAssocListFiltered = useMemo(
        () => assocListFiltered.filter((a) => a.associationEnds.length > 2),
        [assocListFiltered]
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
    const linkAssClass = assocListFiltered.filter(
        (as) =>
            classElementsFiltered.find((cl) => as.associationName === cl.className) !=
            null
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
                                doc.save("class-diagram.pdf");
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
                        position={nodePos[node.id] ?? {x: 0, y: 0}}
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
                {classElementsFiltered.map((node) => (
                    <DiaNode
                        key={node.className}
                        id={node.className}
                        deps={[]}
                        position={node}
                        onMove={(p) =>
                            dispatch(moveElement({id: node.className, x: p.x, y: p.y}))
                        }
                    >
                        <table style={{whiteSpace: "nowrap"}}>
                            <tr>
                                <th>{node.className}</th>
                            </tr>
                            {viewSetting.showAttributes ? (
                                <tr>
                                    <td>
                                        {node.attributes.map((attr) => (
                                            <div>{attr}</div>
                                        ))}
                                    </td>
                                </tr>
                            ) : null}

                            {viewSetting.showOperations ? (
                                <tr>
                                    <td>
                                        {node.operations.map((op) => (
                                            <div>{op}</div>
                                        ))}
                                    </td>
                                </tr>
                            ) : null}
                        </table>
                    </DiaNode>
                ))}

                {enumElementsFiltered.map((node) => (
                    <DiaNode
                        key={node.id}
                        id={node.id}
                        deps={[]}
                        position={node}
                        onMove={(p) =>
                            dispatch(moveElement({id: node.id, x: p.x, y: p.y}))
                        }
                    >
                        <table style={{whiteSpace: "nowrap"}}>
                            <tr>
                                <th>
                                    <div>
                                        <i>{`<<enumeration>>`}</i>
                                    </div>
                                    {node.className}
                                </th>
                            </tr>
                            <tr>
                                <td>
                                    {node.literals.map((attr) => (
                                        <div>{attr}</div>
                                    ))}
                                </td>
                            </tr>
                        </table>
                    </DiaNode>
                ))}

                {binaryAssocListFiltered.map((as) => {
                    let sourceEnd = as.associationEnds[0];
                    let targetEnd = as.associationEnds[1];
                    // for reflexive associations with exactly one qualifier
                    // the qualifier end must be the source!
                    if (
                        !as.isAssociationClass &&
                        as.associatedClasses.length === 1 &&
                        as.associationEnds[1].qualifiers.length > 0 &&
                        as.associationEnds[0].qualifiers.length === 0
                    ) {
                        sourceEnd = as.associationEnds[1];
                        targetEnd = as.associationEnds[0];
                    }
                    return (
                        <DiaLink
                            key={`${sourceEnd.className}-${targetEnd.className}-${as.associationName}`}
                            id={`${sourceEnd.className}-${targetEnd.className}-${as.associationName}`}
                            link={ClassToClassLink}
                            sourceId={sourceEnd.className}
                            targetId={targetEnd.className}
                            labels={[
                                ...(viewSetting.showMultiplicities
                                    ? [
                                        {
                                            attrs: {
                                                text: {
                                                    text: sourceEnd.mult,
                                                },
                                            },
                                            position: {
                                                distance: 10,
                                            },
                                        },
                                    ]
                                    : []),
                                ...(viewSetting.showRoleNames
                                    ? [
                                        {
                                            attrs: {
                                                text: {
                                                    text: assocEndRoleName(sourceEnd, viewSetting),
                                                },
                                            },
                                            position: {
                                                distance: 0.2,
                                            },
                                        },
                                    ]
                                    : []),
                                ...(viewSetting.showAssociationNames &&
                                !classElements.find((c) => c.className === as.associationName)
                                    ? [
                                        {
                                            attrs: {
                                                text: {
                                                    text: as.associationName,
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
                                                    text: assocEndRoleName(targetEnd, viewSetting),
                                                },
                                            },
                                            position: {
                                                distance: 0.8,
                                            },
                                        },
                                    ]
                                    : []),

                                ...(viewSetting.showMultiplicities
                                    ? [
                                        {
                                            attrs: {
                                                text: {
                                                    text: targetEnd.mult,
                                                },
                                            },
                                            position: {
                                                distance: 0.9,
                                            },
                                        },
                                    ]
                                    : []),
                            ]}
                            attr={{
                                line: {
                                    ...(sourceEnd.kind === AssocEndKind.COMPOSITION
                                        ? {
                                            sourceMarker: {
                                                type: "path",
                                                d: "M 9 -6 0 0 9 6 18 0 Z",
                                            },
                                        }
                                        : sourceEnd.kind === AssocEndKind.AGGREGATION
                                            ? {
                                                sourceMarker: {
                                                    type: "path",
                                                    "stroke-width": 2,
                                                    fill: "white",
                                                    d: "M 9 -6 0 0 9 6 18 0 Z",
                                                },
                                            }
                                            : {}),

                                    ...(targetEnd.kind === AssocEndKind.COMPOSITION
                                        ? {
                                            targetMarker: {
                                                type: "path",
                                                d: "M 9 -6 0 0 9 6 18 0 Z",
                                            },
                                        }
                                        : targetEnd.kind === AssocEndKind.AGGREGATION
                                            ? {
                                                targetMarker: {
                                                    type: "path",
                                                    "stroke-width": 2,
                                                    fill: "white",
                                                    d: "M 9 -6 0 0 9 6 18 0 Z",
                                                },
                                            }
                                            : {}),
                                },
                            }}
                        />
                    );
                })}

                {nAryAssocListFiltered.map((a) => (
                    <DiaNode
                        key={a.associationName + "_diamond"}
                        id={a.associationName + "_diamond"}
                        deps={[]}
                        shape={DiaDiamond1}
                        width={60}
                        height={30}
                        style={{background: "transparent"}}
                        position={{
                            x:
                                nodePos[a.associationName + "_diamond"]?.x ??
                                Math.floor(Math.random() * 100),
                            y:
                                nodePos[a.associationName + "_diamond"]?.y ??
                                Math.floor(Math.random() * 100),
                        }}
                        onMove={(p) => onNodeMove(a.associationName + "_diamond", p)}
                    ></DiaNode>
                ))}

                {nAryAssocListFiltered
                    .map((as) =>
                        as.associationEnds.map((ae) => {
                            return (
                                <DiaLink
                                    key={`${ae.className}.${ae.rolename}-${
                                        as.associationName + "_diamond"
                                    }`}
                                    id={`${ae.className}.${ae.rolename}-${
                                        as.associationName + "_diamond"
                                    }`}
                                    link={ClassToClassLink}
                                    sourceId={ae.className}
                                    targetId={as.associationName + "_diamond"}
                                    labels={[
                                        ...(viewSetting.showMultiplicities
                                            ? [
                                                {
                                                    attrs: {
                                                        text: {
                                                            text: ae.mult,
                                                        },
                                                    },
                                                    position: {
                                                        distance: 10,
                                                    },
                                                },
                                            ]
                                            : []),
                                        ...(viewSetting.showRoleNames
                                            ? [
                                                {
                                                    attrs: {
                                                        text: {
                                                            text: assocEndRoleName(ae, viewSetting),
                                                        },
                                                    },
                                                    position: {
                                                        distance: 0.2,
                                                    },
                                                },
                                            ]
                                            : []),
                                        ...(viewSetting.showAssociationNames &&
                                        !classElements.find(
                                            (c) => c.className === as.associationName
                                        )
                                            ? [
                                                {
                                                    attrs: {
                                                        text: {
                                                            text: as.associationName,
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
                                            ...(ae.kind === AssocEndKind.COMPOSITION
                                                ? {
                                                    sourceMarker: {
                                                        type: "path",
                                                        d: "M 9 -6 0 0 9 6 18 0 Z",
                                                    },
                                                }
                                                : ae.kind === AssocEndKind.AGGREGATION
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

                {linkAssClass.map((as) => (
                    <DiaLink
                        key={`link-${as.associationName}`}
                        id={`link-${as.associationName}`}
                        link={LinkToClassLink}
                        sourceId={as.associationName}
                        targetId={`${as.associationEnds[0].className}-${as.associationEnds[1].className}-${as.associationName}`}
                    />
                ))}

                {genListFiltered.map((gen) => (
                    <DiaLink
                        key={`gen-${gen.childClass}_${gen.parentClass}`}
                        id={`gen-${gen.childClass}_${gen.parentClass}`}
                        link={GeneralizationLink}
                        sourceId={gen.parentClass}
                        targetId={gen.childClass}
                    />
                ))}
            </JointDia>
        </>
    );
}

export default NewClassDiagram;
