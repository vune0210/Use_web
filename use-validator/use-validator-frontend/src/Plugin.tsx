import React, {lazy, useState} from "react";
// import { ClassDiaComp, ClassElement } from "./external";
import {ModalValidatorConfig} from "./ModalValidatorConfig.tsx";

// const ClassDia = lazy<ClassDiaComp>(
//   () => import("useMain/view/class-diagram/ClassDia")
// );

export function Plugin() {
    // const classes: ClassElement[] = [
    //   {
    //     className: "Object",
    //     attributes: ["a: string"],
    //     operations: [],
    //   },
    // ];

    return (
        <>
            {/*<ClassDia htmlRootId="useObj2Cls-out-cls-dia" classes={classes} />*/}
            <ModalValidatorConfig
                key={"diaId"}
                visible
                onClose={() => {
                }
                }
            />
        </>
    );
}

export default Plugin;
