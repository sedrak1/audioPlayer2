import DrawLine from "../DrawLine/DrawLine.js";
import NextButton from "./NextButton/NextButton.js";
import PlayPauseButton from "./PlayPauseButton/PlayPauseButton.js";
import PrevButton from "./PrevButton/PrevButton.js";

export default class Buttons {
    constructor(songs, currentSong, isPlaying, audios, audioParent) {
        this.songs = songs;
        this.audios = audios;
        this.audioParent = audioParent;
        this.currentSong = currentSong;
        this.isPlaying = isPlaying;
        this.parent = document.createElement("div");
        this.songName = document.createElement("p");
        this.getSongName();
        
        this.prev = new PrevButton(this);
        this.playPause = new PlayPauseButton(this);
        this.next = new NextButton(this);
        this.line = new DrawLine(this);
        this.currentSongDuration = 0

        this.parent.append(this.line);
        this.parent.append(this.songName);
        this.parent.append(this.prev.prev, this.playPause, this.next.next);
        this.parent.className = "songInfo";
        this.prev.prev.className = "btn";
        this.next.next.className = "btn";
        return this.parent;
    }

    getSongName() {
        this.songName.textContent = this.songs[this.currentSong].substring(
            0,
            this.songs[this.currentSong].length - 4
        );
    }

    getCurrentSongDuration() {
       
        this.currentSongDuration = this.audios[this.currentSong].duration
    }

}