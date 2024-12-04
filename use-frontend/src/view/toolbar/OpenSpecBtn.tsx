import {FolderOpenOutlined} from "@ant-design/icons";
import {Button, message, Upload, UploadProps} from "antd";
import axios from "axios";
import {batch} from "react-redux";
import {Api} from "../../api/API";
import {loadClassDiagramThunk} from "../../store/class-diagram/classDiagramThunks";
import {useAppDispatch} from "../../store/hook";
import {loadModalBrowserThunk} from "../../store/modal-browser/modalBrowserThunk";
import "./OpenSpecBtn.css"

export function OpenSpecButton() {
    const dispatch = useAppDispatch();
    const props: UploadProps = {
        name: "file",
        showUploadList: false,
        customRequest: async (opts) => {
            const formData = new FormData();
            formData.append("file", opts.file);
            try {
                const res = await axios.post(`${Api.HOST}/open`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                opts.onSuccess?.(res.data);
            } catch (e) {
                if (axios.isAxiosError(e)) {
                    opts.onError?.(e as Error, e.response?.data);
                }
            }
        },
        onChange(info) {
            if (info.file.status !== "uploading") {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === "done") {
                message.success(
                    `Open use specification file: ${info.file.name} successfully`
                );
                batch(() => {
                    dispatch(loadClassDiagramThunk());
                    dispatch(loadModalBrowserThunk());
                });
            } else if (info.file.status === "error") {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };
    return (
        <>
            <Upload {...props}  >
                <Button type="primary" icon={<FolderOpenOutlined/>}
                        style={{width: "calc(100% - 32px)", margin: 16, maxWidth: 400}}>Open</Button>
            </Upload>
        </>
    );
}
