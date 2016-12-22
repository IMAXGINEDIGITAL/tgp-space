import * as Bezier from 'amfe-cubicbezier';
import {
    win,
    doc,
    Promise,
    defer,
    delay,
    query,
    queryAll,
    getRect,
    getDistance,
    appendStyle,
    raf,
    caf
} from './util';
import Event from './event';
import {
    CanvasImage
} from './canvas';

const originSliceWidth = 750;
const originSliceHeight = 1334

export default class Elements extends CanvasImage {
    constructor(stage, items) {
        super(stage.vw, stage.vh);

        this.hSlice = stage.hSlice;
        this.vSlice = stage.vSlice;
        this.sliceWidth = stage.sliceWidth;
        this.sliceHeight = stage.sliceHeight;
        this.items = items;
        this.scaleRatio = this.sliceWidth / originSliceWidth;
    }

    showText(focus) {
        const {
            shown,
            index
        } = focus;

        const slice = this.slices[String(index)];
        if (slice) {
            if (shown == null) {
                const delay = 1500;
                const duration = 1000;

                return ({
                    delta,
                    elapsed
                }) => {
                    if (elapsed <= delay) {
                        slice.textAlpha = 0;
                        focus.shown = 1;
                    } else if (elapsed - delay <= duration) {
                        slice.textAlpha = (elapsed - delay) / duration;
                        focus.shown = 1;
                    } else {
                        slice.textAlpha = 1;
                        focus.shown = 2;
                    }

                    return focus.shown === 2;
                }
            }
        }
    }

    showGold(focus) {
        const {
            found,
            index,
            y1,
            y2
        } = focus;

        const slice = this.slices[String(index)];
        if (slice) {
            if (found == null) {
                const duration = 1000;

                return ({
                    delta,
                    elapsed
                }) => {
                    if (elapsed <= duration) {
                        slice.goldY = y1 + (y2 - y1) * elapsed / duration;
                        focus.found = 1;
                    } else {
                        slice.goldY = y2;
                        focus.found = 2;
                    }

                    return focus.found === 2;
                }
            }
        }
    }

    flyCoin(focus) {
        const {
            noCoin,
            index,
            coinX,
            coinY
        } = focus;

        const slice = this.slices[String(index)];
        if (slice) {
            if (!noCoin) {
                const coin = slice.coin;
                const duration = 500;
                const endX = 650;
                const endY = 50;

                return ({
                    delta,
                    elapsed
                }) => {
                    if (elapsed <= duration) {
                        const percent = elapsed / duration;
                        coin.x = coinX + (endX - coinX) * percent;
                        coin.y = coinY + (endY - coinY) * percent;
                        coin.scale += delta / duration * 5;
                        coin.slow -= delta / duration * 5;
                    } else {
                        coin.x = endX;
                        coin.y = endY;
                        focus.noCoin = true;
                    }

                    return focus.noCoin;
                }
            }
        }
    }
    
    drawImages(hovers, focus, scrollX, scrollY, e) {
        const params = [];
        if (hovers) {
           for (const hover of hovers) {
                const {
                    type,
                    index,
                    y1,
                    y2,
                    coinX,
                    coinY,
                    noCoin,
                    isEarth
                } = hover;

                const slice = this.slices[String(index)];
                if (slice) {
                    const {
                        x,
                        y,
                        width,
                        height,
                        canvasImage,
                        staticImg,
                        textImg,
                        textAlpha = 0,
                        goldImg,
                        coin,
                        flow
                    } = slice;

                    let offsetY = 0;

                    if (!isEarth) {
                        offsetY = flow.range[0] + (flow.range[1] - flow.range[0]) * flow.ease(flow.elapsed / flow.duration);
                        if (flow.elapsed > flow.duration) {
                            offsetY = flow.range[1];
                            flow.range = [flow.range[1], flow.range[0]];
                            flow.ease = flow.ease === Bezier.easeIn ? Bezier.easeOut : Bezier.easeIn;
                            flow.elapsed = 0;
                        } else {
                            flow.elapsed += e.delta;
                        }
                    }

                    canvasImage.render.clearRect(0, 0, width, height);

                    if (type >= 1) {
                        canvasImage.render.drawImage(staticImg, 0, 0 + offsetY, width, height);
                    }

                    if (type >= 2) {
                        canvasImage.render.save();
                        canvasImage.render.globalAlpha = textAlpha;
                        canvasImage.render.drawImage(textImg, 0, 0, width, height);
                        canvasImage.render.restore();
                    }

                    if (type >= 3) {

                        if (slice.goldY != null) {
                            const goldY = slice.goldY;
                            const y = goldY * this.scaleRatio;
                            canvasImage.render.drawImage(goldImg, 0, goldY, originSliceWidth, originSliceHeight - goldY, 0, y + offsetY, width, height - y);
                        }

                        if (this.coins.length
                                && !noCoin) {
                            let {
                                index,
                                slow,
                                scale,
                                x = coinX,
                                y = coinY
                            } = coin;

                            slow = slow < 1 ? 1 : slow;
                            scale = scale > 10 ? 10 : scale;

                            const coinImg = this.coins[parseInt(index / slow)];
                            if (coinImg) {
                                const {width, height} = coinImg;
                                canvasImage.render.drawImage(coinImg, x * this.scaleRatio, y * this.scaleRatio, width / scale, height / scale);
                            }
                            coin.index = (coin.index + 1) % (this.coins.length * slow);
                        }
                        
                    }

                    params.push({
                        x: x - scrollX,
                        y: y - scrollY,
                        width: width,
                        height: height,
                        img: canvasImage.canvas
                    });
                }
            }
        }

        this.draw(params);
    }

    ready() {
        const loaded = [];
        this.coins = [];
        this.slices = {};

        Object.keys(this.items).filter(id =>
            id.match(/^coin\d$/)
        ).forEach(id => {
            this.coins.push(this.items[id].obj);
        });

        Object.keys(this.items).filter(id => {
            return id.match(/^i\d+\-e\-(s|w|g)/);
        }).forEach(id => {
            const item = this.items[id];
            const [, index, type] = id.match(/^i(\d+)\-e\-(s|w|g)$/);

            const x = Number(index) % this.hSlice;
            const y = parseInt(Number(index) / this.hSlice);
            let slice = this.slices[String(index)];
            if (!slice) {
                slice = this.slices[String(index)] = {
                    coin: {
                        index: 0,
                        slow: 8,
                        scale: 5
                    },
                    flow: {
                        duration: 800,
                        elapsed: 0,
                        range: [0, 10],
                        ease: Bezier.easeIn
                    },
                    canvasImage: new CanvasImage(this.sliceWidth, this.sliceHeight),
                    x: x * this.sliceWidth,
                    y: y * this.sliceHeight,
                    width: this.sliceWidth,
                    height: this.sliceHeight,
                }
            }
            
            if (type === 's') {
                slice.staticImg = item.obj;
            } else if (type === 'w') {
                slice.textImg = item.obj;
            } else if (type === 'g') {
                slice.goldImg = item.obj;
            }
        });

        return Promise.all(loaded);
    }
}