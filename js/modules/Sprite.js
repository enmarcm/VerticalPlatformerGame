class Sprite{
    constructor({position, imageSrc, ctx, frameRate, scale, frameDelay = 0}){
        this.image = new Image()
        this.image.src = imageSrc
    
        this.position = position //Aqui es un object con x e y
        this.ctx = ctx
        this.frameRate = frameRate !== undefined ? frameRate : 1 // Esto es para saber cuantas imagenes tiene el sprite

        this.scale = scale !== undefined ? scale : 1

        this.currentFrame = 0
        this.frameDelay = frameDelay
        
        this.framesIncreased = 0
        this.loaded = false
        this.alert = false

        this.image.onload = () =>{
            this.loaded = true
            this.width = (this.image.width / this.frameRate) * this.scale
            this.height = this.image.height * this.scale
         }
    }

    draw = () =>{
        // Esto es para ir sabiendo en que lugar va a ir cortando la imagen al momento de dibujar
       if(!this.image) return this

        const cortes = {
            position:{
                x:this.currentFrame * (this.image.width / this.frameRate), 
                y : 0
            },
            width: (this.image.width / this.frameRate),
            height: this.image.height
        }

        if(typeof(this.ctx) == "object"){
            this.ctx.drawImage(this.image, cortes.position.x, cortes.position.y, cortes.width, cortes.height, this.position.x, this.position.y, this.width, this.height)
        }
        this.updateFrames()
    }

    updateFrames = () =>{
        this.framesIncreased++
        // Aqui vamos a intentar que cada frame cuente por varios frames, al solo hacer que cuente uno cada 10, haciendo que se retarde y se vea bien
        if(this.framesIncreased % this.frameDelay === 0){
            if(this.currentFrame < this.frameRate - 1){
                this.currentFrame++
            }else{
                this.currentFrame = 0
            }
        }
    }

    update = () =>{
        this.draw()
    }

    endGame=()=>{
        if(!this.alert){
            this.alert = true
            setTimeout(() => {
                alert('El juego ha terminado')
                window.location.reload() 
            }, 100);
        }
    }

    

}

export default Sprite