import {r as reactExports} from './__federation_shared_react-b9a2fc6e.js';
import {r as reactDomExports} from './__federation_shared_react-dom-f4b3ef56.js';
import {importShared} from './__federation_fn_import-5e1cd25d.js';
import {
    _ as _objectWithoutPropertiesLoose,
    a as _extends,
    r as reactIsExports$1
} from './objectWithoutPropertiesLoose-aa5a43c1.js';
import {g as getDefaultExportFromCjs} from './_commonjsHelpers-2155838d.js';

var shim = {exports: {}};

var useSyncExternalStoreShim_production_min = {};

/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var e$1 = reactExports;

function h$2(a, b) {
    return a === b && (0 !== a || 1 / a === 1 / b) || a !== a && b !== b
}

var k$1 = "function" === typeof Object.is ? Object.is : h$2, l$1 = e$1.useState, m$1 = e$1.useEffect,
    n$2 = e$1.useLayoutEffect, p$2 = e$1.useDebugValue;

function q$2(a, b) {
    var d = b(), f = l$1({inst: {value: d, getSnapshot: b}}), c = f[0].inst, g = f[1];
    n$2(function () {
        c.value = d;
        c.getSnapshot = b;
        r$2(c) && g({inst: c});
    }, [a, d, b]);
    m$1(function () {
        r$2(c) && g({inst: c});
        return a(function () {
            r$2(c) && g({inst: c});
        })
    }, [a]);
    p$2(d);
    return d
}

function r$2(a) {
    var b = a.getSnapshot;
    a = a.value;
    try {
        var d = b();
        return !k$1(a, d)
    } catch (f) {
        return !0
    }
}

function t$2(a, b) {
    return b()
}

var u$1 = "undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement ? t$2 : q$2;
useSyncExternalStoreShim_production_min.useSyncExternalStore = void 0 !== e$1.useSyncExternalStore ? e$1.useSyncExternalStore : u$1;

{
    shim.exports = useSyncExternalStoreShim_production_min;
}

var shimExports = shim.exports;

var withSelector = {exports: {}};

var withSelector_production_min = {};

/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var h$1 = reactExports, n$1 = shimExports;

function p$1(a, b) {
    return a === b && (0 !== a || 1 / a === 1 / b) || a !== a && b !== b
}

var q$1 = "function" === typeof Object.is ? Object.is : p$1, r$1 = n$1.useSyncExternalStore, t$1 = h$1.useRef,
    u = h$1.useEffect, v$1 = h$1.useMemo, w$1 = h$1.useDebugValue;
withSelector_production_min.useSyncExternalStoreWithSelector = function (a, b, e, l, g) {
    var c = t$1(null);
    if (null === c.current) {
        var f = {hasValue: !1, value: null};
        c.current = f;
    } else f = c.current;
    c = v$1(function () {
        function a(a) {
            if (!c) {
                c = !0;
                d = a;
                a = l(a);
                if (void 0 !== g && f.hasValue) {
                    var b = f.value;
                    if (g(b, a)) return k = b
                }
                return k = a
            }
            b = k;
            if (q$1(d, a)) return b;
            var e = l(a);
            if (void 0 !== g && g(b, e)) return b;
            d = a;
            return k = e
        }

        var c = !1, d, k, m = void 0 === e ? null : e;
        return [function () {
            return a(b())
        }, null === m ? void 0 : function () {
            return a(m())
        }]
    }, [b, e, l, g]);
    var d = r$1(a, c[0], c[1]);
    u(function () {
        f.hasValue = !0;
        f.value = d;
    }, [d]);
    w$1(d);
    return d
};

{
    withSelector.exports = withSelector_production_min;
}

var withSelectorExports = withSelector.exports;

// Default to a dummy "batch" implementation that just runs the callback
function defaultNoopBatch(callback) {
    callback();
}

let batch = defaultNoopBatch; // Allow injecting another batching function later

const setBatch = newBatch => batch = newBatch; // Supply a getter just to skip dealing with ESM bindings

const getBatch = () => batch;

const React$3 = await importShared('react');

const ContextKey = Symbol.for(`react-redux-context`);
const gT = typeof globalThis !== "undefined" ? globalThis :
    /* fall back to a per-module scope (pre-8.1 behaviour) if `globalThis` is not available */
    {};

function getContext() {
    var _gT$ContextKey;

    if (!React$3.createContext) return {};
    const contextMap = (_gT$ContextKey = gT[ContextKey]) != null ? _gT$ContextKey : gT[ContextKey] = new Map();
    let realContext = contextMap.get(React$3.createContext);

    if (!realContext) {
        realContext = React$3.createContext(null);

        contextMap.set(React$3.createContext, realContext);
    }

    return realContext;
}

const ReactReduxContext = /*#__PURE__*/getContext();

const {useContext} = await importShared('react');

/**
 * Hook factory, which creates a `useReduxContext` hook bound to a given context. This is a low-level
 * hook that you should usually not need to call directly.
 *
 * @param {React.Context} [context=ReactReduxContext] Context passed to your `<Provider>`.
 * @returns {Function} A `useReduxContext` hook bound to the specified context.
 */
function createReduxContextHook(context = ReactReduxContext) {
    return function useReduxContext() {
        const contextValue = useContext(context);

        return contextValue;
    };
}

/**
 * A hook to access the value of the `ReactReduxContext`. This is a low-level
 * hook that you should usually not need to call directly.
 *
 * @returns {any} the value of the `ReactReduxContext`
 *
 * @example
 *
 * import React from 'react'
 * import { useReduxContext } from 'react-redux'
 *
 * export const CounterComponent = () => {
 *   const { store } = useReduxContext()
 *   return <div>{store.getState()}</div>
 * }
 */

const useReduxContext = /*#__PURE__*/createReduxContextHook();

const notInitialized = () => {
    throw new Error('uSES not initialized!');
};

