import './pop.css';
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

export default class Pop {
    constructor(viewport) {
        this.popEl = query(viewport, '#pop');
    }

    ready() {
        return new Promise((resolve, reject) => {
            this.scropEl = query(this.popEl, '.scope');
            this.contentEl = query(this.popEl, '.content');
            this.closeEl = query(this.popEl, '.close1');
            this.btnEl = query(this.popEl, '.btn');
            resolve();
        });
    }

    close() {
        this.scropEl.style.display = 'none';
        this.contentEl.style.display = 'none';
        this.closeEl.style.display = 'none';
        this.btnEl.style.display = 'none';
        raf(() => this.popEl.className = 'close');
        return delay(600).then(() => this.popEl.style.display = 'none');
    }

    popup({
        message,
        btnText,
        onclose,
        onclick
    }) {
        return new Promise((resolve, reject) => {
            this.popEl.style.display = '';

            this.contentEl.textContent = message;

            const handler = (e) => {
                e.preventDefault();
                this.closeEl.removeEventListener('tap', onClose);
                this.btnEl.removeEventListener('tap', onClick);
                return this.close();
            }

            function onClose(e) {
                handler(e).then(() => onclose && onclose());
            }

            this.closeEl.addEventListener('tap', onClose);

            function onClick(e) {
                handler(e).then(() => onclick && onclick());
            }

            this.btnEl.textContent = btnText;
            this.btnEl.addEventListener('tap', onClick);

            raf(() => this.popEl.className = 'open');
            delay(400).then(() => {
                this.scropEl.style.display = 'block';
                this.contentEl.style.display = 'block';
                if (onclose) {
                    this.closeEl.style.display = 'block';
                }
                this.btnEl.style.display = 'block';
                resolve();
            });
        });
    }
}