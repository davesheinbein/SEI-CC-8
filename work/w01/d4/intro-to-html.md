<img src="https://i.imgur.com/exl28t6.png" width="900" />

# Intro to HTML
---

| Learning Objectives - SWBAT: |
|---|
| Build a basic static HTML webpage from scratch |
| Identify common HTML elements |
| Assign attributes to elements |
| Correctly indent markup |
| Recognize the name and purpose of HTML5 semantic elements |

## Roadmap
1. HTML in Context
2. Essential HTML5 Boilerplate
3. HTML Fundamentals
4. HTML Nesting
5. Malformed HTML
6. Semantic HTML
7. Essential Questions
8. Lab - Build a webpage with un-styled HTML!

### 1. HTML in Context

#### The 3 fundamental client-side technologies of a web app:

<img src="https://i.imgur.com/V6RS1AE.png">

##### HTML (Hypertext Markup Language)
- Purpose: Structure & Content of a web page
- Current Version: HTML5
- Standards Body: [World Wide Web Consortium (W3C)](https://www.w3.org/)

##### CSS (Cascading Style Sheets)
- Purpose: Styling & Layout of a web page
- Current Version: CSS3, with new "modules" still being added
- Standards Body: [CSS Working Group of the W3C](https://www.w3.org/Style/CSS/)

##### JavaScript (ECMAScript)
- Purpose: Behavior of a web page
- Current Versions: [Best shown here](https://www.w3schools.com/js/js_versions.asp) with [browser compliance status here](http://kangax.github.io/compat-table/es2016plus/)
- Standards Body: [ECMA International - TC39 Task Group](http://ecma-international.org/memento/tc39.htm)

### 2. Essential HTML5 Boilerplate

- So that we can start experimenting with HTML, lets create a file and name it *index.html*.  Typically, *index.html* is the default web page for a website.
- Inside the file, we're going to put the following HTML that every HTML5 document should have at a minimum.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Your Title</title>
</head>
<body>
    
</body>
</html>
```

- Again, the above represents minimal boilerplate. Editor tools/extensions, e.g., Emmet, might expand upon this boilerplate. For example, [Emmet](http://emmet.io/) in _vscode_, might emit this boilerplate when `!``[tab]` is typed:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  
</body>
</html>
```
- Note the additional `<meta>` tags for better viewing on mobile devices and Internet Explorer version targeting.

### 3. HTML Fundamentals

#### HTML Documents
- HTML Documents consist of **elements** that define the structure and content of a web page.
- The HTML spec does not specify how elements and their content should be displayed, instead, it's left up to the specific browsers on how to display a certain type of element. For example, some browsers may display an `<h1>` element with a different font size or varying amounts of padding.
- The W3C recommends lowercase be used for tags and attribute names.

#### Tags
- Most **Tags** have an opening and closing tag name inside angle brackets like this<br>`<p>This is a paragraph</p>`. Note the slash in the closing tag.
- Some tags such as `<img>` and `<br>` are called *empty tags* because they never have content and thus do not have a closing tag.  Prior to HTML5, empty tags typically had a slash before the last angle bracket like this `<br/>`, however, since HTML5, it is preferable to omit the slash.

	<img src="https://i.imgur.com/HeyHpUx.gif">
	
#### Elements
- An **Element** consist of a *Tag* and its contents (if any), which may include other tags.<br>For example: `<p>Have a <span>great</span> day!</p>`
- Some elements, such as a table cell `<td>`, would be pointless unless nested inside of a `<tr>` row element.

	> Note: Unlike with JavaScript, our browsers will not complain if we make mistakes in HTML or CSS. It just transparently does its best to correct our mistakes.
	
- Most elements are defined as either *block* or *inline* elements.
  - **Block** elements display on their own line and take up the full width available to them (they don't allow other elements next to them, unless they are styled to do so).

      Examples: `<div>`, `<h1>`, `<p>`
      
  - **Inline** elements are normally displayed without line breaks and occupy only enough space to contain their contents.

      Examples: `<span>`, `<td>`, `<img>`
      
      > Note: Inline elements cannot have their height and width set in CSS. However, using CSS like this, `display: inline-block;`, allows inline elements to be sized.

#### Attributes

- Elements may contain **attributes**.
- Attributes provide additional information about an element.
- Attributes are placed within the opening tag and are typically *name/value* pairs separated by an equals sign (`=`).
- The *value* should always be put in double-quotes (not single quotes).<br>For example:  `<div class="my-class">My Content</div>`
- There are a few attributes, such as `required` `checked` `novalidate` and `disabled`, that stand alone without a value - these are called *boolean attributes*.
- You can add your own custom attributes too! The HTML5 spec recommends that you prefix them with `data-`.  Developers can use custom attributes to add additional information in the markup. They are commonly used by front-end frameworks such as AngularJS.
- The most common attribute is `class` for assigning CSS class(es) to an element.
- The `id` attribute is used to more easily target a specific element (or its contents) for styling or JS access.  The value of an `id` attribute should be unique in the document. The `id` attribute is optional and should be used only when necessary - the less we clutter our code, the better.

#### Whitespace
- Multiple spaces created by the spacebar, tab key and return key are reduced down to a single space between pieces of text.
- However, if you need to create extra spaces, you can use the HTML *entity* **`&nbsp;`** (non-breaking space).

#### Comments
- You can add comments to an HTML document using the following syntax:

   ```
   <!-- This is a comment -->
   ```
- Comments can span multiple lines and elements in a comment tag will not be rendered.

	> Note: Our code editors usually can automatically comment line(s) of code for us by pressing `cmd-/`

### 4. HTML Nesting

<img src="https://i.imgur.com/9m8w40Y.png">

- When an element contains another element, the contained element is considered to be *nested* inside the outer element.  The HTML graphic above, has colored boxes drawn around elements to help visualize the relationship between parent and child elements.
- It is a best practice to indent nested elements.  However, contrary to the above graphic, the `<head>`, and `<body>` tags are rarely indented despite being children of the `<html>` element - this is done to save what is considered to be an unnecessary level of indentation.
- Properly indenting elements makes the markup more readable and less prone to errors.

	> Note: Properly indenting all code (HTML, CSS & JS) is mandatory if you want to get a job!

- Describing Nested Relationships:
   - Descendant / Ancestor<br>
   An element is considered a *descendant* if it is nested anywhere within its *ancestor*.
   
   - Child / Parent<br>An element is considered a *child* if it is a direct descendant of its *parent*.

   - Siblings<br>Two or more elements are considered *siblings* if they have the same *parent*.

### 5. Malformed HTML

* Proper structure and nesting of elements is important because the browser won't complain - it just won't necessarily display what you are expecting it to.
* One of the possible mistakes is to "overlap" tags instead of nesting them.  Here's an example of malformed HTML:

  ```HTML
  <p>This is <strong>important text</p></strong>
  ```

- Errors in complex HTML can be hard to find so it's not uncommon for Developers to use plugins or other tools to help them find errors, no matter what the language.  Here is a link to a website that finds errors in HTML that you paste in:

   [http://www.dirtymarkup.com/](http://www.dirtymarkup.com/)

### 6. Semantic HTML

- Semantic HTML helps express the **meaning** or purpose of the content in a webpage:

	<img src="https://i.imgur.com/2jxmD28.png">

- Benefits for the developer:
	- Semantic HTML makes the developer's intentions more clear as to what the developer is trying to accomplish.
- Benefits for the user:
	- More accurate web searches via better SEO (search engine optimization).
	- Improves accessibility for the vision impaired because screen readers can do their job better.

#### Pair up and research these semantic tags:

   1. `<section>`
   2. `<article>`
   3. `<aside>`
   4. `<figure>`
   5. `<footer>`
   6. `<header>`
   7. `<main>`
   8. `<nav>`

We'll discuss your findings in 5 minutes.

##### Discuss
- What meaning does each semantic provide?

### 7. Essential Questions

1. Explain what semantic HTML is and the benefits it provides.
2. What are attributes and what are they used for?
3. It is important to properly __________ nested elements to make the markup more readable and less prone to errors.

## Practice Exercise / Lab

#### Write an HTML document that represents your own personal blog using semantic HTML. Focus on structure and include some sample content.  Include attributes such as *class* and *id*, but do not worry about writing any styling.


