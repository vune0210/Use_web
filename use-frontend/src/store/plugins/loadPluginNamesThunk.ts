import {createAsyncThunk} from "@reduxjs/toolkit";
import {systemApi} from "../../api";
import {updatePluginNames} from "./pluginSlice.ts";

export const loadPluginNamesThunk = createAsyncThunk(
    "plugins/load",
    async (args, thunkAPI) => {
        const res = await systemApi.getPluginList();
        thunkAPI.dispatch(
            updatePluginNames({pluginNames: res.pluginNames})
        );
    }
);