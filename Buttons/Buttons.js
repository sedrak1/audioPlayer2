import DrawLine from "../DrawLine/DrawLine.js";
import PlayPauseButton from "./PlayPauseButton/PlayPauseButton.js";
import SwitchButton from "./SwitchButton/SwitchButton.js";

export default class Buttons {
    constructor(songs, currentSong, isPlaying, audios) {
        this.songs = songs;
        this.audios = audios;
        this.currentSong = currentSong;
        this.isPlaying = isPlaying;
        this.parent = document.createElement("div");
        this.songName = document.createElement("p");
        this.getSongName();
        console.log(7);
        
        this.prev = new SwitchButton(this.getCurrentSong, this.songs, this.prev, this.next, this.audios, this.isPlaying, this.songName, this.changeCurrentSongNumber, this.getSongName,"prev");
        this.playPause = new PlayPauseButton(this);
        this.next = new SwitchButton( () => this.getCurrentSong(), this.songs, this.prev, this.next, this.audios, this.isPlaying, this.songName, () => this.changeCurrentSongNumber(), () => this.getSongName(),"next");
        // this.next = new SwitchButton(this, "next");
        this.line = new DrawLine(this);
        this.currentSongDuration = 0
        
        this.parent.append(this.line);
        this.parent.append(this.songName);
        this.parent.append(this.prev.btn, this.playPause, this.next.btn);
        this.parent.className = "songInfo";
        this.prev.btn.className = "btn";
        this.next.btn.className = "btn";
        return this.parent;
    }

    getSongName() {
        this.songName.textContent = this.songs[this.currentSong].substring(
            0,
            this.songs[this.currentSong].length - 4
            );
        console.log(this.songName)

    }

    getCurrentSongDuration() {
        this.currentSongDuration = this.audios[this.currentSong].duration
    }

    getCurrentSong(){
        return this.currentSong
    }

    changeIsPlaying(){
        this.isPlaying = !this.isPlaying
        return this.isPlaying
    }

    changeCurrentSongNumber(arg){
        console.log(arg);
        console.log(this.currentSong);
        if(arg === "+"){
            this.currentSong++
        }else if(arg === "-"){
            this.currentSong--
        }
    }
}