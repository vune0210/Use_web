package org.tzi.use.usebackend.controller.plugin;

import org.tzi.use.runtime.IPluginDescriptor;
import org.tzi.use.util.Log;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

import javax.xml.parsers.ParserConfigurationException;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.jar.JarFile;

/**
 * Copy and modified from PluginRegistry.java
 * PluginRegistryBE instead
 * PluginParserBE instead
 */
public class PluginRegistryBE {
    private static final PluginRegistryBE instance = new PluginRegistryBE();

    /**
     * Method returning the Singleton instance of the PluginRegistry
     *
     * @return The PluginRegistry instance
     */
    public static PluginRegistryBE getInstance() {
        return instance;
    }

    /**
     * Private default constructor
     */
    protected PluginRegistryBE() {
    }

    private static final String PLUGINXML = "useplugin.xml";

    private IPluginDescriptor createPluginDescriptor(PluginModelBE pluginModel,
                                                     URL location) {
        IPluginDescriptor pluginDescriptor = null;
        try {
            pluginDescriptor = new PluginDescriptorBE(pluginModel, location);
        } finally {
            Log.debug("Finally we have a plugin desciptor or not.");
        }
        return pluginDescriptor;
    }

    /**
     * parseConfigFile
     * use PluginParserBE instead
     */
    private PluginModelBE parseConfigFile(URL location) {

        PluginModelBE pluginModel = null;
        // during the URL creation, spaces were transformed to %20
        // replace all occurrences of %20 back to a space
        File pluginFile = new File(location.getFile().replaceAll("%20", " "));

        try (JarFile jarFile = new JarFile(pluginFile); InputStream inputStream = jarFile.getInputStream(jarFile.getEntry(PLUGINXML))){
            Log.debug("Creating jarfile path: [" + pluginFile + "]");

            InputSource inputSource = new InputSource(inputStream);
            Log.debug("Creating plugin for: " + pluginFile);

            // PluginParserBE instead
            pluginModel = new PluginParserBE().parsePlugin(inputSource);
        } catch (SAXException | ParserConfigurationException se) {
            Log.error("Error while parsing plugin config file: ", se);
        } catch (IOException ioe) {
            Log.error("No such plugin config file: 	", ioe);
        }
        return pluginModel;
    }

    /**
     * Method to register a Plugin in the given plugin location path.
     *
     * @param location
     *            The plugin location path
     * @return The Plugin Descriptor of the registered Plugin
     */
    public IPluginDescriptor registerPlugin(URL location) {

        if (location == null) {
            Log.error("No URL given");
            return null;
        }
        PluginModelBE pluginModel = parseConfigFile(location);
        if (pluginModel == null) {
            Log.error("No plugin at given URL [" + location + "] found.");
            return null;
        }
        Log.debug("Plugin [" + pluginModel.getName() + "] found.");

        IPluginDescriptor pluginDescriptor = createPluginDescriptor(
                pluginModel, location);
        if (pluginDescriptor == null) {
            Log.error("Could not create a PluginDescriptor for plugin ["
                    + pluginModel.getName() + "]");
            return null;
        }
        Log.debug("PluginDescriptor created.");

        return pluginDescriptor;
    }
}
