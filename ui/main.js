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
submit.onclick = function()
{
    /*console.log('clicked');--Old Code
     var names  =['name1','name2','name3','name4'];
     
     var list='';
      for(var i=0;i<names.length;i++)
      {
          list += '<li>' + names[i] + '</li>';
      }
      
    var ul = document.getElementById('namesList');  
      ul.innerHTML=list;*/
       var inputText = document.getElementById('name');
  var name = inputText.value;
 
      var request = new XMLHttpRequest();
    request.onreadystatechange = function()
    {
        if(request.readyState===XMLHttpRequest.DONE)
        {
          if(request.status===200)
        {
            var names = request.responseText;
            names = JSON.parse(names);
             var list='';
              for(var i=0;i<names.length;i++)
              {
                  list += '<li>' + names[i] + '</li>';
              }
            }  
        }
    };
    
    request.open('GET','http://sathishvskumar.imad.hasura-app.io/submit-name?name='+name,true);
    request.send(null);
};



