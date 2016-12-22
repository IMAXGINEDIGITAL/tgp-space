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

const preloadQueue = new createjs.LoadQueue(true);
const loadPreloadManifest = viewport => new Promise((resolve, reject) => {
    preloadQueue.on('fileload', e => fileload(e, viewport));

    preloadQueue.on('progress', e => {
        const {
            loaded,
            total
        } = e;

        const [percent, val] = getProgress(0, 10, loaded, total);
        setBgClear(val);
    });

    preloadQueue.on('error', () => reject(viewport));

    preloadQueue.on('complete', () => resolve(viewport));

    preloadQueue.loadManifest(preloadAssets);
});

const gameQueue = new createjs.LoadQueue(true);
const loadGameManifest = viewport => new Promise((resolve, reject) => {
    gameQueue.on('fileload',  e => fileload(e, viewport));

    gameQueue.on('progress', e => {
        const {
            loaded,
            total
        } = e;

        const [percent, val] = getProgress(10, 100, loaded, total);
        setBgClear(val);
    });

    gameQueue.on('error', () => reject(viewport));

    gameQueue.on('complete', () => resolve(viewport));

    gameAssets.forEach(assets => 
        gameQueue.loadManifest(assets)
    );
});

const loadObject = (items) => {
    const promises = Object.keys(items)
        .map(key => {
            const item = items[key];
            item.obj = gameQueue.getResult(key) 
                        || preloadQueue.getResult(key);
            return Promise.resolve();
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
        return loadObject(items);
    });