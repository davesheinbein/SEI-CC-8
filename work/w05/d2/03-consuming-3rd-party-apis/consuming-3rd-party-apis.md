
# Consuming 3rd Party API<small>s</small>

<img src="https://i.imgur.com/ukTEfjF.png" width="900">

## Learning Objectives

| Students will be able to: |
|---|
| Consume a third-party API from an Express backend |
| Render an API's data in an EJS Template |
| Make multiple requests to retrieve "detail" data |

## Roadmap

1. What kind of API are we talking about?
1. Why consume third-party APIs?
1. Research available APIs
1. I have a simple request
1. Different architectural approaches
1. Preview the completed app
1. Setup
1. Code the `index.ejs`
1. Accessing the username
1. Install and require the `request` module
1. Review the GitHub API docs
1. Access Tokens
1. Fetching data from GitHub's API
1. Details, I want details!
1. Essential Questions

## What kind of API are we talking about?

The term _API_ is quite vague and used within several contexts.

The acronym actually stands for **Application Programming Interface**.

_Application Programming Interfaces_ originally, and still do, allow  programmers to use the functionality of a library, a framework, an operating system, or any piece of software that exposes its functionality through its defined interface.

However, in today's lesson we're interested in external (third-party) APIs that respond with data when we send them requests.  

## Why consume third-party APIs?

There's lots of useful data being exposed via APIs across the Internet - often free of charge!

Our apps can consume this data in useful and interesting ways!

## 💪 Research Available APIs

Google for third-party data APIs that **provide data** (not a service).

Reply to the Slack message with the following about the API you found the most interesting:

- The name of the API
- What kind of data can be consumed
- It's access requirements and limitations (free, usage quotas, etc.)

## I have a simple request

It only takes a simple GET request to one of the API's available endpoints to retrieve data.

Since we can issue GET requests straight from the browser's address bar, let's retrieve all the data you'd ever want to know about Bulbasaur:

```
https://pokeapi.co/api/v2/pokemon/1
```

**❓ What data format was returned?**

## Different architectural approaches

When accessing APIs, there are a few different architectural approaches we can take:

<img src="https://i.imgur.com/Hflu0K0.png">

- The top-approach is the recommended approach with traditional web apps that respond to client requests with a new HTML page.  Access tokens remain secure on the server.

- The middle-approach is recommended for single-page apps (SPAs) like the MERN-stack apps we'll develop in unit 4.

- The bottom-approach is not recommended because access tokens would have to be sent to the browser.  Because of this, many APIs will disallow this architecture by not implementing [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) (discussed in a later lesson) and the request will fail.

Since we will be developing traditional web apps in this and next unit, we'll use the **top-approach** in this lesson.

## Preview the completed application

Allow me to demo what we'll be building today.

The app we'll build today consumes the GitHub API and displays repos for the entered GH Username.

If one of the repos is clicked, that repo is opened in a new browser tab.

The app only has a single view (`index.ejs`).

## Setup

Once again, we're going to use Express Generator to scaffold a basic Express app.

Hints:

- Be sure to specify the EJS view engine.

- Name the app `github-users`.

- Kind of prefer `server.js` instead of `app.js` too.

- Don't forget to install the Node modules.

- Make sure to test it out when you're done.

## Code the `index.ejs`

We're going to use the existing `index.ejs`.  For now, we will want to:

- Adjust the existing boilerplate.
	
- Add the form for submitting GitHub usernames

Later, when we see what data comes back from the API, we'll know how to better render it. 

### Adjust the boilerplate

We're adding [Bootstrap](http://getbootstrap.com/getting-started/), changing the title and adding a Jumbotron:

```html
<head>
  <title>GitHub Users</title>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
  <link rel='stylesheet' href='/stylesheets/style.css' />
</head>
<body class="container">
  <h1 class="jumbotron text-center">GitHub Users</h1>
    
</body>
``` 

Next, we need a form to submit a GitHub username to retrieve repos for:

```html
<div class="row">
  <div class="col-xs-6 col-xs-offset-6">
    <form action="/" method="GET">
      <div class="input-group">
        <input type="text" name="username" class="form-control"
          placeholder="Enter a GitHub Username">
        <span class="input-group-btn">
          <button class="btn btn-success" type="submit">Go!</button>
        </span>
      </div>
    </form>
  </div>
</div>	
```

Note that we're using a GET method instead of POST.

The rule of thumb is - if you're not changing data on the server, such as using the form to perform a search, use a GET instead of POST.

However, we access data submitted to the server differently when GET is used...

## Accessing the username

When using a GET in a form, the input data is sent to the server using a query string in the URL.

