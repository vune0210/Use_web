package org.tzi.use.usebackend.api_resp.uml.mm.commonbehavior.communications;

import org.tzi.use.uml.mm.MAttribute;
import org.tzi.use.uml.mm.commonbehavior.communications.MSignal;

public class Signal {
    private final String[] attributeValues;

    public Signal(MSignal enumeration) {
        MAttribute[] attributes = enumeration.getAttributes().toArray(new MAttribute[0]);

        int i = 0;
        attributeValues = new String[attributes.length];
        for (MAttribute attr : attributes) {
            attributeValues[i++] = attr.toString();
        }
    }

    public String[] getAttributeValues() {
        return attributeValues;
    }
}
