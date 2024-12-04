import {createAsyncThunk} from "@reduxjs/toolkit";
import {viewApi} from "../../api/view/ViewApi";
import {updateObjectCount} from "./objectCountSlice";
import {updateLinkCount} from "./linkCountSlice";
import {updateCommandList} from "./commandListSlice";
import {updateCallstack} from "./callStackSlice.ts";
import {updateStateEvo} from "./stateEvoSlice.ts";

export const loadObjectCountThunk = createAsyncThunk(
    "object-count/load",
    async (args, thunkAPI) => {
        const res = await viewApi.getObjectCount();
        thunkAPI.dispatch(updateObjectCount({count: res.countMap}));
    }
);

export const loadLinkCountThunk = createAsyncThunk(
    "link-count/load",
    async (args, thunkAPI) => {
        const res = await viewApi.getLinkCount();
        thunkAPI.dispatch(updateLinkCount({count: res.countMap}));
    }
);

export const loadStateEvoThunk = createAsyncThunk(
    "state-evo/load",
    async (args, thunkAPI) => {
        const res = await viewApi.getStateEvolution();
        thunkAPI.dispatch(updateStateEvo({objectCount: res.objectCount, linkCount: res.linkCount}));
    }
);


export const loadCommandListThunk = createAsyncThunk(
    "command-list/load",
    async (args, thunkAPI) => {
        const res = await viewApi.getCommandList();
        thunkAPI.dispatch(updateCommandList({commandList: res.commandList}));
    }
);

export const loadCallstackThunk = createAsyncThunk(
    "callstack/load",
    async (args, thunkAPI) => {
        const res = await viewApi.getCallstack();
        thunkAPI.dispatch(updateCallstack({callstack: res.callstack}));
    }
);