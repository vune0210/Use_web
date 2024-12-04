import {Button, Form, Select, Switch, Table, TableProps} from "antd";
import {useEffect, useMemo, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../store/hook";
import DraggableModal from "../../components/dialogs/DraggableModal";
import {loadClassExtentThunk} from "../../store/class-extent/loadClassExtentThunk.ts";
import {Object} from "../../api";
import {InfoCircleFilled} from "@ant-design/icons";
import {loadClassDiagramThunk} from "../../store/class-diagram/classDiagramThunks.ts";

const Option = Select.Option;

interface Props {
    diaId: string;
    open: boolean;
    onClose: () => any;
}

export const ClassExtentTable: React.FC<Props> = ({diaId, open, onClose}) => {
    const [className, setClassName] = useState<string | null>(null);
    const [showInv, setShowInv] = useState(false);
    const data = useAppSelector((state) => state.classExtent.resp);
    const classElements = useAppSelector((state) => state.classDiagram.classElements);
    const dispatch = useAppDispatch();

    const columns = useMemo<TableProps<Object>["columns"]>(() => [
        {
            key: "name",
            title: className,
            dataIndex: "fName"
        },
        ...(data?.objects[0]?.fValues ?? []).map((v, i) => ({
            key: v.split("=")[0],
            title: v.split("=")[0],
            render: (_, o: Object) => o.fValues[i].split("=")[1]
        })),
        ...(showInv ? (data?.invariants ?? []) : []).map(v => ({
            key: v.name,
            title: v.name,
            // TODO: browser here...
            render: (_, o: Object) => <Button
                icon={<InfoCircleFilled/>}>{`${!data!.invBadObject[v.name].includes(o.fName)}`}</Button>
        }))
    ], [data, showInv]);

    useEffect(() => {
        if (className != null) {
            dispatch(loadClassExtentThunk(className));
        }
        dispatch(loadClassDiagramThunk());
    }, [loadClassExtentThunk, className]);
    return (
        <DraggableModal
            id={diaId}
            title="Class extent"
            open={open}
            onCancel={onClose}
            closable
            mask={false}
            maskClosable={false}
            footer={<div style={{textAlign: "start"}}><Switch checked={showInv} onChange={setShowInv}/> Show results of
                invariants </div>}
        >
            <Form.Item
                label="Select class"
                name="classname"
                rules={[{required: true, message: "Please select a class!"}]}
            >
                <Select value={className} onChange={setClassName}>
                    {classElements.map((cls) => (
                        <Option key={cls.className}>{cls.className}</Option>
                    ))}
                </Select>
            </Form.Item>
            {
                data ? <Table columns={columns} dataSource={data.objects}/> : null
            }
        </DraggableModal>
    );
};
