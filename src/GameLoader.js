import * as PIXI from 'pixi.js';
import AssetLoader from './AssetLoader';
import StageManager from './class/StageManager';
import SplashScreen from './stages/SplashScreen';
import MainMenu from './stages/MainMenu';
import Level from './stages/Level';

window.onload = () => {
    const pixiApp = new PIXI.Application({width: 800, height: 600});
    const assetLoader = new AssetLoader()

    // Add Pixi view to DOM
    const container = document.querySelector('#game-container')
    container.appendChild(pixiApp.view);

    // Setup Scenes
    const stageManager = new StageManager()
    stageManager.setStage(new SplashScreen('SplashScreen', pixiApp))
    stageManager.setStage(new MainMenu('MainMenu', pixiApp))
    stageManager.setStage(new Level('Level', pixiApp))
    
    // First Scene
    stageManager.getStage('SplashScreen')?.run()
}