const {useCallback, useDebugValue, useRef} = await importShared('react');
let useSyncExternalStoreWithSelector = notInitialized;
const initializeUseSelector = fn => {
    useSyncExternalStoreWithSelector = fn;
};

const refEquality = (a, b) => a === b;

/**
 * Hook factory, which creates a `useSelector` hook bound to a given context.
 *
 * @param {React.Context} [context=ReactReduxContext] Context passed to your `<Provider>`.
 * @returns {Function} A `useSelector` hook bound to the specified context.
 */


function createSelectorHook(context = ReactReduxContext) {
    const useReduxContext$1 = context === ReactReduxContext ? useReduxContext : createReduxContextHook(context);
    return function useSelector(selector, equalityFnOrOptions = {}) {
        const {
            equalityFn = refEquality,
            stabilityCheck = undefined,
            noopCheck = undefined
        } = typeof equalityFnOrOptions === 'function' ? {
            equalityFn: equalityFnOrOptions
        } : equalityFnOrOptions;

        const {
            store,
            subscription,
            getServerState,
            stabilityCheck: globalStabilityCheck,
            noopCheck: globalNoopCheck
        } = useReduxContext$1();
        useRef(true);
        const wrappedSelector = useCallback({
            [selector.name](state) {
                const selected = selector(state);

                return selected;
            }

        }[selector.name], [selector, globalStabilityCheck, stabilityCheck]);
        const selectedState = useSyncExternalStoreWithSelector(subscription.addNestedSub, store.getState, getServerState || store.getState, wrappedSelector, equalityFn);
        useDebugValue(selectedState);
        return selectedState;
    };
}

/**
 * A hook to access the redux store's state. This hook takes a selector function
 * as an argument. The selector is called with the store state.
 *
 * This hook takes an optional equality comparison function as the second parameter
 * that allows you to customize the way the selected state is compared to determine
 * whether the component needs to be re-rendered.
 *
 * @param {Function} selector the selector function
 * @param {Function=} equalityFn the function that will be used to determine equality
 *
 * @returns {any} the selected state
 *
 * @example
 *
 * import React from 'react'
 * import { useSelector } from 'react-redux'
 *
 * export const CounterComponent = () => {
 *   const counter = useSelector(state => state.counter)
 *   return <div>{counter}</div>
 * }
 */

const useSelector = /*#__PURE__*/createSelectorHook();

var reactIs$1 = {exports: {}};

var reactIs_production_min = {};

/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var b = "function" === typeof Symbol && Symbol.for, c = b ? Symbol.for("react.element") : 60103,
    d = b ? Symbol.for("react.portal") : 60106, e = b ? Symbol.for("react.fragment") : 60107,
    f = b ? Symbol.for("react.strict_mode") : 60108, g = b ? Symbol.for("react.profiler") : 60114,
    h = b ? Symbol.for("react.provider") : 60109, k = b ? Symbol.for("react.context") : 60110,
    l = b ? Symbol.for("react.async_mode") : 60111, m = b ? Symbol.for("react.concurrent_mode") : 60111,
    n = b ? Symbol.for("react.forward_ref") : 60112, p = b ? Symbol.for("react.suspense") : 60113, q = b ?
        Symbol.for("react.suspense_list") : 60120, r = b ? Symbol.for("react.memo") : 60115,
    t = b ? Symbol.for("react.lazy") : 60116, v = b ? Symbol.for("react.block") : 60121,
    w = b ? Symbol.for("react.fundamental") : 60117, x = b ? Symbol.for("react.responder") : 60118,
    y = b ? Symbol.for("react.scope") : 60119;

function z(a) {
    if ("object" === typeof a && null !== a) {
        var u = a.$$typeof;
        switch (u) {
            case c:
                switch (a = a.type, a) {
                    case l:
                    case m:
                    case e:
                    case g:
                    case f:
                    case p:
                        return a;
                    default:
                        switch (a = a && a.$$typeof, a) {
                            case k:
                            case n:
                            case t:
                            case r:
                            case h:
                                return a;
                            default:
                                return u
                        }
                }
            case d:
                return u
        }
    }
}

function A(a) {
    return z(a) === m
}

reactIs_production_min.AsyncMode = l;
reactIs_production_min.ConcurrentMode = m;
reactIs_production_min.ContextConsumer = k;
reactIs_production_min.ContextProvider = h;
reactIs_production_min.Element = c;
reactIs_production_min.ForwardRef = n;
reactIs_production_min.Fragment = e;
reactIs_production_min.Lazy = t;
reactIs_production_min.Memo = r;
reactIs_production_min.Portal = d;
reactIs_production_min.Profiler = g;
reactIs_production_min.StrictMode = f;
reactIs_production_min.Suspense = p;
reactIs_production_min.isAsyncMode = function (a) {
    return A(a) || z(a) === l
};
reactIs_production_min.isConcurrentMode = A;
reactIs_production_min.isContextConsumer = function (a) {
    return z(a) === k
};
reactIs_production_min.isContextProvider = function (a) {
    return z(a) === h
};
reactIs_production_min.isElement = function (a) {
    return "object" === typeof a && null !== a && a.$$typeof === c
};
reactIs_production_min.isForwardRef = function (a) {
    return z(a) === n
};
reactIs_production_min.isFragment = function (a) {
    return z(a) === e
};
reactIs_production_min.isLazy = function (a) {
    return z(a) === t
};
reactIs_production_min.isMemo = function (a) {
    return z(a) === r
};
reactIs_production_min.isPortal = function (a) {
    return z(a) === d
};
reactIs_production_min.isProfiler = function (a) {
    return z(a) === g
};
reactIs_production_min.isStrictMode = function (a) {
    return z(a) === f
};
reactIs_production_min.isSuspense = function (a) {
    return z(a) === p
};
reactIs_production_min.isValidElementType = function (a) {
    return "string" === typeof a || "function" === typeof a || a === e || a === m || a === g || a === f || a === p || a === q || "object" === typeof a && null !== a && (a.$$typeof === t || a.$$typeof === r || a.$$typeof === h || a.$$typeof === k || a.$$typeof === n || a.$$typeof === w || a.$$typeof === x || a.$$typeof === y || a.$$typeof === v)
};
reactIs_production_min.typeOf = z;

