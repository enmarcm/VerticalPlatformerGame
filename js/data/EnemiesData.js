import Canvas from "./Canvas.js";
import Enemy from "../modules/Enemy.js";
import CollisionsBlockData from "./CollisionsBlockData.js"
import animations from "../animations/animations.js";

const canvas = Canvas.canvas
const ctx = Canvas.ctx

const collisionFloors = CollisionsBlockData.collisionFloors
const collisionPlataforms = CollisionsBlockData.collisionFloors
const collisionNPC = CollisionsBlockData.collisionNPC


let arrayenemies = [new Enemy({
    position:{
        x: 264,
        y: 990
    },
    canvas: canvas,
    ctx: ctx,
    imageSrc : "../../img/sprites/evilWizard/Idle.png",
    frameRate: 6,
    scale: 0.8,
    collisionBlocks : collisionFloors,
    plataformCollisionBlocks: collisionPlataforms,
    NPCCollisionBlocks: collisionNPC,
    frameDelay: 10,
    animations: animations.evilWizard
}),
new Enemy({
    position:{
        x: 42,
        y: 805
    },
    canvas: canvas,
    ctx: ctx,
    imageSrc : "../../img/sprites/evilWizard/Idle.png",
    frameRate: 6,
    scale: 0.8,
    collisionBlocks : collisionFloors,
    plataformCollisionBlocks: collisionPlataforms,
    NPCCollisionBlocks: collisionNPC,
    frameDelay: 10,
    animations: animations.evilWizard
}),
new Enemy({
    position:{
        x: 258,
        y: 605
    },
    canvas: canvas,
    ctx: ctx,
    imageSrc : "../../img/sprites/evilWizard/Idle.png",
    frameRate: 6,
    scale: 0.8,
    collisionBlocks : collisionFloors,
    plataformCollisionBlocks: collisionPlataforms,
    NPCCollisionBlocks: collisionNPC,
    frameDelay: 10,
    animations: animations.evilWizard
}),
new Enemy({
    position:{
        x: 24,
        y: 425
    },
    canvas: canvas,
    ctx: ctx,
    imageSrc : "../../img/sprites/evilWizard/Idle.png",
    frameRate: 6,
    scale: 0.8,
    collisionBlocks : collisionFloors,
    plataformCollisionBlocks: collisionPlataforms,
    NPCCollisionBlocks: collisionNPC,
    frameDelay: 10,
    animations: animations.evilWizard
}),
new Enemy({
    position:{
        x: 213,
        y: 45
    },
    canvas: canvas,
    ctx: ctx,
    imageSrc : "../../img/sprites/evilWizard/Idle.png",
    frameRate: 6,
    scale: 0.8,
    collisionBlocks : collisionFloors,
    plataformCollisionBlocks: collisionPlataforms,
    NPCCollisionBlocks: collisionNPC,
    frameDelay: 10,
    animations: animations.evilWizard
}),
new Enemy({
    position:{
        x: 454,
        y: 45
    },
    canvas: canvas,
    ctx: ctx,
    imageSrc : "../../img/sprites/evilWizard/Idle.png",
    frameRate: 6,
    scale: 0.8,
    collisionBlocks : collisionFloors,
    plataformCollisionBlocks: collisionPlataforms,
    NPCCollisionBlocks: collisionNPC,
    frameDelay: 10,
    animations: animations.evilWizard
})]

let  enemies = new Map()

for(let i = 0; i< 6; i++){
    enemies.set(i, arrayenemies[i])
}

export default enemies