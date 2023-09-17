import Sound from "../modules/Sound.js";

const golpeJugador = new Sound({soundSrc: "../../sonidos/punchJugador.mp3"})
const punchHollow = new Sound({soundSrc: "../../sonidos/punchHollow.mp3", volume: 0.7})
const salto = new Sound({soundSrc: "../../sonidos/salto.mp3"})
const sonidoMuerte = new Sound({soundSrc: "../../sonidos/sonidoMuerte.mp3"})
const correr = new Sound({soundSrc: "../../sonidos/correr.mp3", volume: 0.6})
const muerteEnemigo = new Sound({soundSrc: "../../sonidos/muerteEnemigo.mp3", volume: 0.76})
const bossGolpe = new Sound({soundSrc: "../../sonidos/bossGolpe.mp3", volume: 0.8})

export default {golpeJugador, punchHollow, salto, sonidoMuerte, correr, muerteEnemigo, bossGolpe}