import React from "react";
import {DiaLink} from "../../../components/diagram";
import {MessageLink} from "./MessageLink.ts";

interface Props {
    id: string;
    sourceLLNodeId: string;
    targetLLNodeId: string;
    labelText: string;
    positionY: number;
    dashed: boolean;
}

export const MessageDiaLink: React.FC<Props> = ({id, sourceLLNodeId, targetLLNodeId, labelText, positionY, dashed}) => {
    return <DiaLink id={id} link={MessageLink} sourceId={`${sourceLLNodeId}-ll`} targetId={`${targetLLNodeId}-ll`}
                    labels={[{attrs: {labelText: {text: labelText}}}]}
                    sourceProps={{
                        anchor: {
                            args: {
                                length: positionY,
                            },
                            name: 'connectionLength'
                        }
                    }}
                    targetProps={{
                        anchor: {
                            name: 'connectionPerpendicular'
                        }
                    }}
                    attr={dashed ? {
                        line: {
                            stroke: '#A0A0A0',
                            strokeWidth: 1,
                            strokeDasharray: '8,3',
                        }
                    } : undefined}
    />
}