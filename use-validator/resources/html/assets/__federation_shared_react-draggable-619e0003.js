import {a as getAugmentedNamespace, g as getDefaultExportFromCjs} from './_commonjsHelpers-2155838d.js';
import {r as reactExports} from './__federation_shared_react-b9a2fc6e.js';
import {r as reactDomExports} from './__federation_shared_react-dom-f4b3ef56.js';

var cjs$1 = {exports: {}};

var Draggable$1 = {};

var propTypes = {exports: {}};

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var ReactPropTypesSecret$1 = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

var ReactPropTypesSecret_1 = ReactPropTypesSecret$1;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var ReactPropTypesSecret = ReactPropTypesSecret_1;

function emptyFunction() {}
function emptyFunctionWithReset() {}
emptyFunctionWithReset.resetWarningCache = emptyFunction;

var factoryWithThrowingShims = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    var err = new Error(
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
    err.name = 'Invariant Violation';
    throw err;
  }  shim.isRequired = shim;
  function getShim() {
    return shim;
  }  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bigint: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,

    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };

  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

{
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  propTypes.exports = factoryWithThrowingShims();
}

var propTypesExports = propTypes.exports;

function r(e){var t,f,n="";if("string"==typeof e||"number"==typeof e)n+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(f=r(e[t]))&&(n&&(n+=" "),n+=f);else for(t in e)e[t]&&(n&&(n+=" "),n+=t);return n}function clsx(){for(var e,t,f=0,n="";f<arguments.length;)(e=arguments[f++])&&(t=r(e))&&(n&&(n+=" "),n+=t);return n}

const clsx_m = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  clsx,
  default: clsx
}, Symbol.toStringTag, { value: 'Module' }));

const require$$3 = /*@__PURE__*/getAugmentedNamespace(clsx_m);

var domFns = {};

var shims = {};

Object.defineProperty(shims, "__esModule", {
  value: true
});
shims.dontSetMe = dontSetMe;
shims.findInArray = findInArray;
shims.int = int;
shims.isFunction = isFunction;
shims.isNum = isNum;
// @credits https://gist.github.com/rogozhnikoff/a43cfed27c41e4e68cdc
function findInArray(array /*: Array<any> | TouchList*/, callback /*: Function*/) /*: any*/{
  for (let i = 0, length = array.length; i < length; i++) {
    if (callback.apply(callback, [array[i], i, array])) return array[i];
  }
}
function isFunction(func /*: any*/) /*: boolean %checks*/{
  // $FlowIgnore[method-unbinding]
  return typeof func === 'function' || Object.prototype.toString.call(func) === '[object Function]';
}
function isNum(num /*: any*/) /*: boolean %checks*/{
  return typeof num === 'number' && !isNaN(num);
}
function int(a /*: string*/) /*: number*/{
  return parseInt(a, 10);
}
function dontSetMe(props /*: Object*/, propName /*: string*/, componentName /*: string*/) /*: ?Error*/{
  if (props[propName]) {
    return new Error("Invalid prop ".concat(propName, " passed to ").concat(componentName, " - do not set this, set it on the child."));
  }
}

var getPrefix$1 = {};

Object.defineProperty(getPrefix$1, "__esModule", {
  value: true
});
getPrefix$1.browserPrefixToKey = browserPrefixToKey;
getPrefix$1.browserPrefixToStyle = browserPrefixToStyle;
getPrefix$1.default = void 0;
getPrefix$1.getPrefix = getPrefix;
const prefixes = ['Moz', 'Webkit', 'O', 'ms'];
function getPrefix() /*: string*/{
  var _window$document;
  let prop /*: string*/ = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'transform';
  // Ensure we're running in an environment where there is actually a global
  // `window` obj
  if (typeof window === 'undefined') return '';

  // If we're in a pseudo-browser server-side environment, this access
  // path may not exist, so bail out if it doesn't.
  const style = (_window$document = window.document) === null || _window$document === void 0 || (_window$document = _window$document.documentElement) === null || _window$document === void 0 ? void 0 : _window$document.style;
  if (!style) return '';
  if (prop in style) return '';
  for (let i = 0; i < prefixes.length; i++) {
    if (browserPrefixToKey(prop, prefixes[i]) in style) return prefixes[i];
  }
  return '';
}
function browserPrefixToKey(prop /*: string*/, prefix /*: string*/) /*: string*/{
  return prefix ? "".concat(prefix).concat(kebabToTitleCase(prop)) : prop;
}
function browserPrefixToStyle(prop /*: string*/, prefix /*: string*/) /*: string*/{
  return prefix ? "-".concat(prefix.toLowerCase(), "-").concat(prop) : prop;
}
function kebabToTitleCase(str /*: string*/) /*: string*/{
  let out = '';
  let shouldCapitalize = true;
  for (let i = 0; i < str.length; i++) {
    if (shouldCapitalize) {
      out += str[i].toUpperCase();
      shouldCapitalize = false;
    } else if (str[i] === '-') {
      shouldCapitalize = true;
    } else {
      out += str[i];
    }
  }
  return out;
}

// Default export is the prefix itself, like 'Moz', 'Webkit', etc
// Note that you may have to re-test for certain things; for instance, Chrome 50
// can handle unprefixed `transform`, but not unprefixed `user-select`
getPrefix$1.default = (getPrefix() /*: string*/);

