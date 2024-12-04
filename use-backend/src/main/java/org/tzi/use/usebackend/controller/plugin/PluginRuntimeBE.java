package org.tzi.use.usebackend.controller.plugin;

import org.tzi.use.main.runtime.IExtensionPoint;
import org.tzi.use.runtime.IPluginDescriptor;
import org.tzi.use.runtime.IPluginRuntime;
import org.tzi.use.runtime.gui.impl.ActionExtensionPoint;
import org.tzi.use.runtime.gui.impl.MModelExtensionPoint;
import org.tzi.use.runtime.impl.PluginRuntime;
import org.tzi.use.runtime.shell.impl.ShellExtensionPoint;
import org.tzi.use.runtime.util.PluginRegistry;
import org.tzi.use.util.Log;
import org.tzi.use.util.StringUtil;

import java.io.File;
import java.net.MalformedURLException;
import java.net.URL;

public class PluginRuntimeBE extends PluginRuntime {
    private static final IPluginRuntime instance = new PluginRuntimeBE();

    /**
     * Method returning the Singleton instance of the PluginRuntime
     *
     * @return The PluginRuntime instance.
     */
    public static IPluginRuntime getInstance() {
        return instance;
    }

    @Override
    public IExtensionPoint getExtensionPoint(String extensionPoint) {
        if (extensionPoint.equals("action")) {
            return ActionExtensionPoint.getInstance();
        } else if (extensionPoint.equals("shell")) {
            return ShellExtensionPoint.getInstance();
        } else if (extensionPoint.equals("model")) {
            return MModelExtensionPoint.getInstance();
        } else if (extensionPoint.equals("api")) {
            return ApiExtensionPoint.getInstance();
        } else
            return null;
    }

    /**
     * use PluginRegistryBE instead
     */
    @Override
    public void registerPlugin(String pluginFilename, URL pluginURL) {
        URL newPluginURL;
        Log.debug("Current plugin Information [" + pluginFilename + ","
                + pluginURL + "]");
        try {
            newPluginURL = new URL(pluginURL + pluginFilename);
            Log.debug("Current pluginURL [" + newPluginURL + "]");

            // use PluginRegistryBE instead
            PluginRegistryBE pluginRegistry = PluginRegistryBE.getInstance();
            PluginRegistry originPluginRegistry = PluginRegistry.getInstance();

            IPluginDescriptor currentPluginDescriptor = pluginRegistry
                    .registerPlugin(newPluginURL);
            originPluginRegistry.registerPlugin(newPluginURL);

            if (currentPluginDescriptor == null) {
                Log.error("Got no Plugin Descriptor !");
                return;
            }

            Log.debug("Registering plugin ["
                    + currentPluginDescriptor.getPluginModel().getName()
                    + "]");

            IPluginDescriptor otherPlugin = getPlugin(currentPluginDescriptor.getPluginModel().getName());
            if(otherPlugin != null){
                Log.error("Cannot load plugin "
                        + StringUtil.inQuotes(currentPluginDescriptor.getPluginModel().getName())
                        + " in file ["
                        + new File(currentPluginDescriptor.getPluginLocation().getPath()).getName()
                        + "] with version "
                        + StringUtil.inQuotes(currentPluginDescriptor.getPluginModel().getVersion())
                        + ". Another plugin with the same name and version "
                        + StringUtil.inQuotes(otherPlugin.getPluginModel().getVersion())
                        + " is already loaded.");
                return;
            }

            getPlugins().put(
                    currentPluginDescriptor.getPluginModel().getName(),
                    currentPluginDescriptor);
        } catch (MalformedURLException mfurle) {
            Log.error("No valid URL given to register plugin: " + mfurle);
        }
    }
}
