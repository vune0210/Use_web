package org.tzi.use.usebackend.api_resp.plugins;

import java.util.Objects;

public final class PluginInfo {
    private final String name;
    private final String command;
    private final String help;
    private final String alias;

    public PluginInfo(String name, String command, String help, String alias) {
        this.name = name;
        this.command = command;
        this.help = help;
        this.alias = alias;
    }

    public String name() {
        return name;
    }

    public String command() {
        return command;
    }

    public String help() {
        return help;
    }

    public String alias() {
        return alias;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == this) return true;
        if (obj == null || obj.getClass() != this.getClass()) return false;
        PluginInfo that = (PluginInfo) obj;
        return Objects.equals(this.name, that.name) &&
                Objects.equals(this.command, that.command) &&
                Objects.equals(this.help, that.help) &&
                Objects.equals(this.alias, that.alias);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, command, help, alias);
    }

    @Override
    public String toString() {
        return "PluginInfo[" +
                "name=" + name + ", " +
                "command=" + command + ", " +
                "help=" + help + ", " +
                "alias=" + alias + ']';
    }

}
