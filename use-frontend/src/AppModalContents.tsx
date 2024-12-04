// @ts-ignore
import {__federation_method_getRemote, __federation_method_setRemote} from 'virtual:__federation__'

import {lazy, useEffect, useMemo} from "react";

import {useAppDispatch, useAppSelector} from "./store/hook";
import {closeModal} from "./store/viewSlice";

import DraggableModal from "./components/dialogs/DraggableModal";

import {CreateObjectDialog} from "./view/create-object/CreateObjectDialog";
import {ObjectPropertyDialog} from "./view/create-object/ObjectPropertyDialog";
import {CommandList} from "./view/utility-view/CommandList";
import {LinkCountChart} from "./view/utility-view/LinkCountChart";
import {ObjectCountChart} from "./view/utility-view/ObjectCountChart";
import {AppClassDiagram} from "./view/class-diagram/AppClassDiagram.tsx";
import {ClassExtentTable} from "./view/class-extent/ClassExtentTable.tsx";
import {ClassInvariantTable} from "./view/class-invariants/ClassInvariantTable.tsx";
import {AppCommDia} from "./view/comm-diagram/AppCommDia.tsx";
import {OclEvalView} from "./view/ocl-eval/OclEvalView.tsx";
import {AppSeqDia} from "./view/sequence-diagram/AppSeqDia.tsx";
import {Callstack} from "./view/utility-view/Callstack.tsx";
import {StateEvo} from "./view/utility-view/StateEvo.tsx";
import {loadPluginNamesThunk} from "./store/plugins/loadPluginNamesThunk.ts";
import {Api} from "./api";
import {AppObjectDiagram} from "./view/object-diagram/AppObjectDiagram.tsx";

const DevPlugin = lazy(() => import("DevPlugin/Plugin"));

export function ModalContents() {
    const pluginNames = useAppSelector(state => state.plugins.pluginNames);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(loadPluginNamesThunk());
    }, [dispatch]);

    const PluginApps = useMemo(() => pluginNames.reduce((pre, pluginName) =>
        ({
            ...pre,
            [pluginName]: lazy(() => {
                __federation_method_setRemote(pluginName, {
                    url: () => Promise.resolve(`${Api.HOST}/plugins-fe/${pluginName}/assets/use-plugin.js`),
                    format: 'esm',
                })

                return __federation_method_getRemote(pluginName, './Plugin')
            })
        }), {} as Record<string, ReturnType<typeof lazy>>
    ), [pluginNames])

    const view = useAppSelector((state) => state.view);
    // console.log("index view", view);

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
                    {/*<NewObjectDiagram id={diaId} width={800} height={600}/>*/}
                    <AppObjectDiagram open width={800} height={600}/>
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

            {
                pluginNames.map(pluginName => {
                    const PluginApp = PluginApps[pluginName];
                    // @ts-ignore
                    return (view[`plugin_${pluginName}`] ?? []).map((diaId) => (
                        <DraggableModal
                            key={diaId}
                            id={diaId}
                            open
                            closable
                            mask={false}
                            maskClosable={false}
                            width={"90%"}
                            onCancel={() => {
                                // @ts-ignore
                                dispatch(closeModal({name: `plugin_${pluginName}`, id: diaId}));
                            }
                            }
                            footer={null}
                            title={<div>{pluginName}</div>}
                        >
                            <PluginApp/>
                        </DraggableModal>
                    ))
                }).flat()
            }
            {view.pluginDev.map((diaId) => (
                <DraggableModal
                    key={diaId}
                    id={diaId}
                    open
                    closable
                    mask={false}
                    maskClosable={false}
                    width={"90%"}
                    onCancel={() => {
                        // @ts-ignore
                        dispatch(closeModal({name: "pluginDev", id: diaId}));
                    }
                    }
                    footer={null}
                    title={<div>Dev plugin GUI</div>}
                >
                    <DevPlugin/>
                </DraggableModal>
            ))}
        </>
    );
}
