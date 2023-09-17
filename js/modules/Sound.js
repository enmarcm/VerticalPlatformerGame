class Sound{
    constructor({soundSrc, volume = 1}){
        this.sound = new Audio()
        this.sound.src = soundSrc
        this.sound.volume = volume
    }

    PlaySound(){
        this.sound.play()
    }

    PauseSound(){
        this.sound.pause()
        this.sound.currentTime = 0
    }
}

export default Sound