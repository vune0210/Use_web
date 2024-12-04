"use client";

import React, {Suspense} from "react";
import ReactDOM from "react-dom/client";

import viteLogo from "/vite.svg";
import "./index.css";
import {Spin} from "antd";
import VsCodeApp from "./VsCodeApp";

const App = React.lazy(() => import("./App"));

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        {/* <ErrorBoundary fallback={<AppErrorBoundaryView />}> */}
        <Suspense
            fallback={
                <div className="app-spin">
                    <img src={viteLogo}/>
                    <Spin/>
                </div>
            }
        >
            <VsCodeApp/>
        </Suspense>
        {/* </ErrorBoundary> */}
    </React.StrictMode>
);
