import {
    win,
    doc,
    Promise,
    query,
    queryAll,
    getRect
} from './util';
import 'gesture-js';
import Event from './event';

export default class Scroller extends Event{
    constructor(width, height, vw, vh, scale = 1) {
        super();

        this._isScrolling = false;
        this._enable = true;
        this._scale = scale;

        this.width = width;
        this.height = height;
        this.vw = vw;
        this.vh = vh;
        this.x = 0;
        this.y = 0;
        this.lx = 0;
        this.ly = 0;
        this.sx = 0;
        this.sy = 0;
    }

    get isScrolling() {
        return this._isScrolling;
    }

    get scale() {
        return this._scale;
    }

    set scale(scale) {
        this._scale = scale;
    }

    get enable() {
        return this._enable;
    }

    set enable(enable) {
        this._enable = enable;
    }

    _emit(name) {
        const e = {
            x: this.x,
            y: this.y,
            lx: this.lx,
            ly: this.ly
        }

        this.emit(name, e);
    }

    ready() {
        return new Promise((resolve, reject) => {
            this._isScrolling = false;

            const emitStart = () => {
                this._isScrolling = true;
                this.lx = this.x;
                this.ly = this.y;
                this._emit('scrollstart');
            };

            const emitScroll = () => this._emit('scrolling');

            const emitEnd = () => {
                this._isScrolling = false;
                this._emit('scrollend');
            };

            const calXY = (e, noScale) => {
                const {
                    displacementX,
                    displacementY
                } = e;

                const scale = noScale ? 1 : this._scale;
                let x = this.lx - displacementX * scale;
                let y = this.ly - displacementY * scale;

                x = Math.min(Math.max(0, x), this.width - this.vw);
                y = Math.min(Math.max(0, y), this.height - this.vh);

                this.x = x;
                this.y = y;
                return true;
            }

            doc.body.addEventListener('panstart', e => 
                this._enable && emitStart()
            );

            doc.body.addEventListener('panmove', e => 
                this._enable && calXY(e) && emitScroll() 
            );

            doc.body.addEventListener('panend', e => 
                this._enable && emitEnd()      
            );

            this.scrollTo = (x, y) => {
                emitStart();
                calXY({
                    displacementX: this.x - x,
                    displacementY: this.y - y
                }, true);
                emitScroll();
                emitEnd();
            };

            resolve();
        });
    }
}