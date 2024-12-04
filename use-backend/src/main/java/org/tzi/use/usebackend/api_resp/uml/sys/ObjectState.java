package org.tzi.use.usebackend.api_resp.uml.sys;

import org.tzi.use.uml.mm.MAttribute;
import org.tzi.use.uml.mm.MClass;
import org.tzi.use.uml.mm.statemachines.MState;
import org.tzi.use.uml.mm.statemachines.MStateMachine;
import org.tzi.use.uml.ocl.value.EnumValue;
import org.tzi.use.uml.ocl.value.Value;
import org.tzi.use.uml.sys.MObject;
import org.tzi.use.uml.sys.MObjectState;

import java.util.ArrayList;
import java.util.List;

public class ObjectState {
    String[] fValues;
    String[] fStateValues;
    String fLabel;

    String fName;
    String fClassName;

    public ObjectState(MObjectState objState) {
        MObject obj = objState.object();
        String value;

        MClass cls = obj.cls();
        fName = obj.name();
        fClassName = cls.name();
        fLabel = fName + ":" + fClassName;

        List<MAttribute> allAttributes = cls.allAttributes();
        final int N = allAttributes.size();
        fValues = new String[N];
        fStateValues = new String[N];

        for (int i = 0; i < allAttributes.size(); i++) {
            MAttribute attr = allAttributes.get(i);
            Value val = objState.attributeValue(attr);

            if (val instanceof EnumValue) {
                value = "#" + ((EnumValue) val).value();
            } else {
                value = val.toString();
            }

            fValues[i] = (attr.isDerived() ? "/" : "") + attr.name() + "=" + value;
        }

        ArrayList<MStateMachine> fStateMachines = new ArrayList(obj.cls().getAllOwnedProtocolStateMachines());
        for (int i = 0; i < fStateMachines.size(); i++) {
            MStateMachine sm = fStateMachines.get(i);
            MState val = objState.getProtocolStateMachineInstance(sm).getCurrentState(sm.getDefaultRegion());

            fStateValues[i] = sm.name() + "=" + val.name();
        }
    }

    public void setfValues(String[] fValues) {
        this.fValues = fValues;
    }

    public void setfStateValues(String[] fStateValues) {
        this.fStateValues = fStateValues;
    }

    public void setfLabel(String fLabel) {
        this.fLabel = fLabel;
    }

    public String getfName() {
        return fName;
    }

    public void setfName(String fName) {
        this.fName = fName;
    }

    public String getfClassName() {
        return fClassName;
    }

    public void setfClassName(String fClassName) {
        this.fClassName = fClassName;
    }

    public String getfLabel() {
        return fLabel;
    }

    public String[] getfValues() {
        return fValues;
    }

    public String[] getfStateValues() {
        return fStateValues;
    }
}
