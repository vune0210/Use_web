package org.tzi.use.usebackend.api_resp.uml.sys.events;

import org.tzi.use.usebackend.api_resp.uml.sys.Link;

public class LinkInsertedEvent extends Event{
    public Link link;

    public LinkInsertedEvent(org.tzi.use.uml.sys.events.LinkInsertedEvent event) {
        super(event, "LinkInsertedEvent");
        this.link = new Link(event.getLink());
    }
}
