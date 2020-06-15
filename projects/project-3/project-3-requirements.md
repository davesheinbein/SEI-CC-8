<img src="https://i.imgur.com/QgojyYY.png" width="400">

# Project 3<br>Build a Full-stack Django App as a Team

### Overview

You’ve already worked in small groups to accomplish various labs and exercises, but this time **we’re going to challenge you to work in a small team on a project.**

You and your teammates together will architect, design, and collaboratively build a full-stack web app.

With this project you'll be building an exciting full-stack app that uses the **Python**-based **Django Web Framework**.

**This project will push you both technically and collaboratively!**

You'll likely be working as part of a team in the workplace and **this project will provide you with that important team development experience.**

However, **working on a project as part of a team can be more challenging** due to logistical reasons, differing opinions, etc.

During this project, **your instructors are going to be evaluating your ability to**:

-  Listen to and respect other opinions
-  Share and contribute your ideas with the team
-  Form a consensus and compromise when opinions differ

In fact, **your ability to work in a team during this project is more important to your instructors than the project itself**.

---

## Planning & Presentation Requirements

### Planning - Due Monday, 6/22/2020:

Working in a team is going to require more upfront planning to ensure the team is "on the same page"...

#### Pitch Deck

☐ **Pitch your project** to the class with a [pitch deck](https://pitchdeck.improvepresentation.com/what-is-a-pitch-deck) that includes:

- The application name.
- Your team members and their roles.
- The problem you are going to solve with your app.
- Check out previous decks: [Meal Ticket](https://docs.google.com/presentation/d/1CsBuC-a_AZ1yXJEE-EbptPIdgj1MktiNALyQyhaFfrM/edit#slide=id.p), [Tripio](https://docs.google.com/presentation/d/1gvOypLc4VjKqJzdAW68iwh28uGDSH4Sp1KnA5grDo2g/edit#slide=id.p), [Pantry](https://docs.google.com/presentation/d/1WvHoN5MNaRembgcoog5p0GtivVCOZSzvfPyeevzy08g/edit), [ArtWorld](https://docs.google.com/presentation/d/1yGy2Mh3n6IhPxFu4XKnnMtPPi4OGFPpf-Z_TMYw6wQY/edit#slide=id.g7ba109823e_2_7)

#### Trello Board

- A **[Trello](https://trello.com/) board** with:
    
    ☐ **User Stories**, each moving from left to right in the following 
      three lists in your board:<br>
      	- **Ice Box**<br>
      	- **Current/MVP**<br>
      	- **Completed**<br>
      <br>**User Stories** must follow the following template:<br>**_As a \<user role\>, I want \<feature\>, because \<reason\>._**<br>The _reason_ is optional if it's blatantly obvious.
      <br><br>Note: Prioritize your user stories within the Ice Box with your "wish 
      list" stories at the bottom.
    
    ☐ **Wireframes of the main pages of functionality**, e.g. Landing Page, Posts Index Page, Favorite Posts Page, Add Post Page, etc.
    
    ☐ An **ERD** showing the attributes of each entity and the relationships between them. Refer to the Data Modeling lesson for assistance.

### Presentations - Friday, 6/26/2020:

**Your entire team must participate in the presentation of the project.**

You will have approximately 15 minutes to present your project following these guidelines:

1. **Introduce the Project:**

	☐ Intro your project by paraphrasing the README.
	
2. **Demonstrate the Project:**

	☐ Launch the project by clicking the link in the README.
	
	☐ Sign up a new user, then immediately log out.
	
	☐ Log in with your preferred user and demonstrate the features of the app.
	
	☐ Be sure to demo the qualifying CRUD data operations.
	
3. **Show/discuss your code:**

	☐ Show the "main" Django model.
	
	☐ Show the code for the main model's view.
	
	☐ Show your favorite Django template.

4. **Share the experience:**

	☐ What was your biggest challenge? (besides Team Git Workflow)
	
	☐ What are your key learnings/takeaways?
	
5. **Q & A + Feedback**

---

## Technical Requirements

### Your App Must:

☐ Be a full-stack **Django** application.

☐ Have **at least one data entity** (Model) in addition to the built-in User model.  

☐ Connect to and perform data operations on a **PostreSQL** database (the default SQLLite3 database is not acceptable).

☐ Have **at least 3 of the 4 CRUD data operations** across any combination of the app's models (excluding the User model). For example, creating/reading posts and creating/deleting comments qualifies as 3 of 4 CRUD operations. 

☐ **Authenticate users using Django's built-in authentication**.

☐ **Implement authorization by restricting access to the Creation, Updating & Deletion of resources** using the `login_required` decorator in the case of view functions; or, in the case of class-based views, inheriting from the `LoginRequiredMixin`.

☐ Be **deployed online** using **Heroku**. Presentations must use the deployed application.

#### The app may optionally:

☐ Consume data from a third-party API.

☐ Upload images to AWS S3.

### Other Requirements:

☐ Your team must **manage team contributions and collaboration** using Git/GitHub team work-flow.  Here are some references:

- [Team Workflow Video](https://www.youtube.com/watch?v=oFYyTZwMyAg)
- [Cheatsheet in Class Repo](../../resources/git_workflow_team_cheatsheet.md)
- [Understanding the GitHub Flow](https://guides.github.com/introduction/flow/)

☐ All team members need to have significant contributions to the project via git commits.

##### A ``README.md`` file with these sections:

  ☐ **App Title:** Contains a description of what the app does and optional background info.
  
  ☐ **Screenshot(s):** A screenshot of your app's landing page and any other screenshots of interest.
  
  ☐ **Technologies Used**: List of the technologies used.
    
  ☐ **Getting Started**: That Includes:
  	
- A link to the **deployed app** (Heroku)
- A link to the **Trello board** used for the project's planning that includes user stories, wireframes & an ERD.
- A link to the **pitch-deck**.
  
☐ **Next Steps**: Planned future enhancements (icebox items).
  
  > Note: Don't underestimate the value of a well crafted `README.md`. The `README.md` introduces your project to prospective employers and forms their first impression of your work!

---

## Suggestions for Success

1.  **Identify roles** on the team, which may be:

    - **Scrum Master**: the leader of the Agile processes (user stories, stand-ups, etc.) and manager of Trello.
    - **GitHub Manager**: the primary person for managing the repo and GitHub  team workflow (merging pull requests, etc.).
    - **Documenter**: the person in charge of the README, etc.
    - **Designer**: the person in charge of UI design/layout and styling.
    - **Database manager**: this person will be in charge of creating and managing the models and their relationships.
    - **API Manager**: the person in charge of researching, registering with, etc. APIs.

    You *don't have to formally fulfill any of the above roles!* They are only listed to provide ideas/guidance.

2. Because your app's functionality & CRUD revolves around the logged in user, **implement authentication and basic navigation first!**

3. **Remember to keep things small and focus on the MVP** – feature creep can doom a project!

4.  Read the docs for whatever technologies / frameworks / API’s you use. 

5.  **Be consistent with your code style.** You have multiple developers in your team writing code, but you only have one app per team. Make sure it looks like a unified effort in regards to formatting, etc.  For example, consistent vertical whitespace between functions.

6. Do your best to have only one dev working on a certain file between commits.  This will avoid merge conflicts. This is another reason to separate responsibilities between team members when possilbe.

7. **Commit early, commit often.**

8. **Pair programming** can be a great way for team members to share knowledge and contribute to the project.

9. Consider following a [Mob Programming](https://en.wikipedia.org/wiki/Mob_programming) approach where the team is always developing together on a single computer.  Read [this post](http://underthehood.meltwater.com/blog/2016/06/01/mob-programming/) for more information.

---

## Potential Project Ideas

- If you're having a hard-time coming up with an idea, be sure to research potential third-party APIs.
- For this project, we want you to work with your team to build a creative product or one that improves on an existing app.
- Once an idea is agreed upon, start by asking "Why would I want to use this app?"

---

## Obtaining Assistance from an Instructor

- Although your kind instructors will be available to assist during project time, the amount of assistance you require is expected to be minimal due to the fact that you will be collaborating as a team regularly. 

- **All requests for assistance should be slacked to the class support channel, not individual instructors**.  This approach will provide the best and quickest response for your team, as well as be helpful to other teams that may be faced with the same issue.

---

## Project Feedback + Evaluation

- Your instructors will be using the [Project 3 Code Review](./project-3-code-review.pdf) form to determine whether or not the project passes all of the minimum requirements.
- Your instructors will endeavor to deliver your code review ASAP the week following Friday's presentation.
- If your instructors determine that your project would pass with minor fixes, you will be required to address the minor deficiencies by 9 am the following day. Please be sure to inform your local instructor when the fixes are complete. FYI, "minor fixes" are minor items that can be fixed very quickly, like code formatting, correcting the README, etc.
- If your instructors determine that the project does not meet the minimum requirements you may request to address the deficiencies identified and resubmit the project. However, be aware that **there is only a single opportunity to resubmit a project or project assessment during the course**.
- Immediately after your presentation, your instructor and/or outcomes may provide you with feedback that will benefit your project and perhaps the projects of other students as well.
- If there is a specific section of code that you would like an instructor to provide additional feedback, please ask!

--- 

## Project 3 Assessment

You will be assigned a Project 3 Assessment.

Passing the project assessment is a requirement of the project itself.

The goal of this project's assessment will be to gauge your ability to develop a minimal full-stack Django application that:

- Renders a list of items.
- Has a form for entering a new item.
- Provides for the deletion of an item (bonus).

You will work on the assessment individually, however, the assessment is "open book", so you will have access to all notes, code, lessons, google, etc.

It is anticipated that it will take 60 minutes to complete. However, you will have up to 3 hours to complete the assessment.



