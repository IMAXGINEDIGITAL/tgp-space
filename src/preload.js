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
    createjs,
    raf,
    caf
} from './util';
import textConfig from './textConfig';
import Ticker from './ticker';

const items = {};
window.assetsItems = items;

const preloadWrapEl = query(doc.body, '#preload');
const gameWrapEl = query(doc.body, '#game');
const bg1El = query(preloadWrapEl, '.bg1');
const bg2El = query(preloadWrapEl, '.bg2');
const textsEl = query(preloadWrapEl, '.texts');

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

function setBgClear(val) {
    bg2El.style.opacity = val / 100; 
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
        setBgClear(val);
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
        setBgClear(val);
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

const ticker = new Ticker();
let tickId;

window.assetsPreload = domready()
    .then(() => {
        ticker.run();

        const texts = textConfig.loading.texts;
        const textPLen = texts.length;
        let textPIndex = 0;
        let textLIndex = 0;
        let sumDelta = 301;

        tickId = ticker.add(({
            delta,
            elapsed
        }) => {
            if (sumDelta > 300) {
                sumDelta = 0;
                debugger
                let p = texts[textPIndex];
                let t = p[textLIndex];

                if (textLIndex === p.length) {
                    textPIndex = (textPIndex + 1) % textPLen;
                    textLIndex = 0;
                    textsEl.innerHTML = '';

                    p = texts[textPIndex];
                    t = p[textLIndex];
                }

                const el = document.createElement('p');
                el.textContent = t;
                textsEl.appendChild(el);

                textLIndex++;
            } else {
                sumDelta += delta;
            }
        });
    })
    .then(() => { // load preload manifest
        preloadWrapEl.style.display = 'block';
        return loadPreloadManifest(preloadWrapEl);
    })
    .then(() => {  // load game manifest
        return loadGameManifest(gameWrapEl);
    })
    .then(() => {
        ticker.cancel();
        preloadWrapEl.style.display = 'none';
        gameWrapEl.style.display = 'block';
        return loadImgObject(items);
    });