import React, {useContext, useEffect} from "react";
import {DiaNode, JointDiagramContext} from "../../../components/diagram";
import {Position} from "../../../components/diagram/types";
import {ActorShape} from "./ActorShape.ts";
import {LifelineLink} from "./LifelineLink.tsx";

interface Props {
    id?: string;
    initPosition: Position;
    maxHeight?: number;
}

export const ActorLLDiaNode: React.FC<Props> = ({id = "actor-node", initPosition, maxHeight = 600}) => {
    const {graph, paper} = useContext(JointDiagramContext);
    useEffect(() => {
        if (graph == null) return;
        const node = graph?.getCell("actor-node");
        if (node != null) {
            const lifeline = new LifelineLink({id: `${id}-ll`})
            lifeline.attachToRole(graph?.getCell(id), maxHeight);
            lifeline.addTo(graph);
        }
    }, [graph]);
    return <DiaNode id={id} initPosition={initPosition} deps={[]} shape={ActorShape} width={40} height={80}>
    </DiaNode>
}