
class MathUtils {
    static intervalRandom = (min,max) => {
        let rnd =  Math.floor(Math.random() * Math.floor(max)) 
        return rnd>min?rnd:min
    }
}

export default MathUtils