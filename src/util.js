const win = window;
const {
    document: doc,
    Promise,
    createjs
} = win;

function appendStyle(cssText) {
    const style = doc.createElement('style');
    style.textContent = cssText;
    doc.getElementsByTagName('head')[0].appendChild(style);
}

function domready() {
    return new Promise((resolve, reject) => {
        if (doc.readyState === 'complete') {
            resolve();
        } else {
            doc.addEventListener('DOMContentLoaded', resolve);
        }
    });
}

function defer() {
    const deferred = {};
    const promise = new Promise((resolve, reject) => {
        deferred.resolve = resolve;
        deferred.reject = reject
    });
    deferred.promise = promise;
    return deferred;
}

function delay(time) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, time);
    });
}

function query(viewport, selector) {
    return viewport.querySelector(selector);
}

function queryAll(viewport, selector) {
    return [...viewport.querySelectorAll(selector)];
}

function getRect(el) {
    return el.rects || (el.rects = el.getBoundingClientRect());
}

function getDistance(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}

const raf = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            function(fn) {return setTimeout(fn, 1 / 60)};

const caf = window.cancelAnimationFrame || 
            window.webkitCancelAnimationFrame ||
            function(id) {clearTimeout(id)};

export {
    win,
    doc,
    defer,
    Promise,
    createjs,
    appendStyle,
    domready,
    delay,
    query,
    queryAll,
    getRect,
    getDistance,
    raf,
    caf
}