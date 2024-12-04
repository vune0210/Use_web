import {dia, Link} from "jointjs";
import {useContext, useEffect} from "react";
import equal from "fast-deep-equal/es6/react";
import {JointDiagramContext} from "..";
import {randomColor} from "../utils";

interface DiaLinkProps {
    id: string;
    link: new () => dia.Link;
    labels?: dia.Link.Label[];
    attr?: dia.Cell.Selectors;
    sourceId: string;
    targetId: string;
    sourceProps?: Link.EndJSON;
    targetProps?: Link.EndJSON;
    children?: (link: dia.Link) => any;
}

export const DiaLink: React.FC<DiaLinkProps> = (props) => {
    const {graph} = useContext(JointDiagramContext);

    useEffect(() => {
        if (graph == null) return;

        return () => {
            const link = graph.getCell(props.id) as joint.dia.Link | undefined;
            if (link != null) {
                console.log(
                    "DiaLink: remove",
                    props.id,
                    props.sourceId,
                    props.targetId
                );
                graph?.removeCells([link]);
            }
        };
    }, [graph, props.id]);

    useEffect(() => {
        if (graph == null) return;

        const link = graph.getCell(props.id) as joint.dia.Link | undefined;

        let sourceEl = graph.getCell(props.sourceId);
        if (!sourceEl?.isElement() && !sourceEl?.isLink()) {
            throw Error(`props.sourceId=${props.sourceId} must be a Element`);
        }

        const targetEl = graph.getCell(props.targetId);

        if (!link && sourceEl && targetEl) {
            console.log("DiaLink: create", props.id, props.sourceId, props.targetId);
            let vertices: dia.Link.Vertex[] = [];

            let vertexDelta = 0;
            if (props.sourceId === props.targetId) {
                if (!sourceEl.isElement()) {
                    throw Error(`props.sourceId=${props.sourceId} must be a Element to link itself`);
                }
                vertexDelta = Math.floor(Math.random() * (100 - 50)) + 50;
                // link to itself
                const pos = sourceEl.position();
                const size = sourceEl.size();
                vertices = [
                    {
                        x: pos.x + size.width + vertexDelta,
                        y: pos.y + size.height / 2,
                    },
                    {x: pos.x + size.width + vertexDelta, y: pos.y - vertexDelta},
                    {x: pos.x + size.width / 2, y: pos.y - vertexDelta},
                ];
            }
            // const srcPortId = props.id;
            // const tarPortId =
            //   props.sourceId === props.targetId ? `${srcPortId}2` : srcPortId;

            // console.log("port", srcPortId, tarPortId);
            // const srcPort = sourceEl.getPort(srcPortId);
            // if (srcPort == null) {
            //   sourceEl.addPort({
            //     id: srcPortId,
            //     group: "right",
            //   });
            // }

            // if (targetEl.isElement()) {
            //   const tarPort = targetEl.getPort(tarPortId);
            //   if (tarPort == null) {
            //     targetEl.addPort({
            //       id: tarPortId,
            //       group: props.sourceId === props.targetId ? "top" : "left",
            //     });
            //   }
            // }

            const link = new props.link()
                .set("id", props.id)
                // .set("z", 1000)
                // .vertices(vertices)
                .attr({
                    line: {
                        connection: true,
                        stroke: randomColor(),
                        strokeWidth: 1,
                        strokeLinejoin: "round",
                    },
                })
                .source({
                    ...props.sourceProps,
                    id: props.sourceId,
                    // port: srcPortId
                    selector: "connectorSquare",
                })
                .target({
                    ...props.targetProps,
                    id: props.targetId,
                    // port: targetEl.isElement() ? tarPortId : undefined,
                    selector: "connectorSquare",
                    // connectionPoint: {
                    //   name: "boundary",
                    // },
                });
            // .on("change:vertices", (...e) => {
            //   console.log(...e);
            // });
            console.log("link source", link.source());

            const onSourceEleMove = (movedEl: dia.Element) => {
                if (vertices.length > 0) {
                    const pos = movedEl.position();
                    const size = movedEl.size();
                    link.vertices([
                        {
                            x: pos.x + size.width + vertexDelta,
                            y: pos.y + size.height / 2,
                        },
                        {x: pos.x + size.width + vertexDelta, y: pos.y - vertexDelta},
                        {x: pos.x + size.width / 2, y: pos.y - vertexDelta},
                    ]);
                }
            };

            sourceEl.on("change:position", onSourceEleMove);

            props.children?.(link);

            graph.addCell(link);

            return () => sourceEl?.off("change:position", onSourceEleMove);
        }
    }, [
        graph,
        props.link,
        props.id,
        props.children,
        props.targetId,
        props.sourceId,
    ]);

    // labels
    useEffect(() => {
        if (graph == null) return;
        const link = graph.getCell(props.id) as joint.dia.Link | undefined;
        const labels = props.labels;

        if (link != null && labels != null) {
            const currentLabels = link.labels();
            // console.log("DiaLink: label", props.id, labels, currentLabels);

            let deletedCount = 0;
            currentLabels.forEach((l, idx) => {
                if (labels.findIndex((lb) => equal(l, lb)) === -1) {
                    console.log(
                        "DiaLink: label: removeLabel",
                        idx,
                        link.label(idx - deletedCount)
                    );
                    link.removeLabel(idx - deletedCount);
                    deletedCount++;
                }
            });
            for (let lb of labels) {
                if (!currentLabels.find((l) => equal(l, lb))) {
                    console.log("DiaLink: label: appendLabel", lb);
                    link.appendLabel(lb);
                }
            }
        }
    }, [graph, props.id, props.labels]);

    // attr
    useEffect(() => {
        if (graph == null) return;
        const link = graph.getCell(props.id) as joint.dia.Link | undefined;

        if (link != null && props.attr != null) {
            console.log("DiaLink: attr", props.id, props.attr);
            link.attr(props.attr);
        }
    }, [graph, props.id, props.attr]);

    return null;
};
