import './music.css';
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

export default class Music {
    constructor(viewport, items) {
        this.musicEl = query(viewport, '#music');
        this.barsEl = queryAll(viewport, '.bar');
        this.audio = items['music'].obj;
    }

    play() {
        for (let i = 0; i < this.barsEl.length; i++) {
            this.barsEl[i].style.cssText = `-webkit-animation-duration: ${Math.random() * 0.3 + 0.3}s`;
        }
        this.audio.play();
        this.musicEl.className = '';
    }


    pause() {
        this.audio.pause();
        this.musicEl.className = 'mute';
    }

    ready() {
        return new Promise((resolve, reject) => {
            this.audio.loop = true;
            this.musicEl.style.display = '';

            this.musicEl.addEventListener('tap', e => {
                e.preventDefault();
                e.stopPropagation();
                if (!this.audio.paused) {
                    this.pause();
                } else {
                    this.play();
                }
            });

            resolve();
        });
    }
}