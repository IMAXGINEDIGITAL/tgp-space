import './helloworld.css';
import {
    win,
    doc,
    Promise,
    defer,
    delay,
    query,
    queryAll,
    getRect
} from './util';

export default class HelloWorld {
    constructor(viewport, items) {
        this.wrapEl = query(viewport, '#helloworld');
        this.textEl = query(this.wrapEl, '.helloworld');
        this.startEl = query(this.wrapEl, '.start');
        // this.textEl.style.backgroundImage = `url(${items['helloworld'].src})`;
    }

    play() {
        const duration = 400;
        const count = 6;

        return ({
            elapsed,
            delta
        }) => {
            if (elapsed <= duration) {
                const index = parseInt(count * elapsed / duration);
                this.textEl.style.backgroundPositionX = `-${index * 10}rem`;
            } else {
                this.textEl.style.backgroundPositionX = '0';
                return true;
            }
        };
    }

    start(onclick) {
        return new Promise((resolve, reject) => {
            this.startEl.style.display = '';
            this.startEl.addEventListener('tap', e => {
                onclick && onclick();
                this.wrapEl.className += ' fadeout';
                delay(650)
                    .then(() => this.wrapEl.style.display = 'none')
                    .then(resolve);
            });
        });
    }

    ready() {
        return new Promise((resolve, reject) => {
            this.wrapEl.style.display = '';

            resolve();
        });
    }
}