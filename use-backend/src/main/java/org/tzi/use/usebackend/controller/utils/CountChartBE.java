package org.tzi.use.usebackend.controller.utils;

import org.springframework.beans.factory.support.ManagedMap;
import org.tzi.use.uml.mm.MAssociation;
import org.tzi.use.uml.mm.MClass;
import org.tzi.use.uml.sys.MSystem;
import org.tzi.use.uml.sys.MSystemState;
import org.tzi.use.usebackend.api_resp.utility_view.CountResp;

import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;

public class CountChartBE {
    private final MSystem fSystem;

    public CountChartBE(MSystem system) {
        fSystem = system;
    }

    public CountResp objectCount() {
        HashMap<String, Integer> objectCountMap = new ManagedMap<>();

        Collection<MClass> classes = fSystem.model().classes();
        MClass[] fClasses = classes.toArray(new MClass[0]);
        int[] fValues = new int[fClasses.length];

        MSystemState systemState = fSystem.state();
        for (int i = 0; i < fClasses.length; i++) {
            fValues[i] = systemState.objectsOfClass(fClasses[i]).size();
            objectCountMap.put(fClasses[i].name(), fValues[i]);
        }
        return new CountResp(objectCountMap);
    }

    public CountResp linkCount() {
        HashMap<String, Integer> linkCountMap = new ManagedMap<>();

        Collection<MAssociation> associations = fSystem.model().associations();
        MAssociation[] fAssociations = associations.toArray(new MAssociation[0]);
        Arrays.sort(fAssociations);

        int[] values = new int[fAssociations.length];
        MSystemState systemState = fSystem.state();
        for (int i = 0; i < fAssociations.length; i++) {
            values[i] = systemState.linksOfAssociation(fAssociations[i]).size();
            linkCountMap.put(fAssociations[i].name(), values[i]);
        }
        return new CountResp(linkCountMap);
    }
}
