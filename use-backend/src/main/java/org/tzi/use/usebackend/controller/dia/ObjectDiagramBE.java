package org.tzi.use.usebackend.controller.dia;

import org.tzi.use.uml.sys.MLink;
import org.tzi.use.uml.sys.MObject;
import org.tzi.use.uml.sys.MObjectState;
import org.tzi.use.uml.sys.MSystem;
import org.tzi.use.usebackend.api_resp.dia.ObjectDiagramResp;
import org.tzi.use.usebackend.api_resp.uml.sys.Link;
import org.tzi.use.usebackend.api_resp.uml.sys.ObjectState;

import java.util.ArrayList;

public class ObjectDiagramBE {
    private final MSystem fSystem;

    public ObjectDiagramBE(MSystem system) {
        this.fSystem = system;
    }

    public ObjectDiagramResp response() {
        ArrayList<ObjectState> objects = new ArrayList<>();
        for (MObject obj : fSystem.state().allObjects()) {
            MObjectState objState = obj.state(fSystem.state());
            if (objState == null) continue;
            objects.add(new ObjectState(objState));
        }

        ArrayList<Link> links = new ArrayList<>();
        for (MLink link : fSystem.state().allLinks()) {
            links.add(new Link(link));
        }

        return new ObjectDiagramResp(objects, links);
    }

//    protected void addBinaryLink(MLink link) {
//        MAssociation assoc = link.association();
//
//        MLinkEnd linkEnd1 = link.linkEnd(assoc.associationEnds().get(0));
//        MLinkEnd linkEnd2 = link.linkEnd(assoc.associationEnds().get(1));
//
//        MObject obj1 = linkEnd1.object();
//        MObject obj2 = linkEnd2.object();
//        // TODO: Create link edge factory.
//
//        // object link
//        if (link instanceof MLinkObject) {
//            BinaryAssociationClassOrObject e = BinaryAssociationClassOrObject.create(
//                    visibleData.fObjectToNodeMap.get(obj1), visibleData.fObjectToNodeMap.get(obj2),
//                    linkEnd1, linkEnd2, visibleData.fObjectToNodeMap.get(link), this,
//                    link);
//
//            if (lastKnownLinkPositions.containsKey(link)) {
//                e.initialize();
//                visibleData.fObjectToNodeMap.get(link).setStrategy(lastKnownLinkPositions.get(link));
//                lastKnownLinkPositions.remove(link);
//                fGraph.addInitializedEdge(e);
//            } else {
//                fGraph.addEdge(e);
//            }
//            visibleData.fLinkObjectToNodeEdge.put((MLinkObject) link, e);
//            fLayouter = null;
//        } else {
//            // binary link
//            boolean isHidden = false;
//            ObjectNode node1;
//            ObjectNode node2;
//
//            if (visibleData.fObjectToNodeMap.containsKey(obj1)) {
//                node1 = visibleData.fObjectToNodeMap.get(obj1);
//            } else {
//                node1 = hiddenData.fObjectToNodeMap.get(obj1);
//                isHidden = true;
//            }
//
//            if (visibleData.fObjectToNodeMap.containsKey(obj2)) {
//                node2 = visibleData.fObjectToNodeMap.get(obj2);
//            } else {
//                node2 = hiddenData.fObjectToNodeMap.get(obj2);
//                isHidden = true;
//            }
//
//            BinaryAssociationOrLinkEdge e = createBinaryAssociationOrLinkEdge(node1, node2, linkEnd1,
//                    linkEnd2, this, link);
//
//            if (link.isVirtual()) {
//                e.setDashed(true);
//            }
//
//            if (isHidden) {
//                hiddenData.fBinaryLinkToEdgeMap.put(link, e);
//            } else {
//                fGraph.addEdge(e);
//                visibleData.fBinaryLinkToEdgeMap.put(link, e);
//                fLayouter = null;
//            }
//        }
//    }

//    protected void addNAryLink(MLink link) {
//        getRandomNextPosition();
//
//        List<ObjectNode> linkedObjectNodes = new ArrayList<ObjectNode>();
//        for(MObject linkedObject : link.linkedObjects()) {
//            linkedObjectNodes.add(visibleData.fObjectToNodeMap.get(linkedObject));
//        }
//
//        // n-ary link: create a diamond node and n edges to objects
//        DiamondNode node = new DiamondNode(link, fOpt, linkedObjectNodes);
//        node.setPosition(nextNodePosition);
//        fGraph.add(node);
//
//        // connected to an "object link"
//        if (link instanceof MLinkObject) {
//            NAryAssociationClassOrObjectEdge e = NAryAssociationClassOrObjectEdge.create(node,
//                    visibleData.fObjectToNodeMap.get(link), this, link.association(), true);
//
//            fGraph.addEdge(e);
//            visibleData.fLinkObjectToNodeEdge.put((MLinkObject) link, e);
//            fLayouter = null;
//        }
//        // connected to a "normal" link
//        visibleData.fNaryLinkToDiamondNodeMap.put(link, node);
//        List<EdgeBase> halfEdges = new ArrayList<>();
//        List<String> edgeIds = new ArrayList<>();
//
//        for (MLinkEnd linkEnd : link.linkEnds()) {
//            MObject obj = linkEnd.object();
//            AssociationOrLinkPartEdge e = AssociationOrLinkPartEdge.create(node, visibleData.fObjectToNodeMap.get(obj),
//                    linkEnd.associationEnd(), this, link.association(), link);
//
//            if (link.isVirtual()) {
//                e.setDashed(true);
//            }
//
//            fGraph.addEdge(e);
//            halfEdges.add(e);
//            edgeIds.add(linkEnd.associationEnd().nameAsRolename());
//        }
//
//        if (visibleData.fLinkObjectToNodeEdge.get(link) != null) {
//            halfEdges.add(visibleData.fLinkObjectToNodeEdge.get(link));
//            edgeIds.add(((MLinkObject) link).name());
//        }
//
//        node.setHalfEdges(halfEdges, edgeIds);
//
//        visibleData.fHalfLinkToEdgeMap.put(link, halfEdges);
//        fLayouter = null;
//    }
}
