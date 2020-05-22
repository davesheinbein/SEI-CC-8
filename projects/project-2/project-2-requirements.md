<img src="https://i.imgur.com/QgojyYY.png" width="400">

# Project 2<br>Node/Express/MongoDB<br>Full-stack CRUD Application

## Overview

This second project is your first foray into **building a full-stack 
application.** You'll be **building a Node/Express/MongoDB app** from the ground up yourself.

This is exciting and by the end of the week we will have given you the all of the tools needed to build your app.

You get to decide what you want to build - as long as it meets the technical requirements outlined below.

**You will be working individually for this project.** You'll be 
designing and coding the app yourself. However, you will have access to up to ten, fifteen minute one-on-one sessions with your instructors.

Additionally as part of the project's requirements, you'll be required to take and pass a Project Assessment.

---

## Planning & Presentation Requirements

### Planning - Due Friday of this week:

- A **[Trello](https://trello.com/) board** with:
    
    ☐ **User Stories**, each moving from left to right in the following 
      three lists in your board:<br>
      	- **Ice Box**<br>
      	- **Current/MVP**<br>
      	- **Completed**<br>
      <br>**User Stories** must follow the following template:<br>**_As a \<user role\>, I want \<feature\>, because \<reason\>._**<br>The _reason_ is optional if it's blatantly obvious.
      <br><br>Note: Prioritize your user stories within the Ice Box with your "wish 
      list" stories at the bottom.
    
    ☐ A **Wireframes** list containing wireframes for the app's main pages of functionality, e.g. Landing Page, Posts Index Page, Favorite Posts Page, Add Post Page, etc.
    
    ☐ An **ERD** list containing an ERD identifying the attributes of each Data Entity (one for each Model and embedded schema). The ERD also needs to diagram relationships between the Entities (1:1, 1:M or M:M). Here's a [YouTube video to show you how](https://www.youtube.com/watch?v=QpdhBUYk7Kk).

### Presentation - Friday, March 6th:

You will have a maximum of 10 minutes to present your project following these guidelines:


1. **Introduce the Project:**

	☐ Intro your project by paraphrasing the README.
	
2. **Demonstrate the Project:**

	☐ Launch the deployed app by clicking the link in the README.
	
	☐ Sign up a new user, then immediately log out.
	
	☐ Log in with your preferred user and demonstrate the features of the app.
	
	☐ Be sure to demo full-CRUD data operations.
	
3. **Show/discuss your code:**

	☐ Show the "main" Mongoose model.
	
	☐ Show your favorite EJS template.
	
	☐ Show the controller for the main model.

4. **Share the experience:**

	☐ What was your biggest challenge?
	
	☐ What are your key learnings/takeaways?
	
5. **Q & A + Feedback**

---

## Technical Requirements

### Your App Must:

☐ **Have at least 2 data entities in addition to the "User" Model**.  One entity that represents the main functional idea for your app and another with a **1:M** or **M:M** relationship with that main entity (embedded or referenced).

☐ **Use OAuth authentication**. (lesson this week)

☐ Implement basic **authorization** that restricts access to features that need a logged in user in order to work (typically CUD data operations) by "protecting" those routes (using the `isLoggedIn` middleware from the OAuth lesson) from anonymous users. In addition, ensure that editing and deletion of data can only be done by the user that created that data (this is done in the controller - refer to the Guide to User-Centric CRUD).

☐ Have **full-CRUD data operations** somewhere within the app's features. For example, you can have functionality that **C**reates & **U**pdates a _post_ and satisfy **D**elete functionality by implementing the ability to delete _comments_.

☐ Be styled such that the app looks and feels similar to apps we use on a daily basis - in other words, **it should have a consistent and polished user interface.**

☐ Be **deployed online** (Heroku).

### Optionally, Your App May:

☐ Consume a third-party API.

☐ Expose its own API where it returns data resources as JSON.

---

## Necessary Deliverables

☐ **A working full-stack app that meets or exceeds the above technical requirements, built by you, and hosted on Heroku**.

- **A ``README.md`` file** with these sections:

  ☐ **App Title:** Contains a description of what the app does and optional background info.
  
  ☐ **Screenshot(s):** A screenshot of your app's landing page and any other screenshots of interest.
  
  ☐ **Technologies Used**: List of the technologies used.
    
  ☐ **Getting Started**: Include a link to the deployed app and your Trello board with the project's planning.
  
  ☐ **Next Steps**: Planned future enhancements (icebox items).
  
  > Note: Don't underestimate the value of a well crafted `README.md`. The `README.md` introduces your project to prospective employers and forms their first impression of your work!

☐ **Frequent commits dating back to the very beginning of the project**. Commit messages should be in the present tense, e.g., "Style landing page" instead of "Styled landing page". **Do not "start over" with a new repo.**

---

## Getting Started

- **Discuss your app idea with an instructor to get their feedback before you dive too deep into user stories and wireframes.**
- Because your app's functionality revolves around the logged in user, **implement authentication and basic navigation first!**
- **Prioritize and implement the user stories one at a time** by following the [Guide to Add a Feature to a Web App](https://gist.github.com/jim-clark/9f9bd19d60d9ce2ec57be8242b6aee96).
- **Remember to keep things small and focus on the MVP** – feature creep can doom a project!

---

## Project Idea Guidance

Lot's of the web applications you interact with on a daily basis
can provide inspiration for this project as most are full-stack CRUD apps.  That is, they manipulate and display data.

#### Do Not Choose Non-CRUD Applications Such As:

- Games
- Portfolio, or presentational pages
- Marketing or content oriented websites

#### Good Examples

Some of the best apps are apps that track or manage things of **personal interest to you**:
  
- Music lesson tracking
- Soccer team tracker
- Rock climbing planner

So much of the Internet is CRUD apps!

- Social media:
  - Twitter
  - Instagram
  - Reddit
- Marketplaces: 
  - Craigslist
  - Etsy
- Organizational or Business apps:
  - Customer management
  - Payroll/Accounting

Many simple apps can have their functionality enhanced by implementing the ability of users to comment on, and/or like/favorite items. 

Another piece of advice:  If you choose to develop an app that has the concept of a shopping cart (eCommerce app), do not attempt to implement the actual payment functionality.

#### Actual Recent Student Projects

- [Cookbook](https://cookbook-app-project.herokuapp.com/)
- [Aberrant Barter](https://aberrant-barter.herokuapp.com/)
- [Eat Me](https://eat-me-recipes.herokuapp.com/)
- [NIGHTOWL Coffee](https://nightowl-coffee.herokuapp.com)
- [Works For Me](http://works-for-me.herokuapp.com/login)
- [CampShare](https://campshare.herokuapp.com/)
- [Hiking With Friends](https://hikingwithfriends.herokuapp.com/)
- [Is It Fun?](https://isitfun.herokuapp.com/)
- [Cat Instagram](https://nyanstagram.herokuapp.com/)

---

## Project Feedback + Evaluation

- Your instructors will be using the [Project 2 Code Review](./project-2-code-review.pdf) form to determine whether or not the project passes all of the minimum requirements.
- Your instructors will endeavor to deliver your code review ASAP the week following Friday's presentation.
- If your instructors determine that your project would pass with minor fixes, you will be required to address the minor deficiencies by 9 am the following day. Please be sure to inform your local instructor when the fixes are complete. FYI, "minor fixes" are minor items that can be fixed very quickly, like code formatting, correcting the README, etc.
- If your instructors determine that the project does not meet the minimum requirements you may request to address the deficiencies identified and resubmit the project. However, be aware that **there is only a single opportunity to resubmit a project or project assessment during the course**.
- Immediately after your presentation, your instructor and/or outcomes may provide you with feedback that will benefit your project and perhaps the projects of other students as well.
- If there is a specific section of code that you would like an instructor to provide additional feedback, please ask!

---

## Project 2 Assessment

Passing the project 2 assessment is a requirement of the project itself.

The goal of the project assessment is to gauge your ability to develop a **minimal** full-stack web application using the Express framework, including your ability to:

- Define a model
- Define routes
- Write controller actions to create and display data
- Write basic EJS templates

You will work on the assessment individually, however, the assessment is "open book", so you will have access to all notes, code, lessons, google, etc.

It is anticipated that it will take 30 - 60 minutes to complete. However, you will have up to 3 hours to complete the assessment.

---

### Useful Resources

**[Writing Good User Stories](http://www.mariaemerson.com/user-stories/)** _(user story tips)_

