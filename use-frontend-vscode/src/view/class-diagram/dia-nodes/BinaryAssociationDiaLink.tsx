import {AssocEndKind, Association} from "../../../api";
import {ClassToClassLink, DiaLink} from "../../../components/diagram";
import {ViewSetting} from "../types";
import {assocEndRoleName} from "../utils";

interface Props {
    node: Association;
    viewSetting: ViewSetting;
    hasAssociationClass: boolean;
}

export function BinaryAssociatopmDiaLink(props: Props) {
    let sourceEnd = props.node.associationEnds[0];
    let targetEnd = props.node.associationEnds[1];
    // for reflexive associations with exactly one qualifier
    // the qualifier end must be the source!
    if (
        !props.node.isAssociationClass &&
        props.node.associatedClasses.length === 1 &&
        props.node.associationEnds[1].qualifiers.length > 0 &&
        props.node.associationEnds[0].qualifiers.length === 0
    ) {
        sourceEnd = props.node.associationEnds[1];
        targetEnd = props.node.associationEnds[0];
    }
    return (
        <DiaLink
            key={`${sourceEnd.className}-${targetEnd.className}-${props.node.associationName}`}
            id={`${sourceEnd.className}-${targetEnd.className}-${props.node.associationName}`}
            link={ClassToClassLink}
            sourceId={sourceEnd.className}
            targetId={targetEnd.className}
            labels={[
                ...(props.viewSetting.showMultiplicities
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
                ...(props.viewSetting.showRoleNames
                    ? [
                        {
                            attrs: {
                                text: {
                                    text: assocEndRoleName(sourceEnd, props.viewSetting),
                                },
                            },
                            position: {
                                distance: 0.2,
                            },
                        },
                    ]
                    : []),
                ...(props.viewSetting.showAssociationNames && !props.hasAssociationClass
                    ? [
                        {
                            attrs: {
                                text: {
                                    text: props.node.associationName,
                                },
                            },
                            position: {
                                distance: 0.5,
                            },
                        },
                    ]
                    : []),

                ...(props.viewSetting.showRoleNames
                    ? [
                        {
                            attrs: {
                                text: {
                                    text: assocEndRoleName(targetEnd, props.viewSetting),
                                },
                            },
                            position: {
                                distance: 0.8,
                            },
                        },
                    ]
                    : []),

                ...(props.viewSetting.showMultiplicities
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
}
