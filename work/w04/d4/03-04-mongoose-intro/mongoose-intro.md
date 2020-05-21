# Intro To
<br>
<img src="https://i.imgur.com/cD5R8OG.png" width="900px">

### Learning Objectives

|Students will be able to:|
|---|
|Describe the use case for Mongoose|
|Define a basic Schema for a single Model|
|Create and Read documents using a Model|
|Define default values in a Schema|
|Define validations in a Schema|

## Roadmap

1. Setup
1. Intro to Mongoose
1. Including Mongoose in an app
1. Defining Schemas in Mongoose
1. Built-in Types for Properties
1. Compiling Schemas into Models
1. Use a Model to Create data
1. Use a Model to Read data
1. Timestamps Option
1. Summary
1. Essential Questions
1. Further Study
	- Defining default values for a Property
	- Defining validations for a Property

## Setup

To get setup, please:

1. Move into your **code** folder: `cd ~/code`

2. Create a new Express app using Express Generator:

	```
	express -e mongoose-movies
	```
	then move into the newly created project folder
	
	```
	cd mongoose-movies
	```
	and install the Node modules
	```
	npm i
	```
	
3. Rename `app.js` to `server.js` and update the following line in **bin/www** as follows:

	```
	// var app = require('../app');
	// Replace require('../app') with require('../server') as shown below
	var app = require('../server');
	```
	
4. Just in case you need to sync during the code-along, let's make this project a repo and link to the code-along's remote:

	```
	git init
	```
	add the remote
	```
	git remote add origin https://git.generalassemb.ly/SEI-CC/mongoose-movies-codealong.git
	```

5. IF you need to sync during the code-along, here are the familiar commands:

	```
	git fetch --all
	git reset --hard origin/master
	```

## Intro to Mongoose

### What is Mongoose?

Yes, this guy, but not in the context of MongoDB...

<img src="https://i.imgur.com/Y74xxoD.jpg" width="900">

