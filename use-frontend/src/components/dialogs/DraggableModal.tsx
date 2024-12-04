import {Modal, ModalProps, Spin} from "antd";
import React, {Suspense, useContext, useEffect, useRef, useState} from "react";
import type {DraggableData, DraggableEvent} from "react-draggable";
import Draggable from "react-draggable";
import "./transparentmodal.css";
import {ModalZIndexContext} from "./ModalZIndexContext";
import {ErrorBoundary} from "react-error-boundary";
import {PluginErrorBoundaryView} from "../../ErrorBoundary";

const DraggableModal: React.FC<ModalProps & { id: string }> = (props) => {
    const [disabled, setDisabled] = useState(true);
    const {activeModalId, setActiveModalId} = useContext(ModalZIndexContext);
    const [bounds, setBounds] = useState({
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
    });
    const draggleRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // new dialog will always top most.
        if (props.open) {
            setActiveModalId(props.id);
        }
    }, [props.open]);

    const onStart = (_event: DraggableEvent, uiData: DraggableData) => {
        const {clientWidth, clientHeight} = window.document.documentElement;
        const targetRect = draggleRef.current?.getBoundingClientRect();
        if (!targetRect) {
            return;
        }
        setBounds({
            left: -targetRect.left + uiData.x,
            right: clientWidth - (targetRect.right - uiData.x),
            top: -targetRect.top + uiData.y,
            bottom: clientHeight - (targetRect.bottom - uiData.y),
        });
    };

    return (
        <>
            <Modal
                mask={false}
                maskClosable={false}
                {...props}
                wrapProps={{
                    style: {zIndex: activeModalId === props.id ? 1 : 0},
                    onClick: () => {
                        setActiveModalId(props.id);
                    },
                }}
                title={
                    <div
                        style={{
                            width: "100%",
                            cursor: "move",
                            userSelect: "none"
                        }}
                        onMouseOver={() => {
                            if (disabled) {
                                setDisabled(false);
                            }
                        }}
                        onMouseOut={() => {
                            setDisabled(true);
                        }}
                        // fix eslintjsx-a11y/mouse-events-have-key-events
                        // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/mouse-events-have-key-events.md
                        onFocus={() => {
                        }}
                        onBlur={() => {
                        }}
                        // end
                    >
                        {props.title}
                    </div>
                }
                modalRender={(modal) => (
                    <Draggable
                        disabled={disabled}
                        bounds={bounds}
                        nodeRef={draggleRef}
                        onStart={(event, uiData) => onStart(event, uiData)}
                    >
                        <div ref={draggleRef}>{modal}</div>
                    </Draggable>
                )}
            >
                <ErrorBoundary fallback={<PluginErrorBoundaryView/>}>
                    <Suspense
                        fallback={
                            <div className="modal-spin">
                                <Spin/>
                            </div>
                        }
                    >
                        {props.children}
                    </Suspense>
                </ErrorBoundary>
            </Modal>
        </>
    );
};

export default DraggableModal;
