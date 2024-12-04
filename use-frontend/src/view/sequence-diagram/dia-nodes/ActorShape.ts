import {dia, util} from "jointjs";

const legsY = 0.7;
const bodyY = 0.3;
const headY = 0.15;
const color = "#000000"

export class ActorShape extends dia.Element {
    defaults() {
        return {
            ...super.defaults,
            type: "Actor",
            attrs: {
                background: {
                    width: "calc(w)",
                    height: "calc(h)",
                    fill: "transparent"
                },
                body: {
                    d: `M 0 calc(0.4 * h) h calc(w) M 0 calc(h) calc(0.5 * w) calc(${legsY} * h) calc(w) calc(h) M calc(0.5 * w) calc(${legsY} * h) V calc(${bodyY} * h)`,
                    fill: "none",
                    stroke: color,
                    strokeWidth: 2
                },
                head: {
                    cx: "calc(0.5 * w)",
                    cy: `calc(${headY} * h)`,
                    r: `calc(${headY} * h)`,
                    stroke: color,
                    strokeWidth: 2,
                    fill: "transparent"
                },
                label: {
                    y: "calc(h + 10)",
                    x: "calc(0.5 * w)",
                    textAnchor: "middle",
                    textVerticalAnchor: "top",
                    fontSize: 14,
                    fontFamily: "sans-serif",
                    fill: color,
                    textWrap: {
                        width: "calc(3 * w)",
                        height: null
                    }
                }
            }
        };
    }

    preinitialize(...args) {
        super.preinitialize(...args);
        this.markup = util.svg`
            <rect @selector="background" />
            <path @selector="body" />
            <circle @selector="head" />
            <text @selector="label" />
        `;
    }
}