import * as PIXI from 'pixi.js';
import FontModel from '../models/font-model';

export default class PreviewView {
    constructor() {
        this._container = document.getElementById('preview-container');
        this._text = document.getElementById('preview-text');

        this._text.oninput = this._updatePreviewText.bind(this);

        this._app = new PIXI.Application({backgroundAlpha: 0});
        this._app.view.style.width = '100%';

        this._container.appendChild(this._app.view);

        window.addEventListener('resize', this._resize.bind(this));

        this._resize();
    }

    preview(canvas, xml) {
        this._cleanUp();

        const texture = PIXI.Texture.from(canvas);
        const bmFont = PIXI.BitmapFont.install(xml, texture, true);

        this._bmText = new PIXI.BitmapText(this._text.value, {fontName: bmFont.font});
        this._bmText.maxWidth = this._app.renderer.width;

        this._app.stage.addChild(this._bmText);
    }

    _updatePreviewText() {
        if (!this._bmText) return;

        this._bmText.text = this._text.value;
    }

    _cleanUp() {
        this._app.stage.removeChildren(0);

        const installedFonts = Object.keys(PIXI.BitmapFont.available);

        for (const fontName of installedFonts) {
            if (fontName !== FontModel.FONT_NAME) {
                PIXI.BitmapFont.uninstall(fontName);
            }
        }
    }

    _resize() {
        const bounds = this._app.view.getBoundingClientRect();
        this._app.renderer.resize(bounds.width, 150);

        if (this._bmText) {
            this._bmText.maxWidth = this._app.renderer.width;
        }
    }
}
