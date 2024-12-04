import {createAsyncThunk} from "@reduxjs/toolkit";
import {viewApi} from "../../api";
import {updateClassInvariants} from "./classInvariantSlice.ts";

export const loadClassInvariantsThunk = createAsyncThunk(
    "class-invariants/load",
    async (args, thunkAPI) => {
        const res = await viewApi.getClassInvariant();
        thunkAPI.dispatch(updateClassInvariants({
            classInvariants: res.classInvariants.map((v, i) => ({...v, ...res.evalResults[i]}))
        }));
    }
);