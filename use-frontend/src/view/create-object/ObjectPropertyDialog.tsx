import {Form, Input, message, Select} from "antd";
import {useCallback, useEffect, useState} from "react";
import {stateApi} from "../../api/state/StateApi";
import {ObjectState} from "../../api/state/types/ObjectPropertyResp";
import {useAppDispatch, useAppSelector} from "../../store/hook";
import {loadObjectDiagramThunk} from "../../store/object-diagram/objectDiagramThunks";
import DraggableModal from "../../components/dialogs/DraggableModal";
import {loadUndoRedoThunk} from "../../store/undo-redo/undoRedoThunks.ts";
import {loadCommandListThunk} from "../../store/utility-view/loadUtiltyViewThunk.ts";

const Option = Select.Option;

interface Props {
    visible: boolean;
    onClose: () => any;
}

export const ObjectPropertyDialog: React.FC<Props> = ({visible, onClose}) => {
    const [form] = Form.useForm();
    const [objectName, setObjectName] = useState<string>();
    const [objectState, setObjectState] = useState<ObjectState | null>(null);
    const {objects} = useAppSelector((state) => state.objectDiagram);
    const dispatch = useAppDispatch();
    const fetchObjectState = useCallback(async () => {
        if (objectName == null) return;

        const res = await stateApi.getObjectState(objectName);
        setObjectState(res.object);
        form.setFieldsValue(
            res.object.fAttributes.reduce(
                (pre, attr, idx) => ({
                    ...pre,
                    [attr.split(" : ")[0]]: res.object.fValues[idx],
                }),
                {}
            )
        );
    }, [objectName]);
    const onOk = async () => {
        try {
            if (objectName == null) return;
            const values = await form.validateFields();
            await stateApi.updateObject(objectName, Object.values(values));
            dispatch(loadObjectDiagramThunk());
            message.success(`Object ${objectName} updated`);
        } catch (info) {
            message.error("Validate Failed:" + info);
        }
    };
    useEffect(() => {
        fetchObjectState();
        dispatch(loadObjectDiagramThunk());
        dispatch(loadUndoRedoThunk());
        dispatch(loadCommandListThunk());
    }, [fetchObjectState]);
    return (
        <DraggableModal
            title="Object property"
            open={visible}
            onOk={onOk}
            onCancel={onClose}
            closable
            mask={false}
            maskClosable={false}
            okText="Apply"
            cancelText="Close"
        >
            <Form.Item
                label="Select object"
                name="objectName"
                rules={[{required: true, message: "Please select object!"}]}
            >
                <Select value={objectName} onChange={setObjectName}>
                    {objects.map((object) => (
                        <Option key={object.fName}>{object.fName}</Option>
                    ))}
                </Select>
            </Form.Item>
            <Form form={form} labelCol={{span: 6}} wrapperCol={{span: 16}}>
                {objectState?.fAttributes.map((attr, idx) => (
                    <Form.Item
                        key={attr}
                        label={attr}
                        name={attr.split(" : ")[0]}
                        rules={[
                            {
                                required: true,
                                message: `Please input ${attr.split(" : ")[1]} value!`,
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                ))}
            </Form>
        </DraggableModal>
    );
};
