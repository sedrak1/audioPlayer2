export default class PlayButton {
    constructor(getIsPlaying, changeIsPlaying, getCurrentSong, audios) {
        this.getIsPlaying = getIsPlaying;
        this.changeIsPlaying = changeIsPlaying
        this.getCurrentSong = getCurrentSong
        this.audios = audios

        this.play = document.createElement("button");
        this.play.className = "btn";
        this.playInner = document.createElement("i");
        this.playInner.className = "fa fa-play-circle-o";
        this.play.appendChild(this.playInner);
        this.play.onclick = () => this.playSong();

        this.pause = document.createElement("button");
        this.pause.className = "btn";
        this.pauseInner = document.createElement("i");
        this.pauseInner.className = "fa fa-pause-circle-o";
        this.pause.appendChild(this.pauseInner);
        this.pause.onclick = () => this.pauseSong();
        this.pause.style.display = "none";

        if (this.getIsPlaying()) {
            this.play.style.display = "none";
            this.pause.style.display = "block";
        } else {
            this.play.style.display = "block";
            this.pause.style.display = "none";
        }

        this.parentDiv = document.createElement("div");
        this.parentDiv.append(this.pause, this.play);
        this.parentDiv.style.display = "inline-block";

        return this.parentDiv;
    }

    playSong() {
        this.play.style.display = "none";
        this.pause.style.display = "block";
        this.changeIsPlaying()
        this.audios[this.getCurrentSong()].play();
    }

    pauseSong() {
        this.play.style.display = "block";
        this.pause.style.display = "none";
        this.changeIsPlaying();
        this.audios[this.getCurrentSong()].pause();
    }
}
