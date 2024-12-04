import {List} from "antd";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../store/hook";
import {loadCommandListThunk} from "../../store/utility-view/loadUtiltyViewThunk";

export const CommandList = () => {
    const commandList = useAppSelector((state) => state.commandList.commandList);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(loadCommandListThunk());
    }, []);

    return (
        <div style={{maxHeight: "70vh", overflow: "auto"}}>
            <List
                size="small"
                //   header={<div>Header</div>}
                //   footer={<div>Footer</div>}
                bordered
                dataSource={commandList}
                renderItem={(item) => <List.Item>{item}</List.Item>}
            />
        </div>
    );
};
