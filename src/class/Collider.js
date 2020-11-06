
class Collider {
        static collideableObjects = []
        static id = 0

        constructor(collideableObject) {
            this._id = ++Collider.id
            Collider.collideableObjects.push({
                  id: this._id ,
                  target: collideableObject,
            }) 
            this._collideableObject = collideableObject
        }

        hitTest = () => {
 
            let all =  Collider.collideableObjects.map(obj => {
                if (obj.id != this._id && obj.target != null && obj.target.enableCollider  && this._collideableObject.enableCollider && obj.target.tag != this._collideableObject.tag) {
                     let sourceX = this._collideableObject.getX()
                     let sourceY = this._collideableObject.getY()
                     let sourceW = this._collideableObject.getWidth()
                     let sourceH = this._collideableObject.getWidth()

                     let targetX  = obj.target.getX() 
                     let targetY  = obj.target.getY()
                     let targetW = obj.target.getWidth()
                     let targetH  = obj.target.getHeight()
                     
                    let hit = sourceX+ sourceW > targetX && sourceX < targetX  + targetW && sourceY + sourceH  > targetY && sourceY<targetY + targetH
                    if (hit) {
                        obj.target.onCollision(this._collideableObject)
                        return obj.target
                    }
                }
            })    
            return all
        }
        destroy = () => {
            let index = Collider.collideableObjects.findIndex(obj => obj.id == this._id)
            Collider.collideableObjects.splice(index,1)
        }

}

export default Collider
 