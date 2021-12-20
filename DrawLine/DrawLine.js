import AudioManager from "../AudioManager/AudioManager.js"

export default class DrawLine{
    constructor(audio, nextBtn, parent, songs, currentSong, isPlaying){
        this.isPlaying = isPlaying
        this.songs = songs
        this.currentSong = currentSong
        this.parent = parent
        this.nextBtn = nextBtn
        this.audio = audio
        this.currentTime = this.audio.currentTime
        this.currentSongDuration = 1
        this.getCurrentSongDuration()
        this.line = document.createElement("canvas")
        this.line.className = "line"
        this.line.width = 300
        this.line.height = 3
        this.line.onclick = () => this.selectTime()
        this.context = this.line.getContext("2d")
        this.end = 0
        this.loop()
        return this.line
    }
    
    getCurrentSongDuration() {
        this.audio.onloadedmetadata = () => {
            this.currentSongDuration = this.audio.duration;
        };
    }
    
    
    drawLine() {
        this.clearLine(this.line);
        this.end = this.audio.currentTime * this.line.width / this.currentSongDuration
        // console.log(this.audio.currentTime);
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
            this.audio.currentTime ===
                this.currentSongDuration &&
            !this.nextBtn.disabled
        ) {
            this.parent.innerHTML = "";
            this.audio = new AudioManager(this.songs,this.currentSong + 1, true,
                ("http://localhost/audioPlayer/music/" + this.songs[this.currentSong + 1])
                .split(" ")
                .join("%20"),
                this.parent).createAudio();

            this.currentSong++;
        
        }
    }

    selectTime() {

        this.line.onmousedown = (e) => {
            let checkedTime = (e.pageX - this.line.offsetLeft) / this.line.width;
            this.audio.currentTime =
                this.currentSongDuration * checkedTime;
            this.mouseDown = true;
            this.drawLine()
        };

        this.parent.onmousemove = (event) => {
            if (this.mouseDown) {
                let checkedTime = (event.pageX - this.line.offsetLeft) / this.line.width;
                this.audio.currentTime =
                    this.currentSongDuration * checkedTime;
            }
            
        };
        console.log(this.parent.onmousedout);
        this.parent.onmouseup = () => {
            this.mouseDown = false;
        };
    }
}