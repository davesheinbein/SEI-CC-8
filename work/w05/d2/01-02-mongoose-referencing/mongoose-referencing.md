<img src="https://i.imgur.com/cD5R8OG.png" width="600px;display:inline-block;margin:auto">


# Mongoose - Referencing Related Data

## Learning Objectives

| Students Will Be Able To: |
|---|
|Use Referencing to Implement 1:M & M:M Data Relationships |
|Explain the Difference Between 1:M & M:M Relationships |
|"Populate" Referenced Documents |

## Roadmap

1. Setup
1. Review the Starter Code
1. The `mongoose-movies` Data Model
1. Referencing _Performers_ in the _Movie_ Model
1. Associating Movies and Performers
1. _AAU, when viewing a movie's detail page, I want to see a list of the current cast and add a new performer to the list_
1. Essential Questions


## Setup

There is starter code in the class repo, however, if you have been using the `mongoose-movies-codealong` repo, all you need to do is move into the repo's folder and sync with it using the usual two commands:

- `cd ~/code/mongoose-movies-codealong`
- `git fetch --all`
- `git reset --hard origin/master`

Also, it never hurts to `npm i` just in case.

Lastly, open VS Code and start the server:

- `code .`
- Open a terminal session (control + backtick) and `nodemon`
- Browse to `localhost:3000`


## Review the Starter Code

The starter code has a few updates from the _Mongoose - Embedding Related Data_ lesson's final code:

- The `cast` property on the `Movie` model has been removed and all related forms/views and controller code have been adjusted accordingly. This was done so that in this lesson we can reference _performer_ documents created using a `Performer` Model.

	> In case you're wondering, when we add back the `cast` property as an array of `ObjectId`s, Mongoose will automatically replace the arrays of strings in the current docs with an empty array, thus there's no need to delete the existing movie docs.  However, one day you may need to create/update/delete documents in a Node REPL and here's a gist that shows you how to [Perform CRUD Using Mongoose Models in a Node REPL](https://gist.github.com/jim-clark/57b646abbb6c0ce09f9fa948eab6febc).
	
- As you will learn in this lesson, a many-to-many relationship between two data resources such as _movies_ and _performers_, requires that those resources be created independently of each other. Therefore, the functionality to create _performers_ has been implemented to save time. However, rest assured that there is nothing in this code that has not been previously taught - let's checkout the model, router, controller & view.

- Be sure to checkout the date "fix" required in the `create` action.

- **Go ahead a create a few performers** - feel free to use these from Star Wars and Caddyshack:

	```
	Mark Hamill  9/25/1951
	Carrie Fisher  10/21/1956
	Harrison Ford  7/13/1942
	Chevy Chase  10/8/1943
	Bill Murray  9/21/1950
	```

- The **movies/show.ejs** view shows how you can use EJS to calculate an _average rating_ for a movie.

## The `mongoose-movies` Data Model

We are going to implement the following data relationship:

- **_A Movie has many Performers; A Performer has many Movies_**<br><br>**`Movie >--< Performer`** (Many-To-Many)

However, unlike we saw with _Reviews_ (One-To-Many), multiple Movies can reference the same Performer creating a Many-To-Many relationship.  Here's a simplified example:

<img src="https://i.imgur.com/hzoRC2y.png" width="100%">

### Entity-Relationship-Diagram (ERD)

As part of the planning for your future projects, you'll need to plan the data model and document it with an Entity-Relationship-Diagram (ERD).

Here's an ERD that documents the data model for mongoose-movies:

<img src="https://i.imgur.com/CVTFHMJ.png" width="100%">

## Referencing _Performers_ in the _Movie_ Model

With the `Performer` Model created, we can now add back the `cast` property in the `Movie` model (**models/movie.js**):

```js
reviews: [reviewSchema],
// don't forget to add a comma above
cast: [{type: Schema.Types.ObjectId, ref: 'Performer'}]
```

The property type of `ObjectId` (or an array of `ObjectId`s) **is always** used to implement **referencing**.

The `ref: 'Performer'` is optional, but allows us to use the unicorn of Mongoose methods - `populate`. 

### Contrasting One-to-Many (1:M) and Many-to-Many (M:M) Relationships

The key difference between a `1:M` and a `M:M` relationship:

- In a `1:M` relationship, each of the **many** (child) documents belongs to only **one** (parent) document. Each time we want add a new relationship - **the child document must be created**.
- In a `M:M` relationship, **existing** documents are referenced and the same document can be referenced over and over. New documents are created only if it's the first of its kind. 

### Many:Many CRUD

So, before a many-to-many relationship can be created between two documents (often called an **association**), those two documents must first exist.

This requires that the app first provide the functionality to create the two resources independent of each other.

**mongoose-movies** can already create _movies_, but now it needs the capability to create _performers_...

### ❓ Review Questions

1. **True or False:  If a "book" document wants to reference an "author" document, a property of type `ObjectId` must be included in the `bookSchema`.**

1. **True or False:  Assuming `Movie >---< Performer`, when associating a "performer" document with a "movie" document, both documents must already exist in the database.**

## Associating Movies and Performers

Now that we've added the `cast` property to the `Movie` model, we're ready to implement the M:M relationship between _movies_ and _performers_.

But first, a quick refactor...

#### _AAU, after adding a movie, I want to see its details page_

This user story can be accomplished with a quick refactor in the `moviesCtrl.create` action in **controllers/movies/js**:

