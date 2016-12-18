import './preload.css';
import {
    preload as preloadAssets,
    game as gameAssets
} from './assets';
import {
    win,
    doc,
    appendStyle,
    domready,
    Promise,
    loadImg,
    delay,
    defer,
    query,
    queryAll,
    createjs
} from './util';

const items = {};
window.assetsItems = items;

const preloadWrapEl = query(doc.body, '#preload');
const gameWrapEl = query(doc.body, '#game');
const lightEl = query(preloadWrapEl, '.light');
const logoEl = query(preloadWrapEl, '.logo');

function setBackgrounImage(viewport, id, src) {
    let els = viewport.querySelectorAll(`.${id}[rol="image"]`);
    if (!els.length
           && viewport.className.indexOf(id) > -1
           && viewport.getAttribute('rol') === 'image') {
        els = [viewport];
    }
    [...els].forEach(el => {
        if (el) {
            el.style.backgroundImage = `url(${src})`;
        }
    });
}

function getProgress(sVal, eVal, loaded, total) {
    const percent = (loaded / total).toFixed(2);
    const val = Math.round(sVal + (eVal - sVal) * percent);
    return [percent, val];
}

function showLight(val) {
    const logoRect = lightEl.getBoundingClientRect();
    const y = logoRect.height * (1 - val / 100);
    lightEl.style.backgroundPositionY =  `-${y}px`;
    lightEl.style.webkitTransform = `translateY(${y}px)`; 
}

function showLogo(precent) {
    logoEl.className += ' anime';
    return delay(600);
}
 
function openGate() {
    preloadWrapEl.className += ' anime';
    return delay(1000);
}

function fileload(e, viewport) {
    const {item} = e;
    items[item.id] = item;

    if (item.type === createjs.AbstractLoader.IMAGE) {
        setBackgrounImage(viewport, item.id, item.src);
    } else if (item.type === createjs.AbstractLoader.TEXT) {
        appendStyle(`
            @font-face {
                font-family: 'ventouse';
                src: url(${item.src}) format('truetype');
            }

            .ventouse {
                font-family: 'ventouse';
                font-style: normal;
                -webkit-font-smoothing: antialiased;
                -webkit-text-stroke-width: 0.2px;
            }
        `);
    }
}

const loadPreloadManifest = viewport => new Promise((resolve, reject) => {
    const queue = new createjs.LoadQueue(true);

    queue.on('fileload', e => fileload(e, viewport));

    queue.on('progress', e => {
        const {
            loaded,
            total
        } = e;

        const [percent, val] = getProgress(0, 10, loaded, total);
        showLight(val);
    });

    queue.on('error', () => reject(viewport));

    queue.on('complete', () => resolve(viewport));

    queue.loadManifest(preloadAssets);
});

const loadGameManifest = viewport => new Promise((resolve, reject) => {
    const queue = new createjs.LoadQueue(true);

    queue.on('fileload',  e => fileload(e, viewport));

    queue.on('progress', e => {
        const {
            loaded,
            total
        } = e;

        const [percent, val] = getProgress(10, 100, loaded, total);
        showLight(val);
    });

    queue.on('error', () => reject(viewport));

    queue.on('complete', () => resolve(viewport));

    gameAssets.forEach(assets => 
        queue.loadManifest(assets)
    );
});

const loadImgObject = (items) => {
    const promises = Object.keys(items)
        .filter(key => items[key].type === createjs.AbstractLoader.IMAGE)
        .map(key => {
            const item = items[key];
            const [image, promise] = loadImg(item.src);
            item.obj = image;
            return promise;
        });
    return Promise.all(promises);
};

window.assetsPreload = domready()
    .then(() => { // load preload manifest
        preloadWrapEl.style.display = 'block';
        return loadPreloadManifest(preloadWrapEl);
    })
    .then(() => {  // load game manifest
        return loadGameManifest(gameWrapEl);
    })
    .then(() => showLogo())
    .then(() => {
        gameWrapEl.style.display = 'block';
        doc.body.className = 'anime';
    })
    .then(() => openGate())
    .then(() => {
        doc.body.className = '';
        preloadWrapEl.style.display = 'none';
        return loadImgObject(items);
    });