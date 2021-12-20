import DrawLine from "../DrawLine/DrawLine.js";
import NextButton from "./NextButton/NextButton.js";
import PlayPauseButton from "./PlayPauseButton/PlayPauseButton.js";
import PrevButton from "./PrevButton/PrevButton.js";

export default class Buttons {
    constructor(songs, currentSong, isPlaying, audios, audioParent) {
        // callbacks.nextSong()
        this.songs = songs;
        this.audios = audios
        this.audioParent = audioParent
        this.currentSong = currentSong;
        this.isPlaying = isPlaying;
        this.prev = new PrevButton(this)
        this.playPause = new PlayPauseButton(this);
        // this.next = new NextButton(this.songs, this.currentSong,this.isPlaying,this.audioParent, this.audios, this.prev, this)
        this.next = new NextButton(this)
        // this.line = new DrawLine(this.audios, this.next)
        
        this.parent = document.createElement("div");
        this.parent.append(this.prev, this.playPause, this.next.next);
        this.parent.className = "songInfo"
        this.prev.className = "btn"
        this.next.next.className = "btn"
        return this.parent
    }
}