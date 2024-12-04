package org.tzi.use.usebackend.controller;

import org.springframework.http.MediaType;

public class ContentType {
    static final MediaType TEXT_JS = new MediaType("text", "javascript");
    static final MediaType TEXT_CSS = new MediaType("text", "css");
    public static MediaType getContentType(String fileName) {
        if (fileName.endsWith(".js")) {
            return TEXT_JS;
        }
        if (fileName.endsWith(".css")) {
            return TEXT_CSS;
        }
        if (fileName.endsWith(".html")) {
            return MediaType.TEXT_HTML;
        }
        return MediaType.APPLICATION_JSON;
    }
}