export default class CreateAudio {
    constructor(song, songName) {
        this.song = song;
        this.songName = songName;
        this.parent = document.createElement("div");
        this.audio = document.createElement("audio");
        this.source = document.createElement("source");
        this.name = document.createElement("p");
    }

    createAudio() {
        this.name.class = "songName";
        this.audio.class = "music";
        this.audio.preload = "metadata";
        this.parent.appendChild(this.audio);
        this.audio.appendChild(this.source);
        this.source.src = this.song;
        this.audio.onplay = () => {
            this.playing = true;
        };
        this.name.textContent = this.songName.substring(
            0,
            this.songName.length - 4
        );
    }
}
