 // Load express
 const express = require('express');
 const path    = require('path');

 // requiring a module we made not installed
 const todoDB  = require('./data/todo-db');
 // Create our express app
 const app = express();

// before our routes we can set configuration
app.set('view engine', 'ejs') 
// tell express where to find our views
app.set('views', path.join(__dirname, 'views'));

 // Define a "root" route directly on app
 // Tomorrow, we'll use best practice routing
 app.get('/test', function (req, res) {
   res.send('<h1>Hello World!</h1>');
 });

 app.get('/home', function (req, res) {
    res.render('home', {
        todos: todoDB.getAll(),//returns that list of objects,
        name: "jim"
    });
  }); 
 


 // Tell the app to listen on port 3000
 // for HTTP requests from clients
 app.listen(3000, function () {
   console.log('Listening on port 3000');
 });