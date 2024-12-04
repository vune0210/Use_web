package org.tzi.use.usebackend.controller.plugin;

import org.tzi.use.main.Session;
import org.tzi.use.main.runtime.IDescriptor;
import org.tzi.use.main.runtime.IExtensionPoint;

import java.util.Map;

public interface IPluginApiExtensionPoint extends IExtensionPoint {
    Map<String, PluginApi> createPluginApi(Session session);

    void registerApis(IDescriptor pluginDescriptor);
}
