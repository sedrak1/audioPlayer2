export default class SwitchButton {
    constructor(getCurrentSong, songs, oppositeActionBtn, audios, getIsPlaying, changeCurrentSongNumber, getSongName, switchName) {
        this.getCurrentSong =  getCurrentSong;
        console.log(this.currentSong);
        this.songs = songs
        this.oppositeActionBtn = oppositeActionBtn
        this.audios = audios
        this.getIsPlaying = getIsPlaying
        this.switchName = switchName
        this.changeCurrentSongNumber = changeCurrentSongNumber
        this.getSongName =  getSongName
        this.btn = document.createElement("button");
        this.i = document.createElement("i");
        this.btn.appendChild(this.i);

        if(this.switchName === "prev"){
            this.btn.onclick = () => this.prevSong();
            this.i.className = "fa fa-chevron-circle-left";
            if (this.currentSong < 1) {
                this.disableBtn(this.btn);
            }
        }else if(this.switchName === "next"){
            this.btn.onclick = () => this.nextSong();
            this.i.className = "fa fa-chevron-circle-right";
            if (this.currentSong === this.songs.length - 1) {
                this.disableBtn(this.btn);
            }
        }
    }

    nextSong() {
        
        this.enableBtn(this.oppositeActionBtn().btn);

        console.log(this.getCurrentSong());
        if (this.getCurrentSong() === this.songs.length - 2) {
            this.disableBtn(this.btn);
        }

        this.audios[this.getCurrentSong()].pause();
        this.changeCurrentSongNumber("+");
        this.getSongName()
        this.audios[this.getCurrentSong()].currentTime = 0;

        if (this.getIsPlaying()) {
            this.audios[this.getCurrentSong()].play();
        }
    }

    prevSong() {
        this.enableBtn(this.oppositeActionBtn().btn);
        if (this.getCurrentSong() <= 1) {
            this.disableBtn(this.btn);
        }

        this.audios[this.getCurrentSong()].pause();
        this.changeCurrentSongNumber("-");
        this.getSongName();
        this.audios[this.getCurrentSong()].currentTime = 0;

        if (this.getIsPlaying()) {
            this.audios[this.getCurrentSong()].play();
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
