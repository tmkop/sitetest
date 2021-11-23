const pageBody = document.getElementById('pageBody');
const canvas = document.getElementById('canvas1');
const context = canvas.getContext('2d');
const canvasBCR = canvas.getBoundingClientRect();
const particlesArray = [];

const mouse = {
    x: undefined,
    y: undefined,
}
canvas.addEventListener('click', function(event){
    mouse.x = event.x-canvasBCR.x;
    mouse.y = event.y-canvasBCR.y;
});
canvas.addEventListener('mousemove', function(event){
    mouse.x = event.x-canvasBCR.x;
    mouse.y = event.y-canvasBCR.y;
});

canvas.width = pageBody.clientWidth-20;
canvas.height = pageBody.clientHeight-20;


window.addEventListener('resize', function(){
    canvas.width = pageBody.clientWidth-20;
    canvas.height = pageBody.clientHeight-20;
    
});

class Particle {
    constructor(){
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = 3;
        this.speedX = Math.random() * 4 - 1.5;
        this.speedY = Math.random() * 4 - 1.5;
        this.color = [0,255,0];
    }
    move(){
        this.x += this.speedX;
        this.y += this.speedY;
    }
    draw(){
        context.fillStyle = 'white';
        context.beginPath();
        context.arc(this.x,this.y,this.size,0, Math.PI*2);
        context.fill();
    }
    shrink(){
        var rate = .05
        if(this.size > rate){
            this.size -= rate;
        }
        
    }
}

function drawCircle(){
    context.fillStyle = 'white';
    context.beginPath();
    context.arc(mouse.x,mouse.y,6,0, Math.PI*2);
    context.fill();
}

function handleParticles(){
    for(let i = 0;i< particlesArray.length;i++){
        particlesArray[i].draw();
        particlesArray[i].move();
        particlesArray[i].shrink();

        for (let j = i; j<particlesArray.length;j++){
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx*dx + dy*dy);
            if(distance<100){
                context.beginPath();
                context.strokeStyle = 'white';
                context.lineWidth = particlesArray[i].size;
                context.moveTo(particlesArray[i].x,particlesArray[i].y);
                context.lineTo(particlesArray[j].x,particlesArray[j].y);
                context.stroke();
            }
        }
        if(particlesArray[i].size <= 2*particlesArray[i].rate){
            particlesArray.splice(i,1);
            i--;
        }
    }
}

function animate(){
    context.fillStyle = 'rgba(0,0,0,0.1)';
    context.fillRect(0,0,canvas.width,canvas.height);
    handleParticles();
    particlesArray.push(new Particle());
    requestAnimationFrame(animate);

}
animate();