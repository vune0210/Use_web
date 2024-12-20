import {importShared} from './__federation_fn_import-5e1cd25d.js';

const {useRef: r, useEffect: n, useMemo: t, useCallback: u, useState: e} = await importShared('react');

function c(u, e, c) {
    var i = this, a = r(null), o = r(0), f = r(null), l = r([]), m = r(), v = r(), d = r(u), p = r(!0);
    n(function () {
        d.current = u;
    }, [u]);
    var g = !e && 0 !== e && "undefined" != typeof window;
    if ("function" != typeof u) throw new TypeError("Expected a function");
    e = +e || 0;
    var w = !!(c = c || {}).leading, s = !("trailing" in c) || !!c.trailing, x = "maxWait" in c,
        y = x ? Math.max(+c.maxWait || 0, e) : null;
    n(function () {
        return p.current = !0, function () {
            p.current = !1;
        }
    }, []);
    var h = t(function () {
        var r = function (r) {
            var n = l.current, t = m.current;
            return l.current = m.current = null, o.current = r, v.current = d.current.apply(t, n)
        }, n = function (r, n) {
            g && cancelAnimationFrame(f.current), f.current = g ? requestAnimationFrame(r) : setTimeout(r, n);
        }, t = function (r) {
            if (!p.current) return !1;
            var n = r - a.current;
            return !a.current || n >= e || n < 0 || x && r - o.current >= y
        }, u = function (n) {
            return f.current = null, s && l.current ? r(n) : (l.current = m.current = null, v.current)
        }, c = function r() {
            var c = Date.now();
            if (t(c)) return u(c);
            if (p.current) {
                var i = e - (c - a.current), f = x ? Math.min(i, y - (c - o.current)) : i;
                n(r, f);
            }
        }, h = function () {
            var u = Date.now(), d = t(u);
            if (l.current = [].slice.call(arguments), m.current = i, a.current = u, d) {
                if (!f.current && p.current) return o.current = a.current, n(c, e), w ? r(a.current) : v.current;
                if (x) return n(c, e), r(a.current)
            }
            return f.current || n(c, e), v.current
        };
        return h.cancel = function () {
            f.current && (g ? cancelAnimationFrame(f.current) : clearTimeout(f.current)), o.current = 0, l.current = a.current = m.current = f.current = null;
        }, h.isPending = function () {
            return !!f.current
        }, h.flush = function () {
            return f.current ? u(Date.now()) : v.current
        }, h
    }, [w, x, e, y, s, g]);
    return h
}

function i(r, n) {
    return r === n
}

function a(r) {
    return "function" == typeof r ? function () {
        return r
    } : r
}

function o(n, t, o) {
    var f, l, m = o && o.equalityFn || i, v = (f = e(a(n)), l = f[1], [f[0], u(function (r) {
        return l(a(r))
    }, [])]), d = v[0], p = v[1], g = c(u(function (r) {
        return p(r)
    }, [p]), t, o), w = r(n);
    return m(w.current, n) || (g(n), w.current = n), [d, g]
}

function f(r, n, t) {
    var u = void 0 === t ? {} : t, e = u.leading, i = u.trailing;
    return c(r, n, {maxWait: n, leading: void 0 === e || e, trailing: void 0 === i || i})
}

export {o as useDebounce, c as useDebouncedCallback, f as useThrottledCallback};
