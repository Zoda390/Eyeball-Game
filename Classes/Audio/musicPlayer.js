class MusicPlayer {
    constructor(trackLow, trackHigh) {
        this.audioLow = this.createAudio(trackLow, "music_low");
        this.audioHigh = this.createAudio(trackHigh, "music_high");

        this.musicMixNotAnotherClassMember = 1;

        //console.log(this.musicMixNotAnotherClassMember);
        
        document.body.appendChild(this.audioLow);
        document.body.appendChild(this.audioHigh);
    }
    
    createAudio(track, id)
    {
        var audio = document.createElement("audio");
        audio.src = track;
        audio.setAttribute("controls", "none");
        audio.setAttribute("preload", "none");
        audio.id = id;
        audio.style.display = "none";
        audio.loop = true;
        return audio;
    }
    
    play() {
        this.audioLow.play();
        this.audioHigh.play();
    }
    
    updateVolume()
    {
        musicPlayer.audioLow = document.getElementById("music_low");
        musicPlayer.audioHigh = document.getElementById("music_high");
        
        var sliderValue = musicVolumeSlider.value();
        
        musicPlayer.audioLow.volume = sliderValue * (1 - musicPlayer.musicMixNotAnotherClassMember);
        musicPlayer.audioHigh.volume = sliderValue * musicPlayer.musicMixNotAnotherClassMember;
    }

    updateBlend()
    {
        musicPlayer.musicMixNotAnotherClassMember = musicBlendSlider.value();
        musicPlayer.updateVolume();
    }

    stop() {
        this.audioLow.pause();
        this.audioHigh.pause();
    }
}

//musicplayer.stop(); //wherever