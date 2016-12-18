import {
    win,
    doc,
    Promise,
    defer,
    query,
    queryAll,
    getRect
} from './util';
import {
    CanvasImage
} from './canvas';

export default class Star extends CanvasImage {
    constructor(stage, items) {
        super(stage.vw, stage.vh * 2);
        
        this.width = stage.vw;
        this.height = stage.vh * 2;
        this.vw = stage.vw;
        this.vh = stage.vh;
        this.items = items;
    }

    ready() {
        return this.draw([{
            img: this.items['star'].obj,
            x: 0,
            y: 0,
            width: this.width,
            height: this.vh
        }, {
            img: this.items['star'].obj,
            x: 0,
            y: this.vh,
            width: this.width,
            height: this.vh
        }]);
    }
}