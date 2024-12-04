package org.tzi.use.usebackend.api_resp.uml.ocl.type;

import org.tzi.use.uml.ocl.type.EnumType;

public class Enum {
    private final String className;
    private final String[] fLiterals;

    public Enum(EnumType enumeration) {
        className = enumeration.name();
        fLiterals = enumeration.getLiterals().toArray(new String[0]);
    }

    public String getClassName() {
        return className;
    }

    public String[] getfLiterals() {
        return fLiterals;
    }
}
