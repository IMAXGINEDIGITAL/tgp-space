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
        this.sliceWidth = stage.width / stage.hSlice;
        this.sliceHeight = stage.height / stage.vSlice;
        this.items = items;
    }

    drawImages(slices, scrollX, scrollY) {
        const params = [];
        for (const slice of slices) {
            if (this.slices[String(slice.index)]) {
                const {
                    x,
                    y,
                    width,
                    height,
                    canvas
                } = this.slices[String(slice.index)];

                params.push({
                    x: x - width * 0.4 - scrollX,
                    y: y - height * 0.4 - scrollY,
                    width: width * 1.8,
                    height: height * 1.8,
                    img: canvas
                });
            }
        }

        // this.render.save();
        // this.render.scale(3, 3);
        this.draw(params);
        // this.render.restore();
    }

    clear(focusSilce) {
        const {
            cleared,
            index
        } = focusSilce;

        const slice = this.slices[String(index)];

        if (slice) {

            let {
                img,
                render
            } = slice;

            if (!cleared) {
                const duration = 1500;

                return ({
                    delta,
                    elapsed
                }) => {
                    if (elapsed <= duration) {
                        render.globalAlpha -= delta / duration;
                    } else {
                        render.globalAlpha = 0;
                        focusSilce.cleared = true;
                    }
                    render.clearRect(0, 0, this.sliceWidth, this.sliceHeight);
                    render.drawImage(img, 0, 0, this.sliceWidth, this.sliceHeight);
                    return focusSilce.cleared;
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