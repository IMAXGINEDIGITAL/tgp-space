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
            this.contentEl = query(this.popEl, '.content');
            this.closeEl = query(this.popEl, '.popClose');
            this.titleEl = query(this.popEl, '.title');
            this.textEl = query(this.popEl, '.text');
            this.bg1El = query(this.popEl, '.popBg1');
            this.bg2El = query(this.popEl, '.popBg2');
            this.btnsEl = query(this.popEl, '.btns');
            this.leftBtnEl = query(this.popEl, '.popBtn.left');
            this.rightBtnEl = query(this.popEl, '.popBtn.right');

            resolve();
        });
    }

    close() {
        this.contentEl.style.visibility = 'hidden';
        this.btnsEl.style.visibility = 'hidden';
        this.popEl.className = this.popEl.className.replace('open', 'close');

        return delay(600).then(() => {
            this.popEl.style.display = 'none'
            this.popEl.className = '';
        });
    }

    popup({
        shareble,
        title,
        text,
        bgType,
        onleftclick,
        onrightclick
    }) {
        return new Promise((resolve, reject) => {
            this.popEl.style.display = '';

            this.titleEl.textContent = title;
            this.textEl.innerHTML = text;

            if (shareble) {
                this.popEl.className += ` shareble bg${bgType}`;
            }

            const handler = (e) => {
                e.preventDefault();
                this.leftBtnEl.removeEventListener('tap', onLeftClick);
                this.rightBtnEl.removeEventListener('tap', onRightClick);
                return Promise.resolve();
            }

            function onLeftClick(e) {
                handler(e).then(() => onleftclick && onleftclick());
            }

            this.leftBtnEl.addEventListener('tap', onLeftClick);

            function onRightClick(e) {
                handler(e).then(() => onrightclick && onrightclick());
            }

            this.rightBtnEl.addEventListener('tap', onRightClick);

            raf(() => this.popEl.className += ' open');

            delay(400).then(() => {
                this.contentEl.style.visibility = '';
                this.btnsEl.style.visibility = '';
                resolve();
            });
        });
    }
}