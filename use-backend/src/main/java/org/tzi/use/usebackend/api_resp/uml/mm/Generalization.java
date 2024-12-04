package org.tzi.use.usebackend.api_resp.uml.mm;

import org.tzi.use.uml.mm.MAssociation;
import org.tzi.use.uml.mm.MAssociationClass;
import org.tzi.use.uml.mm.MClassifier;
import org.tzi.use.uml.mm.MGeneralization;

public class Generalization {
    private final String parentClass;
    private final String childClass;

    public Generalization(MGeneralization gen) {
        MClassifier parent = gen.parent();
        MClassifier child = gen.child();

        // TODO: Show generalizations of associations
        if (parent instanceof MAssociation && !(parent instanceof MAssociationClass)) {
            this.parentClass = null;
            this.childClass = null;
            return;
        }

        this.parentClass = parent.name();
        this.childClass = child.name();
    }

    public String getParentClass() {
        return parentClass;
    }

    public String getChildClass() {
        return childClass;
    }
}
