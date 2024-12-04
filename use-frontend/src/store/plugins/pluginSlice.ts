import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface PluginsStore {
    pluginNames: string[];
}

export const pluginsSlice = createSlice({
    name: "objectCount",
    initialState: {
        pluginNames: [],
    } as PluginsStore,
    reducers: {
        updatePluginNames(
            state,
            action: PayloadAction<{ pluginNames: string[] }>
        ) {
            state.pluginNames = action.payload.pluginNames;
        },
    },
});

export const {updatePluginNames} = pluginsSlice.actions;

export default pluginsSlice.reducer;
