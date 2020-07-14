<img src="https://i.imgur.com/ZFR59xq.png">

# Tips to Getting Started on Your Project 4

### Recommended Steps:

1. Do a quick review of the [Thinking in React](https://reactjs.org/docs/thinking-in-react.html) section of the docs.

1. `npx create-react-app <your app name here>`

1. Set up a repo in your GitHub account and follow the instructions that create an `origin` remote in your local repository.  Do an initial commit and push to GitHub.

1. **Slack your GitHub repo's link when asked to do so!**

1. Go full-stack by following all the steps in the Full-stack React lesson (creating a `server.js`, etc.).  Time for another commit.

	> Note that you will need to run `npm run build` one time before the server will start up.

1. Install `mongoose` & `dotenv`.

1. Create a `.env` file to hold the `DATABASE_URL` with an Atlas MongoDB connection string to be used in `database.js`.

	You can use the same Atlas connection string that you used in Project 2, however, be sure to change the **namespace**/**database** name within the connection string.
	
	An Atlas hosted connection string would look something like:
	```
	DATABASE_URL=mongodb+srv://username:password@seidb-w0kys.azure.mongodb.net/mastermind?retryWrites=true
	```
	Again, be sure to change the namespace (`mastermind`) to something different for your Project 4. 

1. Create and code the `config/database.js` module.  Yup, another commit.

1. Be sure to `require('dotenv').config()`, followed by `require('./config/database.js)` in `server.js` and verify that the database is connecting as planned.  Commit.

1. Install `react-router-dom` and get client-side routing set up (more than likely in the `<App>` component).  Test by creating a basic `<Nav>` component for your app. Render a couple of `<Link>` components in your `<Nav>` that switch between two separate "page" components. Remember to organize your "page" components in a folder, i.e. `pages`, separate from your non-page components' folder (`components`). Time for another commit. BTW, look into the `<NavLink>` component that makes it easy to style the "active" link (link for the current route).  FYI, the react-puppies-crud app uses `<NavLink>`.

1. Code your `User` model. You can always keep it basic at first and add additional properties after authentication is working.  Commit.

1. Add token-based authentication with sign up, log in & log out functionality. For help, refer to the Token-based Authentication with JWTs lesson.  Big-time commit.

1. Code your first user story which is usually something like `As a visitor, I want... when I browse to the app`.  Make commits each milestone along the way.

1. Code your second user story which is usually something like `As a user, I want... when I log in`.  Again, don't forget to make commits...

1. Keep the fun rolling by coding the rest of your prioritized user stories being sure to make commits along the way...
