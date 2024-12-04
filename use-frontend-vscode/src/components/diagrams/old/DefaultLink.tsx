import {dia} from "jointjs";

export const DefaultLink = dia.Link.define(
    "standard.Link",
    {
        attrs: {
            line: {
                connection: true,
                stroke: "#ff0000",
                strokeWidth: 2,
                strokeLinejoin: "round",
            },
            wrapper: {
                connection: true,
                strokeWidth: 10,
                strokeLinejoin: "round",
            },
        },
    },
    {
        markup: [
            {
                tagName: "path",
                selector: "wrapper",
                attributes: {
                    fill: "none",
                    cursor: "pointer",
                    stroke: "transparent",
                },
            },
            {
                tagName: "path",
                selector: "line",
                attributes: {
                    fill: "none",
                    "pointer-events": "none",
                },
            },
        ],
    }
);
