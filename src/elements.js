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

export class StaticElements extends CanvasImage {
    constructor(stage, items) {
        super(stage.vw, stage.vh);

        this.hSlice = stage.hSlice;
        this.vSlice = stage.vSlice;
        this.sliceWidth = stage.width / stage.hSlice;
        this.sliceHeight = stage.height / stage.vSlice;
        this.items = items;
    }

    drawImages(scrollX, scrollY) {
        let x = parseInt(scrollX / this.sliceWidth);
        let y = parseInt(scrollY / this.sliceHeight);
        let index = y * this.hSlice + x;

        const params = [];

        const pushParams = (index) => {
            const slice = this.slices[String(index)];
            params.push({
                x: slice.x - scrollX,
                y: slice.y - scrollY,
                width: slice.width,
                height: slice.height,
                img: this.slices[index].img
            });
        }

        if (this.slices[String(index)]) {
            pushParams(index)
        }

        if (x < 4 && this.slices[String(index + 1)]) {
            pushParams(index + 1);
        }

        if (y < 9 && this.slices[String(index + this.hSlice)]) {
            pushParams(index + this.hSlice);
        }

        if (x < 4 && y < 9 && this.slices[String(index + this.hSlice + 1)]) {
            pushParams(index + this.hSlice + 1);
        }

        this.draw(params);
    }

    ready() {
        const loaded = [];
        this.slices = {};

        Object.keys(this.items).filter(id => {
            return id.indexOf('static-') === 0;
        }).forEach(id => {
            const item = this.items[id];
            const index = parseInt(id.match(/^static-(\d+)$/)[1]);
            const deferred = defer();
            const image = new Image();
            image.onload = () => deferred.resolve();
            image.src = item.src;
            loaded.push(deferred.promise);

            let x = (index - 1) % this.hSlice;
            let y = parseInt((index - 1) / this.hSlice);

            this.slices[String(index - 1)] = {
                img: image,
                x: x * this.sliceWidth,
                y: y * this.sliceHeight,
                width: this.sliceWidth,
                height: this.sliceHeight
            }
        });

        return Promise.all(loaded);
    }
}

export class AnimeElements extends CanvasImage {
    constructor(stage, items) {
        super(stage.vw, stage.vh);

        this.hSlice = stage.hSlice;
        this.vSlice = stage.vSlice;
        this.sliceWidth = stage.width / stage.hSlice;
        this.sliceHeight = stage.height / stage.vSlice;
        this.items = items;
    }

    get amount() {
        return Object.keys(this.slices).length;
    }

    get found() {
        return Object.keys(this.slices).filter(i => this.slices[i].completed).length;
    }

    drawImages(scrollX, scrollY) {
        let x = parseInt(scrollX / this.sliceWidth);
        let y = parseInt(scrollY / this.sliceHeight);
        let index = y * this.hSlice + x;

        const params = [];
        const pushParams = (index) => {
            const slice = this.slices[String(index)];
            if (slice.frame < slice.imgs.length) {
                params.push({
                    x: slice.x - scrollX,
                    y: slice.y - scrollY,
                    width: slice.width,
                    height: slice.height,
                    img: slice.imgs[slice.frame]
                });
            }
        }

        if (this.slices[String(index)]) {
            pushParams(index)
        }

        if (x < 4 && this.slices[String(index + 1)]) {
            pushParams(index + 1);
        }

        if (y < 9 && this.slices[String(index + this.hSlice)]) {
            pushParams(index + this.hSlice);
        }

        if (x < 4 && y < 9 && this.slices[String(index + this.hSlice + 1)]) {
            pushParams(index + this.hSlice + 1);
        }

        this.draw(params);
    }

    play(ex, ey) {
        const x = parseInt(ex / this.sliceWidth);
        const y = parseInt(ey / this.sliceHeight);
        const index = y * this.hSlice + x;
        const slice = this.slices[String(index)];

        if (slice && slice.frame < slice.imgs.length && !slice.completed) {
            const duration = 1000;

            return ({
                delta,
                elapsed
            }) => {
                const count = slice.imgs.length;
                const frame = Math.floor(count * (elapsed / duration));

                if (frame < count) {
                    slice.frame = frame;
                } else {
                    slice.completed = true;
                    slice.frame = count - 1;
                    return true;
                }
            }
        }
    }

    ready() {
        const loaded = [];
        this.slices = {};

        Object.keys(this.items).filter(id => {
            return id.indexOf('anime-') === 0;
        }).forEach(id => {
            const item = this.items[id];
            const [index, frame] = id.match(/^anime-(\d+)-(\d+)$/)
                                    .slice(1, 3).filter(i => parseInt(i));

            const deferred = defer();
            const image = new Image();
            image.onload = () => deferred.resolve();
            image.src = item.src;
            loaded.push(deferred.promise);

            let x = (index - 1) % this.hSlice;
            let y = parseInt((index - 1) / this.hSlice);

            let slice = this.slices[String(index - 1)];
            if (!slice) {
                slice = this.slices[String(index - 1)] = {
                    imgs: [],
                    frame: 0,
                    x: x * this.sliceWidth,
                    y: y * this.sliceHeight,
                    width: this.sliceWidth,
                    height: this.sliceHeight
                }
            }
            slice.imgs[frame - 1] = image;
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