{
    reactIs$1.exports = reactIs_production_min;
}

var reactIsExports = reactIs$1.exports;

var reactIs = reactIsExports;

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
var REACT_STATICS = {
    childContextTypes: true,
    contextType: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDefaultProps: true,
    getDerivedStateFromError: true,
    getDerivedStateFromProps: true,
    mixins: true,
    propTypes: true,
    type: true
};
var KNOWN_STATICS = {
    name: true,
    length: true,
    prototype: true,
    caller: true,
    callee: true,
    arguments: true,
    arity: true
};
var FORWARD_REF_STATICS = {
    '$$typeof': true,
    render: true,
    defaultProps: true,
    displayName: true,
    propTypes: true
};
var MEMO_STATICS = {
    '$$typeof': true,
    compare: true,
    defaultProps: true,
    displayName: true,
    propTypes: true,
    type: true
};
var TYPE_STATICS = {};
TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;
TYPE_STATICS[reactIs.Memo] = MEMO_STATICS;

function getStatics(component) {
    // React v16.11 and below
    if (reactIs.isMemo(component)) {
        return MEMO_STATICS;
    } // React v16.12 and above


    return TYPE_STATICS[component['$$typeof']] || REACT_STATICS;
}

var defineProperty = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = Object.prototype;

function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
    if (typeof sourceComponent !== 'string') {
        // don't hoist over string (html) components
        if (objectPrototype) {
            var inheritedComponent = getPrototypeOf(sourceComponent);

            if (inheritedComponent && inheritedComponent !== objectPrototype) {
                hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
            }
        }

        var keys = getOwnPropertyNames(sourceComponent);

        if (getOwnPropertySymbols) {
            keys = keys.concat(getOwnPropertySymbols(sourceComponent));
        }

        var targetStatics = getStatics(targetComponent);
        var sourceStatics = getStatics(sourceComponent);

        for (var i = 0; i < keys.length; ++i) {
            var key = keys[i];

            if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
                var descriptor = getOwnPropertyDescriptor(sourceComponent, key);

                try {
                    // Avoid failures from read-only properties
                    defineProperty(targetComponent, key, descriptor);
                } catch (e) {
                }
            }
        }
    }

    return targetComponent;
}

var hoistNonReactStatics_cjs = hoistNonReactStatics;

const hoistStatics = /*@__PURE__*/getDefaultExportFromCjs(hoistNonReactStatics_cjs);

const _excluded$1 = ["initMapStateToProps", "initMapDispatchToProps", "initMergeProps"];

function pureFinalPropsSelectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch, {
    areStatesEqual,
    areOwnPropsEqual,
    areStatePropsEqual
}) {
    let hasRunAtLeastOnce = false;
    let state;
    let ownProps;
    let stateProps;
    let dispatchProps;
    let mergedProps;

    function handleFirstCall(firstState, firstOwnProps) {
        state = firstState;
        ownProps = firstOwnProps;
        stateProps = mapStateToProps(state, ownProps);
        dispatchProps = mapDispatchToProps(dispatch, ownProps);
        mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
        hasRunAtLeastOnce = true;
        return mergedProps;
    }

    function handleNewPropsAndNewState() {
        stateProps = mapStateToProps(state, ownProps);
        if (mapDispatchToProps.dependsOnOwnProps) dispatchProps = mapDispatchToProps(dispatch, ownProps);
        mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
        return mergedProps;
    }

    function handleNewProps() {
        if (mapStateToProps.dependsOnOwnProps) stateProps = mapStateToProps(state, ownProps);
        if (mapDispatchToProps.dependsOnOwnProps) dispatchProps = mapDispatchToProps(dispatch, ownProps);
        mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
        return mergedProps;
    }

    function handleNewState() {
        const nextStateProps = mapStateToProps(state, ownProps);
        const statePropsChanged = !areStatePropsEqual(nextStateProps, stateProps);
        stateProps = nextStateProps;
        if (statePropsChanged) mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
        return mergedProps;
    }

    function handleSubsequentCalls(nextState, nextOwnProps) {
        const propsChanged = !areOwnPropsEqual(nextOwnProps, ownProps);
        const stateChanged = !areStatesEqual(nextState, state, nextOwnProps, ownProps);
        state = nextState;
        ownProps = nextOwnProps;
        if (propsChanged && stateChanged) return handleNewPropsAndNewState();
        if (propsChanged) return handleNewProps();
        if (stateChanged) return handleNewState();
        return mergedProps;
    }

    return function pureFinalPropsSelector(nextState, nextOwnProps) {
        return hasRunAtLeastOnce ? handleSubsequentCalls(nextState, nextOwnProps) : handleFirstCall(nextState, nextOwnProps);
    };
}

// TODO: Add more comments
// The selector returned by selectorFactory will memoize its results,
// allowing connect's shouldComponentUpdate to return false if final
// props have not changed.
function finalPropsSelectorFactory(dispatch, _ref) {
    let {
            initMapStateToProps,
            initMapDispatchToProps,
            initMergeProps
        } = _ref,
        options = _objectWithoutPropertiesLoose(_ref, _excluded$1);

    const mapStateToProps = initMapStateToProps(dispatch, options);
    const mapDispatchToProps = initMapDispatchToProps(dispatch, options);
    const mergeProps = initMergeProps(dispatch, options);

    return pureFinalPropsSelectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch, options);
}

function bindActionCreators(actionCreators, dispatch) {
    const boundActionCreators = {};

    for (const key in actionCreators) {
        const actionCreator = actionCreators[key];

        if (typeof actionCreator === 'function') {
            boundActionCreators[key] = (...args) => dispatch(actionCreator(...args));
        }
    }

    return boundActionCreators;
}

