package org.tzi.use.usebackend.api_resp.state.invariants;

import org.tzi.use.uml.mm.MClassInvariant;

public class ClassInvariant {
    String name;
    String className;
    public ClassInvariant(MClassInvariant mClassInvariant) {
        name = mClassInvariant.name();
        className = mClassInvariant.cls().name();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }
}
