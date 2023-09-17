class CollisionBlock{
    constructor({position,width, height, ctx}){
        this.position = position
        this.ctx = ctx
        this.width = width !== undefined ? width : 16   
        this.height = height !== undefined ? height : 5   
    }

    draw = () =>{
        if(typeof(this.ctx) == 'object'){
            this.ctx.fillStyle = "red"
            this.ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
        } 
    }

    update = () =>{
        this.draw()
    }
}

export default CollisionBlock;