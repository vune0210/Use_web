package org.tzi.use.usebackend.api_resp.uml.mm;

import org.tzi.use.gui.views.diagrams.elements.PlaceableNode;
import org.tzi.use.uml.mm.MAssociation;
import org.tzi.use.uml.mm.MAssociationClass;
import org.tzi.use.uml.mm.MAssociationEnd;
import org.tzi.use.uml.mm.MClass;

import java.util.ArrayList;
import java.util.Iterator;

public class Association {
    private ArrayList<AssociationEnd> associationEnds;
    private ArrayList<String> associatedClasses;
    private ArrayList<String> subsets;
    private ArrayList<String> subsettedBy;
    private ArrayList<String> redefined;
    private ArrayList<String> redefinedBy;
    private String associationName;
    private int aggregationKind;
    private boolean isAssociationClass;

    // deprecated
    private String sourceClass;
    private String targetClass;
    private AssociationEnd sourceEnd;
    private AssociationEnd targetEnd;
    private String associationClass;

    public Association(MAssociation assoc) {
        associationName = assoc.name();
        aggregationKind = assoc.aggregationKind();
        isAssociationClass = assoc instanceof MAssociationClass;

        associationEnds = new ArrayList<>();
        for (var assocEnd : assoc.associationEnds()) {
            associationEnds.add(new AssociationEnd(assocEnd));
        }
        associatedClasses = new ArrayList<>();
        for (var cls : assoc.associatedClasses()) {
            associatedClasses.add(cls.name());
        }

        subsets = new ArrayList<>();
        for (var assocEnd : assoc.getSubsets()) {
            subsets.add(assocEnd.name());
        }

        subsettedBy = new ArrayList<>();
        for (var assocEnd : assoc.getSubsets()) {
            subsettedBy.add(assocEnd.name());
        }

        redefined = new ArrayList<>();
        for (var assocEnd : assoc.getRedefines()) {
            redefined.add(assocEnd.name());
        }

        redefinedBy = new ArrayList<>();
        for (var assocEnd : assoc.getRedefinedBy()) {
            redefinedBy.add(assocEnd.name());
        }

        if (assoc.associationEnds().size() == 2) {
            addBinaryAssociation(assoc);
        } else {
//            throw new RuntimeException("not supported yet");
//                addNAryAssociation(assoc);
        }
    }

    protected void addBinaryAssociation(MAssociation assoc) {
        Iterator<MAssociationEnd> assocEndIter = assoc.associationEnds().iterator();
        MAssociationEnd assocEnd1 = assocEndIter.next();
        MAssociationEnd assocEnd2 = assocEndIter.next();
        MClass cls1 = assocEnd1.cls();
        MClass cls2 = assocEnd2.cls();

        // association class
        if (assoc instanceof MAssociationClass) {
            sourceClass = cls1.name();
            targetClass = cls2.name();
            sourceEnd = new AssociationEnd(assocEnd1);
            targetEnd = new AssociationEnd(assocEnd2);
            associationClass = assoc.name();
//                BinaryAssociationClassOrObject e = BinaryAssociationClassOrObject.create(
//                        visibleData.fClassToNodeMap.get(cls1), visibleData.fClassToNodeMap.get(cls2), assocEnd1, assocEnd2,
//                        visibleData.fClassToNodeMap.get(assoc), this, assoc);
//
//                fGraph.addEdge(e);
//                visibleData.fAssocClassToEdgeMap.put((MAssociationClass) assoc, e);
//                fLayouter = null;
        } else {
            PlaceableNode source;
            PlaceableNode target;

            // for reflexive associations with exactly one qualifier
            // the qualifier end must be the source!
            if (assoc.associatedClasses().size() == 1 && assocEnd2.hasQualifiers() && !assocEnd1.hasQualifiers()) {
                MAssociationEnd temp = assocEnd1;
                assocEnd1 = assocEnd2;
                assocEnd2 = temp;
//                    source = visibleData.fClassToNodeMap.get(cls2);
//                    target = visibleData.fClassToNodeMap.get(cls1);
                sourceClass = cls2.name();
                targetClass = cls1.name();
            } else {
                sourceClass = cls1.name();
                targetClass = cls2.name();
//                    source = visibleData.fClassToNodeMap.get(cls1);
//                    target = visibleData.fClassToNodeMap.get(cls2);
            }
            sourceEnd = new AssociationEnd(assocEnd1);
            targetEnd = new AssociationEnd(assocEnd2);
            associationClass = assoc.name();

//                // binary association
//                BinaryAssociationOrLinkEdge e = createBinaryAssociationOrLinkEdge(source, target, assocEnd1, assocEnd2,
//                        this, assoc);
//
//                fGraph.addEdge(e);
//                visibleData.fBinaryAssocToEdgeMap.put(assoc, e);
//                fLayouter = null;
        }
    }

//        protected void addNAryAssociation(MAssociation assoc) {
//
//            // Find a random new position. getWidth and getheight return 0
//            // if we are called on a new diagram.
//            double fNextNodeX = Math.random() * Math.max(100, getWidth());
//            double fNextNodeY = Math.random() * Math.max(100, getHeight());
//
//            // n-ary association: create a diamond node and n edges to classes
//            DiamondNode node = new DiamondNode(assoc, fOpt);
//            node.setPosition(fNextNodeX, fNextNodeY);
//            fGraph.add(node);
//            // connected to an associationclass
//            if (assoc instanceof MAssociationClass) {
//                NAryAssociationClassOrObjectEdge e = NAryAssociationClassOrObjectEdge.create(node,
//                        visibleData.fClassToNodeMap.get(assoc), this, assoc, false);
//
//                fGraph.addEdge(e);
//                visibleData.fAssocClassToEdgeMap.put((MAssociationClass) assoc, e);
//                fLayouter = null;
//            }
//
//            // connected to a "normal" class
//            visibleData.fNaryAssocToDiamondNodeMap.put(assoc, node);
//            List<EdgeBase> halfEdges = new ArrayList<>();
//            List<String> edgeIds = new ArrayList<>();
//
//            for (MAssociationEnd assocEnd : assoc.associationEnds()) {
//                MClass cls = assocEnd.cls();
//                AssociationOrLinkPartEdge e = AssociationOrLinkPartEdge.create(node, visibleData.fClassToNodeMap.get(cls),
//                        assocEnd, this, assoc, null);
//                fGraph.addEdge(e);
//                halfEdges.add(e);
//                edgeIds.add(assocEnd.nameAsRolename());
//            }
//            node.setHalfEdges(halfEdges, edgeIds);
//
//            visibleData.fNaryAssocToHalfEdgeMap.put(assoc, halfEdges);
//            fLayouter = null;
//        }


