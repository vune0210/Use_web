package org.tzi.use.usebackend.api_resp.utility_view;

import org.tzi.use.usebackend.api_resp.ApiResponse;

import java.util.HashMap;

public class CountResp extends ApiResponse {
    HashMap<String, Integer> countMap;

    public CountResp(HashMap<String, Integer> countMap) {
        this.countMap = countMap;
    }

    public CountResp(boolean success, String message) {
        super(success, message);
        this.countMap = new HashMap<>();
    }

    public HashMap<String, Integer> getCountMap() {
        return countMap;
    }

    public void setCountMap(HashMap<String, Integer> countMap) {
        this.countMap = countMap;
    }
}
