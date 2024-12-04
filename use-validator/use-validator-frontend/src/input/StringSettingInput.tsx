import {Checkbox, Form, FormInstance, Input, InputNumber, Table} from "antd";
import {ColumnsType} from "antd/lib/table";

export const StringSettingInput: React.FC<{ form: FormInstance }> = ({form}) => {
    const columns: ColumnsType<any> = [
        {
            title: "Min. Div. Values",
            render: () => <Form.Item
                key={"min"}
                initialValue={0}
                name={["stringTypeSettings", "lowerBound"]}
            >
                <InputNumber/>
            </Form.Item>
        },
        {
            title: "Max. Div. Values",
            render: () => <Form.Item
                key={"max"}
                initialValue={10}
                name={["stringTypeSettings", "upperBound"]}
            >
                <InputNumber/>
            </Form.Item>
        },
        {
            title: "Preferred Value",
            render: () => <Form.Item
                key={"values"}
                name={["stringTypeSettings", "instanceNames"]}
                normalize={(v: string) => v.split(",")}
            >
                <Input/>
            </Form.Item>
        }
    ]
    const enabled = Form.useWatch(["stringTypeSettings", "enabled"], form);
    return (
        <>
            <Form.Item
                valuePropName="checked"
                key={"enabled"}
                initialValue={true}
                name={["stringTypeSettings", "enabled"]}
            >
                <Checkbox>String</Checkbox>
            </Form.Item>
            {enabled ? <Table columns={columns} dataSource={[1]}/> : null}
        </>
    );
};
