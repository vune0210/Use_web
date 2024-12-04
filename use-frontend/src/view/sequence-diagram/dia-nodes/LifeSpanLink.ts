import {dia} from "jointjs";

export const LifeSpanLink = dia.Link.define('sd.LifeSpan', {
    z: 5,
    attrs: {
        line: {
            connection: true,
            strokeWidth: 2,
        },
        wrapper: {
            connection: true
        }
    }
}, {
    markup: [{
        tagName: 'path',
        selector: 'line',
        attributes: {
            'fill': 'none',
            'pointer-events': 'none',
        }
    }, {
        tagName: 'path',
        selector: 'wrapper',
        attributes: {
            'fill': 'none',
            'stroke': 'white',
            'stroke-width': 10,
            'stroke-linecap': 'square'
        }
    }],
});