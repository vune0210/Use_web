import {Link} from "../../../api";
import {ClassToClassLink, DiaLink} from "../../../components/diagram";
import {ViewSetting} from "../types";
import {assocEndRoleName} from "../utils";
import {LinkToObjectLink} from "./LinkAssociationDiaLink.tsx";

interface Props {
    node: Link;
    viewSetting: ViewSetting;
}

export function BinaryLinkDiaLink(props: Props) {
    let sourceEnd = props.node.linkEnds[0];
    let targetEnd = props.node.linkEnds[1];

    return (
        <DiaLink
            key={`${sourceEnd.fLabel}-${targetEnd.fLabel}-${props.node.fAssociationName}`}
            id={`${sourceEnd.fLabel}-${targetEnd.fLabel}-${props.node.fAssociationName}`}
            link={props.node.isVirtual ? LinkToObjectLink : ClassToClassLink}
            sourceId={sourceEnd.fLabel}
            targetId={targetEnd.fLabel}
            labels={[
                ...(props.viewSetting.showRoleNames
                    ? [
                        {
                            attrs: {
                                text: {
                                    text: assocEndRoleName(sourceEnd.fAssociationEnd),
                                },
                            },
                            position: {
                                distance: 0.2,
                            },
                        },
                    ]
                    : []),
                ...(props.viewSetting.showAssociationNames
                    ? [
                        {
                            attrs: {
                                text: {
                                    text: props.node.fAssociationName,
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
                                    text: assocEndRoleName(targetEnd.fAssociationEnd),
                                },
                            },
                            position: {
                                distance: 0.8,
                            },
                        },
                    ]
                    : []),


            ]}
            // attr={{
            //     line: {
            //         ...(sourceEnd.kind === AssocEndKind.COMPOSITION
            //             ? {
            //                 sourceMarker: {
            //                     type: "path",
            //                     d: "M 9 -6 0 0 9 6 18 0 Z",
            //                 },
            //             }
            //             : sourceEnd.kind === AssocEndKind.AGGREGATION
            //                 ? {
            //                     sourceMarker: {
            //                         type: "path",
            //                         "stroke-width": 1,
            //                         fill: "white",
            //                         d: "M 9 -6 0 0 9 6 18 0 Z",
            //                     },
            //                 }
            //                 : {}),
            //
            //         ...(targetEnd.kind === AssocEndKind.COMPOSITION
            //             ? {
            //                 targetMarker: {
            //                     type: "path",
            //                     d: "M 9 -6 0 0 9 6 18 0 Z",
            //                 },
            //             }
            //             : targetEnd.kind === AssocEndKind.AGGREGATION
            //                 ? {
            //                     targetMarker: {
            //                         type: "path",
            //                         "stroke-width": 1,
            //                         fill: "white",
            //                         d: "M 9 -6 0 0 9 6 18 0 Z",
            //                     },
            //                 }
            //                 : {}),
            //     },
            // }}
        />
    );
}
