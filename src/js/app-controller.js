import {EVENT_FONT_STYLE_CHANGED} from './constants';
import Atlas from './utils/atlas';
import {Exporter} from './utils/exporter';

let _lastUpdate = 0, _updateTimeOut;

export default class AppController {
    constructor({fontModel, packModel}, {
        fontsView,
        charactersView,
        packagingView,
        strokeView,
        shadowView,
        atlasView,
        previewView,
        fileView
    }) {
        this._fontModel = fontModel;
        this._packModel = packModel;

        this._fontsView = fontsView;
        this._charactersView = charactersView;
        this._packagingView = packagingView;
        this._strokeView = strokeView;
        this._shadowView = shadowView;

        this._atlasView = atlasView;
        this._previewView = previewView;

        this._fileView = fileView;

        this._atlas = new Atlas();
        this._exporter = new Exporter(this._fontModel, this._packModel);

        this._fontsView.addEventListener(EVENT_FONT_STYLE_CHANGED, this._update.bind(this));
        this._charactersView.addEventListener(EVENT_FONT_STYLE_CHANGED, this._update.bind(this));
        this._packagingView.addEventListener(EVENT_FONT_STYLE_CHANGED, this._update.bind(this));
        this._strokeView.addEventListener(EVENT_FONT_STYLE_CHANGED, this._update.bind(this));
        this._shadowView.addEventListener(EVENT_FONT_STYLE_CHANGED, this._update.bind(this));
    }

    _update() {
        const timeDiff = Date.now() - _lastUpdate;

        if (timeDiff < (1 / 12) * 1000) {
            clearTimeout(_updateTimeOut);

            _updateTimeOut = setTimeout(() => this._update(), timeDiff + 10);
            return;
        }

        clearTimeout(_updateTimeOut);

        //const startTime = performance.now();

        this._fontModel.fontFamily = this._fontsView.fontFamily;
        this._fontModel.fontSize = this._fontsView.fontSize;
        this._fontModel.fontStyle = this._fontsView.fontStyle;
        this._fontModel.fontWeight = this._fontsView.fontWeight;
        this._fontModel.fontVariant = this._fontsView.fontVariant;

        this._fontModel.strokeThickness = this._strokeView.thickness;
        this._fontModel.strokeColor = this._strokeView.strokeColor;
        this._fontModel.lineJoin = this._strokeView.lineJoin;
        this._fontModel.miterLimit = this._strokeView.miterLimit;
        this._fontModel.fillColor = this._strokeView.fillColor;

        this._fontModel.dropShadow = this._shadowView.enabled;
        this._fontModel.dropShadowColor = this._shadowView.color;
        this._fontModel.dropShadowAlpha = this._shadowView.alpha;
        this._fontModel.dropShadowAngle = this._shadowView.angle;
        this._fontModel.dropShadowBlur = this._shadowView.blur;
        this._fontModel.dropShadowDistance = this._shadowView.distance;

        this._fontModel.characters = this._charactersView.characters;

        this._packModel.padding = this._packagingView.padding;
        this._packModel.border = this._packagingView.border;
        this._packModel.powerOfTwo = this._packagingView.powerOfTwo;
        this._packModel.square = this._packagingView.square;

        this._fontModel.update();

        const bins = this._packModel.pack(this._fontModel.chars);
        const atlasCanvas = this._atlas.pack(bins[0]);

        this._atlasView.showAtlas(atlasCanvas);
        const fontXml = this._exporter.toXml();

        this._previewView.preview(atlasCanvas, fontXml);

        this._fileView.setDataToDownload(atlasCanvas, fontXml, this._fontModel.fontFamily);

        //const endTime = performance.now();
        //console.log('time:', endTime - startTime);

        _lastUpdate = Date.now();
    }
}
