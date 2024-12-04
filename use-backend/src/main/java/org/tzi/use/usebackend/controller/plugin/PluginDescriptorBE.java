package org.tzi.use.usebackend.controller.plugin;

import org.tzi.use.runtime.IPlugin;
import org.tzi.use.runtime.IPluginClassLoader;
import org.tzi.use.runtime.IPluginDescriptor;
import org.tzi.use.runtime.util.PluginClassLoader;
import org.tzi.use.util.Log;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.net.URL;

/**
 * Copy from PluginDescriptor.java
 */
public class PluginDescriptorBE implements IPluginDescriptor {
    private IPlugin plugin = null;

    private PluginClassLoader classLoader;

    private final PluginModelBE pluginModel;

    private URL pluginLocation = null;

    /**
     * Construktor creating a PluginDescriptor with the given Plugin Model and
     * Plugin location path
     *
     * @param pluginModel
     *            The Plugin Model object
     * @param location
     *            The Plugin location path as URL
     */
    public PluginDescriptorBE(PluginModelBE pluginModel, URL location) {
        this.pluginModel = pluginModel;
        this.pluginLocation = location;
    }

    public IPlugin getPluginClass() {
        if (this.plugin == null) {
            String className;

            try {
                IPluginClassLoader pluginClassLoader = getPluginClassLoader();
                className = pluginClassLoader.getMainClassName();
                try {
                    this.plugin = (IPlugin) pluginClassLoader.loadClass(
                            className).getDeclaredConstructor().newInstance();
                } catch (ClassNotFoundException cnfe) {
                    Log.error("No plugin class [" + className + "]: ", cnfe);
                } catch (InstantiationException ie) {
                    Log.error(
                            "Could not instantiate class [" + className + "]",
                            ie);
                } catch (IllegalAccessException iae) {
                    Log
                            .error(
                                    "Could not access class [" + className
                                            + "]", iae);
                } catch(InvocationTargetException ite) {
                    Log.error("InvocationTargetException [" + className + "]: ", ite);
                } catch(NoSuchMethodException nsme) {
                    Log.error("Method not found for [" + className + "]: ", nsme);
                }
                if (this.plugin == null) {
                    Log.error("PD, Could not get class [" + className + "]");
                }
            } catch (IOException ioe) {
                Log
                        .error(
                                "No plugin file [" + this.pluginLocation
                                        + "]: ", ioe);
            }
        }
        return this.plugin;
    }

    public IPluginClassLoader getPluginClassLoader() {
        if (this.classLoader == null) {
            this.classLoader = new PluginClassLoader(getPluginLocation());
        }
        Log.debug("PluginDescriptor classLoader [" + this.pluginModel.getName()
                + "]" + ", " + "[" + this.classLoader.toString() + "]");
        Log.debug("PluginDescriptor ContextClassLoader ["
                + Thread.currentThread().getContextClassLoader().toString()
                + "]");
        return this.classLoader;
    }

    public URL getPluginLocation() {
        return this.pluginLocation;
    }

    public PluginModelBE getPluginModel() {
        return this.pluginModel;
    }
}
