import './helloworld.css';
import {
    win,
    doc,
    Promise,
    defer,
    query,
    queryAll,
    getRect
} from './util';

export default class HelloWorld {
    constructor(viewport, items) {
        this.wrapEl = query(viewport, '#helloworld');
        this.wrapEl.style.backgroundImage = `url(${items['helloworld'].src})`;
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
                this.wrapEl.style.backgroundPositionX = `-${index * 10}rem`;
            } else {
                this.wrapEl.style.backgroundPositionX = '0';
                return true;
            }
        };
    }

    ending() {
        this.wrapEl.style.display = 'none';
    }

    ready() {
        return new Promise((resolve, reject) => {
            this.wrapEl.style.display = '';
            resolve();
        });
    }
}