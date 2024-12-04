package org.tzi.use.usebackend.api_resp.dia;

import org.tzi.use.usebackend.api_resp.ApiResponse;
import org.tzi.use.usebackend.api_resp.uml.mm.Association;
import org.tzi.use.usebackend.api_resp.uml.mm.Class;
import org.tzi.use.usebackend.api_resp.uml.mm.Generalization;
import org.tzi.use.usebackend.api_resp.uml.mm.commonbehavior.communications.Signal;
import org.tzi.use.usebackend.api_resp.uml.ocl.type.Enum;

import java.util.ArrayList;
import java.util.List;

public class ClassDiagramResp extends ApiResponse {
    private final List<Class> classList;
    private final List<Enum> enumList;
    private final List<Signal> signalList;
    private final List<Generalization> generalizationList;
    private final List<Association> assocList;

    public ClassDiagramResp(boolean success, String message) {
        super(success, message);
        this.classList = new ArrayList<>();
        this.enumList = new ArrayList<>();
        this.signalList = new ArrayList<>();
        this.generalizationList = new ArrayList<>();
        this.assocList = new ArrayList<>();
    }

    public ClassDiagramResp(List<Class> classList, List<Enum> enumList, List<Signal> signalList, List<Generalization> generalizationList, List<Association> assocList) {
        super(true, null);
        this.classList = classList;
        this.enumList = enumList;
        this.signalList = signalList;
        this.generalizationList = generalizationList;
        this.assocList = assocList;
    }

    public List<Class> getClassList() {
        return classList;
    }

    public List<Enum> getEnumList() {
        return enumList;
    }

    public List<Signal> getSignalList() {
        return signalList;
    }

    public List<Generalization> getGeneralizationList() {
        return generalizationList;
    }

    public List<Association> getAssocList() {
        return assocList;
    }
}
