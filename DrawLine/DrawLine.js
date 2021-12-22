import AudioManager from "../AudioManager/AudioManager.js"

export default class DrawLine{
    constructor(getIsPlaying, songs, getCurrentSongNumber, getNextBtn, audio, getCurrentSongDuration, parent){
        this.getIsPlaying = getIsPlaying
        this.songs = songs
        this.getCurrentSongNumber = getCurrentSongNumber
        this.getNextBtn = getNextBtn
        this.audio = audio
        this.currentTime = this.audio.currentTime
        this.getCurrentSongDuration = getCurrentSongDuration
        this.parent = parent

        this.line = document.createElement("canvas")
        this.line.className = "line"
        this.line.width = 300
        this.line.height = 3
        this.line.onclick = () => this.selectTime()

        this.context = this.line.getContext("2d")
        this.end = 0
        this.selectTime()
        this.loop()

        return this.line
    }

    getCurrentTime(){
        return this.audio.audio.currentTime
    }
    
    drawLine() {
        // this.getCurrentSongDuration()
        this.clearLine(this.line);
        this.end = this.getCurrentTime() * this.line.width / this.getCurrentSongDuration()

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
                this.getCurrentSongDuration() &&
            !this.getNextBtn().disabled
        ) {
            this.getNextBtn().nextSong()
        }
    }

    selectTime() {

        this.line.onmousedown = (e) => {
            let checkedTime = (e.pageX - this.line.offsetLeft) / this.line.width;
            this.audio.audio.currentTime =
                this.getCurrentSongDuration() * checkedTime;
            this.mouseDown = true;
            this.drawLine()
        };

        this.parent.onmousemove = (event) => {
            if (this.mouseDown) {
                let checkedTime = (event.pageX - this.line.offsetLeft) / this.line.width;
                this.audio.audio.currentTime =
                    this.getCurrentSongDuration() * checkedTime;
            }
            
        };
        this.parent.onmouseup = () => {
            this.mouseDown = false;
        };
    }
}