import {shapes} from "jointjs";

export const DiaDiamond1 = shapes.basic.Rhombus.define("basic.Diamond", {});

export const DiaDiamond2 = shapes.basic.Path.define("basic.Diamond", {
    size: {width: 100, height: 100},
    attrs: {
        path: {d: "M 30 0 L 60 30 30 60 0 30 z"},
        text: {
            text: "Diamond",
            "ref-y": 0.5, // basic.Path text is originally positioned under the element
        },
    },
});
