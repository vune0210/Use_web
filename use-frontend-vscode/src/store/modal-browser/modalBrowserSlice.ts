import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ModalNode} from "../../api/modal-browser/ModalBrowserResp";

interface ModalBrowserSlice {
    treeData: ModalNode | null
}

const modalBrowserSlice = createSlice({
    name: "class-diagram",
    initialState: {
        treeData: null
    } as ModalBrowserSlice,
    reducers: {
        updateModalBrowser(
            state,
            action: PayloadAction<{
                treeData: ModalNode
            }>
        ) {
            state.treeData = action.payload.treeData;
        },

    },
});

export const {updateModalBrowser} = modalBrowserSlice.actions;
export default modalBrowserSlice.reducer;
