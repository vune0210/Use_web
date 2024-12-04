import {configureStore} from "@reduxjs/toolkit";
import classDiagramReducer from "./class-diagram/classDiagramSlice";
import modalBrowserReducer from "./modal-browser/modalBrowserSlice";
import objectDiagramReducer from "./object-diagram/objectDiagramSlice";
import viewSliceReducer from "./viewSlice";
import linkCountReducer from "./utility-view/linkCountSlice";
import objectCountReducer from "./utility-view/objectCountSlice";
import commandListReducer from "./utility-view/commandListSlice";
import callstackReducer from "./utility-view/callStackSlice.ts";
import stateEvoReducer from "./utility-view/stateEvoSlice.ts";
import classInvariantsReducer from "./class-invariants/classInvariantSlice.ts";
import classExtentReducer from "./class-extent/classExtentSlice.ts";
import eventsReducer from "./seq-diagram/eventsSlice.ts";
import undoRedoReducer from "./undo-redo/undoRedoSlice.ts";
import pluginsReducer from "./plugins/pluginSlice.ts";

export const store = configureStore({
    reducer: {
        view: viewSliceReducer,
        undoRedo: undoRedoReducer,
        plugins: pluginsReducer,

        classDiagram: classDiagramReducer,
        events: eventsReducer,
        modalBrowser: modalBrowserReducer,
        objectDiagram: objectDiagramReducer,
        linkCount: linkCountReducer,
        stateEvo: stateEvoReducer,
        objectCount: objectCountReducer,
        commandList: commandListReducer,
        callstackSlice: callstackReducer,
        classInvariants: classInvariantsReducer,
        classExtent: classExtentReducer
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
