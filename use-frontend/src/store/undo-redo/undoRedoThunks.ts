import {createAsyncThunk} from "@reduxjs/toolkit";
import {systemApi} from "../../api/system/SystemApi.ts";
import {updateUndoRedo} from "./undoRedoSlice.ts";
import {message} from "antd";
import {
    loadCommandListThunk,
    loadLinkCountThunk,
    loadObjectCountThunk,
    loadStateEvoThunk
} from "../utility-view/loadUtiltyViewThunk.ts";
import {loadObjectDiagramThunk} from "../object-diagram/objectDiagramThunks.ts";

export const loadUndoRedoThunk = createAsyncThunk(
    "system/load-undo-redo",
    async (args, thunkAPI) => {
        const res = await systemApi.getUndoRedoAvailability();
        thunkAPI.dispatch(
            updateUndoRedo(res)
        );
    }
);

export const undoThunk = createAsyncThunk(
    "system/undo",
    async (args, thunkAPI) => {
        const resp = await systemApi.undo();
        if (!resp.success) {
            return message.error(resp.message);
        }
        thunkAPI.dispatch(
            updateUndoRedo(resp)
        );
        thunkAPI.dispatch(
            loadObjectDiagramThunk()
        );
        thunkAPI.dispatch(
            loadCommandListThunk()
        );
        thunkAPI.dispatch(
            loadObjectCountThunk()
        );
        thunkAPI.dispatch(
            loadLinkCountThunk()
        );
        thunkAPI.dispatch(
            loadStateEvoThunk()
        );
    }
);

export const redoThunk = createAsyncThunk(
    "system/undo",
    async (args, thunkAPI) => {
        const resp = await systemApi.redo();
        if (!resp.success) {
            return message.error(resp.message);
        }

        thunkAPI.dispatch(
            updateUndoRedo(resp)
        );
        thunkAPI.dispatch(
            loadObjectDiagramThunk()
        );
        thunkAPI.dispatch(
            loadCommandListThunk()
        );
        thunkAPI.dispatch(
            loadObjectCountThunk()
        );
        thunkAPI.dispatch(
            loadLinkCountThunk()
        );
        thunkAPI.dispatch(
            loadStateEvoThunk()
        );
    }
);


