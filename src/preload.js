import './preload.css';
import {
    win,
    doc,
    domready,
    Promise,
    createjs
} from './util';

const TEMPLATE = `
    <div class="bg-light"></div>
    <div class="logo"></div>
    <div class="light-lazer"></div>
    <div class="light-point"></div>
    <div class="human"></div>
    <div class="progress">已加载<b>20</b>%</div>
`;

const ready = domready();

const loadPreloadManifest = () => new Promise((resolve, reject) => {
    const queue = new createjs.LoadQueue(true);

    queue.on('fileload', e => {
        const {item} = e;

        const el = doc.querySelector(`.${item.id}`);
        el.style.backgroundImage = `url(${item.src})`;
    });

    const progressTextEl = doc.querySelector('.progress b');

    queue.on('progress', e => {
        const {
            loaded,
            total
        } = e;

        const percent = (loaded / total).toFixed(2);
        const all = Math.round(percent * 30 + 20);
        progressTextEl.textContent = String(all);
    });

    queue.on('error', reject);

    queue.on('complete', resolve);

    queue.loadManifest({
        path: 'assets/preload/',
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

    if (percent >= 0.6 && percent < 0.9) {
        lightPointEl.className = 'light-point anime';
        lightLazerEl.className = 'light-lazer anime';
    } else if (percent >= 0.9) {
        lightPointEl.className = 'light-point anime end';
        lightLazerEl.className = 'light-lazer anime end';
    }
}

let logoEl;
function processLogo(percent) {
    logoEl = logoEl || doc.querySelector('.logo');
    if (percent >= 0.9 && percent < 1) {
        logoEl.className = 'logo anime';
    } else if (percent >= 1) {
        logoEl.className = 'logo anime end';
    }
}

const loadGameManifest = () => new Promise((resolve, reject) => {
    const queue = new createjs.LoadQueue(true);

    const progressTextEl = doc.querySelector('.progress b');

    queue.on('progress', e => {
        const {
            loaded,
            total
        } = e;

        const percent = (loaded / total).toFixed(2);
        const all = Math.round(percent * 50 + 50);
        progressTextEl.textContent = String(all);
        processBackground(percent);
        processLight(all / 100);
        processLogo(all / 100);
    });

    queue.on('error', reject);

    queue.on('complete', resolve);

    queue.loadManifest({
        path: 'assets/game/',
        manifest: [
            'galaxy-1.jpg',
            'galaxy-2.jpg',
            'galaxy-3.jpg'
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
    .then(() => {
        doc.body.setAttribute('id', 'preload');
        doc.body.className = 'bg-dark';
        doc.body.innerHTML = TEMPLATE;

        return loadPreloadManifest();
    })
    .then(() => {

        return loadGameManifest();
    })
    .then(() => window.startGame);


