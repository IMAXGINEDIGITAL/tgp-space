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

const width = 3750;
const height = 13340;
const hSlice = 5;
const vSlice = 10;

export default class Stage extends CanvasRender{
    constructor(viewport) {
        const {width: vw, height: vh} = getRect(viewport);

        super(query(viewport, '#stage'), vw, vh);

        this.hSlice = hSlice;
        this.vSlice = vSlice;
        this.vw = vw;
        this.vh = vh;
        this.height = vw / (width / hSlice) * height;
        this.width = vw * hSlice;
    }

    ready() {
        return new Promise((resolve, reject) => {
            // this.transferControlToOffscreen();
            resolve();
        });
    }
}