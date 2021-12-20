export default class NextButton {
    constructor(parent) {
        this.parent = parent;

        this.next = document.createElement("button");
        this.next.onclick = () => this.nextSong();
        this.i = document.createElement("i");
        this.i.className = "fa fa-chevron-circle-right";
        this.next.appendChild(this.i);
        if (this.parent.currentSong === this.parent.songs.length - 1) {
            this.disableBtn(this.next);
        }
    }

    nextSong() {
        this.enableBtn(this.parent.prev.prev);

        if (this.parent.currentSong === this.parent.songs.length - 2) {
            this.disableBtn(this.next);
        }

        this.parent.audios[this.parent.currentSong].pause();
        this.parent.currentSong++;
        this.parent.getSongName();

        if (this.parent.isPlaying) {
            this.parent.audios[this.parent.currentSong].currentTime = 0;
            this.parent.audios[this.parent.currentSong].play();
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
