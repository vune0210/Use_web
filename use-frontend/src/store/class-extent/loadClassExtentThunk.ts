import {createAsyncThunk} from "@reduxjs/toolkit";
import {viewApi} from "../../api";
import {updateClassExtent} from "./classExtentSlice.ts";

export const loadClassExtentThunk = createAsyncThunk<void, string>(
    "class-extent/load",
    async (args, thunkAPI) => {
        const resp = await viewApi.getClassExtent(args);
        thunkAPI.dispatch(updateClassExtent({
            resp
        }));
    }
);