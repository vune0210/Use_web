import {shapes} from "jointjs";
import standard = shapes.standard;

export const LifelineLink = standard.Link.define('sd.Lifeline', {
    z: 3,
    attrs: {
        line: {
            stroke: '#A0A0A0',
            strokeWidth: 1,
            strokeDasharray: '5,2',
            targetMarker: null
        }
    }
}, {
    attachToRole: function (role, maxY) {
        console.log("attach to role", role, maxY)
        const roleCenter = role.getBBox().center();
        this.set({
            source: {id: role.id},
            target: {x: roleCenter.x, y: maxY}
        });
        role.embed(this);
    }
});