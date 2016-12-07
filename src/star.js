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

    // roll() {
    //     const imageData = this.render.getImageData(0, 0, this.width, this.height);
    //     let y = 0;

    //     return ({
    //         elapsed,
    //         delta
    //     }) => {
    //         this.render.clearRect()
    //         // this.render.putImageData(imageData, 0, 0, 0, y, this.width, y);
    //         this.render.putImageData(imageData, 0, 0, 0, -y, this.vw, this.vh);
    //         y++;
    //     }
    // }

    ready() {
        return this.draw([{
            src: this.items['star'].src,
            x: 0,
            y: 0,
            width: this.width,
            height: this.vh
        }, {
            src: this.items['star'].src,
            x: 0,
            y: this.vh,
            width: this.width,
            height: this.vh
        }]);
    }
}