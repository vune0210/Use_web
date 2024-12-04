import {dia, elementTools, shapes} from "jointjs";
import {useEffect, useRef} from "react";
import {DefaultLink} from "./DefaultLink";

interface Event {
    onMove: (id: string, x: number, y: number) => any;
    onRemove: (id: string) => any;
}

export function usePaper(
    graph: dia.Graph<any, any>,
    opt: Omit<dia.Paper.Options, "modal" | "cellViewNamespace">,
    event?: Event
): [
    React.MutableRefObject<dia.Paper | undefined>,
    React.MutableRefObject<HTMLDivElement | null>
] {
    const paper = useRef<dia.Paper>();
    const paperEl = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        console.log("useEffect, usePaper");
        paper.current = new dia.Paper({
            // default options
            clickThreshold: 10,
            highlighting: {
                connecting: {
                    name: "stroke",
                    options: {
                        padding: 6,
                    },
                },
            },
            defaultLink: new DefaultLink(),
            validateConnection: (
                sourceView,
                _sourceMagnet,
                targetView,
                _targetMagnet
            ) => {
                if (targetView.model.isLink()) return false;
                if (sourceView === targetView) return false;
                const alreadyConnected = graph.getLinks().some((link) => {
                    const {id: sourceId} = link.source();
                    const {id: targetId} = link.target();

                    return (
                        sourceId === sourceView.model.id && targetId === targetView.model.id
                    );
                });

                return !alreadyConnected;
            },
            allowLink: (linkView) => !!linkView.model.target().id,
            background: {
                color: "#F8F9FB",
            },
            snapLabels: true,
            interactive: {
                linkMove: false,
                labelMove: true,
                arrowheadMove: false,
                vertexMove: false,
                vertexAdd: false,
                vertexRemove: false,
                useLinkTools: false,
            },

            // options
            ...opt,

            model: graph,
            cellViewNamespace: shapes,
        });

        paperEl.current?.appendChild(paper.current.el);

        graph.on("change:position", (movedEl) => {
            // Element drag and drop
            const {x, y} = movedEl.position();
            event?.onMove(movedEl.id, x, y);
        });

        graph.on("remove", (cell) => {
            // Click on X button
            if (cell.isLink()) return;

            event?.onRemove(cell.id);
        });

        paper.current.on("blank:contextmenu", (_evt, x, y) => {
            // TODO: Show context menu
            console.log("Class diagram: show context menu");
        });

        let selectedView: dia.ElementView | null = null;

        paper.current.on("element:pointerclick", (elementView) => {
            const tools = new dia.ToolsView({
                tools: [
                    new elementTools.Boundary(),
                    new elementTools.Remove({
                        x: "100%",
                        offset: {x: 10, y: 20},
                    }),
                ],
            });

            elementView.addTools(tools);
            if (selectedView && selectedView.id !== elementView.id) {
                selectedView.removeTools();
            }
            selectedView = elementView;
        });

        paper.current.on("blank:pointerclick", () => {
            if (selectedView) selectedView.removeTools();
            selectedView = null;
        });

        return () => {
            graph.off("change:position");
            graph.off("remove");
            paper.current?.remove();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return [paper, paperEl];
}
