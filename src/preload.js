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
    query,
    queryAll,
    createjs
} from './util';

const TEMPLATE_PRELOAD = `
    <img src="assets/logo.jpg" style="display:none" />
    <div class="bg-light" rol="image"></div>
    <div class="logo" rol="image"></div>
    <div class="light-lazer" rol="image"></div>
    <div class="light-point" rol="image"></div>
    <div class="human" rol="image"></div>
    <div class="progress">
        <p>
            <label>TGP世界正在生成</label>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <b>20</b>
            <label>%</label>
        </p>
        <p>即将带您开启探索之旅请耐心等候</p>
    </div>
`;

const TEMPLATE_GAME = `
    <img src="assets/logo.jpg" style="display:none" />
    <canvas id="stage"></canvas>
    <div id="elements-count" class="ventouse"></div>
    <div id="stage-map" class="ball" rol="image">
        <div class="text">点击查看<br><b>全宇宙</b></div>
        <div class="galaxy-map wrap" rol="image">
            <canvas class="map"></canvas>
            <div class="indicator"></div>
        </div>
        <div class="close" rol="image"></div>
    </div>
    <div id="wormhole">
        <div class="wormhole" rol="image"></div>
    </div>
    <div id="pop" style="display:none;">
        <div class="wrap">
            <div class="popWin left" rol="image"></div>
            <div class="popWin right"  rol="image"></div>
            <div class="scope" rol="image"></div>
            <div class="content"></div>
            <div class="close1" rol="image"></div>
            <div class="btn"></div>
        </div>
    </div>
`;

const items = {};
const ready = defer();
window.preload = ready.promise;

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

