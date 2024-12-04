import {Checkbox, Form, Input, Table} from "antd";
import {ColumnsType} from "antd/lib/table";
import React, {useEffect, useState} from "react";
import {viewApi} from "../api/api.ts";
import {ClassInvariant} from "../external.ts";

export const Invariants: React.FC = () => {
    const [invariants, setInvariants] = useState<ClassInvariant[]>([])
    useEffect(() => {
        (async () => {
            const inv = await viewApi.getClassInvariant();
            setInvariants(inv.classInvariants);
        })()
    }, []);
    const assocColumns: ColumnsType<ClassInvariant> = [
        {
            key: 'name',
            title: 'Invariant',
            render: (_, v) => `${v.className}::${v.name}`
        },
        {
            key: 'active',
            title: 'Active',
            render: (_, v) => {
                return <Form.Item
                    key={"min"}
                    name={["invariantSettings", `${v.className}::${v.name}`, "active"]}
                    initialValue={true}
                    valuePropName="checked"
                >
                    <Checkbox/>
                </Form.Item>
            }
        },
        {
            key: 'negate',
            title: 'Negate',
            render: (_, v) => {
                return <Form.Item
                    key={"max"}
                    name={["invariantSettings", `${v.className}::${v.name}`, "negate"]}
                    initialValue={false}
                    valuePropName="checked"
                >
                    <Checkbox/>
                </Form.Item>
            }
        },

    ]
    return <Table columns={assocColumns} dataSource={invariants}/>
}