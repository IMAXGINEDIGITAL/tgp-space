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
        this.audio = items['music'].obj;
    }

    play() {
        this.audio.play();
    }


    pause() {
        this.audio.pause();
    }

    ready() {
        return new Promise((resolve, reject) => {
            this.audio.loop = true;
            this.musicEl.style.display = '';

            this.musicEl.addEventListener('tap', e => {
                e.preventDefault();
                e.stopPropagation();
                if (!this.audio.paused) {
                    this.audio.pause();
                    this.musicEl.className = 'mute';
                } else {
                    this.audio.play();
                    this.musicEl.className = '';
                }
            });

            resolve();
        });
    }
}