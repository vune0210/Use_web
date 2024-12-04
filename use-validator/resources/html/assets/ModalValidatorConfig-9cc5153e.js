import {importShared} from './__federation_fn_import-5e1cd25d.js';
import {r as reactExports} from './__federation_shared_react-b9a2fc6e.js';

var jsxRuntime = {exports: {}};

var reactJsxRuntime_production_min = {};

/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f = reactExports, k = Symbol.for("react.element"), l = Symbol.for("react.fragment"),
    m = Object.prototype.hasOwnProperty, n = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    p = {key: !0, ref: !0, __self: !0, __source: !0};

function q(c, a, g) {
    var b, d = {}, e = null, h = null;
    void 0 !== g && (e = "" + g);
    void 0 !== a.key && (e = "" + a.key);
    void 0 !== a.ref && (h = a.ref);
    for (b in a) m.call(a, b) && !p.hasOwnProperty(b) && (d[b] = a[b]);
    if (c && c.defaultProps) for (b in a = c.defaultProps, a) void 0 === d[b] && (d[b] = a[b]);
    return {$$typeof: k, type: c, key: e, ref: h, props: d, _owner: n.current}
}

reactJsxRuntime_production_min.Fragment = l;
reactJsxRuntime_production_min.jsx = q;
reactJsxRuntime_production_min.jsxs = q;

{
    jsxRuntime.exports = reactJsxRuntime_production_min;
}

var jsxRuntimeExports = jsxRuntime.exports;

const {
    Checkbox: Checkbox$4,
    Form: Form$6,
    Input: Input$3,
    InputNumber: InputNumber$3,
    Table: Table$4
} = await importShared('antd');

const IntegerSettingInput = ({form}) => {
    const columns = [
        {
            "title": "Minimum",
            render: () => /* @__PURE__ */ jsxRuntimeExports.jsx(
                Form$6.Item,
                {
                    initialValue: -10,
                    name: ["integerTypeSettings", "minimum"],
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(InputNumber$3, {})
                },
                "min"
            )
        },
        {
            "title": "Maximum",
            render: () => /* @__PURE__ */ jsxRuntimeExports.jsx(
                Form$6.Item,
                {
                    initialValue: 10,
                    name: ["integerTypeSettings", "maximum"],
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(InputNumber$3, {})
                },
                "max"
            )
        },
        {
            "title": "Required Value",
            render: () => /* @__PURE__ */ jsxRuntimeExports.jsx(
                Form$6.Item,
                {
                    name: ["integerTypeSettings", "values"],
                    normalize: (v) => v.split(","),
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input$3, {})
                },
                "values"
            )
        }
    ];
    const enabled = Form$6.useWatch(["integerTypeSettings", "enabled"], form);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
        children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
                Form$6.Item,
                {
                    valuePropName: "checked",
                    initialValue: true,
                    name: ["integerTypeSettings", "enabled"],
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox$4, {children: "Integer"})
                },
                "enabled"
            ),
            enabled ? /* @__PURE__ */ jsxRuntimeExports.jsx(Table$4, {columns, dataSource: [1]}) : null
        ]
    });
};

const axios$5 = await importShared('axios');

const _Api = class _Api {
    constructor(apiPath) {
        this.apiPath = apiPath;
    }

    path(subPath) {
        if (this.apiPath[0] !== "/" && this.apiPath[0] !== "\\") {
            this.apiPath = "/" + this.apiPath;
        }
        if (this.apiPath.length === 1)
            this.apiPath = "";
        if (subPath[0] !== "/" && subPath[0] !== "\\") {
            subPath = "/" + subPath;
        }
        if (subPath.length === 1)
            subPath = "";
        return `${_Api.HOST}${this.apiPath}${subPath}`;
    }

    async callApi(callback) {
        try {
            return callback();
        } catch (e) {
            if (axios$5.isAxiosError(e)) {
                throw new ApiError(e);
            } else {
                throw e;
            }
        }
    }
};
_Api.HOST = "http://192.168.137.1:8080";
let Api = _Api;

