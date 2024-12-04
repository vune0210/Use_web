package org.tzi.use.usebackend.controller;

import org.tzi.use.config.Options;
import org.tzi.use.main.Session;
import org.tzi.use.main.runtime.IRuntime;
import org.tzi.use.main.shell.Shell;
import org.tzi.use.main.shell.ShellUtil;
import org.tzi.use.main.shell.runtime.IPluginShellExtensionPoint;
import org.tzi.use.runtime.model.PluginModel;
import org.tzi.use.runtime.shell.impl.PluginShellCmdFactory;
import org.tzi.use.usebackend.api_resp.plugins.PluginInfo;
import org.tzi.use.usebackend.controller.gui.BEWriter;
import org.tzi.use.util.StringUtil;

import java.util.ArrayList;
import java.util.List;

public class PluginsManagerBE {
    private final List<PluginShellCmdFactory.PluginShellCmdContainer> pluginCommands;
    IRuntime fPluginRuntime;
    Session fSession;
    BEWriter writer;
    private IPluginShellExtensionPoint shellExtensionPoint;

    public PluginsManagerBE(IRuntime pluginRuntime, Session session, Shell shell, BEWriter writer) {
        this.fPluginRuntime = pluginRuntime;
        this.fSession = session;
        this.writer = writer;
        this.shellExtensionPoint = (IPluginShellExtensionPoint) this.fPluginRuntime
                .getExtensionPoint("shell");

        this.pluginCommands = this.shellExtensionPoint.createPluginCmds(this.fSession, shell);
    }

    public ArrayList<PluginInfo> getPluginList() {
        ArrayList<PluginInfo> plugins = new ArrayList<>();
        for (PluginShellCmdFactory.PluginShellCmdContainer currentCmdMapEntry : this.pluginCommands) {
            plugins.add(new PluginInfo(currentCmdMapEntry.getCmd(), currentCmdMapEntry.getCmd(), currentCmdMapEntry.getHelp(), currentCmdMapEntry.getAlias()));
        }
        return plugins;
    }

    public PluginShellCmdFactory.PluginShellCmdContainer findPluginCmd(String cmd) {
        for (PluginShellCmdFactory.PluginShellCmdContainer currentCmdMapEntry : this.pluginCommands) {
            if (cmd.startsWith(currentCmdMapEntry.getCmd())) {
                return currentCmdMapEntry;
            } else if ((currentCmdMapEntry.getAlias() != null && cmd.startsWith(currentCmdMapEntry.getAlias()))) {
                return currentCmdMapEntry;
            }
        }
        return null;
    }

    public String executePluginCmd(String cmd, String arguments) {
        PluginShellCmdFactory.PluginShellCmdContainer pluginCmd = findPluginCmd(cmd);
        if (pluginCmd == null) {
            throw new RuntimeException("Plugin not found");
        }
        System.out.printf("EXECUTE %s %s%n", cmd, arguments);
        try {
            this.writer.flushBuffer();
            pluginCmd.getProxy().executeCmd(pluginCmd.getCmd(), arguments, ShellUtil.parseArgumentList(arguments));
            return this.writer.flushBuffer();
        } catch (Exception ex) {
            PluginModel crashedPlugin = pluginCmd.getProxy().getDescriptor().getParent().getPluginModel();
            StringBuilder stringBuilder = new StringBuilder();
            String nl = Options.LINE_SEPARATOR;
            stringBuilder.append("INTERNAL ERROR in Plugin "
                    + StringUtil.inQuotes(crashedPlugin.getName()) + ":"
                    + nl
                    + "An unexpected exception occured. This happened most probably due to an"
                    + nl
                    + "error in the plugin. The program will try to continue, but may not be"
                    + nl
                    + "able to recover from the error. If the problem persists, please contact"
                    + nl
                    + "the plugin creators with a description of your last input and include"
                    + nl
                    + "the following output:" + nl);
            stringBuilder.append("USE version: " + Options.RELEASE_VERSION + nl);
            stringBuilder.append("Plugin version: " + crashedPlugin.getVersion() + nl);
            stringBuilder.append("Plugin publisher: " + crashedPlugin.getPublisher() + nl);
            stringBuilder.append("Executed command: " + cmd + " " + arguments);
            stringBuilder.append("Stack trace: " + nl);
            ex.printStackTrace(System.err);
            throw new RuntimeException(stringBuilder.toString());
        }
    }
}
