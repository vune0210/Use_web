import {dia, mvc} from "jointjs";

const PortHandle = mvc.View.extend({
    tagName: "circle",
    svgElement: true,
    className: "port-handle",
    events: {
        mousedown: "onPointerDown",
        touchstart: "onPointerDown",
    },
    documentEvents: {
        mousemove: "onPointerMove",
        touchmove: "onPointerMove",
        mouseup: "onPointerUp",
        touchend: "onPointerUp",
        touchcancel: "onPointerUp",
    },
    attributes: {
        r: 20,
        fill: "transparent",
        stroke: "#002b33",
        "stroke-width": 2,
        cursor: "grab",
    },
    // position: function (x, y) {
    //   this.vel.attr({ cx: x, cy: y });
    // },
    // color: function (color) {
    //   this.el.style.stroke = color || this.attributes.stroke;
    // },
    // onPointerDown: function (evt) {
    //   if (this.options.guard(evt)) return;
    //   evt.stopPropagation();
    //   evt.preventDefault();
    //   this.options.paper.undelegateEvents();
    //   this.delegateDocumentEvents(null, evt.data);
    //   this.trigger("will-change", this, evt);
    // },
    // onPointerMove: function (evt) {
    //   this.trigger("changing", this, evt);
    // },
    // onPointerUp: function (evt) {
    //   if (evt.detail === 2) {
    //     this.trigger("remove", this, evt);
    //   } else {
    //     this.trigger("changed", this, evt);
    //     this.undelegateDocumentEvents();
    //   }
    //   this.options.paper.delegateEvents();
    // },
});

export const Ports = dia.ToolView.extend({
    name: "ports",
    options: {
        // handleClass: PortHandle,
        activeColor: "#4666E5",
    },
    // children: [
    //   {
    //     tagName: "circle",
    //     selector: "preview",
    //     className: "joint-ports-preview",
    //     attributes: {
    //       r: 13,
    //       "stroke-width": 2,
    //       fill: "#4666E5",
    //       "fill-opacity": 0.3,
    //       stroke: "#4666E5",
    //       "pointer-events": "none",
    //     },
    //   },
    // ],
    // handles: null,
    // onRender: function () {
    //   this.renderChildren();
    //   this.updatePreview(null);
    //   this.resetHandles();
    //   this.renderHandles();
    //   return this;
    // },
    // update: function () {
    //   const positions = this.getPortPositions();
    //   if (positions.length === this.handles.length) {
    //     this.updateHandles();
    //   } else {
    //     this.resetHandles();
    //     this.renderHandles();
    //   }
    //   this.updatePreview(null);
    //   return this;
    // },
    // resetHandles: function () {
    //   const handles = this.handles;
    //   this.handles = [];
    //   this.stopListening();
    //   if (!Array.isArray(handles)) return;
    //   for (let i = 0, n = handles.length; i < n; i++) {
    //     handles[i].remove();
    //   }
    // },
    // renderHandles: function () {
    //   const positions = this.getPortPositions();
    //   for (let i = 0, n = positions.length; i < n; i++) {
    //     const position = positions[i];
    //     const handle = new this.options.handleClass({
    //       index: i,
    //       portId: position.id,
    //       paper: this.paper,
    //       guard: (evt) => this.guard(evt),
    //     });
    //     handle.render();
    //     handle.position(position.x, position.y);
    //     this.simulateRelatedView(handle.el);
    //     handle.vel.appendTo(this.el);
    //     this.handles.push(handle);
    //     this.startHandleListening(handle);
    //   }
    // },
    // updateHandles: function () {
    //   const positions = this.getPortPositions();
    //   for (let i = 0, n = positions.length; i < n; i++) {
    //     const position = positions[i];
    //     const handle = this.handles[i];
    //     if (!handle) return;
    //     handle.position(position.x, position.y);
    //   }
    // },
    // updatePreview: function (x, y) {
    //   const { preview } = this.childNodes;
    //   if (!preview) return;
    //   if (!Number.isFinite(x)) {
    //     preview.setAttribute("display", "none");
    //   } else {
    //     preview.removeAttribute("display");
    //     preview.setAttribute("transform", `translate(${x},${y})`);
    //   }
    // },
    // startHandleListening: function (handle) {
    //   this.listenTo(handle, "will-change", this.onHandleWillChange);
    //   this.listenTo(handle, "changing", this.onHandleChanging);
    //   this.listenTo(handle, "changed", this.onHandleChanged);
    //   this.listenTo(handle, "remove", this.onHandleRemove);
    // },
    // onHandleWillChange: function (handle, evt) {
    //   this.focus();
    //   handle.color(this.options.activeColor);
    //   const portNode = this.relatedView.findPortNode(
    //     handle.options.portId,
    //     "root"
    //   );
    //   portNode.style.opacity = 0.2;
    // },
    // onHandleChanging: function (handle, evt) {
    //   const { x, y } = this.getPositionFromEvent(evt);
    //   this.updatePreview(x, y);
    // },
    // onHandleChanged: function (handle, evt) {
    //   const { relatedView } = this;
    //   const { model } = relatedView;
    //   const portId = handle.options.portId;
    //   handle.color(null);
    //   const portNode = this.relatedView.findPortNode(portId, "root");
    //   portNode.style.opacity = "";
    //   this.updatePreview(null);
    //   const delta = this.getPositionFromEvent(evt).difference(
    //     relatedView.model.position()
    //   );
    //   model.portProp(
    //     portId,
    //     "args",
    //     { x: delta.x, y: delta.y },
    //     { rewrite: true, tool: this.cid }
    //   );
    //   this.resetHandles();
    //   this.renderHandles();
    // },
    // onHandleRemove: function (handle, evt) {
    //   const { relatedView } = this;
    //   const { model } = relatedView;
    //   const portId = handle.options.portId;
    //   handle.color(null);
    //   const portNode = this.relatedView.findPortNode(portId, "root");
    //   portNode.style.opacity = "";
    //   this.updatePreview(null);
    //   model.removePort(portId, { tool: this.cid });
    //   this.resetHandles();
    //   this.renderHandles();
    // },
    // // Get an array with all the port positions.
    // getPortPositions: function () {
    //   const { relatedView } = this;
    //   const translateMatrix = relatedView.getRootTranslateMatrix();
    //   const rotateMatrix = relatedView.getRootRotateMatrix();
    //   const matrix = translateMatrix.multiply(rotateMatrix);
    //   const groupNames = Object.keys(relatedView.model.prop("ports/groups"));
    //   const portsPositions = {};
    //   for (let i = 0, n = groupNames.length; i < n; i++) {
    //     Object.assign(
    //       portsPositions,
    //       relatedView.model.getPortsPositions(groupNames[i])
    //     );
    //   }
    //   const positions = [];
    //   for (let id in portsPositions) {
    //     const point = V.transformPoint(portsPositions[id], matrix);
    //     positions.push({
    //       x: point.x,
    //       y: point.y,
    //       id,
    //     });
    //   }
    //   return positions;
    // },
    // // Get the port position from the event coordinates.
    // // The position is snapped to the point inside the element's bbox.
    // getPositionFromEvent: function (evt) {
    //   const { relatedView } = this;
    //   const bbox = relatedView.model.getBBox();
    //   const [, x, y] = relatedView.paper.getPointerArgs(evt);
    //   const p = new g.Point(x, y);
    //   if (bbox.containsPoint(p)) {
    //     return p;
    //   }
    //   return bbox.pointNearestToPoint(p);
    // },
    // onRemove: function () {
    //   this.resetHandles();
    // },
});
