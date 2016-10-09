console.log('Loaded!');
/*var element = document.getElementById('main-text');
element.innerHTML='new value';  
var marginRight=0;
function moveRight()
{
    marginRight=moveRight+5;
    img.style.marginRight =marginRight+'px'; 
}
var img = document.getElementById('madi');
img.setInterval(moveRight,50);
*/

var button = document.getElementById('counter');
var count = document.getElementById('count');
var counter=0;
button.onclick = function()
{
    var request = XMLHttpRequest();
    request.onreadystatechange = function()
    {
        if(request.readyState===XML)
        {
            
        }
    };
    counter = counter + 1;
    count.innerHTML = counter.toString();
};

