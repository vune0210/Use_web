package org.tzi.use.usebackend.api_resp.state.crte_obj;

import org.tzi.use.usebackend.api_resp.ApiResponse;

import java.util.ArrayList;

public class CreateObjResp extends ApiResponse {
    ArrayList<String> classList;

    public CreateObjResp(boolean success, String message) {
        super(success, message);
        this.classList = new ArrayList<>();
    }

    public CreateObjResp(ArrayList<String> classList) {
        this.classList = classList;
    }

    public ArrayList<String> getClassList() {
        return classList;
    }
}
