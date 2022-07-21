import * as PIXI from 'pixi.js';
import {EVENT_FONT_MODEL_UPDATED} from '../constants';

export default class FontModel extends EventTarget {
    static FONT_NAME = 'CustomFont';

    constructor() {
        super();

        this._fontFamily = 'Arial';
        this._fontSize = 32;
        this._strokeColor = '#000000';
        this._strokeThickness = 2;
        this._fillColor = '#ffffff';
        this._lineJoin = 'round';
        this._miterLimit = 10;
        this._characters = ' ';

        this.update();
    }

    update() {
        this._bitmapFont = PIXI.BitmapFont.from(FontModel.FONT_NAME, {
            fontFamily: this.fontFamily,
            fontSize: this.fontSize,
            stroke: this.strokeColor,
            strokeThickness: this.strokeThickness,
            fill: this.fillColor,
            lineJoin: this.lineJoin,
            miterLimit: this.miterLimit,
        }, {
            chars: this.characters,
        });

        this._chars = Object.entries(this._bitmapFont.chars);

        this.dispatchEvent(new CustomEvent(EVENT_FONT_MODEL_UPDATED));
    }

    get chars() {
        return this._chars;
    }

    get fontFamily() {
        return this._fontFamily;
    }

    set fontFamily(value) {
        this._fontFamily = value;
    }

    get fontSize() {
        return this._fontSize;
    }

    set fontSize(value) {
        this._fontSize = value;
    }

    get strokeThickness() {
        return this._strokeThickness;
    }

    set strokeThickness(value) {
        this._strokeThickness = value;
    }

    get strokeColor() {
        return this._strokeColor;
    }

    set strokeColor(value) {
        this._strokeColor = value;
    }

    get fillColor() {
        return this._fillColor;
    }

    set fillColor(value) {
        this._fillColor = value;
    }

    get lineJoin() {
        return this._lineJoin;
    }

    set lineJoin(value) {
        this._lineJoin = value;
    }

    get miterLimit() {
        return this._miterLimit;
    }

    set miterLimit(value) {
        this._miterLimit = value;
    }

    get lineHeight() {
        return this._bitmapFont.lineHeight;
    }

    get characters() {
        return this._characters;
    }

    set characters(value) {
        this._characters = value;
    }
}