Object.defineProperty(domFns, "__esModule", {
  value: true
});
domFns.addClassName = addClassName;
domFns.addEvent = addEvent;
domFns.addUserSelectStyles = addUserSelectStyles;
domFns.createCSSTransform = createCSSTransform;
domFns.createSVGTransform = createSVGTransform;
domFns.getTouch = getTouch;
domFns.getTouchIdentifier = getTouchIdentifier;
domFns.getTranslation = getTranslation;
domFns.innerHeight = innerHeight;
domFns.innerWidth = innerWidth;
domFns.matchesSelector = matchesSelector;
domFns.matchesSelectorAndParentsTo = matchesSelectorAndParentsTo;
domFns.offsetXYFromParent = offsetXYFromParent;
domFns.outerHeight = outerHeight;
domFns.outerWidth = outerWidth;
domFns.removeClassName = removeClassName;
domFns.removeEvent = removeEvent;
domFns.removeUserSelectStyles = removeUserSelectStyles;
var _shims$2 = shims;
var _getPrefix = _interopRequireWildcard$1(getPrefix$1);
function _getRequireWildcardCache$1(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache$1 = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard$1(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache$1(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/*:: import type {ControlPosition, PositionOffsetControlPosition, MouseTouchEvent} from './types';*/
let matchesSelectorFunc = '';
function matchesSelector(el /*: Node*/, selector /*: string*/) /*: boolean*/{
  if (!matchesSelectorFunc) {
    matchesSelectorFunc = (0, _shims$2.findInArray)(['matches', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector', 'oMatchesSelector'], function (method) {
      // $FlowIgnore: Doesn't think elements are indexable
      return (0, _shims$2.isFunction)(el[method]);
    });
  }

  // Might not be found entirely (not an Element?) - in that case, bail
  // $FlowIgnore: Doesn't think elements are indexable
  if (!(0, _shims$2.isFunction)(el[matchesSelectorFunc])) return false;

  // $FlowIgnore: Doesn't think elements are indexable
  return el[matchesSelectorFunc](selector);
}

// Works up the tree to the draggable itself attempting to match selector.
function matchesSelectorAndParentsTo(el /*: Node*/, selector /*: string*/, baseNode /*: Node*/) /*: boolean*/{
  let node = el;
  do {
    if (matchesSelector(node, selector)) return true;
    if (node === baseNode) return false;
    // $FlowIgnore[incompatible-type]
    node = node.parentNode;
  } while (node);
  return false;
}
function addEvent(el /*: ?Node*/, event /*: string*/, handler /*: Function*/, inputOptions /*: Object*/) /*: void*/{
  if (!el) return;
  const options = {
    capture: true,
    ...inputOptions
  };
  // $FlowIgnore[method-unbinding]
  if (el.addEventListener) {
    el.addEventListener(event, handler, options);
  } else if (el.attachEvent) {
    el.attachEvent('on' + event, handler);
  } else {
    // $FlowIgnore: Doesn't think elements are indexable
    el['on' + event] = handler;
  }
}
function removeEvent(el /*: ?Node*/, event /*: string*/, handler /*: Function*/, inputOptions /*: Object*/) /*: void*/{
  if (!el) return;
  const options = {
    capture: true,
    ...inputOptions
  };
  // $FlowIgnore[method-unbinding]
  if (el.removeEventListener) {
    el.removeEventListener(event, handler, options);
  } else if (el.detachEvent) {
    el.detachEvent('on' + event, handler);
  } else {
    // $FlowIgnore: Doesn't think elements are indexable
    el['on' + event] = null;
  }
}
function outerHeight(node /*: HTMLElement*/) /*: number*/{
  // This is deliberately excluding margin for our calculations, since we are using
  // offsetTop which is including margin. See getBoundPosition
  let height = node.clientHeight;
  const computedStyle = node.ownerDocument.defaultView.getComputedStyle(node);
  height += (0, _shims$2.int)(computedStyle.borderTopWidth);
  height += (0, _shims$2.int)(computedStyle.borderBottomWidth);
  return height;
}
function outerWidth(node /*: HTMLElement*/) /*: number*/{
  // This is deliberately excluding margin for our calculations, since we are using
  // offsetLeft which is including margin. See getBoundPosition
  let width = node.clientWidth;
  const computedStyle = node.ownerDocument.defaultView.getComputedStyle(node);
  width += (0, _shims$2.int)(computedStyle.borderLeftWidth);
  width += (0, _shims$2.int)(computedStyle.borderRightWidth);
  return width;
}
function innerHeight(node /*: HTMLElement*/) /*: number*/{
  let height = node.clientHeight;
  const computedStyle = node.ownerDocument.defaultView.getComputedStyle(node);
  height -= (0, _shims$2.int)(computedStyle.paddingTop);
  height -= (0, _shims$2.int)(computedStyle.paddingBottom);
  return height;
}
function innerWidth(node /*: HTMLElement*/) /*: number*/{
  let width = node.clientWidth;
  const computedStyle = node.ownerDocument.defaultView.getComputedStyle(node);
  width -= (0, _shims$2.int)(computedStyle.paddingLeft);
  width -= (0, _shims$2.int)(computedStyle.paddingRight);
  return width;
}
/*:: interface EventWithOffset {
  clientX: number, clientY: number
}*/
// Get from offsetParent
function offsetXYFromParent(evt /*: EventWithOffset*/, offsetParent /*: HTMLElement*/, scale /*: number*/) /*: ControlPosition*/{
  const isBody = offsetParent === offsetParent.ownerDocument.body;
  const offsetParentRect = isBody ? {
    left: 0,
    top: 0
  } : offsetParent.getBoundingClientRect();
  const x = (evt.clientX + offsetParent.scrollLeft - offsetParentRect.left) / scale;
  const y = (evt.clientY + offsetParent.scrollTop - offsetParentRect.top) / scale;
  return {
    x,
    y
  };
}
function createCSSTransform(controlPos /*: ControlPosition*/, positionOffset /*: PositionOffsetControlPosition*/) /*: Object*/{
  const translation = getTranslation(controlPos, positionOffset, 'px');
  return {
    [(0, _getPrefix.browserPrefixToKey)('transform', _getPrefix.default)]: translation
  };
}
function createSVGTransform(controlPos /*: ControlPosition*/, positionOffset /*: PositionOffsetControlPosition*/) /*: string*/{
  const translation = getTranslation(controlPos, positionOffset, '');
  return translation;
}
function getTranslation(_ref /*:: */, positionOffset /*: PositionOffsetControlPosition*/, unitSuffix /*: string*/) /*: string*/{
  let {
    x,
    y
  } /*: ControlPosition*/ = _ref /*: ControlPosition*/;
  let translation = "translate(".concat(x).concat(unitSuffix, ",").concat(y).concat(unitSuffix, ")");
  if (positionOffset) {
    const defaultX = "".concat(typeof positionOffset.x === 'string' ? positionOffset.x : positionOffset.x + unitSuffix);
    const defaultY = "".concat(typeof positionOffset.y === 'string' ? positionOffset.y : positionOffset.y + unitSuffix);
    translation = "translate(".concat(defaultX, ", ").concat(defaultY, ")") + translation;
  }
  return translation;
}
function getTouch(e /*: MouseTouchEvent*/, identifier /*: number*/) /*: ?{clientX: number, clientY: number}*/{
  return e.targetTouches && (0, _shims$2.findInArray)(e.targetTouches, t => identifier === t.identifier) || e.changedTouches && (0, _shims$2.findInArray)(e.changedTouches, t => identifier === t.identifier);
}
function getTouchIdentifier(e /*: MouseTouchEvent*/) /*: ?number*/{
  if (e.targetTouches && e.targetTouches[0]) return e.targetTouches[0].identifier;
  if (e.changedTouches && e.changedTouches[0]) return e.changedTouches[0].identifier;
}

// User-select Hacks:
//
// Useful for preventing blue highlights all over everything when dragging.

// Note we're passing `document` b/c we could be iframed
function addUserSelectStyles(doc /*: ?Document*/) {
  if (!doc) return;
  let styleEl = doc.getElementById('react-draggable-style-el');
  if (!styleEl) {
    styleEl = doc.createElement('style');
    styleEl.type = 'text/css';
    styleEl.id = 'react-draggable-style-el';
    styleEl.innerHTML = '.react-draggable-transparent-selection *::-moz-selection {all: inherit;}\n';
    styleEl.innerHTML += '.react-draggable-transparent-selection *::selection {all: inherit;}\n';
    doc.getElementsByTagName('head')[0].appendChild(styleEl);
  }
  if (doc.body) addClassName(doc.body, 'react-draggable-transparent-selection');
}
function removeUserSelectStyles(doc /*: ?Document*/) {
  if (!doc) return;
  try {
    if (doc.body) removeClassName(doc.body, 'react-draggable-transparent-selection');
    // $FlowIgnore: IE
    if (doc.selection) {
      // $FlowIgnore: IE
      doc.selection.empty();
    } else {
      // Remove selection caused by scroll, unless it's a focused input
      // (we use doc.defaultView in case we're in an iframe)
      const selection = (doc.defaultView || window).getSelection();
      if (selection && selection.type !== 'Caret') {
        selection.removeAllRanges();
      }
    }
  } catch (e) {
    // probably IE
  }
}
function addClassName(el /*: HTMLElement*/, className /*: string*/) {
  if (el.classList) {
    el.classList.add(className);
  } else {
    if (!el.className.match(new RegExp("(?:^|\\s)".concat(className, "(?!\\S)")))) {
      el.className += " ".concat(className);
    }
  }
}
function removeClassName(el /*: HTMLElement*/, className /*: string*/) {
  if (el.classList) {
    el.classList.remove(className);
  } else {
    el.className = el.className.replace(new RegExp("(?:^|\\s)".concat(className, "(?!\\S)"), 'g'), '');
  }
}

var positionFns = {};

Object.defineProperty(positionFns, "__esModule", {
  value: true
});
positionFns.canDragX = canDragX;
positionFns.canDragY = canDragY;
positionFns.createCoreData = createCoreData;
positionFns.createDraggableData = createDraggableData;
positionFns.getBoundPosition = getBoundPosition;
positionFns.getControlPosition = getControlPosition;
positionFns.snapToGrid = snapToGrid;
var _shims$1 = shims;
var _domFns$1 = domFns;
/*:: import type Draggable from '../Draggable';*/
/*:: import type {Bounds, ControlPosition, DraggableData, MouseTouchEvent} from './types';*/
/*:: import type DraggableCore from '../DraggableCore';*/
function getBoundPosition(draggable /*: Draggable*/, x /*: number*/, y /*: number*/) /*: [number, number]*/{
  // If no bounds, short-circuit and move on
  if (!draggable.props.bounds) return [x, y];

  // Clone new bounds
  let {
    bounds
  } = draggable.props;
  bounds = typeof bounds === 'string' ? bounds : cloneBounds(bounds);
  const node = findDOMNode(draggable);
  if (typeof bounds === 'string') {
    const {
      ownerDocument
    } = node;
    const ownerWindow = ownerDocument.defaultView;
    let boundNode;
    if (bounds === 'parent') {
      boundNode = node.parentNode;
    } else {
      boundNode = ownerDocument.querySelector(bounds);
    }
    if (!(boundNode instanceof ownerWindow.HTMLElement)) {
      throw new Error('Bounds selector "' + bounds + '" could not find an element.');
    }
    const boundNodeEl /*: HTMLElement*/ = boundNode; // for Flow, can't seem to refine correctly
    const nodeStyle = ownerWindow.getComputedStyle(node);
    const boundNodeStyle = ownerWindow.getComputedStyle(boundNodeEl);
    // Compute bounds. This is a pain with padding and offsets but this gets it exactly right.
    bounds = {
      left: -node.offsetLeft + (0, _shims$1.int)(boundNodeStyle.paddingLeft) + (0, _shims$1.int)(nodeStyle.marginLeft),
      top: -node.offsetTop + (0, _shims$1.int)(boundNodeStyle.paddingTop) + (0, _shims$1.int)(nodeStyle.marginTop),
      right: (0, _domFns$1.innerWidth)(boundNodeEl) - (0, _domFns$1.outerWidth)(node) - node.offsetLeft + (0, _shims$1.int)(boundNodeStyle.paddingRight) - (0, _shims$1.int)(nodeStyle.marginRight),
      bottom: (0, _domFns$1.innerHeight)(boundNodeEl) - (0, _domFns$1.outerHeight)(node) - node.offsetTop + (0, _shims$1.int)(boundNodeStyle.paddingBottom) - (0, _shims$1.int)(nodeStyle.marginBottom)
    };
  }

  // Keep x and y below right and bottom limits...
  if ((0, _shims$1.isNum)(bounds.right)) x = Math.min(x, bounds.right);
  if ((0, _shims$1.isNum)(bounds.bottom)) y = Math.min(y, bounds.bottom);

  // But above left and top limits.
  if ((0, _shims$1.isNum)(bounds.left)) x = Math.max(x, bounds.left);
  if ((0, _shims$1.isNum)(bounds.top)) y = Math.max(y, bounds.top);
  return [x, y];
}
function snapToGrid(grid /*: [number, number]*/, pendingX /*: number*/, pendingY /*: number*/) /*: [number, number]*/{
  const x = Math.round(pendingX / grid[0]) * grid[0];
  const y = Math.round(pendingY / grid[1]) * grid[1];
  return [x, y];
}
function canDragX(draggable /*: Draggable*/) /*: boolean*/{
  return draggable.props.axis === 'both' || draggable.props.axis === 'x';
}
function canDragY(draggable /*: Draggable*/) /*: boolean*/{
  return draggable.props.axis === 'both' || draggable.props.axis === 'y';
}

// Get {x, y} positions from event.
function getControlPosition(e /*: MouseTouchEvent*/, touchIdentifier /*: ?number*/, draggableCore /*: DraggableCore*/) /*: ?ControlPosition*/{
  const touchObj = typeof touchIdentifier === 'number' ? (0, _domFns$1.getTouch)(e, touchIdentifier) : null;
  if (typeof touchIdentifier === 'number' && !touchObj) return null; // not the right touch
  const node = findDOMNode(draggableCore);
  // User can provide an offsetParent if desired.
  const offsetParent = draggableCore.props.offsetParent || node.offsetParent || node.ownerDocument.body;
  return (0, _domFns$1.offsetXYFromParent)(touchObj || e, offsetParent, draggableCore.props.scale);
}

// Create an data object exposed by <DraggableCore>'s events
function createCoreData(draggable /*: DraggableCore*/, x /*: number*/, y /*: number*/) /*: DraggableData*/{
  const isStart = !(0, _shims$1.isNum)(draggable.lastX);
  const node = findDOMNode(draggable);
  if (isStart) {
    // If this is our first move, use the x and y as last coords.
    return {
      node,
      deltaX: 0,
      deltaY: 0,
      lastX: x,
      lastY: y,
      x,
      y
    };
  } else {
    // Otherwise calculate proper values.
    return {
      node,
      deltaX: x - draggable.lastX,
      deltaY: y - draggable.lastY,
      lastX: draggable.lastX,
      lastY: draggable.lastY,
      x,
      y
    };
  }
}

// Create an data exposed by <Draggable>'s events
function createDraggableData(draggable /*: Draggable*/, coreData /*: DraggableData*/) /*: DraggableData*/{
  const scale = draggable.props.scale;
  return {
    node: coreData.node,
    x: draggable.state.x + coreData.deltaX / scale,
    y: draggable.state.y + coreData.deltaY / scale,
    deltaX: coreData.deltaX / scale,
    deltaY: coreData.deltaY / scale,
    lastX: draggable.state.x,
    lastY: draggable.state.y
  };
}

// A lot faster than stringify/parse
function cloneBounds(bounds /*: Bounds*/) /*: Bounds*/{
  return {
    left: bounds.left,
    top: bounds.top,
    right: bounds.right,
    bottom: bounds.bottom
  };
}
function findDOMNode(draggable /*: Draggable | DraggableCore*/) /*: HTMLElement*/{
  const node = draggable.findDOMNode();
  if (!node) {
    throw new Error('<DraggableCore>: Unmounted during event!');
  }
  // $FlowIgnore we can't assert on HTMLElement due to tests... FIXME
  return node;
}

var DraggableCore$2 = {};

var log$1 = {};

Object.defineProperty(log$1, "__esModule", {
  value: true
});
log$1.default = log;
/*eslint no-console:0*/
function log() {
}

Object.defineProperty(DraggableCore$2, "__esModule", {
  value: true
});
DraggableCore$2.default = void 0;
var React = _interopRequireWildcard(reactExports);
var _propTypes = _interopRequireDefault(propTypesExports);
var _reactDom = _interopRequireDefault(reactDomExports);
var _domFns = domFns;
var _positionFns = positionFns;
var _shims = shims;
var _log = _interopRequireDefault(log$1);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/*:: import type {EventHandler, MouseTouchEvent} from './utils/types';*/
/*:: import type {Element as ReactElement} from 'react';*/
// Simple abstraction for dragging events names.
const eventsFor = {
  touch: {
    start: 'touchstart',
    move: 'touchmove',
    stop: 'touchend'
  },
  mouse: {
    start: 'mousedown',
    move: 'mousemove',
    stop: 'mouseup'
  }
};

// Default to mouse events.
let dragEventFor = eventsFor.mouse;
/*:: export type DraggableData = {
  node: HTMLElement,
  x: number, y: number,
  deltaX: number, deltaY: number,
  lastX: number, lastY: number,
};*/
/*:: export type DraggableEventHandler = (e: MouseEvent, data: DraggableData) => void | false;*/
/*:: export type ControlPosition = {x: number, y: number};*/
/*:: export type PositionOffsetControlPosition = {x: number|string, y: number|string};*/
/*:: export type DraggableCoreDefaultProps = {
  allowAnyClick: boolean,
  disabled: boolean,
  enableUserSelectHack: boolean,
  onStart: DraggableEventHandler,
  onDrag: DraggableEventHandler,
  onStop: DraggableEventHandler,
  onMouseDown: (e: MouseEvent) => void,
  scale: number,
};*/
/*:: export type DraggableCoreProps = {
  ...DraggableCoreDefaultProps,
  cancel: string,
  children: ReactElement<any>,
  offsetParent: HTMLElement,
  grid: [number, number],
  handle: string,
  nodeRef?: ?React.ElementRef<any>,
};*/
//
// Define <DraggableCore>.
//
// <DraggableCore> is for advanced usage of <Draggable>. It maintains minimal internal state so it can
// work well with libraries that require more control over the element.
//

let DraggableCore$1 = class DraggableCore extends React.Component /*:: <DraggableCoreProps>*/{
  constructor() {
    super(...arguments);
    _defineProperty(this, "dragging", false);
    // Used while dragging to determine deltas.
    _defineProperty(this, "lastX", NaN);
    _defineProperty(this, "lastY", NaN);
    _defineProperty(this, "touchIdentifier", null);
    _defineProperty(this, "mounted", false);
    _defineProperty(this, "handleDragStart", e => {
      // Make it possible to attach event handlers on top of this one.
      this.props.onMouseDown(e);

      // Only accept left-clicks.
      if (!this.props.allowAnyClick && typeof e.button === 'number' && e.button !== 0) return false;

      // Get nodes. Be sure to grab relative document (could be iframed)
      const thisNode = this.findDOMNode();
      if (!thisNode || !thisNode.ownerDocument || !thisNode.ownerDocument.body) {
        throw new Error('<DraggableCore> not mounted on DragStart!');
      }
      const {
        ownerDocument
      } = thisNode;

      // Short circuit if handle or cancel prop was provided and selector doesn't match.
      if (this.props.disabled || !(e.target instanceof ownerDocument.defaultView.Node) || this.props.handle && !(0, _domFns.matchesSelectorAndParentsTo)(e.target, this.props.handle, thisNode) || this.props.cancel && (0, _domFns.matchesSelectorAndParentsTo)(e.target, this.props.cancel, thisNode)) {
        return;
      }

      // Prevent scrolling on mobile devices, like ipad/iphone.
      // Important that this is after handle/cancel.
      if (e.type === 'touchstart') e.preventDefault();

      // Set touch identifier in component state if this is a touch event. This allows us to
      // distinguish between individual touches on multitouch screens by identifying which
      // touchpoint was set to this element.
      const touchIdentifier = (0, _domFns.getTouchIdentifier)(e);
      this.touchIdentifier = touchIdentifier;

      // Get the current drag point from the event. This is used as the offset.
      const position = (0, _positionFns.getControlPosition)(e, touchIdentifier, this);
      if (position == null) return; // not possible but satisfies flow
      const {
        x,
        y
      } = position;

      // Create an event object with all the data parents need to make a decision here.
      const coreEvent = (0, _positionFns.createCoreData)(this, x, y);
      (0, _log.default)('DraggableCore: handleDragStart: %j', coreEvent);

      // Call event handler. If it returns explicit false, cancel.
      (0, _log.default)('calling', this.props.onStart);
      const shouldUpdate = this.props.onStart(e, coreEvent);
      if (shouldUpdate === false || this.mounted === false) return;

      // Add a style to the body to disable user-select. This prevents text from
      // being selected all over the page.
      if (this.props.enableUserSelectHack) (0, _domFns.addUserSelectStyles)(ownerDocument);

      // Initiate dragging. Set the current x and y as offsets
      // so we know how much we've moved during the drag. This allows us
      // to drag elements around even if they have been moved, without issue.
      this.dragging = true;
      this.lastX = x;
      this.lastY = y;

      // Add events to the document directly so we catch when the user's mouse/touch moves outside of
      // this element. We use different events depending on whether or not we have detected that this
      // is a touch-capable device.
      (0, _domFns.addEvent)(ownerDocument, dragEventFor.move, this.handleDrag);
      (0, _domFns.addEvent)(ownerDocument, dragEventFor.stop, this.handleDragStop);
    });
    _defineProperty(this, "handleDrag", e => {
      // Get the current drag point from the event. This is used as the offset.
      const position = (0, _positionFns.getControlPosition)(e, this.touchIdentifier, this);
      if (position == null) return;
      let {
        x,
        y
      } = position;

      // Snap to grid if prop has been provided
      if (Array.isArray(this.props.grid)) {
        let deltaX = x - this.lastX,
          deltaY = y - this.lastY;
        [deltaX, deltaY] = (0, _positionFns.snapToGrid)(this.props.grid, deltaX, deltaY);
        if (!deltaX && !deltaY) return; // skip useless drag
        x = this.lastX + deltaX, y = this.lastY + deltaY;
      }
      const coreEvent = (0, _positionFns.createCoreData)(this, x, y);
      (0, _log.default)('DraggableCore: handleDrag: %j', coreEvent);

      // Call event handler. If it returns explicit false, trigger end.
      const shouldUpdate = this.props.onDrag(e, coreEvent);
      if (shouldUpdate === false || this.mounted === false) {
        try {
          // $FlowIgnore
          this.handleDragStop(new MouseEvent('mouseup'));
        } catch (err) {
          // Old browsers
          const event = ((document.createEvent('MouseEvents') /*: any*/) /*: MouseTouchEvent*/);
          // I see why this insanity was deprecated
          // $FlowIgnore
          event.initMouseEvent('mouseup', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
          this.handleDragStop(event);
        }
        return;
      }
      this.lastX = x;
      this.lastY = y;
    });
    _defineProperty(this, "handleDragStop", e => {
      if (!this.dragging) return;
      const position = (0, _positionFns.getControlPosition)(e, this.touchIdentifier, this);
      if (position == null) return;
      let {
        x,
        y
      } = position;

      // Snap to grid if prop has been provided
      if (Array.isArray(this.props.grid)) {
        let deltaX = x - this.lastX || 0;
        let deltaY = y - this.lastY || 0;
        [deltaX, deltaY] = (0, _positionFns.snapToGrid)(this.props.grid, deltaX, deltaY);
        x = this.lastX + deltaX, y = this.lastY + deltaY;
      }
      const coreEvent = (0, _positionFns.createCoreData)(this, x, y);

      // Call event handler
      const shouldContinue = this.props.onStop(e, coreEvent);
      if (shouldContinue === false || this.mounted === false) return false;
      const thisNode = this.findDOMNode();
      if (thisNode) {
        // Remove user-select hack
        if (this.props.enableUserSelectHack) (0, _domFns.removeUserSelectStyles)(thisNode.ownerDocument);
      }
      (0, _log.default)('DraggableCore: handleDragStop: %j', coreEvent);

      // Reset the el.
      this.dragging = false;
      this.lastX = NaN;
      this.lastY = NaN;
      if (thisNode) {
        // Remove event handlers
        (0, _log.default)('DraggableCore: Removing handlers');
        (0, _domFns.removeEvent)(thisNode.ownerDocument, dragEventFor.move, this.handleDrag);
        (0, _domFns.removeEvent)(thisNode.ownerDocument, dragEventFor.stop, this.handleDragStop);
      }
    });
    _defineProperty(this, "onMouseDown", e => {
      dragEventFor = eventsFor.mouse; // on touchscreen laptops we could switch back to mouse

      return this.handleDragStart(e);
    });
    _defineProperty(this, "onMouseUp", e => {
      dragEventFor = eventsFor.mouse;
      return this.handleDragStop(e);
    });
    // Same as onMouseDown (start drag), but now consider this a touch device.
    _defineProperty(this, "onTouchStart", e => {
      // We're on a touch device now, so change the event handlers
      dragEventFor = eventsFor.touch;
      return this.handleDragStart(e);
    });
    _defineProperty(this, "onTouchEnd", e => {
      // We're on a touch device now, so change the event handlers
      dragEventFor = eventsFor.touch;
      return this.handleDragStop(e);
    });
  }
  componentDidMount() {
    this.mounted = true;
    // Touch handlers must be added with {passive: false} to be cancelable.
    // https://developers.google.com/web/updates/2017/01/scrolling-intervention
    const thisNode = this.findDOMNode();
    if (thisNode) {
      (0, _domFns.addEvent)(thisNode, eventsFor.touch.start, this.onTouchStart, {
        passive: false
      });
    }
  }
  componentWillUnmount() {
    this.mounted = false;
    // Remove any leftover event handlers. Remove both touch and mouse handlers in case
    // some browser quirk caused a touch event to fire during a mouse move, or vice versa.
    const thisNode = this.findDOMNode();
    if (thisNode) {
      const {
        ownerDocument
      } = thisNode;
      (0, _domFns.removeEvent)(ownerDocument, eventsFor.mouse.move, this.handleDrag);
      (0, _domFns.removeEvent)(ownerDocument, eventsFor.touch.move, this.handleDrag);
      (0, _domFns.removeEvent)(ownerDocument, eventsFor.mouse.stop, this.handleDragStop);
      (0, _domFns.removeEvent)(ownerDocument, eventsFor.touch.stop, this.handleDragStop);
      (0, _domFns.removeEvent)(thisNode, eventsFor.touch.start, this.onTouchStart, {
        passive: false
      });
      if (this.props.enableUserSelectHack) (0, _domFns.removeUserSelectStyles)(ownerDocument);
    }
  }

  // React Strict Mode compatibility: if `nodeRef` is passed, we will use it instead of trying to find
  // the underlying DOM node ourselves. See the README for more information.
  findDOMNode() /*: ?HTMLElement*/{
    var _this$props, _this$props2;
    return (_this$props = this.props) !== null && _this$props !== void 0 && _this$props.nodeRef ? (_this$props2 = this.props) === null || _this$props2 === void 0 || (_this$props2 = _this$props2.nodeRef) === null || _this$props2 === void 0 ? void 0 : _this$props2.current : _reactDom.default.findDOMNode(this);
  }
  render() /*: React.Element<any>*/{
    // Reuse the child provided
    // This makes it flexible to use whatever element is wanted (div, ul, etc)
    return /*#__PURE__*/React.cloneElement(React.Children.only(this.props.children), {
      // Note: mouseMove handler is attached to document so it will still function
      // when the user drags quickly and leaves the bounds of the element.
      onMouseDown: this.onMouseDown,
      onMouseUp: this.onMouseUp,
      // onTouchStart is added on `componentDidMount` so they can be added with
      // {passive: false}, which allows it to cancel. See
      // https://developers.google.com/web/updates/2017/01/scrolling-intervention
      onTouchEnd: this.onTouchEnd
    });
  }
};
DraggableCore$2.default = DraggableCore$1;
_defineProperty(DraggableCore$1, "displayName", 'DraggableCore');
_defineProperty(DraggableCore$1, "propTypes", {
  /**
   * `allowAnyClick` allows dragging using any mouse button.
   * By default, we only accept the left button.
   *
   * Defaults to `false`.
   */
  allowAnyClick: _propTypes.default.bool,
  children: _propTypes.default.node.isRequired,
  /**
   * `disabled`, if true, stops the <Draggable> from dragging. All handlers,
   * with the exception of `onMouseDown`, will not fire.
   */
  disabled: _propTypes.default.bool,
  /**
   * By default, we add 'user-select:none' attributes to the document body
   * to prevent ugly text selection during drag. If this is causing problems
   * for your app, set this to `false`.
   */
  enableUserSelectHack: _propTypes.default.bool,
  /**
   * `offsetParent`, if set, uses the passed DOM node to compute drag offsets
   * instead of using the parent node.
   */
  offsetParent: function (props /*: DraggableCoreProps*/, propName /*: $Keys<DraggableCoreProps>*/) {
    if (props[propName] && props[propName].nodeType !== 1) {
      throw new Error('Draggable\'s offsetParent must be a DOM Node.');
    }
  },
  /**
   * `grid` specifies the x and y that dragging should snap to.
   */
  grid: _propTypes.default.arrayOf(_propTypes.default.number),
  /**
   * `handle` specifies a selector to be used as the handle that initiates drag.
   *
   * Example:
   *
   * ```jsx
   *   let App = React.createClass({
   *       render: function () {
   *         return (
   *            <Draggable handle=".handle">
   *              <div>
   *                  <div className="handle">Click me to drag</div>
   *                  <div>This is some other content</div>
   *              </div>
   *           </Draggable>
   *         );
   *       }
   *   });
   * ```
   */
  handle: _propTypes.default.string,
  /**
   * `cancel` specifies a selector to be used to prevent drag initialization.
   *
   * Example:
   *
   * ```jsx
   *   let App = React.createClass({
   *       render: function () {
   *           return(
   *               <Draggable cancel=".cancel">
   *                   <div>
   *                     <div className="cancel">You can't drag from here</div>
   *                     <div>Dragging here works fine</div>
   *                   </div>
   *               </Draggable>
   *           );
   *       }
   *   });
   * ```
   */
  cancel: _propTypes.default.string,
  /* If running in React Strict mode, ReactDOM.findDOMNode() is deprecated.
   * Unfortunately, in order for <Draggable> to work properly, we need raw access
   * to the underlying DOM node. If you want to avoid the warning, pass a `nodeRef`
   * as in this example:
   *
   * function MyComponent() {
   *   const nodeRef = React.useRef(null);
   *   return (
   *     <Draggable nodeRef={nodeRef}>
   *       <div ref={nodeRef}>Example Target</div>
   *     </Draggable>
   *   );
   * }
   *
   * This can be used for arbitrarily nested components, so long as the ref ends up
   * pointing to the actual child DOM node and not a custom component.
   */
  nodeRef: _propTypes.default.object,
  /**
   * Called when dragging starts.
   * If this function returns the boolean false, dragging will be canceled.
   */
  onStart: _propTypes.default.func,
  /**
   * Called while dragging.
   * If this function returns the boolean false, dragging will be canceled.
   */
  onDrag: _propTypes.default.func,
  /**
   * Called when dragging stops.
   * If this function returns the boolean false, the drag will remain active.
   */
  onStop: _propTypes.default.func,
  /**
   * A workaround option which can be passed if onMouseDown needs to be accessed,
   * since it'll always be blocked (as there is internal use of onMouseDown)
   */
  onMouseDown: _propTypes.default.func,
  /**
   * `scale`, if set, applies scaling while dragging an element
   */
  scale: _propTypes.default.number,
  /**
   * These properties should be defined on the child, not here.
   */
  className: _shims.dontSetMe,
  style: _shims.dontSetMe,
  transform: _shims.dontSetMe
});
_defineProperty(DraggableCore$1, "defaultProps", {
  allowAnyClick: false,
  // by default only accept left click
  disabled: false,
  enableUserSelectHack: true,
  onStart: function () {},
  onDrag: function () {},
  onStop: function () {},
  onMouseDown: function () {},
  scale: 1
});

(function (exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	Object.defineProperty(exports, "DraggableCore", {
	  enumerable: true,
	  get: function () {
	    return _DraggableCore.default;
	  }
	});
	exports.default = void 0;
	var React = _interopRequireWildcard(reactExports);
	var _propTypes = _interopRequireDefault(propTypesExports);
	var _reactDom = _interopRequireDefault(reactDomExports);
	var _clsx = _interopRequireDefault(require$$3);
	var _domFns = domFns;
	var _positionFns = positionFns;
	var _shims = shims;
	var _DraggableCore = _interopRequireDefault(DraggableCore$2);
	var _log = _interopRequireDefault(log$1);
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
	function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
	function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
	function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
	function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } /*:: import type {ControlPosition, PositionOffsetControlPosition, DraggableCoreProps, DraggableCoreDefaultProps} from './DraggableCore';*/
	/*:: import type {Bounds, DraggableEventHandler} from './utils/types';*/
	/*:: import type {Element as ReactElement} from 'react';*/
	/*:: type DraggableState = {
	  dragging: boolean,
	  dragged: boolean,
	  x: number, y: number,
	  slackX: number, slackY: number,
	  isElementSVG: boolean,
	  prevPropsPosition: ?ControlPosition,
	};*/
	/*:: export type DraggableDefaultProps = {
	  ...DraggableCoreDefaultProps,
	  axis: 'both' | 'x' | 'y' | 'none',
	  bounds: Bounds | string | false,
	  defaultClassName: string,
	  defaultClassNameDragging: string,
	  defaultClassNameDragged: string,
	  defaultPosition: ControlPosition,
	  scale: number,
	};*/
	/*:: export type DraggableProps = {
	  ...DraggableCoreProps,
	  ...DraggableDefaultProps,
	  positionOffset: PositionOffsetControlPosition,
	  position: ControlPosition,
	};*/
	//
	// Define <Draggable>
	//
	class Draggable extends React.Component /*:: <DraggableProps, DraggableState>*/{
	  // React 16.3+
	  // Arity (props, state)
	  static getDerivedStateFromProps(_ref /*:: */, _ref2 /*:: */) /*: ?Partial<DraggableState>*/{
	    let {
	      position
	    } /*: DraggableProps*/ = _ref /*: DraggableProps*/;
	    let {
	      prevPropsPosition
	    } /*: DraggableState*/ = _ref2 /*: DraggableState*/;
	    // Set x/y if a new position is provided in props that is different than the previous.
	    if (position && (!prevPropsPosition || position.x !== prevPropsPosition.x || position.y !== prevPropsPosition.y)) {
	      (0, _log.default)('Draggable: getDerivedStateFromProps %j', {
	        position,
	        prevPropsPosition
	      });
	      return {
	        x: position.x,
	        y: position.y,
	        prevPropsPosition: {
	          ...position
	        }
	      };
	    }
	    return null;
	  }
	  constructor(props /*: DraggableProps*/) {
	    super(props);
	    _defineProperty(this, "onDragStart", (e, coreData) => {
	      (0, _log.default)('Draggable: onDragStart: %j', coreData);

	      // Short-circuit if user's callback killed it.
	      const shouldStart = this.props.onStart(e, (0, _positionFns.createDraggableData)(this, coreData));
	      // Kills start event on core as well, so move handlers are never bound.
	      if (shouldStart === false) return false;
	      this.setState({
	        dragging: true,
	        dragged: true
	      });
	    });
	    _defineProperty(this, "onDrag", (e, coreData) => {
	      if (!this.state.dragging) return false;
	      (0, _log.default)('Draggable: onDrag: %j', coreData);
	      const uiData = (0, _positionFns.createDraggableData)(this, coreData);
	      const newState = {
	        x: uiData.x,
	        y: uiData.y,
	        slackX: 0,
	        slackY: 0
	      };

	      // Keep within bounds.
	      if (this.props.bounds) {
	        // Save original x and y.
	        const {
	          x,
	          y
	        } = newState;

	        // Add slack to the values used to calculate bound position. This will ensure that if
	        // we start removing slack, the element won't react to it right away until it's been
	        // completely removed.
	        newState.x += this.state.slackX;
	        newState.y += this.state.slackY;

	        // Get bound position. This will ceil/floor the x and y within the boundaries.
	        const [newStateX, newStateY] = (0, _positionFns.getBoundPosition)(this, newState.x, newState.y);
	        newState.x = newStateX;
	        newState.y = newStateY;

	        // Recalculate slack by noting how much was shaved by the boundPosition handler.
	        newState.slackX = this.state.slackX + (x - newState.x);
	        newState.slackY = this.state.slackY + (y - newState.y);

	        // Update the event we fire to reflect what really happened after bounds took effect.
	        uiData.x = newState.x;
	        uiData.y = newState.y;
	        uiData.deltaX = newState.x - this.state.x;
	        uiData.deltaY = newState.y - this.state.y;
	      }

	      // Short-circuit if user's callback killed it.
	      const shouldUpdate = this.props.onDrag(e, uiData);
	      if (shouldUpdate === false) return false;
	      this.setState(newState);
	    });
	    _defineProperty(this, "onDragStop", (e, coreData) => {
	      if (!this.state.dragging) return false;

	      // Short-circuit if user's callback killed it.
	      const shouldContinue = this.props.onStop(e, (0, _positionFns.createDraggableData)(this, coreData));
	      if (shouldContinue === false) return false;
	      (0, _log.default)('Draggable: onDragStop: %j', coreData);
	      const newState /*: Partial<DraggableState>*/ = {
	        dragging: false,
	        slackX: 0,
	        slackY: 0
	      };

	      // If this is a controlled component, the result of this operation will be to
	      // revert back to the old position. We expect a handler on `onDragStop`, at the least.
	      const controlled = Boolean(this.props.position);
	      if (controlled) {
	        const {
	          x,
	          y
	        } = this.props.position;
	        newState.x = x;
	        newState.y = y;
	      }
	      this.setState(newState);
	    });
	    this.state = {
	      // Whether or not we are currently dragging.
	      dragging: false,
	      // Whether or not we have been dragged before.
	      dragged: false,
	      // Current transform x and y.
	      x: props.position ? props.position.x : props.defaultPosition.x,
	      y: props.position ? props.position.y : props.defaultPosition.y,
	      prevPropsPosition: {
	        ...props.position
	      },
	      // Used for compensating for out-of-bounds drags
	      slackX: 0,
	      slackY: 0,
	      // Can only determine if SVG after mounting
	      isElementSVG: false
	    };
	    if (props.position && !(props.onDrag || props.onStop)) {
	      // eslint-disable-next-line no-console
	      console.warn('A `position` was applied to this <Draggable>, without drag handlers. This will make this ' + 'component effectively undraggable. Please attach `onDrag` or `onStop` handlers so you can adjust the ' + '`position` of this element.');
	    }
	  }
	  componentDidMount() {
	    // Check to see if the element passed is an instanceof SVGElement
	    if (typeof window.SVGElement !== 'undefined' && this.findDOMNode() instanceof window.SVGElement) {
	      this.setState({
	        isElementSVG: true
	      });
	    }
	  }
	  componentWillUnmount() {
	    this.setState({
	      dragging: false
	    }); // prevents invariant if unmounted while dragging
	  }

	  // React Strict Mode compatibility: if `nodeRef` is passed, we will use it instead of trying to find
	  // the underlying DOM node ourselves. See the README for more information.
	  findDOMNode() /*: ?HTMLElement*/{
	    var _this$props$nodeRef$c, _this$props;
	    return (_this$props$nodeRef$c = (_this$props = this.props) === null || _this$props === void 0 || (_this$props = _this$props.nodeRef) === null || _this$props === void 0 ? void 0 : _this$props.current) !== null && _this$props$nodeRef$c !== void 0 ? _this$props$nodeRef$c : _reactDom.default.findDOMNode(this);
	  }
	  render() /*: ReactElement<any>*/{
	    const {
	      axis,
	      bounds,
	      children,
	      defaultPosition,
	      defaultClassName,
	      defaultClassNameDragging,
	      defaultClassNameDragged,
	      position,
	      positionOffset,
	      scale,
	      ...draggableCoreProps
	    } = this.props;
	    let style = {};
	    let svgTransform = null;

	    // If this is controlled, we don't want to move it - unless it's dragging.
	    const controlled = Boolean(position);
	    const draggable = !controlled || this.state.dragging;
	    const validPosition = position || defaultPosition;
	    const transformOpts = {
	      // Set left if horizontal drag is enabled
	      x: (0, _positionFns.canDragX)(this) && draggable ? this.state.x : validPosition.x,
	      // Set top if vertical drag is enabled
	      y: (0, _positionFns.canDragY)(this) && draggable ? this.state.y : validPosition.y
	    };

	    // If this element was SVG, we use the `transform` attribute.
	    if (this.state.isElementSVG) {
	      svgTransform = (0, _domFns.createSVGTransform)(transformOpts, positionOffset);
	    } else {
	      // Add a CSS transform to move the element around. This allows us to move the element around
	      // without worrying about whether or not it is relatively or absolutely positioned.
	      // If the item you are dragging already has a transform set, wrap it in a <span> so <Draggable>
	      // has a clean slate.
	      style = (0, _domFns.createCSSTransform)(transformOpts, positionOffset);
	    }

	    // Mark with class while dragging
	    const className = (0, _clsx.default)(children.props.className || '', defaultClassName, {
	      [defaultClassNameDragging]: this.state.dragging,
	      [defaultClassNameDragged]: this.state.dragged
	    });

	    // Reuse the child provided
	    // This makes it flexible to use whatever element is wanted (div, ul, etc)
	    return /*#__PURE__*/React.createElement(_DraggableCore.default, _extends({}, draggableCoreProps, {
	      onStart: this.onDragStart,
	      onDrag: this.onDrag,
	      onStop: this.onDragStop
	    }), /*#__PURE__*/React.cloneElement(React.Children.only(children), {
	      className: className,
	      style: {
	        ...children.props.style,
	        ...style
	      },
	      transform: svgTransform
	    }));
	  }
	}
	exports.default = Draggable;
	_defineProperty(Draggable, "displayName", 'Draggable');
	_defineProperty(Draggable, "propTypes", {
	  // Accepts all props <DraggableCore> accepts.
	  ..._DraggableCore.default.propTypes,
	  /**
	   * `axis` determines which axis the draggable can move.
	   *
	   *  Note that all callbacks will still return data as normal. This only
	   *  controls flushing to the DOM.
	   *
	   * 'both' allows movement horizontally and vertically.
	   * 'x' limits movement to horizontal axis.
	   * 'y' limits movement to vertical axis.
	   * 'none' limits all movement.
	   *
	   * Defaults to 'both'.
	   */
	  axis: _propTypes.default.oneOf(['both', 'x', 'y', 'none']),
	  /**
	   * `bounds` determines the range of movement available to the element.
	   * Available values are:
	   *
	   * 'parent' restricts movement within the Draggable's parent node.
	   *
	   * Alternatively, pass an object with the following properties, all of which are optional:
	   *
	   * {left: LEFT_BOUND, right: RIGHT_BOUND, bottom: BOTTOM_BOUND, top: TOP_BOUND}
	   *
	   * All values are in px.
	   *
	   * Example:
	   *
	   * ```jsx
	   *   let App = React.createClass({
	   *       render: function () {
	   *         return (
	   *            <Draggable bounds={{right: 300, bottom: 300}}>
	   *              <div>Content</div>
	   *           </Draggable>
	   *         );
	   *       }
	   *   });
	   * ```
	   */
	  bounds: _propTypes.default.oneOfType([_propTypes.default.shape({
	    left: _propTypes.default.number,
	    right: _propTypes.default.number,
	    top: _propTypes.default.number,
	    bottom: _propTypes.default.number
	  }), _propTypes.default.string, _propTypes.default.oneOf([false])]),
	  defaultClassName: _propTypes.default.string,
	  defaultClassNameDragging: _propTypes.default.string,
	  defaultClassNameDragged: _propTypes.default.string,
	  /**
	   * `defaultPosition` specifies the x and y that the dragged item should start at
	   *
	   * Example:
	   *
	   * ```jsx
	   *      let App = React.createClass({
	   *          render: function () {
	   *              return (
	   *                  <Draggable defaultPosition={{x: 25, y: 25}}>
	   *                      <div>I start with transformX: 25px and transformY: 25px;</div>
	   *                  </Draggable>
	   *              );
	   *          }
	   *      });
	   * ```
	   */
	  defaultPosition: _propTypes.default.shape({
	    x: _propTypes.default.number,
	    y: _propTypes.default.number
	  }),
	  positionOffset: _propTypes.default.shape({
	    x: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
	    y: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string])
	  }),
	  /**
	   * `position`, if present, defines the current position of the element.
	   *
	   *  This is similar to how form elements in React work - if no `position` is supplied, the component
	   *  is uncontrolled.
	   *
	   * Example:
	   *
	   * ```jsx
	   *      let App = React.createClass({
	   *          render: function () {
	   *              return (
	   *                  <Draggable position={{x: 25, y: 25}}>
	   *                      <div>I start with transformX: 25px and transformY: 25px;</div>
	   *                  </Draggable>
	   *              );
	   *          }
	   *      });
	   * ```
	   */
	  position: _propTypes.default.shape({
	    x: _propTypes.default.number,
	    y: _propTypes.default.number
	  }),
	  /**
	   * These properties should be defined on the child, not here.
	   */
	  className: _shims.dontSetMe,
	  style: _shims.dontSetMe,
	  transform: _shims.dontSetMe
	});
	_defineProperty(Draggable, "defaultProps", {
	  ..._DraggableCore.default.defaultProps,
	  axis: 'both',
	  bounds: false,
	  defaultClassName: 'react-draggable',
	  defaultClassNameDragging: 'react-draggable-dragging',
	  defaultClassNameDragged: 'react-draggable-dragged',
	  defaultPosition: {
	    x: 0,
	    y: 0
	  },
	  scale: 1
	}); 
} (Draggable$1));

const {
  default: Draggable,
  DraggableCore
} = Draggable$1;

// Previous versions of this lib exported <Draggable> as the root export. As to no-// them, or TypeScript, we export *both* as the root and as 'default'.
// See https://github.com/mzabriskie/react-draggable/pull/254
// and https://github.com/mzabriskie/react-draggable/issues/266
cjs$1.exports = Draggable;
cjs$1.exports.default = Draggable;
var DraggableCore_1 = cjs$1.exports.DraggableCore = DraggableCore;

var cjsExports = cjs$1.exports;
const cjs = /*@__PURE__*/getDefaultExportFromCjs(cjsExports);

export { DraggableCore_1 as DraggableCore, cjs as default };
