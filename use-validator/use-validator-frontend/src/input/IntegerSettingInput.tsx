import {Checkbox, Col, Form, FormInstance, Input, InputNumber, Row, Table} from "antd";
import {ColumnsType} from "antd/lib/table";

export const IntegerSettingInput: React.FC<{ form: FormInstance }> = ({form}) => {
    const columns: ColumnsType<any> = [
        {
            "title": "Minimum",
            render: () => <Form.Item
                key={"min"}
                initialValue={-10}
                name={["integerTypeSettings", "minimum"]}
            >
                <InputNumber/>
            </Form.Item>
        },
        {
            "title": "Maximum",
            render: () => <Form.Item
                key={"max"}
                initialValue={10}
                name={["integerTypeSettings", "maximum"]}
            >
                <InputNumber/>
            </Form.Item>
        },
        {
            "title": "Required Value",
            render: () => <Form.Item
                key={"values"}
                name={["integerTypeSettings", "values"]}
                normalize={(v: string) => v.split(",")}
            >
                <Input/>
            </Form.Item>
        }
    ]
    const enabled = Form.useWatch(["integerTypeSettings", "enabled"], form);
    return (
        <>
            <Form.Item
                valuePropName="checked"
                key={"enabled"}
                initialValue={true}
                name={["integerTypeSettings", "enabled"]}
            >
                <Checkbox>Integer</Checkbox>
            </Form.Item>
            {enabled ? <Table columns={columns} dataSource={[1]}/> : null}
        </>
    );
};
