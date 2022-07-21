export default class AtlasView {
    constructor() {
        this._container = document.getElementById('atlas-container');
        this._atlasSizeLbl = document.getElementById('atlas-size');
    }

    showAtlas(canvas) {
        if (this._container.children[0]) {
            this._container.removeChild(this._container.children[0]);
        }

        this._container.appendChild(canvas);

        this._atlasSizeLbl.textContent = `(${canvas.width}x${canvas.height})`;
    }
}
