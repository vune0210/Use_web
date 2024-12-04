import React from 'react'
import {ModalValidatorConfig} from "./ModalValidatorConfig.tsx";

function App() {

    return (
        <>
            <ModalValidatorConfig
                key={"diaId"}
                visible
                onClose={() => {
                }
                }
            />
        </>
    )
}

export default App
