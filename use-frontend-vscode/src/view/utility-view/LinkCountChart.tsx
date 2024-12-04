import {Table} from "antd";
import {ColumnsType} from "antd/es/table";
import {useEffect} from "react";
import {CountItem} from "../../store/utility-view/CountItem";
import {loadLinkCountThunk} from "../../store/utility-view/loadUtiltyViewThunk";
import {useAppDispatch, useAppSelector} from "../../store/hook";

export const LinkCountChart = () => {
    const count = useAppSelector((state) => state.linkCount.count);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(loadLinkCountThunk());
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
