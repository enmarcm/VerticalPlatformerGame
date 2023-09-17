import keys from "../data/keys.js";
import VerifyCollisions from "./VerifyCollisions.js";
import Sounds from "../data/Sounds.js";

class Movements {
  constructor() {
    this.lastDirection;
  }

  static MovementsEnemy = ({ player, enemy }) => {
    if (typeof enemy === "object") {
      //Muerte
      if (enemy.life <= 0) {
        enemy.enabled = false;
        // Sounds.muerteenemy.PauseSound()
        Sounds.muerteEnemigo.PlaySound();
        if (enemy.velocity.x > 0) {
          enemy.switchSprite("Death");
        } else if (enemy.velocity.x < 0) {
          enemy.switchSprite("DeathLeft");
        }
      }

      // Esto es para que se pueda acceder solo cuando el personaje este vivo
      if (enemy.enabled && player.enabled) {
        // Si la velocidad en x es mayor quiere decir que va a la derecha, si es menor es que va a la izquierda
        if (enemy.velocity.x > 0) {
          enemy.switchSprite("Idle");
        } else if (enemy.velocity.x < 0) {
          enemy.switchSprite("IdleLeft");
        }

        // Estos typeof es porque me daba error por los metodos
        if (typeof player == "object") {
          // Esto es para cuando el enemy nos ataca, verificamos las hitbox, si se chocan
          if (
            VerifyCollisions.VerifyCollision({
              object1: player.hitbox,
              object2: enemy.hitbox,
            })
          ) {
            // Si se tocan y el enemy NO estaba atacando, hacemos que este atacando y que el ataque no este completado
            if (!enemy.isAttacking) {
              enemy.isAttacking = true;
              enemy.attackDone = false;

              // Aplicamos un sonido
              Sounds.golpeJugador.PauseSound();
              Sounds.golpeJugador.PlaySound();

              // Vemos cuanta life va a quitar, podemos hacerlo con este numero o colocar un valor de ataque en la Clase enemy y ahi poner enemy.cantidadAtaque
              player.attacked({ restLife: 35 });

              // Luego de 400ms hacemmos que primero el enemy deje de atacar y que el hit del player sea falso (ya que en el metodo attacked lo pone true)
              setTimeout(() => {
                enemy.isAttacking = false;
                player.hit = false;
              }, 400);

              // Con este otro, hacemos que el ataque completado, se tienen diferente ya que depende puede durar mas uno que el otro
              setTimeout(() => {
                enemy.attackDone = true;
              }, 400);
            }
          }

          // Esto es, para saber que esta ejecutando un ataque, verificamos la direccion y cambiemos el sprite segun eso
          if (!enemy.attackDone) {
            if (enemy.velocity.x > 0) {
              enemy.switchSprite("Attack");
            } else if (enemy.velocity.x < 0) {
              enemy.switchSprite("AttackLeft");
            }
          }

          // Ahora esto, es para cuando el player (nostotros) ataca al enemy, se hace lo mismo con una peque;a diferencia
          if (
            player.isAttacking &&
            VerifyCollisions.VerifyCollision({
              object1: enemy.hitbox,
              object2: player.attackBox,
            }) &&
            !enemy.hit
          ) {
            //Como vamos a pausar por un momento a los enemys para que no se muevan durante el ataque, nos conviene establecer antes la dirreccion que tenian, para colocar la velocidad en 0 durante el golpe y luego ya reestabkecerla
            let velocidadAntes = enemy.velocity.x;

            // Lo mismo que con el player
            enemy.attacked({ restLife: 40 });
            //Por cada golpe, aumentamos un punto
            player.points++;

            // Cuando pasen 400ms, hacemos que el enemy ya no tenga hit y reanudamos su velocidad
            setTimeout(() => {
              enemy.hit = false;
              enemy.velocity.x = velocidadAntes;
            }, 400);
          }

          // Y Por supuesto, seguimos el mismo patron, cuando este golpeado, vamos a cambiar el Sprite y aprovechamos aqui para poner su velocidad en 0, para que no se mueva
          if (enemy.hit) {
            Sounds.bossGolpe.PlaySound();
            if (enemy.velocity.x > 0) {
              enemy.switchSprite("TakeHit");
            } else if (enemy.velocity.x < 0) {
              enemy.switchSprite("TakeHitLeft");
            }
            // enemy.velocity.x = 0
          }
        }
      }
    }
  };

