import React, {useEffect, useState} from "react";
import {SelectedNode} from "./types/SelectedNode.ts";
import {modalBrowserApi} from "../../api";
import {Card} from "antd";

export const ModalBrowserInfo: React.FC<SelectedNode> = (props) => {
    const [info, setInfo] = useState("");
    useEffect(() => {
        (async () => {
            const resp = await modalBrowserApi.getInfo(props.type, props.name);
            setInfo(resp.info);
        })();
    }, [props]);
    return <Card bordered={false} style={{width: 300}}>
        <div dangerouslySetInnerHTML={{__html: info}}>
        </div>
    </Card>

}