```js
movie.save(function(err) {
  if (err) return res.redirect('/movies/new');
  // res.redirect('/movies');
  res.redirect(`/movies/${movie._id}`);
});
```

Don't forget to replace the single-quotes with back-ticks!

User story done! Now for some fun!

#### _AAU, when viewing a movie's detail page, I want to see a list of the current cast and add a new performer to the list_

Let's ponder what it's going to take to implement this user story:

- In **movies/show.ejs**, iterate over the movie's cast and use EJS to render each performer.
- Hold it! Because we are using referencing, there are `ObjectId`s in a movie's `cast` array - not any of the actual performer data! Oh wait, this is what the magical `populate` method is for!
- Using a form with a dropdown, we can send an HTTP request to associate a performer and movie. We will need the list of performers to build the dropdown - however, we only want to include the performers in the dropdown that are not already in the cast!

Let's do this - here's our wireframe:

<img src="https://i.imgur.com/Zg0pCYa.png">

### Replacing _ObjectIds_ with the Actual Performer Docs

Let's refactor the `moviesCtrl.show` action so that it will pass the movie with the _performer_ documents in its `cast` array instead of `ObjectIds` (in **controllers/movies.js**):

```js
function show(req, res) {
  Movie.findById(req.params.id)
  .populate('cast').exec(function(err, movie) {
    res.render('movies/show', { title: 'Movie Detail', movie });
  });
}
```

`populate`, the unicorn method of Mongoose!

We can chain the `populate` method after any query.

When we "build" queries by chaining like above, we need to call the `exec` method to actually run the query (passing in the callback to it).

**❓ How does the `populate` method know to replace the `ObjectId`s with `Performer` documents?**

### Passing the _Performers_ for the dropdown

While we're in `moviesCtrl.show`, let's see how we can query for just the _performers_ that are not already associated with the _movie_.  

First, we're going to need to access the `Performer` model, so require it at the top of **controllers/movies.js**:

```js
const Movie = require('../models/movie');
// require the Performer model
const Performer = require('../models/performer');
```
	
Now we're ready to refactor the `show` action, we'll review as we refactor the code:

```js
function show(req, res) {
  Movie.findById(req.params.id)
  .populate('cast').exec(function(err, movie) {
    // Performer.find({}).where('_id').nin(movie.cast) <-- Mongoose query builder
    // Native MongoDB approach 
    Performer.find(
     {_id: {$nin: movie.cast}},
     function(err, performers) {
       console.log(performers);
       res.render('movies/show', {
         title: 'Movie Detail', movie, performers
       });
     }
   );
  });
}
```

The log will show we are retrieving the _performers_ - a good baby step at this point. 

### Refactor _movies/show.ejs_

There are comments to help us as we refactor **show.ejs** to render:

- The movie's cast of performers, and
- The dropdown and form used to associate a performer with the movie.

It's a bit complex, so we'll review it while we make the changes:

```html
  <div><%= movie.nowShowing ? 'Yes' : 'Nope' %></div>
  <!-- start cast list -->
  <div>Cast:</div>
  <ul>
    <%- movie.cast.map(p => 
      `<li>${p.name} <small>${p.born.toLocaleDateString()}</small></li>`
    ).join('') %>
  </ul>
  <!-- end cast list -->
</section>
	
<!-- add to cast form below this comment -->
<form id="add-per-to-cast" action="???" method="POST">
  <select name="performerId">
    <%- performers.map(p => 
      `<option value="${p._id}">${p.name}</option>`
    ).join('') %>
  </select>
  <button type="submit">Add to Cast</button>
</form>
```

Now let's add this tidbit of CSS in **public/stylesheets/style.css** to tidy up the cast list:

```css
ul {
  margin: 0 0 1rem;
  padding: 0;
  list-style: none;
}
	
li {
  font-weight: bold;
}
```

### Add the Route for the _Add to Cast_ Form Post

The form's `action` attribute needs to be set to the "proper" endpoint for adding the association between a movie and a performer.

Let's check out the [Routing Guide](https://gist.github.com/jim-clark/17908763db7bd3c403e6) to find the endpoint (keep looking...).

The route is RESTful, but we'll have to use a non-RESTful name for the controller action because we're creating an association between a movie and a performer, but `create` is already taken...

In **routes/performers.js**

```js
router.post('/movies/:id/performers', performersCtrl.addToCast);
```
`addToCast` - not a bad name!

### Code the _addToCast_ Controller Action

Let's write that `addToCast` action in **controllers/performers.js**:

```js
const Performer = require('../models/performer');
// add the Movie model
const Movie = require('../models/movie');
	
module.exports = {
  new: newPerformer,
  create,
  addToCast
};
	
function addToCast(req, res) {
  Movie.findById(req.params.id, function(err, movie) {
    movie.cast.push(req.body.performerId);
    movie.save(function(err) {
      res.redirect(`/movies/${movie._id}`);
    });
  });
}
```

Reads like a book!

##### We Did It!

That was fun!

## ❓ Essential Questions

1. **What property type is used in schemas to reference other documents?**

2. **Describe the difference between 1:M & M:M relationships.**

3. **What's the name of the method used to replace an `ObjectId` with the document it references?**

## References

- [MongooseJS Docs - Populate](https://mongoosejs.com/docs/populate.html)

- [MongooseJS Docs - Queries](https://mongoosejs.com/docs/queries.html)



