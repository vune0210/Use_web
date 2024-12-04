import {Checkbox, Col, Form, Grid, Input, InputNumber, Row, Switch, Table} from "antd";
import {ColumnsType} from "antd/lib/table";
import React, {useEffect, useMemo, useState} from "react";
import {viewApi} from "../api/api.ts";
import {Association, Class} from "../external.ts";

export const ClassesAndAssoc: React.FC = () => {
    const [classes, setClasses] = useState<Class[]>([]);
    const [activeClass, setActiveClass] = useState<Class | null>(null);
    const [assoc, setAssoc] = useState<Association[]>([]);
    const [showAttrBound, setShowAttrBound] = useState(false)
    useEffect(() => {
        (async () => {
            const cls = await viewApi.getClassDiagram();
            setClasses(cls.classList);
            setActiveClass(cls.classList[0]);
            setAssoc(cls.assocList);
        })()
    }, []);
    const classColumns: ColumnsType<Class> = [
        {
            key: 'className',
            title: 'Class',
            dataIndex: "className"
        },
        {
            key: 'lowerBound',
            title: 'Min. Object Quantity',
            render: (_, v: Class) => {
                return <Form.Item
                    key={"min"}
                    name={["classSettings", v.className, "lowerBound"]}
                    initialValue={1}
                >
                    <InputNumber/>
                </Form.Item>
            }
        },
        {
            key: 'upperBound',
            title: 'Max Object Quantity',
            render: (_, v: Class) => {
                return <Form.Item
                    key={"max"}
                    name={["classSettings", v.className, "upperBound"]}
                    initialValue={3}
                >
                    <InputNumber/>
                </Form.Item>
            }
        },
        {
            key: 'instanceNames',
            title: 'Req. Object Identities',
            render: (_, v: Class) => {
                return <Form.Item
                    key={"instanceNames"}
                    name={["classSettings", v.className, "instanceNames"]}
                    normalize={(v: string) => v.split(",")}
                >
                    <Input/>
                </Form.Item>
            }
        },
    ]

    const attrColumns: (className: string) => ColumnsType<string> = (className) => [
        {
            key: 'attrName',
            title: 'Attribute',
            render: (_, v) => v.split(":")[0]
        },
        {
            key: 'lowerBound',
            title: 'Min. Defined',
            // hidden: !showAttrBound,
            render: (_, v) => {
                return <Form.Item
                    key={"min"}
                    name={["classSettings", className, "attributeSettings", v.split(":")[0].trim(), "lowerBound"]}
                    initialValue={-1}
                >
                    <InputNumber/>
                </Form.Item>
            }
        },
        {
            key: 'upperBound',
            title: 'Max. Defined',
            // hidden: !showAttrBound,
            render: (_, v) => {
                return <Form.Item
                    key={"max"}
                    name={["classSettings", className, "attributeSettings", v.split(":")[0].trim(), "upperBound"]}
                    initialValue={-1}
                >
                    <InputNumber/>
                </Form.Item>
            }
        },
        {
            key: 'collectionSizeMin',
            title: 'Min. Elements',
            hidden: !showAttrBound,
            render: (_, v) => {
                return <Form.Item
                    key={"collectionSizeMin"}
                    name={["classSettings", className, "attributeSettings", v.split(":")[0].trim(), "collectionSizeMin"]}
                >
                    <InputNumber/>
                </Form.Item>
            }
        },
        {
            key: 'collectionSizeMax',
            title: 'Max. Elements',
            hidden: !showAttrBound,
            render: (_, v) => {
                return <Form.Item
                    key={"collectionSizeMax"}
                    name={["classSettings", className, "attributeSettings", v.split(":")[0].trim(), "collectionSizeMax"]}
                >
                    <InputNumber/>
                </Form.Item>
            }
        },
        {
            key: 'instanceNames',
            title: 'Possible Values',
            render: (_, v) => {
                return <Form.Item
                    key={"instanceNames"}
                    name={["classSettings", className, "attributeSettings", v.split(":")[0].trim(), "instanceNames"]}
                    normalize={(v: string) => v.split(",")}
                >
                    <Input/>
                </Form.Item>
            }
        },
    ]

    return <Row gutter={{xs: 16}}>
        <Col xs={12}>
            <Table columns={classColumns} dataSource={classes} onRow={
                (record, index) => {
                    return {
                        onClick: (event) => {
                            setActiveClass(record);
                        }, // click row
                    };
                }
            }/>
        </Col>
        <Col xs={12}>
            <Row>
                <Col flex="auto"><h3>Attribute of class {activeClass?.className}</h3></Col>
                <Col><Switch checked={showAttrBound} onChange={(e) => setShowAttrBound(e)}
                             title={"Show specific bounds"}/>Show specific bounds</Col>
            </Row>
            {
                classes.map(c => <div style={{display: activeClass === c ? undefined : "none"}}>
                    <Table columns={attrColumns(c.className)} dataSource={c.fAttrValues}/>
                </div>)
            }
            {
                classes.map(c => <div style={{display: activeClass === c ? undefined : "none"}}>
                    <AssociationsConfigTable key={`assoCf_${c.className}`} cls={c} assocList={assoc}/>
                </div>)
            }

        </Col>
    </Row>
}

interface AssocCfTableProps {
    cls: Class;
    assocList: Association[]
}

const AssociationsConfigTable: React.FC<AssocCfTableProps> = (props) => {
    const activeAssoc = useMemo(() => props.assocList.filter(a => a.associationEnds.find(e => e.className === props.cls.className)), [props.cls.className, props.assocList]);

    const assocColumns: ColumnsType<Association> = [
        {
            key: 'name',
            title: 'Association',
            render: (_, v) => `${v.associationName} (${v.associationEnds.map(e => `${e.rolename}: ${e.className}`).join(",")})`
        },
        {
            key: 'lowerBound',
            title: 'Min. Links',
            render: (_, v) => {
                return <Form.Item
                    key={"min"}
                    name={["associationSettings", v.associationName, "lowerBound"]}
                    initialValue={0}
                >
                    <InputNumber/>
                </Form.Item>
            }
        },
        {
            key: 'upperBound',
            title: 'Max. Links',
            render: (_, v) => {
                return <Form.Item
                    key={"max"}
                    name={["associationSettings", v.associationName, "upperBound"]}
                    initialValue={3}
                >
                    <InputNumber/>
                </Form.Item>
            }
        },

        {
            key: 'instanceNames',
            title: 'Req. Links',
            render: (_, v) => {
                return <Form.Item
                    key={"instanceNames"}
                    name={["associationSettings", v.associationName, "instanceNames"]}
                    normalize={(v: string) => v.split(",")}
                >
                    <Input/>
                </Form.Item>
            }
        },
    ]

    return <>
        <h3>Associations of class {props.cls.className}</h3>
        <Table columns={assocColumns} dataSource={activeAssoc}/>
    </>
}