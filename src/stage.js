import './stage.css';
import {
    win,
    doc,
    Promise,
    query,
    queryAll,
    getRect
} from './util';
import Event from './event';
import IScroll from 'iscroll/build/iscroll-probe';

export default class Stage extends Event{
    constructor(viewport) {
        super();

        this.viewport = viewport;
        this.width = 3750;
        this.height = 13340;
        this.hSlice = 5;
        this.vSlice = 10;

        this.wrapEl = query(viewport, '#stage-wrap');
    }

    _viewReady() {
        return new Promise((resolve, reject) => {
            const {width: vw} = getRect(this.viewport);
            this.height = vw / (this.width / this.hSlice) * this.height;
            this.width = vw * this.hSlice;
            this.wrapEl.style.width = `${this.width}px`;
            this.wrapEl.style.height = `${this.height}px`;
            this.wrapEl.style.display = 'block';
            resolve();
        });
    }

    get scrolling() {
        return this._isScrolling;
    }

    _emitScrollEvent(name) {
        this.emit(name, {
            x: Math.round(-this.scroller.x),
            y: Math.round(-this.scroller.y),
            lastX: Math.round(-this.scroller.lastX),
            lastY: Math.round(-this.scroller.lastY)
        })
    }

    _scrollReady() {
        this._isScrolling = false;

        this.scroller = new IScroll(this.viewport, {
            mouseWheel: false,
            preventDefault: true,
            deceleration: 0.1,
            tap: true,
            probeType: 3,
            scrollX: true,
            scrollY: true,
            freeScroll: true,
            bounce: false,
            disableMouse: true,
            disablePointer: true
        });

        const scrollStart = () => {
            this._isScrolling = true;
            this.scroller.lastX = this.scroller.x;
            this.scroller.lastY = this.scroller.y;
            this._emitScrollEvent('scrollStart');
        };

        const scroll = () => this._emitScrollEvent('scrolling');

        const scrollEnd = () => {
            this._isScrolling = false;
            this._emitScrollEvent('scrollend');
        };

        this.scroller.on('scrollstart', scrollStart);

        this.scroller.on('scroll', scroll);

        this.scroller.on('scrollEnd', scrollEnd);

        this.scrollTo = (x, y) => {
            scrollStart();
            this.scroller.scrollTo(-x, -y);
            scroll();
            scrollEnd();
        };
    }

    ready() {
        return this._viewReady()
                .then(() => this._scrollReady())
                .then(() => this)
    }
}