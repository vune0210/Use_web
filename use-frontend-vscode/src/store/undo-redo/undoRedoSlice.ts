import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface UndoRedoSlice {
    undoEnabled: boolean;
    undoDescription?: string;
    redoEnabled: boolean;
    redoDescription?: string;
}

const undoRedoSlice = createSlice({
    name: "undoRedo",
    initialState: {
        undoEnabled: false,
        redoEnabled: false
    } as UndoRedoSlice,
    reducers: {
        updateUndoRedo(
            state,
            action: PayloadAction<UndoRedoSlice>
        ) {
            state.undoEnabled = action.payload.undoEnabled;
            state.undoDescription = action.payload.undoDescription;
            state.redoEnabled = action.payload.redoEnabled;
            state.redoDescription = action.payload.redoDescription;
        },
    },
});

export const {updateUndoRedo} =
    undoRedoSlice.actions;
export default undoRedoSlice.reducer;
