let instance = null

class StageManager {
        constructor() {
                if (!instance) {
                     instance = this
                     this._stages = []
                }
                return instance
        }
        setStage(stage) {
            this._stages = [...this._stages, stage]
        }
        getStage(name) {
            return this._stages.find(stage => stage.getName() == name)
        }
}


export default StageManager