import Buttons from "../Buttons/Buttons.js";

export default class AudioManager {
    constructor(songs, currentSong, playing, songSrc,parent) {
        this.songs = songs
        this.currentSong = currentSong
        this.playing = playing
        this.songSrc = songSrc;
        this.parent = parent;
        this.audio = document.createElement("audio");
        this.source = document.createElement("source");
        this.name = document.createElement("p");
        this.buttons = new Buttons(this.songs,this.currentSong,this.playing,this.audio,this.parent)
        // this.createAudio()
    }

    createAudio() {

        this.audio.id = 1
        this.name.class = "songsName";
        this.audio.class = "music";
        this.audio.preload = "metadata";
        this.parent.appendChild(this.audio);
        this.audio.appendChild(this.source);
        this.source.src = this.songSrc;
        this.name.textContent = this.songs[this.currentSong].substring(
            0,
            this.songs[this.currentSong].length - 4
        );
        this.parent.appendChild(this.name)
        this.parent.appendChild(this.audio)
        
        this.parent.appendChild(this.buttons)
        return this.audio
    }
    
}
