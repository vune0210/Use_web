package org.tzi.use.usebackend.controller;

import org.tzi.use.usebackend.api_resp.ApiResponse;

import java.util.ArrayList;
import java.util.Set;

public class PluginListApiResp extends ApiResponse {
    public ArrayList<String> pluginNames;

    public PluginListApiResp(Set<String> pluginNames) {
        this.pluginNames = new ArrayList<>(pluginNames);
    }
}
