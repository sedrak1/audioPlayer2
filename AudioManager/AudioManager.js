export default class AudioManager {
    constructor(songs) {
        this.songs = songs;
        this.audio = document.createElement("audio");
        this.source = document.createElement("source");
        this.audio.class = "music";
        this.audio.preload = "metadata";
        this.audio.appendChild(this.source);
        this.source.src = (
            "http://localhost/audioPlayer/music/" + this.songs[0]
        )
            .split(" ")
            .join("%20");
    }
}
