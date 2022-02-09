//test
class SnowFlake{
    constructor(){
        this.x = Math.random() * window.innerWidth
        this.y = Math.random() * 15
        this.radius = Math.max(1.5, Math.random()*3)
        if(Math.random() > 0.5){
            this.left = true
        }else{
            this.left = false
        }
        this.counter = 0
    }

    draw(ctx){
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI)
        ctx.fillStyle = "#90B8F8"
        ctx.fill()
    }

    update(){
        this.y += 1
        switch (this.left) {
            case true:
                if(this.counter < 15){
                    this.x += Math.random()/5
                    this.counter += 1
                }else{
                    this.counter = 0
                    this.left = false
                }
                break;
            
            case false:
                if(this.counter < 15){
                    this.x -= Math.random()/5
                    this.counter += 1
                }else{
                    this.counter = 0
                    this.left = true
                }
                break;
            default:
                break;
        }

    }

    get pos(){
        return {x: this.x, y: this.y}
    }
}

//initialisation code
let body = document.querySelector('body')

let canvas = document.createElement('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
canvas.style.position = "absolute"

body.appendChild(canvas)

let ctx = canvas.getContext("2d")

//fun stuff
let sfs = [] //list of snowflakes

function onFrame(){
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
    sfs.push(new SnowFlake())
    sfs.forEach((sf, index) => {
        sf.draw(ctx)
        sf.update()
        if(sf.pos.y > window.innerHeight+20){
            sfs.splice(index, 1)
        }
    })

    requestAnimationFrame(onFrame)
}

window.requestAnimationFrame(onFrame)
