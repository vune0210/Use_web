import React, {forwardRef} from "react";
import {DiaEventProps, IJointDiagramContext, JointDia} from "../../components/diagram";
import {ActorLLDiaNode} from "./dia-nodes/ActorLLDiaNode.tsx";
import {RoleLLDiaNode} from "./dia-nodes/RoleDiaNode.tsx";
import {MessageDiaLink} from "./dia-nodes/MessageDiaLink.tsx";
import {SeqMessage} from "./type/SeqMessage.ts";

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

    return <JointDia
        htmlPaperId={htmlRootId}
        ref={diaRef}
        width={width}
        height={height}
        onContextMenu={onContextMenu}
        paperProps={{
            defaultConnectionPoint: {name: 'rectangle'},
            background: {color: '#F3F7F6'},
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
            // defaultLink: function (sourceView) {
            //     const type = sourceView.model.get('type');
            //     switch (type) {
            //         case 'sd.Message': {
            //             return new LifelineLink();
            //         }
            //         case 'sd.Lifeline': {
            //             return new MessageLink();
            //         }
            //     }
            //     throw new Error('Unknown link type.');
            // },
            // connectionStrategy: function (end, cellView, magnet, p, link, endType) {
            //     const type = link.get('type');
            //     console.log("connectionStrategy", {type})
            //     switch (type) {
            //         case 'sd.LifeSpan': {
            //             if (endType === 'source') {
            //                 end.anchor = {name: 'connectionRatio', args: {ratio: 1}};
            //             } else {
            //                 end.anchor = {name: 'connectionRatio', args: {ratio: 0}};
            //             }
            //             return end;
            //         }
            //         case 'sd.Message': {
            //             if (endType === 'source') {
            //                 return connectionStrategies.pinAbsolute.call(paper, end, cellView, magnet, p, link, endType);
            //             } else {
            //                 end.anchor = {name: 'connectionPerpendicular'};
            //                 return end;
            //             }
            //         }
            //     }
            // },
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
                y: 0
            }} roleName={r}/>)
        }
        {
            messageList.map((m, i) =>
                <MessageDiaLink id={"link" + i} sourceLLNodeId={m.from} targetLLNodeId={m.to} labelText={m.message}
                                positionY={20 + 50 * i}/>
            )
        }
    </JointDia>
});