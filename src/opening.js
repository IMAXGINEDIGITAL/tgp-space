import './opening.css';
import {
    win,
    doc,
    Promise,
    defer,
    query,
    queryAll,
    getRect,
    raf,
    delay
} from './util';

export default class Opening {
    constructor(viewport, items) {
        this.viewport = viewport;
        this.wrapEl = query(viewport, '#opening');
        this.items = items;
    }

    star() {
        const duration = this.duration;
        const count = this.starsCount;
        const limit = 3;
        const els = [];
        const ratio = 0.1;

        for (let i = 0; i < limit; i++) {
            const el = doc.createElement('div');
            el.className = 'star';
            el.idle = true;
            els.push(el);
        }

        const randomStar = () => {
            const n = parseInt(Math.random() * count) + 1;
            return this.items[`openingStar${n}`].src;
        }

        const getIdleEl = () => {
            return els.filter(el => el.idle)[0];
        }

        const randomStart = () => {
            const x = this.boneX + (Math.random() * 10 - 5);
            const y = this.boneY + (Math.random() * 10 - 5);
            const scale = Math.random() * 0.1;
            const rotate = Math.random() * 16 - 8;
            return [x, y, scale, rotate];
        }

        const randomEnd = () => {
            let n = parseInt(Math.random() * 4);
            let x;
            let y;

            if (n === 0) {
                x = -Math.random() * 125 - 125;
                y = Math.random() * this.height;
            } else if (n === 1) {
                x = Math.random() * this.width;
                y = -Math.random() * 125 - 125;
            } else if (n === 2) {
                x = this.width + Math.random() * 125 + 125;
                y = this.height * Math.random();
            } else if (n === 3) {
                x = this.width * Math.random();
                y = this.height + Math.random() * 125 + 125;
            }

            const scale = Math.random() * 0.2 + 0.8;
            const rotate = Math.random() * 16 - 8;

            return [x, y, scale, rotate];
        }

        return ({
            elapsed,
            delta
        }) => {
            if (elapsed > duration) {
                this.wrapEl.innerHTML = '';
                return true;
            }

            let el;
            if (Math.random() < ratio
                    && (el = getIdleEl())) {
                const starSrc = randomStar();
                const [startX, startY, startScale, startRotate] = randomStart();
                const [endX, endY, endScale, endRotate] = randomEnd();
                
                const end = e => {
                    el.removeEventListener('webkitTransitionEnd', end);
                    this.wrapEl.removeChild(el);
                    el.style.cssText = '';
                    el.idle = true;
                }

                el.idle = false;
                el.style.webkitTransition = '-webkit-transform 0.4s ease-out 0s';
                el.style.webkitTransform = `translate3d(${startX}px, ${startY}px, 0px) scale(${startScale})  rotate(${startRotate}deg)`;
                el.style.backgroundImage = `url(${starSrc})`;
                el.addEventListener('webkitTransitionEnd', end);

                this.wrapEl.appendChild(el);

                raf(() => {
                    el.style.webkitTransform = `translate3d(${endX}px, ${endY}px, 0px) scale(${endScale}) rotate(${endRotate}deg)`;
                });
            }
        }
    }

    chicken() {
        const items = this.items;
        const el = doc.createElement('div');
        el.className = 'chicken';
        el.style.webkitTransition = '-webkit-transform 0.4s ease-out 0s';
        el.style.webkitTransform = `translate3d(${this.boneX}px, ${this.boneY}px, 0px) scale(0)`;
        el.style.backgroundImage = `url(${items['openingChicken'].src})`;

        this.wrapEl.innerHTML = '';
        this.wrapEl.appendChild(el);

        const {
            width,
            height
        } = this;

        return new Promise((resolve, reject) => {
            const end = e => {
                el.removeEventListener('webkitTransitionEnd', end);
                resolve();
            }

            el.addEventListener('webkitTransitionEnd', end);

            raf(() => {
                el.style.webkitTransform = `translate3d(${width / 2 - 300 / 2}px, ${height / 2 - 240 / 2}px, 0px) scale(1)`;
            });
        });
    }

    play() {
        const items = this.items;
        const duration = this.duration;
        const count = this.framesCount;
        let index = 0;

        return ({
            elapsed,
            delta
        }) => {
            if (elapsed <= duration) {
                this.wrapEl.style.backgroundImage = `url(${items['opening' + (index + 1)].src})`;
                index++;
                index %= count;
            } else {
                return true;
            }
        };
    }

    ending() {
        this.wrapEl.style.display = 'none';
    }

    ready() {
        const items = this.items;

        return new Promise((resolve, reject) => {
            this.duration = 3000;

            this.framesCount = Object.keys(this.items)
                                .filter(key => key.match(/^opening\d+$/))
                                .length;

            this.starsCount = Object.keys(this.items)
                                .filter(key => key.match(/^openingStar\d+$/))
                                .length;

            this.wrapEl.style.display = '';

            const {width, height} = getRect(this.wrapEl);
            this.width = width;
            this.height = height;
            this.boneX = this.width / 2;
            this.boneY = this.width / 2;
            resolve();
        });
    }
}