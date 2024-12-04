package org.tzi.use.usebackend.api_resp.uml.sys.events;

public class ObjectDestroyedEvent extends Event {
    public String destroyedObjectName;
    public ObjectDestroyedEvent(org.tzi.use.uml.sys.events.ObjectDestroyedEvent event) {
        super(event, "ObjectDestroyedEvent");
        this.destroyedObjectName = event.getDestroyedObject().name();
    }
}
