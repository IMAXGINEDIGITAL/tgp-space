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
                this.render.clearRect(0, 0, this.width, this.height);

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
        this._isOffscreen = false;       
    }

    get canvas() {
        return this._isOffscreen ? this._offscreen.canvas : this._visible.canvas;
    }

    get render() {
        return this._isOffscreen ? this._offscreen.render : this._visible.render;
    }

    get image() {
        return this._isOffscreen ? this._offscreen.image : this._visible.image;
    }

    transferControlToOffscreen() {
        this._isOffscreen = true;
    }

    commit() {
        if (this._isOffscreen) {
            this._visible.render.clearRect(0, 0, this.width, this.height);
            this._visible.render.drawImage(this._offscreen.canvas, 0, 0, this.width, this.height, 0, 0, this.width, this.height);
        }
    }
}