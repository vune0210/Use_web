import {Checkbox, Form, FormInstance, Input, InputNumber, Table} from "antd";
import {ColumnsType} from "antd/lib/table";

export const RealSettingInput: React.FC<{ form: FormInstance }> = ({form}) => {
    const columns: ColumnsType<any> = [
        {
            "title": "Minimum",
            render: () => <Form.Item
                key={"min"}
                initialValue={-2}
                name={["realTypeSettings", "minimum"]}
            >
                <InputNumber/>
            </Form.Item>
        },
        {
            "title": "Maximum",
            render: () => <Form.Item
                key={"max"}
                initialValue={2}
                name={["realTypeSettings", "maximum"]}
            >
                <InputNumber/>
            </Form.Item>
        },
        {
            "title": "Step range",
            render: () => <Form.Item
                key={"realStep"}
                initialValue={0.5}
                name={["realTypeSettings", "realStep"]}
            >
                <InputNumber/>
            </Form.Item>
        },
        {
            "title": "Required Value",
            render: () => <Form.Item
                key={"values"}
                name={["realTypeSettings", "values"]}

                normalize={(v: string) => v.split(",")}
            >
                <Input/>
            </Form.Item>
        }
    ]
    const enabled = Form.useWatch(["realTypeSettings", "enabled"], form);
    return (
        <>
            <Form.Item
                valuePropName="checked"
                key={"enabled"}
                initialValue={true}
                name={["realTypeSettings", "enabled"]}
            >
                <Checkbox>Real</Checkbox>
            </Form.Item>
            {enabled ? <Table columns={columns} dataSource={[1]}/> : null}
        </>
    );
};
