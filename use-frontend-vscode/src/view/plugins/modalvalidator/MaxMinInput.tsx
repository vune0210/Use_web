import {Form, Input} from "antd";

export const MaxMinInput: React.FC = () => {
    return (
        <Form labelCol={{span: 6}} wrapperCol={{span: 16}}>
            <Form.Item
                key={"min"}
                label={"Minimum"}
                name={"min"}
                rules={[
                    {
                        required: true,
                        message: `Please input min value!`,
                    },
                ]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                key={"max"}
                label={"Maximum"}
                name={"max"}
                rules={[
                    {
                        required: true,
                        message: `Please input max value!`,
                    },
                ]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                key={"values"}
                label={"Required/Prefered Value"}
                name={"values"}
                rules={[
                    {
                        required: true,
                        message: `Please input Required/Prefered value!`,
                    },
                ]}
            >
                <Input/>
            </Form.Item>
        </Form>
    );
};
