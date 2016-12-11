import {
    win,
    doc,
    Promise,
    query,
    queryAll,
    getRect,
    getDistance,
    raf,
    caf
} from './util';
import Event from './event';

export default class Ticker extends Event{
    constructor(...args) {
        super(...args);

        this._id = 0;
        this._mapF = new Map();
        this._mapC = new Map();
    }

    add(f) {
        if (f && !this._mapC.has(f)) {
            const id = this._id++;
            this._mapF.set(id, f);
            this._mapC.set(f, {
                id: id,
                cancel: false,
                start: 0,
                elapsed: 0,
                delta: 0
            });
            return id;
        }
    }

    delete(id) {
        if (id && this._mapF.has(id)) {
            const f = this._mapF.get(id);
            const c = this._mapC.get(f);
            c.cancel = true;
            this._mapF.delete(id);
            this._mapC.delete(f);
        }
    }

    has(id) {
        return this._mapF.has(id);
    }

    run() {
        this.start = Date.now();
        this.elapsed = 0;
        this.delta = 0;

        const tick = () => {
            raf(tick);

            let now = Date.now();
            let elapsed = now - this.start;

            this.delta = elapsed - this.elapsed;
            this.elapsed = elapsed;

            this.emit('beforetick', {
                start: this.start,
                delta: this.delta,
                elapsed: this.elapsed
            });

            const keys = [...this._mapC.keys()];

            keys.forEach(f => {
                const c = this._mapC.get(f);

                if (!c.cancel) {
                    const now = Date.now();
                    c.start = c.start || (c.start = now);

                    const elapsed = now - c.start;
                    c.delta = elapsed - c.elapsed;
                    c.elapsed = elapsed;

                    if (f(c, this)) {
                        this.delete(c.id);
                    }
                }
            });

            now = Date.now();
            elapsed = now - this.start;

            this.delta = elapsed - this.elapsed;
            this.elapsed = elapsed;

            this.emit('aftertick', {
                start: this.start,
                delta: this.delta,
                elapsed: this.elapsed
            });
        }
        raf(tick);

        return true;
    }
}