import Buttons from "./Buttons/Buttons.js";
import AudioManager from "./AudioManager/AudioManager.js";
import DrawLine from "./DrawLine/DrawLine.js";
import NextButton from "./Buttons/NextButton/NextButton.js";

class Player {
    constructor(songs) {
        // this.mouseDown = false;
        this.currentSong = 0;
        this.isPlaying = false;
        this.currentSongDuration = 0;
        this.songs = songs
        this.parent = document.createElement("div")
        this.audioParent = document.createElement("div")
        document.body.appendChild(this.parent)
        document.body.appendChild(this.audioParent)
        this.audios = new AudioManager(this.songs,this.currentSong)
        this.buttons = new Buttons(this.songs, this.currentSong, this.isPlaying, this.audios, this.audioParent)
        // this.line = new DrawLine(this.audios[this.currentSong], )
        this.parent.appendChild(this.buttons)



        // AudioManager
        // ButtonManager -> NextButton, PlayPauseButton, PreviosButton
        // DrawLineManger
    }
    
    
    
    
}
const url = "http://localhost/audioPlayer/data.json";

const request = async () => {
    const response = await fetch(url);
    const songs = await response.json();
    let player = new Player(Object.values(songs));
}
request()



// new Player(document.getElementById("myPlayer"));
// new Player(document.getElementById("myPlayer1"));