  static MovementsPlayer = ({ player, camera }) => {
    if (typeof player === "object") {
      // Esto es para cuando muero, que me ponga todo en 0, no me pueda mover
      if (player.life <= 0) {
        player.enabled = false;
        player.velocity.x = 0;
        player.velocity.y = 0;

        if (
          this.lastDirection === "derecha" ||
          this.lastDirection === undefined
        ) {
          player.switchSprite("Death");
        } else if (this.lastDirection === "izquierda") {
          player.switchSprite("DeathLeft");
        }
      }

      if (player.enabled) {
        //Esto es para atacar
        if (keys.g.pressed && !player.isAttacking && player.attackDone) {
          // Con esto saco cuando fue el ultimo ataque que hice
          const timeLastAttack = new Date().getTime() - player.lastAttackTime;

          if (timeLastAttack > 600) {
            // Si el ultimo ataque fue mayor a 600s, entonces puedo atacar
            Sounds.punchHollow.PauseSound();
            Sounds.punchHollow.PlaySound();

            player.lastAttackTime = new Date().getTime();

            player.isAttacking = true;
            player.attackDone = false;

            // Verifico la direccion usada para saber hacia donde poner el attackBox
            if (this.lastDirection === "izquierda") {
              player.attackBoxLeft();
            } else if (
              this.lastDirection === "derecha" ||
              this.lastDirection === undefined
            ) {
              player.attackBoxRight();
            }

            // En 1s hago que el ataque y la tecla seann false, para evitar que se repita muchas veces
            setTimeout(() => {
              player.isAttacking = false;
              keys.g.pressed = false;
            }, 1);

            // Con esto en 300ms hago que sea true para que se cambie el sprite
            setTimeout(() => {
              player.attackDone = true;
            }, 300);

            // Pongo que g no esta presionada para evitar que se pueda pulsar varias veces y corte la animacion
          } else {
            keys.g.pressed = false;
          }
        } else {
          keys.g.pressed = false;
        }

        // Esto es para cuando attackDone es false, asi puedo evitar que se corte el cambio de sprite y se haga completo
        if (!player.attackDone) {
          if (this.lastDirection === "izquierda") {
            player.switchSprite("Attack1Left");
          } else if (
            this.lastDirection === "derecha" ||
            this.lastDirection === undefined
          ) {
            player.switchSprite("Attack1");
          }
        }

        // Mientras no este atacanndo, entonces puedo seguir moviendome o lo que sea
        if (player.attackDone) {
          if (keys.d.pressed) {
            Sounds.salto.PauseSound();
            Sounds.correr.PlaySound();

            player.switchSprite("Run");
            player.velocity.x = 1.5;
            this.lastDirection = "derecha";

            // Aqui pongo lo de cambiar camera, para que verifique cada vez
            player.changeCameraLeft({ camera });
          } else if (keys.a.pressed) {
            // Sounds.salto.PauseSound()
            Sounds.correr.PlaySound();

            player.switchSprite("RunLeft");
            player.velocity.x = -1.5;
            this.lastDirection = "izquierda";
            player.changeCameraRight({ camera });
          } else if (player.velocity.x === 0) {
            if (
              this.lastDirection === "derecha" ||
              this.lastDirection === undefined
            ) {
              player.switchSprite("Idle");
            } else if (this.lastDirection === "izquierda") {
              player.switchSprite("IdleLeft");
            }
          }

          if (keys.w.pressed) {
            Sounds.correr.PauseSound();

            player.jumps();
            Sounds.salto.PlaySound();
          }

          if (player.velocity.y < 0) player.changeCameraDown({ camera });
          // Este es para saltos
          if (player.velocity.x < 0 && player.velocity.y < 0) {
            player.switchSprite("JumpLeft");
          } else if (player.velocity.y < 0 && player.velocity.x > 0) {
            player.switchSprite("Jump");
          } else if (player.velocity.y < 0 && player.velocity.x === 0) {
            player.switchSprite("Jump");
          }

          // Este es para caidas
          if (player.velocity.y > 0.2) {
            player.changeCameraUp({ camera });
            if (player.velocity.x < 0) {
              player.switchSprite("FallLeft");
            } else if (player.velocity.x > 0) {
              player.switchSprite("Fall");
            } else if (player.velocity.x === 0) {
              player.switchSprite("Fall");
            }
          }

          if (!keys.a.pressed && !keys.d.pressed && !keys.w.pressed) {
            if (
              this.lastDirection === "derecha" ||
              this.lastDirection === undefined
            )
              player.switchSprite("Idle");
            else if (this.lastDirection === "izquierda")
              player.switchSprite("IdleLeft");
          }

          if (player.hit) {
            if (
              this.lastDirection === "derecha" ||
              this.lastDirection === undefined
            ) {
              player.switchSprite("TakeHitBlanco");
            } else if (this.lastDirection === "izquierda") {
              player.switchSprite("TakeHitBlancoLeft");
            }
          }
        }
      }
    }
  };
}

export default Movements;
