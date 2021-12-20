export default class PlayButton {
    constructor(parent) {
        this.parent = parent;

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

        if (this.parent.isPlaying) {
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
        this.parent.isPlaying = !this.parent.isPlaying;
        this.parent.audios[this.parent.currentSong].play();
    }

    pauseSong() {
        this.play.style.display = "block";
        this.pause.style.display = "none";
        this.parent.isPlaying = !this.parent.isPlaying;
        this.parent.audios[this.parent.currentSong].pause();
    }
}
