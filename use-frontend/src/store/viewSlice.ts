import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface UIState {
    oclEval: string[];
    classDia: string[];
    objectDia: string[];
    seqDia: string[];
    commDia: string[];
    classInvariant: string[];
    classExtent: string[];
    createObj: string[];
    objProp: string[];
    objectCount: string[];
    linkCount: string[];
    stateEvo: string[];
    callstack: string[];
    commandList: string[];

    pluginDev: string[];
}

const viewSlice = createSlice({
    name: "view",
    initialState: {
        oclEval: [],
        classDia: [],
        objectDia: [],
        seqDia: [],
        commDia: [],
        classInvariant: [],
        classExtent: [],
        createObj: [],
        objProp: [],
        objectCount: [],
        linkCount: [],
        stateEvo: [],
        callstack: [],
        commandList: [],
        pluginDev: [],
    } as UIState,
    reducers: {
        addModal(
            state,
            action: PayloadAction<{
                name: keyof UIState;
                id?: string;
            }>
        ) {
            if (state[action.payload.name] == null) state[action.payload.name] = [];
            state[action.payload.name].push(action.payload.id ?? crypto.randomUUID());
        },
        closeModal(
            state,
            action: PayloadAction<{
                name: keyof UIState;
                id: string;
            }>
        ) {
            const index = state[action.payload.name].findIndex(
                (id) => id === action.payload.id
            );
            if (index !== -1) state[action.payload.name].splice(index, 1);
        },
    },
});

export const {addModal, closeModal} = viewSlice.actions;
export default viewSlice.reducer;
