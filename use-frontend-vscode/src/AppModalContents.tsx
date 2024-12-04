// import "antd/dist/antd.css";
import DraggableModal from "./components/dialogs/DraggableModal";
import {useAppDispatch, useAppSelector} from "./store/hook";
import {closeModal} from "./store/viewSlice";
import {CreateObjectDialog} from "./view/create-object/CreateObjectDialog";
import {ObjectPropertyDialog} from "./view/create-object/ObjectPropertyDialog";
import NewObjectDiagram from "./view/object-diagram/NewObjectDiagram";
import {CommandList} from "./view/utility-view/CommandList";
import {LinkCountChart} from "./view/utility-view/LinkCountChart";
import {ObjectCountChart} from "./view/utility-view/ObjectCountChart";
// import "antd/dist/antd.css";
import {lazy} from "react";
import {AppClassDiagram} from "./view/class-diagram/AppClassDiagram.tsx";
import {ClassExtentTable} from "./view/class-extent/ClassExtentTable.tsx";
import {ClassInvariantTable} from "./view/class-invariants/ClassInvariantTable.tsx";
import {AppCommDia} from "./view/comm-diagram/AppCommDia.tsx";
import {OclEvalView} from "./view/ocl-eval/OclEvalView.tsx";
import {AppSeqDia} from "./view/sequence-diagram/AppSeqDia.tsx";
import {Callstack} from "./view/utility-view/Callstack.tsx";
import {StateEvo} from "./view/utility-view/StateEvo.tsx";

// const UseObject2ClassApp = lazy(() => import("useObj2Cls/App"));
const UseModalValidatorApp = lazy(() => import("useValidator/Plugin"));

export function ModalContents() {
    const view = useAppSelector((state) => state.view);
    // console.log("index view", view);
    const dispatch = useAppDispatch();
    return (
        <>
            {view.classDia.map((diaId) => (
                <DraggableModal
                    key={diaId}
                    id={diaId}
                    open
                    width={800 + 40}
                    closable
                    mask={false}
                    maskClosable={false}
                    onCancel={() => dispatch(closeModal({name: "classDia", id: diaId}))}
                    footer={null}
                    title={<div>Class Diagram</div>}
                >
                    <AppClassDiagram key={diaId} open width={800}/>
                </DraggableModal>
            ))}

            {view.objectDia.map((diaId) => (
                <DraggableModal
                    key={diaId}
                    id={diaId}
                    open
                    width={800 + 40}
                    closable
                    mask={false}
                    maskClosable={false}
                    onCancel={() =>
                        dispatch(closeModal({name: "objectDia", id: diaId}))
                    }
                    footer={null}
                    title={<div>Object Diagram</div>}
                >
                    <NewObjectDiagram id={diaId} width={800} height={600}/>
                </DraggableModal>
            ))}

            {view.seqDia.map((diaId) => (
                <DraggableModal
                    key={diaId}
                    id={diaId}
                    open
                    width={800 + 40}
                    closable
                    mask={false}
                    maskClosable={false}
                    onCancel={() => dispatch(closeModal({name: "seqDia", id: diaId}))}
                    footer={null}
                    title={<div>Sequence Diagram</div>}
                >
                    <AppSeqDia/>
                </DraggableModal>
            ))}

            {view.commDia.map((diaId) => (
                <DraggableModal
                    key={diaId}
                    id={diaId}
                    open
                    width={800 + 40}
                    closable
                    mask={false}
                    maskClosable={false}
                    onCancel={() => dispatch(closeModal({name: "commDia", id: diaId}))}
                    footer={null}
                    title={<div>Communication Diagram</div>}
                >
                    <AppCommDia/>
                </DraggableModal>
            ))}

            {view.createObj.map((diaId) => (
                <CreateObjectDialog
                    key={diaId}
                    visible
                    onClose={() => dispatch(closeModal({name: "createObj", id: diaId}))}
                />
            ))}

            {view.oclEval.map((diaId) => (
                <OclEvalView
                    key={diaId}
                    open
                    onClose={() => dispatch(closeModal({name: "oclEval", id: diaId}))}
                />
            ))}

            {view.objProp.map((diaId) => (
                <ObjectPropertyDialog
                    key={diaId}
                    visible
                    onClose={() => dispatch(closeModal({name: "objProp", id: diaId}))}
                />
            ))}

            {view.classInvariant.map((diaId) => (
                <ClassInvariantTable
                    key={diaId}
                    diaId={diaId}
                    open
                    onClose={() =>
                        dispatch(closeModal({name: "classInvariant", id: diaId}))
                    }
                />
            ))}

            {view.classExtent.map((diaId) => (
                <ClassExtentTable
                    key={diaId}
                    diaId={diaId}
                    open
                    onClose={() =>
                        dispatch(closeModal({name: "classExtent", id: diaId}))
                    }
                />
            ))}

            {view.objectCount.map((diaId) => (
                <DraggableModal
                    key={diaId}
                    id={diaId}
                    open
                    closable
                    mask={false}
                    maskClosable={false}
                    onCancel={() =>
                        dispatch(closeModal({name: "objectCount", id: diaId}))
                    }
                    footer={null}
                    title={<div>Object Count</div>}
                >
                    <ObjectCountChart/>
                </DraggableModal>
            ))}

            {view.linkCount.map((diaId) => (
                <DraggableModal
                    key={diaId}
                    id={diaId}
                    open
                    closable
                    mask={false}
                    maskClosable={false}
                    onCancel={() =>
                        dispatch(closeModal({name: "linkCount", id: diaId}))
                    }
                    footer={null}
                    title={<div>Link Count</div>}
                >
                    <LinkCountChart/>
                </DraggableModal>
            ))}

            {view.stateEvo.map((diaId) => (
                <DraggableModal
                    key={diaId}
                    id={diaId}
                    open
                    closable
                    mask={false}
                    maskClosable={false}
                    onCancel={() => dispatch(closeModal({name: "stateEvo", id: diaId}))}
                    footer={null}
                    title={<div>State evolution</div>}
                >
                    <StateEvo/>
                </DraggableModal>
            ))}

            {view.callstack.map((diaId) => (
                <DraggableModal
                    key={diaId}
                    id={diaId}
                    open
                    closable
                    mask={false}
                    maskClosable={false}
                    onCancel={() =>
                        dispatch(closeModal({name: "callstack", id: diaId}))
                    }
                    footer={null}
                    title={<div>Callstack</div>}
                >
                    <Callstack/>
                </DraggableModal>
            ))}

            {view.commandList.map((diaId) => (
                <DraggableModal
                    key={diaId}
                    id={diaId}
                    open
                    closable
                    mask={false}
                    maskClosable={false}
                    onCancel={() =>
                        dispatch(closeModal({name: "commandList", id: diaId}))
                    }
                    footer={null}
                    title={<div>Command list</div>}
                >
                    <CommandList/>
                </DraggableModal>
            ))}

            {view.pluginMdValConf.map((diaId) => (
                <DraggableModal
                    key={diaId}
                    id={diaId}
                    open
                    closable
                    mask={false}
                    maskClosable={false}
                    width={"90%"}
                    onCancel={() =>
                        dispatch(closeModal({name: "pluginMdValConf", id: diaId}))
                    }
                    footer={null}
                    title={<div>Model Validator Configuration</div>}
                >
                    <UseModalValidatorApp/>
                </DraggableModal>
            ))}
        </>
    );
}
