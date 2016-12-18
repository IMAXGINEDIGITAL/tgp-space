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
        const duration = 3000;
        const times = 3;
        const count = 6;

        return ({
            elapsed,
            delta
        }) => {
            if (elapsed <= duration) {
                const index = parseInt(count * times * elapsed / duration) % count;
                this.wrapEl.style.backgroundPositionX = `-${index * 10}rem`;
            } else {
                this.wrapEl.style.display = 'none';
                return true;
            }
        };
    }

    ready() {
        return new Promise((resolve, reject) => {
            this.wrapEl.style.display = '';
            resolve();
        });
    }
}