    public boolean isAssociationClass() {
        return isAssociationClass;
    }

    public void setAssociationClass(boolean associationClass) {
        isAssociationClass = associationClass;
    }

    public ArrayList<String> getAssociatedClasses() {
        return associatedClasses;
    }

    public void setAssociatedClasses(ArrayList<String> associatedClasses) {
        this.associatedClasses = associatedClasses;
    }

    public ArrayList<String> getSubsets() {
        return subsets;
    }

    public void setSubsets(ArrayList<String> subsets) {
        this.subsets = subsets;
    }

    public ArrayList<String> getSubsettedBy() {
        return subsettedBy;
    }

    public void setSubsettedBy(ArrayList<String> subsettedBy) {
        this.subsettedBy = subsettedBy;
    }

    public ArrayList<String> getRedefined() {
        return redefined;
    }

    public void setRedefined(ArrayList<String> redefined) {
        this.redefined = redefined;
    }

    public ArrayList<String> getRedefinedBy() {
        return redefinedBy;
    }

    public void setRedefinedBy(ArrayList<String> redefinedBy) {
        this.redefinedBy = redefinedBy;
    }

    public int getAggregationKind() {
        return aggregationKind;
    }

    public void setAggregationKind(int aggregationKind) {
        this.aggregationKind = aggregationKind;
    }

    public String getAssociationName() {
        return associationName;
    }

    public void setAssociationName(String associationName) {
        this.associationName = associationName;
    }

    public ArrayList<AssociationEnd> getAssociationEnds() {
        return associationEnds;
    }

    public void setAssociationEnds(ArrayList<AssociationEnd> associationEnds) {
        this.associationEnds = associationEnds;
    }

    public String getSourceClass() {
        return sourceClass;
    }

    public void setSourceClass(String sourceClass) {
        this.sourceClass = sourceClass;
    }

    public String getTargetClass() {
        return targetClass;
    }

    public void setTargetClass(String targetClass) {
        this.targetClass = targetClass;
    }

    public AssociationEnd getSourceEnd() {
        return sourceEnd;
    }

    public void setSourceEnd(AssociationEnd sourceEnd) {
        this.sourceEnd = sourceEnd;
    }

    public AssociationEnd getTargetEnd() {
        return targetEnd;
    }

    public void setTargetEnd(AssociationEnd targetEnd) {
        this.targetEnd = targetEnd;
    }

    public String getAssociationClass() {
        return associationClass;
    }

    public void setAssociationClass(String associationClass) {
        this.associationClass = associationClass;
    }
}
