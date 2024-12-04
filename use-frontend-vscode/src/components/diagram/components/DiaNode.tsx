import {dia, shapes} from "jointjs";
import {PropsWithChildren, useContext, useEffect, useRef, useState} from "react";
import {JointDiagramContext} from "..";
import {Position} from "../types";

interface DiaNodeProps {
    id: string;
    shape?: new () => dia.Element;
    style?: React.CSSProperties;
    width?: number;
    height?: number;
    deps: any[];

    initPosition?: Position;
    position?: Position;
    onMove?: (position: Position) => void;
    onDblClick?: () => void;
}

export const DiaNode: React.FC<PropsWithChildren<DiaNodeProps>> = (props) => {
    const nodeContainerRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState(props.initPosition ?? {x: 0, y: 0});
    const {graph, paper} = useContext(JointDiagramContext);

    useEffect(() => {
        if (graph == null || paper == null) return;
        const onDblClick = (cellView: dia.CellView) => {
            if (cellView.model.id === props.id) {
                props.onDblClick?.();
            }
        };
        paper.on("cell:pointerdblclick", onDblClick);
        return () => {
            paper.off("cell:pointerdblclick", onDblClick);
            let cell = graph.getCell(props.id);
            if (cell) {
                console.log("DiaNode: remove", props.id);
                cell.off("change:position");
                graph.removeCells([cell]);
            }
        };
    }, [graph, props.id]);

    useEffect(() => {
        if (!graph) return;

        let cell = graph.getCell(props.id) as joint.dia.Element | undefined; // cell can be Link and Element
        if (!cell?.isElement()) cell = undefined;

        const widthEl = props.width ?? nodeContainerRef.current?.offsetWidth ?? 100;
        const heightEl =
            props.height ?? nodeContainerRef.current?.offsetHeight ?? 100;

        if (position?.x == null || position?.y == null) {
            console.warn(
                "position x,y is null, position = ",
                position
            );
        }

        if (!cell) {
            console.log("DiaNode: new ", props.id, widthEl, heightEl);
            const element = props.shape
                ? new props.shape()
                : new shapes.standard.Rectangle({
                    ports: {
                        groups: {
                            left: {
                                position: {
                                    name: "left",
                                },
                                attrs: {
                                    portBody: {
                                        magnet: true,
                                        width: 4,
                                        height: 4,
                                        // x: -8,
                                        // y: -8,
                                        fill: "#03071E",
                                    },
                                    label: {
                                        text: "port",
                                    },
                                },
                                markup: [
                                    {
                                        tagName: "rect",
                                        selector: "portBody",
                                    },
                                ],
                            },
                            right: {
                                position: {
                                    name: "right",
                                },
                                attrs: {
                                    portBody: {
                                        magnet: true,
                                        width: 4,
                                        height: 4,
                                        // x: -8,
                                        // y: -8,
                                        fill: "#03071E",
                                    },
                                    label: {
                                        text: "port",
                                    },
                                },
                                markup: [
                                    {
                                        tagName: "rect",
                                        selector: "portBody",
                                    },
                                ],
                            },
                            top: {
                                position: {
                                    name: "top",
                                },
                                attrs: {
                                    portBody: {
                                        magnet: true,
                                        width: 4,
                                        height: 4,
                                        // x: -8,
                                        // y: -8,
                                        fill: "#03071E",
                                    },
                                    label: {
                                        text: "port",
                                    },
                                },
                                markup: [
                                    {
                                        tagName: "rect",
                                        selector: "portBody",
                                    },
                                ],
                            },
                            bottom: {
                                position: {
                                    name: "bottom",
                                },
                                attrs: {
                                    portBody: {
                                        magnet: true,
                                        width: 4,
                                        height: 4,
                                        // x: -8,
                                        // y: -8,
                                        fill: "#03071E",
                                    },
                                    label: {
                                        text: "port",
                                    },
                                },
                                markup: [
                                    {
                                        tagName: "rect",
                                        selector: "portBody",
                                    },
                                ],
                            },
                        },
                    },
                    attrs: {
                        body: {
                            fill: "transparent",
                            strokeWidth: 0
                        }
                    }
                });
            graph.addCell(
                element
                    .set("id", props.id)
                    // .attr({ body: { fill: "transparent", strokeWidth: 0 })
                    .resize(widthEl, heightEl)
                    .position(position?.x ?? 10, position?.y ?? 10)
                    .on("change:position", (movedEl) => {
                        setPosition(movedEl.position());
                        props.onMove?.(movedEl.position());
                    })
            );
        } else {
            const {x: _x, y: _y} = cell.position();
            if (_x != position.x || _y != position.y) {
                console.log("DiaNode: update: move: ", props.id);
                cell.position(position.x, position.y);
            }

            const {height: _height, width: _width} = cell.size();
            if (widthEl != _width || heightEl != _height) {
                console.log("DiaNode: update: resize: ", props.id);
                cell.resize(widthEl, heightEl);
            }
        }
    }, [graph, props.id, position, props.onMove, ...props.deps]);
    return (
        <div
            style={{
                background: "#ffffbc",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.04)",
                position: "absolute",
                left: position?.x ?? 10,
                top: position?.y ?? 10,
                pointerEvents: "none",
                boxSizing: "border-box",
                color: "black",
                ...props.style,
            }}
            ref={nodeContainerRef}
        >
            {props.children}
        </div>
    );
};
