package org.tzi.use.usebackend.api_resp.utility_view.mdl_brw;

import org.tzi.use.usebackend.api_resp.ApiResponse;

public class ModalBrowserResp extends ApiResponse {
    public final Node top;

    public ModalBrowserResp(boolean success, String message) {
        super(success, message);
        this.top = null;
    }

    public ModalBrowserResp(Node top) {
        super(true, null);
        this.top = top;
    }

}
