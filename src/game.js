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
import Opening from './opening';
import HelloWorld from './helloWorld';
import Cloud from './cloud';
import Star from './star';
import {
    StaticElements,
    AnimeElements,
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

let viewport = query(doc.body, '#game');
let scroller;
let ticker;
let stage;
let opening;
let helloWorld;
let cloud;
let star;
let staticElements;
let animeElements;
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

    pop && pop.popup({
        title: config.title,
        text: config.text,
        shareble: true,
        bgType: config.bgType,
        onleftclick: () => {
            // pop.close().then(() => scroller.enable = true);
        },
        onrightclick: () => {
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
    .then(() => { // opening
        opening = new Opening(viewport, items);
        return opening.ready()
                .then(() => {
                    const frameId = ticker.add(opening.play());
                    const starId = ticker.add(opening.star());

                    return Promise.all([
                        ticker.end(frameId),
                        ticker.end(starId)
                    ]);
                })
                .then(() => {
                    return opening.chicken().then(() => delay(2000));
                })
                .then(() => opening.ending())
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
        scroller = new Scroller(stage.width, stage.height, stage.vw, stage.vh, 0.3);
        scroller.enable = false;
        return scroller.ready();
    })
    .then(() => { // things
        const promises = [];

        // staticElements = new StaticElements(stage, items);
        // promises.push(staticElements.ready());

        // animeElements = new AnimeElements(stage, items);
        // promises.push(animeElements.ready());

        cloud = new Cloud(stage, items);
        promises.push(cloud.ready());

        star = new Star(stage, items);
        promises.push(star.ready());

        return Promise.all(promises);
    })
    .then(() => { // render
        let firstRendered = false;
        let scrollX = 0;
        let scrollY = 0;
        // let playAnimeId;
        let clearCloudId;
        let starRollY = stage.vh;
        let starRollId = ticker.add(() => {
            starRollY -= starRollSpeed;
            if (starRollY < 0) {
                starRollY = stage.vh;
            }
        });
        let starRollSpeed = 1;

        scroller.on('scrollstart', e => {
            if (clearCloudId) {
                ticker.delete(clearCloudId);
                clearCloudId = null;
            }

            // if (playAnimeId) {
            //     ticker.delete(playAnimeId);
            //     playAnimeId = null;
            // }
        });

        scroller.on('scrolling', e => {
            scrollX = e.x;
            scrollY = e.y;
            // const [hover, related] = stage.getHoverSlice(scrollX, scrollY);
            // staticElements.drawImages(scrollX, scrollY);
            // animeElements.drawImages(scrollX, scrollY);
            // cloud.drawImages([hover, ...related]);
        });

        scroller.on('scrollend', e => {
            const focusSlice = stage.getFocusSlice(scrollX, scrollY);
            if (focusSlice) {
                clearCloudId = ticker.add(cloud.clear(focusSlice));
            }
        });

        scroller.on('tap', e => {
            // if (e.originalEvent.target === stage.canvas) {
            //     playAnimeId = ticker.add(animeElements.play(e.ex, e.ey));
            // }
        });

        ticker.on('aftertick', e => {
            elementCount && elementCount.update(stage.specialAmount, stage.specialFound);

            const hoverSlice = stage.getHoverSlice(scrollX, scrollY);
            // if (!firstRendered
            //         || scroller.isScrolling
            //         // || ticker.has(playAnimeId)
            //         || ticker.has(clearCloudId)
            //         || ticker.has(starRollId)
            //     ) {

                // if (ticker.has(playAnimeId)) {
                //     animeElements.drawImages(scrollX, scrollY);
                // }

                // if (!firstRendered
                        // || ticker.has(clearCloudId)) {
                    cloud.drawImages(hoverSlice, scrollX, scrollY);
                // }

                // if (!firstRendered
                        // || scroller.isScrolling
                //         || ticker.has(playAnimeId)
                        // || ticker.has(clearCloudId)) {
                    stage.offscreenRender.clearRect(0, 0, stage.vw, stage.vh);
                //     stage.offscreenRender.drawImage(staticElements.canvas, 0, 0, stage.vw, stage.vh, 0, 0, stage.vw, stage.vh);
                //     stage.offscreenRender.drawImage(animeElements.canvas, 0, 0, stage.vw, stage.vh, 0, 0, stage.vw, stage.vh);
                    stage.offscreenRender.drawImage(star.image, 0, starRollY, stage.vw, stage.vh, 0, 0, stage.vw, stage.vh);
                    stage.offscreenRender.drawImage(cloud.canvas, 0, 0, stage.vw, stage.vh, 0, 0, stage.vw, stage.vh);
                // }

                stage.render.clearRect(0, 0, stage.vw, stage.vh);
                stage.render.drawImage(stage.offscreenCanvas, 0, 0, stage.vw, stage.vh, 0, 0, stage.vw, stage.vh);
            // }
        });
    })
    .then(() => { // show helloworld
        const tickerId = ticker.add(helloWorld.play());
        return ticker.end(tickerId)
                    .then(() => delay(2000))
                    .then(() => helloWorld.ending());
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
            const focusSlice = stage.getFocusSlice(e.x, e.y);
            if (focusSlice && focusSlice.distance) {
                map.text(focusSlice.distance);
            }
        });

        return map.ready();
    })
    .then(() => { // pop
        pop = new Pop(viewport);
        return pop.ready();
    })
    .then(() => { // elements count
        elementCount = new ElementCount(viewport, items);

        elementCount.on('found', ({
            found,
            amount,
            time
        }) => {
            const config = textConfig[`found${found}`];

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
    .then(() => { // show guide
        showTip(textConfig.guide);
    })