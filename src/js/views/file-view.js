import {saveAs} from 'file-saver';
import XmlBeautify from 'xml-beautify';
import JSZip from 'jszip';

export default class FileView {
    constructor() {
        this._container = document.getElementById('file-container');

        this._container.querySelector('#file-download-texture').onclick = this._downloadTextureHandler.bind(this);
        this._container.querySelector('#file-download-xml').onclick = this._downloadXmlHandler.bind(this);
        this._container.querySelector('#file-download-zip').onclick = this._downloadZipHandler.bind(this);
    }

    setDataToDownload(atlasCanvas, xmlData, filename) {
        this._atlasCanvas = atlasCanvas;
        this._xmlData = xmlData;
        this._filename = filename;
    }

    async _downloadTextureHandler() {
        if (!this._atlasCanvas || !this._filename) return;


        saveAs(await this._getTextureBlob(), `${this._filename}.png`);
    }

    _downloadXmlHandler() {
        if (!this._xmlData || !this._filename) return;

        saveAs(this._getXmlBlob(), `${this._filename}.fnt`);
    }

    async _downloadZipHandler() {
        if (!this._atlasCanvas || !this._xmlData || !this._filename) return;

        const zip = new JSZip();
        //const textureBlob = await this._getTextureBlob();

        zip.file(`${this._filename}.fnt`, this._getXmlBlob());
        zip.file(`${this._filename}.png`, this._getTextureBlob());

        zip.generateAsync({type: 'blob'})
            .then((content) => {
                saveAs(content, `${this._filename}.zip`);
            });
    }

    _getXmlBlob() {
        const xmlString = new XmlBeautify().beautify(new XMLSerializer().serializeToString(this._xmlData), {
            indent: '  ',
            useSelfClosingElement: true,
        });

        return new Blob([xmlString], {type: 'text/xml;charset=utf-8'});
    }

    _getTextureBlob() {
        return new Promise((resolve) => {
            this._atlasCanvas.toBlob((blob) => {
                resolve(blob);
            }, 'image/png');
        });
    }
}
