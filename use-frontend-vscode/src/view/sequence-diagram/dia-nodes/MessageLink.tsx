import {shapes} from "jointjs";
import standard = shapes.standard;

export const MessageLink = standard.Link.define('sd.Message', {
    z: 5,
    // source: { anchor: { name: 'connectionLength' }},
    // target: { anchor: { name: 'connectionPerpendicular' }},
    attrs: {
        line: {
            stroke: '#4666E5',
            sourceMarker: {
                'type': 'path',
                'd': 'M -3 -3 -3 3 3 3 3 -3 z',
                'stroke-width': 3
            }
        },
        wrapper: {
            strokeWidth: 20,
            cursor: 'grab'
        },
    }
}, {
    placeholder: 'What\'s the message?',

    defaultLabel: {
        markup: [{
            tagName: 'rect',
            selector: 'labelBody'
        }, {
            tagName: 'text',
            selector: 'labelText'
        }],
        attrs: {
            labelBody: {
                ref: 'labelText',
                width: 'calc(w + 20)',
                height: 'calc(h + 10)',
                x: 'calc(x - 10)',
                y: 'calc(y - 5)',
                rx: 2,
                ry: 2,
                fill: '#4666E5'
            },
            labelText: {
                fill: '#FFFFFF',
                fontSize: 12,
                fontFamily: 'sans-serif',
                textAnchor: 'middle',
                textVerticalAnchor: 'middle',
                cursor: 'grab'
            }
        }
    },
    setStart: function (y) {
        this.prop(['source', 'anchor', 'args', 'length'], y);
    },
    setFromTo: function (from, to) {
        this.prop({
            source: {id: from.id},
            target: {id: to.id}
        });
    },
    setDescription: function (description) {
        this.labels([{attrs: {labelText: {text: description}}}]);
    }
});