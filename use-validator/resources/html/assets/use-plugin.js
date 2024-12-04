import {_ as __vitePreload} from './preload-helper-c9efef17.js';

const exportSet = new Set(['Module', '__esModule', 'default', '_export_sfc']);
let moduleMap = {
    "./Plugin": () => {
        dynamicLoadingCss([], false, './Plugin');
        return __federation_import('./__federation_expose_Plugin-19d000fb.js').then(module => Object.keys(module).every(item => exportSet.has(item)) ? () => module.default : () => module)
    },
};
const seen = {};
const dynamicLoadingCss = (cssFilePaths, dontAppendStylesToHead, exposeItemName) => {
    const metaUrl = import.meta.url;
    if (typeof metaUrl == 'undefined') {
        console.warn('The remote style takes effect only when the build.target option in the vite.config.ts file is higher than that of "es2020".');
        return
    }
    const curUrl = metaUrl.substring(0, metaUrl.lastIndexOf('use-plugin.js'));

    cssFilePaths.forEach(cssFilePath => {
        const href = curUrl + cssFilePath;
        if (href in seen) return
        seen[href] = true;
        if (dontAppendStylesToHead) {
            const key = 'css__use-plugin-validator__' + exposeItemName;
            if (window[key] == null) window[key] = [];
            window[key].push(href);
        } else {
            const element = document.head.appendChild(document.createElement('link'));
            element.href = href;
            element.rel = 'stylesheet';
        }
    });
};

async function __federation_import(name) {
    return __vitePreload(() => import(name), true ? [] : void 0, import.meta.url);
}

const get = (module) => {
    if (!moduleMap[module]) throw new Error('Can not find remote module ' + module)
    return moduleMap[module]();
};
const init = (shareScope) => {
    globalThis.__federation_shared__ = globalThis.__federation_shared__ || {};
    Object.entries(shareScope).forEach(([key, value]) => {
        const versionKey = Object.keys(value)[0];
        const versionValue = Object.values(value)[0];
        const scope = versionValue.scope || 'default';
        globalThis.__federation_shared__[scope] = globalThis.__federation_shared__[scope] || {};
        const shared = globalThis.__federation_shared__[scope];
        (shared[key] = shared[key] || {})[versionKey] = versionValue;
    });
};

export {dynamicLoadingCss, get, init};