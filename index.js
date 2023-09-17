import Sprite from "./js/modules/Sprite.js";
import Player from "./js/modules/Player.js";
import Events from "./js/modules/Events.js";
import animations from "./js/animations/animations.js";
import Canvas from "./js/data/Canvas.js";
import EnemiesData from "./js/data/EnemiesData.js";
import BossData from "./js/data/BossData.js";
import Htmls from "./js/data/Htmls.js";
import CollisionsBlockData from "./js/data/CollisionsBlockData.js";
import Movements from "./js/modules/Movements.js"

const canvas = Canvas.canvas;
const ctx = Canvas.ctx;

const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  ctx: ctx,
  frameRate: 1,
  imageSrc: "./img/background/Mapa.jpg",
});

const camera = {
  position: {
    x: 0,
    y: -background.image.height + canvas.height / 2 < -890 ? -background.image.height + canvas.height / 2 : -890,
  },
};

//ESTO SE HACE PARA EVITAR ERRORES AL INICIAR LA PRIMERA VEZ
const jugador = new Player({
  position: {
    x: 150,
    y: 1000,
  },
  canvas: canvas,
  ctx: ctx,
  imageSrc: "./img/sprites/warrior/Idle.png",
  frameRate: 6,
  scale: 1,
  collisionBlocks: CollisionsBlockData.collisionFloors,
  plataformCollisionBlocks: CollisionsBlockData.collisionPlataforms,
  camera: camera,
  frameDelay: 10,
  animations: animations.Warrior,
  life: 100
});

const draw = () => {
  window.requestAnimationFrame(draw);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  ctx.save();
  ctx.scale(2, 2);
  ctx.translate(camera.position.x, camera.position.y);


  background.update();
  jugador.update();

  Htmls.htmlBarra.style.width = jugador.life + "%";
  Htmls.htmlPuntos.innerHTML = jugador.points

  jugador.velocity.x = 0;
  
  Movements.MovementsPlayer({ player: jugador, camera: camera })
  
  BossData.updateEnemy()
  Movements.MovementsEnemy({ player: jugador, enemy: BossData });

  EnemiesData.forEach((e, i) => {
    Movements.MovementsEnemy({ player: jugador, enemy: e });
    e.updateEnemy();
    // VERIFICA SI EL ENEMIGO ESTA ELIMINADO Y SI LA VIDA DEL ENEMIGO ES 0, SI TODO ESTO ES CORRECTO, LO ELIMINARA POR COMPLETO
    
    if (e.life <= 0) {
      let it = i;
      setTimeout(() => {
        EnemiesData.delete(it);
      }, 500);
    }
  });


  // Esto lo tengo comentado que es para ver los bloques de colicion

  // colisionPlataforma.forEach(e=>{
  //     e.update()
  // })

  // colisionSuelo.forEach(e=>{
  //     e.update()
  // })

  // colisionNPC.forEach(e=>{
  //     e.update()
  // })

  ctx.restore();
};

draw();


window.addEventListener("keydown", (e) => {
  Events.verifyDown(e.key.toLowerCase());
});

window.addEventListener("keyup", (e) => {
  if (e.key.toLowerCase() != "g") {
    Events.verifyUp(e.key.toLowerCase());
  }
});
