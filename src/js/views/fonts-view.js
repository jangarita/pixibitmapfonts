import {EVENT_FONT_STYLE_CHANGED, FONT_LIST} from '../constants';

export default class FontsView extends EventTarget {
    constructor() {
        super();

        this._panel = document.getElementById('fonts-panel');
        this._fontInp = this._panel.querySelector('#font-family-inp');
        this._sizeInp = this._panel.querySelector('#font-size-inp');
        this._italicInp = this._panel.querySelector('#font-italic-chk');
        this._boldInp = this._panel.querySelector('#font-bold-chk');
        this._smallCapsInp = this._panel.querySelector('#font-small-caps-chk');

        this.listFonts().then((fontList) => {
            for (const item of fontList) {
                const option = document.createElement('option');
                option.text = item;
                option.value = item;
                option.style.fontFamily = item;

                if (item === 'Arial') {
                    option.setAttribute('selected', '');
                }

                this._fontInp.appendChild(option);
            }

            this._fontInp.onchange = this._changeFontHandler.bind(this);
            this._sizeInp.onchange = this._changeFontHandler.bind(this);
            this._italicInp.onchange = this._changeFontHandler.bind(this);
            this._boldInp.onchange = this._changeFontHandler.bind(this);
            this._smallCapsInp.onchange = this._changeFontHandler.bind(this);

            this._changeFontHandler();
        });
    }

    async listFonts() {
        const fontCheck = new Set(FONT_LIST.sort());

        await document.fonts.ready;

        const fontAvailable = new Set();

        for (const font of fontCheck.values()) {
            if (document.fonts.check(`12px "${font}"`)) {
                fontAvailable.add(font);
            }
        }

        return [...fontAvailable.values()];
    }

    _changeFontHandler() {
        this.dispatchEvent(new CustomEvent(EVENT_FONT_STYLE_CHANGED));
    }

    get fontFamily() {
        return this._fontInp.value;
    }

    get fontSize() {
        return parseInt(this._sizeInp.value);
    }

    get fontStyle() {
        return this._italicInp.checked ? 'italic' : 'normal';
    }

    get fontWeight() {
        return this._boldInp.checked ? 'bold' : 'normal';
    }

    get fontVariant() {
        return this._smallCapsInp.checked ? 'small-caps' : 'normal';
    }
}
