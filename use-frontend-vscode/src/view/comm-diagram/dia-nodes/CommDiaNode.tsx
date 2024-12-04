import {Position} from "../../../utils/types";
import {DiaNode} from "../../../components/diagram";
import React from "react";

interface Props {
    id: string;
    name: string;
    initPosition: Position;
}

export const CommDiaNode: React.FC<Props> = ({id, name, initPosition}) => {
    return <DiaNode id={id} deps={[]} initPosition={initPosition} width={120} height={40}>
        <div style={{width: 120, height: 40, textAlign: "center", lineHeight: "40px"}}>
            {name}
        </div>
    </DiaNode>
}