package org.tzi.use.usebackend.controller.plugin;

import org.tzi.use.runtime.IPluginDescriptor;
import org.tzi.use.util.Log;

public class ApiRegistry {
    private static ApiRegistry instance = new ApiRegistry();

    /**
     * Method returning the Singleton instance of the ApiRegistry
     *
     * @return The ApiRegistry instance
     */
    public static ApiRegistry getInstance() {
        return instance;
    }

    /**
     * Private default Constructor.
     */
    private ApiRegistry() {
    }

    /**
     * Method to register the Plugin Actions from the given Plugin Descriptor
     * provided by a Plugin.
     *
     * @param currentPluginDescriptor
     *            The Plugin Descriptor
     * @param pluginApiModel
     *            The Plugin Action Model
     * @return The Plugin Action Descriptor
     */
    public PluginApiDescriptor registerPluginApi(
            IPluginDescriptor currentPluginDescriptor,
            PluginApiModel pluginApiModel) {

        if (currentPluginDescriptor == null) {
            Log.error("No PluginDescriptor given.");
            return null;
        }
        if (pluginApiModel == null) {
            Log.error("No PluginActionModul given.");
            return null;
        }

        Log.debug("Registering action class: ["
                + pluginApiModel.getApiClass() + "]");

        PluginApiDescriptor currentApiDescriptor = new PluginApiDescriptor(
                pluginApiModel, currentPluginDescriptor
                .getPluginClassLoader(), currentPluginDescriptor);

        return currentApiDescriptor;
    }
}
