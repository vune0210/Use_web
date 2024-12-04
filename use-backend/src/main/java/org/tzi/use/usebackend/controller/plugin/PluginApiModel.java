package org.tzi.use.usebackend.controller.plugin;

public class PluginApiModel {
    private String id = null;
    private String apiClass = null;
    private String path = null;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getApiClass() {
        return apiClass;
    }

    public void setApiClass(String apiClass) {
        this.apiClass = apiClass;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }
}
