import {createAsyncThunk} from "@reduxjs/toolkit";
import {viewApi} from "../../api";
import {updateEvents} from "./eventsSlice.ts";

export const loadEventThunk = createAsyncThunk(
    "events/load",
    async (args, thunkAPI) => {
        const res = await viewApi.getEvents();
        thunkAPI.dispatch(
            updateEvents({events: res.events})
        );
    }
);
