import Buttons from "./Buttons/Buttons.js";
import AudioManager from "./AudioManager/AudioManager.js";
import DrawLine from "./DrawLine/DrawLine.js";
import RotatingVinil from "./RotateingVinil/RotatingVinil.js";

class Player {
    constructor(songs) {
        this.currentSong = 0;
        this.isPlaying = false;
        this.currentSongDuration = 0;
        this.songs = songs;
        this.parent = document.createElement("div");
        this.songName = document.createElement("p");
        
        this.audio = new AudioManager(
            this.songs);
            
        this.buttons = new Buttons(
            this.songs,
            this.audio);

        document.body.appendChild(this.parent);
        this.parent.appendChild(this.buttons);
        this.parent.appendChild(this.audio.audio);
    }
}

const url = "http://localhost/audioPlayer/data.json";

const request = async () => {
    const response = await fetch(url);
    const songs = await response.json();
    let player = new Player(Object.values(songs));
};
request();
