import {
    win,
    doc,
    Promise,
    defer,
    img2Canvas,
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
        this.sliceWidth = stage.sliceWidth;
        this.sliceHeight = stage.sliceHeight;
        this.items = items;
    }

    drawImages(hovers, focus, scrollX, scrollY) {
        const params = [];
        const ids = [];
        const scale = 0.4;

        const pushParams = id => {
            if (ids.indexOf(id) < 0
                    && this.slices[id]) {
                const {
                    x,
                    y,
                    width,
                    height,
                    canvas
                } = this.slices[id];

                params.push({
                    x: x - width * scale / 2 - scrollX,
                    y: y - height * scale / 2 - scrollY,
                    width: width * (1 + scale),
                    height: height * (1 + scale),
                    img: canvas
                });
            }
            ids.push(id);
        }

        if (hovers) {
            for (const hover of hovers) {
                pushParams(String(hover.index));
            }
        }

        if (focus) {
            if (focus.h < this.hSlice - 1) {
                pushParams(focus.index + 1);
            }

            if (focus.h > 1) {
                pushParams(focus.index - 1);
            }

            if (focus.v < this.vSlice - 1) {
                pushParams(focus.index + this.hSlice);
            }

            if (focus.v > 1) {
                pushParams(focus.index - this.hSlice);
            }
        }

        this.draw(params);
    }

    clear(focus) {
        const {
            cleared,
            index
        } = focus;

        const slice = this.slices[String(index)];

        if (slice) {
            let {
                img,
                render
            } = slice;

            if (!cleared) {
                const duration = 1000;

                return ({
                    delta,
                    elapsed
                }) => {
                    if (elapsed <= duration) {
                        render.globalAlpha -= delta / duration;
                    } else {
                        render.globalAlpha = 0;
                        focus.cleared = true;
                    }
                    render.clearRect(0, 0, this.sliceWidth, this.sliceHeight);
                    render.drawImage(img, 0, 0, this.sliceWidth, this.sliceHeight);
                    return focus.cleared;
                }
            }
        }
    }

    ready() {
        this.slices = {};

        const img = this.items['cloud'].obj;

        for (let i = 1; i <= this.hSlice * this.vSlice; i++) {
            const x = (i - 1) % this.hSlice;
            const y = parseInt((i - 1) / this.hSlice);
            const [canvas, render] = img2Canvas(img, this.sliceWidth, this.sliceHeight);

            this.slices[String(i - 1)] = {
                img,
                canvas,
                render,
                x: x * this.sliceWidth,
                y: y * this.sliceHeight,
                width: this.sliceWidth,
                height: this.sliceHeight
            }
        }

        return Promise.resolve();
    }
}