import {Table} from "antd";
import {ColumnsType} from "antd/es/table";
import {useEffect} from "react";
import {CountItem} from "../../store/utility-view/CountItem";
import {loadObjectCountThunk} from "../../store/utility-view/loadUtiltyViewThunk";
import {useAppDispatch, useAppSelector} from "../../store/hook";

export const ObjectCountChart = () => {
    const count = useAppSelector((state) => state.objectCount.count);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(loadObjectCountThunk());
    }, []);

    const columns: ColumnsType<CountItem> = [
        {
            key: "name",
            dataIndex: "name",
        },
        {
            key: "count",
            dataIndex: "count",
        },
    ];

    return <Table columns={columns} dataSource={count}/>;
};
