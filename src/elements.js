import './elements.css';
import {
    win,
    doc,
    Promise,
    defer,
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
        this.slicehHeight = stage.height / stage.vSlice;
        this.items = items;
    }

    drawImages(scrollX, scrollY) {
        let x = parseInt(scrollX / this.sliceWidth);
        let y = parseInt(scrollY / this.slicehHeight);
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

            let x = (index - 1) % this.hSlice;
            let y = parseInt((index - 1) / this.hSlice);

            this.slices[String(index - 1)] = {
                img: image,
                x: x * this.sliceWidth,
                y: y * this.slicehHeight,
                width: this.sliceWidth,
                height: this.slicehHeight
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
        this.slicehHeight = stage.height / stage.vSlice;
        this.items = items;
    }

    drawImages(scrollX, scrollY) {
        let x = parseInt(scrollX / this.sliceWidth);
        let y = parseInt(scrollY / this.slicehHeight);
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
        const y = parseInt(ey / this.slicehHeight);
        const index = y * this.hSlice + x;
        const slice = this.slices[String(index)];

        if (slice && slice.frame < slice.imgs.length) {
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

            let x = (index - 1) % this.hSlice;
            let y = parseInt((index - 1) / this.hSlice);

            let slice = this.slices[String(index - 1)];
            if (!slice) {
                slice = this.slices[String(index - 1)] = {
                    imgs: [],
                    frame: 0,
                    x: x * this.sliceWidth,
                    y: y * this.slicehHeight,
                    width: this.sliceWidth,
                    height: this.slicehHeight
                }
            }
            slice.imgs[frame - 1] = image;
        });

        return Promise.all(loaded);
    }
}

export class ElementCount {
    constructor(viewport) {
        this.countEl = query(viewport, '#elements-count');
        this.elementAmout = 50;
        this.findedCount = 0;
    }

    update() {
        this.countEl.textContent = `${this.findedCount}/${this.elementAmout}`;
    }

    ready() {
        return new Promise((resolve, reject) => {
            this.update();
            resolve(this);
        });
    }
}