export function isCallback<T>(maybeFunc: T | unknown): maybeFunc is T {
    return typeof maybeFunc === "function";
}
