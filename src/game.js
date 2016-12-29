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
import HelloWorld from './helloWorld';
import Star from './star';
import Elements from './elements';
import Found from './found';
import Map from './map';
import Ticker from './ticker';
import Pop from './pop';
import Tip from './tip';
import Share from './share';
import Music from './music';
import textConfig from './textConfig';

const {
    assetsPreload: preload,
    assetsItems: items,
} = win;

let viewport = query(doc.body, '#game');
let scroller;
let ticker;
let stage;
let helloWorld;
let star;
let elements;
let found;
let map;
let pop;
let tip;
let share;
let music;

function showTip(config, data) {
    return tip.show({
        tip: config.tip,
        bgType: config.bgType
    });
}

function showPop(config, data) {
    scroller && (scroller.enable = false);

    const text = typeof config.text === 'function'
                    ? config.text(data) : config.text;

    return pop.popup({
        title: config.title,
        text: text,
        shareble: config.shareble,
        bgType: config.bgType,
        onleftclick: () => {
            Promise.all([
                pop.close(),
                share.show()
            ]).then(() => scroller.enable = true);
        },
        onrightclick: () => {
            pop.close().then(() => scroller.enable = true);
        },
        oncloseclick: () => {
            pop.close().then(() => scroller.enable = true);
        }
    })
}

function shareWx(data) {
    const n = data.n;
    let s;

    if (n >= 100) {
        s = `${n / 100}亿`;
    } else if (n >= 10) {
        s = `${n / 10}千万`;
    } else {
        s = `${n}百万`;
    }

    share.shareWx({
        title: '离开地表！和TGP去看看5000光年外的星辰大海',
        desc: `茫茫游戏宇宙深不见底，我${data.m * 60 + data.n}秒就滑了${s}光年`,
        link: 'http://mp.imaxgine.com/tgp/space/index.html',
        imgUrl: 'http://mp.imaxgine.com/tgp/space/assets/logo.jpg'
    });
}

