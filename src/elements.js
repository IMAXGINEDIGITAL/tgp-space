import './elements.css';
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

export default class Elements extends Event {
    constructor(viewport, sWidth, sHeight, hSlice, vSlice) {
        super();

        this.countEl = query(viewport, '#elements-count');
        this.wrapEl = query(viewport, '#stage-wrap .elements');
        this.staticEl = query(this.wrapEl, '.static');
        this.dynamicEl = query(this.wrapEl, '.dynamic');
        this.sWidth = sWidth;
        this.sHeight = sHeight;
        this.hSlice = hSlice;
        this.vSlice = this.vSlice;
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