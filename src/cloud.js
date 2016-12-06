import './cloud.css';
import {
    win,
    doc,
    Promise,
    query,
    queryAll,
    getRect,
    getDistance,
    raf,
    caf
} from './util';
import Event from './event';

export default class Cloud extends Event {
    constructor(viewport, image, sWidth, sHeight, hSlice, vSlice) {
        super();

        this.image = image;
        this.canvasEl = query(viewport, '#stage-cloud');
        this.render = this.canvasEl.getContext('2d');
        this.cachedCanvasEl = doc.createElement('canvas');
        this.cachedRender = this.cachedCanvasEl.getContext('2d');
        this.sWidth = sWidth;
        this.sHeight = sHeight;
        this.hSlice = hSlice;
        this.vSlice = vSlice;
    }

    update(xp, yp) {
        const {width, height} = getRect(this.canvasEl);

        const x = this.sWidth * xp;
        const y = this.sHeight * yp;

        this.render.clearRect(0, 0, width, height);
        this.render.drawImage(this.cachedCanvasEl, -x, -y, this.sWidth, this.sHeight);
    }

    clear(xp, yp) {
        const {width, height} = getRect(this.canvasEl);

        const x = this.sWidth * xp;
        const y = this.sHeight * yp;
        const cx = x + width / 2;
        const cy = y + height / 2;

        const steps = new Array(10);
        const radius = (height * 0.5) / steps.length;

        for (let i = 0; i < steps.length; i++) {
            steps[i] = {
                cx: cx,
                cy: cy,
                r: radius * (i + 1)
            }
        }

        let id;
        const tick = () => {
            if (steps.length) {
                id = raf(tick);
                const {
                    cx,
                    cy,
                    r
                } = steps.shift();

                const gradient = this.cachedRender.createRadialGradient(cx, cy, 0, cx, cy, r);
                gradient.addColorStop(0, 'rgba(0, 0, 0, 255)');
                gradient.addColorStop(0.8, 'rgba(0, 0, 0, 100)');
                gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

                this.cachedRender.fillStyle = gradient;
                this.cachedRender.beginPath();
                this.cachedRender.arc(cx, cy, r, 0, Math.PI * 2);
                this.cachedRender.fill();
                this.cachedRender.closePath();

                this.update(xp, yp);
            } else {
                id = null;
            }
        }
        id = raf(tick);

        return () => {
            if (id) {
                caf(tick);
            }
        }
    }

    ready() {
        return new Promise((resolve, reject) => {
            this.sliceWidth = this.sWidth / this.hSlice;
            this.sliceHeight = this.sHeight / this.vSlice;

            this.cachedCanvasEl.width = this.sWidth;
            this.cachedCanvasEl.height = this.sHeight;
            this.cachedRender.clearRect(0, 0, this.sWidth, this.sHeight);

            for (let i = 0; i < this.hSlice; i++) {
                for (let j = 0; j < this.vSlice; j++) {
                    this.cachedRender.drawImage(this.image, i * this.sliceWidth, j * this.sliceHeight, this.sliceWidth, this.sliceHeight);
                }
            }
            this.cachedRender.globalCompositeOperation = 'destination-out';

            const {width, height} = getRect(this.canvasEl);
            this.canvasEl.width = width;
            this.canvasEl.height = height;
            resolve(this);
        });
    }
}