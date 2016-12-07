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

export default class Galaxy extends CanvasImage {
    constructor(stage, items) {
        super(stage.width, stage.height);
        
        this.width = stage.width;
        this.height = stage.height;
        this.items = items;
    }

    ready() {
        return this.draw([{
            src: this.items['galaxy-top'].src,
            x: 0,
            y: 0,
            width: this.width,
            height: this.height * 0.2
        },{
            src: this.items['galaxy-mid'].src,
            x: 0,
            y: this.height * 0.2,
            width: this.width,
            height: this.height * 0.4
        },{
            src: this.items['galaxy-bottom'].src,
            x: 0,
            y: this.height * 0.6,
            width: this.width,
            height: this.height * 0.4
        }]);
    }
}