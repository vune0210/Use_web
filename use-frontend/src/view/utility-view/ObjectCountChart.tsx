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
            title: "Class"
        },
        {
            key: "count",
            dataIndex: "count",
            title: "# Objects"
        },
    ];

    return <Table columns={columns} dataSource={count} pagination={count.length <= 5 ? false : {
        total: count.length,
        pageSize: 5
    }}/>;
};
