import {createAsyncThunk} from "@reduxjs/toolkit";
import {modalBrowserApi} from "../../api/modal-browser/ModalBrowserApi";
import {updateModalBrowser} from "./modalBrowserSlice";

export const loadModalBrowserThunk = createAsyncThunk(
    "modal-browser/load",
    async (args, thunkAPI) => {
        const res = await modalBrowserApi.get();
        thunkAPI.dispatch(
            updateModalBrowser({treeData: res.top})
        );
    }
);
  