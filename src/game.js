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
import Cloud from './cloud';
import Star from './star';
import {
    Elements,
    ElementCount
} from './elements';
import Map from './map';
import Ticker from './ticker';
import Pop from './pop';
import textConfig from './textConfig';

const {
    assetsPreload: preload,
    assetsItems: items,
} = win;

const scrollSlowRatio = 0.5;
let viewport = query(doc.body, '#game');
let scroller;
let ticker;
let stage;
let helloWorld;
let cloud;
let star;
let elements;
let elementCount;
let map;
let pop;

function showTip(config) {
    elementCount && elementCount.show({
        tip: config.tip,
        bgType: config.bgType
    });
}

function showPop(config) {
    scroller && (scroller.enable = false);

    return pop && pop.popup({
        title: config.title,
        text: config.text,
        shareble: config.shareble,
        bgType: config.bgType,
        onleftclick: () => {
            pop.close().then(() => scroller.enable = true);
        },
        onrightclick: () => {
            pop.close().then(() => scroller.enable = true);
        },
        oncloseclick: () => {
            pop.close().then(() => scroller.enable = true);
        }
    }) 
}

preload
    .then(() => { // prevent event
        viewport.addEventListener('touchstart', e => e.preventDefault());
        viewport.addEventListener('touchmove', e => e.preventDefault());
        viewport.addEventListener('touchend', e => e.preventDefault());
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
        scroller = new Scroller(stage.width, stage.height, stage.vw, stage.vh, scrollSlowRatio);
        scroller.enable = false;
        return scroller.ready();
    })
    .then(() => { // things
        const promises = [];

        star = new Star(stage, items);
        promises.push(star.ready());

        elements = new Elements(stage, items);
        promises.push(elements.ready());

        cloud = new Cloud(stage, items);
        promises.push(cloud.ready());

        return Promise.all(promises);
    })
    .then(() => { // render
        let firstRendered = false;
        let scrollX = 0;
        let scrollY = 0;
        let starRollY = stage.vh;
        let starRollId = ticker.add(() => {
            starRollY -= starRollSpeed;
            if (starRollY < 0) {
                starRollY = stage.vh;
            }
        });
        let starRollSpeed = 1;
        let showTextId;
        let showGlodId;
        let flyCoinId;
        let clearCloudId;
        let hoverSlice = stage.getHoverSlice(0, 0);
        let focusSlice = stage.getFocusSlice(stage.sliceWidth / 2, stage.sliceHeight / 2);

        scroller.on('scrollstart', e => {
            if (clearCloudId) {
                ticker.delete(clearCloudId);
                clearCloudId = null;
            }
        });

        scroller.on('scrolling', e => {
            scrollX = e.x;
            scrollY = e.y;
            hoverSlice = stage.getHoverSlice(scrollX, scrollY);
            focusSlice = stage.getFocusSlice(scrollX + stage.sliceWidth / 2, scrollY + stage.sliceHeight / 2);
        });

        scroller.on('scrollend', e => {
            if (focusSlice) {
                clearCloudId = ticker.add(cloud.clear(focusSlice));
                if (focusSlice.type >= 2) {
                    showTextId = ticker.add(elements.showText(focusSlice));
                }
            }
        });

        scroller.on('tap', e => {
            if (e.originalEvent.target === stage.canvas
                    && focusSlice) {
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
            elementCount && elementCount.update(
                stage.specialAmount,
                stage.specialFound,
                stage.totalAmount,
                stage.focusedAmount
            );

            elements.drawImages(hoverSlice, focusSlice, scrollX, scrollY);
            cloud.drawImages(hoverSlice, focusSlice, scrollX, scrollY);

            stage.offscreenRender.clearRect(0, 0, stage.vw, stage.vh);
            stage.offscreenRender.drawImage(star.image, 0, starRollY, stage.vw, stage.vh, 0, 0, stage.vw, stage.vh);
            stage.offscreenRender.drawImage(elements.canvas, 0, 0, stage.vw, stage.vh, 0, 0, stage.vw, stage.vh);
            stage.offscreenRender.drawImage(cloud.canvas, 0, 0, stage.vw, stage.vh, 0, 0, stage.vw, stage.vh);

            stage.render.clearRect(0, 0, stage.vw, stage.vh);
            stage.render.drawImage(stage.offscreenCanvas, 0, 0, stage.vw, stage.vh, 0, 0, stage.vw, stage.vh);
        });
    })
    .then(() => { // show helloworld
        const repeat = 8;
        let promise = Promise.resolve();

        for (let i = 0; i < repeat; i++) {
            promise = promise.then(() => {
                const tickerId = ticker.add(helloWorld.play());
                return ticker.end(tickerId);
            }).then(() => delay(500 + Math.random() * 500))
        }

        return promise.then(() => delay(1000))
                .then(() => helloWorld.ending());
    })
    .then(() => { // pop
        pop = new Pop(viewport);
        return pop.ready();
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
            
            const focusSlice = stage.getFocusSlice(e.x + stage.sliceWidth / 2, e.y + stage.sliceHeight / 2);
            if (focusSlice && focusSlice.distance) {
                map.text(focusSlice.distance);
            }
        });

        return map.ready();
    })
    .then(() => { // elements count
        elementCount = new ElementCount(viewport, items);

        elementCount.on('update', ({
            found,
            amount,
            total,
            focus
        }) => {
            let config;

            if (found === amount
                && focus === total) {
                config = textConfig['gg'];
            } else if (focus === total) {
                config = textConfig['blacksheepwall'];
            } else {
                config = textConfig[`found${found}`];
            }


            if (config) {
                if (config.type === 'tip') {
                    showTip(config);
                } else if (config.type === 'popup') {
                    showPop(config);  
                }
            }
        });

        return elementCount.ready();
    })
    .then(() => { // bone
        const boneX = stage.width / 2 - stage.vw / 2;
        const boneY = stage.height - stage.vh / 2;
        scroller.enable = true;
        scroller.scrollTo(boneX, boneY);
    })
    .then(() => delay(2000))
    .then(() => { // show guide
        return showPop(textConfig.gl);
    })