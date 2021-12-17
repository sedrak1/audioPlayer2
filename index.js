import Buttons from "./Buttons/Buttons.js"

class Player{
    constructor(){
        this.mouseDown=false
    }
    currentSong = 0
    playing = false
    currentSongDuration = 0

    playPause() {
        if(this.playing){
            document.getElementById("music").pause()
            document.getElementById("playPause").textContent=""
            let i = document.createElement("i")
            i.className = "fa fa-play-circle-o"
            document.getElementById("playPause").appendChild(i)
            this.playing = !this.playing
        }else{
            document.getElementById("music").play()
            document.getElementById("playPause").textContent=""
            let i = document.createElement("i")
            i.className = "fa fa-pause-circle-o"
            document.getElementById("playPause").appendChild(i)
            this.playing = !this.playing

        }
        
    }

    createAudio(song,songName){
        if(document.getElementById("songName")){
            document.getElementById("songName").remove()
        }
        
        let parent = document.getElementById("player")
        let audio = document.createElement("audio")
        let source = document.createElement("source")
        let name = document.createElement("p")

        name.id = "songName"
        audio.id="music"
        audio.preload = "metadata"
        source.id="source"
        parent.insertBefore(audio, parent.children[1])
        audio.appendChild(source)
        source.src = song
        audio.onplay = () => { this.playing = true }
    
        name.textContent = songName.substring(0, songName.length - 4)
        document.getElementById("songInfo").appendChild(name)
    }

    nextSong(){
        this.enableBtn("prev")
        
        fetch("http://localhost/audioPlayer/data.json").then((response) => response.json()).then((data) => {
            if(this.currentSong === Object.keys(data).length - 2){
                this.disableBtn("next")
            }
            
            document.getElementById("music").remove()
            this.createAudio(("http://localhost/audioPlayer/music/" + data[this.currentSong + 1]).split(" ").join("%20"),data[this.currentSong + 1])

            this.getCurrentSongDuration()
            
            if(this.playing){
                document.getElementById("music").play()
            }
            this.currentSong ++     
        })
    }

    prevSong(){
        this.enableBtn("next")
        fetch("http://localhost/audioPlayer/data.json").then((response) => response.json()).then((data) => {
            if(this.currentSong <= 1){
                this.disableBtn("prev")
            }
            
            document.getElementById("music").remove()
            this.createAudio(("http://localhost/audioPlayer/music/" + data[this.currentSong - 1]).split(" ").join("%20"),data[this.currentSong - 1])

            this.getCurrentSongDuration()
            
            if(this.playing){
                document.getElementById("music").play()
            }
            this.currentSong -- 
        })
    }

    getCurrentSongDuration(){
        document.getElementById("music").onloadedmetadata = () => {
            this.currentSongDuration = document.getElementById("music").duration
        };
    }

    drawLine(){
        let line = document.getElementById("line")
        let context = line.getContext("2d")
        let currentTime = document.getElementById("music").currentTime
        let end = currentTime * line.width / this.currentSongDuration

        this.clearLine(line)
        
        context.moveTo(0, line.height/2)
        context.lineTo(end, line.height/2)
        context.lineWidth = 3
        context.strokeStyle = "white"
        context.stroke()    
    }

    clearLine(line){
        let w = line.width;
        line.width = 1;
        line.width = w;
    }

    loop(){
        let line = document.getElementById("line")
        requestAnimationFrame(()=>this.loop())
        this.drawLine()
        if(document.getElementById("music").currentTime === this.currentSongDuration && !document.getElementById("next").disabled ){
            this.nextSong()
        }
    }

    selectTime(){
        let line = document.getElementById("line")

        line.onmousedown = (e) => {    
            let checkedTime = (e.pageX - line.offsetLeft) / line.width 
            document.getElementById("music").currentTime = this.currentSongDuration * checkedTime     
            this.mouseDown = true
        }

        document.getElementById("songInfo").onmousemove = (event) => {
            if(this.mouseDown){
                let checkedTime = (event.pageX - line.offsetLeft) / line.width 
                document.getElementById("music").currentTime = this.currentSongDuration * checkedTime 
            }
        }

        document.getElementById("songInfo").onmouseup = ()=>{
            this.mouseDown=false
        }
    }
    
    disableBtn(id){
        let btn = document.getElementById(id)
        btn.disabled = true
        btn.style.color = "#2121216c"
    }

    enableBtn(id){
        let btn = document.getElementById(id)
        btn.disabled = false
        btn.style.color = "#5c5c5c"
    }

    onload =()=>{
        this.createAudio(("./music/3.33 - TIKNIkneR.mp3"),"3.33 - TIKNIkneR.mp3") 
        document.getElementById("music").onloadedmetadata = () => {
            this.currentSongDuration = document.getElementById("music").duration
        };   
        this.drawLine()
        this.selectTime()
        this.loop()
        this.disableBtn("prev")
    }
}

let player = new Player
// player.onload()


let a = new Buttons(player.playPause,player.playPause,player.prevSong,player.nextSong)
a.createButtons()
console.log(a)
new Player(document.getElementById('myPlayer'))
new Player(document.getElementById('myPlayer1'))