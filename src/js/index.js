import '../css/index.css';

import AppController from './app-controller';

import FontModel from './models/font-model';
import PackModel from './models/pack-model';

import FontsView from './views/fonts-view';
import PackagingView from './views/packaging-view';
import StrokeView from './views/stroke-view';

import AtlasView from './views/atlas-view';
import PreviewView from './views/preview-view';

import FileView from './views/file-view';
import CharactersView from './views/characters-view';

window.onload = async () => {
    console.log(`\u21E2 PixiJS Bitmap Font from v${window.version} \u21E0`);

    new AppController({
        fontModel: new FontModel(),
        packModel: new PackModel(),
    }, {
        fontsView: new FontsView(),
        charactersView: new CharactersView(),
        packagingView: new PackagingView(),
        strokeView: new StrokeView(),
        atlasView: new AtlasView(),
        previewView: new PreviewView(),
        fileView: new FileView(),
    });

    document.getElementById('app-version').textContent = `v${window.version}`;
};
