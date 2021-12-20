import AudioManager from "../AudioManager/AudioManager.js"

export default class DrawLine{
    constructor(parent){
        this.parent = parent
        this.isPlaying = this.parent.isPlaying
        this.songs = this.parent.songs
        this.currentSong = this.parent.currentSong
        this.nextBtn = this.parent.next.next
        this.audio = this.parent.audio
        this.currentTime = this.parent.audios[this.currentSong].currentTime
        this.currentSongDuration 
        this.line = document.createElement("canvas")
        this.line.className = "line"
        this.line.width = 300
        this.line.height = 3
        this.line.onclick = () => this.selectTime()
        this.context = this.line.getContext("2d")
        this.end = 0
        this.getCurrentSongDuration()
        this.selectTime()
        this.loop()

        return this.line
    }
    
    getCurrentSongDuration() {
        this.parent.audios[this.currentSong].onloadedmetadata = () => {
            this.currentSongDuration = this.parent.audios[this.currentSong].duration;
        };
    }

    getCurrentTime(){
        return this.parent.audios[this.parent.currentSong].currentTime
    }
    
    
    drawLine() {
        this.clearLine(this.line);
        this.end = this.getCurrentTime() * this.line.width / this.currentSongDuration
        this.context.moveTo(0, this.line.height / 2);
        this.context.lineTo(this.end, this.line.height / 2);
        this.context.lineWidth = 3;
        this.context.strokeStyle = "white";
        this.context.stroke();
    }

    clearLine(line) {
        let w = line.width;
        line.width = 1;
        line.width = w;
    }

    loop() {
        requestAnimationFrame(() => {
            this.loop()
        });
        
        this.drawLine();
        if (
            this.getCurrentTime() ===
                this.currentSongDuration &&
            !this.nextBtn.disabled
        ) {
            this.parent.next.nextSong()
        
        }
    }

    selectTime() {

        this.line.onmousedown = (e) => {
            let checkedTime = (e.pageX - this.line.offsetLeft) / this.line.width;
            this.parent.audios[this.parent.currentSong].currentTime =
                this.currentSongDuration * checkedTime;
            this.mouseDown = true;
            this.drawLine()
        };

        this.parent.parent.onmousemove = (event) => {
            if (this.mouseDown) {
                let checkedTime = (event.pageX - this.line.offsetLeft) / this.line.width;
                this.parent.audios[this.parent.currentSong].currentTime =
                    this.currentSongDuration * checkedTime;
            }
            
        };
        this.parent.parent.onmouseup = () => {
            this.mouseDown = false;
        };
    }
}