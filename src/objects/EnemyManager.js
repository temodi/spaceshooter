import * as PIXI from 'pixi.js';
import Enemy from './Enemy';
import MathUtils from '../utils/MathUtils'

class EnemyManager {
        constructor(pixiApp, container) {
            this._pixiApp = pixiApp
            this._container = container
        }
        init = () => {
            this._interval = setInterval(this.spawnEnemy.bind(this), 1000  * 2)
        }
        destroy = () => {
             clearInterval(this._interval)
        }
        spawnEnemy = () => {
                let enemy = new Enemy(this._pixiApp, this._container,860, MathUtils.intervalRandom(64,546))
                enemy.setSpeed(MathUtils.intervalRandom(1,3))
        }
}
 

export default EnemyManager