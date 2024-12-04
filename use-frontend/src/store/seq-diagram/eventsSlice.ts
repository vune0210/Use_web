import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Event} from "../../api/view/types/EventResp.ts";

interface EventSlice {
    events: Event[]
}

const eventSlice = createSlice({
    name: "events",
    initialState: {
        events: []
    } as EventSlice,
    reducers: {
        updateEvents(
            state,
            action: PayloadAction<{
                events: Event[]
            }>
        ) {
            state.events = action.payload.events;
        },
    },
});

export const {updateEvents} =
    eventSlice.actions;
export default eventSlice.reducer;
