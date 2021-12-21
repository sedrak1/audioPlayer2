export default class SwitchButton {
    constructor(currentSong, songs, prevBtn, nextBtn, audios, isPlaying, songName, chnageCurrentSongNumber, getSongName, switchName) {
        this.currentSong =  currentSong;
        console.log(this.currentSong);
        this.songs = songs
        this.prevBtn = prevBtn
        this.nextBtn = nextBtn
        this.audios = audios
        this.isPlaying = isPlaying
        this.songName = songName
        this.switchName = switchName
        this.chnageCurrentSongNumber = chnageCurrentSongNumber
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
        
        this.enableBtn(this.prevBtn.btn);

        console.log(this.currentSong);
        if (this.currentSong === this.songs.length - 2) {
            this.disableBtn(this.btn);
        }

        console.log(this.currentSong());
        this.audios[this.currentSong()].pause();
        this.chnageCurrentSongNumber("+");
        this.getSongName()
        this.audios[this.currentSong].currentTime = 0;

        if (this.isPlaying) {
            this.audios[this.currentSong].play();
        }
    }

    prevSong() {
        this.enableBtn(this.nextBtn.btn);
        if (this.currentSong <= 1) {
            this.disableBtn(this.btn);
        }

        this.audios[this.currentSong].pause();
        this.chnageCurrentSongNumber("-");
        this.getSongName();
        this.audios[this.currentSong].currentTime = 0;

        if (this.isPlaying) {
            this.audios[this.currentSong].play();
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
