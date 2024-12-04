import React from "react";
import {DiaNode} from "../../../components/diagram";
import {Position} from "../../../components/diagram/types";
import {ActorShape} from "../../sequence-diagram/dia-nodes/ActorShape.ts";

interface Props {
    id: string;
    initPosition: Position;
}

export const ActorDiaNode: React.FC<Props> = (props) => {
    return <DiaNode id={props.id} initPosition={props.initPosition} deps={[]} shape={ActorShape} width={40} height={80}>
    </DiaNode>
}