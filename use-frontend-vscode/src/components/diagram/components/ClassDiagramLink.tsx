import {dia} from "jointjs";

export const ClassToClassLink = dia.Link.define(
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
            {
                tagName: "path",
                selector: "compositionMarker",
            },
        ],
    }
);

export const GeneralizationLink = dia.Link.define(
    "standard.Link",
    {
        attrs: {
            line: {
                connection: true,
                stroke: "#ff0000",
                strokeWidth: 2,
                strokeLinejoin: "round",
                sourceMarker: {
                    // hour hand
                    type: "path",
                    // stroke: "green",
                    "stroke-width": 2,
                    fill: "white",
                    d: "M 20 -10 0 0 20 10 Z",
                },
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

export const LinkToClassLink = dia.Link.define(
    "standard.Link",
    {
        attrs: {
            line: {
                connection: true,
                stroke: "#ff0000",
                strokeWidth: 3,
                strokeDasharray: "5 5",
                strokeDashoffset: 7.5,
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
