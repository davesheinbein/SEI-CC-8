<img src="https://i.imgur.com/l4t0NOc.png" width="400">

# Relational Data Design & Modeling


## Learning Objectives

| Students will be able to: |
|---|
| Identify the data **entities** for an application |
| Identify **attributes** for a data entity |
| Identify the **relationships** between data entities |
| Understand the roles of **primary** and **foreign keys** |
| Create an **Entity Relationship Diagram (ERD)** for an application |

## Data Modeling

- An important part of the planning process for an application is determining the data persistence needs of that application.

- This planning results in a **data model**.

- The **data model** is conceptual and is used as a blueprint for implementing the data persistence needs within a given database technology (SQL, NoSQL, etc.).

- The data model is typically visualized with an **Entity Relationship Diagram** (ERD).

## Data Entities

### What is a Data Entity?

- A **Data Entity**, or just **entity**, is used to conceptually model (represent) a real-world object within an application.

- Examples:  **User**, **Post**, **Comment**, **Order**, **Product**, etc.

- Each entity type will have one or more **attributes**...

### The Attributes for a Data Entity

- **Attributes** represent an entity's data. For example, a **Book** entity would probably have a **title** attribute.

- Each attribute has a data type. For example, _string_, _numeric_, _datetime_

#### 💪 Exercise (2 minutes)

- **Identify what other attributes a Book entity might have?** 

### Mapping Between an Entity and a Relational Database

- Remember, the **conceptual data model** is used as a **blueprint** for how the actual database will be structured.

- Each **entity** in the data model identifies a **table** in the database. For example, a **Book** entity will result in a **books** table in the database.

	**❓In Mongoose (NoSQL), what did entities map to?**

- Each **attribute** in an entity identifies a **column** in the table.  For example, the **title** attribute will result in a column with the same name.

- Each **row** in the table is logically an **instance** of the **entity**.

## Designing an Entity Relationship Diagram

### The Sample Application

- Let's design an ERD for a Concert Ticket Tracking application.

- The application should track:
	- The tickets for a concert
	- The seat and price of the ticket
	- The customer that bought a ticket
	- The date of the concert
	- The performer(s) of the concert
	- The venue of the concert

### The Process

- Reviewing an application's **user stories** is a good first step to creating the conceptual data model.

- To design a basic ERD, we must identify three different components:
	1. The **data entities** (tables)
	2. The **attributes** (columns) for each entity
	3. The **relationships** between the entities

- Since this application is supposed to track **tickets**, let's start with a preliminary **Ticket** entity...

### The `Ticket` Entity

- Here's our first attempt at modeling the **Ticket** entity by including all the attributes you might see printed on a ticket:

	<img src="https://i.imgur.com/jcpU8dF.png" height="400">
	
- As currently designed above, this is how the data might look like in the **tickets** table:

	<img src="https://i.imgur.com/TSDHx6I.png">

### 💪 Exercise - Identifying Other Data Entities (5 mins) 

- Identify other entities and their attributes the Concert Ticket Tracking might have.

##### Hints:

- Start by identifying which attributes the **Ticket** entity currently has that should be their own entity instead of an attribute by asking yourself these questions:
	- Could this attribute have attributes of its own, e.g., a **Venue**. 
	- Could this attribute be shared between other entities, e.g., a **Customer**.

#### We will review your findings in 5 minutes. Don't cheat by looking ahead 😊

<details>
<summary>
Data Entities Galore!
</summary>
<img src="https://i.imgur.com/4iq2IOu.png" style="height: 600px">
</details>

### Database Normalization (Vocab)

