import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ClassInvariantEvalRes} from "./types/ClassInvariantEvalRes.ts";

interface ClassInvariantStore {
    classInvariants: ClassInvariantEvalRes[]
}

export const classInvariantsSlice = createSlice({
    name: "class-invariants",
    initialState: {
        classInvariants: [],
    } as ClassInvariantStore,
    reducers: {
        updateClassInvariants(state, action: PayloadAction<{ classInvariants: ClassInvariantEvalRes[] }>) {
            state.classInvariants = action.payload.classInvariants;
        },
    },
});

export const {updateClassInvariants} = classInvariantsSlice.actions;

export default classInvariantsSlice.reducer;