function wrapMapToPropsConstant( // * Note:
//  It seems that the dispatch argument
//  could be a dispatch function in some cases (ex: whenMapDispatchToPropsIsMissing)
//  and a state object in some others (ex: whenMapStateToPropsIsMissing)
// eslint-disable-next-line no-unused-vars
getConstant) {
    return function initConstantSelector(dispatch) {
        const constant = getConstant(dispatch);

        function constantSelector() {
            return constant;
        }

        constantSelector.dependsOnOwnProps = false;
        return constantSelector;
    };
} // dependsOnOwnProps is used by createMapToPropsProxy to determine whether to pass props as args
// to the mapToProps function being wrapped. It is also used by makePurePropsSelector to determine
// whether mapToProps needs to be invoked when props have changed.
//
// A length of one signals that mapToProps does not depend on props from the parent component.
// A length of zero is assumed to mean mapToProps is getting args via arguments or ...args and
// therefore not reporting its length accurately..
// TODO Can this get pulled out so that we can subscribe directly to the store if we don't need ownProps?

function getDependsOnOwnProps(mapToProps) {
    return mapToProps.dependsOnOwnProps ? Boolean(mapToProps.dependsOnOwnProps) : mapToProps.length !== 1;
} // Used by whenMapStateToPropsIsFunction and whenMapDispatchToPropsIsFunction,
// this function wraps mapToProps in a proxy function which does several things:
//
//  * Detects whether the mapToProps function being called depends on props, which
//    is used by selectorFactory to decide if it should reinvoke on props changes.
//
//  * On first call, handles mapToProps if returns another function, and treats that
//    new function as the true mapToProps for subsequent calls.
//
//  * On first call, verifies the first result is a plain object, in order to warn
//    the developer that their mapToProps function is not returning a valid result.
//

function wrapMapToPropsFunc(mapToProps, methodName) {
    return function initProxySelector(dispatch, {
        displayName
    }) {
        const proxy = function mapToPropsProxy(stateOrDispatch, ownProps) {
            return proxy.dependsOnOwnProps ? proxy.mapToProps(stateOrDispatch, ownProps) : proxy.mapToProps(stateOrDispatch, undefined);
        }; // allow detectFactoryAndVerify to get ownProps


        proxy.dependsOnOwnProps = true;

        proxy.mapToProps = function detectFactoryAndVerify(stateOrDispatch, ownProps) {
            proxy.mapToProps = mapToProps;
            proxy.dependsOnOwnProps = getDependsOnOwnProps(mapToProps);
            let props = proxy(stateOrDispatch, ownProps);

            if (typeof props === 'function') {
                proxy.mapToProps = props;
                proxy.dependsOnOwnProps = getDependsOnOwnProps(props);
                props = proxy(stateOrDispatch, ownProps);
            }
            return props;
        };

        return proxy;
    };
}

function createInvalidArgFactory(arg, name) {
    return (dispatch, options) => {
        throw new Error(`Invalid value of type ${typeof arg} for ${name} argument when connecting component ${options.wrappedComponentName}.`);
    };
}

function mapDispatchToPropsFactory(mapDispatchToProps) {
    return mapDispatchToProps && typeof mapDispatchToProps === 'object' ? wrapMapToPropsConstant(dispatch => // @ts-ignore
        bindActionCreators(mapDispatchToProps, dispatch)) : !mapDispatchToProps ? wrapMapToPropsConstant(dispatch => ({
        dispatch
    })) : typeof mapDispatchToProps === 'function' ? // @ts-ignore
        wrapMapToPropsFunc(mapDispatchToProps) : createInvalidArgFactory(mapDispatchToProps, 'mapDispatchToProps');
}

function mapStateToPropsFactory(mapStateToProps) {
    return !mapStateToProps ? wrapMapToPropsConstant(() => ({})) : typeof mapStateToProps === 'function' ? // @ts-ignore
        wrapMapToPropsFunc(mapStateToProps) : createInvalidArgFactory(mapStateToProps, 'mapStateToProps');
}

function defaultMergeProps(stateProps, dispatchProps, ownProps) {
    // @ts-ignore
    return _extends({}, ownProps, stateProps, dispatchProps);
}

function wrapMergePropsFunc(mergeProps) {
    return function initMergePropsProxy(dispatch, {
        displayName,
        areMergedPropsEqual
    }) {
        let hasRunOnce = false;
        let mergedProps;
        return function mergePropsProxy(stateProps, dispatchProps, ownProps) {
            const nextMergedProps = mergeProps(stateProps, dispatchProps, ownProps);

            if (hasRunOnce) {
                if (!areMergedPropsEqual(nextMergedProps, mergedProps)) mergedProps = nextMergedProps;
            } else {
                hasRunOnce = true;
                mergedProps = nextMergedProps;
            }

            return mergedProps;
        };
    };
}

function mergePropsFactory(mergeProps) {
    return !mergeProps ? () => defaultMergeProps : typeof mergeProps === 'function' ? wrapMergePropsFunc(mergeProps) : createInvalidArgFactory(mergeProps, 'mergeProps');
}

// well as nesting subscriptions of descendant components, so that we can ensure the
// ancestor components re-render before descendants

function createListenerCollection() {
    const batch = getBatch();
    let first = null;
    let last = null;
    return {
        clear() {
            first = null;
            last = null;
        },

        notify() {
            batch(() => {
                let listener = first;

                while (listener) {
                    listener.callback();
                    listener = listener.next;
                }
            });
        },

        get() {
            let listeners = [];
            let listener = first;

            while (listener) {
                listeners.push(listener);
                listener = listener.next;
            }

            return listeners;
        },

        subscribe(callback) {
            let isSubscribed = true;
            let listener = last = {
                callback,
                next: null,
                prev: last
            };

            if (listener.prev) {
                listener.prev.next = listener;
            } else {
                first = listener;
            }

            return function unsubscribe() {
                if (!isSubscribed || first === null) return;
                isSubscribed = false;

                if (listener.next) {
                    listener.next.prev = listener.prev;
                } else {
                    last = listener.prev;
                }

                if (listener.prev) {
                    listener.prev.next = listener.next;
                } else {
                    first = listener.next;
                }
            };
        }

    };
}