- [Database Normalization](https://en.wikipedia.org/wiki/Database_normalization) is a database design technique.

- A **relational** database is able to perform searching & updating of data much more efficiently when it is "normalized".

- Okay, with the entities and their attributes set, let's talk about the third component of the ERD - **relationships** between the entities...

### Relationships Between Entities

- **Relationships** determine how the entities are related in terms of their **cardinality**.

- There are three main types of **cardinality**:
	- **one-to-one** (1:1)
	- **one-to-many** (1:M)
	- **many-to-many** (M:M)

#### Example: One-To-One Relationship

- The **one-to-one** relationship exists when one row in a table is "linked" to one row in another table.

- Although **1:1** relationships are not as common as **1:M** and **M:M** relationships, they have their purpose.

- Let's see how we communicate a one-to-one relationship in an ERD...

- A **business** has one **mailing address** and vice-versa:

	<img src="https://i.imgur.com/fTCHHpF.png" height="300">

- Let's discuss the connecting line and PK/FK stuff...

#### ERD Cardinality Lines

- In an ERD, lines drawn between entities describe the cardinality between those entities as follows:

	<img src="https://i.imgur.com/sEnNZyZ.png">

- Note that these are the three main types of cardinality. There are more specific versions of these, such as _zero or many_, as [shown here](https://imgur.com/JtPQEOO).

### Primary Keys

- But what are those **(PK)** and **(FK)** attribute annotations you ask?

- An attribute (column) annotated with **PK** designates the **Primary Key** for that entity (table).

- It is what uniquely identifies a row in a table.

- Although not as common, a **PK** can be a _composite key_, where two or more columns are combined and uniquely identify the a row.

### Foreign Keys

- An attribute (column) annotated with **FK** designates a **Foreign Key**.

- A **FK** provides the "link" to a **PK** in another table.

- Foreign Keys are what enable a database engine to efficiently join two tables that are related.

- It's **important** to note that foreign keys always exist on the **many** (child/"belongs to") side of a **1:M** relationship.

	**❓ Why is this be the case instead of the other way around?**

## Determining the Cardinality Between Tables

- Okay, let's model the relationships between the entities of the _ticket tracking_ application...

	<img src="https://i.imgur.com/4iq2IOu.png" height="450">

- As a note, to save screen space, the entities are not going to show attributes for the primary and foreign keys.  However, be aware that as a default, primary keys are named `id` and foreign keys as `<parent_entity_name>_id`.

- Usually by focusing on two entities, [domain knowledge](https://en.wikipedia.org/wiki/Domain_knowledge) and common-sense will reveal the relationship (usually a<br>one-to-many or many-to-many)

## Continue Designing the ERD

### Beginning with `Concert` and `Ticket`

**❓ What's the relationship?**

<details>
<summary>
Let's see how this is diagramed...
</summary>
<img src="https://i.imgur.com/jlKmola.png" height="400">
</details>

- Reads as: **"A Concert has many Tickets"** and **"A Ticket belongs to a Concert"**.

	**❓ Which of the two tables would have to contain the FK?**

### Now for `Customer` and `Ticket`

**❓ What's the relationship?**

<details>
<summary>
Let's see how this is diagramed...
</summary>
<img src="https://i.imgur.com/6Uc4wHF.png" height="400">
</details>

- Reads as: **"A Customer has many Tickets"** and **"A Ticket belongs to a Customer"**.

#### Seems like there should be a relationship between the **Customer** and **Concert** entities...

- Thanks to the way relational databases are designed, you can access other tables that are not directly joined by joining with others that are.

- For example, you most certainly could access all of the _concerts_ purchased by a _customer_ by joining through _tickets_.

- Although not shown on the ERD with a connecting line, you could say that **"A Customer has many Concerts through Tickets"**, as well as, **"A Concert has many Customers through Tickets"**.

### Creating the ERD - Exercise (2 min)

Please identify the remaining relationships:

- **Concert** and **Venue**
- **Concert** and **Performer**

- We'll review in 2 minutes... (don't peek)

### Concert Tickets Tracking ERD - Final Version

<details>
<summary>
Here's our final ERD...
</summary>
<img src="https://i.imgur.com/qz8V0NX.png" height="400">
</details>

### Physical Implementation of Many-To-Many Relationships

- Note that a **many-to-many** relationship, e.g., **Concert** and **Performer**, requires a join table to implement in the  database.

	**❓ Why is this?**

## In Summary

- Modeling data is an important step during the planning of an application.  After all, _**data is the single source of truth**_ of an application!

- In addition to what we covered in this lesson, there are several other notations/ways to diagram an application's data model.  Check out [this post](https://www.lucidchart.com/pages/er-diagrams) from _lucidchart.com's_ website for more info.  

## ❓ Essential Questions

1. True or False:  Each Data Entity has its own table in a Relational DB?

2. In an eCommerce application with Orders & Products, what would be the relationship (cardinality) between them?

3. In this relationship:  <code>Customer ---< Order</code>, which entity (table) would have the Foreign Key? 

## Further Study

- [What is an Entity Relationship Diagram - Lucidchart](https://www.lucidchart.com/pages/er-diagrams)

- [The Relational Model](https://en.wikipedia.org/wiki/Relational_model)

- [Father of the Relational Model - E. F. Codd](https://en.wikipedia.org/wiki/Edgar_F._Codd)
