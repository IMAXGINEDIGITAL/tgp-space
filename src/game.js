import './game.css';
import {
    win,
    doc,
    Promise,
    defer,
    query,
    queryAll,
    getRect
} from './util';
import Scroller from './scroller';
import Stage from './stage';
import Galaxy from './galaxy';
import Cloud from './cloud';
import Star from './star';
import {
    StaticElements,
    ElementCount
} from './elements';
import Map from './map';
import Ticker from './ticker';

const preload = win.preload;

let items
let viewport;
let scroller;
let ticker;
let stage;
let galaxy;
let cloud;
let star;
let staticElements;
let elementCount;
let map;

preload
    .then(e => { // stage
        items = e;
        viewport = doc.body;
        viewport.addEventListener('touchmove', e => e.preventDefault());
        ticker = new Ticker();
    })
    .then(() => {
        stage = new Stage(viewport);
        return stage.ready();
    })
    .then(() => {
        scroller = new Scroller(stage.width, stage.height, stage.vw, stage.vh, 0.3);
        return scroller.ready();
    })
    .then(() => {
        const promises = [];

        galaxy = new Galaxy(stage, items);
        promises.push(galaxy.ready());

        staticElements = new StaticElements(stage, items);
        promises.push(staticElements.ready());

        cloud = new Cloud(stage, items);
        promises.push(cloud.ready());

        star = new Star(stage, items);
        promises.push(star.ready());

        return Promise.all(promises);
    })
    .then(() => { // render
        let scrollX = 0;
        let scrollY = 0;

        scroller.on('scrolling', e => {
            scrollX = e.x;
            scrollY = e.y;
        });

        let clearId;
        scroller.on('scrollend', e => {
            const tick = cloud.clear(e.x, e.y);
            clearId = ticker.add(tick);
        });

        // const starTick = star.roll();
        // const starId = ticker.add(starTick);

        ticker.on('aftertick', e => {
            let updated = false;

            if (scroller.isScrolling ||
                    ticker.has(clearId)) {
                stage.render.drawImage(galaxy.canvas, -scrollX, -scrollY);
                stage.render.drawImage(star.canvas, 0, 0);
                stage.render.drawImage(staticElements.canvas, -scrollX, -scrollY);
                stage.render.drawImage(cloud.canvas, -scrollX, -scrollY);
                updated = true;
            }

            updated && stage.commit();
        });
    })
    .then(() => { // map
        map = new Map(viewport, stage.hSlice, stage.vSlice);

        scroller.on('scrolling', e => {
            const xp = e.x / stage.width;
            const yp = e.y / stage.height;
            map.update(xp, yp);
        });

        scroller.on('scrollend', e => {
            const xp = e.x / stage.width;
            const yp = e.y / stage.height;
            map.clear(xp, yp);
        });

        return map.ready();
    })
    .then(() => { // elements
        elementCount = new ElementCount(viewport);
        return elementCount.ready();
    })
    .then(() => { // bone
        const boneX = stage.width / 2 - stage.vw / 2;
        const boneY = stage.height - stage.vh / 2;
        scroller.scrollTo(boneX, boneY);
        ticker.run();
    })

    