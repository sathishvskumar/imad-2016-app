console.log('Loaded!');
var element = document.getElementById('main-text');
element.innerHTML='new value';  
var moveRight=0;
function moveRight()
{
     moveRight=moveRight+5;
    img.style.marginRight =moveRight+'px'; 
}
var img = document.getElementById('madi');
img.setInterval(moveRight,50);
