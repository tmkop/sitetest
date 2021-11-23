
const homebtn = document.getElementById("homebtn");
const aboutbtn = document.getElementById("aboutbtn");
const navBarImg = document.getElementById("navlogo");

window.onload = function(){
  navBarImg.style.width = navBarImg.clientHeight;
  window.onresize = function(){
    navBarImg.style.width = navBarImg.clientHeight;
  }
}



aboutbtn.onclick = function(){
  location.href='about.html'
}
homebtn.onclick = function(){
  location.href='index.html'
}
navBarImg.onclick = function(){
  location.href='index.html'
}


