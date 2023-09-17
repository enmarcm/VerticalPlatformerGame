import CalculateCollisions from "../modules/CalculateCollisions.js"
import CollisionData from "./CollisionData.js"

const collisionFloors = new CalculateCollisions({arrayInit: CollisionData.collisionFloor, rowLenght: 40, numbers: [2243]}).CalculateCollision()
const collisionPlataforms = new CalculateCollisions({arrayInit: CollisionData.collisionPlataforms, rowLenght: 40, numbers: [2361, 2478, 2239, 2541]}).CalculateCollision()
const collisionNPC = new CalculateCollisions({arrayInit: CollisionData.collisionNPC, rowLenght: 40, numbers: [1]}).CalculateCollision()



export default {collisionFloors, collisionPlataforms, collisionNPC}