import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CountItem} from "./CountItem";

interface ObjectCountStore {
    count: CountItem[];
}

export const objectCountSlice = createSlice({
    name: "objectCount",
    initialState: {
        count: [],
    } as ObjectCountStore,
    reducers: {
        updateObjectCount(
            state,
            action: PayloadAction<{ count: Record<string, number> }>
        ) {
            state.count = Object.keys(action.payload.count).map((name) => ({
                name,
                count: action.payload.count[name],
            }));
        },
    },
});

export const {updateObjectCount} = objectCountSlice.actions;

export default objectCountSlice.reducer;
