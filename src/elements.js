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
import {
    CanvasImage
} from './canvas';

export class StaticElements extends CanvasImage {
    constructor(stage, items) {
        super(stage.width, stage.height);

        this.width = stage.width;
        this.height = stage.height;
        this.items = items;
    }

    ready() {
        return this.draw([{
            src: this.items['elements-top'].src,
            x: 0,
            y: 0,
            width: this.width,
            height: this.height * 0.2
        },{
            src: this.items['elements-mid'].src,
            x: 0,
            y: this.height * 0.2,
            width: this.width,
            height: this.height * 0.4
        },{
            src: this.items['elements-bottom'].src,
            x: 0,
            y: this.height * 0.6,
            width: this.width,
            height: this.height * 0.4
        }]);
    }
}

export class ElementCount {
    constructor(viewport) {
        this.countEl = query(viewport, '#elements-count');
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