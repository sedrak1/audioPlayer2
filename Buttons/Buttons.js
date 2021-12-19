export default class Buttons {
    constructor(songs, currentSong, playing) {
        this.songs = songs;
        this.currentSong = currentSong;
        this.playing = playing;
        this.play = document.createElement("button");
        this.pause = document.createElement("button");
        this.prev = document.createElement("button");
        this.next = document.createElement("button");
        this.playing = false;
        this.parent = document.createElement("div");
        this.play.onclick = () => this.playSong();
        this.pause.onclick = () => this.pauseSong();
        this.prev.onclick = () => this.prevSong();
        this.next.onclick = () => this.nextSong();
        this.parent.append(this.play, this.pause, this.prev, this.next);
        document.body.append(this.parent);
    }

    playSong() {
        if (this.playing) {
            this.pause.style.display = "none";
            audio.pause();
            let i = document.createElement("i");
            i.className = "fa fa-play-circle-o";
            this.play.appendChild(i);
            this.playing = !this.playing;
        }
    }

    pauseSong() {
        if (!this.playing) {
            this.play.style.display = "none";
            audio.play();
            let i = document.createElement("i");
            i.className = "fa fa-pause-circle-o";
            this.pause.appendChild(i);
            this.playing = !this.playing;
        }
    }

    nextSong() {
        this.enableBtn(this.prev);

        if (this.currentSong === this.songs.length - 2) {
            this.disableBtn(this.next);
        }

        audio.remove();
        this.createAudio(
            (
                "http://localhost/audioPlayer/music/" +
                this.songs[this.currentSong + 1]
            )
                .split(" ")
                .join("%20"),
            this.songs[this.currentSong + 1]
        );

        this.getCurrentSongDuration();

        if (this.playing) {
            audio.play();
        }
        this.currentSong++;
    }

    prevSong() {
        this.enableBtn(this.next);
        fetch("http://localhost/audioPlayer/data.json")
            .then((response) => response.json())
            .then((data) => {
                if (this.currentSong <= 1) {
                    this.disableBtn(this.prev);
                }

                audio.remove();
                this.createAudio(
                    (
                        "http://localhost/audioPlayer/music/" +
                        data[this.currentSong - 1]
                    )
                        .split(" ")
                        .join("%20"),
                    data[this.currentSong - 1]
                );

                this.getCurrentSongDuration();

                if (this.playing) {
                    audio.play();
                }
                this.currentSong--;
            });
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
