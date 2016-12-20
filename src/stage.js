import './stage.css';
import {
    win,
    doc,
    Promise,
    query,
    queryAll,
    getRect
} from './util';
import {
    CanvasRender
} from './canvas';
import sliceConfig from './sliceConfig';

const sliceWidth = 750;
const sliceHeight = 1334;
const hSlice = 9;
const vSlice = 14;
const width = sliceWidth * hSlice;
const height = sliceHeight * vSlice;

export default class Stage extends CanvasRender{
    constructor(viewport) {
        const {width: vw, height: vh} = getRect(viewport);
        const stageEl = query(viewport, '#stage');

        super(stageEl, vw, vh);

        this.stageEl = stageEl;
        this.vw = vw;
        this.vh = vh;
        this.width = vw * hSlice;
        this.height = vw / (width / hSlice) * height;
        this.hSlice = hSlice;
        this.vSlice = vSlice;
        this.sliceWidth = this.width / hSlice;
        this.sliceHeight = this.height / vSlice;
        this.slices = [];


        for (let v = 0; v < this.vSlice; v++) {
            for (let h = 0; h < this.hSlice; h++) {
                const index = v * this.hSlice + h;
                const config = {
                    index: v * this.hSlice + h,
                    h,
                    v
                };
                if (sliceConfig[String(index)]) {
                    for (const key in sliceConfig[String(index)]) {
                        config[key] = sliceConfig[String(index)][key];
                    }
                }

                this.slices.push(config);
            }
        }
    }

    get totalAmount() {
        return this.slices.length;
    }

    get specialAmount() {
        return this.slices.filter(slice =>
            slice.type === 3
        ).length;
    }

    get specialFound() {
        return this.slices.filter(slice =>
            slice.type === 3 && slice.found
        ).length;
    }

    get focusedAmount() {
        return this.slices.filter(slice =>
            slice.focused
        ).length;
    }

    get hoveredAmount() {
        return this.slices.filter(slice =>
            slice.hovered
        ).length;
    }

    getSlice(scrollX, scrollY) {
        const h = parseInt(scrollX / this.sliceWidth);
        const v = parseInt(scrollY / this.sliceHeight);
        return this.slices[v * this.hSlice + h];
    }

    getHoverSlice(scrollX, scrollY) {
        const hover = this.getSlice(scrollX, scrollY);
        const {
            h,
            v,
            index
        } = hover;
        const related = [];

        if (h < this.hSlice - 1) {
            related.push(this.slices[index + 1]);
        }

        if (v < this.vSlice - 1) {
            related.push(this.slices[index + this.hSlice]);
        }

        if (h < this.hSlice - 1
            && v < this.vSlice - 1) {
            related.push(this.slices[index + this.hSlice + 1]);
        }

        return [
            hover,
            ...related
        ].map(slice => {
            slice.hovered = true;
            return slice;
        });
    }

    getFocusSlice(cx, cy) {
        const h = parseInt(cx / this.sliceWidth);
        const v = parseInt(cy / this.sliceHeight);
        const dx = parseInt(cx % this.sliceWidth);
        const dy = parseInt(cy % this.sliceHeight);

        let slice;
        if (dx > this.sliceWidth * 0.25 && dx < this.sliceWidth * 0.75
                && dy > this.sliceHeight * 0.25 && dy < this.sliceHeight * 0.75) {
            slice = this.slices[v * this.hSlice + h];
            slice.focused = true;
        }

        return slice;
    }

    ready() {
        return new Promise((resolve, reject) => {
            this.stageEl.style.display = '';
            resolve();
        });
    }
}