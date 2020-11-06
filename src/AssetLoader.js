import * as PIXI from 'pixi.js';
import * as Assets from './Assets'

class AssetLoader {
        constructor () {
            this.preLoadAssets()
        }
        preLoadAssets = () => {
            this._assetsLoaded = false
            this._loader = PIXI.Loader.shared
            let assets = Object.entries(Assets.default).map(([key, value]) => ({key,value}))
            assets.forEach(asset => this._loader.add(asset.key, asset.value ))
            this._loader.onLoad.add(this.onAssetsLoaded)
            this._loader.load();
        }
        onAssetsLoaded = () => {
            this._assetsLoaded = true
        }
        isAssetsLoaded  = () => {
            return this._assetsLoaded
        }
}

export default AssetLoader