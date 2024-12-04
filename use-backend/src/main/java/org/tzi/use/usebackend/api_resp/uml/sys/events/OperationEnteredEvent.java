package org.tzi.use.usebackend.api_resp.uml.sys.events;

public class OperationEnteredEvent extends Event {
    public String operationCallString;
    public boolean enteredSuccessfully;

    public OperationEnteredEvent(org.tzi.use.uml.sys.events.OperationEnteredEvent event) {
        super(event, "OperationEnteredEvent");
        this.operationCallString = event.getOperationCall().toLegacyString();
        this.enteredSuccessfully = event.getOperationCall().enteredSuccessfully();
    }
}
