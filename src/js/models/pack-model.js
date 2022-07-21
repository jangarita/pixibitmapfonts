import {MaxRectsPacker} from 'maxrects-packer';

export default class PackModel {
    constructor() {
        this._padding = 0;
        this._border = 0;
        this._pot = true;
        this._square = false;
        this._packer = new MaxRectsPacker(2048, 2048, this._padding);
    }

    pack(chars) {
        chars = this._transformChars(chars);

        const packOptions = {
            border: this._border,
            pot: this._pot,
            square: this._square,
        };

        this._packer.padding = this._padding;
        this._packer.options = {...this._packer.options, ...packOptions};
        this._packer.reset();
        this._packer.addArray(chars);

        return this._packer.bins;
    }

    _transformChars(chars) {
        return chars.map(item => {
            item.width = item[1].texture.width;
            item.height = item[1].texture.height;
            item.hash = item[0];

            return item;
        });
    }

    get padding() {
        return this._padding;
    }

    set padding(value) {
        this._padding = value;
    }

    get border() {
        return this._border;
    }

    set border(value) {
        this._border = value;
    }

    get powerOfTwo() {
        return this._pot;
    }

    set powerOfTwo(value) {
        this._pot = value;
    }

    get square() {
        return this._square;
    }

    set square(value) {
        this._square = value;
    }

    get bins() {
        return this._packer.bins;
    }
}
