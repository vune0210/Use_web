package org.tzi.use.usebackend.controller.plugin;

import org.tzi.use.runtime.IPluginClassLoader;
import org.tzi.use.runtime.IPluginDescriptor;
import org.tzi.use.util.Log;

import java.lang.reflect.InvocationTargetException;

public class PluginApiDescriptor implements IPluginApiDescriptor {
    private PluginApiModel pluginApiModel;

    private IPluginApiDelegate pluginAction;

    private IPluginClassLoader pluginClassLoader;

    private IPluginDescriptor parent;

    /**
     * Constructor to create a Plugin Action Descriptor with the given Plugin
     * Action Model and Plugin ClassLoader.
     *
     * @param pluginActionModel
     *            The Plugin Action Model object
     * @param pluginClassLoader
     *            The Plugin ClassLoader
     * @param parent
     *            The Plugin Action's parent Window object
     */
    public PluginApiDescriptor(PluginApiModel pluginActionModel,
                                  IPluginClassLoader pluginClassLoader, IPluginDescriptor parent) {
        this.pluginApiModel = pluginActionModel;
        this.pluginClassLoader = pluginClassLoader;
        this.parent = parent;
    }

    public IPluginApiDelegate getApiClass() {
        if (this.pluginAction == null) {
            String className = this.pluginApiModel.getApiClass();

            Log.debug("Action class name [" + className + "]");

            try {
                Class<?> actionClass = getPluginClassLoader().loadClass(className);
                Log.debug("PluginActionDescriptor loading class ["
                        + this.pluginApiModel.getId() + "]" + ", " + "["
                        + actionClass.getClassLoader().toString() + "]");

                this.pluginAction = (IPluginApiDelegate) actionClass
                        .getDeclaredConstructor().newInstance();
            } catch (ClassNotFoundException cnfe) {
                Log.error("No action class [" + className + "]: ", cnfe);
            } catch (InstantiationException ie) {
                Log
                        .error("Could not instantiate class [" + className
                                + "]", ie);
            } catch (IllegalAccessException iae) {
                Log.error("Could not access class [" + className + "]", iae);
            } catch(InvocationTargetException ite) {
                Log.error("InvocationTargetException [" + className + "]: ", ite);
            } catch(NoSuchMethodException nsme) {
                Log.error("Method not found for [" + className + "]: ", nsme);
            }
            if (this.pluginAction == null) {
                Log.error("PAD, Could not get class [" + className + "]");
            }
        }
        return this.pluginAction;
    }

    public IPluginDescriptor getParent() {
        return this.parent;
    }

    public PluginApiModel getPluginApiModel() {
        return this.pluginApiModel;
    }

    private IPluginClassLoader getPluginClassLoader() {
        return this.pluginClassLoader;
    }
}
