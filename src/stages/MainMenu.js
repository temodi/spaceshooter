import * as PIXI from 'pixi.js';
import StageObject from '../class/StageObject'
import StageManager from '../class/StageManager';
import Logo from '../objects/Logo';
import Button from '../objects/Button';
import StarBackground from '../background/StarBackground';

class MainMenu extends StageObject {

    constructor(name, pixiApp) {
        super(name, null)
        this._pixiApp = pixiApp
        this._stageHandler = this.stageHandler
    }

    stageHandler = () => {
        this.constuctStage()
        this.addContainerToStage()
    }

    constuctStage = () => {
        this.createBackground()
        this.setLogo()
        this.createMenu()
    } 
    setLogo = () => {
        const logo = new Logo()
        logo.setPos((this._pixiApp.screen.width - logo.getLogo().width) / 2,20)
        this._logoContainer = logo.getLogoContainer()
    }
    createMenu = () => {
        this._buttonContainer = new PIXI.Container()

        new Button(this._buttonContainer,'GAME1',this.onClickButton).setRelPos(0,0) 
        new Button(this._buttonContainer,'GAME2',this.onClickButton).setRelPos(0,70) 
        new Button(this._buttonContainer,'GAME3',this.onClickButton).setRelPos(0,140) 
        new Button(this._buttonContainer,'EXIT', this.onClickExit).setRelPos(0,210) 

        this._buttonContainer.x = (this._pixiApp.screen.width - this._buttonContainer.width) / 2
        this._buttonContainer.y = (this._pixiApp.screen.height - this._buttonContainer.height) / 2

        this.createBackground()
    }
    addContainerToStage = () => {
        this._pixiApp.stage.addChild(this._backgroundContainer)
        this._pixiApp.stage.addChild(this._logoContainer)
        this._pixiApp.stage.addChild(this._buttonContainer)
    }

    createBackground = () => {
        this._backgroundContainer = new PIXI.Container()
        const starBackground = new StarBackground(this._backgroundContainer, 800, 700, 200)
        starBackground.initAnimation(this._pixiApp)
        starBackground.startAnimation()
    }
    onClickButton = () => {
        this.destroy()
       new StageManager().getStage('Level')?.run()
    }
 
    onClickExit= () => {
            window.location = 'https://www.pixijs.com/'
    }
    destroy = () => {
        this._pixiApp.stage.removeChild(this._backgroundContainer)
        this._pixiApp.stage.removeChild(this._logoContainer)
        this._pixiApp.stage.removeChild(this._buttonContainer)
    }
}

export default MainMenu