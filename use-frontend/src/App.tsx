// import "antd/dist/antd.css";
import {Layout, Result, theme} from "antd";
import {useEffect} from "react";
import {NavMenu} from "./NavMenu";
import {Toolbar} from "./Toolbar";
import {ModalZIndexProvider} from "./components/dialogs/ModalZIndexContext";
import {useAppDispatch, useAppSelector} from "./store/hook";
import {loadUndoRedoThunk} from "./store/undo-redo/undoRedoThunks.ts";
import {ModalBrowser} from "./view/modal-browser/ModalBrowser";
import viteLogo from "/vite.svg";
import {ModalContents} from "./AppModalContents.tsx";
import {OpenSpecButton} from "./view/toolbar/OpenSpecBtn.tsx";
import {loadModalBrowserThunk} from "./store/modal-browser/modalBrowserThunk.ts";
import {SocketIO} from "./api/socketio.ts";

const {Header, Sider, Content, Footer} = Layout;

function InitLoad() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(loadModalBrowserThunk());
        dispatch(loadUndoRedoThunk());

        const sock = new SocketIO();
        console.log(sock)
    }, []);
    return null;
}

function App() {
    const {
        token: {colorBgContainer},
    } = theme.useToken();
    const modalName = useAppSelector(state => state.modalBrowser.treeData?.name);
    return (
        <ModalZIndexProvider>
            <InitLoad/>

            <ModalContents/>

            <Layout>
                <Header style={{display: "flex", alignItems: "center"}}>
                    <img src={viteLogo} className="img-logo"/>
                    <NavMenu/>
                </Header>

                <Layout style={{background: colorBgContainer}}>
                    {
                        modalName ?
                            <><Sider style={{background: colorBgContainer, userSelect: "none"}} width={400}>
                                <OpenSpecButton/>
                                <ModalBrowser/>
                            </Sider>
                                <Layout style={{padding: '0 24px', userSelect: "none"}}>
                                    <Content>
                                    </Content>
                                </Layout>
                                <Sider style={{
                                    background: colorBgContainer,
                                    height: "calc(100vh - 64px)",
                                    overflowY: "auto",
                                    userSelect: "none"
                                }} width={400}>
                                    <Toolbar/>
                                </Sider></>
                            : <Result
                                status="info"
                                title="No specification file opened"
                                extra={<OpenSpecButton/>}
                            />
                    }
                </Layout>

                {/*<Footer style={{textAlign: "center"}}>USE Web Client ©2023</Footer>*/}
            </Layout>

        </ModalZIndexProvider>
    );
}

export default App;
