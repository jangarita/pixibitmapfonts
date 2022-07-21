import {EVENT_FONT_STYLE_CHANGED} from '../constants';

export default class PackagingView extends EventTarget {
    constructor() {
        super();

        this._panel = document.getElementById('pack-panel');
        this._paddingInp = this._panel.querySelector('#pack-padding-inp');
        this._borderInp = this._panel.querySelector('#pack-border-inp');
        this._potInp = this._panel.querySelector('#pack-pot-chk');
        this._squareInp = this._panel.querySelector('#pack-square-chk');

        this._paddingInp.onchange = this._changeFontHandler.bind(this);
        this._borderInp.onchange = this._changeFontHandler.bind(this);
        this._potInp.onchange = this._changeFontHandler.bind(this);
        this._squareInp.onchange = this._changeFontHandler.bind(this);
    }

    _changeFontHandler() {
        this.dispatchEvent(new CustomEvent(EVENT_FONT_STYLE_CHANGED));
    }

    get padding() {
        return parseInt(this._paddingInp.value);
    }

    get border() {
        return parseInt(this._borderInp.value);
    }

    get powerOfTwo() {
        return this._potInp.checked;
    }

    get square() {
        return this._squareInp.checked;
    }
}