const nullListeners = {
    notify() {
    },

    get: () => []
};

function createSubscription(store, parentSub) {
    let unsubscribe;
    let listeners = nullListeners; // Reasons to keep the subscription active

    let subscriptionsAmount = 0; // Is this specific subscription subscribed (or only nested ones?)

    let selfSubscribed = false;

    function addNestedSub(listener) {
        trySubscribe();
        const cleanupListener = listeners.subscribe(listener); // cleanup nested sub

        let removed = false;
        return () => {
            if (!removed) {
                removed = true;
                cleanupListener();
                tryUnsubscribe();
            }
        };
    }

    function notifyNestedSubs() {
        listeners.notify();
    }

    function handleChangeWrapper() {
        if (subscription.onStateChange) {
            subscription.onStateChange();
        }
    }

    function isSubscribed() {
        return selfSubscribed;
    }

    function trySubscribe() {
        subscriptionsAmount++;

        if (!unsubscribe) {
            unsubscribe = parentSub ? parentSub.addNestedSub(handleChangeWrapper) : store.subscribe(handleChangeWrapper);
            listeners = createListenerCollection();
        }
    }

    function tryUnsubscribe() {
        subscriptionsAmount--;

        if (unsubscribe && subscriptionsAmount === 0) {
            unsubscribe();
            unsubscribe = undefined;
            listeners.clear();
            listeners = nullListeners;
        }
    }

    function trySubscribeSelf() {
        if (!selfSubscribed) {
            selfSubscribed = true;
            trySubscribe();
        }
    }

    function tryUnsubscribeSelf() {
        if (selfSubscribed) {
            selfSubscribed = false;
            tryUnsubscribe();
        }
    }

    const subscription = {
        addNestedSub,
        notifyNestedSubs,
        handleChangeWrapper,
        isSubscribed,
        trySubscribe: trySubscribeSelf,
        tryUnsubscribe: tryUnsubscribeSelf,
        getListeners: () => listeners
    };
    return subscription;
}

const React$2 = await importShared('react');
// React currently throws a warning when using useLayoutEffect on the server.
// To get around it, we can conditionally useEffect on the server (no-op) and
// useLayoutEffect in the browser. We need useLayoutEffect to ensure the store
// subscription callback always has the selector from the latest render commit
// available, otherwise a store update may happen between render and the effect,
// which may cause missed updates; we also must ensure the store subscription
// is created synchronously, otherwise a store update may occur before the
// subscription is created and an inconsistent state may be observed
// Matches logic in React's `shared/ExecutionEnvironment` file

const canUseDOM = !!(typeof window !== 'undefined' && typeof window.document !== 'undefined' && typeof window.document.createElement !== 'undefined');
const useIsomorphicLayoutEffect = canUseDOM ? React$2.useLayoutEffect : React$2.useEffect;

function is(x, y) {
    if (x === y) {
        return x !== 0 || y !== 0 || 1 / x === 1 / y;
    } else {
        return x !== x && y !== y;
    }
}

function shallowEqual(objA, objB) {
    if (is(objA, objB)) return true;

    if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
        return false;
    }

    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);
    if (keysA.length !== keysB.length) return false;

    for (let i = 0; i < keysA.length; i++) {
        if (!Object.prototype.hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
            return false;
        }
    }

    return true;
}

const _excluded = ["reactReduxForwardedRef"];
const React$1 = await importShared('react');
let useSyncExternalStore = notInitialized;
const initializeConnect = fn => {
    useSyncExternalStore = fn;
}; // Define some constant arrays just to avoid re-creating these
const NO_SUBSCRIPTION_ARRAY = [null, null]; // Attempts to stringify whatever not-really-a-component value we were given

// This is "just" a `useLayoutEffect`, but with two modifications:
// - we need to fall back to `useEffect` in SSR to avoid annoying warnings
// - we extract this to a separate function to avoid closing over values
//   and causing memory leaks
function useIsomorphicLayoutEffectWithArgs(effectFunc, effectArgs, dependencies) {
    useIsomorphicLayoutEffect(() => effectFunc(...effectArgs), dependencies);
} // Effect callback, extracted: assign the latest props values to refs for later usage


function captureWrapperProps(lastWrapperProps, lastChildProps, renderIsScheduled, wrapperProps, // actualChildProps: unknown,
                             childPropsFromStoreUpdate, notifyNestedSubs) {
    // We want to capture the wrapper props and child props we used for later comparisons
    lastWrapperProps.current = wrapperProps;
    renderIsScheduled.current = false; // If the render was from a store update, clear out that reference and cascade the subscriber update

    if (childPropsFromStoreUpdate.current) {
        childPropsFromStoreUpdate.current = null;
        notifyNestedSubs();
    }
} // Effect callback, extracted: subscribe to the Redux store or nearest connected ancestor,
// check for updates after dispatched actions, and trigger re-renders.


