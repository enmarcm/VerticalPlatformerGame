import Sprite from "./Sprite.js";
import VerifyCollisions from "./VerifyCollisions.js";

class Enemy extends Sprite {
  constructor({
    position,
    imageSrc,
    ctx,
    frameRate,
    scale,
    canvas,
    collisionBlocks,
    plataformCollisionBlocks,
    animations,
    frameDelay,
    NPCCollisionBlocks,
  }) {
    super({ imageSrc, frameRate, scale });
    this.enabled = true
    this.life = 65;
    this.position = position;
    this.velocity = {
      x: 0.5,
      y: 0,
    };

    this.canvas = typeof canvas == "object" ? canvas : false;
    this.ctx = typeof ctx == "object" ? ctx : false;
    this.collisionBlocks = collisionBlocks;
    this.plataformCollisionBlocks = plataformCollisionBlocks;
    this.animations = animations;
    this.frameDelay = frameDelay;
    this.NPCCollisionBlocks = NPCCollisionBlocks;

    this.hitbox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      width: 48,
      height: 75,
    };

    this.width = 100;
    this.height = 100;

    this.isAttacking = false;
    this.attackDone = true;

    this.hit = false;

    for (const key in this.animations) {
      const img = new Image();
      img.src = this.animations[key].imageSrc;
      this.animations[key].image = img;
    }
  }

  attacked({ restLife }) {
    this.hit = true;
    this.life -= restLife;

    if(this.velocity.x > 0){
      this.velocity.x = -0.4
    }else if(this.velocity.x < 0){
      this.velocity.x = 0.4
    }
  }

  updateHitBox = () => {
    this.hitbox = {
      position: {
        x: this.position.x + 86,
        y: this.position.y + 90,
      },
      width: 35,
      height: 45,
    };
  };

  updateEnemy() {
    // this.ctx.fillStyle = "red"
    // this.ctx.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height)

    this.moveEnemy();
    this.position.x += this.velocity.x;
    this.draw();
    this.updateHitBox();
  }

  moveEnemy() {
    for (let i = 0; i < this.NPCCollisionBlocks.length; i++) {
      const NPCCollisionBlock = this.NPCCollisionBlocks[i];

      if (
        VerifyCollisions.VerifyCollision({
          object1: this.hitbox,
          object2: NPCCollisionBlock,
        })
      ) {
        // console.log("colisionaron");
        // console.log(this.velocity.x);

        if (this.velocity.x > 0) {
          this.velocity.x = -0.5;
          const dif =
            this.hitbox.position.x - this.position.x + this.hitbox.width;

          this.position.x = NPCCollisionBlock.position.x - dif - 0.5;
          break;
        }

        if (this.velocity.x < 0) {
          this.velocity.x = 0.5;
          const dif = this.hitbox.position.x - this.position.x;

          this.position.x =
            NPCCollisionBlock.position.x +
            NPCCollisionBlock.width -
            dif +
            0.5;

          break;
        }
      }
    }
  }

   switchSprite = (nombreSprite) => {
    if (!this.image !== this.animations[nombreSprite].image) {
      this.image = this.animations[nombreSprite].image;
      this.frameRate = this.animations[nombreSprite].frameRate;
      this.frameDelay = this.animations[nombreSprite].frameDelay;
    }
  };

}

export default Enemy;
