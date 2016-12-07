import './stage.css';
import {
    win,
    doc,
    Promise,
    query,
    queryAll,
    getRect
} from './util';
import {
    CanvasRender
} from './canvas';

export default class Stage {
    constructor(viewport) {
        this.viewport = viewport;
        this.canvasEl = query(viewport, '#stage');
        this.width = 3750;
        this.height = 13340;
        this.hSlice = 5;
        this.vSlice = 10;
    }

    ready() {
        return new Promise((resolve, reject) => {
            const {width: vw, height: vh} = getRect(this.viewport);
            this.vw = vw;
            this.vh = vh;
            this.height = vw / (this.width / this.hSlice) * this.height;
            this.width = vw * this.hSlice;

            this.canvasRender = new CanvasRender(this.canvasEl, vw, vh);
            this.canvasRender.transferControlToOffscreen();
            resolve();
        });
    }

    get canvas() {
        return this.canvasRender.canvas;
    }

    get render() {
        return this.canvasRender.render;
    }

    commit() {
        this.canvasRender.commit();
    }
}