import DrawLine from "../DrawLine/DrawLine.js";
import PlayPauseButton from "./PlayPauseButton/PlayPauseButton.js";
import SwitchButton from "./SwitchButton/SwitchButton.js";

export default class Buttons {
    constructor(songs,  audio) {
        this.songs = songs;
        this.audio = audio
        this.currentSong = 0
        this.parent = document.createElement("div");
        this.songName = document.createElement("p");

        this.getSongName();
                
        this.prev = new SwitchButton(
            this.getCurrentSongNumber.bind(this), this.songs, this.audio, this.getNextBtn.bind(this),
            this.getIsPlaying.bind(this), 
            this.changeCurrentSongNumber.bind(this), this.getSongName.bind(this),"prev");

        this.playPause = new PlayPauseButton(this.getIsPlaying.bind(this), this.changeIsPlaying.bind(this), 
            this.getCurrentSongNumber.bind(this), this.audio);

        this.next = new SwitchButton( 
            this.getCurrentSongNumber.bind(this), this.songs, this.audio, this.getPrevBtn.bind(this), 
            this.getIsPlaying.bind(this),  
            this.changeCurrentSongNumber.bind(this), this.getSongName.bind(this),"next");

        this.line = new DrawLine(this.getIsPlaying.bind(this), this.songs, this.getCurrentSongNumber.bind(this), this.getNextBtn.bind(this), this.audio, this.getCurrentSongDuration.bind(this), this.parent);

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
        this.songName.textContent = this.songs[this.getCurrentSongNumber()].substring(
            0,
            this.songs[this.getCurrentSongNumber()].length - 4
            );
    }

    getCurrentSongDuration() {
        this.currentSongDuration = this.audio.audio.duration
        return this.currentSongDuration
    }

    getCurrentSongNumber(){
        return this.currentSong
    }

    changeIsPlaying(){
        this.isPlaying = !this.isPlaying
        return this.isPlaying
    }

    changeCurrentSongNumber(arg){
        if(arg === "+"){
            this.currentSong++
        }else if(arg === "-"){
            this.currentSong--
        }
    }

    getIsPlaying(){
        return this.isPlaying
    }

    getNextBtn(){
        return this.next
    }

    getPrevBtn(){
        return this.prev
    }
}






