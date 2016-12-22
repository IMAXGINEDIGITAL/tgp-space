import './found.css';
import {
    win,
    doc,
    Promise,
    defer,
    delay,
    query,
    queryAll,
    getRect,
    getDistance,
    appendStyle,
    raf,
    caf
} from './util';
import Event from './event';

export default class Found extends Event {
    constructor(viewport, items) {
        super();

        this.wrapEl = query(viewport, '#found');
        this.textEl = query(this.wrapEl, '.text');
        this.textNumberEl = query(this.textEl, '.number');
        this.textTipEl = query(this.textEl, '.tip');
        this.textBgEl = query(this.textEl, '.bg');
        this.barEl = query(this.wrapEl, '.progress .bar');
        this.goldEl = query(this.wrapEl, '.gold'); 

        this.found = 0;
        this.amount = 0;
        this.total = 0;
        this.focus = 0;
        this.items = items;
    }

    update(amount, found, total, focus) {
        if (found !== this.found 
            || amount !== this.amount
            || total !== this.total
            || focus !== this.focus) {
            this.textNumberEl.textContent = `${found}/${amount}`;
            this.barEl.style.width = `${found/amount*100}%`;

            if (found !== 0) {
                this.emit('update', {
                    found,
                    amount,
                    total,
                    focus
                });
            }

            this.found = found;
            this.amount = amount;
            this.total = total;
            this.focus = focus;
        }
    }

    ready() {
        return new Promise((resolve, reject) => {
            this.wrapEl.style.display = '';

            let keyframes = '';
            Object.keys(this.items).filter(id =>
                id.match(/^coin\d$/)
            ).forEach((id, i) => {
                const item = this.items[id];
                keyframes += `
                    ${1 / 6 * i * 100}% {
                        background-image: url(${item.src});
                    }
                `;

                if (i === 0) {
                    keyframes += `
                        100% {
                            background-image: url(${item.src});
                        }
                    `;  
                }
            });

            appendStyle(`
                @-webkit-keyframes coin {
                    ${keyframes}
                }
            `);

            this.goldEl.style.webkitAnimation = 'coin 1s linear 0s infinite';

            resolve(this);
        });
    }
}