class ApiError extends Error {
    constructor(e) {
        if (e.response) {
            const res = e.response.data;
            super(res.message ?? e.message);
        } else {
            super(e.message);
        }
    }
}

const axios$4 = await importShared('axios');

class ModalBrowserApi extends Api {
    constructor() {
        super("/modal-browser");
    }

    async get() {
        return this.callApi(async () => {
            const res = await axios$4.get(this.path("/"));
            return res.data;
        });
    }

    async getInfo(type, name) {
        return this.callApi(async () => {
            const res = await axios$4.get(this.path("/info"), {
                params: {
                    type,
                    name
                }
            });
            return res.data;
        });
    }
}

new ModalBrowserApi();

const axios$3 = await importShared('axios');

class StateApi extends Api {
    constructor() {
        super("/state");
    }

    // CREATE OBJECT
    async getClassList() {
        return this.callApi(async () => {
            const res = await axios$3.get(
                this.path("/create-object")
            );
            return res.data;
        });
    }

    async createObject(className, objectName) {
        return this.callApi(async () => {
            const res = await axios$3.post(this.path("/create-object"), {
                className,
                objectName
            });
            return res.data;
        });
    }

    // OBJECT PROPERTY
    async getObjectState(objName) {
        return this.callApi(async () => {
            const res = await axios$3.get(
                this.path("/object-property"),
                {
                    params: {objName}
                }
            );
            return res.data;
        });
    }

    async updateObject(objName, values) {
        return this.callApi(async () => {
            const res = await axios$3.post(
                this.path("/object-property"),
                {values},
                {
                    params: {objName}
                }
            );
            return res.data;
        });
    }

    // RESET
    async resetState() {
        return this.callApi(async () => {
            const res = await axios$3.post(this.path("/reset"));
            return res.data;
        });
    }

    // EVALUATE OCL EXPRESSION
    async evalOclExpr(expr) {
        return this.callApi(async () => {
            const res = await axios$3.post(
                this.path("/ocl-eval"),
                {expr}
            );
            return res.data;
        });
    }

    // CHECK STRUCTURE
    async checkStructure() {
        return this.callApi(async () => {
            const res = await axios$3.get(this.path("/check-structure"));
            return res.data;
        });
    }

    // DETERMINE STATE
    async determineState() {
        return this.callApi(async () => {
            const res = await axios$3.get(this.path("/determine-state"));
            return res.data;
        });
    }

    // CHECK STATE INVARIANTS
    async checkStateInvariants() {
        return this.callApi(async () => {
            const res = await axios$3.get(this.path("/check-state-invariants"));
            return res.data;
        });
    }
}

new StateApi();

const axios$2 = await importShared('axios');

class ViewApi extends Api {
    constructor() {
        super("/view");
    }

    async getClassDiagram() {
        return this.callApi(async () => {
            const res = await axios$2.get(
                this.path("/class-diagram")
            );
            return res.data;
        });
    }

    async getObjectDiagram() {
        return this.callApi(async () => {
            const res = await axios$2.get(
                this.path("/object-diagram")
            );
            return res.data;
        });
    }

    async getEvents() {
        return this.callApi(async () => {
            const res = await axios$2.get(
                this.path("/seq-diagram")
            );
            return res.data;
        });
    }

    async getClassInvariant() {
        return this.callApi(async () => {
            const res = await axios$2.get(
                this.path("/invariant")
            );
            return res.data;
        });
    }

    async getClassExtent(className) {
        return this.callApi(async () => {
            const res = await axios$2.get(
                this.path("/class-extent"),
                {
                    params: {className}
                }
            );
            return res.data;
        });
    }

    async getStateEvolution() {
        return this.callApi(async () => {
            const res = await axios$2.get(
                this.path("/state-evo")
            );
            return res.data;
        });
    }

