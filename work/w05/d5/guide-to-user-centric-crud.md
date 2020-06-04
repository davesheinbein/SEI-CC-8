<img src="https://i.imgur.com/WcwEwxV.png">

# Guide to User-Centric CRUD using Express & Mongoose

## Intro

Typically, logged in users interact with an application that results in data being created, updated and deleted.

In almost every case, the application's code will need to ensure that the logged in user can only update/delete data created by them, not the data of other users.

To ensure this is the case, newly created data will need to reference which user created it regardless of whether that data is being referenced or embedded.

This guide will show an example of how to handle the above scenario...

## Example Data Model

Here's the ERD we'll use as an example:

<img src="https://i.imgur.com/hU1PVHI.png">

### User Has Two Different Relationships with Books

Note that in this app, a user "recommends" a book to other users by creating it in the database.  This one-to-many relationship is modeled with a `userRecommending` property on the Book model that references the `_id` of the user that created each particular book.

In addition, users can add books to their reading list.  This many-to-many relationship is modeled with a `usersReading` property which references an array of user documents' `_id` values.

### Comments

Because comments are being embedded within the book documents, there is no Comment model, just a schema.

#### Restricting Updating and/or Deleting of Comments Functionality

Each comment needs to know the user that submitted it.  Not just for display purposes, but to restrict the ability to update and/or delete a comment to that of the user that submitted it.  The `userId` property in the comment schema holds the `_id` of the user that submitted the comment and can therefore be compared to the logged in user's `_id` to render the additional UI for updating/deleteing.

#### Copying Data For Better Efficiency

Since displaying the name of the user commenting on a book makes sense, note that, in addition to the `userId` property, the comment schema also has a `userName` property for holding the user's name.

Copying over the user's name from `req.user` in the comment `create` action will avoid having to populate comments every time they are accessed.  This provides much better efficiency.

## Example Routing

#### Books

|HTTP<br>Method|URL<br>Endpoint|Controller<br>Action|Purpose|
|---|---|---|---|
| GET | /books | booksCtrl.index | View all the books submitted by the logged in user |
| GET | /books/all | booksCtrl.allBooks | View all the books regardless of who submitted (use querystring params to perform filtering) |
| GET | /books/:id | booksCtrl.show | View the details of any book |
| GET | /books/new | booksCtrl.new | View a form for submitting a book (be sure to define this route before the show route)|
| POST | /books | booksCtrl.create | Handle the new book form being submitted |
| GET | /books/:id/edit | booksCtrl.edit | View a form for editing a book (restrict to user who submitted the book) |
| PUT | /books/:id| booksCtrl.update | Handle the edit book form being submitted (restrict to user who submitted the book) |
| DELETE | /books/:id| booksCtrl.delete | Delete a book (restrict to user who submitted the book) |
| POST | /books/:id | booksCtrl.addReading | Add the logged in user's _id to a book's userReading array |

#### Comments

|HTTP<br>Method|URL<br>Endpoint|Controller<br>Action|Purpose|
|---|---|---|---|
| n/a | n/a | index action | View all the comments for a book - no route needed since comments are embedded and displayed with their book |
| n/a | n/a | show action | Viewing a single comment does not make sense |
| n/a | n/a | new action | The form to add a new comment should be displayed on the book's show view |
| POST | /books/:id/comments | commentsCtrl.create | Handle the new comment form being submitted |
| GET | /comments/:id/edit | commentsCtrl.edit | View a form for editing a comment (restrict to user who submitted the comment) |
| PUT | /comments/:id| commentsCtrl.update | Handle the edit comment form being submitted (restrict to user who submitted the comment) |
| DELETE | /comments/:id| commentsCtrl.delete | Delete a comment (restrict to user who submitted the comment) |


## Example Controller Code

#### Creating a book

```js
function create(req, res) {
  const book = new Book(req.body);
  // Assign the logged in user's id
  book.user = req.user._id;
  book.save(function(err) {
    if (err) return render(<new or custom error template>);
    // Probably want to go to newly added book's show view
    res.redirect(`/books/${book._id}`);
  });
}
```

#### Edit a book

```js
function edit(req, res) {
  Book.findById(req.params.id, function(err, book) {
    // Verify book is "owned" by logged in user
    if (!book.user.equals(req.user._id)) return res.redirect('/books');
    res.render('books/edit', {book});
  });
}
```

#### Adding a book to a user's reading list

```js
function addReading(req, res) {
  Book.findById(req.params.id, function(err, book) {
    // Ensure that user is not already in usersReading
    // See "Finding a Subdocument" in https://mongoosejs.com/docs/subdocs.html
    if (book.usersReading.id(req.user._id)) return res.redirect('/books');
    book.usersReading.push(req.user._id);
    book.save(function(err) {
      res.redirect(`/books/${book._id}`);
    });
  });
}
```

