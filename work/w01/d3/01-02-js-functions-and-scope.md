![](https://i.imgur.com/yxikhiY.jpg
)
# JavaScript Functions & Scope

| Learning Objectives - SWBAT |
| :--- |
| Understand the Use Case of Functions |
| Define Functions With & Without Parameters |
| Call Functions With & Without Arguments |
| Describe Scope |

## Roadmap
1. What is a function?
2. Why Functions Anyway?
3. Defining and Calling Functions
4. Parameters
5. Scope
6. Further Study


### 1. What is a function?

- A function is a reusable block of code written to perform a single purpose, for example:

	```js
	// Get player's choice of board size (S for small, M for medium, L for large)
	function getBoardSize() {
	  const validChoices = ['S', 'M', 'L'];
	  let size;
	  while (!validChoices.includes(size)) {
	    size = prompt('Enter the board size (S)mall, (M)edium or (L)arge: ').toUpperCase();
	  }
	  return size;
	}
	```

- Functions optionally accept data as input and return a single piece of data, for example:

	```js
	function getPointsScored(elapsedTime) {
	  if (elapsedTime < 30) {
	    return 100;
	  } else if (elapsedTime < 60) {
	    return 75;
	  } else {
	    return 25;
	  }
	}
	
	const points = getPointsScored(time);
	```
	**❓ Assuming the variable `time` is equal to `50`, what will `points` equal?**

- Regardless of programming language, functions are the primary building blocks of programs! (example coming up below...)

- The code in a function does not execute until that function is called.  However, the code is checked for syntax errors when the script file is loaded.

- Programming languages themselves include functions built into the language, e.g., `parseInt()`.
	
	**❓ What built-in functions do you see above?**

- The functions we write commonly call other functions, for example:

	```js
	let size, board;
	
	function initialize() {
	  size = getBoardSize();
	  board = generateBoard(size);
	  renderBoard();
	}
	```

### 2. Why Functions Anyway?

#### Tackle Complexity

As humans, we typically tackle a complex task by breaking it into smaller tasks or steps - as developers, we do the same!

Functions allow us to break up programs into more manageable blocks of code.

#### Code Reuse

Functions provide code reuse because they can be called over and over, for example, a `renderBoard` function might be called every time the data in the `board` variable is changed.

Without functions, we might have to write the same code in multiple places of the app which violates a key programming principle known as **DRY** - Don't Repeat Yourself!

**❓What would be the downside of violating the DRY principle by repeating the same code in multiple places throughout a program?**

#### Documentation & Debugging

Simply naming functions appropriately, e.g., `renderBoard`, documents what the program is doing.

Organizing code into functions also makes it easier to find and fix code that's not working as expected, a process known as **debugging**.

#### Summary

In summary, it would be impractical if not impossible to create applications without breaking up the application into functions.

Here's a simple example of how an app that sends out a daily business report might be broken up into functions:

```js
function main() {
  let date = new Date();
  let sales = getSalesData(date);
  let labor = getLaborCosts(date);
  let budget = getBudget(date);
  let report = generateReport(date, sales, labor, budget);
  sendReport(report);
}

// Run the main function
main();

/*--- helper functions ---*/

function getSalesData(forDate) {
  let netSales = getNetSales(forDate);
  let salesTax = computeSalesTax(netSales);
  return {netSales, salesTax};
}

function getLaborCosts(forDate) {
  let staffCosts = getStaffCosts(forDate);
  let mgtCosts = getMgtCosts(forDate);
  return {staffCosts, mgtCosts};
}

function getBudget(forDate) {
  let salesBudget = getSalesBudget(forDate);
  let laborBudget = getLaborBudget(forDate);
  return {salesBudget, laborBudget};
}

function generateReport(forDate, dailySales, dailyLabor, budget) {
  ...
}

function sendReport(report) {
  ...
}

// etc.

```

#### Review

**❓ Which would be a better programming practice:**

- **Code numerous, smaller functions**<br>-or-<br>
- **Code fewer, larger functions**

### 3. Defining and Calling Functions

#### Setup

