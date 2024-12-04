import {Checkbox, Form} from "antd";

export const OptionSettingInput: React.FC = () => {
    return (
        <>
            <Form.Item
                valuePropName="checked"
                key={"enabled"}
                initialValue={true}
                name={["optionSettings", "aggregationcyclefreeness"]}
            >
                <Checkbox>Forbid aggregation/composition cycles</Checkbox>
            </Form.Item>
            <Form.Item
                valuePropName="checked"
                key={"enabled"}
                initialValue={true}
                name={["optionSettings", "forbiddensharing"]}
            >
                <Checkbox>Exclusive composition participation</Checkbox>
            </Form.Item>
        </>
    );
};
