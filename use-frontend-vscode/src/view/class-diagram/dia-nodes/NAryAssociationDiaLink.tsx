import {AssocEnd, AssocEndKind, Association} from "../../../api";
import {ClassToClassLink, DiaLink} from "../../../components/diagram";
import {ViewSetting} from "../types";
import {assocEndRoleName} from "../utils";

interface Props {
    assoc: Association;
    assocEnd: AssocEnd;
    viewSetting: ViewSetting;
    hasAssociationClass: boolean;
}

export function NAryAssociateDiaLink(props: Props) {
    return (
        <DiaLink
            key={`${props.assocEnd.className}.${props.assocEnd.rolename}-${
                props.assoc.associationName + "_diamond"
            }`}
            id={`${props.assocEnd.className}.${props.assocEnd.rolename}-${
                props.assoc.associationName + "_diamond"
            }`}
            link={ClassToClassLink}
            sourceId={props.assocEnd.className}
            targetId={props.assoc.associationName + "_diamond"}
            labels={[
                ...(props.viewSetting.showMultiplicities
                    ? [
                        {
                            attrs: {
                                text: {
                                    text: props.assocEnd.mult,
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
                                    text: assocEndRoleName(props.assocEnd, props.viewSetting),
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
                                    text: props.assoc.associationName,
                                },
                            },
                            position: {
                                distance: 0.5,
                            },
                        },
                    ]
                    : []),
            ]}
            attr={{
                line: {
                    ...(props.assocEnd.kind === AssocEndKind.COMPOSITION
                        ? {
                            sourceMarker: {
                                type: "path",
                                d: "M 9 -6 0 0 9 6 18 0 Z",
                            },
                        }
                        : props.assocEnd.kind === AssocEndKind.AGGREGATION
                            ? {
                                sourceMarker: {
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
