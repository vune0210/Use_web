import {forwardRef, useMemo} from "react";
import {Association, Generalization} from "../../api";
import {
    DiaEventProps,
    DiaLink,
    DiaNode,
    GeneralizationLink,
    IJointDiagramContext,
    JointDia,
    LinkToClassLink,
} from "../../components/diagram";
import {DiaDiamond1} from "../../components/diagram/components/DiaDiamond";
import {ClassElement, EnumElement} from "../../store/class-diagram/types";
import {Position} from "../../utils/types";
import {BinaryAssociationDiaLink, ClassDiaNode, CommentDiaNode, EnumDiaNode, NAryAssociateDiaLink,} from "./dia-nodes";
import {CommentNode, ViewSetting} from "./types";

export interface ClassDiaProps {
    htmlRootId: string;
    width?: number;
    height?: number;

    classes: ClassElement[];
    enums?: EnumElement[];
    associations?: Association[];
    generalizations?: Generalization[];
    commentNodes?: CommentNode[];

    viewSetting?: ViewSetting;

    onContextMenu?: DiaEventProps["onContextMenu"];
    retrieveContextMenuPosition?: () => Position;
    onNodeDblClick?: {
        commentNode?: (node: CommentNode) => any;
    };
}

const ClassDia = forwardRef<IJointDiagramContext, ClassDiaProps>(
    (
        {
            htmlRootId,
            associations = [],
            classes = [],
            commentNodes = [],
            enums = [],
            generalizations = [],
            width = 800,
            height = 600,
            viewSetting = {
                showAttributes: true,
                showOperations: false,
                showAssociationNames: false,
                showMultiplicities: false,
                showRoleNames: true,
                showUnionConstraints: true,
                showSubsetConstraints: true,
                showRefinesConstraints: true,
            },
            retrieveContextMenuPosition,
            onContextMenu,
            onNodeDblClick,
        },
        diaRef
    ) => {
        const binaryAssocList = useMemo(
            () => associations.filter((a) => a.associationEnds.length === 2),
            [associations]
        );
        const nAryAssocList = useMemo(
            () => associations.filter((a) => a.associationEnds.length > 2),
            [associations]
        );
        const linkAssClass = useMemo(
            () =>
                associations.filter(
                    (as) =>
                        classes.find((cl) => as.associationName === cl.className) != null
                ),
            [associations]
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
                ...classes,
                ...enums,
                ...nAryAssocList.map((a) => ({
                    className: a.associationName + "_diamond",
                })),
            ].reduce(
                (pre, obj, idx) => ({
                    ...pre,
                    [obj.className]: {
                        x: 100 + (idx % 3) * 200,
                        y: 100 + (idx / 3) * 200,
                    },
                }),
                commentNodePos
            );
            return pos;
        }, [commentNodes, classes, enums, nAryAssocList]);

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
                {classes.map((node) => (
                    <ClassDiaNode
                        key={node.className}
                        node={node}
                        initPosition={initPosition[node.className]}
                        showAttributes={viewSetting.showAttributes}
                        showOperations={viewSetting.showOperations}
                    />
                ))}

                {enums.map((node) => (
                    <EnumDiaNode
                        key={node.className}
                        node={node}
                        initPosition={initPosition[node.className]}
                    />
                ))}

                {binaryAssocList.map((as) => (
                    <BinaryAssociationDiaLink
                        key={as.associationName}
                        node={as}
                        viewSetting={viewSetting}
                        hasAssociationClass={
                            classes.find((c) => c.className === as.associationName) != null
                        }
                    />
                ))}

                {nAryAssocList.map((a) => (
                    <DiaNode
                        key={a.associationName + "_diamond"}
                        id={a.associationName + "_diamond"}
                        deps={[]}
                        shape={DiaDiamond1}
                        width={60}
                        height={30}
                        style={{background: "transparent"}}
                        initPosition={initPosition[a.associationName + "_diamond"]}
                    ></DiaNode>
                ))}

                {nAryAssocList
                    .map((as) =>
                        as.associationEnds.map((ae) => (
                            <NAryAssociateDiaLink
                                key={as.associationName}
                                assoc={as}
                                assocEnd={ae}
                                viewSetting={viewSetting}
                                hasAssociationClass={
                                    classes.find((c) => c.className === as.associationName) !=
                                    null
                                }
                            />
                        ))
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

                {generalizations.map((gen) => (
                    <DiaLink
                        key={`gen-${gen.childClass}_${gen.parentClass}`}
                        id={`gen-${gen.childClass}_${gen.parentClass}`}
                        link={GeneralizationLink}
                        sourceId={gen.parentClass}
                        targetId={gen.childClass}
                    />
                ))}
            </JointDia>
        );
    }
);
export type ClassDiaComp = typeof ClassDia;

export default ClassDia;
