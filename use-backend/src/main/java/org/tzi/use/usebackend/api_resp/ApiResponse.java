package org.tzi.use.usebackend.api_resp;

public class ApiResponse {
    private final boolean success;
    private final String message;

    public ApiResponse() {
        this.success = true;
        this.message = null;
    }

    public ApiResponse(boolean success, String message) {
        this.success = success;
        this.message = message;
    }

    public boolean isSuccess() {
        return success;
    }

    public String getMessage() {
        return message;
    }
}
