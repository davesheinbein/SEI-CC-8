<img src="https://i.imgur.com/fx2orT2.png">

# Full-stack React Lab

You enjoy challenges - you've come to the right place!

Now that we've taken Mastermind full-stack, you're ready to get some practice interacting with the backend via AJAX by persisting high-scores!

#### Requirements

- Each time the player wins:
	-  Prompt the player for their initials.
	-  Make an AJAX request to the backend to persist the `initials`, `numGuesses` and `seconds` using Mongoose.

- See the Front-end and Backend Hints below for assistance...

#### Front-end (React) Hints:

- Plan what the UI should look like. Feel free to duplicate the UI of the High Scores "page" of the [deployed React Mastermind app](https://sei-mastermind.herokuapp.com/).

- You're going to need another client-side route, e.g., `/high-scores`, and a new React "page" component dedicated to displaying the high-scores when the aforementioned `/high-scores` route is active.

- The time to persist the score check is when `perfect === 4` (there's already a variable named `perfect` in the `handleScoreClick` method).  Note that worrying about whether the score is a "high-score" is a bonus challenge - for now, just persist every winning score!

- For the above hint, you'll want to refactor the following code at the end of `handleScoreClick`

	```js
	if (perfect !== 4) guessesCopy.push(this.getNewGuess());
	
	this.setState({
	  guesses: guessesCopy,
	  // This is a great way to update isTiming
	  isTiming: perfect !== 4
	});
	```
	to a structure like this:
	
	```js
	if (perfect === 4) {
	  // Chicken dinner!
	  // 1. Update state to to stop the timer, but provide
	  //    a callback to the setState method (https://reactjs.org/docs/react-component.html#setstate)
	  // 2. In the callback, prompt for the initials and persist the score by making an AJAX call to your backend (see hint below)
	  // 3. Programmatically route to the `/high-scores` route to 
	  //    show the high scores page
	} else {
	  guessesCopy.push(this.getNewGuess());
	  this.setState({
	    guesses: guessesCopy,
	    // No winner yet - keep the timer ticking
	    isTiming: true
	  });
	}
	```

- Remember, it's a best practice to make AJAX calls from "service" modules vs. using `fetch` directly in the components.

#### Backend (Express/Mongoose) Hints:

- Don't forget to install the necessary node modules like `dotenv` & `mongoose`. You will **not** need `method-override` - **why?**.

- The backend API will be just like what we've previously worked with in class during Unit 2.  Define API routes on the server by following the best practice of namespacing the routes with `/api` and following RESTful routing conventions, i.e., `POST /api/scores` to add a score.

- You'll need a `/config/database.js` module to connect to a MongoDB. Don't forget to `require` the `database.js` module within `server.js`.  

- You'll need a hosted MongoDB if you want to deploy. You already have an MongoDB Atlas account, so go for it.

- What will the `Score` Mongoose schema/model look like? Keep it simple, the player's `initials` (String), `numGuesses` (Number) and `seconds` (Number) should work.

- You'll need an Express controller for the `scores` data resource.  Because this is a SPA, remember to return JSON from your controller actions.

- When composing the Mongoose query to return high-scores with the "best" scores sorted first, use Mongoose's `sort` query method and sort on `numGuesses`, followed by `seconds`.

#### Bonus

As a bonus, try limiting the number of high-scores to say, the top 20.

You'll need to check if the current score should be persisted by verifying that the score is better than the current "worst" high-score - in other words, check if the new score makes the top 20.

On the server, you'll want to look into chaining the Mongoose `limit` query method to make sure that you don't return more than 20 scores.

#### Super Bonus

- If a score has made the list, how about letting the user know by moving to the high-score route! This requires that the `<App>` component be able to access `BrowserRouter`'s `history` object so that it can change routes "programmatically" using the `history.push()` method. A minor refactor in **index.js** to this is needed:

	```js
	// Import Route also
	import { BrowserRouter as Router, Route } from 'react-router-dom';
	
	...
	
	ReactDOM.render(
	  <Router><Route component={App}/></Router>,
	  document.getElementById('root')
	);
	```

- Program the backend to limit the number of high-scores in the collection to 20 (or whatever number of scores you want to limit to). Before adding a new high-score to the database, you will want to:
	1. Verify that the high score sent by the client is indeed a worthy high score (better than the "worst" high-score in the database). This would be a great use case for a **custom validator** function in the schema.  Check out the **Custom** section of [the docs](http://mongoosejs.com/docs/validation.html). For further assistance, perhaps [this StackOverflow](https://stackoverflow.com/questions/43962430/mongoose-how-to-prevent-mongodb-to-save-duplicate-email-records-in-database) will help.
	2. After adding the new high-score, remove the worst score if the collection grows larger than the number of high-scores you want to keep.  This would be a good use case for Mongoose **post save** [middleware](http://mongoosejs.com/docs/middleware.html) on the high score schema.






