package org.tzi.use.usebackend.api_resp.state.obj_prop;

import org.tzi.use.usebackend.api_resp.ApiResponse;

public class ObjectPropertyResp extends ApiResponse {
    private final ObjectProperties object;


    public ObjectPropertyResp(boolean success, String message) {
        super(success, message);
        this.object = null;
    }

    public ObjectPropertyResp(ObjectProperties object) {
        super();
        this.object = object;
    }

    public ObjectProperties getObject() {
        return object;
    }
}
