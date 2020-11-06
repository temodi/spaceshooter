import * as PIXI from 'pixi.js';
import * as Assets from '../Assets'
import  Rocket from './Rocket'
import Collider from '../class/Collider'
import Collideable from '../class/Collideable'
import ExplosionParticle from '../particles/Explosion'


class SpaceShip extends Collideable {
        constructor(pixiApp, container, startX, startY) {
            super(container)
            this.setTag('SpaceShip')
            this._pixiApp = pixiApp
            this._container= container
            this._startX = startX
            this._startY = startY
            this._collider = new Collider(this)
            this.initShip()
        }

        initShip = () => {
            this._spaceship = PIXI.Sprite.from(Assets.default.spaceship);
            this._sprite = this._spaceship
            this._spaceship.x = this._startX 
            this._spaceship.y = this._startY
            this._width = this._sprite.width
            this._height = this._sprite.height
            this.setSpeed(3)
            this.resetMove()
            this.initTick()
            this.subscribeKeyboard()
            this._container.addChild(this._spaceship)
        }
        setFinish = (finishCallback) => {
            this._finsihed = finishCallback
        }
        setSpeed = (speed) => {
             this._speed = speed
        }
        resetMove = () => {
            this._moveDirection = {
                up: false,
                down: false,
                left: false,
                right: false
            }
        }
        keyDown = (event) => {
            switch(event.key) {
                     case 'ArrowUp':
                    case 'w':  this._moveDirection.up = true; this._moveDirection.down = false;break;
                    case 'ArrowDown':
                    case 's':  this._moveDirection.up = false; this._moveDirection.down = true;break;
                    case 'ArrowLeft':
                    case 'a':  this._moveDirection.left = true; this._moveDirection.right = false;break;
                    case 'ArrowRight':
                    case 'd':  this._moveDirection.left = false; this._moveDirection.right = true;break;
                    case ' ':  this.fire(); break;
            }
        }
        fire = () => {
                let rocket = new Rocket(this._pixiApp, this._container, this.getX() + this.getWidth() , this.getY()+ this.getHeight()/2)
                rocket.setSpeed(15)
                rocket.fire()
        }
        move = (delta) => {
            try {
                if (this._moveDirection.up && this._spaceship.y > 0) {
                    this._spaceship.y -= delta *  this._speed 
                }
                if (this._moveDirection.down &&  this._spaceship.y  < this._pixiApp.screen.height - this._spaceship.height) {
                    this._spaceship.y += delta *  this._speed 
                }
                if (this._moveDirection.left && this._spaceship.x > 0) {
                    this._spaceship.x -= delta *  this._speed 
                }
                if (this._moveDirection.right &&  this._spaceship.x  < this._pixiApp.screen.width - this._spaceship.width) {
                    this._spaceship.x += delta *  this._speed 
                }
            } catch (error) {
                console.log(error);
            }

        }
        initTick = () => {
            this._pixiApp.ticker.add(this.move)
        }
        subscribeKeyboard = () => {
            window.addEventListener("keydown", this.keyDown);
        }
        unsubscribeKeyboard = () => {
            window.removeEventListener("keydown", this.keyDown);
        }

        onCollision = (collided) => {
            if (collided.tag == 'Enemy') {
                collided.destroy()
                this.destroy()
             }
        }
        explode = () => {
            const particle = new ExplosionParticle(this._container, this.getX(), this.getY())
            particle.release()
            particle.update()
        }
        destroy = () => {
            this._pixiApp.ticker.remove(this.move, this)
            this._collider.destroy()
            this.unsubscribeKeyboard()
            this.explode()
            this._container.removeChild(this._sprite)
            setTimeout(() => {
                this._finsihed && this._finsihed()         
            }, 1000);

        }
}

export default SpaceShip