For this lesson, we going to one of the many "code playgrounds", [repl.it](https://repl.it/).

[repl.it](https://repl.it/) provides an excellent way to learn and experiment with code. It allows you to name and save "repls" which makes it great for creating a library of techniques that you can easily reference in the future and share with others.

Another cool thing about [repl.it](https://repl.it/) is that it offers a wide choice of programming languages and can even handle full-stack repls using frameworks like ExpressJS and Django which we'll be covering later in the course.

Okay, go ahead and create a new HTML/CSS/JS repl and give it a name like "JS Functions".

Now we're ready to review some of what you might already know about functions and learn some cool new stuff too...

#### Defining Functions

There are three primary ways to define functions in JS:

1. Function Declaration/Definitions
2. Function Expressions
3. Arrow Functions

##### 1) Function Declaration (AKA Function Definitions)

```js
function sayHello(name) {
  console.log('Hello ' + name + '!');
}
```

##### 2) Function Expression

```js
var sayHello = function(name) {
  console.log('Hello ' + name + '!');
};
```

**❓ What are the similarities and differences between the two approaches?**

##### The Key Difference Between Function Declarations & Expressions

For all practical purposes, the difference between them is that _function expressions_ cannot be invoked before they are defined; whereas _function declarations_ are **hoisted** to the top of their scope and can therefore be invoked even if they are defined later in the source code. For example:

```js
fnDeclaration();  // thank you function declarations :)
fnExpression();  // TypeError: fnExpression is not a function

function fnDeclaration() {
  console.log("I'm coming from a function declaration");
}

const fnExpression = function() {
  console.log("I'm coming from a function expression");
};
```

> Note: Attempting to execute a function expression before it's been assigned to its variable is the source of many an error for JS developers!

##### 3) Arrow Functions

ES2015 (ES6) delivered a third approach to defining functions - **Arrow Functions**.

The following function declaration:

```js
// Function Declaration
function add(a, b) {
  return a + b;
}
```

and the following arrow function are equivalent:

```js
// Arrow Function
const add = (a, b) => a + b;
```

Arrow Functions offer:

- A more concise syntax
- Implicit return of a single expression
- A single rule for binding the `this` keyword (more on this next week)

However, as cool as Arrow Functions are, they cannot be used in every scenario due to the way they bind JavaScript's `this` (we'll learn more about `this` throughout the course).

Rest assured we'll be using Arrow Functions during this course, however, for this lesson we'll focus on Function Declarations and Expressions which have served the language well for over 20 years...

#### Calling Functions

Regardless of which of the three approaches are used to define functions, we call them the same way:

```js
add(25, 100);  // returns 125
```

> **Developer Vocab:** Developers might say **call**, **execute**, **invoke** or **run** ...a function.  In the context of functions, they are synonyms.

##### Let's Write Another Function

Let's write the following function together in the repl:

```js
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
```

The `getRandomInt` function is defined to accept two arguments (inputs). These arguments should be numbers, otherwise the function as written won't work as expected.

The `return` keyword returns the result of the expression that follows it.

> Note: In the real world, much of the code you write will be code designed prevent and handle error conditions. For example, in the `getRandomInt` function above, we would want to ensure that both of the inputs are numbers.  However, in SEI, we will minimize the amount of error handling code so that we can focus more on what it is we're trying to teach.  There just isn't enough time, so we must prioritize.

Let's invoke the function a couple of times to try it out.

**❓ Is the above function a function _declaration_ or _expression_?**

Now it's your turn... 

#### Practice Writing Functions

You're going to write two functions, one as a function declaration & the other as a function expression.

This will be an individual exercise, however, feel free to seek guidance from your neighbors and instructor if you get stuck.

##### EXERCISE 1: Write a Function Declaration (5 min)

Write a function named `computeArea` as a **function declaration**.

It will have two parameters: `width` & `height`.

It will compute the area of a rectangle (_width_ X _height_) and return a string in the following form:

> **The area of a rectangle with a width of ___ and a height of ___ is ___ square units**

Invoke the function to test it:

```js
console.log( computeArea(5, 25) )
// output: The area of a rectangle with a width of 5 and a height of 25 is 125 square units
```

##### EXERCISE 2: Write a Function Expression (10 min)

Write a function named `planetHasWater` as a **function expression**.

It will have one parameter: `planet`.

Return `true` if the `planet` argument is either "Earth" or "Mars", otherwise return `false`.

Bonus points if you ensure the function will work regardless of the casing of the `planet` being passed in ('earth', 'MARS', etc.).

Invoke the function a few times to test it:

```js
console.log( planetHasWater('Earth') ) //=> true
console.log( planetHasWater('Venus') ) //=> false
// Test the bonus...
console.log( planetHasWater('mArS') ) //=> true
```

##### FUNCTION REVIEW QUESTIONS

**❓ How many different ways are there to define a function?**

**❓ What's the only practical difference between a function definition and a function expression?**

### 4. Parameters/Arguments

There are a few tidbits about parameters/arguments to ponder:

- So, let's answer a common question:  _"What's the difference between a parameter and an argument?"_

	<img src="https://i.imgur.com/u5p9n7m.jpg">
	
- Parameters become local variables inside the function body. Therefore, in the example above, `bottle` and `cap` are variables that can be accessed anywhere within the function.
  
- Just like when naming variables and functions, it's important to name parameters using identifiers that are representative of the data they will hold.

- Arguments (the data being passed in) are assigned to the parameters positionally. In the example above, the `bottle` parameter would be assigned the string "green bottle" because they are the first parameter and argument.

##### Fewer Arguments

JavaScript is very flexible and won't complain when the number of arguments is not the same as the number of parameters defined.

If fewer arguments are passed than parameters defined, then the parameter variables without a matching argument would be set to `undefined`.

> Note: Unlike some other programming languages, JavaScript won't complain if fewer (or extra) arguments are passed to a function.  However, a function that depends on certain arguments to do its job might throw an error or return an unexpected result if it doesn't receive the arguments expected.

##### Extra Arguments

Let's pretend you need to write a function that accepts an unknown number of arguments.

For example, let's say we would like to be able to provide any number of "time" arguments to the `getPointsScored ` function we saw earlier and return a total number of points scored.

First, let's ignore the fact that typically we could code the function to accept an array of times, e.g.,

```js
function getPointsScored(elapsedTimes) {
  // code to iterate over the elapsedTimes array...
}
```

Here's how we could write `getPointsScored` to accept any number of individual "time" arguments using ES2015's [Rest parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters):

```js
function getPointsScored(...times) {
  // times will be an array holding the args
  // Perfect use case for the Array.reduce method, but that's another day...
  let totalPoints = 0;
  times.forEach(function(time) {
    if (time < 30) {
      totalPoints += 100;
    } else if (time < 60) {
      totalPoints += 75;
      return 75;
    } else {
      totalPoints += 25;
    }
  });
  return totalPoints;
}
	
const points = getPointsScored(16, 99, 32, 60);
```

**❓ What would the `times` parameter hold when `getPointsScored` is invoked as above?**

> Note:  Prior to ES2015, we would use the special [arguments](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments) keyword available within non-arrow functions. `arguments` is a JS object that has a `length` property and allows its values to be accessed via _square bracket_ notation.

##### ES2015 Default Parameters

What if your function requires certain arguments and you want to provide a default value for the parameter if an argument is not supplied when the function is invoked?

Prior to ES2015, here is trivial example of what we had to do:

```js
function setColor(bicycle, color) {
  // set color to 'purple' if not provided
  bicycle.color = color || 'purple';
}

var bike = new Bicycle();
setColor(bike, 'blue');  // sets color to blue
setColor(bike);  // sets color to purple by default
```
Now, using **default parameters**, we can do this:

```js
function setColor(bicycle, color = 'purple') {
  bicycle.color = color;
}
```

Any expression can be provided as a default, including objects, etc.

#### Functions as Arguments

In JavaScript, it's easy to pass around functions like data -  because they are - they're objects!
  
##### Passing an Anonymous Function

Often functions or methods (functions attached to an object) will require a function be provided as an argument.  For example, the `forEach` method on arrays:
	
```js
var a = ['red', 'green', 'blue'];
	
a.forEach(function(color) {
  console.log(color);
});
```
	
Since the function provided to the `forEach` will never be called anywhere else in the code, why create a separate named function and pass it in? **Anonymous functions** like shown above can really come in handy!

##### PARAMETER/ARGUMENT REVIEW QUESTIONS

**❓ What's the difference between an _argument_ and a _parameter_?**

**❓ Explain how _arguments_ and _parameters_ are "matched up".**
  
### 5. Scope

#### What is Scope?

In general, the concept of **scope** in computer programming pertains to the **accessibility** of variables and functions from a given point of the code. In other words, as you write a line of code, what variables and functions do you have access to?

If a line of code doesn't have access to a variable/function, we could say that variable/function is "out of scope".

#### Types of Scope in JavaScript

JavaScript has three types of scope:

- **Global scope**
- **Function scope**, also known as **local scope**
- **Block scope** courtesy of ES2015's `let` & `const`

#### Why the Different Types of Scope?

There's a concept in programming known as **The Principle of Least Access**.

This principle is based on the idea that limiting the accessibility of variables (and functions) helps reduce bugs in the code - think of it as a form of "code safety".

#### Global Scope

There's only a single global scope.

If a variable is declared outside of a function, it will "live" in global scope.

```js
// main.js

let size, board;

function initialize() {
  size = getBoardSize();
  board = generateBoard(size);
  renderBoard();
}
```

**❓ What variable/function identifiers above exist in global scope?**

#### Function (local) Scope

A new function scope is created for each executing function.

Each variable declared at the function level would be included within that function's scope regardless of whether `var`, `let` or `const` is used.

The variables within a function's scope only exist during its execution (unless something known as a "closure" exists - yup, another day).

```js
function initialize() {
  const playerName = getPlayerName();
  size = getBoardSize();
  board = generateBoard(size, playerName);
  renderBoard();
}
```

**❓ What variable/function identifiers above exist in the `initialize` function's scope?**

A major benefit of having different scopes, however, is being able to use the same names for variables in different functions!  If there were only one scope, this wouldn't be possible.

#### Block Scope

To give you practice reading and researching independently, the topic of block scope is covered in the Further Study section of this lesson. 

#### Examples of Scope

Let's review the following diagram demonstrates both _global_ and _function_ scope:

![](https://i.imgur.com/UtIoe7F.png)

The diagram identifies 3 different scopes along with the identifiers (variables and functions) that live within each scope.

##### You can look out, but you can't look in!

A key takeaway is that functions have access to the set of variables and functions defined within their own scope AND in the **outer** scopes.

Basically, when a line of code accesses a variable (or function), JS will traverse up the **scope chain** until it finds what it's looking for.

If the JS runtime engine gets to the _global scope_ (which is the top of the food chain in the scope hierarchy) and still can't find what it's looking for, that's when your program ceases due to a **ReferenceError**.

**❓ Does the function `foo` have access to the variable `c`?**

**Any questions before moving on the lab where you'll practice writing several functions?**

### 6. Further Study

##### Immediately Invoked Function Expressions (IIFE)

One way we can prevent our code from leaking into the global scope is by wrapping it with a construct known as an **Immediately Invoked Function Expression**, or "IIFE" (pronounced "iffy").  It looks like this:

```js
(function() {
  'use strict';

  // your code here...
	
})();
```
**❓ Why does this construct virtually prevent variables and functions from being created in the global scope?**

##### Block Scope

Both `let` and `const` define variables that can only be accessed within the **code block** they are defined in.

A _code block_ is created by using curly braces.

The following code from [MDN's docs about let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let) demonstrates differences between `let` and `var`:

```js
function varTest() {
  var x = 1;
  if (true) {
    var x = 2;  // same variable!
    console.log(x);  // 2
  }
  console.log(x);  // 2
}

function letTest() {
  let x = 1;
  if (true) {
    let x = 2;  // different variable
    console.log(x);  // 2
  }
  console.log(x);  // 1
}
```

and another example of their differences:

<img src="https://i.imgur.com/K0uJx2P.jpg">

##### More About Global Scope

In our browsers, the global scope is represented by the `window` object.

It is at the top of the scope chain and its properties are available to **every** function we write.

It is generally bad practice for our programs to create variables in the global scope.  Doing so risks us overwriting data in use by JS libraries/frameworks or other routines.

Creating lots of global variables is referred to as "polluting the global scope", and we all know that it's not nice to pollute!

If we define a variable (or a function) within the global scope, it becomes a property on the `window` object. You can see this in action by typing `var pollution = 'sucks'` in the console, then type `window.` (don't forget the dot), scroll down and find the pollution we have created - yuck!

> Although using both `var` and `let` in the global scope results in a global variable being created, interestingly, those created using `let` and `const` do not create properties on the `window` object like `var` does.

##### Hoisting

Remember how we can call function declarations before they are defined thanks to _hoisting_?

As shown above, similarly, a variable's **declaration** (but not its assignment), is hoisted to the top of the function when it's declared using `var`.

For example, when we write code like this:

```js
function hoist() {
  console.log(x);  // outputs undefined, not a ReferenceError
  var x = 25;
  console.log(x);  // outputs 25
}
```

Internally, the JS engine actually sees this:

```js
function hoist() {
  var x;
  console.log(x);  // outputs undefined, not a ReferenceError
  x = 25;
  console.log(x);  // outputs 25
}
```

#### Nesting Functions

As the examples above have shown, we can define functions within functions!

Why would we want to do this? Well, Perhaps an outer function needs a "helper" function that would only be relevant only to a given function. It would be good programming practice to "hide" that function from the rest of the program by nesting it within the function that actually needs it.

For example (no need to execute this):

```js
function openNewAccount(name, openingBalance) {
  let acctNum = generateAcctNum();
  
  // createAccount is a function available outside this function
  let acct = createAccount(acctNum, openingBalance);
  return acct;
  
  // helper function that provides a unique account number
  function generateAcctNum() {
    return Date.now();  // super amazing algorithm :)
  }
}
```

As you can see, there's a nifty `generateAcctNum` function in there and it's only relevant to when a new account is opened, so it's nested within the `openNewAcount` function.


## References

[MDN Functions Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions)
