import {EVENT_FONT_STYLE_CHANGED} from '../constants';

export default class ShadowView extends EventTarget {
    constructor() {
        super();

        this._panel = document.getElementById('shadow-panel');
        this._enabledInp = this._panel.querySelector('#shadow-chk');
        this._colorInp = this._panel.querySelector('#shadow-color-inp');
        this._alphaInp = this._panel.querySelector('#shadow-alpha-inp');
        this._agleInp = this._panel.querySelector('#shadow-angle-inp');
        this._blurInp = this._panel.querySelector('#shadow-blur-inp');
        this._distanceInp = this._panel.querySelector('#shadow-distance-inp');

        this._enabledInp.onchange = this._changeFontHandler.bind(this);
        this._colorInp.oninput = this._changeFontHandler.bind(this);
        this._alphaInp.onchange = this._changeFontHandler.bind(this);
        this._agleInp.onchange = this._changeFontHandler.bind(this);
        this._blurInp.onchange = this._changeFontHandler.bind(this);
        this._distanceInp.onchange = this._changeFontHandler.bind(this);
    }

    _changeFontHandler() {
        this.dispatchEvent(new CustomEvent(EVENT_FONT_STYLE_CHANGED));
    }

    get enabled() {
        return this._enabledInp.checked;
    }

    get color() {
        return this._colorInp.value;
    }

    get alpha() {
        return parseFloat(this._alphaInp.value);
    }

    get angle() {
        return parseFloat(this._agleInp.value);
    }

    get blur() {
        return parseInt(this._blurInp.value);
    }

    get distance() {
        return parseInt(this._distanceInp.value);
    }
}
