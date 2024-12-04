import React from "react";
import {DiaLink} from "../../../components/diagram";
import {MessageLink} from "./MessageLink.tsx";

interface Props {
    id: string;
    sourceLLNodeId: string;
    targetLLNodeId: string;
    labelText: string;
    positionY: number;
}

export const MessageDiaLink: React.FC<Props> = ({id, sourceLLNodeId, targetLLNodeId, labelText, positionY}) => {
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
    />
}