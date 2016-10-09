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
    var request = new XMLHttpRequest();
    request.onreadystatechange = function()
    {
        if(request.readyState===XMLHttpRequest.DONE)
        {
          if(request.status===200)
        {
            var counter = request.responseText;
            count.innerHTML = counter.toString();
        }  
        }
    };
    
    request.open('GET','http://sathishvskumar.imad.hasura-app.io/counter',true);
    request.send(null);
    
};

//Submit 

var submit = document.getElementById('submit_button');
var inputText = document.getElementById('name');
var names = inputText.value;

submit.onclick = function()
{
     var namesList  =['name1','name2','name3'];
     var namesValue='';
  for(var i=0;i<namesList.Length;i++)
  {
      namesValue += '<li>'+namesList[i]+'<li>';
  }
  console.log(namesValue);
  var ul = document.getElementById('namesList');
  ul.innerHTML=namesValue;
};



