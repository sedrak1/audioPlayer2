import AudioManager from "../AudioManager/AudioManager.js";

export default class Buttons {
    constructor(songs, currentSong, playing, audio, audioParent) {
        this.songs = songs;
        this.audio = audio
        this.audioParent = audioParent
        this.currentSong = currentSong;
        this.playing = playing;
        this.prev = document.createElement("button");
        this.play = document.createElement("button");
        this.pause = document.createElement("button");
        this.next = document.createElement("button");
        this.pause.style.display = "none"
        this.playing = playing;
        this.parent = document.createElement("div");
        this.prev.onclick = () => this.prevSong();
        this.play.onclick = () => this.playSong();
        this.pause.onclick = () => this.pauseSong();
        this.next.onclick = () => this.nextSong();
        this.parent.append(this.prev, this.play, this.pause, this.next);
        // this.playSong()
        return this.parent
    }

    playSong() {
        console.log(this.songs[this.currentSong]);
        
        if (!this.playing) {
            this.play.innerHTML = ""
            this.play.style.display = "none";
            this.pause.style.display = "block";
            this.audio.pause();
            let i = document.createElement("i");
            i.className = "fa fa-pause-circle-o";
            this.play.appendChild(i);
            this.playing = !this.playing;
            console.log(this.playing);
        }
    }

    pauseSong() {
        console.log("pause");
        if (this.playing) {
            this.pause.innerHTML = ""
            this.pause.style.display = "none";
            this.play.style.display = "block";
            this.audio.play();
            let i = document.createElement("i");
            i.className = "fa fa-play-circle-o";
            this.pause.appendChild(i);
            this.playing = !this.playing;
        }
    }

    nextSong() {
        this.next.innerHTML = ""

        let i = document.createElement("i")
        i.className = "fa fa-chevron-circle-right"
        this.next.appendChild(i)
        this.enableBtn(this.prev);

        if (this.currentSong === this.songs.length - 1) {
            this.disableBtn(this.next);
        }else{ 
            this.audioParent.innerHTML = "";
            this.audio = new AudioManager(this.songs,this.currentSong+1,this.playing,
                ("http://localhost/audioPlayer/music/" + this.songs[this.currentSong + 1])
                .split(" ")
                .join("%20"),
                this.audioParent).createAudio();
                                
                // this.getCurrentSongDuration();
                
                if (!this.playing) {
            console.log(465);
            this.audio.play();
        }
        this.currentSong++;
    }
    }

    prevSong() {
        console.log("prev");
        this.prev.innerHTML = ""
        let i = document.createElement("i")
        i.className = "fa fa-chevron-circle-left"
        this.prev.appendChild(i)
        this.enableBtn(this.next);
        
                if (this.currentSong <= 1) {
                    this.disableBtn(this.prev);
                }

                // this.audio.remove();
                this.audio = new AudioManager(
                    (
                        "http://localhost/audioPlayer/music/" +
                        this.songs[this.currentSong - 1]
                    )
                        .split(" ")
                        .join("%20"),
                    this.songs[this.currentSong - 1]
                );

                // this.getCurrentSongDuration();

                if (this.playing) {
                    this.audio.play();
                }

                this.currentSong--;
    }
    disableBtn(btn) {
        btn.disabled = true;
        btn.style.color = "#2121216c";
    }

    enableBtn(btn) {
        btn.disabled = false;
        btn.style.color = "#5c5c5c";
    }
}
