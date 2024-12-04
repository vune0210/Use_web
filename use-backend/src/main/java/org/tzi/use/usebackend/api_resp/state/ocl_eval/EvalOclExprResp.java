package org.tzi.use.usebackend.api_resp.state.ocl_eval;

import org.tzi.use.usebackend.api_resp.ApiResponse;

public class EvalOclExprResp extends ApiResponse {
    String evalResult;
    String evalOutput;
    EvalNode evalBrowser;

    public EvalOclExprResp(String evalResult, String evalOutput, EvalNode evalBrowser) {
        super(true, "OK");
        this.evalResult = evalResult;
        this.evalOutput = evalOutput;
        this.evalBrowser = evalBrowser;
    }

    public EvalOclExprResp(boolean success, String message) {
        super(success, message);
    }

    public String getEvalResult() {
        return evalResult;
    }

    public void setEvalResult(String evalResult) {
        this.evalResult = evalResult;
    }

    public String getEvalOutput() {
        return evalOutput;
    }

    public void setEvalOutput(String evalOutput) {
        this.evalOutput = evalOutput;
    }

    public EvalNode getEvalBrowser() {
        return evalBrowser;
    }

    public void setEvalBrowser(EvalNode evalBrowser) {
        this.evalBrowser = evalBrowser;
    }
}
