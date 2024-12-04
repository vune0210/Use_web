package org.tzi.use.usebackend.controller.dia;

import org.tzi.use.graph.DirectedGraph;
import org.tzi.use.uml.mm.MAssociation;
import org.tzi.use.uml.mm.MClass;
import org.tzi.use.uml.mm.MClassifier;
import org.tzi.use.uml.mm.MGeneralization;
import org.tzi.use.uml.mm.commonbehavior.communications.MSignal;
import org.tzi.use.uml.ocl.type.EnumType;
import org.tzi.use.uml.sys.MSystem;
import org.tzi.use.usebackend.api_resp.dia.ClassDiagramResp;
import org.tzi.use.usebackend.api_resp.uml.mm.Association;
import org.tzi.use.usebackend.api_resp.uml.mm.Class;
import org.tzi.use.usebackend.api_resp.uml.mm.Generalization;
import org.tzi.use.usebackend.api_resp.uml.mm.commonbehavior.communications.Signal;
import org.tzi.use.usebackend.api_resp.uml.ocl.type.Enum;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;

public class ClassDiagramBE {
    private final MSystem fSystem;

    public ClassDiagramBE(MSystem system) {
        fSystem = system;
    }

    /**
     * Read  all instances of MModel and maps
     * the specified element into JSON object
     * ...
     * Based on ClassDiagramView.initState()
     * ...
     */
    public ClassDiagramResp response() {

        // read Classes
        List<Class> resClassList = new ArrayList<>();
        Collection<MClass> allClasses = fSystem.model().classes();
        for (MClass cls : allClasses) {
//            fClassDiagram.addClass( cls );
            resClassList.add(new Class(cls));
        }

        // read Enumerations
        List<Enum> resEnumList = new ArrayList<>();
        Collection<EnumType> allEnums = fSystem.model().enumTypes();
        for (EnumType enumeration : allEnums) {
//            fClassDiagram.addEnum( enumeration );
            resEnumList.add(new Enum(enumeration));
        }

        // read signals
        List<Signal> resSignalList = new ArrayList<>();
        for (MSignal s : fSystem.model().getSignals()) {
            resSignalList.add(new Signal(s));
//            fClassDiagram.addSignal( s );
        }

        // read generalizations
        List<Generalization> resGenList = new ArrayList<>();
        DirectedGraph<MClassifier, MGeneralization> genGraph = fSystem.model().generalizationGraph();
        Iterator<MGeneralization> edgeIter = genGraph.edgeIterator();
        while (edgeIter.hasNext()) {
            MGeneralization gen = edgeIter.next();
            resGenList.add(new Generalization(gen));
//            fClassDiagram.addGeneralization( gen );
        }

        // read Associations
        List<Association> resAssocList = new ArrayList<>();
        Collection<MAssociation> allAssociations = fSystem.model().associations();
        for (MAssociation assoc : allAssociations) {
            resAssocList.add(new Association(assoc));
//            fClassDiagram.addAssociation( assoc );
        }

////        fClassDiagram.initialize();
        return new ClassDiagramResp(resClassList, resEnumList, resSignalList, resGenList, resAssocList);
    }
}
