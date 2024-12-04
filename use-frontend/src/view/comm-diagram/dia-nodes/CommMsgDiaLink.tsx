import React from "react";
import {DiaLink} from "../../../components/diagram";
import {CommMessage} from "../type/CommMessage.ts";
import {MessageLink} from "../../sequence-diagram/dia-nodes/MessageLink.ts";

interface Props {
    id: string;
    message: CommMessage;
}

export const CommMsgDiaLink: React.FC<Props> = ({id, message}) => {
    return <DiaLink id={id} link={MessageLink} sourceId={message.from} targetId={message.to}
                    labels={[{attrs: {labelText: {text: `${message.number} ${message.message}`}}}]}
    />
}