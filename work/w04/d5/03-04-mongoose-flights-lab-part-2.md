
<img src="https://i.imgur.com/Y74xxoD.jpg" width="900">

# Mongoose "Flights" Lab - Part 2

## Intro

Today in the _Mongoose - Embedding Related Data_ lesson you:

- Created a schema used to embed _review_ subdocuments in a _movie_ document.

- Created routes and a controller for the _reviews_ data resource.

- Created UI for creating and displaying the _reviews_ on the **show** view of a movie.

- Wrote a `create` action that retrieved a _movie_ document, pushed the _review_ (`req.body`) into the document's `reviews` array, saved the _movie_ doc, and redirected back to the show view for that movie.

Similar to what we did in the lesson, in this lab you'll be adding functionality to the `mongoose-flights` project you created in the _part 1_ lab.

#### The final version of `mongoose-flights` (parts 1 thru 3) will be a deliverable, so do each part and don't fall behind.

## Goal

The goal of this lab is to add the ability to specify a list (array) of `destinations` for the flight - if the flight is non-stop, then there will be only one destination sub-doc in the array.  However, the `destinations` array might have more than one sub-doc, in which case the sub-docs in the array before the last sub-doc represent "stops" along the way to the final destination sub-doc.

Styling is secondary, spend time on it only after the functionality has been implemented.

## Exercises

1. Create a `destinationSchema` that will provide the structure for _destination_ subdocuments that will be embedded:

	| Property | Type | Validations | Default Value |
	|---|---|---|---|
	| `airport`| `String`| `enum` to include<br>'AUS', 'DFW', 'DEN', 'LAX' & 'SAN' | n/a |
	| `arrival`| `Date`| n/a | n/a | 

2. Add the following additional property to the `Flight` Model:

	| Property | Type | Validations | Default Value |
	|---|---|---|---| 
	| `destinations`| `[destinationSchema]`| n/a | n/a | 

3. Implement the following User Story:<br>_AAU, when viewing the list of flights, I want to click on a "detail" link displayed next to each flight to view all of the properties for that flight (`show` view), including each of its destinations._

5. Implement the following User Story:<br>_AAU, when viewing the details page (`show` view) for a flight, I want to be able to add a destination for that flight._  Each destination, as defined by the schema above, includes an `arrival` date/time & one of the established airport codes._<br>Note: Multiple destinations are possible by adding them one at a time.

4. Implement the following User Story:<br>_AAU, when viewing the details page (`show` view) for a flight, I want to see a list of that flight's `destinations` (`airport` & `arrival`)_

## Bonuses

1. Sort the list of `destinations` for a flight by the `arrival` date/time in ascending order.

2. Implement the following User Story:<br>_AAU, when viewing the details page (`show` view) for a flight, I want to be able to delete any current destination for that flight._

3. When adding a destination for a flight, exclude the airports listed in the `<select>` that have already been used by other destinations and/or the flight's `airport`.

## Deliverable?

### The final version of `mongoose-flights` (parts 1 thru 3) will be a deliverable, so do each part and don't fall behind.