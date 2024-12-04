package org.tzi.use.usebackend.api_resp.uml.sys.events;

import org.tzi.use.usebackend.api_resp.uml.sys.Link;

public class LinkDeletedEvent extends Event{
    public Link link;

    public LinkDeletedEvent(org.tzi.use.uml.sys.events.LinkDeletedEvent event) {
        super(event, "LinkDeletedEvent");
        this.link = new Link(event.getLink());
    }
}