#### View all books or based upon a name search

```js
function allBooks(req, res) {
  // Make the query object to use with Book.find based upon
  // if the user has submitted via a search form for a book name
  let bookQuery = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {};
  Book.find(bookQuery, function(err, books) {
    // Why not reuse the books/index template?
	res.render('/books/index', {
	  books,
	  user: req.user,
	  nameSearch: req.query.name  // use to set content of search form
	});
  });
}
```

#### Add a comment

A form used to create a comment would look something like:

```html
<!-- Using the RESTful route to send the book's id to the server -->
<form action="/books/<%= book._id %>/comments" method="POST">
  <!-- Be sure name attributes of inputs match the model properties -->
  <input name="text">
  <button type="submit">ADD COMMENT</button>
</form>
```

In the comment controller's create action, we'll need to first find the book to add the comment to:

```js
function create(req, res) {
  Book.findById(req.params.id, function(err, book) {
    // Update req.body to contain user info
    req.body.userId = req.user._id;
    req.body.userName = req.user.name;
    // Add the comment
    book.comments.push(req.body);
    book.save(function(err) {
      res.redirect(`/books/${book._id}`);
    });
  });
}
```

#### Update a comment

A form used to edit a data resource needs to use a query string to inform method-override middleware to change the post to a PUT request:

```html
<form action="/comments/<%= comment._id %>?_method=PUT" method="POST">
  <!-- Value attribute is being set to the comment's current text -->
  <input name="text" value="<%= comment.text %>">
  <button type="submit">UPDATE COMMENT</button>
</form>
```

When the edit comment form is submitted, the `update` action will need to find the **book** that the comment is embedded within based upon the `_id` of the comment being sent as a route parameter:

```js
function update(req, res) {
  // Note the cool "dot" syntax to query on the property of a subdoc
  Book.findOne({'comments._id': req.params.id}, function(err, book) {
    // Find the comment subdoc using the id method on Mongoose arrays
    // https://mongoosejs.com/docs/subdocs.html
    const commentSubdoc = book.comments.id(req.params.id);
    // Ensure that the comment was created by the logged in user
    if (!commentSubdoc.userId.equals(req.user._id)) return res.redirect(`/books/${book._id}`);
    // Update the text of the comment
    commentSubdoc.text = req.body.text;
    // Save the updated book
    book.save(function(err) {
      // Redirect back to the book's show view
      res.redirect(`/books/${book._id}`);
    });
  });
}
```

#### Delete a comment

A form used to delete a data resource needs to use a query string to inform method-override middleware to change the post to a DELETE request.

Also, note that the proper RESTful route passes the `_id` of the comment, not the book that it's embedded within:

```html
<form action="/comments/<%= comment._id %>?_method=DELETE" method="POST">
  <button type="submit">DELETE COMMENT</button>
</form>
```

However, you'll only want to render the above form if the comment was created by the logged in user - you don't want users deleting each other's comments! Here's how you can conditionally render the delete comment form for only the comments created by the logged in user:

```html
<% book.comments.forEach(function(comment) { %>
  <div class="comment">
    <%= comment.text %><br>
    <% if (comment.userId.equals(user._id)) { %>
      <form action="/comments/<%= comment._id %>?_method=DELETE" method="POST">
        <button type="submit">X</button>
      </form>
    <% } %>
  </div>
<% }) %>
```

> Note that using a simple "X" as the button text, along with some styling provides for a decent UI.

When the delete comment form is submitted, just like with the `update` action above, the `delete` action will need to find the **book** that the comment is embedded within based upon the `_id` of the comment being sent as a route parameter:

```js
function delete(req, res) {
  // Note the cool "dot" syntax to query on the property of a subdoc
  Book.findOne({'comments._id': req.params.id}, function(err, book) {
    // Find the comment subdoc using the id method on Mongoose arrays
    // https://mongoosejs.com/docs/subdocs.html
    const commentSubdoc = book.comments.id(req.params.id);
    // Ensure that the comment was created by the logged in user
    if (!commentSubdoc.userId.equals(req.user._id)) return res.redirect(`/books/${book._id}`);
    // Remove the comment using the remove method of the subdoc
    commentSubdoc.remove();
    // Save the updated book
    book.save(function(err) {
      // Redirect back to the book's show view
      res.redirect(`/books/${book._id}`);
    });
  });
}
```

## Avoiding Having to Pass `user` Every `render`

How about a small custom middleware that relieves us from having to pass `user: req.user` every time a view is rendered!!!!

Just add the following in `server.js` BELOW the two `app.use(passport...)` middleware:

```js
// Add this middleware BELOW passport middleware
app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});
```

The `res.locals` is an object whose properties are available inside of any view being rendered!

