import React, {useEffect, useMemo} from "react";
import {useAppDispatch, useAppSelector} from "../../store/hook.ts";
import {loadEventThunk} from "../../store/seq-diagram/loadEventThunk.ts";
import {
    AttributeAssignedEvent,
    LinkDeletedEvent,
    LinkInsertedEvent,
    ObjectCreatedEvent,
    ObjectDestroyedEvent
} from "../../api/view/types/EventResp.ts";
import {CommunicationDia} from "./CommunicationDia.tsx";
import {CommMessage} from "./type/CommMessage.ts";
import {RoleItem} from "./type/RoleItem.ts";

class SeqNumber {
    sequenceNumbers: number[] = [1];

    raise() {
        if (this.sequenceNumbers.length > 0) {
            const lastNumber = this.sequenceNumbers[this.sequenceNumbers.length - 1];
            this.sequenceNumbers[this.sequenceNumbers.length - 1] = lastNumber + 1;
        }
    }

    opEnter() {
        this.sequenceNumbers.push(1);
    }

    opExit() {
        this.sequenceNumbers.pop();
    }

    get() {
        return this.sequenceNumbers.join(".");
    }
}

export const AppCommDia: React.FC = () => {
    const events = useAppSelector(state => state.events.events);
    const createObjectEvents: ObjectCreatedEvent[] = useMemo(() => events.filter(e => e.type === "ObjectCreatedEvent"), [events]);
    const createLinkEvents: LinkInsertedEvent[] = useMemo(() => events.filter(e => e.type === "LinkInsertedEvent"), [events]);
    const operationEvents: CommMessage[] = useMemo(() => {
        const stack: string[] = [];
        const seqNo = new SeqNumber();
        const messages: CommMessage[] = [];
        for (let e of events) {
            if (e.type === "ObjectCreatedEvent") {
                messages.push({
                    number: seqNo.get(),
                    from: stack[stack.length - 1] ?? "actor-node",
                    to: (e as ObjectCreatedEvent).createdObjectName,
                    message: "create"
                });
                seqNo.raise();
            }
            if (e.type === "ObjectDestroyedEvent") {
                messages.push({
                    number: seqNo.get(),
                    from: stack[stack.length - 1] ?? "actor-node",
                    to: (e as ObjectDestroyedEvent).destroyedObjectName,
                    message: "delete"
                });
                seqNo.raise();
            }
            if (e.type === "LinkInsertedEvent") {
                const link: LinkInsertedEvent["link"] = (e as LinkInsertedEvent).link;
                const linkNodeName = `${link.fAssociationName}-${link.linkEnds[0].fObjectName}-${link.linkEnds[1].fObjectName}`
                messages.push({
                    number: seqNo.get(),
                    from: stack[stack.length - 1] ?? "actor-node",
                    to: linkNodeName,
                    message: "create"
                }, {
                    number: "",
                    from: linkNodeName,
                    to: link.linkEnds[0].fObjectName,
                    message: ""
                }, {
                    number: "",
                    from: linkNodeName,
                    to: link.linkEnds[1].fObjectName,
                    message: ""
                });
                seqNo.raise();
            }
            if (e.type === "LinkDeletedEvent") {
                const link: LinkInsertedEvent["link"] = (e as LinkInsertedEvent).link;
                const linkNodeName = `${link.fAssociationName}-${link.linkEnds[0].fObjectName}-${link.linkEnds[1].fObjectName}`
                messages.push({
                    number: seqNo.get(),
                    from: stack[stack.length - 1] ?? "actor-node",
                    to: linkNodeName,
                    message: "delete"
                });
                seqNo.raise();
            }
            if (e.type === "AttributeAssignedEvent") {
                messages.push({
                    number: seqNo.get(),
                    from: stack[stack.length - 1] ?? "actor-node",
                    to: (e as AttributeAssignedEvent).objectName,
                    message: `set ${e.attributeName}:= ${e.value}`
                });
                seqNo.raise();
            }
            if (e.type === "OperationEnteredEvent" || e.type === "OperationExitedEvent") {
                const target = e.operationCallString.split(".")[0]
                if (e.type === "OperationEnteredEvent") {
                    messages.push({
                        number: seqNo.get(),
                        from: stack[stack.length - 1] ?? "actor-node",
                        to: target,
                        message: e.operationCallString.split(".").slice(1).join(".")
                    });
                    stack.push(target);
                    seqNo.opEnter();
                }
                if (e.type === "OperationExitedEvent") {
                    const from = stack.pop();
                    seqNo.opExit()
                    messages.push({
                        number: seqNo.get(),
                        from,
                        to: stack[stack.length - 1] ?? "actor-node",
                        message: e.operationCallString.split(".").slice(1).join(".")
                    });
                    seqNo.raise();
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

    const roleList: RoleItem[] = [...createObjectEvents.map(e => ({
        id: e.createdObjectName,
        name: e.createdObjectName
    })), ...createLinkEvents.reduce((pre, e) => [...pre, {
        id: `${e.link.fAssociationName}-${e.link.linkEnds[0].fObjectName}-${e.link.linkEnds[1].fObjectName}`,
        name: e.link.fAssociationName
    }], [] as RoleItem[])];
    console.log("roleList", roleList)

    return <CommunicationDia htmlRootId={"seq-dia"} roleList={roleList}
                             messageList={operationEvents}/>
}