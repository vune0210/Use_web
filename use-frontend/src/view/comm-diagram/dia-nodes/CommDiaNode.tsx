import {Position} from "../../../utils/types";
import {DiaNode} from "../../../components/diagram";
import React from "react";
import "./CommDiaNode.css"

interface Props {
    id: string;
    name: string;
    initPosition: Position;
}

const height = 30;
const width = 120;

export const CommDiaNode: React.FC<Props> = ({id, name, initPosition}) => {
    return <DiaNode id={id} initPosition={initPosition} deps={[]} width={width} height={height}>
        <div className="dia-node comm-node" style={{height, width, lineHeight: `${height}px`}}>
            {name}
        </div>
    </DiaNode>
}