import Sprite from "./Sprite.js"
import VerifyCollisions from "./VerifyCollisions.js"


class Player extends Sprite{
    constructor({position, canvas, ctx, collisionBlocks, plataformCollisionBlocks, imageSrc, frameRate, scale, animations, camera, frameDelay, life = 100}){

    super({imageSrc, frameRate, scale})
    this.position = position
    this.velocity = {
        x:0, 
        y:1
    }

    this.canvas = typeof canvas == "object" ? canvas : false;
    this.ctx = typeof ctx == "object" ? ctx : false;

    this.collisionBlocks = collisionBlocks
    this.plataformCollisionBlocks = plataformCollisionBlocks
    this.animations = animations
    this.camera = camera
    this.frameDelay = frameDelay
    this.life = life

    // Ahora vamos con el resto
    this.isAttacking = false;
    this.attackDone = true

    this.gravity = 0.25 / 4

    this.hitbox = {
        position: {
            x: this.position.x,
            y: this.position.y
        },
        width: 60,
        height : 100
    }

    this.cameraBox = {
        position: {
            x: this.position.x,
            y: this.position.y
        },
        width: 400,
        height: 200
    }

    this.attackBox = {
        position:{
            x: this.hitbox.position.x + 48,
            y: this.hitbox.position.y
        },
        width : 60,
        height: this.hitbox.height
    }

    this.jump = 0
    this.jumpMax = 20
    
    
    this.hit = false;
    this.lastAttackTime = 0;

    this.enabled = true

    this.points = 0
    this.death = false

    for(const key in this.animations){
        const img = new Image()
        img.src = this.animations[key].imageSrc
        this.animations[key].image = img
    }

    this.image.onload = () =>{
        console.log('cargo')
        this.loaded = true
        this.width = (this.image.width / this.frameRate) * this.scale
        this.height = this.image.height * this.scale
     }

    // Aqui finaliza el constructor
    }




    switchSprite = (nombreSprite) =>{
        if(!this.image !== this.animations[nombreSprite].image){
            this.image = this.animations[nombreSprite].image
            this.frameRate = this.animations[nombreSprite].frameRate
            this.frameDelay = this.animations[nombreSprite].frameDelay
        }
    }


    applyGravity = () =>{
        this.velocity.y += this.gravity;
        this.position.y += this.velocity.y;
    }

    updateHitBox = () =>{
        this.hitbox = {
            position: {
                x: this.position.x + 63,
                y: this.position.y + 45
            },
            width: 40,
            height : 60
        }

    }

    updateCameraBox = () =>{
    this.cameraBox = {
        position:{
            // Aqui sacamos el alcance del area de vision, restamos 55 a la posicion para que quede 70 antes del personaje y abarque mas
            x:this.position.x - 70,
            y:this.position.y + 20
    
        },
        width:400,
        height: 200
        }

    
    }

    attackBoxRight(){
        this.attackBox = {
            position:{
                x: this.hitbox.position.x + 40,
                y: this.hitbox.position.y
            },
            width : 55,
            height: this.hitbox.height
        }
    }

    attackBoxLeft(){
        this.attackBox = {
            position:{
                x: this.hitbox.position.x - 40,
                y: this.hitbox.position.y
            },
            width : 55,
            height: this.hitbox.height
        }
    }

    updateLife(){
        this.life = this.life
    }

    verifyVerticalCollision(){
        for(let i = 0; i<this.collisionBlocks.length; i++){
            const collisionBlock = this.collisionBlocks[i]

            
            if(VerifyCollisions.VerifyCollision({object1: this.hitbox, object2: collisionBlock})){

                if(this.velocity.y > 0){
                    this.velocity.y = 0
                    const dif = this.hitbox.position.y - this.position.y + this.hitbox.height 
                    
                    this.position.y = collisionBlock.position.y - dif - 0.5
                    this.jump = 0
                    break
                }
                
                if(this.velocity.y < 0){
                    const dif = this.hitbox.position.y - this.position.y
                    
                    this.velocity.y = 0
                    this.position.y = collisionBlock.position.y + collisionBlock.height - dif + 0.5
                    this.jump = 0
                    break
                }
            }
        }

        // Ahora para las plataformas   
        for(let i=0; i<this.plataformCollisionBlocks.length;i++){
            const plataformCollisionBlock = this.plataformCollisionBlocks[i]

            if(VerifyCollisions.VerifyPlataFormCollision({object1: this.hitbox, object2: plataformCollisionBlock})){
                if(this.velocity.y > 0){
                    this.velocity.y = 0

                    const dif = this.hitbox.position.y - this.position.y + this.hitbox.height

                    this.position.y = plataformCollisionBlock.position.y - dif - 0.1
                    this.jump = 0
                    break
                }
            }
        }
    }