    async getObjectCount() {
        return this.callApi(async () => {
            const res = await axios$2.get(this.path("/object-count"));
            return res.data;
        });
    }

    async getLinkCount() {
        return this.callApi(async () => {
            const res = await axios$2.get(this.path("/link-count"));
            return res.data;
        });
    }

    async getCallstack() {
        return this.callApi(async () => {
            const res = await axios$2.get(this.path("/callstack"));
            return res.data;
        });
    }

    async getCommandList() {
        return this.callApi(async () => {
            const res = await axios$2.get(this.path("/command-list"));
            return res.data;
        });
    }
}

const viewApi = new ViewApi();

const axios$1 = await importShared('axios');

class SystemApi extends Api {
    constructor() {
        super("");
    }

    async getUndoRedoAvailability() {
        return this.callApi(async () => {
            const res = await axios$1.get(
                this.path("/undo-redo/avail")
            );
            return res.data;
        });
    }

    async undo() {
        return this.callApi(async () => {
            const res = await axios$1.post(
                this.path("/undo")
            );
            return res.data;
        });
    }

    async redo() {
        return this.callApi(async () => {
            const res = await axios$1.post(
                this.path("/redo")
            );
            return res.data;
        });
    }

    async getPluginList() {
        return this.callApi(async () => {
            const res = await axios$1.get(
                this.path("/plugins-fe/list")
            );
            return res.data;
        });
    }
}

new SystemApi();

const axios = await importShared('axios');

class ModalValidatorApi extends Api {
    constructor() {
        super("/plugins/modal-validator");
    }

    async validate(setting) {
        return this.callApi(async () => {
            const formData = new FormData();
            formData.append("body", new Blob([JSON.stringify(setting)], {type: "application/json"}));
            const res = await axios.post(this.path("/"), formData);
            return res.data;
        });
    }
}

new ModalValidatorApi();

const {
    Checkbox: Checkbox$3,
    Form: Form$5,
    Input: Input$2,
    InputNumber: InputNumber$2,
    Table: Table$3
} = await importShared('antd');

const RealSettingInput = ({form}) => {
    const columns = [
        {
            "title": "Minimum",
            render: () => /* @__PURE__ */ jsxRuntimeExports.jsx(
                Form$5.Item,
                {
                    initialValue: -2,
                    name: ["realTypeSettings", "minimum"],
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(InputNumber$2, {})
                },
                "min"
            )
        },
        {
            "title": "Maximum",
            render: () => /* @__PURE__ */ jsxRuntimeExports.jsx(
                Form$5.Item,
                {
                    initialValue: 2,
                    name: ["realTypeSettings", "maximum"],
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(InputNumber$2, {})
                },
                "max"
            )
        },
        {
            "title": "Step range",
            render: () => /* @__PURE__ */ jsxRuntimeExports.jsx(
                Form$5.Item,
                {
                    initialValue: 0.5,
                    name: ["realTypeSettings", "realStep"],
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(InputNumber$2, {})
                },
                "realStep"
            )
        },
        {
            "title": "Required Value",
            render: () => /* @__PURE__ */ jsxRuntimeExports.jsx(
                Form$5.Item,
                {
                    name: ["realTypeSettings", "values"],
                    normalize: (v) => v.split(","),
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input$2, {})
                },
                "values"
            )
        }
    ];
    const enabled = Form$5.useWatch(["realTypeSettings", "enabled"], form);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
        children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
                Form$5.Item,
                {
                    valuePropName: "checked",
                    initialValue: true,
                    name: ["realTypeSettings", "enabled"],
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox$3, {children: "Real"})
                },
                "enabled"
            ),
            enabled ? /* @__PURE__ */ jsxRuntimeExports.jsx(Table$3, {columns, dataSource: [1]}) : null
        ]
    });
};

const {Checkbox: Checkbox$2, Form: Form$4} = await importShared('antd');

