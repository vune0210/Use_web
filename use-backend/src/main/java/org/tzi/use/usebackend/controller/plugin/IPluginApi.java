package org.tzi.use.usebackend.controller.plugin;

import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.web.multipart.MultipartFile;
import org.tzi.use.main.Session;
import org.tzi.use.usebackend.api_resp.ApiResponse;

public interface IPluginApi {
        ApiResponse performGetMethod(String path, String query);

        ApiResponse performPostMethod(String subPath, JsonNode body, MultipartFile[] files);

        Session getSession();

}
