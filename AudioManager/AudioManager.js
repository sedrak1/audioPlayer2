import Buttons from "../Buttons/Buttons.js";
import DrawLine from "../DrawLine/DrawLine.js";

export default class AudioManager {
    constructor(songs, currentSong) {
        this.songs = songs;
        this.currentSong = currentSong;
        this.res = [];
        for (let i = 0; i < this.songs.length; i++) {
            this.audio = document.createElement("audio");
            this.source = document.createElement("source");
            this.audio.class = "music";
            this.audio.preload = "metadata";
            this.audio.appendChild(this.source);
            this.source.src = (
                "http://localhost/audioPlayer/music/" + this.songs[i]
            )
                .split(" ")
                .join("%20");
            this.res.push(this.audio);
        }
        return this.res;
    }
}