    verifyHorizontalCollision(){
        for(let i =0; i<this.collisionBlocks.length; i++){
            const collisionBlock = this.collisionBlocks[i]

            
            if(VerifyCollisions.VerifyCollision({object1: this.hitbox, object2: collisionBlock})){

                if(this.velocity.x > 0){
                    this.velocity.x = 0
                    const dif = this.hitbox.position.x - this.position.x + this.hitbox.width 
                    this.position.x = collisionBlock.position.x - dif - 0.5
                    break
                }

                if(this.velocity.x < 0){
                    this.velocity.x = 0
                    const dif = this.hitbox.position.x - this.position.x 
                    this.position.x = collisionBlock.position.x + collisionBlock.width - dif + 0.5
                    break
                }
            }

        }
    }

    verifyCanvasHorizontal = () =>{
        if(this.hitbox.position.x + this.hitbox.width + this.velocity.x >= 642){
            this.velocity.x = 0
        }else if(this.hitbox.position.x + this.velocity.x <= -2){
            this.velocity.x = 0
        }
    }

    changeCameraLeft({camera}){
        const cameraRight = this.cameraBox.position.x + this.cameraBox.width
        const canvasScaled = this.canvas.width / 2

        if(cameraRight < 640){
            if(cameraRight >= canvasScaled -camera.position.x){
                camera.position.x -= this.velocity.x
            }
        }
      }
    
      changeCameraRight({camera}){
        if(this.cameraBox.position.x >= 0){
          // Al poner negativo estamos intentando buscar como la otra raya de la pantalla que tiene, solo ponemos negativo y es el lado contrario, camara box es personaje + 55, asi entonces comparamos facilmente
          if(this.cameraBox.position.x <= -camera.position.x){
            camera.position.x -= this.velocity.x
          }
          
        }
    
      }
    
      changeCameraDown({camera}){

        if(this.cameraBox.position.y + this.velocity.y <= 0) return

            if(this.cameraBox.position.y <= (-camera.position.y)){
                camera.position.y -= this.velocity.y
            }
        }
    
      changeCameraUp({camera}){
        if(this.cameraBox.position.y + this.cameraBox.height >= (-camera.position.y) + this.canvas.height/1.6){
            camera.position.y -= this.velocity.y
        }
      }

      jumps(){
        if(this.jump < this.jumpMax){
            this.velocity.y = -2.4
            this.jump++
        }
      }

      attacked({restLife}){
        this.hit = true
        console.log(restLife)
        this.life -= restLife
        console.log(this.life)
      }

      verifyLife(){
        if(this.life <=0){
            this.life = 0
            this.endGame()
        }
    }

    update = () =>{
        this.verifyLife()
        this.updateLife()
        this.updateHitBox()
        this.updateCameraBox()
        this.verifyHorizontalCollision()



        // if(this.isAttacking){
        //     this.ctx.fillStyle = "red";
        //     this.ctx.fillRect(
        //     this.attackBox.position.x,
        //     this.attackBox.position.y,
        //     this.attackBox.width,
        //     this.attackBox.height
        //     );
        // }

        // Esto es la camerabox
            // this.ctx.fillStyle = "rgba(0,255,255,0.5)";
            // this.ctx.fillRect(
            // this.cameraBox.position.x,
            // this.cameraBox.position.y,
            // this.cameraBox.width,
            // this.cameraBox.height
            // );


            // Esto es para el ancho de la imagen
            // this.ctx.fillStyle = "rgba(0,255,0,0.154)";
            // this.ctx.fillRect(
            // this.position.x,
            // this.position.y,
            // this.width,
            // this.height
            // );

            // // Esta es la hitbox
            // this.ctx.fillStyle = "rgba(142,205,25,0.5)";
            // this.ctx.fillRect(
            // this.hitbox.position.x,
            // this.hitbox.position.y,
            // this.hitbox.width,
            // this.hitbox.height
            // );

            // this.ctx.fillStyle = 'yellow'
            //  this.ctx.fillRect(-this.camera.position.x, this.position.y, 10,10)

        this.verifyCanvasHorizontal()
        this.draw()
        this.position.x += this.velocity.x
        this.updateHitBox()
        this.verifyHorizontalCollision()
        this.applyGravity()
        this.updateHitBox()
        this.verifyVerticalCollision()
    }


}


export default Player