import {Button, Col, Form, message, Row, Tabs} from "antd";
import type {TabsProps} from 'antd';
import {IntegerSettingInput} from "./input/IntegerSettingInput.tsx";
import {useCallback} from "react";
import {ModalValidatorApi} from "./api/api.ts";
import {SettingConfiguration} from "./api/SettingConfiguration.ts";
import {RealSettingInput} from "./input/RealSettingInput.tsx";
import {OptionSettingInput} from "./input/OptionSettingInput.tsx";
import {ClassesAndAssoc} from "./input/ClassesAndAssoc.tsx";
import {StringSettingInput} from "./input/StringSettingInput.tsx";
import {Invariants} from "./input/Invariants.tsx";

interface Props {
}

export const ModalValidatorConfig: React.FC<Props> = () => {
    const [form] = Form.useForm<SettingConfiguration>();
    const tabs: TabsProps["items"] = [
        {
            label: `Basic Types and Options`,
            key: "tab1",
            forceRender: true,
            children: (
                <>
                    <Row gutter={{xs: 16}}>
                        <Col xs={12}>
                            <IntegerSettingInput form={form}/>
                            <StringSettingInput form={form}/>
                            <RealSettingInput form={form}/>
                        </Col>
                        <Col xs={12}>
                            <OptionSettingInput/>
                        </Col>
                    </Row>

                </>
            ),
        },
        {
            label: `Classes and Associations`,
            key: "tab2",
            forceRender: true,
            children: (
                <>
                    <ClassesAndAssoc/>
                </>
            ),
        },
        {
            label: `Invariants`,
            key: "tab3",
            forceRender: true,
            children: (
                <>
                    <Invariants/>
                </>
            ),
        },
    ];
    const onValidate = useCallback(async () => {
        try {
            const api = new ModalValidatorApi();
            const values = await form.validateFields();
            const resp = await api.validate(values);
            message.success(resp.message);
        } catch (e) {
            message.error("error" + e);
        }
    }, []);
    return (
        <Form form={form} labelCol={{span: 6}} wrapperCol={{span: 16}}>
            <Tabs defaultActiveKey="1" items={tabs}/>
            <Button onClick={onValidate}>Validate</Button>
        </Form>
    );
};