[Mongoose](https://mongoosejs.com/) is software called an **Object Document Mapper (ODM)** because it maps object-oriented JavaScript to MongoDB _documents_.

### Why use Mongoose?

Mongoose is the goto when performing CRUD data operations on a MongoDB database.

Using Mongoose is easier and more productive than working directly MongoDB.

As stated on Mongoose's homepage:

> "Mongoose provides a straight-forward, **schema-based** solution to model your application data..."_

Wait a minute, what's with this "schema" business, isn't MongoDB schema-less?  

Well, yes _MongoDB_ is, however, it turns out that the vast majority of applications benefit when their data conforms to a defined structure (schema).

In addition to ensuring that data conforms to schemas that we define Mongoose also provides lots of other useful functionality such as:

- Default property values
- Data validation
- Automatic related model population via the `populate` method
- _Virtual properties_ - create properties like "fullName" that are not persisted in the database
- Custom _Instance methods_ which operate on a document
- Custom _Static methods_ which operate on the entire collection 
- `pre` and `post` event lifecycle hooks (Mongoose "middleware")

### The Big Picture 

Here is a big picture overview of the purpose of Mongoose's **Schema** and **Model** components:

<img src="https://i.imgur.com/Q6A7KTQ.png" width="900">

#### Big Picture Example 

Assume we need to store cat documents with the following schema:

```js
// Module: models/cat.js

const catSchema = new mongoose.Schema({
  name: String,
  breed: String
});
```

`catSchema` can then be compiled into a Model and that Model exported like this:

```js
// By convention, the name of the Model is singular and UpperCamelCased
module.exports = mongoose.model('Cat', catSchema);
```

Then, in our controller actions, we can require the `Cat` model and use it to perform CRUD on the `cats` collection in the MongoDB:

```js
// Again, convention is to name the Model's
// variable as singular and UpperCamelCased
const Cat = require('./models/cat');
Cat.create({name: 'Morris', breed: 'Orange Tabby'}, function(err, catDoc) {
  console.log(catDoc);
});
```

### ❓ Review Questions

1. **In your own words, describe the use case for Mongoose, i.e., _what_ is it and _why_ choose to use it?**

2. **A Mongoose _________ is compiled into a Mongoose Model.**

3. **We use a Mongoose _________ to perform CRUD operations on a particular MongoDB collection.**.


## Including Mongoose<br>in an App

To use Mongoose in our apps, we need to install and configure it...

### Install Mongoose

Installing the Mongoose module is straight forward:

```
$ npm i mongoose
```

> Reminder: `npm i` is a shortcut for `npm install`
	
### Configure Mongoose in a module

We're going to create a separate module named `database.js` and put it in a folder named `config`:

```
$ mkdir config
$ touch config/database.js
```

Then in `database.js`, let's connect to a database named `movies`:

```js
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/movies', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});
```
	
The second argument is an options object and avoids deprecation warnings.

As you know, the code in Node modules never execute unless they are required, therefore, to connect to the database, we'll require `database.js` in `server.js`:

```js
var logger = require('morgan');
	
// connect to the database with Mongoose
require('./config/database');
```

Note that we aren't assigning our module to a variable. That's because there's no need to because we're not exporting anything useful and just simply coding `require('./config/database')` is all it takes to make the code run.

### Start up the App 

- Start the app with `nodemon`

- Browse to `localhost:3000`

- No errors?  Great!  However, wouldn't it be nice to know that our connection to our database was successful?  Sure it would...

> Note:  One source of errors would be if the MongoDB engine is not running.  You will have to run `mongod` in a separate terminal session if you haven't already told MongoDB to start automatically with `brew services start mongodb`.

### Adding event listeners to the Mongoose connection

The Mongoose connection object inherits from Node's `EventEmitter` which allows us to listen to defined events.

Let's listen to the `connected` event by modifying the `database.js` module as follows:

```js
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/movies', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});
	
// shortcut to mongoose.connection object
const db = mongoose.connection;
	
db.on('connected', function() {
  console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});
```

After saving, `nodemon` will restart the server and you should see the  _Connected to MongoDb..._ message in the server terminal.

### ❓Review Questions

1. **What is the advantage of creating a `database.js` module?**

2. **What method on the Mongoose object connects to a MongoDB database?**

## Defining Schemas in Mongoose

We're going to:

1. Create a module for the Schema/Model
2. Define a basic Schema for a `Movie` model

### Create a module for the Schema/Model

So, where are we going to put our app's schemas and models?


The MVC design pattern is all about code organization and it makes sense to organize our Model modules within a `models` folder:

```
$ mkdir models
$ touch models/movie.js
```

We will always have a single file per Mongoose Model where:

1. We define the schema,
2. Compile the schema into a model, and
3. Export that model.

### Define a basic Schema for a `Movie` model

In the schema/model module, we will always do this:

```js
const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;
```

Creating the shortcut to the `mongoose.Schema` class is optional but convenient when defining most schemas.

Now let's define the basic schema for the `Movie` Model:

```js
const Schema = mongoose.Schema;
	
const movieSchema = new Schema({
  title: String,
  releaseYear: Number,
  mpaaRating: String,
  cast: [String]
});
```

Note the `cast` property's type is an Array of Strings.

> Mongoose vocabulary: A **property** may be referred to as a "**path**", or "**field**".

#### **💪 YOU DO:**

Add an additional property named `nowShowing` with a type of `Boolean` (make sure that it's uppercased so that it refers to JavaScript's built-in `Boolean` object wrapper).

Awesome! We've defined a Mongoose schema!

As we progress toward learning more about Mongoose, we will be adding more properties and functionality to the `movieSchema`.

### Built-in Types for Properties

Here are the eight built-in `schemaTypes` available:

- `String`
- `Number`
- `Boolean`
- `Date`
- `mongoose.Schema.Types.ObjectId`
- `mongoose.Schema.Types.Buffer`
- `[]` (Array) 
- `mongoose.Schema.Types.Mixed`

Of note are a few types above that are not built into JavaScript:
	
- `mongoose.Schema.Types.ObjectId`
- `mongoose.Schema.Types.Buffer`
- `mongoose.Schema.Types.Mixed`

When we need to specify one of the above types, e.g., `ObjectId`, we will need to ensure that we access them through the object hierarchy. 

Defining that `Schema` shortcut variable, enables us to write `Schema.Types.ObjectId`, leaving off the `mongoose.`.

### Compiling Schemas into Models

> Reminder: Models, not schemas are used to perform CRUD on a MongoDB collection.

Compiling a schema into a model is as easy as calling the `mongoose.model` method:

```js
const Schema = mongoose.Schema;
	
const movieSchema = new Schema({
  title: String,
  releaseYear: Number,
  mpaaRating: String,
  cast: [String],
  nowShowing: Boolean
});
	
// Compile the schema into a model and export it
module.exports = mongoose.model('Movie', movieSchema);
```

Again, there is a one-to-one mapping between Mongoose models and MongoDB collections.

By default, the collection will be named as the pluralized version of the model in all lower-case.

## Use a Model to Create data

Now that we have a model, we're ready to perform some CRUD.

First up is **creating** data!

We can use a Mongoose Model in two ways to create documents in the collection:

1. `const instance = new Model(<object>)`, then`instance.save()`<br>-OR-

2. `Model.create(<object or array of objects>)`

#### Creating documents in a Node REPL

Before writing the code in the app to create movies, let's do so in a Node REPL...

Warning, if you make a typo, you'll have to start over:

```sh
$ node
> require('./config/database')
> const Movie = require('./models/movie')
> Movie.create({
... title: 'Star Wars',
... releaseYear: 1977
... }, function(err, doc) {
... console.log(doc);
... })
```

Logged out will be a document that looks something like...

```js
{ __v: 0,
  title: 'Star Wars',
  releaseYear: 1977,
  _id: 57ea692bab09506a97e969ba,
  cast: []
}
```

> Note: The `__v` field is added by Mongoose to track versioning - ignore it.

Note that we did not provide a value for `nowShowing` so it was not created as a property in the document.

However, properties of type `Array`, are always initialized to empty arrays like `cast` was. This makes it convenient to start pushing performers into  it!

That was fun! Exit the REPL (`ctrl + C` twice) and lets see how we can use<br>`new` + `save`<br>to create movie documents - but this time from within our app...

#### The 5-step process to implementing CRUD functionality

When we build out CRUD functionality in most web apps, here is the process we will repeat over and over again:

1. Determine the "proper" route (HTTP Method & Endpoint).  Use RESTful conventions whenever possible.
2. Add the UI (link and/or form) that will trigger the HTTP request that matches the route.
3. Define the route in the appropriate router module that will match the HTTP request and map it to the `<controller>.<method>` that will perform the desired functionality.
4. Add the controller action/method and be sure to export it.
5. In the controller, perform necessary CRUD and either `render` (passing it data) in the case of a `GET` request, or `redirect` if data has been mutated (`POST`, `PUT` & `DELETE`). If rendering, code the view template if necessary.

#### Creating Data is sometimes a two-request process...

Just a reminder that creating data functionality might be a two-request process:

1. First request displays a form for the user to enter the data
2. Second request to submit the form to the server where the data is created

### Displaying the new movie form 

#### Step 1 - Determine the "proper" route (HTTP Method & Endpoint)

Using [our trusty routing chart](https://gist.github.com/jim-clark/17908763db7bd3c403e6), we find that to display a `new.ejs` view with a form for entering movies, the proper route will be:

```
GET /movies/new
```

#### Step 2 - Add the UI

**💪 YOU DO (1 minute)**

- Add a hyperlink (`<a>` tag) to the `views/index.ejs` view that will trigger the HTTP request for the route we just identified above.

- The hyperlink should display something like "New Movie"

#### Step 3 - Define the route on the server

Express generator stubbed up a `users.js` route module that we will convert and use for the movies resource.

Rename the file to `movies.js`.

Due to the renaming, we'll need to make a couple of changes in `server.js` - **what are they?**

Inside of `routes/movies.js`, let's code the route that maps the HTTP request to the **new** action:

```js
const express = require('express');
const router = express.Router();
const moviesCtrl = require('../controllers/movies');
	
// GET /movies/new
router.get('/new', moviesCtrl.new);
	
module.exports = router;
```

#### Step 4 - Add the controller action/method and be sure to export it

**💪 YOU DO (5 minutes)**

- Pair up and stub up the controller and export the `new` action - we did this quite a bit yesterday...(look below only if you must)

1. Create the `controllers/movies.js` module.

2. The `new` action is just the first of several that are going to be exported from this module:

	```js
	module.exports = {
	  new: newMovie
	};
	```
	Remember, it's `newMovie` because we can't name a function `new`

3. Stub up the `new` action:

	```js
	function newMovie(req, res) {

	}
	```

#### Step 5 - Code the controller action/method and create the view

The code in the `new` action is pretty simple:

```js
function newMovie(req, res) {
  res.render('movies/new');
}
```

Now we need the `new.ejs` view.

As we've discussed, organizing views for a certain Model into a dedicated folder makes sense:

```
$ mkdir views/movies
$ touch views/movies/new.ejs
```
	
Next, add the HTML boilerplate to `new.ejs` and link in:

```html
<link rel='stylesheet' href='/stylesheets/style.css' />
```

Copy and paste the following awesome but ugly form, then we'll review it...

```html
<h2>Enter a New Movie</h2>
<form action="/movies" method="POST">
  <label>Title:
    <input type="text" name="title">
  </label><br>
  <label>Release Year:
    <input type="text" name="releaseYear">
  </label><br>
  <label>MPAA Rating
    <select name="mpaaRating">
      <option value="G">G</option>
      <option value="PG">PG</option>
      <option value="PG-13">PG-13</option>
      <option value="R">R</option>
    </select>
  </label><br>
  <label>Cast (separate actors with commas):
    <input type="text" name="cast">
  </label><br>
  <label>Now Showing:
    <input type="checkbox" name="nowShowing" checked>
  </label><br>
  <input type="submit" value="Add Movie">
</form>
```

#### Test the `new` Functionality 

Clicking the **New Movie** link should now display

<img src="https://i.imgur.com/licUlYF.png">

### Handling the form submission (2nd request) 

#### Step 1 - Determine the "proper" route (HTTP Method & Endpoint)

Note that we've already set the `action` & `method` attributes to match the proper RESTful route to submit the form to.

**Identify the HTTP Method and Endpoint**

#### Step 2 - Add the UI

We already have the `<form>` that is going to trigger the request - check.

#### Step 3 - Define the route on the server

Let's define the additional route in **routes/movies.js**:

```js
// GET /movies/new
router.get('/new', moviesCtrl.new);
// POST /movies
router.post('/', moviesCtrl.create);
```

#### Step 4 - Add the controller action/method and be sure to export it

The next step is to stub up and export that `create` controller action in **controllers/movies.js**:

```js
module.exports = {
  new: newMovie,
  create
};

function create(req, res) {

}
```

#### Step 5 - Code the controller action/method

We're going to be using our `Movie` model, so we need to require it at the top:

```js
const Movie = require('../models/movie');
```

Now let's write the code that will use the `Movie` Model to create the movie submitted by the form - we'll review it as we type it...

```js
function create(req, res) {
  // convert nowShowing's checkbox of nothing or "on" to boolean
  req.body.nowShowing = !!req.body.nowShowing;
  // remove whitespace next to commas
  req.body.cast = req.body.cast.replace(/\s*,\s*/g, ',');
  // split if it's not an empty string
  if (req.body.cast) req.body.cast = req.body.cast.split(',');
  const movie = new Movie(req.body);
  movie.save(function(err) {
    // one way to handle errors
    if (err) return res.render('movies/new');
    console.log(movie);
    // for now, redirect right back to new.ejs
    res.redirect('/movies/new');
  });
}
```

Questions?

#### Test the `create` Functionality 

You should now be able to submit movies - congrats!

Now that we've created a movie or two, let's see how we use Mongoose models to read documents from a MongoDB collection...

## Use a Model to Read data

The querying ability of Mongoose is **very** capable.  For example:

```js
Movie.find({mpaaRating: 'PG'})
  .where('releaseYear').lt(1970)
  .where('cast').in('Bob Hope')
  .sort('-title')
  .limit(3)
  .select('title releaseYear')
  .exec(cb);
``` 

The above query builder syntax is unique to Mongoose and is not available in MongoDB.

Powerful?  Yes, but we're going to start with the basics!

### Useful Model methods to query for data 

Here are the common Model methods for querying data:

| Method | Purpose | Syntax |
|---|---|---|
| `find` | Returns an array of all documents matching the _query object_ | `Movie.find({mpaaRating: 'PG'}, function(err, movies) {...})`|
|`findById` | Find a document based on it's `_id` | `Movie.findById(req.params.id, function(err, movie) {...})`|
|`findOne`| Find the first document that matches the _query object_ | `Movie.findOne({releaseYear: 2000}, function(err, movie) {...})`|

> Note: An empty query object, `{}`, selects ALL documents.

### Reading Data - Practice (20 min)

**💪 YOU DO - In your breakout room, implement the movies `index` functionality (display a list of movies)**

1. Identify the RESTful route

2. Add the UI to trigger the request by adding a "All Movies" link next to the "New Movie" link we added to `views/index.ejs` previously.

3. Define the RESTful route

4. Stub up and export the movie controller's `index` action.

5. Code the `index` action to:
	- Use the `Movie` model to query for all movies.  As mentioned above, use an empty query object to retrieve all documents. 
	- Render a `views/movies/index.ejs` view, providing to it the movies just retrieved.

6. Create an **index.ejs** view to display in an HTML table.  Here's most of the markup - please complete according to the comments:

	```html
	<!DOCTYPE html>
	<html lang="en">
	<head>
	  <meta charset="UTF-8">
	  <meta name="viewport" content="width=device-width, initial-scale=1.0">
	  <meta http-equiv="X-UA-Compatible" content="ie=edge">
	  <link rel='stylesheet' href='/stylesheets/style.css' />
	  <title>Mongoose Movies</title>
	</head>
	<body>
	  <h1>Movie List</h1>
	  <table>
	    <thead>
	      <tr>
	        <th>Title</th>
	        <th>Release Year</th>
	        <th>Rating</th>
	        <th>Cast</th>
	        <th>Now Showing</th>
	      </tr>
	    </thead>
	    <tbody>
	      <!-- Write the line of EJS to iterate over movies using forEach -->
	        <tr>
	          <td><%= m.title %></td>
	          <td><%= m.releaseYear %></td>
	          <td><%= m.mpaaRating %></td>
	          <td><%= m.cast.join(', ') %></td>
	          <!-- finish the ternary expression to display
	                       'Yes' or 'Nope' --> 
	          <td><%= m.nowShowing ?  %></td>
	        </tr>
	      <!-- Close the forEach using EJS here -->
	    </tbody>
	  </table>
	</body>
	</html>
	```

We'll review in 20 minutes.

### Refactor the Redirect

Now that we have an `index` view, let's update the `redirect` in the `create` action:

```js
  movie.save(function(err) {
    if (err) return res.render('movies/new');
    console.log(movie);
    res.redirect('/movies');  // update this line
  });
```

## Timestamps Option

Mongoose can automatically create a `createdAt` and create/update an `updatedAt` field to every document if we provide a second argument to the `Schema` constructor and set a `timestamps` property in it as follows:

```js
const movieSchema = new mongoose.Schema({
  ...
}, {
  timestamps: true
});
```

This really comes in handy so it's recommended to pretty much add the `timestamps: true` option to all schemas that you define.

## Time Permitting

Time permitting, we'll cover as much of the Further Study section regarding default values and validations in schemas as feasible.

Anything not covered due to time constraints should be reviewed independently or during local session.

## Summary

Mongoose is the go to when it comes to working with data in MongoDB.

We define Mongoose **schemas**, which are then compiled using the `mongoose.model` method into **Models**.

We use a Model to perform all CRUD for a given MongoDB collection.


## ❓ Essential Questions

Take a minute to review in case you get picked!

1. **True or False: A document's structure is _defined_ as a Mongoose schema.**

2. **Name at least two Model methods used to read data from a MongoDB collection.**

3. **Can a single Model be used to query more than one MongoDB collection?**

## Further Study

### Defining default values for a Property

If a certain property is not provided when creating data, it's possible to specify in the schema a default value to use.

To add a default value, we need to switch from this simple property definition syntax:

```js
const movieSchema = new Schema({
  title: String,
  releaseYear: Number,
  ...
```

To this object syntax:

```js
const movieSchema = new Schema({
  title: String,
  releaseYear: {type: Number},
  ...
```

Now we can add a `default` key to specify a default value:

```js
const movieSchema = new mongoose.Schema({
  title: String,
  releaseYear: {type: Number, default: 2000},
  mpaaRating: String,
  cast: [String],
  nowShowing: {type: Boolean, default: false}
});
```

Silly example defaulting the release year to 2000 - yes. But that's how we can add a simple default value.

> Note that defaults for array types will not work - they require the use of Mongoose middleware to set default values.

Test it out in the app and we'll find that it didn't work for the `releaseYear` because `req.body.releaseYear` exists (albeit its value is an empty string) and this prevents the default from being assigned.

We can fix this in the `create` action by deleting any property in `req.body` that is an empty string:

```js
if (req.body.cast) req.body.cast = req.body.cast.split(',');
// remove empty properties
for (let key in req.body) {
  if (req.body[key] === '') delete req.body[key];
}
```

Now if we don't type in a value in the form for the `releaseYear` property, the default of `2000` will be set.

#### Using a function to provide a default value

You've seen how to add a simple default value, but we can also provide a function as well.

The property's default would then be set to the value returned by the function!

For example, we can take our silly default for `releaseYear` and make it default to the current year like this:

```js
const movieSchema = new mongoose.Schema({
  title: String,
  releaseYear: {
    type: Number,
    default: function() {
      return new Date().getFullYear();
    }
  },
  mpaaRating: String,
  cast: [String],
  nowShowing: {type: Boolean, default: true}
});
```

### Defining Validations for a Property

Validations are used to prevent bogus data, i.e., data that does not conform to the schema, from being saved in the database.

There are several built-in validators we can use.

However, endless flexibility is possible with custom asynchronous and synchronous validator functions and/or Mongoose middleware.

As always, let's take a look at the basics at first...

Movies should not be allowed to be created without a `title`.  Let's make it required:

```js
const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  ...
```

Now, if we try saving a movie without a `title` a validation error will occur and the data will not be saved.

Looking at the `create` action, this error will result in the `new.ejs` view being rendered instead of redirecting to the movies list:

```js
  movie.save(function(err) {
    // one way to handle errors
    if (err) return res.render('movies/new');
```

For properties that are of type _Number_, we can specify a `min` and `max` value:

```js
const movieSchema = new mongoose.Schema({
  ...
  releaseYear: {
    type: Number,
    default: function() {
      return new Date().getFullYear();
    },
    min: 1927
  },
  ...
```

Cool - no more silent movies!
	
For properties that are of type _String_, we have:

- **`enum`**: String must be in the provided list
- **`match`**: String must match the provided regular expression
- **`maxlength`** and **`minlength`**: Take a guess :)

Here is how we use the `enum` validator on the `mpaaRating` property:

```js
const movieSchema = new mongoose.Schema({
  ...
  mpaaRating: {
    type: String,
    enum: ['G', 'PG', 'PG-13', 'R']
  },
  ...
```

> Note:  Some of you may think the above validation is unnecessary because the user is restricted by the choices in the form's `<select>`, however, it's quite easy to bypass such client-side validation - so, it's always a good idea to validate on the server.

## References

- [Official MongooseJS Documentation](http://mongoosejs.com/)


