export class Exporter {
    constructor(fontModel, packModel) {
        this._fontModel = fontModel;
        this._packModel = packModel;
    }

    /**
     * @see https://www.angelcode.com/products/bmfont/doc/file_format.html
     * @returns {XMLDocument}
     */
    toXml() {
        const xml = document.implementation.createDocument('', '', null);
        const font = xml.createElement('font');

        const info = xml.createElement('info');
        info.setAttribute('face', this._fontModel.fontFamily);
        info.setAttribute('size', `${this._fontModel.fontSize}`);
        info.setAttribute('bold', '0'); //TODO: Bold
        info.setAttribute('italic', '0'); //TODO: Italic
        info.setAttribute('charset', '');
        info.setAttribute('unicode', '1');
        info.setAttribute('stretchH', '100');
        info.setAttribute('smooth', '1');
        info.setAttribute('aa', '1');
        info.setAttribute('padding', `${this._packModel.padding},${this._packModel.padding},${this._packModel.padding},${this._packModel.padding}`);
        info.setAttribute('spacing', `${this._packModel.border},${this._packModel.border}`);
        info.setAttribute('outline', `${this._fontModel.strokeThickness}`);

        const common = xml.createElement('common');
        common.setAttribute('lineHeight', `${this._fontModel.lineHeight}`);
        common.setAttribute('base', `${0}`); //TODO: base
        common.setAttribute('scaleW', `${this._packModel.bins[0].width}`);
        common.setAttribute('scaleH', `${this._packModel.bins[0].height}`);
        common.setAttribute('pages', '1'); //TODO: pages
        common.setAttribute('packed', '0');
        common.setAttribute('alphaChnl', '1');
        common.setAttribute('redChnl', '0');
        common.setAttribute('greenChnl', '0');
        common.setAttribute('blueChnl', '0');

        const pages = xml.createElement('pages');

        const page = xml.createElement('page'); //TODO: Multi page
        page.setAttribute('id', '0');
        page.setAttribute('file', `${this._fontModel.fontFamily}.png`); //TODO: File name

        pages.appendChild(page);

        const chars = xml.createElement('chars');
        chars.setAttribute('count', `${this._fontModel.chars.length}`);

        for (const charItem of this._fontModel.chars) {
            const char = xml.createElement('char');
            char.setAttribute('id', `${charItem[0]}`);
            char.setAttribute('x', `${charItem.x}`);
            char.setAttribute('y', `${charItem.y}`);
            char.setAttribute('width', `${charItem.width}`);
            char.setAttribute('height', `${charItem.height}`);
            char.setAttribute('xoffset', `${charItem[1].xOffset}`);
            char.setAttribute('yoffset', `${charItem[1].yOffset}`);
            char.setAttribute('xadvance', `${charItem[1].xAdvance}`);
            char.setAttribute('page', '0'); //TODO: page
            char.setAttribute('chnl', '15');

            chars.appendChild(char);
        }

        const kerningData = this._fontModel.chars
            .filter(item => item?.[1]?.kerning && Object.keys(item?.[1]?.kerning).length > 0);

        const kernings = xml.createElement('kernings');
        kernings.setAttribute('count', `${kerningData.length}`);

        for (const charItem of kerningData) {
            for (const key in charItem[1].kerning) {
                const kerning = xml.createElement('kerning');

                kerning.setAttribute('first', `${charItem[0]}`);
                kerning.setAttribute('second', `${key}`);
                kerning.setAttribute('amount', `${charItem[1].kerning[key]}`);

                kernings.appendChild(kerning);
            }
        }

        font.appendChild(info);
        font.appendChild(common);
        font.appendChild(pages);
        font.appendChild(chars);
        font.appendChild(kernings);
        xml.appendChild(font);

        return xml;
    }
}
