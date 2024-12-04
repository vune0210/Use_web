import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface CallstackStore {
    callstack: string[];
}

export const callstackSlice = createSlice({
    name: "callstack",
    initialState: {
        callstack: [],
    } as CallstackStore,
    reducers: {
        updateCallstack(state, action: PayloadAction<{ callstack: string[] }>) {
            state.callstack = action.payload.callstack;
        },
    },
});

export const {updateCallstack} = callstackSlice.actions;

export default callstackSlice.reducer;
