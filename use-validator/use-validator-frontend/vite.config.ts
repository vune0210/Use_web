import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        federation({
            name: "use-plugin-validator",
            filename: "use-plugin.js",
            exposes: {
                "./Plugin": "./src/Plugin",
            },
            remotes: {
                useMain: "http://localhost:4000/assets/use-main.js",
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
        port: 3001,
    },
    preview: {
        port: 4001,
    },
    build: {
        modulePreload: false,
        target: "esnext",
        minify: false,
        cssCodeSplit: false,
    },
    base: "./"
});
