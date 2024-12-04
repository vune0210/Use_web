import {List} from "antd";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../store/hook";
import {loadCallstackThunk} from "../../store/utility-view/loadUtiltyViewThunk.ts";

export const Callstack = () => {
    const callstack = useAppSelector((state) => state.callstackSlice.callstack);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(loadCallstackThunk());
    }, []);

    return (
        <div style={{maxHeight: "70vh", overflow: "auto"}}>
            <List
                size="small"
                //   header={<div>Header</div>}
                //   footer={<div>Footer</div>}
                bordered
                dataSource={callstack}
                renderItem={(item) => <List.Item>{item}</List.Item>}
            />
        </div>
    );
};
