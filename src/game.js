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
    AnimeElements,
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
let starRollSpeed = 1;
let staticElements;
let animeElements;
let elementCount;
let map;
let pop;
let popStartDefer;

preload
    .then(e => { // stage
        items = e;
        viewport = query(doc.body, 'div[bodywrap]');
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
        scroller.enable = false;
        return scroller.ready();
    })
    .then(() => {
        const promises = [];

        staticElements = new StaticElements(stage, items);
        promises.push(staticElements.ready());

        animeElements = new AnimeElements(stage, items);
        promises.push(animeElements.ready());

        cloud = new Cloud(stage, items);
        promises.push(cloud.ready());

        star = new Star(stage, items);
        promises.push(star.ready());

        return Promise.all(promises);
    })
    .then(() => { // render
        let scrollX = 0;
        let scrollY = 0;
        let playAnimeId;
        let clearCloudId;
        let starYRoll = stage.vh;
        let starRollId;

        scroller.on('scrollstart', e => {
            if (clearCloudId) {
                ticker.delete(clearCloudId);
                clearCloudId = null;
            }

            if (playAnimeId) {
                ticker.delete(playAnimeId);
                playAnimeId = null;
            }
        });

        scroller.on('scrolling', e => {
            scrollX = e.x;
            scrollY = e.y;
            staticElements.drawImages(scrollX, scrollY);
            animeElements.drawImages(scrollX, scrollY);
            cloud.drawImages(scrollX, scrollY);
        });

        scroller.on('scrollend', e => {
            clearCloudId = ticker.add(cloud.clear(e.x + stage.vw / 2, e.y + stage.vh / 2));
        });

        scroller.on('tap', e => {
            if (e.originalEvent.target === stage.canvas) {
                playAnimeId = ticker.add(animeElements.play(e.ex, e.ey));
            }
        });

        starRollId = ticker.add(() => {
            starYRoll -= starRollSpeed;
            if (starYRoll < 0) {
                starYRoll = stage.vh;
            }
        });

        ticker.on('aftertick', e => {
            elementCount.update(animeElements.amount, animeElements.found);

            if (scroller.isScrolling ||
                    ticker.has(playAnimeId) ||
                    ticker.has(clearCloudId) ||
                    ticker.has(starRollId)) {
                stage.render.clearRect(0, 0, stage.vw, stage.vh);
                stage.render.drawImage(star.image, 0, starYRoll, stage.vw, stage.vh, 0, 0, stage.vw, stage.vh);

                if (ticker.has(playAnimeId)) {
                    animeElements.drawImages(scrollX, scrollY);
                }

                if (ticker.has(clearCloudId)) {
                    cloud.drawImages(scrollX, scrollY);
                }

                if (scroller.isScrolling ||
                        ticker.has(playAnimeId) ||
                        ticker.has(clearCloudId)) {
                    stage.offscreenRender.clearRect(0, 0, stage.vw, stage.vh);
                    stage.offscreenRender.drawImage(staticElements.canvas, 0, 0, stage.vw, stage.vh, 0, 0, stage.vw, stage.vh);
                    stage.offscreenRender.drawImage(animeElements.canvas, 0, 0, stage.vw, stage.vh, 0, 0, stage.vw, stage.vh);
                    stage.offscreenRender.drawImage(cloud.canvas, 0, 0, stage.vw, stage.vh, 0, 0, stage.vw, stage.vh);
                }

                stage.render.drawImage(stage.offscreenCanvas, 0, 0, stage.vw, stage.vh, 0, 0, stage.vw, stage.vh);
                stage.render.drawImage(cloud.canvas, 0, 0, stage.vw, stage.vh, 0, 0, stage.vw, stage.vh);
            }

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
    .then(() => {
        return popStartDefer.promise;
    })
    .then(() => { // bone
        const boneX = stage.width / 2 - stage.vw / 2;
        const boneY = stage.height - stage.vh / 2;
        scroller.enable = true;
        scroller.scrollTo(boneX, boneY);
    })
    .then(() => { // run
        ticker.run();
    })
    .then(() => { // galaxy event
        let firstEvent = false;
        let secondEvent = false;

        scroller.on('scrolling', e => {
            if (!firstEvent && e.y < stage.vh * 6) {
                firstEvent = true;
                scroller.enable = false;
                starRollSpeed = 4;

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

        elementCount.on('found', e => {
            scroller.enable = false;

            const {time} = e;
            const message = [
                '您发现了被隐藏在宇宙中的秘密，继续探索更大的宇宙世界吧。',
                '您已熟练掌握了在宇宙中寻找乐趣的方式，继续探索将有惊喜等着您。',
                '您离成功就差几次滑屏的距离了，继续探索就能收获惊喜。',
                '恭喜您已寻找到宇宙中所有的小秘密，登录TGP发现更大的游戏世界！'
            ][time - 1];

            pop.popup({
                message,
                btnText: '分享',
                onclose: () => {
                    scroller.enable = true;
                },
                onclick: () => {
                    scroller.enable = true;
                }
            })
        });

        map.on('open', e => {
            scroller.enable = false;

            pop.popup({
                message: `现在您已经探测了（${(cloud.completing * 100).toFixed(1)}）%的世界，还有更辽阔的世界等着您去发现。`,
                btnText: '继续',
                onclick: () => scroller.enable = true
            });
        });
    })

    