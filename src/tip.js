import './tip.css';
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

export default class Tip {
    constructor(viewport) {
        this.tipEl = query(viewport, '#tip');
    }

    show({
        tip,
        bgType
    }) {
        return new Promise((resolve, reject) => {
            this.tipEl.className = 'tip open';

            delay(400)
                .then(() => {
                    this.tipEl.className = `tip open bg${bgType}`;
                    this.textEl.innerHTML = tip;
                    return delay(3000);
                })
                .then(() => {
                    this.tipEl.className = 'tip close';
                    this.textEl.innerHTML = '';
                    return delay(400);
                })
                .then(() => {
                    this.tipEl.className = 'tip';
                    resolve();
                })
        });
    }

    ready() {
        return new Promise((resolve, reject) => {
            this.textEl = query(this.tipEl, 'p');
            resolve();
        });
    }
}