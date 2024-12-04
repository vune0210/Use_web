package org.tzi.use.usebackend.controller.plugin;

import org.tzi.use.main.Session;
import org.tzi.use.main.runtime.IDescriptor;
import org.tzi.use.runtime.IPluginDescriptor;

import java.util.HashMap;
import java.util.Map;
import java.util.Vector;

public class ApiExtensionPoint implements IPluginApiExtensionPoint {

    private static ApiExtensionPoint instance = new ApiExtensionPoint();

    /**
     * Method returning the Singleton instance of the ApiExtensionPoint
     *
     * @return The ApiExtensionPoint instance
     */
    public static IPluginApiExtensionPoint getInstance() {
        return instance;
    }

    /**
     * Private default Constructor.
     */
    private ApiExtensionPoint() {
    }

    private Vector<IPluginApiDescriptor> registeredApi;

    public Map<String, PluginApi> createPluginApi(Session session) {
        Map<String, PluginApi> actionsMap = new HashMap<String, PluginApi>();

        for (IPluginApiDescriptor currentApiDescriptor : getPluginApis()) {
            PluginApiModel currentApiModel = currentApiDescriptor.getPluginApiModel();
            actionsMap.put(currentApiModel.getPath(), new PluginApi(
                    currentApiDescriptor, session));
        }

        return actionsMap;
    }

    private Vector<IPluginApiDescriptor> getPluginApis() {
        if (this.registeredApi == null) {
            this.registeredApi = new Vector<IPluginApiDescriptor>();
        }
        return this.registeredApi;
    }

    private void registerApi(IPluginApiDescriptor pluginActionDescriptor) {
        getPluginApis().add(pluginActionDescriptor);
    }

    public void registerApis(IDescriptor pluginDescriptor) {
        ApiRegistry apiRegistry = ApiRegistry.getInstance();

        IPluginDescriptor currentPluginDescriptor = (IPluginDescriptor) pluginDescriptor;

        Vector<PluginApiModel> pluginApis = ((PluginModelBE)currentPluginDescriptor.getPluginModel()).getApis();

        for (int cntPluginActions = 0; cntPluginActions < pluginApis.size();) {
            PluginApiModel currentPluginApiModel = pluginApis.get(cntPluginActions);
            IPluginApiDescriptor currentPluginActionDescriptor = apiRegistry
                    .registerPluginApi(currentPluginDescriptor,
                            currentPluginApiModel);

            registerApi(currentPluginActionDescriptor);
            cntPluginActions++;
        }
    }
}
