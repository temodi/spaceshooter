class Collideable {
        tag = ''
        enableCollider = true
        constructor()  {
                this._container = null
                this._sprite = null
        }
        setTag = (tagName) => {
                this.tag = tagName
        }
        getX = () => {
                try {
                         return this._sprite && this._sprite.x    
                } catch (error) {
                         return null
                }
        }
        getY = ()  => {
                try {
                        return this._sprite && this._sprite.y         
                } catch (error) {
                        return null
                }
        }
        getWidth = () => {
                try {
                        return this._sprite && this._width         
                } catch (error) {
                        return null 
                }
        }
        getHeight = ()  => {
                try {
                        return this._sprite && this._height
                } catch (error) {
                        return null
                }
        }
        
        onCollision = (collided) =>  {
                return collided
        }
        destroy = () => {
                enableCollider = false
        }
}

export default Collideable