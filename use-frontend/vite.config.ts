import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        federation({
            name: "use-main",
            filename: "use-main.js",
            exposes: {
                "./dia/ClassDia": "./src/view/class-diagram/ClassDia.tsx",
            },
            remotes: {
                DevPlugin: "http://localhost:4001/assets/use-plugin.js",
                dummy: "dummy.js",
            },
            shared: [
                "react", "react-dom", "antd", "axios", "canvg", "fast-deep-equal",
                "html2canvas", "jointjs", "jspdf", "react-draggable", "react-error-boundary",
                "react-redux",
                "use-debounce"
            ],
        }),
    ],
    server: {
        port: 3000,
        host: true,
    },
    preview: {
        port: 4000,
    },
    build: {
        modulePreload: false,
        target: "esnext",
        minify: false,
        cssCodeSplit: false,
    },
});
