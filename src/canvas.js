import {
    win,
    doc,
    Promise,
    defer,
    query,
    queryAll,
    getRect
} from './util';

export class CanvasImage {
    constructor(width, height) {
        this.canvas = doc.createElement('canvas');
        this.canvas.width = width;
        this.canvas.height = height;
        this.render = this.canvas.getContext('2d');
    }

    draw(images) {
        const loaded = images.map(image => {
            const deferred = defer();
            const img = new Image();
            image.img = img;
            img.onload = () => deferred.resolve(image);
            img.src = image.src;
            return deferred.promise;
        });

        return Promise.all(loaded)
            .then(images => {
                images.forEach(image => {
                    const params = [image.img, image.x, image.y];

                    if (image.width != null) {
                        params.push(image.width);
                    }
                    if (image.height != null) {
                        params.push(image.height);
                    }

                    if (image.sx != null) {
                        params.push(image.sx);
                    }
                    if (image.sx != null) {
                        params.push(image.sx);
                    }
                    if (image.sw != null) {
                        params.push(image.sw);
                    }
                    if (image.sh != null) {
                        params.push(image.sh);
                    }

                    this.render.drawImage(...params);
                })
            }); 
    }
}

export class CanvasRender {
    constructor(canvas, width, height) {
        this._canvas = canvas;
        this._canvas.width = width;
        this._canvas.height = height;
        this._render = this._canvas.getContext('2d');

        this._offscreenCanvas = doc.createElement('canvas');
        this._offscreenCanvas.width = width;
        this._offscreenCanvas.height = height;
        this._offscreenRender = this._offscreenCanvas.getContext('2d'); 

        this._isOffscreen = false;       
    }

    get canvas() {
        return this._isOffscreen ? this._offscreenCanvas : this._canvas;
    }

    get render() {
        return this._isOffscreen ? this._offscreenRender : this._render;
    }

    transferControlToOffscreen() {
        this._isOffscreen = true;
    }

    commit() {
        this._render.drawImage(this._offscreenCanvas, 0, 0);
    }
}