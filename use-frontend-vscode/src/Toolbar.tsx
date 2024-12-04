import {
    ApiOutlined,
    AppstoreAddOutlined,
    AppstoreOutlined,
    BarChartOutlined,
    CodepenOutlined,
    ConsoleSqlOutlined,
    DatabaseOutlined,
    FunctionOutlined,
    InsertRowRightOutlined,
    LineChartOutlined,
    MergeOutlined,
    NumberOutlined,
    RedoOutlined,
    SlidersOutlined,
    ThunderboltOutlined,
    UndoOutlined
} from "@ant-design/icons";
import {Button} from "antd";
import {v4 as uuidv4} from 'uuid';
import {useAppDispatch, useAppSelector} from "./store/hook";
import {addModal} from "./store/viewSlice";
import {OpenSpecButton} from "./view/toolbar/OpenSpecBtn";
import {redoThunk, undoThunk} from "./store/undo-redo/undoRedoThunks.ts";

export function Toolbar() {
    const dispatch = useAppDispatch();
    const undoRedo = useAppSelector(state => state.undoRedo);
    return (
        <div className={"app-toolbar button-space-between"}>
            <OpenSpecButton/>
            <Button
                icon={<UndoOutlined/>}
                onClick={() => dispatch(undoThunk())}
                disabled={!undoRedo.undoEnabled}
            >
                {undoRedo.undoEnabled ? `Undo: ${undoRedo.undoDescription}` : `Undo`}
            </Button>
            <Button
                icon={<RedoOutlined/>}
                onClick={() => dispatch(redoThunk())}
                disabled={!undoRedo.redoEnabled}
            >
                {undoRedo.redoEnabled ? `Redo: ${undoRedo.redoDescription}` : `Redo`}
            </Button>
            <Button
                icon={<ConsoleSqlOutlined/>}
                onClick={() =>
                    dispatch(addModal({name: "oclEval", id: uuidv4()}))
                }
            >
                Evaluate OCL expression
            </Button>
            <Button
                id={"btn-clsdia"}
                icon={<DatabaseOutlined/>}
                onClick={() =>
                    dispatch(addModal({name: "classDia", id: uuidv4()}))
                }
            >
                Class Diagram
            </Button>
            <Button
                id={"btn-objdia"}
                icon={<CodepenOutlined/>}
                onClick={() =>
                    dispatch(addModal({name: "objectDia", id: uuidv4()}))
                }
            >
                Object Diagram
            </Button>

            <Button
                icon={<ThunderboltOutlined/>}
                onClick={() =>
                    dispatch(addModal({name: "classInvariant", id: uuidv4()}))
                }
            >
                Class invariant
            </Button>

            <Button
                icon={<BarChartOutlined/>}
                onClick={() =>
                    dispatch(addModal({name: "objectCount", id: uuidv4()}))
                }
            >
                Object Count
            </Button>

            <Button
                icon={<BarChartOutlined/>}
                onClick={() =>
                    dispatch(addModal({name: "linkCount", id: uuidv4()}))
                }
            >
                Link Count
            </Button>

            <Button
                icon={<LineChartOutlined/>}
                onClick={() =>
                    dispatch(addModal({name: "stateEvo", id: uuidv4()}))
                }
            >
                State evolution
            </Button>

            <Button
                icon={<AppstoreAddOutlined/>}
                onClick={() =>
                    dispatch(addModal({name: "createObj", id: uuidv4()}))
                }
            >
                Create Object
            </Button>
            <Button
                icon={<AppstoreOutlined/>}
                onClick={() =>
                    dispatch(addModal({name: "objProp", id: uuidv4()}))
                }
            >
                Object Properties
            </Button>

            <Button
                icon={<InsertRowRightOutlined/>}
                onClick={() =>
                    dispatch(addModal({name: "classExtent", id: uuidv4()}))
                }
            >
                Class extent
            </Button>

            <Button
                icon={<SlidersOutlined/>}
                onClick={() =>
                    dispatch(addModal({name: "seqDia", id: uuidv4()}))
                }
            >
                Sequence diagram
            </Button>

            <Button
                icon={<MergeOutlined/>}
                onClick={() =>
                    dispatch(addModal({name: "commDia", id: uuidv4()}))
                }
            >
                Communication diagram
            </Button>


            <Button
                icon={<NumberOutlined/>}
                onClick={() =>
                    dispatch(addModal({name: "callstack", id: uuidv4()}))
                }
            >
                Call stack
            </Button>

            <Button
                icon={<FunctionOutlined/>}
                onClick={() =>
                    dispatch(addModal({name: "commandList", id: uuidv4()}))
                }
            >
                Command list
            </Button>

            <Button
                icon={<ApiOutlined/>}
                onClick={() =>
                    dispatch(
                        addModal({name: "pluginMdValConf", id: uuidv4()})
                    )
                }
            >
                Plugin: Modal Validator Configuration
            </Button>
        </div>
    );
}