const OptionSettingInput = () => {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
        children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
                Form$4.Item,
                {
                    valuePropName: "checked",
                    initialValue: true,
                    name: ["optionSettings", "aggregationcyclefreeness"],
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox$2, {children: "Forbid aggregation/composition cycles"})
                },
                "enabled"
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
                Form$4.Item,
                {
                    valuePropName: "checked",
                    initialValue: true,
                    name: ["optionSettings", "forbiddensharing"],
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox$2, {children: "Exclusive composition participation"})
                },
                "enabled"
            )
        ]
    });
};

const {
    Col: Col$1,
    Form: Form$3,
    Input: Input$1,
    InputNumber: InputNumber$1,
    Row: Row$1,
    Switch,
    Table: Table$2
} = await importShared('antd');

const {useEffect: useEffect$1, useMemo, useState: useState$1} = await importShared('react');
const ClassesAndAssoc = () => {
    const [classes, setClasses] = useState$1([]);
    const [activeClass, setActiveClass] = useState$1(null);
    const [assoc, setAssoc] = useState$1([]);
    const [showAttrBound, setShowAttrBound] = useState$1(false);
    useEffect$1(() => {
        (async () => {
            const cls = await viewApi.getClassDiagram();
            setClasses(cls.classList);
            setActiveClass(cls.classList[0]);
            setAssoc(cls.assocList);
        })();
    }, []);
    const classColumns = [
        {
            key: "className",
            title: "Class",
            dataIndex: "className"
        },
        {
            key: "lowerBound",
            title: "Min. Object Quantity",
            render: (_, v) => {
                return /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Form$3.Item,
                    {
                        name: ["classSettings", v.className, "lowerBound"],
                        initialValue: 1,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(InputNumber$1, {})
                    },
                    "min"
                );
            }
        },
        {
            key: "upperBound",
            title: "Max Object Quantity",
            render: (_, v) => {
                return /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Form$3.Item,
                    {
                        name: ["classSettings", v.className, "upperBound"],
                        initialValue: 3,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(InputNumber$1, {})
                    },
                    "max"
                );
            }
        },
        {
            key: "instanceNames",
            title: "Req. Object Identities",
            render: (_, v) => {
                return /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Form$3.Item,
                    {
                        name: ["classSettings", v.className, "instanceNames"],
                        normalize: (v2) => v2.split(","),
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input$1, {})
                    },
                    "instanceNames"
                );
            }
        }
    ];
    const attrColumns = (className) => [
        {
            key: "attrName",
            title: "Attribute",
            render: (_, v) => v.split(":")[0]
        },
        {
            key: "lowerBound",
            title: "Min. Defined",
            // hidden: !showAttrBound,
            render: (_, v) => {
                return /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Form$3.Item,
                    {
                        name: ["classSettings", className, "attributeSettings", v.split(":")[0].trim(), "lowerBound"],
                        initialValue: -1,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(InputNumber$1, {})
                    },
                    "min"
                );
            }
        },
        {
            key: "upperBound",
            title: "Max. Defined",
            // hidden: !showAttrBound,
            render: (_, v) => {
                return /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Form$3.Item,
                    {
                        name: ["classSettings", className, "attributeSettings", v.split(":")[0].trim(), "upperBound"],
                        initialValue: -1,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(InputNumber$1, {})
                    },
                    "max"
                );
            }
        },
        {
            key: "collectionSizeMin",
            title: "Min. Elements",
            hidden: !showAttrBound,
            render: (_, v) => {
                return /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Form$3.Item,
                    {
                        name: ["classSettings", className, "attributeSettings", v.split(":")[0].trim(), "collectionSizeMin"],
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(InputNumber$1, {})
                    },
                    "collectionSizeMin"
                );
            }
        },
        {
            key: "collectionSizeMax",
            title: "Max. Elements",
            hidden: !showAttrBound,
            render: (_, v) => {
                return /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Form$3.Item,
                    {
                        name: ["classSettings", className, "attributeSettings", v.split(":")[0].trim(), "collectionSizeMax"],
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(InputNumber$1, {})
                    },
                    "collectionSizeMax"
                );
            }
        },
        {
            key: "instanceNames",
            title: "Possible Values",
            render: (_, v) => {
                return /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Form$3.Item,
                    {
                        name: ["classSettings", className, "attributeSettings", v.split(":")[0].trim(), "instanceNames"],
                        normalize: (v2) => v2.split(","),
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input$1, {})
                    },
                    "instanceNames"
                );
            }
        }
    ];
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(Row$1, {
        gutter: {xs: 16}, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Col$1, {
                xs: 12, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Table$2, {
                    columns: classColumns, dataSource: classes, onRow: (record, index) => {
                        return {
                            onClick: (event) => {
                                setActiveClass(record);
                            }
                            // click row
                        };
                    }
                })
            }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Col$1, {
                xs: 12, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Row$1, {
                        children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Col$1, {
                                flex: "auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", {
                                    children: [
                                        "Attribute of class ",
                                        activeClass?.className
                                    ]
                                })
                            }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(Col$1, {
                                children: [
                                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                                        Switch,
                                        {
                                            checked: showAttrBound,
                                            onChange: (e) => setShowAttrBound(e),
                                            title: "Show specific bounds"
                                        }
                                    ),
                                    "Show specific bounds"
                                ]
                            })
                        ]
                    }),
                    classes.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
                        style: {display: activeClass === c ? void 0 : "none"},
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Table$2, {
                            columns: attrColumns(c.className),
                            dataSource: c.fAttrValues
                        })
                    })),
                    classes.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
                        style: {display: activeClass === c ? void 0 : "none"},
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(AssociationsConfigTable, {
                            cls: c,
                            assocList: assoc
                        }, `assoCf_${c.className}`)
                    }))
                ]
            })
        ]
    });
};
const AssociationsConfigTable = (props) => {
    const activeAssoc = useMemo(() => props.assocList.filter((a) => a.associationEnds.find((e) => e.className === props.cls.className)), [props.cls.className, props.assocList]);
    const assocColumns = [
        {
            key: "name",
            title: "Association",
            render: (_, v) => `${v.associationName} (${v.associationEnds.map((e) => `${e.rolename}: ${e.className}`).join(",")})`
        },
        {
            key: "lowerBound",
            title: "Min. Links",
            render: (_, v) => {
                return /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Form$3.Item,
                    {
                        name: ["associationSettings", v.associationName, "lowerBound"],
                        initialValue: 0,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(InputNumber$1, {})
                    },
                    "min"
                );
            }
        },
        {
            key: "upperBound",
            title: "Max. Links",
            render: (_, v) => {
                return /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Form$3.Item,
                    {
                        name: ["associationSettings", v.associationName, "upperBound"],
                        initialValue: 3,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(InputNumber$1, {})
                    },
                    "max"
                );
            }
        },
        {
            key: "instanceNames",
            title: "Req. Links",
            render: (_, v) => {
                return /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Form$3.Item,
                    {
                        name: ["associationSettings", v.associationName, "instanceNames"],
                        normalize: (v2) => v2.split(","),
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input$1, {})
                    },
                    "instanceNames"
                );
            }
        }
    ];
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
        children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", {
                children: [
                    "Associations of class ",
                    props.cls.className
                ]
            }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Table$2, {columns: assocColumns, dataSource: activeAssoc})
        ]
    });
};

