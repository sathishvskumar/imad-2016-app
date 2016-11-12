var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');

var config={
    user:'sathishvskumar',
    database:'sathishvskumar',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD,
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

var app = express();
app.use(morgan('combined'));

var articles = {
    'article-one':{title:'Article-One',
    heading:'Article-One',
    date:'Sep 01 2016',
    content:`<p>Then, when we started surfing the internet using tablets and mobile phones, fixed size web pages were too large to fit the viewport. To fix this, browsers on those devices scaled down the entire web page to fit the screen.
        Then, when we started surfing the internet using tablets and mobile phones, fixed size web pages were too large to fit the viewport. To fix this, browsers on those devices scaled down the entire web page to fit the screen.</p>`},
   'article-two':{title:'Article-Two',
    heading:'Article-Two',
    date:'Sep 7 2016',
    content:`<p>Then, when we started surfing the internet using tablets and mobile phones, fixed size web pages were too large to fit the viewport. To fix this, browsers on those devices scaled down the entire web page to fit the screen.</p>`},
    'article-three':{title:'Article-Three',
    heading:'Article-Three',
    date:'Sep 10 2016',
    content:`<p>Then, when we started surfing the internet using tablets and mobile phones, fixed size web pages were too large to fit the viewport. To fix this, browsers on those devices scaled down the entire web page to fit the screen.</p><hr/> <input id="comment" type="text" placeholder="Comments" maxlength="100" size="40"></input>&nbsp;<input type="submit" id="submit" value="Submit"><br/></input><br/><textarea id="comments" name="comment" cols="50" rows="7"></textarea>`}
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
             <div>
            ${content}
            </div>
        </div>
    </body>
</html>
`;
return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

//Implement Hash 

function hash(input,salt)
{
    var hashed = crypto.pbkdf2Sync(input,salt,10000,512,'sha512') ;
    return hashed;
}

app.get('/hash/:input',function(req,res){
   var hashString = hash(req.params.input,'this-is-random-string'); 
   res.send(hashString);
});

var pool = new Pool(config);
app.get('/articles/:articleName',function(req,res)
{
    var articleName = req.params.articleName;
    //get  data from article table
   
    pool.query("SELECT * FROM articles where title =$1",[articleName] ,function(err,result)
    {
        if(err)
        {
            res.result(500).send(err.toString());
        }
        else
        {
            if(result.rows.length===0)
            {
                res.result(404).send('Article not found');
            }else
            {   
             var articleData = result.rows[0];   
             
             res.send(createTemplate(articles[articleName]));
            }
        }
        
    });
    
});

app.get('/profile',function(req,res){
    res.sendFile(path.join(__dirname,'ui','profile.html'));
    
});

var counter=0;
app.get('/counter',function(req,res){
    counter=counter+1;
    res.send(counter.toString());
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

var names=[];
app.get('/submit-name',function(req,res)
{
    var name=req.query.name;
    names.push(name);
    res.send(JSON.stringify(names));
});

app.get('/:articleName', function (req, res) {
    var articleName = req.params.articleName;
   res.send(createTemplate(articles[articleName]));
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
