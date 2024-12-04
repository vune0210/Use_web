package org.tzi.use.usebackend.api_resp.utility_view;

import org.tzi.use.usebackend.api_resp.ApiResponse;

public class StateEvolutionResp extends ApiResponse {
    int objectCount;
    int linkCount;

    public StateEvolutionResp(int objectCount, int linkCount) {
        this.objectCount = objectCount;
        this.linkCount = linkCount;
    }

    public int getObjectCount() {
        return objectCount;
    }

    public void setObjectCount(int objectCount) {
        this.objectCount = objectCount;
    }

    public int getLinkCount() {
        return linkCount;
    }

    public void setLinkCount(int linkCount) {
        this.linkCount = linkCount;
    }
}