function subscribeUpdates(shouldHandleStateChanges, store, subscription, childPropsSelector, lastWrapperProps, lastChildProps, renderIsScheduled, isMounted, childPropsFromStoreUpdate, notifyNestedSubs, // forceComponentUpdateDispatch: React.Dispatch<any>,
                          additionalSubscribeListener) {
    // If we're not subscribed to the store, nothing to do here
    if (!shouldHandleStateChanges) return () => {
    }; // Capture values for checking if and when this component unmounts

    let didUnsubscribe = false;
    let lastThrownError = null; // We'll run this callback every time a store subscription update propagates to this component

    const checkForUpdates = () => {
        if (didUnsubscribe || !isMounted.current) {
            // Don't run stale listeners.
            // Redux doesn't guarantee unsubscriptions happen until next dispatch.
            return;
        } // TODO We're currently calling getState ourselves here, rather than letting `uSES` do it


        const latestStoreState = store.getState();
        let newChildProps, error;

        try {
            // Actually run the selector with the most recent store state and wrapper props
            // to determine what the child props should be
            newChildProps = childPropsSelector(latestStoreState, lastWrapperProps.current);
        } catch (e) {
            error = e;
            lastThrownError = e;
        }

        if (!error) {
            lastThrownError = null;
        } // If the child props haven't changed, nothing to do here - cascade the subscription update


        if (newChildProps === lastChildProps.current) {
            if (!renderIsScheduled.current) {
                notifyNestedSubs();
            }
        } else {
            // Save references to the new child props.  Note that we track the "child props from store update"
            // as a ref instead of a useState/useReducer because we need a way to determine if that value has
            // been processed.  If this went into useState/useReducer, we couldn't clear out the value without
            // forcing another re-render, which we don't want.
            lastChildProps.current = newChildProps;
            childPropsFromStoreUpdate.current = newChildProps;
            renderIsScheduled.current = true; // TODO This is hacky and not how `uSES` is meant to be used
            // Trigger the React `useSyncExternalStore` subscriber

            additionalSubscribeListener();
        }
    }; // Actually subscribe to the nearest connected ancestor (or store)


    subscription.onStateChange = checkForUpdates;
    subscription.trySubscribe(); // Pull data from the store after first render in case the store has
    // changed since we began.

    checkForUpdates();

    const unsubscribeWrapper = () => {
        didUnsubscribe = true;
        subscription.tryUnsubscribe();
        subscription.onStateChange = null;

        if (lastThrownError) {
            // It's possible that we caught an error due to a bad mapState function, but the
            // parent re-rendered without this component and we're about to unmount.
            // This shouldn't happen as long as we do top-down subscriptions correctly, but
            // if we ever do those wrong, this throw will surface the error in our tests.
            // In that case, throw the error from here so it doesn't get lost.
            throw lastThrownError;
        }
    };

    return unsubscribeWrapper;
} // Reducer initial state creation for our update reducer

function strictEqual(a, b) {
    return a === b;
}

/**
 * Connects a React component to a Redux store.
 *
 * - Without arguments, just wraps the component, without changing the behavior / props
 *
 * - If 2 params are passed (3rd param, mergeProps, is skipped), default behavior
 * is to override ownProps (as stated in the docs), so what remains is everything that's
 * not a state or dispatch prop
 *
 * - When 3rd param is passed, we don't know if ownProps propagate and whether they
 * should be valid component props, because it depends on mergeProps implementation.
 * As such, it is the user's responsibility to extend ownProps interface from state or
 * dispatch props or both when applicable
 *
 * @param mapStateToProps A function that extracts values from state
 * @param mapDispatchToProps Setup for dispatching actions
 * @param mergeProps Optional callback to merge state and dispatch props together
 * @param options Options for configuring the connection
 *
 */

