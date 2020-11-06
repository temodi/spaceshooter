import * as PIXI from 'pixi.js'; 
import * as Assets from '../Assets'

class StarBackground { 
        
        /* 800x600 */
        constructor(container, starfieldWidth, starfieldHeight, starsNum) {
            this._container = container
            this._starfieldWidth = starfieldWidth
            this._starfieldHeight = starfieldHeight
            this._starsNum = starsNum
            this.stars = []
            this.initStars()
        }
        initStars = () => {
            const  starTexture = PIXI.Texture.from(Assets.default.star);
            for(let i = 0; i < this._starsNum ; i++) {
                let star = this.randomizedStar(this._starfieldWidth , this._starfieldHeight)
                star.speed = this.getRandom(10, 50)
                star.sprite = new PIXI.Sprite(starTexture)
                star.sprite.x = star.x
                star.sprite.y = star.y
                
                this._container .addChild(star.sprite)
                this.stars.push(star)
            }
        }
        getRandom = (min,max) => {
            let rnd =  Math.floor(Math.random() * Math.floor(max)) 
            return rnd>min?rnd:min
        }
        randomizedStar = (max_x,max_y) => {
            return {
                    x: this.getRandom(0, max_x),
                    y: this.getRandom(0, max_y),
            }
        }

        moveStars = (delta) => {
            this.stars.forEach(star => {
                star.y -= 50 / (delta * 10 + star.speed)
                if (star.y < 0) {
                    star.y = this._starfieldHeight 
                }
                star.sprite.y = Math.floor(star.y)
            });
        }
        initAnimation = (pixiApp) => {
            pixiApp.ticker.add((delta) => {
                    if (this._enableAnimation) {
                        this.moveStars(delta)
                    }
            })
        }
        startAnimation = () => {
            this._enableAnimation = true
        }
        stopAnimation = () => {
             this._enableAnimation = false
        }

}
 

export default StarBackground