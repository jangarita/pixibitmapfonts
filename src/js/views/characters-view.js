import {ALPHA, ALPHANUMERIC, ASCII, ASCII_EXTENDED, EVENT_FONT_STYLE_CHANGED, NUMERIC} from '../constants';

export default class CharactersView extends EventTarget {
    constructor() {
        super();

        this._panel = document.getElementById('chars-panel');
        this._chars = this._panel.querySelector('#chars-chars');

        this._panel.querySelector('#chars-numeric').onclick = this._prefillWith.bind(this, NUMERIC);
        this._panel.querySelector('#chars-alpha').onclick = this._prefillWith.bind(this, ALPHA);
        this._panel.querySelector('#chars-alphanumeric').onclick = this._prefillWith.bind(this, ALPHANUMERIC);
        this._panel.querySelector('#chars-ascii').onclick = this._prefillWith.bind(this, ASCII);
        this._panel.querySelector('#chars-ascii-extended').onclick = this._prefillWith.bind(this, ASCII_EXTENDED);

        this._chars.oninput = this._changeFontHandler.bind(this);

        this._chars.value = ALPHANUMERIC;
    }

    _changeFontHandler() {
        this.dispatchEvent(new CustomEvent(EVENT_FONT_STYLE_CHANGED));
    }

    _prefillWith(chars) {
        this._chars.value = chars;

        this._changeFontHandler();
    }

    _addSpace(text) {
        if (!text.includes(' ')) text += ' ';

        return text;
    }

    get characters() {
        return this._addSpace(this._chars.value);
    }
}
