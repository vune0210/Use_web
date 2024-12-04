import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CountItem} from "./CountItem";

interface LinkCountStore {
    count: CountItem[];
}

export const linkCountSlice = createSlice({
    name: "linkCount",
    initialState: {
        count: [],
    } as LinkCountStore,
    reducers: {
        updateLinkCount(
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

export const {updateLinkCount} = linkCountSlice.actions;

export default linkCountSlice.reducer;
