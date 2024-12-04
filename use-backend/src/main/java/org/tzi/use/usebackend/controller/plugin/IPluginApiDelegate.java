package org.tzi.use.usebackend.controller.plugin;

import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.web.multipart.MultipartFile;
import org.tzi.use.usebackend.api_resp.ApiResponse;

public interface IPluginApiDelegate {
    ApiResponse performApiGet(IPluginApi pluginApi, String subPath, String query);

    ApiResponse performApiPost(IPluginApi pluginApi, String subPath, JsonNode body, MultipartFile[] files);
}
