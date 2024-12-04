package org.tzi.use.usebackend.api_resp.dia;

import org.tzi.use.usebackend.api_resp.ApiResponse;
import org.tzi.use.usebackend.api_resp.uml.sys.events.Event;

import java.util.List;

public class SeqDiagramResp extends ApiResponse {
    List<Event> events;

    public SeqDiagramResp(List<Event> events) {
        this.events = events;
    }

    public List<Event> getEvents() {
        return events;
    }

    public void setEvents(List<Event> events) {
        this.events = events;
    }
}
