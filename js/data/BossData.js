import Canvas from "./Canvas.js";
import Boss from "../modules/Boss.js";
import CollisionsBlockData from "./CollisionsBlockData.js"
import animations from "../animations/animations.js";

const canvas = Canvas.canvas
const ctx = Canvas.ctx


const boss = 
new Boss({
    position:{
        x: 120,
        y: 39
    },
    canvas: canvas,
    ctx: ctx,
    imageSrc : "../../img/sprites/hero2/Sprites/Idle.png",
    frameRate: 11,
    scale: 1.7,
    collisionBlocks : CollisionsBlockData.collisionFloors,
    plataformCollisionBlocks: CollisionsBlockData.collisionPlataforms,
    NPCCollisionBlocks: CollisionsBlockData.collisionNPC,
    frameRetardo: 10,
    animations: animations.hero2
})



export default boss