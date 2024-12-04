import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {castDraft} from "immer";
import {Link, Object} from "../../api";

interface ObjectDiagramSlice {
    objects: Object[];
    links: Link[];
}

const objectDiagramSlice = createSlice({
    name: "object-diagram",
    initialState: {
        objects: [],
        links: [],
    } as ObjectDiagramSlice,
    reducers: {
        updateObjectDiagram(
            state,
            action: PayloadAction<{
                objects: Object[];
                links: Link[];
            }>
        ) {
            state.objects = castDraft(action.payload.objects);
            state.links = action.payload.links;
        },
        moveElement(
            state,
            action: PayloadAction<{ id: string; x: number; y: number }>
        ) {
            const {id, x, y} = action.payload;
            state.objects = state.objects.map((ele) => {
                if (ele.fLabel === id) {
                    ele.x = x;
                    ele.y = y;
                }
                return ele;
            });
        },
        hideElement(state, action: PayloadAction<{ id: string }>) {
            const {id} = action.payload;
            state.objects = state.objects.map((ele) => {
                if (ele.fLabel === id) {
                    ele.hidden = true;
                }
                return ele;
            });
        },
    },
});

export const {updateObjectDiagram, moveElement, hideElement} =
    objectDiagramSlice.actions;
export default objectDiagramSlice.reducer;
