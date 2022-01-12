class SnowFlake{
    constructor(){
        this.x = Math.random() * window.innerWidth
        this.y = Math.random() * 15
        this.radius = Math.max(1.5, Math.random()*3)
    }

    draw(ctx){
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI)
        ctx.fillStyle = "#FEF1E6"
        ctx.fill()
    }

    update(){
        this.y += 1
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
    sfs.forEach(sf => {
        sf.draw(ctx)
        sf.update()
        if(sf.pos.y >= window.innerHeight){
            sfs.pop
        }
    });

    requestAnimationFrame(onFrame)
}

window.requestAnimationFrame(onFrame)