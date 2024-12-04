package org.tzi.use.usebackend.controller.plugin;

import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.web.multipart.MultipartFile;
import org.tzi.use.main.Session;
import org.tzi.use.runtime.IPlugin;
import org.tzi.use.runtime.IPluginRuntime;
import org.tzi.use.runtime.impl.PluginRuntime;
import org.tzi.use.usebackend.api_resp.ApiResponse;
import org.tzi.use.util.Log;

public class PluginApi implements IPluginApi{
    private final IPluginApiDescriptor pluginApiDescriptor;

    private IPluginApiDelegate pluginApiDelegate;

    private final Session session;

    public PluginApi(IPluginApiDescriptor pluginApiDescriptor, Session session) {
        this.pluginApiDescriptor = pluginApiDescriptor;
        this.session = session;
    }

    private IPluginApiDelegate getPluginApiDelegate() {
        if (this.pluginApiDelegate == null) {
            this.pluginApiDelegate = createApiDelegate();
        }

        return this.pluginApiDelegate;
    }

    private IPluginApiDelegate createApiDelegate() {
        IPlugin thePlugin = this.pluginApiDescriptor.getParent().getPluginClass();

        if (thePlugin == null) {
            Log.debug("No main plugin class found! Running ActionDelegate directly.");
        } else {
            try {
                IPluginRuntime pluginRuntime = PluginRuntime.getInstance();
                Log.debug("Plugin not started yet, starting now...");
                thePlugin.run(pluginRuntime);
            } catch (Exception e) {
                String msg = "The plugin [" + thePlugin.getName() + "] could not be started! ";
                Log.error(msg + e);
                throw new RuntimeException(msg, e);
            }
        }

        this.pluginApiDelegate = this.pluginApiDescriptor.getApiClass();

        return this.pluginApiDelegate;
    }


    @Override
    public ApiResponse performGetMethod(String subPath, String query) {
        return this.getPluginApiDelegate().performApiGet(this, subPath, query);
    }

    @Override
    public ApiResponse performPostMethod(String subPath, JsonNode body, MultipartFile[] files) {
        return this.getPluginApiDelegate().performApiPost(this, subPath, body, files);
    }

    @Override
    public Session getSession() {
        return this.session;
    }
}
