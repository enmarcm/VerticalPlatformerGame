import CollisionBlock from "./CollisionBlock.js"

class CalculateCollisions{
    constructor({arrayInit,rowLenght ,numbers = [], ctx, sizeX = 16, sizeY = 16}){
        this.arrayInit = arrayInit
        this.rowLenght = rowLenght
        this.numbers = numbers
        this.ctx = ctx
        this.collision2D = []
        this.collisionFinal = []
        this.sizeX = sizeX
        this.sizeY = sizeY
        return this
    }

    CalculateCollision = () =>{
        for(let i = 0; i< this.arrayInit.length; i+=this.rowLenght){
            this.collision2D.push(this.arrayInit.slice(i, i+this.rowLenght))
        }

        this.collision2D.forEach((element, y)=>{
            element.forEach((element2,x)=>{
                for(let j = 0; j< this.numbers.length; j++){
                    if(element2 === this.numbers[j]){

                        const add = new CollisionBlock({position:{
                            x: x*this.sizeX, y: y*this.sizeY
                        }})

                        this.collisionFinal.push(add)
                    }
                }
            })
        })

        return this.collisionFinal
    }
}

export default CalculateCollisions