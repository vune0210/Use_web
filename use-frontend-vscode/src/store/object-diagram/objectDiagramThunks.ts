import {createAsyncThunk} from "@reduxjs/toolkit";
import {updateObjectDiagram} from "./objectDiagramSlice";
import {viewApi} from "../../api/view/ViewApi.ts";

export const loadObjectDiagramThunk = createAsyncThunk(
    "object-diagram/load",
    async (args, thunkAPI) => {
        const res = await viewApi.getObjectDiagram();
        thunkAPI.dispatch(
            updateObjectDiagram({objects: res.linkedObjects, links: res.links})
        );
    }
);
