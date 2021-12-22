export default class SwitchButton {
    constructor(getCurrentSongNumber, songs, audio, oppositeActionBtn, getIsPlaying, changeCurrentSongNumber, changeSongName, switchName) {
        this.getCurrentSongNumber =  getCurrentSongNumber;
        this.songs = songs
        this.oppositeActionBtn = oppositeActionBtn
        this.audio = audio
        this.getIsPlaying = getIsPlaying
        this.switchName = switchName
        this.changeCurrentSongNumber = changeCurrentSongNumber
        this.changeSongName =  changeSongName
        this.btn = document.createElement("button");
        this.i = document.createElement("i");
        this.btn.appendChild(this.i);

        if(this.switchName === "prev"){
            this.btn.onclick = () => this.prevSong();
            this.i.className = "fa fa-chevron-circle-left";
            this.disableBtn(this.btn);
        }else if(this.switchName === "next"){
            this.btn.onclick = () => this.nextSong();
            this.i.className = "fa fa-chevron-circle-right";
        }
    }

    nextSong() {       
        this.enableBtn(this.oppositeActionBtn().btn);

        if (this.getCurrentSongNumber() === this.songs.length - 2) {
            this.disableBtn(this.btn);
        }

        this.audio.audio.pause();
        this.changeCurrentSongNumber("+");
        this.changeSongName()
        this.audio.currentTime = 0;

        this.audio.source.src = (
            "http://localhost/audioPlayer/music/" + this.songs[this.getCurrentSongNumber()]
            )
            .split(" ")
            .join("%20");

        this.audio.audio.load()
        if (this.getIsPlaying()) {
            this.audio.audio.play();
        }
    }

    prevSong() {
        this.enableBtn(this.oppositeActionBtn().btn);

        if (this.getCurrentSongNumber() <= 1) {
            this.disableBtn(this.btn);
        }

        this.audio.audio.pause();
        this.changeCurrentSongNumber("-");
        this.changeSongName();
        this.audio.currentTime = 0;

        this.audio.source.src = (
            "http://localhost/audioPlayer/music/" + this.songs[this.getCurrentSongNumber()]
            )
            .split(" ")
            .join("%20");

        this.audio.audio.load()
        if (this.getIsPlaying()) {
            this.audio.audio.play();
        }
    }

    disableBtn(btn) {
        btn.disabled = true;
        btn.style.color = "#5c5c5c";
    }

    enableBtn(btn) {
        btn.disabled = false;
        btn.style.color = "#2121216c";
    }
}
