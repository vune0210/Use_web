package org.tzi.use.usebackend.api_resp.uml.sys.events;

import org.tzi.use.usebackend.api_resp.state.invariants.ClassInvariant;

public class ClassInvariantChangedEvent extends Event {
    public  final org.tzi.use.uml.sys.events.ClassInvariantChangedEvent.InvariantStateChange change;

    public  final ClassInvariant invariant;

    public ClassInvariantChangedEvent(org.tzi.use.uml.sys.events.ClassInvariantChangedEvent event) {
        super(event, "ClassInvariantChangedEvent");
        this.change = event.getChange();
        this.invariant = new ClassInvariant(event.getInvariant());
    }
}
