package org.tzi.use.usebackend.controller.utils;

import org.tzi.use.main.runtime.IRuntime;
import org.tzi.use.uml.mm.*;
import org.tzi.use.uml.sys.MSystem;
import org.tzi.use.usebackend.api_resp.utility_view.mdl_brw.Node;

import java.io.PrintWriter;
import java.io.StringWriter;

public class ModalBrowserBE {
    private final MSystem fSystem;
    private final IRuntime fPluginRuntime;

    public ModalBrowserBE(MSystem system, IRuntime pluginRuntime) {
        fSystem = system;
        fPluginRuntime = pluginRuntime;
    }

    private String displayInfo(MModelElement element) {
        // TODO: add plugin support back
        StringWriter sw = new StringWriter();
        sw.write("<html><head>");
        sw.write("<style> <!-- body { font-family: sansserif; } --> </style>");
        sw.write("</head><body><font size=\"-1\">");

        element.processWithVisitor(new MMPrintVisitor(new PrintWriter(sw)));

        sw.write("</font></body></html>");
        return sw.toString();
    }

    public String displayNode(String nodeType, String name) {
        MModel fModel = fSystem.model();
        switch (nodeType) {
            case "Classes":
                return displayInfo(fModel.getClass(name));
            case "Associations":
                MAssociation association = fModel.getAssociation(name);
                if (association != null) {
                    return displayInfo(association);
                }
                return "Not found";
            case "Invariants":
                return displayInfo(fModel.getClassInvariant(name));
            case "Pre-/Post conditions":
                for (MPrePostCondition cond : fModel.prePostConditions()) {
                    if (cond.toString().equals(name)) {
                        return displayInfo(cond);
                    }
                }
                return "Not found";
            case "Query Operations":
                for (MClass mClass : fModel.classes()) {
                    for (MOperation mOperation : mClass.operations()) {
                        if (mOperation.hasExpression() && mOperation.qualifiedName().equals(name)) {
                            return displayInfo(mOperation);
                        }
                    }
                }
                return "Not found";
            default:
                return "Not found";
        }
    }

    public Node response() {
        MModel fModel = fSystem.model();
        if (fModel == null) {
            return new Node("No model available");
        }

        Node top = new Node(fModel.name());

        // Classes
        Node classes = new Node("Classes");
        top.appendChild(classes);
        for (MClass cls : fModel.classes()) {
            classes.appendChild(new Node(cls.name()));
        }

        // Associations
        Node associations = new Node("Associations");
        top.appendChild(associations);
        for (MAssociation assoc : fModel.associations()) {
            associations.appendChild(new Node(assoc.name()));
        }

        // Invariants
        Node invariants = new Node("Invariants");
        top.appendChild(invariants);
        for (MClassInvariant inv : fModel.classInvariants()) {
            invariants.appendChild(new Node(inv.toString()));
        }
        // Pre-/Post conditions
        Node conditions = new Node("Pre-/Post conditions");
        top.appendChild(conditions);
        for (MPrePostCondition cond : fModel.prePostConditions()) {
            conditions.appendChild(new Node(cond.toString()));
        }


        // TODO: PLUGIN MODAL
//        Set<Map.Entry<String, Collection<?>>> modelCollectionEntrySet = this.modelCollections.entrySet();
//
//        for (Map.Entry<String, Collection<?>> modelCollectionMapEntry : modelCollectionEntrySet) {
//            String modelCollectionName = modelCollectionMapEntry.getKey()
//                    .toString();
//            Collection<?> modelCollection = fMbs
//                    .sortPluginCollection(modelCollectionMapEntry.getValue());
//            addChildNodes(top, modelCollectionName, modelCollection);
//        }

        // Query Operations
        Node queryOperations = new Node("Query Operations");
        top.appendChild(queryOperations);
        for (MClass mClass : fModel.classes()) {
            for (MOperation mOperation : mClass.operations()) {
                if (mOperation.hasExpression()) {
                    queryOperations.appendChild(new Node(mOperation.qualifiedName()));
                }
            }
        }

        return top;
    }
}
