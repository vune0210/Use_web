import React, {useEffect, useState} from "react";
import {SelectedNode} from "./types/SelectedNode.ts";
import {modalBrowserApi} from "../../api";
import "./ModalBrowserInfo.css"

export const ModalBrowserInfo: React.FC<SelectedNode> = (props) => {
    const [info, setInfo] = useState("");
    useEffect(() => {
        (async () => {
            const resp = await modalBrowserApi.getInfo(props.type, props.name);
            setInfo(
                resp.info.replace(/\r\n/g, "<br />")
                    .replace(`<font size="-1">`, "")
                    .replace(`</font>`, "")
                    .replace("class", `<b>class</b>`)
                    .replace("attributes", `<b>attributes</b>`)
                    .replace("operations", `<b>operations</b>`)
                    .replace("end", `<b>end</b>`)
                    .replace("association", `<b>association</b>`)
                    .replace("between", `<b>between</b>`)
                    .replace("ordered", `<b>ordered</b>`)
                    .replace("context", `<b>context</b>`)
                    .replace("post", `<b>post</b>`)
            );
        })();
    }, [props]);
    return <div className="modal-browser-info">
        <div dangerouslySetInnerHTML={{__html: info}}>
        </div>
    </div>

}