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
3.  Implement Signup and Login components in react. 
4.  Make the required fetch requests to your express API in order to implement login and signup
5.  Switch the view in React to a *Main Page* after a user has logged in or signed up. 

Note: This is the only time we won't encrypt our passwords. We'll learn how to secure our api on Monday when we learn about [JWT](https://jwt.io/introduction/) and [bcrypt](https://www.npmjs.com/package/bcrypt)

### Bonus 

1.  style the app
2.  Implement Crud tied to a user



## Deliverable

#### This lab is not a deliverable!

