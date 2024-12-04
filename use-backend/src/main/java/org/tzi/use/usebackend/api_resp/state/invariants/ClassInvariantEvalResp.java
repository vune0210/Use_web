package org.tzi.use.usebackend.api_resp.state.invariants;

import org.tzi.use.uml.mm.MClassInvariant;
import org.tzi.use.usebackend.api_resp.ApiResponse;

public class ClassInvariantEvalResp extends ApiResponse {
    EvalResult[] evalResults;
    ClassInvariant[] classInvariants;
    boolean structureOK;

    public ClassInvariantEvalResp(MClassInvariant[] mClassInvariants, EvalResult[] evalResults, boolean structureOK) {
        super(true, "OK");
        this.evalResults = evalResults;
        this.structureOK = structureOK;
        this.classInvariants = new ClassInvariant[mClassInvariants.length];
        for (int i = 0; i< mClassInvariants.length;i++) {
            this.classInvariants[i] = new ClassInvariant(mClassInvariants[i]);
        }
    }

    public EvalResult[] getEvalResults() {
        return evalResults;
    }

    public void setEvalResults(EvalResult[] evalResults) {
        this.evalResults = evalResults;
    }

    public ClassInvariant[] getClassInvariants() {
        return classInvariants;
    }

    public void setClassInvariants(ClassInvariant[] classInvariants) {
        this.classInvariants = classInvariants;
    }

    public boolean isStructureOK() {
        return structureOK;
    }

    public void setStructureOK(boolean structureOK) {
        this.structureOK = structureOK;
    }
}