const {Checkbox: Checkbox$1, Form: Form$2, Input, InputNumber, Table: Table$1} = await importShared('antd');

const StringSettingInput = ({form}) => {
    const columns = [
        {
            title: "Min. Div. Values",
            render: () => /* @__PURE__ */ jsxRuntimeExports.jsx(
                Form$2.Item,
                {
                    initialValue: 0,
                    name: ["stringTypeSettings", "lowerBound"],
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(InputNumber, {})
                },
                "min"
            )
        },
        {
            title: "Max. Div. Values",
            render: () => /* @__PURE__ */ jsxRuntimeExports.jsx(
                Form$2.Item,
                {
                    initialValue: 10,
                    name: ["stringTypeSettings", "upperBound"],
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(InputNumber, {})
                },
                "max"
            )
        },
        {
            title: "Preferred Value",
            render: () => /* @__PURE__ */ jsxRuntimeExports.jsx(
                Form$2.Item,
                {
                    name: ["stringTypeSettings", "instanceNames"],
                    normalize: (v) => v.split(","),
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, {})
                },
                "values"
            )
        }
    ];
    const enabled = Form$2.useWatch(["stringTypeSettings", "enabled"], form);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
        children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
                Form$2.Item,
                {
                    valuePropName: "checked",
                    initialValue: true,
                    name: ["stringTypeSettings", "enabled"],
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox$1, {children: "String"})
                },
                "enabled"
            ),
            enabled ? /* @__PURE__ */ jsxRuntimeExports.jsx(Table$1, {columns, dataSource: [1]}) : null
        ]
    });
};

