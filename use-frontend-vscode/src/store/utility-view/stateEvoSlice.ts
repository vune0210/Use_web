import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface StateEvoStore {
    objectCount: number;
    linkCount: number;
}

export const stateEvoSlice = createSlice({
    name: "state-evo",
    initialState: {
        objectCount: 0,
        linkCount: 0
    } as StateEvoStore,
    reducers: {
        updateStateEvo(state, action: PayloadAction<{ objectCount: number, linkCount: number }>) {
            state.objectCount = action.payload.objectCount;
            state.linkCount = action.payload.linkCount;
        },
    },
});

export const {updateStateEvo} = stateEvoSlice.actions;

export default stateEvoSlice.reducer;
