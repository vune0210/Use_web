import {Form, Input, message, Select} from "antd";
import {useEffect, useState} from "react";
import {stateApi} from "../../api/state/StateApi";
import DraggableModal from "../../components/dialogs/DraggableModal";

const Option = Select.Option;

interface Props {
    visible: boolean;
    onClose: () => any;
}

interface CreateObjectForm {
    className: string;
    objectName: string;
}

export const CreateObjectDialog: React.FC<Props> = ({visible, onClose}) => {
    const [form] = Form.useForm<CreateObjectForm>();
    const [classList, setClassList] = useState<string[]>([]);
    const fetchClassList = async () => {
        const res = await stateApi.getClassList();
        setClassList(res.classList);
    };
    const onOk = async () => {
        try {
            const {className, objectName} = await form.validateFields();
            form.resetFields();
            await stateApi.createObject(className, objectName);
            message.success(`Object ${objectName}:${className} created`);
        } catch (info) {
            message.error("Validate Failed:" + info);
        }
    };
    useEffect(() => {
        fetchClassList();
    }, []);
    return (
        <DraggableModal
            id="crte-obj"
            title="Create object"
            open={visible}
            onOk={onOk}
            onCancel={onClose}
            closable
            mask={false}
            maskClosable={false}
            okText="Create"
            cancelText="Close"
        >
            <Form form={form} labelCol={{span: 6}} wrapperCol={{span: 16}}>
                <Form.Item
                    label="Select class"
                    name="className"
                    rules={[{required: true, message: "Please select class!"}]}
                >
                    <Select>
                        {classList.map((className) => (
                            <Option key={className}>{className}</Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Object name"
                    name="objectName"
                    rules={[{required: true, message: "Please input object name!"}]}
                >
                    <Input/>
                </Form.Item>
            </Form>
        </DraggableModal>
    );
};
