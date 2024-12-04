package org.tzi.use.kodkod.plugin_web;

import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.web.multipart.MultipartFile;
import org.tzi.kodkod.model.iface.IAttribute;
import org.tzi.kodkod.model.iface.IModel;
import org.tzi.use.kodkod.plugin.KodkodValidateCmd;
import org.tzi.use.kodkod.plugin.gui.model.data.*;
import org.tzi.use.kodkod.plugin.gui.util.ChangeConfiguration;
import org.tzi.use.usebackend.api_resp.ApiResponse;
import org.tzi.use.usebackend.controller.plugin.IPluginApi;
import org.tzi.use.usebackend.controller.plugin.IPluginApiDelegate;

import java.util.Iterator;
import java.util.LinkedHashSet;
import java.util.Map;
import java.util.Set;

public class ModelValidatorConfigurationApi extends KodkodValidateCmd implements IPluginApiDelegate {
    @Override
    public ApiResponse performApiGet(IPluginApi pluginApi, String subPath, String query) {
        return new ApiResponse(false, "Not support get method");
    }

    @Override
    public ApiResponse performApiPost(IPluginApi pluginApi, String subPath, JsonNode body, MultipartFile[] files) {
        if (!pluginApi.getSession().hasSystem()) {
            return new ApiResponse(false, "No model present.");
        }

        initialize(pluginApi.getSession());
        IModel model = model();
        SettingsConfiguration settingsConfiguration = new SettingsConfiguration(model);

        this.parseSettingConfigBody(settingsConfiguration, body);

        extractConfigureAndValidate(ChangeConfiguration.toProperties(settingsConfiguration, model));

        return new ApiResponse(true, "Please check console log for result");
    }