const {Checkbox, Form: Form$1, Table} = await importShared('antd');

const {useEffect, useState} = await importShared('react');
const Invariants = () => {
    const [invariants, setInvariants] = useState([]);
    useEffect(() => {
        (async () => {
            const inv = await viewApi.getClassInvariant();
            setInvariants(inv.classInvariants);
        })();
    }, []);
    const assocColumns = [
        {
            key: "name",
            title: "Invariant",
            render: (_, v) => `${v.className}::${v.name}`
        },
        {
            key: "active",
            title: "Active",
            render: (_, v) => {
                return /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Form$1.Item,
                    {
                        name: ["invariantSettings", `${v.className}::${v.name}`, "active"],
                        initialValue: true,
                        valuePropName: "checked",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, {})
                    },
                    "min"
                );
            }
        },
        {
            key: "negate",
            title: "Negate",
            render: (_, v) => {
                return /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Form$1.Item,
                    {
                        name: ["invariantSettings", `${v.className}::${v.name}`, "negate"],
                        initialValue: false,
                        valuePropName: "checked",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, {})
                    },
                    "max"
                );
            }
        }
    ];
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Table, {columns: assocColumns, dataSource: invariants});
};

const {Button, Col, Form, message, Row, Tabs} = await importShared('antd');
const {useCallback} = await importShared('react');
const ModalValidatorConfig = () => {
    const [form] = Form.useForm();
    const tabs = [
        {
            label: `Basic Types and Options`,
            key: "tab1",
            forceRender: true,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Row, {
                    gutter: {xs: 16}, children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(Col, {
                            xs: 12, children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(IntegerSettingInput, {form}),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(StringSettingInput, {form}),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(RealSettingInput, {form})
                            ]
                        }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Col, {
                            xs: 12,
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(OptionSettingInput, {})
                        })
                    ]
                })
            })
        },
        {
            label: `Classes and Associations`,
            key: "tab2",
            forceRender: true,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {children: /* @__PURE__ */ jsxRuntimeExports.jsx(ClassesAndAssoc, {})})
        },
        {
            label: `Invariants`,
            key: "tab3",
            forceRender: true,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {children: /* @__PURE__ */ jsxRuntimeExports.jsx(Invariants, {})})
        }
    ];
    const onValidate = useCallback(async () => {
        try {
            const api = new ModalValidatorApi();
            const values = await form.validateFields();
            const resp = await api.validate(values);
            message.success(resp.message);
        } catch (e) {
            message.error("error" + e);
        }
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(Form, {
        form, labelCol: {span: 6}, wrapperCol: {span: 16}, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Tabs, {defaultActiveKey: "1", items: tabs}),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, {onClick: onValidate, children: "Validate"})
        ]
    });
};

export {ModalValidatorConfig as M, jsxRuntimeExports as j};
