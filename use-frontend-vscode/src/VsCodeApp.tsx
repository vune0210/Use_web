import {ColorThemeKind, useVsCode} from "./vscode";
// import "antd/dist/antd.css";
import {ConfigProvider, theme} from "antd";
import App from "./App";

function VsCodeApp() {
    const {colorThemeKind} = useVsCode();

    return (
        <ConfigProvider
            theme={{
                algorithm: [
                    ColorThemeKind.Light,
                    ColorThemeKind.HighContrastLight,
                ].includes(colorThemeKind)
                    ? theme.defaultAlgorithm
                    : theme.darkAlgorithm,
            }}
        >
            <App/>
        </ConfigProvider>
    );
}

export default VsCodeApp;