The [Express docs](https://expressjs.com/en/4x/api.html#req.query) show that we access the inputs via the `req.query` object.

Like `req.params`, `req.query` is available without having to mount any middleware.

Let's take a baby step by logging out to the server terminal what was typed in the input.  In **routes/index.js**:

```js
router.get('/', function(req, res, next) {
  const username = req.query.username;
  console.log(`username: ${username}`);
  res.render('index');
});
```

Cool!  Now let's see how we're going to be able to make HTTP requests from the server...

## Install and require the "request" module

In order to make HTTP requests from our Express server to the GitHub API, we'll want to install and require an NPM module named [request](https://www.npmjs.com/package/request), a simple HTTP request client:

```
$ npm install request
```

The `request` module is callback-based and has been "deprecated" (no further development) - however, with nearly 20 million weekly downloads, it's not going anywhere!

Once learning about promises (very soon), you can use [request-promise-native](https://www.npmjs.com/package/request-promise-native).

Now lets require it in **routes/index.js**:

```js
var express = require('express');
var router = express.Router();
const request = require('request');
```

> To save time, we'll ignore the best practice of creating a separate controller module - let's be rebels this lesson!

Now, we need to review the documentation for the GitHub API...

## 💪 Review the GitHub API docs

Review the [GitHub API](https://developer.github.com/v3/) docs and upon discovery, slack a reply for the following:

1. What is the API's **Root Endpoint**?  The root endpoint is the first part of the API's URL that remains fixed. Paths are then appended to the root endpoint to form other endpoints for specific requests.

2. Are there limits to the number of times we can "hit" the API?

After identifying the _root endpoint_, let's use the browser to make a GET request using that endpoint.

GitHub has written their API so that when we do a GET request on the _root endpoint_, it returns JSON representing all endpoints available.

Scrolling down toward the bottom will reveal a couple of endpoints that we are going to use - so take note of them:

- **user\_url**: This endpoint returns some info about a user, such as a link to their avatar...

- **user\_repositories\_url**: This endpoint returns an array of repositories the user is involved with.

> Note:  This "self-discovery" is a great feature of the GitHub API, we won't always be so lucky.

## Access Tokens

So, the answer to this question...

> Are there limits to the number of times we can "hit" the API?

Is **YES**.

According to their docs, GitHub limits anonymous user's requests to only 60 per hour, tracked by IP address; and guess what, because we are all on the same wireless network, the API will see us as all having the same IP address.

Yup, we're going to need to obtain an access token so that we can make up to 5,000 requests/hr.

### Obtaining an Access Token

According to the docs, we can obtain personal use tokens directly from our personal GitHub accounts:

- Make sure you are logged in to your personal GitHub account and go to _settings_, then click _Developer settings_ on the left.

- Now select _Personal access tokens_ from the menu at the bottom-left.

- Click the _Generate new token_ button.

- Enter a description and click the _Generate token_ button at the bottom. There is no need to select any of the scopes listed.

- Copy your token to the clipboard.

### Protecting Access Tokens & other "secrets"

It's extremely important that we don't expose tokens, keys, database connection strings, or other secrets in our source code (or send them to the browser).

We can "hide" our secrets by keeping them in a file that is _gitignored_, i.e., a file that is not ever pushed to the repo.

> Note:  If you followed the _Configuring a Global git ignore_ instructions during Installfest, you're all set.

The name of the file typically used for holding secrets is `.env`.

The `.env` file will be processed within `server.js` and its `key=value` pairs will be merged into the Node app's environment variables.

To get started, we'll need to install the module that will process the `.env` file

```
$ npm install dotenv
```
	
Then all we have to do is add this code near the top of **server.js**:

```js
var logger = require('morgan');
// load secrets from .env file
require('dotenv').config();
``` 

Next, create a `.env` file and add a variable for your token:

```
GITHUB_TOKEN=1a1596cfe4484ff...
```

No spaces please!

The name of the key is your call, but uppercase with underscores between words is a best practice.

Now you will be able to access the token in code like this:

```js
// Each entry in .env will become a property on process.env
const token = process.env.GITHUB_TOKEN;
```

Go ahead and add the above line of code within **routes/index.js**:

```js
const request = require('request');
// Add the following line of code
const token = process.env.token;
```

## Fetching data from GitHub's API

When we submit the GitHub username in our app our goal is to display the user's:

-  GitHub username

-  Avatar

-  A list of their repos (as hyperlinks that open the repo home pages in new tab.
	
Earlier we discovered the **user\_url** endpoint that returns general info for a username along with other endpoints that drill into that user's resources.

The **user\_url** endpoint was documented as `https://api.github.com/users/{user}`.

> Note: Any segment that is in curly braces, such as `{user}` shown above, is a named parameter and is where we need to provide actual value for the placeholder.

First, let's define a variable to hold the _root endpoint_ in **routes/index.js**:

```js
const request = require('request');

const token = process.env.token;
// Add the line below
const rootURL = 'https://api.github.com/';
```

### First Attempt to Call the API

Now let's use the `request` module to send a GET request to the **user\_url** endpoint for the submitted username and render the entire JSON response.  Still in **routes/index.js**:

```js
router.get('/', function(req, res, next) {
  const username = req.query.username;
  request(
    `${rootURL}users/${username}?access_token=${token}`,
    function(err, response, body) {
      res.render('index', {userData: body});
    }
  );
});
```

For now, we're passing the following to the `request` function:

1. A string that represents the endpoint.  When passed a string, `request` will always make a GET request.  Also note how the token is being included in the URL as a query string.

2. A callback function that is called when the response has been received from the server.

Since we're passing the content returned from the request to our **index.ejs**.  Let's display it:

```html
  <!-- new HTML just above closing body tag -->
  <hr>
  <div class="row col-xs-8 col-xs-offset-2">
    <% if (userData) { %>
      <%= userData %>
    <% } else { %>
      <h3 class="text-center text-info">
        Submit a GitHub username!
      </h3>
    <% } %>
  </div>
</body>
```

At this point, `userData` is just a string (not an object).

Make sure nodemon is serving our app and try submitting your GitHub username.

Bad news:

> Request forbidden by administrative rules. Please make sure your request has a User-Agent header (http://developer.github.com/v3/#user-agent-required)...

If we read what the provided link to the docs has to say, we'll learn that requests to the GitHub API expects a `User-Agent` header and the `request` module is not providing one by default.

Let's see how we can pass an _options_ object to `request` instead of a string...

### Second Attempt to Call the API

Let's refactor the code to:

- Pass an _options_ object instead of a string
- Pass the token as a header instead of a query string (better practice)
- Add the User-Agent header that GitHub expects

Here's the refactored code:

```js
router.get('/', function(req, res, next) {
  const username = req.query.username;
  const options = {
    url: `${rootURL}users/${username}`,
    headers: {
      'User-Agent': 'jim-clark',
      Authorization: `token ${token}`
    }
  };
  request(options, function(err, response, body) {
    res.render('index', {userData: body});
  });
});
```

> The docs suggested we pass our username as the value for the `User-Agent` header.

### Examining the returned data

One more try and we'll finally see what is returned by the API!

Examining the data we'll see that the `login` property holds the username and `avatar_url` points to user's avatar image.

So now we can improve our view a bit to render the username and display the avatar using a Bootstrap _panel_:

```html
<% if (userData) { %>
  <div class="panel panel-default">
    <div class="panel-heading text-center">
      <img src="<%= userData.avatar_url %>"
        class="img-circle" width="300">
      <h2><%= userData.login %></h2>
    </div>
    <div class="panel-body">
      <h3>Repos:</h3>
      need to list repos here...
    </div>
  </div>
<% } else { %>
```

Testing it out we'll find it not working because the response `body` is just a JSON string and needs to be parsed into a JS object.

Sure, we could have coded it correctly the first time around, but we want you to experience the process of solving such challenges...

Update this piece of code in the route handler:

```js
request(options, function(err, response, body) {
  const userData = JSON.parse(body);
  res.render('index', {userData});
});
```

[JSON.parse()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) converts a string into a JS Object and [JSON.stringify()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) does just the opposite by converting a JS object into a JSON string.

### Finally - looking good!

Not looking too bad.  Now we need to list the user's repositories.

💪 **Slack the endpoint we can use to retrieve an array of repos for the user.**

Now it's time to make a nested request for the details...

## Details, I want details!

When consuming APIs, it may be necessary to make multiple requests to different endpoints to fetch all of the detail data you need before rendering.

Of course, multiple requests will result in nested callbacks.  Update this section of the code:

```js
...
request(options, function(err, response, body) {
  const userData = JSON.parse(body);
  // update the options url to fetch the user's repos
  options.url = userData.repos_url;
  request(options, function(err, response, body) {
    // add a repos property
    userData.repos = JSON.parse(body);
    console.log(userData.repos[0]);
    res.render('index', {userData});
  });
});
``` 

> Note how we're reusing the `options` object - cool!

Okay, we logged out the first repo in the array so that we could see what properties are in there - and there's a bunch!

However, this app only needs the `name` and the `html_url` properties.

Bootstrap has a nice **List Group** component that's great for listing links:

```html
<div class="panel-body">
  <h3>Repos:</h3>
  <!-- new stuff below -->
  <div class="list-group">
    <% userData.repos.forEach(function(repo) { %>
      <a href="<%= repo.html_url %>" target="_blank"
        class="list-group-item">
        <%= repo.name %>
      </a>
    <% }); %>
  </div>
  <!-- new stuff above -->
</div>
```

##### Congrats on Consuming a Third-party API!

## ❓ Essential Questions

1. **True or False:  There's lots of interesting data available for our apps to consume provided by third-party APIs.**

2. **True or False:  It's important to read the docs for an API before committing to use it for a project.**

3. **What was the name of the Node module we used to make HTTP requests from the Express backend?**
