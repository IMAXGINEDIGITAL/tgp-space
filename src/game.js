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
import Stage from './stage';
import Map from './map';
import Cloud from './cloud';
import Elements from './elements';

const preload = win.preload;

let items
let viewport;
let stage;
let map;
let cloud;
let elements;

preload
    .then(e => { // stage
        items = e;

        viewport = doc.body;
        viewport.addEventListener('touchmove', e => e.preventDefault());

        stage = new Stage(viewport);
        return stage.ready();
    })
    .then(() => { // map
        map = new Map(viewport, stage.hSlice, stage.vSlice);

        stage.on('scrolling', e => {
            const xp = e.x / stage.width;
            const yp = e.y / stage.height;
            map.update(xp, yp);
        });

        stage.on('scrollend', e => {
            const xp = e.x / stage.width;
            const yp = e.y / stage.height;
            map.update(xp, yp);
            map.clear(xp, yp);
        });

        return map.ready();
    })
    .then(() => { // cloud
        const image = new Image();
        image.loaded = defer();
        image.onload = () => image.loaded.resolve();
        image.src = items.cloud.src;

        cloud = new Cloud(viewport, image, stage.width, stage.height, stage.hSlice, stage.vSlice);

        stage.on('scrolling', e => {
            const xp = e.x / stage.width;
            const yp = e.y / stage.height;
            cloud.update(xp, yp);
        });

        stage.on('scrollend', e => {
            const xp = e.x / stage.width;
            const yp = e.y / stage.height;
            cloud.clear(xp, yp);
        });

        return image.loaded.promise.then(() => cloud.ready());
    })
    .then(() => { // bone
        const {width: vw, height: vh} = getRect(viewport);
        stage.scrollTo(stage.width / 2 - vw / 2, stage.height - vh);
    })
    .then(() => { // elements
        elements = new Elements(viewport, stage.width, stage.height, stage.hSlice, stage.vSlice);
        return elements.ready();
    })