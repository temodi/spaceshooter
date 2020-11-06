import * as PIXI from 'pixi.js';
import TilingBackground from './TilingBackground'

class ParallexScroller {

        constructor(pixiApp, backgroundsWithSpeed) {
                this._data = backgroundsWithSpeed
                this._pixiApp = pixiApp
                this._data = []
                this._containers = []
                backgroundsWithSpeed.forEach(e =>  this.initBackground(e.offset, new TilingBackground(e.width,e.height, e.name, e.speed)))
        }

        initBackground = (offset, tilingBackground) => {
                const container = new PIXI.Container()
                container.x = offset.x
                container.y = offset.y
                container.addChild(tilingBackground)
                this._containers.push(container)
                this._data.push(tilingBackground)
        }
        getBackgrounds = () => {
                return this._containers
        }
        draw = () => {
            this._pixiApp.ticker.add(this.onUpdate, this)
        }
        onUpdate(delta) {
            this._data.forEach(bg => bg.onUpdate(delta))
        }
        destroy = () => {
            this._pixiApp.ticker.remove(this.onUpdate, this)
        }
}

export default ParallexScroller