function connect(mapStateToProps, mapDispatchToProps, mergeProps, {
    // The `pure` option has been removed, so TS doesn't like us destructuring this to check its existence.
    // @ts-ignore
    pure,
    areStatesEqual = strictEqual,
    areOwnPropsEqual = shallowEqual,
    areStatePropsEqual = shallowEqual,
    areMergedPropsEqual = shallowEqual,
    // use React's forwardRef to expose a ref of the wrapped component
    forwardRef = false,
    // the context consumer to use
    context = ReactReduxContext
} = {}) {

    const Context = context;
    const initMapStateToProps = mapStateToPropsFactory(mapStateToProps);
    const initMapDispatchToProps = mapDispatchToPropsFactory(mapDispatchToProps);
    const initMergeProps = mergePropsFactory(mergeProps);
    const shouldHandleStateChanges = Boolean(mapStateToProps);

    const wrapWithConnect = WrappedComponent => {

        const wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
        const displayName = `Connect(${wrappedComponentName})`;
        const selectorFactoryOptions = {
            shouldHandleStateChanges,
            displayName,
            wrappedComponentName,
            WrappedComponent,
            // @ts-ignore
            initMapStateToProps,
            // @ts-ignore
            initMapDispatchToProps,
            initMergeProps,
            areStatesEqual,
            areStatePropsEqual,
            areOwnPropsEqual,
            areMergedPropsEqual
        };

        function ConnectFunction(props) {
            const [propsContext, reactReduxForwardedRef, wrapperProps] = React$1.useMemo(() => {
                // Distinguish between actual "data" props that were passed to the wrapper component,
                // and values needed to control behavior (forwarded refs, alternate context instances).
                // To maintain the wrapperProps object reference, memoize this destructuring.
                const {
                        reactReduxForwardedRef
                    } = props,
                    wrapperProps = _objectWithoutPropertiesLoose(props, _excluded);

                return [props.context, reactReduxForwardedRef, wrapperProps];
            }, [props]);
            const ContextToUse = React$1.useMemo(() => {
                // Users may optionally pass in a custom context instance to use instead of our ReactReduxContext.
                // Memoize the check that determines which context instance we should use.
                return propsContext && propsContext.Consumer && // @ts-ignore
                reactIsExports$1.isContextConsumer( /*#__PURE__*/React$1.createElement(propsContext.Consumer, null)) ? propsContext : Context;
            }, [propsContext, Context]); // Retrieve the store and ancestor subscription via context, if available

            const contextValue = React$1.useContext(ContextToUse); // The store _must_ exist as either a prop or in context.
            // We'll check to see if it _looks_ like a Redux store first.
            // This allows us to pass through a `store` prop that is just a plain value.

            const didStoreComeFromProps = Boolean(props.store) && Boolean(props.store.getState) && Boolean(props.store.dispatch);
            const didStoreComeFromContext = Boolean(contextValue) && Boolean(contextValue.store);


            const store = didStoreComeFromProps ? props.store : contextValue.store;
            const getServerState = didStoreComeFromContext ? contextValue.getServerState : store.getState;
            const childPropsSelector = React$1.useMemo(() => {
                // The child props selector needs the store reference as an input.
                // Re-create this selector whenever the store changes.
                return finalPropsSelectorFactory(store.dispatch, selectorFactoryOptions);
            }, [store]);
            const [subscription, notifyNestedSubs] = React$1.useMemo(() => {
                if (!shouldHandleStateChanges) return NO_SUBSCRIPTION_ARRAY; // This Subscription's source should match where store came from: props vs. context. A component
                // connected to the store via props shouldn't use subscription from context, or vice versa.

                const subscription = createSubscription(store, didStoreComeFromProps ? undefined : contextValue.subscription); // `notifyNestedSubs` is duplicated to handle the case where the component is unmounted in
                // the middle of the notification loop, where `subscription` will then be null. This can
                // probably be avoided if Subscription's listeners logic is changed to not call listeners
                // that have been unsubscribed in the  middle of the notification loop.

                const notifyNestedSubs = subscription.notifyNestedSubs.bind(subscription);
                return [subscription, notifyNestedSubs];
            }, [store, didStoreComeFromProps, contextValue]); // Determine what {store, subscription} value should be put into nested context, if necessary,
            // and memoize that value to avoid unnecessary context updates.

            const overriddenContextValue = React$1.useMemo(() => {
                if (didStoreComeFromProps) {
                    // This component is directly subscribed to a store from props.
                    // We don't want descendants reading from this store - pass down whatever
                    // the existing context value is from the nearest connected ancestor.
                    return contextValue;
                } // Otherwise, put this component's subscription instance into context, so that
                // connected descendants won't update until after this component is done


                return _extends({}, contextValue, {
                    subscription
                });
            }, [didStoreComeFromProps, contextValue, subscription]); // Set up refs to coordinate values between the subscription effect and the render logic

            const lastChildProps = React$1.useRef();
            const lastWrapperProps = React$1.useRef(wrapperProps);
            const childPropsFromStoreUpdate = React$1.useRef();
            const renderIsScheduled = React$1.useRef(false);
            React$1.useRef(false);
            const isMounted = React$1.useRef(false);
            const latestSubscriptionCallbackError = React$1.useRef();
            useIsomorphicLayoutEffect(() => {
                isMounted.current = true;
                return () => {
                    isMounted.current = false;
                };
            }, []);
            const actualChildPropsSelector = React$1.useMemo(() => {
                const selector = () => {
                    // Tricky logic here:
                    // - This render may have been triggered by a Redux store update that produced new child props
                    // - However, we may have gotten new wrapper props after that
                    // If we have new child props, and the same wrapper props, we know we should use the new child props as-is.
                    // But, if we have new wrapper props, those might change the child props, so we have to recalculate things.
                    // So, we'll use the child props from store update only if the wrapper props are the same as last time.
                    if (childPropsFromStoreUpdate.current && wrapperProps === lastWrapperProps.current) {
                        return childPropsFromStoreUpdate.current;
                    } // TODO We're reading the store directly in render() here. Bad idea?
                    // This will likely cause Bad Things (TM) to happen in Concurrent Mode.
                    // Note that we do this because on renders _not_ caused by store updates, we need the latest store state
                    // to determine what the child props should be.


                    return childPropsSelector(store.getState(), wrapperProps);
                };

                return selector;
            }, [store, wrapperProps]); // We need this to execute synchronously every time we re-render. However, React warns
            // about useLayoutEffect in SSR, so we try to detect environment and fall back to
            // just useEffect instead to avoid the warning, since neither will run anyway.

            const subscribeForReact = React$1.useMemo(() => {
                const subscribe = reactListener => {
                    if (!subscription) {
                        return () => {
                        };
                    }

                    return subscribeUpdates(shouldHandleStateChanges, store, subscription, // @ts-ignore
                        childPropsSelector, lastWrapperProps, lastChildProps, renderIsScheduled, isMounted, childPropsFromStoreUpdate, notifyNestedSubs, reactListener);
                };

                return subscribe;
            }, [subscription]);
            useIsomorphicLayoutEffectWithArgs(captureWrapperProps, [lastWrapperProps, lastChildProps, renderIsScheduled, wrapperProps, childPropsFromStoreUpdate, notifyNestedSubs]);
            let actualChildProps;

            try {
                actualChildProps = useSyncExternalStore( // TODO We're passing through a big wrapper that does a bunch of extra side effects besides subscribing
                    subscribeForReact, // TODO This is incredibly hacky. We've already processed the store update and calculated new child props,
                    // TODO and we're just passing that through so it triggers a re-render for us rather than relying on `uSES`.
                    actualChildPropsSelector, getServerState ? () => childPropsSelector(getServerState(), wrapperProps) : actualChildPropsSelector);
            } catch (err) {
                if (latestSubscriptionCallbackError.current) {
                    err.message += `\nThe error may be correlated with this previous error:\n${latestSubscriptionCallbackError.current.stack}\n\n`;
                }

                throw err;
            }

            useIsomorphicLayoutEffect(() => {
                latestSubscriptionCallbackError.current = undefined;
                childPropsFromStoreUpdate.current = undefined;
                lastChildProps.current = actualChildProps;
            }); // Now that all that's done, we can finally try to actually render the child component.
            // We memoize the elements for the rendered child component as an optimization.

            const renderedWrappedComponent = React$1.useMemo(() => {
                return (
                    /*#__PURE__*/
                    // @ts-ignore
                    React$1.createElement(WrappedComponent, _extends({}, actualChildProps, {
                        ref: reactReduxForwardedRef
                    }))
                );
            }, [reactReduxForwardedRef, WrappedComponent, actualChildProps]); // If React sees the exact same element reference as last time, it bails out of re-rendering
            // that child, same as if it was wrapped in React.memo() or returned false from shouldComponentUpdate.

            const renderedChild = React$1.useMemo(() => {
                if (shouldHandleStateChanges) {
                    // If this component is subscribed to store updates, we need to pass its own
                    // subscription instance down to our descendants. That means rendering the same
                    // Context instance, and putting a different value into the context.
                    return /*#__PURE__*/React$1.createElement(ContextToUse.Provider, {
                        value: overriddenContextValue
                    }, renderedWrappedComponent);
                }

                return renderedWrappedComponent;
            }, [ContextToUse, renderedWrappedComponent, overriddenContextValue]);
            return renderedChild;
        }

        const _Connect = React$1.memo(ConnectFunction);

        // Add a hacky cast to get the right output type
        const Connect = _Connect;
        Connect.WrappedComponent = WrappedComponent;
        Connect.displayName = ConnectFunction.displayName = displayName;

        if (forwardRef) {
            const _forwarded = React$1.forwardRef(function forwardConnectRef(props, ref) {
                // @ts-ignore
                return /*#__PURE__*/React$1.createElement(Connect, _extends({}, props, {
                    reactReduxForwardedRef: ref
                }));
            });

            const forwarded = _forwarded;
            forwarded.displayName = displayName;
            forwarded.WrappedComponent = WrappedComponent;
            return hoistStatics(forwarded, WrappedComponent);
        }

        return hoistStatics(Connect, WrappedComponent);
    };

    return wrapWithConnect;
}

