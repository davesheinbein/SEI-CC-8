
const btn = document.querySelector('button');
// console.log(btn)

btn.addEventListener('click', function(e){
	console.log(e, ' this is the event')
	// create an LI and add it to the ul, when button is clicked
	const li = document.createElement('li');
	
	// grabbed the input
	const input = document.querySelector('input');
	
	// input.value gives us what is written in the input
	li.textContent = input.value;
	console.log(li, "What should this look like?")

	const ul = document.querySelector('ul');

	// appendChild actually adds an element to the DOM
	ul.appendChild(li);
	// define the LI's text to be whatever the inputs value is

	// clearing the input?
	// can you define the input.value = something that makes it blank? 
	input.value = ""; // string because .value is a string
})



const ul = document.querySelector('ul');

ul.addEventListener('click', function(event){
	console.log(event.target, 'e.target'); // e.target
	// is what is being clicked on
	console.log(event.currentTarget, 'e.currentTarget');
	// e.currentTarget is the element the event listener
	// is attached too
	// event.target is an element
	event.target.style.textDecoration = "line-through";
})



