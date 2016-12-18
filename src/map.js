import './map.css';
import {
    win,
    doc,
    Promise,
    query,
    queryAll,
    getRect
} from './util';
import Event from './event';

export default class Map extends Event {
    constructor(viewport, hSlice, vSlice) {
        super();

        this.viewport = query(viewport, '#stage-map');
        this.wrapEl = query(this.viewport, '.wrap');
        this.canvasEl = query(this.viewport, 'canvas');
        this.render = this.canvasEl.getContext('2d');
        this.indicatorEl = query(this.viewport, '.indicator');
        this.textEl = query(this.viewport, '.text b');
        this.hSlice = hSlice;
        this.vSlice = vSlice;
        this.opened = false;
    }

    text(str) {
        this.textEl.textContent = str;
    }

    update(xp, yp) {
        const {width: cWidth, height: cHeight} = getRect(this.canvasEl);
        const {width: iWidth, height: iHeight} = getRect(this.indicatorEl);
        const {sliceWidth: sWidth, sliceHeight: sHeight} = this;

        this.indicatorEl.style.webkitTransform = 
            `translate3d(${cWidth * xp + sWidth / 2 - iWidth / 2}px, ${cHeight * yp + sHeight / 2 - iHeight / 2}px, 0)`;
    }

    clear(xp, yp) {
        const {width: cWidth, height: cHeight} = getRect(this.canvasEl);
        const {sliceWidth: sWidth, sliceHeight: sHeight} = this;

        this.render.fillRect(cWidth * xp, cHeight * yp, sWidth, sHeight);
    }

    ready() {
        return new Promise((resolve, reject) => {
            this.viewport.style.display = '';

            const {width, height} = getRect(this.canvasEl);
            this.width = width;
            this.height = height;
            this.sliceWidth = width / this.hSlice;
            this.sliceHeight = height / this.vSlice;

            this.canvasEl.width = width;
            this.canvasEl.height = height;
            this.render.clearRect(0, 0, width, height);
            this.render.fillStyle = '#016fa0';
            this.render.fillRect(0, 0, width, height);
            this.render.fillStyle = 'rgba(0, 0, 0, 1)';
            this.render.globalCompositeOperation = 'destination-out';

            resolve(this);
        });
    }
}