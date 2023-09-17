import keys from "../data/keys.js"

class Events{

    static verifyDown = (key) =>{
        switch(key){
            case "d" : {
                keys.d.pressed = true;
                break
            }
            case "a" : {
                keys.a.pressed = true;
                break
            }
            case "w" : {
                keys.w.pressed = true;
                break
            }
            case "g":{
                keys.g.pressed = true
                break
            }
        }
    }
    
    static verifyUp = (key) =>{
        switch(key){
            case "d" : {
                keys.d.pressed = false;
                break
            }
            case "a" : {
                keys.a.pressed = false;
                break
            }
            case "w" : {
                keys.w.pressed = false;
                break
            }
            case "g":{
                keys.g.pressed = false
                break
            }
        }
    }
}

export default Events