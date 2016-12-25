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
        const scale = 0.15;

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
                imgs,
                render
            } = slice;

            if (!cleared) {
                const duration = 1000;
                const scale = 3;

                return ({
                    delta,
                    elapsed
                }) => {
                    if (elapsed <= duration &&
                            render.globalAlpha > 0) {
                        const ratio = delta / duration;

                        slice.offsetLeft -= ratio * this.sliceWidth / scale;
                        slice.offsetRight += ratio * this.sliceWidth / scale;
                        slice.offsetTop -=  ratio * this.sliceHeight / scale;
                        slice.offsetBottom +=  ratio * this.sliceHeight / scale;
                        render.globalAlpha -= ratio;
                    } else {
                        slice.offsetLeft = - this.sliceWidth / scale;
                        slice.offsetRight = this.sliceWidth / scale;
                        slice.offsetTop = -this.sliceHeight / scale;
                        slice.offsetBottom = this.sliceHeight / scale;
                        render.globalAlpha = 0;
                        focus.cleared = true;
                    }
                    
                    render.clearRect(0, 0, this.sliceWidth, this.sliceHeight);

                    render.save();
                    render.globalAlpha /= 2;
                    render.drawImage(imgs.center, 0, 0, this.sliceWidth, this.sliceHeight);
                    render.restore();

                    render.drawImage(imgs.left, slice.offsetLeft, 0, this.sliceWidth, this.sliceHeight);
                    render.drawImage(imgs.top, 0, slice.offsetTop, this.sliceWidth, this.sliceHeight);
                    render.drawImage(imgs.right, slice.offsetRight, 0, this.sliceWidth, this.sliceHeight);
                    render.drawImage(imgs.bottom, 0, slice.offsetBottom, this.sliceWidth, this.sliceHeight);

                    return focus.cleared;
                }
            }
        }
    }

    ready() {
        const imgs = {
            all: this.items['cloud'].obj,
            center: this.items['cloud1'].obj,
            left: this.items['cloud2'].obj,
            top: this.items['cloud3'].obj,
            right: this.items['cloud4'].obj,
            bottom: this.items['cloud5'].obj,
        };

        this.slices = {};

        for (let i = 1; i <= this.hSlice * this.vSlice; i++) {
            const x = (i - 1) % this.hSlice;
            const y = parseInt((i - 1) / this.hSlice);
            const [canvas, render] = img2Canvas(imgs.all, this.sliceWidth, this.sliceHeight);

            this.slices[String(i - 1)] = {
                imgs,
                canvas,
                render,
                offsetLeft: 0,
                offsetTop: 0,
                offsetRight: 0,
                offsetBottom: 0,
                x: x * this.sliceWidth,
                y: y * this.sliceHeight,
                width: this.sliceWidth,
                height: this.sliceHeight
            }
        }

        return Promise.resolve();
    }
}