const pageBody = document.getElementById('pageBody');

const canvas1 = document.getElementById('canvas1');
const context1 = canvas1.getContext('2d');
const canvas2 = document.getElementById('canvas2');
const context2 = canvas2.getContext('2d');

var canvas1BCR = canvas1.getBoundingClientRect();
canvas2.style.top = canvas1BCR.top;
canvas2.style.left = canvas1BCR.left;
canvas2.style.right = canvas1BCR.right;
canvas2.style.bottom = canvas1BCR.bottom;
canvas2.style.width = canvas1BCR.width;
canvas2.style.height = canvas1BCR.height;
canvas2.style.position = "absolute";

canvas1.width = pageBody.clientWidth-20;
canvas1.height = pageBody.clientHeight-20;

window.addEventListener('resize', function(){
  canvas1.width = pageBody.clientWidth-20;
  canvas1.height = pageBody.clientHeight-20;
  o.ox = canvas1.width/2;
  o.oy = canvas1.height/2;
  canvas1BCR = canvas1.getBoundingClientRect();
  canvas2.style.top = canvas1BCR.top;
  canvas2.style.left = canvas1BCR.left;
  canvas2.style.right = canvas1BCR.right;
  canvas2.style.bottom = canvas1BCR.bottom;
  canvas2.style.width = canvas1BCR.width;
  canvas2.style.height = canvas1BCR.height;
});
var color = 'lightgreen';
var scale =  15 ;
var rate = 0.01;

let o = {
  ox:canvas1.width/2,
  oy:canvas1.height/2,
  x:function(x){
    return o.ox+(scale*x);
  },
  y:function(y){
    return o.oy+(scale*y);
  }
};

function drawCircle(x,y,r){
  context1.strokeStyle = color;
  context1.lineWidth = 1;
  context1.beginPath();
  context1.arc(o.x(x),o.y(y),r,0, Math.PI*2);
  context1.stroke();
}
function drawLine(x1,y1,x2,y2){
  context2.strokeStyle = color;
  context2.lineWidth = 2;
  context2.beginPath();
  context2.moveTo(o.x(x1),o.y(y1));
  context2.lineTo(o.x(x2),o.y(y2));
  context2.stroke();
}
function clear(){
  context2.fillStyle = 'black';
  context2.fillRect(0,0,canvas1.width,canvas1.height);
}

function toCartesian(r,theta){
  let T = (theta*Math.PI/180);
  return [Math.round(100*r*Math.cos(T))/100,Math.round(100*r*Math.sin(T))/100];
}

let s = [
  {r:  3,theta:  360},
  {r:  2,theta:  360},
  {r:  0.2,theta:  360},
  {r:  2,theta:  360},
  {r:  0.1,theta:  360},
  {r:  0.8,theta:  360},
  {r:  2,theta:  360},
  {r:  6,theta:  360},
  {r:  0.1,theta:  360},
  
  ];
var t = 0;
function draw(){
  
  var cs = [];
  
  for(let i = 0;i<s.length;i++){
    let deg = s[i].theta*(t/s[i].r);
    while(deg > 360)deg-=360;
    cs.push(toCartesian(s[i].r,deg));
  }
  var tvx = 0;
  var tvy = 0;
  for(let i = 0;i<cs.length;i++){
    drawLine(tvx,tvy,tvx+cs[i][0],tvy+cs[i][1]);
    tvx += cs[i][0];
    tvy += cs[i][1];
  }
  drawCircle(tvx,tvy,1);
  t+=rate;
}


function animate(){
  clear();
  draw();
  
  requestAnimationFrame(animate);
  
}


animate();

// clear();
// while(t<180 ){
//   draw();
// }