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
        this._style = 'normal';
        this._weight = 'normal';
        this._variant = 'normal';
        this._dropShadow = false;
        this._dropShadowAlpha = 0.8;
        this._dropShadowAngle = 16;
        this._dropShadowBlur = 0;
        this._dropShadowColor = '#ff0000';
        this._dropShadowDistance = 2;
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
            fontStyle: this.fontStyle,
            fontWeight: this.fontWeight,
            fontVariant: this.fontVariant,
            dropShadow: this.dropShadow,
            dropShadowAlpha: this.dropShadowAlpha,
            dropShadowAngle: this.dropShadowAngle,
            dropShadowBlur: this.dropShadowBlur,
            dropShadowColor: this.dropShadowColor,
            dropShadowDistance: this.dropShadowDistance,
            trim: true,
            padding: 2,
        }, {
            chars: this.characters,
            resolution: 1,
            padding: 2,
            anisotropicLevel: 16,
            mipmap: PIXI.MIPMAP_MODES.ON,
            alphaMode: PIXI.ALPHA_MODES.PMA,
        });

        this._chars = Object.entries(this._bitmapFont.chars);

        this.dispatchEvent(new CustomEvent(EVENT_FONT_MODEL_UPDATED));
    }

    get bitmapFont() {
        return this._bitmapFont;
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

    get fontStyle() {
        return this._style;
    }

    set fontStyle(value) {
        this._style = value;
    }

    get fontWeight() {
        return this._weight;
    }

    set fontWeight(value) {
        this._weight = value;
    }

    get fontVariant() {
        return this._variant;
    }

    set fontVariant(value) {
        this._variant = value;
    }

    get dropShadow() {
        return this._dropShadow;
    }

    set dropShadow(value) {
        this._dropShadow = value;
    }

    get dropShadowAlpha() {
        return this._dropShadowAlpha;
    }

    set dropShadowAlpha(value) {
        this._dropShadowAlpha = value;
    }

    get dropShadowAngle() {
        return this._dropShadowAngle;
    }

    set dropShadowAngle(value) {
        this._dropShadowAngle = value;
    }

    get dropShadowBlur() {
        return this._dropShadowBlur;
    }

    set dropShadowBlur(value) {
        this._dropShadowBlur = value;
    }

    get dropShadowColor() {
        return this._dropShadowColor;
    }

    set dropShadowColor(value) {
        this._dropShadowColor = value;
    }

    get dropShadowDistance() {
        return this._dropShadowDistance;
    }

    set dropShadowDistance(value) {
        this._dropShadowDistance = value;
    }

    get characters() {
        return this._characters;
    }

    set characters(value) {
        this._characters = value;
    }
}
