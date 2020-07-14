<img src="https://i.imgur.com/IDAt2qE.png" height="300">

# Create an API for an Express App

## Intro

Looking for some more practice exposing an API for an app?  Good!

## Lab Requirements

1. Create an express/react app
2. Create a user model that has the following properties

```js
{
  name: String,
  email: {type: String, required: true, lowercase: true, unique: true},
  password: String
}, {
  timestamps: true
}
```
3.  Make a User controller that has a signup function. The function should return the username and a variable that lets you know the user has successfully signed up in the form of json.  
4.  Routes can be defined like the following 
```js
router.post('/signup', usersCtrl.signup);
router.post('/login', usersCtrl.login);
```

and mounted using namespacing 

```js
app.use('/api/users', require('./routes/api/users'));
```

5.  Implement a signup form component in react, that has the inputs for email, name, and password. 
6.  Make the required fetch request to your express API in order to implement signup, when the user submits the signup form. 
7.  Switch the view in React to a *Main Page* after a user has signed up. 

Note: This is the only time we won't encrypt our passwords. We'll learn how to secure our api on Monday when we learn about [JWT](https://jwt.io/introduction/) and [bcrypt](https://www.npmjs.com/package/bcrypt)

### Bonus 

1. Implement a Login
2.  style the app
3.  Implement Crud tied to a user



## Deliverable

#### This lab is not a deliverable!

