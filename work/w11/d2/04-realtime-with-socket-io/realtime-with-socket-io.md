![](https://i.imgur.com/FvddjOz.png)
# Realtime with socket.io

---
## Learning Objectives


| Students will be able to: |
|---|
| Add and configure _socket.io_ in a Node/Express app |
| Send _messages_ from a client to a _socket.io_ server and vice versa |
| Listen for _messages_ on both the _socket.io_ server and client |
| Optionally send a data payload with a message |
| Implement realtime communication between browser and server in a Node/Express app |

## Roadmap

- Intro to _socket.io_

- Review the Starter App: **`realtime-circles`**

- Configure _socket.io_ on the Server

- Configure  _socket.io_ in the Client (browser)

- Display Circles in Realtime

- Clear the Display (practice)

- Deploy to Heroku

- More Big Fun? Track Players!

## Intro to `socket.io`

<img src="https://i.imgur.com/Lz5wBQE.png">

Using the above diagram we can answer the following regarding the interaction between a browser and a web server:

- **What is bidirectional communication?**

- **What is realtime communication?**

How cool would it be to incorporate these concepts in our apps!

❓ **What type of applications are made possible by _realtime bidirectional_ communication between clients and a server?**

#### What Technology Enables Realtime Communications?

We just identified some of the cool apps that leverage realtime communications.

So far in SEI, we've learned quite a bit about the **HTTP protocol**.

❓ **How does HTTP communications contrast with bidirectional realtime communication?**

As we learned in week one, it was the demand for modern web applications that led to the development of...

<img src="https://i.imgur.com/KEq27hY.png" height="400">

Fortunately, the _HTML5_ specification also included the ability to "upgrade" a HTTP connection upon request of the client.

This connection upgrade results in the switch to a protocol that supports bidirectional/realtime communication - the **_websocket_** protocol.

Working with websockets natively is not terribly difficult, however, it can take a bit of code to handle automatic reconnects, etc.  But as we've learned that using libraries can make us more productive developers.

[socket.io](https://socket.io/) is a JavaScript library that wraps the websocket protocol and makes it easier to implement the realtime, bidirectional communication we seek.

#### Basic socket.io Architecture

<img src="https://i.imgur.com/Y5EnZR3.png" width="800">

- socket.io Clients & the socket.io Server send "messages" to each other...</p>

- and both Clients & the Server can listen and react to those "messages".

#### What are "messages"?

_socket.io_ is all about sending and responding to **messages**.

A **message** is a simple string identifier that **we** get to define,<br>for example:<br>`'login'`, or `'move-player'`

Just like when naming functions, it's best to use identifiers for our messages that reflect their purpose.

When sending a message, we can optionally send data that will be received by the listeners for the message.  For example, when sending a `'move-player'` message, we might send the following JS object:

```js
{
	from: 'r8c3',
	to: 'r9c4'
}
```
 
#### ❓ Review Questions

Here's a few review questions before we take a look at our Starter App:

1. **Explain bidirectional communications.**

2. **What protocol, introduced with _HTML5_, enables bidirectional communication between clients and server?**

3. **Explain what "messages" in socket.io are and what we do with them.**

## Our Starter App - `realtime-circles`

Clone the `realtime-circles` starter code:

- `cd ~/code`

- `git clone https://git.generalassemb.ly/SEI-CC/realtime-circles.git`

- `cd realtime-circles`

- `npm i`

- `nodemon` to start the Express backend

- Browse to `localhost:3000`

Clicking creates a circle of random size and color.

Our goal is to make this a realtime multi-player circle-fest!

Let's review the starter code...

- This is an Express app generated using `express-generator`.

- As a usual best practice in the land of the MERN-Stack,<br>`app.js` has been renamed to `server.js`.

- Examining `server.js` reveals that much of the default middleware has been removed - no problem because we're not going to be using cookies, parsing the body for posted data, etc.

- We only have one view of interest - `index.ejs`. There will not be any full-page refreshes. <br>**What application architecture is this known as?**

- Near the bottom of `index.ejs`, we are loading our app's JavaScript file, `app.js`...

- Reviewing `app.js` reveals that we are using _native_ JavaScript for DOM manipulation. Yay - no _jQuery_!

- `const circles` references a `<section>` that fills most of the rendered page.

- There's a click event listener on the `circles` element. This is where the action starts.

## Setting up `socket.io`

##### Both the client and server need to be configured with socket.io

### Configure the Server

- To use socket.io, we first need to install its module:

	```sh
	$ npm install socket.io
	```

- No, the dot in the name is not a typo, it's legit.

- We're going to be writing some server-side code pertaining to using socket.io.  **Should we put this new code in our _server.js_ file, or is there a better practice?**

- We don't want to unnecessarily clutter _server.js_, so we're going to put our socket.io related code in a separate module file.

- Let's create a file named `io.js` in our project's root folder:

	```sh
	$ touch io.js
	```

- socket.io, needs to "attach" to the _http server_, not the Express app.

- In an Express app scaffolded using `express-generator`, the _http server_ lives inside of the `/bin/www` file, so that is where we will require our new `io.js` module and attach to the _http server_:

	```js
	// inside bin/www
	var server = http.createServer(app);
	
	// load and attach socket.io to http server
	var io = require('../io');
	io.attach(server);
	```

- Now we need to put some code in our `io.js` module. For now let's put some test code in it to make sure things are loading correctly:

	```js
	// io.js
	
	var io = require('socket.io')();
	
	// Listen for new connections from clients (socket)
	io.on('connection', function (socket) {
	  console.log('Client connected to socket.io!');
  	});
	
	// io represents socket.io on the server - let's export it
	module.exports = io;
	```

- Check that `nodemon` is running our app without errors.

- No errors? Congrats the server is configured - time to configure the client!

### Configure the Client

- It takes quite a bit of JavaScript in the browser to connect to socket.io on the server and implement all of its goodness.

- Lucky for us, the socket.io module on the server helps us out by creating a secret route that returns dynamically generated JavaScript for the client - hassle free!

- The code returned to the browser is pre-configured with the server's info, etc.

- All we need to do is load this special client configuration script in our `index.ejs`:

	```html
		...
		// special route created by socket.io on the server
    	<script src="/socket.io/socket.io.js"></script>
    	<script src="/javascripts/app.js"></script>
    </body>
	```

- Be sure to load it before `app.js`.

- Refresh the browser and make sure there are no errors in the console.

- The `socket.io.js` client script exposes an `io` global function that we call to obtain our connection to the server.

- Let's call it and assign the returned connection object to a variable named `socket`.

	```js
	// get our connection to the socket.io server
	const socket = io();
	console.log(socket);

	...
	```     

Verify that you are we still error free.

#### Congrats, the client and server have both been configured!

### Test the Configuration

Refresh the browser and verify that:
  
- The `socket` object logged in the browser's console has a<br>`connected: true` property.
  
- The server's terminal window logged out the message<br>"Client connected to socket.io!".

## Displaying Circles in Realtime

### Our Realtime Requirements

We are going to code along to transform the app into a realtime multi-player circle-fest that:

-  Displays circles created by all players in realtime.

-  Clears all circles from all connected browsers when the `clear` button is clicked (a practice exercise).

### Code Logic - Server

To accomplish our requirements, this is what we will need to do on the server:

1. Listen for `add-circle` messages being sent from the clients.

2. When an `add-circle` message is received, forward (`emit`) it (along with the data received with the message) to all connected clients (including the client that sent the message to begin with).

### Code Logic - Client

To accomplish our requirements, this is what we will need to do on the client:

1. Listen for `add-circle` messages from the server.<br>**Where will the message have originated from?**

2. When the `add-circle` message is received, it will contain a data object with the properties necessary to pass to the existing `addCircle()` function that creates circles!

3. In the existing click handler, emit the `add-circle` message to the server, passing along an object containing the `initials`, `x`, `y`, `dia` and `rgba` properties.

### Messages - Review

The `add-circle` message is a custom event message that we "defined" based upon what made sense for this application.

**❓ How many custom event messages can we define?**.

As already noted, each message can be emitted with data. The data can be any type except for a function. Objects and arrays come in handy for sending complex rather than a single piece of primitive data.

## Displaying Circles - Server Code

- This code for _io.js_ will accomplish the goal for our code logic on the server:

	```js
	io.on('connection', function (socket) {
	  //new code below
	  socket.on('add-circle', function (data) {
	    io.emit('add-circle', data);
	  });
	});
	```

- Remember, `io` represents the server and `socket` the current client.

- With that code in place:

	- When a client (`socket`) connects to the server, we're using the **`on`** method to set up a listener on the server to listen to messages sent **from that client**.
	- When the server receives an `add-circle` message from the client, the callback function will send the same message to all clients using the server's (`io`) **`emit`** method.

## Displaying Circles - Client Code

- Listen for an `add-circle` message from the server in `app.js`:

	```js
	const socket = io();	
	// listen to the server for the `add-circle` event
	socket.on('add-circle', function (data) {
	  console.log(data);
	});
	```

- Here on the client (browser), we have the `socket` object representing our realtime connection to the server.

- For now, we're simply logging out data received from the server - baby steps!

- Now let's update the click event listener to emit an `add-circle` message to the server with the data:

	```js
	circles.addEventListener('click', function(evt) {
	  // replace current line of code with this code
	  socket.emit('add-circle', {
	    initials: initials,
	    x: evt.clientX,
	    y: evt.clientY,
	    dia: randomBetween(10,100),
	    rgba: getRandomRGBA()
	  });
	});
	```

- **❓ Our goal is for this message to be received by ________?**

##### Displaying Circles - Messaging Check

Let's open two browsers on `localhost:3000` and make sure the consoles show the messages as we click!

Cool!  Let's continue coding the client...

Next, let's refactor `addCircle()` so that we can just pass in the data object received with the message:

```js
// was -> function addCircle(x, y, dia, rgba) {
// updated to include initials and take advantage of destructuring assignment
function addCircle({x, y, dia, rgba, initials}) {
  ...
}
```

- Using [ES2015's Destructuring Assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment), we can pass in an object as an argument and that object's properties will be assigned to the listed variables.

- Note also that an `initials` variable has been added to hold the user's initials that initiated the message. 

- All that's left is to call the `addCircle()` function from our `socket.on` listener inside `app.js`:

	```js
	// listen to the server for the `add-circle` event
	socket.on('add-circle', function (data) {
	  // console.log(data);
	  addCircle(data);
	});
	```

- Use two browsers with different initials and take it for a test drive!

##### Now that we have the circles displaying in realtime, let's turn our attention to the next item on the roadmap - clearing the display!

### Clear All Circles Practice (10 mins)

- Let's get into breakout rooms and make the `clear` button clear all connected user's displays instead of just yours.

- Hints: This will require a new event message in addition to the `add-circle` event message.

## Deploy to Heroku

Set aside your fears and:

1. Create a local git repo: `git init`
2. Add all files: `git add -A`
3. Commit: `git commit -m "Initial commit"`
4. Make sure you are logged in to Heroku: `heroku login`
5. Create a Heroku deployment: `heroku create`
6. Deploy your repo to Heroku: `git push heroku master`
7. Set app to use only one web dyno: `heroku ps:scale web=1` 
8. Once deployed, open the app: `heroku open`

#### Realtime Is Fun!  👏

## ❓ Questions
<br>

- **What is the name of the method used to send messages from the server/client to the client/server?**

- **What method is used to set up a listener for a message?**

- **What are the names of the event messages available to us?**

## More Big Fun? Track Players!

- In the realm of realtime, tracking connected users or players is known as tracking **presence**.

- It would be nice to know who's connected to our `realtime-circles` app, so let's do this!

### Track Players - Server Code Logic

1. When a client connects, set up a listener for a `register-player` message from that client. The client will send their initials as data with the message.

2. When a client emits the `register-player` message, the server will:<br> (a) Add the player's `socket.id` and initials to a `players` object variable.<br> (b) Then we will then emit an `update-player-list` message, along with the updated list of initials, as an array, to all clients.

3. When a client disconnects, we will remove the player from the `players` object and again, emit the `update-player-list` message.

### Track Players - Client Code Logic

1. After the player has entered their initials, emit the `register-player` message, sending the initials as data.

2. Listen for the `update-player-list` message and update the DOM by writing `<li>` tags (one for each player in the array) inside of the provided `<ul>`.

### Tracking Players - Server Code

- Define the `players` object to hold player's initials in `io.js`:

	```js
	const io = require('socket.io')();
	
	// object to hold player's initials as keys
	const players = {};
	```

- Set up the listener for the `register-player` message in which we will take care of business:

	```js
	io.on('connection', function (socket) {
	  // new code below
	  socket.on('register-player', function (initials) {
	    // each socket has a unique id
	    players[socket.id] = initials;
	    io.emit('update-player-list', Object.values(players));
	  });
	... existing code below
	```

	> Note that `Object.values()` is from ES2016/ES7

- Set up the listener for when the player disconnects. Add this along with the other listeners:

	```js
	socket.on('disconnect', function () {
	  delete players[socket.id];
	  io.emit('update-player-list', Object.values(players));
	});
	... existing code below
	```

### Tracking Players - Client Code

- After the player has entered their initials, emit the `register-player` message, sending the initials as data.  In `app.js`:

	```js
	...
		
	  do {
	    initials = getInitials();
	  } while (initials.length < 2 || initials.length > 3);
	  // new code below
	  socket.emit('register-player', initials);
		
	...
		
	```

- Let's cache the players &lt;ul&gt; element into a `const`:

	```js
	...
		
	const circles = document.getElementById('circles');
	  	
	// players <ul> element in the footer
	const players = document.getElementById('players');
		
	...
	```

- Add the listener for the `update-player-list` event:
	
	```js
	...
		
	// listen for when the player list has changed
	socket.on('update-player-list', function (data) {
	  players.innerHTML = data.map(player => `<li>${player}</li>`).join('');
	});
	 	
	...
	```

#### Tracking Players - Try it out!


## Further Study

- What we've created in this lesson is a single "channel" that all connected clients participate in.

- However, it is common to want separate channels dedicated to sub-groups of clients.

- _socket.io_ has two options for this use case: **rooms** & **namespaces**.

- If interested, here's a link to get you started: [socket.io Rooms & Namespaces](http://socket.io/docs/rooms-and-namespaces/)

## References

- [Socket.IO](http://socket.io/)

- [WebSockets Protocol](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
