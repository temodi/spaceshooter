import * as PIXI from 'pixi.js';
import * as Assets from '../Assets'
import Collider from '../class/Collider'
import Collideable from '../class/Collideable'

class Rocket extends Collideable {
        constructor(pixiApp, container, startX, startY) {
            super()
            this.setTag('Rocket')
            this._pixiApp = pixiApp
            this._container = container
            this._collider = new Collider(this)
            this._rocket = PIXI.Sprite.from(Assets.default.rocket)
            this._sprite = this._rocket
            this._rocket.x = startX
            this._rocket.y = startY
            this._width = this._rocket.width
            this._height = this._rocket.height
            this._isFired = false
            this.draw()
        }
        setSpeed = (speed) => {
            this._speed = speed
        }
        fire = () => {
            console.log("fire")
            this._isFired = true
            this._container.addChild(this._rocket)
        }
        draw = () => {
            this._pixiApp.ticker.add(this.move, this)
        }
        move = (delta) => {
  
            if (this._isFired) {
                if (this._rocket.x > this._pixiApp.screen.width) {
                    this._isFired = false
                    this.destroy()
                } else {
                   this._rocket.x += delta * this._speed
                   this._collider.hitTest()
                }
            }
        }
        destroy = () => {
            this._pixiApp.ticker.remove(this.move, this)
            this._collider.destroy()
            this._container.removeChild(this._sprite)
        }
}

export default Rocket
