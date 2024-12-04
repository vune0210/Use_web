// import "antd/dist/antd.css";
import {Layout, theme} from "antd";
import {useEffect} from "react";
import {Provider} from "react-redux";
import {NavMenu} from "./NavMenu";
import {Toolbar} from "./Toolbar";
import {ModalZIndexProvider} from "./components/dialogs/ModalZIndexContext";
import {useAppDispatch} from "./store/hook";
import {store} from "./store/store";
import {loadUndoRedoThunk} from "./store/undo-redo/undoRedoThunks.ts";
import {ModalBrowser} from "./view/modal-browser/ModalBrowser";
import viteLogo from "/vite.svg";
import {ModalContents} from "./AppModalContents.tsx";

const {Header, Sider, Content, Footer} = Layout;

function InitLoad() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(loadUndoRedoThunk());
    }, []);
    return null;
}

function App() {
    const {
        token: {colorBgContainer},
    } = theme.useToken();
    return (
        <Provider store={store}>
            <ModalZIndexProvider>
                <InitLoad/>

                <Layout className="layout">
                    <Header style={{display: "flex", alignItems: "center"}}>
                        <img src={viteLogo} className="img-logo"/>
                        <NavMenu/>
                    </Header>
                    <Content style={{padding: "0 50px"}}>
                        <Toolbar/>

                        <Layout style={{padding: "24px 0", background: colorBgContainer}}>
                            <Sider style={{background: colorBgContainer}} width={400}>
                                <ModalBrowser/>
                            </Sider>
                            <Content style={{padding: "0 24px", minHeight: 280}}>
                                {/* Content */}
                            </Content>
                        </Layout>
                        <div
                            className="site-layout-content"
                            style={{background: colorBgContainer}}
                        >
                            <ModalContents/>
                        </div>
                    </Content>
                    <Footer style={{textAlign: "center"}}>USE Web Client ©2023</Footer>
                </Layout>
            </ModalZIndexProvider>
        </Provider>
    );
}

export default App;
