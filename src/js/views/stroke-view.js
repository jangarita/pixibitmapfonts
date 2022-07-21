import {EVENT_FONT_STYLE_CHANGED} from '../constants';

export default class StrokeView extends EventTarget {
    constructor() {
        super();

        this._panel = document.getElementById('stroke-panel');
        this._sizeInp = this._panel.querySelector('#stroke-size-inp');
        this._lineJoinInp = this._panel.querySelector('#stroke-join-sel');
        this._miterLimitInp = this._panel.querySelector('#stroke-miter-limit-inp');
        this._strokeColorInp = this._panel.querySelector('#stroke-color-inp');
        this._fillColorInp = this._panel.querySelector('#fill-color-inp');

        this._sizeInp.onchange = this._changeFontHandler.bind(this);
        this._lineJoinInp.onchange = this._changeFontHandler.bind(this);
        this._miterLimitInp.onchange = this._changeFontHandler.bind(this);
        this._strokeColorInp.oninput = this._changeFontHandler.bind(this);
        this._fillColorInp.oninput = this._changeFontHandler.bind(this);
    }

    _changeFontHandler() {
        this.dispatchEvent(new CustomEvent(EVENT_FONT_STYLE_CHANGED));
    }

    get thickness() {
        return parseInt(this._sizeInp.value);
    }

    get lineJoin() {
        return this._lineJoinInp.value;
    }

    get miterLimit() {
        return this._miterLimitInp.value;
    }

    get strokeColor() {
        return this._strokeColorInp.value;
    }

    get fillColor() {
        return this._fillColorInp.value;
    }
}
