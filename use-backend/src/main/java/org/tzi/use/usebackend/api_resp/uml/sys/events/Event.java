package org.tzi.use.usebackend.api_resp.uml.sys.events;

import org.tzi.use.uml.sys.events.AttributeAssignedEvent;
import org.tzi.use.uml.sys.events.LinkDeletedEvent;
import org.tzi.use.uml.sys.events.LinkInsertedEvent;
import org.tzi.use.uml.sys.events.ObjectCreatedEvent;
import org.tzi.use.uml.sys.events.ObjectDestroyedEvent;
import org.tzi.use.uml.sys.events.OperationEnteredEvent;
import org.tzi.use.uml.sys.events.OperationExitedEvent;
import org.tzi.use.uml.sys.events.tags.EventContext;

public class Event {
    private final EventContext context;
    public String type;
    Event(org.tzi.use.uml.sys.events.Event event, String type) {
        this.context = event.getContext();
        this.type = type;
    }

    public EventContext getContext() {
        return context;
    }

    public static Event newEvent(org.tzi.use.uml.sys.events.Event event) {
        if (event instanceof ObjectCreatedEvent) {
            return new org.tzi.use.usebackend.api_resp.uml.sys.events.ObjectCreatedEvent((ObjectCreatedEvent) event);
        } else if (event instanceof ObjectDestroyedEvent) {
            return new org.tzi.use.usebackend.api_resp.uml.sys.events.ObjectDestroyedEvent((ObjectDestroyedEvent) event);
        } else if (event instanceof OperationEnteredEvent) {
            return new org.tzi.use.usebackend.api_resp.uml.sys.events.OperationEnteredEvent((OperationEnteredEvent) event);
        } else if (event instanceof AttributeAssignedEvent) {
            return new org.tzi.use.usebackend.api_resp.uml.sys.events.AttributeAssignedEvent((AttributeAssignedEvent) event);
        } else if (event instanceof OperationExitedEvent) {
            return new org.tzi.use.usebackend.api_resp.uml.sys.events.OperationExitedEvent((OperationExitedEvent) event);
        } else if (event instanceof LinkInsertedEvent) {
            return new org.tzi.use.usebackend.api_resp.uml.sys.events.LinkInsertedEvent((LinkInsertedEvent) event);
        } else if (event instanceof LinkDeletedEvent) {
            return new org.tzi.use.usebackend.api_resp.uml.sys.events.LinkDeletedEvent((LinkDeletedEvent) event);
        }
        return new Event(event, "?");
    }
}
