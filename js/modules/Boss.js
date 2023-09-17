import Enemy from "./Enemy.js";

class Boss extends Enemy {

  constructor({
    position,
    imageSrc,
    ctx,
    canvas,
    frameRate,
    scale,
    collisionBlocks,
    plataformCollisionBlocks,
    animations,
    frameDelay,
    NPCCollisionBlocks,
  }) {
    super({
      imageSrc,
      frameRate,
      scale,
      position,
      canvas,
      ctx,
      collisionBlocks,
      plataformCollisionBlocks,
      animations,
      frameDelay,
      NPCCollisionBlocks,
    });
    this.life = 500;
    this.position = position;
    this.velocity = {
      x: 0.2,
      y: 0,
    };

  }

  updateEnemy() {
    // this.ctx.fillStyle = "blue"
    // this.ctx.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height)
    
    this.verifyLife()
    this.updateHitBox();
    this.moveEnemy();
    this.position.x += this.velocity.x;
    this.draw();
  }

  verifyLife(){
    if(this.life <= 0){
      this.endGame()
    }
  }

  updateHitBox = () => {
  this.hitbox = {
    position: {
      x: this.position.x + 92,
      y: this.position.y + 72,
    },
    width: 55,
    height: 70,
  };
};
}

export default Boss;
