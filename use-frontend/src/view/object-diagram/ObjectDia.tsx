import {forwardRef, useMemo} from "react";
import {Link, Object} from "../../api";
import {DiaEventProps, DiaLink, DiaNode, IJointDiagramContext, JointDia,} from "../../components/diagram";
import {DiaDiamond1} from "../../components/diagram/components/DiaDiamond";
import {Position} from "../../utils/types";
import {ViewSetting} from "./types";
import {BinaryLinkDiaLink, LinkToObjectLink, NAryLinkDiaLink, ObjectDiaNode} from "./dia-nodes";

import {CommentDiaNode} from "../class-diagram/dia-nodes";
import {CommentNode} from "../class-diagram/types";

export interface ObjectDiaProps {
    htmlRootId: string;
    width?: number;
    height?: number;

    objects: Object[];
    links?: Link[];
    commentNodes?: CommentNode[];

    viewSetting?: ViewSetting;

    onContextMenu?: DiaEventProps["onContextMenu"];
    retrieveContextMenuPosition?: () => Position;
    onNodeDblClick?: {
        commentNode?: (node: CommentNode) => any;
    };
}

const ObjectDia = forwardRef<IJointDiagramContext, ObjectDiaProps>(
    (
        {
            htmlRootId,
            objects = [],
            commentNodes = [],
            links = [],
            width = 800,
            height = 600,
            viewSetting = {
                showAttributes: true,
                showAssociationNames: false,
                showRoleNames: true,
                showStates: true,
            },
            retrieveContextMenuPosition,
            onContextMenu,
            onNodeDblClick,
        },
        diaRef
    ) => {
        const binaryLinks = useMemo(
            () => links.filter((a) => a.linkEnds.length === 2),
            [links]
        );
        const nAryLink = useMemo(
            () => links.filter((a) => a.linkEnds.length > 2),
            [links]
        );
        const linkAssoClass = links.filter(
            (as) =>
                objects.find((oj) => as.fAssociationName === oj.fClassName) !=
                null
        );

        const initPosition = useMemo(() => {
            const commentNodePos = commentNodes.reduce(
                (pre, obj) => ({
                    ...pre,
                    [obj.id]: retrieveContextMenuPosition?.() ?? {x: 0, y: 0},
                }),
                {} as Record<string, Position>
            );
            const pos = [
                ...objects,
                ...nAryLink.map((a) => ({
                    fLabel: a.fAssociationName + "_diamond",
                })),
            ].reduce(
                (pre, obj, idx) => ({
                    ...pre,
                    [obj.fLabel]: {
                        x: 100 + (idx % 3) * 200,
                        y: 100 + (idx / 3) * 200,
                    },
                }),
                commentNodePos
            );
            return pos;
        }, [commentNodes, objects, nAryLink]);

        return (
            <JointDia
                htmlContainerId={htmlRootId}
                ref={diaRef}
                width={width}
                height={height}
                onContextMenu={onContextMenu}
            >
                {commentNodes.map((node) => (
                    <CommentDiaNode
                        key={node.id}
                        node={node}
                        initPosition={initPosition[node.id]}
                        onDblClick={() => onNodeDblClick?.commentNode?.(node)}
                    />
                ))}
                {objects.map((node) => (
                    <ObjectDiaNode
                        key={node.fLabel}
                        node={node}
                        initPosition={initPosition[node.fLabel]}
                        showAttributes={viewSetting.showAttributes}
                        showStates={viewSetting.showStates}
                    />
                ))}

                {binaryLinks.map((as) => (
                    <BinaryLinkDiaLink
                        key={as.fAssociationName}
                        node={as}
                        viewSetting={viewSetting}
                    />
                ))}

                {nAryLink.map((a) => (
                    <DiaNode
                        key={a.fAssociationName + "_diamond"}
                        id={a.fAssociationName + "_diamond"}
                        deps={[]}
                        shape={DiaDiamond1}
                        width={60}
                        height={30}
                        style={{background: "transparent"}}
                        initPosition={initPosition[a.fAssociationName + "_diamond"]}
                    ></DiaNode>
                ))}

                {nAryLink
                    .map((lk) =>
                        lk.linkEnds.map((le) => (
                            <NAryLinkDiaLink
                                key={lk.fAssociationName}
                                link={lk}
                                linkEnd={le}
                                viewSetting={viewSetting}
                            />
                        ))
                    )
                    .flat()}

                {linkAssoClass.map((as) => (
                    <DiaLink
                        key={`link-${as.fAssociationName}`}
                        id={`link-${as.fAssociationName}`}
                        link={LinkToObjectLink}
                        sourceId={as.fAssociationName}
                        targetId={`${as.linkEnds[0].fLabel}-${as.linkEnds[1].fLabel}-${as.fAssociationName}`}
                    />
                ))}

            </JointDia>
        );
    }
);
export type ObjectDiaComp = typeof ObjectDia;

export default ObjectDia;
