

// grab an element by its ID

const titleH1 = document.getElementById("title");

// console.log(titleH1)
// then the element (titleH1) you can change its properties
// its textContent, style, eventlistners
titleH1.style.color = "green";

// query selector allows you to use any css selector
const p = document.querySelector(".cool");

// console.log(p);

// if I want to change the backgroundcolor of the p
// tag how do I do it
p.style.backgroundColor = "blue";


p.textContent = "Im a real boyyy!";

p.innerHTML = "<h4>Corona Virus causes corona shortage at gas stations</h4>";

const a = document.querySelector('a');
// normally advice console.log(a) make sure its the element
a.setAttribute('href', 'https://www.google.com');

const commentsLI = document.getElementsByClassName('comment');

// this should be an array like object
console.log(commentsLI);

const commentEls = document.querySelectorAll('.comment');
console.log(commentEls);



for (let commentEL of commentEls){
	console.log(commentEL);
	commentEL.style.fontSize = '30px';

}