    protected void parseSettingConfigBody(SettingsConfiguration settingsConfiguration, JsonNode body) {
        IModel model = model();

        JsonNode integerTypeSettings = body.get("integerTypeSettings");
        if (integerTypeSettings != null) {
            JsonNode minimum = integerTypeSettings.get("minimum");
            if (minimum != null) settingsConfiguration.getIntegerTypeSettings().setMinimum(minimum.asInt());

            JsonNode maximum = integerTypeSettings.get("maximum");
            if (maximum != null) settingsConfiguration.getIntegerTypeSettings().setMaximum(maximum.asInt());

            JsonNode enabled = integerTypeSettings.get("enabled");
            if (enabled != null) settingsConfiguration.getIntegerTypeSettings().setEnabled(enabled.asBoolean());

            JsonNode values = integerTypeSettings.get("values");
            if (values != null && values.isArray()) {
                Set<Integer> valuesSet = new LinkedHashSet<>();
                for (JsonNode node : values) {
                    valuesSet.add(node.asInt());
                }
                settingsConfiguration.getIntegerTypeSettings().setValues(valuesSet);
            }
        }

        JsonNode stringTypeSettings = body.get("stringTypeSettings");
        if (stringTypeSettings != null) {
            parseInstanceSettings(settingsConfiguration.getStringTypeSettings(), stringTypeSettings);
            JsonNode enabled = stringTypeSettings.get("enabled");
            if (enabled != null) settingsConfiguration.getStringTypeSettings().setEnabled(enabled.asBoolean());
        }

        JsonNode realTypeSettings = body.get("realTypeSettings");
        if (realTypeSettings != null) {
            JsonNode minimum = realTypeSettings.get("minimum");
            if (minimum != null) settingsConfiguration.getRealTypeSettings().setMinimum(minimum.asDouble());

            JsonNode maximum = realTypeSettings.get("maximum");
            if (maximum != null) settingsConfiguration.getRealTypeSettings().setMaximum(maximum.asDouble());

            JsonNode enabled = realTypeSettings.get("enabled");
            if (enabled != null) settingsConfiguration.getRealTypeSettings().setEnabled(enabled.asBoolean());

            JsonNode realStep = realTypeSettings.get("realStep");
            if (enabled != null) settingsConfiguration.getRealTypeSettings().setStep(realStep.asDouble());

            JsonNode values = realTypeSettings.get("values");
            if (values != null && values.isArray()) {
                Set<Double> valuesSet = new LinkedHashSet<>();
                for (JsonNode node : values) {
                    valuesSet.add(node.asDouble());
                }
                settingsConfiguration.getRealTypeSettings().setValues(valuesSet);
            }
        }

        JsonNode optionSettings = body.get("optionSettings");
        if (optionSettings != null) {
            JsonNode aggregationcyclefreeness = optionSettings.get("aggregationcyclefreeness");
            if (aggregationcyclefreeness != null)
                settingsConfiguration.getOptionSettings().setAggregationcyclefreeness(aggregationcyclefreeness.asBoolean());

            JsonNode forbiddensharing = optionSettings.get("forbiddensharing");
            if (forbiddensharing != null)
                settingsConfiguration.getOptionSettings().setForbiddensharing(forbiddensharing.asBoolean());
        }

        JsonNode classSettingsMap = body.get("classSettings");
        if (classSettingsMap != null) {
            for (Iterator<String> it = classSettingsMap.fieldNames(); it.hasNext(); ) {
                String clsName = it.next();

                JsonNode classSettings = classSettingsMap.get(clsName);
                ClassSettings classSettingsIns = settingsConfiguration.getClassSettings(clsName);

                if (classSettings != null) {
                    parseInstanceSettings(classSettingsIns, classSettings);

                    JsonNode attributeSettingsMap = classSettings.get("attributeSettings");
                    Map<IAttribute, AttributeSettings> attributeSettingsMapIns = classSettingsIns.getAttributeSettings();

                    if (attributeSettingsMap != null) {
                        for (Iterator<String> iter = attributeSettingsMap.fieldNames(); iter.hasNext(); ) {
                            String attrName = iter.next();

                            JsonNode attributeSettings = attributeSettingsMap.get(attrName);
                            AttributeSettings attributeSettingsIns = attributeSettingsMapIns.get(classSettingsIns.getCls().getAttribute(attrName));
                            if (attributeSettings != null) {
                                JsonNode collectionSizeMin = attributeSettings.get("collectionSizeMin");
                                parseInstanceSettings(attributeSettingsIns, attributeSettings);
                                if (collectionSizeMin != null)
                                    attributeSettingsIns.setCollectionSizeMin(collectionSizeMin.asInt());

                                JsonNode collectionSizeMax = attributeSettings.get("collectionSizeMax");
                                if (collectionSizeMax != null)
                                    attributeSettingsIns.setCollectionSizeMax(collectionSizeMax.asInt());

                            }

                        }
                    }


                }
            }
        }

        JsonNode associationSettingsMap = body.get("associationSettings");
        if (associationSettingsMap != null) {
            for (Iterator<String> it = associationSettingsMap.fieldNames(); it.hasNext(); ) {
                String assocName = it.next();

                JsonNode associationSettings = associationSettingsMap.get(assocName);
                AssociationSettings associationSettingsIns = settingsConfiguration.getAssociationSettings(model.getAssociation(assocName));

                if (associationSettings != null) {
                    parseInstanceSettings(associationSettingsIns, associationSettings);
                }
            }
        }

        JsonNode invariantSettingsMap = body.get("invariantSettings");
        if (invariantSettingsMap != null) {
            for (Iterator<String> it = invariantSettingsMap.fieldNames(); it.hasNext(); ) {
                String invName = it.next();

                JsonNode invariantSettings = invariantSettingsMap.get(invName);
                InvariantSettings invariantSettingsIns = settingsConfiguration.getInvariantSetting(model.getInvariant(invName));

                if (invariantSettings != null) {
                    JsonNode active = invariantSettings.get("active");
                    if (active != null) invariantSettingsIns.setActive(active.asBoolean());

                    JsonNode negate = invariantSettings.get("negate");
                    if (negate != null) invariantSettingsIns.setNegate(negate.asBoolean());
                }
            }
        }
    }

    protected void parseInstanceSettings(InstanceSettings instanceSettings, JsonNode json) {
        JsonNode lowerBound = json.get("lowerBound");
        if (lowerBound != null) instanceSettings.setLowerBound(lowerBound.asInt());

        JsonNode upperBound = json.get("upperBound");
        if (upperBound != null) instanceSettings.setUpperBound(upperBound.asInt());

        JsonNode instanceNames = json.get("instanceNames");
        if (instanceNames != null && instanceNames.isArray()) {
            Set<String> instanceNamesSet = new LinkedHashSet<>();
            for (JsonNode node : instanceNames) {
                instanceNamesSet.add(node.asText());
            }
            instanceSettings.setInstanceNames(instanceNamesSet);
        }
    }
}
