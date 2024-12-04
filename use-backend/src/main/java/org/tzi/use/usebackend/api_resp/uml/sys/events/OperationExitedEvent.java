package org.tzi.use.usebackend.api_resp.uml.sys.events;

public class OperationExitedEvent extends Event{
    public String operationCallString;

    public OperationExitedEvent(org.tzi.use.uml.sys.events.OperationExitedEvent event) {
        super(event, "OperationExitedEvent");
        this.operationCallString = event.getOperationCall().toLegacyString();
    }
}
