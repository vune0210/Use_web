package org.tzi.use.usebackend.api_resp.uml.sys;

import org.tzi.use.uml.sys.MLinkEnd;
import org.tzi.use.usebackend.api_resp.uml.mm.AssociationEnd;

public class LinkEnd {
    AssociationEnd fAssociationEnd;
    String fObjectName;

    String fObjectClass;

    String fLabel;

    String[] qualifierValues;
    public LinkEnd(MLinkEnd lEnd) {
        fAssociationEnd = new AssociationEnd((lEnd.associationEnd()));
        fObjectName = lEnd.object().name();
        fObjectClass = lEnd.object().cls().name();
        fLabel = fObjectName+":"+fObjectClass;
        var values = lEnd.getQualifierValues();
        qualifierValues = new String[values.size()];
        for (int i = 0;i<values.size();i++) {
            qualifierValues[i] = values.get(i).toString();
        }
    }

    public String getfLabel() {
        return fLabel;
    }

    public void setfLabel(String fLabel) {
        this.fLabel = fLabel;
    }

    public String getfObjectClass() {
        return fObjectClass;
    }

    public void setfObjectClass(String fObjectClass) {
        this.fObjectClass = fObjectClass;
    }

    public AssociationEnd getfAssociationEnd() {
        return fAssociationEnd;
    }

    public void setfAssociationEnd(AssociationEnd fAssociationEnd) {
        this.fAssociationEnd = fAssociationEnd;
    }

    public String getfObjectName() {
        return fObjectName;
    }

    public void setfObjectName(String fObjectName) {
        this.fObjectName = fObjectName;
    }

    public String[] getQualifierValues() {
        return qualifierValues;
    }

    public void setQualifierValues(String[] qualifierValues) {
        this.qualifierValues = qualifierValues;
    }
}
