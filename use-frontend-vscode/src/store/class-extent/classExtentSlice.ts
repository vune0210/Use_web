import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ClassExtentResp} from "../../api";

interface ClassExtentStore {
    resp: ClassExtentResp | null
}

export const classExtentSlice = createSlice({
    name: "class-invariants",
    initialState: {
        resp: null,
    } as ClassExtentStore,
    reducers: {
        updateClassExtent(state, action: PayloadAction<{ resp: ClassExtentResp }>) {
            state.resp = action.payload.resp;
        },
    },
});

export const {updateClassExtent} = classExtentSlice.actions;

export default classExtentSlice.reducer;
