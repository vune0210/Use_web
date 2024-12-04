import {dia} from "jointjs";

export const ObjectToObjectLink = dia.Link.define(
    "standard.Link",
    {
        attrs: {
            line: {
                connection: true,
                stroke: "#ff0000",
                strokeWidth: 1,
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

export const LinkToObjectLink = dia.Link.define(
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
