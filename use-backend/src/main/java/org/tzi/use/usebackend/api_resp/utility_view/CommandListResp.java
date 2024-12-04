package org.tzi.use.usebackend.api_resp.utility_view;

import org.tzi.use.usebackend.api_resp.ApiResponse;

import java.util.List;

public class CommandListResp extends ApiResponse {
    List<String> commandList;
    public CommandListResp(List<String> commandList) {
        this.commandList = commandList;
    }

    public CommandListResp(boolean success, String message) {
        super(success, message);
    }

    public List<String> getCommandList() {
        return commandList;
    }

    public void setCommandList(List<String> commandList) {
        this.commandList = commandList;
    }
}