preload
    .then(() => { // prevent event
        viewport.addEventListener('touchstart', e => e.preventDefault());
        viewport.addEventListener('touchmove', e => e.preventDefault());
        viewport.addEventListener('touchend', e => e.preventDefault());
    })
    .then(() => { // music
        music = new Music(viewport, items);
        return music.ready();
    })
    .then(() => { // ticker
        ticker = new Ticker();
        ticker.run();
    })
    .then(() => { // helloworld
        helloWorld = new HelloWorld(viewport, items);
        return helloWorld.ready();
    })
    .then(() => { // stage
        stage = new Stage(viewport);
        return stage.ready();
    })
    .then(() => { // scroller
        const scrollSlowRatio = 1.8;
        scroller = new Scroller(stage.width, stage.height, stage.vw, stage.vh, scrollSlowRatio, stage.dpr);
        scroller.enable = false;
        return scroller.ready();
    })
    .then(() => { // things
        const promises = [];

        star = new Star(stage, items);
        promises.push(star.ready());

        elements = new Elements(stage, items);
        promises.push(elements.ready());

        return Promise.all(promises);
    })
    .then(() => { // render
        let firstRendered = false;
        let scrollX = 0;
        let scrollY = 0;
        let starRollY = stage.vh;
        let starRollSpeed = 0.4;
        let starRollId = ticker.add(() => {
            starRollY -= starRollSpeed;
            if (starRollY < 0) {
                starRollY = stage.vh;
            }
        });
        let showTextId;
        let showGlodId;
        let flyCoinId;
        let hoverSlice = stage.getHoverSlice(0, 0);
        let focusSlice = stage.getFocusSlice(stage.sliceWidth / 2, stage.sliceHeight / 2);

        scroller.on('scrollstart', e => {

        });

        scroller.on('scrolling', e => {
            scrollX = e.x;
            scrollY = e.y;
            hoverSlice = stage.getHoverSlice(scrollX, scrollY);
            focusSlice = stage.getFocusSlice(scrollX + stage.sliceWidth / 2, scrollY + stage.sliceHeight / 2);
        });

        scroller.on('scrollend', e => {
            if (focusSlice) {
                if (focusSlice.type >= 2) {
                    showTextId = ticker.add(elements.showText(focusSlice));
                }
            }
        });

        scroller.on('tap', e => {
            if (e.originalEvent.target === stage.canvas) {
                const tapFocusSlice = stage.getFocusSlice(e.ex, e.ey);

                if (tapFocusSlice) {
                    showGlodId = ticker.add(elements.showGold(tapFocusSlice));
                    ticker.end(showGlodId)
                            .then(() =>
                                flyCoinId = ticker.add(elements.flyCoin(tapFocusSlice))
                            );
                }
            }
        });

        ticker.on('aftertick', e => {
            found && found.update(
                stage.specialAmount,
                stage.specialFound,
                stage.totalAmount,
                stage.hoveredAmount
            );

            elements.drawImages(hoverSlice, focusSlice, scrollX, scrollY, e);

            stage.offscreenRender.clearRect(0, 0, stage.vw, stage.vh);
            stage.offscreenRender.drawImage(star.image, 0, starRollY, stage.vw, stage.vh, 0, 0, stage.vw, stage.vh);
            stage.offscreenRender.drawImage(elements.canvas, 0, 0, stage.vw, stage.vh, 0, 0, stage.vw, stage.vh);

            stage.render.clearRect(0, 0, stage.vw, stage.vh);
            stage.render.drawImage(stage.offscreenCanvas, 0, 0, stage.vw, stage.vh, 0, 0, stage.vw, stage.vh);
        });
    })
    .then(() => { // show helloworld
        const repeat = 3;
        let promise = Promise.resolve();

        for (let i = 0; i < repeat; i++) {
            promise = promise.then(() => {
                const tickerId = ticker.add(helloWorld.play());
                return ticker.end(tickerId);
            }).then(() => delay(500 + Math.random() * 200))
        }

        return promise.then(() =>
                helloWorld.start(() => music.play())
                );
    })
    .then(() => { // map
        map = new Map(viewport, stage.hSlice, stage.vSlice);

        let randomTextId;

        scroller.on('scrollstart', e => {
            if (randomTextId == null) {
                randomTextId = ticker.add(map.randomText());
            }
        });

        scroller.on('scrolling', e => {
            const xp = e.x / stage.width;
            const yp = e.y / stage.height;
            map.update(xp, yp);
        });

        scroller.on('scrollend', e => {
            const xp = e.x / stage.width;
            const yp = e.y / stage.height;
            map.clear(xp, yp);

            const focusSlice = stage.getFocusSlice(e.x + stage.sliceWidth / 2, e.y + stage.sliceHeight / 2);
            if (focusSlice && focusSlice.distance) {
                ticker.delete(randomTextId);
                randomTextId = null;

                map.text(focusSlice.distance);
            }
        });

        return map.ready();
    })
    .then(() => { // found
        found = new Found(viewport, items);

        found.on('update', ({
            found,
            amount,
            total,
            focus
        }) => {
            let config;
            let data = {};

            data.m = parseInt(ticker.elapsed / 1000 / 60);
            data.s = parseInt(ticker.elapsed / 1000 - 60 * data.m);
            data.n = found;

            shareWx(data);

            if (found === amount
                && focus === total) {
                config = textConfig['gg'];
            } else if (focus === total) {
                config = textConfig['blacksheepwall'];
            } else if (found === 1) {
                config = textConfig['gl'];
            } else {
                config = textConfig[`found${found}`];
            }

            if (config && !config.shown) {
                config.shown = true;
                if (config.type === 'tip') {
                    showTip(config, data);
                } else if (config.type === 'popup') {
                    showPop(config, data);
                }
            }
        });

        return found.ready();
    })
    .then(() => { // pop
        pop = new Pop(viewport);
        return pop.ready();
    })
    .then(() => { // tip
        tip = new Tip(viewport);
        return tip.ready();
    })
    .then(() => { // share
        share = new Share(viewport, items);
        return share.ready();
    })
    .then(() => { // bone
        const boneX = stage.width / 2 - stage.vw / 2;
        const boneY = stage.height - stage.vh / 2;
        scroller.enable = true;
        scroller.scrollTo(boneX, boneY);
    })
    // .then(() => delay(2000))
    .then(() => { // show guide
        // showTip(textConfig.found5);
        // showPop(textConfig.gg, {
        //     m: 1,
        //     s: 5,
        //     n: 6
        // });
    })