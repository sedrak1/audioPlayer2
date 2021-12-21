export default class RotatingVinil{
    constructor(){
        this.canvas = document.createElement("canvas")
        this.ctx = this.canvas.getContext("2d")
        this.img = new Image()
        this.img.src = "./assets/vinil.png"
        this.canvas.width = 150; //Any width
        this.canvas.height = 150; //Any height
        this.canvas.style.borderRadius = 50%
        // this.rotate()
        console.log(this.img);
        return this.img
    }
    
    
    rotate(){
        let ang = 0; //angle
        this.img.onload = () => { //on image load do the following stuff
            let cache = this; //cache the local copy of image element for future reference
            let iw = cache.width;
            let ih = cache.height;
            setInterval( () => {
                this.ctx.save(); //saves the state of canvas
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); //clear the canvas
                this.ctx.translate(this.canvas.width/2, this.canvas.height/2); //let's translate
                this.ctx.rotate(Math.PI / 180 * (ang += 5)); //increment the angle and rotate the image 
                this.ctx.translate(-(this.canvas.width/2), -(this.canvas.height/2)); //let's translate
                this.ctx.drawImage(this.img, this.canvas.width/2 - iw/2, this.canvas.height/2 - ih/2, iw, ih); //draw the image ;)
                this.ctx.restore(); //restore the state of canvas
            }, 24);
        };
        
    }
}