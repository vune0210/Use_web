import React, {forwardRef} from "react";
import {DiaEventProps, IJointDiagramContext, JointDia} from "../../components/diagram";
import {ActorDiaNode} from "./dia-nodes/ActorDiaNode.tsx";
import {CommMessage} from "./type/CommMessage.ts";
import {CommDiaNode} from "./dia-nodes/CommDiaNode.tsx";
import {CommMsgDiaLink} from "./dia-nodes/CommMsgDiaLink.tsx";
import {RoleItem} from "./type/RoleItem.ts";

export interface SeqDiaProps {
    htmlRootId: string;
    width?: number;
    height?: number;
    onContextMenu?: DiaEventProps["onContextMenu"];
    roleList: RoleItem[];
    messageList: CommMessage[];
}

export const CommunicationDia = forwardRef<IJointDiagramContext, SeqDiaProps>(({
                                                                                   htmlRootId,
                                                                                   width = 800,
                                                                                   height = 600,
                                                                                   onContextMenu,
                                                                                   roleList,
                                                                                   messageList
                                                                               }, diaRef) => {

    return <JointDia
        htmlContainerId={htmlRootId}
        ref={diaRef}
        width={width}
        height={height}
        onContextMenu={onContextMenu}
    >
        <ActorDiaNode id={"actor-node"} initPosition={{x: 10, y: 10}}/>
        {
            roleList.map((r, i) => <CommDiaNode id={r.id} initPosition={{
                x: 100 + i % 3 * ((width - 200) / 3),
                y: 30 + Math.floor(i / 3) * 200
            }} name={r.name}/>)
        }
        {
            messageList.map((m, i) =>
                <CommMsgDiaLink id={"link" + i} message={m}/>
            )
        }
    </JointDia>
});