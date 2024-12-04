package org.tzi.use.usebackend.api_resp.state.cls_ext;

import org.tzi.use.usebackend.api_resp.ApiResponse;
import org.tzi.use.usebackend.api_resp.state.invariants.ClassInvariant;
import org.tzi.use.usebackend.api_resp.uml.sys.ObjectState;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

public class ClassExtentResp extends ApiResponse {
    ArrayList<ObjectState> objects = new ArrayList<>();
    ArrayList<ClassInvariant> invariants = new ArrayList<>();
    Map<String, Set<String>> invBadObject = new HashMap<>();

    public ClassExtentResp(ArrayList<ObjectState> objects, ArrayList<ClassInvariant> invariants, Map<String, Set<String>> invBadObject) {
        this.objects = objects;
        this.invariants = invariants;
        this.invBadObject = invBadObject;
    }

    public ArrayList<ObjectState> getObjects() {
        return objects;
    }

    public void setObjects(ArrayList<ObjectState> objects) {
        this.objects = objects;
    }

    public ArrayList<ClassInvariant> getInvariants() {
        return invariants;
    }

    public void setInvariants(ArrayList<ClassInvariant> invariants) {
        this.invariants = invariants;
    }

    public Map<String, Set<String>> getInvBadObject() {
        return invBadObject;
    }

    public void setInvBadObject(Map<String, Set<String>> invBadObject) {
        this.invBadObject = invBadObject;
    }
}
