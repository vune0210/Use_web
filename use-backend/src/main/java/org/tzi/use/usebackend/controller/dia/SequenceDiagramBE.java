package org.tzi.use.usebackend.controller.dia;

import org.tzi.use.uml.sys.MSystem;
import org.tzi.use.usebackend.api_resp.dia.SeqDiagramResp;
import org.tzi.use.usebackend.api_resp.uml.sys.events.Event;

import java.util.ArrayList;

public class SequenceDiagramBE {
    private final MSystem fSystem;

    public SequenceDiagramBE(MSystem fSystem) {
        this.fSystem = fSystem;
    }

    public SeqDiagramResp getEvents() {
        ArrayList<Event> events = new ArrayList<>();
        for (org.tzi.use.uml.sys.events.Event e : fSystem.getAllEvents()) {
            events.add(Event.newEvent(e));
        }
        return new SeqDiagramResp(events);
    }
}
