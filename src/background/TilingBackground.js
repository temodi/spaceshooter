import * as PIXI from 'pixi.js';

class TilingBackground extends PIXI.TilingSprite {
        constructor(width,height,assetName,speed) {
            const texture = PIXI.Texture.from(assetName)
            super(texture, width, height)  
            this._speed = speed
        }
        onUpdate(delta) {
            this.tilePosition.x -= delta * this._speed
        }
}

export default TilingBackground