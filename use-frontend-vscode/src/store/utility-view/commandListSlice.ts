import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface CommandListStore {
    commandList: string[];
}

export const commandListSlice = createSlice({
    name: "command-list",
    initialState: {
        commandList: [],
    } as CommandListStore,
    reducers: {
        updateCommandList(state, action: PayloadAction<{ commandList: string[] }>) {
            state.commandList = action.payload.commandList;
        },
    },
});

export const {updateCommandList} = commandListSlice.actions;

export default commandListSlice.reducer;
