import './preload.css';
import {os} from 'amfe-env';
import {
    win,
    doc,
    appendStyle,
    domready,
    Promise,
    delay,
    defer,
    createjs
} from './util';

const TEMPLATE_PRELOAD = `
    <div class="bg-light" rol="image"></div>
    <div class="logo" rol="image"></div>
    <div class="light-lazer" rol="image"></div>
    <div class="light-point" rol="image"></div>
    <div class="human" rol="image"></div>
    <div class="progress"><p class="kuhei">TGP世界正在生成，即将带您开启探索之旅请耐心等候<br><b>20</b>%</p></div>
`;

const TEMPLATE_GAME = `
    <canvas id="stage"></canvas>
    <div id="elements-count" class="kuhei"></div>
    <div id="stage-map" class="scope" rol="image">
        <div class="galaxy-map wrap" rol="image">
            <canvas class="map"></canvas>
            <div class="indicator"></div>
        </div>
        <div class="close" rol="image"></div>
    </div>
    <div id="pop">
        <div class="popWin" rol="image">
            <h3>标题标题标题</h3>
            <div class="content">
                <h2>发现游戏梗</h2>
                <p>内容内容内容内容内容内容内容内容内容内容内容内容</p>
            </div>
            <div class="close"></div>
            <div class="btn"></div>
        </div>
    </div>
`;

const items = {};
const ready = defer();
window.preload = ready.promise;

function setBackgrounImage(viewport, id, src) {
    let el = viewport.querySelector(`.${id}[rol="image"]`);
    if (!el
           && viewport.className.indexOf(id) > -1
           && viewport.getAttribute('rol') === 'image') {
        el = viewport;
    }
    if (el) {
        el.style.backgroundImage = `url(${src})`;
    }
}

let progressTextEl;
function setProgress(sVal, eVal, loaded, total) {
    const percent = (loaded / total).toFixed(2);
    const val = Math.round(sVal + (eVal - sVal) * percent);

    progressTextEl = progressTextEl || doc.querySelector('.progress b');
    progressTextEl.textContent = String(val);
    return [percent, val];
}

function fileload(e, viewport) {
    const {item} = e;
    items[item.id] = item;

    if (item.type === createjs.AbstractLoader.IMAGE) {
        setBackgrounImage(viewport, item.id, item.src);
    } else if (item.type === createjs.AbstractLoader.TEXT) {
        appendStyle(`
            @font-face {
                font-family: 'KuHei';
                src: url(${item.src}) format('truetype');
            }

            .kuhei {
                font-family: 'KuHei';
                font-style:normal;
                -webkit-font-smoothing: antialiased;
                -webkit-text-stroke-width: 0.2px;
            }
        `);
    }
}

const assetsPrefix = os.isIOS ? '2x' : '1x'
const loadPreloadManifest = viewport => new Promise((resolve, reject) => {
    const queue = new createjs.LoadQueue(true);

    queue.on('fileload', e => fileload(e, viewport));

    queue.on('progress', e => {
        const {
            loaded,
            total
        } = e;

        setProgress(20, 50, loaded, total);
    });

    queue.on('error', () => reject(viewport));

    queue.on('complete', () => resolve(viewport));

    queue.loadManifest({
        path: `assets/${assetsPrefix}/preload/`,
        manifest: [
            {id: 'bg-dark', src: 'bg-1.jpg'},
            {id: 'bg-light', src: 'bg-2.jpg'},
            {id: 'human', src: 'human.png'},
            {id: 'light-point', src: 'light-1.png'},
            {id: 'light-lazer', src: 'light-2.png'},
            {id: 'logo', src: 'logo.jpg'}
        ]
    });
});

let bgLightEl;
function processBackground(percent) {
    bgLightEl = bgLightEl || doc.querySelector('.bg-light');
    bgLightEl.style.opacity = String(percent);
}

let lightPointEl;
let lightLazerEl;
function processLight(percent) {
    lightPointEl = lightPointEl || doc.querySelector('.light-point');
    lightLazerEl = lightLazerEl || doc.querySelector('.light-lazer');

    if (percent >= 60 && percent < 90) {
        lightPointEl.className = 'light-point anime';
        lightLazerEl.className = 'light-lazer anime';
    } else if (percent >= 60) {
        lightPointEl.className = 'light-point anime end';
        lightLazerEl.className = 'light-lazer anime end';
    }
}

let logoEl;
function processLogo(percent) {
    logoEl = logoEl || doc.querySelector('.logo');
    if (percent >= 90 && percent < 100) {
        logoEl.className = 'logo anime';
    } else if (percent >= 100) {
        logoEl.className = 'logo anime end';
    }
}

const loadGameManifest = viewport => new Promise((resolve, reject) => {
    const queue = new createjs.LoadQueue(true);

    queue.on('fileload',  e => fileload(e, viewport));

    queue.on('progress', e => {
        const {
            loaded,
            total
        } = e;

        const [percent, val] = setProgress(50, 100, loaded, total);
        processBackground(percent);
        processLight(val);
        processLogo(val);
    });

    queue.on('error', () => reject(viewport));

    queue.on('complete', () => resolve(viewport));

    queue.loadManifest({
        path: `assets/${assetsPrefix}/game/`,
        manifest: [
            {id: 'galaxy-top', src: 'galaxy-1.jpg'},
            {id: 'galaxy-mid', src: 'galaxy-2.jpg'},
            {id: 'galaxy-bottom', src: 'galaxy-3.jpg'},
            {id: 'elements-top', src: 'elements-1.png'},
            {id: 'elements-mid', src: 'elements-2.png'},
            {id: 'elements-bottom', src: 'elements-3.png'},
            {id: 'galaxy-map', src: 'map.jpg'},
            {id: 'cloud', src: 'cloud.png'},
            {id: 'star', src: 'star.png'},
            {id: 'popWin', src: 'pop.png'},
            {id: 'scope', src: 'scope.png'},
            {id: 'close', src: 'close.png'}
        ]
    });

    queue.loadManifest({
        path: 'dist/',
        manifest: [
            'game.js'
        ]
    });
});

domready()
    .then(() => { // load preload manifest
        doc.body.setAttribute('id', 'preload');
        doc.body.setAttribute('rol', 'image');
        doc.body.className = 'bg-dark';
        doc.body.innerHTML = TEMPLATE_PRELOAD;

        return loadPreloadManifest(doc.body);
    })
    .then(() => {  // load game manifest
        const body = document.createElement('div');
        body.innerHTML = TEMPLATE_GAME;

        return loadGameManifest(body);
    })
    // .then(gameBody => delay(1500).then(() => gameBody))
    .then(gameBody => {
        const fragment = document.createDocumentFragment();
        const children = [...gameBody.children];
        for (const child of children) {
            fragment.appendChild(child); 
        }

        doc.body.removeAttribute('id');
        doc.body.removeAttribute('rol');
        doc.body.style.cssText = '';
        doc.body.className = '';
        doc.body.innerHTML = '';
        doc.body.appendChild(fragment);

        ready.resolve(items);
    })
    .catch(e => ready.reject(e));