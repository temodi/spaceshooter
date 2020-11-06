
class StageObject {
        constructor(name, stageHandler ) {
            this._name = name
            this._stageHandler = stageHandler
         }
         getName = () => {
                return this._name
         }
         run = () => {
             this._stageHandler()
         }
}

export default StageObject