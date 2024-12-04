import {createAsyncThunk} from "@reduxjs/toolkit";
import {ClassElement, EnumElement,} from "./types";
import {updateClassDiagram} from "./classDiagramSlice";
import {viewApi} from "../../api/view/ViewApi.ts";

export const loadClassDiagramThunk = createAsyncThunk(
    "class-diagram/load",
    async (args, thunkAPI) => {
        const res = await viewApi.getClassDiagram();
        const classElements: ClassElement[] = res.classList.map(
            (cls, idx, arr) => ({
                className: cls.className,
                attributes: cls.fAttrValues,
                operations: cls.fOprSignatures,
                id: cls.className,
                x: 100 + (idx % 3) * 200,
                y: 100 + (idx / 3) * 200,
            })
        );
        const enumElements: EnumElement[] = res.enumList.map((en) => ({
            className: en.className,
            literals: en.fLiterals,
            id: en.className,
            x: 100,
            y: 100,
        }));
        // const genLinks: GenerationElement[] = res.generalizationList.map((gen) => ({
        //   id: `gen-${gen.parentClass}-${gen.childClass}`,
        //   ...gen,
        // }));
        // const assocLinks: AssocElement[] = res.assocList.map((assoc) => ({
        //   id: assoc.associationClass, // `${assoc.sourceClass}-${assoc.targetClass}`,
        //   sourceId: assoc.sourceClass,
        //   targetId: assoc.targetClass,
        //   label: assoc.associationClass,
        //   leftSideLabel: assoc.sourceEnd,
        //   rightSideLabel: assoc.targetEnd,
        // }));
        thunkAPI.dispatch(
            updateClassDiagram({
                classElements,
                enumElements,
                generalizationList: res.generalizationList,
                assocList: res.assocList,
            })
        );
    }
);
