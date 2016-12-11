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
        this._enable = false;
        this._scale = scale;

        this.width = width;
        this.height = height;
        this.vw = vw;
        this.vh = vh;
        this.x = 0;
        this.y = 0;
        this.lx = 0;
        this.ly = 0;
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

    _emit(name, originalEvent, extra = {}) {
        const e = {
            x: this.x,
            y: this.y,
            lx: this.lx,
            ly: this.ly,
            originalEvent
        }

        for (let key in extra) {
            e[key] = extra[key];
        }

        this.emit(name, e);
    }

    ready() {
        return new Promise((resolve, reject) => {
            this._isScrolling = false;

            const emitTap = e => {
                this._emit('tap', e, {
                    ex: this.x + e.touch.clientX,
                    ey: this.y + e.touch.clientY
                });
            }

            const emitStart = e => {
                this._isScrolling = true;
                this.lx = this.x;
                this.ly = this.y;
                this._emit('scrollstart', e);
            };

            const emitScroll = e => this._emit('scrolling', e);

            const emitEnd = e => {
                this._isScrolling = false;
                this._emit('scrollend', e);
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

            doc.body.addEventListener('tap', e => {
                this._enable && emitTap(e);
            });

            doc.body.addEventListener('panstart', e => 
                this._enable && emitStart(e)
            );

            doc.body.addEventListener('panmove', e => 
                this._enable && calXY(e) && emitScroll(e) 
            );

            doc.body.addEventListener('panend', e => 
                this._enable && emitEnd(e)      
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