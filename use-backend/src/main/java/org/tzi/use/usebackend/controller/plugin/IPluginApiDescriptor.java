package org.tzi.use.usebackend.controller.plugin;

import org.tzi.use.runtime.IPluginDescriptor;

public interface IPluginApiDescriptor {
    public IPluginApiDelegate getApiClass();

    public IPluginDescriptor getParent();

    public PluginApiModel getPluginApiModel();
}
