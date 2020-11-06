import * as PIXI from 'pixi.js';
import StageObject from '../class/StageObject'
import StageManager from '../class/StageManager';
import SpaceShip from '../objects/SpaceShip';
import ParallexScroller from '../background/ParallexScroller';
import EnemyManager from '../objects/EnemyManager';

class Level extends StageObject {
        constructor(name, pixiApp) {
            super(name, null)
            this._pixiApp = pixiApp
            this._stageHandler = this.stageHandler
        }
        stageHandler = () => {
                this.initLevel()
                this.addContainerToStage()
        }
        addContainerToStage = () => {
                this._pixiApp.stage.addChild(this._container)
        }
        removeContainerFromStage = () => {
                this._pixiApp.stage.removeChild(this._container)
        }
        initLevel = () => {
                this._container = new PIXI.Container()
                
                // Setting Up Level
                // Background
                this._parallexScroller = new ParallexScroller(this._pixiApp, [
                        { 
                                name : 'bg_title2',
                                speed: 1,
                                width: this._pixiApp.screen.width,
                                height: 400,
                                offset: {
                                        x: 0,
                                        y: 0
                                }
                        },
                        { 
                                name : 'bg_title1',
                                speed: 3,
                                width: this._pixiApp.screen.width,
                                height: 400,
                                offset: {
                                        x: 0,
                                        y: this._pixiApp.screen.height / 3
                                }
                        }
                ])
                this._container.addChild(...this._parallexScroller.getBackgrounds())
                this._parallexScroller.draw()

                // Hero
                let spaceShip = new SpaceShip(this._pixiApp, this._container,100,100)
                spaceShip.setFinish(this.destroy)

                // Enemy
                 this._enemeyManager = new EnemyManager(this._pixiApp, this._container)
                 this._enemeyManager.init()
        }
        destroy = () => {
                 this._enemeyManager.destroy()
                 this._parallexScroller.destroy()
                 this.removeContainerFromStage()
                 new StageManager().getStage('MainMenu')?.run()
        }
}

export default Level

 