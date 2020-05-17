// require express
const express 	= require('express');
const path 	  	= require('path');
const todoModel = require('./data/todo-db');
// create an instance our app 
const app = express();
//express returns an object, 
// which we are storing in the variable app

// Configure the app (app.set)

// setting the engine
app.set('view engine', 'ejs');
// where are the view folders?
app.set('views', path.join(__dirname, 'views'));


// Mount Middleware (app.use)


// Mount Routes 

app.get('/todos', (req, res) => {
	res.render('todos/index', {
		todos: todoModel.getAll(),
		name: 'Jim'
	})
})



// the / is the index route 
// so basically localhost:3000 in the browser
app.get('/home', (req, res) => {
	// any templates use the render method
	res.render('home');
});


app.get('/', (req, res) => {
	// console.log(req)
	res.redirect('/home')
});


app.listen(3000, () => {
	console.log("listening on port 3000")
});



