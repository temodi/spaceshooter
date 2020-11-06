import * as PIXI from 'pixi.js';
import StageObject from '../class/StageObject'
import StageManager from '../class/StageManager';
import * as TweenJS from 'es6-tween';
import Logo from '../objects/Logo'
import { throws } from 'assert';

class SplashScreen extends StageObject {
        constructor(name, pixiApp) {
            super(name, null)
            this._pixiApp = pixiApp
            this._stageHandler = this.stageHandler
        }
        stageHandler = () => {
                this.constuctStage()
                this.addContainerToStage()
                this.fadeOut(() => {
                    this.nextStage()
                })
        }
        constuctStage = () => {
            const logo = new Logo()
            logo.setPos((this._pixiApp.screen.width - logo.getLogo().width) / 2 , (this._pixiApp.screen.height / 2)  - logo.getLogo().height)
            this._container= logo.getLogoContainer()
        }
        addContainerToStage = () => {
            this._pixiApp.stage.addChild(this._container)
        }
        nextStage = () => {
                this.destroy()
                new StageManager().getStage('MainMenu')?.run();
        }
        fadeOut = (onCompletHandler) => {
            TweenJS.autoPlay(true)
            setTimeout(() => {
                const tween = new TweenJS.Tween(this._container)
                .to({alpha: 0}, 1500)
                .on('complete', onCompletHandler)
                .play()
             }, 2 * 60)
        }
        destroy = () => {
            this._pixiApp.stage.removeChild(this._container)
        }
}

export default SplashScreen