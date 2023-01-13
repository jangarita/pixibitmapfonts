export default class Atlas {
    constructor() {
        this._canvas = this._createCanvas();
        this._canvasCtx = this._canvas.getContext('2d', {willReadFrequently: true});
    }

    pack(bin) {
        this._canvas.width = bin.width;
        this._canvas.height = bin.height;

        this._canvasCtx.clearRect(0, 0, this._canvas.width, this._canvas.height);

        for (const binRect of bin.rects) {
            const srcRect = binRect[1].texture.orig;
            const srcCanvas = binRect[1].texture.baseTexture.resource.source;
            const srcCtx = srcCanvas.getContext('2d', {willReadFrequently: true});
            const srcImg = srcCtx.getImageData(srcRect.x, srcRect.y, srcRect.width, srcRect.height);

            this._canvasCtx.putImageData(srcImg, binRect.x, binRect.y);
        }

        return this._canvas;
    }

    _createCanvas() {
        const canvas = document.createElement('canvas');
        canvas.id = 'atlas';
        canvas.classList.add('border');

        return canvas;
    }
}
