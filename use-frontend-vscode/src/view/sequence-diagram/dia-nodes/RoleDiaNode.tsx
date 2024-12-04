import React, {useContext, useEffect} from "react";
import {DiaNode, JointDiagramContext} from "../../../components/diagram";
import {Position} from "../../../components/diagram/types";
import {LifelineLink} from "./LifelineLink.tsx";

interface Props {
    id: string;
    initPosition: Position;
    roleName: string;
    maxHeight?: number;
}

export const RoleLLDiaNode: React.FC<Props> = ({id, roleName, initPosition, maxHeight = 600}) => {
    const {graph, paper} = useContext(JointDiagramContext);
    useEffect(() => {
        if (graph == null) return;
        const node = graph?.getCell("actor-node");
        if (node != null) {
            const lifeline = new LifelineLink(({id: `${id}-ll`}))
            lifeline.attachToRole(graph?.getCell(id), maxHeight);
            lifeline.addTo(graph);
        }
    }, [graph, id]);
    return <DiaNode id={id} initPosition={initPosition} deps={[]} width={120} height={80}>
        <div style={{width: 120, height: 80, textAlign: "center", lineHeight: "80px"}}>
            {roleName}
        </div>
    </DiaNode>
}