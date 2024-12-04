import React from "react";
import {DiaLink} from "../../../components/diagram";
import {LifeSpanLink} from "./LifeSpanLink.ts";

interface Props {
    id: string;
    sourceMsgLinkId: string;
    targetMsgLinkId: string;
}

export const LifeSpanDiaLink: React.FC<Props> = ({id, sourceMsgLinkId, targetMsgLinkId}) => {
    return <DiaLink id={id} link={LifeSpanLink} sourceId={sourceMsgLinkId} targetId={targetMsgLinkId}
                    sourceProps={{
                        anchor: {
                            args: {
                                ratio: 1
                            },
                            name: 'connectionRatio'
                        }
                    }}
                    targetProps={{
                        anchor: {
                            args: {
                                ratio: 0
                            },
                            name: 'connectionRatio'
                        }
                    }}
                    attr={{
                        line: {
                            strokeWidth: "12px",
                            stroke: "black",
                            strokeLinecap: "square"
                        },

                    }}
    />
}