import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {castDraft} from "immer";
import {ClassElement, EnumElement, GenerationElement,} from "./types";
import {Association, Generalization} from "../../api";

interface ClassDiagramSlice {
    classElements: ClassElement[];
    assocList: Association[];
    enumElements: EnumElement[];
    generalizationList: Generalization[];
}

const classDiagramSlice = createSlice({
    name: "class-diagram",
    initialState: {
        classElements: [],
        assocList: [],
        enumElements: [],
        generalizationList: [],
    } as ClassDiagramSlice,
    reducers: {
        updateClassDiagram(
            state,
            action: PayloadAction<{
                classElements: ClassElement[];
                assocList: Association[];
                enumElements: EnumElement[];
                generalizationList: GenerationElement[];
            }>
        ) {
            state.classElements = castDraft(action.payload.classElements);
            state.assocList = castDraft(action.payload.assocList);
            state.enumElements = castDraft(action.payload.enumElements);
            state.generalizationList = castDraft(action.payload.generalizationList);
        },
        moveElement(
            state,
            action: PayloadAction<{ id: string; x: number; y: number }>
        ) {
            const {id, x, y} = action.payload;
            state.classElements = state.classElements.map((ele) => {
                if (ele.id === id) {
                    ele.x = x;
                    ele.y = y;
                }
                return ele;
            });
            state.enumElements = state.enumElements.map((ele) => {
                if (ele.id === id) {
                    ele.x = x;
                    ele.y = y;
                }
                return ele;
            });
        },
        hideElement(state, action: PayloadAction<{ id: string }>) {
            const {id} = action.payload;
            state.classElements = state.classElements.map((ele) => {
                if (ele.id === id) {
                    ele.hidden = true;
                }
                return ele;
            });
            state.enumElements = state.enumElements.map((ele) => {
                if (ele.id === id) {
                    ele.hidden = true;
                }
                return ele;
            });
        },
    },
});

export const {updateClassDiagram, moveElement, hideElement} =
    classDiagramSlice.actions;
export default classDiagramSlice.reducer;
