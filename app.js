const express = require('express');
const app = express();
const songs = ["An Affair to Remember (Our Love Affair)",  // array of selected frank sinatra songs
"Don't Like Goodbyes",
"Drinking Again",
"Embraceable You",
"Faithful",
"The Girls I Never Kissed",
"Guys and Dolls",
"I Believe I'm Gonna Love You",
"If I Loved You",
"If You Are But a Dream",
"My Way",
"New York, New York",
"My Silent Love",
"Only the Lonely",
"People Will Say We're in Love",
"Satin Doll",
"Until the Real Thing Comes Along",
"The Way You Look Tonight",
"What a Funny Girl (You Used to Be)",
"Why Should I Cry Over You?"]

function randomsong(songs) {  // selects a frank sinatra song randomly from array 'songs' 
    const randomIndex = Math.floor(Math.random()*songs.length);
    return songs[randomIndex];
};


app.get("/", (req, res) => {
    res.send(randomsong(songs))
});   


app.get("/birth_date", (req, res) => {
    res.send("December 12, 1915")
});   


app.get("/birth_city", (req, res) => {
    res.send("Hoboken, New Jersey")
});   


app.get("/wives", (req, res) => {
    res.send("Nancy Barbato, Ava Gardner, Mia Farrow, Barbara Marx")
});   


app.get("/picture", (req, res) => {
    res.redirect("https://en.wikipedia.org/wiki/Frank_Sinatra#/media/File:Frank_Sinatra2,_Pal_Joey.jpg")
});   


app.use((req, res, next) => {  // next will go to next middleware and if no middleware, will go to next route

    // authentication middleware
  
    const auth = {login: 'admin', password: 'admin'} 
  
    // parse login and password from headers
    const b64auth = (req.headers.authorization || '').split(' ')[1] || ''  // prompts brower to obtain header authorization and splits inputs
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':')  // input split into array to be used in if statement below
  
    // Verify login and password are set and correct
    if (login && password && login === auth.login && password === auth.password) {
      // Access granted...
      return next()
    }
  
    // Access denied...
    res.set('WWW-Authenticate', 'Basic realm="401"')
    res.status(401).send('Not authorized') // custom message
   
  });

// Endpoints
app.get('/protected', (req, res) => {
    res.send('Welcome, authenticated client')
});



app.listen(8080, '0.0.0.0')
