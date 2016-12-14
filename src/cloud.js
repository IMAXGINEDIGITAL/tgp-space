import {
    win,
    doc,
    Promise,
    defer,
    query,
    queryAll,
    getRect,
    getDistance
} from './util';
import {
    CanvasImage
} from './canvas';

export default class Cloud extends CanvasImage {
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
            pushParams(index);
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

        params.push({
            img: this.maskImg,
            x: 0,
            y: 0,
            width: this.sliceWidth,
            height: this.sliceHeight
        });

        this.draw(params);
    }

    clear(ex, ey) {
        const x = parseInt(ex / this.sliceWidth);
        const y = parseInt(ey / this.sliceHeight);
        const dx = parseInt(ex % this.sliceWidth);
        const dy = parseInt(ey % this.sliceHeight);
        if (dx < this.sliceWidth * 0.25 || dx > this.sliceWidth * 0.75
                || dy < this.sliceHeight * 0.25 || dy > this.sliceHeight * 0.75) {
            return;
        }

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
        this.maskImg = new Image();
        const loaded = [
            new Promise((resolve, reject) => {
                this.maskImg.onload = () => resolve();
                this.maskImg.src = this.items['cloud-mask'].src;
            })
        ];
        const imgs = [];
        this.slices = {};

        Object.keys(this.items).filter(id => {
            return id.match(/cloud-\d+/);
        }).forEach(id => {
            const item = this.items[id];
            const frame = parseInt(id.match(/^cloud-(\d+)$/)[1]);

            const deferred = defer();
            const image = new Image();
            image.onload = () => deferred.resolve();
            image.src = item.src;
            loaded.push(deferred.promise);
            imgs[frame - 1] = image;
        });

        for (let i = 1; i <= this.hSlice * this.vSlice; i++) {
            let x = (i - 1) % this.hSlice;
            let y = parseInt((i - 1) / this.hSlice);

            this.slices[String(i - 1)] = {
                imgs: imgs,
                frame: 0,
                x: x * this.sliceWidth,
                y: y * this.sliceHeight,
                width: this.sliceWidth,
                height: this.sliceHeight
            }
        }

        return Promise.all(loaded);
    }
}