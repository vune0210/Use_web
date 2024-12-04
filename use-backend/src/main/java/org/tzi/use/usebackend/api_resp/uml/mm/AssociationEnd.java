package org.tzi.use.usebackend.api_resp.uml.mm;

import org.tzi.use.uml.mm.MAssociationEnd;

import java.util.ArrayList;

public class AssociationEnd {
    private String className;
    private String rolename;
    private String mult;
    private int kind; // NONE= 0, AGGREGATION = 1, COMPOSITION = 2


    private boolean isDerived;

    // constraints
    private boolean ordered;
    private boolean isUnion;
    private String[] subsets;
    private String[] redefines;
    private ArrayList<String> qualifiers;

    public AssociationEnd(MAssociationEnd end) {
        className = end.cls().name();
        rolename = end.nameAsRolename();
        mult = end.multiplicity().toString();
        kind = end.aggregationKind();
        isDerived = end.isDerived();
        ordered = end.isOrdered();
        isUnion = end.isUnion();


        MAssociationEnd[] subsettedEnds = end.getSubsettedEnds().toArray(new MAssociationEnd[0]);
        subsets= new String[subsettedEnds.length];
        for (int i = 0; i< subsettedEnds.length;i++) {
            subsets[i] = subsettedEnds[i].nameAsRolename();
        }

        MAssociationEnd[] redefinedEnds = end.getRedefinedEnds().toArray(new MAssociationEnd[0]);
        redefines= new String[redefinedEnds.length];
        for (int i = 0; i< redefinedEnds.length;i++) {
            redefines[i] = redefinedEnds[i].nameAsRolename();
        }

        qualifiers = new ArrayList<>();
        for (var q : end.getQualifiers()) {
            qualifiers.add(q.name());
        }
    }

    public boolean isDerived() {
        return isDerived;
    }

    public void setDerived(boolean derived) {
        isDerived = derived;
    }

    public ArrayList<String> getQualifiers() {
        return qualifiers;
    }

    public void setQualifiers(ArrayList<String> qualifiers) {
        this.qualifiers = qualifiers;
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public String getRolename() {
        return rolename;
    }

    public void setRolename(String rolename) {
        this.rolename = rolename;
    }

    public String getMult() {
        return mult;
    }

    public void setMult(String mult) {
        this.mult = mult;
    }

    public int getKind() {
        return kind;
    }

    public void setKind(int kind) {
        this.kind = kind;
    }

    public boolean isOrdered() {
        return ordered;
    }

    public void setOrdered(boolean ordered) {
        this.ordered = ordered;
    }

    public boolean isUnion() {
        return isUnion;
    }

    public void setUnion(boolean union) {
        isUnion = union;
    }

    public String[] getSubsets() {
        return subsets;
    }

    public void setSubsets(String[] subsets) {
        this.subsets = subsets;
    }

    public String[] getRedefines() {
        return redefines;
    }

    public void setRedefines(String[] redefines) {
        this.redefines = redefines;
    }
}
