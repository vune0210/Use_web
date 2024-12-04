import {Modal, Tabs} from "antd";
import type {Tab} from "rc-tabs/lib/interface";
import {MaxMinInput} from "./MaxMinInput";

interface Props {
    visible: boolean;
    onClose: () => void;
}

export const ModalValidatorConfig: React.FC<Props> = ({visible, onClose}) => {
    const tabs: Tab[] = [
        {
            label: `Basic Types and Options`,
            key: "tab1",
            children: (
                <>
                    <MaxMinInput/>
                </>
            ),
        },
    ];
    return (
        <Modal open={visible} onCancel={onClose}>
            <Tabs defaultActiveKey="1" type="card" size={"large"} items={tabs}/>
        </Modal>
    );
};
