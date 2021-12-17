class CreateAudio{
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
}