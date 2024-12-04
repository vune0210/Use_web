package org.tzi.use.usebackend.controller.plugin;

import org.tzi.use.runtime.model.PluginModel;

import java.util.Vector;

public class PluginModelBE extends PluginModel {
    private Vector<PluginApiModel> apis = null;

    public Vector<PluginApiModel> getApis() {
        if (this.apis == null) {
            this.apis = new Vector<PluginApiModel>();
        }
        return this.apis;
    }
}
