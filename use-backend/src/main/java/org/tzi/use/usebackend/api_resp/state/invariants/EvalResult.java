package org.tzi.use.usebackend.api_resp.state.invariants;

import org.tzi.use.uml.ocl.value.BooleanValue;
import org.tzi.use.uml.ocl.value.Value;


public class EvalResult {
    public final int index;
    final Value result;
    public final boolean resultBool;
    public final String message;
    public final long duration;

    public EvalResult(int index, Value result, String message, long duration) {
        this.index = index;
        this.result = result;
        this.resultBool = result != null && result.isDefined() && ((BooleanValue)result).isTrue();
        this.message = message;
        this.duration = duration;
    }

    /**
     * if v == null it is not considered as a failure, rather it is
     * a MultiplicityViolation and it is skipped as failure count
     * @return
     */
    public boolean resultIsNull() {
        return this.result == null;
    }
}