import React, {useEffect, useMemo} from "react";
import {useAppDispatch, useAppSelector} from "../../store/hook.ts";
import {loadEventThunk} from "../../store/seq-diagram/loadEventThunk.ts";
import {SequenceDia} from "./SequenceDia.tsx";
import {ObjectCreatedEvent, OperationEnteredEvent, OperationExitedEvent} from "../../api/view/types/EventResp.ts";
import {SeqMessage} from "./type/SeqMessage.ts";

export const AppSeqDia: React.FC = () => {
    const events = useAppSelector(state => state.events.events);
    const createObjectEvents: ObjectCreatedEvent[] = useMemo(() => events.filter(e => e.type === "ObjectCreatedEvent"), [events]);
    const operationEvents: SeqMessage[] = useMemo(() => {
        const stack: string[] = [];
        const messages: SeqMessage[] = [];
        for (let e of events) {
            if (e.type === "OperationEnteredEvent" || e.type === "OperationExitedEvent") {
                const target = e.operationCallString.split(".")[0]
                if (e.type === "OperationEnteredEvent") {
                    messages.push({
                        from: stack[stack.length - 1] ?? "actor-node",
                        to: target,
                        message: e.operationCallString.split(".").slice(1).join(".")
                    });
                    if (e.enteredSuccessfully) {
                        stack.push(target);
                    }
                }
                if (e.type === "OperationExitedEvent") {
                    messages.push({
                        from: stack.pop(),
                        to: stack[stack.length - 1] ?? "actor-node",
                        message: e.operationCallString.split(".").slice(1).join(".")
                    });
                }

            }
        }
        return messages;
    }, [events]);
    console.log(operationEvents)
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(loadEventThunk());
    }, []);
    return <SequenceDia htmlRootId={"seq-dia"} roleList={createObjectEvents.map(e => e.createdObjectName)}
                        messageList={operationEvents}/>
}