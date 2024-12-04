package org.tzi.use.usebackend.controller.state;

import org.tzi.use.uml.mm.MClass;
import org.tzi.use.uml.mm.MClassInvariant;
import org.tzi.use.uml.ocl.expr.Evaluator;
import org.tzi.use.uml.ocl.expr.Expression;
import org.tzi.use.uml.ocl.value.ObjectValue;
import org.tzi.use.uml.ocl.value.SetValue;
import org.tzi.use.uml.ocl.value.Value;
import org.tzi.use.uml.ocl.value.VarBindings;
import org.tzi.use.uml.sys.MObject;
import org.tzi.use.uml.sys.MSystem;
import org.tzi.use.usebackend.api_resp.state.cls_ext.ClassExtentResp;
import org.tzi.use.usebackend.api_resp.state.invariants.ClassInvariant;
import org.tzi.use.usebackend.api_resp.uml.sys.ObjectState;
import org.tzi.use.util.NullWriter;

import java.io.PrintWriter;
import java.util.*;

public class ClassExtentBE {
    MSystem fSystem;
    MClass fClass;
    boolean fShowInvResults;

    private MClassInvariant[] fClassInvariants;
    private Map<MClassInvariant, Set<MObject>> fInvBadObjects = new HashMap<>();

    public ClassExtentBE(MSystem fSystem, String className, boolean fShowInvResults) {
        this.fSystem = fSystem;
        this.fShowInvResults = fShowInvResults;
        fClass = fSystem.model().getClass(className);
        if (fShowInvResults) {
            Set<MClassInvariant> invSet = fSystem.model().allClassInvariants(fClass);
            int n = invSet.size();
            fClassInvariants = new MClassInvariant[n];
            System.arraycopy(invSet.toArray(), 0, fClassInvariants, 0, n);
            Arrays.sort(fClassInvariants);
        }
    }

    public ClassExtentResp get() {
        ArrayList<ObjectState> objects = new ArrayList<>();
        ArrayList<ClassInvariant> invariants = new ArrayList<>();
        Map<String, Set<String>> invBadObject = new HashMap<>();

        for (MObject obj : fSystem.state().objectsOfClass(fClass)) {
            objects.add(new ObjectState(obj.state(fSystem.state())));
        }

        // update invariants
        if (fShowInvResults) {
            if (!fSystem.state().checkStructure(
                    new PrintWriter(new NullWriter()))) {
                // cannot evaluate on ill-formed state
                for (int i = 0; i < fClassInvariants.length; i++) {
                    fInvBadObjects.put(fClassInvariants[i], null);
                    invBadObject.put(fClassInvariants[i].name(), null);
                }
            }
            for (int i = 0; i < fClassInvariants.length; i++) {
                invariants.add(new ClassInvariant(fClassInvariants[i]));

                if(!fClassInvariants[i].isActive()){
                    continue;
                }
                try {
                    Set<MObject> badObjects = new HashSet<MObject>();
                    Set<String> badObjectNames = new HashSet<>();

                    Evaluator evaluator = new Evaluator();
                    Expression expr = fClassInvariants[i]
                            .getExpressionForViolatingInstances();
                    Value v = evaluator.eval(expr, fSystem.state(),
                            new VarBindings());

                    Iterator<Value> valIter = ((SetValue) v).collection().iterator();
                    while (valIter.hasNext()) {
                        ObjectValue oVal = (ObjectValue) valIter.next();

                        badObjects.add(oVal.value());
                        badObjectNames.add(oVal.value().name());
                    }

                    fInvBadObjects.put(fClassInvariants[i], badObjects);
                    invBadObject.put(fClassInvariants[i].name(), badObjectNames);
                } catch (Exception e) {
                    // No need to handle e.
                }
            }
        }

        return new ClassExtentResp(objects, invariants, invBadObject);
    }
}