const React = await importShared('react');

function Provider({
                      store,
                      context,
                      children,
                      serverState,
                      stabilityCheck = 'once',
                      noopCheck = 'once'
                  }) {
    const contextValue = React.useMemo(() => {
        const subscription = createSubscription(store);
        return {
            store,
            subscription,
            getServerState: serverState ? () => serverState : undefined,
            stabilityCheck,
            noopCheck
        };
    }, [store, serverState, stabilityCheck, noopCheck]);
    const previousState = React.useMemo(() => store.getState(), [store]);
    useIsomorphicLayoutEffect(() => {
        const {
            subscription
        } = contextValue;
        subscription.onStateChange = subscription.notifyNestedSubs;
        subscription.trySubscribe();

        if (previousState !== store.getState()) {
            subscription.notifyNestedSubs();
        }

        return () => {
            subscription.tryUnsubscribe();
            subscription.onStateChange = undefined;
        };
    }, [contextValue, previousState]);
    const Context = context || ReactReduxContext; // @ts-ignore 'AnyAction' is assignable to the constraint of type 'A', but 'A' could be instantiated with a different subtype

    return /*#__PURE__*/React.createElement(Context.Provider, {
        value: contextValue
    }, children);
}

/**
 * Hook factory, which creates a `useStore` hook bound to a given context.
 *
 * @param {React.Context} [context=ReactReduxContext] Context passed to your `<Provider>`.
 * @returns {Function} A `useStore` hook bound to the specified context.
 */

function createStoreHook(context = ReactReduxContext) {
    const useReduxContext$1 = // @ts-ignore
        context === ReactReduxContext ? useReduxContext : // @ts-ignore
            createReduxContextHook(context);
    return function useStore() {
        const {
            store
        } = useReduxContext$1(); // @ts-ignore

        return store;
    };
}

/**
 * A hook to access the redux store.
 *
 * @returns {any} the redux store
 *
 * @example
 *
 * import React from 'react'
 * import { useStore } from 'react-redux'
 *
 * export const ExampleComponent = () => {
 *   const store = useStore()
 *   return <div>{store.getState()}</div>
 * }
 */

const useStore = /*#__PURE__*/createStoreHook();

/**
 * Hook factory, which creates a `useDispatch` hook bound to a given context.
 *
 * @param {React.Context} [context=ReactReduxContext] Context passed to your `<Provider>`.
 * @returns {Function} A `useDispatch` hook bound to the specified context.
 */

function createDispatchHook(context = ReactReduxContext) {
    const useStore$1 = // @ts-ignore
        context === ReactReduxContext ? useStore : createStoreHook(context);
    return function useDispatch() {
        const store = useStore$1(); // @ts-ignore

        return store.dispatch;
    };
}

/**
 * A hook to access the redux `dispatch` function.
 *
 * @returns {any|function} redux store's `dispatch` function
 *
 * @example
 *
 * import React, { useCallback } from 'react'
 * import { useDispatch } from 'react-redux'
 *
 * export const CounterComponent = ({ value }) => {
 *   const dispatch = useDispatch()
 *   const increaseCounter = useCallback(() => dispatch({ type: 'increase-counter' }), [])
 *   return (
 *     <div>
 *       <span>{value}</span>
 *       <button onClick={increaseCounter}>Increase counter</button>
 *     </div>
 *   )
 * }
 */

const useDispatch = /*#__PURE__*/createDispatchHook();

// The primary entry point assumes we're working with standard ReactDOM/RN, but
// older versions that do not include `useSyncExternalStore` (React 16.9 - 17.x).
// Because of that, the useSyncExternalStore compat shim is needed.
initializeUseSelector(withSelectorExports.useSyncExternalStoreWithSelector);
initializeConnect(shimExports.useSyncExternalStore); // Enable batched updates in our subscriptions for use
// with standard React renderers (ReactDOM, React Native)

setBatch(reactDomExports.unstable_batchedUpdates);

const unstable_batchedUpdates = reactDomExports.unstable_batchedUpdates;
export {
    Provider,
    ReactReduxContext,
    unstable_batchedUpdates as batch,
    connect,
    createDispatchHook,
    createSelectorHook,
    createStoreHook,
    shallowEqual,
    useDispatch,
    useSelector,
    useStore
};
