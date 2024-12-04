package org.tzi.use.usebackend.api_resp.utility_view.mdl_brw;

import org.tzi.use.usebackend.api_resp.ApiResponse;

public class ModalBrowserInfoResp extends ApiResponse {
    public String info;

    public ModalBrowserInfoResp(String info) {
        this.info = info;
    }
}
