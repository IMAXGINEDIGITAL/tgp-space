import './game.css';
import {
    win,
    doc,
    Promise,
    defer,
    query,
    queryAll,
    getRect,
    delay
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
import Pop from './pop';

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
let pop;
let popStartDefer;

preload
    .then(e => { // stage
        items = e;
        viewport = doc.body;
        viewport.addEventListener('touchstart', e => e.preventDefault());
        viewport.addEventListener('touchmove', e => e.preventDefault());
        viewport.addEventListener('touchend', e => e.preventDefault());
        ticker = new Ticker();
    })
    .then(() => {
        pop = new Pop(viewport);
        return pop.ready();
    })
    .then(() => {
        popStartDefer = defer();
        return pop.popup({
            message: '浩瀚的宇宙之旅即将开始，让我们来一场说走就走的旅行！',
            btnText: '开始旅行',
            onclick: () => popStartDefer.resolve()
        });
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
        let clearCloudId;
        let starYRoll = stage.vh;
        let starRollId;

        scroller.on('scrollstart', e => {
            if (clearCloudId) {
                ticker.delete(clearCloudId);
                clearCloudId = null;
            }
        });

        scroller.on('scrolling', e => {
            scrollX = e.x;
            scrollY = e.y;
        });

        scroller.on('scrollend', e => {
            const tick = cloud.clear(e.x, e.y);
            clearCloudId = ticker.add(tick);
        });

        starRollId = ticker.add(() => {
            starYRoll--;
            if (starYRoll < 0) {
                starYRoll = stage.vh;
            }
        });

        ticker.on('aftertick', e => {
            let updated = false;

            if (scroller.isScrolling ||
                    ticker.has(clearCloudId) ||
                    ticker.has(starRollId)) {
                stage.render.clearRect(0, 0, stage.vw, stage.vh);
                stage.render.drawImage(star.image, 0, starYRoll, stage.vw, stage.vh, 0, 0, stage.vw, stage.vh);
                stage.render.drawImage(staticElements.image, scrollX, scrollY, stage.vw, stage.vh, 0, 0, stage.vw, stage.vh);
                stage.render.drawImage(cloud.canvas, scrollX, scrollY, stage.vw, stage.vh, 0, 0, stage.vw, stage.vh);
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
    .then(() => { // run
        ticker.run();
    })
    .then(() => {
        return popStartDefer.promise;
    })
    .then(() => { // bone
        const boneX = stage.width / 2 - stage.vw / 2;
        const boneY = stage.height - stage.vh / 2;
        scroller.scrollTo(boneX, boneY);
    })
    .then(() => { // galaxy event
        let firstEvent = false;
        let secondEvent = false;

        scroller.on('scrolling', e => {
            if (!firstEvent && e.y < stage.vh * 6) {
                firstEvent = true;
                scroller.enable = false;
                pop.popup({
                    message: '我们现在将飞出太阳系，让我们来加个速去发现更广阔的世界。',
                    btnText: '继续',
                    onclick() {
                        scroller.scale = 1.5;
                        scroller.enable = true;
                    }
                });
            }

            if (!secondEvent && e.y < stage.vh * 2) {
                secondEvent = true;
                scroller.enable = false;
                const wormholeEl = query(viewport, '#wormhole');
                wormholeEl.style.display = 'block';

                pop.popup({
                    message: '我们现已进入虫洞进行空间跳跃，请坐直身体！抓稳手机！let\'go！！！',
                    btnText: '跳跃',
                    onclick() {
                        const wormholeEl = query(viewport, '#wormhole');
                        wormholeEl.className = ' flyin';
                        delay(1000).then(() => {
                            scroller.scrollTo(0, stage.vh / 2);
                            wormholeEl.className = '';
                            wormholeEl.style.display = 'none';
                            scroller.enable = true;
                        })
                    }
                });
            }
        });
    })

    