import {importShared} from './__federation_fn_import-5e1cd25d.js';
import {j as jsxRuntimeExports, M as ModalValidatorConfig} from './ModalValidatorConfig-9cc5153e.js';
import {r as reactDomExports} from './__federation_shared_react-dom-f4b3ef56.js';

var client = {};

var m = reactDomExports;
{
    client.createRoot = m.createRoot;
    client.hydrateRoot = m.hydrateRoot;
}

function App() {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            ModalValidatorConfig,
            {
                visible: true,
                onClose: () => {
                }
            },
            "diaId"
        )
    });
}

const React = await importShared('react');
client.createRoot(document.getElementById("root")).render(
    /* @__PURE__ */ jsxRuntimeExports.jsx(React.StrictMode, {children: /* @__PURE__ */ jsxRuntimeExports.jsx(App, {})})
);
