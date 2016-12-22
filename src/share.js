import './share.css';
import {
    win,
    doc,
    Promise,
    query,
    queryAll,
    getRect,
    getDistance,
    raf,
    delay
} from './util';

export default class Share {
    constructor(viewport) {
        this.shareEl = query(viewport, '#share');
    }

    show() {
        return new Promise((resolve, reject) => {
            const hide = e => {
                this.shareEl.removeEventListener('tap', hide);
                this.shareEl.style.display = 'none';
            }

            this.shareEl.addEventListener('tap', hide);
            this.shareEl.style.display = '';
        });
    }

    ready() {
        return new Promise((resolve, reject) => {
            resolve();
        });
    }
}