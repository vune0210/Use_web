import {AssocEndKind, Link, LinkEnd} from "../../../api";
import {ClassToClassLink, DiaLink} from "../../../components/diagram";
import {ViewSetting} from "../types";
import {assocEndRoleName} from "../utils";

interface Props {
    link: Link;
    linkEnd: LinkEnd;
    viewSetting: ViewSetting;
    hasAssociationObject: boolean;
}

export const NAryLinkDiaLink = (props: Props) => {
    return (
        <DiaLink
            key={`${props.linkEnd.fLabel}.${props.linkEnd.fAssociationEnd.rolename}-${
                props.link.fAssociationName + "_diamond"
            }`}
            id={`${props.linkEnd.fLabel}.${props.linkEnd.fAssociationEnd.rolename}-${
                props.link.fAssociationName + "_diamond"
            }`}
            link={ClassToClassLink}
            sourceId={props.linkEnd.fLabel}
            targetId={
                props.link.fAssociationName +
                props.link.linkEnds.map((le) => le.fLabel).join(",") +
                "_diamond"
            }
            labels={[
                // ...(props.viewSetting.showMultiplicities
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
                ...(props.viewSetting.showRoleNames
                    ? [
                        {
                            attrs: {
                                text: {
                                    text: assocEndRoleName(
                                        props.linkEnd.fAssociationEnd,
                                        props.viewSetting
                                    ),
                                },
                            },
                            position: {
                                distance: 0.2,
                            },
                        },
                    ]
                    : []),
                ...(props.viewSetting.showAssociationNames &&
                !props.hasAssociationObject
                    ? [
                        {
                            attrs: {
                                text: {
                                    text: props.link.fAssociationName,
                                },
                            },
                            position: {
                                distance: 0.5,
                            },
                        },
                    ]
                    : []),

                // ...(props.viewSetting.showRoleNames
                //   ? [
                //       {
                //         attrs: {
                //           text: {
                //             text: assocEndRoleName(targetEnd, props.viewSetting),
                //           },
                //         },
                //         position: {
                //           distance: 0.8,
                //         },
                //       },
                //     ]
                //   : []),

                // ...(props.viewSetting.showMultiplicities
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
                    ...(props.linkEnd.fAssociationEnd.kind === AssocEndKind.COMPOSITION
                        ? {
                            sourceMarker: {
                                type: "path",
                                d: "M 9 -6 0 0 9 6 18 0 Z",
                            },
                        }
                        : props.linkEnd.fAssociationEnd.kind === AssocEndKind.AGGREGATION
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
};
