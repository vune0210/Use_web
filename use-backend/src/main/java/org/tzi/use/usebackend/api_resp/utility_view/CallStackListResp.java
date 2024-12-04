package org.tzi.use.usebackend.api_resp.utility_view;

import org.tzi.use.usebackend.api_resp.ApiResponse;

import java.util.List;

public class CallStackListResp extends ApiResponse {
    List<String> callstack;

    public CallStackListResp(List<String> callstack) {
        super(true, "OK");
        this.callstack = callstack;
    }

    public List<String> getCallstack() {
        return callstack;
    }

    public void setCallstack(List<String> callstack) {
        this.callstack = callstack;
    }
}
