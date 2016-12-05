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

function delay(time) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, time);
    });
}

export {
    win,
    doc,
    Promise,
    createjs,
    appendStyle,
    domready,
    delay
}