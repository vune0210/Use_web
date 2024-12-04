package org.tzi.use.usebackend.controller.plugin;

import org.tzi.use.runtime.IPluginDescriptor;
import org.tzi.use.runtime.impl.Plugin;
import org.tzi.use.util.Log;

import java.net.MalformedURLException;
import java.net.URL;

public abstract class PluginBE extends Plugin {
    @Override
    public URL getResource(String name) {
        URL resourceUrl = null;

        IPluginDescriptor desc = PluginRuntimeBE.getInstance().getPlugins().get(this.getName());

        String urlString = "jar:" + desc.getPluginLocation() + "!/" + name;

        try {
            resourceUrl = new URL(urlString);
        } catch (MalformedURLException e) {
            Log.error("The URL to the image ["
                    + urlString
                    + "] was malformed!");
            return null;
        }

        return resourceUrl;
    }
}
