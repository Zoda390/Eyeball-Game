class Sound {
    constructor(src) {
        this.src = src;
    }
    play(volume) {
        this.sound = document.createElement("audio")

        this.sound.setAttribute("class","soundfx");
        this.sound.src = this.src;

        this.sound.setAttribute("preload", "none");
        this.sound.setAttribute("controls", "none");

        this.sound.style.display = "none";
        //document.body.appendChild(this.sound);

        //this.sound.volume = fxSlider.value() * volume;
        this.sound.play();
    }
}

var soundBoomy;
var soundEyeIn;
var soundFireHit;
var soundFireMelodic;
var soundFireSmall;
var soundPahPing;
var soundPwang;
var soundShooty;
var soundSwingHit;
var soundSwingMiss;
var soundSwing;

function SoundFXSetup()
{
    /*soundBoomy = new Sound('Assets/Sounds/SFX/boomy.wav');
    soundEyeIn = new Sound('Assets/Sounds/SFX/eye_in.wav');
    soundFireHit = new Sound('Assets/Sounds/SFX/fire_hit.wav');
    soundFireMelodic = new Sound('Assets/Sounds/SFX/fire_melodic.wav');
    soundFireSmall = new Sound('Assets/Sounds/SFX/fire_small.wav');
    soundPahPing = new Sound('Assets/Sounds/SFX/pah_ping.wav');
    soundPwang = new Sound('Assets/Sounds/SFX/pwang.wav');
    soundShooty = new Sound('Assets/Sounds/SFX/fire_small.wav');
    soundSwingHit = new Sound('Assets/Sounds/SFX/swing_hit.wav');
    soundSwingMiss = new Sound('Assets/Sounds/SFX/swing_miss.wav');
    soundSwing = new Sound('Assets/Sounds/SFX/swing.wav');*/
}

function ClearFinishedSounds()
{
    //add to musicPlayer.update()
    var fxlist = document.getElementsByClassName("soundfx");
    for(var i =0; i<fxlist.length; i++){
        if(fxlist[i].currentTime >= fxlist[i].duration - 0.1){ //check if done
            //console.log(fxlist[i].currentTime + " DONE " + fxlist[i].duration)
            fxlist[i].remove();
        }
    }
}

//uses
hoe_sound = new Sound(['audio/Hoe.wav'], 0.5); //preload
hoe_sound.play(); //wherever you need the sfx played

//add to musicPlayer.update()
var fxlist = document.getElementsByClassName("soundfx");
for(var i =0; i<fxlist.length; i++){
    if(fxlist[i].currentTime >= fxlist[i].duration - 0.1){ //check if done
        //console.log(fxlist[i].currentTime + " DONE " + fxlist[i].duration)
        fxlist[i].remove();
    }
}