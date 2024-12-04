package org.tzi.use.usebackend.api_resp.uml.sys.events;

public class AttributeAssignedEvent extends Event {
    public String objectName;
    public String attributeName;
    public String value;

    public AttributeAssignedEvent(org.tzi.use.uml.sys.events.AttributeAssignedEvent event) {
        super(event, "AttributeAssignedEvent");
        this.objectName = event.getObject().name();
        this.attributeName = event.getAttribute().toString();
        this.value = event.getValue().toString();
    }

}
