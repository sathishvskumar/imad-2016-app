var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles = {
    articleone:{title:'Article-One',
    heading:'Article-One',
    date:'Sep 5 2016',
    content:`<p>Then, when we started surfing the internet using tablets and mobile phones, fixed size web pages were too large to fit the viewport. To fix this, browsers on those devices scaled down the entire web page to fit the screen.</p>
        Then, when we started surfing the internet using tablets and mobile phones, fixed size web pages were too large to fit the viewport. To fix this, browsers on those devices scaled down the entire web page to fit the screen.`},
    articletwo:{title:'Article-Two',
    heading:'Article-One',
    date:'Sep 5 2016',
    content:`<p>Then, when we started surfing the internet using tablets and mobile phones, fixed size web pages were too large to fit the viewport. To fix this, browsers on those devices scaled down the entire web page to fit the screen.</p>}
    articlethree:{title:'Article-Three',
    heading:'Article-3',
    date:'Sep 5 2016',
    content:`<p>Then, when we started surfing the internet using tablets and mobile phones, fixed size web pages were too large to fit the viewport. To fix this, browsers on those devices scaled down the entire web page to fit the screen.</p>}
};
function createTemplate(data)
{
    var title = data.title;
    var heading = data.heading;
    var date = data.date;
    var content = data.content;
    

var htmlTemplate = `<!doctype html>
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
      <link href="ui/style.css" rel="stylesheet"/>
    </head>
    <body>
        <div class="container">
            <div>
                <a href="/">Home</a>
            </div>
            <hr/>
            <h1>${heading}</h1>
            <h3>${heading}</h3>
            <div>
              ${date}
            </div>
            ${content}
             <div>
             $content{}
            </div>
        </div>
    </body>
</html>
`;
return htmlTemplate;
}

var articleTwo = {
    title:'Article - Two'
};

function createTemplateTwo(data)
{
    var title = data.title;
    var heading;
    var date;
    var content;
    var htmlTemplateTwo = `<!doctype html>
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
      <link href="ui/style.css" rel="stylesheet"/>
    </head>
    <body>
        <div class="container">
            <div>
                <a href="/">Home</a>
            </div>
            <hr/>
            <h1>${heading}</h1>
            <h3>${heading}</h3>
            <div>
              ${date}
            </div>
            ${content}
             <div>
            </div>
        </div>
    </body>
</html>
`;
return htmlTemplateTwo;
}
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'profile.html'));
});
app.get('/article-one', function (req, res) {
   res.send(createTemplate(articleOne));
});

app.get("/article-two",function(req,res){
    res.send(createTemplateTwo(articleTwo));
});
app.get("/article-three",function(req,res){
    res.sendFile(path.join(__dirname,'ui','article-three.html'));
});

app.get("/profile",function(req,res){
    res.sendFile(path.join(__dirname,'ui','profile.html'));
    
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});
app.get('/ui/main.js',function(req,res){
    res.sendFile(path.join(__dirname,'ui','main.js'));
    
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
