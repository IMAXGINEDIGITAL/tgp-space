import {
    win,
    doc,
    Promise,
    defer,
    loadImg,
    query,
    queryAll,
    getRect
} from './util';

export class CanvasImage {
    constructor(canvas, width, height) {
        if (!(canvas instanceof HTMLCanvasElement)) {
            height = width;
            width = canvas;
            canvas = null;
        }

        this.width = width;
        this.height = height;
        this.canvas = canvas || doc.createElement('canvas');
        this.canvas.width = width;
        this.canvas.height = height;
        this.render = this.canvas.getContext('2d');
        this._image;
    }

    get image() {
        if (!this._image) {
            this._image = new Image();
            this._image.src = this.canvas.toDataURL();
        }
        return this._image;
    }

    draw(params) {
        const loaded = params.map(param => {
            const deferred = defer();
            
            if (param.img) {
                deferred.resolve(param);
            } else if (param.src) {
                const [img, promise] = loadImg(param.src);
                param.img = img;
                promise.then(() => deferred.resolve(param));
            } else {
                deferred.resolve(param);
            }

            return deferred.promise;
        });

        return Promise.all(loaded)
            .then(params => {
                this.render.clearRect(0, 0, this.width, this.height);

                params.forEach(param => {
                    const args = [param.img, param.x, param.y];

                    if (param.width != null) {
                        args.push(param.width);
                    }
                    if (param.height != null) {
                        args.push(param.height);
                    }

                    if (param.sx != null) {
                        args.push(param.sx);
                    }
                    if (param.sx != null) {
                        args.push(param.sx);
                    }
                    if (param.sw != null) {
                        args.push(param.sw);
                    }
                    if (param.sh != null) {
                        args.push(param.sh);
                    }

                    this.render.drawImage(...args);
                });
            }); 
    }
}

export class CanvasRender {
    constructor(canvas, width, height) {
        this.width = width;
        this.height = height;
        this._visible = new CanvasImage(canvas, width, height);
        this._offscreen = new CanvasImage(width, height); 
    }

    get canvas() {
        return this._visible.canvas;
    }

    get render() {
        return this._visible.render;
    }

    get image() {
        return this._visible.image;
    }

    get offscreenCanvas() {
        return this._offscreen.canvas;
    }

    get offscreenRender() {
        return this._offscreen.render;
    }

    get offscreenImage() {
        return this._offscreen.image;
    }
}