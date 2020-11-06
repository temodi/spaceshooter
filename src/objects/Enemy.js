import * as PIXI from 'pixi.js';
import * as Assets from '../Assets'
import Collider from '../class/Collider'
import Collideable from '../class/Collideable'
import ExplosionParticle from '../particles/Explosion'

class Enemy extends Collideable {
        
        constructor(pixiApp, container, startX, startY) {
            super()
            this.setTag('Enemy')
            this._pixiApp = pixiApp

            this._container= container
            this._startX = startX
            this._startY = startY
            this._collider = new Collider(this)
            this._enemy = PIXI.Sprite.from(Assets.default.enemy);
            this._sprite = this._enemy
            this._enemy.x = startX
            this._enemy.y = startY
            this._width = this._enemy.width
            this._height = this._enemy.height
            this._container.addChild(this._enemy)
            this._pixiApp.stage.addChild(this._container)
            this.setTicker()
        }
        setSpeed = (speed) => {
            this._speed = speed
        }
        setTicker = () => {
            this._pixiApp.ticker.add(this.move, this)
        }
        move = (delta) => {
            if (this._enemy.x < -this._enemy.width) {
                this.destroy()
            } else {
                this._enemy.x -= delta * this._speed
                this._collider.hitTest()
            }
        }
        destroy = () => {
            this._pixiApp.ticker.remove(this.move, this)
            this._collider.destroy()
            this._container.removeChild(this._sprite)
        }
        explode = () => {
                const particle = new ExplosionParticle(this._container, this.getX(), this.getY())
                particle.release()
                particle.update()
        }
        onCollision = (collided) => {
                if (['Rocket', 'SpaceShip'].indexOf(collided.tag) > -1) {
                        this.explode()
                        this.destroy()
                       collided.destroy()
                }
        }
}

export default Enemy
