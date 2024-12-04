import {
    ApiOutlined,
    AppstoreAddOutlined,
    AppstoreOutlined,
    BarChartOutlined,
    CodepenOutlined,
    ConsoleSqlOutlined,
    DatabaseOutlined,
    ExpandOutlined,
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
import {Button, Collapse, CollapseProps, Space, Tooltip} from "antd";
import {v4 as uuidv4} from 'uuid';
import {useAppDispatch, useAppSelector} from "./store/hook";
import {addModal} from "./store/viewSlice";
import {redoThunk, undoThunk} from "./store/undo-redo/undoRedoThunks.ts";
import {ObjectCountChart} from "./view/utility-view/ObjectCountChart.tsx";
import {LinkCountChart} from "./view/utility-view/LinkCountChart.tsx";
import {StateEvo} from "./view/utility-view/StateEvo.tsx";
import {Callstack} from "./view/utility-view/Callstack.tsx";
import {CommandList} from "./view/utility-view/CommandList.tsx";

export function Toolbar() {
    const dispatch = useAppDispatch();
    const undoRedo = useAppSelector(state => state.undoRedo);
    const pluginNames = useAppSelector(state => state.plugins.pluginNames);

    const items: CollapseProps['items'] = [
        {
            key: 'diagrams',
            label: 'Diagrams',
            children: <Space direction="vertical" style={{display: 'flex'}}>
                <Button
                    style={{width: "100%"}}
                    icon={<DatabaseOutlined/>}
                    onClick={() =>
                        dispatch(addModal({name: "classDia", id: uuidv4()}))
                    }
                >
                    Class Diagram
                </Button>
                <Button
                    style={{width: "100%"}}
                    icon={<CodepenOutlined/>}
                    onClick={() =>
                        dispatch(addModal({name: "objectDia", id: uuidv4()}))
                    }
                >
                    Object Diagram
                </Button>
                <Button
                    style={{width: "100%"}}
                    icon={<SlidersOutlined/>}
                    onClick={() =>
                        dispatch(addModal({name: "seqDia", id: uuidv4()}))
                    }
                >
                    Sequence diagram
                </Button>

                <Button
                    style={{width: "100%"}}
                    icon={<MergeOutlined/>}
                    onClick={() =>
                        dispatch(addModal({name: "commDia", id: uuidv4()}))
                    }
                >
                    Communication diagram
                </Button>
            </Space>,
        },
        {
            key: 'state',
            label: 'State',
            extra:
                <Space>
                    <Tooltip placement="bottom"
                             title={undoRedo.undoEnabled ? `Undo: ${undoRedo.undoDescription}` : `Undo`}>
                        <Button
                            icon={<UndoOutlined/>}
                            onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                dispatch(undoThunk())
                            }}
                            disabled={!undoRedo.undoEnabled}
                        />
                    </Tooltip>
                    <Tooltip placement="bottom"
                             title={undoRedo.redoEnabled ? `Redo: ${undoRedo.redoDescription}` : `Redo`}>
                        <Button
                            icon={<RedoOutlined/>}
                            onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                dispatch(redoThunk())
                            }}
                            disabled={!undoRedo.redoEnabled}
                        />
                    </Tooltip>
                </Space>,
            children: <Space direction="vertical" style={{display: 'flex'}}>
                <Button
                    style={{width: "100%"}}
                    icon={<AppstoreAddOutlined/>}
                    onClick={() =>
                        dispatch(addModal({name: "createObj", id: uuidv4()}))
                    }
                >
                    Create Object
                </Button>
                <Button
                    style={{width: "100%"}}
                    icon={<AppstoreOutlined/>}
                    onClick={() =>
                        dispatch(addModal({name: "objProp", id: uuidv4()}))
                    }
                >
                    Object Properties
                </Button>
                <Button
                    style={{width: "100%"}}
                    icon={<ConsoleSqlOutlined/>}
                    onClick={() =>
                        dispatch(addModal({name: "oclEval", id: uuidv4()}))
                    }
                >
                    Evaluate OCL expression
                </Button>

                <Button
                    style={{width: "100%"}}
                    icon={<InsertRowRightOutlined/>}
                    onClick={() =>
                        dispatch(addModal({name: "classExtent", id: uuidv4()}))
                    }
                >
                    Class extent
                </Button>

                <Button
                    style={{width: "100%"}}
                    icon={<ThunderboltOutlined/>}
                    onClick={() =>
                        dispatch(addModal({name: "classInvariant", id: uuidv4()}))
                    }
                >
                    Class invariant
                </Button>
            </Space>,
        },
        {
            key: 'objectCount',
            label: <><BarChartOutlined/>{"Object count"}</>,
            children: <>
                <ObjectCountChart/>
            </>,
            extra: <ExpandOutlined onClick={(event) => {
                event.stopPropagation();
                dispatch(addModal({name: "objectCount", id: uuidv4()}))
            }}/>
        },
        {
            key: 'linkCount',
            label: <><BarChartOutlined/>{"Link count"}</>,
            children: <>
                <LinkCountChart/>
            </>,
            extra: <ExpandOutlined onClick={(event) => {
                event.stopPropagation();
                dispatch(addModal({name: "linkCount", id: uuidv4()}))
            }}/>
        },
        {
            key: 'stateEvo',
            label: <><LineChartOutlined/>{"State evolution"}</>,
            children: <>
                <StateEvo/>
            </>,
            extra: <ExpandOutlined onClick={(event) => {
                event.stopPropagation();
                dispatch(addModal({name: "stateEvo", id: uuidv4()}))
            }}/>
        },
        {
            key: 'callstack',
            label: <><NumberOutlined/>{"Callstack"}</>,
            children: <>
                <Callstack/>
            </>,
            extra: <ExpandOutlined onClick={(event) => {
                event.stopPropagation();
                dispatch(addModal({name: "callstack", id: uuidv4()}))
            }}/>
        },
        {
            key: 'commandList',
            label: <><FunctionOutlined/>{"Command list"}</>,
            children: <>
                <CommandList/>
            </>,
            extra: <ExpandOutlined onClick={(event) => {
                event.stopPropagation();
                dispatch(addModal({name: "commandList", id: uuidv4()}))
            }}/>
        },
        {
            key: 'plugins',
            label: <><ApiOutlined/>{"Plugins"}</>,
            children: <Space direction="vertical" style={{display: 'flex'}}>
                {
                    pluginNames.map(pluginName => <Button
                        style={{width: "100%"}}
                        icon={<ApiOutlined/>}
                        onClick={() => {
                            dispatch(
                                // @ts-ignore
                                addModal({name: `plugin_${pluginName}`, id: uuidv4()})
                            )
                        }
                        }
                    >
                        {pluginName}
                    </Button>)
                }
                <Button
                    style={{width: "100%"}}
                    icon={<ApiOutlined/>}
                    onClick={() => {
                        dispatch(addModal({name: "pluginDev", id: uuidv4()}))
                    }}
                >
                    [DEV] Dev plugin GUI
                </Button>
            </Space>,
        },
    ]

    return (
        <Collapse items={items} defaultActiveKey={['diagrams', "state", "plugins"]}/>
    )
}
