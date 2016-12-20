import './elements.css';
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
    raf,
    caf
} from './util';
import Event from './event';
import {
    CanvasImage
} from './canvas';

const originSliceWidth = 750;
const originSliceHeight = 1334

export class Elements extends CanvasImage {
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
            if (!shown) {
                const delay = 1500;
                const duration = 1000;

                return ({
                    delta,
                    elapsed
                }) => {
                    if (elapsed <= delay) {
                        slice.textAlpha = 0;
                    } else if (elapsed - delay <= duration) {
                        slice.textAlpha = (elapsed - delay) / duration;
                    } else {
                        slice.textAlpha = 1;
                        focus.shown = true;
                    }
                    return focus.shown;
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
            if (!found) {
                const duration = 1000;

                return ({
                    delta,
                    elapsed
                }) => {
                    if (elapsed <= duration) {
                        slice.goldY = y1 + (y2 - y1) * elapsed / duration;
                    } else {
                        slice.goldY = y2;
                        focus.found = true;
                    }

                    return focus.found;
                }
            }
        }
    }

    drawImages(hovers, focus, scrollX, scrollY) {
        const params = [];
        if (hovers) {
           for (const hover of hovers) {
                const {
                    type,
                    index
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
                        goldImg
                    } = slice;

                    canvasImage.render.clearRect(0, 0, width, height);

                    if (type >= 1) {
                        canvasImage.render.drawImage(staticImg, 0, 0, width, height);
                    }

                    if (type >= 2) {
                        canvasImage.render.save();
                        canvasImage.render.globalAlpha = textAlpha || 0;
                        canvasImage.render.drawImage(textImg, 0, 0, width, height);
                        canvasImage.render.restore();
                    }

                    if (type >= 3
                            && slice.goldY != null) {
                        const goldY = slice.goldY;
                        const y = goldY * this.scaleRatio;
                        canvasImage.render.drawImage(goldImg, 0, goldY, originSliceWidth, originSliceHeight - goldY, 0, y, width, height - y);
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
        this.slices = {};

        Object.keys(this.items).filter(id => {
            return id.match(/^i\d+\-e\-(s|t|g)/);
        }).forEach(id => {
            const item = this.items[id];
            const [, index, type] = id.match(/^i(\d+)\-e\-(s|t|g)$/);

            const x = Number(index) % this.hSlice;
            const y = parseInt(Number(index) / this.hSlice);
            let slice = this.slices[String(index)];
            if (!slice) {
                slice = this.slices[String(index)] = {
                    canvasImage: new CanvasImage(this.sliceWidth, this.sliceHeight),
                    x: x * this.sliceWidth,
                    y: y * this.sliceHeight,
                    width: this.sliceWidth,
                    height: this.sliceHeight,
                }
            }
            
            if (type === 's') {
                slice.staticImg = item.obj;
            } else if (type === 't') {
                slice.textImg = item.obj;
            } else if (type === 'g') {
                slice.goldImg = item.obj;
            }
        });

        return Promise.all(loaded);
    }
}

export class ElementCount extends Event {
    constructor(viewport, items) {
        super();

        this.step = 5;
        this.wrapEl = query(viewport, '#elements-count');
        this.textEl = query(this.wrapEl, '.text');
        this.textNumberEl = query(this.textEl, '.number');
        this.textTipEl = query(this.textEl, '.tip');
        this.textBgEl = query(this.textEl, '.bg');
        this.barEl = query(this.wrapEl, '.progress .bar');
        this.found = 0;
        this.amount = 0;
        this.items = items;
    }

    update(amount, found) {
        if (found !== this.found 
            || amount !== this.amount) {
            this.textNumberEl.textContent = `${found}/${amount}`;
            this.barEl.style.width = `${found/amount*100}%`;

            if (found !== 0 && found % this.step === 0) {
                this.emit('found', {
                    found: found,
                    amount: amount,
                    time: parseInt(found / this.step)
                });
            }
            this.found = found;
            this.amount = amount;
        }
    }

    show({
        tip,
        bgType
    }) {
        const items = this.items;

        return new Promise((resolve, reject) => {
            this.textTipEl.innerHTML = tip;
            this.textBgEl.className = `bg bg${bgType}`;
            this.textBgEl.style.backgroundImage = 
                `url(${items['tipBg' + bgType].src})`;
            this.wrapEl.className = 'open';

            delay(400)
                .then(() => {
                    this.textTipEl.style.display = '';
                    this.textBgEl.style.display = '';
                    return delay(3000);
                })
                .then(() => {
                    this.textTipEl.style.display = 'none';
                    this.textBgEl.style.display = 'none';
                    this.wrapEl.className = '';
                    return delay(400);
                })
                .then(() => {
                    resolve();
                })
        });
    }

    ready() {
        return new Promise((resolve, reject) => {
            this.wrapEl.style.display = '';
            resolve(this);
        });
    }
}