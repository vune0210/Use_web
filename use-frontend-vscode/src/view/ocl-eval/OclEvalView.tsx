import {Button, Form, Input, message} from "antd";
import {useState} from "react";
import {stateApi} from "../../api";
import DraggableModal from "../../components/dialogs/DraggableModal";
import {EvaluationBrowser} from "./EvaluationBrowser.tsx";
import {OclEvalResp} from "../../api/view/types/OclEvalResp.ts";

interface Props {
    open: boolean;
    onClose: () => any;
}

export const OclEvalView: React.FC<Props> = ({open, onClose}) => {
    const [form] = Form.useForm();
    const [result, setResult] = useState<OclEvalResp | null>(null);
    const [showBrowser, setShowBrowser] = useState(false);

    const onOk = async () => {
        try {
            const values = await form.validateFields();
            const resp = await stateApi.evalOclExpr(values.expr);
            setResult(resp);
        } catch (info) {
            message.error("Validate Failed:" + info);
        }
    };

    return (
        <>
            <DraggableModal
                id="ocl-eval-dg"
                title="Evaluate OCL expression"
                open={open}
                onOk={onOk}
                onCancel={onClose}
                closable
                mask={false}
                maskClosable={false}
                okText="Evaluate"
                cancelText="Close"
            >
                {/*TODO: Add browser*/}
                <Form form={form} layout="vertical">
                    <Form.Item
                        label={"Enter OCL expression"}
                        name={"expr"}
                        rules={[
                            {
                                required: true,
                                message: `Please input OCL expr!`,
                            },
                        ]}
                    >
                        <Input.TextArea rows={6} placeholder="Enter OCL expression"/>
                    </Form.Item>
                </Form>
                <Form layout="vertical">
                    <Form.Item
                        label={"Result"}
                    >
                        <Input.TextArea rows={3} value={result?.evalResult} disabled/>
                    </Form.Item>
                </Form>
                {
                    result ?
                        <Button onClick={() => setShowBrowser(true)}>Browser</Button>
                        : null
                }
            </DraggableModal>
            {
                result ?
                    <EvaluationBrowser open={showBrowser} onClose={() => setShowBrowser(false)}
                                       data={result.evalBrowser}/>
                    : null
            }
        </>
    );
};
