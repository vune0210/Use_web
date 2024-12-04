package org.tzi.use.usebackend.controller.plugin;

import org.tzi.use.gui.main.runtime.IPluginActionExtensionPoint;
import org.tzi.use.main.runtime.IRuntime;
import org.tzi.use.main.shell.runtime.IPluginShellExtensionPoint;
import org.tzi.use.runtime.IPluginDescriptor;
import org.tzi.use.runtime.IPluginRuntime;
import org.tzi.use.runtime.MainPluginRuntime;
import org.tzi.use.runtime.impl.PluginRuntime;
import org.tzi.use.util.Log;
import org.tzi.use.util.StringUtil;

import java.io.File;
import java.io.FilenameFilter;
import java.net.MalformedURLException;
import java.nio.file.Path;

/**
 * Copy from MainPluginRuntime.java
 * use PluginRuntimeBE instead of PluginRuntime.java
 */
public class MainPluginRuntimeBE {

    /**
     * Jar filename Filter
     */
    public static class JarFilter implements FilenameFilter {
        public boolean accept(File dir, String name) {
            return (name.endsWith(".jar"));
        }
    }

    /**
     * Method to get all filename with jar-extension in the given location.
     *
     * @param pluginDirURL
     *            The Plugin location path
     * @return Array of jar-filenames
     */
    private static String[] getJarFileNames(Path pluginDirURL) {

        String[] fileNames = null;
        File pluginDir = pluginDirURL.toFile();

        Log.debug("Searching for plugins in: [" + pluginDirURL.toString()+ "]");
        Log.debug("Plugin path validity: [" + pluginDir.exists() + "]");

        MainPluginRuntime.JarFilter jarFilter = new MainPluginRuntime.JarFilter();
        fileNames = pluginDir.list(jarFilter);

        if(fileNames == null){
            Log.error("Could not read plugin directory " + StringUtil.inQuotes(pluginDir) + ".");
            return new String[0];
        }

        StringBuilder verboseMsg = new StringBuilder("Plugin filename(s) [");
        StringUtil.fmtSeq(verboseMsg, fileNames, ",");
        verboseMsg.append("]");
        Log.verbose(verboseMsg.toString());

        return fileNames;
    }

    /**
     * Method to startup the Plugin Runtime using the given location path.
     *
     * @param pluginDirURL
     *            The Plugin location path
     * @return The Plugin Runtime object
     */
    public static IRuntime run(Path pluginDirURL) {
        String[] pluginFileNames;
        pluginFileNames = getJarFileNames(pluginDirURL);
        Log.debug("Counted [" + pluginFileNames.length + "]"
                + " files in directory");

        // new plugin runtime for api support
        IPluginRuntime pluginRuntime = PluginRuntimeBE.getInstance();
        IPluginRuntime originPluginRuntime = PluginRuntime.getInstance();

        for (int cntFiles = 0; cntFiles < pluginFileNames.length;) {
            String pluginFilename = pluginFileNames[cntFiles];
            Log.debug("Current plugin filename [" + pluginFilename + "]");
            try {
                // new plugin runtime for api support
                pluginRuntime.registerPlugin(pluginFilename, pluginDirURL.toUri().toURL());
                originPluginRuntime.registerPlugin(pluginFilename, pluginDirURL.toUri().toURL());
            } catch (MalformedURLException e) {
                Log.error("Could not convert filepath " + StringUtil.inQuotes(pluginDirURL) + ". Skipping plugin.");
                continue;
            }
            Log.debug("ClassLoader of runtime ["
                    + Thread.currentThread().getContextClassLoader().toString()
                    + "]");
            cntFiles++;
        }

        IPluginActionExtensionPoint actionExtensionPoint = (IPluginActionExtensionPoint) pluginRuntime
                .getExtensionPoint("action");

        IPluginShellExtensionPoint shellExtensionPoint = (IPluginShellExtensionPoint) pluginRuntime
                .getExtensionPoint("shell");

        // add get api ext point
        IPluginApiExtensionPoint apiExtensionPoint = (IPluginApiExtensionPoint) pluginRuntime
                .getExtensionPoint("api");

        Log.debug("Registered [" + pluginRuntime.getPlugins().size() + "] plugins");

        for (IPluginDescriptor currentPluginDescriptor : pluginRuntime.getPlugins().values()) {
            Log.debug("Main: Registering services");
            pluginRuntime.registerServices(currentPluginDescriptor);
            Log.debug("Main: Registering actions");
            actionExtensionPoint.registerActions(currentPluginDescriptor);
            Log.debug("Main: Registering commands");
            shellExtensionPoint.registerCmds(currentPluginDescriptor);
            // add register api
            Log.debug("Main: Registering apis");
            apiExtensionPoint.registerApis(currentPluginDescriptor);
        }
        return pluginRuntime;
    }
}
