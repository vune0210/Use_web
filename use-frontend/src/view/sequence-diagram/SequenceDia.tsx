import {forwardRef, useMemo} from "react";
import {DiaEventProps, IJointDiagramContext, JointDia} from "../../components/diagram";
import {ActorLLDiaNode} from "./dia-nodes/ActorLLDiaNode.tsx";
import {RoleLLDiaNode} from "./dia-nodes/RoleDiaNode.tsx";
import {MessageDiaLink} from "./dia-nodes/MessageDiaLink.tsx";
import {SeqMessage} from "./type/SeqMessage.ts";
import {LifeSpanDiaLink} from "./dia-nodes/LifeSpanDiaLink.tsx";

export interface SeqDiaProps {
    htmlRootId: string;
    width?: number;
    height?: number;
    onContextMenu?: DiaEventProps["onContextMenu"];
    roleList: string[];
    messageList: SeqMessage[];
}

export const SequenceDia = forwardRef<IJointDiagramContext, SeqDiaProps>(({
                                                                              htmlRootId,
                                                                              width = 800,
                                                                              height = 600,
                                                                              onContextMenu,
                                                                              roleList,
                                                                              messageList
                                                                          }, diaRef) => {

    const lifeSpan = useMemo(() => {
        let msgPair: [SeqMessage, SeqMessage][] = [];
        for (let msg of messageList) {
            if (msg.dashed) continue;
            msgPair.push([msg, messageList.find(m => m.dashed && m.from === msg.to && m.to === msg.from)!]);
        }
        return msgPair;
    }, [messageList]);

    const actorLifeSpan = useMemo(() => {
        let start: SeqMessage | null = null;
        let end: SeqMessage | null = null;

        for (let msg of messageList) {
            if (start == null && msg.from === "actor-node") start = msg;
            if (msg.to === "actor-node") end = msg;
        }
        if (start == null || end == null) return null;
        return {start, end};
    }, [messageList]);

    return <JointDia
        htmlContainerId={htmlRootId}
        ref={diaRef}
        width={width}
        height={height}
        onContextMenu={onContextMenu}
        paperProps={{
            defaultConnectionPoint: {name: 'rectangle'},
            // background: {color: '#F3F7F6'},
            moveThreshold: 5,
            linkPinning: false,
            markAvailable: true,
            preventDefaultBlankAction: false,
            restrictTranslate: function (elementView) {
                const element = elementView.model;
                const padding = (element.isEmbedded()) ? 20 : 10;
                return {
                    x: padding,
                    y: element.getBBox().y,
                    width: width - 2 * padding,
                    height: 0
                };
            },
            interactive: function (cellView) {
                const cell = cellView.model;
                return (cell.isLink())
                    ? {linkMove: false, labelMove: false}
                    : true;
            },
            // validateConnection: function (cellViewS, magnetS, cellViewT, magnetT, end, linkView) {
            //     if (cellViewS === cellViewT) return false;
            //     const type = linkView.model.get('type');
            //     const targetType = cellViewT.model.get('type');
            //     console.log("validateConnection", {type, targetType})
            //     switch (type) {
            //         case 'sd.Message': {
            //             return targetType === 'sd.Lifeline';
            //         }
            //         case 'sd.LifeSpan': {
            //             if (targetType !== 'sd.Message') return false;
            //             if (cellViewT.model.source().id !== cellViewS.model.target().id) return false;
            //             return true;
            //         }
            //     }
            // },
            highlighting: {
                connecting: {
                    name: 'addClass',
                    options: {
                        className: 'highlighted-connecting'
                    }
                }
            }
        }}
    >
        <ActorLLDiaNode id={"actor-node"} initPosition={{x: 10, y: 10}}/>
        {
            roleList.map((r, i) => <RoleLLDiaNode id={r.toLowerCase()} initPosition={{
                x: 10 + (i + 1) * (width - 20) / (roleList.length + 1),
                y: 40
            }} roleName={r}/>)
        }
        {
            messageList.map((m, i) =>
                <MessageDiaLink id={m.name} sourceLLNodeId={m.from} targetLLNodeId={m.to} labelText={m.message}
                                positionY={20 + 50 * i} dashed={m.dashed}/>
            )
        }

        {
            lifeSpan.map((ls) => <LifeSpanDiaLink id={`lifespan-${ls[0].name}-${ls[1].name}`}
                                                  sourceMsgLinkId={ls[0].name} targetMsgLinkId={ls[1].name}/>)
        }

        {
            actorLifeSpan ? <LifeSpanDiaLink id={`lifespan-actor`}
                                             sourceMsgLinkId={actorLifeSpan.end.name}
                                             targetMsgLinkId={actorLifeSpan.start.name}/> : null
        }

    </JointDia>
});