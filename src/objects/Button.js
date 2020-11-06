import * as PIXI from 'pixi.js';
import * as Assets from '../Assets'

class Button {
        constructor(container, text, onClickHandler) {
            this._container= container
            this._text = text
            this._onClickHandler = onClickHandler
            this.constructButton()
        }
        constructButton = () => {
            // Set Button Image
            this._button = PIXI.Sprite.from(Assets.default.button);
            this._button.interactive = true;
            this._button.buttonMode = true;
            this._button.on('pointerdown', this.onClickHandler);

            // Set Text
            const text = new PIXI.Text(this._text, new PIXI.TextStyle({
                fontFamily: 'Arial',
                fontSize: 20, 
                fontWeight: 'bold', 
                fill: '#410713'
            }))
            text.anchor.set(0.5, 0.5)
            text.x = 120
            text.y = 30
  
            // Add Childs
            this._button.addChild(text)
            this._container.addChild(this._button)

        }
        getButton = () => {
            return this._button
        }
        setRelPos = (x,y) => {
            this._button.x = x
            this._button.y = y
        }
        onClickHandler = () => {
            this._onClickHandler()
        }
        
}

export default Button