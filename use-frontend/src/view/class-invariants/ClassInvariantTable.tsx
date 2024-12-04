import React, {useEffect} from "react";
import {loadClassInvariantsThunk} from "../../store/class-invariants/loadClassInvariantThunk.ts";
import {useAppDispatch, useAppSelector} from "../../store/hook.ts";
import {Col, Progress, Row, Table, TableProps, Tag} from "antd";
import {ClassInvariantEvalRes} from "../../store/class-invariants/types/ClassInvariantEvalRes.ts";
import DraggableModal from "../../components/dialogs/DraggableModal.tsx";

interface Props {
    diaId: string;
    open: boolean;
    onClose: () => any;
}

export const ClassInvariantTable: React.FC<Props> = (props) => {
    const classInvariants = useAppSelector(state => state.classInvariants.classInvariants);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(loadClassInvariantsThunk());
    }, []);

    const columns: TableProps<ClassInvariantEvalRes>["columns"] = [
        {
            key: "name",
            title: "Invariants",
            render: (_, v) => `${v.className}::${v.name}`
        },
        {
            key: "sat",
            title: "Satisfied",
            dataIndex: "resultBool",
            render: (v) => <Tag color={v ? "green" : "red"}>{`${v}`}</Tag>
        },
        {
            key: "time",
            title: "Time (ms)",
            dataIndex: "duration"
        }
    ]
    // TODO: add more field: loaded, active, negate
    // TODO: add constraint message
    // TODO: polling for progress

    return <DraggableModal
        id={props.diaId}
        open
        closable
        mask={false}
        maskClosable={false}
        onCancel={props.onClose}
        footer={<Row>
            <Col flex="auto" style={{textAlign: "start"}}>Checking constrants...</Col>
            <Col>
                <Progress percent={100}/>
            </Col>
        </Row>}
        title={<div>Class invariants</div>}
    >
        <Table columns={columns} dataSource={classInvariants}/>
    </DraggableModal>
}