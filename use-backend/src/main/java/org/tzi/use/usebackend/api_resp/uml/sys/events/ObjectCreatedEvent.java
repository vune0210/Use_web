package org.tzi.use.usebackend.api_resp.uml.sys.events;

public class ObjectCreatedEvent extends Event {
    public String createdObjectName;
    public ObjectCreatedEvent(org.tzi.use.uml.sys.events.ObjectCreatedEvent event) {
        super(event, "ObjectCreatedEvent");
        this.createdObjectName = event.getCreatedObject().name();
    }
}
