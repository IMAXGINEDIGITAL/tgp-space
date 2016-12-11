import {
    win,
    doc,
    Promise,
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
        super(stage.width, stage.height);

        this.width = stage.width;
        this.height = stage.height;
        this.hSlice = stage.hSlice;
        this.vSlice = stage.vSlice;
        this.vw = stage.vw;
        this.vh = stage.vh;
        this.items = items;
    }

    get completing() {
        const imageData = this.render.getImageData(0, 0, this.width, this.height);
        const amount = imageData.data.length / 4;
        let count = 0;
        for (let i = 0; i < imageData.data.length; i += 4) {
            if (imageData.data[i + 3] === 0) {
                count++;
            }
        }
        return count/amount;
    }

    clear(x, y) {
        const cx = x + this.vw / 2;
        const cy = y + this.vh / 2;

        const steps = new Array(20);
        const radius = (this.vh * 0.5) / steps.length;

        for (let i = 0; i < steps.length; i++) {
            steps[i] = {
                cx: cx,
                cy: cy,
                r: radius * (i + 1)
            }
        }

        return ({
            id,
            start,
            delta,
            elapsed
        }, ticker) => {
            if (steps.length) {
                const {
                    cx,
                    cy,
                    r
                } = steps.shift();

                const gradient = this.render.createRadialGradient(cx, cy, 0, cx, cy, r);
                gradient.addColorStop(0, 'rgba(0, 0, 0, 255)');
                gradient.addColorStop(0.8, 'rgba(0, 0, 0, 100)');
                gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

                this.render.fillStyle = gradient;
                this.render.beginPath();
                this.render.arc(cx, cy, r, 0, Math.PI * 2);
                this.render.fill();
                this.render.closePath();
            } else {
                return true;
            }
        }
    }

    ready() {
        this.sliceWidth = this.width / this.hSlice;
        this.sliceHeight = this.height / this.vSlice;

        const images = [];
        for (let i = 0; i < this.hSlice; i++) {
            for (let j = 0; j < this.vSlice; j++) {
                images.push({
                    src: this.items.cloud.src,
                    x: i * this.sliceWidth,
                    y: j * this.sliceHeight,
                    width: this.sliceWidth,
                    height: this.sliceHeight
                });
            }
        }

        return this.draw(images)
                .then(() => {
                    this.render.globalCompositeOperation = 'destination-out';
                });
    }
}