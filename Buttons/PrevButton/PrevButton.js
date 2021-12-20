
export default class PrevButton {
    constructor(parent){
        this.parent = parent
        
        this.prev = document.createElement("button");
        this.prev.onclick = () => this.prevSong();
        this.i = document.createElement("i")
        this.i.className = "fa fa-chevron-circle-left"
        this.prev.appendChild(this.i)
        if (this.parent.currentSong < 1) {
            this.disableBtn(this.prev);
        }
    }

    prevSong() {
        if (this.parent.currentSong <= 1) {
            this.disableBtn(this.prev);
        }
        this.parent.audios[this.parent.currentSong].pause();
        this.parent.currentSong --
        if(this.parent.isPlaying){
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