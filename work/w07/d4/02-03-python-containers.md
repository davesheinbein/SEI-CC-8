<img src="https://i.imgur.com/DPzk4Ok.png">

# Python Containers

## Learning Objectives

| Students will be able to: |
|---|
| Use _lists_, _tuples_ & _dictionaries_ as containers for data |
| Use _list comprehensions_ to create lists |
| Create subsets of a _sequence_ using the _slice_ operator |

## Setup

To test some of the examples and complete the exercises, please open a Python [repl.it](https://repl.it/).

## General Purpose Containers

As you've learned, applications frequently need to maintain collections of data within a _container_ data type.

**❓ What did we use in JS to hold collections of data?**

In this lesson, we're going to review the following Python built-in types commonly used as containers:

- **dictionaries**
- **lists**
- **tuples**

## Dictionaries

### Purpose

**Dictionaries** are to Python as **objects** are to JS.

A **dictionary** provides a container for `key: value` pairs.

In Python, we commonly refer to `key: value` pairs as **items** vs. **properties** as in JS.

_Dictionaries_ have a class (type) of `dict`.

### Basic Syntax

As with objects in JS, a **dictionary** is created literally using curly braces:

```python
student = {
  'name': 'Maria',
  'course': 'SEI',
  'current_week': 7
} 
```

Unlike in JS, when strings are used as keys, they must be quoted.

### Features

Dictionaries are mutable:

- The values assigned to a key can be changed
- Additional items can be added
- Existing items can be deleted
 
Any immutable type can be used as a key, including _numbers_ and _tuples_ (which we'll cover in a bit), for example:

```python
someKey = 3

d = {
  someKey: 'three'
}
```

The above dictionary, `d`, has 1 item with a key of `3` that holds the value of `'three'`.

> Only since version 3.6 does Python track the insertion order of items in a dictionary - so beware if you're relying on the order items are iterated upon.

### Getting and Setting Values

We use **square brackets** to get and set an item's value:

```python
name = student['name']
print(name)
> Maria
student['name'] = 'Tina'
print(student['name'])
> Tina
```

Unlike JS, we can't access items in a Python dictionary using **dot notation** (dots are used to invoke methods on the dictionary).

### The `get` Method

When accessing a key that does not exist in a dictionary, a `KeyError` will be raised. 

❓ What happens when we access a property that does not exist in a JS object? 

One option to avoid this error is to use the `get` method:

```python
skills = student['skills']
> KeyError: 'skills'
print( student.get('skills') )
> None
# Provide a default value if key not in dictionary
print( student.get('skills', {'HTML': 5, 'JAVASCRIPT': 4}) )
> {'HTML': 5, 'JAVASCRIPT': 4}
```

### The `in` Operator

Another way to avoid the `KeyError` is to use the `in` operator to check if the dictionary includes a key:

```python	
if 'course' in student:
  print( f"{student['name']} is enrolled in {student['course']}")
else:
  print( f"{student['name']} is not enrolled in a course")
```

### Adding Items

Simply assigning to a _key_ that does not exist will create a new item in the dictionary.

Let's add an item to `student`:

```python
student['age'] = 21
```

❓ If an `'age'` item already existed, what would happen? 

### Deleting Items

The `del` statement is used to delete an item from a dictionary:

```python
del student['age']
# Verify that item was deleted
'age' in student
> False
```

### Number of Items

Use the built-in `len` function to retrieve the number of items in a dictionary:

```python
print( student )
> {'name': 'Tina', 'course': 'SEI'}
len(student)
> 2
len({})
> 0
```

### Dictionaries - Iterating Items

`for` loops are used to iterate over the items in a dictionary. 

However, accessing the value of an item as follows is considered to be a Python [anti-pattern](https://en.wikipedia.org/wiki/Anti-pattern):

```python
for key in student:
  print( f"{key} = {student[key]}" )
```
	
The preferred approach is to use the `items()` method to obtain a [dictionary view object](https://docs.python.org/3/library/stdtypes.html#dictionary-view-objects).

`student.items()` returns a wrapped set of (key, value) tuples:

```python
student.items()
> dict_items([('name', 'Tina'), ('course', 'SEI')])
```

Then use a `for in` loop to iterate over the view object:

```python
for key, val in student.items():
  print( f"{key} = {val}" )
```

The `for` statement "unpacks" the tuples by assigning its values to multiple variables like with `key, val` above.

### 💪 Dictionary - Practice Exercise (10 minutes)

1. Define a Python dictionary named `where_my_things_are` containing a few items where:
	- the `keys` are things you have, and
	- the `values` are the locations you keep those things.

2. Write a `for` loop that iterates over the items in the dictionary and prints each one as<br>**_My [thing] is kept [location]_**


## Lists

### Purpose

**Lists** are to Python as **arrays** are to JS.

A **list** provides a container for zero or more items (_elements_).

**Lists** can contain items of different types, including dictionaries and nested lists.

**Lists** have a class (type) of `list`.

### Basic Syntax

Like arrays in JS, a **list** can be created with a set of **square brackets**:

```python
colors = ['red', 'green', 'blue'] 
```

The number of items in a list is returned using the built-in `len()` function:

```python
len(colors)
> 3
```
### Features

Lists are considered to be a _sequence_ type in Python. A _sequence_ is a generic term used for an **ordered** collection. Other _sequence_ types in Python include **strings** and **tuples**.

Lists are mutable:

- Items within a list can be replaced
- Items can be added and removed from a list

### Accessing Items

Accessing the individual items of a list is much like accessing elements in a JS array, i.e., by using square brackets with an expression that evaluates to an integer:

```python
idx = 1
colors[idx + 1]
> blue
```

However, unlike in JS, we can use negative integers to index from the end of a list:

```python
colors[-1]
> blue
```
No need to write code like `colors[len(colors) - 1]` - yay!

### Assigning Items


We also use square brackets to target an item of a list for assignment:

```python
colors[-1] = 'brown'
print(colors)
> ['red', 'green', 'brown']
```

Unlike with JS arrays, assigning to a non-existing index results in an error:

```python
colors[10] = 'yellow'
> IndexError: list assignment index out of range
```

### Adding an Item

The equivalent to JS's `push()` method is `append()`:

```python
colors.append('purple')
```
	
However, unlike JS's `push()` method, `append()` can only add one item and does not return a value.
	
For adding multiple items, use the `extend()`:

```python
colors.extend(['orange', 'black'])
```

In Python, the `+` operator can be used to create a new list by combining them:

```python
odds = [1, 3, 5]
evens = [2, 4, 6]
nums = odds + evens
print(nums)
> [1, 3, 5, 2, 4, 6]
```

❓ How can we combine arrays in JavaScript into a new array?

### Inserting an Item

To add an item anywhere within a list, use the `insert()` method:

```python
print(colors)
> ['red', 'green', 'brown', 'purple', 'orange', 'black']
colors.insert(1, 'yellow')
> ['red', 'yellow', 'green', 'brown', 'purple', 'orange', 'black']
```

### Removing an Item

Yup, there's a `pop()` method, but it's more flexible in Python because you can specify the index of the item to remove and return:

```python
print(colors)
> ['red', 'yellow', 'green', 'brown', 'purple', 'orange', 'black']
green = colors.pop(2)
print(colors)
> ['red', 'yellow', 'brown', 'purple', 'orange', 'black']
```

If you don't care about the value returned by `pop()`, you can also use the `del` operator to delete an item:

```python
print(colors)
> ['red', 'yellow', 'brown', 'purple', 'orange', 'black']
del colors[1]
print(colors)
> ['red', 'brown', 'purple', 'orange', 'black']
```

Also there's a `remove()` method that removes the first item that matches what you pass in:

```python
print(colors)
> ['red', 'brown', 'purple', 'orange', 'black']
colors.remove('orange')
print(colors)
> ['red', 'brown', 'purple', 'black']
```

No value is returned by the `remove()` method.

### Clearing an Entire List

The `clear()` method does just what you'd think:

```python
print(colors)
> ['red', 'brown', 'purple', 'black']
colors.clear()
print(colors)
> []
```

### Iterating Over Items in a List

The `for in` loop is used to iterate over the items in a list:

```python
colors = ['red', 'green', 'blue']
for color in colors:
  print(color)
> red
> green
> blue
```

If we need to access the index of the item while iterating over a list, we use the built-in `enumerate()` function to provide the index and the value to a `for` loop:

```python
for idx, color in enumerate(colors):
  print(idx, color)
> 0 red
> 1 green
> 2 blue
```

## ❓ Dictionary & List Review Questions

1. **What are dictionaries similar to in JS?**

2. **What are lists similar to in JS?**

3. **Why might the following code not work?**

	```python
	menu = {
	  hamburger: 4.99,
	  french_fries: 1.99,
	  taco: 2.99
	}
	```

4. **What is one way to add items to a list?**

5. **What operator can we use to remove an item from a list or a dictionary?**

## List Comprehensions

### Purpose

_List comprehensions_ are a powerful feature in Python.

They provide a concise way to create and work with lists.

They will seem confusing as first, but they certainly are a favorite of _Pythonistas_ and you will probably come across them when googling.

### Numerical Example

Say we needed to square all of the numbers in a list and put them into a new list, we might use a for loop like this:

```python
nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
	
# I want 'n * n' for each 'n' in nums 
squares = []
for n in nums:
  squares.append(n * n)
print(squares)
> [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
```

❓What method in JS could we use in this scenario?

A list comprehension can reduce this code:

```python
squares = []
for n in nums:
  squares.append(n * n)
```
To this:
	
```python
squares = [n * n for n in nums]
```

### Basic Syntax

Here's the basic syntax of a _list comprehension_:

```python
# [<expression> for <item> in <list>]
# This reads as: I want <expression> for each <item> in <list>
```

As you can see, a list comprehension is basically a modified `for` loop within square brackets which, as we know, returns a new list.

### Filtering the Items

We just saw how list comprehensions are a nice way to map a list, but they can be used for **filtering** too.

Again, let's start with a non-comprehension approach by using a `for` loop to map and filter `nums`:

```python
nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
	
# I want 'n * n' for each 'n' in nums  if 'n * n' is even
even_squares = []
for n in nums:
  square = n * n 
  if square % 2 == 0:
    even_squares.append(square)
print(even_squares)
> [4, 16, 36, 64, 100]
```

Again list comprehensions reduce the above from:

```python
even_squares = []
for n in nums:
  square = n * n 
  if square % 2 == 0:
    even_squares.append(square)
```
To this one-liner:
	
```python
even_squares = [n * n for n in nums if (n * n) % 2 == 0]
```
Talk about less is more!

### ❓ List Comprehensions - Review Questions

1. **What characters start and end a list comprehension**

2. **True or False: A list comprehension creates a new list?**

## Tuples

**Tuples** in Python are very similar to Python **lists**.

Tuples have a class (type) of `tuple`.

You may come across tuple's being "classified" based on how many items they contain, e.g., a **2-tuple** would be used to hold a `key` and its `value`.

### Basic Syntax

Tuples can be defined in a few different ways.  Most basically, they are defined like this:

```python
colors = ('red', 'green', 'blue')
print(colors)
> ('red', 'green', 'blue')
print( len(colors) )
> 3
``` 

The parentheses are actually optional (except when creating an empty tuple), however, the use of parens is popular.

Here's how an empty tuple is created:

```python
things = ()
print( type(things) )
> <class 'tuple'>
```

If you need to create a 1-tuple (a tuple with one item), be aware that a comma is necessary:

```python
# Will not create a tuple
hello_tuple = ('Hello')
print( type(hello_tuple) )
>  <class 'str'>

hello_tuple = ('Hello',)
# or just the following (no parens required)
hello_tuple = 'Hello',
print( type(hello_tuple) )
> <class 'tuple'>
```
	
### Differences Between Tuples & Lists

The main difference between tuples and lists is that tuples are immutable.

Since tuples can't be changed after they are created, they are great for protecting data that you don't want to be changed.

Python iterates over tuples faster than lists.

Because they are immutable, tuples can even be used as keys for dictionaries.

Generally, you'll find that tuples are used to contain heterogeneous (different) data types and lists for homogeneous (similar) data types.

### Accessing Items

Although tuples can't be modified like lists, we can retrieve their items in the same way using square brackets:

```python
colors = ('red', 'green', 'blue')
green = colors[1]
print(green)
> green
```

_Sequences_ (lists, tuples & strings) also have an `index()` method that returns the index of the first match:

```python
colors = ('red', 'green', 'blue')
blue_idx = colors.index('blue')
print(blue_idx)
> 2
```

### Iteration

The items in tuples are iterated over by using `for` loops as we saw previously with lists:

```python
colors = ('red', 'green', 'blue')
for idx, color in enumerate(colors):
  print(idx, color)
> 0 red
> 1 green
> 2 blue
```

### Unpacking Tuples

Tuples (and other sequences such as lists & strings) have a convenient feature, called **unpacking**, for performing multiple variable assignments in a single line of code:

```python
colors = ('red', 'green', 'blue')
r, g, b = colors
print(r, g, b)
> red green blue
```

Comma separated variables on the left-side of the assignment operator and a sequence of values on the right is what it takes.

FYI, we were seeing unpacking in action within the `for in` loops above, for example:
 
```python
for key, val in student.items():
  print( f"{key} = {val}" )
```

## Sequences Can Be "Sliced"

Slicing in Python is used to create "slices" (copies) of sequences.

However, instead of using a `slice` method like we did in JS, Python has a cool "slice" operator that uses this syntax:

```python
a_sequence[m:n]
```

Just like with indexing, slicing uses square brackets, but adds a colon:

```python
short_name = 'Alexandria'[0:4]
print(short_name)
> Alex
```

Note that the slice includes up to, **but not including** the index to the right of the colon.

❓ Is this the same as with the ending index in JS's `slice` method? 

If the first index is omitted, the slice copies the sequence starting at the beginning (index of `0`):

```python
colors = ('red', 'green', 'blue')
print( colors[:2] )
> ('red', 'green')
```
 
If the up to index is omitted, the slice copies the sequence all the way to the end:

```python
colors = ['red', 'green', 'blue']
print( colors[1:] )
> ['green', 'blue']
```

❓ What would the value of `fruits` be?

```python
fruit = ('apples', 'bananas', 'oranges')
fruits = fruit[:]
```

## Python Containers Summary

Python's **dictionary**, **list** and **tuple** are the most common data types used as containers for collections of data.

In addition, Python offers amazing power, convenience and readability with features such as list comprehensions and slicing.

However, as usual, it takes practice to become "comfortable" with these concepts, so on to the lab, but first...

## ❓ Essential Questions

1. What is the practical difference between a list and a tuple. 

2. Assuming this dictionary:

	```python
	fruit = {
	  'apples': 'red',
	  'bananas': 'yellow',
	  'oranges': 'orange'
	}
	```
	Identify the problem with this statement:
	
	```python
	color_of_bananas = fruit.bananas
	```

3. What concept is being used below to assign values to the variables and what would the value of `two` be:

	```python
	one, two, three = 'abc'
	```