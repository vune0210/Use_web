import {FolderOpenOutlined, RedoOutlined, UndoOutlined,} from "@ant-design/icons";
import {Menu, message, Modal} from "antd";
import {ItemType, MenuItemType} from "antd/es/menu/hooks/useItems";
import {useAppDispatch, useAppSelector} from "./store/hook";
import {addModal} from "./store/viewSlice";
import {stateApi} from "./api";
import {redoThunk, undoThunk} from "./store/undo-redo/undoRedoThunks.ts";

const {confirm} = Modal;

export const NavMenu = () => {
    const dispatch = useAppDispatch();

    const undoRedo = useAppSelector(state => state.undoRedo);

    const items: ItemType<MenuItemType>[] = [
        {
            key: "file",
            label: "File",
            children: [
                {
                    key: "open",
                    label: "Open specification...",
                    icon: <FolderOpenOutlined/>,
                },
            ],
        },
        {
            key: "edit",
            label: "Edit",
            children: [
                {
                    key: "undo",
                    label: undoRedo.undoEnabled ? `Undo: ${undoRedo.undoDescription}` : `Undo`,
                    icon: <UndoOutlined/>,
                    disabled: !undoRedo.undoEnabled,
                    onClick: () => {
                        dispatch(undoThunk());
                    },
                },
                {
                    key: "redo",
                    label: undoRedo.redoEnabled ? `Redo: ${undoRedo.redoDescription}` : `Redo`,
                    icon: <RedoOutlined/>,
                    disabled: !undoRedo.redoEnabled,
                    onClick: () => {
                        dispatch(redoThunk());
                    },
                },
            ],
        },
        {
            key: "state",
            label: "State",
            children: [
                {
                    key: "create-obj",
                    label: "Create object...",
                    onClick: () => dispatch(addModal({name: "createObj"})),
                },
                {
                    key: "ocl-eval",
                    label: "Evaluate OCL expression...",
                    onClick: () => dispatch(addModal({name: "oclEval"})),
                },
                {
                    key: "check-structure",
                    label: "Check structure now",
                    onClick: async () => {
                        try {
                            const resp = await stateApi.checkStructure();
                            message.success(resp.message);
                        } catch (e) {
                            message.error(String(e as any));
                        }
                    },
                },
                {
                    key: "determine-state",
                    label: "Determine states",
                    onClick: async () => {
                        try {
                            const resp = await stateApi.determineState();
                            message.success(resp.message);
                        } catch (e) {
                            message.error(String(e as any));
                        }
                    },
                },
                {
                    key: "check-state-invariants",
                    label: "Check state invariants",
                    onClick: async () => {
                        try {
                            const resp = await stateApi.checkStateInvariants();
                            message.success(resp.message);
                        } catch (e) {
                            message.error(String(e as any));
                        }
                    },
                },
                {
                    key: "reset-state",
                    label: "Reset",
                    onClick: () => {
                        confirm({
                            title: "Please confirm",
                            content:
                                "Reset system to its intial state and delete all objects and links?",
                            onOk: async () => {
                                return stateApi.resetState();
                            },
                        });
                    },
                },
            ],
        },
        {
            key: "view",
            label: "View",
            children: [
                {
                    key: "create-view",
                    label: "Create view",
                    children: [
                        {
                            key: "cls-dia",
                            label: "Class diagram",
                            onClick: () => dispatch(addModal({name: "classDia"})),
                        },
                        {
                            key: "state-machine-dia",
                            disabled: true,
                            label: "State machine diagram",
                        },
                        {
                            key: "obj-dia",
                            label: "Object diagram",
                            onClick: () => dispatch(addModal({name: "objectDia"})),
                        },
                        {
                            key: "cls-inv",
                            label: "Class Invariants",
                            onClick: () => dispatch(addModal({name: "classInvariant"})),
                        },
                        {
                            key: "object-count",
                            label: "Object count",
                            onClick: () => dispatch(addModal({name: "objectCount"})),
                        },
                        {
                            key: "link-count",
                            label: "Link count",
                            onClick: () => dispatch(addModal({name: "linkCount"})),
                        },
                        {
                            key: "state-evo",
                            label: "State evolution",
                            onClick: () => dispatch(addModal({name: "stateEvo"})),
                        },
                        {
                            key: "obj-props",
                            label: "Object properties",
                            onClick: () => dispatch(addModal({name: "objProp"})),
                        },
                        {
                            key: "class-extent",
                            label: "Class extent",
                            onClick: () => dispatch(addModal({name: "classExtent"})),
                        },
                        {
                            key: "seq-dia",
                            label: "Sequence diagram",
                            onClick: () => dispatch(addModal({name: "seqDia"})),
                        },
                        {
                            key: "comm-dia",
                            label: "Communication diagram",
                            onClick: () => dispatch(addModal({name: "commDia"})),
                        },
                        {
                            key: "callstack",
                            label: "Callstack",
                            onClick: () => dispatch(addModal({name: "callstack"})),
                        },
                        {
                            key: "cmd-list",
                            label: "Command list",
                            onClick: () => dispatch(addModal({name: "commandList"})),
                        },
                    ],
                },
            ],
        },
    ];
    return (
        <Menu theme="dark" mode="horizontal" selectable={false} items={items}/>
    );
};