let progressTextEl;
function setProgress(sVal, eVal, loaded, total) {
    const percent = (loaded / total).toFixed(2);
    const val = Math.round(sVal + (eVal - sVal) * percent);

    const progressEls = queryAll(doc, '.progress span');
    for (let i = 0; i < progressEls.length; i++) {
        const el = progressEls[i];
        const n = i * 4;
        let opacity;
        let display;

        if (n + 1 <= val) {
            display = 'block';
            opacity = '0.25';
        }

        if (n + 2 <= val) {
            opacity = '0.5';
        }

        if (n + 3 <= val) {
            opacity = '0.75';
        }

        if (n + 4 <= val) {
            opacity = '1';
        }

        if (el.style.display !== display) {
            el.style.display = display;
        }

        if (el.style.opacity !== opacity) {
            el.style.opacity = opacity;
        }
    }

    progressTextEl = progressTextEl || query(doc, '.progress b');
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
            {id: 'elements-top', src: 'elements-1.png'},
            {id: 'elements-mid', src: 'elements-2.png'},
            {id: 'elements-bottom', src: 'elements-3.png'},
            {id: 'galaxy-map', src: 'map.jpg'},
            {id: 'cloud', src: 'cloud.png'},
            {id: 'star', src: 'star.png'},
            {id: 'popWin', src: 'pop.png'},
            {id: 'ball', src: 'ball.png'},
            {id: 'scope', src: 'scope.png'},
            {id: 'close', src: 'close.png'},
            {id: 'close1', src: 'close1.png'},
            {id: 'polaris', src: 'polaris.jpg'},
            {id: 'wormhole', src: 'wormhole.png'}
        ]
    });

    queue.loadManifest({
        path: `assets/${assetsPrefix}/game/static/`,
        manifest: [
            {id: 'static-03', src: 'static-03.png'},
            {id: 'static-10', src: 'static-10.png'},
            {id: 'static-11', src: 'static-11.png'},
            {id: 'static-12', src: 'static-12.png'},
            {id: 'static-14', src: 'static-14.png'},
            {id: 'static-15', src: 'static-15.png'},
            {id: 'static-16', src: 'static-16.png'},
            {id: 'static-17', src: 'static-17.png'},
            {id: 'static-18', src: 'static-18.png'},
            {id: 'static-19', src: 'static-19.png'},
            {id: 'static-21', src: 'static-21.png'},
            {id: 'static-22', src: 'static-22.png'},
            {id: 'static-24', src: 'static-24.png'},
            {id: 'static-26', src: 'static-26.png'},
            {id: 'static-27', src: 'static-27.png'},
            {id: 'static-28', src: 'static-28.png'},
            {id: 'static-29', src: 'static-29.png'},
            {id: 'static-31', src: 'static-31.png'},
            {id: 'static-32', src: 'static-32.png'},
            {id: 'static-34', src: 'static-34.png'},
            {id: 'static-35', src: 'static-35.png'},
            {id: 'static-36', src: 'static-36.png'},
            {id: 'static-37', src: 'static-37.png'},
            {id: 'static-38', src: 'static-38.png'},
            {id: 'static-40', src: 'static-40.png'},
            {id: 'static-42', src: 'static-42.png'},
            {id: 'static-47', src: 'static-47.png'},
            {id: 'static-48', src: 'static-48.png'},
            {id: 'static-49', src: 'static-49.png'}
        ]
    });

    queue.loadManifest({
        path: `assets/${assetsPrefix}/game/anime/`,
        manifest: [
            {id: 'anime-13-1', src: 'anime-13-1.png'},
            {id: 'anime-13-2', src: 'anime-13-1.png'},
            {id: 'anime-13-3', src: 'anime-13-1.png'},
            {id: 'anime-13-4', src: 'anime-13-1.png'},
            {id: 'anime-13-5', src: 'anime-13-5.png'},
            {id: 'anime-14-1', src: 'anime-14-1.png'},
            {id: 'anime-14-2', src: 'anime-14-1.png'},
            {id: 'anime-14-3', src: 'anime-14-1.png'},
            {id: 'anime-14-4', src: 'anime-14-1.png'},
            {id: 'anime-14-5', src: 'anime-14-1.png'},
            {id: 'anime-19-1', src: 'anime-19-1.png'},
            {id: 'anime-19-2', src: 'anime-19-1.png'},
            {id: 'anime-19-3', src: 'anime-19-1.png'},
            {id: 'anime-19-4', src: 'anime-19-1.png'},
            {id: 'anime-19-5', src: 'anime-19-5.png'},
            {id: 'anime-20-1', src: 'anime-20-1.png'},
            {id: 'anime-20-2', src: 'anime-20-1.png'},
            {id: 'anime-20-3', src: 'anime-20-1.png'},
            {id: 'anime-20-4', src: 'anime-20-1.png'},
            {id: 'anime-20-5', src: 'anime-20-5.png'},
            {id: 'anime-25-1', src: 'anime-25-1.png'},
            {id: 'anime-25-2', src: 'anime-25-1.png'},
            {id: 'anime-25-3', src: 'anime-25-1.png'},
            {id: 'anime-25-4', src: 'anime-25-1.png'},
            {id: 'anime-25-5', src: 'anime-25-5.png'},
            {id: 'anime-33-1', src: 'anime-33-1.png'},
            {id: 'anime-33-2', src: 'anime-33-1.png'},
            {id: 'anime-33-3', src: 'anime-33-1.png'},
            {id: 'anime-33-4', src: 'anime-33-1.png'},
            {id: 'anime-33-5', src: 'anime-33-5.png'},
            {id: 'anime-39-1', src: 'anime-39-1.png'},
            {id: 'anime-39-2', src: 'anime-39-1.png'},
            {id: 'anime-39-3', src: 'anime-39-1.png'},
            {id: 'anime-39-4', src: 'anime-39-1.png'},
            {id: 'anime-39-5', src: 'anime-39-5.png'},
            {id: 'anime-41-1', src: 'anime-41-1.png'},
            {id: 'anime-41-2', src: 'anime-41-1.png'},
            {id: 'anime-41-3', src: 'anime-41-1.png'},
            {id: 'anime-41-4', src: 'anime-41-1.png'},
            {id: 'anime-41-5', src: 'anime-41-5.png'},
            {id: 'anime-43-1', src: 'anime-43-1.png'},
            {id: 'anime-43-2', src: 'anime-43-1.png'},
            {id: 'anime-43-3', src: 'anime-43-1.png'},
            {id: 'anime-43-4', src: 'anime-43-1.png'},
            {id: 'anime-43-5', src: 'anime-43-5.png'},
            {id: 'anime-44-1', src: 'anime-44-1.png'},
            {id: 'anime-44-2', src: 'anime-44-1.png'},
            {id: 'anime-44-3', src: 'anime-44-1.png'},
            {id: 'anime-44-4', src: 'anime-44-1.png'},
            {id: 'anime-44-5', src: 'anime-44-5.png'},
            {id: 'anime-45-1', src: 'anime-45-1.png'},
            {id: 'anime-45-2', src: 'anime-45-1.png'},
            {id: 'anime-45-3', src: 'anime-45-1.png'},
            {id: 'anime-45-4', src: 'anime-45-1.png'},
            {id: 'anime-45-5', src: 'anime-45-5.png'},
            {id: 'anime-47-1', src: 'anime-47-1.png'},
            {id: 'anime-47-2', src: 'anime-47-1.png'},
            {id: 'anime-47-3', src: 'anime-47-1.png'},
            {id: 'anime-47-4', src: 'anime-47-1.png'},
            {id: 'anime-47-5', src: 'anime-47-5.png'},
            {id: 'anime-48-1', src: 'anime-48-1.png'},
            {id: 'anime-48-2', src: 'anime-48-1.png'},
            {id: 'anime-48-3', src: 'anime-48-1.png'},
            {id: 'anime-48-4', src: 'anime-48-1.png'},
            {id: 'anime-48-5', src: 'anime-48-5.png'},
            {id: 'anime-50-1', src: 'anime-50-1.png'},
            {id: 'anime-50-2', src: 'anime-50-1.png'},
            {id: 'anime-50-3', src: 'anime-50-1.png'},
            {id: 'anime-50-4', src: 'anime-50-1.png'},
            {id: 'anime-50-5', src: 'anime-50-1.png'}
        ]
    });

    queue.loadManifest({
        path: 'assets/',
        manifest: [
            'font.ttf'
        ]
    });

    queue.loadManifest({
        path: 'dist/',
        manifest: [
            'game.js'
        ]
    });
});

let viewport;
domready()
    .then(() => { // load preload manifest
        viewport = query(doc.body, 'div[bodywrap]');
        viewport.setAttribute('id', 'preload');
        viewport.setAttribute('rol', 'image');
        viewport.className = 'bg-dark';
        viewport.innerHTML = TEMPLATE_PRELOAD;

        return loadPreloadManifest(viewport);
    })
    .then(() => {  // load game manifest
        const body = document.createElement('div');
        body.innerHTML = TEMPLATE_GAME;
        return loadGameManifest(body);
    })
    .then((gameBody) => {
        const fragment = document.createDocumentFragment();
        const children = [...gameBody.children];
        for (const child of children) {
            fragment.appendChild(child); 
        }

        viewport.removeAttribute('id');
        viewport.removeAttribute('rol');
        viewport.style.cssText = '';
        viewport.className = '';
        viewport.innerHTML = '';
        viewport.appendChild(fragment);

        ready.resolve(items);
    })
    .catch(e => ready.reject(e));