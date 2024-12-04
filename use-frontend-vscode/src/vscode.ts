import {useEffect, useState} from "react";
import {modalBrowserApi} from "./api";

interface vscode {
    postMessage(message: any): void;
}

declare function acquireVsCodeApi(): vscode;

const vscode = acquireVsCodeApi();

type onEvent<E extends keyof WindowEventMap> = Parameters<
    typeof window.addEventListener<E>
>[1];

export enum ColorThemeKind {
    Light = 1,
    Dark = 2,
    HighContrast = 3,
    HighContrastLight = 4,
}

export function useVsCode() {
    const [colorThemeKind, setColorThemeKind] = useState<ColorThemeKind>(
        ColorThemeKind.Dark
    );
    useEffect(() => {
        console.log("useVsCode: useEffect");
        const onMessage: onEvent<"message"> = async (event) => {
            const message = event.data;
            console.log("onMessage", message);

            switch (message.command) {
                case "activeColorTheme":
                    setColorThemeKind(message.activeColorThemeKind);
                    break;
                case "get":
                    let data: any;
                    switch (message.name) {
                        case "modalBrowser":
                            data = (await modalBrowserApi.get()).top;
                            break;
                    }
                    vscode.postMessage({
                        command: "set",
                        name: message.name,
                        data,
                    });
                    break;
                case "view-clsdia":
                    document.querySelector<HTMLElement>("#btn-clsdia")?.click();
                    break;
                case "view-objdia":
                    document.querySelector<HTMLElement>("#btn-objdia")?.click();
                    break;
                case "view-objcnt":
                    document.querySelector<HTMLElement>("#btn-objcnt")?.click();
                    break;
                case "view-lnkcnt":
                    document.querySelector<HTMLElement>("#btn-lnkcnt")?.click();
                    break;
                default:
                    console.error("Unknown message", message);
            }
        };

        window.addEventListener("message", onMessage);
        return () => {
            window.removeEventListener("message", onMessage);
        };
    }, []);

    return {colorThemeKind};
}
