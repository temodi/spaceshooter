import * as PIXI from 'pixi.js';

class Logo {
        constructor() {
            this._container= new PIXI.Container()
            this.setDefault()
        }
        setDefault = () => {
            this._style = new PIXI.TextStyle({
                fontFamily: 'Arial',
                fontSize: 50,
                fontStyle: 'italic',
                fontWeight: 'bold',
                fill: ['#e5e8c0', '#cbb928'],
                lineJoin: 'round'
            })
            this._logo  = new PIXI.Text('Space Shooter', this._style)
            this._logo.x =  this._logo.y = 0
            this._container.addChild(this._logo)
        }
        setPos  = (x, y) => {
            this._container.x = x
            this._container.y = y
        }
        getLogo =  () => {
            return this._logo
        }
        getLogoContainer = () => {
            return this._container
        }
}

export default Logo