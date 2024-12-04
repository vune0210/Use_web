import {dia, linkTools, shapes, V} from "jointjs";
import React, {forwardRef, PropsWithChildren, useEffect, useImperativeHandle, useMemo, useRef, useState,} from "react";

import "../css/JointDiagram.css";
import "jointjs/dist/joint.css";
import {IJointDiagramContext, JointDiagramContext} from "..";

interface JointDiaProps extends DiaEventProps {
    width: number;
    height: number;
    theme?: string;
    htmlContainerId?: string;
    htmlPaperRootId?: string;
    paperProps?: dia.Paper.Options;
}

export interface DiaEventProps {
    onContextMenu?: (x: number, y: number) => void;
}

const DiaContainerDiv: React.FC<PropsWithChildren<{ paper?: dia.Paper }>> = (
    props
) => {
    const scaleStyle = props.paper
        ? {
            transformOrigin: "0 0",
            transform: V.matrixToTransformString(props.paper.matrix()),
        }
        : {};

    return (
        <div className="dia-html-container" style={scaleStyle}>
            {props.children}
        </div>
    );
};

export const JointDia = forwardRef<
    IJointDiagramContext,
    PropsWithChildren<JointDiaProps>
>((props, ref) => {
    const [graph, setGraph] = useState<dia.Graph>();
    const [paper, setPaper] = useState<dia.Paper>();
    const paperElRef = useRef<HTMLDivElement | null>(null);
    const [diagramState, setDiagramState] = useState<{
        initiated: boolean;
    }>({initiated: false});

    useImperativeHandle(ref, () => ({graph, paper}), [graph, paper]);

    useEffect(() => {
        const _graph = new dia.Graph({}, {cellNamespace: shapes});

        const _paper = new dia.Paper({
            model: _graph,
            width: props.width,
            height: props.height,
            // async: true,
            // frozen: true,
            cellViewNamespace: shapes,
            afterRender: () => {
                setDiagramState({
                    initiated: true,
                });
            },
            // preventContextMenu: true,
            // preventDefaultBlankAction: true,
            // preventDefaultViewAction: true,
            interactive: {
                linkMove: false,
                labelMove: true,
                arrowheadMove: false,
                vertexMove: true,
                vertexAdd: false,
                vertexRemove: false,
                useLinkTools: true,
            },
            ...props.paperProps
        });
        // append paper to children of paperEl
        paperElRef.current?.appendChild(_paper.el);

        var verticesTool = new linkTools.Vertices();
        var segmentsTool = new linkTools.Segments();
        var sourceArrowheadTool = new linkTools.SourceArrowhead();
        var targetArrowheadTool = new linkTools.TargetArrowhead();
        var sourceAnchorTool = new linkTools.SourceAnchor();
        var targetAnchorTool = new linkTools.TargetAnchor();
        var boundaryTool = new linkTools.Boundary();
        // var removeButton = new linkTools.Remove();

        var toolsView = new dia.ToolsView({
            tools: [
                verticesTool,
                segmentsTool,
                sourceArrowheadTool,
                targetArrowheadTool,
                sourceAnchorTool,
                targetAnchorTool,
                boundaryTool,
                // removeButton,
            ],
        });

        // _paper.on("element:magnet:pointerclick", (elementView, evt, magnet) => {
        //   console.log("element:magnet:pointerclick");
        //   _paper.removeTools();
        //   elementView.addTools(new dia.ToolsView({ tools: [new Ports()] }));
        // });
        _paper.on("link:pointerclick", function (linkView) {
            linkView.removeTools();
            linkView.addTools(toolsView);
        });
        // _paper.on("link:mouseover", function (linkView) {
        //   linkView.addTools(toolsView);
        // });

        // _paper.on("link:mouseleave", function (linkView) {
        //   linkView.removeTools();
        // });

        _paper.on("blank:pointerdown cell:pointerdown", () => {
            _paper.removeTools();
        });

        _paper.on("blank:contextmenu", (_evt, x, y) => {
            // console.log(x, y);
            props.onContextMenu?.(x, y);
        });
        //   _paper.unfreeze();
        setGraph(_graph);
        setPaper(_paper);

        return () => {
            _paper?.remove();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const context = useMemo(() => ({graph, paper}), [graph, paper]);

    return (
        <JointDiagramContext.Provider value={context}>
            <div
                className="paper paper-container"
                id={props.htmlContainerId}
                style={{width: props.width, height: props.height}}
            >
                {/* Paper element will be placed inside */}
                <div
                    id={props.htmlPaperRootId}
                    ref={paperElRef}
                    className={"dia-paper-root"}
                    style={{display: "inline-block"}}
                    onContextMenu={(e) => {
                        e.preventDefault();
                        // console.log(e);
                        // props.onContextMenu?.(e.pageX, e.pageY);
                    }}
                />

                {/* Container (+scale support) */}
                <DiaContainerDiv paper={paper}>{props.children}</DiaContainerDiv>
            </div>
        </JointDiagramContext.Provider>
    );
});
